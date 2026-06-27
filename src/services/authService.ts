import axios from 'axios';
import { User } from '../store/slices/authSlice';
import { USE_MOCK_API } from './apiService';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest extends LoginRequest {
  name: string;
  role: 'worker' | 'company' | 'admin';
  phone?: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

async function login(credentials: LoginRequest): Promise<AuthResponse> {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: `user-${Math.random()}`,
          email: credentials.email,
          name: credentials.email.split('@')[0],
          role: 'worker',
          phone: '+1-555-0000',
        };
        const mockToken = `mock-token-${Date.now()}`;
        resolve({ user: mockUser, token: mockToken });
      }, 500);
    });
  }

  try {
    const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error('Login failed. Please check your credentials.');
  }
}

async function register(data: RegisterRequest): Promise<AuthResponse> {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: `user-${Math.random()}`,
          email: data.email,
          name: data.name,
          role: data.role,
          phone: data.phone,
        };
        const mockToken = `mock-token-${Date.now()}`;
        resolve({ user: mockUser, token: mockToken });
      }, 500);
    });
  }

  try {
    const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/register`, data);
    return response.data;
  } catch (error) {
    throw new Error('Registration failed. Please try again.');
  }
}

async function logout(): Promise<void> {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 300);
    });
  }

  try {
    await axios.post(`${API_BASE_URL}/auth/logout`);
  } catch (error) {
    console.error('Logout error:', error);
  }
}

async function getCurrentUser(): Promise<User | null> {
  if (USE_MOCK_API) {
    const token = localStorage.getItem('authToken');
    if (token) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: 'mock-user',
            email: 'user@example.com',
            name: 'John Doe',
            role: 'worker',
          });
        }, 300);
      });
    }
    return null;
  }

  try {
    const response = await axios.get<User>(`${API_BASE_URL}/auth/me`);
    return response.data;
  } catch (error) {
    return null;
  }
}

export const authService = {
  login,
  register,
  logout,
  getCurrentUser,
};
