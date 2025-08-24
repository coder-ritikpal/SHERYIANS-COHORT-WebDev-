const chatModel = require("../models/chat.model");

async function createChat(req, res) {
    const { title } = req.body;
    const user = req.user;
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }
    
    const chat = await chatModel.create({
      user: user._id,
      title
    });

    res.status(201).json({
      message: "Chat created successfully",
      chat: {
        _id: chat._id,
        title: chat.title,
        user: chat.user,
        lastActivity: chat.lastActivity,
      },
    });
  } 
  


module.exports = {
  createChat,   
};