import axiosInstance, { USE_MOCK_API } from './api';

export const createSupportTicket = async (ticketData) => {
  if (USE_MOCK_API) {
    return { success: true, ticketId: `tkt-${Date.now()}` };
  }
  const response = await axiosInstance.post('/support/ticket', ticketData);
  return response.data;
};

export const reportUser = async (userId, details) => {
  if (USE_MOCK_API) {
    return { success: true, message: "User reported" };
  }
  const response = await axiosInstance.post(`/support/report/${userId}`, { details });
  return response.data;
};

export const emergencySOS = async (assignmentId, location) => {
  if (USE_MOCK_API) {
    return { success: true, message: "SOS Alert Dispatched to Family & Admin" };
  }
  const response = await axiosInstance.post(`/support/sos`, { assignmentId, location });
  return response.data;
};

const supportService = {
  createSupportTicket,
  reportUser,
  emergencySOS
};

export default supportService;
