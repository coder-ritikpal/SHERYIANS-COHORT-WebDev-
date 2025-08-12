import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // adjust path

export default function Navbar() {
  const { user, logout } = useContext(AuthContext) || {};

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">My App</h1>
      <div>
        {user ? (
          <>
            <span className="mr-4">Hi, {user.username}</span>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <a href="/login" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">
            Login
          </a>
        )}
      </div>
    </nav>
  );
}
