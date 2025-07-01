import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Phone, Globe, ExternalLink } from 'lucide-react';

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
              alt="DAMAC Logo" 
              className="h-16 w-auto brightness-0 invert"
              loading="lazy"
              style={{ imageRendering: 'crisp-edges' }}
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
                <Mail className="w-5 h-5 text-damac-gold flex-shrink-0" aria-hidden="true" />
                <a 
                  href="mailto:info@dlleni.com" 
                  className="text-white/80 hover:text-white transition-colors break-all"
                  aria-label="Send email to info@dlleni.com"
                >
                  info@dlleni.com
                </a>
              </div>
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Phone className="w-5 h-5 text-damac-gold flex-shrink-0" aria-hidden="true" />
                <a 
                  href="tel:+201100830573" 
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Call +201100830573"
                >
                  +201100830573
                </a>
              </div>
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Globe className="w-5 h-5 text-damac-gold flex-shrink-0" aria-hidden="true" />
                <a 
                  href="https://dlleni.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/80 hover:text-white transition-colors flex items-center gap-1"
                  aria-label="Visit dlleni.com (opens in new tab)"
                >
                  dlleni.com
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
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
            <div className="space-y-2">
              <div className="text-sm text-white/60">
                <strong className="text-damac-gold">
                  {isRTL ? "الموقع:" : "Location:"}
                </strong>
                <span className="ml-2">
                  {isRTL ? "دبي ساوث، الإمارات" : "Dubai South, UAE"}
                </span>
              </div>
              <div className="text-sm text-white/60">
                <strong className="text-damac-gold">
                  {isRTL ? "الأسعار تبدأ من:" : "Starting from:"}
                </strong>
                <span className="ml-2">AED 1.2M</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={`mt-12 pt-8 border-t border-white/20 text-center`}>
          <p className="text-white/60 text-sm">
            © 2024 <a 
              href="https://dlleni.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-damac-gold hover:text-white transition-colors"
              aria-label="Visit Dlleni website"
            >
              Dlleni
            </a>. {isRTL ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}
