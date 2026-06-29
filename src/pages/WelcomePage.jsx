import Header from '../components/Header';
import Footer from '../components/Footer';

// Section components
import HeroSection from '../components/welcome/HeroSection';
import TrustSection from '../components/welcome/TrustSection';
import AboutSection from '../components/welcome/AboutSection';
import FeaturesSection from '../components/welcome/FeaturesSection';
import WorkflowSection from '../components/welcome/WorkflowSection';
import JobCategoriesSection from '../components/welcome/JobCategoriesSection';
import SearchSection from '../components/welcome/SearchSection';
import LiveJobsSection from '../components/welcome/LiveJobsSection';
import TopWorkersSection from '../components/welcome/TopWorkersSection';
import TestimonialsSection from '../components/welcome/TestimonialsSection';
import StatsSection from '../components/welcome/StatsSection';
import MobileAppSection from '../components/welcome/MobileAppSection';
import FaqSection from '../components/welcome/FaqSection';
import BlogsSection from '../components/welcome/BlogsSection';
import NewsletterSection from '../components/welcome/NewsletterSection';
import ContactSection from '../components/welcome/ContactSection';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 flex flex-col">
      <Header />

      {/* Decorative Accents */}
      <div className="absolute top-16 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl pointer-events-none z-0" />
      <div className="absolute top-2/3 left-0 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl pointer-events-none z-0" />

      <HeroSection />
      <TrustSection />
      <AboutSection />
      <FeaturesSection />
      <WorkflowSection />
      <JobCategoriesSection />
      <SearchSection />
      <LiveJobsSection />
      <TopWorkersSection />
      <TestimonialsSection />
      <StatsSection />
      <MobileAppSection />
      <FaqSection />
      <BlogsSection />
      <NewsletterSection />
      <ContactSection />

      <Footer />
    </div>
  );
}
