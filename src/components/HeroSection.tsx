import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { ArrowDown, Calendar, MapPin } from 'lucide-react';

export function HeroSection() {
  const { t, isRTL } = useLanguage();

  const scrollToInfo = () => {
    document.getElementById('project')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookInvitation = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLearnMore = () => {
    document.getElementById('project')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with better optimization */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source 
            media="(max-width: 768px)" 
            srcSet="/lovable-uploads/e8b6e733-412d-470e-b835-f4b1f65f0e4e.png" 
          />
          <img
            src="/lovable-uploads/e8b6e733-412d-470e-b835-f4b1f65f0e4e.png"
            alt="DAMAC Riverside Dubai South"
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            style={{ imageRendering: 'crisp-edges' }}
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/75"></div>
      </div>

      {/* Content Container */}
      <div className={`relative z-10 w-full pt-20 pb-16 px-4 sm:px-6 lg:px-8 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="animate-fade-in text-center space-y-6 md:space-y-8">
            
            {/* Main Title - Enhanced */}
            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 border border-white/30 shadow-2xl">
              <h1 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-damac-gold leading-tight mb-3 md:mb-4 text-center`}>
                {isRTL ? 'لأول مرة في مصر!' : 'For the first time in Egypt!'}
              </h1>
              
              <h2 className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white leading-tight mb-3 md:mb-4 text-center`}>
                {isRTL ? 'DAMAC بتقدملك فرصة استثمار حقيقية من دبي...' : 'DAMAC offers you a real investment opportunity from Dubai...'}
              </h2>

              <h3 className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-damac-gold font-bold text-center`}>
                {isRTL ? 'في معرض حصري بفندق Dusit – القاهرة الجديدة' : 'in an exclusive exhibition at Dusit Hotel – New Cairo'}
              </h3>
            </div>

            {/* Event Details - Enhanced */}
            <div className="bg-damac-navy/60 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 border border-damac-gold/50 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-4">
                <div className="flex items-center gap-2 text-white">
                  <Calendar className="w-5 h-5 text-damac-gold" />
                  <span className="text-sm sm:text-base md:text-lg font-semibold">
                    {isRTL ? '28 و29 يونيو' : 'June 28 & 29'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="w-5 h-5 text-damac-gold" />
                  <span className="text-sm sm:text-base md:text-lg font-semibold">
                    {isRTL ? 'فندق Dusit' : 'Dusit Hotel'}
                  </span>
                </div>
              </div>
              <p className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white font-bold text-center`}>
                {isRTL ? 'من 10 الصبح لـ10 بالليل' : 'From 10 AM to 10 PM'}
              </p>
            </div>

            {/* CTA Buttons - Enhanced */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4 md:pt-6">
              <Button 
                size="lg" 
                className="bg-damac-gold hover:bg-damac-gold/90 text-damac-navy font-bold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto min-w-[200px] sm:min-w-[220px] rounded-xl shadow-2xl"
                onClick={handleBookInvitation}
              >
                {isRTL ? 'احجز دعوتك الآن' : 'Book Your Invitation Now'}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-damac-gold bg-damac-gold/20 text-damac-gold hover:bg-damac-gold hover:text-damac-navy px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg transition-all duration-300 font-semibold w-full sm:w-auto min-w-[200px] sm:min-w-[220px] rounded-xl backdrop-blur-sm shadow-xl"
                onClick={handleLearnMore}
              >
                {isRTL ? 'اعرف التفاصيل' : 'Learn More'}
              </Button>
            </div>

          </div>
        </div>

        {/* Scroll Indicator - Enhanced */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={scrollToInfo} 
            className="text-damac-gold-light hover:text-damac-gold transition-colors p-3 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 shadow-lg group"
            aria-label={isRTL ? "انتقل للأسفل" : "Scroll down"}
          >
            <ArrowDown className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
