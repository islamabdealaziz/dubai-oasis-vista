
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { ArrowDown } from 'lucide-react';

export function HeroSection() {
  const { t, isRTL } = useLanguage();

  const scrollToEvent = () => {
    document.getElementById('event')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/lovable-uploads/e8b6e733-412d-470e-b835-f4b1f65f0e4e.png"
          alt="DAMAC Riverside Dubai South"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          style={{ imageRendering: 'crisp-edges' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-damac-navy/80 via-damac-navy/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ${isRTL ? 'font-cairo text-right' : 'font-inter text-left'}`}>
        <div className="animate-fade-in">
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight ${isRTL ? 'text-right' : 'text-left'}`}>
            {t.hero.title}
          </h1>
          
          <p className={`text-xl md:text-2xl text-damac-gold-light mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t.hero.subtitle}
          </p>
          
          <p className={`text-lg md:text-xl text-white/90 mb-12 max-w-3xl ${isRTL ? 'mr-auto text-right' : 'ml-auto text-left'}`}>
            {t.hero.description}
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'justify-end' : 'justify-start'}`}>
            <Button 
              size="lg" 
              className="bg-damac-gold hover:bg-damac-gold/90 text-damac-navy font-semibold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t.cta.form.submit}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-damac-navy px-8 py-4 text-lg transition-all duration-300 font-semibold"
              onClick={() => document.getElementById('project')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t.nav.project}
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={scrollToEvent} className="text-white/70 hover:text-white transition-colors">
            <ArrowDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
