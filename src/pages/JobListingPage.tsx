import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, DollarSign, Briefcase } from 'lucide-react';
import { useJobs } from '../hooks/useJobs';

export default function JobListingPage() {
  const navigate = useNavigate();
  const { filteredJobs, isLoading, loadJobs, updateJobFilters, filters } = useJobs();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateJobFilters({
      search: searchTerm,
      location: selectedLocation || undefined,
      jobType: selectedJobType ? [selectedJobType] : undefined,
    });
  };

  const locations = ['Iowa', 'Nebraska', 'Illinois', 'Minnesota', 'Wisconsin', 'Indiana'];
  const jobTypes = ['full-time', 'part-time', 'seasonal', 'contract'];

  return (
    <div className="min-h-screen bg-muted py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Agricultural Jobs</h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Search</label>
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-2.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Job title, keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Locations</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Job Type</label>
                <select
                  value={selectedJobType}
                  onChange={(e) => setSelectedJobType(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Types</option>
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Job Listings */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No jobs found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => navigate(`/jobs/${job.id}`)}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-foreground mb-1">{job.title}</h3>
                  <p className="text-primary font-semibold">{job.company.name}</p>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <DollarSign size={16} className="mr-2" />
                    <span className="text-sm">
                      ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Briefcase size={16} className="mr-2" />
                    <span className="text-sm">{job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {job.requiredSkills.slice(0, 2).map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-muted text-foreground text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                    {job.requiredSkills.length > 2 && (
                      <span className="px-3 py-1 bg-muted text-foreground text-xs rounded-full">
                        +{job.requiredSkills.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">{job.applicants} applicants</span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    job.status === 'open'
                      ? 'bg-green-100 text-green-800'
                      : job.status === 'closed'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
