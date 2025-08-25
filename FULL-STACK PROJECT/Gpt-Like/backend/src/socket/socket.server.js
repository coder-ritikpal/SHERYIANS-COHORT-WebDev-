const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const aiService = require("../services/ai.service");
const messageModel = require("../models/message.model");


function initSocketServer(httpServer) {
  const io = new Server(httpServer, {});

  io.use((socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

    if(!cookies){
      return next(new Error("No cookies found"));
    }

    try {
      const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (err) {
      return next(new Error("Authentication error"));
    }
  });


  io.on("connection", (socket) => {

    socket.on("ai-message", async (messagePayload) => {

      await messageModel.create({
        user: socket.user.id, 
        chat: messagePayload.chat,
        content: messagePayload.content,
        role: "user"
      });

      const chatHistory = await messageModel.find({
        chat: messagePayload.chat
      })

      const response= await aiService.generateResponse(chatHistory.map(item=>{
        return{
          role: item.role,
         parts:[{ text:item.content}]
        }
      }));

      await messageModel.create({
        user: socket.user.id,
        chat: messagePayload.chat,
        content: response,
        role: "model"
      });

      socket.emit("ai-response", {
        content: response,
        chat: messagePayload.chat
      });

    })
   
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });
}

module.exports = initSocketServer;  