import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken") || localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
                try {
                    const response = await axios.post(`${BASE_URL}/api/v1/auth/refresh-token`, {
                        refreshToken: refreshToken
                    });

                    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

                    localStorage.setItem("accessToken", newAccessToken);
                    localStorage.setItem("refreshToken", newRefreshToken);

                    // Update default header
                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

                    processQueue(null, newAccessToken);

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axiosInstance(originalRequest);

                } catch (refreshError) {
                    processQueue(refreshError, null);
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    localStorage.removeItem("token"); // Remove old token if exists
                    window.location.href = "/login";
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            } else {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("token"); // Remove old token if exists
                window.location.href = "/login";
            }
        }

        if (error.response?.status === 500) {
            console.log("Server error. Please try again later.");
        } else if (error.code === "ECONNABORTED") {
            console.error("Request timeout. Please try again.");
        }

        return Promise.reject(error);
    }
)

export default axiosInstance;