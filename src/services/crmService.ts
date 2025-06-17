
import { FormSubmissionData, LeadData } from '../types/crm';
import { DomainUtils } from '../utils/domainUtils';
import { DataTransformer } from '../utils/dataTransformer';
import { AuthService } from './authService';
import { AlternativeSubmissionService } from './alternativeSubmissionService';

class CRMService {
  private readonly leadEndpoint = 'https://dlleni.8xcrm.com/api/v1/lead_generation/web_form_routings/storeLead';
  private authService: AuthService;

  constructor() {
    this.authService = AuthService.getInstance();
  }

  async submitLead(formData: FormSubmissionData): Promise<boolean> {
    console.log('=== STARTING LEAD SUBMISSION ===');
    console.log('Form data received:', formData);
    console.log('Current hostname:', window.location.hostname);
    
    // تحقق أولاً من الدومين قبل أي شيء آخر
    if (DomainUtils.isCustomDomain()) {
      console.log('✅ CUSTOM DOMAIN DETECTED - Using alternative method directly');
      return await AlternativeSubmissionService.submitViaAlternativeMethod(formData);
    }
    
    console.log('🔄 Regular domain - attempting CRM API submission');
    
    try {
      const { token, type } = await this.authService.getAccessToken();
      console.log('Got access token, proceeding with lead submission');

      const leadData = DataTransformer.transformFormDataToLead(formData);
      console.log('Submitting lead to:', this.leadEndpoint);

      const leadResponse = await fetch(this.leadEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `${type} ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'DAMAC-Riverside/Web',
        },
        mode: 'cors',
        body: JSON.stringify(leadData),
      });

      console.log('Lead submission response status:', leadResponse.status);

      if (!leadResponse.ok) {
        const errorText = await leadResponse.text();
        console.error('Lead submission failed:', {
          status: leadResponse.status,
          statusText: leadResponse.statusText,
          body: errorText
        });
        throw new Error(`Lead submission failed: ${leadResponse.status} - ${errorText}`);
      }

      const responseData = await leadResponse.json();
      console.log('Lead submitted successfully:', responseData);
      
      return true;

    } catch (error) {
      console.error('❌ CRM API submission failed:', error);
      console.log('🔄 Falling back to alternative method');
      return await AlternativeSubmissionService.submitViaAlternativeMethod(formData);
    }
  }
}

export const crmService = new CRMService();
