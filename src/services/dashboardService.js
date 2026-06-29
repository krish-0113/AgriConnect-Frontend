import axiosInstance, { USE_MOCK_API } from './api';

export const getDashboardStats = async () => {
  if (USE_MOCK_API) {
    return { activeJobs: 3, verifiedWorkers: 15000, completedHires: 8500 };
  }
  const response = await axiosInstance.get('/dashboard/stats');
  return response.data;
};

export const getFarmerDashboard = async () => {
  if (USE_MOCK_API) {
    return { myJobs: 3, pendingApplications: 5, reviewsScore: 4.8 };
  }
  const response = await axiosInstance.get('/dashboard/farmer');
  return response.data;
};

export const getWorkerDashboard = async () => {
  if (USE_MOCK_API) {
    return { activeAssignments: 2, totalEarnings: 15400, matchedJobs: 12 };
  }
  const response = await axiosInstance.get('/dashboard/worker');
  return response.data;
};

const dashboardService = {
  getDashboardStats,
  getFarmerDashboard,
  getWorkerDashboard
};

export default dashboardService;
