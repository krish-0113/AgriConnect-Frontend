import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, DollarSign } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../common/Toast';
import { motion } from 'framer-motion';

export default function SearchSection() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const toast = useToast();

  const [searchLoc, setSearchLoc] = useState('');
  const [searchSkill, setSearchSkill] = useState('');
  const [searchSalary, setSearchSalary] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    toast.info(
      language === 'en'
        ? `Searching for jobs in ${searchLoc || 'Anywhere'} matching "${searchSkill || 'Any skill'}"`
        : `${searchLoc || 'कहीं भी'} में "${searchSkill || 'कोई भी कौशल'}" नौकरियों की खोज की जा रही है`
    );
    navigate('/jobs');
  };

  return (
    <section id="search" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20 -z-10" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary text-xs font-black tracking-widest uppercase shadow-sm">{t('searchHeader')}</span>
        </motion.div>
        
        <motion.form 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
          onSubmit={handleSearchSubmit} 
          className="relative group max-w-5xl mx-auto bg-white/80 dark:bg-card/80 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)] rounded-[2rem] p-3 transition-all duration-500"
        >
          {/* Subtle gradient border effect on hover */}
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center text-left">
            <div className="md:col-span-3 relative h-full">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                <MapPin size={18} />
              </div>
              <input
                type="text"
                placeholder={language === 'en' ? 'Location...' : 'स्थान...'}
                value={searchLoc}
                onChange={(e) => setSearchLoc(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-transparent border-none focus:ring-0 text-sm font-semibold placeholder:text-muted-foreground/70 outline-none"
              />
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-border" />
            </div>

            <div className="md:col-span-4 relative h-full">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder={language === 'en' ? 'Job title or skill...' : 'नौकरी का शीर्षक...'}
                value={searchSkill}
                onChange={(e) => setSearchSkill(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-transparent border-none focus:ring-0 text-sm font-semibold placeholder:text-muted-foreground/70 outline-none"
              />
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-border" />
            </div>

            <div className="md:col-span-3 relative h-full">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                <DollarSign size={18} />
              </div>
              <input
                type="number"
                placeholder={language === 'en' ? 'Min salary...' : 'न्यूनतम वेतन...'}
                value={searchSalary}
                onChange={(e) => setSearchSalary(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-transparent border-none focus:ring-0 text-sm font-semibold placeholder:text-muted-foreground/70 outline-none"
              />
            </div>

            <div className="md:col-span-2 h-full">
              <button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-[1.5rem] hover:scale-105 active:scale-95 transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center space-x-2"
              >
                <span>{t('btnSearchJobs')}</span>
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
