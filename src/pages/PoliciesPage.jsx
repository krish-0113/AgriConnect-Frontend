import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, FileText, HeartHandshake, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PoliciesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('safety');

  const tabs = [
    { id: 'safety', label: 'Safety Guidelines', icon: Shield },
    { id: 'responsibilities', label: 'Responsibilities', icon: HeartHandshake },
    { id: 'terms', label: 'Terms & Conditions', icon: FileText },
    { id: 'privacy', label: 'Privacy Policy', icon: Eye }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 pt-4">
      <div className="max-w-xl mx-auto px-4 space-y-6">
        
        {/* Back navigation */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 p-2.5 bg-white dark:bg-slate-800 rounded-2xl border border-border/80 text-foreground hover:bg-muted active:scale-95 transition shadow-sm font-bold text-sm"
        >
          <ArrowLeft size={16} />
          Go Back
        </button>

        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-black text-foreground">AgriConnect Policies</h1>
          <p className="text-xs text-muted-foreground font-semibold">Rules and guidelines for verified agricultural operations</p>
        </div>

        {/* Tab filters */}
        <div className="flex bg-white dark:bg-slate-900 border border-border p-1 rounded-2xl shadow-sm overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-grow py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 active:scale-95 ${
                  isSelected
                    ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon size={13} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab contents */}
        <div className="bg-white dark:bg-slate-900 border border-border rounded-3xl p-6 shadow-sm min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeTab === 'safety' && (
              <motion.div
                key="safety"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 text-xs leading-relaxed text-muted-foreground font-medium"
              >
                <h3 className="text-sm font-black text-foreground uppercase tracking-widest border-b border-border pb-2">🛡️ Field Safety Guidelines</h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-xl space-y-1">
                    <p className="font-bold text-foreground">1. SOS Emergency Button</p>
                    <p>In case of physical threat, harassment, or workplace accidents, tap the red SOS button immediately on the active job screen. Emergency coordinates will be shared with authorities.</p>
                  </div>
                  
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1">
                    <p className="font-bold text-foreground">2. Safe Working Conditions</p>
                    <p>Farmers must supply adequate drinking water, first-aid support, and rest shade. Working under heavy pesticides without safety masks is strictly prohibited.</p>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1">
                    <p className="font-bold text-foreground">3. Anti-Harassment Policy</p>
                    <p>AgriConnect does not tolerate discrimination based on caste, gender, region, or religion. Immediate platform ban will follow violations.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'responsibilities' && (
              <motion.div
                key="responsibilities"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 text-xs leading-relaxed text-muted-foreground font-medium"
              >
                <h3 className="text-sm font-black text-foreground uppercase tracking-widest border-b border-border pb-2">🤝 User Responsibilities</h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-1">
                    <p className="font-bold text-foreground">Farmer Responsibilities:</p>
                    <ul className="list-disc pl-4 space-y-1 mt-1">
                      <li>Clear daily wages in full immediately upon job completion checkmark.</li>
                      <li>Post accurate wages and work timings on listings. Do not lower wages post-arrival.</li>
                      <li>Confirm worker attendance on arrival to start the safety log.</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1">
                    <p className="font-bold text-foreground">Worker Responsibilities:</p>
                    <ul className="list-disc pl-4 space-y-1 mt-1">
                      <li>Report to fields on time as promised in accepted assignments.</li>
                      <li>Handle machinery and crops carefully, following farmer instructions.</li>
                      <li>Maintain profile details and mobile status updated.</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'terms' && (
              <motion.div
                key="terms"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 text-xs leading-relaxed text-muted-foreground font-medium"
              >
                <h3 className="text-sm font-black text-foreground uppercase tracking-widest border-b border-border pb-2">📋 Terms of Service</h3>
                <p>By registering on AgriConnect, you agree that you are entering into a direct contract with the counterparty (worker or farmer). AgriConnect is a zero-commission listing platform and is not liable for fields accidents, payments disputes, or worker performance. You agree to submit genuine Aadhaar credentials for verification checks.</p>
              </motion.div>
            )}

            {activeTab === 'privacy' && (
              <motion.div
                key="privacy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 text-xs leading-relaxed text-muted-foreground font-medium"
              >
                <h3 className="text-sm font-black text-foreground uppercase tracking-widest border-b border-border pb-2">🔒 Privacy Policy</h3>
                <p>We respect your details. Your Aadhaar photo and identification numbers are processed securely for verification and are never shared publicly. Farmers will see your contact details only after you apply or accept a booking offer. Location details are accessed solely for field mapping and SOS services.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
