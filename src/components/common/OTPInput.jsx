import React, { useRef, useState, useEffect } from 'react';

  length?;

  disabled?;
}

export default function OTPInput({ length = 6, onChange, disabled = false }) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const triggerChange = (updatedOtp[]) => {
    const otpValue = updatedOtp.join('');
    onChange(otpValue);
  };

  const handleChange = (e.ChangeEvent, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // Allow only numbers

    const val = value.substring(value.length - 1); // Get last typed character
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    triggerChange(newOtp);

    // Focus next input if value is filled
    if (val !== '' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e.KeyboardEvent, index) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
      if (otp[index] !== '') {
        // Clear current value
        newOtp[index] = '';
        setOtp(newOtp);
        triggerChange(newOtp);
      } else if (index > 0) {
        // Clear previous input and move focus back
        newOtp[index - 1] = '';
        setOtp(newOtp);
        triggerChange(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (!/^\d+$/.test(pastedData)) return; // Allow only numeric paste

    const digits = pastedData.substring(0, length).split('');
    const newOtp = [...otp];
    
    digits.forEach((digit, idx) => {
      newOtp[idx] = digit;
      if (inputRefs.current[idx]) {
        inputRefs.current[idx].value = digit;
      }
    });

    setOtp(newOtp);
    triggerChange(newOtp);

    // Focus the last filled input or the last input
    const focusIdx = Math.min(digits.length, length - 1);
    inputRefs.current[focusIdx]?.focus();
  };

  return (
    <div className="flex justify-center gap-3 dir-ltr" onPaste={handlePaste}>
      {otp.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => {
            if (el) inputRefs.current[idx] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digit}
          disabled={disabled}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          className="w-12 h-12 text-center text-xl font-bold border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50 disabled:bg-muted"
        />
      ))}
    </div>
  );
}
