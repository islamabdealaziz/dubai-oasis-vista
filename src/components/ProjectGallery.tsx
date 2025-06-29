
import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
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
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});
  const [preloadedImages, setPreloadedImages] = useState<Set<number>>(new Set());

  // Preload current and next images
  const preloadImage = useCallback((index: number) => {
    if (preloadedImages.has(index)) return;
    
    const img = new Image();
    img.onload = () => {
      setImageLoaded(prev => ({ ...prev, [index]: true }));
      setPreloadedImages(prev => new Set([...prev, index]));
    };
    img.src = projectImages[index];
  }, [preloadedImages]);

  // Preload initial images
  useEffect(() => {
    // Preload current image and next 2 images
    for (let i = 0; i < Math.min(3, projectImages.length); i++) {
      preloadImage(i);
    }
  }, [preloadImage]);

  // Preload next images when current index changes
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % projectImages.length;
    const prevIndex = (currentIndex - 1 + projectImages.length) % projectImages.length;
    
    preloadImage(nextIndex);
    preloadImage(prevIndex);
  }, [currentIndex, preloadImage]);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % projectImages.length;
      setIsLoading(!imageLoaded[next]);
      return next;
    });
  }, [imageLoaded]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = (prev - 1 + projectImages.length) % projectImages.length;
      setIsLoading(!imageLoaded[next]);
      return next;
    });
  }, [imageLoaded]);

  const goToImage = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsLoading(!imageLoaded[index]);
    preloadImage(index);
  }, [imageLoaded, preloadImage]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevImage();
      } else if (event.key === 'ArrowRight') {
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextImage, prevImage]);

  // Auto-advance gallery (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      if (imageLoaded[currentIndex]) {
        nextImage();
      }
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, imageLoaded, nextImage]);

  return (
    <section id="gallery" className="py-12 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-12 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            <h2 className={`text-3xl md:text-4xl font-bold text-damac-navy mb-4 ${isRTL ? 'text-center' : 'text-center'}`}>
              {isRTL ? 'معرض مشروع DAMAC Riverside' : 'DAMAC Riverside Gallery'}
            </h2>
            <p className={`text-lg text-gray-600 max-w-2xl mx-auto ${isRTL ? 'text-center' : 'text-center'}`}>
              {isRTL 
                ? 'استكشف الحياة الفاخرة على ضفاف الماء في قلب دبي ساوث'
                : 'Explore luxury waterfront living in the heart of Dubai South'
              }
            </p>
          </div>

          {/* Enhanced Gallery */}
          <div className="relative mb-8 group">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gray-200">
              {/* Loading Spinner */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                  <Loader2 className="w-8 h-8 animate-spin text-damac-gold" />
                </div>
              )}
              
              {/* Main Image */}
              <img
                src={projectImages[currentIndex]}
                alt={`DAMAC Riverside ${currentIndex + 1}`}
                className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${
                  isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                }`}
                loading="eager"
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
              />
              
              {/* Enhanced Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10"></div>
              
              {/* Image Counter */}
              <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                {currentIndex + 1} / {projectImages.length}
              </div>
            </div>

            {/* Enhanced Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border-none shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              onClick={prevImage}
              disabled={isLoading}
            >
              <ChevronLeft className="w-6 h-6 text-damac-navy" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border-none shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              onClick={nextImage}
              disabled={isLoading}
            >
              <ChevronRight className="w-6 h-6 text-damac-navy" />
            </Button>
          </div>

          {/* Enhanced Thumbnail Navigation */}
          <div className="flex justify-center space-x-3 mb-12 overflow-x-auto pb-2">
            {projectImages.map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all duration-300 border-2 ${
                  index === currentIndex 
                    ? 'border-damac-gold scale-110 shadow-lg' 
                    : 'border-transparent hover:border-gray-300 hover:scale-105'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>

          {/* Enhanced Key Features Grid */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="group text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-damac-gold/20 to-damac-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className={`text-xl font-semibold text-damac-navy mb-2 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {isRTL ? 'الموقع' : 'Location'}
              </h3>
              <p className={`text-gray-600 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {isRTL 
                  ? 'في قلب دبي ساوث قريب من مطار آل مكتوم'
                  : 'Heart of Dubai South near Al Maktoum Airport'
                }
              </p>
            </div>

            <div className="group text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-damac-gold/20 to-damac-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className={`text-xl font-semibold text-damac-navy mb-2 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {isRTL ? 'السعر' : 'Price'}
              </h3>
              <p className={`text-gray-600 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {isRTL 
                  ? 'الأسعار تبدأ من 1.2 مليون درهم'
                  : 'Starting from AED 1.2 million'
                }
              </p>
            </div>

            <div className="group text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-damac-gold/20 to-damac-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className={`text-xl font-semibold text-damac-navy mb-2 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {isRTL ? 'المميزات' : 'Benefits'}
              </h3>
              <p className={`text-gray-600 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {isRTL ? '0% ضريبة – عائد مرتفع' : '0% tax – High returns'}
              </p>
            </div>

            <div className="group text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-damac-gold/20 to-damac-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
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
