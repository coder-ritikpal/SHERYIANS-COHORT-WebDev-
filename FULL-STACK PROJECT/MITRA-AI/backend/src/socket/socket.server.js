const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const aiService = require("../services/ai.service");
const messageModel = require("../models/message.model");
const userModel = require("../models/user.model");
const {
  createMemory,
  queryMemory,
} = require("../services/vector.service");

function initSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Middleware: authenticate socket connection
  io.use(async (socket, next) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
      if (!cookies.token) return next(new Error("No cookies found"));

      const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id);

      if (!user) return next(new Error("User not found"));

      socket.user = user;
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("user-message", async (messagePayload) => {
      try {
        const userId = socket.user.id.toString();
        const chatId = messagePayload.chat.toString();
        const userText = messagePayload.content;

        // 1. Save user message to DB immediately
        const message = await messageModel.create({
          user: userId,
          chat: chatId,
          content: userText,
          role: "user",
        });

        // 2. Generate user vector in parallel
        const userVectorPromise = aiService.generateVector(userText);

        // 3. Fetch chat history in parallel (chronological)
        const chatHistoryPromise = messageModel
          .find({ chat: chatId })
          .sort({ createdAt: 1 }) // oldest → newest
          .lean();

        // 4. Wait for user vector first (needed for memory queries)
        const userVector = await userVectorPromise;

        // 5. Save user message into Pinecone (async)
        createMemory({
          id: message._id.toString(),
          vector: userVector,
          metadata: {
            user: userId,
            chat: chatId,
            role: "user",
            text: userText,
          },
        }).catch((err) => console.error("Pinecone save error:", err));

        // 6. Query STM + LTM in parallel
        const [stm, ltm, chatHistory] = await Promise.all([
          queryMemory({
            queryVector: userVector,
            limit: 5,
            user: userId,
            chat: chatId,
            scope: "stm",
          }),
          queryMemory({
            queryVector: userVector,
            limit: 5,
            user: userId,
            scope: "ltm",
          }),
          chatHistoryPromise,
        ]);

        // 7. Format context for Gemini
        const shortTermMemory = stm.map((item) => ({
          role: item.metadata.role === "model" ? "model" : "user",
          parts: [{ text: item.metadata.text }],
        }));
        const longTermMemory = ltm.map((item) => ({
          role: item.metadata.role === "model" ? "model" : "user",
          parts: [{ text: item.metadata.text }],
        }));
        const chronologicalHistory = chatHistory.map((item) => ({
          role: item.role === "model" ? "model" : "user",
          parts: [{ text: item.content }],
        }));
        // Build full context for Gemini
        const geminiContext = [
          ...longTermMemory,
          ...shortTermMemory,
          ...chronologicalHistory,
          { role: "user", parts: [{ text: userText }] },
        ];

        // 8. Generate AI response
        const response = await aiService.generateResponse(geminiContext);

        // Send response back to user immediately
        socket.emit("ai-response", {
          content: response,
          chat: chatId,
        });

        // 9. Save AI response in DB + Pinecone (parallel)
        const responseMessage = await messageModel.create({
          user: userId,
          chat: chatId,
          content: response,
          role: "model",
        });

        aiService
          .generateVector(response)
          .then((responseVector) =>
            createMemory({
              id: responseMessage._id.toString(),
              vector: responseVector,
              metadata: {
                user: userId,
                chat: chatId,
                role: "model",
                text: response,
              },
            })
          )
          .catch((err) => console.error("Pinecone save error (response):", err));
      } catch (err) {
        console.error("❌ Error handling user-message:", err);
        socket.emit("ai-response", {
          content: "⚠️ Something went wrong. Please try again.",
          chat: messagePayload.chat,
        });
      }
    });

    // When user joins a chat → send full chat history
    socket.on("join-chat", async (chatId) => {
      try {
        // Use your chat model to ensure chat belongs to user
        const chatModel = require("../models/chat.model");
        const chat = await chatModel.findOne({ _id: chatId, user: socket.user._id });
        if (!chat) {
          socket.emit("chat-messages", { chatId, messages: [] });
          return;
        }
        const dbMessages = await messageModel
          .find({ chat: chatId })
          .sort({ createdAt: 1 }) // oldest → newest
          .lean();
        // Map DB messages to Gemini format for persona/context
        const geminiHistory = dbMessages.map(msg => ({
          role: msg.role === "model" ? "model" : "user",
          parts: [{ text: msg.content }]
        }));
        // Also emit mapped messages for frontend display
        const messages = dbMessages.map(msg => ({
          sender: msg.role === "model" ? "ai" : "user",
          text: msg.content
        }));
        socket.emit("chat-messages", { chatId, messages });
        socket.geminiHistory = geminiHistory;
      } catch (err) {
        console.error("❌ Error fetching chat messages:", err);
        socket.emit("chat-messages", { chatId, messages: [] });
      }
    });

    // Fetch all chats for the logged-in user
    socket.on("fetch-chats", async () => {
      try {
        // Use your chat model, not messageModel, to fetch chats
        const chatModel = require("../models/chat.model");
        const userChats = await chatModel.find({ user: socket.user._id }).sort({ createdAt: -1 }).lean();
        socket.emit("chat-list", userChats);
      } catch (err) {
        console.error("❌ Error fetching user chats:", err);
        socket.emit("chat-list", []);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
}

module.exports = initSocketServer;
