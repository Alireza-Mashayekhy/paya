export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'panel',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@assets/css/main.css',
    '@assets/css/fontiran.css',
    '@assets/css/fs-min.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/bootstrap.js', '~/plugins/vee-validate.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: '~/components', // will get any components nested in let's say /components/test too
      pathPrefix: false,
    },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'http://127.0.0.1:8000/',
  },

  // Options
  auth: {
    redirect: {
      login: '/',
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          // required: true,
          type: 'token',
        },
        user: {
          property: '',
          autoFetch: true,
        },
        endpoints: {
          login: {
            url: 'api-token-auth/',
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
          },
          logout: {
            url: 'usermodel/api/users/logout/',
            method: 'get',
          },
          user: {
            url: 'usermodel/api/users/info/',
            method: 'get',
          },
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules'],
  },

  transition: 'pages-fade',
}
