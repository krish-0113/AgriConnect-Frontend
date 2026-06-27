import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setWorkers,
  setSelectedWorker,
  setLoading,
  setError,
  setFilters,
  clearFilters,
  updateWorker,
} from '../store/slices/workersSlice';
import { generateMockWorkers } from '../services/mockData';
import { USE_MOCK_API } from '../services/apiService';

export const useWorkers = () => {
  const dispatch = useAppDispatch();
  const { workers, filteredWorkers, selectedWorker, isLoading, error, filters } = useAppSelector(
    (state) => state.workers
  );

  const loadWorkers = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      if (USE_MOCK_API) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        const mockWorkers = generateMockWorkers(20);
        dispatch(setWorkers(mockWorkers));
      }
    } catch (err) {
      dispatch(setError('Failed to load workers'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const selectWorker = useCallback(
    (workerId: string | null) => {
      if (workerId === null) {
        dispatch(setSelectedWorker(null));
        return;
      }
      const worker = workers.find((w) => w.id === workerId);
      if (worker) {
        dispatch(setSelectedWorker(worker));
      }
    },
    [dispatch, workers]
  );

  const updateWorkerFilters = useCallback(
    (newFilters: Parameters<typeof setFilters>[0]) => {
      dispatch(setFilters(newFilters));
    },
    [dispatch]
  );

  const resetFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  const modifyWorker = useCallback(
    (worker: Parameters<typeof updateWorker>[0]) => {
      dispatch(updateWorker(worker));
    },
    [dispatch]
  );

  return {
    workers,
    filteredWorkers,
    selectedWorker,
    isLoading,
    error,
    filters,
    loadWorkers,
    selectWorker,
    updateWorkerFilters,
    resetFilters,
    modifyWorker,
  };
};
