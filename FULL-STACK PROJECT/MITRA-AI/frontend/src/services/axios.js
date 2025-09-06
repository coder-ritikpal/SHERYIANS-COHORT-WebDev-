import axios from "axios";

// Env se base URL pick karo
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
});

export default axiosInstance;
