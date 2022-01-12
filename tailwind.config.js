const colors = require('tailwindcss/colors')

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
  theme: {
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
        },
        amber: colors.amber
      },
      screens: {
        xs: '425px'
      },
      animation: {
        'spin-faster': 'spin .5s linear infinite'
      }
    },
    fontFamily: {
      inter: ['"Inter"']
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ]
}
