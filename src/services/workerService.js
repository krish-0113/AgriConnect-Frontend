import axiosInstance, { USE_MOCK_API } from './api';

export const createWorkerProfile = async (profileData) => {
  if (USE_MOCK_API) {
    return { success: true, message: "Mock Profile Created", data: profileData };
  }
  const response = await axiosInstance.post('/workers/profile', profileData);
  return response.data;
};

export const updateWorkerProfile = async (profileData) => {
  if (USE_MOCK_API) {
    return { success: true, message: "Mock Profile Updated", data: profileData };
  }
  const response = await axiosInstance.put('/workers/profile', profileData);
  return response.data;
};

export const getWorkerProfile = async (id) => {
  if (USE_MOCK_API) {
    return { id, name: "Ramesh Singh", experienceYears: 5, hourlyRate: 600 };
  }
  const response = await axiosInstance.get(`/workers/profile/${id}`);
  return response.data;
};

export const getWorkerDashboard = async () => {
  if (USE_MOCK_API) {
    return { activeAssignments: 2, reviewsCount: 8, safetyAlerts: 0 };
  }
  const response = await axiosInstance.get('/workers/dashboard');
  return response.data;
};

export const searchJobs = async (filters) => {
  if (USE_MOCK_API) {
    return [];
  }
  const response = await axiosInstance.get('/workers/search-jobs', { params: filters });
  return response.data;
};

const workerService = {
  createWorkerProfile,
  updateWorkerProfile,
  getWorkerProfile,
  getWorkerDashboard,
  searchJobs
};

export default workerService;
