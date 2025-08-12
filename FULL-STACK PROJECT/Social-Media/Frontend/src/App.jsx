// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyPosts from "./pages/MyPosts";
import NotFound from "./pages/NotFound";
import PostCard from "./components/PostCard";
import Loader from "./components/Loader";

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // short loading effect
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <>
      <Navbar />
      {loading && <Loader />}
      <div className="pt-16 min-h-screen bg-black text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts/:id" element={<PostCard />} />
          <Route path="/my-posts" element={<MyPosts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
