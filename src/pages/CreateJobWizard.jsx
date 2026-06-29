import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useJobs } from '../hooks/useJobs';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../components/common/Toast';
import { ArrowLeft, ArrowRight, Check, MapPin, Navigation, Calendar as CalendarIcon, Users, DollarSign, Briefcase } from 'lucide-react';
import { Button } from '../components/ui/button';

const CROPS = [
  { id: 'wheat', name: 'Wheat', labelHi: 'गेहूं', emoji: '🌾', color: 'from-amber-100 to-yellow-200 text-amber-800' },
  { id: 'maize', name: 'Maize', labelHi: 'मक्का', emoji: '🌽', color: 'from-yellow-100 to-yellow-300 text-yellow-800' },
  { id: 'potato', name: 'Potato', labelHi: 'आलू', emoji: '🥔', color: 'from-stone-100 to-stone-200 text-stone-800' },
  { id: 'tomato', name: 'Tomato', labelHi: 'टमाटर', emoji: '🍅', color: 'from-red-100 to-red-200 text-red-800' },
  { id: 'cotton', name: 'Cotton', labelHi: 'कपास', emoji: '🌱', color: 'from-teal-50 to-teal-100 text-teal-800' },
  { id: 'groundnut', name: 'Groundnut', labelHi: 'मूंगफली', emoji: '🥜', color: 'from-amber-50 to-orange-100 text-orange-900' }
];

const WORKS = [
  { id: 'tractor', name: 'Tractor Driving', labelHi: 'ट्रैक्टर चलाना', emoji: '🚜', color: 'from-blue-100 to-blue-200 text-blue-800' },
  { id: 'sowing', name: 'Sowing', labelHi: 'बुवाई करना', emoji: '🌱', color: 'from-green-100 to-green-200 text-green-800' },
  { id: 'irrigation', name: 'Irrigation', labelHi: 'सिंचाई करना', emoji: '💧', color: 'from-sky-100 to-sky-200 text-sky-800' },
  { id: 'harvesting', name: 'Harvesting', labelHi: 'कटाई करना', emoji: '🌾', color: 'from-amber-100 to-amber-200 text-amber-800' },
  { id: 'packing', name: 'Packing', labelHi: 'पैकिंग करना', emoji: '🧺', color: 'from-orange-100 to-orange-200 text-orange-800' },
  { id: 'weeding', name: 'Weeding', labelHi: 'निराई करना', emoji: '🌿', color: 'from-emerald-100 to-emerald-200 text-emerald-800' }
];

const WAGE_PRESETS = [500, 700, 1000];

const STATES = ['Punjab', 'Haryana', 'Uttar Pradesh', 'Rajasthan', 'Madhya Pradesh', 'Bihar'];
const DISTRICTS_MAP = {
  'Punjab': ['Mansa', 'Bathinda', 'Sangrur', 'Patiala', 'Ludhiana'],
  'Haryana': ['Sirsa', 'Hisar', 'Fatehabad', 'Karnal'],
  'Uttar Pradesh': ['Meerut', 'Aligarh', 'Mathura', 'Bareilly'],
  'Rajasthan': ['Ganganagar', 'Hanumangarh', 'Alwar', 'Jaipur'],
  'Madhya Pradesh': ['Indore', 'Bhopal', 'Ujjain', 'Dhar'],
  'Bihar': ['Patna', 'Gaya', 'Muzaffarpur', 'Darbhanga']
};
const VILLAGES_MAP = {
  'Mansa': ['Ramgarh', 'Khiala Kalan', 'Bhikhi', 'Budhlada', 'Sardulgarh'],
  'Bathinda': ['Rampur', 'Maur', 'Bhucho Mandi', 'Gidderbaha'],
  'Meerut': ['Mawana', 'Sardhana', 'Hastinapur', 'Kithaur'],
  'Ganganagar': ['Padampur', 'Sadulshahar', 'Karanpur', 'Suratgarh']
};

export default function CreateJobWizard() {
  const navigate = useNavigate();
  const { createJob } = useJobs();
  const { user } = useAuth();
  const toast = useToast();

  const [step, setStep] = useState(1);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedWork, setSelectedWork] = useState('');
  const [workersCount, setWorkersCount] = useState(5);
  const [workDate, setWorkDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedWage, setSelectedWage] = useState(700); // preset or 'custom'
  const [customWage, setCustomWage] = useState('');
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsLocation, setGpsLocation] = useState('');
  
  // Manual location dropdown states
  const [manualState, setManualState] = useState('');
  const [manualDistrict, setManualDistrict] = useState('');
  const [manualVillage, setManualVillage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postedSuccess, setPostedSuccess] = useState(false);

  // Auto-detect GPS on step 6 load
  useEffect(() => {
    if (step === 6) {
      detectGps();
    }
  }, [step]);

  const detectGps = () => {
    setGpsLoading(true);
    if (!navigator.geolocation) {
      toast.error('GPS is not supported by your browser.');
      setGpsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Mock rural geocoding details based on coordinates to make it realistic
        setTimeout(() => {
          const lat = position.coords.latitude;
          const villages = ['Ramgarh Village', 'Greenfields Farm Area', 'Kalyan Village', 'Prem Nagar Outskirts'];
          const randomVillage = villages[Math.floor(Math.random() * villages.length)];
          const mockLoc = `${randomVillage}, Mansa District, Punjab`;
          setGpsLocation(mockLoc);
          setGpsLoading(false);
          toast.success('Location detected successfully via GPS!');
        }, 1200);
      },
      (error) => {
        console.error('GPS error:', error);
        setGpsLoading(false);
        toast.info('GPS unavailable. Please select your location manually.');
      },
      { timeout: 8000 }
    );
  };

  const getFinalWage = () => {
    return selectedWage === 'custom' ? Number(customWage) : selectedWage;
  };

  const getFinalLocation = () => {
    if (gpsLocation) return gpsLocation;
    if (manualVillage && manualDistrict && manualState) {
      return `${manualVillage}, ${manualDistrict}, ${manualState}`;
    }
    if (manualDistrict && manualState) {
      return `${manualDistrict}, ${manualState}`;
    }
    return manualState || 'Punjab, India';
  };

  const handleNext = () => {
    if (step === 1 && !selectedCrop) {
      toast.error('Please choose a crop');
      return;
    }
    if (step === 2 && !selectedWork) {
      toast.error('Please choose a work type');
      return;
    }
    if (step === 5 && selectedWage === 'custom' && (!customWage || Number(customWage) <= 0)) {
      toast.error('Please enter a valid daily wage rate');
      return;
    }
    if (step === 6 && !gpsLocation && !manualState) {
      toast.error('Please detect GPS or select a State');
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handlePostJob = async () => {
    setIsSubmitting(true);
    const cropObj = CROPS.find((c) => c.id === selectedCrop);
    const workObj = WORKS.find((w) => w.id === selectedWork);
    const finalWage = getFinalWage();
    const finalLocation = getFinalLocation();

    const newJob = {
      id: `job-${Date.now()}`,
      title: `${cropObj.emoji} ${cropObj.name} ${workObj.name}`,
      description: `${workObj.name} work required for ${cropObj.name} crop fields. Expected completion and clean working protocols.`,
      location: finalLocation,
      salary: {
        min: finalWage,
        max: finalWage
      },
      jobType: 'seasonal',
      workType: selectedWork,
      company: {
        id: user?.id || 'demo-farm-id',
        name: user?.company_name || user?.name || 'Golden Grain Farm'
      },
      requiredSkills: [workObj.name],
      experience: '0-1 years',
      posted: new Date().toISOString(),
      deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'open',
      applicants: 0,
      workersRequired: workersCount,
      workDate: workDate
    };

    try {
      // Simulate API lag
      await new Promise((resolve) => setTimeout(resolve, 1500));
      createJob(newJob);
      setPostedSuccess(true);
      toast.success('Job posted successfully!');
    } catch (err) {
      toast.error('Failed to post job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsInfo = [
    { title: 'Choose Crop', subtitle: 'What crop do you need help with?' },
    { title: 'Choose Work', subtitle: 'What type of work is required?' },
    { title: 'Workers Required', subtitle: 'How many workers do you need?' },
    { title: 'Work Date', subtitle: 'When should the work start?' },
    { title: 'Payment', subtitle: 'How much will you pay per worker daily?' },
    { title: 'Location', subtitle: 'Where is your farm located?' },
    { title: 'Preview & Post', subtitle: 'Confirm all details before posting.' }
  ];

  if (postedSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="bg-white dark:bg-slate-900 border border-border p-10 rounded-3xl shadow-xl max-w-md w-full space-y-6"
        >
          <div className="w-20 h-20 bg-emerald-500/10 border-2 border-emerald-500 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
            <Check size={40} className="stroke-[3]" />
          </div>
          <h2 className="text-3xl font-black text-foreground tracking-tight">Job Posted!</h2>
          <p className="text-muted-foreground font-medium">
            Your requirement is now live. Nearby agricultural workers will be notified instantly.
          </p>
          <Button
            onClick={() => navigate('/company-dashboard?tab=my-jobs')}
            size="lg"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-2xl shadow-lg shadow-emerald-500/10"
          >
            Go to My Jobs
          </Button>
        </motion.div>
      </div>
    );
  }

  const cropObj = CROPS.find((c) => c.id === selectedCrop);
  const workObj = WORKS.find((w) => w.id === selectedWork);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 pt-4">
      <div className="max-w-xl mx-auto px-4">
        {/* Wizard Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={step === 1 ? () => navigate('/company-dashboard') : handleBack}
            className="p-2.5 bg-white dark:bg-slate-800 rounded-2xl border border-border/80 text-foreground hover:bg-muted active:scale-95 transition"
          >
            <ArrowLeft size={18} />
          </button>
          
          <div className="text-center">
            <span className="text-xs font-bold text-primary uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Step {step} of 7
            </span>
            <p className="text-sm font-semibold text-muted-foreground mt-1">{stepsInfo[step-1].title}</p>
          </div>

          <div className="w-9 h-9" /> {/* Spacer */}
        </div>

        {/* Progress bar */}
        <div className="h-2 w-full bg-muted dark:bg-slate-800 rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-emerald-500"
            initial={{ width: '0%' }}
            animate={{ width: `${(step / 7) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Step Title & Subtitle */}
        <div className="mb-6 text-center space-y-1">
          <h1 className="text-2xl font-black tracking-tight text-foreground">{stepsInfo[step-1].title}</h1>
          <p className="text-muted-foreground font-medium text-sm">{stepsInfo[step-1].subtitle}</p>
        </div>

        {/* Wizard Body content */}
        <div className="min-h-[360px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="bg-white dark:bg-slate-900 border border-border rounded-3xl p-6 shadow-md"
            >
              
              {/* STEP 1: CHOOSE CROP */}
              {step === 1 && (
                <div className="grid grid-cols-2 gap-4">
                  {CROPS.map((crop) => (
                    <button
                      key={crop.id}
                      onClick={() => setSelectedCrop(crop.id)}
                      className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all relative overflow-hidden active:scale-[0.97] ${
                        selectedCrop === crop.id
                          ? 'border-emerald-500 bg-emerald-500/5 shadow-md shadow-emerald-500/5'
                          : 'border-border bg-slate-50/50 hover:bg-slate-50 dark:bg-slate-800/40 dark:hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="text-4xl mb-2">{crop.emoji}</div>
                      <div className="font-black text-base text-foreground">{crop.name}</div>
                      <div className="text-xs text-muted-foreground font-semibold mt-0.5">{crop.labelHi}</div>
                      
                      {selectedCrop === crop.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center">
                          <Check size={12} className="stroke-[3]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* STEP 2: CHOOSE WORK */}
              {step === 2 && (
                <div className="grid grid-cols-2 gap-4">
                  {WORKS.map((work) => (
                    <button
                      key={work.id}
                      onClick={() => setSelectedWork(work.id)}
                      className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all relative overflow-hidden active:scale-[0.97] ${
                        selectedWork === work.id
                          ? 'border-emerald-500 bg-emerald-500/5 shadow-md shadow-emerald-500/5'
                          : 'border-border bg-slate-50/50 hover:bg-slate-50 dark:bg-slate-800/40 dark:hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="text-4xl mb-2">{work.emoji}</div>
                      <div className="font-black text-sm text-foreground text-center line-clamp-1">{work.name}</div>
                      <div className="text-xs text-muted-foreground font-semibold mt-0.5">{work.labelHi}</div>
                      
                      {selectedWork === work.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center">
                          <Check size={12} className="stroke-[3]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* STEP 3: WORKERS REQUIRED */}
              {step === 3 && (
                <div className="flex flex-col items-center justify-center py-10 space-y-6">
                  <div className="text-7xl font-black text-primary leading-none tabular-nums">
                    {workersCount}
                  </div>
                  <p className="text-muted-foreground font-bold text-base uppercase tracking-wider">Workers Needed</p>
                  
                  <div className="flex items-center gap-6 w-full max-w-[280px]">
                    <button
                      onClick={() => setWorkersCount((c) => Math.max(c - 1, 1))}
                      className="w-16 h-16 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-2xl font-black text-foreground rounded-2xl border border-border flex items-center justify-center active:scale-90 transition select-none"
                    >
                      -
                    </button>
                    <button
                      onClick={() => setWorkersCount((c) => Math.min(c + 1, 100))}
                      className="flex-1 h-16 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-2xl font-black rounded-2xl flex items-center justify-center active:scale-95 transition select-none"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: WORK DATE */}
              {step === 4 && (
                <div className="space-y-6 py-6 flex flex-col items-center">
                  <div className="p-4 bg-primary/10 rounded-full text-primary border border-primary/20">
                    <CalendarIcon size={32} />
                  </div>
                  
                  <div className="w-full">
                    <label className="block text-sm font-bold text-muted-foreground uppercase text-center mb-3">
                      Tap below to select start date
                    </label>
                    <input
                      type="date"
                      value={workDate}
                      onChange={(e) => setWorkDate(e.target.value)}
                      className="w-full text-center px-4 py-4 text-xl font-bold bg-slate-50 dark:bg-slate-800 border-2 border-border focus:border-emerald-500 rounded-2xl focus:outline-none text-foreground cursor-pointer"
                    />
                  </div>
                  
                  <p className="text-xs font-semibold text-muted-foreground text-center leading-relaxed">
                    Most agricultural bookings start from early morning. Selected Date: <span className="font-bold text-foreground">{new Date(workDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </p>
                </div>
              )}

              {/* STEP 5: PAYMENT */}
              {step === 5 && (
                <div className="space-y-6 py-4">
                  <div className="grid grid-cols-3 gap-3">
                    {WAGE_PRESETS.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setSelectedWage(preset)}
                        className={`flex flex-col items-center justify-center p-4 border-2 rounded-2xl font-bold active:scale-95 transition-all ${
                          selectedWage === preset
                            ? 'border-emerald-500 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400'
                            : 'border-border bg-slate-50 dark:bg-slate-800 text-foreground'
                        }`}
                      >
                        <span className="text-xs font-semibold text-muted-foreground mb-1">Daily</span>
                        <span className="text-xl font-black">₹{preset}</span>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedWage('custom')}
                    className={`w-full py-4 border-2 rounded-2xl font-bold active:scale-[0.98] transition-all text-center flex items-center justify-center gap-2 ${
                      selectedWage === 'custom'
                        ? 'border-emerald-500 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400'
                        : 'border-border bg-slate-50 dark:bg-slate-800 text-foreground'
                    }`}
                  >
                    <span>Custom Amount</span>
                  </button>

                  <AnimatePresence>
                    {selectedWage === 'custom' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="relative mt-2">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-black text-muted-foreground">₹</span>
                          <input
                            type="number"
                            placeholder="Enter daily wage rate"
                            value={customWage}
                            onChange={(e) => setCustomWage(e.target.value)}
                            className="w-full pl-8 pr-4 py-4 text-lg font-black bg-slate-50 dark:bg-slate-800 border-2 border-border focus:border-emerald-500 rounded-2xl focus:outline-none text-foreground"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* STEP 6: LOCATION */}
              {step === 6 && (
                <div className="space-y-6 py-2">
                  {/* GPS Card */}
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-border flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0 space-y-1">
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                        <Navigation size={12} className="animate-pulse" /> Auto GPS
                      </span>
                      <p className="text-sm font-bold text-foreground truncate">
                        {gpsLoading ? 'Detecting your location...' : gpsLocation || 'GPS Location not locked'}
                      </p>
                    </div>
                    
                    <button
                      onClick={detectGps}
                      disabled={gpsLoading}
                      className="p-3 bg-white dark:bg-slate-700 text-primary border border-border/80 hover:bg-muted active:scale-90 rounded-xl transition flex-shrink-0 disabled:opacity-50"
                    >
                      {gpsLoading ? (
                        <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <MapPin size={20} />
                      )}
                    </button>
                  </div>

                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-border"></div>
                    <span className="flex-shrink mx-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Or Select Manually</span>
                    <div className="flex-grow border-t border-border"></div>
                  </div>

                  {/* Manual Dropdowns */}
                  <div className="space-y-3">
                    {/* State Dropdown */}
                    <div>
                      <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">State</label>
                      <select
                        value={manualState}
                        onChange={(e) => {
                          setManualState(e.target.value);
                          setManualDistrict('');
                          setManualVillage('');
                          setGpsLocation(''); // clear GPS override
                        }}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-border focus:border-emerald-500 rounded-xl focus:outline-none text-foreground font-semibold"
                      >
                        <option value="">Choose State</option>
                        {STATES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* District Dropdown */}
                    {manualState && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                        <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">District</label>
                        <select
                          value={manualDistrict}
                          onChange={(e) => {
                            setManualDistrict(e.target.value);
                            setManualVillage('');
                          }}
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-border focus:border-emerald-500 rounded-xl focus:outline-none text-foreground font-semibold"
                        >
                          <option value="">Choose District</option>
                          {(DISTRICTS_MAP[manualState] || []).map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </motion.div>
                    )}

                    {/* Village Dropdown */}
                    {manualDistrict && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                        <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">Village</label>
                        <select
                          value={manualVillage}
                          onChange={(e) => setManualVillage(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-border focus:border-emerald-500 rounded-xl focus:outline-none text-foreground font-semibold"
                        >
                          <option value="">Choose Village</option>
                          {(VILLAGES_MAP[manualDistrict] || []).map((v) => (
                            <option key={v} value={v}>{v}</option>
                          ))}
                        </select>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 7: PREVIEW JOB */}
              {step === 7 && (
                <div className="space-y-6">
                  {/* WhatsApp/Invoice Style Preview Card */}
                  <div className="bg-slate-50 dark:bg-slate-800 border border-border p-6 rounded-2xl relative overflow-hidden">
                    {/* Visual Banners */}
                    <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-emerald-400 to-teal-400" />
                    
                    <div className="flex items-start justify-between gap-4 mt-2">
                      <div className="space-y-1">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20 uppercase tracking-widest">
                          Seasonal Booking
                        </span>
                        <h2 className="text-xl font-black text-foreground">
                          {cropObj?.emoji} {cropObj?.name} - {workObj?.name}
                        </h2>
                      </div>
                      
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Daily Wage</span>
                        <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">₹{getFinalWage()}</p>
                      </div>
                    </div>

                    <hr className="my-4 border-border" />

                    <div className="grid grid-cols-2 gap-4 text-sm font-semibold">
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                          <Users size={14} className="text-muted-foreground" /> Required Workers
                        </span>
                        <p className="text-foreground text-base font-black">{workersCount} Workers</p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                          <CalendarIcon size={14} className="text-muted-foreground" /> Work Date
                        </span>
                        <p className="text-foreground text-base font-black">{new Date(workDate).toLocaleDateString()}</p>
                      </div>

                      <div className="col-span-2 space-y-1">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                          <MapPin size={14} className="text-muted-foreground" /> Farm Location
                        </span>
                        <p className="text-foreground text-base font-black">{getFinalLocation()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center p-3 bg-amber-500/5 rounded-2xl border border-amber-500/20 text-xs font-medium text-amber-600 dark:text-amber-400">
                    💡 Workers in this village will see this posting immediately and can apply in one-tap.
                  </div>
                </div>
              )}

              {/* Wizard Control Buttons */}
              <div className="mt-8 flex items-center gap-4">
                {step > 1 && (
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="h-14 px-6 rounded-2xl flex-shrink-0"
                  >
                    Back
                  </Button>
                )}
                
                {step < 7 ? (
                  <Button
                    onClick={handleNext}
                    className="flex-1 h-14 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-2xl shadow-lg shadow-emerald-500/10 font-extrabold text-base flex items-center justify-center gap-2"
                  >
                    Next Step <ArrowRight size={18} />
                  </Button>
                ) : (
                  <Button
                    onClick={handlePostJob}
                    disabled={isSubmitting}
                    className="flex-1 h-14 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-2xl shadow-lg shadow-emerald-500/15 font-extrabold text-lg flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Posting Job...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Post Job <Check size={20} className="stroke-[3]" />
                      </span>
                    )}
                  </Button>
                )}
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
