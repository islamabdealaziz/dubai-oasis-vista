
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
      className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
    >
      <Globe className="w-4 h-4 mr-2" />
      {language === 'en' ? 'العربية' : 'English'}
    </Button>
  );
}
