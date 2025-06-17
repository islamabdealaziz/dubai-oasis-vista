
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';

export function ContactForm() {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    preference: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    toast({
      title: isRTL ? "تم إرسال الطلب بنجاح!" : "Request Submitted Successfully!",
      description: isRTL 
        ? "سنتواصل معك قريباً لترتيب دعوة VIP الخاصة بك" 
        : "We'll contact you soon to arrange your VIP invitation",
    });

    // Reset form
    setFormData({ name: '', phone: '', preference: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className={`py-20 bg-gradient-to-br from-damac-navy to-damac-navy-light ${isRTL ? 'font-cairo' : 'font-inter'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.cta.title}
            </h2>
            <p className="text-xl text-white/80 mb-8">
              {t.cta.subtitle}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-white font-medium mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t.cta.form.name}
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`bg-white/20 border-white/30 text-white placeholder:text-white/60 ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={t.cta.form.name}
                    required
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>

                <div>
                  <label className={`block text-white font-medium mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t.cta.form.phone}
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`bg-white/20 border-white/30 text-white placeholder:text-white/60 ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={t.cta.form.phone}
                    required
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-white font-medium mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t.cta.form.preference}
                </label>
                <Select value={formData.preference} onValueChange={(value) => handleInputChange('preference', value)}>
                  <SelectTrigger className={`bg-white/20 border-white/30 text-white ${isRTL ? 'text-right' : 'text-left'}`}>
                    <SelectValue placeholder={t.cta.form.preference} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1bedroom">
                      {isRTL ? '1 غرفة نوم' : '1 Bedroom'}
                    </SelectItem>
                    <SelectItem value="2bedroom">
                      {isRTL ? '2 غرفة نوم' : '2 Bedroom'}
                    </SelectItem>
                    <SelectItem value="3bedroom">
                      {isRTL ? '3 غرف نوم' : '3 Bedroom'}
                    </SelectItem>
                    <SelectItem value="penthouse">
                      {isRTL ? 'بنتهاوس' : 'Penthouse'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-damac-gold hover:bg-damac-gold/90 text-damac-navy font-bold py-4 text-lg transition-all duration-300 transform hover:scale-105"
              >
                {t.cta.form.submit}
              </Button>
            </form>

            {/* Contact Information */}
            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="grid md:grid-cols-2 gap-6 text-center">
                <div>
                  <h4 className="text-white font-semibold mb-2">
                    {isRTL ? 'اتصل بنا' : 'Call Us'}
                  </h4>
                  <p className="text-white/80">+971 4 123 4567</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">
                    {isRTL ? 'البريد الإلكتروني' : 'Email'}
                  </h4>
                  <p className="text-white/80">riverside@damac.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
