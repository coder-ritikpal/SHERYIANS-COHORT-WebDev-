import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';

const Navbar = () => {
  const { isLoggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-black/90 backdrop-blur-md shadow-md border-b border-red-800">
      {/* Sidebar stays on the left */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
        Mitra AI
      </h1>

      {/* Logout */}
      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="px-3 py-1 rounded-lg text-yellow-200 bg-red-900 hover:bg-red-400 transition text-sm sm:text-base md:text-base"
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Navbar;
