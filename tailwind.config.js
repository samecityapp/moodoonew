/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Lato', 'sans-serif'],
      },
      colors: {
        background: '#F9F9F9',
        glass: {
          100: 'rgba(255, 255, 255, 0.1)',
          200: 'rgba(255, 255, 255, 0.2)',
          800: 'rgba(255, 255, 255, 0.8)',
        },
        primary: '#1a1a1a',
        accent: '#D4AF37',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'subtle-rainbow': 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
      },
    },
  },
  plugins: [],
};
