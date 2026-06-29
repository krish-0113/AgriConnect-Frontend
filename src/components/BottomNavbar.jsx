import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Home, PlusCircle, Search, Briefcase, Calendar, Bell, Star, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BottomNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) return null;

  const currentTab = new URLSearchParams(location.search).get('tab') || 'home';
  const path = location.pathname;

  // Determine active item based on pathname and search params
  const isActive = (targetPath, targetTab) => {
    if (targetTab) {
      return path === targetPath && currentTab === targetTab;
    }
    return path === targetPath;
  };

  const handleNav = (targetPath, targetTab) => {
    if (targetTab) {
      navigate(`${targetPath}?tab=${targetTab}`);
    } else {
      navigate(targetPath);
    }
  };

  // Farmer Tabs
  const farmerTabs = [
    { label: 'Home', icon: Home, path: '/company-dashboard', tab: 'home' },
    { label: 'Post Job', icon: PlusCircle, path: '/jobs/new' },
    { label: 'My Jobs', icon: Briefcase, path: '/company-dashboard', tab: 'my-jobs' },
    { label: 'Workers', icon: Search, path: '/workers' },
    { label: 'Profile', icon: '/profile', path: '/profile' } // links directly to profile route
  ];

  // Worker Tabs
  const workerTabs = [
    { label: 'Home', icon: Home, path: '/dashboard', tab: 'home' },
    { label: 'Find Jobs', icon: Search, path: '/jobs' },
    { label: 'Applied', icon: Briefcase, path: '/dashboard', tab: 'applications' },
    { label: 'Schedule', icon: Calendar, path: '/dashboard', tab: 'assignments' },
    { label: 'Profile', icon: '/profile', path: '/profile' }
  ];

  // Admin Tabs
  const adminTabs = [
    { label: 'Dashboard', icon: Home, path: '/admin-dashboard', tab: 'home' },
    { label: 'Profile', icon: '/profile', path: '/profile' }
  ];

  const getTabs = () => {
    switch (user.role) {
      case 'company':
        return farmerTabs;
      case 'worker':
        return workerTabs;
      case 'admin':
        return adminTabs;
      default:
        return [];
    }
  };

  const tabs = getTabs();

  if (tabs.length === 0) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-t border-border/80 px-2 py-1 pb-safe shadow-lg">
      <div className="flex justify-around items-center h-14">
        {tabs.map((t, idx) => {
          const isProfile = t.icon === '/profile';
          const Icon = isProfile ? User : t.icon;
          
          const active = isProfile 
            ? isActive(t.path) 
            : isActive(t.path, t.tab);

          return (
            <button
              key={idx}
              onClick={() => handleNav(t.path, t.tab)}
              className="flex flex-col items-center justify-center flex-1 h-full relative py-1 text-center"
            >
              <div className="relative flex flex-col items-center">
                {active && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -inset-x-3 -inset-y-1 bg-primary/10 dark:bg-primary/20 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon
                  size={20}
                  className={`transition-colors duration-200 ${
                    active ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                <span
                  className={`text-[10px] font-bold mt-1 tracking-tight ${
                    active ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {t.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
