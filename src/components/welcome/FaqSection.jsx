import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function FaqSection() {
  const { t } = useLanguage();
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { id: 1, q: t('q1'), a: t('a1') },
    { id: 2, q: t('q2'), a: t('a2') },
    { id: 3, q: t('q3'), a: t('a3') },
  ];

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-background border-y border-border/50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full filter blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto px-4 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary text-xs font-black tracking-widest uppercase shadow-sm">
            {t('faqTitle')}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
            {t('faqSubtitle')}
          </h2>
        </motion.div>

        <div className="text-left space-y-4">
          {faqs.map((faq, index) => {
            const isActive = activeFaq === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white dark:bg-card border rounded-[1.5rem] overflow-hidden transition-all duration-300 ${
                  isActive 
                    ? 'border-primary/40 shadow-md shadow-primary/5 dark:shadow-primary/10' 
                    : 'border-border shadow-sm hover:border-border/80 hover:shadow-md'
                }`}
              >
                <button
                  onClick={() => setActiveFaq(isActive ? null : faq.id)}
                  className="w-full px-6 py-5 md:py-6 font-extrabold text-foreground text-left flex justify-between items-center bg-transparent group"
                >
                  <span className={`text-base md:text-lg tracking-tight transition-colors ${isActive ? 'text-primary' : 'group-hover:text-primary/80'}`}>
                    {faq.q}
                  </span>
                  <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-primary text-white' : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'}`}>
                    <ChevronDown size={18} className={`transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 text-sm md:text-base text-muted-foreground font-medium leading-relaxed bg-gradient-to-b from-transparent to-muted/20 dark:to-muted/10 border-t border-border/50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
