
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Phone, Globe } from 'lucide-react';

export function Footer() {
  const { isRTL } = useLanguage();

  return (
    <footer className={`bg-damac-navy text-white py-12 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          {/* DAMAC Logo and Info */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/4b404a76-0735-4f2e-9902-e597e7670677.png" 
              alt="DAMAC" 
              className="h-16 w-auto brightness-0 invert"
            />
            <p className="text-white/80 text-sm max-w-md">
              {isRTL 
                ? "شركة رائدة في تطوير العقارات الفاخرة في دبي والشرق الأوسط"
                : "Leading luxury real estate developer in Dubai and the Middle East"
              }
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-damac-gold">
              {isRTL ? "تواصل معنا" : "Contact Us"}
            </h3>
            <div className="space-y-3">
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Mail className="w-5 h-5 text-damac-gold" />
                <a href="mailto:info@dlleni.com" className="text-white/80 hover:text-white transition-colors">
                  info@dlleni.com
                </a>
              </div>
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Phone className="w-5 h-5 text-damac-gold" />
                <a href="tel:+201100830573" className="text-white/80 hover:text-white transition-colors">
                  +201100830573
                </a>
              </div>
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Globe className="w-5 h-5 text-damac-gold" />
                <a href="https://dlleni.com/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                  dlleni.com
                </a>
              </div>
            </div>
          </div>

          {/* Project Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-damac-gold">
              {isRTL ? "مشروع ريفرسايد" : "Riverside Project"}
            </h3>
            <p className="text-white/80 text-sm">
              {isRTL 
                ? "استثمر في مستقبل دبي مع مشروع ريفرسايد في دبي ساوث"
                : "Invest in Dubai's future with Riverside project in Dubai South"
              }
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className={`mt-12 pt-8 border-t border-white/20 text-center ${isRTL ? 'text-right' : 'text-left'}`}>
          <p className="text-white/60 text-sm">
            © 2024 Dlleni. {isRTL ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}
