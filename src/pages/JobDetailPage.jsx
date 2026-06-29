import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { MapPin, DollarSign, Clock, Briefcase, ArrowLeft, ShieldCheck, Users, Calendar, AlertCircle, Heart, Check } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import { useToast } from '../components/common/Toast';
import { useState } from 'react';
import { addApplication } from '../store/slices/applicationsSlice';
import { AnimatePresence, motion } from 'framer-motion';

export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { user, isAuthenticated } = useAuth();

  const job = useAppSelector((state) => state.jobs.jobs.find((j) => j.id === id));
  const applications = useAppSelector((state) => state.applications.applications);

  const [confirmApply, setConfirmApply] = useState(false);

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white dark:bg-slate-900 border border-border p-10 rounded-3xl shadow-md max-w-sm w-full space-y-4">
          <p className="text-muted-foreground text-base font-semibold">Job requirement not found</p>
          <Button onClick={() => navigate('/jobs')} className="w-full">
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  // Check if worker already applied
  const myApplies = applications.filter((a) => a.workerId === user?.id || a.workerId === 'demo-id');
  const alreadyApplied = myApplies.some((a) => a.jobId === job.id);

  const handleApplyTrigger = () => {
    if (!isAuthenticated) {
      toast.info('Please sign in to apply.');
      navigate('/login');
      return;
    }

    if (alreadyApplied) {
      toast.info('You have already applied to this job requirement.');
      return;
    }

    setConfirmApply(true);
  };

  const handleConfirmApply = () => {
    const dailyWage = job.salary?.min ? (job.salary.min > 2000 ? Math.floor(job.salary.min / 30) : job.salary.min) : 700;

    const newApp = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      workerId: user?.id || 'demo-id',
      companyId: job.company?.id || 'comp-demo',
      status: 'pending',
      appliedDate: new Date().toISOString(),
      message: 'I am interested in this agricultural job.'
    };

    dispatch(addApplication(newApp));
    toast.success(`Applied successfully for ${job.title}!`);
    setConfirmApply(false);
  };

  // Mock distance & rating
  const mockDistance = '2.8 km away';
  const mockRating = '4.7';
  const dailyWage = job.salary?.min ? (job.salary.min > 2000 ? Math.floor(job.salary.min / 30) : job.salary.min) : 700;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 pt-4">
      <div className="max-w-xl mx-auto px-4">
        {/* Back navigation */}
        <button
          onClick={() => navigate('/jobs')}
          className="flex items-center gap-2 p-2.5 bg-white dark:bg-slate-800 rounded-2xl border border-border/80 text-foreground hover:bg-muted active:scale-95 transition mb-6 shadow-sm font-bold text-sm"
        >
          <ArrowLeft size={16} />
          Back to Jobs
        </button>

        {/* Job Details Card */}
        <div className="bg-white dark:bg-slate-900 border border-border rounded-3xl p-6 shadow-sm space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-emerald-500 to-teal-500" />

          {/* Job Header */}
          <div className="flex items-start justify-between gap-4 pt-2">
            <div className="space-y-1.5 flex-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20 uppercase tracking-widest">
                Agricultural Hiring
              </span>
              <h1 className="text-2xl font-black text-foreground leading-tight">{job.title}</h1>
              <p className="text-sm font-bold text-primary">{job.company?.name || 'Local Farmer'}</p>
            </div>

            <div className="text-right flex-shrink-0">
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest block">Daily Wage</span>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">₹{dailyWage}</p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center justify-around bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-border text-center">
            <div className="space-y-0.5">
              <span className="text-xl font-black text-foreground flex items-center justify-center gap-1">
                ⭐ {mockRating}
              </span>
              <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Farmer Rating</p>
            </div>
            <div className="w-[1px] h-8 bg-border" />
            <div className="space-y-0.5">
              <span className="text-xl font-black text-foreground">{job.workersRequired || 5}</span>
              <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Workers Needed</p>
            </div>
            <div className="w-[1px] h-8 bg-border" />
            <div className="space-y-0.5">
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                {job.status.toUpperCase()}
              </span>
              <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Job Status</p>
            </div>
          </div>

          {/* Bio section */}
          <div className="space-y-2">
            <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest">About This Work</h3>
            <p className="text-sm text-foreground leading-relaxed font-medium">
              {job.description || "Looking for reliable hands to assist in sowing and field clearing operations. Tasks will be guided and daily logs checked every evening. Payments cleared daily."}
            </p>
          </div>

          <hr className="border-border" />

          {/* Logistics specific */}
          <div className="space-y-3 font-semibold text-sm">
            <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <MapPin size={15} className="text-primary" /> Village Location
              </span>
              <span className="text-foreground">{job.location} ({mockDistance})</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Clock size={15} className="text-secondary" /> Work Shift Type
              </span>
              <span className="text-foreground">{job.jobType.toUpperCase()}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Calendar size={15} className="text-accent" /> Start Date
              </span>
              <span className="text-foreground">
                {job.workDate ? new Date(job.workDate).toLocaleDateString() : 'Immediate Sowing Cycle'}
              </span>
            </div>
          </div>

          {/* Apply and Save CTA */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {alreadyApplied ? (
              <div className="flex-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 p-4 rounded-2xl text-center font-bold text-sm flex items-center justify-center gap-1.5">
                <Check size={18} className="stroke-[3]" />
                Application Submitted Successfully
              </div>
            ) : isAuthenticated && user?.role !== 'worker' ? (
              <div className="flex-grow bg-slate-50 dark:bg-slate-800 text-muted-foreground text-xs p-4 rounded-2xl text-center font-bold border border-border flex items-center justify-center gap-1.5">
                <AlertCircle size={16} />
                Logged in as Employer (Farmers cannot apply to jobs)
              </div>
            ) : (
              <Button
                onClick={handleApplyTrigger}
                className="flex-grow h-14 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-base rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 active:scale-98 transition"
              >
                ⚡ Apply in One Tap
              </Button>
            )}

            <Button
              variant="outline"
              onClick={() => toast.success('Job bookmarked!')}
              className="h-14 px-6 border-border rounded-2xl flex items-center justify-center gap-1.5 text-foreground font-bold"
            >
              <Heart size={18} />
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* CONFIRMATION OVERLAY */}
      <AnimatePresence>
        {confirmApply && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <div className="absolute inset-0" onClick={() => setConfirmApply(false)} />

            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-border rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm space-y-6 shadow-2xl relative z-10"
            >
              <div className="text-center space-y-2">
                <span className="text-3xl">⚡</span>
                <h3 className="text-lg font-black text-foreground">Confirm Application</h3>
                <p className="text-xs text-muted-foreground font-medium">
                  Submit your profile to start work at ₹{dailyWage}/day?
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setConfirmApply(false)}
                  variant="outline"
                  className="flex-1 h-12 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmApply}
                  className="flex-grow bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl h-12 flex items-center justify-center shadow-md active:scale-95 transition"
                >
                  Confirm Apply
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
