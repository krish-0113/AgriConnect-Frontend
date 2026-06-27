import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  website?: string;
  logo?: string;
  banner?: string;
  location: string;
  description: string;
  size: 'small' | 'medium' | 'large';
  industry: string;
  rating: number;
  reviews: number;
  verified: boolean;
  status: 'active' | 'inactive' | 'suspended';
}

interface CompaniesState {
  companies: Company[];
  selectedCompany: Company | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CompaniesState = {
  companies: [],
  selectedCompany: null,
  isLoading: false,
  error: null,
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setCompanies: (state, action: PayloadAction<Company[]>) => {
      state.companies = action.payload;
    },
    setSelectedCompany: (state, action: PayloadAction<Company | null>) => {
      state.selectedCompany = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    updateCompany: (state, action: PayloadAction<Company>) => {
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
