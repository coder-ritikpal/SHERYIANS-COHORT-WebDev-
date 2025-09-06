import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import gsap from "gsap";

const Sidebar = ({ sidebarOpen, setSidebarOpen, chats, activeChat, onSelectChat, handleNewChat }) => {
  const overlayRef = useRef(null);
  const sidebarRef = useRef(null);

  // GSAP animations for mobile sidebar
  useEffect(() => {
    if (sidebarOpen) {
      gsap.to(overlayRef.current, {
        opacity: 0.5,
        pointerEvents: "auto",
        duration: 0.3,
      });
      gsap.fromTo(
        sidebarRef.current,
        { x: "-100%" },
        { x: "0%", duration: 0.4, ease: "power3.out" }
      );
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
      });
      gsap.to(sidebarRef.current, {
        x: "-100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [sidebarOpen]);

  // Chat list renderer
  const renderChats = () =>
    chats.map((chat, idx) => (
      <li key={chat._id || idx}>
        <button
          className={`w-full text-left px-3 py-2 rounded-lg transition text-sm sm:text-base ${
            activeChat === chat._id
              ? "bg-red-600 text-white"
              : "bg-gray-700 text-gray-200 hover:bg-gray-600"
          }`}
          onClick={() => onSelectChat(chat._id)}
        >
          {chat.title || `Chat ${chat._id}`}
        </button>
      </li>
    ));

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-black/80 border border-red-800 rounded-2xl shadow-[0_0_20px_rgba(255,80,50,0.6)] p-4 flex-col overflow-y-auto h-[calc(100vh-80px)]">
        <h2 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
          Chats
        </h2>
        <ul className="flex-1 space-y-2 overflow-y-auto">
          {renderChats()}
        </ul>
        <button
          onClick={handleNewChat}
          className="mt-4 px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-orange-500 transition text-sm sm:text-base w-full"
        >
          + New Chat
        </button>
      </aside>

      {/* Mobile Sidebar + Overlay */}
      <div className="md:hidden">
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black z-40 opacity-0 pointer-events-none"
          onClick={() => setSidebarOpen(false)}
        ></div>

        <div
          ref={sidebarRef}
          className="fixed inset-y-0 left-0 w-[70%] bg-black/95 z-50 p-4 flex flex-col"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
              Chats
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-100 hover:text-red-400"
            >
              <X size={24} />
            </button>
          </div>

          <ul className="flex-1 space-y-2 overflow-y-auto">
            {chats.map((chat, idx) => (
              <li key={chat._id || idx}>
                <button
                  className={`w-full text-left px-3 py-2 rounded-lg transition text-sm sm:text-base ${
                    activeChat === chat._id
                      ? "bg-red-600 text-white"
                      : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                  }`}
                  onClick={() => {
                    onSelectChat(chat._id);
                    setSidebarOpen(false);
                  }}
                >
                  {chat.title || `Chat ${chat._id}`}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={handleNewChat}
            className="mt-4 px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-orange-500 transition text-sm sm:text-base w-full"
          >
            + New Chat
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
