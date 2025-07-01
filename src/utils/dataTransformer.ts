import { FormSubmissionData, LeadData } from '../types/crm';
import { PhoneUtils } from './phoneUtils';
import { CRM_CONFIG } from '../config/crm';

export class DataTransformer {
  static transformFormDataToSubmissionData(formData: { name: string; phone: string; preference: string }): FormSubmissionData {
    console.log('Transforming form data to submission data:', formData);
    
    // Extract first and last name from full name
    const nameParts = formData.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
    
    // Process phone number using PhoneUtils
    const phoneResult = PhoneUtils.processPhone(formData.phone);
    
    const submissionData: FormSubmissionData = {
      title: 'Mr/Ms',
      first_name: firstName,
      last_name: lastName,
      full_name: formData.name,
      description: `Interest in ${formData.preference} - DAMAC Riverside Dubai South - VIP Registration`,
      company: 'DAMAC Properties',
      address: 'Dubai South, UAE',
      source_id: CRM_CONFIG.defaultSourceId,
      phones: [
        {
          phone: phoneResult.cleanPhone,
          country_code: phoneResult.countryCode
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
      form_id: CRM_CONFIG.defaultFormId, // ✅ Fixed: Now uses consistent form_id
      source_id: submissionData.source_id
    };
  }
}
