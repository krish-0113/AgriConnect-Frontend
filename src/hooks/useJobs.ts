import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setJobs,
  setLoading,
  setError,
  setFilters,
  clearFilters,
  addJob,
  updateJob,
  deleteJob,
} from '../store/slices/jobsSlice';
import { generateMockJobs } from '../services/mockData';
import { USE_MOCK_API } from '../services/apiService';

export const useJobs = () => {
  const dispatch = useAppDispatch();
  const { jobs, filteredJobs, isLoading, error, filters } = useAppSelector((state) => state.jobs);

  const loadJobs = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      if (USE_MOCK_API) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        const mockJobs = generateMockJobs(25);
        dispatch(setJobs(mockJobs));
      }
    } catch (err) {
      dispatch(setError('Failed to load jobs'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const updateJobFilters = useCallback(
    (newFilters: Parameters<typeof setFilters>[0]) => {
      dispatch(setFilters(newFilters));
    },
    [dispatch]
  );

  const resetFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  const createJob = useCallback(
    (job: Parameters<typeof addJob>[0]) => {
      dispatch(addJob(job));
    },
    [dispatch]
  );

  const modifyJob = useCallback(
    (job: Parameters<typeof updateJob>[0]) => {
      dispatch(updateJob(job));
    },
    [dispatch]
  );

  const removeJob = useCallback(
    (jobId: string) => {
      dispatch(deleteJob(jobId));
    },
    [dispatch]
  );

  return {
    jobs,
    filteredJobs,
    isLoading,
    error,
    filters,
    loadJobs,
    updateJobFilters,
    resetFilters,
    createJob,
    modifyJob,
    removeJob,
  };
};
