
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, Translation } from '../types/language';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
  isRTL: boolean;
}

const translations: Record<Language, Translation> = {
  en: {
    hero: {
      title: "Imagine 300,000 people looking for a place to rent.",
      subtitle: "300,000 is the number of employees at Al Maktoum Airport.",
      description: "DAMAC is building in Dubai South, right near the airport — which means rental demand never stops."
    },
    event: {
      title: "For the first time in Egypt,",
      subtitle: "DAMAC is hosting a major exhibition at Dusit Hotel – New Cairo.",
      description: "Join us on June 28 & 29, from 10 AM to 10 PM.",
      date: "June 28 & 29",
      time: "10 AM to 10 PM"
    },
    keyInfo: {
      location: {
        title: "📍 Location",
        description: "Strategically located in Dubai South, just minutes from Al Maktoum Airport and the upcoming metro line."
      },
      price: {
        title: "💰 Starting Price",
        description: "Units start from AED 1.2M for a 1-bedroom apartment."
      },
      benefits: {
        title: "🏆 Top Benefits",
        items: [
          "0% tax on property and rental income",
          "High ROI in one of Dubai's fastest-growing areas"
        ]
      },
      visa: {
        title: "🛂 Golden Visa",
        description: "Eligible for the UAE Golden Visa with your investment."
      }
    },
    cta: {
      title: "Get your VIP invitation & discover all the details.",
      subtitle: "Book your exclusive consultation today",
      form: {
        name: "Full Name",
        phone: "Phone Number",
        preference: "Unit Preference",
        submit: "Get VIP Invitation"
      }
    },
    nav: {
      home: "Home",
      project: "Project",
      investment: "Investment",
      contact: "Contact"
    }
  },
  ar: {
    hero: {
      title: "تخيل 300،000 موظف بيدور على مكان يأجر فيه",
      subtitle: "300،000 ده رقم لعدد العاملين في مطار المكتوم",
      description: "Damac نازلة في جنوب دبي قرب المطار، يعني إيجارات مش بتقف"
    },
    event: {
      title: "لأول مرة في مصر!",
      subtitle: "DAMAC بتقدملك فرصة استثمار حقيقية من دبي... في معرض حصري بفندق Dusit – القاهرة الجديدة",
      description: "يومي 28 و29 يونيو من 10 الصبح لـ10 بالليل.",
      date: "28 و29 يونيو",
      time: "10 الصبح لـ10 بالليل"
    },
    keyInfo: {
      location: {
        title: "📍 الموقع",
        description: "في قلب دبي ساوث – قريب جدًا من مطار آل مكتوم وخط المترو الجديد."
      },
      price: {
        title: "💰 السعر",
        description: "الأسعار تبدأ من 1.2 مليون درهم لشقة غرفة واحدة."
      },
      benefits: {
        title: "🏆 مميزات قوية",
        items: [
          "0% ضرائب على العقارات والإيجار",
          "عوائد استثمارية مرتفعة في منطقة نمو سريع"
        ]
      },
      visa: {
        title: "🛂 فيزا ذهبية",
        description: "مؤهّل للحصول على الإقامة الذهبية في الإمارات عند الاستثمار في المشروع."
      }
    },
    cta: {
      title: "احجز دعوتك الـVIP واعرف كل التفاصيل.",
      subtitle: "احجز استشارتك الحصرية اليوم",
      form: {
        name: "الاسم الكامل",
        phone: "رقم الهاتف",
        preference: "نوع الوحدة المفضلة",
        submit: "احجز دعوة VIP"
      }
    },
    nav: {
      home: "الرئيسية",
      project: "المشروع",
      investment: "الاستثمار",
      contact: "تواصل معنا"
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar');

  const value = {
    language,
    setLanguage,
    t: translations[language],
    isRTL: language === 'ar'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
