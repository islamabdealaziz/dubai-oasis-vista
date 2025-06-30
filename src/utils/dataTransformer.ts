
import { FormSubmissionData, LeadData } from '../types/crm';

export class DataTransformer {
  static transformFormDataToSubmissionData(formData: { name: string; phone: string; preference: string }): FormSubmissionData {
    console.log('Transforming form data to submission data:', formData);
    
    // Extract first and last name from full name
    const nameParts = formData.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    // Clean and format phone number for international use
    let cleanPhone = formData.phone.replace(/[^\d+]/g, '');
    let countryCode = 'EG'; // Default to Egypt
    
    // If phone doesn't start with +, add + prefix
    if (!cleanPhone.startsWith('+')) {
      cleanPhone = '+' + cleanPhone;
    }
    
    // Detect country based on phone prefix
    if (cleanPhone.startsWith('+20')) {
      countryCode = 'EG'; // Egypt
    } else if (cleanPhone.startsWith('+971')) {
      countryCode = 'AE'; // UAE
    } else if (cleanPhone.startsWith('+966')) {
      countryCode = 'SA'; // Saudi Arabia
    } else if (cleanPhone.startsWith('+1')) {
      countryCode = 'US'; // USA/Canada
    } else if (cleanPhone.startsWith('+44')) {
      countryCode = 'GB'; // UK
    } else if (cleanPhone.startsWith('+33')) {
      countryCode = 'FR'; // France
    } else if (cleanPhone.startsWith('+49')) {
      countryCode = 'DE'; // Germany
    } else if (cleanPhone.startsWith('+91')) {
      countryCode = 'IN'; // India
    } else if (cleanPhone.startsWith('+86')) {
      countryCode = 'CN'; // China
    } else if (cleanPhone.startsWith('+81')) {
      countryCode = 'JP'; // Japan
    } else if (cleanPhone.startsWith('+82')) {
      countryCode = 'KR'; // South Korea
    } else if (cleanPhone.startsWith('+7')) {
      countryCode = 'RU'; // Russia
    } else if (cleanPhone.startsWith('+55')) {
      countryCode = 'BR'; // Brazil
    } else if (cleanPhone.startsWith('+61')) {
      countryCode = 'AU'; // Australia
    }

    console.log('Phone processed:', { original: formData.phone, cleaned: cleanPhone, countryCode });

    const submissionData: FormSubmissionData = {
      title: 'Mr/Ms',
      first_name: firstName,
      last_name: lastName,
      full_name: formData.name,
      description: `Interest in ${formData.preference} - DAMAC Riverside Dubai South - VIP Registration`,
      company: 'DAMAC Properties',
      address: 'Dubai South, UAE',
      source_id: 90,
      phones: [
        {
          phone: cleanPhone,
          country_code: countryCode
        }
      ]
    };

    console.log('Transformed submission data:', submissionData);
    return submissionData;
  }

  static transformFormDataToLead(formData: { name: string; phone: string; preference: string }): LeadData {
    const submissionData = this.transformFormDataToSubmissionData(formData);
    
    return {
      title: submissionData.title,
      first_name: submissionData.first_name,
      middle_name: '',
      last_name: submissionData.last_name,
      full_name: submissionData.full_name,
      description: submissionData.description,
      company: submissionData.company,
      address: submissionData.address,
      zip_code: '',
      birthdate: '',
      phones: submissionData.phones,
      social_accounts: [
        {
          social_account: 'info@dlleni.com',
          account_type_id: 22
        }
      ],
      form_id: '123456789',
      source_id: submissionData.source_id
    };
  }
}
