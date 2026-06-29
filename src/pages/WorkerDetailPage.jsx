import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { MapPin, Star, Award, Briefcase, ArrowLeft, Mail, Phone } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function WorkerDetailPage() {
  const { id } = useParams<{ id }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const worker = useAppSelector((state) => state.workers.workers.find((w) => w.id === id));

  if (!worker) {
    return (
      <div className="min-h-screen bg-muted py-8">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => navigate('/workers')}
            className="flex items-center gap-2 text-primary hover:opacity-70 mb-8"
          >
            <ArrowLeft size={20} />
            Back to Workers
          </button>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-muted-foreground text-lg">Worker not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate('/workers')}
          className="flex items-center gap-2 text-primary hover:opacity-70 mb-8"
        >
          <ArrowLeft size={20} />
          Back to Workers
        </button>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-8 pb-8 border-b border-border">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground">{worker.name}</h1>
                <p className="text-muted-foreground">{worker.experience} years of experience</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star size={24} className="fill-accent text-accent" />
                  <span className="text-2xl font-bold">{worker.rating.toFixed(1)}</span>
                </div>
                <span className="text-sm text-muted-foreground">({worker.reviews} reviews)</span>
              </div>
            </div>

            <p className="text-muted-foreground mb-6">{worker.bio}</p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-muted-foreground">
                <MapPin size={18} className="mr-2" />
                <span>{worker.location}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Mail size={18} className="mr-2" />
                <span>{worker.email}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Phone size={18} className="mr-2" />
                <span>{worker.phone}</span>
              </div>
            </div>

            <span className={`inline-block text-sm font-semibold px-4 py-2 rounded-full ${
              worker.status === 'active'
                ? 'bg-green-100 text-green-800'
                === 'inactive'
                ? 'bg-gray-100 text-gray-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {worker.status.charAt(0).toUpperCase() + worker.status.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Briefcase size={24} />
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {worker.skills.map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Star size={24} />
                Specializations
              </h2>
              <div className="flex flex-wrap gap-2">
                {worker.specializations.map((spec) => (
                  <span key={spec} className="px-4 py-2 bg-secondary text-white rounded-full text-sm font-semibold">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {worker.certifications.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Award size={24} />
                Certifications
              </h2>
              <div className="flex flex-wrap gap-2">
                {worker.certifications.map((cert) => (
                  <span key={cert} className="px-4 py-2 bg-accent text-white rounded-full text-sm font-semibold">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-8 border-t border-border">
            {isAuthenticated && user?.role === 'company' ? (
              <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">
                Contact Worker
              </button>
            ) : !isAuthenticated ? (
              <button
                onClick={() => navigate('/register?role=company')}
                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Sign Up to Contact
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
