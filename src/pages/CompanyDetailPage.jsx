import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { MapPin, Star, Globe, ArrowLeft, Mail, Phone, CheckCircle } from 'lucide-react';

export default function CompanyDetailPage() {
  const { id } = useParams<{ id }>();
  const navigate = useNavigate();
  const company = useAppSelector((state) => state.companies.companies.find((c) => c.id === id));

  if (!company) {
    return (
      <div className="min-h-screen bg-muted py-8">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-primary hover:opacity-70 mb-8"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-muted-foreground text-lg">Company not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary hover:opacity-70 mb-8"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-8 pb-8 border-b border-border">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
                  {company.name}
                  {company.verified && <CheckCircle size={32} className="text-green-600" />}
                </h1>
                <p className="text-muted-foreground mt-2">{company.size} company</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star size={24} className="fill-accent text-accent" />
                  <span className="text-2xl font-bold">{company.rating.toFixed(1)}</span>
                </div>
                <span className="text-sm text-muted-foreground">({company.reviews} reviews)</span>
              </div>
            </div>

            <p className="text-muted-foreground mb-6">{company.description}</p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-muted-foreground">
                <MapPin size={18} className="mr-2" />
                <span>{company.location}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Mail size={18} className="mr-2" />
                <span>{company.email}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Phone size={18} className="mr-2" />
                <span>{company.phone}</span>
              </div>
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-primary hover:opacity-70"
                >
                  <Globe size={18} className="mr-2" />
                  <span>Website</span>
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Industry</p>
              <p className="font-semibold text-lg">{company.industry}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Company Size</p>
              <p className="font-semibold text-lg capitalize">{company.size}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <p className="font-semibold text-lg capitalize">{company.status}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Verified</p>
              <p className="font-semibold text-lg">{company.verified ? 'Yes' : 'No'}</p>
            </div>
          </div>

          <div className="pt-8 border-t border-border">
            <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">
              View Open Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
