import { useState, useCallback } from 'react';
import { FormData } from '../types/crm';
import { crmService } from '../services/crmService';

export interface UseCrmSubmissionReturn {
  isSubmitting: boolean;
  submitForm: (formData: FormData) => Promise<boolean>;
  error: string | null;
  success: boolean;
  resetState: () => void;
  submitCount: number;
}

export function useCrmSubmission(): UseCrmSubmissionReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  const submitForm = useCallback(async (formData: FormData): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    setSubmitCount(prev => prev + 1);

    try {
      const result = await crmService.submitLead(formData);
      
      if (result) {
        setSuccess(true);
        return true;
      } else {
        setError('Failed to submit form. Please try again.');
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const resetState = useCallback(() => {
    setError(null);
    setSuccess(false);
    setIsSubmitting(false);
  }, []);

  return {
    isSubmitting,
    submitForm,
    error,
    success,
    resetState,
    submitCount
  };
}
