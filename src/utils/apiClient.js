import axios from "axios";

const isDevelopment = process.env.NODE_ENV === "development";

const API_BASE_URL = isDevelopment
  ? process.env.REACT_APP_API_BASE_URL || "http://localhost:3003"
  : "https://api.sieiitm.org";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

let refreshPromise = null;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (
      status !== 401 &&
      status !== 403 &&
      originalRequest?._retry
    ) {
      return Promise.reject(error);
    }

    const isAuthEndpoint =
      originalRequest?.url?.includes("/api/v1/login") ||
      originalRequest?.url?.includes("/api/v1/auth/") ||
      originalRequest?.url?.includes("/api/v1/forgot-password");

    if (
      (status === 401 || status === 403) &&
      !originalRequest?._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = apiClient
          .post("/api/v1/auth/refresh")
          .then((res) => res)
          .catch((refreshError) => {
            throw refreshError;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      try {
        await refreshPromise;
        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { API_BASE_URL, apiClient };
