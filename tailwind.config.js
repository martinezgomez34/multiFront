/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      rotate: {
        '30': '30deg',
        '-30': '-30deg',
        '28': '28deg',
        '-28': '-28deg',
      },
    },
  },
  plugins: [],
}

