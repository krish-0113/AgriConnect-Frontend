import { useAuth } from '../hooks/useAuth';
import { useAppSelector } from '../store/hooks';
import { Briefcase, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CompanyDashboard() {
  const { user } = useAuth();
  const jobs = useAppSelector((state) => state.jobs.jobs);
  const applications = useAppSelector((state) => state.applications.applications);

  const stats = {
    openJobs: jobs.filter((j) => j.status === 'open').length,
    totalApplications: applications.length,
    accepted: applications.filter((a) => a.status === 'accepted').length,
    filled: jobs.filter((j) => j.status === 'filled').length,
  };

  return (
    <div className="min-h-screen bg-muted py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Company Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Open Jobs</p>
                <p className="text-3xl font-bold text-foreground">{stats.openJobs}</p>
              </div>
              <Briefcase size={40} className="text-primary opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Applications</p>
                <p className="text-3xl font-bold text-foreground">{stats.totalApplications}</p>
              </div>
              <Users size={40} className="text-secondary opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Hired</p>
                <p className="text-3xl font-bold text-foreground">{stats.accepted}</p>
              </div>
              <CheckCircle size={40} className="text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Positions Filled</p>
                <p className="text-3xl font-bold text-foreground">{stats.filled}</p>
              </div>
              <TrendingUp size={40} className="text-accent opacity-20" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/jobs"
              className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Post New Job
            </Link>
            <Link
              to="/workers"
              className="border border-primary text-primary px-6 py-2 rounded-lg font-semibold hover:bg-primary hover:text-white transition"
            >
              Browse Workers
            </Link>
          </div>
        </div>

        {/* Recent Jobs */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">Your Job Listings</h2>

          {jobs.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">No jobs posted yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-2 text-foreground font-semibold">Job Title</th>
                    <th className="text-left px-4 py-2 text-foreground font-semibold">Location</th>
                    <th className="text-left px-4 py-2 text-foreground font-semibold">Applicants</th>
                    <th className="text-left px-4 py-2 text-foreground font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.slice(0, 5).map((job) => (
                    <tr key={job.id} className="border-b border-border hover:bg-muted transition">
                      <td className="px-4 py-3 font-semibold text-foreground">{job.title}</td>
                      <td className="px-4 py-3 text-muted-foreground">{job.location}</td>
                      <td className="px-4 py-3 text-muted-foreground">{job.applicants}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          job.status === 'open'
                            ? 'bg-green-100 text-green-800'
                            : job.status === 'closed'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
