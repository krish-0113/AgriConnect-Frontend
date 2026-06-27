import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Application {
  id: string;
  jobId: string;
  workerId: string;
  companyId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn' | 'offered';
  appliedDate: string;
  message?: string;
  rating?: number;
  review?: string;
}

interface ApplicationsState {
  applications: Application[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ApplicationsState = {
  applications: [],
  isLoading: false,
  error: null,
};

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setApplications: (state, action: PayloadAction<Application[]>) => {
      state.applications = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    addApplication: (state, action: PayloadAction<Application>) => {
      state.applications.push(action.payload);
    },
    updateApplication: (state, action: PayloadAction<Application>) => {
      const index = state.applications.findIndex(app => app.id === action.payload.id);
      if (index !== -1) {
        state.applications[index] = action.payload;
      }
    },
    removeApplication: (state, action: PayloadAction<string>) => {
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
