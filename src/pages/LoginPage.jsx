import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../components/common/Toast';
import Input from '../components/common/Input';
import PasswordField from '../components/common/PasswordField';
import { Mail, ArrowRight, Phone, KeyRound } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const toast = useToast();

  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'otp'
  const [formData, setFormData] = useState({ email: '', password: '', phone: '' });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = {};

    if (loginMethod === 'email') {
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
    } else {
      // OTP Login flow
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone.replace(/\s+/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      try {
        toast.success('Mock OTP sent successfully! Use code 123456.');
        // Redirect to OTP verification page, passing the phone number as email identifier in state
        navigate('/verify-otp', {
          state: { email: formData.phone, role: 'worker' },
        });
      } catch (err) {
        toast.error('Failed to request OTP. Try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 flex">
      {/* Left side: Image/Branding (Hidden on mobile) */}
      <div className="hidden lg:flex flex-1 relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 to-slate-900/90 z-10 mix-blend-multiply" />
        <img 
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80" 
          alt="Agriculture Sunrise" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 flex flex-col justify-between p-12 h-full text-white w-full">
          <Link to="/" className="flex items-center space-x-3 w-fit">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-black text-xl shadow-lg">
              A
            </div>
            <span className="text-2xl font-black tracking-tight">AgriConnect</span>
          </Link>
          
          <div className="max-w-md space-y-6">
            <h2 className="text-4xl font-black leading-[1.1] tracking-tighter">
              Welcome back to <span className="text-emerald-400">agriculture</span>.
            </h2>
            <p className="text-emerald-50/70 text-lg font-medium leading-relaxed">
              Log in to connect with top agricultural talent or find your next farming opportunity.
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
        {/* Subtle background glow for dark mode */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full filter blur-[150px] pointer-events-none -z-10" />
        
        <div className="w-full max-w-[480px] bg-white dark:bg-slate-900 border border-border p-8 sm:p-10 rounded-3xl shadow-xl space-y-8 relative z-10">
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-foreground tracking-tight">Sign In</h1>
            <p className="text-muted-foreground font-medium">Choose your login method to access your account.</p>
          </div>

          {/* Login Method Toggle */}
          <div className="flex bg-muted p-1 rounded-xl">
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                loginMethod === 'email'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Email Login
            </button>
            <button
              onClick={() => setLoginMethod('otp')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                loginMethod === 'otp'
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Phone (OTP) Login
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {loginMethod === 'email' ? (
                <motion.div
                  key="email-form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <Input
                    type="email"
                    label="Email Address"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    error={errors.email}
                    disabled={isLoading}
                    icon={<Mail size={18} />}
                    required
                  />

                  <div className="space-y-1">
                    <PasswordField
                      label="Password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      error={errors.password}
                      disabled={isLoading}
                      required
                    />
                    
                    <div className="text-right">
                      <Link
                        to="/forgot-password"
                        className="text-xs font-semibold text-emerald-600 dark:text-emerald-500 hover:underline transition"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="otp-form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <Input
                    type="tel"
                    label="Phone Number"
                    placeholder="+91 9999999999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    error={errors.phone}
                    disabled={isLoading}
                    icon={<Phone size={18} />}
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-foreground text-background font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md disabled:opacity-70 flex items-center justify-center group"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  {loginMethod === 'email' ? 'Sign In' : 'Request OTP'} <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>

          {/* Social Sign Up Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-border"></div>
            <span className="flex-shrink mx-4 text-xs text-muted-foreground uppercase font-bold tracking-wider">or sign in with</span>
            <div className="flex-grow border-t border-border"></div>
          </div>

          {/* Social Sign Up Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => toast.info('Google Sign-In coming soon!')}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-border bg-card hover:bg-muted transition duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <span className="text-sm font-bold text-foreground">Google</span>
            </button>

            <button
              type="button"
              onClick={() => toast.info('Facebook Sign-In coming soon!')}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-border bg-card hover:bg-muted transition duration-200"
            >
              <svg className="w-5 h-5 fill-[#1877F2]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-sm font-bold text-foreground">Facebook</span>
            </button>
          </div>

          <p className="text-center text-muted-foreground font-medium text-sm pt-2">
            Don't have an account?{' '}
            <Link to="/register" className="text-foreground font-bold hover:underline">
              Create account
            </Link>
          </p>

          {/* Demo Credentials Section */}
          <motion.div
            className="mt-6 p-4 bg-muted/50 border border-border rounded-xl text-xs text-muted-foreground text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="font-bold text-foreground mb-2 text-sm">Demo Credentials</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Worker Profile</p>
                <p>worker@agriconnect.com</p>
                <p className="font-mono mt-0.5">password123</p>
              </div>
              <div>
                <p className="font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Farm Owner</p>
                <p>farm@agriconnect.com</p>
                <p className="font-mono mt-0.5">password123</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
