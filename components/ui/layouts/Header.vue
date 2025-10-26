<template>
  <header id="header" class="header-container" v-reveal="'down'">
    <div class="header" role="navigation" aria-label="Главная навигация">
      <!-- Logo with emotional branding -->
      <NuxtLink class="header-logo" to="/" aria-label="Relaxation Studio">
        <div class="logo-container">
          <img 
            class="header-logo_image" 
            src="/mainlogo.svg" 
            alt="Relaxation Studio логотип"
            loading="eager"
          />
          <div class="logo-text">
            <span class="logo-title">Relaxation Studio</span>
            <span class="logo-subtitle">Массаж и SPA</span>
          </div>
        </div>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="header-navbar" itemscope itemtype="http://schema.org/SiteNavigationElement">
        <NuxtLink 
          to="/services" 
          itemprop="url" 
          class="nav-link"
          @mouseenter="addHoverEffect($event.target)"
        >
          Услуги
        </NuxtLink>
        <NuxtLink 
          to="/about" 
          itemprop="url" 
          class="nav-link"
          @mouseenter="addHoverEffect($event.target)"
        >
          О нас
        </NuxtLink>
        <NuxtLink 
          to="/gallery" 
          itemprop="url" 
          class="nav-link"
          @mouseenter="addHoverEffect($event.target)"
        >
          Галерея
        </NuxtLink>
        <NuxtLink 
          to="/reviews" 
          itemprop="url" 
          class="nav-link"
          @mouseenter="addHoverEffect($event.target)"
        >
          Отзывы
        </NuxtLink>
        <NuxtLink 
          to="/contact" 
          itemprop="url" 
          class="nav-link"
          @mouseenter="addHoverEffect($event.target)"
        >
          Контакты
        </NuxtLink>
        <NuxtLink 
          to="/blog" 
          itemprop="url" 
          class="nav-link"
          @mouseenter="addHoverEffect($event.target)"
        >
          Блог
        </NuxtLink>
        <NuxtLink 
          to="/faq" 
          itemprop="url" 
          class="nav-link"
          @mouseenter="addHoverEffect($event.target)"
        >
          FAQ
        </NuxtLink>
      </nav>

      <!-- Call-to-Action -->
      <div class="header-actions">
        <a 
          class="btn btn-primary booking-btn" 
          href="#" 
          @click.prevent="openBooking"
          @mouseenter="addHoverEffect($event.target)"
          @click="addClickRipple($event.target)"
        >
          <Icon name="calendar" class="btn-icon" />
          Записаться
        </a>
      </div>

      <!-- Mobile Menu Toggle -->
      <button 
        class="header-burger" 
        @click="toggleMenu" 
        aria-label="Меню"
        aria-expanded="false"
        :aria-expanded="menuOpen.toString()"
      >
        <span class="burger-line" :class="{ 'active': menuOpen }"></span>
        <span class="burger-line" :class="{ 'active': menuOpen }"></span>
        <span class="burger-line" :class="{ 'active': menuOpen }"></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide-down">
      <div 
        v-if="menuOpen" 
        class="mobile-menu glass" 
        @click.self="toggleMenu"
        role="dialog"
        aria-modal="true"
        aria-label="Мобильное меню"
      >
        <div class="mobile-menu_inner">
          <div class="mobile-menu_header">
            <h3 class="mobile-menu_title">Меню</h3>
            <button 
              class="mobile-menu_close" 
              @click="toggleMenu"
              aria-label="Закрыть меню"
            >
              <Icon name="x" />
            </button>
          </div>
          
          <nav class="mobile-nav">
            <NuxtLink 
              to="/services" 
              class="mobile-link" 
              @click="toggleMenu"
            >
              <Icon name="sparkles" class="mobile-link-icon" />
              Услуги
            </NuxtLink>
            <NuxtLink 
              to="/about" 
              class="mobile-link" 
              @click="toggleMenu"
            >
              <Icon name="heart" class="mobile-link-icon" />
              О нас
            </NuxtLink>
            <NuxtLink 
              to="/gallery" 
              class="mobile-link" 
              @click="toggleMenu"
            >
              <Icon name="photo" class="mobile-link-icon" />
              Галерея
            </NuxtLink>
            <NuxtLink 
              to="/reviews" 
              class="mobile-link" 
              @click="toggleMenu"
            >
              <Icon name="star" class="mobile-link-icon" />
              Отзывы
            </NuxtLink>
            <NuxtLink 
              to="/contact" 
              class="mobile-link" 
              @click="toggleMenu"
            >
              <Icon name="phone" class="mobile-link-icon" />
              Контакты
            </NuxtLink>
            <NuxtLink 
              to="/blog" 
              class="mobile-link" 
              @click="toggleMenu"
            >
              <Icon name="document-text" class="mobile-link-icon" />
              Блог
            </NuxtLink>
            <NuxtLink 
              to="/faq" 
              class="mobile-link" 
              @click="toggleMenu"
            >
              <Icon name="question-mark-circle" class="mobile-link-icon" />
              FAQ
            </NuxtLink>
          </nav>
          
          <div class="mobile-actions">
            <a 
              class="btn btn-primary mobile-booking-btn" 
              href="#" 
              @click.prevent="openBooking"
            >
              <Icon name="calendar" class="btn-icon" />
              Записаться на процедуру
            </a>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { useScrollReveal, useMicroInteractions } from '~/composables/useAnimations'

const menuOpen = ref(false)
const { addHoverEffect, addClickRipple } = useMicroInteractions()

// Prevent body scroll when menu is open
watch(menuOpen, (isOpen) => {
  if (typeof window !== 'undefined') {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }
})

const toggleMenu = () => { 
  menuOpen.value = !menuOpen.value 
}

const openBooking = () => {
  // YClients widget open if available
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window && window.yc && typeof window.yc.open === 'function') {
      // @ts-ignore
      window.yc.open()
    }
  } catch (error) {
    console.warn('Booking widget not available:', error)
  }
}

// Close menu on escape key
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && menuOpen.value) {
      menuOpen.value = false
    }
  }
  
  document.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>

<style lang="scss" scoped>
.header-container {
  position: sticky;
  top: 0;
  z-index: $z-sticky;
  background: var(--color-cream);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(var(--color-primary), 0.1);
}

.header {
  @include container();
  @include flex-between();
  padding: $space-md 0;
  min-height: 80px;
  
  @include breakpoint($bp-md) {
    padding: $space-lg 0;
    min-height: 90px;
  }
}

// Logo styling with emotional design
.header-logo {
  text-decoration: none;
  @include transition-fast();
  
  &:hover {
    transform: scale(1.02);
  }
}

.logo-container {
  @include flex-center();
  gap: $space-sm;
}

.header-logo_image {
  width: 48px;
  height: 48px;
  @include transition-fast();
  
  @include breakpoint($bp-md) {
    width: 56px;
    height: 56px;
  }
}

.logo-text {
  @include flex-column();
  gap: 2px;
}

.logo-title {
  font-family: var(--font-secondary);
  font-size: $font-size-lg;
  font-weight: $font-weight-bold;
  color: var(--color-text-primary);
  line-height: 1.2;
  
  @include breakpoint($bp-md) {
    font-size: $font-size-xl;
  }
}

.logo-subtitle {
  font-family: var(--font-primary);
  font-size: $font-size-xs;
  color: var(--color-text-muted);
  font-weight: $font-weight-medium;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

// Desktop Navigation
.header-navbar {
  @include flex-center();
  gap: $space-xl;
  
  @include breakpoint-down($bp-lg) {
    display: none;
  }
}

.nav-link {
  position: relative;
  font-family: var(--font-primary);
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  color: var(--color-text-primary);
  text-decoration: none;
  padding: $space-sm $space-md;
  border-radius: var(--radius-md);
  @include transition-fast();
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 2px;
    background: var(--color-primary);
    @include transition-fast();
    transform: translateX(-50%);
  }
  
  &:hover {
    color: var(--color-primary);
    background: rgba(var(--color-primary), 0.05);
    
    &::after {
      width: 80%;
    }
  }
  
  &.router-link-active {
    color: var(--color-primary);
    font-weight: $font-weight-semibold;
    
    &::after {
      width: 80%;
    }
  }
}

// Header Actions
.header-actions {
  @include flex-center();
  gap: $space-md;
}

.booking-btn {
  @include flex-center();
  gap: $space-sm;
  padding: $space-sm $space-lg;
  font-weight: $font-weight-semibold;
  @include elevation(sm);
  
  &:hover {
    @include elevation(md);
    transform: translateY(-1px);
  }
}

.btn-icon {
  width: 18px;
  height: 18px;
}

// Mobile Menu Toggle
.header-burger {
  display: none;
  @include flex-column-center();
  width: 48px;
  height: 48px;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: var(--radius-md);
  @include transition-fast();
  
  @include breakpoint-down($bp-lg) {
    display: flex;
  }
  
  &:hover {
    background: rgba(var(--color-primary), 0.1);
  }
  
  &:focus-visible {
    @include focus-ring();
  }
}

.burger-line {
  width: 24px;
  height: 2px;
  background: var(--color-text-primary);
  border-radius: 2px;
  @include transition-fast();
  margin: 2px 0;
  
  &.active {
    &:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    &:nth-child(2) {
      opacity: 0;
    }
    
    &:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
  }
}

// Mobile Menu
.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: $z-modal;
  background: rgba(var(--color-primary), 0.1);
  backdrop-filter: blur(20px);
  @include flex-center();
  padding: $space-lg;
  
  @include breakpoint($bp-lg) {
    display: none;
  }
}

.mobile-menu_inner {
  width: 100%;
  max-width: 400px;
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  @include elevation(xl);
  overflow: hidden;
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu_header {
  @include flex-between();
  padding: $space-lg;
  border-bottom: 1px solid var(--color-light-gray);
}

.mobile-menu_title {
  font-family: var(--font-secondary);
  font-size: $font-size-xl;
  font-weight: $font-weight-semibold;
  color: var(--color-text-primary);
  margin: 0;
}

.mobile-menu_close {
  @include flex-center();
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  @include transition-fast();
  
  &:hover {
    background: var(--color-light-gray);
  }
}

.mobile-nav {
  padding: $space-lg;
  @include flex-column();
  gap: $space-sm;
}

.mobile-link {
  @include flex-center();
  gap: $space-md;
  padding: $space-md;
  color: var(--color-text-primary);
  text-decoration: none;
  font-weight: $font-weight-medium;
  border-radius: var(--radius-md);
  @include transition-fast();
  
  &:hover {
    background: var(--color-light-gray);
    color: var(--color-primary);
  }
}

.mobile-link-icon {
  width: 20px;
  height: 20px;
  color: var(--color-primary);
}

.mobile-actions {
  padding: $space-lg;
  border-top: 1px solid var(--color-light-gray);
}

.mobile-booking-btn {
  width: 100%;
  @include flex-center();
  gap: $space-sm;
  padding: $space-md;
  font-weight: $font-weight-semibold;
}

// Animations
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

// Accessibility improvements
@media (prefers-reduced-motion: reduce) {
  .header-logo,
  .nav-link,
  .booking-btn,
  .header-burger,
  .mobile-link {
    transition: none;
  }
  
  .mobile-menu_inner {
    animation: none;
  }
}

// High contrast mode support
@media (prefers-contrast: high) {
  .nav-link::after {
    height: 3px;
  }
  
  .burger-line {
    height: 3px;
  }
}
</style>
