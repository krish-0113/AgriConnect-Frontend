import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  ArrowLeft, Phone, Calendar, MapPin, DollarSign, CheckCircle2, AlertOctagon, Info,
  Activity, Users, ShieldAlert, HeartHandshake, Check, ShieldCheck, MessageSquare, Navigation
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { useToast } from '../components/common/Toast';
import RatingFlow from '../components/common/RatingFlow';
import { updateApplication } from '../store/slices/applicationsSlice';

export default function AssignmentDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useToast();

  const app = useAppSelector((state) => state.applications.applications.find((a) => a.id === id));
  const jobs = useAppSelector((state) => state.jobs.jobs);
  const workers = useAppSelector((state) => state.workers.workers);
  const companies = useAppSelector((state) => state.companies.companies);

  const [sosOpen, setSosOpen] = useState(false);
  const [sosAlerted, setSosAlerted] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);

  // Dual Check state for Payment and Completion verification
  const [farmerAnswersYes, setFarmerAnswersYes] = useState(false);
  const [workerAnswersYes, setWorkerAnswersYes] = useState(false);

  // Fallback mocks if Redux doesn't contain matching values
  const job = jobs.find((j) => j.id === app?.jobId) || {
    title: 'Wheat Harvesting 🌾',
    location: 'Bathinda Outskirts',
    workDate: new Date().toISOString(),
    salary: { min: 900 },
    jobType: 'Harvesting'
  };

  const farmer = companies.find((c) => c.id === app?.companyId) || {
    name: 'Baldev Singh',
    phone: '9876500123'
  };

  const workerName = 'Ramesh Singh';

  // 7-step Timeline steps matching prompt sequence:
  // Accepted -> Worker Coming -> Reached Farm -> Working -> Completed -> Payment -> Review
  const getLifecycleStep = (status) => {
    switch (status) {
      case 'accepted': return 1;
      case 'coming': return 2;
      case 'reached': return 3;
      case 'in-progress': return 4; // Working
      case 'finished': return 5;    // Completed
      case 'paid': return 6;        // Payment cleared
      case 'completed': return 7;   // Review shared
      default: return 1;
    }
  };

  const currentStep = getLifecycleStep(app?.status || 'accepted');

  const timelineSteps = [
    { num: 1, label: 'Accepted', labelHi: 'स्वीकृत', emoji: '✅' },
    { num: 2, label: 'Worker Coming', labelHi: 'मजदूर आ रहा है', emoji: '🚶' },
    { num: 3, label: 'Reached Farm', labelHi: 'खेत पर पहुंचे', emoji: '📍' },
    { num: 4, label: 'Working', labelHi: 'कार्य जारी', emoji: '🚜' },
    { num: 5, label: 'Completed', labelHi: 'कार्य पूर्ण', emoji: '🌾' },
    { num: 6, label: 'Payment Clear', labelHi: 'भुगतान पूरा', emoji: '💰' },
    { num: 7, label: 'Review Shared', labelHi: 'रेटिंग पूर्ण', emoji: '⭐' }
  ];

  const handleStepTransition = (nextStatus) => {
    if (app) {
      const updated = { ...app, status: nextStatus };
      dispatch(updateApplication(updated));
      toast.success('Assignment progress updated!');

      if (nextStatus === 'completed') {
        setRatingOpen(true);
      }
    }
  };

  // Auto trigger completion when both confirm Yes
  useEffect(() => {
    if (farmerAnswersYes && workerAnswersYes && currentStep < 7) {
      toast.success('Both confirmed! Unlocking star reviews page...');
      handleStepTransition('completed');
    }
  }, [farmerAnswersYes, workerAnswersYes]);

  const triggerSOS = () => {
    setSosOpen(false);
    setSosAlerted(true);
    toast.error('SOS ALERTS DISPATCHED: Coords sent to Baldev Singh & Admin Helpline!');
  };

  const dailyWage = job.salary?.min ? (job.salary.min > 2000 ? Math.floor(job.salary.min / 30) : job.salary.min) : 900;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 pt-4">
      <div className="max-w-xl mx-auto px-4 space-y-6">
        
        {/* Header navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 p-2.5 bg-white dark:bg-slate-800 rounded-2xl border border-border/80 text-foreground hover:bg-muted active:scale-95 transition shadow-sm font-bold text-sm"
          >
            <ArrowLeft size={16} /> Back
          </button>
          
          <span className="text-xs font-black text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            TIMELINE TRACKER
          </span>
        </div>

        {/* SOS Warning Notification Banner */}
        {sosAlerted && (
          <div className="bg-red-600 text-white p-4 rounded-3xl flex items-start gap-3 shadow-md animate-pulse">
            <AlertOctagon size={24} className="flex-shrink-0" />
            <div>
              <p className="font-black text-sm">Emergency SOS Active / संकटकालीन अलर्ट सक्रिय</p>
              <p className="text-xs opacity-90 font-semibold mt-0.5">
                Admin gets alert | GPS Location shared | Worker Name: {workerName} | Farmer Name: {farmer.name} | Assignment ID: #{app?.id || 'demo-55'}
              </p>
            </div>
          </div>
        )}

        {/* Job Details Card */}
        <div className="bg-white dark:bg-slate-900 border border-border rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-xl font-black text-foreground flex items-center gap-1">🌾 {job.title}</h2>
              <p className="text-xs text-muted-foreground font-semibold">Farmer: {farmer.name} • Worker: {workerName}</p>
            </div>
            
            <div className="text-right">
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest block">Daily Wage</span>
              <span className="text-lg font-black text-emerald-600">₹{dailyWage}/day</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-bold text-foreground">
            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-primary" /> {job.location}</span>
            <span className="flex items-center gap-1.5 justify-end"><Calendar size={14} className="text-secondary" /> Tomorrow</span>
          </div>

          {/* Quick Actions Call / Chat / Directions */}
          <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => window.location.href = `tel:${farmer.phone}`}
              className="py-3 bg-emerald-500/10 text-primary border border-emerald-500/20 hover:bg-emerald-500/15 font-black text-xs rounded-xl flex items-center justify-center gap-1 active:scale-95 transition"
            >
              📞 Call Farmer
            </button>
            <button
              onClick={() => toast.success('Starting chat room...')}
              className="py-3 bg-blue-500/10 text-blue-600 border border-blue-500/20 hover:bg-blue-500/15 font-black text-xs rounded-xl flex items-center justify-center gap-1 active:scale-95 transition"
            >
              💬 Chat
            </button>
            <button
              onClick={() => toast.success('Opening Google Maps coordinates...')}
              className="py-3 bg-purple-500/10 text-purple-600 border border-purple-500/20 hover:bg-purple-500/15 font-black text-xs rounded-xl flex items-center justify-center gap-1 active:scale-95 transition"
            >
              📍 Directions
            </button>
          </div>
        </div>

        {/* 10-Step Timeline widget */}
        <div className="bg-white dark:bg-slate-900 border border-border p-6 rounded-3xl shadow-sm space-y-6">
          <h3 className="text-xs font-black text-foreground uppercase tracking-widest text-muted-foreground border-b border-border pb-3 flex items-center gap-1.5">
            <Activity size={15} /> Assignment Step Progress
          </h3>

          <div className="relative pl-6 space-y-6">
            {/* Connecting Line */}
            <div className="absolute left-[9px] top-3 bottom-3 w-[2px] bg-slate-100 dark:bg-slate-800" />

            {timelineSteps.map((step) => {
              const isPast = step.num < currentStep;
              const isCurrent = step.num === currentStep;

              return (
                <div key={step.num} className="relative flex items-start gap-4">
                  <div className={`absolute -left-[23px] w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${
                    isPast
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-white dark:bg-slate-900 border-primary shadow-sm scale-110'
                      : 'bg-white dark:bg-slate-900 border-muted'
                  }`}>
                    {isPast && <Check size={10} className="stroke-[3]" />}
                  </div>

                  <div className="space-y-0.5">
                    <h4 className={`text-sm font-black ${
                      isCurrent ? 'text-primary' : isPast ? 'text-foreground/80' : 'text-muted-foreground/60'
                    }`}>
                      {step.emoji} {step.label}
                    </h4>
                    <p className="text-[10px] text-muted-foreground font-bold">{step.labelHi}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DUAL PAYMENT CONFIRMATION CHECK */}
        {currentStep === 5 || currentStep === 6 ? (
          <div className="bg-white dark:bg-slate-900 border border-border p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-xs font-black text-foreground uppercase tracking-widest text-muted-foreground border-b border-border pb-2">
              💰 Work Completion & Payment Check
            </h3>

            <div className="space-y-3 font-semibold text-xs">
              {/* Farmer check */}
              <div className="flex flex-col gap-2 p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-border rounded-2xl">
                <span className="text-muted-foreground">Farmer Question: Did Worker Complete Work? / क्या मजदूर ने काम किया?</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setFarmerAnswersYes(true); toast.success('Farmer verified completion.'); }}
                    className={`flex-1 py-2.5 rounded-xl font-bold text-xs border ${
                      farmerAnswersYes 
                        ? 'bg-emerald-500 text-slate-950 border-emerald-500' 
                        : 'bg-white dark:bg-slate-900 text-foreground border-border hover:bg-slate-50'
                    }`}
                  >
                    ✅ Yes / हाँ
                  </button>
                  <button
                    onClick={() => { setFarmerAnswersYes(false); toast.info('Awaiting complete work.'); }}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs border bg-white dark:bg-slate-900 text-red-500 border-border hover:bg-slate-50`}
                  >
                    ❌ No
                  </button>
                </div>
              </div>

              {/* Worker check */}
              <div className="flex flex-col gap-2 p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-border rounded-2xl">
                <span className="text-muted-foreground">Worker Question: Did Farmer Pay You? / क्या किसान ने पैसे दिए?</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setWorkerAnswersYes(true); toast.success('Worker verified wage cleared.'); }}
                    className={`flex-1 py-2.5 rounded-xl font-bold text-xs border ${
                      workerAnswersYes 
                        ? 'bg-emerald-500 text-slate-950 border-emerald-500' 
                        : 'bg-white dark:bg-slate-900 text-foreground border-border hover:bg-slate-50'
                    }`}
                  >
                    ✅ Yes / हाँ
                  </button>
                  <button
                    onClick={() => { setWorkerAnswersYes(false); toast.info('Awaiting cash payment.'); }}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs border bg-white dark:bg-slate-900 text-red-500 border-border hover:bg-slate-50`}
                  >
                    ❌ No
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* TACTILE INTERACTIVE ACTIONS PANEL */}
        <div className="bg-white dark:bg-slate-900 border border-border p-6 rounded-3xl shadow-sm space-y-4">
          <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest">Timeline Operations</h3>
          
          <div className="flex flex-col gap-3">
            {/* Step 1: Accepted -> Worker Coming */}
            {currentStep === 1 && (
              <Button
                onClick={() => handleStepTransition('coming')}
                className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-base rounded-2xl active:scale-95 transition"
              >
                🚶 Mark: Worker Coming / आ रहे हैं
              </Button>
            )}

            {/* Step 2: Worker Coming -> Reached Farm */}
            {currentStep === 2 && (
              <Button
                onClick={() => handleStepTransition('reached')}
                className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-base rounded-2xl active:scale-95 transition"
              >
                📍 Reached Farm / खेत पहुंच गए
              </Button>
            )}

            {/* Step 3: Reached -> Start Work */}
            {currentStep === 3 && (
              <Button
                onClick={() => handleStepTransition('in-progress')}
                className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-base rounded-2xl active:scale-95 transition"
              >
                🚜 Start Work / काम शुरू करें
              </Button>
            )}

            {/* Step 4: Working -> Finished */}
            {currentStep === 4 && (
              <Button
                onClick={() => handleStepTransition('finished')}
                className="w-full h-14 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-base rounded-2xl active:scale-95 transition"
              >
                🌾 Finish Work / काम पूरा
              </Button>
            )}

            {/* Step 7: Completed (Review) */}
            {currentStep === 7 && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-primary p-4 rounded-2xl text-center font-bold text-sm flex items-center justify-center gap-1.5">
                <CheckCircle2 size={16} /> Timeline Complete! Ratings cleared.
              </div>
            )}
          </div>
        </div>

        {/* WORKER SAFETY CENTER */}
        <div className="bg-white dark:bg-slate-900 border border-border p-6 rounded-3xl shadow-sm space-y-4">
          <h3 className="text-xs font-black text-red-500 uppercase tracking-widest flex items-center gap-1">
            <ShieldAlert size={14} /> Worker Safety Center
          </h3>
          
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              onClick={() => setSosOpen(true)}
              className="py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 active:scale-95 transition text-center"
            >
              🆘 Press SOS
            </button>
            <button
              onClick={() => toast.info('GPS Live tracking enabled.')}
              className="py-3 border border-border bg-slate-50 dark:bg-slate-800 text-foreground rounded-xl active:scale-95 transition text-center"
            >
              📍 Live Location
            </button>
            <button
              onClick={() => navigate('/dashboard?tab=settings')}
              className="py-3 border border-border bg-slate-50 dark:bg-slate-800 text-foreground rounded-xl active:scale-95 transition text-center"
            >
              👨 Emergency Contacts
            </button>
            <button
              onClick={() => toast.success('Reporting incident to support team.')}
              className="py-3 border border-border bg-slate-50 dark:bg-slate-800 text-foreground rounded-xl active:scale-95 transition text-center text-red-500"
            >
              🚓 Report Problem
            </button>
          </div>
        </div>

        {/* FARMER SAFETY CENTER */}
        <div className="bg-white dark:bg-slate-900 border border-border p-6 rounded-3xl shadow-sm space-y-4">
          <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1">
            <ShieldCheck size={14} /> Farmer Security Controls
          </h3>
          
          <div className="grid grid-cols-3 gap-2 text-[10px] font-black">
            <button
              onClick={() => toast.success('Worker reported for behavior.')}
              className="py-2.5 border border-red-500/20 text-red-500 rounded-lg bg-red-500/5 active:scale-95 transition text-center uppercase"
            >
              🚨 Report Worker
            </button>
            <button
              onClick={() => toast.success('Worker blocked from applying to your postings.')}
              className="py-2.5 border border-slate-500/20 text-foreground rounded-lg bg-slate-500/5 active:scale-95 transition text-center uppercase"
            >
              Block Worker
            </button>
            <button
              onClick={() => window.location.href = 'tel:18001801551'}
              className="py-2.5 border border-slate-500/20 text-foreground rounded-lg bg-slate-500/5 active:scale-95 transition text-center uppercase"
            >
              Call Support
            </button>
          </div>
        </div>

        {/* TRUST BUILDING SUMMARY PROFILE */}
        <div className="bg-white dark:bg-slate-900 border border-border p-6 rounded-3xl shadow-sm space-y-4">
          <h3 className="text-xs font-black text-foreground uppercase tracking-widest text-muted-foreground border-b border-border pb-2">
            ✅ Trust Indicators
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold text-foreground">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-border">
              <span>✅ Aadhaar Verified</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-border">
              <span>📱 Mobile Verified</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-border">
              <span>⭐ 4.9 Rating Profile</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-border">
              <span>🌾 120 Completed Jobs</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-border">
              <span>💰 Payment Success 99%</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-border">
              <span>📅 Joined in 2025</span>
            </div>
          </div>
        </div>

      </div>

      {/* SOS CONFIRMATION MODAL */}
      <AnimatePresence>
        {sosOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            <div className="absolute inset-0" onClick={() => setSosOpen(false)} />
            
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-border rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm space-y-6 shadow-2xl relative z-10 text-center"
            >
              <div className="text-center space-y-2">
                <span className="text-4xl">🚨</span>
                <h3 className="text-xl font-black text-foreground">Confirm Emergency SOS?</h3>
                <p className="text-xs text-muted-foreground font-semibold">
                  This will immediately dispatch emergency messages with GPS coordinates to your saved family contacts and local farmer support.
                </p>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setSosOpen(false)} variant="outline" className="flex-1 h-12 rounded-xl">
                  Cancel
                </Button>
                <Button onClick={triggerSOS} className="flex-grow bg-red-600 hover:bg-red-700 text-white font-black rounded-xl h-12">
                  Send Alert Now
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RATING FLOW MODAL */}
      <AnimatePresence>
        {ratingOpen && (
          <RatingFlow
            targetName={farmer.name}
            role="farmer"
            onClose={() => {
              setRatingOpen(false);
              navigate('/dashboard');
            }}
            onSubmit={() => {
              setRatingOpen(false);
              navigate('/dashboard');
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
