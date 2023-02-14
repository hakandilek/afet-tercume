/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      'black': '#000000',
      'dark-gray': '#2D2D2D',
      'light-gray': '#747474',
      'whiter': '#FFFBFE',
      'white-ish': '#E6E1E5',
      'white': '#FFFFFF',
      'purple': '#180037',
      'light-purple': '#381e72',
      'parliament-blue': '#231C3B',
      'lavender': '#D0BCFF'
    },
    fontFamily: {
      'main': ['Roboto']
    },

    extend: {}
  },
  plugins: [],

}
