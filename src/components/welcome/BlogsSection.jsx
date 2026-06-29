import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, User } from 'lucide-react';

export default function BlogsSection() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  const blogs = [
    {
      tag: '🌱 Crop Care',
      title: 'Maximizing Wheat Yields in North India',
      desc: 'Discover modern organic fertilizing techniques and optimal water schedules for winter wheat crops.',
      readTime: '5 min read',
      author: 'Dr. S. K. Verma'
    },
    {
      tag: '💧 Irrigation',
      title: 'Understanding Smart Drip Irrigation',
      desc: 'Save up to 40% water using localized drip pipes configured dynamically to local moisture logs.',
      readTime: '4 min read',
      author: 'Priya Sharma'
    },
    {
      tag: '🚜 Machinery',
      title: 'Essential Tractor Maintenance Guide',
      desc: 'Keep your harvester and tractor equipment healthy before pre-sowing seasonal work loads start.',
      readTime: '7 min read',
      author: 'Ravi Tech'
    }
  ];

  return (
    <section id="blogs" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full filter blur-[150px] pointer-events-none -z-10" />

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
              {t('blogsTitle')}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
              {t('blogsSubtitle')}
            </h2>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {blogs.map((blog, idx) => (
            <motion.div 
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group bg-white dark:bg-card rounded-[2rem] border border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:border-emerald-500/30 transition-all duration-500 overflow-hidden flex flex-col"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 z-10" />
                <img 
                  src={`https://images.unsplash.com/photo-1592982537447-6b2a0c64c1f9?auto=format&fit=crop&q=80&w=800&h=400&sig=${idx}`} 
                  alt={blog.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-white/90 dark:bg-card/90 backdrop-blur-md rounded-full text-xs font-bold text-foreground shadow-sm">
                    {blog.tag}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center space-x-4 text-xs font-medium text-muted-foreground mb-4">
                  <span className="flex items-center"><Clock size={14} className="mr-1 text-emerald-500" /> {blog.readTime}</span>
                  <span className="flex items-center"><User size={14} className="mr-1 text-teal-500" /> {blog.author}</span>
                </div>
                
                <h4 className="font-extrabold text-xl text-foreground mb-3 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {blog.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium mb-8 flex-1">
                  {blog.desc}
                </p>
                
                <a href="#" className="inline-flex items-center text-sm font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Read Article <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
