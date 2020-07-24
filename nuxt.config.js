export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || 'nuxt demo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '//at.alicdn.com/t/font_1537486_rtpoaxtera.css'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: 'teal' },
  /*
   ** Global scss vara
   ** https://zh.nuxtjs.org/api/configuration-build/#styleresources
   */
  styleResources: {
    scss: ['~/assets/scss/variables.scss']
  },
  /*
   ** Global CSS
   */
  css: [{ src: '@/assets/scss/index.scss', lang: 'scss' }],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ['~/plugins/element-ui', '~/plugins/axios'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // baseUrl:
    //   process.env.NODE_ENV === 'production'
    //     ? 'http://testapi.com'
    //     : 'http://proapi.com',
    // prefix: '/api/',
    // proxy: true,
    // credentials: true
  },
  // proxy: {
  //   '/api/': {
  //     target: 'https://api.douban.com/',
  //     pathRewrite: {
  //       '^/api/': ''
  //     }
  //   }
  // },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: [/^element-ui/],

    // 静态资源文件放在CDN
    publicPath:
      process.env.NODE_ENV === 'production'
        ? `https://cdn.test.cn/dev/v${process.env.npm_package_version}`
        : `https://cdn.test.cn/pro/v${process.env.npm_package_version}`,

    // webpack扩展
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
