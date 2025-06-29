
import React from 'react';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

interface FormFieldsProps {
  formData: {
    name: string;
    phone: string;
    preference: string;
  };
  isSubmitting: boolean;
  isRTL: boolean;
  t: any;
  onInputChange: (field: string, value: string) => void;
}

export function FormFields({ formData, isSubmitting, isRTL, t, onInputChange }: FormFieldsProps) {
  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label className={`block text-white font-medium mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t.cta.form.name} *
          </label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            className={`bg-white/20 border-white/30 text-white placeholder:text-white/60 ${isRTL ? 'text-right' : 'text-left'} focus:ring-2 focus:ring-damac-gold focus:border-transparent`}
            placeholder={t.cta.form.name}
            required
            disabled={isSubmitting}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        </div>

        <div>
          <label className={`block text-white font-medium mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t.cta.form.phone} *
          </label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            className={`bg-white/20 border-white/30 text-white placeholder:text-white/60 ${isRTL ? 'text-right' : 'text-left'} focus:ring-2 focus:ring-damac-gold focus:border-transparent`}
            placeholder={t.cta.form.phone}
            required
            disabled={isSubmitting}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        </div>
      </div>

      <div>
        <label className={`block text-white font-medium mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          {t.cta.form.preference} *
        </label>
        <RadioGroup 
          value={formData.preference} 
          onValueChange={(value) => onInputChange('preference', value)}
          disabled={isSubmitting}
          className="space-y-3"
        >
          <div className={`flex items-center bg-white/10 rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-colors ${isRTL ? 'flex-row-reverse space-x-reverse' : 'flex-row'} space-x-3`}>
            <RadioGroupItem 
              value="1bedroom" 
              id="1bedroom" 
              className="border-white text-white data-[state=checked]:bg-damac-gold data-[state=checked]:border-damac-gold flex-shrink-0" 
            />
            <Label 
              htmlFor="1bedroom" 
              className={`flex-1 cursor-pointer text-white ${isRTL ? 'text-right mr-3' : 'text-left ml-3'}`}
            >
              <div className="font-medium text-base">
                {isRTL ? '1 غرفة نوم' : '1 Bedroom'}
              </div>
              <div className={`text-sm text-white/80 mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL ? 'سعر يبدأ من 1.2 م درهم إماراتي' : 'Starting from 1.2M AED'}
              </div>
            </Label>
          </div>

          <div className={`flex items-center bg-white/10 rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-colors ${isRTL ? 'flex-row-reverse space-x-reverse' : 'flex-row'} space-x-3`}>
            <RadioGroupItem 
              value="2bedroom" 
              id="2bedroom" 
              className="border-white text-white data-[state=checked]:bg-damac-gold data-[state=checked]:border-damac-gold flex-shrink-0" 
            />
            <Label 
              htmlFor="2bedroom" 
              className={`flex-1 cursor-pointer text-white ${isRTL ? 'text-right mr-3' : 'text-left ml-3'}`}
            >
              <div className="font-medium text-base">
                {isRTL ? '2 غرفة نوم' : '2 Bedroom'}
              </div>
              <div className={`text-sm text-white/80 mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL ? 'سعر يبدأ من 1.7 م درهم إماراتي' : 'Starting from 1.7M AED'}
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </>
  );
}
