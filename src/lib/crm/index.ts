
// Export all types
export * from '../../types/crm';

// Export configuration
export * from '../../config/crm';

// Export utilities
export * from '../../utils/phoneUtils';
export * from '../../utils/dataTransformer';

// Export services
export * from '../../services/crmApiService';
export * from '../../services/localSubmissionService';
export * from '../../services/crmService';
export * from '../../services/standaloneCrmService';

// Main service instances for easy import
export { crmService } from '../../services/crmService';
export { crmApiService } from '../../services/crmApiService';
export { sendTo8XCRM } from '../../services/standaloneCrmService';
