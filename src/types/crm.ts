export interface TokenResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export interface CRMResponse {
  success: boolean;
  data?: any;
  message?: string;
}

export interface LeadData {
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
  form_id?: string | number;
  source_id?: number;
}

export interface FormSubmissionData {
  title?: string;
  first_name: string;
  last_name?: string;
  full_name: string;
  description?: string;
  company?: string;
  address?: string;
  source_id?: number;
  phones: Array<{
    phone: string;
    country_code: string;
  }>;
}

export interface FormData {
  name: string;
  phone: string;
  preference: string;
  email?: string;
}