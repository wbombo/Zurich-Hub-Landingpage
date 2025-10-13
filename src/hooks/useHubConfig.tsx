import { useState, useEffect } from 'react';
import { fetchHubConfig, type ConfigValidationResult, type HubConfig } from '../services/configService';

export interface UseHubConfigResult {
  config: HubConfig | null;
  isLoading: boolean;
  errors: string[];
  isValid: boolean;
}

export function useHubConfig(): UseHubConfigResult {
  const [result, setResult] = useState<UseHubConfigResult>({
    config: null,
    isLoading: true,
    errors: [],
    isValid: false,
  });

  useEffect(() => {
    fetchHubConfig()
      .then((validationResult: ConfigValidationResult) => {
        setResult({
          config: validationResult.config,
          isLoading: false,
          errors: validationResult.errors,
          isValid: validationResult.isValid,
        });
      })
      .catch((error) => {
        setResult({
          config: null,
          isLoading: false,
          errors: [`Unexpected error loading configuration: ${error.message}`],
          isValid: false,
        });
      });
  }, []);

  return result;
}