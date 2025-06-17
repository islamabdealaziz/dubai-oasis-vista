
import { FormSubmissionData, LeadData } from '../types/crm';
import { DataTransformer } from '../utils/dataTransformer';

export class LocalSubmissionService {
  static async submitForm(formData: FormSubmissionData): Promise<boolean> {
    console.log('📝 Saving form data locally');
    
    const leadData = DataTransformer.transformFormDataToLead(formData);
    console.log('Lead data for local storage:', leadData);
    
    try {
      // Store data locally
      const submissions = JSON.parse(localStorage.getItem('damac_form_submissions') || '[]');
      const newSubmission = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        hostname: window.location.hostname,
        formData,
        leadData,
        status: 'submitted_locally'
      };
      
      submissions.push(newSubmission);
      localStorage.setItem('damac_form_submissions', JSON.stringify(submissions));
      
      console.log('✅ Form data saved successfully');
      console.log(`📊 Total submissions stored: ${submissions.length}`);
      
      return true;
    } catch (error) {
      console.error('❌ Error saving form data:', error);
      return false;
    }
  }

  static getStoredSubmissions(): any[] {
    try {
      return JSON.parse(localStorage.getItem('damac_form_submissions') || '[]');
    } catch (error) {
      console.error('Error reading stored submissions:', error);
      return [];
    }
  }

  static clearStoredSubmissions(): void {
    localStorage.removeItem('damac_form_submissions');
    console.log('🗑️ Cleared all stored submissions');
  }
}
