/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#63b3ed',    // Light shade of primary color (blue-400)
                    DEFAULT: '#2b6cb0',  // Primary color (blue-700)
                    dark: '#2c5282',     // Dark shade of primary color (blue-800)
                },
                secondary: {
                    light: '#edf2f7',    // Light shade of secondary color (gray-200)
                    DEFAULT: '#e2e8f0',  // Secondary color (gray-300)
                    dark: '#cbd5e0',     // Dark shade of secondary color (gray-400)
                },
                text: {
                    primary: '#000000',  // Primary text color (black)
                    secondary: '#4a5568',// Secondary text color (gray-700)
                    light: '#718096',    // Light text color (gray-600)
                },
                accent: {
                    red: '#f56565',      // Accent color red (red-500)
                    green: {
                        light: '#48bb78',  // Light green (green-500)
                        dark: '#2f855a',   // Dark green (green-700)
                    },
                },
                neutral: {
                    white: '#ffffff',    // White color
                    black: '#000000',    // Black color
                    light: '#f7fafc',    // Neutral light background (gray-100)
                    lighter: '#edf2f7',  // Neutral lighter background (gray-200)
                    dark: '#2d3748',     // Neutral dark color (gray-800)
                },
            },
            animation: {
                fadeDown: 'fadeDown 0.2s ease-out',
                // Removed bounce animation
            },
            keyframes: {
                fadeDown: {
                    '0%': { opacity: '0', transform: 'translateY(-10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                bounce: {
                    '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
                    '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' }
                }
            },
            boxShadow: {
                'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
            spacing: {
                '128': '32rem',
            },
            borderRadius: {
                '2xl': '1rem',
            },
        },
    },
    variants: {},
    plugins: [],
}
