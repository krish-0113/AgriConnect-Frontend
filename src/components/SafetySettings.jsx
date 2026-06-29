import React, { useState, useEffect } from 'react';
import { Phone, User, Check, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from './common/Toast';

export default function SafetySettings() {
  const toast = useToast();

  const [contact1, setContact1] = useState({ name: 'Brother Jagdish', phone: '9876500123' });
  const [contact2, setContact2] = useState({ name: 'Village Pradhan', phone: '8765400234' });

  const [tempContact1, setTempContact1] = useState({ name: '', phone: '' });
  const [tempContact2, setTempContact2] = useState({ name: '', phone: '' });

  useEffect(() => {
    // Load from local storage if existing
    const saved1 = localStorage.getItem('emergency_contact_1');
    const saved2 = localStorage.getItem('emergency_contact_2');
    if (saved1) {
      const parsed = JSON.parse(saved1);
      setContact1(parsed);
      setTempContact1(parsed);
    } else {
      setTempContact1(contact1);
    }
    if (saved2) {
      const parsed = JSON.parse(saved2);
      setContact2(parsed);
      setTempContact2(parsed);
    } else {
      setTempContact2(contact2);
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    if (!tempContact1.name || !tempContact1.phone) {
      toast.info('Please enter Name and Phone for Contact 1.');
      return;
    }

    localStorage.setItem('emergency_contact_1', JSON.stringify(tempContact1));
    localStorage.setItem('emergency_contact_2', JSON.stringify(tempContact2));

    setContact1(tempContact1);
    setContact2(tempContact2);

    toast.success('Emergency contacts saved successfully! Your SOS alerts will reach them.');
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-border p-6 rounded-3xl shadow-sm space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-black text-foreground flex items-center gap-1.5">
          🚨 Emergency Contacts / आपातकालीन संपर्क
        </h3>
        <p className="text-xs text-muted-foreground font-semibold">
          Configure two trusted mobile numbers. In case of field emergency, tapping the SOS button will alert them.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        
        {/* Contact 1 */}
        <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-border space-y-3">
          <span className="text-[10px] text-primary font-black uppercase tracking-widest block">Primary Contact 1</span>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="relative">
              <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Contact Name"
                value={tempContact1.name}
                onChange={(e) => setTempContact1({ ...tempContact1, name: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-slate-900 border border-border rounded-xl text-xs font-semibold focus:outline-none text-foreground"
              />
            </div>
            
            <div className="relative">
              <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="tel"
                placeholder="Mobile Number"
                value={tempContact1.phone}
                onChange={(e) => setTempContact1({ ...tempContact1, phone: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-slate-900 border border-border rounded-xl text-xs font-semibold focus:outline-none text-foreground"
              />
            </div>
          </div>
        </div>

        {/* Contact 2 */}
        <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-border space-y-3">
          <span className="text-[10px] text-secondary font-black uppercase tracking-widest block">Secondary Contact 2</span>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="relative">
              <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Contact Name"
                value={tempContact2.name}
                onChange={(e) => setTempContact2({ ...tempContact2, name: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-slate-900 border border-border rounded-xl text-xs font-semibold focus:outline-none text-foreground"
              />
            </div>
            
            <div className="relative">
              <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="tel"
                placeholder="Mobile Number"
                value={tempContact2.phone}
                onChange={(e) => setTempContact2({ ...tempContact2, phone: e.target.value })}
                className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-slate-900 border border-border rounded-xl text-xs font-semibold focus:outline-none text-foreground"
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black h-12 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/10 active:scale-95 transition"
        >
          <Check size={16} /> Save Contacts
        </Button>
      </form>
    </div>
  );
}
