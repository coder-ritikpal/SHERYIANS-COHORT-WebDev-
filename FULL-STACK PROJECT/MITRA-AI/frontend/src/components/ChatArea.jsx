import React, { useRef, useEffect } from "react";
import socket from '../services/socket';

const ChatArea = ({
  messages,
  typing,
  input,
  setInput,
  handleSend,
  setMessages,
  activeChat,
  handleNewChat, // ✅ add this prop
}) => {
  const messagesEndRef = useRef(null);

  // Scroll always to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Join chat
  useEffect(() => {
    if (!activeChat) return;
    socket.emit('join-chat', activeChat);
    const handleChatMessages = (data) => {
      if (data && Array.isArray(data.messages)) setMessages(data.messages);
      else if (Array.isArray(data)) setMessages(data);
    };
    socket.on('chat-messages', handleChatMessages);
    return () => {
      socket.off('chat-messages', handleChatMessages);
    };
  }, [activeChat, setMessages]);

  return (
    <main className="flex-1 flex flex-col bg-black/80 border border-red-800 rounded-2xl shadow-[0_0_20px_rgba(255,80,50,0.6)] h-[calc(100vh-80px)] chat-scroll">
      
      {/* ✅ New Chat button inside ChatArea */}
      <div className="p-3 border-b border-red-800 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
          Chat Area
        </h2>
        <button
          onClick={handleNewChat}
          className="px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-orange-500 transition text-sm sm:text-base"
        >
          + New Chat
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
        {!activeChat && (
          <p className="text-gray-400 text-center mt-8">
            No chat fetched. Please create one.
          </p>
        )}
        {activeChat && messages.length === 0 && !typing && (
          <p className="text-gray-400 text-center mt-8">
            No messages yet...
          </p>
        )}
        {activeChat && messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-xs break-words text-sm sm:text-base ${
                msg.sender === "user"
                  ? "bg-blue-900 text-white"
                  : "bg-green-900 text-gray-100"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Typing */}
        {activeChat && typing && (
          <div className="flex justify-start px-4 py-2 rounded-xl max-w-xs bg-gray-700 text-gray-100 text-sm sm:text-base">
            <span className="flex gap-1">
              <span className="animate-bounce">•</span>
              <span className="animate-bounce animation-delay-200">•</span>
              <span className="animate-bounce animation-delay-400">•</span>
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {activeChat && (
        <form
          onSubmit={handleSend}
          className="p-4 bg-black/90 border-t border-red-800 flex gap-2 rounded-b-2xl"
        >
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-lg bg-gray-950 text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-orange-500 transition text-sm sm:text-base"
          >
            Send
          </button>
        </form>
      )}
    </main>
  );
};

export default ChatArea;
