// pages/Home.jsx
import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your backend API
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/posts");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <p className="text-lg animate-pulse">Loading posts...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <p className="text-lg">No posts available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]">
        Latest Posts
      </h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
