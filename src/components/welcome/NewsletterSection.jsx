import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../common/Toast';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';

export default function NewsletterSection() {
  const { t } = useLanguage();
  const toast = useToast();

  return (
    <section id="newsletter" className="py-24 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        className="max-w-5xl mx-auto relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-emerald-950 to-teal-950 text-white shadow-2xl shadow-emerald-900/20"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/20 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />

        <div className="relative z-10 px-6 py-20 md:py-24 text-center space-y-8">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl mx-auto flex items-center justify-center shadow-inner border border-white/20">
            <Mail size={32} className="text-emerald-300" />
          </div>
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              {t('newsTitle')}
            </h2>
            <p className="text-emerald-100/80 text-lg md:text-xl font-medium">
              Get seasonal guidelines, daily wage listings, and news directly in your inbox.
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); toast.success('Subscribed successfully!'); }} className="max-w-md mx-auto relative group">
            <div className="absolute inset-0 bg-white/20 rounded-full filter blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <div className="relative flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-xl p-2 rounded-[2rem] border border-white/20 shadow-xl">
              <input
                type="email"
                placeholder={t('newsPlaceholder')}
                required
                className="flex-1 bg-transparent border-none px-6 py-3 text-white placeholder:text-white/50 focus:ring-0 outline-none font-medium"
              />
              <button
                type="submit"
                className="group/btn relative overflow-hidden bg-white text-emerald-950 px-8 py-3 rounded-full font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
              >
                <span className="relative z-10 flex items-center">
                  {t('btnSubscribe')} <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
