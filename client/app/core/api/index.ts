import axios from "axios";

// Constants could be imported from core/constants
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Setup interceptors
api.interceptors.request.use(
  (config) => {
    // Attach auth token here if needed
    // const token = getCookie("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle global errors, e.g., 401 Unauthorized
    if (error.response?.status === 401) {
      // e.g. logout() or refresh token
    }
    return Promise.reject(error);
  }
);
