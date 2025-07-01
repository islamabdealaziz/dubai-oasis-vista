
export interface PhoneProcessingResult {
  cleanPhone: string;
  countryCode: string;
  originalPhone: string;
}

export class PhoneUtils {
  private static countryCodeMap: { [key: string]: string } = {
    '+20': 'EG',   // Egypt
    '+971': 'AE',  // UAE
    '+966': 'SA',  // Saudi Arabia
    '+1': 'US',    // USA/Canada
    '+44': 'GB',   // UK
    '+33': 'FR',   // France
    '+49': 'DE',   // Germany
    '+91': 'IN',   // India
    '+86': 'CN',   // China
    '+81': 'JP',   // Japan
    '+82': 'KR',   // South Korea
    '+7': 'RU',    // Russia
    '+55': 'BR',   // Brazil
    '+61': 'AU',   // Australia
  };

  static processPhone(phone: string): PhoneProcessingResult {
    // Clean and format phone number for international use
    let cleanPhone = phone.replace(/[^\d+]/g, '');
    let countryCode = 'EG'; // Default to Egypt
    
    // If phone doesn't start with +, add + prefix
    if (!cleanPhone.startsWith('+')) {
      cleanPhone = '+' + cleanPhone;
    }
    
    // Detect country based on phone prefix
    for (const [prefix, code] of Object.entries(this.countryCodeMap)) {
      if (cleanPhone.startsWith(prefix)) {
        countryCode = code;
        break;
      }
    }
    
    console.log('Phone processed:', { 
      original: phone, 
      cleaned: cleanPhone, 
      countryCode 
    });
    
    return {
      cleanPhone,
      countryCode,
      originalPhone: phone
    };
  }

  static validatePhone(phone: string): boolean {
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    return cleanPhone.length >= 10 && cleanPhone.length <= 15;
  }
}
