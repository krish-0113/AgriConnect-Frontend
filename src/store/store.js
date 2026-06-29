import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import jobsReducer from './slices/jobsSlice';
import workersReducer from './slices/workersSlice';
import companiesReducer from './slices/companiesSlice';
import applicationsReducer from './slices/applicationsSlice';

export const store = configureStore({
  reducer: {
    auth,
    jobs,
    workers,
    companies,
    applications,
  },
});
