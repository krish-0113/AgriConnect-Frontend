import { useAppSelector } from '../store/hooks';
import { BarChart, Users, Briefcase, Building2, TrendingUp, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const jobs = useAppSelector((state) => state.jobs.jobs);
  const workers = useAppSelector((state) => state.workers.workers);
  const companies = useAppSelector((state) => state.companies.companies);
  const applications = useAppSelector((state) => state.applications.applications);

  const stats = {
    totalJobs: jobs.length,
    activeJobs: jobs.filter((j) => j.status === 'open').length,
    totalWorkers: workers.length,
    activeWorkers: workers.filter((w) => w.status === 'active').length,
    totalCompanies: companies.length,
    verifiedCompanies: companies.filter((c) => c.verified).length,
    totalApplications: applications.length,
    pendingApplications: applications.filter((a) => a.status === 'pending').length,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  const statCards = [
    { label: 'Total Jobs', value: stats.totalJobs, icon: Briefcase, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-900/20', detail: `${stats.activeJobs} active` },
    { label: 'Total Workers', value: stats.totalWorkers, icon: Users, color: 'from-indigo-500 to-indigo-600', bgColor: 'bg-indigo-50 dark:bg-indigo-900/20', detail: `${stats.activeWorkers} active` },
    { label: 'Companies', value: stats.totalCompanies, icon: Building2, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50 dark:bg-purple-900/20', detail: `${stats.verifiedCompanies} verified` },
    { label: 'Applications', value: stats.totalApplications, icon: BarChart, color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50 dark:bg-orange-900/20', detail: `${stats.pendingApplications} pending` },
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary/90 to-primary text-white px-4 sm:px-6 lg:px-8 py-12 mb-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div>
              <p className="text-white/70 text-sm font-medium mb-1">System Administration</p>
              <h1 className="text-3xl sm:text-4xl font-bold">Platform Overview</h1>
              <p className="text-white/60 text-sm mt-2">Monitor platform health and user activity</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Stats Overview */}
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
                      <p className="text-xs text-muted-foreground mt-2">{stat.detail}</p>
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

        {/* System Health */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-border dark:border-slate-700 p-6">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 size={24} className="text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xl font-bold text-foreground">Worker Health</h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-foreground">Active Workers</p>
                  <span className="text-sm font-bold text-indigo-600">{Math.round((stats.activeWorkers / Math.max(stats.totalWorkers, 1)) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(stats.activeWorkers / Math.max(stats.totalWorkers, 1)) * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  ></motion.div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{stats.activeWorkers} of {stats.totalWorkers} active</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-border dark:border-slate-700 p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={24} className="text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-bold text-foreground">Job Health</h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-foreground">Open Positions</p>
                  <span className="text-sm font-bold text-blue-600">{Math.round((stats.activeJobs / Math.max(stats.totalJobs, 1)) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(stats.activeJobs / Math.max(stats.totalJobs, 1)) * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  ></motion.div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{stats.activeJobs} of {stats.totalJobs} open</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-border dark:border-slate-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-border dark:border-slate-700 bg-gradient-to-r from-blue-50 to-blue-50/50 dark:from-blue-900/20 dark:to-blue-900/10">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Briefcase size={20} className="text-blue-600" />
                Recent Jobs
              </h2>
            </div>
            {jobs.length === 0 ? (
              <div className="px-6 py-8 text-center">
                <p className="text-muted-foreground">No jobs yet</p>
              </div>
            ) : (
              <div className="divide-y divide-border dark:divide-slate-700">
                {jobs.slice(0, 5).map((job, idx) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="px-6 py-3 hover:bg-muted dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <p className="font-semibold text-foreground text-sm">{job.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{job.company.name}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-border dark:border-slate-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-border dark:border-slate-700 bg-gradient-to-r from-orange-50 to-orange-50/50 dark:from-orange-900/20 dark:to-orange-900/10">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Clock size={20} className="text-orange-600" />
                Pending Applications
              </h2>
            </div>
            {applications.filter((a) => a.status === 'pending').length === 0 ? (
              <div className="px-6 py-8 text-center">
                <p className="text-muted-foreground">No pending applications</p>
              </div>
            ) : (
              <div className="divide-y divide-border dark:divide-slate-700">
                {applications
                  .filter((a) => a.status === 'pending')
                  .slice(0, 5)
                  .map((app, idx) => (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="px-6 py-3 hover:bg-muted dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <p className="font-semibold text-foreground text-sm">Application #{app.id}</p>
                      <p className="text-xs text-muted-foreground mt-1">Job: {app.jobId}</p>
                    </motion.div>
                  ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
