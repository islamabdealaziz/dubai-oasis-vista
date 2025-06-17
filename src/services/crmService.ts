
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
  private readonly tokenEndpoint = 'https://damac.dlleni.com/oauth/token';
  private readonly leadEndpoint = 'https://damac.dlleni.com/api/v1/lead_generation/web_form_routings/storeLead';
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
      console.log('Using existing access token');
      return this.accessToken;
    }

    console.log('Fetching new access token from:', this.tokenEndpoint);

    try {
      const requestBody = {
        grant_type: 'password',
        client_id: this.credentials.client_id,
        client_secret: this.credentials.client_secret,
        username: this.credentials.username,
        password: this.credentials.password,
      };

      console.log('Token request body:', { ...requestBody, password: '***', client_secret: '***' });

      const tokenResponse = await fetch(this.tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Token response status:', tokenResponse.status);
      console.log('Token response headers:', Object.fromEntries(tokenResponse.headers.entries()));

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        console.error('Token request failed:', {
          status: tokenResponse.status,
          statusText: tokenResponse.statusText,
          body: errorText
        });
        throw new Error(`Token request failed: ${tokenResponse.status} ${tokenResponse.statusText}`);
      }

      const tokenData: OAuthTokenResponse = await tokenResponse.json();
      console.log('Token response data:', { ...tokenData, access_token: '***' });
      
      this.accessToken = tokenData.access_token;
      // Set expiry time (subtract 5 minutes for safety)
      this.tokenExpiry = Date.now() + (tokenData.expires_in - 300) * 1000;

      console.log('Access token obtained successfully, expires at:', new Date(this.tokenExpiry));
      return this.accessToken;

    } catch (error) {
      console.error('Failed to get access token:', error);
      throw new Error('Authentication failed. Please try again.');
    }
  }

  private transformFormDataToLead(formData: FormSubmissionData): LeadData {
    console.log('Transforming form data:', formData);
    
    // Extract first and last name from full name
    const nameParts = formData.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    const leadData: LeadData = {
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

    console.log('Transformed lead data:', leadData);
    return leadData;
  }

  async submitLead(formData: FormSubmissionData): Promise<boolean> {
    try {
      console.log('Starting lead submission process with data:', formData);

      // Get access token
      const token = await this.getAccessToken();
      console.log('Got access token, proceeding with lead submission');

      // Transform form data to CRM format
      const leadData = this.transformFormDataToLead(formData);

      console.log('Submitting lead to:', this.leadEndpoint);
      console.log('Request headers:', {
        'Authorization': 'Bearer ***',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      });

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

      console.log('Lead submission response status:', leadResponse.status);
      console.log('Lead submission response headers:', Object.fromEntries(leadResponse.headers.entries()));

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
      console.error('CRM submission error:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      throw error;
    }
  }
}

export const crmService = new CRMService();
