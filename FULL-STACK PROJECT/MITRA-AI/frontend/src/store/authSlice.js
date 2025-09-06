import { createSlice } from '@reduxjs/toolkit';
import socket from "../services/socket";

const storedUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
  isLoggedIn: storedUser ? true : false,
  user: storedUser || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
      socket.connect();   // ✅ connect socket after login
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem('user');
      socket.disconnect(); // ✅ disconnect socket on logout
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
