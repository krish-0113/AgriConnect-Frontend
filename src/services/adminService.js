import axiosInstance, { USE_MOCK_API } from './api';

export const getUsers = async () => {
  if (USE_MOCK_API) {
    return [];
  }
  const response = await axiosInstance.get('/admin/users');
  return response.data;
};

export const getReports = async () => {
  if (USE_MOCK_API) {
    return [];
  }
  const response = await axiosInstance.get('/admin/reports');
  return response.data;
};

export const getAnalytics = async () => {
  if (USE_MOCK_API) {
    return { dailyActiveUsers: 140, totalTransactions: 550000 };
  }
  const response = await axiosInstance.get('/admin/analytics');
  return response.data;
};

export const verifyUser = async (userId) => {
  if (USE_MOCK_API) {
    return { success: true, message: "User status verified successfully" };
  }
  const response = await axiosInstance.post(`/admin/users/${userId}/verify`);
  return response.data;
};

const adminService = {
  getUsers,
  getReports,
  getAnalytics,
  verifyUser
};

export default adminService;
