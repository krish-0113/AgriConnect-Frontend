import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star } from 'lucide-react';
import { useWorkers } from '../hooks/useWorkers';

export default function WorkerListingPage() {
  const navigate = useNavigate();
  const { filteredWorkers, isLoading, loadWorkers, updateWorkerFilters } = useWorkers();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    loadWorkers();
  }, [loadWorkers]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateWorkerFilters({
      search: searchTerm,
      location: selectedLocation || undefined,
    });
  };

  const locations = ['Iowa', 'Nebraska', 'Illinois', 'Minnesota', 'Wisconsin', 'Indiana'];

  return (
    <div className="min-h-screen bg-muted py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Agricultural Workers</h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Search</label>
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-2.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Worker name, skills..."
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

        {/* Worker Listings */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Loading workers...</p>
          </div>
        ) : filteredWorkers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No workers found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkers.map((worker) => (
              <div
                key={worker.id}
                onClick={() => navigate(`/workers/${worker.id}`)}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{worker.name}</h3>
                    <p className="text-muted-foreground text-sm">{worker.experience} years experience</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="fill-accent text-accent" />
                    <span className="font-semibold">{worker.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin size={16} className="mr-2" />
                  <span className="text-sm">{worker.location}</span>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-3">{worker.bio}</p>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {worker.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-muted text-foreground text-xs rounded">
                        {skill}
                      </span>
                    ))}
                    {worker.skills.length > 3 && (
                      <span className="px-2 py-1 bg-muted text-foreground text-xs rounded">
                        +{worker.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">{worker.reviews} reviews</span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    worker.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : worker.status === 'inactive'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {worker.status.charAt(0).toUpperCase() + worker.status.slice(1)}
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
