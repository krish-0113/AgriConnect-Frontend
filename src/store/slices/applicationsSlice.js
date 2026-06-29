import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applications: [],
  isLoading: false,
  error: null,
};

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setApplications: (state, action) => {
      state.applications = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addApplication: (state, action) => {
      state.applications.push(action.payload);
    },
    updateApplication: (state, action) => {
      const index = state.applications.findIndex(app => app.id === action.payload.id);
      if (index !== -1) {
        state.applications[index] = action.payload;
      }
    },
    removeApplication: (state, action) => {
      state.applications = state.applications.filter(app => app.id !== action.payload);
    },
  },
});

export const {
  setApplications,
  setLoading,
  setError,
  addApplication,
  updateApplication,
  removeApplication,
} = applicationsSlice.actions;

export default applicationsSlice.reducer;
