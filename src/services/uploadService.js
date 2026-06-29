import axiosInstance, { USE_MOCK_API } from './api';

export const uploadProfileImage = async (file) => {
  if (USE_MOCK_API) {
    return { url: 'https://images.unsplash.com/photo-1542838132-92c53300491e' };
  }
  const formData = new FormData();
  formData.append('file', file);
  const response = await axiosInstance.post('/upload/profile-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const uploadJobImage = async (file) => {
  if (USE_MOCK_API) {
    return { url: 'https://images.unsplash.com/photo-1542838132-92c53300491e' };
  }
  const formData = new FormData();
  formData.append('file', file);
  const response = await axiosInstance.post('/upload/job-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const uploadDocument = async (file) => {
  if (USE_MOCK_API) {
    return { success: true, docUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e' };
  }
  const formData = new FormData();
  formData.append('file', file);
  const response = await axiosInstance.post('/upload/document', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

const uploadService = {
  uploadProfileImage,
  uploadJobImage,
  uploadDocument
};

export default uploadService;
