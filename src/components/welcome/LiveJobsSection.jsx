import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Building2, ChevronRight, Bookmark } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';

export default function LiveJobsSection() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  const jobs = [
    { title: 'Cotton Picker Crew', pay: '₹600/Day', employer: 'Vardhan Farms', loc: 'Bathinda, Punjab', duration: '10 Days', tags: ['Harvesting', 'Immediate'] },
    { title: 'Tractor Operator', pay: '₹850/Day', employer: 'Agro Foods', loc: 'Nashik, MH', duration: '4 Days', tags: ['Machinery', 'Skilled'] },
    { title: 'Orchard Pruning Worker', pay: '₹700/Day', employer: 'Apples Agribusiness', loc: 'Shimla, HP', duration: '14 Days', tags: ['Pruning', 'Seasonal'] },
  ];

  return (
    <section id="jobs" className="py-24 relative overflow-hidden bg-muted/5 dark:bg-background border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black tracking-widest uppercase shadow-sm">
              {t('liveJobsTitle')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
              {t('liveJobsSubtitle')}
            </h2>
          </motion.div>
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            onClick={() => navigate('/jobs')}
            className="group flex items-center justify-center space-x-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors mx-auto md:mx-0"
          >
            <span>View All Jobs</span>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {jobs.map((job, idx) => (
            <motion.div 
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative bg-white/70 dark:bg-card/70 backdrop-blur-xl rounded-[2rem] border border-white/20 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:border-emerald-500/30 transition-all duration-500 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/[0.01] dark:to-white/[0.01] pointer-events-none -z-10" />
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-muted/50 dark:bg-muted/20 flex items-center justify-center text-muted-foreground border border-border/50">
                    <Building2 size={20} />
                  </div>
                  <button className="text-muted-foreground hover:text-emerald-500 transition-colors">
                    <Bookmark size={20} />
                  </button>
                </div>
                
                <h4 className="font-extrabold text-xl text-foreground mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors tracking-tight">{job.title}</h4>
                <p className="text-sm font-semibold text-muted-foreground mb-6">{job.employer}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-bold px-3 py-1 bg-muted/50 dark:bg-muted/20 rounded-lg text-muted-foreground">{tag}</span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-medium text-muted-foreground pb-6 border-b border-border/50">
                  <div className="flex items-center"><MapPin size={14} className="mr-2 text-emerald-500" /> {job.loc}</div>
                  <div className="flex items-center"><Clock size={14} className="mr-2 text-blue-500" /> {job.duration}</div>
                </div>
              </div>

              <div className="px-8 pb-8 flex items-center justify-between mt-auto">
                <div>
                  <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Daily Wage</span>
                  <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{job.pay}</span>
                </div>
                <button onClick={() => navigate('/login')} className="px-6 py-3 bg-foreground text-background font-bold rounded-xl hover:scale-105 active:scale-95 transition-transform shadow-md">
                  {t('btnApply')}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
