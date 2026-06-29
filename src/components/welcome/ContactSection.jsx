import { useState } from 'react';
import { MapPin, Phone, Mail, Send, Twitter, Facebook, Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../common/Toast';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const { t, language } = useLanguage();
  const toast = useToast();

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSending, setContactSending] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      toast.error(language === 'en' ? 'Please fill in all required fields' : 'कृपया सभी आवश्यक फ़ील्ड भरें');
      return;
    }
    setContactSending(true);
    setTimeout(() => {
      toast.success(language === 'en' ? 'Thank you! Your message has been sent.' : 'धन्यवाद! आपका संदेश भेज दिया गया है।');
      setContactName('');
      setContactEmail('');
      setContactSubject('');
      setContactMessage('');
      setContactSending(false);
    }, 1000);
  };

  const socialLinks = [
    { icon: <Twitter size={18} />, href: "#", color: "hover:bg-sky-500 hover:text-white hover:border-sky-500" },
    { icon: <Facebook size={18} />, href: "#", color: "hover:bg-blue-600 hover:text-white hover:border-blue-600" },
    { icon: <Linkedin size={18} />, href: "#", color: "hover:bg-blue-700 hover:text-white hover:border-blue-700" },
    { icon: <Instagram size={18} />, href: "#", color: "hover:bg-pink-600 hover:text-white hover:border-pink-600" }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full filter blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 text-left space-y-10"
          >
            <div className="space-y-4">
              <span className="inline-block py-1.5 px-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black tracking-widest uppercase shadow-sm">
                Contact Us
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1]">
                {t('contactTitle')}
              </h2>
              <p className="text-muted-foreground text-lg font-medium leading-relaxed max-w-md">
                {t('contactSubtitle')}
              </p>
            </div>
            
            <div className="space-y-6 text-sm font-medium text-foreground">
              <motion.div whileHover={{ x: 5 }} className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors cursor-default">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div className="space-y-1 mt-1">
                  <span className="block font-bold text-base text-foreground">{t('officeAddress')}</span>
                  <span className="text-muted-foreground block">123 Tech Park, Sector 62</span>
                  <span className="text-muted-foreground block">Noida, Uttar Pradesh 201301</span>
                </div>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors cursor-default">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div className="space-y-0.5">
                  <span className="block font-bold text-base text-foreground">{t('supportPhone')}</span>
                  <span className="text-muted-foreground block">+91 1800 123 4567</span>
                </div>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors cursor-default">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div className="space-y-0.5">
                  <span className="block font-bold text-base text-foreground">Email Support</span>
                  <span className="text-muted-foreground block">support@agriconnect.com</span>
                </div>
              </motion.div>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              {socialLinks.map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href}
                  className={`w-12 h-12 rounded-2xl border border-border flex items-center justify-center text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Contact Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
            className="lg:col-span-7 bg-white/70 dark:bg-card/70 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/40 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-shadow duration-500 text-left relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />

            <h3 className="font-extrabold text-2xl text-foreground mb-8">{t('contactForm')}</h3>
            
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2 relative group/input">
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest group-focus-within/input:text-emerald-500 transition-colors">{t('cName')}</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full px-5 py-4 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm bg-transparent font-medium transition-all"
                  />
                </div>
                <div className="space-y-2 relative group/input">
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest group-focus-within/input:text-emerald-500 transition-colors">{t('cEmail')}</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full px-5 py-4 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm bg-transparent font-medium transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2 relative group/input">
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest group-focus-within/input:text-emerald-500 transition-colors">Subject</label>
                <input
                  type="text"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  placeholder="e.g. Labor Hiring Query"
                  className="w-full px-5 py-4 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm bg-transparent font-medium transition-all"
                />
              </div>

              <div className="space-y-2 relative group/input">
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest group-focus-within/input:text-emerald-500 transition-colors">{t('cMessage')}</label>
                <textarea
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  required
                  placeholder="Write details..."
                  className="w-full px-5 py-4 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm bg-transparent font-medium transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={contactSending}
                className="w-full px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-emerald-500/20 disabled:opacity-70 flex items-center justify-center space-x-2"
              >
                {contactSending ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {language === 'en' ? 'Sending...' : 'भेजा जा रहा है...'}
                  </span>
                ) : (
                  <span className="flex items-center">
                    {language === 'en' ? 'Send Message' : 'संदेश भेजें'} <Send size={18} className="ml-2" />
                  </span>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
