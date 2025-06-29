
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const projectImages = [
  '/lovable-uploads/3c0ae8d1-2bb8-46cb-883f-ba8902b9b3e2.png',
  '/lovable-uploads/131c08cb-91ea-4349-9e7c-72718ef6c495.png',
  '/lovable-uploads/dc23b353-85af-4f4a-8c82-fec07b5b6e99.png',
  '/lovable-uploads/e45c4084-2529-4777-b6f9-cc57a733489c.png',
  '/lovable-uploads/1b485c9f-4b69-466d-963c-b2a1c71ff8b9.png',
  '/lovable-uploads/d2dfafab-1557-4011-ba7e-4508f468996e.png',
  '/lovable-uploads/d1dd3a8d-f3db-4ea3-91e7-0f9c09ac247d.png',
  '/lovable-uploads/15865da8-336a-4f9e-aba0-1cd226b46ec2.png',
  '/lovable-uploads/e72b53ef-0ad6-4997-a79b-a37fe9ac1719.png'
];

export function ProjectGallery() {
  const { isRTL } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  return (
    <section id="info" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            <h2 className={`text-4xl md:text-5xl font-bold text-damac-navy mb-6 ${isRTL ? 'text-center' : 'text-center'}`}>
              {isRTL ? 'مشروع DAMAC Riverside' : 'DAMAC Riverside Project'}
            </h2>
            <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${isRTL ? 'text-center' : 'text-center'}`}>
              {isRTL 
                ? 'اكتشف الحياة الفاخرة على ضفاف الماء في قلب دبي ساوث مع مرافق عالمية المستوى وتصميم معماري متطور'
                : 'Discover luxury waterfront living in the heart of Dubai South with world-class amenities and sophisticated architectural design'
              }
            </p>
          </div>

          {/* Main Gallery */}
          <div className="relative mb-8">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={projectImages[currentIndex]}
                alt={`DAMAC Riverside ${currentIndex + 1}`}
                className="w-full h-full object-cover object-center transition-transform duration-500"
                loading="lazy"
                style={{ 
                  imageRendering: 'crisp-edges'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white border-none shadow-lg"
              onClick={prevImage}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white border-none shadow-lg"
              onClick={nextImage}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center space-x-2 mb-8">
            {projectImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-damac-gold scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-damac-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className={`text-xl font-semibold text-damac-navy mb-2 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {isRTL ? 'الموقع' : 'Location'}
              </h3>
              <p className={`text-gray-600 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {isRTL 
                  ? 'في قلب دبي ساوث قريب من مطار آل مكتوم'
                  : 'In the heart of Dubai South near Al Maktoum Airport'
                }
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-damac-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className={`text-xl font-semibold text-damac-navy mb-2 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {isRTL ? 'السعر' : 'Price'}
              </h3>
              <p className={`text-gray-600 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {isRTL 
                  ? 'الأسعار تبدأ من 1.2 مليون درهم'
                  : 'Prices start from AED 1.2 million'
                }
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-damac-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className={`text-xl font-semibold text-damac-navy mb-2 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {isRTL ? 'المميزات' : 'Benefits'}
              </h3>
              <p className={`text-gray-600 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {isRTL ? '0% ضريبة – عائد مرتفع' : '0% tax – High returns'}
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-damac-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛂</span>
              </div>
              <h3 className={`text-xl font-semibold text-damac-navy mb-2 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {isRTL ? 'فيزا ذهبية' : 'Golden Visa'}
              </h3>
              <p className={`text-gray-600 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {isRTL 
                  ? 'مؤهّل للحصول على الإقامة الذهبية'
                  : 'Eligible for Golden Residence'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
