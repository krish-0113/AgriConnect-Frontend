import axiosInstance, { USE_MOCK_API } from './api';

export const createJob = async (jobData) => {
  if (USE_MOCK_API) {
    return { success: true, id: `job-${Date.now()}`, ...jobData };
  }
  const response = await axiosInstance.post('/jobs', jobData);
  return response.data;
};

export const updateJob = async (id, jobData) => {
  if (USE_MOCK_API) {
    return { success: true, id, ...jobData };
  }
  const response = await axiosInstance.put(`/jobs/${id}`, jobData);
  return response.data;
};

export const deleteJob = async (id) => {
  if (USE_MOCK_API) {
    return { success: true, message: "Job deleted" };
  }
  const response = await axiosInstance.delete(`/jobs/${id}`);
  return response.data;
};

export const closeJob = async (id) => {
  if (USE_MOCK_API) {
    return { success: true, message: "Job closed" };
  }
  const response = await axiosInstance.post(`/jobs/${id}/close`);
  return response.data;
};

export const getJobById = async (id) => {
  if (USE_MOCK_API) {
    return { id, title: "Wheat Harvesting", salary: { min: 900 } };
  }
  const response = await axiosInstance.get(`/jobs/${id}`);
  return response.data;
};

export const getAllJobs = async (filters) => {
  if (USE_MOCK_API) {
    return [];
  }
  const response = await axiosInstance.get('/jobs', { params: filters });
  return response.data;
};

export const getMyJobs = async () => {
  if (USE_MOCK_API) {
    return [];
  }
  const response = await axiosInstance.get('/jobs/my-jobs');
  return response.data;
};

const jobService = {
  createJob,
  updateJob,
  deleteJob,
  closeJob,
  getJobById,
  getAllJobs,
  getMyJobs
};

export default jobService;
