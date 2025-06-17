
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function KeyInfoSection() {
  const { t, isRTL } = useLanguage();

  const infoCards = [
    {
      title: t.keyInfo.location.title,
      description: t.keyInfo.location.description,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: t.keyInfo.price.title,
      description: t.keyInfo.price.description,
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: t.keyInfo.benefits.title,
      description: t.keyInfo.benefits.items.join('\n• '),
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: t.keyInfo.visa.title,
      description: t.keyInfo.visa.description,
      gradient: 'from-damac-gold to-yellow-500'
    }
  ];

  return (
    <section id="investment" className={`py-20 bg-white ${isRTL ? 'font-cairo' : 'font-inter'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-damac-navy mb-6">
              {isRTL ? 'معلومات الاستثمار الأساسية' : 'Key Investment Information'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {isRTL 
                ? 'اكتشف المزايا الاستثمارية الفريدة لمشروع DAMAC Riverside في دبي ساوث'
                : 'Discover the unique investment advantages of DAMAC Riverside in Dubai South'
              }
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {infoCards.map((card, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-90`}></div>
                <div className="relative p-8 text-white">
                  <h3 className={`text-2xl font-bold mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {card.title}
                  </h3>
                  <div className={`text-lg leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                    {card.description.split('\n').map((line, lineIndex) => (
                      <p key={lineIndex} className="mb-2">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30"></div>
              </div>
            ))}
          </div>

          {/* Additional Benefits */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl mb-4">✈️</div>
              <h4 className={`text-lg font-semibold text-damac-navy mb-2 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {isRTL ? 'قرب المطار' : 'Airport Proximity'}
              </h4>
              <p className={`text-gray-600 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {isRTL ? '5 دقائق من مطار آل مكتوم الدولي' : '5 minutes from Al Maktoum International Airport'}
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl mb-4">🚇</div>
              <h4 className={`text-lg font-semibold text-damac-navy mb-2 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {isRTL ? 'المترو القادم' : 'Upcoming Metro'}
              </h4>
              <p className={`text-gray-600 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {isRTL ? 'محطة مترو دبي الجديدة 2030' : 'New Dubai Metro Station 2030'}
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-4xl mb-4">🌟</div>
              <h4 className={`text-lg font-semibold text-damac-navy mb-2 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {isRTL ? 'استثمار مضمون' : 'Guaranteed ROI'}
              </h4>
              <p className={`text-gray-600 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {isRTL ? 'عوائد سنوية تصل إلى 8%' : 'Annual returns up to 8%'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
