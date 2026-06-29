import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  BarChart, Users, Briefcase, Building2, TrendingUp, AlertCircle, CheckCircle2,
  Clock, Shield, ArrowRight, Settings, Trash, Eye, Check, X, Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { useToast } from '../components/common/Toast';
import { deleteJob } from '../store/slices/jobsSlice';

export default function AdminDashboard() {
  const dispatch = useAppDispatch();
  const toast = useToast();

  const jobs = useAppSelector((state) => state.jobs.jobs);
  const workers = useAppSelector((state) => state.workers.workers);
  const companies = useAppSelector((state) => state.companies.companies);
  const applications = useAppSelector((state) => state.applications.applications);

  const [activeTab, setActiveTab] = useState('analytics');

  // Stats calculation
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

  const statCards = [
    { label: 'Total Jobs', value: stats.totalJobs, icon: Briefcase, color: 'text-blue-500', bgColor: 'bg-blue-500/10 border-blue-500/20', detail: `${stats.activeJobs} active` },
    { label: 'Workers', value: stats.totalWorkers, icon: Users, color: 'text-indigo-500', bgColor: 'bg-indigo-500/10 border-indigo-500/20', detail: `${stats.activeWorkers} active` },
    { label: 'Farmers / Companies', value: stats.totalCompanies, icon: Building2, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10 border-emerald-500/20', detail: `${stats.verifiedCompanies} verified` },
    { label: 'Applications', value: stats.totalApplications, icon: BarChart, color: 'text-orange-500', bgColor: 'bg-orange-500/10 border-orange-500/20', detail: `${stats.pendingApplications} pending` },
  ];

  // Actions
  const handleAuthorizeCompany = (id, name) => {
    toast.success(`Farmer "${name}" authorized and verified!`);
  };

  const handleDeleteJob = (id) => {
    dispatch(deleteJob(id));
    toast.success('Job listing removed successfully from the platform.');
  };

  const handleDeactivateUser = (name) => {
    toast.success(`User account "${name}" deactivated.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      
      {/* Admin Header */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-border mb-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20 uppercase tracking-widest">
              <Shield size={12} /> Root Administration
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">
              Control <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Center</span>
            </h1>
            <p className="text-slate-400 font-medium text-xs sm:text-sm">
              Manage users, audit listings, configure platform categories, and inspect system reports.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Sidebar/Tab List */}
        <div className="flex bg-white dark:bg-slate-900 border border-border p-1.5 rounded-2xl mb-8 overflow-x-auto select-none scrollbar-none">
          {[
            { id: 'analytics', label: 'Analytics', icon: BarChart },
            { id: 'users', label: 'Manage Users', icon: Users },
            { id: 'jobs', label: 'Manage Jobs', icon: Briefcase },
            { id: 'settings', label: 'System Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-extrabold transition-all flex-shrink-0 active:scale-95 ${
                  isSelected
                    ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-md'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab contents */}
        <AnimatePresence mode="wait">
          
          {/* ANALYTICS TAB */}
          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="bg-white dark:bg-slate-900 border border-border rounded-3xl p-6 shadow-sm flex items-center justify-between group">
                      <div className="space-y-1">
                        <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                        <p className="text-3xl font-black text-foreground leading-none">{stat.value}</p>
                        <span className="text-[10px] text-muted-foreground font-bold uppercase pt-1 block">{stat.detail}</span>
                      </div>
                      <div className={`p-3 rounded-2xl border ${stat.bgColor} ${stat.color}`}>
                        <Icon size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action panels */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Awaiting Verifications */}
                <div className="bg-white dark:bg-slate-900 border border-border rounded-3xl overflow-hidden shadow-sm">
                  <div className="px-6 py-5 border-b border-border">
                    <h3 className="font-black text-foreground text-lg flex items-center gap-2">
                      <AlertCircle size={20} className="text-amber-500" /> Pending Authorizations
                    </h3>
                  </div>
                  
                  <div className="divide-y divide-border">
                    {companies.filter((c) => !c.verified).length === 0 ? (
                      <div className="p-8 text-center text-muted-foreground text-xs font-bold">
                        All registered farm accounts are verified.
                      </div>
                    ) : (
                      companies.filter((c) => !c.verified).map((comp) => (
                        <div key={comp.id} className="p-5 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          <div>
                            <p className="font-extrabold text-foreground">{comp.name}</p>
                            <p className="text-[10px] text-muted-foreground font-semibold">📍 {comp.location}</p>
                          </div>
                          
                          <Button
                            onClick={() => handleAuthorizeCompany(comp.id, comp.name)}
                            size="xs"
                            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold"
                          >
                            Verify Owner
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Audit Logs */}
                <div className="bg-white dark:bg-slate-900 border border-border rounded-3xl overflow-hidden shadow-sm">
                  <div className="px-6 py-5 border-b border-border">
                    <h3 className="font-black text-foreground text-lg flex items-center gap-2">
                      <Clock size={20} className="text-primary" /> Activity Audit Log
                    </h3>
                  </div>
                  
                  <div className="p-5 space-y-4">
                    <div className="flex gap-3 text-xs">
                      <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-foreground">Worker Profile Ramesh Verified</p>
                        <p className="text-[10px] text-muted-foreground">Verification check complete - 5m ago</p>
                      </div>
                    </div>
                    <div className="flex gap-3 text-xs">
                      <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-foreground">Daily database audit runs successfully</p>
                        <p className="text-[10px] text-muted-foreground">Automated platform log - 1hr ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* USERS TAB */}
          {activeTab === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-slate-900 border border-border rounded-3xl overflow-hidden shadow-sm">
                <div className="px-6 py-5 border-b border-border">
                  <h3 className="text-lg font-black text-foreground">Registered Workers ({workers.length})</h3>
                </div>
                
                <div className="divide-y divide-border">
                  {workers.map((worker) => (
                    <div key={worker.id} className="p-5 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <div>
                        <p className="font-extrabold text-foreground">{worker.name}</p>
                        <p className="text-xs text-muted-foreground">Experience: {worker.experience} yrs • Location: {worker.location}</p>
                      </div>

                      <Button
                        onClick={() => handleDeactivateUser(worker.name)}
                        size="xs"
                        variant="outline"
                        className="text-red-500 border-red-500/20 hover:bg-red-50 hover:text-red-600 font-bold"
                      >
                        Deactivate
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* JOBS TAB */}
          {activeTab === 'jobs' && (
            <motion.div
              key="jobs"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-slate-900 border border-border rounded-3xl overflow-hidden shadow-sm">
                <div className="px-6 py-5 border-b border-border">
                  <h3 className="text-lg font-black text-foreground">Active Postings on Platform ({jobs.length})</h3>
                </div>
                
                <div className="divide-y divide-border">
                  {jobs.map((job) => (
                    <div key={job.id} className="p-5 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <div>
                        <p className="font-extrabold text-foreground">{job.title}</p>
                        <p className="text-xs text-muted-foreground">Farmer: {job.company?.name || 'Local Farm'} • Location: {job.location}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 border border-red-500/10 hover:border-red-500/30 rounded-xl transition"
                        title="Delete Post"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-md mx-auto space-y-6"
            >
              <div className="bg-white dark:bg-slate-900 border border-border rounded-3xl p-6 shadow-sm space-y-6">
                <h3 className="text-lg font-black text-foreground">Global Platform Settings</h3>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest block">OTP Settings</label>
                  <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 p-3.5 rounded-xl border border-border">
                    <span className="text-xs font-semibold text-foreground">Force SMS OTP checkpoints on login</span>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest block">System Backup</label>
                  <Button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-950 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white rounded-xl h-11">
                    Backup Mock Data
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
