import React, { useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import axiosInstance from '../services/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/authSlice';
import { toast } from 'react-toastify';
import socket from '../services/socket';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axiosInstance.post('/auth/register', {
        firstName,
        lastName,
        username,
        email,
        password,
      });

      dispatch(loginSuccess({
        id: res.data.user.id,
        username,
        email,
        firstName,
        lastName,
      }));

      toast.success('Registration successful!');
      // Fetch chats and select first chat after register
      socket.connect();
      socket.emit('fetch-chats');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-black via-red-950 to-orange-900 text-gray-100 overflow-hidden px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-black/80 border border-red-800 p-6 sm:p-8 rounded-2xl shadow-[0_0_20px_rgba(255,80,50,0.6)] w-full max-w-xs sm:max-w-sm flex flex-col gap-3 mx-auto"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
          Register
        </h2>

        {error && <div className="mb-2 text-red-400 text-center text-sm">{error}</div>}

        <input
          type="text"
          placeholder="First Name"
          className="w-full px-3 py-2 rounded-lg bg-zinc-900/70 text-gray-100 border border-red-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-600 outline-none text-sm transition"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Last Name"
          className="w-full px-3 py-2 rounded-lg bg-zinc-900/70 text-gray-100 border border-red-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-600 outline-none text-sm transition"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Username"
          className="w-full px-3 py-2 rounded-lg bg-zinc-900/70 text-gray-100 border border-red-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-600 outline-none text-sm transition"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 rounded-lg bg-zinc-900/70 text-gray-100 border border-red-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-600 outline-none text-sm transition"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        {/* Password with eye toggle */}
        <div className="relative w-full">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full px-3 py-2 rounded-lg bg-zinc-900/70 text-gray-100 border border-red-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-600 outline-none text-sm transition pr-10"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-400 text-xl"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <HiEyeOff /> : <HiEye />}
          </button>
        </div>

        <button 
          type="submit"
          className="w-full py-2 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold hover:scale-105 hover:shadow-[0_0_15px_rgba(255,100,50,0.8)] transition text-sm"
        >
          Register
        </button>

        <div className="mt-3 text-center text-sm">
          <span>Already have an account? </span>
          <button
            type="button"
            className="text-orange-400 hover:underline hover:text-red-400 transition"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
