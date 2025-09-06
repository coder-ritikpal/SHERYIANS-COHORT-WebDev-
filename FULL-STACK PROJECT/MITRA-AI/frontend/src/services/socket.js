import { io } from "socket.io-client";

// Env se base URL pick karo
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const socket = io(API_BASE_URL, {
  withCredentials: true,
  transports: ["websocket"],
  autoConnect: false,
});

export default socket;
