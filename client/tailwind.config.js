/** @type {import('tailwindcss').Config} */
const flowbite = require('flowbite-react/tailwind')

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    flowbite.content()
  ],
  plugins: [
    flowbite.plugin()
  ],
  darkMode: 'class',
  theme: {
    colors: {
      jesdark: {
        100: '#d4d4d4',
        200: '#bfbfbf',
        300: '#a9a9a9',
        400: '#949494',
        500: '#7f7f7f',
        600: '#696969',
        700: '#545454',
        800: '#3f3f3f',
        900: '#2a2a2a'
      }
    }
  }
}
