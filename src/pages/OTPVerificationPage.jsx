import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../components/common/Toast';
import OTPInput from '../components/common/OTPInput';
import PrimaryButton from '../components/common/PrimaryButton';
import { Mail, ArrowLeft, RefreshCw } from 'lucide-react';

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
    // If no email in state, redirect back to register
    if (!email) {
      toast.error('Session expired. Please register again.');
      navigate('/register');
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 ));
    }, 1000);

    return () => clearInterval(interval);
  }, [email, navigate, toast]);

  const handleVerify = async (e.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP code.');
      return;
    }

    try {
      await verifyOtp(email, otp);
      toast.success('Account activated successfully!');
      
      // Navigate to complete profile page
      navigate('/complete-profile', { state, replace);
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
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-border">
        {/* Back Link */}
        <button
          onClick={() => navigate('/register')}
          className="flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground mb-6 transition"
        >
          <ArrowLeft size={16} className="mr-1.5" /> Back to Registration
        </button>

        <div className="text-center mb-8">
          <div className="mx-auto w-14 h-14 bg-[#e8f0ed] text-primary flex items-center justify-center rounded-full mb-4">
            <Mail size={28} />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Verify Your Account</h1>
          <p className="text-muted-foreground mt-2.5 text-sm">
            We have sent a 6-digit verification code to <br />
            <span className="font-semibold text-foreground">{email}</span>
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <OTPInput onChange={setOtp} disabled={isLoading || isResending} />
          </div>

          <PrimaryButton type="submit" loading={isLoading} disabled={otp.length !== 6}>
            Verify & Activate
          </PrimaryButton>
        </form>

        <div className="text-center mt-6">
          {timer > 0 ? (
            <p className="text-sm text-muted-foreground">
              Resend OTP in <span className="font-bold text-foreground">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              disabled={isResending}
              className="inline-flex items-center text-sm font-bold text-primary hover:underline disabled:opacity-50"
            >
              <RefreshCw size={14} className={`mr-1.5 ${isResending ? 'animate-spin' : ''}`} />
              Resend OTP Code
            </button>
          )}
        </div>

        {/* Mock API Help Hint */}
        <div className="mt-8 p-3.5 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-800">
          <p className="font-semibold mb-1">Testing Note (Mock Mode):</p>
          <p>Please enter the standard test OTP code="font-bold">123456</span></p>
        </div>
      </div>
    </div>
  );
}
