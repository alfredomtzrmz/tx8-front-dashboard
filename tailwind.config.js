const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    whitelistPatterns: [
      /multiselect/
    ],
    content: [
      'components/**/*.{vue,js}',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.{js,ts}',
      'nuxt.config.{js,ts}',
      'assets/safelist.txt',
      '/multiselect/'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        xs: '425px'
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#FFF',
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
      yellow: {
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f'
      },
      blue: {
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e'
      },
      green: {
        100: '#d1fae5',
        200: '#a7f3d0',
        300: '#6ee7b7',
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b'
      },
      red: {
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d'
      },
      darkgray: {
        100: '#d9d9d9',
        200: '#b3b3b3',
        300: '#8e8e8e',
        400: '#686868',
        500: '#424242',
        600: '#353535',
        700: '#282828',
        800: '#1a1a1a',
        900: '#0d0d0d'
      },
      gray: colors.gray
    },
    fontFamily: {
      inter: ['"Inter"']
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled']
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms')
  ]
}
