import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useAppDispatch } from '../store/hooks';
import { setTokens } from '../store/slices/authSlice';
import { useToast } from '../components/common/Toast';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';



export default function OAuth2RedirectHandler() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { loadCurrentUser } = useAuth();
  const toast = useToast();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      const token = searchParams.get('accessToken');
      const refreshToken = searchParams.get('refreshToken');

      if (!token) {
        toast.error('Authentication token is missing. Please try logging in again.');
        navigate('/login', { replace: true });
        return;
      }

      try {
        // 1. Dispatch tokens to redux & update localStorage
        dispatch(setTokens({ accessToken, refreshToken: refreshToken || '' }));

        // 2. Fetch the current logged-in user profile from backend
        const user = await loadCurrentUser();

        if (user) {
          toast.success(`Logged in successfully! Welcome, ${user.name || 'User'}.`);

          // 3. Decide navigation based on role definition
          if (!user.role) {
            // New user without role selected yet
            navigate('/complete-profile', { state: { role: 'worker' }, replace: true });
          } else if (user.role === 'admin') {
            navigate('/admin-dashboard', { replace: true });
          } else if (user.role === 'company') {
            navigate('/company-dashboard', { replace: true });
          } else {
            navigate('/dashboard', { replace: true });
          }
        } else {
          throw new Error('Could not retrieve user details.');
        }
      } catch (err) {
        console.error('OAuth redirect processing error:', err);
        toast.error('OAuth login processing failed. Please log in manually.');
        navigate('/login', { replace: true });
      }
    };

    handleAuthRedirect();
  }, [searchParams, dispatch, loadCurrentUser, navigate, toast]);

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/10 rounded-full filter blur-[100px] pointer-events-none" />

      <motion.div
        className="w-full max-w-sm bg-white dark:bg-slate-900 border border-border p-8 rounded-3xl shadow-xl flex flex-col items-center space-y-6 relative z-10"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="relative">
          <motion.div
            className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-emerald-500">
            <Loader2 className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-xl font-black text-foreground tracking-tight">Authenticating...</h2>
          <p className="text-xs text-muted-foreground font-medium max-w-[240px] mx-auto leading-relaxed">
            Securing connection and loading your AgriConnect dashboard. Please wait.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
