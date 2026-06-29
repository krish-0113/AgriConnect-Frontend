import { Link } from 'react-router-dom';
import { Sprout, Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#f8faf9] dark:bg-[#112d22] border-t border-border text-foreground transition-colors duration-200 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
          
          {/* Logo & About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sprout className="text-white" size={18} />
              </div>
              <span className="font-bold text-lg text-foreground">AgriConnect</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('footerAbout')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition"><Twitter size={18} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition"><Facebook size={18} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition"><Instagram size={18} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition"><Linkedin size={18} /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition"><Github size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-foreground">AgriConnect</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/home" className="hover:text-primary transition">Home</Link></li>
              <li><Link to="/jobs" className="hover:text-primary transition">{t('jobs')}</Link></li>
              <li><Link to="/workers" className="hover:text-primary transition">{t('workers')}</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-foreground">Support</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition">FAQ Guide</a></li>
              <li><a href="#" className="hover:text-primary transition">District Contacts</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-foreground">Legal</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition">Cookie Settings</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-8 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {t('footerRights')}
        </div>
      </div>
    </footer>
  );
}
