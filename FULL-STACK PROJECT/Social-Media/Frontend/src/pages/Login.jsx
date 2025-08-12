// pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        credentials: "include", // important for cookies
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
      } else {
        navigate("/"); // redirect to home after login
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-black via-gray-900 to-black text-white px-4">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-6 text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.6)]">
          Login
        </h1>

        {error && (
          <p className="mb-4 text-red-500 text-center bg-red-500/10 p-2 rounded-md">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md bg-black border border-gray-700 focus:border-cyan-400 focus:outline-none text-white"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md bg-black border border-gray-700 focus:border-cyan-400 focus:outline-none text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
