import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../components/common/Toast';
import OTPInput from '../components/common/OTPInput';
import PasswordField from '../components/common/PasswordField';
import PrimaryButton from '../components/common/PrimaryButton';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function ResetPasswordPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { resetPassword, isLoading } = useAuth();
  const toast = useToast();

  const email = state?.email || '';
  
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!email) {
      toast.error('Session expired. Please start over.');
      navigate('/forgot-password');
    }
  }, [email, navigate, toast]);

  const handleSubmit = async (e.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const newErrors = {};

    if (otp.length !== 6) {
      newErrors.otp = 'Please enter the 6-digit OTP code.';
    }

    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await resetPassword(email, otp, { password, confirmPassword });
      toast.success('Your password has been reset successfully. Please login.');
      navigate('/login', { replace: true });
    } catch (err) {
      toast.error(err.message || 'Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-border">
        {/* Back Link */}
        <button
          onClick={() => navigate('/forgot-password')}
          className="flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground mb-6 transition"
        >
          <ArrowLeft size={16} className="mr-1.5" /> Back
        </button>

        <div className="text-center mb-8">
          <div className="mx-auto w-14 h-14 bg-[#e8f0ed] text-primary flex items-center justify-center rounded-full mb-4">
            <ShieldAlert size={28} />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Reset Password</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Enter the reset OTP sent to <span className="font-semibold text-foreground">{email}</span> and configure a new password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* OTP Code */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-foreground text-left">
              Verification Code
            </label>
            <OTPInput onChange={setOtp} disabled={isLoading} />
            {errors.otp && <p className="text-xs text-red-600 font-medium text-left">{errors.otp}</p>}
          </div>

          {/* New Password */}
          <PasswordField
            label="New Password"
            placeholder="Min 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            disabled={isLoading}
            required
          />

          {/* Confirm Password */}
          <PasswordField
            label="Confirm New Password"
            placeholder="Repeat password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            disabled={isLoading}
            required
          />

          <PrimaryButton type="submit" loading={isLoading}>
            Update Password
          </PrimaryButton>
        </form>

        {/* Mock API Help Hint */}
        <div className="mt-8 p-3.5 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-800">
          <p className="font-semibold mb-1">Testing Note (Mock Mode):</p>
          <p>Please enter the standard reset OTP code="font-bold">654321</span></p>
        </div>
      </div>
    </div>
  );
}
