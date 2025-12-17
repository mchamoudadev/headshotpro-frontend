
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}


export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,      // HTTP status code (404, 500, etc.)
    public data?: unknown        // Additional error data from backend
  ) {
    super(message);  // Calls Error constructor, sets this.message
    
 
    this.name = 'ApiError';
  }
}


const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Automatically sends cookies (accessToken, refreshToken)
  headers: {
    'Content-Type': 'application/json',
  },
});



axiosInstance.interceptors.response.use(
  // Success handler - just pass through the response
  (response: AxiosResponse<ApiResponse>) => {
    return response;
  },
  // Error handler - handle 401 and transform other errors
  async (error: AxiosError<ApiResponse>) => {
    const originalRequest = error.config as any;


    if (error.response?.status === 401 && !originalRequest._retry) {
      // Check if another request is already refreshing the token
    
      originalRequest._retry = true; // Prevent infinite retry loops
 

      try {
       
        await axiosInstance.post('/auth/refresh-token');
      
        // Retry the original request that failed
        return axiosInstance(originalRequest);
      } catch (refreshError) {
       
        // Redirect to login page
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        
        throw new ApiError('Session expired. Please login again.', 401, refreshError);
      }
    }

    // Backend responded with error (400, 404, 500, etc.)
    if (error.response) {
      const { data, status } = error.response;
      throw new ApiError(
        data?.message || error.message || 'An error occurred',
        status,
        data
      );
    }

    // Network error (no response from server)
    // Could be: no internet, timeout, CORS issue, etc.
    throw new ApiError(
      error.message || 'Network error',
      0, // Status 0 indicates network error
      error
    );
  }
);


export const api = {

  get: <T = unknown>(endpoint: string, config?: AxiosRequestConfig) =>
    axiosInstance.get<ApiResponse<T>>(endpoint, config).then((res) => res.data.data as T),

 
  post: <T = unknown>(endpoint: string, body?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.post<ApiResponse<T>>(endpoint, body, config).then((res) => res.data.data as T),

  put: <T = unknown>(endpoint: string, body?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.put<ApiResponse<T>>(endpoint, body, config).then((res) => res.data.data as T),

  delete: <T = unknown>(endpoint: string, config?: AxiosRequestConfig) =>
    axiosInstance.delete<ApiResponse<T>>(endpoint, config).then((res) => res.data.data as T),
};
