/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'raleway': ['Raleway', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      'roboto': ["Roboto", 'ui-sans-serif', 'system-ui', 'sans-serif'],
      'roboto-condensed': ["Roboto Condensed", 'ui-sans-serif', 'system-ui', 'sans-serif'],
    }
  },
  plugins: [],
}

