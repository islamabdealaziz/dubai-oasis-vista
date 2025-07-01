
import { FormSubmissionData, TokenResponse, CRMResponse } from '../types/crm';
import { CRM_CONFIG, API_ENDPOINTS, DEFAULT_HEADERS } from '../config/crm';

class CRMApiService {
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
      const response = await fetch(`${CRM_CONFIG.baseUrl}${API_ENDPOINTS.token}`, {
        method: 'POST',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify({
          grant_type: 'password',
          client_id: CRM_CONFIG.clientId,
          client_secret: CRM_CONFIG.clientSecret,
          username: CRM_CONFIG.username,
          password: CRM_CONFIG.password
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
      this.tokenExpiry = Date.now() + (tokenData.expires_in * 1000) - CRM_CONFIG.tokenSafetyMargin;

      return `${this.tokenType} ${this.accessToken}`;

    } catch (error) {
      console.error('❌ Failed to get access token:', error);
      throw new Error(`Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async submitLead(data: FormSubmissionData, formId: string | number = CRM_CONFIG.defaultFormId): Promise<CRMResponse> {
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
      const response = await fetch(`${CRM_CONFIG.baseUrl}${API_ENDPOINTS.storeLead}`, {
        method: 'POST',
        headers: {
          ...DEFAULT_HEADERS,
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
