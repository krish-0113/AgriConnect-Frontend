import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applications,
  isLoading,
  error,
};

const applicationsSlice = createSlice({
  name,
  initialState,
  reducers: { : '', : '' } => {
      state.applications = action.payload;
    },
    setLoading, action) => {
      state.isLoading = action.payload;
    },
    setError, action) => {
      state.error = action.payload;
    },
    addApplication, action) => {
      state.applications.push(action.payload);
    },
    updateApplication, action) => {
      const index = state.applications.findIndex(app => app.id === action.payload.id);
      if (index !== -1) {
        state.applications[index] = action.payload;
      }
    },
    removeApplication, action) => {
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
