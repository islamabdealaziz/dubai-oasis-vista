import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function SEOHead({ 
  title, 
  description, 
  image = '/lovable-uploads/e8b6e733-412d-470e-b835-f4b1f65f0e4e.png',
  url = window.location.href 
}: SEOHeadProps) {
  const { isRTL } = useLanguage();

  const defaultTitle = isRTL 
    ? 'DAMAC Riverside - استثمر في دبي ساوث | معرض القاهرة الجديدة'
    : 'DAMAC Riverside - Invest in Dubai South | New Cairo Exhibition';
    
  const defaultDescription = isRTL
    ? 'استثمر في مشروع DAMAC Riverside في دبي ساوث. معرض حصري في فندق Dusit القاهرة الجديدة 28-29 يونيو. أسعار تبدأ من 1.2 مليون درهم'
    : 'Invest in DAMAC Riverside project in Dubai South. Exclusive exhibition at Dusit Hotel New Cairo June 28-29. Prices starting from AED 1.2M';

  React.useEffect(() => {
    // Update document title
    document.title = title || defaultTitle;

    // Update meta tags
    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const updateProperty = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMeta('description', description || defaultDescription);
    updateMeta('keywords', isRTL 
      ? 'DAMAC, ريفرسايد, دبي ساوث, استثمار عقاري, الإمارات, القاهرة الجديدة'
      : 'DAMAC, Riverside, Dubai South, real estate investment, UAE, New Cairo'
    );

    // Open Graph tags
    updateProperty('og:title', title || defaultTitle);
    updateProperty('og:description', description || defaultDescription);
    updateProperty('og:image', image);
    updateProperty('og:url', url);
    updateProperty('og:type', 'website');

    // Twitter Card tags
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title || defaultTitle);
    updateMeta('twitter:description', description || defaultDescription);
    updateMeta('twitter:image', image);

  }, [title, description, image, url, defaultTitle, defaultDescription, isRTL]);

  return null;
}
