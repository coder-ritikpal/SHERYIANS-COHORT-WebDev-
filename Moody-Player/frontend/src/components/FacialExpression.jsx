import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

export default function FacialExpressionApp() {
  const videoRef = useRef();
  const [expression, setExpression] = useState('');

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Webcam error:", err));
    };

    loadModels().then(startVideo);
  }, []);

  const handleDetectExpression = async () => {
    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (detection && detection.expressions) {
      const expressions = detection.expressions;
      const mostLikely = Object.entries(expressions).reduce((a, b) =>
        a[1] > b[1] ? a : b
      );
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
    } else {
      setExpression('No face detected 😕');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">🎭 Facial Expression Detector</h1>

      <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-5xl">
        <div className="w-full md:w-1/2 flex justify-center">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-lg border border-gray-700 shadow"
          />
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="text-lg mb-4">
            This app uses your webcam and AI to detect your current facial expression using machine learning models.
            Click the button below to analyze your face and see what emotion you're expressing!
          </p>

          <button
            onClick={handleDetectExpression}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 transition-colors rounded-lg text-lg font-medium"
          >
            Detect Expression
          </button>

          <div className="mt-4 text-xl font-semibold text-green-400">
            {expression}
          </div>
        </div>
      </div>
    </div>
  );
}
