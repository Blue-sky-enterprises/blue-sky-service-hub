import axios from "axios";
import Cookies from "js-cookie";

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
    // Attach auth token here if available
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle global errors, e.g., 401 Unauthorized
    if (error.response?.status === 401) {
      Cookies.remove("access_token");
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);
