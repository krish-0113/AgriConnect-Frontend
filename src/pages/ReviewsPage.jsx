import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ArrowLeft, MessageSquare, Tag, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReviewsPage() {
  const navigate = useNavigate();

  // Mock global/user reviews data
  const [reviewsList] = useState([
    {
      id: 'r-1',
      name: 'Ramesh Singh',
      role: 'worker',
      stars: 5,
      chips: ['Hard Working', 'Skilled', 'On Time'],
      comment: 'Excellent sowing work. Cleared the entire fields before sunset. Will hire again!',
      date: '2026-06-28',
      avatarColor: 'bg-primary/10 text-primary'
    },
    {
      id: 'r-2',
      name: 'Golden Grain Farm Co.',
      role: 'farmer',
      stars: 5,
      chips: ['Good Farmer', 'Paid On Time', 'Safe Workplace'],
      comment: 'Owner Ramesh was extremely cooperative, paid immediately on log confirmation.',
      date: '2026-06-26',
      avatarColor: 'bg-amber-500/10 text-amber-600'
    },
    {
      id: 'r-3',
      name: 'Sukhwinder Singh',
      role: 'worker',
      stars: 4,
      chips: ['Honest', 'Skilled'],
      comment: 'Good machine hand. Handled the tractor harvest work correctly.',
      date: '2026-06-25',
      avatarColor: 'bg-blue-500/10 text-blue-600'
    }
  ]);

  const [filterRole, setFilterRole] = useState('all');

  const filteredReviews = filterRole === 'all'
    ? reviewsList
    : reviewsList.filter((r) => r.role === filterRole);

  const getAverageRating = () => {
    const sum = reviewsList.reduce((acc, curr) => acc + curr.stars, 0);
    return (sum / reviewsList.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 pt-4">
      <div className="max-w-xl mx-auto px-4">
        {/* Back navigation */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 p-2.5 bg-white dark:bg-slate-800 rounded-2xl border border-border/80 text-foreground hover:bg-muted active:scale-95 transition mb-6 shadow-sm font-bold text-sm"
        >
          <ArrowLeft size={16} />
          Go Back
        </button>

        {/* Rating Score Summary Card */}
        <div className="bg-white dark:bg-slate-900 border border-border rounded-3xl p-6 shadow-sm text-center space-y-4 mb-6">
          <h2 className="text-xl font-black text-foreground">Global Review Record</h2>
          <div className="flex items-center justify-center gap-2">
            <span className="text-5xl font-black text-foreground">{getAverageRating()}</span>
            <div className="text-left space-y-0.5">
              <div className="text-amber-500 text-lg">⭐⭐⭐⭐⭐</div>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Average Platform Rating</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground font-semibold">Based on verified job completion records</p>
        </div>

        {/* Filters */}
        <div className="flex bg-white dark:bg-slate-900 border border-border p-1 rounded-2xl mb-6 shadow-sm">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'worker', label: 'Worker Ratings' },
            { id: 'farmer', label: 'Farmer Ratings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterRole(tab.id)}
              className={`flex-grow py-2.5 rounded-xl text-xs font-bold transition active:scale-95 ${
                filterRole === tab.id
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reviews Cards List */}
        <div className="space-y-4">
          {filteredReviews.map((rev) => (
            <div key={rev.id} className="bg-white dark:bg-slate-900 border border-border rounded-3xl p-5 shadow-sm space-y-3 relative overflow-hidden flex flex-col justify-between">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-10 h-10 ${rev.avatarColor} rounded-full flex items-center justify-center font-black text-sm`}>
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-black text-foreground text-sm flex items-center gap-1.5">
                      {rev.name}
                      <span className="text-[9px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-muted-foreground rounded-full border border-border uppercase font-bold">
                        {rev.role}
                      </span>
                    </h4>
                    <span className="text-[10px] text-muted-foreground font-bold">{rev.date}</span>
                  </div>
                </div>

                <div className="text-amber-500 font-extrabold text-sm flex items-center gap-0.5">
                  {'⭐'.repeat(rev.stars)}
                </div>
              </div>

              {/* Tags/Chips */}
              <div className="flex flex-wrap gap-1">
                {rev.chips.map((c) => (
                  <span key={c} className="text-[10px] font-bold bg-slate-50 dark:bg-slate-800 text-foreground px-2.5 py-0.5 rounded-full border border-border flex items-center gap-1">
                    <Tag size={10} /> {c}
                  </span>
                ))}
              </div>

              {/* Comment text */}
              {rev.comment && (
                <p className="text-xs text-muted-foreground font-semibold leading-relaxed bg-slate-50/50 dark:bg-slate-800/40 p-3 rounded-2xl border border-border italic flex items-start gap-1.5">
                  <MessageSquare size={13} className="text-primary mt-0.5 flex-shrink-0" />
                  "{rev.comment}"
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
