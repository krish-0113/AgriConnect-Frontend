import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Award, Briefcase, MapPin } from 'lucide-react';

export default function TopWorkersSection() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  const workers = [
    { initials: 'GS', name: 'Gurnam Singh', skills: 'Wheat Harvesting, Seeding', exp: '8 Yrs', rating: 4.9, jobs: 42, color: 'bg-emerald-500', loc: 'Punjab' },
    { initials: 'KP', name: 'Kiran Patel', skills: 'Cotton Harvester, Pesticide', exp: '5 Yrs', rating: 4.8, jobs: 29, color: 'bg-blue-500', loc: 'Gujarat' },
    { initials: 'MD', name: 'Madhav Das', skills: 'Tractor driving, Irrigation', exp: '10 Yrs', rating: 5.0, jobs: 58, color: 'bg-amber-500', loc: 'Haryana' },
  ];

  return (
    <section id="workers" className="py-24 relative overflow-hidden bg-white dark:bg-card">
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-muted/30 to-transparent -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black tracking-widest uppercase shadow-sm">
              {t('topWorkersTitle')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
              {t('topWorkersSubtitle')}
            </h2>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4"
        >
          {workers.map((worker, idx) => (
            <motion.div 
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative bg-white dark:bg-background border border-border rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:border-emerald-500/30 transition-all duration-500 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-muted/50 to-transparent pointer-events-none" />
              
              <div className="p-8 relative z-10 text-center">
                <div className="relative inline-block mb-6">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center font-black text-2xl text-white shadow-lg ${worker.color} group-hover:scale-105 transition-transform duration-300`}>
                    {worker.initials}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white dark:bg-card rounded-full p-1 shadow-sm">
                    <ShieldCheck size={20} className="text-emerald-500" />
                  </div>
                </div>
                
                <h4 className="font-extrabold text-xl text-foreground mb-1 tracking-tight">{worker.name}</h4>
                <p className="text-sm font-medium text-muted-foreground mb-4">{worker.skills}</p>
                <div className="flex items-center justify-center text-xs text-muted-foreground mb-6 bg-muted/50 dark:bg-muted/20 w-fit mx-auto px-3 py-1 rounded-full">
                  <MapPin size={12} className="mr-1 text-primary" /> {worker.loc}
                </div>

                <div className="grid grid-cols-3 gap-2 py-4 border-y border-border/50 text-center">
                  <div>
                    <span className="block font-black text-foreground text-base mb-0.5">{worker.exp}</span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{t('expYears')}</span>
                  </div>
                  <div className="border-x border-border/50">
                    <span className="flex items-center justify-center font-black text-foreground text-base mb-0.5">
                      {worker.rating} <Star size={14} fill="currentColor" className="text-amber-500 ml-1" />
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Rating</span>
                  </div>
                  <div>
                    <span className="block font-black text-foreground text-base mb-0.5">{worker.jobs}</span>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{t('jobsCompleted')}</span>
                  </div>
                </div>
              </div>

              <div className="px-8 pb-8">
                <button 
                  onClick={() => navigate('/login')} 
                  className="w-full py-4 bg-background dark:bg-muted text-foreground border border-border font-bold rounded-xl hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400 dark:hover:border-emerald-500/30 transition-colors shadow-sm"
                >
                  {t('btnViewProfile')}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
