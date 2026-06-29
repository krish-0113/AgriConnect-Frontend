import React, { useState } from 'react';
import { ShieldCheck, UserCheck, Phone, Check, AlertTriangle, AlertCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from './common/Toast';

export default function TrustScoreCard({
  score = 92,
  aadhaarVerified = true,
  mobileVerified = true,
  profileCompleted = true,
  userName = 'User',
  onReportSubmit
}) {
  const toast = useToast();
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportDetails, setReportDetails] = useState('');

  // Calculate score category
  const getScoreCategory = (val) => {
    if (val >= 80) return { label: 'Excellent / बहुत बढ़िया', color: 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10' };
    if (val >= 60) return { label: 'Good / अच्छा', color: 'text-blue-500 border-blue-500/20 bg-blue-500/10' };
    if (val >= 40) return { label: 'Average / सामान्य', color: 'text-amber-500 border-amber-500/20 bg-amber-500/10' };
    return { label: 'Low / कम', color: 'text-red-500 border-red-500/20 bg-red-500/10' };
  };

  const scoreInfo = getScoreCategory(score);

  // Circumference calculation for circular loader
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const handleReport = (e) => {
    e.preventDefault();
    if (!reportReason) {
      toast.info('Please select a reason.');
      return;
    }
    toast.success(`Report submitted for ${userName}. Admin will review.`);
    setReportOpen(false);
    if (onReportSubmit) onReportSubmit({ reason: reportReason, details: reportDetails });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-border p-6 rounded-3xl shadow-sm space-y-6 relative overflow-hidden">
      
      {/* Visual Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest block">Trust & Safety Metric</span>
          <h3 className="text-lg font-black text-foreground">Safety Verified</h3>
        </div>
        
        <button
          onClick={() => setReportOpen(true)}
          className="text-xs text-red-500 hover:text-red-600 font-bold border border-red-500/10 hover:border-red-500/30 px-3 py-1.5 bg-red-500/5 rounded-xl transition active:scale-95"
        >
          ⚠️ Report Profile
        </button>
      </div>

      {/* Trust Circle and Badges */}
      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2 border-y border-slate-100 dark:border-slate-800">
        
        {/* Circular Progress score */}
        <div className="text-center flex flex-col items-center space-y-2">
          <div className="relative w-20 h-20 flex items-center justify-center">
            {/* SVG circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="stroke-slate-100 dark:stroke-slate-800 fill-none"
                strokeWidth="6"
              />
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="stroke-emerald-500 fill-none transition-all duration-500"
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-xl font-black text-foreground">{score}%</span>
          </div>
          
          <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${scoreInfo.color}`}>
            {scoreInfo.label}
          </span>
        </div>

        {/* Verification Checkmarks */}
        <div className="space-y-2 text-xs font-bold text-foreground">
          <div className="flex items-center gap-2">
            <div className={`p-1 rounded-full ${aadhaarVerified ? 'bg-emerald-500/10 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
              <ShieldCheck size={16} />
            </div>
            <span>Aadhaar Verified / आधार सत्यापित</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className={`p-1 rounded-full ${mobileVerified ? 'bg-emerald-500/10 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
              <Phone size={16} />
            </div>
            <span>Mobile Verified / मोबाइल सत्यापित</span>
          </div>

          <div className="flex items-center gap-2">
            <div className={`p-1 rounded-full ${profileCompleted ? 'bg-emerald-500/10 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
              <UserCheck size={16} />
            </div>
            <span>Profile 100% Complete</span>
          </div>
        </div>
      </div>

      {/* Rural Safety Advices */}
      <p className="text-[11px] text-muted-foreground font-semibold leading-relaxed text-center italic bg-slate-50 dark:bg-slate-800/40 p-3 rounded-2xl border border-border">
        🛡️ Working fields safety advice: Always verify Aadhaar badges before hiring or reporting to fields. Set emergency contacts below.
      </p>

      {/* REPORT MODAL OVERLAY */}
      {reportOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="absolute inset-0" onClick={() => setReportOpen(false)} />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-900 border border-border p-6 rounded-3xl w-full max-w-sm space-y-5 shadow-2xl relative z-10 text-left"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-black text-foreground">Report {userName}</h4>
              <button onClick={() => setReportOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleReport} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase">Reason / कारण</label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border-2 border-border focus:border-red-500 rounded-xl text-xs font-semibold focus:outline-none text-foreground"
                >
                  <option value="">Select Reason</option>
                  <option value="Fraud">Fraud / धोखाधड़ी</option>
                  <option value="Abuse">Abuse / दुर्व्यवहार</option>
                  <option value="Did Not Pay">Did Not Pay / भुगतान नहीं मिला</option>
                  <option value="Fake Profile">Fake Profile / नकली प्रोफाइल</option>
                  <option value="Other">Other / अन्य</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase">Details (Optional)</label>
                <textarea
                  maxLength={150}
                  placeholder="Provide additional details..."
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border-2 border-border focus:border-red-500 rounded-xl text-xs focus:outline-none text-foreground h-16 resize-none"
                />
              </div>

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setReportOpen(false)} className="flex-1 h-11 rounded-xl">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold h-11 rounded-xl">
                  Submit Report
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
