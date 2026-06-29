import axiosInstance, { USE_MOCK_API } from './api';

export const createFarmerProfile = async (profileData) => {
  if (USE_MOCK_API) {
    return { success: true, message: "Mock Profile Created", data: profileData };
  }
  const response = await axiosInstance.post('/farmers/profile', profileData);
  return response.data;
};

export const updateFarmerProfile = async (profileData) => {
  if (USE_MOCK_API) {
    return { success: true, message: "Mock Profile Updated", data: profileData };
  }
  const response = await axiosInstance.put('/farmers/profile', profileData);
  return response.data;
};

export const getFarmerProfile = async (id) => {
  if (USE_MOCK_API) {
    return { id, name: "Baldev Singh", farmName: "Baldev Crops", location: "Nashik, Maharashtra" };
  }
  const response = await axiosInstance.get(`/farmers/profile/${id}`);
  return response.data;
};

export const getFarmerDashboard = async () => {
  if (USE_MOCK_API) {
    return { activeJobs: 3, workersNear: 12, newApplications: 5 };
  }
  const response = await axiosInstance.get('/farmers/dashboard');
  return response.data;
};

export const getFarmerJobs = async () => {
  if (USE_MOCK_API) {
    return [];
  }
  const response = await axiosInstance.get('/farmers/jobs');
  return response.data;
};

export const searchWorkers = async (filters) => {
  if (USE_MOCK_API) {
    return [];
  }
  const response = await axiosInstance.get('/farmers/search-workers', { params: filters });
  return response.data;
};

const farmerService = {
  createFarmerProfile,
  updateFarmerProfile,
  getFarmerProfile,
  getFarmerDashboard,
  getFarmerJobs,
  searchWorkers
};

export default farmerService;
