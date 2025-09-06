const chatModel = require("../models/chat.model");

// Create new chat
async function createChat(req, res) {
  const { title } = req.body;
  const user = req.user;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const chat = await chatModel.create({
      user: user._id,
      title,
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
  } catch (err) {
    res.status(500).json({ message: "Failed to create chat", error: err.message });
  }
}

// Get all chats for logged-in user
async function getChats(req, res) {
  try {
    const chats = await chatModel
      .find({ user: req.user._id })
      .sort({ updatedAt: -1 }); // latest first

    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch chats", error: err.message });
  }
}

// Get a single chat by ID
async function getChatById(req, res) {
  try {
    const chat = await chatModel.findOne({ _id: req.params.id, user: req.user._id });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch chat", error: err.message });
  }
}

module.exports = {
  createChat,
  getChats,
  getChatById,
};
