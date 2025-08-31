const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const aiService = require("../services/ai.service");
const messageModel = require("../models/message.model");
const userModel = require("../models/user.model");
const { createMemory, queryMemory, deleteMemory } = require("../services/vector.service");

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
    socket.on("ai-message", async (messagePayload) => {
      const message = await messageModel.create({
        user: socket.user.id,
        chat: messagePayload.chat,
        content: messagePayload.content,
        role: "user",
      });

      const userVector = await aiService.generateVector(messagePayload.content);

      await createMemory({
        id: message._id, // unique ID
        vector: userVector,
        metadata: {
          user: socket.user.id,
          chat: messagePayload.chat,
          role: "user",
          text: messagePayload.content,
        },
      });

      const memory = await queryMemory({
        queryVector: userVector,
        limit: 3,
        metadata: { user: socket.user.id, chat: messagePayload.chat },
      });
      console.log("🧠 Retrieved Memory:", memory);

      const chatHistory = (
        await messageModel
          .find({ chat: messagePayload.chat })
          .sort({ createdAt: -1 })
          .limit(20)
          .lean()
      ).reverse();

      const response = await aiService.generateResponse(
        chatHistory.map((item) => ({
          role: item.role,
          parts: [{ text: item.content }],
        }))
      );

      const responseMessage = await messageModel.create({
        user: socket.user.id,
        chat: messagePayload.chat,
        content: response,
        role: "model",
      });

      const responseVector = await aiService.generateVector(response);

      await createMemory({
        id: responseMessage._id,
        vector: responseVector,
        metadata: {
          user: socket.user.id,
          chat: messagePayload.chat,
          role: "model",
          text: response,
        },
      });

      socket.emit("ai-response", {
        content: response,
        chat: messagePayload.chat,
      });
    });

    // ---- Delete Message Event ----
    socket.on("delete-message", async ({ messageId }) => {
      try {
        // Find and delete message from DB
        const message = await messageModel.findOneAndDelete({
          _id: messageId,
          user: socket.user.id,
        });

        if (!message) {
          return socket.emit("delete-error", { message: "Message not found or unauthorized" });
        }

        // Delete from Pinecone
        await deleteMemory(messageId);

        // Notify client
        socket.emit("message-deleted", { messageId });
        console.log(`🗑️ Message + Memory deleted: ${messageId}`);
      } catch (err) {
        console.error("❌ Error deleting message:", err);
        socket.emit("delete-error", { message: "Failed to delete message" });
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
}

module.exports = initSocketServer;
