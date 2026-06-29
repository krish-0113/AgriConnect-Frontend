import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function TestimonialsSection() {
  const { t, language } = useLanguage();
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [direction, setDirection] = useState(1);

  const testimonials = [
    {
      name: language === 'en' ? 'Gurpreet Singh' : 'गुरप्रीत सिंह',
      role: language === 'en' ? 'Wheat Farmer, Punjab' : 'गेहूं किसान, पंजाब',
      text: language === 'en' 
        ? "AgriConnect helped me hire 12 harvester operators in under 24 hours. The direct OTP verification gives me peace of mind."
        : "एग्रीकनेक्ट ने मुझे 24 घंटे से कम समय में 12 हार्वेस्टर ऑपरेटरों को नियुक्त करने में मदद की। सीधे ओटीपी सत्यापन से मुझे मानसिक शांति मिलती है。",
      rating: 5,
      avatar: 'GS'
    },
    {
      name: language === 'en' ? 'Rajesh Patil' : 'राजेश पाटिल',
      role: language === 'en' ? 'Fruit Picker, Maharashtra' : 'फल बीनने वाले, महाराष्ट्र',
      text: language === 'en'
        ? "I found consistent orchard jobs nearby with honest daily wage rates. I don't pay any broker commissions anymore!"
        : "मुझे ईमानदारी से दैनिक मजदूरी दरों के साथ पास में लगातार बाग की नौकरियां मिलीं। अब मैं किसी भी दलाल को कमीशन नहीं देता!",
      rating: 5,
      avatar: 'RP'
    },
    {
      name: language === 'en' ? 'Amit Kumar' : 'अमित कुमार',
      role: language === 'en' ? 'Tractor Driver, Haryana' : 'ट्रैक्टर चालक, हरियाणा',
      text: language === 'en'
        ? "The work logging system is simple and transparent. The farmers paid me exactly what was agreed on our log logs."
        : "कार्य लॉगिंग प्रणाली सरल और पारदर्शी है। किसानों ने मुझे ठीक उसी राशि का भुगतान किया जो हमारे लॉग में तय हुई थी。",
      rating: 5,
      avatar: 'AK'
    }
  ];

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setTestimonialIdx((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 -z-10" />
      
      <div className="max-w-4xl mx-auto px-4 text-center space-y-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black tracking-widest uppercase shadow-sm">
            {t('storiesTitle')}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
            {t('storiesSubtitle')}
          </h2>
        </motion.div>

        <div className="relative h-[400px] md:h-[350px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={testimonialIdx}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              className="absolute w-full max-w-3xl"
            >
              <div className="p-8 md:p-12 bg-white/70 dark:bg-card/70 backdrop-blur-2xl rounded-[2.5rem] border border-white/40 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative text-center">
                <Quote size={60} className="absolute top-6 left-6 text-emerald-500/10 dark:text-emerald-500/20 rotate-180" />
                
                <div className="flex justify-center space-x-1 text-amber-500 mb-6">
                  {[...Array(testimonials[testimonialIdx].rating)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                
                <p className="text-xl md:text-2xl font-medium italic text-foreground leading-relaxed mb-8">
                  &ldquo;{testimonials[testimonialIdx].text}&rdquo;
                </p>
                
                <div className="flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center font-bold text-xl mb-3 shadow-lg">
                    {testimonials[testimonialIdx].avatar}
                  </div>
                  <h4 className="font-extrabold text-lg text-foreground">{testimonials[testimonialIdx].name}</h4>
                  <p className="text-sm font-medium text-muted-foreground mt-0.5">{testimonials[testimonialIdx].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center space-x-6 mt-8"
        >
          <button 
            onClick={() => paginate(-1)} 
            className="p-4 bg-white dark:bg-card border border-border rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-500 hover:border-emerald-500/30 transition-all shadow-sm hover:shadow-md hover:scale-110 active:scale-95"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => paginate(1)} 
            className="p-4 bg-white dark:bg-card border border-border rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-500 hover:border-emerald-500/30 transition-all shadow-sm hover:shadow-md hover:scale-110 active:scale-95"
          >
            <ChevronRight size={24} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
