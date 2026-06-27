import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User, Briefcase } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">AgriConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/jobs" className="text-foreground hover:text-primary transition">
              Jobs
            </Link>
            <Link to="/workers" className="text-foreground hover:text-primary transition">
              Workers
            </Link>
            {isAuthenticated && (
              <>
                {user?.role === 'worker' && (
                  <Link to="/dashboard" className="text-foreground hover:text-primary transition">
                    Dashboard
                  </Link>
                )}
                {user?.role === 'company' && (
                  <Link to="/company-dashboard" className="text-foreground hover:text-primary transition">
                    Dashboard
                  </Link>
                )}
                {user?.role === 'admin' && (
                  <Link to="/admin-dashboard" className="text-foreground hover:text-primary transition">
                    Admin
                  </Link>
                )}
              </>
            )}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <div className="hidden sm:flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">{user.name}</span>
                <Link
                  to="/profile"
                  className="p-2 hover:bg-muted rounded-lg transition"
                  title="Profile"
                >
                  <User size={20} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-muted rounded-lg transition"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-foreground hover:bg-muted rounded-lg transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="space-y-2">
              <Link
                to="/jobs"
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                Jobs
              </Link>
              <Link
                to="/workers"
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                Workers
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg flex items-center space-x-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Briefcase size={18} />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg flex items-center space-x-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-foreground hover:bg-muted rounded-lg flex items-center space-x-2"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
