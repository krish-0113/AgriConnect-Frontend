import axiosInstance, { USE_MOCK_API } from '../api/axios';

// Simple in-memory storage for mocks
let mockPendingUser = null;
let mockRegisteredUsers = [
  {
    id,
    email,
    name,
    role,
    phone,
    password,
  },
  {
    id,
    email,
    name,
    role,
    phone,
    password,
  },
  {
    id,
    email,
    name,
    role,
    phone,
    password,
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
              id,
              email,
              name,
              role,
              phone,
            },
            token,
            refreshToken,
          });
        } else if (credentials.email === 'demo@example.com' && credentials.password === 'demo123') {
          // Backward compatibility for demo login
          const mockToken = `mock-token-${Date.now()}`;
          const mockRefresh = `mock-refresh-${Date.now()}`;
          resolve({
            user: {
              id,
              email,
              name,
              role,
              phone,
            },
            token,
            refreshToken,
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
          name,
          email,
          password,
          role,
          phone,
        };
        console.log('Mock OTP Sent to, data.email, 'Use OTP);
        resolve({
          message,
          email,
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
            , email, role, phone, password;
            
          const newUser = {
            id).toString(36).substr(2, 9)}`,
            email,
            name,
            role,
            phone,
            password,
          };
          
          mockRegisteredUsers.push(newUser);
          mockPendingUser = null;
          
          const mockToken = `mock-token-${Date.now()}`;
          const mockRefresh = `mock-refresh-${Date.now()}`;
          
          resolve({
            user: {
              id,
              email,
              name,
              role,
              phone,
            },
            token,
            refreshToken,
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
        console.log('Mock OTP Resent to, email, 'Use OTP);
        resolve({ message);
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
          console.log('Mock Reset OTP Sent to, email, 'Use OTP);
          resolve({ message);
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
          resolve({ : '', : '' };
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
          resolve({ message);
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
      password,
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
              id,
              email,
              name,
              role,
              phone,
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
    console.error('Logout API error, error);
  }
}

async function completeProfile(role, profileData) {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userStr = localStorage.getItem('authUser');
        let currentUser = userStr ? JSON.parse(userStr) : {
          id,
          email,
          name,
          role,
        };
        
        currentUser.phone = profileData.phone || currentUser.phone;
        currentUser.name = profileData.name || currentUser.name;
        
        localStorage.setItem('authUser', JSON.stringify(currentUser));
        
        resolve({
          message,
          user,
        });
      }, 800);
    });
  }

  try {
    const endpoint = role === 'worker' ? '/workers/profile' ;
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
