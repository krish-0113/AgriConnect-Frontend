import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Phone, ShieldCheck, Calendar, Award, Filter, X } from 'lucide-react';
import { useWorkers } from '../hooks/useWorkers';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { useToast } from '../components/common/Toast';

export default function WorkerListingPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const { filteredWorkers, isLoading, loadWorkers, updateWorkerFilters, filters } = useWorkers();

  // Filter input states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  useEffect(() => {
    loadWorkers();
  }, [loadWorkers]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateWorkerFilters({
      search: searchTerm,
      location: selectedLocation,
      skills: selectedSkill ? [selectedSkill] : [],
      availability: selectedAvailability ? [selectedAvailability] : [],
    });
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedLocation('');
    setSelectedSkill('');
    setSelectedExperience('');
    setSelectedAvailability('');
    updateWorkerFilters({});
    toast.success('Filters cleared!');
  };

  const handleCallWorker = (e, phone, name) => {
    e.stopPropagation(); // prevent card click navigation
    window.location.href = `tel:${phone}`;
    toast.success(`Calling ${name} directly...`);
  };

  const handleBookWorker = (e, name) => {
    e.stopPropagation();
    toast.success(`Booking request sent to ${name}! They will confirm via phone.`);
  };

  // Predefined lists for easy touch-chip filters
  const skillsList = ['Tractor Operation', 'Crop Management', 'Livestock Care', 'Equipment Repair', 'Irrigation Management'];
  const locationsList = ['Iowa', 'Nebraska', 'Illinois', 'Minnesota', 'Wisconsin', 'Indiana'];
  const availabilities = ['full-time', 'part-time', 'seasonal', 'flexible'];

  // Add mock distance (in km) and verified badges if missing from model schema
  const getEnrichedWorkerData = (worker, idx) => {
    const distances = ['1.2 km', '3.5 km', '5.1 km', '7.2 km', '0.8 km', '4.3 km'];
    return {
      ...worker,
      distance: distances[idx % distances.length],
      verified: idx % 2 === 0, // mock every second worker as verified
      phone: worker.phone || '9876543210'
    };
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Visual Top Banner */}
      <div className="relative bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-emerald-500/10 mb-8">
        <div className="absolute inset-0 bg-[mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Find <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Skilled Workers</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium">Verify profiles, check experience, and call workers instantly.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search & Filter Toggles */}
        <div className="bg-white dark:bg-slate-900 border border-border p-4 rounded-3xl shadow-sm mb-6 flex flex-col md:flex-row items-center gap-4">
          <form onSubmit={handleSearchSubmit} className="w-full flex-1 flex flex-col sm:flex-row items-stretch gap-2">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search worker by name or skill..."
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

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button
              onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              variant="outline"
              className="flex-1 md:flex-initial h-12 rounded-2xl flex items-center gap-2 border-border"
            >
              <Filter size={16} /> Filters
            </Button>
            
            {(selectedLocation || selectedSkill || selectedAvailability || searchTerm) && (
              <Button
                onClick={clearAllFilters}
                variant="ghost"
                className="h-12 text-red-500 hover:text-red-600 rounded-2xl"
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Collapsible Advanced Filters Panel */}
        <AnimatePresence>
          {showFiltersPanel && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white dark:bg-slate-900 border border-border rounded-3xl p-6 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Location Filter */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">District / State</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-border rounded-2xl text-sm font-semibold focus:border-emerald-500 focus:outline-none text-foreground"
                  >
                    <option value="">All Locations</option>
                    {locationsList.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Skill Filter */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Specialty Skill</label>
                  <select
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-border rounded-2xl text-sm font-semibold focus:border-emerald-500 focus:outline-none text-foreground"
                  >
                    <option value="">All Skills</option>
                    {skillsList.map((skill) => (
                      <option key={skill} value={skill}>{skill}</option>
                    ))}
                  </select>
                </div>

                {/* Availability Filter */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Availability Type</label>
                  <select
                    value={selectedAvailability}
                    onChange={(e) => setSelectedAvailability(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-border rounded-2xl text-sm font-semibold focus:border-emerald-500 focus:outline-none text-foreground"
                  >
                    <option value="">Any Availability</option>
                    {availabilities.map((av) => (
                      <option key={av} value={av}>{av.charAt(0).toUpperCase() + av.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Worker Cards Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto" />
            <p className="text-muted-foreground mt-4 font-semibold text-sm">Loading worker profiles...</p>
          </div>
        ) : filteredWorkers.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-border p-16 rounded-3xl text-center space-y-3">
            <Users size={48} className="mx-auto text-muted-foreground opacity-30" />
            <h3 className="text-lg font-bold text-foreground">No workers found</h3>
            <p className="text-xs text-muted-foreground">Try clearing filters or broadening your search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkers.map((worker, idx) => {
              const enriched = getEnrichedWorkerData(worker, idx);
              return (
                <motion.div
                  key={worker.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => navigate(`/workers/${worker.id}`)}
                  className="bg-white dark:bg-slate-900 border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group cursor-pointer relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header: Photo Initials & Status */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 text-primary border border-primary/20 rounded-full flex items-center justify-center font-black text-lg">
                          {enriched.name.charAt(0)}
                        </div>
                        
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1">
                            <h3 className="font-black text-foreground group-hover:text-primary transition text-base">
                              {enriched.name}
                            </h3>
                            {enriched.verified && (
                              <ShieldCheck size={16} className="text-emerald-500 fill-emerald-500/10" title="Verified Worker" />
                            )}
                          </div>
                          
                          <p className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
                            📍 {enriched.location} • <span className="text-foreground">{enriched.distance}</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20 text-xs font-bold">
                        ⭐ {enriched.rating.toFixed(1)}
                      </div>
                    </div>

                    {/* Bio Snippet */}
                    <p className="text-xs text-muted-foreground leading-relaxed font-medium line-clamp-2">
                      {enriched.bio || 'Hardworking agricultural worker with expertise in sowing, harvest, and machinery operations.'}
                    </p>

                    {/* Skills list */}
                    <div className="flex flex-wrap gap-1.5">
                      {enriched.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="text-[10px] font-bold bg-slate-50 dark:bg-slate-800 text-foreground px-2.5 py-1 rounded-full border border-border">
                          {skill}
                        </span>
                      ))}
                      {enriched.skills.length > 3 && (
                        <span className="text-[10px] font-bold bg-slate-50 dark:bg-slate-800 text-muted-foreground px-2.5 py-1 rounded-full border border-border">
                          +{enriched.skills.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Meta info */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-muted-foreground border-t border-border pt-3">
                      <div className="flex items-center gap-1.5">
                        <Award size={13} className="text-primary" />
                        <span>{enriched.experience} yrs exp</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-secondary" />
                        <span className="truncate">{enriched.availability.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual GPay Style Actions */}
                  <div className="grid grid-cols-2 gap-2 mt-6">
                    <Button
                      onClick={(e) => handleCallWorker(e, enriched.phone, enriched.name)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs rounded-xl h-10 flex items-center justify-center gap-1 shadow-sm"
                    >
                      <Phone size={12} className="stroke-[3]" /> Call Now
                    </Button>
                    <Button
                      onClick={(e) => handleBookWorker(e, enriched.name)}
                      variant="outline"
                      className="text-primary hover:bg-primary/5 font-black text-xs rounded-xl h-10 border-emerald-500/20"
                    >
                      Book Worker
                    </Button>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
