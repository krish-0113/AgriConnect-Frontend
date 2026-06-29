import { useAuth } from '../hooks/useAuth';
import { useAppSelector } from '../store/hooks';
import { Briefcase, Users, TrendingUp, CheckCircle, Plus, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CompanyDashboard() {
  const { user } = useAuth();
  const jobs = useAppSelector((state) => state.jobs.jobs);
  const applications = useAppSelector((state) => state.applications.applications);

  const stats = {
    openJobs) => j.status === 'open').length,
    totalApplications,
    accepted) => a.status === 'accepted').length,
    filled) => j.status === 'filled').length,
  };

  const containerVariants = {
    hidden,
    visible: {
      opacity,
      transition, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden, y,
    visible, y, transition, ease: 'easeOut' } }
  };

  const statCards = [
    { label, value, icon, color, bgColor,
    { label, value, icon, color, bgColor,
    { label, value, icon, color, bgColor,
    { label, value, icon, color, bgColor,
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary/90 to-primary text-white px-4 sm:px-6 lg:px-8 py-12 mb-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity, y={{ opacity, y={{ duration: 0.5 }}>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-white/70 text-sm font-medium mb-1">Company Management</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-balance">{user?.company_name || 'Company'} Dashboard</h1>
              </div>
              <motion.div whileHover={{ scale={{ scale: 0.95 }}>
                <Link
                  to="/jobs"
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2.5 rounded-lg font-medium text-white transition"
                >
                  <Plus size={18} />
                  Post Job
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {statCards.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div key={i} variants={itemVariants}>
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-border dark:border-slate-700 p-6 hover:shadow-lg transition-all duration-200 hover:border-primary/50">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wide mb-1">{stat.label}</p>
                      <p className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</p>
                    </div>
                    <div className={`${stat.bgColor} p-3 rounded-xl`}>
                      <Icon size={24} className={`text-transparent bg-gradient-to-r ${stat.color} bg-clip-text`} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Job Listings */}
        <motion.div
          initial={{ opacity, y: 20 }}
          animate={{ opacity, y: 0 }}
          transition={{ duration, delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-2xl border border-border dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="px-6 py-8 border-b border-border dark:border-slate-700">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <FileText size={24} className="text-primary" />
                  Your Job Listings
                </h2>
                <p className="text-muted-foreground text-sm mt-1">Manage and track your posted job openings</p>
              </div>
              <motion.div whileHover={{ scale={{ scale: 0.95 }}>
                <Link
                  to="/jobs/new"
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                  <Plus size={18} />
                  New Job
                </Link>
              </motion.div>
            </div>
          </div>

          {jobs.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={32} className="text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg font-medium mb-2">No jobs posted yet</p>
              <p className="text-muted-foreground text-sm">Post your first job to start finding the right candidates for your team</p>
            </div>
          ) : (
            <div className="divide-y divide-border dark:divide-slate-700">
              {jobs.slice(0, 8).map((job, idx) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity, x: -20 }}
                  animate={{ opacity, x: 0 }}
                  transition={{ duration, delay: idx * 0.05 }}
                  className="px-6 py-4 hover:bg-muted dark:hover:bg-slate-700/50 transition-colors group"
                >
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate text-lg">{job.title}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">📍 {job.location}</p>
                    </div>
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="text-right">
                        <p className="font-bold text-foreground">{job.applicants}</p>
                        <p className="text-xs text-muted-foreground">Applicants</p>
                      </div>
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                        job.status === 'open'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          === 'closed'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                      }`}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
