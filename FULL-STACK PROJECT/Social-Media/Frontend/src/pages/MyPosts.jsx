import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts/mine");
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;

    try {
      await fetch(`/api/posts/${id}`, { method: "DELETE" });
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <h1 className="text-3xl font-bold text-white mb-6">My Posts</h1>

      {posts.length === 0 ? (
        <p className="text-gray-400">You haven’t created any posts yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
