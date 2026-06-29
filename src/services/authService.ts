import axiosInstance, { USE_MOCK_API } from './apiService';
import { User } from '../store/slices/authSlice';

// Temporary mock store for registration details before verification
interface PendingUser {
  name: string;
  email: string;
  password?: string;
  role: 'worker' | 'company' | 'admin';
  phone?: string;
}

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
  refreshToken: string;
}

// Simple in-memory storage for mocks
let mockPendingUser: PendingUser | null = null;
let mockRegisteredUsers: Array<User & { password?: string }> = [
  {
    id: 'worker-1',
    email: 'worker@agriconnect.com',
    name: 'Ramesh Kumar',
    role: 'worker',
    phone: '9876543210',
    password: 'password123',
  },
  {
    id: 'company-1',
    email: 'farm@agriconnect.com',
    name: 'Green Valley Farms',
    role: 'company',
    phone: '9876543211',
    password: 'password123',
  },
  {
    id: 'admin-1',
    email: 'admin@agriconnect.com',
    name: 'Agri Admin',
    role: 'admin',
    phone: '9876543212',
    password: 'password123',
  },
];

async function login(credentials: LoginRequest): Promise<AuthResponse> {
  if (USE_MOCK_API) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const found = mockRegisteredUsers.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );
        if (found) {
          const mockToken = `mock-token-${Date.now()}`;
          const mockRefresh = `mock-refresh-${Date.now()}`;
          resolve({
            user: {
              id: found.id,
              email: found.email,
              name: found.name,
              role: found.role,
              phone: found.phone,
            },
            token: mockToken,
            refreshToken: mockRefresh,
          });
        } else if (credentials.email === 'demo@example.com' && credentials.password === 'demo123') {
          // Backward compatibility for demo login
          const mockToken = `mock-token-${Date.now()}`;
          const mockRefresh = `mock-refresh-${Date.now()}`;
          resolve({
            user: {
              id: 'demo-worker',
              email: 'demo@example.com',
              name: 'Demo Worker',
              role: 'worker',
              phone: '9999999999',
            },
            token: mockToken,
            refreshToken: mockRefresh,
          });
        } else {
          reject(new Error('Invalid email or password.'));
        }
      }, 800);
    });
  }

  try {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Login failed. Please check your credentials.';
    throw new Error(msg);
  }
}

async function register(data: RegisterRequest): Promise<{ message: string; email: string }> {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockPendingUser = {
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
          phone: data.phone,
        };
        console.log('Mock OTP Sent to:', data.email, 'Use OTP: 123456');
        resolve({
          message: 'OTP sent successfully to your email/phone.',
          email: data.email,
        });
      }, 800);
    });
  }

  try {
    const response = await axiosInstance.post<{ message: string; email: string }>('/auth/register', data);
    return response.data;
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Registration failed. Please try again.';
    throw new Error(msg);
  }
}

async function verifyOTP(email: string, otp: string): Promise<AuthResponse> {
  if (USE_MOCK_API) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (otp === '123456') {
          const userDetails = mockPendingUser && mockPendingUser.email === email
            ? mockPendingUser
            : { name: 'New Agri User', email, role: 'worker' as const, phone: '9999988888', password: 'password123' };
            
          const newUser: User & { password?: string } = {
            id: `user-${Math.random().toString(36).substr(2, 9)}`,
            email: userDetails.email,
            name: userDetails.name,
            role: userDetails.role,
            phone: userDetails.phone,
            password: userDetails.password,
          };
          
          mockRegisteredUsers.push(newUser);
          mockPendingUser = null;
          
          const mockToken = `mock-token-${Date.now()}`;
          const mockRefresh = `mock-refresh-${Date.now()}`;
          
          resolve({
            user: {
              id: newUser.id,
              email: newUser.email,
              name: newUser.name,
              role: newUser.role,
              phone: newUser.phone,
            },
            token: mockToken,
            refreshToken: mockRefresh,
          });
        } else {
          reject(new Error('Invalid OTP. Please enter 123456.'));
        }
      }, 800);
    });
  }

  try {
    const response = await axiosInstance.post<AuthResponse>('/auth/verify-otp', { email, otp });
    return response.data;
  } catch (error: any) {
    const msg = error.response?.data?.message || 'OTP verification failed. Please try again.';
    throw new Error(msg);
  }
}

async function resendOTP(email: string): Promise<{ message: string }> {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Mock OTP Resent to:', email, 'Use OTP: 123456');
        resolve({ message: 'A new OTP has been sent to your email.' });
      }, 500);
    });
  }

  try {
    const response = await axiosInstance.post<{ message: string }>('/auth/resend-otp', { email });
    return response.data;
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Failed to resend OTP.';
    throw new Error(msg);
  }
}

async function forgotPassword(email: string): Promise<{ message: string }> {
  if (USE_MOCK_API) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const found = mockRegisteredUsers.some((u) => u.email === email) || email === 'demo@example.com';
        if (found) {
          console.log('Mock Reset OTP Sent to:', email, 'Use OTP: 654321');
          resolve({ message: 'OTP code sent to your email for password reset.' });
        } else {
          reject(new Error('User with this email does not exist.'));
        }
      }, 800);
    });
  }

  try {
    const response = await axiosInstance.post<{ message: string }>('/auth/forgot-password', { email });
    return response.data;
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Failed to initiate forgot password.';
    throw new Error(msg);
  }
}

async function verifyResetOTP(email: string, otp: string): Promise<{ message: string; verified: boolean }> {
  if (USE_MOCK_API) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (otp === '654321') {
          resolve({ message: 'OTP verified successfully.', verified: true });
        } else {
          reject(new Error('Invalid Reset OTP. Please enter 654321.'));
        }
      }, 800);
    });
  }

  try {
    const response = await axiosInstance.post<{ message: string; verified: boolean }>('/auth/verify-reset-otp', { email, otp });
    return response.data;
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Failed to verify reset OTP.';
    throw new Error(msg);
  }
}

async function resetPassword(email: string, otp: string, data: any): Promise<{ message: string }> {
  if (USE_MOCK_API) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (otp === '654321') {
          const userIdx = mockRegisteredUsers.findIndex((u) => u.email === email);
          if (userIdx > -1) {
            mockRegisteredUsers[userIdx].password = data.password;
          }
          resolve({ message: 'Your password has been reset successfully.' });
        } else {
          reject(new Error('Invalid verification code. Password reset aborted.'));
        }
      }, 800);
    });
  }

  try {
    const response = await axiosInstance.post<{ message: string }>('/auth/reset-password', {
      email,
      otp,
      password: data.password,
      confirmPassword: data.confirmPassword
    });
    return response.data;
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Failed to reset password.';
    throw new Error(msg);
  }
}

async function getCurrentUser(): Promise<User | null> {
  if (USE_MOCK_API) {
    const token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('authUser');
    
    if (token) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (userStr) {
            resolve(JSON.parse(userStr));
          } else {
            resolve({
              id: 'mock-user-me',
              email: 'worker@agriconnect.com',
              name: 'Ramesh Kumar',
              role: 'worker',
              phone: '9876543210',
            });
          }
        }, 300);
      });
    }
    return null;
  }

  try {
    const response = await axiosInstance.get<User>('/auth/me');
    return response.data;
  } catch (error) {
    return null;
  }
}

async function logout(): Promise<void> {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 300);
    });
  }

  try {
    await axiosInstance.post('/auth/logout');
  } catch (error) {
    console.error('Logout API error:', error);
  }
}

async function completeProfile(role: 'worker' | 'company', profileData: any): Promise<{ message: string; user: User }> {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userStr = localStorage.getItem('authUser');
        let currentUser: User = userStr ? JSON.parse(userStr) : {
          id: 'mock-user-me',
          email: 'worker@agriconnect.com',
          name: 'Ramesh Kumar',
          role: role,
        };
        
        currentUser.phone = profileData.phone || currentUser.phone;
        currentUser.name = profileData.name || currentUser.name;
        
        localStorage.setItem('authUser', JSON.stringify(currentUser));
        
        resolve({
          message: 'Profile completed successfully!',
          user: currentUser,
        });
      }, 800);
    });
  }

  try {
    const endpoint = role === 'worker' ? '/workers/profile' : '/companies/profile';
    const response = await axiosInstance.post<{ message: string; user: User }>(endpoint, profileData);
    return response.data;
  } catch (error: any) {
    const msg = error.response?.data?.message || 'Failed to update profile info.';
    throw new Error(msg);
  }
}

export const authService = {
  login,
  register,
  verifyOTP,
  resendOTP,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
  getCurrentUser,
  logout,
  completeProfile,
};
