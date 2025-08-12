import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 shadow-glow text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="text-lg font-semibold drop-shadow-glow text-white">
          📸 GlowGram
        </div>

        {/* Links */}
        <div className="flex gap-6">
          <a href="/about" className="hover:text-blue-400 transition-colors">
            About
          </a>
          <a href="/privacy" className="hover:text-blue-400 transition-colors">
            Privacy Policy
          </a>
          <a href="/contact" className="hover:text-blue-400 transition-colors">
            Contact
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-xl">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 drop-shadow-glow"
          >
            <FaGithub />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 drop-shadow-glow"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 drop-shadow-glow"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Bottom text */}
      <div className="text-center text-gray-500 text-sm py-3 border-t border-gray-800">
        © {new Date().getFullYear()} GlowGram. All rights reserved.
      </div>
    </footer>
  );
}
