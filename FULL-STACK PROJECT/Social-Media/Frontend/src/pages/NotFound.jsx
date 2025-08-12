import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white text-center p-6">
      <h1 className="text-8xl font-bold text-blue-500 drop-shadow-glow">404</h1>
      <p className="text-xl text-gray-400 mt-4">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-glow"
      >
        Go Home
      </Link>
    </div>
  );
}
