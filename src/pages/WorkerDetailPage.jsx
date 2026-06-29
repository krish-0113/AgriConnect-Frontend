import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { MapPin, Star, Award, Briefcase, ArrowLeft, Mail, Phone, ShieldCheck, Calendar, BookOpen } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import { useToast } from '../components/common/Toast';

export default function WorkerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { user, isAuthenticated } = useAuth();
  const worker = useAppSelector((state) => state.workers.workers.find((w) => w.id === id));

  if (!worker) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white dark:bg-slate-900 border border-border p-10 rounded-3xl shadow-md max-w-sm w-full space-y-4">
          <p className="text-muted-foreground text-base font-semibold">Worker not found</p>
          <Button onClick={() => navigate('/workers')} className="w-full">
            Back to Workers
          </Button>
        </div>
      </div>
    );
  }

  const handleCall = () => {
    const phone = worker.phone || '9876543210';
    window.location.href = `tel:${phone}`;
    toast.success(`Calling ${worker.name}...`);
  };

  const handleBook = () => {
    toast.success(`Booking request sent successfully to ${worker.name}!`);
  };

  // Mock distance and verified status matching list page
  const isVerified = true;
  const mockDistance = '2.4 km away';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 pt-4">
      <div className="max-w-xl mx-auto px-4">
        {/* Back navigation */}
        <button
          onClick={() => navigate('/workers')}
          className="flex items-center gap-2 p-2.5 bg-white dark:bg-slate-800 rounded-2xl border border-border/80 text-foreground hover:bg-muted active:scale-95 transition mb-6 shadow-sm font-bold text-sm"
        >
          <ArrowLeft size={16} />
          Back to Workers
        </button>

        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-900 border border-border rounded-3xl p-6 shadow-sm space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-emerald-500 to-teal-500" />

          {/* Profile Header */}
          <div className="flex items-center gap-4 pt-2">
            <div className="w-16 h-16 bg-primary/10 text-primary border-2 border-primary/20 rounded-full flex items-center justify-center font-black text-2xl">
              {worker.name.charAt(0)}
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <h1 className="text-2xl font-black text-foreground leading-none">{worker.name}</h1>
                {isVerified && (
                  <ShieldCheck size={20} className="text-emerald-500 fill-emerald-500/10" title="Verified Worker" />
                )}
              </div>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold">
                <span>📍 {worker.location}</span>
                <span>•</span>
                <span className="text-foreground">{mockDistance}</span>
              </div>
            </div>
          </div>

          {/* Rating overview */}
          <div className="flex items-center justify-around bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-border text-center">
            <div className="space-y-0.5">
              <span className="text-2xl font-black text-foreground flex items-center justify-center gap-1">
                ⭐ {worker.rating.toFixed(1)}
              </span>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Worker Rating</p>
            </div>
            <div className="w-[1px] h-8 bg-border" />
            <div className="space-y-0.5">
              <span className="text-2xl font-black text-foreground">{worker.experience} yrs</span>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Experience</p>
            </div>
            <div className="w-[1px] h-8 bg-border" />
            <div className="space-y-0.5">
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {worker.status.toUpperCase()}
              </span>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Availability</p>
            </div>
          </div>

          {/* Bio section */}
          <div className="space-y-2">
            <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest">Bio & Introduction</h3>
            <p className="text-sm text-foreground leading-relaxed font-medium">
              {worker.bio || "Hardworking agricultural professional available for sowing, weeding, and tractor operations. Has own work boots and is willing to travel across neighboring villages."}
            </p>
          </div>

          <hr className="border-border" />

          {/* Skills, Specializations and Certifications */}
          <div className="space-y-5">
            {/* Skills */}
            <div className="space-y-2">
              <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                <Briefcase size={14} className="text-primary" /> Core Farming Skills
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {worker.skills.map((skill) => (
                  <span key={skill} className="text-xs font-bold bg-slate-50 dark:bg-slate-800 text-foreground px-3 py-1.5 rounded-xl border border-border">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Specializations */}
            <div className="space-y-2">
              <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                <BookOpen size={14} className="text-secondary" /> Crop Specializations
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {worker.specializations.map((spec) => (
                  <span key={spec} className="text-xs font-bold bg-amber-500/5 text-amber-600 dark:text-amber-400 px-3 py-1.5 rounded-xl border border-amber-500/10">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            {worker.certifications && worker.certifications.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
                  <Award size={14} className="text-accent" /> Professional Certifications
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {worker.certifications.map((cert) => (
                    <span key={cert} className="text-xs font-bold bg-teal-500/5 text-teal-600 dark:text-teal-400 px-3 py-1.5 rounded-xl border border-teal-500/10">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <hr className="border-border" />

          {/* Contact coordinates list */}
          <div className="space-y-2 text-sm font-semibold">
            <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-3">Direct Contact Details</h3>
            <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-muted-foreground">Mobile Phone</span>
              <span className="text-foreground">{worker.phone}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-muted-foreground">Email Address</span>
              <span className="text-foreground">{worker.email}</span>
            </div>
          </div>

          {/* Call / Book triggers */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={handleCall}
              className="flex-1 h-14 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-base rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 active:scale-98 transition"
            >
              <Phone size={18} className="stroke-[3]" />
              Call Now 📞
            </Button>
            
            {isAuthenticated && user?.role === 'company' && (
              <Button
                onClick={handleBook}
                variant="outline"
                className="flex-1 h-14 border-emerald-500/30 text-primary hover:bg-primary/5 font-extrabold text-base rounded-2xl active:scale-98 transition"
              >
                Book Worker
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
