import { useAuth } from '../hooks/useAuth';
import { useAppSelector } from '../store/hooks';
import { Briefcase, FileText, Clock, CheckCircle } from 'lucide-react';

export default function WorkerDashboard() {
  const { user } = useAuth();
  const applications = useAppSelector((state) => state.applications.applications);

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === 'pending').length,
    accepted: applications.filter((a) => a.status === 'accepted').length,
    offered: applications.filter((a) => a.status === 'offered').length,
  };

  return (
    <div className="min-h-screen bg-muted py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Welcome, {user?.name}!</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Applications</p>
                <p className="text-3xl font-bold text-foreground">{stats.total}</p>
              </div>
              <Briefcase size={40} className="text-primary opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Pending</p>
                <p className="text-3xl font-bold text-foreground">{stats.pending}</p>
              </div>
              <Clock size={40} className="text-yellow-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Accepted</p>
                <p className="text-3xl font-bold text-foreground">{stats.accepted}</p>
              </div>
              <CheckCircle size={40} className="text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Offers</p>
                <p className="text-3xl font-bold text-foreground">{stats.offered}</p>
              </div>
              <FileText size={40} className="text-blue-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">Recent Applications</h2>

          {applications.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">No applications yet. Start exploring job listings!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-2 text-foreground font-semibold">Job ID</th>
                    <th className="text-left px-4 py-2 text-foreground font-semibold">Company</th>
                    <th className="text-left px-4 py-2 text-foreground font-semibold">Status</th>
                    <th className="text-left px-4 py-2 text-foreground font-semibold">Applied Date</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="border-b border-border hover:bg-muted transition">
                      <td className="px-4 py-3 text-muted-foreground">{app.jobId}</td>
                      <td className="px-4 py-3 text-muted-foreground">{app.companyId}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          app.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : app.status === 'accepted'
                            ? 'bg-green-100 text-green-800'
                            : app.status === 'offered'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{new Date(app.appliedDate).toLocaleDateString()}</td>
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
