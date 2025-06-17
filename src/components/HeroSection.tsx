
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
        <div className="absolute inset-0 bg-gradient-to-r from-damac-navy/85 via-damac-navy/70 to-damac-navy/40"></div>
      </div>

      {/* Content */}
      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
        <div className="animate-fade-in">
          {/* Main Title */}
          <div className={`text-center mb-8 sm:mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 sm:mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
              <span className="block mb-3 sm:mb-4">
                {isRTL ? 'تخيل 300،000 موظف' : 'Imagine 300,000 people'}
              </span>
              <span className="block text-damac-gold mb-3 sm:mb-4">
                {isRTL ? 'بيدور على مكان يأجر فيه' : 'looking for a place to rent.'}
              </span>
              <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl text-damac-gold-light font-medium">
                {isRTL ? 'في مطار آل مكتوم الدولي' : 'at Al Maktoum International Airport'}
              </span>
            </h1>
          </div>

          {/* Subtitle with better spacing */}
          <div className={`mb-8 sm:mb-12 ${isRTL ? 'text-center' : 'text-center'}`}>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto border border-white/20">
              <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl text-damac-gold-light font-semibold leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                {t.hero.subtitle}
              </p>
            </div>
          </div>

          {/* Description with enhanced readability */}
          <div className={`mb-12 sm:mb-16 ${isRTL ? 'text-center' : 'text-center'}`}>
            <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
              <p className={`text-base sm:text-lg md:text-xl lg:text-2xl text-white font-medium leading-relaxed px-4 sm:px-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL ? 'DAMAC نازلة في جنوب دبي قرب المطار،' : 'DAMAC is building in Dubai South, right near the airport'}
              </p>
              <p className={`text-base sm:text-lg md:text-xl lg:text-2xl text-damac-gold-light font-semibold leading-relaxed px-4 sm:px-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL ? 'يعني إيجارات مش بتقف' : '— which means rental demand never stops.'}
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 sm:mb-20`}>
            <Button 
              size="lg" 
              className="bg-damac-gold hover:bg-damac-gold/90 text-damac-navy font-bold px-8 py-4 text-base sm:text-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto min-w-[200px]"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t.cta.form.submit}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-damac-navy px-8 py-4 text-base sm:text-lg transition-all duration-300 font-semibold w-full sm:w-auto min-w-[200px]"
              onClick={() => document.getElementById('project')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t.nav.project}
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={scrollToEvent} className="text-white/70 hover:text-white transition-colors p-2">
            <ArrowDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
