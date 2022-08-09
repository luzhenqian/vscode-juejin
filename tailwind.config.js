/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/views/app/**/*.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
  darkMode: 'class'
}
