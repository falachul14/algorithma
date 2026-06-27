// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: false,
  css: [
    '~/assets/css/main.css'
  ],
  devtools: { enabled: true },
  nitro: {
    prerender: {
      crawlLinks: true
    }
  },
  modules: ['@pinia/nuxt', '@nuxt/ui'],
  pinia: {
    storesDirs: ['./app/stores/**']
  },
  ui: {
    colorMode: false,
  }
})