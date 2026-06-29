import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User, Briefcase, Sun, Moon, Globe } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/welcome');
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-card border-b border-border shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-md shadow-primary/20">
              <span className="text-white font-extrabold text-lg">A</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-foreground">
              AgriConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {!isAuthenticated ? (
              <>
                <Link to="/welcome" className="text-foreground hover:text-primary font-semibold text-sm transition">
                  Welcome
                </Link>
                <Link to="/jobs" className="text-foreground hover:text-primary font-semibold text-sm transition">
                  Browse Jobs
                </Link>
              </>
            ) : (
              <>
                {/* Farmer (company) desktop menu */}
                {user?.role === 'company' && (
                  <>
                    <Link to="/company-dashboard" className="text-foreground hover:text-primary font-semibold text-sm transition">
                      Dashboard
                    </Link>
                    <Link to="/jobs/new" className="text-foreground hover:text-primary font-semibold text-sm transition">
                      Post Job
                    </Link>
                    <Link to="/company-dashboard?tab=my-jobs" className="text-foreground hover:text-primary font-semibold text-sm transition">
                      My Jobs
                    </Link>
                    <Link to="/workers" className="text-foreground hover:text-primary font-semibold text-sm transition">
                      Search Workers
                    </Link>
                    <Link to="/company-dashboard?tab=contacts" className="text-foreground hover:text-primary font-semibold text-sm transition">
                      Contacts
                    </Link>
                    <Link to="/company-dashboard?tab=reviews" className="text-foreground hover:text-primary font-semibold text-sm transition">
                      Reviews
                    </Link>
                  </>
                )}

                {/* Worker desktop menu */}
                {user?.role === 'worker' && (
                  <>
                    <Link to="/dashboard" className="text-foreground hover:text-primary font-semibold text-sm transition">
                      Dashboard
                    </Link>
                    <Link to="/jobs" className="text-foreground hover:text-primary font-semibold text-sm transition">
                      Find Jobs
                    </Link>
                    <Link to="/dashboard?tab=applications" className="text-foreground hover:text-primary font-semibold text-sm transition">
                      My Applications
                    </Link>
                    <Link to="/dashboard?tab=assignments" className="text-foreground hover:text-primary font-semibold text-sm transition">
                      Work Assignments
                    </Link>
                    <Link to="/dashboard?tab=reviews" className="text-foreground hover:text-primary font-semibold text-sm transition">
                      My Reviews
                    </Link>
                  </>
                )}

                {/* Admin desktop menu */}
                {user?.role === 'admin' && (
                  <>
                    <Link to="/admin-dashboard" className="text-foreground hover:text-primary font-semibold text-sm transition">
                      Admin Dashboard
                    </Link>
                  </>
                )}
              </>
            )}
          </nav>

          {/* Control Settings and Auth Section */}
          <div className="flex items-center space-x-3 sm:space-x-4">

            {/* Language Selector Selector */}
            <div className="relative inline-flex items-center">
              <Globe size={16} className="text-muted-foreground mr-1.5 hidden sm:inline" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-foreground border-none text-xs sm:text-sm font-bold focus:outline-none cursor-pointer"
              >
                <option value="en" className="bg-white dark:bg-card text-foreground">EN</option>
                <option value="hi" className="bg-white dark:bg-card text-foreground">हिन्दी</option>
              </select>
            </div>

            {/* Dark Mode Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 text-muted-foreground hover:text-foreground rounded-xl hover:bg-muted transition duration-150"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <span className="h-5 w-[1px] bg-border" />

            {/* Auth Buttons / Profile info */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-2 sm:space-x-3.5">
                <span className="text-sm font-semibold text-foreground hidden md:inline">
                  {user.name}
                </span>
                <Link
                  to="/profile"
                  className="p-2 text-muted-foreground hover:text-foreground rounded-xl hover:bg-muted transition"
                  title={t('profile')}
                >
                  <User size={18} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-muted-foreground hover:text-red-600 rounded-xl hover:bg-muted transition"
                  title={t('logout')}
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 sm:px-4 sm:py-2 text-foreground hover:bg-muted font-bold text-xs sm:text-sm rounded-xl transition"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-1.5 sm:px-4.5 sm:py-2 bg-primary text-white font-bold text-xs sm:text-sm rounded-xl hover:bg-opacity-95 transition shadow-sm"
                >
                  {t('signUp')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
