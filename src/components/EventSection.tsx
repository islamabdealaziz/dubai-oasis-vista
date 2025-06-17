
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Calendar, Clock, MapPin } from 'lucide-react';

export function EventSection() {
  const { t, isRTL } = useLanguage();

  return (
    <section id="event" className={`py-20 bg-gradient-to-br from-damac-navy to-damac-navy-light ${isRTL ? 'font-cairo' : 'font-inter'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className={`text-4xl md:text-5xl font-bold text-white mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t.event.title}
            </h2>
            <h3 className={`text-2xl md:text-3xl text-damac-gold mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t.event.subtitle}
            </h3>
            <p className={`text-xl text-white/90 mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t.event.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Calendar className="w-8 h-8 text-damac-gold mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">
                {isRTL ? 'التاريخ' : 'Date'}
              </h4>
              <p className="text-white/80">{t.event.date}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Clock className="w-8 h-8 text-damac-gold mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">
                {isRTL ? 'الوقت' : 'Time'}
              </h4>
              <p className="text-white/80">{t.event.time}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <MapPin className="w-8 h-8 text-damac-gold mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">
                {isRTL ? 'المكان' : 'Location'}
              </h4>
              <p className="text-white/80">
                {isRTL ? 'فندق دوسيت - القاهرة الجديدة' : 'Dusit Hotel - New Cairo'}
              </p>
            </div>
          </div>

          <Button 
            size="lg"
            className="bg-damac-gold hover:bg-damac-gold/90 text-damac-navy font-semibold px-12 py-4 text-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t.cta.form.submit}
          </Button>
        </div>
      </div>
    </section>
  );
}
