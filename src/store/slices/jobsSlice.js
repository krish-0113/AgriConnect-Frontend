import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs,
  filteredJobs,
  isLoading,
  error,
  filters,
};

const applyFilters = (state) => {
  let filtered = state.jobs;

  if (state.filters.search) {
    const searchLower = state.filters.search.toLowerCase();
    filtered = filtered.filter(job =>
      job.title.toLowerCase().includes(searchLower) ||
      job.description.toLowerCase().includes(searchLower)
    );
  }

  if (state.filters.location) {
    filtered = filtered.filter(job => job.location === state.filters.location);
  }

  if (state.filters.jobType && state.filters.jobType.length > 0) {
    filtered = filtered.filter(job => state.filters.jobType.includes(job.jobType));
  }

  if (state.filters.workType && state.filters.workType.length > 0) {
    filtered = filtered.filter(job => state.filters.workType.includes(job.workType));
  }

  if (state.filters.salary) {
    filtered = filtered.filter(job =>
      job.salary.min >= state.filters.salary.min &&
      job.salary.max <= state.filters.salary.max
    );
  }

  state.filteredJobs = filtered;
};

const jobsSlice = createSlice({
  name,
  initialState,
  reducers: {
    setJobs, action) => {
      state.jobs = action.payload;
      state.filteredJobs = action.payload;
    },
    setLoading, action) => {
      state.isLoading = action.payload;
    },
    setError, action) => {
      state.error = action.payload;
    },
    setFilters, action) => {
      state.filters = { ...state.filters, ...action.payload };
      applyFilters(state);
    },
    clearFilters) => {
      state.filters = {};
      state.filteredJobs = state.jobs;
    },
    addJob, action) => {
      state.jobs.push(action.payload);
      applyFilters(state);
    },
    updateJob, action) => {
      const index = state.jobs.findIndex(job => job.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
        applyFilters(state);
      }
    },
    deleteJob, action) => {
      state.jobs = state.jobs.filter(job => job.id !== action.payload);
      applyFilters(state);
    },
  },
});

export const {
  setJobs,
  setLoading,
  setError,
  setFilters,
  clearFilters,
  addJob,
  updateJob,
  deleteJob,
} = jobsSlice.actions;
export default jobsSlice.reducer;
