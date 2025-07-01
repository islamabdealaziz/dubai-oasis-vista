
import { FormData } from '../types/crm';

export class LocalSubmissionService {
  static async submitForm(formData: FormData): Promise<void> {
    try {
      const timestamp = new Date().toISOString();
      const submission = {
        ...formData,
        timestamp,
        id: Date.now().toString()
      };
      
      // Store in localStorage as backup
      const existingSubmissions = JSON.parse(localStorage.getItem('form_submissions') || '[]');
      existingSubmissions.push(submission);
      localStorage.setItem('form_submissions', JSON.stringify(existingSubmissions));
      
      console.log('📝 Form data stored locally as backup:', submission);
    } catch (error) {
      console.error('❌ Failed to store form data locally:', error);
    }
  }
  
  static getStoredSubmissions(): any[] {
    try {
      return JSON.parse(localStorage.getItem('form_submissions') || '[]');
    } catch {
      return [];
    }
  }
  
  static clearStoredSubmissions(): void {
    localStorage.removeItem('form_submissions');
  }
}
