/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Source Serif 4"', 'serif'],
        body: ['"Source Sans 3"', 'sans-serif']
      }
    }
  },
  plugins: []
};
