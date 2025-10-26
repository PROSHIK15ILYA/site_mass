<template>
  <div id="app" class="app">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    
    <!-- Loading indicator -->
    <div id="loading-indicator" class="loading-indicator" aria-hidden="true">
      <div class="loading-spinner"></div>
    </div>
    
    <!-- Skip to content link for accessibility -->
    <a href="#main-content" class="skip-link sr-only">Перейти к основному содержимому</a>
  </div>
</template>

<script setup>
import { useScrollReveal, useMicroInteractions } from '~/composables/useAnimations'

// Global SEO and meta management
useHead({
  title: 'Relaxation Studio — массаж и SPA | Премиальные процедуры',
  meta: [
    { name: 'robots', content: 'index, follow' },
    { name: 'description', content: 'Relaxation Studio — премиальная студия массажа и SPA в Туле. Профессиональные терапевты, современное оборудование, расслабляющая атмосфера.' },
    { name: 'keywords', content: 'массаж, спа, студия массажа, спа-процедуры, Тула, релаксация, профессиональный массаж' },
    { name: 'author', content: 'Relaxation Studio' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
    { name: 'theme-color', content: '#4A90A4' },
    { name: 'color-scheme', content: 'light' },
    { name: 'format-detection', content: 'telephone=no' },
    
    // Open Graph
    { property: 'og:title', content: 'Relaxation Studio — студия массажа и SPA' },
    { property: 'og:description', content: 'Премиальные процедуры массажа и SPA. Забота о теле и душе.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://relaxation-studio.ru/' },
    { property: 'og:image', content: 'https://relaxation-studio.ru/mainlogo.svg' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:site_name', content: 'Relaxation Studio' },
    { property: 'og:locale', content: 'ru_RU' },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Relaxation Studio — студия массажа и SPA' },
    { name: 'twitter:description', content: 'Премиальные процедуры массажа и SPA. Забота о теле и душе.' },
    { name: 'twitter:image', content: 'https://relaxation-studio.ru/mainlogo.svg' },
    
    // Additional meta tags
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'apple-mobile-web-app-title', content: 'Relaxation Studio' },
    { name: 'msapplication-TileColor', content: '#4A90A4' },
    { name: 'msapplication-config', content: '/browserconfig.xml' }
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'preload', href: '/main_photo-optimized.webp', as: 'image', fetchpriority: 'high' },
    { rel: 'preload', href: '/mainlogo.svg', as: 'image' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#4A90A4' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Relaxation Studio',
        url: 'https://relaxation-studio.ru',
        logo: 'https://relaxation-studio.ru/mainlogo.svg',
        description: 'Премиальная студия массажа и SPA в Туле',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'ул. Примерная, 123',
          addressLocality: 'Тула',
          addressRegion: 'Тульская область',
          postalCode: '300000',
          addressCountry: 'RU'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+7 (4872) 123-456',
          contactType: 'customer service',
          email: 'info@relaxation-studio.ru'
        },
        sameAs: [
          'https://vk.com/relaxationstudio',
          'https://instagram.com/relaxationstudio'
        ]
      })
    }
  ]
})

// Initialize animations and micro-interactions
const { addElement: addRevealElement } = useScrollReveal()
const { addHoverEffect, addClickRipple } = useMicroInteractions()

// Performance optimizations
onMounted(() => {
  // Initialize theme
  initTheme()
  
  // Initialize scroll reveal animations
  initScrollReveal()
  
  // Load analytics after page load
  loadAnalytics()
  
  // Initialize micro-interactions
  initMicroInteractions()
  
  // Hide loading indicator
  hideLoadingIndicator()
})

// Theme initialization
const initTheme = () => {
  try {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const theme = stored || (prefersDark ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', theme)
  } catch (error) {
    console.warn('Theme initialization failed:', error)
  }
}

// Scroll reveal initialization
const initScrollReveal = () => {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up, .reveal-down')
  revealElements.forEach(element => {
    addRevealElement(element)
  })
}

// Micro-interactions initialization
const initMicroInteractions = () => {
  const interactiveElements = document.querySelectorAll('.btn, .card, .nav-link')
  interactiveElements.forEach(element => {
    addHoverEffect(element)
    addClickRipple(element)
  })
}

// Analytics loading with performance optimization
const loadAnalytics = () => {
  // Defer third-party scripts with requestIdleCallback fallback
  const run = () => {
    loadYandexMetrika()
    loadMailRuCounter()
    loadYClientsWidget()
  }
  
  if ('requestIdleCallback' in window) {
    // @ts-ignore
    requestIdleCallback(run)
  } else {
    setTimeout(run, 4000)
  }
}

// Yandex Metrika
const loadYandexMetrika = () => {
  const yaScript = document.createElement('script')
  yaScript.innerHTML = `
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    ym(94045123, "init", {clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
  `
  document.head.appendChild(yaScript)
}

// Top.Mail.Ru counter
const loadMailRuCounter = () => {
  const mailScript = document.createElement('script')
  mailScript.src = 'https://top-fwz1.mail.ru/js/code.js'
  mailScript.async = true
  document.head.appendChild(mailScript)
}

// YClients widget
const loadYClientsWidget = () => {
  const ycScript = document.createElement('script')
  ycScript.src = 'https://w922239.yclients.com/widgetJS'
  ycScript.async = true
  ycScript.charset = 'UTF-8'
  document.head.appendChild(ycScript)
}

// Loading indicator management
const hideLoadingIndicator = () => {
  const loadingIndicator = document.getElementById('loading-indicator')
  if (loadingIndicator) {
    loadingIndicator.style.opacity = '0'
    setTimeout(() => {
      loadingIndicator.style.display = 'none'
    }, 300)
  }
}

// Error handling
onErrorCaptured((error) => {
  console.error('Global error captured:', error)
  // Send error to monitoring service
  return false
})
</script>

<style lang="scss">
// Global app styles
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

// Skip link for accessibility
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

// Loading indicator
.loading-indicator {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color-cream);
  @include flex-center();
  z-index: $z-modal;
  @include transition-slow();
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-light-gray);
  border-top: 3px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

// Global focus styles
:focus-visible {
  @include focus-ring();
}

// Selection styles
::selection {
  background: var(--color-primary);
  color: var(--color-white);
}

::-moz-selection {
  background: var(--color-primary);
  color: var(--color-white);
}

// Smooth scrolling
html {
  scroll-behavior: smooth;
}

// Reduced motion support
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  .loading-spinner {
    animation: none;
    border-top-color: var(--color-primary);
  }
}

// High contrast mode support
@media (prefers-contrast: high) {
  .skip-link {
    border: 2px solid var(--color-white);
  }
  
  .loading-spinner {
    border-width: 4px;
  }
}

// Print styles
@media print {
  .skip-link,
  .loading-indicator {
    display: none !important;
  }
  
  .app {
    background: white !important;
    color: black !important;
  }
}
</style>
