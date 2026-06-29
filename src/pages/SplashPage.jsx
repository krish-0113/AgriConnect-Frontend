import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashPage() {
  const navigate = useNavigate();
  const { token, loadCurrentUser } = useAuth();
  const [loadingText, setLoadingText] = useState('Initializing platform...');

  useEffect(() => {
    const loadingSequence = async () => {
      setTimeout(() => setLoadingText('Securing connection...'), 500);
      setTimeout(() => setLoadingText('Loading resources...'), 1000);
      setTimeout(() => setLoadingText('Almost there...'), 1500);
    };

    loadingSequence();

    const checkAuth = async () => {
      // Simulate splash screen animation delay to let the sequence finish
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (token) {
        try {
          const user = await loadCurrentUser();
          if (user) {
            navigate('/dashboard', { replace: true });
            return;
          }
        } catch (e) {
          console.error('Session validation failed', e);
        }
      }
      
      // Default fallback
      navigate('/welcome', { replace: true });
    };

    checkAuth();
  }, [token, loadCurrentUser, navigate]);

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Background blur effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/20 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-teal-500/20 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center space-y-8">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          className="relative"
        >
          {/* Logo Container */}
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-[2rem] flex items-center justify-center font-black text-white text-5xl shadow-2xl shadow-emerald-500/40 relative z-10">
            A
          </div>
          {/* Pulse ring */}
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-emerald-500 rounded-[2rem] -z-10"
          />
        </motion.div>
        
        <div className="text-center space-y-2">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-emerald-100 to-teal-100 bg-clip-text text-transparent"
          >
            AgriConnect
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-emerald-500/80 font-medium tracking-wide"
          >
            Sowing Opportunities, Harvesting Success
          </motion.p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-16 flex flex-col items-center space-y-4 w-64"
      >
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full w-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" 
          />
        </div>
        <AnimatePresence mode="wait">
          <motion.span 
            key={loadingText}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-xs text-slate-400 font-semibold tracking-wider uppercase"
          >
            {loadingText}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
