
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { useToast } from '../hooks/use-toast';
import { crmService } from '../services/crmService';
import { FormFields } from './contact/FormFields';
import { WhatsAppSection } from './contact/WhatsAppSection';
import { ContactInfo } from './contact/ContactInfo';

export function ContactForm() {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    preference: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submission started:', formData);
    
    if (!formData.name || !formData.phone || !formData.preference) {
      console.log('Form validation failed - missing fields');
      toast({
        title: isRTL ? "خطأ في النموذج" : "Form Error",
        description: isRTL 
          ? "يرجى ملء جميع الحقول المطلوبة" 
          : "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    console.log('Starting CRM submission with data:', formData);
    
    try {
      // Submit to CRM
      const result = await crmService.submitLead(formData);
      console.log('CRM submission successful:', result);

      // Show success message
      toast({
        title: isRTL ? "تم إرسال الطلب بنجاح!" : "Request Submitted Successfully!",
        description: isRTL 
          ? "سنتواصل معك قريباً لترتيب دعوة VIP الخاصة بك" 
          : "We'll contact you soon to arrange your VIP invitation",
      });

      // Reset form
      setFormData({ name: '', phone: '', preference: '' });

    } catch (error) {
      console.error('CRM submission error:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      
      // Show error message
      toast({
        title: isRTL ? "خطأ في الإرسال" : "Submission Error",
        description: isRTL 
          ? "حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى" 
          : "There was an error submitting your request. Please try again",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
      console.log('Form submission process completed');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    console.log(`Field ${field} changed to:`, value);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWhatsAppClick = () => {
    const message = isRTL 
      ? "مرحباً، أنا مهتم بمشروع DAMAC Riverside وأريد المزيد من المعلومات"
      : "Hello, I'm interested in DAMAC Riverside project and would like more information";
    
    const whatsappUrl = `https://wa.me/201100830573?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className={`py-20 bg-gradient-to-br from-damac-navy to-damac-navy-light ${isRTL ? 'font-cairo' : 'font-inter'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.cta.title}
            </h2>
            <p className="text-xl text-white/80 mb-8">
              {t.cta.subtitle}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormFields
                formData={formData}
                isSubmitting={isSubmitting}
                isRTL={isRTL}
                t={t}
                onInputChange={handleInputChange}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-damac-gold hover:bg-damac-gold/90 text-damac-navy font-bold py-4 text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting 
                  ? (isRTL ? 'جاري الإرسال...' : 'Submitting...')
                  : t.cta.form.submit
                }
              </Button>

              <WhatsAppSection
                isRTL={isRTL}
                onWhatsAppClick={handleWhatsAppClick}
              />
            </form>

            <ContactInfo isRTL={isRTL} />
          </div>
        </div>
      </div>
    </section>
  );
}
