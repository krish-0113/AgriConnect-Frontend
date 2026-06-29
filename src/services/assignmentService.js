import axiosInstance, { USE_MOCK_API } from './api';

export const getAssignments = async () => {
  if (USE_MOCK_API) {
    return [];
  }
  const response = await axiosInstance.get('/assignments');
  return response.data;
};

export const getAssignmentDetails = async (id) => {
  if (USE_MOCK_API) {
    return { id, status: 'accepted', jobTitle: "Wheat Harvesting" };
  }
  const response = await axiosInstance.get(`/assignments/${id}`);
  return response.data;
};

export const acceptAssignment = async (id) => {
  if (USE_MOCK_API) {
    return { success: true, message: "Assignment accepted" };
  }
  const response = await axiosInstance.post(`/assignments/${id}/accept`);
  return response.data;
};

export const rejectAssignment = async (id) => {
  if (USE_MOCK_API) {
    return { success: true, message: "Assignment declined" };
  }
  const response = await axiosInstance.post(`/assignments/${id}/reject`);
  return response.data;
};

export const startWork = async (id) => {
  if (USE_MOCK_API) {
    return { success: true, message: "Work started" };
  }
  const response = await axiosInstance.post(`/assignments/${id}/start-work`);
  return response.data;
};

export const finishWork = async (id) => {
  if (USE_MOCK_API) {
    return { success: true, message: "Work finished" };
  }
  const response = await axiosInstance.post(`/assignments/${id}/finish-work`);
  return response.data;
};

export const completeAssignment = async (id) => {
  if (USE_MOCK_API) {
    return { success: true, message: "Assignment completed" };
  }
  const response = await axiosInstance.post(`/assignments/${id}/complete`);
  return response.data;
};

const assignmentService = {
  getAssignments,
  getAssignmentDetails,
  acceptAssignment,
  rejectAssignment,
  startWork,
  finishWork,
  completeAssignment
};

export default assignmentService;
