import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause } from "react-icons/fa";

const MoodSong = ({ Songs }) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateTime);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateTime);
    };
  }, []);

  const handlePlayPause = (index, url) => {
    const audio = audioRef.current;

    if (currentIndex === index) {
      if (!audio.paused) {
        audio.pause();
      } else {
        audio.play().catch((err) => console.error("Resume failed:", err));
      }
    } else {
      audio.pause();
      audio.src = url;
      audio.play().catch((err) => console.error("Play failed:", err));
      setCurrentIndex(index);

      audio.onended = () => {
        setCurrentIndex(null);
        setCurrentTime(0);
        setDuration(0);
      };
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  return (
    <div
      className="min-h-screen px-4 py-10 bg-gradient-to-br from-black via-gray-900 to-black text-white"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1543958861-9c555a270d93?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fGxpZ2h0bmluZyUyMHBhcnR5fGVufDB8fDB8fHww')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center drop-shadow-md">🎵 Vibe with Our Playlist</h2>

      <div className="space-y-8 max-w-3xl mx-auto">
        {Songs.map((song, index) => (
          <div
            key={index}
            className={`flex items-center justify-between gap-6 sm:gap-10 bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-xl 
              transition-all duration-300 hover:scale-[1.02] border ${
                currentIndex === index ? "border-green-400" : "border-white/10"
              }`}
          >
            {/* Left: Song Info + Seek + Timer + Volume */}
            <div className="flex-1 w-full">
              <h3 className="text-xl font-semibold text-white">{song.title}</h3>
              <p className="text-sm text-gray-300">{song.artist}</p>

              {currentIndex === index && (
                <>
                  <span className="text-green-400 text-sm font-medium mt-1 inline-block">Now Playing 🎶</span>

                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full mt-3 appearance-none h-2 bg-green-400 rounded-full cursor-pointer"
                  />

                  <div className="text-xs text-gray-300 mt-1 flex justify-between font-mono">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <label className="text-xs">🔊</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-28 accent-green-400"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Right: Play/Pause Button */}
            <div className="min-w-[60px] flex items-center justify-center">
              <button
                className="text-3xl text-white hover:text-green-400 transition"
                onClick={() => handlePlayPause(index, song.audio)}
              >
                {currentIndex === index && !audioRef.current.paused ? <FaPause /> : <FaPlay />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodSong;
