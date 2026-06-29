import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, Play, Phone, MessageSquare, AlertCircle, RefreshCw } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import BottomNavbar from './BottomNavbar';
import { Button } from './ui/button';

export default function Layout() {
  const [helpOpen, setHelpOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
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
      setVideoPlaying(false);
      setVideoStep(0);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-200 relative">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNavbar />

      {/* Floating HELP Trigger Button */}
      <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40">
        <button
          onClick={() => setHelpOpen(true)}
          className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 flex items-center justify-center font-black text-lg shadow-lg shadow-emerald-500/20 border-2 border-emerald-400 active:scale-95 transition-all select-none"
          title="Need Help? / सहायता"
        >
          ❓
        </button>
      </div>

      {/* Help Modal Overlay */}
      <AnimatePresence>
        {helpOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="absolute inset-0" onClick={() => { setHelpOpen(false); setVideoPlaying(false); }} />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-border p-6 rounded-3xl w-full max-w-sm space-y-6 shadow-2xl relative z-10 text-left"
            >
              <button
                onClick={() => { setHelpOpen(false); setVideoPlaying(false); }}
                className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-muted-foreground transition"
              >
                <X size={16} />
              </button>

              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-foreground flex items-center gap-1.5">
                  ❓ Need Help? / मदद चाहिए?
                </h3>
                <p className="text-xs text-muted-foreground font-semibold">
                  Select a support option below to get assistance immediately.
                </p>
              </div>

              {/* Simulated Video Player Section */}
              <AnimatePresence mode="wait">
                {videoPlaying ? (
                  <motion.div
                    key="video-player"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-slate-950 rounded-2xl overflow-hidden aspect-video border-2 border-primary relative flex flex-col justify-between p-4 text-white"
                  >
                    {/* Simulated screen graphics */}
                    <div className="flex justify-between items-center text-[10px] opacity-60 font-bold">
                      <span>🎥 TUTORIAL PLAYING</span>
                      <span>STEP {videoStep + 1}/4</span>
                    </div>

                    {/* Simulation animation and illustration */}
                    <div className="flex-1 flex flex-col items-center justify-center space-y-2 py-3">
                      <div className="w-8 h-8 rounded-full border-2 border-emerald-500 flex items-center justify-center bg-emerald-500/10 text-emerald-400 font-bold text-sm animate-pulse">
                        A
                      </div>
                      <span className="text-[10px] tracking-widest text-emerald-400 font-extrabold uppercase animate-pulse">Simulating Interface...</span>
                    </div>

                    {/* Bilingual narration sub-captions */}
                    <div className="bg-black/80 p-2.5 rounded-xl border border-white/10 space-y-1 text-center select-none">
                      <p className="text-[11px] font-bold leading-normal">{videoTutorialSteps[videoStep].text}</p>
                      <p className="text-[10px] text-emerald-400 font-semibold leading-normal">🇮🇳 {videoTutorialSteps[videoStep].textHi}</p>
                    </div>

                    <div className="flex justify-between items-center pt-2 mt-2 border-t border-white/5">
                      <button
                        onClick={() => { setVideoPlaying(false); setVideoStep(0); }}
                        className="text-[10px] text-slate-400 hover:text-white font-bold"
                      >
                        Stop
                      </button>

                      <button
                        onClick={handleNextVideoStep}
                        className="px-3 py-1 bg-emerald-500 text-slate-950 text-[10px] font-black rounded-lg hover:bg-emerald-400 transition"
                      >
                        {videoStep === videoTutorialSteps.length - 1 ? 'Finish' : 'Next ➡️'}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {/* Watch video guide */}
                    <button
                      onClick={() => setVideoPlaying(true)}
                      className="w-full p-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:to-amber-500 text-slate-955 font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-amber-500/10 active:scale-98 transition"
                    >
                      <Play size={16} fill="currentColor" /> Watch Video Tutorial / वीडियो देखें
                    </button>

                    {/* Call helpline */}
                    <a
                      href="tel:18001801551"
                      className="w-full p-4 border border-border bg-slate-50 dark:bg-slate-800 text-foreground font-black text-sm rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-100 transition"
                    >
                      <Phone size={16} /> Call Support / कॉल करें
                    </a>

                    {/* Chat Support */}
                    <button
                      onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                      className="w-full p-4 border border-border bg-slate-50 dark:bg-slate-800 text-foreground font-black text-sm rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-100 transition"
                    >
                      <MessageSquare size={16} /> Chat on WhatsApp / चैट करें
                    </button>
                  </div>
                )}
              </AnimatePresence>

              {/* Safety Helpline disclaimer */}
              <div className="flex items-start gap-2 text-[10px] text-muted-foreground font-semibold bg-slate-50 dark:bg-slate-800/40 p-3 rounded-2xl border border-border">
                <AlertCircle size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                <p>Support is available daily 9 AM - 6 PM. Emergency calls are directed immediately to state agencies.</p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
