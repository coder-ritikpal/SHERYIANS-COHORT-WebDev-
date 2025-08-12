import React from "react";

export default function PostCard({ post, onDelete }) {
  return (
    <div className="bg-gray-900 p-5 rounded-xl shadow-lg hover:shadow-glow transition duration-300 border border-gray-800">
      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt={post.caption || "Post image"}
          className="w-full h-56 object-cover rounded-lg mb-4"
        />
      )}

      {/* Caption */}
      <p className="text-gray-200 mb-3">{post.caption}</p>

      {/* Date */}
      <p className="text-gray-500 text-sm mb-4">
        {new Date(post.createdAt).toLocaleString()}
      </p>

      {/* Buttons */}
      <div className="flex justify-between items-center">
        <button
          className="px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-white shadow-glow"
          onClick={() => alert("View post feature coming soon")}
        >
          View
        </button>
        {onDelete && (
          <button
            onClick={() => onDelete(post._id)}
            className="px-4 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-white shadow-glow"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
