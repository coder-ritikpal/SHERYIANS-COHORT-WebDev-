import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../services/axios";

// --- Async Thunks ---
export const fetchChats = createAsyncThunk(
  "chat/fetchChats",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth?.user?.token;
      const res = await axiosInstance.get("/chats", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.data; // array of chats
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch chats");
    }
  }
);

export const createChat = createAsyncThunk(
  "chat/createChat",
  async (title, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth?.user?.token;
      const res = await axiosInstance.post(
        "/chats",
        { title },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      return res.data.chat;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to create chat");
    }
  }
);

// --- Slice ---
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    activeChat: null,
    loading: false,
    error: null,
  },
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
    resetChat: (state) => {
      state.chats = [];
      state.activeChat = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.chats = [action.payload, ...state.chats]; // prepend new chat
        state.activeChat = action.payload._id || action.payload.id;
      });
  },
});

export const { setActiveChat, resetChat } = chatSlice.actions;
export default chatSlice.reducer;
