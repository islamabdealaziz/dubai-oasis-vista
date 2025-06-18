
import React from 'react';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

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
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={`block text-white font-medium mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t.cta.form.name} *
          </label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            className={`bg-white/20 border-white/30 text-white placeholder:text-white/60 ${isRTL ? 'text-right' : 'text-left'}`}
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
            className={`bg-white/20 border-white/30 text-white placeholder:text-white/60 ${isRTL ? 'text-right' : 'text-left'}`}
            placeholder={t.cta.form.phone}
            required
            disabled={isSubmitting}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        </div>
      </div>

      <div>
        <label className={`block text-white font-medium mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
          {t.cta.form.preference} *
        </label>
        <Select 
          value={formData.preference} 
          onValueChange={(value) => onInputChange('preference', value)}
          disabled={isSubmitting}
        >
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
    </>
  );
}
