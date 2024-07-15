/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('../public/urlshort.jpeg')",
      }
    },
    screens:{
      'mobile': '390px',
      'tablet': '740px',
      'laptop': '1024px',
      'desktop': '1280px',
    }
  },
  plugins: [],
}