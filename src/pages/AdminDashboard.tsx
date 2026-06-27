import { useAppSelector } from '../store/hooks';
import { BarChart, Users, Briefcase, Building2 } from 'lucide-react';

export default function AdminDashboard() {
  const jobs = useAppSelector((state) => state.jobs.jobs);
  const workers = useAppSelector((state) => state.workers.workers);
  const companies = useAppSelector((state) => state.companies.companies);
  const applications = useAppSelector((state) => state.applications.applications);

  const stats = {
    totalJobs: jobs.length,
    activeJobs: jobs.filter((j) => j.status === 'open').length,
    totalWorkers: workers.length,
    activeWorkers: workers.filter((w) => w.status === 'active').length,
    totalCompanies: companies.length,
    verifiedCompanies: companies.filter((c) => c.verified).length,
    totalApplications: applications.length,
    pendingApplications: applications.filter((a) => a.status === 'pending').length,
  };

  return (
    <div className="min-h-screen bg-muted py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Jobs</p>
                <p className="text-3xl font-bold text-foreground">{stats.totalJobs}</p>
                <p className="text-xs text-green-600">{stats.activeJobs} active</p>
              </div>
              <Briefcase size={40} className="text-primary opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Workers</p>
                <p className="text-3xl font-bold text-foreground">{stats.totalWorkers}</p>
                <p className="text-xs text-green-600">{stats.activeWorkers} active</p>
              </div>
              <Users size={40} className="text-secondary opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Companies</p>
                <p className="text-3xl font-bold text-foreground">{stats.totalCompanies}</p>
                <p className="text-xs text-green-600">{stats.verifiedCompanies} verified</p>
              </div>
              <Building2 size={40} className="text-accent opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Applications</p>
                <p className="text-3xl font-bold text-foreground">{stats.totalApplications}</p>
                <p className="text-xs text-yellow-600">{stats.pendingApplications} pending</p>
              </div>
              <BarChart size={40} className="text-yellow-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Worker Health</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Active Workers</p>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full"
                    style={{
                      width: `${(stats.activeWorkers / Math.max(stats.totalWorkers, 1)) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{stats.activeWorkers} of {stats.totalWorkers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Job Health</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Open Positions</p>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{
                      width: `${(stats.activeJobs / Math.max(stats.totalJobs, 1)) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{stats.activeJobs} of {stats.totalJobs}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Recent Jobs</h2>
            {jobs.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No jobs yet</p>
            ) : (
              <div className="space-y-3">
                {jobs.slice(0, 5).map((job) => (
                  <div key={job.id} className="p-3 border border-border rounded-lg">
                    <p className="font-semibold text-foreground">{job.title}</p>
                    <p className="text-sm text-muted-foreground">{job.company.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Pending Applications</h2>
            {applications.filter((a) => a.status === 'pending').length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No pending applications</p>
            ) : (
              <div className="space-y-3">
                {applications
                  .filter((a) => a.status === 'pending')
                  .slice(0, 5)
                  .map((app) => (
                    <div key={app.id} className="p-3 border border-border rounded-lg">
                      <p className="font-semibold text-foreground">Application {app.id}</p>
                      <p className="text-sm text-muted-foreground">Job: {app.jobId}</p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
