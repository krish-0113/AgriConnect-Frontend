import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../components/common/Toast';
import Input from '../components/common/Input';
import PasswordField from '../components/common/PasswordField';
import PrimaryButton from '../components/common/PrimaryButton';
import { Mail, User, Phone, Sprout, Tractor, Briefcase } from 'lucide-react';


export default function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = (searchParams.get('role')) || 'worker';
  
  const { register, isLoading } = useAuth();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name,
    email,
    phone,
    password,
    confirmPassword,
    role,
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e.FormEvent) => {
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
        state, role,
      });
    } catch (err) {
      toast.error(err.message || 'Registration failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-border">
        
        {/* Brand details */}
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 bg-[#e8f0ed] text-primary flex items-center justify-center rounded-full mb-3">
            <Sprout size={24} />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Join AgriConnect</h1>
          <p className="text-muted-foreground mt-2">Connect, search, and grow today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Role Choice Buttons */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-foreground">I want to register:</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role)}
                className={`flex flex-col items-center p-4 border-2 rounded-xl transition duration-150 ${
                  formData.role === 'worker'
                    ? 'border-primary bg-[#e8f0ed] text-[#1b4332]'
                    : 'border-border bg-white text-muted-foreground hover:bg-gray-50'
                }`}
              >
                <Briefcase size={22} className="mb-1.5" />
                <span className="font-semibold text-sm">Farm Worker</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, role)}
                className={`flex flex-col items-center p-4 border-2 rounded-xl transition duration-150 ${
                  formData.role === 'company'
                    ? 'border-primary bg-[#e8f0ed] text-[#1b4332]'
                    : 'border-border bg-white text-muted-foreground hover:bg-gray-50'
                }`}
              >
                <Tractor size={22} className="mb-1.5" />
                <span className="font-semibold text-sm">Farm Owner</span>
              </button>
            </div>
          </div>

          <Input
            type="text"
            label="Full Name"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name)}
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
            onChange={(e) => setFormData({ ...formData, email)}
            error={errors.email}
            disabled={isLoading}
            icon={<Mail size={18} />}
            required
          />

          <Input
            type="tel"
            label="Phone Number"
            placeholder="e.g. +91 9999999999"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone)}
            error={errors.phone}
            disabled={isLoading}
            icon={<Phone size={18} />}
          />

          <PasswordField
            label="Password"
            placeholder="Min 8 characters"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password)}
            error={errors.password}
            disabled={isLoading}
            required
          />

          <PasswordField
            label="Confirm Password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword)}
            error={errors.confirmPassword}
            disabled={isLoading}
            required
          />

          <PrimaryButton type="submit" loading={isLoading}>
            Submit Registration
          </PrimaryButton>
        </form>

        <p className="text-center text-muted-foreground mt-6 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
