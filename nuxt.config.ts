import { appDescription, pwa } from './config'

export default defineNuxtConfig({
  devtools: {
    enabled: false,
    vscode: {},
  },

  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@nuxt/devtools',
    '@nuxt/content',
    ['nuxt-ssr-lit', { litElementPrefix: ['lit-'] }],
  ],
  routeRules: {
    '/**': { headers: { 'Access-Control-Allow-Origin': '*' } },
  },
  vite: {
    server: {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  },
  webpack: {
    devMiddleware: {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  },
  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    reactivityTransform: true,
    renderJsonPayloads: true,
    inlineSSRStyles: false,
  },
  css: [
    '@unocss/reset/tailwind.css',
  ],
  colorMode: {
    classSuffix: '',
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
  },
  app: {
    keepalive: true,
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/logo.svg', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        // { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        // { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
    // layoutTransition: { name: 'slide', mode: 'out-in' },
  },
  pwa,
})
