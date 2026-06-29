import axiosInstance, { USE_MOCK_API } from './api';

export const getStates = async () => {
  if (USE_MOCK_API) {
    return ['Punjab', 'Maharashtra', 'Gujarat', 'Uttar Pradesh', 'Karnataka'];
  }
  const response = await axiosInstance.get('/locations/states');
  return response.data;
};

export const getDistricts = async (stateName) => {
  if (USE_MOCK_API) {
    if (stateName === 'Maharashtra') return ['Nashik', 'Pune', 'Nagpur'];
    return ['Sangrur', 'Amritsar', 'Bathinda'];
  }
  const response = await axiosInstance.get(`/locations/districts?state=${stateName}`);
  return response.data;
};

export const getVillages = async (districtName) => {
  if (USE_MOCK_API) {
    return ['Village Alpha', 'Village Beta', 'Village Gamma'];
  }
  const response = await axiosInstance.get(`/locations/villages?district=${districtName}`);
  return response.data;
};

const locationService = {
  getStates,
  getDistricts,
  getVillages
};

export default locationService;
