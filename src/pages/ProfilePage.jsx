import { useAuth } from '../hooks/useAuth';
import { Mail, Phone, MapPin, LogOut, Shield, Key, Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-8">
        <div className="max-w-2xl mx-auto px-4 w-full">
          <div className="bg-card border border-border rounded-2xl shadow-md p-8 text-center">
            <p className="text-muted-foreground animate-pulse">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full filter blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full filter blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight">My Profile</h1>
          <p className="text-muted-foreground font-medium mt-2">Manage your account settings and preferences.</p>
        </div>

        <div className="bg-card border border-border rounded-3xl shadow-xl p-8 sm:p-10 space-y-8">
          {/* User Header */}
          <div className="flex items-center gap-6 pb-8 border-b border-border">
            <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
              <span className="inline-flex items-center gap-1.5 mt-1 px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full capitalize">
                <Shield size={12} /> {user.role} Account
              </span>
            </div>
          </div>

          {/* Profile Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-border">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Email Address</p>
              <div className="flex items-center gap-3 bg-muted/50 border border-border p-4 rounded-2xl">
                <Mail size={18} className="text-emerald-600 dark:text-emerald-400" />
                <p className="text-foreground font-medium text-sm truncate">{user.email}</p>
              </div>
            </div>

            {user.phone && (
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Phone Number</p>
                <div className="flex items-center gap-3 bg-muted/50 border border-border p-4 rounded-2xl">
                  <Phone size={18} className="text-emerald-600 dark:text-emerald-400" />
                  <p className="text-foreground font-medium text-sm">{user.phone}</p>
                </div>
              </div>
            )}

            <div className="md:col-span-2">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">User ID (Unique Reference)</p>
              <div className="bg-muted/50 border border-border p-4 rounded-2xl">
                <p className="text-foreground font-mono text-xs">{user.id}</p>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-foreground">Account Settings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button className="flex flex-col items-start p-4 border border-border bg-card hover:bg-muted/50 rounded-2xl transition-all duration-200 group text-left">
                <User size={20} className="text-emerald-600 dark:text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-foreground text-sm">Update Profile</span>
                <span className="text-[11px] text-muted-foreground mt-0.5">Edit personal info</span>
              </button>

              <button className="flex flex-col items-start p-4 border border-border bg-card hover:bg-muted/50 rounded-2xl transition-all duration-200 group text-left">
                <Key size={20} className="text-emerald-600 dark:text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-foreground text-sm">Change Password</span>
                <span className="text-[11px] text-muted-foreground mt-0.5">Update credentials</span>
              </button>

              <button className="flex flex-col items-start p-4 border border-border bg-card hover:bg-muted/50 rounded-2xl transition-all duration-200 group text-left">
                <Bell size={20} className="text-emerald-600 dark:text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-foreground text-sm">Notifications</span>
                <span className="text-[11px] text-muted-foreground mt-0.5">Manage email preferences</span>
              </button>
            </div>
          </div>

          {/* Logout */}
          <div className="pt-8 border-t border-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 px-6 py-4 rounded-2xl font-bold transition shadow-sm"
            >
              <LogOut size={18} />
              Sign Out from Platform
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
