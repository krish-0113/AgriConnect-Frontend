import { createSlice } from '@reduxjs/toolkit';

const getStoredUser = () => {
  try {
    const userStr = localStorage.getItem('authUser');
    return userStr ? JSON.parse(userStr) ;
  } catch {
    return null;
  }
};

const storedToken = localStorage.getItem('authToken');
const storedUser = getStoredUser();

const initialState = {
  user,
  isAuthenticated,
  isLoading,
  error,
  token,
  refreshToken),
};

const authSlice = createSlice({
  name,
  initialState,
  reducers: { : '', : '' } => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('authUser', JSON.stringify(action.payload));
    },
    setLoading, action) => {
      state.isLoading = action.payload;
    },
    setError, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setTokens, action) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    setToken, action) => {
      state.token = action.payload;
      localStorage.setItem('authToken', action.payload);
    },
    logout) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.refreshToken = null;
      state.error = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('authUser');
    },
    clearError) => {
      state.error = null;
    },
  },
});

export const { setUser, setLoading, setError, setTokens, setToken, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
