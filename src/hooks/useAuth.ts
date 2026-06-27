import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setUser, setLoading, setError, setToken, logout as logoutAction, clearError } from '../store/slices/authSlice';
import { authService } from '../services/authService';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error, token } = useAppSelector((state) => state.auth);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        dispatch(setLoading(true));
        dispatch(clearError());
        const response = await authService.login({ email, password });
        dispatch(setToken(response.token));
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
        dispatch(setToken(response.token));
        dispatch(setUser(response.user));
        return response.user;
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

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      dispatch(logoutAction());
    }
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    token,
    login,
    register,
    logout,
  };
};
