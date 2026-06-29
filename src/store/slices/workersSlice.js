import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workers,
  filteredWorkers,
  selectedWorker,
  isLoading,
  error,
  filters,
};

const applyFilters = (state) => {
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
    filtered = filtered.filter(worker => state.filters.availability.includes(worker.availability));
  }

  if (state.filters.experience) {
    filtered = filtered.filter(worker =>
      worker.experience >= state.filters.experience.min &&
      worker.experience <= state.filters.experience.max
    );
  }

  if (state.filters.skills && state.filters.skills.length > 0) {
    filtered = filtered.filter(worker =>
      state.filters.skills.every(skill => worker.skills.includes(skill))
    );
  }

  state.filteredWorkers = filtered;
};

const workersSlice = createSlice({
  name,
  initialState,
  reducers: {
    setWorkers, action) => {
      state.workers = action.payload;
      state.filteredWorkers = action.payload;
    },
    setSelectedWorker, action) => {
      state.selectedWorker = action.payload;
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
      state.filteredWorkers = state.workers;
    },
    updateWorker, action) => {
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
