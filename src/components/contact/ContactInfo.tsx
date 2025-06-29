
import React from 'react';

interface ContactInfoProps {
  isRTL: boolean;
}

export function ContactInfo({ isRTL }: ContactInfoProps) {
  return (
    <div className="mt-8 pt-8 border-t border-white/20">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
          <h4 className="text-white font-semibold mb-2">
            {isRTL ? 'اتصل بنا' : 'Call Us'}
          </h4>
          <p className="text-white/80" dir="ltr">+201100830573</p>
        </div>
        <div className={`text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
          <h4 className="text-white font-semibold mb-2">
            {isRTL ? 'البريد الإلكتروني' : 'Email'}
          </h4>
          <p className="text-white/80" dir="ltr">info@dlleni.com</p>
        </div>
      </div>
    </div>
  );
}
