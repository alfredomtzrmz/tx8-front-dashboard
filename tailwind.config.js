const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    'components/**/*.{vue,js}',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'plugins/**/*.{js,ts}',
    'nuxt.config.{js,ts}',
    'assets/safelist.txt',
    '/multiselect/'
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '425px',
      ...defaultTheme.screens
    },
    extend: {
      colors: {
        primary: {
          50: '#FCFAF4',
          100: '#F9F4E9',
          200: '#EFE4C9',
          300: '#E5D4A8',
          400: '#D2B366',
          500: '#BF9325',
          600: '#AC8421',
          700: '#735816',
          800: '#564211',
          900: '#392C0B'
        }
      },
      animation: {
        'spin-faster': 'spin .5s linear infinite'
      }
    },
    fontFamily: {
      inter: ['Inter'],
      dm: ['DM Sans']
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ]
}
