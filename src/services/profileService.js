import axiosInstance, { USE_MOCK_API } from './api';

export const completeProfile = async (role, profileData) => {
  if (USE_MOCK_API) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userStr = localStorage.getItem('authUser');
        let currentUser = userStr ? JSON.parse(userStr) : {
          id: 'demo-id',
          email: 'demo@example.com',
          name: 'Demo User',
          role: role,
        };
        
        currentUser.phone = profileData.phone || currentUser.phone;
        currentUser.name = profileData.name || currentUser.name;
        
        localStorage.setItem('authUser', JSON.stringify(currentUser));
        
        resolve({
          message: 'Profile updated',
          user: currentUser,
        });
      }, 800);
    });
  }

  try {
    const endpoint = role === 'worker' ? '/workers/profile' : '/companies/profile';
    const response = await axiosInstance.post(endpoint, profileData);
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || 'Failed to update profile info.';
    throw new Error(msg);
  }
};

const profileService = {
  completeProfile
};

export default profileService;
