import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { MapPin, DollarSign, Clock, Briefcase, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function JobDetailPage() {
  const { id } = useParams<{ id }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const job = useAppSelector((state) => state.jobs.jobs.find((j) => j.id === id));

  if (!job) {
    return (
      <div className="min-h-screen bg-muted py-8">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => navigate('/jobs')}
            className="flex items-center gap-2 text-primary hover:opacity-70 mb-8"
          >
            <ArrowLeft size={20} />
            Back to Jobs
          </button>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-muted-foreground text-lg">Job not found</p>
            <button
              onClick={() => navigate('/jobs')}
              className="mt-4 text-primary font-semibold hover:opacity-70"
            >
              Return to job listings
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate('/jobs')}
          className="flex items-center gap-2 text-primary hover:opacity-70 mb-8"
        >
          <ArrowLeft size={20} />
          Back to Jobs
        </button>

        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-foreground mb-2">{job.title}</h1>
            <p className="text-xl text-primary font-semibold">{job.company.name}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 pb-8 border-b border-border">
            <div>
              <div className="flex items-center text-muted-foreground mb-2">
                <DollarSign size={18} className="mr-2" />
                <span className="text-sm font-semibold">Salary</span>
              </div>
              <p className="font-bold text-lg">
                ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
              </p>
            </div>

            <div>
              <div className="flex items-center text-muted-foreground mb-2">
                <MapPin size={18} className="mr-2" />
                <span className="text-sm font-semibold">Location</span>
              </div>
              <p className="font-bold text-lg">{job.location}</p>
            </div>

            <div>
              <div className="flex items-center text-muted-foreground mb-2">
                <Briefcase size={18} className="mr-2" />
                <span className="text-sm font-semibold">Type</span>
              </div>
              <p className="font-bold text-lg">{job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}</p>
            </div>

            <div>
              <div className="flex items-center text-muted-foreground mb-2">
                <Clock size={18} className="mr-2" />
                <span className="text-sm font-semibold">Experience</span>
              </div>
              <p className="font-bold text-lg">{job.experience}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">About This Role</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{job.description}</p>

            <h3 className="text-xl font-bold text-foreground mb-4">Required Skills</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {job.requiredSkills.map((skill) => (
                <span key={skill} className="px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-border">
            <div className="text-muted-foreground">
              <p className="text-sm">Posted).toLocaleDateString()}</p>
              <p className="text-sm">Deadline).toLocaleDateString()}</p>
            </div>

            {isAuthenticated && user?.role === 'worker' ? (
              <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">
                Apply Now
              </button>
            ) : !isAuthenticated ? (
              <button
                onClick={() => navigate('/register?role=worker')}
                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Sign Up to Apply
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
