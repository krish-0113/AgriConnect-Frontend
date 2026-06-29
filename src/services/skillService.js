import axiosInstance, { USE_MOCK_API } from './api';

export const getAllSkills = async () => {
  if (USE_MOCK_API) {
    return [
      'Wheat Harvesting',
      'Organic Composting',
      'Tractor Operation',
      'Irrigation Setup',
      'Animal Care',
      'Fruit Picking',
      'Pesticide Spraying',
      'Soil Preparation'
    ];
  }
  const response = await axiosInstance.get('/skills');
  return response.data;
};

const skillService = {
  getAllSkills
};

export default skillService;
