import axios from "axios";

export type ApiResponse<T> = {
  data: T;
};

// Uncomment this if you plan to use authentication in the future
// const getAuthToken = (): string | null => {
//   try {
//     const token = localStorage.getItem("persist:root");
//     if (!token) return null;

//     const sessionString = JSON.parse(token)?.session;
//     const sessionObject = sessionString ? JSON.parse(sessionString) : null;

//     return sessionObject?.session || null;
//   } catch (error) {
//     console.error("Failed to parse auth token:", error);
//     return null;
//   }
// };

export const client = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (for adding auth token in the future)
// client.interceptors.request.use((config) => {
//   const token = getAuthToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// Response Interceptor for error handling
client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error);
    return Promise.reject(error);
  }
);

export default client;
