import { createSlice } from '@reduxjs/toolkit';

const getStoredUser = () => {
  try {
    const userStr = localStorage.getItem('authUser');
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

const storedToken = localStorage.getItem('authToken');
const storedUser = getStoredUser();

const initialState = {
  user: storedUser,
  isAuthenticated: !!storedToken,
  isLoading: false,
  error: null,
  token: storedToken,
  refreshToken: localStorage.getItem('refreshToken'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('authUser', JSON.stringify(action.payload));
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setTokens: (state, action) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('authToken', action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.refreshToken = null;
      state.error = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('authUser');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setUser, setLoading, setError, setTokens, setToken, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
