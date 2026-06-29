import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';

export default function StatsSection() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  const stats = [
    { value: '200K+', label: t('regUsers'), color: 'from-blue-600 to-indigo-500' },
    { value: '50K+', label: t('statJobs'), color: 'from-emerald-600 to-teal-500' },
    { value: '150K+', label: 'Applications', color: 'from-amber-500 to-orange-500' },
    { value: '30+', label: t('statesCovered'), color: 'from-rose-500 to-pink-500' },
  ];

  return (
    <section id="stats" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-teal-500/10 rounded-full filter blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-muted/50 dark:bg-muted/20 text-muted-foreground text-xs font-black tracking-widest uppercase shadow-sm">
            {t('statsHeader')}
          </span>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8"
        >
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative p-8 md:p-10 bg-white/70 dark:bg-card/70 backdrop-blur-2xl rounded-[2.5rem] border border-white/40 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-500 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/[0.02] dark:to-white/[0.02] pointer-events-none -z-10" />
              
              <h4 className={`text-4xl md:text-5xl font-black bg-gradient-to-br ${stat.color} bg-clip-text text-transparent tracking-tighter mb-2 transform group-hover:scale-110 transition-transform duration-500`}>
                {stat.value}
              </h4>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-4">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
