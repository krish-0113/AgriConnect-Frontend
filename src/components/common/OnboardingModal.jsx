import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronRight, ChevronLeft, X, Sparkles, ShieldCheck, PlusCircle, Search, Phone, Star, Play, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';

export default function OnboardingModal({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [videoStep, setVideoStep] = useState(0);

  const videoTutorialSteps = [
    { text: "Welcome to AgriConnect! Let's learn how to post and find jobs.", textHi: "एग्रीकनेक्ट में आपका स्वागत है! आइए सीखें काम कैसे ढूंढे या दर्ज करें।" },
    { text: "Farmers can click 'Post Job' and choose crop card tags instantly.", textHi: "किसान 'Post Job' पर टैप करें और फसल कार्ड तुरंत चुनें।" },
    { text: "Workers can browse recommended jobs and apply with one tap.", textHi: "मजदूर आस-पास के काम देखें और १-क्लिक में आवेदन करें।" },
    { text: "Confirm payment and share ratings. Use SOS button in case of threat.", textHi: "काम पूरा होने पर भुगतान की पुष्टि करें। संकट में SOS दबाएं।" }
  ];

  const handleNextVideoStep = () => {
    if (videoStep < videoTutorialSteps.length - 1) {
      setVideoStep(prev => prev + 1);
    } else {
      setIsPlayingVideo(false);
      setVideoStep(0);
    }
  };

  if (!isOpen) return null;

  const slides = [
    {
      title: '🎥 Watch Demo Video / वीडियो गाइड',
      titleHi: 'How AgriConnect works',
      icon: Play,
      color: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      description: 'Before you start, watch this 1-minute video demonstration to learn how to hire and find jobs.',
      descriptionHi: 'ऐप का उपयोग शुरू करने से पहले, यह १-मिनट का वीडियो गाइड देखें।',
      isVideo: true
    },
    {
      title: 'Welcome to AgriConnect 🌾',
      titleHi: 'एग्रीकनेक्ट में आपका स्वागत है 🌾',
      icon: Sparkles,
      color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      description: 'Connect directly with local farm owners and skilled agricultural workers. Zero commission fee, zero brokers.',
      descriptionHi: 'स्थानीय खेत मालिकों और कुशल कृषि मजदूरों से सीधे जुड़ें। शून्य कमीशन शुल्क, शून्य बिचौलिया।',
    },
    {
      title: 'Complete Your Profile 👤',
      titleHi: 'अपनी प्रोफाइल पूरी करें 👤',
      icon: ShieldCheck,
      color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      description: 'List your skills, location, experience, and get verified to gain trust and unlock better daily wage opportunities.',
      descriptionHi: 'अपने कौशल, स्थान, अनुभव को सूचीबद्ध करें और भरोसा जीतने के लिए सत्यापित (verify) करवाएं।',
    },
    {
      title: 'Post Farm Jobs 🚜',
      titleHi: 'कृषि कार्य दर्ज करें 🚜',
      icon: PlusCircle,
      color: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
      description: 'Farmers can post job openings in seconds using our visual crop selector wizard. Just select the crop, work type, and wage presets.',
      descriptionHi: 'किसान फसल चयन विज़ार्ड का उपयोग करके सेकंडों में काम पोस्ट कर सकते हैं। बस फसल, काम और मजदूरी चुनें।',
    },
    {
      title: 'Apply in 1-Tap ⚡',
      titleHi: '१-क्लिक में आवेदन करें ⚡',
      icon: Search,
      color: 'bg-sky-500/10 text-sky-500 border-sky-500/20',
      description: 'Workers can browse local village jobs and apply immediately with a single tap. No complex resume files required.',
      descriptionHi: 'मजदूर अपने गांव के आस-पास के कामों को देख सकते हैं और एक क्लिक में आवेदन कर सकते हैं। किसी दस्तावेज़ की ज़रूरत नहीं है।',
    },
    {
      title: 'Direct Phone Calling 📞',
      titleHi: 'सीधे फोन पर बात करें 📞',
      icon: Phone,
      color: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      description: 'Tap the green Call Now button to call the worker or farmer directly on their mobile number. Fast coordination.',
      descriptionHi: 'मजदूर या खेत मालिक को उनके मोबाइल नंबर पर सीधे कॉल करने के लिए हरे "Call Now" बटन पर टैप करें।',
    }
  ];

  const handleNext = () => {
    setIsPlayingVideo(false);
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      localStorage.setItem('seenOnboarding', 'true');
      onClose();
    }
  };

  const handleBack = () => {
    setIsPlayingVideo(false);
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const SlideIcon = slides[currentSlide].icon;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      {/* Backdrop click close */}
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-slate-900 border border-border p-6 rounded-3xl w-full max-w-sm space-y-6 shadow-2xl relative z-10"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-primary flex items-center gap-1">
            <HelpCircle size={14} /> Help Guide / मार्गदर्शिका
          </span>
          <button
            onClick={() => {
              localStorage.setItem('seenOnboarding', 'true');
              onClose();
            }}
            className="p-1 text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Slide Visual Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-center py-2 space-y-4 flex flex-col items-center"
          >
            {slides[currentSlide].isVideo && isPlayingVideo ? (
              /* Simulated Video Player */
              <div className="bg-slate-950 rounded-2xl overflow-hidden aspect-video border-2 border-primary w-full relative flex flex-col justify-between p-4 text-white">
                <div className="flex justify-between items-center text-[9px] opacity-60 font-bold">
                  <span>🎥 TUTORIAL SCREEN</span>
                  <span>SCENE {videoStep + 1}/4</span>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center space-y-1 py-3">
                  <div className="w-8 h-8 rounded-full border-2 border-emerald-500 flex items-center justify-center bg-emerald-500/10 text-emerald-400 font-bold text-sm animate-pulse">
                    A
                  </div>
                  <span className="text-[10px] tracking-widest text-emerald-400 font-extrabold uppercase animate-pulse">Simulating...</span>
                </div>

                <div className="bg-black/90 p-2.5 rounded-xl border border-white/10 space-y-1 text-center select-none">
                  <p className="text-[11px] font-bold leading-normal">{videoTutorialSteps[videoStep].text}</p>
                  <p className="text-[10px] text-emerald-400 font-semibold leading-normal">🇮🇳 {videoTutorialSteps[videoStep].textHi}</p>
                </div>

                <div className="flex justify-between items-center pt-2 mt-1 border-t border-white/5">
                  <button
                    onClick={() => { setIsPlayingVideo(false); setVideoStep(0); }}
                    className="text-[9px] text-slate-400 hover:text-white font-bold"
                  >
                    Stop
                  </button>

                  <button
                    onClick={handleNextVideoStep}
                    className="px-3 py-1 bg-emerald-500 text-slate-950 text-[9px] font-black rounded-lg hover:bg-emerald-400 transition"
                  >
                    {videoStep === videoTutorialSteps.length - 1 ? 'Finish' : 'Next ➡️'}
                  </button>
                </div>
              </div>
            ) : (
              /* Default Slide Info layout */
              <div className="flex flex-col items-center space-y-4">
                <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center shadow-sm ${slides[currentSlide].color}`}>
                  <SlideIcon size={32} />
                </div>

                <div className="space-y-1">
                  <h2 className="text-lg font-black text-foreground leading-tight">{slides[currentSlide].title}</h2>
                  <h3 className="text-sm font-semibold text-primary">{slides[currentSlide].titleHi}</h3>
                </div>

                <div className="space-y-3 px-2">
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                    {slides[currentSlide].description}
                  </p>
                  <p className="text-xs text-foreground font-semibold leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3 rounded-2xl border border-border">
                    🇮🇳 {slides[currentSlide].descriptionHi}
                  </p>
                </div>

                {slides[currentSlide].isVideo && (
                  <button
                    onClick={() => setIsPlayingVideo(true)}
                    className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:to-amber-500 text-slate-955 font-black text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-amber-500/10 active:scale-95 transition"
                  >
                    <Play size={14} fill="currentColor" /> Play Tutorial Video / वीडियो चलाएं
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators (Dots) */}
        <div className="flex items-center justify-center gap-1.5 py-1">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-350 ${idx === currentSlide ? 'w-6 bg-primary' : 'w-2 bg-muted'
                }`}
            />
          ))}
        </div>

        {/* Control navigation triggers */}
        <div className="flex items-center gap-3">
          {currentSlide > 0 && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="h-12 px-4 rounded-xl flex-shrink-0"
            >
              <ChevronLeft size={18} />
            </Button>
          )}

          <Button
            onClick={handleNext}
            className="flex-grow h-12 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl flex items-center justify-center gap-1 shadow-md shadow-emerald-500/10 active:scale-95 transition"
          >
            {currentSlide === slides.length - 1 ? 'Start Using App 🚀' : 'Next Step'}
            {currentSlide < slides.length - 1 && <ChevronRight size={18} />}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
