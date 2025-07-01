import React, { useEffect } from 'react';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';
import { ErrorBoundary } from '../components/ErrorBoundary';
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
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        isRTL 
          ? 'استثمر في مشروع DAMAC Riverside في دبي ساوث. معرض حصري في القاهرة الجديدة 28-29 يونيو'
          : 'Invest in DAMAC Riverside project in Dubai South. Exclusive exhibition in New Cairo June 28-29'
      );
    }
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
    <ErrorBoundary>
      <LanguageProvider>
        <IndexContent />
      </LanguageProvider>
    </ErrorBoundary>
  );
};

export default Index;
