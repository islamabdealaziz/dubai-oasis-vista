
import { FormSubmissionData } from '../types/crm';
import { LocalSubmissionService } from './alternativeSubmissionService';

class CRMService {
  async submitLead(formData: FormSubmissionData): Promise<boolean> {
    console.log('=== STARTING LOCAL FORM SUBMISSION ===');
    console.log('Form data received:', formData);
    console.log('Current hostname:', window.location.hostname);
    
    try {
      const result = await LocalSubmissionService.submitForm(formData);
      
      if (result) {
        console.log('✅ Form submitted successfully');
      } else {
        console.log('❌ Form submission failed');
      }
      
      return result;
    } catch (error) {
      console.error('❌ Form submission error:', error);
      return false;
    }
  }
}

export const crmService = new CRMService();
