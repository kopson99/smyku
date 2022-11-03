export default {

  // target: 'server',
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'smyku',
    htmlAttrs: {
      lang: 'pl'
    },
    meta: [
      {charset: 'utf-8'},
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1.0'},
      {hid: 'description', name: 'description', content: 'content'},
      {name: 'format-detection', content: 'telephone=no'},
      {'http-equiv': 'X-UA-Compatible', content: 'IE=edge'},
      {'http-equiv': 'ScreenOrientation', content: 'autoRotate:disabled'},
      {property: 'og:type', content: 'website'},
      {property: 'og:site_name', content: 'smyku'},
      {property: 'og:title', content: 'smyku'},
      {property: 'og:description', content: 'content'},

    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: 'https://cdn.rawgit.com/mfd/09b70eb47474836f25a21660282ce0fd/raw/e06a670afcb2b861ed2ac4a1ef752d062ef6b46b/Gilroy.css'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // '~/assets/sass/app.sass',

    '~/assets/sass/app.sass',

    'aos/dist/aos.css',
    '@fortawesome/fontawesome-svg-core/styles.css'


  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: "~/plugins/aos.js", ssr: false},
    {src: "~/plugins/numeral-filter.js", ssr: false},
    {src: "~/plugins/fontawesome.js", ssr: false},
    {src: "~/plugins/chart-plugin.js", ssr: false},

  ],


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/router',
    '@nuxtjs/auth-next'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  axios: {
    // WARNING: proxy doesn't work with nuxt generate,
    // have to use a prefix and set an API_URL
    proxy: true,
    prefix: process.env.API_URL
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ["aos"]
  },
  server: {
    port: 3001 // default: 3000
  },
  proxy: {
    '/api': {
      target: 'http://localhost:8081',
      ws: true,
      changeOrigin: true
    },
    '/auth': {
      target: 'http://localhost:8081',
      ws: true,
      changeOrigin: true
    }
  },
  router: {
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/dashboard/'
    },
    scopeKey: 'roles',
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access_token',
          required: true,
          maxAge: 1800,
          global: false,
          type: 'Bearer'
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refreshToken',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          register: { url: '/auth/register', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/user', method: 'get' },
          refresh: { url: '/auth/refresh', method: 'post' }
        }
      }
    }
  }
}
