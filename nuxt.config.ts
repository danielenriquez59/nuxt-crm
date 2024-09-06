// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  serverDir: 'server',
  devtools: {
    enabled: true,
  },
  css: ['~/assets/css/global.css'],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_ANON_KEY,
    },
  },

  extends: ['@nuxt/ui-pro'],

  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/ui', '@vueuse/nuxt', '@pinia/nuxt'],

  ui: {
    safelistColors: ['primary', 'red', 'orange', 'green'],
  },

  colorMode: {
    disableTransition: true,
  },

  routeRules: {
    // Temporary workaround for prerender regression. see https://github.com/nuxt/nuxt/issues/27490
    '/': { prerender: true },
  },

  typescript: {
    strict: false,
  },

  future: {
    compatibilityVersion: 4,
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs',
      },
    },
  },

  compatibilityDate: '2024-07-11',
})
