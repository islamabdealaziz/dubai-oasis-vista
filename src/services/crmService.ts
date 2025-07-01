import { FormData } from '../types/crm';
import { LocalSubmissionService } from './localSubmissionService';
import { crmApiService } from './crmApiService';
import { DataTransformer } from '../utils/dataTransformer';
import { CRM_CONFIG } from '../config/crm';

class CRMService {
  async submitLead(formData: FormData): Promise<boolean> {
    console.log('=== STARTING CRM FORM SUBMISSION ===');
    console.log('Form data received:', formData);
    console.log('Current hostname:', window.location.hostname);
    
    // Store locally first as backup
    console.log('📝 Storing backup copy locally...');
    await LocalSubmissionService.submitForm(formData);
    
    try {
      // Transform form data to submission format
      const submissionData = DataTransformer.transformFormDataToSubmissionData(formData);
      
      // Submit to 8X CRM API
      console.log('🚀 Submitting to 8X CRM API...');
      const result = await crmApiService.submitLead(submissionData, CRM_CONFIG.defaultFormId);
      
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