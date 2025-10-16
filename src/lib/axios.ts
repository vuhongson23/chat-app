import { getDataLocal } from "@/lib/utils";
import { OptionsType, RequestParamsType } from "@/types/types";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// Tạo axios instance mới
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Tạo instance cho các API không cần xác thực
export const axiosPublic = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

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
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Xử lý lỗi 401 và token hết hạn
    if (error.response?.status === 500 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Lấy refresh token từ local storage
        const { refreshToken } = getDataLocal("TOKEN");

        // Tạo access token mới nếu có refresh token từ local storage
        if (refreshToken) {
          const response = await axiosPublic.post("/auth/refresh-token", {
            refreshToken: refreshToken,
          });

          // Lưu access token mới vào local storage
          const token = {
            refreshToken,
            accessToken: response?.data.accessToken,
          };
          localStorage.setItem("TOKEN", JSON.stringify(token));

          // Request lại với access token mới
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token.accessToken}`;
          }

          return axiosInstance(originalRequest);
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

//=================================API method=====================================
// Auth API method
export const get = async (
  requestParams: RequestParamsType,
  options?: OptionsType
) => {
  try {
    const response = await axiosInstance.get(requestParams.url, {
      params: requestParams.params,
      timeout: options?.timeout || 10000,
      headers: {
        "Content-Type": options?.contentType || "application/json",
      },
    });

    return response;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const post = async (
  requestParams: RequestParamsType,
  options?: OptionsType
) => {
  try {
    const response = await axiosInstance.post(
      requestParams.url,
      requestParams.params,
      {
        timeout: options?.timeout || 10000,
        headers: {
          "Content-Type": options?.contentType || "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const put = async (
  requestParams: RequestParamsType,
  options?: OptionsType
) => {
  try {
    const response = await axiosInstance.put(
      requestParams.url,
      requestParams.params,
      {
        timeout: options?.timeout || 10000,
        headers: {
          "Content-Type": options?.contentType || "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const deleteApi = async (
  requestParams: RequestParamsType,
  options?: OptionsType
) => {
  try {
    const response = await axiosInstance.delete(requestParams.url, {
      params: requestParams.params,
      timeout: options?.timeout || 10000,
    });

    return response;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

// Public API method
export const getNoAuth = async (
  requestParams: RequestParamsType,
  options?: OptionsType
) => {
  try {
    const response = await axiosPublic.get(requestParams.url, {
      params: requestParams.params,
      timeout: options?.timeout || 10000,
      headers: {
        "Content-Type": options?.contentType || "application/json",
      },
    });

    return response;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const postNoAuth = async (
  requestParams: RequestParamsType,
  options?: OptionsType
) => {
  try {
    const response = await axiosPublic.post(
      requestParams.url,
      requestParams.params,
      {
        timeout: options?.timeout || 10000,
        headers: {
          "Content-Type": options?.contentType || "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
