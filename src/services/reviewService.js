import axiosInstance, { USE_MOCK_API } from './api';

export const createFarmerReview = async (reviewData) => {
  if (USE_MOCK_API) {
    return { success: true, message: "Review posted for farmer" };
  }
  const response = await axiosInstance.post('/reviews/farmers', reviewData);
  return response.data;
};

export const createWorkerReview = async (reviewData) => {
  if (USE_MOCK_API) {
    return { success: true, message: "Review posted for worker" };
  }
  const response = await axiosInstance.post('/reviews/workers', reviewData);
  return response.data;
};

export const getFarmerReviews = async (id) => {
  if (USE_MOCK_API) {
    return [];
  }
  const response = await axiosInstance.get(`/reviews/farmers/${id}`);
  return response.data;
};

export const getWorkerReviews = async (id) => {
  if (USE_MOCK_API) {
    return [];
  }
  const response = await axiosInstance.get(`/reviews/workers/${id}`);
  return response.data;
};

const reviewService = {
  createFarmerReview,
  createWorkerReview,
  getFarmerReviews,
  getWorkerReviews
};

export default reviewService;
