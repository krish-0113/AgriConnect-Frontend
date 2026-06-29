import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 Unauthorized and refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and we haven't already retried this request
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          // If we are mocking APIs, simulate token refresh
          if (USE_MOCK_API) {
            const mockAccessToken = `mock-access-token-${Date.now()}`;
            const mockRefreshToken = `mock-refresh-token-${Date.now()}`;
            localStorage.setItem('authToken', mockAccessToken);
            localStorage.setItem('refreshToken', mockRefreshToken);

            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${mockAccessToken}`;
            }
            return axiosInstance(originalRequest);
          }

          // Real backend call
          const response = await axios.post(
            `${API_BASE_URL}/auth/refresh-token`,
            { refreshToken }
          );

          const newAccessToken = response.data.token;
          const newRefreshToken = response.data.refreshToken;

          localStorage.setItem('authToken', newAccessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // If refresh fails, clear storage and log out
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('authUser');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token, log out
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('authUser');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
