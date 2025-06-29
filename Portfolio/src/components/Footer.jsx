// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
   <footer className="bg-gray-900 text-white px-4 sm:px-6 py-4">
  <div className="max-w-7xl mx-auto text-center border-t border-gray-700 pt-4">
    <p className="text-sm text-white">
      © {new Date().getFullYear()} Made with <span className="text-pink-400">Love 💝</span> by Ritik Pal
    </p>
  </div>
</footer>

  );
};

export default Footer;
