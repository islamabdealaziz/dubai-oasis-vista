
export const CRM_CONFIG = {
  baseUrl: 'https://dlleni.8xcrm.com',
  clientId: '2',
  clientSecret: 'TuWXGb3azCnrsiZDf51t6eL4KPQARLUOuVCiVrDz',
  username: 'info@dlleni.com',
  password: 'Dlleni@25',
  defaultFormId: '000001',
  defaultSourceId: 90,
  tokenSafetyMargin: 60000, // 1 minute in milliseconds
};

export const API_ENDPOINTS = {
  token: '/oauth/token',
  storeLead: '/api/v1/lead_generation/web_form_routings/storeLead',
};

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'User-Agent': 'YourWebsite/Web',
};
