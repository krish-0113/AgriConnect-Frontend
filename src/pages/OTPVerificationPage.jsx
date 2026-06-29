import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../components/common/Toast';
import OTPInput from '../components/common/OTPInput';
import { Mail, ArrowLeft, RefreshCw, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OTPVerificationPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { verifyOtp, resendOtp, isLoading } = useAuth();
  const toast = useToast();

  const email = state?.email || '';
  const role = state?.role || 'worker';
  
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (!email) {
      toast.error('Session expired. Please register again.');
      navigate('/register');
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [email, navigate, toast]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP code.');
      return;
    }

    try {
      await verifyOtp(email, otp);
      toast.success('Account activated successfully!');
      
      // Navigate to complete profile page
      navigate('/complete-profile', { state: { email, role } });
    } catch (err) {
      toast.error(err.message || 'Verification failed. Try again.');
    }
  };

  const handleResend = async () => {
    if (timer > 0 || isResending) return;

    try {
      setIsResending(true);
      await resendOtp(email);
      toast.success('A new OTP verification code has been sent to your email.');
      setTimer(60);
    } catch (err) {
      toast.error(err.message || 'Failed to resend OTP.');
    } finally {
      setIsResending(false);
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
              Verify your <span className="text-emerald-400">identity</span>.
            </h2>
            <p className="text-emerald-50/70 text-lg font-medium leading-relaxed">
              We just need to make sure it's really you before we get started.
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
        {/* Subtle background glow for dark mode */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full filter blur-[150px] pointer-events-none -z-10" />
        
        <div className="w-full max-w-[480px] bg-white dark:bg-slate-900 border border-border p-8 sm:p-10 rounded-3xl shadow-xl space-y-8 relative z-10">
          <button
            onClick={() => navigate('/register')}
            className="flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground mb-2 transition w-fit"
          >
            <ArrowLeft size={16} className="mr-1.5" /> Back to Registration
          </button>

          <div className="space-y-4">
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center rounded-2xl shadow-sm">
              <Mail size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground tracking-tight">Verify Account</h1>
              <p className="text-muted-foreground font-medium mt-2">
                We have sent a 6-digit verification code to <span className="font-semibold text-foreground">{email}</span>
              </p>
            </div>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <OTPInput onChange={setOtp} disabled={isLoading || isResending} />
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.length !== 6}
              className="w-full py-4 bg-foreground text-background font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md disabled:opacity-70 flex items-center justify-center group"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                <span className="flex items-center">
                  Verify & Activate <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            {timer > 0 ? (
              <p className="text-sm font-medium text-muted-foreground">
                Resend OTP in <span className="font-bold text-foreground">{timer}s</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                disabled={isResending}
                className="inline-flex items-center text-sm font-bold text-emerald-600 dark:text-emerald-500 hover:underline disabled:opacity-50"
              >
                <RefreshCw size={14} className={`mr-1.5 ${isResending ? 'animate-spin' : ''}`} />
                Resend OTP Code
              </button>
            )}
          </div>

          {/* Mock API Help Hint */}
          <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-800 dark:text-emerald-400">
            <p className="font-semibold mb-1">Testing Note (Mock Mode):</p>
            <p>Please enter the standard test OTP code <span className="font-bold">123456</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
