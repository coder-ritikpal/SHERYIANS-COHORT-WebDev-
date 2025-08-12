// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // to allow cookies
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Save user in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-6 text-cyan-400 drop-shadow-lg">
          Create Account
        </h1>

        {error && (
          <div className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-gray-300">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 text-black font-semibold py-2 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.8)]"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-cyan-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
