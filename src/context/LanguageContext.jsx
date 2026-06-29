import React, { createContext, useContext, useState } from 'react';

const translations = {
  // Navigation
  jobs: { en: 'Jobs', hi: 'नौकरियां' },
  workers: { en: 'Workers', hi: 'मजदूर' },
  dashboard: { en: 'Dashboard', hi: 'डैशबोर्ड' },
  login: { en: 'Sign In', hi: 'लॉग इन' },
  signUp: { en: 'Join Platform', hi: 'पंजीकरण करें' },
  logout: { en: 'Logout', hi: 'लॉगआउट' },
  profile: { en: 'Profile', hi: 'प्रोफ़ाइल' },
  admin: { en: 'Admin', hi: 'एडमिन' },
  // Section 2 - Hero
  heroTag: { en: 'Next-Gen Agricultural Network', hi: 'अत्याधुनिक कृषि नेटवर्क' },
  heroTitle: { en: 'Connecting Farmers with Skilled Agricultural Workers', hi: 'किसानों और कुशल कृषि मजदूरों का सीधा मिलाप' },
  heroSubtitle: { en: 'Hire trusted farm workers or find agricultural jobs quickly and securely with AgriConnect.', hi: 'एग्रीकनेक्ट के साथ भरोसेमंद कृषि मजदूरों को काम पर रखें या तुरंत और सुरक्षित रूप से कृषि कार्य खोजें।' },
  findWorkers: { en: 'Find Workers', hi: 'मजदूर खोजें' },
  findJobs: { en: 'Find Jobs', hi: 'काम खोजें' },
  statFarmers: { en: 'Farmers Connected', hi: 'किसान जुड़े' },
  statWorkers: { en: 'Workers Active', hi: 'सक्रिय मजदूर' },
  statJobs: { en: 'Jobs Posted', hi: 'दर्ज नौकरियां' },
  statSuccess: { en: 'Success Rate', hi: 'सफलता दर' },
  // Section 3 - Trust
  trustTitle: { en: 'Trusted Across India', hi: 'पूरे भारत में विश्वसनीय' },
  trustSec: { en: 'Secure Platform', hi: 'सुरक्षित मंच' },
  trustVer: { en: 'Verified Users', hi: 'सत्यापित उपयोगकर्ता' },
  trustFast: { en: 'Fast Hiring', hi: 'त्वरित भर्ती' },
  trustOtp: { en: 'OTP Verification', hi: 'ओटीपी सत्यापन' },
  // Section 4 - About
  aboutTitle: { en: 'About AgriConnect', hi: 'एग्रीकनेक्ट के बारे में' },
  aboutSubtitle: { en: 'Sowing the seeds of digital connection in traditional farming.', hi: 'पारंपरिक खेती में डिजिटल संपर्क के बीज बोना।' },
  missionTitle: { en: 'Our Mission', hi: 'हमारा मिशन' },
  missionDesc: { en: 'To empower rural communities by facilitating direct communication, fair compensation, and zero commission middle-brokerages.', hi: 'ग्रामीण समुदायों को सीधे संवाद, उचित पारिश्रमिक और बिना किसी बिचौलियों के सशक्त बनाना।' },
  visionTitle: { en: 'Our Vision', hi: 'हमारा दृष्टिकोण' },
  visionDesc: { en: 'To build a self-sustaining digital agricultural labor ecosystem that reduces employment gaps across India.', hi: 'एक आत्मनिर्भर डिजिटल कृषि श्रम पारिस्थितिकी तंत्र का निर्माण करना जो पूरे भारत में रोजगार के अंतर को कम करे।' },
  problemTitle: { en: 'The Problem', hi: 'समस्या' },
  problemDesc: { en: 'Traditional farming suffers from seasonal labor shortages, wage exploitation, and payment delays by brokers.', hi: 'पारंपरिक खेती मौसमी श्रम की कमी, वेतन शोषण और बिचौलियों द्वारा भुगतान में देरी से ग्रस्त है।' },
  solutionTitle: { en: 'Our Solution', hi: 'हमारा समाधान' },
  solutionDesc: { en: 'A direct portal verified by secure mobile OTP checkpoints with integrated daily logs and rating systems.', hi: 'एकीकृत दैनिक लॉग और रेटिंग प्रणाली के साथ सुरक्षित मोबाइल ओटीपी चेकपॉइंट द्वारा सत्यापित एक सीधा पोर्टल।' },
  // Section 5 - Features
  featuresTitle: { en: 'Platform Features', hi: 'मंच की विशेषताएं' },
  featuresSubtitle: { en: 'Equipped with custom tools designed for ease-of-use.', hi: 'आसान उपयोग के लिए डिज़ाइन किए गए विशेष उपकरणों से लैस।' },
  featJobPost: { en: 'Smart Job Posting', hi: 'स्मार्ट जॉब पोस्टिंग' },
  featJobPostDesc: { en: 'Farmers can specify crop types, daily wages, and expected hours within seconds.', hi: 'किसान कुछ ही सेकंड में फसल के प्रकार, दैनिक मजदूरी और अपेक्षित घंटों को निर्दिष्ट कर सकते हैं।' },
  featSearch: { en: 'Worker Directories', hi: 'मजदूरों की सूची' },
  featSearchDesc: { en: 'Find verified workers sorted by specialty skills, location, and day rates.', hi: 'विशिष्ट कौशल, स्थान और दैनिक दरों के आधार पर सत्यापित मजदूरों को खोजें।' },
  featLocation: { en: 'Location-Based Match', hi: 'स्थान आधारित मिलान' },
  featLocationDesc: { en: 'Get connected with workers or farming land in your immediate village or district.', hi: 'अपने तत्काल गांव या जिले में मजदूरों या कृषि भूमि से सीधे जुड़ें।' },
  featChat: { en: 'Direct Communication', hi: 'सीधा संवाद' },
  featChatDesc: { en: 'Get direct mobile contact coordinates or trigger call queries without middlemen.', hi: 'बिचौलियों के बिना सीधे मोबाइल संपर्क विवरण प्राप्त करें या कॉल प्रश्न शुरू करें।' },
  // Section 6 - How it Works
  workflowTag: { en: 'How AgriConnect Works', hi: 'एग्रीकनेक्ट कैसे काम करता है' },
  workflowSubtitle: { en: 'Designed for ease of use across regional languages.', hi: 'क्षेत्रीय भाषाओं में आसान उपयोग के लिए डिज़ाइन किया गया।' },
  farmerFlow: { en: 'Farmer Livelihood Pipeline', hi: 'किसान आजीविका पाइपलाइन' },
  workerFlow: { en: 'Worker Job Pipeline', hi: 'मजदूर कार्य पाइपलाइन' },
  fStep1: { en: 'Register', hi: 'पंजीकरण करें' },
  fStep1Desc: { en: 'Create account as Farm Owner', hi: 'खेत मालिक के रूप में खाता बनाएं' },
  fStep2: { en: 'Complete Profile', hi: 'प्रोफ़ाइल भरें' },
  fStep2Desc: { en: 'List crops & location', hi: 'फसलों और स्थान की सूची बनाएं' },
  fStep3: { en: 'Post Agricultural Job', hi: 'कृषि कार्य दर्ज करें' },
  fStep3Desc: { en: 'Enter daily wage rates', hi: 'दैनिक मजदूरी दरें दर्ज करें' },
  fStep4: { en: 'Hire Worker', hi: 'मजदूर नियुक्त करें' },
  fStep4Desc: { en: 'Accept verified applications', hi: 'सत्यापित आवेदनों को स्वीकार करें' },
  wStep1: { en: 'OTP Signup', hi: 'ओटीपी पंजीकरण' },
  wStep1Desc: { en: 'Register with mobile number', hi: 'मोबाइल नंबर से पंजीकरण करें' },
  wStep2: { en: 'Verify Account', hi: 'खाता सत्यापित करें' },
  wStep2Desc: { en: 'Enter 6-digit OTP code', hi: '६-अंकीय ओटीपी कोड दर्ज करें' },
  wStep3: { en: 'Setup Rates', hi: 'मजदूरी दरें सेट करें' },
  wStep3Desc: { en: 'Enter specialty farming skills', hi: 'विशिष्ट कृषि कौशल दर्ज करें' },
  wStep4: { en: 'Apply to Jobs', hi: 'कार्य के लिए आवेदन करें' },
  wStep4Desc: { en: 'Find work in your village', hi: 'अपने गांव में काम खोजें' },
  // Section 7 - Job Categories
  catTitle: { en: 'Popular Job Categories', hi: 'लोकप्रिय कार्य श्रेणियां' },
  catSubtitle: { en: 'Explore opportunities across multiple farming operations.', hi: 'विभिन्न कृषि कार्यों में अवसरों का पता लगाएं।' },
  catHarvest: { en: 'Harvesting', hi: 'फसल कटाई' },
  catPlant: { en: 'Plantation & Sowing', hi: 'रोपण और बुवाई' },
  catIrrig: { en: 'Irrigation & Watering', hi: 'सिंचाई और जल निकासी' },
  catSpray: { en: 'Spraying & Fertilizing', hi: 'कीटनाशक और खाद छिड़काव' },
  catTractor: { en: 'Tractor Operations', hi: 'ट्रैक्टर और मशीनरी' },
  catPick: { en: 'Fruit & Vegetable Picking', hi: 'फल और सब्जी तोड़ना' },
  // Section 8 - Search Panel
  searchHeader: { en: 'Smart Agriculture Search', hi: 'स्मार्ट कृषि खोज' },
  searchLabelLoc: { en: 'District / Village', hi: 'जिला / गांव' },
  searchLabelSkill: { en: 'Agricultural Skill', hi: 'कृषि कौशल' },
  searchLabelSalary: { en: 'Daily Rate (Min ₹)', hi: 'दैनिक दर (न्यूनतम ₹)' },
  btnSearchJobs: { en: 'Search Jobs', hi: 'नौकरियां खोजें' },
  btnSearchWorkers: { en: 'Search Workers', hi: 'मजदूर खोजें' },
  // Section 9 - Live Jobs
  liveJobsTitle: { en: 'Latest Agricultural Jobs', hi: 'नवीनतम कृषि कार्य' },
  liveJobsSubtitle: { en: 'Real-time openings posted directly by local land owners.', hi: 'स्थानीय भूमि मालिकों द्वारा सीधे पोस्ट किए गए रियल-टाइम कार्य।' },
  btnApply: { en: 'Apply Now', hi: 'अभी आवेदन करें' },
  btnDetails: { en: 'View Details', hi: 'विवरण देखें' },
  // Section 10 - Top Workers
  topWorkersTitle: { en: 'Top Rated Agricultural Workers', hi: 'शीर्ष रेटेड कृषि मजदूर' },
  topWorkersSubtitle: { en: 'Experienced professionals with verified job completion ratings.', hi: 'सत्यापित कार्य पूर्णता रेटिंग वाले अनुभवी पेशेवर।' },
  expYears: { en: 'Years Experience', hi: 'वर्ष का अनुभव' },
  jobsCompleted: { en: 'Jobs Completed', hi: 'पूरे किए गए कार्य' },
  btnViewProfile: { en: 'View Profile', hi: 'प्रोफ़ाइल देखें' },
  // Section 11 - Success Stories
  storiesTitle: { en: 'Success Stories', hi: 'सफलता की कहानियां' },
  storiesSubtitle: { en: 'What our farmers and workers have to say about us.', hi: 'हमारे किसान और मजदूर हमारे बारे में क्या कहते हैं।' },
  // Section 12 - Statistics
  statsHeader: { en: 'Platform Achievements', hi: 'मंच की उपलब्धियां' },
  regUsers: { en: 'Registered Users', hi: 'पंजीकृत उपयोगकर्ता' },
  statesCovered: { en: 'States Covered', hi: 'राज्यों में सक्रिय' },
  // Section 13 - Mobile App
  appTitle: { en: 'Download AgriConnect Mobile App', hi: 'एग्रीकनेक्ट मोबाइल ऐप डाउनलोड करें' },
  appSubtitle: { en: 'Access jobs, worker listings, and instant notification alerts directly from your phone.', hi: 'सीधे अपने फोन से काम, मजदूरों की सूची और त्वरित सूचनाएं प्राप्त करें।' },
  downloadPlay: { en: 'Get it on Google Play', hi: 'गूगल प्ले से डाउनलोड करें' },
  downloadAppStore: { en: 'Download on App Store', hi: 'ऐप स्टोर से डाउनलोड करें' },
  // Section 14 - FAQ
  faqTitle: { en: 'Frequently Asked Questions', hi: 'सामान्य प्रश्न (FAQ)' },
  faqSubtitle: { en: 'Got questions? We have compiled the answers for you.', hi: 'कोई सवाल है? हमने आपके लिए उत्तर संकलित किए हैं।' },
  q1: { en: 'How to register on AgriConnect?', hi: 'एग्रीकनेक्ट पर पंजीकरण कैसे करें?' },
  a1: { en: 'Click Join Platform in the navbar, select your role (Worker or Farm Owner), verify your email/phone with the OTP code, and complete your profile.', hi: 'नेविगेशन बार में पंजीकरण बटन पर क्लिक करें, अपनी भूमिका (मजदूर या खेत मालिक) चुनें, ओटीपी कोड से सत्यापित करें और अपनी प्रोफाइल पूरी करें।' },
  q2: { en: 'Is mobile OTP verification mandatory?', hi: 'क्या मोबाइल ओटीपी सत्यापन अनिवार्य है?' },
  a2: { en: 'Yes, to prevent fake accounts and ensure labor security, every user must verify their account via the 6-digit OTP code.', hi: 'हाँ, नकली खातों को रोकने और सुरक्षा सुनिश्चित करने के लिए, प्रत्येक उपयोगकर्ता को ६-अंकीय ओटीपी कोड के माध्यम से सत्यापित करना होगा।' },
  q3: { en: 'How is labor payment handled?', hi: 'मजदूरी भुगतान कैसे संभाला जाता है?' },
  a3: { en: 'Payments are handled directly between farmers and workers based on the daily work logs. There are no platform commission fees.', hi: 'दैनिक कार्य लॉग के आधार पर किसानों और मजदूरों के बीच सीधे भुगतान का निपटारा किया जाता है। कोई कमीशन शुल्क नहीं है।' },
  // Section 15 - Blogs
  blogsTitle: { en: 'Agricultural Insights', hi: 'नवीनतम कृषि समाचार व ब्लॉग' },
  blogsSubtitle: { en: 'Stay updated with modern farming techniques and crop cycles.', hi: 'आधुनिक खेती की तकनीकों और फसल चक्रों से अपडेट रहें।' },
  readMore: { en: 'Read Article', hi: 'लेख पढ़ें' },
  // Section 16 - Newsletter
  newsTitle: { en: 'Stay Updated with Farming News', hi: 'कृषि समाचारों से अपडेट रहें' },
  newsPlaceholder: { en: 'Enter your email address', hi: 'अपना ईमेल पता दर्ज करें' },
  btnSubscribe: { en: 'Subscribe Now', hi: 'अभी सदस��यता लें' },
  // Section 17 - Contact Us
  contactTitle: { en: 'Contact Our Support', hi: 'हमारे सहायता केंद्र से संपर्क करें' },
  contactSubtitle: { en: 'Need help? Get in touch with our district support coordinators.', hi: 'मदद चाहिए? हमारे जिला सहायता समन्वयकों से संपर्क करें।' },
  cName: { en: 'Your Name', hi: 'आपका नाम' },
  cEmail: { en: 'Your Email', hi: 'आपका ईमेल' },
  cMessage: { en: 'Write Message', hi: 'संदेश लिखें' },
  btnSend: { en: 'Send Message', hi: 'संदेश भेजें' },
  officeAddress: { en: 'AgriConnect HQ, Sector 52, Noida, Uttar Pradesh, India', hi: 'एग्रीकनेक्ट मुख्यालय, सेक्टर ५२, नोएडा, उत्तर प्रदेश, भारत' },
  supportPhone: { en: 'Phone: +91 1800-456-7890 (Toll Free)', hi: 'फोन: +91 1800-456-7890 (टोल फ्री)' },
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
