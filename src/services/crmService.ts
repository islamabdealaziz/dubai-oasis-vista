
interface OAuthTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface LeadData {
  title?: string;
  first_name: string;
  middle_name?: string;
  last_name?: string;
  full_name: string;
  description?: string;
  company?: string;
  address?: string;
  zip_code?: string;
  birthdate?: string;
  phones: Array<{
    phone: string;
    country_code: string;
  }>;
  social_accounts?: Array<{
    social_account: string;
    account_type_id: number;
  }>;
  form_id: string;
}

interface FormSubmissionData {
  name: string;
  phone: string;
  preference: string;
}

class CRMService {
  private readonly tokenEndpoint = 'https://dlleni.8xcrm.com/oauth/token';
  private readonly leadEndpoint = 'https://dlleni.8xcrm.com/api/v1/lead_generation/web_form_routings/storeLead';
  private readonly credentials = {
    client_id: '2',
    client_secret: 'TuWXGb3azCnrsiZDf51t6eL4KPQARLUOuVCiVrDz',
    username: 'support@8worx.com',
    password: '123456'
  };

  private accessToken: string | null = null;
  private tokenExpiry: number | null = null;

  private async getAccessToken(): Promise<string> {
    // Check if current token is still valid
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    console.log('Fetching new access token...');

    try {
      const tokenResponse = await fetch(this.tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'password',
          client_id: this.credentials.client_id,
          client_secret: this.credentials.client_secret,
          username: this.credentials.username,
          password: this.credentials.password,
        }),
      });

      if (!tokenResponse.ok) {
        throw new Error(`Token request failed: ${tokenResponse.status} ${tokenResponse.statusText}`);
      }

      const tokenData: OAuthTokenResponse = await tokenResponse.json();
      
      this.accessToken = tokenData.access_token;
      // Set expiry time (subtract 5 minutes for safety)
      this.tokenExpiry = Date.now() + (tokenData.expires_in - 300) * 1000;

      console.log('Access token obtained successfully');
      return this.accessToken;

    } catch (error) {
      console.error('Failed to get access token:', error);
      throw new Error('Authentication failed. Please try again.');
    }
  }

  private transformFormDataToLead(formData: FormSubmissionData): LeadData {
    // Extract first and last name from full name
    const nameParts = formData.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    return {
      title: 'Mr/Ms',
      first_name: firstName,
      middle_name: '',
      last_name: lastName,
      full_name: formData.name,
      description: `Interest in ${formData.preference} - DAMAC Riverside Dubai South`,
      company: 'DAMAC Properties',
      address: 'Dubai South, UAE',
      zip_code: '',
      birthdate: '',
      phones: [
        {
          phone: formData.phone,
          country_code: 'AE'
        }
      ],
      social_accounts: [],
      form_id: 'DAMAC_RIVERSIDE_001'
    };
  }

  async submitLead(formData: FormSubmissionData): Promise<boolean> {
    try {
      console.log('Submitting lead to CRM...', formData);

      // Get access token
      const token = await this.getAccessToken();

      // Transform form data to CRM format
      const leadData = this.transformFormDataToLead(formData);

      // Submit lead to CRM
      const leadResponse = await fetch(this.leadEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      if (!leadResponse.ok) {
        const errorText = await leadResponse.text();
        console.error('Lead submission failed:', leadResponse.status, errorText);
        throw new Error(`Lead submission failed: ${leadResponse.status}`);
      }

      const responseData = await leadResponse.json();
      console.log('Lead submitted successfully:', responseData);
      
      return true;

    } catch (error) {
      console.error('CRM submission error:', error);
      throw error;
    }
  }
}

export const crmService = new CRMService();
