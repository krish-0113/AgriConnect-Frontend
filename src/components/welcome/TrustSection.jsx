import { CheckCircle2, Shield, Zap, Lock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';

export default function TrustSection() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 20 } }
  };

  const trustItems = [
    { icon: <Shield size={16} />, label: t('trustSec') },
    { icon: <CheckCircle2 size={16} />, label: t('trustVer') },
    { icon: <Zap size={16} />, label: t('trustFast') },
    { icon: <Lock size={16} />, label: t('trustOtp') },
  ];

  return (
    <section className="py-12 bg-muted/10 dark:bg-background border-y border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-8"
        >
          {t('trustTitle')}
        </motion.p>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
        >
          {trustItems.map((item, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center space-x-2 bg-white/60 dark:bg-card/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-border shadow-sm text-foreground font-semibold text-sm cursor-default transition-shadow hover:shadow-md hover:border-primary/30"
            >
              <span className="text-emerald-500">{item.icon}</span>
              <span>{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
