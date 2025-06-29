
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function KeyInfoSection() {
  const { isRTL } = useLanguage();

  const infoCards = [
    {
      icon: '📍',
      title: isRTL ? 'الموقع' : 'Location',
      description: isRTL ? 'في قلب دبي ساوث قريب من مطار آل مكتوم' : 'In the heart of Dubai South near Al Maktoum Airport'
    },
    {
      icon: '💰',
      title: isRTL ? 'السعر' : 'Price',
      description: isRTL ? 'الأسعار تبدأ من 1.2 مليون درهم' : 'Prices start from AED 1.2 million'
    },
    {
      icon: '🏆',
      title: isRTL ? 'المميزات' : 'Benefits',
      description: isRTL ? '0% ضريبة – عائد مرتفع' : '0% tax – High returns'
    },
    {
      icon: '🛂',
      title: isRTL ? 'فيزا ذهبية' : 'Golden Visa',
      description: isRTL ? 'مؤهّل للحصول على الإقامة الذهبية' : 'Eligible for Golden Residence'
    }
  ];

  return (
    <section id="info" className={`py-20 bg-gray-50 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {infoCards.map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
              >
                <div className="text-5xl mb-4">{card.icon}</div>
                <h3 className={`text-xl font-bold text-damac-navy mb-4 ${isRTL ? 'text-center' : 'text-center'}`}>
                  {card.title}
                </h3>
                <p className={`text-gray-600 leading-relaxed ${isRTL ? 'text-center' : 'text-center'}`}>
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
