export interface HubConfig {
  hubName: string;
  hubShortName: string;
  region: string;
  country: string;
  heroTitle: string;
  heroSubtitle: string;
  contact: {
    email: string;
    address: {
      line1: string;
      line2: string;
      line3: string;
      country: string;
    };
    donation?: {
      bankingInfo: string;
    };
  };
  social: {
    instagram: string;
    linkedin: string;
    facebook: string;
  };
  recruitmentText: {
    title: string;
    subtitle: string;
    additionalInfo: string;
  };
  aboutSection: {
    projectsDescription: string;
  };
  branding: {
    logo: string;
    primaryColor: string;
    secondaryColor: string;
  };
}

let cachedConfig: HubConfig | null = null;

// Configuration validation result
export interface ConfigValidationResult {
  isValid: boolean;
  errors: string[];
  config: HubConfig | null;
}

// Validate hub configuration
function validateHubConfig(config: any): string[] {
  const errors: string[] = [];
  
  // Required fields
  if (!config.hubName) errors.push("hubName is required in hub-config.json");
  if (!config.hubShortName) errors.push("hubShortName is required in hub-config.json");
  if (!config.heroTitle) errors.push("heroTitle is required in hub-config.json");
  if (!config.heroSubtitle) errors.push("heroSubtitle is required in hub-config.json");
  
  // Required nested objects
  if (!config.contact) {
    errors.push("contact object is required in hub-config.json");
  } else {
    if (!config.contact.email) errors.push("contact.email is required in hub-config.json");
    if (!config.contact.address) {
      errors.push("contact.address object is required in hub-config.json");
    } else {
      if (!config.contact.address.line1) errors.push("contact.address.line1 is required in hub-config.json");
      if (!config.contact.address.line3) errors.push("contact.address.line3 is required in hub-config.json");
    }
  }
  
  if (!config.branding) {
    errors.push("branding object is required in hub-config.json");
  } else {
    if (!config.branding.logo) errors.push("branding.logo is required in hub-config.json");
  }
  
  // Optional but recommended fields
  if (!config.social) {
    errors.push("social object is recommended in hub-config.json (instagram, linkedin, facebook)");
  }
  
  if (!config.recruitmentText) {
    errors.push("recruitmentText object is recommended in hub-config.json");
  }
  
  return errors;
}

export async function fetchHubConfig(): Promise<ConfigValidationResult> {
  if (cachedConfig) {
    return { isValid: true, errors: [], config: cachedConfig };
  }

  try {
    console.log('Fetching hub configuration...');
    
    const response = await fetch('/config/hub-config.json');
    if (!response.ok) {
      const error = `Configuration file not found at /config/hub-config.json. Please copy hub-config.template.json to hub-config.json and customize it for your hub.`;
      return { isValid: false, errors: [error], config: null };
    }
    
    const config = await response.json();
    
    // Validate the configuration
    const validationErrors = validateHubConfig(config);
    
    if (validationErrors.length > 0) {
      return { isValid: false, errors: validationErrors, config: null };
    }
    
    // Process template strings (replace {hubName} etc.)
    const processedConfig = processTemplateStrings(config, config);
    
    cachedConfig = processedConfig;
    console.log(`Successfully loaded configuration for: ${config.hubName}`);
    
    return { isValid: true, errors: [], config: cachedConfig };
  } catch (error) {
    const errorMsg = `Failed to parse hub-config.json: ${error instanceof Error ? error.message : String(error)}. Please check that the file contains valid JSON.`;
    return { isValid: false, errors: [errorMsg], config: null };
  }
}

// Helper function to process template strings like {hubName}
function processTemplateStrings(obj: any, context: any): any {
  if (typeof obj === 'string') {
    return obj.replace(/\{(\w+)\}/g, (match, key) => {
      return context[key] || match;
    });
  } else if (Array.isArray(obj)) {
    return obj.map(item => processTemplateStrings(item, context));
  } else if (typeof obj === 'object' && obj !== null) {
    const processed: any = {};
    for (const [key, value] of Object.entries(obj)) {
      processed[key] = processTemplateStrings(value, context);
    }
    return processed;
  }
  
  return obj;
}