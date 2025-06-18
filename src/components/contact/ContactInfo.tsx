
import React from 'react';

interface ContactInfoProps {
  isRTL: boolean;
}

export function ContactInfo({ isRTL }: ContactInfoProps) {
  return (
    <div className="mt-8 pt-8 border-t border-white/20">
      <div className="grid md:grid-cols-2 gap-6 text-center">
        <div>
          <h4 className="text-white font-semibold mb-2">
            {isRTL ? 'اتصل بنا' : 'Call Us'}
          </h4>
          <p className="text-white/80">+201100830573</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">
            {isRTL ? 'البريد الإلكتروني' : 'Email'}
          </h4>
          <p className="text-white/80">info@dlleni.com</p>
        </div>
      </div>
    </div>
  );
}
