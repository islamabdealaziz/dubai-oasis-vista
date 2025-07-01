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
  const [submitAttempts, setSubmitAttempts] = useState(0);

  // Enhanced validation
  const validateForm = () => {
    const errors: string[] = [];
    
    if (!formData.name.trim()) {
      errors.push(isRTL ? "الاسم مطلوب" : "Name is required");
    } else if (formData.name.trim().length < 2) {
      errors.push(isRTL ? "الاسم يجب أن يكون حرفين على الأقل" : "Name must be at least 2 characters");
    }
    
    if (!formData.phone.trim()) {
      errors.push(isRTL ? "رقم الهاتف مطلوب" : "Phone number is required");
    } else if (!/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.phone.trim())) {
      errors.push(isRTL ? "رقم الهاتف غير صحيح" : "Invalid phone number format");
    }
    
    if (!formData.preference) {
      errors.push(isRTL ? "نوع الوحدة مطلوب" : "Unit preference is required");
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      toast({
        title: isRTL ? "خطأ في النموذج" : "Form Error",
        description: validationErrors.join('. '),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitAttempts(prev => prev + 1);
    
    try {
      console.log('=== Form Submission Started ===');
      console.log('Attempt:', submitAttempts + 1);
      console.log('Form data:', formData);
      
      const result = await crmService.submitLead(formData);
      
      if (result) {
        toast({
          title: isRTL ? "تم إرسال الطلب بنجاح!" : "Request Submitted Successfully!",
          description: isRTL 
            ? "سنتواصل معك قريباً لترتيب دعوة VIP الخاصة بك" 
            : "We'll contact you soon to arrange your VIP invitation",
        });

        // Reset form
        setFormData({ name: '', phone: '', preference: '' });
        setSubmitAttempts(0);
      } else {
        throw new Error('CRM submission returned false');
      }

    } catch (error) {
      console.error('❌ Form submission error:', error);
      
      // Enhanced error messaging based on attempt count
      let errorMessage = isRTL 
        ? "حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى" 
        : "There was an error submitting your request. Please try again";
      
      if (submitAttempts >= 2) {
        errorMessage = isRTL
          ? "يرجى التواصل معنا مباشرة عبر الواتساب أو الهاتف"
          : "Please contact us directly via WhatsApp or phone";
      }
      
      toast({
        title: isRTL ? "خطأ في الإرسال" : "Submission Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWhatsAppClick = () => {
    const message = isRTL 
      ? `مرحباً، أنا مهتم بمشروع DAMAC Riverside وأريد المزيد من المعلومات.
      
الاسم: ${formData.name}
الهاتف: ${formData.phone}
نوع الوحدة المفضلة: ${formData.preference}`
      : `Hello, I'm interested in DAMAC Riverside project and would like more information.

Name: ${formData.name}
Phone: ${formData.phone}
Unit Preference: ${formData.preference}`;
    
    const whatsappUrl = `https://wa.me/201100830573?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className={`py-12 md:py-20 bg-gradient-to-br from-damac-navy to-damac-navy-light ${isRTL ? 'font-cairo' : 'font-inter'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-8 md:mb-12`}>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 text-center`}>
              {t.cta.title}
            </h2>
            <p className={`text-lg md:text-xl text-white/80 mb-6 md:mb-8 text-center`}>
              {t.cta.subtitle}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormFields
                formData={formData}
                isSubmitting={isSubmitting}
                isRTL={isRTL}
                t={t}
                onInputChange={handleInputChange}
              />

              {/* Enhanced Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-damac-gold hover:bg-damac-gold/90 text-damac-navy font-bold py-3 md:py-4 text-base md:text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting 
                  ? (isRTL ? 'جاري الإرسال...' : 'Submitting...')
                  : t.cta.form.submit
                }
              </Button>

              {/* Show retry message after failed attempts */}
              {submitAttempts >= 2 && (
                <div className="text-center text-white/80 text-sm">
                  {isRTL 
                    ? "في حالة استمرار المشكلة، يرجى التواصل معنا مباشرة" 
                    : "If the problem persists, please contact us directly"
                  }
                </div>
              )}

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
