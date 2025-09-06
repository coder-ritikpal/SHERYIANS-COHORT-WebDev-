import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";
import socket from "../services/socket";
import { toast } from "react-toastify";
import { Menu } from "lucide-react";
import { useSelector } from "react-redux";
import axiosInstance from "../services/axios";

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [typing, setTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ Ensure socket reconnects after refresh if user is logged in
  useEffect(() => {
    if (isLoggedIn && !socket.connected) {
      socket.connect();
      socket.emit("fetch-chats");
    }
  }, [isLoggedIn]);

  // ✅ Clear chats when user logs out
  useEffect(() => {
    if (!isLoggedIn) {
      setChatHistory([]);
      setActiveChat(null);
      setMessages([]);
    }
  }, [isLoggedIn]);

  // Create new chat
  const handleNewChat = async () => {
    if (!isLoggedIn) {
      toast.error("You must be logged in to create a chat.");
      return;
    }
    const title = prompt("Enter chat title:");
    if (!title) return;

    try {
      // Call REST API to create chat
      const res = await axiosInstance.post("/chats", { title });

      // Update chat list immediately
      setChatHistory((prev) => [res.data.chat, ...prev]);
      setActiveChat(res.data.chat._id);

      // Sync with server
      socket.emit("fetch-chats");

      toast.success("New chat created!");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to create chat");
    }
  };

  // Socket: join chat + listen
  useEffect(() => {
    if (!activeChat) return;
    setMessages([]); // clear messages when switching chat
    socket.emit("join-chat", activeChat);

    const handleChatMessages = (data) => {
      if (data && Array.isArray(data.messages)) setMessages(data.messages);
      else if (Array.isArray(data)) setMessages(data);
    };

    socket.on("chat-messages", handleChatMessages);
    socket.on("ai-response", (msg) => {
      setMessages((prev) => [...prev, { sender: "ai", text: msg.content }]);
      setTyping(false);
    });

    return () => {
      socket.off("chat-messages", handleChatMessages);
      socket.off("ai-response");
    };
  }, [activeChat]);

  // Fetch chats via socket after login and whenever sidebar is opened
  useEffect(() => {
    if (!isLoggedIn) return;

    socket.emit("fetch-chats");

    const handleChatList = (chats) => {
      setChatHistory(chats);
      // If activeChat is not in the new list, select the first chat
      if (chats.length > 0) {
        if (!activeChat || !chats.find((c) => c._id === activeChat)) {
          setActiveChat(chats[0]._id);
        }
      } else {
        setActiveChat(null);
      }
    };

    socket.on("chat-list", handleChatList);
    return () => {
      socket.off("chat-list", handleChatList);
    };
  }, [isLoggedIn, sidebarOpen]);

  // Send message
  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !activeChat) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    socket.emit("user-message", {
      chat: activeChat,
      content: userMessage.text,
    });
  };

  // Handler for chat selection from Sidebar
  const handleSelectChat = (chatId) => {
    setActiveChat(chatId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-orange-900 text-gray-100 flex flex-col">
      <Navbar />
      <div className="md:hidden flex items-center justify-between p-2 border-b border-red-800 bg-black/80">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-gray-100 hover:text-red-400"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-semibold text-green-500">AI Assistant</h1>
      </div>
      <div className="flex flex-1 w-full max-w-7xl mx-auto px-2 py-4 gap-4 flex-col md:flex-row relative">
        <Sidebar
          chats={chatHistory}
          activeChat={activeChat}
          onSelectChat={handleSelectChat}
          handleNewChat={handleNewChat}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <ChatArea
          messages={messages}
          typing={typing}
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          setMessages={setMessages}
          activeChat={activeChat}
          handleNewChat={handleNewChat}
        />
      </div>
    </div>
  );
};

export default Home;
