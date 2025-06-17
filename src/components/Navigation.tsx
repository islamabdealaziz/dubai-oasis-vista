
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';

export function Navigation() {
  const { t, isRTL } = useLanguage();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-16 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="flex items-center">
            <img 
              src="https://damacproperties.com/images/damac-logo.svg" 
              alt="DAMAC" 
              className="h-8 w-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <span className="text-white font-bold text-xl hidden">DAMAC</span>
          </div>
          
          <div className={`hidden md:flex items-center space-x-8 ${isRTL ? 'space-x-reverse' : ''}`}>
            <a href="#home" className="text-white hover:text-damac-gold transition-colors">
              {t.nav.home}
            </a>
            <a href="#project" className="text-white hover:text-damac-gold transition-colors">
              {t.nav.project}
            </a>
            <a href="#investment" className="text-white hover:text-damac-gold transition-colors">
              {t.nav.investment}
            </a>
            <a href="#contact" className="text-white hover:text-damac-gold transition-colors">
              {t.nav.contact}
            </a>
          </div>

          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
}
