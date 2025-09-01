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
  const io = new Server(httpServer, {});

  // Middleware: authenticate socket connection
  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

    if (!cookies.token) {
      return next(new Error("No cookies found"));
    }

    try {
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
    // ---- AI Message Event ----
    socket.on("user-message", async (messagePayload) => {
      const userId = socket.user.id.toString();       // ✅ Always string
      const chatId = messagePayload.chat.toString();  // ✅ Always string

      // 1. Save user message in DB
      const message = await messageModel.create({
        user: userId,
        chat: chatId,
        content: messagePayload.content,
        role: "user",
      });

      // 2. Generate vector for user input
      const userVector = await aiService.generateVector(messagePayload.content);

      // Save user message to memory
      await createMemory({
        id: message._id.toString(),
        vector: userVector,
        metadata: {
          user: userId,
          chat: chatId,
          role: "user",
          text: messagePayload.content,
        },
      });

      // 3. Short-term memory (semantic, scoped to chat)
      const stm = await queryMemory({
        queryVector: userVector,
        limit: 5,
        user: userId,
        chat: chatId,
        scope: "stm",
      });

      // 4. Long-term memory (semantic, across chats)
      const ltm = await queryMemory({
        queryVector: userVector,
        limit: 5,
        user: userId,
        scope: "ltm",
      });

      // 5. Raw chat history (chronological)
      const chatHistory = (
        await messageModel
          .find({ chat: chatId })
          .sort({ createdAt: -1 })
          .limit(20)
          .lean()
      ).reverse();

      // ✅ Format all into same structure
      const shortTermMemory = stm.map((item) => ({
        role: item.metadata.role,
        parts: [{ text: item.metadata.text }],
      }));

      const longTermMemory = ltm.map((item) => ({
        role: item.metadata.role,
        parts: [{ text: item.metadata.text }],
      }));

      const chronologicalHistory = chatHistory.map((item) => ({
        role: item.role,
        parts: [{ text: item.content }],
      }));

      // 6. Merge all context
      // Order: LTM (global) → STM (semantic current chat) → Chronological history
      const messages = [
        ...longTermMemory,
        ...shortTermMemory,
        ...chronologicalHistory,
      ];

      // 7. Generate AI response
      const response = await aiService.generateResponse(messages);

      // 8. Save response to DB
      const responseMessage = await messageModel.create({
        user: userId,
        chat: chatId,
        content: response,
        role: "model",
      });

      // 9. Save response to Pinecone (memory)
      const responseVector = await aiService.generateVector(response);
      await createMemory({
        id: responseMessage._id.toString(),
        vector: responseVector,
        metadata: {
          user: userId,
          chat: chatId,
          role: "model",
          text: response,
        },
      });

      // 10. Emit back to user
      socket.emit("ai-response", {
        content: response,
        chat: chatId,
      });
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
}

module.exports = initSocketServer;
