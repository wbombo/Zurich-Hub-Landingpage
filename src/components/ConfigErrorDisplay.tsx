import React from 'react';
import { FaExclamationTriangle, FaCopy, FaBook } from 'react-icons/fa';

interface ConfigErrorDisplayProps {
  errors: string[];
}

const ConfigErrorDisplay: React.FC<ConfigErrorDisplayProps> = ({ errors }) => {
  const requiredErrors = errors.filter(error => error.includes('required'));
  const recommendedErrors = errors.filter(error => error.includes('recommended'));
  const otherErrors = errors.filter(error => !error.includes('required') && !error.includes('recommended'));

  const copyConfigCommand = () => {
    const command = "cp public/config/hub-config.template.json public/config/hub-config.json";
    navigator.clipboard.writeText(command);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl border border-red-200">
        {/* Header */}
        <div className="bg-red-600 text-white p-6 rounded-t-lg">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-2xl mr-3" />
            <div>
              <h1 className="text-2xl font-bold">Configuration Error</h1>
              <p className="text-red-100 mt-1">Your Global Shapers hub configuration needs attention</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Quick Fix Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
              <FaCopy className="mr-2" />
              Quick Fix
            </h3>
            <p className="text-blue-700 text-sm mb-3">
              If you haven't created your configuration file yet, copy the template:
            </p>
            <div className="bg-blue-900 text-blue-100 p-3 rounded font-mono text-sm flex items-center justify-between">
              <code>cp public/config/hub-config.template.json public/config/hub-config.json</code>
              <button
                onClick={copyConfigCommand}
                className="ml-2 px-2 py-1 bg-blue-700 hover:bg-blue-600 rounded text-xs transition-colors"
                title="Copy to clipboard"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Error Lists */}
          {otherErrors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-3">Configuration File Issues</h3>
              <ul className="space-y-2">
                {otherErrors.map((error, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2 mt-0.5">•</span>
                    <span className="text-red-700 text-sm">{error}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {requiredErrors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-3">Required Fields Missing</h3>
              <p className="text-red-600 text-sm mb-3">These fields must be provided for the website to work:</p>
              <ul className="space-y-2">
                {requiredErrors.map((error, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2 mt-0.5">•</span>
                    <span className="text-red-700 text-sm">{error}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recommendedErrors.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-3">Recommended Fields Missing</h3>
              <p className="text-yellow-700 text-sm mb-3">These fields are optional but recommended for a complete experience:</p>
              <ul className="space-y-2">
                {recommendedErrors.map((error, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-500 mr-2 mt-0.5">•</span>
                    <span className="text-yellow-700 text-sm">{error}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Help Section */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
              <FaBook className="mr-2" />
              Need Help?
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>1. <strong>Copy the template:</strong> Use the command above to create your config file</p>
              <p>2. <strong>Edit the config:</strong> Open <code className="bg-gray-200 px-1 rounded">public/config/hub-config.json</code> and customize it for your hub</p>
              <p>3. <strong>Check the README:</strong> See the full documentation for all available options</p>
              <p>4. <strong>Example files:</strong> Look at the template files in <code className="bg-gray-200 px-1 rounded">public/data/</code> for data structure examples</p>
            </div>
          </div>

          {/* File Structure Reference */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Expected File Structure:</h4>
            <pre className="text-xs text-gray-600 font-mono">
{`public/
├── config/
│   ├── hub-config.json         ← Your configuration (missing/invalid)
│   └── hub-config.template.json ← Copy this template
└── data/
    ├── members.json
    ├── projects.json
    ├── impact_points.json
    └── events.json`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigErrorDisplay;