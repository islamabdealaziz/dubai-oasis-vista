
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { ArrowDown } from 'lucide-react';

export function HeroSection() {
  const { t, isRTL } = useLanguage();

  const scrollToInfo = () => {
    document.getElementById('info')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookInvitation = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLearnMore = () => {
    document.getElementById('info')?.scrollIntoView({ behavior: 'smooth' });
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/75"></div>
      </div>

      {/* Content Container */}
      <div className={`relative z-10 w-full pt-32 pb-32 px-4 sm:px-6 lg:px-8 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="animate-fade-in text-center space-y-12">
            
            {/* Main Title */}
            <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-white/30 shadow-2xl">
              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-damac-gold leading-tight mb-6 ${isRTL ? 'text-center' : 'text-center'}`}>
                {isRTL ? 'لأول مرة في مصر!' : 'For the first time in Egypt!'}
              </h1>
              
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 ${isRTL ? 'text-center' : 'text-center'}`}>
                {isRTL ? 'DAMAC بتقدملك فرصة استثمار حقيقية من دبي...' : 'DAMAC offers you a real investment opportunity from Dubai...'}
              </h2>

              <h3 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl text-damac-gold font-bold ${isRTL ? 'text-center' : 'text-center'}`}>
                {isRTL ? 'في معرض حصري بفندق Dusit – القاهرة الجديدة' : 'in an exclusive exhibition at Dusit Hotel – New Cairo'}
              </h3>
            </div>

            {/* Event Details */}
            <div className="bg-damac-navy/60 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-damac-gold/50 shadow-2xl">
              <p className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-bold ${isRTL ? 'text-center' : 'text-center'}`}>
                {isRTL ? 'يومي 28 و29 يونيو من 10 الصبح لـ10 بالليل.' : 'June 28 & 29, from 10 AM to 10 PM.'}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Button 
                size="lg" 
                className="bg-damac-gold hover:bg-damac-gold/90 text-damac-navy font-bold px-10 py-5 text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto min-w-[250px] rounded-2xl shadow-2xl"
                onClick={handleBookInvitation}
              >
                {isRTL ? 'احجز دعوتك الآن' : 'Book Your Invitation Now'}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-damac-gold bg-damac-gold/20 text-damac-gold hover:bg-damac-gold hover:text-damac-navy px-10 py-5 text-lg sm:text-xl transition-all duration-300 font-semibold w-full sm:w-auto min-w-[250px] rounded-2xl backdrop-blur-sm shadow-xl"
                onClick={handleLearnMore}
              >
                {isRTL ? 'اعرف التفاصيل' : 'Learn More'}
              </Button>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={scrollToInfo} 
            className="text-damac-gold-light hover:text-damac-gold transition-colors p-4 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 shadow-lg"
          >
            <ArrowDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
