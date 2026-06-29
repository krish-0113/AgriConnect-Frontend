import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, Search, Calendar, Star, Bell, Settings, Phone, Landmark,
  ShieldCheck, Clock, CheckCircle, XCircle, ArrowRight, User, Check, Info
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { useToast } from '../components/common/Toast';
import { addApplication, updateApplication } from '../store/slices/applicationsSlice';
import OnboardingModal from '../components/common/OnboardingModal';
import TrustScoreCard from '../components/TrustScoreCard';
import SafetySettings from '../components/SafetySettings';

export default function WorkerDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { user } = useAuth();

  // Redux state
  const jobs = useAppSelector((state) => state.jobs.jobs);
  const applications = useAppSelector((state) => state.applications.applications);

  const [onboardingOpen, setOnboardingOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('seenOnboarding');
    if (!seen) {
      setOnboardingOpen(true);
    }
  }, []);

  // Tab State parsed from URL search query parameter "?tab=..."
  const currentTab = new URLSearchParams(location.search).get('tab') || 'home';

  // State for Review dialog
  const [selectedFarmerForReview, setSelectedFarmerForReview] = useState(null);
  const [stars, setStars] = useState(5);
  const [selectedChips, setSelectedChips] = useState([]);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  // Filter worker's own applications
  const myApplications = applications.filter((a) => a.workerId === user?.id || a.workerId === 'demo-id');

  // Filter confirmed assignments (including accepted, offered, in-progress, and completed states)
  const confirmedAssignments = myApplications.filter((a) =>
    ['accepted', 'offered', 'in-progress', 'completed'].includes(a.status)
  );

  // Mock contacted log for Worker
  const [contactedFarmers, setContactedFarmers] = useState([
    { id: 'f-1', name: 'Golden Grain Farm Co.', phone: '9876543210', location: 'Iowa', date: '2026-06-27' },
    { id: 'f-2', name: 'Valley Livestock Corp.', phone: '8765432109', location: 'Illinois', date: '2026-06-25' }
  ]);

  // Mock reviews for Worker
  const [workerReviews, setWorkerReviews] = useState([
    { id: 'rev-1', author: 'Golden Grain Farm Co.', rating: 5, chips: ['Hard Working', 'Skilled', 'On Time'], comment: 'Ramesh is an excellent worker. Completed the sowing tasks ahead of time.', date: '2026-06-26' },
    { id: 'rev-2', author: 'Valley Livestock Corp.', rating: 5, chips: ['Honest', 'Skilled'], comment: 'Prompt and well behaved. Works well with tractors.', date: '2026-06-23' }
  ]);

  const handleSetTab = (tabName) => {
    navigate(`/dashboard?tab=${tabName}`);
  };

  const handleCallFarmer = (phone, farmerName) => {
    window.location.href = `tel:${phone}`;
    toast.success(`Calling ${farmerName}...`);

    if (!contactedFarmers.some((c) => c.phone === phone)) {
      setContactedFarmers((prev) => [
        {
          id: `f-contact-${Date.now()}`,
          name: farmerName,
          phone,
          location: 'Local Farm',
          date: new Date().toISOString().split('T')[0]
        },
        ...prev
      ]);
    }
  };

  const handleAcceptOffer = (appId) => {
    const app = applications.find((a) => a.id === appId);
    if (app) {
      const updatedApp = { ...app, status: 'accepted' };
      dispatch(updateApplication(updatedApp));
      toast.success('Offer accepted! You can call the farmer to discuss details.');
    }
  };

  const handleDeclineOffer = (appId) => {
    const app = applications.find((a) => a.id === appId);
    if (app) {
      const updatedApp = { ...app, status: 'rejected' };
      dispatch(updateApplication(updatedApp));
      toast.info('Offer declined.');
    }
  };

  const handleApplyOneTap = (jobId) => {
    const alreadyApplied = myApplications.some((a) => a.jobId === jobId);
    if (alreadyApplied) {
      toast.info('You have already applied to this job.');
      return;
    }

    const job = jobs.find((j) => j.id === jobId);
    const newApp = {
      id: `app-${Date.now()}`,
      jobId: jobId,
      workerId: user?.id || 'demo-id',
      companyId: job?.company?.id || 'comp-demo',
      status: 'pending',
      appliedDate: new Date().toISOString(),
      message: 'I am interested in this agricultural job posting.'
    };

    dispatch(addApplication(newApp));
    toast.success('Applied successfully in 1-tap! Check My Applications.');
  };

  // Farmer reviews chips
  const farmerChips = ['Good Farmer', 'Paid On Time', 'Respectful', 'Clear Instructions', 'Safe Workplace', 'Helpful', 'Recommended'];

  const handleChipToggle = (chip) => {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  const handleOpenReview = (companyName) => {
    setSelectedFarmerForReview(companyName);
    setStars(5);
    setSelectedChips([]);
    setComment('');
  };

  const handleSubmitReview = async () => {
    setSubmittingReview(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success(`Feedback submitted for ${selectedFarmerForReview}!`);
    setSelectedFarmerForReview(null);
    setSubmittingReview(false);
  };

  // Enriched recommended jobs for worker feed (with distance, crop specific e.g. Wheat, Tomato)
  const getRecommendedJobs = () => {
    const cropBadges = [
      { crop: 'Wheat 🌾', dist: '1.2 km', wage: '₹700', hrs: '2 hrs ago' },
      { crop: 'Maize 🌽', dist: '3.4 km', wage: '₹600', hrs: '4 hrs ago' },
      { crop: 'Tomato 🍅', dist: '0.8 km', wage: '₹800', hrs: '10 mins ago' },
      { crop: 'Potato 🥔', dist: '5.2 km', wage: '₹550', hrs: '1 day ago' }
    ];

    return jobs.slice(0, 4).map((job, idx) => {
      const enrichment = cropBadges[idx % cropBadges.length];
      return {
        ...job,
        title: job.title.includes('🌾') || job.title.includes('🍅') || job.title.includes('🌽')
          ? job.title
          : `${enrichment.crop} - ${job.title}`,
        distance: enrichment.dist,
        wageRate: enrichment.wage,
        timeAgo: enrichment.hrs,
        rating: 4.6
      };
    });
  };

  const recommendedJobs = getRecommendedJobs();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Portal Header */}
      <div className="relative bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-emerald-500/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="absolute -top-24 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20 uppercase tracking-widest">
                <User size={12} /> Worker Portal
              </span>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">
                Namaste, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">{user?.name || 'Worker'}</span>
              </h1>
              <p className="text-slate-400 font-medium text-xs sm:text-sm">
                Skill: {user?.skills?.join(', ') || 'Farming'} • Find local village work in seconds
              </p>
            </div>

            <Button
              onClick={() => navigate('/jobs')}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold h-12 px-6 rounded-2xl shadow-lg shadow-emerald-500/10 flex items-center gap-2"
            >
              <Search size={18} />
              Find Farm Jobs
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

        {/* Announcements Marquee Ticker */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-400 px-4 py-2.5 rounded-2xl border border-emerald-500/20 text-xs font-bold flex items-center gap-2 mb-6 overflow-hidden relative">
          <span className="bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-md font-black uppercase text-[10px] flex-shrink-0 animate-pulse">Update / सूचना</span>
          <marquee className="font-semibold select-none">
            🌾 Crop Market (Cooperative Rates): MSP of wheat increased to ₹2,275 per quintal. | ⛈️ Weather Advisory: High winds expected tomorrow afternoon. Secure open fields harvesting.
          </marquee>
        </div>

        {/* Congratulations hired banner */}
        {myApplications.some((a) => a.status === 'offered') && (
          <div className="bg-gradient-to-br from-emerald-500/10 via-slate-500/5 to-transparent border border-emerald-500/25 p-5 rounded-3xl shadow-sm flex items-start gap-4 mb-6 relative overflow-hidden">
            <div className="w-12 h-12 bg-emerald-500 text-slate-950 rounded-2xl flex items-center justify-center font-black text-2xl flex-shrink-0 animate-bounce">
              🎉
            </div>
            <div className="space-y-1.5 flex-1 min-w-0">
              <span className="text-[10px] bg-emerald-500/15 text-primary font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-emerald-500/25">Hiring Request / नौकरी का प्रस्ताव</span>
              <h4 className="font-black text-foreground text-sm leading-tight">Congratulations! You have been hired by Baldev Singh.</h4>
              <p className="text-xs text-muted-foreground font-semibold">Job Requirement: Wheat Harvesting • ₹900/day</p>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => {
                    const app = myApplications.find((a) => a.status === 'offered');
                    if (app) {
                      dispatch(updateApplication({ ...app, status: 'accepted' }));
                      toast.success('Hiring offer accepted successfully!');
                    }
                  }}
                  size="xs"
                  className="bg-emerald-500 text-slate-950 font-black h-9 rounded-lg"
                >
                  Accept / स्वीकार करें ✅
                </Button>
                <Button
                  onClick={() => {
                    const app = myApplications.find((a) => a.status === 'offered');
                    if (app) {
                      dispatch(updateApplication({ ...app, status: 'rejected' }));
                      toast.success('Hiring offer declined.');
                    }
                  }}
                  size="xs"
                  variant="outline"
                  className="border-red-500/20 text-red-500 font-black h-9 rounded-lg"
                >
                  Decline / अस्वीकार करें ❌
                </Button>
                <Button
                  onClick={() => handleCallFarmer('9876500123', 'Baldev Singh')}
                  size="xs"
                  variant="outline"
                  className="border-border text-foreground font-black h-9 rounded-lg"
                >
                  Call 📞
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
              <p className="text-xs text-muted-foreground font-semibold">UV Index: Very High • Drink Water / पानी पिएं</p>
              <div className="text-[11px] text-amber-800 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-xl w-fit font-bold mt-2">
                ⚠️ Avoid direct sun exposure between 12 PM - 3 PM.
              </div>
            </div>
            <div className="text-5xl select-none relative z-10 filter drop-shadow-md">☀️</div>
            <div className="absolute top-1/2 right-4 -translate-y-1/2 w-28 h-28 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Earnings & Profile Completion Card */}
          <div className="bg-white dark:bg-slate-900 border border-border p-5 rounded-3xl grid grid-cols-2 gap-4">
            {/* Earnings */}
            <div className="space-y-1 border-r border-border pr-2 flex flex-col justify-between">
              <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest block">Earnings / कमाई</span>
              <h4 className="text-2xl font-black text-emerald-600 dark:text-emerald-400">₹3,500</h4>
              <p className="text-[10px] text-muted-foreground font-semibold">This Week (4 completed assignments)</p>
            </div>
            {/* Profile Progress */}
            <div className="space-y-1.5 pl-2 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                <span>Profile</span>
                <span className="text-primary font-black">80%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: '80%' }} />
              </div>
              <span
                onClick={() => navigate('/profile')}
                className="text-[9px] font-black text-primary uppercase cursor-pointer hover:underline"
              >
                Add Details (+20%) ➡️
              </span>
            </div>
          </div>
        </div>

        {/* CONDITIONAL RENDERING OF VIEWS */}
        <AnimatePresence mode="wait">

          {/* TAB 1: HOME (GOOGLE PAY GRID + YOUTUBE JOB FEED) */}
          {currentTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {/* Google Pay Actions Grid */}
              <div className="bg-white dark:bg-slate-900 border border-border p-6 rounded-3xl shadow-sm">
                <h2 className="text-lg font-black text-foreground mb-4 uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 animate-pulse">
                  <Info size={16} /> Quick Actions
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Find Jobs */}
                  <button
                    onClick={() => navigate('/jobs')}
                    className="flex flex-col items-center justify-center p-5 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 hover:to-teal-500/10 border border-emerald-500/20 hover:border-emerald-500/40 rounded-2xl active:scale-95 transition text-center"
                  >
                    <div className="w-12 h-12 bg-emerald-500 text-slate-950 rounded-2xl flex items-center justify-center mb-3 shadow-md">
                      <Search size={24} />
                    </div>
                    <span className="text-sm font-extrabold text-foreground">Find Jobs</span>
                    <span className="text-[10px] text-muted-foreground font-semibold mt-0.5">Explore Fields</span>
                  </button>

                  {/* My Applications */}
                  <button
                    onClick={() => handleSetTab('applications')}
                    className="flex flex-col items-center justify-center p-5 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 hover:to-indigo-500/10 border border-blue-500/20 hover:border-blue-500/40 rounded-2xl active:scale-95 transition text-center"
                  >
                    <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center mb-3 shadow-md">
                      <Briefcase size={24} />
                    </div>
                    <span className="text-sm font-extrabold text-foreground">My Applied ({myApplications.length})</span>
                    <span className="text-[10px] text-muted-foreground font-semibold mt-0.5">Check Status</span>
                  </button>

                  {/* Assignments */}
                  <button
                    onClick={() => handleSetTab('assignments')}
                    className="flex flex-col items-center justify-center p-5 bg-gradient-to-br from-orange-500/10 to-amber-500/5 hover:to-amber-500/10 border border-orange-500/20 hover:border-orange-500/40 rounded-2xl active:scale-95 transition text-center"
                  >
                    <div className="w-12 h-12 bg-orange-500 text-white rounded-2xl flex items-center justify-center mb-3 shadow-md">
                      <Calendar size={24} />
                    </div>
                    <span className="text-sm font-extrabold text-foreground">My Schedule ({confirmedAssignments.length})</span>
                    <span className="text-[10px] text-muted-foreground font-semibold mt-0.5">Work Calendar</span>
                  </button>

                  {/* Reviews */}
                  <button
                    onClick={() => handleSetTab('reviews')}
                    className="flex flex-col items-center justify-center p-5 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/5 hover:to-fuchsia-500/10 border border-purple-500/20 hover:border-purple-500/40 rounded-2xl active:scale-95 transition text-center"
                  >
                    <div className="w-12 h-12 bg-purple-500 text-white rounded-2xl flex items-center justify-center mb-3 shadow-md">
                      <Star size={24} />
                    </div>
                    <span className="text-sm font-extrabold text-foreground">My Feedback</span>
                    <span className="text-[10px] text-muted-foreground font-semibold mt-0.5">Farmer Reviews</span>
                  </button>
                </div>
              </div>

              {/* YouTube Style Recommended Jobs Feed */}
              <div className="space-y-4">
                <h3 className="text-xl font-black text-foreground">Recommended Jobs in Your Village</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recommendedJobs.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => navigate(`/jobs/${job.id}`)}
                      className="bg-white dark:bg-slate-900 border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
                    >
                      {/* Banners */}
                      <div className="h-2 bg-gradient-to-r from-emerald-500/60 to-teal-500/60 group-hover:from-emerald-500 group-hover:to-teal-500 transition-all" />

                      <div className="p-6 space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-muted-foreground font-bold px-2 py-0.5 rounded-full border border-border">
                              🕒 {job.timeAgo}
                            </span>
                            <h4 className="font-black text-foreground leading-tight group-hover:text-primary transition text-base">
                              {job.title}
                            </h4>
                          </div>
                          <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-2xl border border-emerald-500/20">
                            {job.wageRate}
                          </span>
                        </div>

                        {/* Farmer & Rating */}
                        <div className="flex items-center gap-2 text-xs font-semibold">
                          <span className="text-foreground">{job.company?.name || 'Local Farmer'}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-amber-500 flex items-center gap-0.5">
                            ⭐ {job.rating}
                          </span>
                        </div>

                        {/* Location Details */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground font-bold">
                          <span>📍 {job.location}</span>
                          <span className="text-primary">{job.distance}</span>
                        </div>
                      </div>

                      {/* One tap apply widget */}
                      <div className="px-6 pb-6 pt-2">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApplyOneTap(job.id);
                          }}
                          className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl h-11 flex items-center justify-center gap-1 shadow-md shadow-emerald-500/10 active:scale-95 transition"
                        >
                          ⚡ Apply in One Tap
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: APPLICATIONS */}
          {currentTab === 'applications' && (
            <motion.div
              key="applications"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-black text-foreground">My Submitted Applications</h2>

              {myApplications.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-border p-12 rounded-3xl text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                    <Briefcase size={28} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">No applications found</h3>
                  <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                    Browse job postings in your area and apply with one tap.
                  </p>
                  <Button onClick={() => navigate('/jobs')}>Find Jobs Now</Button>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 border border-border rounded-3xl overflow-hidden shadow-sm">
                  <div className="divide-y divide-border">
                    {myApplications.map((app) => {
                      const job = jobs.find((j) => j.id === app.jobId) || {
                        title: 'Farm Laborer',
                        company: { name: 'Local Farm' },
                        location: 'Local Field'
                      };

                      return (
                        <div key={app.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <h4 className="font-black text-foreground text-base">{job.title}</h4>
                            <p className="text-xs text-muted-foreground font-semibold">
                              Owner: {job.company?.name} • 📍 {job.location}
                            </p>
                            <p className="text-[10px] text-muted-foreground font-semibold">
                              Applied Date: {new Date(app.appliedDate).toLocaleDateString()}
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${app.status === 'pending'
                              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                              : app.status === 'accepted'
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                                : app.status === 'offered'
                                  ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
                                  : 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20'
                              }`}>
                              {app.status}
                            </span>

                            {/* Accept/Decline action for direct job offers */}
                            {app.status === 'offered' && (
                              <div className="flex items-center gap-2">
                                <Button
                                  onClick={() => handleAcceptOffer(app.id)}
                                  size="xs"
                                  className="bg-emerald-500 text-slate-950 font-bold"
                                >
                                  Accept
                                </Button>
                                <Button
                                  onClick={() => handleDeclineOffer(app.id)}
                                  size="xs"
                                  variant="outline"
                                  className="text-red-500 border-red-500/20 font-bold"
                                >
                                  Decline
                                </Button>
                              </div>
                            )}

                            {/* Speed call button when hired */}
                            {app.status === 'accepted' && (
                              <Button
                                onClick={() => handleCallFarmer('9876543210', job.company?.name || 'Farmer')}
                                size="xs"
                                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold flex items-center gap-1"
                              >
                                <Phone size={12} /> Call Owner
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: WORK ASSIGNMENTS SCHEDULE */}
          {currentTab === 'assignments' && (
            <motion.div
              key="assignments"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-black text-foreground">My Confirmed Assignments</h2>

              {confirmedAssignments.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-border p-12 rounded-3xl text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                    <Calendar size={28} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">No active assignments</h3>
                  <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                    Confirm direct job offers or wait for farmers to approve applications.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {confirmedAssignments.map((app) => {
                    const job = jobs.find((j) => j.id === app.jobId) || {
                      title: 'Wheat Sowing',
                      company: { name: 'Valley Grain Farms' },
                      location: 'Mansa Outskirts',
                      workDate: new Date().toISOString()
                    };

                    return (
                      <div key={app.id} className="bg-white dark:bg-slate-900 border border-border rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
                        <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-emerald-500" />

                        <div className="space-y-2 pl-2">
                          <h4 className="font-black text-foreground text-lg">{job.title}</h4>
                          <p className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
                            📍 {job.location} • <span className="text-emerald-500 font-bold">Confirmed</span>
                          </p>
                          <p className="text-xs font-black text-foreground bg-slate-50 dark:bg-slate-800 px-3 py-1.5 w-fit rounded-lg border border-border">
                            📅 Start Date: {job.workDate ? new Date(job.workDate).toLocaleDateString() : 'Tomorrow Morning'}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 pl-2">
                          <Button
                            onClick={() => navigate(`/assignments/${app.id}`)}
                            className="bg-primary text-white font-bold h-11 px-5 rounded-xl flex items-center gap-1"
                          >
                            Track Status 🚜
                          </Button>

                          <Button
                            onClick={() => handleCallFarmer('9876543210', job.company?.name || 'Farmer')}
                            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold h-11 px-5 rounded-xl flex items-center gap-1.5"
                          >
                            <Phone size={14} /> Call Farmer
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 4: REVIEWS FEEDBACK */}
          {currentTab === 'reviews' && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-slate-900 border border-border p-6 rounded-3xl shadow-sm text-center max-w-md mx-auto space-y-4">
                <h3 className="text-lg font-black text-foreground">My Profile Rating Score</h3>
                <div className="flex items-center justify-center gap-1 text-4xl text-amber-500 font-black">
                  ⭐ 5.0 <span className="text-sm text-muted-foreground font-bold">/ 5</span>
                </div>
                <p className="text-xs text-muted-foreground font-semibold">Based on 14 completed tasks on verification records</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-black text-foreground">Reviews Given by Land Owners</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {workerReviews.map((rev) => (
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

              <TrustScoreCard score={92} userName={user?.name || 'Worker'} />

              <div className="bg-white dark:bg-slate-900 border border-border rounded-3xl p-6 shadow-sm space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-black text-foreground uppercase tracking-widest text-muted-foreground">Select Language / भाषा चुनें</h3>
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

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-foreground">Work Status Alerts</h4>
                    <p className="text-xs text-muted-foreground">Receive instant SMS alerts when a farmer calls you</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
                </div>

                <hr className="border-border" />

                {/* Setting 3: App Tutorial Guide */}
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

      {/* MODAL: SUBMIT RATING FOR FARMER */}
      <AnimatePresence>
        {selectedFarmerForReview && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-border p-6 rounded-3xl w-full max-w-sm space-y-6 shadow-xl"
            >
              <div className="text-center space-y-1">
                <h3 className="text-xl font-black text-foreground">Rate {selectedFarmerForReview}</h3>
                <p className="text-xs text-muted-foreground font-medium">How was your farm work experience?</p>
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
                  {farmerChips.map((chip) => {
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
                  placeholder="Leave details about wages, safety, environment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border-2 border-border focus:border-emerald-500 rounded-xl text-xs text-foreground focus:outline-none h-20 resize-none"
                />
                <span className="text-[10px] text-muted-foreground block text-right font-semibold">
                  {200 - comment.length} characters left
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setSelectedFarmerForReview(null)}
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
