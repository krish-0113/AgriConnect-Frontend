import { Sprout, Users, MapPin, Briefcase } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';

export default function FeaturesSection() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  const features = [
    {
      id: 1,
      icon: <Sprout size={24} />,
      bg: "bg-emerald-500",
      title: t('featJobPost'),
      desc: t('featJobPostDesc')
    },
    {
      id: 2,
      icon: <Users size={24} />,
      bg: "bg-blue-500",
      title: t('featSearch'),
      desc: t('featSearchDesc')
    },
    {
      id: 3,
      icon: <MapPin size={24} />,
      bg: "bg-rose-500",
      title: t('featLocation'),
      desc: t('featLocationDesc')
    },
    {
      id: 4,
      icon: <Briefcase size={24} />,
      bg: "bg-amber-500",
      title: t('featChat'),
      desc: t('featChatDesc')
    }
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-white dark:bg-background border-y border-border/50">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full filter blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full filter blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-4 max-w-3xl mx-auto"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary text-xs font-black tracking-widest uppercase shadow-sm">
            {t('featuresTitle')}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
            {t('featuresSubtitle')}
          </h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-left"
        >
          {features.map((feat) => (
            <motion.div 
              key={feat.id}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -8 }}
              className="group relative p-8 bg-white dark:bg-card/40 backdrop-blur-md rounded-[2rem] border border-border/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:border-primary/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/[0.01] dark:to-white/[0.01] rounded-[2rem] pointer-events-none" />
              
              <div className={`w-14 h-14 rounded-2xl ${feat.bg} text-white flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                {feat.icon}
              </div>
              <h3 className="font-extrabold text-xl text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors">
                {feat.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
