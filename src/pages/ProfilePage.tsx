import { useAuth } from '../hooks/useAuth';
import { Mail, Phone, MapPin, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-muted py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">My Profile</h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-start justify-between mb-8 pb-8 border-b border-border">
            <div>
              <h2 className="text-3xl font-bold text-foreground">{user.name}</h2>
              <p className="text-muted-foreground capitalize mt-1">{user.role} Account</p>
            </div>
          </div>

          {/* Profile Information */}
          <div className="space-y-6 mb-8">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Email</p>
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-primary" />
                <p className="text-foreground">{user.email}</p>
              </div>
            </div>

            {user.phone && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Phone</p>
                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-primary" />
                  <p className="text-foreground">{user.phone}</p>
                </div>
              </div>
            )}

            <div>
              <p className="text-sm text-muted-foreground mb-2">User ID</p>
              <p className="text-foreground font-mono text-sm">{user.id}</p>
            </div>
          </div>

          {/* Account Settings */}
          <div className="pt-8 border-t border-border">
            <h3 className="text-xl font-bold text-foreground mb-4">Account Settings</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 hover:bg-muted rounded-lg transition">
                Update Profile Information
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-muted rounded-lg transition">
                Change Password
              </button>
              <button className="w-full text-left px-4 py-3 hover:bg-muted rounded-lg transition">
                Email Preferences
              </button>
            </div>
          </div>

          {/* Logout */}
          <div className="mt-8 pt-8 border-t border-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-100 text-red-700 hover:bg-red-200 px-6 py-3 rounded-lg font-semibold transition"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
