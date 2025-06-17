
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-damac-navy/75 to-damac-navy/90"></div>
      </div>

      {/* Content Container with proper spacing from header */}
      <div className={`relative z-10 w-full pt-20 pb-16 px-4 sm:px-6 lg:px-8 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="animate-fade-in text-center">
            
            {/* Enhanced Main Title Section */}
            <div className="mb-12 sm:mb-16">
              <div className="space-y-6 sm:space-y-8">
                
                {/* Primary Headline */}
                <div className="space-y-4">
                  <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight ${isRTL ? 'text-center' : 'text-center'}`}>
                    <span className="block">
                      {isRTL ? 'تخيل 300،000 موظف' : 'Imagine 300,000 people'}
                    </span>
                  </h1>
                  
                  <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-damac-gold leading-tight ${isRTL ? 'text-center' : 'text-center'}`}>
                    <span className="block">
                      {isRTL ? 'بيدور على مكان يأجر فيه' : 'looking for a place to rent'}
                    </span>
                  </h2>
                </div>

                {/* Location Context */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 mx-auto max-w-3xl border border-white/20">
                  <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl text-damac-gold-light font-semibold ${isRTL ? 'text-center' : 'text-center'}`}>
                    {isRTL ? 'في مطار آل مكتوم الدولي' : 'at Al Maktoum International Airport'}
                  </p>
                </div>

              </div>
            </div>

            {/* Key Message Section */}
            <div className="mb-12 sm:mb-16">
              <div className="bg-damac-navy/40 backdrop-blur-md rounded-2xl p-6 sm:p-8 mx-auto max-w-5xl border border-damac-gold/30">
                <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl text-damac-gold font-bold mb-4 ${isRTL ? 'text-center' : 'text-center'}`}>
                  {t.hero.subtitle}
                </p>
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-12 sm:mb-16">
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <p className={`text-base sm:text-lg md:text-xl lg:text-2xl text-white font-medium leading-relaxed ${isRTL ? 'text-center' : 'text-center'}`}>
                    {isRTL ? 'DAMAC نازلة في جنوب دبي قرب المطار' : 'DAMAC is building in Dubai South, right near the airport'}
                  </p>
                </div>
                
                <div className="bg-damac-gold/10 backdrop-blur-sm rounded-xl p-6 border border-damac-gold/30">
                  <p className={`text-base sm:text-lg md:text-xl lg:text-2xl text-damac-gold-light font-bold leading-relaxed ${isRTL ? 'text-center' : 'text-center'}`}>
                    {isRTL ? 'يعني إيجارات مش بتقف!' : 'which means rental demand never stops!'}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 sm:mb-20">
              <Button 
                size="lg" 
                className="bg-damac-gold hover:bg-damac-gold/90 text-damac-navy font-bold px-8 py-4 text-base sm:text-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto min-w-[220px] rounded-xl shadow-lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.cta.form.submit}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-damac-gold bg-damac-gold/10 text-damac-gold hover:bg-damac-gold hover:text-damac-navy px-8 py-4 text-base sm:text-lg transition-all duration-300 font-semibold w-full sm:w-auto min-w-[220px] rounded-xl backdrop-blur-sm"
                onClick={() => document.getElementById('project')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.nav.project}
              </Button>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={scrollToEvent} 
            className="text-damac-gold-light hover:text-damac-gold transition-colors p-3 bg-white/10 rounded-full backdrop-blur-sm border border-white/20"
          >
            <ArrowDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
