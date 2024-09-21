import { ACCESS_TOKEN_STORAGE_KEY } from "@/constants/auth.constant";
import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL:
    process.env.NODE_ENV === "production" ? "/api" : "//localhost:3000/api",
});

api.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) || null;

    // removing the first and last character of the token, which are quotes
    if (token) {
      token = token?.slice(1, -1);
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if it's a 401 error (access token expired)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      alert("retring...");

      try {
        // Send a request to refresh the access token
        const response = await api.post(
          "/refresh-token",
          {},
          { withCredentials: true } // Send cookies with the refresh token
        );

        // Store the new access token
        const newAccessToken = response.data.accessToken;
        localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, newAccessToken);

        alert(newAccessToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh token fails, log out the user or handle as needed
        console.log("Refresh token failed, logging out");
        localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
        window.location.href = "/auth/login"; // Redirect to login page
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
