import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';
import { Apple, Play, BellRing, CheckCircle2, Star } from 'lucide-react';

export default function MobileAppSection() {
  const { t } = useLanguage();

  return (
    <section id="mobile-app" className="py-24 relative overflow-hidden bg-emerald-500/5 dark:bg-background border-y border-border/50">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Texts */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 text-left space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-[1.1]">
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">AgriConnect</span><br />
              in your pocket.
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed max-w-xl">
              {t('appSubtitle')} Get instant job alerts, verify payments, and connect with workers on the go.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#" className="group relative inline-flex items-center justify-center px-6 py-4 bg-foreground text-background font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl">
                <Play size={20} className="mr-2" />
                <span>{t('downloadPlay')}</span>
              </a>
              <a href="#" className="group inline-flex items-center justify-center px-6 py-4 bg-white/50 dark:bg-card/50 backdrop-blur-md border border-border text-foreground font-bold rounded-2xl hover:bg-white/80 dark:hover:bg-card/80 transition-all hover:scale-105 active:scale-95 shadow-sm">
                <Apple size={20} className="mr-2" />
                <span>{t('downloadAppStore')}</span>
              </a>
            </div>
            
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex -space-x-3">
                {[1,2,3,4].map((i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden z-[${4-i}]`}>
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=e2e8f0`} alt="user" />
                  </div>
                ))}
              </div>
              <div className="text-sm font-medium">
                <div className="flex text-amber-500"><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/></div>
                <span className="text-muted-foreground">4.9/5 from 10k+ reviews</span>
              </div>
            </div>
          </motion.div>

          {/* Right Phone preview placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="lg:col-span-6 relative flex justify-center perspective-[1000px] mt-10 lg:mt-0"
          >
            {/* Main Phone */}
            <div className="w-[280px] h-[580px] border-[10px] border-slate-900 dark:border-white/10 rounded-[3rem] bg-slate-50 dark:bg-card relative shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] p-4 flex flex-col transform-gpu hover:-rotate-2 hover:scale-105 transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 dark:bg-white/10 rounded-b-3xl z-20" />
              
              <div className="flex-1 overflow-hidden relative rounded-[2rem] bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/20 dark:to-background border border-border/50">
                <div className="pt-16 pb-8 flex flex-col items-center justify-center h-full space-y-6">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-white font-black text-4xl shadow-xl shadow-emerald-500/20"
                  >
                    A
                  </motion.div>
                  <div className="text-center">
                    <h5 className="font-black text-xl text-foreground">AgriConnect</h5>
                    <p className="text-xs font-semibold text-muted-foreground mt-1">Live hiring matched</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Notification 1 */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-20 -left-12 md:-left-20 bg-white/90 dark:bg-card/90 backdrop-blur-md border border-border p-4 rounded-2xl shadow-xl flex items-start space-x-3 w-64 z-30"
            >
              <div className="bg-emerald-500/10 p-2 rounded-xl text-emerald-500 mt-1">
                <BellRing size={18} />
              </div>
              <div>
                <span className="font-extrabold block text-sm text-foreground">New Job Match!</span>
                <span className="text-xs text-muted-foreground font-medium">Tractor Operator needed in Sangrur. ₹800/day.</span>
              </div>
            </motion.div>

            {/* Floating Notification 2 */}
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-32 -right-8 md:-right-16 bg-white/90 dark:bg-card/90 backdrop-blur-md border border-border p-4 rounded-2xl shadow-xl flex items-start space-x-3 w-56 z-30"
            >
              <div className="bg-blue-500/10 p-2 rounded-xl text-blue-500 mt-1">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <span className="font-extrabold block text-sm text-foreground">Payment Verified</span>
                <span className="text-xs text-muted-foreground font-medium">₹1200 transferred to Gurnam S.</span>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
