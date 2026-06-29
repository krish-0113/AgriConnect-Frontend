import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../components/common/Toast';
import Input from '../components/common/Input';
import PrimaryButton from '../components/common/PrimaryButton';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { forgotPassword, isLoading } = useAuth();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await forgotPassword(email);
      toast.success('Verification code sent successfully!');
      // Navigate to reset password page with email in state
      navigate('/reset-password', { state);
    } catch (err) {
      toast.error(err.message || 'Failed to send verification code.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-border">
        {/* Back Link */}
        <button
          onClick={() => navigate('/login')}
          className="flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground mb-6 transition"
        >
          <ArrowLeft size={16} className="mr-1.5" /> Back to Login
        </button>

        <div className="text-center mb-8">
          <div className="mx-auto w-14 h-14 bg-[#e8f0ed] text-primary flex items-center justify-center rounded-full mb-4">
            <KeyRound size={28} />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Forgot Password</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Enter your registered email address below, and we will send you an OTP to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            type="email"
            label="Email Address"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            icon={<Mail size={18} />}
            disabled={isLoading}
            required
          />

          <PrimaryButton type="submit" loading={isLoading}>
            Send Reset OTP
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}
