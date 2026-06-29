import { useAuth } from '../hooks/useAuth';
import { useAppSelector } from '../store/hooks';
import { Briefcase, FileText, Clock, CheckCircle, TrendingUp, Search, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WorkerDashboard() {
  const { user } = useAuth();
  const applications = useAppSelector((state) => state.applications.applications);

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === 'pending').length,
    accepted: applications.filter((a) => a.status === 'accepted').length,
    offered: applications.filter((a) => a.status === 'offered').length,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  const statCards = [
    { label: 'Total Applications', value: stats.total, icon: Briefcase, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'from-amber-500 to-amber-600', bgColor: 'bg-amber-50 dark:bg-amber-900/20' },
    { label: 'Accepted', value: stats.accepted, icon: CheckCircle, color: 'from-green-500 to-green-600', bgColor: 'bg-green-50 dark:bg-green-900/20' },
    { label: 'Offers', value: stats.offered, icon: FileText, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary/90 to-primary text-white px-4 sm:px-6 lg:px-8 py-12 mb-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-white/70 text-sm font-medium mb-1">Welcome back</p>
                <h1 className="text-3xl sm:text-4xl font-bold text-balance">{user?.name || 'Worker'}!</h1>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2.5 rounded-lg font-medium text-white transition"
              >
                <Search size={18} />
                Find Jobs
              </motion.button>
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

        {/* Applications List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-2xl border border-border dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="px-6 py-8 border-b border-border dark:border-slate-700">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Briefcase size={24} className="text-primary" />
                  Recent Applications
                </h2>
                <p className="text-muted-foreground text-sm mt-1">Track your job applications and their status</p>
              </div>
              {applications.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                  <Plus size={18} />
                  Apply Now
                </motion.button>
              )}
            </div>
          </div>

          {applications.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase size={32} className="text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg font-medium mb-2">No applications yet</p>
              <p className="text-muted-foreground text-sm">Start exploring job listings and apply to jobs that match your skills</p>
            </div>
          ) : (
            <div className="divide-y divide-border dark:divide-slate-700">
              {applications.map((app, idx) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="px-6 py-4 hover:bg-muted dark:hover:bg-slate-700/50 transition-colors group"
                >
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">Job #{app.jobId}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{app.companyId}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                        app.status === 'pending'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                          : app.status === 'accepted'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : app.status === 'offered'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-slate-300'
                      }`}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">{new Date(app.appliedDate).toLocaleDateString()}</span>
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
