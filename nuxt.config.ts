export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  telemetry: false,

  // Performance optimizations
  experimental: {
    payloadExtraction: false,
    inlineSSRStyles: false
  },

  // CSS and styling
  css: ['~/assets/scss/main.scss'],

  // Vite configuration
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "~/assets/scss/_variables.scss";
            @import "~/assets/scss/_mixins.scss";
            @import "~/assets/scss/_base.scss";
          `
        }
      }
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router'],
            ui: ['@headlessui/vue', '@heroicons/vue']
          }
        }
      }
    }
  },

  // App configuration
  app: {
    pageTransition: { name: 'page', mode: 'out-in', appear: true },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'Relaxation Studio — студия массажа и SPA',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'color-scheme', content: 'light' },
        { name: 'theme-color', content: '#698D69' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'preload', href: '/main_photo-optimized.webp', as: 'image', fetchpriority: 'high' },
        { rel: 'preload', href: '/mainlogo.svg', as: 'image' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
        }
      ]
    }
  },

  // Runtime config for environment variables
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://relaxation-studio.ru',
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3000/api'
    }
  },

  // Modules
  modules: [
    '@pinia/nuxt',
    'nuxt-icon'
  ],

  // Build configuration
  build: {
    transpile: ['@headlessui/vue']
  },

  // Nitro configuration for server
  nitro: {
    compressPublicAssets: true,
    minify: true
  }
})