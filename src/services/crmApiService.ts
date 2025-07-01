
import { FormSubmissionData, LeadData } from '../types/crm';
import { DataTransformer } from '../utils/dataTransformer';

interface TokenResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

interface CRMResponse {
  success: boolean;
  data?: any;
  message?: string;
}

class CRMApiService {
  private baseUrl = 'https://dlleni.8xcrm.com';
  private clientId = '2';
  private clientSecret = 'TuWXGb3azCnrsiZDf51t6eL4KPQARLUOuVCiVrDz';
  private username = 'info@dlleni.com';
  private password = 'Dlleni@25';
  private accessToken: string | null = null;
  private tokenType: string | null = null;
  private tokenExpiry: number | null = null;

  private async getAccessToken(): Promise<string> {
    console.log('🔑 Attempting to get access token from CRM API');
    
    // Check if we have a valid token
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      console.log('✅ Using existing valid token');
      return `${this.tokenType} ${this.accessToken}`;
    }

    try {
      const response = await fetch(`${this.baseUrl}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'YourWebsite/Web'
        },
        body: JSON.stringify({
          grant_type: 'password',
          client_id: this.clientId,
          client_secret: this.clientSecret,
          username: this.username,
          password: this.password
        })
      });

      if (!response.ok) {
        throw new Error(`Token request failed: ${response.status} ${response.statusText}`);
      }

      const tokenData: TokenResponse = await response.json();
      console.log('✅ Successfully obtained access token');

      // Store token data
      this.accessToken = tokenData.access_token;
      this.tokenType = tokenData.token_type;
      this.tokenExpiry = Date.now() + (tokenData.expires_in * 1000) - 60000; // Subtract 1 minute for safety

      return `${this.tokenType} ${this.accessToken}`;

    } catch (error) {
      console.error('❌ Failed to get access token:', error);
      throw new Error(`Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async submitLead(data: FormSubmissionData, formId: string | number = '000001'): Promise<CRMResponse> {
    console.log('📤 Starting CRM lead submission');
    console.log('Form data:', data);
    console.log('Form ID:', formId);

    try {
      // Get access token
      const authHeader = await this.getAccessToken();
      
      // Create payload for 8X CRM format
      const payload = {
        title: data.title || 'Mr',
        first_name: data.first_name,
        full_name: data.full_name,
        company: data.company || '',
        address: data.address || '',
        zip_code: '',
        birth_date: '',
        phones: data.phones,
        social_accounts: [],
        form_id: formId.toString()
      };

      console.log('Final payload to be sent:', payload);

      // Submit lead to CRM
      const response = await fetch(`${this.baseUrl}/api/v1/lead_generation/web_form_routings/storeLead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'YourWebsite/Web',
          'Authorization': authHeader
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ CRM API Error Response:', errorText);
        throw new Error(`Lead submission failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ Lead submitted successfully to CRM:', result);

      return {
        success: true,
        data: result,
        message: result.message || 'Lead submitted successfully'
      };

    } catch (error) {
      console.error('❌ CRM submission error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.getAccessToken();
      console.log('✅ CRM connection test successful');
      return true;
    } catch (error) {
      console.error('❌ CRM connection test failed:', error);
      return false;
    }
  }
}

export const crmApiService = new CRMApiService();
