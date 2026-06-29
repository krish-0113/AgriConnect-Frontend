import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';
import { Target, Eye, AlertTriangle, Lightbulb } from 'lucide-react';

export default function AboutSection() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  const aboutCards = [
    {
      id: 1,
      icon: <Target className="text-emerald-500" size={24} />,
      bg: "bg-emerald-500/10",
      title: t('missionTitle'),
      desc: t('missionDesc')
    },
    {
      id: 2,
      icon: <Eye className="text-blue-500" size={24} />,
      bg: "bg-blue-500/10",
      title: t('visionTitle'),
      desc: t('visionDesc')
    },
    {
      id: 3,
      icon: <AlertTriangle className="text-rose-500" size={24} />,
      bg: "bg-rose-500/10",
      title: t('problemTitle'),
      desc: t('problemDesc')
    },
    {
      id: 4,
      icon: <Lightbulb className="text-amber-500" size={24} />,
      bg: "bg-amber-500/10",
      title: t('solutionTitle'),
      desc: t('solutionDesc')
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-primary/5 rounded-full filter blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-4 max-w-3xl mx-auto"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary text-xs font-black tracking-widest uppercase shadow-sm">
            {t('aboutTitle')}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
            {t('aboutSubtitle')}
          </h2>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto text-left"
        >
          {aboutCards.map((card) => (
            <motion.div 
              key={card.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative p-8 bg-white/70 dark:bg-card/70 backdrop-blur-xl rounded-[2rem] border border-white/20 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/[0.02] dark:to-white/[0.02] pointer-events-none -z-10" />
              
              <div className="flex items-start space-x-5">
                <div className={`w-14 h-14 rounded-2xl ${card.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  {card.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="font-extrabold text-xl text-foreground tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-medium">
                    {card.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
