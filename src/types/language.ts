
export type Language = 'en' | 'ar';

export interface Translation {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  event: {
    title: string;
    subtitle: string;
    description: string;
    date: string;
    time: string;
  };
  keyInfo: {
    location: {
      title: string;
      description: string;
    };
    price: {
      title: string;
      description: string;
    };
    benefits: {
      title: string;
      items: string[];
    };
    visa: {
      title: string;
      description: string;
    };
  };
  cta: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      phone: string;
      preference: string;
      submit: string;
    };
  };
  nav: {
    home: string;
    project: string;
    investment: string;
    contact: string;
  };
}
