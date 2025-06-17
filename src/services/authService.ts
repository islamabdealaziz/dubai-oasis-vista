
import { OAuthTokenResponse } from '../types/crm';

export class AuthService {
  private static instance: AuthService;
  private readonly tokenEndpoint = 'https://dlleni.8xcrm.com/oauth/token';
  private readonly credentials = {
    client_id: '2',
    client_secret: 'TuWXGb3azCnrsiZDf51t6eL4KPQARLUOuVCiVrDz',
    username: 'support@8worx.com',
    password: '123456'
  };

  private accessToken: string | null = null;
  private tokenType: string | null = null;
  private tokenExpiry: number | null = null;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async getAccessToken(): Promise<{ token: string; type: string }> {
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
}
