import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, Users, PlusCircle, Phone, Star, Bell, Settings, User, CheckCircle,
  XCircle, ArrowRight, Clock, Landmark, MessageSquare, ShieldCheck, Check, Info
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { useToast } from '../components/common/Toast';
import { updateJob } from '../store/slices/jobsSlice';
import { updateApplication } from '../store/slices/applicationsSlice';
import OnboardingModal from '../components/common/OnboardingModal';
import TrustScoreCard from '../components/TrustScoreCard';
import SafetySettings from '../components/SafetySettings';

export default function CompanyDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { user } = useAuth();

  // Redux state
  const jobs = useAppSelector((state) => state.jobs.jobs);
  const applications = useAppSelector((state) => state.applications.applications);
  const workers = useAppSelector((state) => state.workers.workers);

  const [onboardingOpen, setOnboardingOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('seenOnboarding');
    if (!seen) {
      setOnboardingOpen(true);
    }
  }, []);

  const currentTab = new URLSearchParams(location.search).get('tab') || 'home';

  // Filter jobs and applications specific to this Farmer
  const myJobs = jobs.filter((j) => j.company?.id === user?.id || j.company?.name === user?.name);
  const myApplications = applications.filter((a) => myJobs.some((mj) => mj.id === a.jobId));

  // State for Review dialog
  const [selectedWorkerForReview, setSelectedWorkerForReview] = useState(null);
  const [stars, setStars] = useState(5);
  const [selectedChips, setSelectedChips] = useState([]);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  // Mock list of contacted workers for Farmer
  const [contactedList, setContactedList] = useState([
    { id: 'worker-1', name: 'Ramesh Singh', phone: '9876543210', crop: 'Wheat', date: '2026-06-28', rating: 4.8 },
    { id: 'worker-2', name: 'Sukhwinder Singh', phone: '8765432109', crop: 'Maize', date: '2026-06-25', rating: 4.9 },
    { id: 'worker-3', name: 'Gurpreet Singh', phone: '7654321098', crop: 'Potato', date: '2026-06-22', rating: 4.7 }
  ]);

  // Mock reviews for Farmer
  const [farmerReviews, setFarmerReviews] = useState([
    { id: 'rev-1', author: 'Ramesh Singh', rating: 5, chips: ['Paid On Time', 'Good Farmer'], comment: 'Always pays on time and provides free clean drinking water in fields.', date: '2026-06-27' },
    { id: 'rev-2', author: 'Sukhwinder Singh', rating: 4, chips: ['Clear Instructions', 'Helpful'], comment: 'Work instructions were clear. Field was clean.', date: '2026-06-24' }
  ]);

  const handleSetTab = (tabName) => {
    navigate(`/company-dashboard?tab=${tabName}`);
  };

  const handleCall = (phone, workerName) => {
    // Check if phone numbers exist, trigger native dialer
    window.location.href = `tel:${phone}`;
    toast.success(`Calling ${workerName}...`);

    // Add to contacted list if not present
    if (!contactedList.some((c) => c.phone === phone)) {
      setContactedList((prev) => [
        {
          id: `contact-${Date.now()}`,
          name: workerName,
          phone,
          crop: 'General Work',
          date: new Date().toISOString().split('T')[0],
          rating: 4.5
        },
        ...prev
      ]);
    }
  };

  const handleApplicationStatus = (appId, newStatus) => {
    const app = applications.find((a) => a.id === appId);
    if (app) {
      const updatedApp = { ...app, status: newStatus };
      dispatch(updateApplication(updatedApp));
      toast.success(`Application has been ${newStatus}!`);
    }
  };

  const handleToggleJobStatus = (jobId) => {
    const job = jobs.find((j) => j.id === jobId);
    if (job) {
      const updatedJob = { ...job, status: job.status === 'open' ? 'closed' : 'open' };
      dispatch(updateJob(updatedJob));
      toast.success(`Job status changed to ${updatedJob.status}!`);
    }
  };

  // Submit Review Flow
  const handleOpenReview = (worker) => {
    setSelectedWorkerForReview(worker);
    setStars(5);
    setSelectedChips([]);
    setComment('');
  };

  const handleChipToggle = (chip) => {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  const handleSubmitReview = async () => {
    setSubmittingReview(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success(`Review submitted successfully for ${selectedWorkerForReview.name}!`);
    setSelectedWorkerForReview(null);
    setSubmittingReview(false);
  };

  const workerChips = ['Hard Working', 'Skilled', 'On Time', 'Friendly', 'Honest', 'Fast Worker', 'Recommended'];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Dynamic Dashboard Header */}
      <div className="relative bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white overflow-hidden py-10 px-4 sm:px-6 lg:px-8 border-b border-emerald-500/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="absolute -top-24 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20 uppercase tracking-widest">
                <Landmark size={12} /> Farmer Portal
              </span>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">
                Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">{user?.name || 'Farmer'}</span>
              </h1>
              <p className="text-slate-400 font-medium text-xs sm:text-sm">
                Location: {user?.location || 'Punjab, India'} • Easy one-click management tools
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigate('/jobs/new')}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold h-12 px-6 rounded-2xl shadow-lg shadow-emerald-500/10 flex items-center gap-2"
              >
                <PlusCircle size={18} />
                Post a Job
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

        {/* Announcements Marquee Ticker */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-400 px-4 py-2.5 rounded-2xl border border-emerald-500/20 text-xs font-bold flex items-center gap-2 mb-6 overflow-hidden relative">
          <span className="bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-md font-black uppercase text-[10px] flex-shrink-0 animate-pulse">Update / सूचना</span>
          <marquee className="font-semibold select-none">
            🌾 Crop Market (Cooperative Rates): MSP of wheat increased to ₹2,275 per quintal. Sell options open at district cooperative yards. | ⛈️ Weather Advisory: High winds expected tomorrow afternoon. Secure open fields harvesting.
          </marquee>
        </div>

        {/* Worker Applies Notification Alert Card */}
        {myApplications.some((a) => a.status === 'pending') && (
          <div className="bg-gradient-to-br from-emerald-500/10 via-slate-500/5 to-transparent border border-emerald-500/25 p-5 rounded-3xl shadow-sm flex items-start gap-4 mb-6 relative overflow-hidden">
            <div className="w-12 h-12 bg-emerald-500 text-slate-950 rounded-2xl flex items-center justify-center font-black text-2xl flex-shrink-0 animate-bounce">
              🔔
            </div>
            <div className="space-y-1.5 flex-1 min-w-0">
              <span className="text-[10px] bg-emerald-500/15 text-primary font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-emerald-500/25">New Worker Applied / नया आवेदन</span>
              <h4 className="font-black text-foreground text-sm truncate">Ravi Patil applied for Wheat Harvesting Job</h4>
              
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-muted-foreground">
                <span className="text-amber-500 flex items-center gap-0.5 font-bold">⭐ 4.8 Rating</span>
                <span>📍 2.3 km away</span>
                <span className="text-slate-300">•</span>
                <span>⏰ 10 minutes ago</span>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  onClick={() => handleApplicationStatus(myApplications.find(a => a.status === 'pending')?.id, 'offered')} 
                  size="xs" 
                  className="bg-emerald-500 text-slate-950 font-black h-9 rounded-lg"
                >
                  Quick Hire / काम पर रखें
                </Button>
                <Button 
                  onClick={() => handleSetTab('my-jobs')} 
                  size="xs" 
                  variant="outline" 
                  className="border-border text-foreground font-black h-9 rounded-lg"
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Info Widgets Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Weather Widget */}
          <div className="bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-transparent border border-amber-500/20 p-5 rounded-3xl relative overflow-hidden flex items-center justify-between">
            <div className="space-y-1 relative z-10">
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-black uppercase tracking-widest block">Mansa Field Weather Today</span>
              <h4 className="text-3xl font-black text-foreground">34°C <span className="text-base text-muted-foreground font-semibold">Sunny / धूप</span></h4>
              <p className="text-xs text-muted-foreground font-semibold">Rain Probability: 10% • Humidity: 40%</p>
              <div className="text-[11px] text-amber-800 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-xl w-fit font-bold mt-2">
                🚜 Sowing conditions are perfect. Start tractor operations.
              </div>
            </div>
            <div className="text-5xl select-none relative z-10 filter drop-shadow-md">☀️</div>
            <div className="absolute top-1/2 right-4 -translate-y-1/2 w-28 h-28 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Kisan Helpline Speed Dial */}
          <div className="bg-gradient-to-br from-red-500/10 via-slate-500/5 to-transparent border border-red-500/20 p-5 rounded-3xl relative overflow-hidden flex items-center justify-between">
            <div className="space-y-1 relative z-10">
              <span className="text-[10px] text-red-500 font-black uppercase tracking-widest block">Agricultural Helpline & Safety</span>
              <h4 className="text-base font-black text-foreground flex items-center gap-1.5">
                📞 Kisan Helpline: <a href="tel:18001801551" className="text-red-500 hover:underline">1800-180-1551</a>
              </h4>
              <p className="text-xs text-muted-foreground font-semibold">Cooperative Center Support: 0161-2401960</p>
              <div className="flex gap-2 mt-3">
                <a
                  href="tel:18001801551"
                  className="px-3.5 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-black rounded-xl shadow-md transition flex items-center gap-1 active:scale-95"
                >
                  Call Center 📞
                </a>
                <a
                  href="tel:112"
                  className="px-3.5 py-1.5 bg-slate-950 text-white dark:bg-white dark:text-slate-950 text-xs font-black rounded-xl shadow-md transition flex items-center gap-1 active:scale-95"
                >
                  Emergency 📞 112
                </a>
              </div>
            </div>
            <div className="text-5xl select-none opacity-20 filter drop-shadow-md">☎️</div>
          </div>
        </div>

        {/* TAB CONDITIONAL RENDERING */}
        <AnimatePresence mode="wait">

          {/* TAB 1: HOME (GOOGLE PAY GRID) */}
          {currentTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Google Pay Style Visual Grid */}
              <div className="bg-white dark:bg-slate-900 border border-border p-6 rounded-3xl shadow-sm">
                <h2 className="text-lg font-black text-foreground mb-4 uppercase tracking-wider text-muted-foreground animate-pulse flex items-center gap-1">
                  <Info size={16} /> Quick Actions
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Action 1: Post Job */}
                  <button
                    onClick={() => navigate('/jobs/new')}
                    className="flex flex-col items-center justify-center p-5 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 hover:to-teal-500/10 border border-emerald-500/20 hover:border-emerald-500/40 rounded-2xl active:scale-95 transition text-center"
                  >
                    <div className="w-12 h-12 bg-emerald-500 text-slate-950 rounded-2xl flex items-center justify-center mb-3 shadow-md">
                      <PlusCircle size={24} />
                    </div>
                    <span className="text-sm font-extrabold text-foreground">Post Job</span>
                    <span className="text-[10px] text-muted-foreground font-semibold mt-0.5">Wizard Form</span>
                  </button>

                  {/* Action 2: Find Workers */}
                  <button
                    onClick={() => navigate('/workers')}
                    className="flex flex-col items-center justify-center p-5 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 hover:to-indigo-500/10 border border-blue-500/20 hover:border-blue-500/40 rounded-2xl active:scale-95 transition text-center"
                  >
                    <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center mb-3 shadow-md">
                      <Users size={24} />
                    </div>
                    <span className="text-sm font-extrabold text-foreground">Find Workers</span>
                    <span className="text-[10px] text-muted-foreground font-semibold mt-0.5">Search Profiles</span>
                  </button>

                  {/* Action 3: My Posted Jobs */}
                  <button
                    onClick={() => handleSetTab('my-jobs')}
                    className="flex flex-col items-center justify-center p-5 bg-gradient-to-br from-orange-500/10 to-amber-500/5 hover:to-amber-500/10 border border-orange-500/20 hover:border-orange-500/40 rounded-2xl active:scale-95 transition text-center"
                  >
                    <div className="w-12 h-12 bg-orange-500 text-white rounded-2xl flex items-center justify-center mb-3 shadow-md">
                      <Briefcase size={24} />
                    </div>
                    <span className="text-sm font-extrabold text-foreground">My Jobs ({myJobs.length})</span>
                    <span className="text-[10px] text-muted-foreground font-semibold mt-0.5">Manage Slots</span>
                  </button>

                  {/* Action 4: Speed Contacts */}
                  <button
                    onClick={() => handleSetTab('contacts')}
                    className="flex flex-col items-center justify-center p-5 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/5 hover:to-fuchsia-500/10 border border-purple-500/20 hover:border-purple-500/40 rounded-2xl active:scale-95 transition text-center"
                  >
                    <div className="w-12 h-12 bg-purple-500 text-white rounded-2xl flex items-center justify-center mb-3 shadow-md">
                      <Phone size={24} />
                    </div>
                    <span className="text-sm font-extrabold text-foreground">Speed Dialer</span>
                    <span className="text-[10px] text-muted-foreground font-semibold mt-0.5">Contact List</span>
                  </button>
                </div>
              </div>

              {/* Farmer Home Dashboard Summary */}
              <div className="bg-white dark:bg-slate-900 border border-border rounded-3xl p-6 shadow-sm space-y-4">
                <h2 className="text-sm font-black text-foreground uppercase tracking-widest text-muted-foreground border-b border-slate-100 dark:border-slate-800 pb-2">
                  My Overview / मेरा सारांश
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-extrabold text-foreground">
                  <div 
                    onClick={() => handleSetTab('my-jobs')}
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-border hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2">🌾 My Active Jobs</span>
                    <span className="bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-xl font-black text-xs border border-emerald-500/20">{myJobs.length}</span>
                  </div>

                  <div 
                    onClick={() => navigate('/workers')}
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-border hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2">👨‍🌾 Workers Near You</span>
                    <span className="bg-blue-500/10 text-blue-600 px-3 py-1 rounded-xl font-black text-xs border border-blue-500/20">12</span>
                  </div>

                  <div 
                    onClick={() => handleSetTab('home')}
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-border hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2">📨 New Applications</span>
                    <span className="bg-amber-500/10 text-amber-600 px-3 py-1 rounded-xl font-black text-xs border border-amber-500/20">
                      {myApplications.filter((a) => a.status === 'pending').length}
                    </span>
                  </div>

                  <div 
                    onClick={() => handleSetTab('reviews')}
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-border hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2">⭐ Profile Reviews</span>
                    <span className="bg-purple-500/10 text-purple-600 px-3 py-1 rounded-xl font-black text-xs border border-purple-500/20">4.8 Rating</span>
                  </div>

                  <div 
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-border col-span-1 sm:col-span-2"
                  >
                    <span className="flex items-center gap-2">🔔 Alerts & Notifications</span>
                    <span className="bg-red-500 text-white px-2.5 py-0.5 rounded-full font-black text-[10px] animate-pulse">2 NEW</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Style Candidate Feed */}
              <div className="bg-white dark:bg-slate-900 border border-border rounded-3xl overflow-hidden shadow-sm">
                <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                  <h3 className="text-lg font-black text-foreground">Recent Job Applications</h3>
                  <span className="text-xs font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                    {myApplications.length} proposals
                  </span>
                </div>

                {myApplications.length === 0 ? (
                  <div className="p-12 text-center text-muted-foreground space-y-2">
                    <Clock size={36} className="mx-auto text-muted-foreground opacity-30" />
                    <p className="font-bold text-foreground">No applications received yet</p>
                    <p className="text-xs">Once workers apply for your posted jobs, their profiles will appear here.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {myApplications.slice(0, 5).map((app) => {
                      const worker = workers.find((w) => w.id === app.workerId) || {
                        name: 'Agricultural Worker',
                        phone: '9999999999',
                        rating: 4.5,
                        skills: ['Harvesting']
                      };
                      const job = jobs.find((j) => j.id === app.jobId) || { title: 'Farm Work' };

                      return (
                        <div key={app.id} className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800/40 flex items-start gap-4 transition-colors">
                          <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center font-black text-lg border border-emerald-500/20">
                            {worker.name.charAt(0)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="font-black text-foreground truncate">{worker.name}</h4>
                              <span className="text-[10px] text-muted-foreground font-bold uppercase">
                                {new Date(app.appliedDate).toLocaleDateString()}
                              </span>
                            </div>

                            <p className="text-xs text-muted-foreground font-semibold mt-0.5">
                              Applied for: <span className="text-foreground font-bold">{job.title}</span>
                            </p>

                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-amber-500 font-bold flex items-center gap-0.5">
                                ⭐ {worker.rating}
                              </span>
                              <span className="text-slate-300 dark:text-slate-700">•</span>
                              <span className="text-xs text-muted-foreground font-semibold truncate">
                                Skills: {worker.skills?.join(', ')}
                              </span>
                            </div>

                            {/* Tactile Application Controls */}
                            {app.status === 'pending' ? (
                              <div className="flex items-center gap-2 mt-4">
                                <Button
                                  onClick={() => handleApplicationStatus(app.id, 'offered')}
                                  size="xs"
                                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold"
                                >
                                  Hire Worker
                                </Button>
                                <Button
                                  onClick={() => handleApplicationStatus(app.id, 'rejected')}
                                  size="xs"
                                  variant="outline"
                                  className="text-red-500 hover:bg-red-50 hover:text-red-600 font-bold border-red-500/20"
                                >
                                  Decline
                                </Button>
                                <Button
                                  onClick={() => handleCall(worker.phone, worker.name)}
                                  size="xs"
                                  variant="outline"
                                  className="font-bold flex items-center gap-1"
                                >
                                  <Phone size={12} /> Call
                                </Button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 mt-4">
                                <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${['accepted', 'reached', 'in-progress', 'finished', 'confirmed', 'paid', 'completed'].includes(app.status)
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400'
                                  : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400'
                                  }`}>
                                  {['accepted', 'reached', 'in-progress', 'finished', 'confirmed', 'paid', 'completed'].includes(app.status) ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                  {app.status.toUpperCase()}
                                </span>

                                <Button
                                  onClick={() => navigate(`/assignments/${app.id}`)}
                                  size="xs"
                                  className="bg-primary text-white font-bold flex items-center gap-1"
                                >
                                  Track Status 🚜
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 2: MY JOBS */}
          {currentTab === 'my-jobs' && (
            <motion.div
              key="my-jobs"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-black text-foreground">My Posted Jobs</h2>
                <Button
                  onClick={() => navigate('/jobs/new')}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold"
                >
                  Post Another
                </Button>
              </div>

              {myJobs.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-border p-12 rounded-3xl text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                    <Briefcase size={28} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">No jobs posted yet</h3>
                  <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                    Create your first agricultural requirement to match with nearby workers.
                  </p>
                  <Button onClick={() => navigate('/jobs/new')}>Create Job Listing</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {myJobs.map((job) => {
                    const jobApplications = applications.filter((a) => a.jobId === job.id);
                    return (
                      <div key={job.id} className="bg-white dark:bg-slate-900 border border-border rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />

                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-lg font-black text-foreground leading-tight">{job.title}</h3>
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                              job.status === 'open' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400'
                            }`}>
                              {job.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
                            📍 {job.location}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 py-2 border-y border-border text-sm font-semibold">
                          <div>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest block">Daily Wage</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-black">₹{job.salary?.min || 500}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest block">Workers Log</span>
                            <span className="text-foreground font-black">{job.workersRequired || 5} Required</span>
                          </div>
                        </div>

                        {/* Interested Workers Section */}
                        <div className="pt-2 space-y-3">
                          <span className="text-xs font-black text-foreground block uppercase tracking-widest text-muted-foreground">
                            Interested Workers ({jobApplications.length})
                          </span>

                          <div className="space-y-2">
                            {jobApplications.length === 0 ? (
                              <p className="text-[10px] text-muted-foreground font-semibold italic">No applicants yet / कोई आवेदन नहीं</p>
                            ) : (
                              jobApplications.map((app) => {
                                const worker = workers.find((w) => w.id === app.workerId) || {
                                  name: 'Ravi Patil',
                                  phone: '9876543210',
                                  rating: 4.8,
                                  skills: ['Harvesting']
                                };
                                return (
                                  <div key={app.id} className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-2xl border border-border flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-black text-xs">
                                          {worker.name.charAt(0)}
                                        </div>
                                        <div>
                                          <span className="text-xs font-bold text-foreground block">{worker.name}</span>
                                          <span className="text-[10px] text-amber-500 font-bold">⭐ {worker.rating || '4.8'} • 2 km</span>
                                        </div>
                                      </div>
                                      
                                      <div className="flex items-center gap-1">
                                        <button 
                                          onClick={() => handleCall(worker.phone, worker.name)}
                                          className="p-2 bg-emerald-500/10 text-primary border border-emerald-500/20 rounded-xl active:scale-95 transition text-xs"
                                        >
                                          📞 Call
                                        </button>
                                        <button 
                                          onClick={() => navigate(`/workers/${worker.id}`)}
                                          className="px-2.5 py-2 bg-slate-100 dark:bg-slate-700 text-foreground text-[10px] font-bold rounded-xl active:scale-95 transition"
                                        >
                                          Profile
                                        </button>
                                      </div>
                                    </div>

                                    {app.status === 'pending' ? (
                                      <div className="flex gap-2">
                                        <button
                                          onClick={() => handleApplicationStatus(app.id, 'offered')}
                                          className="flex-grow py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-black rounded-xl active:scale-95 transition"
                                        >
                                          Hire / काम पर रखें
                                        </button>
                                        <button
                                          onClick={() => handleApplicationStatus(app.id, 'rejected')}
                                          className="px-3 py-2 border border-red-500/20 text-red-500 text-xs font-bold rounded-xl active:scale-95 transition"
                                        >
                                          Reject
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="flex items-center justify-between text-[10px] font-black text-emerald-600 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                                        <span>Hired / चयनित ✅</span>
                                        <span 
                                          onClick={() => navigate(`/assignments/${app.id}`)}
                                          className="underline cursor-pointer uppercase"
                                        >
                                          Track Status ➡️
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-border">
                          <Button
                            onClick={() => handleToggleJobStatus(job.id)}
                            variant="outline"
                            size="sm"
                            className="font-bold text-xs"
                          >
                            {job.status === 'open' ? 'Close Job' : 'Reopen Job'}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: CONTACTS */}
          {currentTab === 'contacts' && (
            <motion.div
              key="contacts"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-black text-foreground">Speed Dialer List</h2>

              <div className="bg-white dark:bg-slate-900 border border-border rounded-3xl overflow-hidden shadow-sm">
                <div className="divide-y divide-border">
                  {contactedList.map((contact) => (
                    <div key={contact.id} className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800/40 flex items-center justify-between gap-4 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-primary/10 text-primary rounded-full flex items-center justify-center font-black">
                          {contact.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-black text-foreground">{contact.name}</h4>
                          <p className="text-xs text-muted-foreground font-semibold mt-0.5">
                            Last Call: {contact.date} • Rating: ⭐ {contact.rating}
                          </p>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleCall(contact.phone, contact.name)}
                        className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 h-10 rounded-xl flex items-center gap-1.5"
                      >
                        <Phone size={14} /> Call Now
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: REVIEWS */}
          {currentTab === 'reviews' && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-slate-900 border border-border p-6 rounded-3xl shadow-sm text-center max-w-md mx-auto space-y-4">
                <h3 className="text-lg font-black text-foreground">Farmer Rating Score</h3>
                <div className="flex items-center justify-center gap-1 text-4xl text-amber-500 font-black">
                  ⭐ 4.5 <span className="text-sm text-muted-foreground font-bold">/ 5</span>
                </div>
                <p className="text-xs text-muted-foreground font-semibold">Based on 42 reviews completed by verified platform workers</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-black text-foreground">Workers Feedback</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {farmerReviews.map((rev) => (
                    <div key={rev.id} className="bg-white dark:bg-slate-900 border border-border p-5 rounded-2xl shadow-sm space-y-3 relative">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-foreground text-sm">{rev.author}</span>
                        <span className="text-amber-500 font-bold text-xs">{'⭐'.repeat(rev.rating)}</span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {rev.chips.map((c) => (
                          <span key={c} className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-foreground px-2 py-0.5 rounded-full border border-border">
                            {c}
                          </span>
                        ))}
                      </div>

                      {rev.comment && (
                        <p className="text-xs text-muted-foreground italic font-medium">
                          "{rev.comment}"
                        </p>
                      )}

                      <div className="text-[9px] text-muted-foreground font-bold text-right">
                        {rev.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: SETTINGS */}
          {currentTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-md mx-auto space-y-6"
            >
              <h2 className="text-2xl font-black text-foreground">Settings</h2>

              <TrustScoreCard score={96} userName={user?.name || 'Farmer'} />

              <div className="bg-white dark:bg-slate-900 border border-border rounded-3xl p-6 shadow-sm space-y-6">

                {/* Setting 1: Language */}
                <div className="space-y-2">
                  <h3 className="text-sm font-black text-foreground uppercase tracking-widest text-muted-foreground">Regional Language</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="py-3 px-4 border-2 border-emerald-500 bg-emerald-500/5 text-primary rounded-xl font-bold text-center">
                      English (EN)
                    </button>
                    <button className="py-3 px-4 border border-border bg-slate-50 dark:bg-slate-800 rounded-xl font-bold text-center text-foreground">
                      हिन्दी (HI)
                    </button>
                  </div>
                </div>

                <hr className="border-border" />

                {/* Setting 2: Notification Alerts */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-foreground">SMS Alerts</h4>
                    <p className="text-xs text-muted-foreground">Receive daily SMS alerts on workers matches</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
                </div>

                <hr className="border-border" />

                {/* Setting 3: Phone Sync */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-foreground">Direct Dialer Sync</h4>
                    <p className="text-xs text-muted-foreground">Open mobile dialer automatically without warnings</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
                </div>

                <hr className="border-border" />

                {/* Setting 4: App Tutorial Guide */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-foreground">App Tutorial Guide</h4>
                    <p className="text-xs text-muted-foreground">Replay the visual slide guide explaining how to use AgriConnect</p>
                  </div>
                  <Button
                    onClick={() => setOnboardingOpen(true)}
                    size="sm"
                    variant="outline"
                    className="font-bold border-primary text-primary"
                  >
                    Play Guide
                  </Button>
                </div>
              </div>

              <SafetySettings />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* MODAL: SUBMIT REVIEW FOR WORKER */}
      <AnimatePresence>
        {selectedWorkerForReview && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-border p-6 rounded-3xl w-full max-w-sm space-y-6 shadow-xl"
            >
              <div className="text-center space-y-1">
                <h3 className="text-xl font-black text-foreground">Rate {selectedWorkerForReview.name}</h3>
                <p className="text-xs text-muted-foreground font-medium">Completed task review</p>
              </div>

              {/* Star Rating Selection */}
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    onClick={() => setStars(val)}
                    className="text-4xl hover:scale-110 active:scale-95 transition"
                  >
                    {val <= stars ? '⭐' : '☆'}
                  </button>
                ))}
              </div>

              {/* Predefined Feedback Chips */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-muted-foreground uppercase text-center">Feedback Tags</label>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {workerChips.map((chip) => {
                    const selected = selectedChips.includes(chip);
                    return (
                      <button
                        key={chip}
                        onClick={() => handleChipToggle(chip)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border transition active:scale-95 ${selected
                          ? 'bg-emerald-500/10 border-emerald-500 text-primary'
                          : 'bg-slate-50 dark:bg-slate-800 border-border text-foreground'
                          }`}
                      >
                        {chip}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional comment */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-muted-foreground uppercase">Write anything else (Optional)</label>
                <textarea
                  maxLength={200}
                  placeholder="Tell us more about the worker..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border-2 border-border focus:border-emerald-500 rounded-xl text-xs text-foreground focus:outline-none h-20 resize-none"
                />
                <span className="text-[10px] text-muted-foreground block text-right font-semibold">
                  {200 - comment.length} characters left
                </span>
              </div>

              {/* Action triggers */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setSelectedWorkerForReview(null)}
                  variant="outline"
                  className="flex-1 h-12 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitReview}
                  disabled={submittingReview}
                  className="flex-1 h-12 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold rounded-xl"
                >
                  {submittingReview ? 'Submitting...' : 'Submit Rating'}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <OnboardingModal isOpen={onboardingOpen} onClose={() => setOnboardingOpen(false)} />
    </div>
  );
}
