<template>
  <div class="layout">
    <a href="#main-content" class="skip-link">Перейти к основному содержимому</a>
    <Header />
    <main id="main-content" class="main-content">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '~/components/ui/layouts/Header.vue'
import Footer from '~/components/ui/layouts/Footer.vue'

// SEO and meta management
useHead({
  htmlAttrs: {
    lang: 'ru'
  },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
    { name: 'theme-color', content: '#4A90A4' },
    { name: 'color-scheme', content: 'light' }
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' }
  ]
})
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 0; // Header is now sticky, no need for padding
  
  // Ensure proper spacing for content
  @include breakpoint($bp-md) {
    padding-top: 0;
  }
}

.skip-link {
  position: fixed;
  left: $space-md;
  top: -100px;
  background: var(--color-primary);
  color: var(--color-white);
  padding: $space-sm $space-md;
  border-radius: var(--radius-md);
  z-index: $z-toast;
  @include transition-fast();
  text-decoration: none;
  font-weight: $font-weight-medium;
  
  &:focus {
    top: $space-md;
  }
}

// Ensure proper stacking context
.layout {
  position: relative;
  z-index: 1;
}
</style>
