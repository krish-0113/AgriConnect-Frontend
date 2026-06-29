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
            <Link to="/jobs" className="text-foreground hover:text-primary font-semibold text-sm transition">
              {t('jobs')}
            </Link>
            <Link to="/workers" className="text-foreground hover:text-primary font-semibold text-sm transition">
              {t('workers')}
            </Link>
            {isAuthenticated && (
              <>
                {user?.role === 'worker' && (
                  <Link to="/dashboard" className="text-foreground hover:text-primary font-semibold text-sm transition">
                    {t('dashboard')}
                  </Link>
                )}
                {user?.role === 'company' && (
                  <Link to="/company-dashboard" className="text-foreground hover:text-primary font-semibold text-sm transition">
                    {t('dashboard')}
                  </Link>
                )}
                {user?.role === 'admin' && (
                  <Link to="/admin-dashboard" className="text-foreground hover:text-primary font-semibold text-sm transition">
                    {t('admin')}
                  </Link>
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
              {theme === 'dark' ? <Sun size={18} /> ={18} />}
            </button>

            <span className="h-5 w-[1px] bg-border hidden sm:inline" />

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

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground rounded-xl"
            >
              {menuOpen ? <X size={22} /> ={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar/Menu */}
      {menuOpen && (
        <nav className="md:hidden py-4 border-t border-border bg-white dark:bg-card px-4 space-y-2">
          <Link
            to="/jobs"
            className="block px-4 py-2 text-foreground font-semibold hover:bg-muted rounded-xl transition"
            onClick={() => setMenuOpen(false)}
          >
            {t('jobs')}
          </Link>
          <Link
            to="/workers"
            className="block px-4 py-2 text-foreground font-semibold hover:bg-muted rounded-xl transition"
            onClick={() => setMenuOpen(false)}
          >
            {t('workers')}
          </Link>
          {isAuthenticated ? (
            <>
              {user?.role === 'worker' && (
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-foreground font-semibold hover:bg-muted rounded-xl flex items-center space-x-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <Briefcase size={16} />
                  <span>{t('dashboard')}</span>
                </Link>
              )}
              {user?.role === 'company' && (
                <Link
                  to="/company-dashboard"
                  className="block px-4 py-2 text-foreground font-semibold hover:bg-muted rounded-xl flex items-center space-x-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <Briefcase size={16} />
                  <span>{t('dashboard')}</span>
                </Link>
              )}
              <Link
                to="/profile"
                className="block px-4 py-2 text-foreground font-semibold hover:bg-muted rounded-xl flex items-center space-x-2"
                onClick={() => setMenuOpen(false)}
              >
                <User size={16} />
                <span>{t('profile')}</span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-red-600 font-semibold hover:bg-muted rounded-xl flex items-center space-x-2 transition"
              >
                <LogOut size={16} />
                <span>{t('logout')}</span>
              </button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                to="/login"
                className="text-center py-2 text-foreground hover:bg-muted font-bold text-sm rounded-xl border border-border"
                onClick={() => setMenuOpen(false)}
              >
                {t('login')}
              </Link>
              <Link
                to="/register"
                className="text-center py-2 bg-primary text-white font-bold text-sm rounded-xl"
                onClick={() => setMenuOpen(false)}
              >
                {t('signUp')}
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
