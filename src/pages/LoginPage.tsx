import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../components/common/Toast';
import Input from '../components/common/Input';
import PasswordField from '../components/common/PasswordField';
import PrimaryButton from '../components/common/PrimaryButton';
import { Mail, Sprout } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const toast = useToast();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const newErrors: Record<string, string> = {};

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
    } catch (err: any) {
      toast.error(err.message || 'Login failed. Please verify credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-border">
        
        {/* Brand Logo and Title */}
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 bg-[#e8f0ed] text-primary flex items-center justify-center rounded-full mb-3">
            <Sprout size={24} />
          </div>
          <h1 className="text-3xl font-bold text-foreground">AgriConnect</h1>
          <p className="text-muted-foreground mt-2">Welcome back to the farm network</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
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
                className="text-xs font-semibold text-primary hover:underline transition"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <PrimaryButton type="submit" loading={isLoading}>
            Sign In
          </PrimaryButton>
        </form>

        <p className="text-center text-muted-foreground mt-6 text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-primary font-semibold hover:underline">
            Create account
          </Link>
        </p>

        {/* Demo Credentials Section */}
        <div className="mt-8 p-4 bg-gray-50 border border-border rounded-xl text-xs text-muted-foreground text-left">
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
        </div>
      </div>
    </div>
  );
}
