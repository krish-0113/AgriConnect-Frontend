import axiosInstance, { USE_MOCK_API } from './api';

export const searchWorkers = async (filters) => {
  if (USE_MOCK_API) {
    return [];
  }
  const response = await axiosInstance.get('/search/workers', { params: filters });
  return response.data;
};

export const searchJobs = async (filters) => {
  if (USE_MOCK_API) {
    return [];
  }
  const response = await axiosInstance.get('/search/jobs', { params: filters });
  return response.data;
};

export const searchFarmers = async (filters) => {
  if (USE_MOCK_API) {
    return [];
  }
  const response = await axiosInstance.get('/search/farmers', { params: filters });
  return response.data;
};

const searchService = {
  searchWorkers,
  searchJobs,
  searchFarmers
};

export default searchService;
