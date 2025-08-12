import { useState } from 'react';
import API from '../utils/api';

export default function CreatePost() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await API.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Post created!');
      console.log(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-glow text-white">
      <h2 className="text-2xl font-bold mb-4 text-blue-400 drop-shadow-glow">Create Post</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => {
          setImage(e.target.files[0]);
          setPreview(URL.createObjectURL(e.target.files[0]));
        }} className="mb-4 w-full p-2 bg-gray-800 border border-blue-500 rounded shadow-glow" />
        {preview && (
          <img src={preview} alt="Preview" className="mb-4 rounded border border-blue-500 shadow-glow" />
        )}
        <button className="bg-green-500 hover:bg-green-600 p-2 w-full rounded shadow-glow">
          Upload
        </button>
      </form>
    </div>
  );
}
