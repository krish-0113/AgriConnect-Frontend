import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, DollarSign, Briefcase, Filter, X, Zap } from 'lucide-react';
import { useJobs } from '../hooks/useJobs';
import { motion } from 'framer-motion';

export default function JobListingPage() {
  const navigate = useNavigate();
  const { filteredJobs, isLoading, loadJobs, updateJobFilters, filters } = useJobs();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const handleSearch = (e.FormEvent) => {
    e.preventDefault();
    updateJobFilters({
      search,
      location,
      jobType,
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLocation('');
    setSelectedJobType('');
    updateJobFilters({});
  };

  const locations = ['Iowa', 'Nebraska', 'Illinois', 'Minnesota', 'Wisconsin', 'Indiana'];
  const jobTypes = ['full-time', 'part-time', 'seasonal', 'contract'];
  const activeFiltersCount = [searchTerm, selectedLocation, selectedJobType].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/90 to-primary text-white px-4 sm:px-6 lg:px-8 py-12 mb-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity, y={{ opacity, y={{ duration: 0.5 }}>
            <h1 className="text-3xl sm:text-4xl font-bold text-balance mb-2">Agricultural Jobs</h1>
            <p className="text-white/70">Find your next opportunity in farming and agriculture</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex gap-6 flex-col lg:flex-row">

          {/* Sidebar Filters */}
          <motion.div
            initial={{ opacity, x: -20 }}
            animate={{ opacity, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`${
              showMobileFilters ? 'block' : 'hidden'
            } lg:block lg:w-64 flex-shrink-0`}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-border dark:border-slate-700 p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Filter size={20} />
                  Filters
                </h2>
                {activeFiltersCount > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={clearFilters}
                    className="text-xs text-primary hover:text-primary/80 font-medium"
                  >
                    Clear
                  </motion.button>
                )}
              </div>

              <form onSubmit={handleSearch} className="space-y-5">
                {/* Search Input */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Search</label>
                  <div className="relative">
                    <Search size={18} className="absolute left-3 top-2.5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Job title..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-border dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    />
                  </div>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-border dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  >
                    <option value="">All Locations</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Job Type Filter */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Job Type</label>
                  <select
                    value={selectedJobType}
                    onChange={(e) => setSelectedJobType(e.target.value)}
                    className="w-full px-3 py-2 border border-border dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  >
                    <option value="">All Types</option>
                    {jobTypes.map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-2.5 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                  <Search size={18} />
                  Search Jobs
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{filteredJobs.length} jobs found</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium"
              >
                <Filter size={18} />
                {showMobileFilters ? 'Hide' : 'Show'} Filters
              </motion.button>
            </div>

            {/* Job Listings */}
            {isLoading ? (
              <div className="text-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration, repeat }}
                  className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"
                />
                <p className="text-muted-foreground text-sm mt-4">Loading jobs...</p>
              </div>
            ) === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-border dark:border-slate-700 p-12">
                <Briefcase size={48} className="mx-auto text-muted-foreground mb-3 opacity-50" />
                <p className="text-muted-foreground text-lg font-medium">No jobs found</p>
                <p className="text-muted-foreground text-sm mt-2">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={{ hidden, visible, transition: { staggerChildren: 0.1 } } }}
                initial="hidden"
                animate="visible"
              >
                {filteredJobs.map((job, idx) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity, y: 20 }}
                    animate={{ opacity, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    className="bg-white dark:bg-slate-800 rounded-xl border border-border dark:border-slate-700 p-6 hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer group"
                  >
                    {/* Header */}
                    <div className="mb-4 pb-4 border-b border-border dark:border-slate-700">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition line-clamp-2">{job.title}</h3>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
                          job.status === 'open'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            === 'closed'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                        }`}>
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-primary font-semibold">{job.company.name}</p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-primary flex-shrink-0" />
                        <span className="text-sm text-foreground">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-green-600 flex-shrink-0" />
                        <span className="text-sm font-semibold text-foreground">${job.salary.min / 1000}k-${job.salary.max / 1000}k</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} className="text-blue-600 flex-shrink-0" />
                        <span className="text-sm text-foreground">{job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap size={16} className="text-orange-600 flex-shrink-0" />
                        <span className="text-sm text-foreground">{job.applicants} applies</span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {job.requiredSkills.slice(0, 3).map((skill) => (
                          <span key={skill} className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                            {skill}
                          </span>
                        ))}
                        {job.requiredSkills.length > 3 && (
                          <span className="px-2.5 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                            +{job.requiredSkills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CTA */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-lg font-semibold transition"
                    >
                      View Details
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
