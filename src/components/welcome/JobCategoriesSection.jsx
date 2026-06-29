import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';

export default function JobCategoriesSection() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 15 } }
  };

  const categories = [
    { emoji: '🌾', label: t('catHarvest'), count: '1,240', color: 'bg-emerald-500/10 hover:bg-emerald-500/20', shadow: 'hover:shadow-emerald-500/20' },
    { emoji: '🌱', label: t('catPlant'), count: '850', color: 'bg-green-500/10 hover:bg-green-500/20', shadow: 'hover:shadow-green-500/20' },
    { emoji: '💧', label: t('catIrrig'), count: '420', color: 'bg-cyan-500/10 hover:bg-cyan-500/20', shadow: 'hover:shadow-cyan-500/20' },
    { emoji: '💨', label: t('catSpray'), count: '610', color: 'bg-slate-500/10 hover:bg-slate-500/20', shadow: 'hover:shadow-slate-500/20' },
    { emoji: '🚜', label: t('catTractor'), count: '1,050', color: 'bg-amber-500/10 hover:bg-amber-500/20', shadow: 'hover:shadow-amber-500/20' },
    { emoji: '🍎', label: t('catPick'), count: '300', color: 'bg-red-500/10 hover:bg-red-500/20', shadow: 'hover:shadow-red-500/20' },
  ];

  return (
    <section id="categories" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full filter blur-[200px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-4 max-w-3xl mx-auto"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black tracking-widest uppercase shadow-sm">
            {t('catTitle')}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
            {t('catSubtitle')}
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pt-4 text-center"
        >
          {categories.map((cat, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`p-6 bg-white/60 dark:bg-card/60 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center justify-center space-y-3 group ${cat.shadow}`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-2 transition-colors duration-300 ${cat.color} group-hover:scale-110 group-hover:-rotate-3`}>
                {cat.emoji}
              </div>
              <div>
                <h4 className="font-extrabold text-sm md:text-base text-foreground tracking-tight">{cat.label}</h4>
                <span className="text-xs text-muted-foreground font-semibold bg-muted/50 px-2 py-1 rounded-full inline-block mt-1">{cat.count} Jobs</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
