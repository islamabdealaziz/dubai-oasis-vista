
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { ArrowDown, Sparkles, Building, MapPin } from 'lucide-react';

export function HeroSection() {
  const { t, isRTL } = useLanguage();

  const scrollToEvent = () => {
    document.getElementById('event')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Enhanced Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/lovable-uploads/e8b6e733-412d-470e-b835-f4b1f65f0e4e.png"
          alt="DAMAC Riverside Dubai South"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          style={{ imageRendering: 'crisp-edges' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-damac-navy/70 to-black/90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-20 left-10 w-2 h-2 bg-damac-gold rounded-full animate-ping opacity-70"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-damac-gold-light rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-40 left-20 w-1 h-1 bg-white rounded-full animate-ping opacity-50"></div>
        <div className="absolute top-60 right-10 w-2 h-2 bg-damac-gold rounded-full animate-pulse opacity-40"></div>
      </div>

      {/* Content Container */}
      <div className={`relative z-10 w-full pt-40 pb-40 px-4 sm:px-6 lg:px-8 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="animate-fade-in text-center space-y-16">
            
            {/* Main Title with Enhanced Styling */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-damac-gold via-damac-gold-light to-damac-gold rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-black/50 backdrop-blur-xl rounded-3xl p-10 sm:p-16 border border-damac-gold/30 shadow-2xl">
                <div className="flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-damac-gold mr-4 animate-pulse" />
                  <Building className="w-10 h-10 text-damac-gold-light" />
                  <Sparkles className="w-8 h-8 text-damac-gold ml-4 animate-pulse" />
                </div>
                <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8 ${isRTL ? 'text-center' : 'text-center'} drop-shadow-2xl`}>
                  {isRTL ? 'تخيل 300،000 موظف' : 'Imagine 300,000 people'}
                </h1>
                
                <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-damac-gold via-damac-gold-light to-damac-gold bg-clip-text text-transparent leading-tight ${isRTL ? 'text-center' : 'text-center'} drop-shadow-lg`}>
                  {isRTL ? 'بيدور على مكان يأجر فيه' : 'looking for a place to rent'}
                </h2>
              </div>
            </div>

            {/* Key Message Section with Icon */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-damac-navy via-damac-blue to-damac-navy rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative bg-damac-navy/70 backdrop-blur-xl rounded-3xl p-10 sm:p-16 border border-damac-gold/60 shadow-2xl">
                <div className="flex items-center justify-center mb-6">
                  <MapPin className="w-8 h-8 text-damac-gold animate-bounce" />
                </div>
                <p className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-damac-gold font-bold ${isRTL ? 'text-center' : 'text-center'} drop-shadow-lg`}>
                  {t.hero.subtitle}
                </p>
              </div>
            </div>

            {/* Enhanced Description Section */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-white/20 via-damac-gold/20 to-white/20 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-white/20 backdrop-blur-xl rounded-3xl p-10 sm:p-16 border border-white/50 shadow-2xl">
                <div className="relative">
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-damac-gold rounded-full animate-pulse opacity-60"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-damac-gold-light rounded-full animate-ping opacity-40"></div>
                  
                  <p className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-semibold leading-relaxed ${isRTL ? 'text-center' : 'text-center'} drop-shadow-lg`}>
                    {isRTL ? (
                      <>
                        DAMAC نازلة في جنوب دبي قرب المطار{' '}
                        <span className="relative inline-block">
                          <span className="text-damac-gold font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl animate-pulse">
                            يعني إيجارات مش بتقف!
                          </span>
                          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-damac-gold to-transparent rounded-full"></div>
                        </span>
                      </>
                    ) : (
                      <>
                        DAMAC is building in Dubai South, right near the airport{' '}
                        <span className="relative inline-block">
                          <span className="text-damac-gold font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl animate-pulse">
                            which means rental demand never stops!
                          </span>
                          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-damac-gold to-transparent rounded-full"></div>
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-12">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-damac-gold via-damac-gold-light to-damac-gold rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                <Button 
                  size="lg" 
                  className="relative bg-gradient-to-r from-damac-gold to-damac-gold-light hover:from-damac-gold-light hover:to-damac-gold text-damac-navy font-bold px-12 py-6 text-xl sm:text-2xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto min-w-[280px] rounded-2xl shadow-2xl border-2 border-damac-gold"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Sparkles className="w-6 h-6 mr-3 animate-spin" />
                  {t.cta.form.submit}
                </Button>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-damac-gold/30 via-white/20 to-damac-gold/30 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="relative border-3 border-damac-gold bg-white/10 text-damac-gold hover:bg-damac-gold hover:text-damac-navy px-12 py-6 text-xl sm:text-2xl transition-all duration-300 font-semibold w-full sm:w-auto min-w-[280px] rounded-2xl backdrop-blur-xl shadow-2xl hover:shadow-damac-gold/30"
                  onClick={() => document.getElementById('project')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Building className="w-6 h-6 mr-3" />
                  {t.nav.project}
                </Button>
              </div>
            </div>

          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={scrollToEvent} 
            className="group relative text-damac-gold-light hover:text-damac-gold transition-all duration-300 p-6 bg-white/15 hover:bg-damac-gold/20 rounded-full backdrop-blur-xl border-2 border-damac-gold/30 hover:border-damac-gold shadow-2xl hover:shadow-damac-gold/30"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-damac-gold/10 to-damac-gold-light/10 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <ArrowDown className="relative w-8 h-8 animate-pulse" />
          </button>
        </div>
      </div>
    </section>
  );
}
