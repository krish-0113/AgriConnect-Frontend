import React, { createContext, useContext, useState } from 'react';

const translations = {
  // Navigation
  jobs, hi,
  workers, hi,
  dashboard, hi,
  login, hi,
  signUp, hi,
  logout, hi,
  profile, hi,
  admin, hi,

  // Section 2 - Hero
  heroTag, hi,
  heroTitle, hi,
  heroSubtitle, hi,
  findWorkers, hi,
  findJobs, hi,
  statFarmers, hi,
  statWorkers, hi,
  statJobs, hi,
  statSuccess, hi,

  // Section 3 - Trust
  trustTitle, hi,
  trustSec, hi,
  trustVer, hi,
  trustFast, hi,
  trustOtp, hi,

  // Section 4 - About
  aboutTitle, hi,
  aboutSubtitle, hi,
  missionTitle, hi,
  missionDesc, fair compensation, and zero commission middle-brokerages.', hi, उचित पारिश्रमिक और बिना किसी बिचौलियों के सशक्त बनाना।' },
  visionTitle, hi,
  visionDesc, hi,
  problemTitle, hi,
  problemDesc, wage exploitation, and payment delays by brokers.', hi, वेतन शोषण और बिचौलियों द्वारा भुगतान में देरी से ग्रस्त है।' },
  solutionTitle, hi,
  solutionDesc, hi,

  // Section 5 - Features
  featuresTitle, hi,
  featuresSubtitle, hi,
  featJobPost, hi,
  featJobPostDesc, daily wages, and expected hours within seconds.', hi, दैनिक मजदूरी और अपेक्षित घंटों को निर्दिष्ट कर सकते हैं।' },
  featSearch, hi,
  featSearchDesc, location, and day rates.', hi, स्थान और दैनिक दरों के आधार पर सत्यापित मजदूरों को खोजें।' },
  featLocation, hi,
  featLocationDesc, hi,
  featChat, hi,
  featChatDesc, hi,

  // Additional translations can be added here
  // Shortened for brevity - keeping essential ones
};

const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('language');
    if (saved === 'hi' || saved === 'en') return saved;
    return 'en';
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key) => {
    const item = translations[key];
    if (!item) return key;
    return item[language] || item['en'] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
