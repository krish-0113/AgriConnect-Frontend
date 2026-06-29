import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../components/common/Toast';
import Input from '../components/common/Input';
import PasswordField from '../components/common/PasswordField';
import { Mail, User, Phone, Sprout, Tractor, Briefcase, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = (searchParams.get('role')) || 'worker';
  
  const { register, isLoading } = useAuth();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: initialRole,
  });

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !/^\+?[1-9]\d{1,14}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!acceptTerms) {
      newErrors.acceptTerms = 'You must accept the safety guidelines and terms';
      toast.info('Please accept the safety guidelines to register.');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await register(
        formData.name,
        formData.email,
        formData.password,
        formData.role,
        formData.phone
      );
      toast.success('Registration details submitted. Please verify OTP.');
      
      // Navigate to OTP page, passing email & role in route state
      navigate('/verify-otp', {
        state: { email: formData.email, role: formData.role },
      });
    } catch (err) {
      toast.error(err.message || 'Registration failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 flex">
      {/* Left side: Image/Branding (Hidden on mobile) */}
      <div className="hidden lg:flex flex-1 relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 to-slate-900/90 z-10 mix-blend-multiply" />
        <img 
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80" 
          alt="Agriculture" 
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
              Start your <span className="text-emerald-400">agricultural</span> journey today.
            </h2>
            <p className="text-emerald-50/70 text-lg font-medium leading-relaxed">
              Join thousands of farmers and workers connecting daily to build a stronger agricultural community across India.
            </p>
            <div className="flex -space-x-3 pt-4">
              {[1,2,3,4].map((i) => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-slate-900 bg-emerald-100 flex items-center justify-center overflow-hidden z-[4]`}>
                  <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=e2e8f0`} alt="user" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs font-bold shadow-lg">
                10k+
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
        {/* Subtle background glow for dark mode */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full filter blur-[150px] pointer-events-none -z-10" />
        
        <div className="w-full max-w-[480px] bg-white dark:bg-slate-900 border border-border p-8 sm:p-10 rounded-3xl shadow-xl space-y-8 relative z-10">
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-foreground tracking-tight">Create an account</h1>
            <p className="text-muted-foreground font-medium">Enter your details to get started.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Selection */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">I am a</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'worker' })}
                  className={`relative flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 overflow-hidden ${
                    formData.role === 'worker'
                      ? 'border-emerald-500 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400'
                      : 'border-border bg-white dark:bg-card text-muted-foreground hover:border-border/80'
                  }`}
                >
                  <AnimatePresence>
                    {formData.role === 'worker' && (
                      <motion.div
                        layoutId="activeRole"
                        className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-500/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>
                  <div className="relative z-10 flex flex-col items-center space-y-2">
                    <Briefcase size={20} />
                    <span className="font-bold text-sm">Farm Worker</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'company' })}
                  className={`relative flex items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 overflow-hidden ${
                    formData.role === 'company'
                      ? 'border-emerald-500 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400'
                      : 'border-border bg-white dark:bg-card text-muted-foreground hover:border-border/80'
                  }`}
                >
                  <AnimatePresence>
                    {formData.role === 'company' && (
                      <motion.div
                        layoutId="activeRole"
                        className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-500/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>
                  <div className="relative z-10 flex flex-col items-center space-y-2">
                    <Tractor size={20} />
                    <span className="font-bold text-sm">Farm Owner</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <Input
                type="text"
                label="Full Name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={errors.name}
                disabled={isLoading}
                icon={<User size={18} />}
                required
              />

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

              <Input
                type="tel"
                label="Phone Number"
                placeholder="+91 9999999999"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                error={errors.phone}
                disabled={isLoading}
                icon={<Phone size={18} />}
              />

              <PasswordField
                label="Password"
                placeholder="Min 8 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password}
                disabled={isLoading}
                required
              />

              <PasswordField
                label="Confirm Password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                error={errors.confirmPassword}
                disabled={isLoading}
                required
              />
            </div>

            {/* Safety Policies check box */}
            <div className="flex items-start gap-2.5 p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-border">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-5 h-5 rounded-md accent-primary mt-0.5 flex-shrink-0 cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-muted-foreground font-semibold leading-relaxed cursor-pointer select-none">
                I agree to the <Link to="/policies" className="text-primary hover:underline font-bold">Safety Guidelines</Link>, responsibilities, and platform terms of service.
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="text-[11px] text-red-500 font-bold -mt-3 pl-1">{errors.acceptTerms}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-black rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md disabled:opacity-70 flex items-center justify-center group text-sm"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  Create Account <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>

          {/* Social Sign Up Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-border"></div>
            <span className="flex-shrink mx-4 text-xs text-muted-foreground uppercase font-bold tracking-wider">or sign up with</span>
            <div className="flex-grow border-t border-border"></div>
          </div>

          {/* Social Sign Up Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => toast.info('Google Sign-Up coming soon!')}
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
              onClick={() => toast.info('Facebook Sign-Up coming soon!')}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-border bg-card hover:bg-muted transition duration-200"
            >
              <svg className="w-5 h-5 fill-[#1877F2]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-sm font-bold text-foreground">Facebook</span>
            </button>
          </div>

          <p className="text-center text-muted-foreground font-medium text-sm pt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-foreground font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
