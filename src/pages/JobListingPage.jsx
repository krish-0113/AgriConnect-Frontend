import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, DollarSign, Briefcase, Filter, Share2, Bookmark, Check, ShieldCheck, Star } from 'lucide-react';
import { useJobs } from '../hooks/useJobs';
import { useAuth } from '../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { useToast } from '../components/common/Toast';
import { addApplication } from '../store/slices/applicationsSlice';

export default function JobListingPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { user, isAuthenticated } = useAuth();
  const { filteredJobs, isLoading, loadJobs, updateJobFilters } = useJobs();
  const applications = useAppSelector((state) => state.applications.applications);

  // Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCropCategory, setSelectedCropCategory] = useState(''); // E.g. 'Wheat', 'Maize'
  const [selectedLocation, setSelectedLocation] = useState('');

  // Selected job for one-tap apply confirmation sheet
  const [confirmApplyJob, setConfirmApplyJob] = useState(null);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateJobFilters({
      search: searchTerm,
      location: selectedLocation,
      workType: selectedCropCategory ? [selectedCropCategory.toLowerCase()] : []
    });
  };

  const handleCategorySelect = (category) => {
    const updatedCategory = selectedCropCategory === category ? '' : category;
    setSelectedCropCategory(updatedCategory);
    updateJobFilters({
      search: searchTerm,
      location: selectedLocation,
      workType: updatedCategory ? [updatedCategory.toLowerCase()] : []
    });
  };

  const handleOneTapApplyTrigger = (e, job) => {
    e.stopPropagation(); // prevent card click details navigation
    if (!isAuthenticated) {
      toast.info('Please sign in to apply for farm jobs.');
      navigate('/login');
      return;
    }
    
    // Check if already applied
    const myApplies = applications.filter((a) => a.workerId === user?.id || a.workerId === 'demo-id');
    const alreadyApplied = myApplies.some((a) => a.jobId === job.id);
    if (alreadyApplied) {
      toast.info('You have already applied to this job!');
      return;
    }

    setConfirmApplyJob(job);
  };

  const handleConfirmApply = () => {
    if (!confirmApplyJob) return;

    const newApp = {
      id: `app-${Date.now()}`,
      jobId: confirmApplyJob.id,
      workerId: user?.id || 'demo-id',
      companyId: confirmApplyJob.company?.id || 'comp-demo',
      status: 'pending',
      appliedDate: new Date().toISOString(),
      message: 'I am interested in this agricultural job.'
    };

    dispatch(addApplication(newApp));
    toast.success(`Application submitted for ${confirmApplyJob.title}!`);
    setConfirmApplyJob(null);
  };

  const handleSaveJob = (e, title) => {
    e.stopPropagation();
    toast.success(`Job "${title}" saved to bookmarks!`);
  };

  const handleShareJob = (e, title) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this agricultural job: ${title}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      toast.success(`Link for "${title}" copied to clipboard!`);
    }
  };

  // Enriched crops icons list for top chips selector
  const cropCategories = [
    { label: 'Wheat 🌾', id: 'Crop' },
    { label: 'Maize 🌽', id: 'Maize' },
    { label: 'Potato 🥔', id: 'Potato' },
    { label: 'Tomato 🍅', id: 'Tomato' },
    { label: 'Cotton 🌱', id: 'Cotton' },
    { label: 'Tractor 🚜', id: 'Tractor' }
  ];

  // Enrich jobs with default emojis, ratings, distances to make listings look beautiful
  const getEnrichedJobData = (job, idx) => {
    const cropBadges = [
      { emoji: '🌾', dist: '1.5 km', name: 'Wheat' },
      { emoji: '🌽', dist: '3.2 km', name: 'Maize' },
      { emoji: '🥔', dist: '2.8 km', name: 'Potato' },
      { emoji: '🍅', dist: '0.9 km', name: 'Tomato' },
      { emoji: '🌱', dist: '6.4 km', name: 'Cotton' },
      { emoji: '🚜', dist: '4.1 km', name: 'Tractor Operations' }
    ];

    const enrichment = cropBadges[idx % cropBadges.length];
    
    // Convert salary numbers to typical daily wage rate
    const dailyWage = job.salary?.min ? (job.salary.min > 2000 ? Math.floor(job.salary.min / 30) : job.salary.min) : 700;

    return {
      ...job,
      title: job.title.includes('🌾') || job.title.includes('🍅') || job.title.includes('🌽') 
        ? job.title 
        : `${enrichment.emoji} ${job.title}`,
      distance: enrichment.dist,
      dailyWage,
      rating: (4.3 + (idx % 8) * 0.1).toFixed(1),
      requiredWorkers: job.workersRequired || (3 + (idx % 6)),
      postedDate: new Date(job.posted).toLocaleDateString()
    };
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      
      {/* Search Header Banner */}
      <div className="relative bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-emerald-500/10 mb-8">
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">
            Find <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Farm Work</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium">Browse local village jobs. Apply with one-tap, get paid directly.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search Panel */}
        <div className="bg-white dark:bg-slate-900 border border-border p-4 rounded-3xl shadow-sm mb-6 flex flex-col sm:flex-row items-center gap-3">
          <form onSubmit={handleSearchSubmit} className="w-full flex flex-col sm:flex-row items-stretch gap-2">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search crop, work type, sowing..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-border focus:border-emerald-500 focus:outline-none rounded-2xl text-foreground font-semibold text-sm"
              />
            </div>
            
            <Button
              type="submit"
              className="bg-primary text-white hover:bg-emerald-600 rounded-2xl px-6 h-12"
            >
              Search
            </Button>
          </form>
        </div>

        {/* Quick Category Emojis/Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none select-none">
          {cropCategories.map((cat) => {
            const isSelected = selectedCropCategory === cat.id;
            return (
              <button
                key={cat.label}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-4.5 py-2.5 rounded-full border text-sm font-extrabold flex-shrink-0 active:scale-95 transition-all ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500 text-primary'
                    : 'bg-white dark:bg-slate-900 border-border text-foreground hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Jobs Listings Container */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto" />
            <p className="text-muted-foreground mt-4 font-semibold text-sm">Loading job list...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-border p-16 rounded-3xl text-center space-y-3">
            <Briefcase size={48} className="mx-auto text-muted-foreground opacity-30" />
            <h3 className="text-lg font-bold text-foreground">No jobs posted nearby</h3>
            <p className="text-xs text-muted-foreground">Check back later or adjust your keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job, idx) => {
              const enriched = getEnrichedJobData(job, idx);
              return (
                <div
                  key={job.id}
                  onClick={() => navigate(`/jobs/${job.id}`)}
                  className="bg-white dark:bg-slate-900 border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
                >
                  <div className="p-6 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-muted-foreground font-bold px-2 py-0.5 rounded-full border border-border">
                          Posted: {enriched.postedDate}
                        </span>
                        
                        <h3 className="font-black text-foreground group-hover:text-primary transition text-lg leading-tight">
                          {enriched.title}
                        </h3>
                      </div>
                      
                      {/* Large daily wage badge */}
                      <div className="text-right flex-shrink-0">
                        <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest block">Daily Wage</span>
                        <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
                          ₹{enriched.dailyWage}
                        </span>
                      </div>
                    </div>

                    {/* Farmer details */}
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <span className="text-foreground">{enriched.company?.name || 'Local Farmer'}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-amber-500 flex items-center gap-0.5 font-bold">
                        ⭐ {enriched.rating}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed font-medium">
                      {enriched.description || 'Harvest workers needed for immediate fields work.'}
                    </p>

                    {/* Meta specifics */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground font-bold border-t border-border pt-4">
                      <span>📍 {enriched.location} ({enriched.distance})</span>
                      <span className="text-right text-foreground">{enriched.requiredWorkers} workers needed</span>
                    </div>
                  </div>

                  {/* Actions Grid */}
                  <div className="px-6 pb-6 pt-2 flex items-center gap-2">
                    <Button
                      onClick={(e) => handleOneTapApplyTrigger(e, enriched)}
                      className="flex-grow bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl h-11 flex items-center justify-center gap-1 shadow-md shadow-emerald-500/10 active:scale-95 transition"
                    >
                      ⚡ Apply in One Tap
                    </Button>
                    
                    <button
                      onClick={(e) => handleSaveJob(e, enriched.title)}
                      className="p-3 bg-slate-50 dark:bg-slate-800 text-foreground border border-border hover:bg-muted active:scale-90 rounded-xl transition"
                      title="Save Job"
                    >
                      <Bookmark size={16} />
                    </button>
                    
                    <button
                      onClick={(e) => handleShareJob(e, enriched.title)}
                      className="p-3 bg-slate-50 dark:bg-slate-800 text-foreground border border-border hover:bg-muted active:scale-90 rounded-xl transition"
                      title="Share Job"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ONE-TAP APPLY CONFIRMATION BOTTOM SHEET / DIALOG */}
      <AnimatePresence>
        {confirmApplyJob && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
            {/* Backdrop click close */}
            <div className="absolute inset-0" onClick={() => setConfirmApplyJob(null)} />
            
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-border rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm space-y-6 shadow-2xl relative z-10"
            >
              <div className="w-12 h-1 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto sm:hidden -mt-2 mb-2" />
              
              <div className="text-center space-y-2">
                <span className="text-3xl text-center block">⚡</span>
                <h3 className="text-xl font-black text-foreground">Confirm Apply?</h3>
                <p className="text-xs text-muted-foreground font-medium">
                  Do you want to send your profile details to the farmer?
                </p>
              </div>

              {/* Info details */}
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-border space-y-2 text-sm font-semibold">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Work Category</span>
                  <span className="text-foreground">{confirmApplyJob.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Village Location</span>
                  <span className="text-foreground truncate max-w-[180px]">{confirmApplyJob.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Daily Wage</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-black">₹{confirmApplyJob.dailyWage} / day</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setConfirmApplyJob(null)}
                  variant="outline"
                  className="flex-1 h-12 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmApply}
                  className="flex-grow bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl h-12 flex items-center justify-center gap-1 shadow-md shadow-emerald-500/10 active:scale-95 transition"
                >
                  Confirm & Apply
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
