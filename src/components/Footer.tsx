
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { isRTL } = useLanguage();

  return (
    <footer className={`bg-damac-navy text-white py-12 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className={`grid md:grid-cols-3 gap-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div>
              <h3 className="text-xl font-bold mb-4">
                {isRTL ? 'عن DAMAC' : 'About DAMAC'}
              </h3>
              <p className="text-white/80 leading-relaxed">
                {isRTL 
                  ? 'شركة DAMAC Properties هي واحدة من أكبر شركات التطوير العقاري في دبي والشرق الأوسط، مع محفظة متنوعة من المشاريع السكنية والتجارية الفاخرة.'
                  : 'DAMAC Properties is one of the largest real estate development companies in Dubai and the Middle East, with a diverse portfolio of luxury residential and commercial projects.'
                }
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">
                {isRTL ? 'روابط سريعة' : 'Quick Links'}
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-white/80 hover:text-damac-gold transition-colors">
                    {isRTL ? 'الرئيسية' : 'Home'}
                  </a>
                </li>
                <li>
                  <a href="#project" className="text-white/80 hover:text-damac-gold transition-colors">
                    {isRTL ? 'المشروع' : 'Project'}
                  </a>
                </li>
                <li>
                  <a href="#investment" className="text-white/80 hover:text-damac-gold transition-colors">
                    {isRTL ? 'الاستثمار' : 'Investment'}
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-white/80 hover:text-damac-gold transition-colors">
                    {isRTL ? 'تواصل معنا' : 'Contact'}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">
                {isRTL ? 'معلومات التواصل' : 'Contact Information'}
              </h3>
              <div className="space-y-3">
                <p className="text-white/80">
                  📞 +971 4 123 4567
                </p>
                <p className="text-white/80">
                  ✉️ riverside@damac.com
                </p>
                <p className="text-white/80">
                  📍 {isRTL ? 'دبي ساوث، الإمارات العربية المتحدة' : 'Dubai South, UAE'}
                </p>
              </div>
            </div>
          </div>

          <div className={`border-t border-white/20 mt-8 pt-8 text-center ${isRTL ? 'text-right' : 'text-left'}`}>
            <p className="text-white/60">
              © 2024 DAMAC Properties. {isRTL ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
