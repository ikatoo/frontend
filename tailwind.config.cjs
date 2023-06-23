/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      display: ['Oswald', 'Helvetica', 'Arial', 'sans-serif'],
      body: ['"Open Sans"', 'Helvetica', 'Arial', 'sans-serif'],
      indie_flower: ['Indie Flower', 'monospace']
    },
    extend: {
      boxShadow: {
        image: 'inset 0px 0px 64px 47px #00032c'
      },
      colors: {
        mck_black: '#00021f',
        mck_black_light: '#00032c',
        mck_aqua: '#08FDD8',
        mck_red: '#ff2a2a',
        mck_gray_light: 'rgb(229 231 235)',
        mck_gray_dark: 'rgb(31 41 55)',
        mck_primary: 'rgb(30 41 59)',
        mck_secondary: '#233d5a',
        mck_light: '#BDC4DE'
      }
    }
  },
  plugins: []
}
