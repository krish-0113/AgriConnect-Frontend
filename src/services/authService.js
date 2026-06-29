import axiosInstance, { USE_MOCK_API } from './api';

// Simple in-memory storage for mocks
let mockPendingUser = null;
let mockRegisteredUsers = [
  {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'worker',
    phone: '1234567890',
    password: 'password123',
  },
  {
    id: '2',
    email: 'demo@example.com',
    name: 'Demo User',
    role: 'company',
    phone: '0987654321',
    password: 'demo123',
  },
];

async function login(credentials) {
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
              id: 'demo-id',
              email: credentials.email,
              name: 'Demo User',
              role: 'worker',
              phone: '1234567890',
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
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || 'Login failed. Please check your credentials.';
    throw new Error(msg);
  }
}

async function register(data) {
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
        console.log('Mock OTP Sent to', data.email, 'Use OTP 123456');
        resolve({
          message: 'OTP sent successfully',
          email: data.email,
        });
      }, 800);
    });
  }

  try {
    const response = await axiosInstance.post('/auth/register', data);
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || 'Registration failed. Please try again.';
    throw new Error(msg);
  }
}

async function verifyOTP(email, otp) {
  if (USE_MOCK_API) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (otp === '123456') {
          const userDetails = mockPendingUser && mockPendingUser.email === email
            ? mockPendingUser
            : { email, role: 'worker', phone: '', password: 'password', name: 'User' };
            
          const newUser = {
            id: Math.random().toString(36).substr(2, 9),
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
    const response = await axiosInstance.post('/auth/verify-otp', { email, otp });
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || 'OTP verification failed. Please try again.';
    throw new Error(msg);
  }
}

async function resendOTP(email) {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Mock OTP Resent to', email, 'Use OTP 123456');
        resolve({ message: 'OTP resent successfully' });
      }, 500);
    });
  }

  try {
    const response = await axiosInstance.post('/auth/resend-otp', { email });
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || 'Failed to resend OTP.';
    throw new Error(msg);
  }
}

async function forgotPassword(email) {
  if (USE_MOCK_API) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const found = mockRegisteredUsers.some((u) => u.email === email) || email === 'demo@example.com';
        if (found) {
          console.log('Mock Reset OTP Sent to', email, 'Use OTP 654321');
          resolve({ message: 'Reset OTP sent successfully' });
        } else {
          reject(new Error('User with this email does not exist.'));
        }
      }, 800);
    });
  }

  try {
    const response = await axiosInstance.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || 'Failed to initiate forgot password.';
    throw new Error(msg);
  }
}

async function verifyResetOTP(email, otp) {
  if (USE_MOCK_API) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (otp === '654321') {
          resolve({ message: 'OTP verified successfully' });
        } else {
          reject(new Error('Invalid Reset OTP. Please enter 654321.'));
        }
      }, 800);
    });
  }

  try {
    const response = await axiosInstance.post('/auth/verify-reset-otp', { email, otp });
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || 'Failed to verify reset OTP.';
    throw new Error(msg);
  }
}

async function resetPassword(email, otp, data) {
  if (USE_MOCK_API) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (otp === '654321') {
          const userIdx = mockRegisteredUsers.findIndex((u) => u.email === email);
          if (userIdx > -1) {
            mockRegisteredUsers[userIdx].password = data.password;
          }
          resolve({ message: 'Password reset successful' });
        } else {
          reject(new Error('Invalid verification code. Password reset aborted.'));
        }
      }, 800);
    });
  }

  try {
    const response = await axiosInstance.post('/auth/reset-password', {
      email,
      otp,
      password: data.password,
    });
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || 'Failed to reset password.';
    throw new Error(msg);
  }
}

async function getCurrentUser() {
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
              id: 'demo-id',
              email: 'demo@example.com',
              name: 'Demo User',
              role: 'worker',
              phone: '1234567890',
            });
          }
        }, 300);
      });
    }
    return null;
  }

  try {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  } catch (error) {
    return null;
  }
}

async function logout() {
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
    console.error('Logout API error', error);
  }
}

async function completeProfile(role, profileData) {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userStr = localStorage.getItem('authUser');
        let currentUser = userStr ? JSON.parse(userStr) : {
          id: 'demo-id',
          email: 'demo@example.com',
          name: 'Demo User',
          role: role,
        };
        
        currentUser.phone = profileData.phone || currentUser.phone;
        currentUser.name = profileData.name || currentUser.name;
        
        localStorage.setItem('authUser', JSON.stringify(currentUser));
        
        resolve({
          message: 'Profile updated',
          user: currentUser,
        });
      }, 800);
    });
  }

  try {
    const endpoint = role === 'worker' ? '/workers/profile' : '/companies/profile';
    const response = await axiosInstance.post(endpoint, profileData);
    return response.data;
  } catch (error) {
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
