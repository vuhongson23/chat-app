import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// Tạo axios instance mới
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Lấy data từ local storage
const getDataLocal = (key: string): any => {
  const data = localStorage.getItem(key);
  const parseData = data && JSON.parse(data);

  return parseData;
};

// Cấu hình interceptor
// Request
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const { accessToken } = getDataLocal("TOKEN");

      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Xử lý lỗi 401 và token hết hạn
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Lấy refresh token từ local storage
        const { refreshToken } = getDataLocal("TOKEN");

        if (refreshToken) {
          // logic refresh access token
        }
      } catch (refreshError) {
        localStorage.clear();

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

// Tạo instance cho các API không cần xác thực
export const axiosPublic = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
