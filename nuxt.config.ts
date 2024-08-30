// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt'],
  compatibilityDate: '2024-08-23',
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      script: [],
      htmlAttrs: {
        class: 'scroll-smooth',
      },
    },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      authApi: process.env.NUXT_PUBLIC_API_PCF_ACCESS_PORTAL,
      authApiKey: process.env.NUXT_PUBLIC_AUTH_API_KEY_KEY,
      siteWarehouseApi: process.env.NUXT_PUBLIC_API_PCF_SITE_WAREHOUSE,
    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  serverHandlers: [
    {
      handler: '~/server/middleware/cors.ts',
    },
  ],
});
