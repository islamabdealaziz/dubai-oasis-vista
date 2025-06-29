
import React, { useEffect } from 'react';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import { Navigation } from '../components/Navigation';
import { HeroSection } from '../components/HeroSection';
import { ProjectGallery } from '../components/ProjectGallery';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';

function IndexContent() {
  const { isRTL } = useLanguage();

  useEffect(() => {
    // Update document direction based on language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = isRTL ? 'ar' : 'en';
  }, [isRTL]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ProjectGallery />
      <ContactForm />
      <Footer />
    </div>
  );
}

const Index = () => {
  return (
    <LanguageProvider>
      <IndexContent />
    </LanguageProvider>
  );
};

export default Index;
