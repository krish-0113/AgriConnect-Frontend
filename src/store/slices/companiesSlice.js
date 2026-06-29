import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companies: [],
  selectedCompany: null,
  isLoading: false,
  error: null,
};

const companiesSlice = createSlice({
  name: "companies",

  initialState,

  reducers: {
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },

    setSelectedCompany: (state, action) => {
      state.selectedCompany = action.payload;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    updateCompany: (state, action) => {
      const index = state.companies.findIndex(
        (company) => company.id === action.payload.id
      );

      if (index !== -1) {
        state.companies[index] = action.payload;

        if (
          state.selectedCompany &&
          state.selectedCompany.id === action.payload.id
        ) {
          state.selectedCompany = action.payload;
        }
      }
    },

    clearSelectedCompany: (state) => {
      state.selectedCompany = null;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setCompanies,
  setSelectedCompany,
  setLoading,
  setError,
  updateCompany,
  clearSelectedCompany,
  clearError,
} = companiesSlice.actions;

export default companiesSlice.reducer;