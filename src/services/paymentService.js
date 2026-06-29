import axiosInstance, { USE_MOCK_API } from './api';

export const markAsPaid = async (assignmentId) => {
  if (USE_MOCK_API) {
    return { success: true, message: "Marked as paid" };
  }
  const response = await axiosInstance.post(`/payments/${assignmentId}/pay`);
  return response.data;
};

export const confirmPayment = async (assignmentId) => {
  if (USE_MOCK_API) {
    return { success: true, message: "Payment confirmed" };
  }
  const response = await axiosInstance.post(`/payments/${assignmentId}/confirm`);
  return response.data;
};

export const raisePaymentDispute = async (assignmentId, details) => {
  if (USE_MOCK_API) {
    return { success: true, disputeId: `disp-${Date.now()}` };
  }
  const response = await axiosInstance.post(`/payments/${assignmentId}/dispute`, { details });
  return response.data;
};

const paymentService = {
  markAsPaid,
  confirmPayment,
  raisePaymentDispute
};

export default paymentService;
