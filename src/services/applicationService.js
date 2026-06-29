import axiosInstance, { USE_MOCK_API } from './api';

export const applyJob = async (jobId, data) => {
  if (USE_MOCK_API) {
    return { success: true, message: "Applied successfully", id: `app-${Date.now()}` };
  }
  const response = await axiosInstance.post(`/jobs/${jobId}/apply`, data);
  return response.data;
};

export const withdrawApplication = async (appId) => {
  if (USE_MOCK_API) {
    return { success: true, message: "Withdrawn successfully" };
  }
  const response = await axiosInstance.post(`/applications/${appId}/withdraw`);
  return response.data;
};

export const getApplicationsByJob = async (jobId) => {
  if (USE_MOCK_API) {
    return [];
  }
  const response = await axiosInstance.get(`/jobs/${jobId}/applications`);
  return response.data;
};

export const getMyApplications = async () => {
  if (USE_MOCK_API) {
    return [];
  }
  const response = await axiosInstance.get('/applications/my-applications');
  return response.data;
};

export const acceptApplication = async (appId) => {
  if (USE_MOCK_API) {
    return { success: true, message: "Application accepted" };
  }
  const response = await axiosInstance.post(`/applications/${appId}/accept`);
  return response.data;
};

export const rejectApplication = async (appId) => {
  if (USE_MOCK_API) {
    return { success: true, message: "Application rejected" };
  }
  const response = await axiosInstance.post(`/applications/${appId}/reject`);
  return response.data;
};

const applicationService = {
  applyJob,
  withdrawApplication,
  getApplicationsByJob,
  getMyApplications,
  acceptApplication,
  rejectApplication
};

export default applicationService;
