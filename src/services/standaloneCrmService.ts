
import { FormData } from '../types/crm';
import { PhoneUtils } from '../utils/phoneUtils';
import { CRM_CONFIG, API_ENDPOINTS, DEFAULT_HEADERS } from '../config/crm';

export async function sendTo8XCRM(data: FormData) {
  try {
    // Get authentication token
    const authResponse = await fetch(`${CRM_CONFIG.baseUrl}${API_ENDPOINTS.token}`, {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({
        grant_type: "password",
        client_id: CRM_CONFIG.clientId,
        client_secret: CRM_CONFIG.clientSecret,
        username: CRM_CONFIG.username,
        password: CRM_CONFIG.password,
      }),
    });

    if (!authResponse.ok) {
      throw new Error(`Auth failed: ${authResponse.status}`);
    }

    const authData = await authResponse.json();
    const token = authData.access_token;
    const tokenType = authData.token_type;

    // Extract first name
    const firstName = data.name.trim().split(' ')[0] || '';
    
    // Process phone number
    const phoneResult = PhoneUtils.processPhone(data.phone);

    // Submit lead to CRM
    const crmResponse = await fetch(`${CRM_CONFIG.baseUrl}${API_ENDPOINTS.storeLead}`, {
      method: "POST",
      headers: {
        ...DEFAULT_HEADERS,
        "Authorization": `${tokenType} ${token}`,
      },
      body: JSON.stringify({
        title: "Mr",
        first_name: firstName,
        full_name: data.name,
        company: "DAMAC Properties",
        address: "Dubai South, UAE",
        zip_code: "",
        birth_date: "",
        phones: [{
          phone: phoneResult.cleanPhone,
          country_code: phoneResult.countryCode
        }],
        social_accounts: data.email ? [{
          social_account: data.email,
          account_type_id: 22
        }] : [],
        form_id: CRM_CONFIG.defaultFormId,
      }),
    });

    if (!crmResponse.ok) {
      throw new Error(`CRM submission failed: ${crmResponse.status}`);
    }

    const crmResult = await crmResponse.json();
    console.log("✅ 8X CRM Response:", crmResult);
    return { success: true, data: crmResult };
    
  } catch (error) {
    console.error("❌ CRM Error:", error);
    return { success: false, error: error.message };
  }
}
