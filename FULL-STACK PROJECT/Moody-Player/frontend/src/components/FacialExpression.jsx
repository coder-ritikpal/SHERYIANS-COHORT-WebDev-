import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';

export default function FacialExpressionApp({ setSongs }) {
  const videoRef = useRef();
  const [expression, setExpression] = useState('');

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error('Webcam error:', err));
    };

    loadModels().then(startVideo);
  }, []);

  const handleDetectExpression = async () => {
    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (detection && detection.expressions) {
      const expressions = detection.expressions;
      const mostLikely = Object.entries(expressions).reduce((a, b) => (a[1] > b[1] ? a : b));
      const [expName, score] = mostLikely;

      const emojiMap = {
        happy: '😊',
        sad: '😢',
        angry: '😠',
        surprised: '😲',
        fearful: '😨',
        disgusted: '🤢',
        neutral: '😐',
      };

      setExpression(`${expName.toUpperCase()} ${emojiMap[expName] || ''} (${(score * 100).toFixed(1)}%)`);

      try {
        const res = await axios.get(`https://moddy-player-backend.onrender.com=${expName.toLowerCase()}`);
        setSongs(res.data.songs);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    } else {
      setExpression('No face detected 😕');
    }
  };

  return (
    <div
      className=" bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 sm:px-6 py-10 sm:py-16 flex flex-col items-center "
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1561601005-ed71cd01155b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA5fHxsaWdodG5pbmclMjBwYXJ0eXxlbnwwfHwwfHx8MA%3D%3D')`,
        backgroundSize: 'cover',
        backgroundBlendMode: 'overlay',
      }}
    >
      <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-center drop-shadow-lg">🎭 Moody Musics</h1>

      <div className="flex flex-col lg:flex-row items-center gap-10 w-full max-w-6xl bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-10 shadow-2xl border border-white/10">
        {/* Camera */}
       <div className="relative w-full max-w-[220px] sm:max-w-[260px] aspect-square rounded-full shadow-[0_0_30px_rgba(0,255,135,0.2)] ring-2 ring-green-400 overflow-hidden">
  <video
    ref={videoRef}
    autoPlay
    muted
    playsInline
    className="w-full h-full object-cover"
  />
  
</div>

        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-5">
          <p className="text-base sm:text-lg leading-relaxed text-gray-300">
            Our AI detects your facial expression and finds songs that match your current mood.
            Just look into the camera and hit the button below to begin!
          </p>

          <button
            onClick={handleDetectExpression}
            className="px-6 sm:px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-base sm:text-lg font-semibold shadow-md transition-all duration-300 hover:scale-105"
          >
            🎯 Detect My Mood
          </button>

          <div className="text-xl sm:text-2xl font-semibold text-green-950 mt-4 break-words min-h-[2.5rem]">
            {expression}
          </div>
        </div>
      </div>
    </div>
  );
}
