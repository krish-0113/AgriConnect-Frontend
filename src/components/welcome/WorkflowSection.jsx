import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';
import { Tractor, Users, PlusCircle, Search, UserCheck, CheckCircle2, DollarSign, Wallet } from 'lucide-react';

export default function WorkflowSection() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
  };

  const farmerSteps = [
    { title: t('fStep1'), desc: t('fStep1Desc'), icon: <PlusCircle size={20} /> },
    { title: t('fStep2'), desc: t('fStep2Desc'), icon: <UserCheck size={20} /> },
    { title: t('fStep3'), desc: t('fStep3Desc'), icon: <CheckCircle2 size={20} /> },
    { title: t('fStep4'), desc: t('fStep4Desc'), icon: <Wallet size={20} /> },
  ];

  const workerSteps = [
    { title: t('wStep1'), desc: t('wStep1Desc'), icon: <UserCheck size={20} /> },
    { title: t('wStep2'), desc: t('wStep2Desc'), icon: <Search size={20} /> },
    { title: t('wStep3'), desc: t('wStep3Desc'), icon: <CheckCircle2 size={20} /> },
    { title: t('wStep4'), desc: t('wStep4Desc'), icon: <DollarSign size={20} /> },
  ];

  return (
    <section id="workflow" className="py-24 relative overflow-hidden bg-muted/5 dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-4 max-w-3xl mx-auto"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black tracking-widest uppercase shadow-sm">
            {t('workflowTitle')}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
            {t('workflowSubtitle')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 text-left">
          
          {/* Farmer Workflow */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative bg-white/60 dark:bg-card/60 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-white/40 dark:border-white/10 shadow-xl shadow-emerald-500/5 group hover:border-emerald-500/30 transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-[2.5rem] pointer-events-none" />
            
            <div className="flex items-center space-x-4 mb-10 pb-6 border-b border-border/50 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner">
                <Tractor size={24} />
              </div>
              <h3 className="font-extrabold text-2xl text-foreground tracking-tight">
                {t('farmerFlow')}
              </h3>
            </div>
            
            <div className="relative pl-8 space-y-10 border-l-2 border-dashed border-emerald-500/20 z-10">
              {farmerSteps.map((step, idx) => (
                <motion.div key={idx} variants={itemVariants} className="relative group/step">
                  <span className="absolute -left-[2.85rem] top-0 w-10 h-10 rounded-2xl bg-white dark:bg-card border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-md group-hover/step:scale-110 group-hover/step:bg-emerald-500 group-hover/step:text-white transition-all duration-300">
                    {step.icon}
                  </span>
                  <div className="bg-white/50 dark:bg-card/50 backdrop-blur-sm border border-border/50 p-5 rounded-2xl shadow-sm group-hover/step:shadow-md group-hover/step:-translate-y-1 transition-all duration-300">
                    <h4 className="font-bold text-foreground text-lg mb-1 tracking-tight">{step.title}</h4>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Worker Workflow */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative bg-white/60 dark:bg-card/60 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-white/40 dark:border-white/10 shadow-xl shadow-teal-500/5 group hover:border-teal-500/30 transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent rounded-[2.5rem] pointer-events-none" />
            
            <div className="flex items-center space-x-4 mb-10 pb-6 border-b border-border/50 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shadow-inner">
                <Users size={24} />
              </div>
              <h3 className="font-extrabold text-2xl text-foreground tracking-tight">
                {t('workerFlow')}
              </h3>
            </div>
            
            <div className="relative pl-8 space-y-10 border-l-2 border-dashed border-teal-500/20 z-10">
              {workerSteps.map((step, idx) => (
                <motion.div key={idx} variants={itemVariants} className="relative group/step">
                  <span className="absolute -left-[2.85rem] top-0 w-10 h-10 rounded-2xl bg-white dark:bg-card border-2 border-teal-500 text-teal-600 dark:text-teal-400 flex items-center justify-center shadow-md group-hover/step:scale-110 group-hover/step:bg-teal-500 group-hover/step:text-white transition-all duration-300">
                    {step.icon}
                  </span>
                  <div className="bg-white/50 dark:bg-card/50 backdrop-blur-sm border border-border/50 p-5 rounded-2xl shadow-sm group-hover/step:shadow-md group-hover/step:-translate-y-1 transition-all duration-300">
                    <h4 className="font-bold text-foreground text-lg mb-1 tracking-tight">{step.title}</h4>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
