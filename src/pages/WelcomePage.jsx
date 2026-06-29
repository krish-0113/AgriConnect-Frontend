import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sprout, 
  ShieldCheck, 
  Star, 
  Users, 
  ArrowRight, 
  Tractor, 
  Briefcase, 
  Award, 
  TrendingUp, 
  MapPin, 
  Clock, 
  HelpCircle, 
  BookOpen, 
  Mail, 
  Phone, 
  Check, 
  Search, 
  ChevronDown, 
  ChevronUp,
  UserCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useToast } from '../components/common/Toast';

export default function WelcomePage() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const toast = useToast();

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Search Panel state
  const [searchLoc, setSearchLoc] = useState('');
  const [searchSkill, setSearchSkill] = useState('');
  const [searchSalary, setSearchSalary] = useState('');

  // Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSending, setContactSending] = useState(false);

  // Testimonial Carousel State
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const testimonials = [
    {
      name,
      role=== 'en' ? 'Wheat Farmer, Punjab' , पंजाब',
      text=== 'en' 
        ? "AgriConnect helped me hire 12 harvester operators in under 24 hours. The direct OTP verification gives me peace of mind."
        ,
      rating: 5
    },
    {
      name,
      role=== 'en' ? 'Fruit Picker, Maharashtra' , महाराष्ट्र',
      text=== 'en'
        ? "I found consistent orchard jobs nearby with honest daily wage rates. I don't pay any broker commissions anymore!"
        ,
      rating: 5
    },
    {
      name,
      role=== 'en' ? 'Tractor Driver, Haryana' , हरियाणा',
      text=== 'en'
        ? "The work logging system is simple and transparent. The farmers paid me exactly what was agreed on our log logs."
        ,
      rating: 5
    }
  ];

  const sampleJobs = [
    { title, location, Punjab', pay, duration,
    { title, location, MH', pay, duration,
  ];


  const handleContactSubmit = (e.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      toast.error(language === 'en' ? 'Please fill in all required fields' );
      return;
    }
    setContactSending(true);
    setTimeout(() => {
      toast.success(language === 'en' ? 'Thank you! Your message has been sent.' );
      setContactName('');
      setContactEmail('');
      setContactSubject('');
      setContactMessage('');
      setContactSending(false);
    }, 1000);
  };

  const handleSearchSubmit = (e.FormEvent) => {
    e.preventDefault();
    toast.info(
      language === 'en'
        ? `Searching for jobs in ${searchLoc || 'Anywhere'} matching "${searchSkill || 'Any skill'}"`
        : `${searchLoc || 'कहीं भी'} में "${searchSkill || 'कोई भी कौशल'}" नौकरियों की खोज की जा रही है`
    );
    navigate('/jobs');
  };

  const nextTestimonial = () => {
    setTestimonialIdx((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 flex flex-col">
      
      {/* SECTION 1 — NAVIGATION BAR */}
      <Header />

      {/* Decorative Accents */}
      <div className="absolute top-16 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl pointer-events-none z-0" />
      <div className="absolute top-2/3 left-0 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl pointer-events-none z-0" />

      {/* SECTION 2 — HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Details */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-bold tracking-wide">
                <Tractor size={14} />
                <span>{t('heroTag')}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                {t('heroTitle1')}<br />
                <span className="bg-gradient-to-r from-primary to-[#2d6a4f] bg-clip-text text-transparent">
                  {t('heroTitle2')}
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                {t('heroSubtitle')}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => navigate('/register?role=company')}
                  className="px-6 py-3.5 bg-[#1b4332] dark:bg-primary hover:bg-[#2d6a4f] text-white font-bold rounded-xl transition shadow-md shadow-primary/20 hover:scale-[1.01]"
                >
                  {t('findWorkers')}
                </button>
                <button
                  onClick={() => navigate('/register?role=worker')}
                  className="px-6 py-3.5 bg-primary dark:bg-muted text-white dark:text-foreground hover:bg-opacity-95 font-bold rounded-xl transition shadow-md hover:scale-[1.01]"
                >
                  {t('findJobs')}
                </button>
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-border">
                <div>
                  <h3 className="text-3xl font-extrabold text-foreground">50,000+</h3>
                  <p className="text-xs text-muted-foreground font-semibold mt-1">{t('statFarmers')}</p>
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-[#1b4332] dark,000+</h3>
                  <p className="text-xs text-muted-foreground font-semibold mt-1">{t('statWorkers')}</p>
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-foreground">15,000+</h3>
                  <p className="text-xs text-muted-foreground font-semibold mt-1">{t('statJobs')}</p>
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-foreground">95%</h3>
                  <p className="text-xs text-muted-foreground font-semibold mt-1">{t('statSuccess')}</p>
                </div>
              </div>
            </div>

            {/* Right Graphic Preview and Floating Badges */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="w-full max-w-sm bg-white dark:bg-card rounded-3xl border border-border shadow-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full pointer-events-none" />
                
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    🌾
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">{t('activeJobs')}</h4>
                    <p className="text-xs text-muted-foreground">{t('nearbyJobs')}</p>
                  </div>
                </div>

                <div className="space-y-3.5 mb-6">
                  {sampleJobs.map((job, idx) => (
                    <div key={idx} className="p-4 bg-[#f8faf9] dark:bg-muted/20 rounded-2xl border border-border hover:border-primary/40 transition text-left">
                      <div className="flex justify-between items-start">
                        <h5 className="font-bold text-foreground text-sm">{job.title}</h5>
                        <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">{job.pay}</span>
                      </div>
                      <div className="flex space-x-3.5 mt-2.5 text-xs text-muted-foreground">
                        <span className="flex items-center"><MapPin size={12} className="mr-1" /> {job.location}</span>
                        <span className="flex items-center"><Clock size={12} className="mr-1" /> {job.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20 flex items-center justify-between text-left">
                  <div>
                    <span className="text-xs font-bold text-primary block">{t('verifiedWorker')}</span>
                    <span className="font-extrabold text-sm text-foreground">Rajesh Sharma</span>
                  </div>
                  <div className="flex items-center bg-white dark:bg-card px-2.5 py-1 rounded-xl shadow-sm text-xs font-bold text-amber-500 border border-border">
                    <Star size={12} fill="currentColor" className="mr-1 text-amber-500" /> 4.9
                  </div>
                </div>
              </div>

              {/* Floating badges for startup aesthetic */}
              <div className="absolute -top-4 -left-4 bg-white dark:bg-card border border-border px-3 py-1.5 rounded-xl shadow-lg flex items-center space-x-2 animate-bounce duration-1000">
                <span className="text-green-500">✓</span>
                <span className="text-xs font-bold text-foreground">Worker Available</span>
              </div>
              <div className="absolute bottom-1/3 -right-4 bg-white dark:bg-card border border-border px-3 py-1.5 rounded-xl shadow-lg flex items-center space-x-2">
                <span className="text-primary">★</span>
                <span className="text-xs font-bold text-foreground">Verified Worker</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3 — TRUST SECTION */}
      <section className="py-12 bg-white dark:bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground mb-6">
            {t('trustTitle')}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-foreground font-semibold">
              <Check className="text-primary" size={18} />
              <span>{t('trustSec')}</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-foreground font-semibold">
              <Check className="text-primary" size={18} />
              <span>{t('trustVer')}</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-foreground font-semibold">
              <Check className="text-primary" size={18} />
              <span>{t('trustFast')}</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-foreground font-semibold">
              <Check className="text-primary" size={18} />
              <span>{t('trustOtp')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — ABOUT AGRICONNECT */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-extrabold tracking-widest text-primary uppercase block">{t('aboutTitle')}</span>
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl tracking-tight">
            {t('aboutSubtitle')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 text-left max-w-5xl mx-auto">
            <div className="p-6.5 bg-white dark:bg-card rounded-2xl border border-border shadow-sm space-y-3">
              <h3 className="font-bold text-lg text-primary flex items-center">
                <span className="mr-2 text-xl">🎯</span> {t('missionTitle')}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t('missionDesc')}</p>
            </div>
            <div className="p-6.5 bg-white dark:bg-card rounded-2xl border border-border shadow-sm space-y-3">
              <h3 className="font-bold text-lg text-primary flex items-center">
                <span className="mr-2 text-xl">👁️</span> {t('visionTitle')}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t('visionDesc')}</p>
            </div>
            <div className="p-6.5 bg-white dark:bg-card rounded-2xl border border-border shadow-sm space-y-3">
              <h3 className="font-bold text-lg text-red-600 dark:text-red-400 flex items-center">
                <span className="mr-2 text-xl">⚠️</span> {t('problemTitle')}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t('problemDesc')}</p>
            </div>
            <div className="p-6.5 bg-white dark:bg-card rounded-2xl border border-border shadow-sm space-y-3">
              <h3 className="font-bold text-lg text-green-600 dark:text-green-400 flex items-center">
                <span className="mr-2 text-xl">💡</span> {t('solutionTitle')}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t('solutionDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — FEATURES */}
      <section id="features" className="py-20 bg-white dark:bg-card border-y border-border transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-extrabold tracking-widest text-primary uppercase block">{t('featuresTitle')}</span>
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl tracking-tight">
            {t('featuresSubtitle')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 text-left">
            <div className="bg-background p-6 rounded-2xl border border-border hover:border-primary/50 hover:shadow-md transition duration-200">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                <Sprout size={20} />
              </div>
              <h3 className="font-bold text-foreground text-sm.5 mb-2">{t('featJobPost')}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{t('featJobPostDesc')}</p>
            </div>
            <div className="bg-background p-6 rounded-2xl border border-border hover:border-primary/50 hover:shadow-md transition duration-200">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                <Users size={20} />
              </div>
              <h3 className="font-bold text-foreground text-sm.5 mb-2">{t('featSearch')}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{t('featSearchDesc')}</p>
            </div>
            <div className="bg-background p-6 rounded-2xl border border-border hover:border-primary/50 hover:shadow-md transition duration-200">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                <MapPin size={20} />
              </div>
              <h3 className="font-bold text-foreground text-sm.5 mb-2">{t('featLocation')}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{t('featLocationDesc')}</p>
            </div>
            <div className="bg-background p-6 rounded-2xl border border-border hover:border-primary/50 hover:shadow-md transition duration-200">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                <Briefcase size={20} />
              </div>
              <h3 className="font-bold text-foreground text-sm.5 mb-2">{t('featChat')}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{t('featChatDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — HOW IT WORKS */}
      <section id="workflow" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-extrabold tracking-widest text-[#1b4332] dark)}</span>
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl tracking-tight">
            {t('workflowSubtitle')}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12 text-left">
            {/* Farmer Workflow */}
            <div className="bg-white dark:bg-card p-8 rounded-2xl border border-border shadow-sm space-y-6">
              <h3 className="font-extrabold text-lg text-primary flex items-center pb-2 border-b border-border">
                🚜 {t('farmerFlow')}
              </h3>
              <div className="relative pl-6 space-y-6 border-l-2 border-dashed border-primary/20">
                <div className="relative">
                  <span className="absolute -left-9 top-0.5 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">1</span>
                  <h4 className="font-bold text-foreground text-sm.5">{t('fStep1')}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{t('fStep1Desc')}</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-9 top-0.5 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">2</span>
                  <h4 className="font-bold text-foreground text-sm.5">{t('fStep2')}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{t('fStep2Desc')}</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-9 top-0.5 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">3</span>
                  <h4 className="font-bold text-foreground text-sm.5">{t('fStep3')}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{t('fStep3Desc')}</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-9 top-0.5 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">4</span>
                  <h4 className="font-bold text-foreground text-sm.5">{t('fStep4')}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{t('fStep4Desc')}</p>
                </div>
              </div>
            </div>

            {/* Worker Workflow */}
            <div className="bg-white dark:bg-card p-8 rounded-2xl border border-border shadow-sm space-y-6">
              <h3 className="font-extrabold text-lg text-primary flex items-center pb-2 border-b border-border">
                🌾 {t('workerFlow')}
              </h3>
              <div className="relative pl-6 space-y-6 border-l-2 border-dashed border-primary/20">
                <div className="relative">
                  <span className="absolute -left-9 top-0.5 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">1</span>
                  <h4 className="font-bold text-foreground text-sm.5">{t('wStep1')}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{t('wStep1Desc')}</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-9 top-0.5 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">2</span>
                  <h4 className="font-bold text-foreground text-sm.5">{t('wStep2')}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{t('wStep2Desc')}</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-9 top-0.5 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">3</span>
                  <h4 className="font-bold text-foreground text-sm.5">{t('wStep3')}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{t('wStep3Desc')}</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-9 top-0.5 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">4</span>
                  <h4 className="font-bold text-foreground text-sm.5">{t('wStep4')}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{t('wStep4Desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — JOB CATEGORIES */}
      <section id="categories" className="py-20 bg-white dark:bg-card border-y border-border transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-extrabold tracking-widest text-primary uppercase block">{t('catTitle')}</span>
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl tracking-tight">
            {t('catSubtitle')}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 pt-10 text-center">
            <div className="p-5 bg-background border border-border rounded-2xl hover:border-primary transition cursor-pointer">
              <span className="text-3xl">🌾</span>
              <h4 className="font-bold text-sm text-foreground mt-2">{t('catHarvest')}</h4>
              <span className="text-xs text-muted-foreground">1,240 Jobs</span>
            </div>
            <div className="p-5 bg-background border border-border rounded-2xl hover:border-primary transition cursor-pointer">
              <span className="text-3xl">🌱</span>
              <h4 className="font-bold text-sm text-foreground mt-2">{t('catPlant')}</h4>
              <span className="text-xs text-muted-foreground">850 Jobs</span>
            </div>
            <div className="p-5 bg-background border border-border rounded-2xl hover:border-primary transition cursor-pointer">
              <span className="text-3xl">💧</span>
              <h4 className="font-bold text-sm text-foreground mt-2">{t('catIrrig')}</h4>
              <span className="text-xs text-muted-foreground">420 Jobs</span>
            </div>
            <div className="p-5 bg-background border border-border rounded-2xl hover:border-primary transition cursor-pointer">
              <span className="text-3xl">💨</span>
              <h4 className="font-bold text-sm text-foreground mt-2">{t('catSpray')}</h4>
              <span className="text-xs text-muted-foreground">610 Jobs</span>
            </div>
            <div className="p-5 bg-background border border-border rounded-2xl hover:border-primary transition cursor-pointer">
              <span className="text-3xl">🚜</span>
              <h4 className="font-bold text-sm text-foreground mt-2">{t('catTractor')}</h4>
              <span className="text-xs text-muted-foreground">1,050 Jobs</span>
            </div>
            <div className="p-5 bg-background border border-border rounded-2xl hover:border-primary transition cursor-pointer">
              <span className="text-3xl">🍎</span>
              <h4 className="font-bold text-sm text-foreground mt-2">{t('catPick')}</h4>
              <span className="text-xs text-muted-foreground">300 Jobs</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — SEARCH SECTION */}
      <section id="search" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-extrabold tracking-widest text-primary uppercase block">{t('searchHeader')}</span>
          
          <form onSubmit={handleSearchSubmit} className="max-w-4xl mx-auto bg-white dark:bg-card border border-border shadow-xl rounded-3xl p-6.5 grid grid-cols-1 md:grid-cols-4 gap-4 items-end text-left">
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">{t('searchLabelLoc')}</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="e.g. Sangrur, Punjab"
                  value={searchLoc}
                  onChange={(e) => setSearchLoc(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">{t('searchLabelSkill')}</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="e.g. Tractor driving"
                  value={searchSkill}
                  onChange={(e) => setSearchSkill(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">{t('searchLabelSalary')}</label>
              <input
                type="number"
                placeholder="e.g. 500"
                value={searchSalary}
                onChange={(e) => setSearchSalary(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm bg-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1b4332] dark:bg-primary hover:bg-[#2d6a4f] text-white font-bold py-2.5 rounded-xl shadow-md transition"
            >
              {t('btnSearchJobs')}
            </button>
          </form>
        </div>
      </section>

      {/* SECTION 9 — LIVE JOBS */}
      <section id="jobs" className="py-20 bg-white dark:bg-card border-y border-border transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-extrabold tracking-widest text-primary uppercase block">{t('liveJobsTitle')}</span>
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl tracking-tight">
            {t('liveJobsSubtitle')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 text-left">
            <div className="p-5.5 bg-background rounded-2xl border border-border shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-extrabold text-foreground text-sm.5">Cotton Picker Crew</h4>
                  <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">₹600/Day</span>
                </div>
                <p className="text-xs text-muted-foreground">Employer Vardhan Farms</p>
                <div className="flex items-center space-x-3.5 mt-4.5 text-xs text-muted-foreground">
                  <span className="flex items-center"><MapPin size={12} className="mr-1" /> Bathinda, Punjab</span>
                  <span className="flex items-center"><Clock size={12} className="mr-1" /> 10 Days</span>
                </div>
              </div>
              <div className="flex gap-2 pt-6">
                <button onClick={() => navigate('/login')} className="flex-1 bg-primary text-white text-xs font-bold py-2 rounded-lg hover:opacity-95 transition">
                  {t('btnApply')}
                </button>
                <button onClick={() => navigate('/login')} className="px-3 border border-border text-muted-foreground text-xs font-bold rounded-lg hover:bg-muted transition">
                  {t('btnDetails')}
                </button>
              </div>
            </div>

            <div className="p-5.5 bg-background rounded-2xl border border-border shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-extrabold text-foreground text-sm.5">Tractor Operator</h4>
                  <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">₹850/Day</span>
                </div>
                <p className="text-xs text-muted-foreground">Employer Agro Foods</p>
                <div className="flex items-center space-x-3.5 mt-4.5 text-xs text-muted-foreground">
                  <span className="flex items-center"><MapPin size={12} className="mr-1" /> Nashik, MH</span>
                  <span className="flex items-center"><Clock size={12} className="mr-1" /> 4 Days</span>
                </div>
              </div>
              <div className="flex gap-2 pt-6">
                <button onClick={() => navigate('/login')} className="flex-1 bg-primary text-white text-xs font-bold py-2 rounded-lg hover:opacity-95 transition">
                  {t('btnApply')}
                </button>
                <button onClick={() => navigate('/login')} className="px-3 border border-border text-muted-foreground text-xs font-bold rounded-lg hover:bg-muted transition">
                  {t('btnDetails')}
                </button>
              </div>
            </div>

            <div className="p-5.5 bg-background rounded-2xl border border-border shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-extrabold text-foreground text-sm.5">Orchard Pruning Worker</h4>
                  <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">₹700/Day</span>
                </div>
                <p className="text-xs text-muted-foreground">Employer Apples Agribusiness</p>
                <div className="flex items-center space-x-3.5 mt-4.5 text-xs text-muted-foreground">
                  <span className="flex items-center"><MapPin size={12} className="mr-1" /> Shimla, HP</span>
                  <span className="flex items-center"><Clock size={12} className="mr-1" /> 14 Days</span>
                </div>
              </div>
              <div className="flex gap-2 pt-6">
                <button onClick={() => navigate('/login')} className="flex-1 bg-primary text-white text-xs font-bold py-2 rounded-lg hover:opacity-95 transition">
                  {t('btnApply')}
                </button>
                <button onClick={() => navigate('/login')} className="px-3 border border-border text-muted-foreground text-xs font-bold rounded-lg hover:bg-muted transition">
                  {t('btnDetails')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10 — TOP WORKERS */}
      <section id="workers" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-extrabold tracking-widest text-primary uppercase block">{t('topWorkersTitle')}</span>
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl tracking-tight">
            {t('topWorkersSubtitle')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 text-left">
            <div className="p-5.5 bg-white dark:bg-card border border-border rounded-2xl shadow-sm space-y-3.5">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center font-bold text-foreground">
                  GS
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">Gurnam Singh</h4>
                  <p className="text-xs text-muted-foreground">Wheat Harvesting, Seeding</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-border text-center text-xs text-muted-foreground">
                <div>
                  <span className="block font-bold text-foreground">8 Yrs</span>
                  <span>{t('expYears')}</span>
                </div>
                <div>
                  <span className="block font-bold text-foreground">4.9</span>
                  <span>Rating</span>
                </div>
                <div>
                  <span className="block font-bold text-foreground">42</span>
                  <span>{t('jobsCompleted')}</span>
                </div>
              </div>
              <button onClick={() => navigate('/login')} className="w-full bg-[#1b4332] dark:bg-primary text-white text-xs font-bold py-2 rounded-lg hover:bg-opacity-95 transition">
                {t('btnViewProfile')}
              </button>
            </div>

            <div className="p-5.5 bg-white dark:bg-card border border-border rounded-2xl shadow-sm space-y-3.5">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center font-bold text-foreground">
                  KP
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">Kiran Patel</h4>
                  <p className="text-xs text-muted-foreground">Cotton Harvester, Pesticide</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-border text-center text-xs text-muted-foreground">
                <div>
                  <span className="block font-bold text-foreground">5 Yrs</span>
                  <span>{t('expYears')}</span>
                </div>
                <div>
                  <span className="block font-bold text-foreground">4.8</span>
                  <span>Rating</span>
                </div>
                <div>
                  <span className="block font-bold text-foreground">29</span>
                  <span>{t('jobsCompleted')}</span>
                </div>
              </div>
              <button onClick={() => navigate('/login')} className="w-full bg-[#1b4332] dark:bg-primary text-white text-xs font-bold py-2 rounded-lg hover:bg-opacity-95 transition">
                {t('btnViewProfile')}
              </button>
            </div>

            <div className="p-5.5 bg-white dark:bg-card border border-border rounded-2xl shadow-sm space-y-3.5">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center font-bold text-foreground">
                  MD
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">Madhav Das</h4>
                  <p className="text-xs text-muted-foreground">Tractor driving, Irrigation</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 py-2 border-y border-border text-center text-xs text-muted-foreground">
                <div>
                  <span className="block font-bold text-foreground">10 Yrs</span>
                  <span>{t('expYears')}</span>
                </div>
                <div>
                  <span className="block font-bold text-foreground">5.0</span>
                  <span>Rating</span>
                </div>
                <div>
                  <span className="block font-bold text-foreground">58</span>
                  <span>{t('jobsCompleted')}</span>
                </div>
              </div>
              <button onClick={() => navigate('/login')} className="w-full bg-[#1b4332] dark:bg-primary text-white text-xs font-bold py-2 rounded-lg hover:bg-opacity-95 transition">
                {t('btnViewProfile')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11 — SUCCESS STORIES */}
      <section id="testimonials" className="py-20 bg-white dark:bg-card border-y border-border transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative">
          <span className="text-xs font-extrabold tracking-widest text-primary uppercase block">{t('storiesTitle')}</span>
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl tracking-tight">
            {t('storiesSubtitle')}
          </h2>

          <div className="p-8 bg-[#f8faf9] dark:bg-muted/10 rounded-3xl border border-border mt-8 space-y-4 text-center">
            <div className="flex justify-center space-x-1 text-amber-500">
              {[...Array(testimonials[testimonialIdx].rating)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <p className="text-lg italic text-foreground leading-relaxed">
              &ldquo;{testimonials[testimonialIdx].text}&rdquo;
            </p>
            <div>
              <h4 className="font-bold text-foreground">{testimonials[testimonialIdx].name}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">{testimonials[testimonialIdx].role}</p>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mt-6">
            <button onClick={prevTestimonial} className="p-2 border border-border rounded-full hover:bg-muted transition">
              <ChevronLeft size={18} />
            </button>
            <button onClick={nextTestimonial} className="p-2 border border-border rounded-full hover:bg-muted transition">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 12 — PLATFORM STATISTICS */}
      <section id="stats" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-extrabold tracking-widest text-primary uppercase block">{t('statsHeader')}</span>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10">
            <div className="p-6 bg-white dark:bg-card rounded-2xl border border-border">
              <h4 className="text-4xl font-extrabold text-foreground">200K+</h4>
              <p className="text-xs text-muted-foreground font-semibold mt-2">{t('regUsers')}</p>
            </div>
            <div className="p-6 bg-white dark:bg-card rounded-2xl border border-border">
              <h4 className="text-4xl font-extrabold text-foreground">50K+</h4>
              <p className="text-xs text-muted-foreground font-semibold mt-2">{t('statJobs')}</p>
            </div>
            <div className="p-6 bg-white dark:bg-card rounded-2xl border border-border">
              <h4 className="text-4xl font-extrabold text-foreground">150K+</h4>
              <p className="text-xs text-muted-foreground font-semibold mt-2">Applications</p>
            </div>
            <div className="p-6 bg-white dark:bg-card rounded-2xl border border-border">
              <h4 className="text-4xl font-extrabold text-foreground">30+</h4>
              <p className="text-xs text-muted-foreground font-semibold mt-2">{t('statesCovered')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 13 — MOBILE APP */}
      <section id="mobile-app" className="py-20 bg-white dark:bg-card border-y border-border transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Texts */}
            <div className="lg:col-span-7 text-left space-y-5">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1b4332] dark:text-primary">
                {t('appTitle')}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                {t('appSubtitle')}
              </p>
              <div className="flex flex-wrap gap-4 pt-3">
                <a href="#" className="inline-flex items-center px-4 py-2.5 bg-[#1b4332] dark:bg-primary text-white rounded-xl text-xs font-bold hover:scale-[1.01] transition shadow-md">
                  📲 {t('downloadPlay')}
                </a>
                <a href="#" className="inline-flex items-center px-4 py-2.5 border border-border text-foreground rounded-xl text-xs font-bold hover:bg-muted transition">
                  🍎 {t('downloadAppStore')}
                </a>
              </div>
            </div>

            {/* Right Phone preview placeholder */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-56 h-[400px] border-[8px] border-[#1b4332] rounded-[36px] bg-[#f8faf9] dark:bg-background relative shadow-2xl p-4 flex flex-col justify-between">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#1b4332] rounded-full" />
                <div className="pt-6 flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-extrabold text-xl mb-2">A</div>
                  <h5 className="font-extrabold text-sm text-foreground">AgriConnect App</h5>
                  <p className="text-[10px] text-muted-foreground mt-1">Live hiring matched</p>
                </div>
                
                <div className="w-full p-2 bg-white dark:bg-card border border-border rounded-xl shadow-md text-[10px] text-left">
                  <span className="font-bold block text-primary">★ Payment Confirmed</span>
                  <span>Amount,400 to Rajesh S.</span>
                </div>
                
                <div className="h-6.5 w-full bg-[#1b4332] rounded-xl flex items-center justify-center text-white text-[10px] font-bold">
                  AgriConnect Mobile Preview
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 14 — FAQ Accordion */}
      <section id="faq" className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-4">
          <span className="text-xs font-extrabold tracking-widest text-primary uppercase block">{t('faqTitle')}</span>
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl tracking-tight">
            {t('faqSubtitle')}
          </h2>

          <div className="pt-10 text-left space-y-3.5">
            {/* FAQ 1 */}
            <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden transition shadow-sm">
              <button
                onClick={() => setActiveFaq(activeFaq === 1 ? null )}
                className="w-full px-6 py-4.5 font-bold text-foreground text-sm.5 flex justify-between items-center bg-transparent"
              >
                <span>{t('q1')}</span>
                {activeFaq === 1 ? <ChevronUp size={16} /> ={16} />}
              </button>
              {activeFaq === 1 && (
                <div className="px-6 pb-5 text-xs.5 text-muted-foreground leading-relaxed border-t border-border pt-3 bg-[#f8faf9] dark:bg-muted/10">
                  {t('a1')}
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden transition shadow-sm">
              <button
                onClick={() => setActiveFaq(activeFaq === 2 ? null )}
                className="w-full px-6 py-4.5 font-bold text-foreground text-sm.5 flex justify-between items-center bg-transparent"
              >
                <span>{t('q2')}</span>
                {activeFaq === 2 ? <ChevronUp size={16} /> ={16} />}
              </button>
              {activeFaq === 2 && (
                <div className="px-6 pb-5 text-xs.5 text-muted-foreground leading-relaxed border-t border-border pt-3 bg-[#f8faf9] dark:bg-muted/10">
                  {t('a2')}
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden transition shadow-sm">
              <button
                onClick={() => setActiveFaq(activeFaq === 3 ? null )}
                className="w-full px-6 py-4.5 font-bold text-foreground text-sm.5 flex justify-between items-center bg-transparent"
              >
                <span>{t('q3')}</span>
                {activeFaq === 3 ? <ChevronUp size={16} /> ={16} />}
              </button>
              {activeFaq === 3 && (
                <div className="px-6 pb-5 text-xs.5 text-muted-foreground leading-relaxed border-t border-border pt-3 bg-[#f8faf9] dark:bg-muted/10">
                  {t('a3')}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 15 — BLOGS */}
      <section id="blogs" className="py-20 bg-white dark:bg-card border-y border-border transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-extrabold tracking-widest text-primary uppercase block">{t('blogsTitle')}</span>
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl tracking-tight">
            {t('blogsSubtitle')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 text-left">
            <div className="bg-background rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div className="p-5.5 space-y-3">
                <span className="text-xs font-bold text-primary block">🌱 Crop Care</span>
                <h4 className="font-extrabold text-foreground text-sm.5 leading-snug">Maximizing Wheat Yields in North India</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Discover modern organic fertilizing techniques and optimal water schedules for winter wheat crops.</p>
              </div>
              <div className="p-5.5 border-t border-border">
                <a href="#" className="text-xs font-bold text-[#1b4332] dark)} →</a>
              </div>
            </div>

            <div className="bg-background rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div className="p-5.5 space-y-3">
                <span className="text-xs font-bold text-primary block">💧 Drip Irrigation</span>
                <h4 className="font-extrabold text-foreground text-sm.5 leading-snug">Understanding Smart Drip Irrigation Systems</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Save up to 40% water using localized drip pipes configured dynamically to local moisture logs.</p>
              </div>
              <div className="p-5.5 border-t border-border">
                <a href="#" className="text-xs font-bold text-[#1b4332] dark)} →</a>
              </div>
            </div>

            <div className="bg-background rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div className="p-5.5 space-y-3">
                <span className="text-xs font-bold text-primary block">🚜 Machinery</span>
                <h4 className="font-extrabold text-foreground text-sm.5 leading-snug">Essential Tractor Maintenance Guide</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Keep your harvester and tractor equipment healthy before pre-sowing seasonal work loads start.</p>
              </div>
              <div className="p-5.5 border-t border-border">
                <a href="#" className="text-xs font-bold text-[#1b4332] dark)} →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 16 — NEWSLETTER */}
      <section id="newsletter" className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
            {t('newsTitle')}
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Get seasonal guidelines, daily wage listings, and news directly in your inbox.
          </p>
          <div className="pt-6">
            <form onSubmit={(e) => { e.preventDefault(); toast.success('Subscribed successfully!'); }} className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder={t('newsPlaceholder')}
                required
                className="px-4.5 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm bg-white dark:bg-card w-full sm:max-w-xs"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-primary text-white font-bold text-sm rounded-xl hover:bg-opacity-95 transition shadow-sm"
              >
                {t('btnSubscribe')}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* SECTION 17 — CONTACT */}
      <section id="contact" className="py-20 bg-white dark:bg-card border-t border-border transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Details */}
            <div className="lg:col-span-5 text-left space-y-6">
              <h2 className="text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl">
                {t('contactTitle')}
              </h2>
              <p className="text-muted-foreground text-sm.5 leading-relaxed">
                {t('contactSubtitle')}
              </p>
              
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-primary mt-1 flex-shrink-0" size={18} />
                  <span>{t('officeAddress')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-primary flex-shrink-0" size={18} />
                  <span>{t('supportPhone')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-primary flex-shrink-0" size={18} />
                  <span>support@agriconnect.com</span>
                </div>
              </div>

              {/* HQ Map placeholder */}
              <div className="h-44 w-full bg-muted dark:bg-background border border-border rounded-2xl flex items-center justify-center text-xs text-muted-foreground font-semibold">
                📍 HQ Map Coordinates (Noida, Uttar Pradesh)
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7 bg-background p-8 rounded-3xl border border-border shadow-sm text-left">
              <h3 className="font-extrabold text-lg text-foreground mb-6">{t('contactForm')}</h3>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-foreground">{t('cName')}</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm bg-transparent"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-foreground">{t('cEmail')}</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm bg-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-foreground">Subject</label>
                  <input
                    type="text"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="e.g. Labor Hiring Query"
                    className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm bg-transparent"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-foreground">{t('cMessage')}</label>
                  <textarea
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    required
                    placeholder="Write details..."
                    className="w-full px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-sm bg-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactSending}
                  className="px-6 py-2.5 bg-primary text-white font-bold text-sm rounded-xl hover:bg-opacity-95 transition shadow-sm disabled:opacity-50"
                >
                  {contactSending ? 'Sending...' )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 18 — FOOTER */}
      <Footer />
      
    </div>
  );
}
