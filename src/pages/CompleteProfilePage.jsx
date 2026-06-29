import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useToast } from '../components/common/Toast.jsx';
import Input from '../components/common/Input.jsx';
import { UserCheck, Landmark, Briefcase, MapPin, Award, DollarSign, Navigation, Sparkles, Tractor, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PRESET_CATEGORIES = [
  { id: 'tractor', label: 'Tractor Driver', labelHi: 'ट्रैक्टर चालक', emoji: '🚜' },
  { id: 'labor', label: 'Field Laborer', labelHi: 'खेत मजदूर', emoji: '🌾' },
  { id: 'harvest', label: 'Harvester Operator', labelHi: 'हार्वेस्टर चालक', emoji: '🌾' },
  { id: 'livestock', label: 'Livestock Carer', labelHi: 'पशुपालक', emoji: '🐮' },
  { id: 'irrigation', label: 'Irrigation Expert', labelHi: 'सिंचाई विशेषज्ञ', emoji: '💧' },
];

const PRESET_SKILLS = [
  'Wheat Harvesting',
  'Organic Composting',
  'Tractor Operation',
  'Irrigation Setup',
  'Animal Care',
  'Fruit Picking',
  'Pesticide Spraying',
  'Soil Preparation',
];

const FARM_CATEGORIES = [
  { id: 'crop', label: 'Grain & Crop', labelHi: 'अनाज और फसल', emoji: '🌾', val: 'Crop Cultivation' },
  { id: 'dairy', label: 'Dairy & Cattle', labelHi: 'डेयरी और पशुपालन', emoji: '🐮', val: 'Dairy Farming' },
  { id: 'horti', label: 'Horticulture', labelHi: 'बागवानी', emoji: '🍅', val: 'Horticulture' },
  { id: 'agritech', label: 'Agri-Tech & retail', labelHi: 'कृषि-तकनीक', emoji: '🚜', val: 'Agri-Tech' },
  { id: 'poultry', label: 'Poultry Farm', labelHi: 'मुर्गी पालन', emoji: '🐔', val: 'Poultry' }
];

export default function CompleteProfilePage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user, completeProfile, isLoading } = useAuth();
  const toast = useToast();

  const role = state?.role || user?.role || 'worker';

  // State for Worker profile
  const [workerData, setWorkerData] = useState({
    title: '',
    experienceYears: '',
    hourlyRate: '',
    location: '',
    skills: [],
    bio: '',
  });

  // State for Company profile
  const [companyData, setCompanyData] = useState({
    companyName: '',
    category: 'Crop Cultivation',
    location: '',
    website: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [isDetecting, setIsDetecting] = useState(false);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const mockLocations = [
          'Sangrur, Punjab',
          'Nashik, Maharashtra',
          'Anand, Gujarat',
          'Hapur, Uttar Pradesh',
          'Mandya, Karnataka',
        ];
        const randomLoc = mockLocations[Math.floor(Math.random() * mockLocations.length)];
        
        if (role === 'worker') {
          setWorkerData((prev) => ({ ...prev, location: randomLoc }));
        } else {
          setCompanyData((prev) => ({ ...prev, location: randomLoc }));
        }
        
        toast.success(`Location detected: ${randomLoc}`);
        setIsDetecting(false);
      },
      (error) => {
        toast.error('Could not detect location. Please type manually.');
        setIsDetecting(false);
      }
    );
  };

  const toggleSkill = (skill) => {
    setWorkerData((prev) => {
      const alreadyHas = prev.skills.includes(skill);
      if (alreadyHas) {
        return { ...prev, skills: prev.skills.filter((s) => s !== skill) };
      } else {
        return { ...prev, skills: [...prev.skills, skill] };
      }
    });
  };

  const handleWorkerSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = {};

    if (!workerData.title) newErrors.title = 'Please select or enter a job category';
    if (!workerData.experienceYears || isNaN(Number(workerData.experienceYears))) {
      newErrors.experienceYears = 'Please enter a valid number of years';
    }
    if (!workerData.hourlyRate || isNaN(Number(workerData.hourlyRate))) {
      newErrors.hourlyRate = 'Please enter a valid rate';
    }
    if (!workerData.location) newErrors.location = 'Location details are required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await completeProfile('worker', {
        title: workerData.title,
        experienceYears: Number(workerData.experienceYears),
        hourlyRate: Number(workerData.hourlyRate),
        location: workerData.location,
        bio: workerData.bio,
        skills: workerData.skills,
      });
      toast.success('Your profile is complete! Welcome to AgriConnect.');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Profile save failed.');
    }
  };

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = {};

    if (!companyData.companyName) newErrors.companyName = 'Farm or Company name is required';
    if (!companyData.location) newErrors.location = 'Farm location is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await completeProfile('company', {
        companyName: companyData.companyName,
        category: companyData.category || 'Crop Cultivation',
        location: companyData.location,
        website: companyData.website,
        description: companyData.description,
      });
      toast.success('Your Farm profile is complete! Start listing jobs.');
      navigate('/company-dashboard');
    } catch (err) {
      toast.error(err.message || 'Profile save failed.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-border p-6 sm:p-10 rounded-3xl shadow-xl relative z-10 text-left space-y-8">
        
        {/* Banner */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center rounded-2xl shadow-sm">
            <UserCheck size={28} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight leading-none">Complete Your Profile</h1>
          <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
            Fill in key details to unlock verified daily work options
          </p>
        </div>

        {role === 'worker' ? (
          <form onSubmit={handleWorkerSubmit} className="space-y-6">
            <h2 className="text-sm font-black uppercase tracking-wider border-b border-border pb-2 text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <Briefcase size={16} /> Worker Details / मजदूर विवरण
            </h2>

            {/* Selectable Work Category Cards */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Primary Work Category
              </label>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PRESET_CATEGORIES.map((cat) => {
                  const isSelected = workerData.title === cat.label;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setWorkerData((prev) => ({ ...prev, title: cat.label }))}
                      className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border-2 transition-all active:scale-95 text-center ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-500/5 text-primary font-black scale-[1.02] shadow-sm'
                          : 'border-border bg-card text-muted-foreground hover:border-border/80'
                      }`}
                    >
                      <span className="text-2xl mb-1">{cat.emoji}</span>
                      <span className="text-xs font-extrabold block">{cat.label}</span>
                      <span className="text-[9px] font-semibold text-muted-foreground block">{cat.labelHi}</span>
                    </button>
                  );
                })}
              </div>
              
              {/* Optional Custom Input for Category */}
              <Input
                placeholder="Or type a custom title..."
                value={workerData.title}
                onChange={(e) => setWorkerData({ ...workerData, title: e.target.value })}
                error={errors.title}
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Experience (Years)"
                type="number"
                placeholder="e.g. 5"
                value={workerData.experienceYears}
                onChange={(e) => setWorkerData({ ...workerData, experienceYears: e.target.value })}
                error={errors.experienceYears}
                disabled={isLoading}
                icon={<Award size={18} />}
                required
              />

              <Input
                label="Daily Wage Expectation (₹)"
                type="number"
                placeholder="e.g. 600"
                value={workerData.hourlyRate}
                onChange={(e) => setWorkerData({ ...workerData, hourlyRate: e.target.value })}
                error={errors.hourlyRate}
                disabled={isLoading}
                icon={<DollarSign size={18} />}
                required
              />
            </div>

            {/* Current Location with Auto-detect */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Current Location / स्थान <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={detectLocation}
                  disabled={isDetecting}
                  className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline disabled:opacity-50"
                >
                  <Navigation size={12} className={isDetecting ? 'animate-bounce' : ''} />
                  {isDetecting ? 'Detecting...' : 'Detect Location'}
                </button>
              </div>
              
              <Input
                placeholder="e.g. Sangrur, Punjab"
                value={workerData.location}
                onChange={(e) => setWorkerData({ ...workerData, location: e.target.value })}
                error={errors.location}
                disabled={isLoading}
                icon={<MapPin size={18} />}
              />
            </div>

            {/* Clickable Skill Tag Chips */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles size={14} className="text-emerald-500" /> Key Skills (Tap to add)
              </label>
              
              <div className="flex flex-wrap gap-1.5">
                {PRESET_SKILLS.map((skill) => {
                  const isSelected = workerData.skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold border transition-all active:scale-95 ${
                        isSelected
                          ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
                          : 'bg-card border-border text-muted-foreground hover:bg-slate-50'
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="w-full text-left space-y-1">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Bio / About Yourself (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Share a brief overview of your farming background..."
                value={workerData.bio}
                onChange={(e) => setWorkerData({ ...workerData, bio: e.target.value })}
                disabled={isLoading}
                className="block w-full px-4 py-3 bg-transparent text-foreground rounded-2xl border-2 border-border focus:border-emerald-500 placeholder-muted-foreground focus:outline-none transition-all text-xs font-semibold h-20 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-black rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md text-sm"
            >
              {isLoading ? 'Saving Profile...' : 'Save Profile & Dashboard 🚀'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleCompanySubmit} className="space-y-6">
            <h2 className="text-sm font-black uppercase tracking-wider border-b border-border pb-2 text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <Landmark size={16} /> Farm Details / फार्म विवरण
            </h2>

            <Input
              label="Farm / Company Name"
              placeholder="e.g. Baldev Singh Agricultural Farm"
              value={companyData.companyName}
              onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
              error={errors.companyName}
              disabled={isLoading}
              required
            />

            {/* Farm Type selection cards (Zero dropdown typing) */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Farm Type / फार्म प्रकार
              </label>
              
              <div className="grid grid-cols-2 gap-2">
                {FARM_CATEGORIES.map((cat) => {
                  const isSelected = companyData.category === cat.val;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCompanyData((prev) => ({ ...prev, category: cat.val }))}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all active:scale-95 text-left ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-500/5 text-primary font-black scale-[1.01]'
                          : 'border-border bg-card text-muted-foreground hover:border-border/80'
                      }`}
                    >
                      <span className="text-2xl">{cat.emoji}</span>
                      <div className="leading-tight">
                        <span className="text-xs font-extrabold block">{cat.label}</span>
                        <span className="text-[9px] font-semibold text-muted-foreground block">{cat.labelHi}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Farm Location with Auto-detect */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Farm Location / पता <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={detectLocation}
                  disabled={isDetecting}
                  className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline disabled:opacity-50"
                >
                  <Navigation size={12} className={isDetecting ? 'animate-bounce' : ''} />
                  {isDetecting ? 'Detecting...' : 'Detect Location'}
                </button>
              </div>
              
              <Input
                placeholder="e.g. Nashik, Maharashtra"
                value={companyData.location}
                onChange={(e) => setCompanyData({ ...companyData, location: e.target.value })}
                error={errors.location}
                disabled={isLoading}
                icon={<MapPin size={18} />}
              />
            </div>

            <Input
              label="Contact / Phone Link (Optional)"
              placeholder="e.g. +91 9999999999"
              value={companyData.website}
              onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
              disabled={isLoading}
            />

            <div className="w-full text-left space-y-1">
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Farm Description / फार्म विवरण (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Describe your cultivation crops (e.g. Sowing Wheat, Potato cultivation)..."
                value={companyData.description}
                onChange={(e) => setCompanyData({ ...companyData, description: e.target.value })}
                disabled={isLoading}
                className="block w-full px-4 py-3 bg-transparent text-foreground rounded-2xl border-2 border-border focus:border-emerald-500 placeholder-muted-foreground focus:outline-none transition-all text-xs font-semibold h-20 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-black rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md text-sm"
            >
              {isLoading ? 'Saving Profile...' : 'Save Profile & Dashboard 🚀'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
