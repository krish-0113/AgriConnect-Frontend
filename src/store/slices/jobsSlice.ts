import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: {
    min: number;
    max: number;
  };
  jobType: 'full-time' | 'part-time' | 'seasonal' | 'contract';
  workType: 'field-work' | 'livestock' | 'equipment' | 'supervision' | 'management';
  company: {
    id: string;
    name: string;
    logo?: string;
  };
  requiredSkills: string[];
  experience: string;
  posted: string;
  deadline: string;
  status: 'open' | 'closed' | 'filled';
  applicants: number;
}

interface JobsState {
  jobs: Job[];
  filteredJobs: Job[];
  isLoading: boolean;
  error: string | null;
  filters: {
    location?: string;
    jobType?: string[];
    workType?: string[];
    salary?: {
      min: number;
      max: number;
    };
    search?: string;
  };
}

const initialState: JobsState = {
  jobs: [],
  filteredJobs: [],
  isLoading: false,
  error: null,
  filters: {},
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload;
      state.filteredJobs = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setFilters: (state, action: PayloadAction<JobsState['filters']>) => {
      state.filters = { ...state.filters, ...action.payload };
      applyFilters(state);
    },
    clearFilters: (state) => {
      state.filters = {};
      state.filteredJobs = state.jobs;
    },
    addJob: (state, action: PayloadAction<Job>) => {
      state.jobs.push(action.payload);
      applyFilters(state);
    },
    updateJob: (state, action: PayloadAction<Job>) => {
      const index = state.jobs.findIndex(job => job.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
        applyFilters(state);
      }
    },
    deleteJob: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter(job => job.id !== action.payload);
      applyFilters(state);
    },
  },
});

function applyFilters(state: JobsState) {
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
    filtered = filtered.filter(job => state.filters.jobType!.includes(job.jobType));
  }

  if (state.filters.workType && state.filters.workType.length > 0) {
    filtered = filtered.filter(job => state.filters.workType!.includes(job.workType));
  }

  if (state.filters.salary) {
    filtered = filtered.filter(job =>
      job.salary.min >= state.filters.salary!.min &&
      job.salary.max <= state.filters.salary!.max
    );
  }

  state.filteredJobs = filtered;
}

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
