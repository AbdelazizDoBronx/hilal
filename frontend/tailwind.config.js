/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Almarai', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      colors: {
        'brand': {
          50: '#f0f9f8',
          100: '#d5f1ee',
          200: '#aee3de',
          300: '#78cdc7',
          400: '#44b0a9',
          500: '#2a9d96',
          600: '#0a7c75', // Couleur principale
          700: '#0a6560',
          800: '#0b4f4c',
          900: '#0c3c3a',
          950: '#042726',
        },
        'accent': {
          300: '#ffd699',
          400: '#ffb74d',
          500: '#ff9800',
          600: '#fb8c00',
        },
        'neutral': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },emerald: {
          300: '#6ee7b7',
          400: '#34d399',
        },
        teal: {
          300: '#5eead4',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'auth-pattern': "url('/images/auth-pattern.svg')",
      }
    },
  },
  plugins: [require("daisyui")],
}