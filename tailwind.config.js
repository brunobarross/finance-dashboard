/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{vue,js,ts}', './index.html'],
  theme: {
    extend: {
      colors: {
        app: {
          bg: 'rgb(var(--app-bg) / <alpha-value>)',
          surface: 'rgb(var(--app-surface) / <alpha-value>)',
          'surface-muted': 'rgb(var(--app-surface-muted) / <alpha-value>)',
          border: 'rgb(var(--app-border) / <alpha-value>)',
          text: 'rgb(var(--app-text) / <alpha-value>)',
          'text-muted': 'rgb(var(--app-text-muted) / <alpha-value>)',
        },
        primary: {
          50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
          400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
          800: '#1e40af', 900: '#1e3a8a'
        }
      }
    }
  },
  corePlugins: { preflight: false }
}
