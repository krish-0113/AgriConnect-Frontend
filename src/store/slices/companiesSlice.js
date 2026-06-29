import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  companies,
  selectedCompany,
  isLoading,
  error,
};

const companiesSlice = createSlice({
  name,
  initialState,
  reducers: { : '', : '' } => {
      state.companies = action.payload;
    },
    setSelectedCompany, action) => {
      state.selectedCompany = action.payload;
    },
    setLoading, action) => {
      state.isLoading = action.payload;
    },
    setError, action) => {
      state.error = action.payload;
    },
    updateCompany, action) => {
      const index = state.companies.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.companies[index] = action.payload;
        if (state.selectedCompany?.id === action.payload.id) {
          state.selectedCompany = action.payload;
        }
      }
    },
  },
});

export const {
  setCompanies,
  setSelectedCompany,
  setLoading,
  setError,
  updateCompany,
} = companiesSlice.actions;
export default companiesSlice.reducer;
