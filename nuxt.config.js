export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: 8000,
    host: '0.0.0.0'
  },
  target: 'server',
  head: {
    title: 'TX8 - Dashboard',
    bodyAttrs: {
      class: 'font-dm bg-gray-100 transition-colors duration-100 dark:bg-gray-900 antialiased overflow-y-auto'
    },
    htmlAttrs: {
      lang: 'es-MX'
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main.scss'
  ],

  layoutTransition: 'tweakOpacity',
  pageTransition: 'tweakOpacity',

  loading: false,
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/echo',
      mode: 'client'
    },
    { src: '~/plugins/vt-notifications' },
    { src: '~/plugins/v-maska' },
    { src: '~/plugins/v-tippy' },
    { src: '~/plugins/v-clipboard' },
    { src: '~/plugins/v-select' },
    { src: '~/plugins/vuex-persistedstate' }
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://color-mode.nuxtjs.org/
    '@nuxtjs/color-mode',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://google-fonts.nuxtjs.org/
    '@nuxtjs/google-fonts'
  ],
  colorMode: {
    classSuffix: ''
  },
  googleFonts: {
    families: {
      Inter: {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900]
      },
      'DM+Sans': {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900]
      }
    },
    display: 'swap',
    download: true,
    overwriting: false,
    stylePath: 'scss/Base/_fonts.scss'
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
    // https://github.com/nuxt/postcss8
    '@nuxt/postcss8'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL,
    withCredentials: true
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    },
    strategies: {
      laravelJWT: {
        provider: 'laravelJWT',
        url: process.env.BASE_URL,
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post'
          },
          logout: {
            url: '/auth/logout',
            method: 'post'
          },
          user: {
            url: '/auth/me',
            method: 'get'
          },
          refresh: {
            url: '/auth/refresh',
            method: 'post'
          }
        },
        user: {
          property: 'data'
        },
        token: {
          property: 'data.access_token',
          maxAge: 60 * 60
        },
        refreshToken: {
          maxAge: 20160 * 60
        }
      }
    }
  },

  router: {
    middleware: ['auth']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {}
      }
    },
    transpile: [
      'vt-notifications'
    ]
  },

  publicRuntimeConfig: {
    baseImageUrl: process.env.TX8_S3_URL
  }
}
