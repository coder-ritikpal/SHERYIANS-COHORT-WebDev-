import React, { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { HiMenu, HiX } from 'react-icons/hi';

const navItems = [
  { label: 'Home', to: '#home' },
  { label: 'About', to: '#about' },
  { label: 'Skills', to: '#skills' },
  { label: 'Project', to: '#project' },
  { label: 'Contact', to: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState(window.location.hash || '#home');

  const smoothScroll = (el) => {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Update active link on hash change or scroll
  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash || '#home');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <header className="bg-blend-overlay bg-black text-white shadow-md fixed top-0 left-0 right-0 z-50 ">
      <div className="flex justify-between items-center p-4 md:px-10">
        <h1 className="text-sky-500 glow-text text-2xl font-semibold font-[Algerian]">Portfolio</h1>

        <button
          className="md:hidden text-3xl text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10 text-xl font-[Algerian]">
          {navItems.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              scroll={smoothScroll}
              onClick={() => setActiveHash(to)}
              className={`transition-all duration-300 ease-in-out hover:text-green-400 hover:scale-110 ${
                activeHash === to ? 'text-green-400' : ''
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="flex flex-col items-center md:hidden space-y-5 py-4 text-xl font-[Algerian] bg-black">
          {navItems.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              scroll={smoothScroll}
              onClick={() => {
                setActiveHash(to);
                setIsOpen(false);
              }}
              className={`transition-all duration-300 ease-in-out hover:text-green-400 ${
                activeHash === to ? 'text-green-400' : ''
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
