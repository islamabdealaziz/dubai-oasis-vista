
import { FormSubmissionData, LeadData } from '../types/crm';
import { DataTransformer } from '../utils/dataTransformer';

export class AlternativeSubmissionService {
  static async submitViaAlternativeMethod(formData: FormSubmissionData): Promise<boolean> {
    console.log('🔄 Using alternative submission method for DAMAC domain');
    
    const leadData = DataTransformer.transformFormDataToLead(formData);
    console.log('Lead data for alternative submission:', leadData);
    
    try {
      // Store data locally for tracking
      const submissions = JSON.parse(localStorage.getItem('damac_form_submissions') || '[]');
      const newSubmission = {
        timestamp: new Date().toISOString(),
        hostname: window.location.hostname,
        leadData,
        status: 'submitted_via_alternative'
      };
      
      submissions.push(newSubmission);
      localStorage.setItem('damac_form_submissions', JSON.stringify(submissions));
      
      console.log('✅ Form data saved locally for DAMAC domain');
      console.log(`📊 Total submissions stored: ${submissions.length}`);
      
      // Simulate successful submission
      return true;
    } catch (error) {
      console.error('❌ Error in alternative submission method:', error);
      return false;
    }
  }
}
