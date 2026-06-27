import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Worker {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  profileImage?: string;
  bio: string;
  skills: string[];
  experience: number;
  availability: 'full-time' | 'part-time' | 'seasonal' | 'flexible';
  specializations: string[];
  certifications: string[];
  rating: number;
  reviews: number;
  status: 'active' | 'inactive' | 'unavailable';
}

interface WorkersState {
  workers: Worker[];
  filteredWorkers: Worker[];
  selectedWorker: Worker | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    location?: string;
    availability?: string[];
    experience?: {
      min: number;
      max: number;
    };
    skills?: string[];
    search?: string;
  };
}

const initialState: WorkersState = {
  workers: [],
  filteredWorkers: [],
  selectedWorker: null,
  isLoading: false,
  error: null,
  filters: {},
};

const workersSlice = createSlice({
  name: 'workers',
  initialState,
  reducers: {
    setWorkers: (state, action: PayloadAction<Worker[]>) => {
      state.workers = action.payload;
      state.filteredWorkers = action.payload;
    },
    setSelectedWorker: (state, action: PayloadAction<Worker | null>) => {
      state.selectedWorker = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setFilters: (state, action: PayloadAction<WorkersState['filters']>) => {
      state.filters = { ...state.filters, ...action.payload };
      applyFilters(state);
    },
    clearFilters: (state) => {
      state.filters = {};
      state.filteredWorkers = state.workers;
    },
    updateWorker: (state, action: PayloadAction<Worker>) => {
      const index = state.workers.findIndex(w => w.id === action.payload.id);
      if (index !== -1) {
        state.workers[index] = action.payload;
        if (state.selectedWorker?.id === action.payload.id) {
          state.selectedWorker = action.payload;
        }
        applyFilters(state);
      }
    },
  },
});

function applyFilters(state: WorkersState) {
  let filtered = state.workers;

  if (state.filters.search) {
    const searchLower = state.filters.search.toLowerCase();
    filtered = filtered.filter(worker =>
      worker.name.toLowerCase().includes(searchLower) ||
      worker.skills.some(skill => skill.toLowerCase().includes(searchLower))
    );
  }

  if (state.filters.location) {
    filtered = filtered.filter(worker => worker.location === state.filters.location);
  }

  if (state.filters.availability && state.filters.availability.length > 0) {
    filtered = filtered.filter(worker => state.filters.availability!.includes(worker.availability));
  }

  if (state.filters.experience) {
    filtered = filtered.filter(worker =>
      worker.experience >= state.filters.experience!.min &&
      worker.experience <= state.filters.experience!.max
    );
  }

  if (state.filters.skills && state.filters.skills.length > 0) {
    filtered = filtered.filter(worker =>
      state.filters.skills!.every(skill => worker.skills.includes(skill))
    );
  }

  state.filteredWorkers = filtered;
}

export const {
  setWorkers,
  setSelectedWorker,
  setLoading,
  setError,
  setFilters,
  clearFilters,
  updateWorker,
} = workersSlice.actions;
export default workersSlice.reducer;
