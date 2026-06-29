import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../components/common/Toast';
import Input from '../components/common/Input';
import PasswordField from '../components/common/PasswordField';
import PrimaryButton from '../components/common/PrimaryButton';
import { Mail, Sprout, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const toast = useToast();

  const [formData, setFormData] = useState({ : '', : '' };
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const user = await login(formData.email, formData.password);
      toast.success(`Welcome back, ${user?.name || 'User'}!`);
      
      // Route based on role
      if (user?.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (user?.role === 'company') {
        navigate('/company-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.message || 'Login failed. Please verify credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/95 via-primary/90 to-primary text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration, repeat, ease: 'linear' }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration, repeat, ease: 'linear' }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity, y: 20 }}
        animate={{ opacity, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 border border-white/20 relative z-10"
      >
        
        {/* Brand Logo and Title */}
        <motion.div
          initial={{ scale, opacity: 0 }}
          animate={{ scale, opacity: 1 }}
          transition={{ duration, delay: 0.1 }}
          className="text-center mb-8"
        >
          <motion.div
            whileHover={{ scale, rotate: 5 }}
            className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center rounded-2xl mb-4 shadow-lg"
          >
            <Sprout size={32} />
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground dark:text-white">AgriConnect</h1>
          <p className="text-muted-foreground dark:text-slate-400 mt-2">Welcome back to agriculture</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration, delay: 0.2 }}
        >
          
          <motion.div
            initial={{ x, opacity: 0 }}
            animate={{ x, opacity: 1 }}
            transition={{ duration, delay: 0.25 }}
          >
            <Input
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email)}
              error={errors.email}
              disabled={isLoading}
              icon={<Mail size={18} />}
              required
            />
          </motion.div>

          <motion.div
            className="space-y-1"
            initial={{ x, opacity: 0 }}
            animate={{ x, opacity: 1 }}
            transition={{ duration, delay: 0.3 }}
          >
            <PasswordField
              label="Password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password)}
              error={errors.password}
              disabled={isLoading}
              required
            />
            
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-primary hover:underline transition"
              >
                Forgot Password?
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ x, opacity: 0 }}
            animate={{ x, opacity: 1 }}
            transition={{ duration, delay: 0.35 }}
          >
            <PrimaryButton type="submit" loading={isLoading}>
              Sign In
            </PrimaryButton>
          </motion.div>
        </motion.form>

        <p className="text-center text-muted-foreground mt-6 text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-primary font-semibold hover:underline">
            Create account
          </Link>
        </p>

        {/* Demo Credentials Section */}
        <motion.div
          className="mt-8 p-4 bg-gray-50 dark:bg-slate-700 border border-border dark:border-slate-600 rounded-xl text-xs text-muted-foreground text-left"
          initial={{ y, opacity: 0 }}
          animate={{ y, opacity: 1 }}
          transition={{ duration, delay: 0.4 }}
        >
          <p className="font-bold text-foreground mb-1.5">Demo Credentials:</p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="font-semibold text-foreground">Worker Profile:</p>
              <p>worker@agriconnect.com</p>
              <p>password123</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Farm Owner / Company:</p>
              <p>farm@agriconnect.com</p>
              <p>password123</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
