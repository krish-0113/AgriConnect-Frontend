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
    async (email: string, password: string) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());
        const response = await authService.login({ email, password });
        dispatch(setTokens({ token: response.token, refreshToken: response.refreshToken }));
        dispatch(setUser(response.user));
        return response.user;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Login failed';
        dispatch(setError(message));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      role: 'worker' | 'company' | 'admin',
      phone?: string
    ) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());
        const response = await authService.register({ name, email, password, role, phone });
        return response;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Registration failed';
        dispatch(setError(message));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const verifyOtp = useCallback(
    async (email: string, otp: string) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());
        const response = await authService.verifyOTP(email, otp);
        dispatch(setTokens({ token: response.token, refreshToken: response.refreshToken }));
        dispatch(setUser(response.user));
        return response.user;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'OTP verification failed';
        dispatch(setError(message));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const resendOtp = useCallback(
    async (email: string) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());
        const response = await authService.resendOTP(email);
        return response;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to resend OTP';
        dispatch(setError(message));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const forgotPassword = useCallback(
    async (email: string) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());
        const response = await authService.forgotPassword(email);
        return response;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Forgot password request failed';
        dispatch(setError(message));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const verifyResetOtp = useCallback(
    async (email: string, otp: string) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());
        const response = await authService.verifyResetOTP(email, otp);
        return response;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Reset OTP verification failed';
        dispatch(setError(message));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const resetPassword = useCallback(
    async (email: string, otp: string, data: any) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());
        const response = await authService.resetPassword(email, otp, data);
        return response;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Password reset failed';
        dispatch(setError(message));
        throw err;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const completeProfile = useCallback(
    async (role: 'worker' | 'company', profileData: any) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());
        const response = await authService.completeProfile(role, profileData);
        dispatch(setUser(response.user));
        return response;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to complete profile';
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
      console.error('Logout error:', err);
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
