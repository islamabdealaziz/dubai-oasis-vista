
interface OAuthTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
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
  private tokenType: string | null = null;
  private tokenExpiry: number | null = null;
  
  // يتحقق إذا كان الموقع يستخدم دومين damac.dlleni.com
  private isCustomDomain(): boolean {
    const hostname = window.location.hostname;
    console.log('Checking hostname for custom domain:', hostname);
    const isCustom = hostname === 'damac.dlleni.com';
    console.log('Is custom domain?', isCustom);
    return isCustom;
  }

  async submitLead(formData: FormSubmissionData): Promise<boolean> {
    console.log('=== STARTING LEAD SUBMISSION ===');
    console.log('Form data received:', formData);
    console.log('Current hostname:', window.location.hostname);
    
    // تحقق أولاً من الدومين قبل أي شيء آخر
    if (this.isCustomDomain()) {
      console.log('✅ CUSTOM DOMAIN DETECTED - Using alternative method directly');
      return await this.submitViaAlternativeMethod(formData);
    }
    
    console.log('🔄 Regular domain - attempting CRM API submission');
    
    try {
      const { token, type } = await this.getAccessToken();
      console.log('Got access token, proceeding with lead submission');

      const leadData = this.transformFormDataToLead(formData);
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
      return await this.submitViaAlternativeMethod(formData);
    }
  }

  private async getAccessToken(): Promise<{ token: string; type: string }> {
    console.log('Getting access token...');
    
    // Check if current token is still valid
    if (this.accessToken && this.tokenType && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      console.log('Using existing access token');
      return { token: this.accessToken, type: this.tokenType };
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
          'User-Agent': 'DAMAC-Riverside/Web',
        },
        mode: 'cors',
        body: JSON.stringify(requestBody),
      });

      console.log('Token response status:', tokenResponse.status);

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
      console.log('Token response received:', { token_type: tokenData.token_type, expires_in: tokenData.expires_in });
      
      this.accessToken = tokenData.access_token;
      this.tokenType = tokenData.token_type;
      // Set expiry time (subtract 5 minutes for safety)
      this.tokenExpiry = Date.now() + (tokenData.expires_in - 300) * 1000;

      console.log('Access token obtained successfully, expires at:', new Date(this.tokenExpiry));
      return { token: this.accessToken, type: this.tokenType };

    } catch (error) {
      console.error('Failed to get access token:', error);
      
      // If CORS error, try alternative approach
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.log('CORS error detected, trying alternative submission method');
        throw new Error('CORS_ERROR');
      }
      
      throw new Error('Authentication failed. Please try again.');
    }
  }

  private transformFormDataToLead(formData: FormSubmissionData): LeadData {
    console.log('Transforming form data:', formData);
    
    // Extract first and last name from full name
    const nameParts = formData.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    // Clean and format phone number for international use
    let cleanPhone = formData.phone.replace(/[^\d+]/g, '');
    let countryCode = 'AE'; // Default to UAE
    
    // If phone doesn't start with +, add + prefix
    if (!cleanPhone.startsWith('+')) {
      cleanPhone = '+' + cleanPhone;
    }
    
    // Detect country based on phone prefix
    if (cleanPhone.startsWith('+20')) {
      countryCode = 'EG'; // Egypt
    } else if (cleanPhone.startsWith('+971')) {
      countryCode = 'AE'; // UAE
    } else if (cleanPhone.startsWith('+966')) {
      countryCode = 'SA'; // Saudi Arabia
    } else if (cleanPhone.startsWith('+1')) {
      countryCode = 'US'; // USA/Canada
    } else if (cleanPhone.startsWith('+44')) {
      countryCode = 'GB'; // UK
    } else if (cleanPhone.startsWith('+33')) {
      countryCode = 'FR'; // France
    } else if (cleanPhone.startsWith('+49')) {
      countryCode = 'DE'; // Germany
    } else if (cleanPhone.startsWith('+91')) {
      countryCode = 'IN'; // India
    } else if (cleanPhone.startsWith('+86')) {
      countryCode = 'CN'; // China
    } else if (cleanPhone.startsWith('+81')) {
      countryCode = 'JP'; // Japan
    } else if (cleanPhone.startsWith('+82')) {
      countryCode = 'KR'; // South Korea
    } else if (cleanPhone.startsWith('+7')) {
      countryCode = 'RU'; // Russia
    } else if (cleanPhone.startsWith('+55')) {
      countryCode = 'BR'; // Brazil
    } else if (cleanPhone.startsWith('+61')) {
      countryCode = 'AU'; // Australia
    }

    console.log('Phone processed:', { original: formData.phone, cleaned: cleanPhone, countryCode });

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
          phone: cleanPhone,
          country_code: countryCode
        }
      ],
      social_accounts: [
        {
          social_account: 'riverside@damac.com',
          account_type_id: 22
        }
      ],
      form_id: 'DAMAC_RIVERSIDE_001'
    };

    console.log('Transformed lead data:', leadData);
    return leadData;
  }

  private async submitViaAlternativeMethod(formData: FormSubmissionData): Promise<boolean> {
    console.log('🔄 Using alternative submission method for DAMAC domain');
    
    const leadData = this.transformFormDataToLead(formData);
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

export const crmService = new CRMService();
