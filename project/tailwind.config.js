/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
       colors: {
        'cyan-overlay': 'rgba(52, 184, 192, 0.9)',
        'purple-overlay': 'rgba(111, 81, 199, 0.9)',
      },
    },
  },
  plugins: [],
};
