
import React from 'react';
import { Button } from '../ui/button';
import { MessageCircle } from 'lucide-react';

interface WhatsAppSectionProps {
  isRTL: boolean;
  onWhatsAppClick: () => void;
}

export function WhatsAppSection({ isRTL, onWhatsAppClick }: WhatsAppSectionProps) {
  return (
    <div className="relative">
      <div className={`flex items-center gap-3 mb-4`}>
        <div className="flex-1 h-px bg-white/20"></div>
        <span className={`text-white/60 text-sm px-3 ${isRTL ? 'text-right' : 'text-left'}`}>
          {isRTL ? 'أو تواصل معنا عبر' : 'Or contact us via'}
        </span>
        <div className="flex-1 h-px bg-white/20"></div>
      </div>
      
      <Button
        type="button"
        size="lg"
        onClick={onWhatsAppClick}
        className={`w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
      >
        <MessageCircle className="w-5 h-5" />
        <span>{isRTL ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}</span>
      </Button>
    </div>
  );
}
