import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle, X, MessageSquare, Tag } from 'lucide-react';
import { Button } from '../ui/button';

export default function RatingFlow({
  targetName = 'User',
  role = 'worker', // 'worker' or 'farmer' (determines chips shown)
  onClose,
  onSubmit
}) {
  const [stars, setStars] = useState(5);
  const [selectedChips, setSelectedChips] = useState([]);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Predefined review tags
  const workerChips = ['Hard Working', 'Skilled', 'On Time', 'Friendly', 'Honest', 'Fast Worker', 'Recommended'];
  const farmerChips = ['Good Farmer', 'Paid On Time', 'Respectful', 'Clear Instructions', 'Safe Workplace', 'Helpful', 'Recommended'];

  const chips = role === 'worker' ? workerChips : farmerChips;

  const handleChipToggle = (chip) => {
    setSelectedChips((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);

    if (onSubmit) {
      onSubmit({
        rating: stars,
        chips: selectedChips,
        comment,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Backdrop Close */}
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-slate-900 border border-border p-6 rounded-3xl w-full max-w-sm space-y-6 shadow-2xl relative z-10"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-muted-foreground transition"
        >
          <X size={16} />
        </button>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form
              key="rating-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              <div className="text-center space-y-1">
                <h3 className="text-xl font-black text-foreground">Rate {targetName}</h3>
                <p className="text-xs text-muted-foreground font-medium">How was your work experience?</p>
              </div>

              {/* Step 1: Star Picker */}
              <div className="flex items-center justify-center gap-1.5 py-1">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setStars(val)}
                    className="text-4xl hover:scale-115 active:scale-95 transition focus:outline-none"
                  >
                    {val <= stars ? '⭐' : '☆'}
                  </button>
                ))}
              </div>

              {/* Step 2: Predefined Chips */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-muted-foreground uppercase text-center flex items-center justify-center gap-1">
                  <Tag size={12} /> Select Feedback Tags
                </label>
                
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {chips.map((chip) => {
                    const isSelected = selectedChips.includes(chip);
                    return (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => handleChipToggle(chip)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border transition active:scale-95 ${
                          isSelected
                            ? 'bg-emerald-500/10 border-emerald-500 text-primary shadow-sm shadow-emerald-500/5'
                            : 'bg-slate-50 dark:bg-slate-800 border-border text-foreground hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {chip}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Optional Comment */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">
                  <MessageSquare size={12} /> Write anything else (Optional)
                </label>
                
                <textarea
                  maxLength={200}
                  placeholder="Provide comments (max 200 characters)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border-2 border-border focus:border-emerald-500 rounded-2xl text-xs text-foreground focus:outline-none h-20 resize-none"
                />
                
                <span className="text-[10px] text-muted-foreground block text-right font-semibold">
                  {200 - comment.length} characters remaining
                </span>
              </div>

              {/* Step 4: Submit Button */}
              <div className="flex gap-2.5 pt-2">
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 h-12 rounded-xl"
                  type="button"
                >
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-grow bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl h-12 flex items-center justify-center gap-1 shadow-md shadow-emerald-500/10 active:scale-95 transition"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Feedback'
                  )}
                </Button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success-screen"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-6 space-y-4"
            >
              <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle size={32} className="stroke-[3]" />
              </div>
              
              <div className="space-y-1">
                <h3 className="text-xl font-black text-foreground">Thank You!</h3>
                <p className="text-xs text-muted-foreground font-semibold">
                  Feedback submitted successfully.
                </p>
              </div>

              <Button
                onClick={onClose}
                className="w-full h-11 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl"
              >
                Close Window
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
