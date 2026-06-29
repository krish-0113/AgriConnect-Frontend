import axiosInstance, { USE_MOCK_API } from './api';

export const getNotifications = async () => {
  if (USE_MOCK_API) {
    return [
      { id: 'notif-1', title: 'New Worker Applied', message: 'Ravi Patil applied for Wheat Harvesting', read: false },
      { id: 'notif-2', title: 'Welcome to AgriConnect', message: 'Tap to complete your profile verification', read: true }
    ];
  }
  const response = await axiosInstance.get('/notifications');
  return response.data;
};

export const markAsRead = async (id) => {
  if (USE_MOCK_API) {
    return { success: true, id };
  }
  const response = await axiosInstance.post(`/notifications/${id}/read`);
  return response.data;
};

export const markAllAsRead = async () => {
  if (USE_MOCK_API) {
    return { success: true };
  }
  const response = await axiosInstance.post('/notifications/read-all');
  return response.data;
};

const notificationService = {
  getNotifications,
  markAsRead,
  markAllAsRead
};

export default notificationService;
