import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Mail, Phone, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-slate-950 dark:bg-background pt-24 pb-8 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full filter blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center font-black text-white text-xl shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                A
              </div>
              <span className="text-2xl font-black text-white tracking-tight">AgriConnect</span>
            </Link>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-sm">
              {language === 'en'
                ? 'Empowering farmers and agricultural workers with smart, transparent hiring solutions for the modern world.'
                : 'किसानों और खेतिहर मजदूरों को आधुनिक दुनिया के लिए स्मार्ट, पारदर्शी भर्ती समाधानों के साथ सशक्त बनाना।'}
            </p>
            <div className="flex space-x-4 pt-2">
              {[
                { icon: <Facebook size={18} />, color: "hover:bg-blue-600 hover:border-blue-600 hover:text-white" },
                { icon: <Twitter size={18} />, color: "hover:bg-sky-500 hover:border-sky-500 hover:text-white" },
                { icon: <Instagram size={18} />, color: "hover:bg-pink-600 hover:border-pink-600 hover:text-white" },
                { icon: <Linkedin size={18} />, color: "hover:bg-blue-700 hover:border-blue-700 hover:text-white" }
              ].map((social, idx) => (
                <a key={idx} href="#" className={`w-10 h-10 rounded-full border border-slate-800 bg-slate-900/50 flex items-center justify-center text-slate-400 transition-all duration-300 hover:-translate-y-1 shadow-sm ${social.color}`}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black tracking-widest text-emerald-500 uppercase mb-6">
              {language === 'en' ? 'Quick Links' : 'त्वरित लिंक'}
            </h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><Link to="/jobs" className="hover:text-white flex items-center group transition-colors"><ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-emerald-500" /> {language === 'en' ? 'Find Jobs' : 'नौकरियां खोजें'}</Link></li>
              <li><Link to="/workers" className="hover:text-white flex items-center group transition-colors"><ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-emerald-500" /> {language === 'en' ? 'Hire Workers' : 'श्रमिकों को नियुक्त करें'}</Link></li>
              <li><Link to="/about" className="hover:text-white flex items-center group transition-colors"><ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-emerald-500" /> {language === 'en' ? 'About Us' : 'हमारे बारे में'}</Link></li>
              <li><Link to="/contact" className="hover:text-white flex items-center group transition-colors"><ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-emerald-500" /> {language === 'en' ? 'Contact' : 'संपर्क करें'}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black tracking-widest text-emerald-500 uppercase mb-6">
              {language === 'en' ? 'Legal' : 'कानूनी'}
            </h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li><Link to="/terms" className="hover:text-white flex items-center group transition-colors"><ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-emerald-500" /> {language === 'en' ? 'Terms of Service' : 'सेवा की शर्तें'}</Link></li>
              <li><Link to="/privacy" className="hover:text-white flex items-center group transition-colors"><ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-emerald-500" /> {language === 'en' ? 'Privacy Policy' : 'गोपनीयता नीति'}</Link></li>
              <li><Link to="/trust" className="hover:text-white flex items-center group transition-colors"><ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-emerald-500" /> {language === 'en' ? 'Trust & Safety' : 'विश्वास और सुरक्षा'}</Link></li>
              <li><Link to="/faq" className="hover:text-white flex items-center group transition-colors"><ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-emerald-500" /> {language === 'en' ? 'Help Center' : 'सहायता केंद्र'}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-4 text-sm font-medium text-slate-400">
            <h4 className="text-xs font-black tracking-widest text-emerald-500 uppercase mb-6">
              {language === 'en' ? 'Contact Us' : 'संपर्क करें'}
            </h4>
            <div className="flex items-start space-x-3 group">
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0 group-hover:border-emerald-500 group-hover:text-emerald-500 transition-colors">
                <MapPin size={14} />
              </div>
              <span className="mt-1.5 group-hover:text-white transition-colors">Noida, Uttar Pradesh, India</span>
            </div>
            <div className="flex items-center space-x-3 group">
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0 group-hover:border-emerald-500 group-hover:text-emerald-500 transition-colors">
                <Phone size={14} />
              </div>
              <span className="group-hover:text-white transition-colors">+91 1800-AGRI-JOB</span>
            </div>
            <div className="flex items-center space-x-3 group">
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0 group-hover:border-emerald-500 group-hover:text-emerald-500 transition-colors">
                <Mail size={14} />
              </div>
              <span className="group-hover:text-white transition-colors">support@agriconnect.com</span>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800/60 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-semibold text-slate-500">
          <p>© {new Date().getFullYear()} AgriConnect. {language === 'en' ? 'All rights reserved.' : 'सर्वाधिकार सुरक्षित।'}</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="flex items-center">
              {language === 'en' ? 'Made with' : 'किसानों के लिए'} 
              <span className="text-rose-500 mx-1.5 text-sm animate-pulse">❤️</span> 
              {language === 'en' ? 'for Farmers' : 'से निर्मित'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
