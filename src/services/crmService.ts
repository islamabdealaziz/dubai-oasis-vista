
import { FormSubmissionData } from '../types/crm';
import { LocalSubmissionService } from './alternativeSubmissionService';
import { crmApiService } from './crmApiService';

class CRMService {
  async submitLead(formData: FormSubmissionData): Promise<boolean> {
    console.log('=== STARTING CRM FORM SUBMISSION ===');
    console.log('Form data received:', formData);
    console.log('Current hostname:', window.location.hostname);
    
    // Store locally first as backup
    console.log('📝 Storing backup copy locally...');
    await LocalSubmissionService.submitForm(formData);
    
    try {
      // Submit to real CRM API
      console.log('🚀 Submitting to CRM API...');
      const result = await crmApiService.submitLead(formData);
      
      if (result.success) {
        console.log('✅ CRM submission successful');
        return true;
      } else {
        console.log('❌ CRM submission failed:', result.message);
        return false;
      }
      
    } catch (error) {
      console.error('❌ CRM submission error:', error);
      // Return false but don't throw - we have local backup
      return false;
    }
  }

  // Method to test CRM connection
  async testConnection(): Promise<boolean> {
    return await crmApiService.testConnection();
  }
}

export const crmService = new CRMService();
