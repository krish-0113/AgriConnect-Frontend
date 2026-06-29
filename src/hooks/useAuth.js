import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setUser,
  setLoading,
  setError,
  setTokens,
  logout as logoutAction,
  clearError,
} from '../store/slices/authSlice';
import { authService } from '../services/authService';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error, token, refreshToken } = useAppSelector(
    (state) => state.auth
  );

  const login = useCallback(
    async (email, password) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());
        const response = await authService.login({ email, password });
        dispatch(setTokens({ token: response.token, refreshToken: response.refreshToken }));
        dispatch(setUser(response.user));
        return response.user;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred';
        dispatch(setError(message));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const register = useCallback(
    async (name, email, password, role, phone) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());
        const response = await authService.register({ name, email, password, role, phone });
        return response;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred';
        dispatch(setError(message));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const verifyOtp = useCallback(
    async (email, otp) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());
        const response = await authService.verifyOTP(email, otp);
        dispatch(setTokens({ token: response.token, refreshToken: response.refreshToken }));
        dispatch(setUser(response.user));
        return response.user;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred';
        dispatch(setError(message));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const resendOtp = useCallback(
    async (email) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());
        const response = await authService.resendOTP(email);
        return response;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred';
        dispatch(setError(message));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const forgotPassword = useCallback(
    async (email) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());
        const response = await authService.forgotPassword(email);
        return response;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred';
        dispatch(setError(message));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const verifyResetOtp = useCallback(
    async (email, otp) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());
        const response = await authService.verifyResetOTP(email, otp);
        return response;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred';
        dispatch(setError(message));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const resetPassword = useCallback(
    async (email, otp, data) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());
        const response = await authService.resetPassword(email, otp, data);
        return response;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred';
        dispatch(setError(message));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const completeProfile = useCallback(
    async (role, profileData) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());
        const response = await authService.completeProfile(role, profileData);
        dispatch(setUser(response.user));
        return response;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred';
        dispatch(setError(message));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error', err);
    } finally {
      dispatch(logoutAction());
    }
  }, [dispatch]);

  const loadCurrentUser = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const fetchedUser = await authService.getCurrentUser();
      if (fetchedUser) {
        dispatch(setUser(fetchedUser));
      } else {
        dispatch(logoutAction());
      }
      return fetchedUser;
    } catch (err) {
      dispatch(logoutAction());
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    token,
    refreshToken,
    login,
    register,
    verifyOtp,
    resendOtp,
    forgotPassword,
    verifyResetOtp,
    resetPassword,
    completeProfile,
    logout,
    loadCurrentUser,
  };
};
