import { useNavigate } from 'react-router-dom';
import { Tractor, MapPin, Clock, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const sampleJobs = [
    {
      title: language === 'en' ? 'Tractor Driver' : 'ट्रैक्टर चालक',
      location: language === 'en' ? 'Ludhiana, Punjab' : 'लुधियाना, पंजाब',
      pay: language === 'en' ? '₹700/day' : '₹700/दिन',
      duration: language === 'en' ? '15 Days' : '15 दिन',
    },
    {
      title: language === 'en' ? 'Cotton Picker' : 'कपास बीनने वाला',
      location: language === 'en' ? 'Nagpur, MH' : 'नागपुर, महाराष्ट्र',
      pay: language === 'en' ? '₹450/day' : '₹450/दिन',
      duration: language === 'en' ? '30 Days' : '30 दिन',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <section className="relative pt-20 pb-32 overflow-hidden flex items-center min-h-[90vh]">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob" />
        <div className="absolute top-40 -left-40 w-96 h-96 bg-emerald-400/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-40 left-1/2 w-96 h-96 bg-teal-400/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Hero Details */}
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate="visible" 
            className="lg:col-span-7 text-left space-y-8"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-white/50 dark:bg-card/50 backdrop-blur-md border border-primary/20 text-primary px-4 py-2 rounded-full text-xs font-bold tracking-wide shadow-sm">
              <Tractor size={14} className="animate-bounce" />
              <span>{t('heroTag')}</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-foreground leading-[1.1]">
              {t('heroTitle1')}<br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                {t('heroTitle2')}
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed font-medium">
              {t('heroSubtitle')}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => navigate('/register?role=company')}
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-bold rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-black/10 dark:shadow-white/10"
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-primary rounded-full group-hover:w-full group-hover:h-56"></span>
                <span className="relative flex items-center">
                  {t('findWorkers')} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button
                onClick={() => navigate('/register?role=worker')}
                className="group inline-flex items-center justify-center px-8 py-4 bg-white/50 dark:bg-card/50 backdrop-blur-md border border-border text-foreground font-bold rounded-2xl hover:bg-white/80 dark:hover:bg-card/80 transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
              >
                {t('findJobs')}
              </button>
            </motion.div>

            {/* Stats Counters */}
            <motion.div variants={containerVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 border-t border-border/50">
              <motion.div variants={itemVariants}>
                <h3 className="text-3xl font-black text-foreground tracking-tight">50k+</h3>
                <p className="text-sm text-muted-foreground font-medium mt-1">{t('statFarmers')}</p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h3 className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent tracking-tight">120k+</h3>
                <p className="text-sm text-muted-foreground font-medium mt-1">{t('statWorkers')}</p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h3 className="text-3xl font-black text-foreground tracking-tight">15k+</h3>
                <p className="text-sm text-muted-foreground font-medium mt-1">{t('statJobs')}</p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h3 className="text-3xl font-black text-foreground tracking-tight">95%</h3>
                <p className="text-sm text-muted-foreground font-medium mt-1">{t('statSuccess')}</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Graphic Preview and Floating Badges */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: 0.3 }}
            className="lg:col-span-5 relative flex justify-center perspective-[1000px]"
          >
            <div className="w-full max-w-sm bg-white/70 dark:bg-card/70 backdrop-blur-xl rounded-[2rem] border border-white/20 dark:border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 relative overflow-hidden transform-gpu hover:rotate-1 transition-transform duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full pointer-events-none" />
              
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                  <span className="text-2xl">🌾</span>
                </div>
                <div>
                  <h4 className="font-extrabold text-foreground">{t('activeJobs')}</h4>
                  <p className="text-xs text-muted-foreground font-medium">{t('nearbyJobs')}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8 relative z-10">
                {sampleJobs.map((job, idx) => (
                  <motion.div 
                    key={idx} 
                    whileHover={{ scale: 1.03, y: -2 }}
                    className="p-5 bg-white dark:bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-all text-left cursor-default"
                  >
                    <div className="flex justify-between items-start">
                      <h5 className="font-bold text-foreground">{job.title}</h5>
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-1 rounded-full">{job.pay}</span>
                    </div>
                    <div className="flex space-x-4 mt-3 text-xs font-medium text-muted-foreground">
                      <span className="flex items-center"><MapPin size={14} className="mr-1.5" /> {job.location}</span>
                      <span className="flex items-center"><Clock size={14} className="mr-1.5" /> {job.duration}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20 rounded-2xl border border-emerald-500/20 flex items-center justify-between text-left backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite]" />
                <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1 flex items-center"><ShieldCheck size={12} className="mr-1" /> {t('verifiedWorker')}</span>
                  <span className="font-bold text-sm text-foreground">Rajesh Sharma</span>
                </div>
                <div className="relative z-10 flex items-center bg-white dark:bg-card px-3 py-1.5 rounded-xl shadow-sm text-xs font-bold text-amber-500 border border-border">
                  <Star size={14} fill="currentColor" className="mr-1.5 text-amber-500" /> 4.9
                </div>
              </motion.div>
            </div>

            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-10 -left-10 bg-white/80 dark:bg-card/80 backdrop-blur-md border border-border px-4 py-2.5 rounded-2xl shadow-xl flex items-center space-x-3"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-bold text-foreground">Worker Available</span>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-1/4 -right-12 bg-white/80 dark:bg-card/80 backdrop-blur-md border border-border px-4 py-2.5 rounded-2xl shadow-xl flex items-center space-x-2"
            >
              <span className="text-amber-500"><Star size={16} fill="currentColor" /></span>
              <span className="text-sm font-bold text-foreground">Top Rated</span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
