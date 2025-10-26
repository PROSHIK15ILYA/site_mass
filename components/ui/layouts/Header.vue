<template>
  <header id="header" class="sticky" v-reveal="'down'">
    <div class="header" role="navigation" aria-label="Главная навигация">
      <NuxtLink class="header-logo" to="/" aria-label="Relaxation Studio">
        <img class="header-logo_image" src="/mainlogo.svg" alt="Relaxation Studio логотип"/>
        <span class="header-logo_title">Relaxation Studio</span>
      </NuxtLink>

      <nav class="header-navbar" itemscope itemtype="http://schema.org/SiteNavigationElement">
        <NuxtLink to="/services" itemprop="url" class="header-navbar_item">Услуги</NuxtLink>
        <NuxtLink to="/about" itemprop="url" class="header-navbar_item">О нас</NuxtLink>
        <NuxtLink to="/gallery" itemprop="url" class="header-navbar_item">Галерея</NuxtLink>
        <NuxtLink to="/reviews" itemprop="url" class="header-navbar_item">Отзывы</NuxtLink>
        <NuxtLink to="/contact" itemprop="url" class="header-navbar_item">Контакты</NuxtLink>
        <NuxtLink to="/blog" itemprop="url" class="header-navbar_item">Блог</NuxtLink>
        <NuxtLink to="/faq" itemprop="url" class="header-navbar_item">FAQ</NuxtLink>
      </nav>

      <div class="header-actions">
        <a class="btn btn-primary ms_booking" href="#" @click.prevent="openBooking">Записаться</a>
      </div>

      <button class="header-burger" @click="toggleMenu" aria-label="Меню">
        <span></span><span></span><span></span>
      </button>
    </div>

    <transition name="slide">
      <div v-if="menuOpen" class="mobile-menu glass" @click.self="toggleMenu">
        <div class="mobile-menu_inner">
          <NuxtLink to="/services" class="mobile-link" @click="toggleMenu">Услуги</NuxtLink>
          <NuxtLink to="/about" class="mobile-link" @click="toggleMenu">О нас</NuxtLink>
          <NuxtLink to="/gallery" class="mobile-link" @click="toggleMenu">Галерея</NuxtLink>
          <NuxtLink to="/reviews" class="mobile-link" @click="toggleMenu">Отзывы</NuxtLink>
          <NuxtLink to="/contact" class="mobile-link" @click="toggleMenu">Контакты</NuxtLink>
          <NuxtLink to="/blog" class="mobile-link" @click="toggleMenu">Блог</NuxtLink>
          <NuxtLink to="/faq" class="mobile-link" @click="toggleMenu">FAQ</NuxtLink>
          <div class="mobile-actions">
            <button class="btn btn-ghost" @click="toggleTheme">Тема</button>
            <a class="btn btn-primary ms_booking" href="#" @click.prevent="openBooking">Записаться</a>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
const menuOpen = ref(false)

onMounted(() => {})

const toggleMenu = () => { menuOpen.value = !menuOpen.value }


const openBooking = () => {
  // YClients widget open if available
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window && window.yc && typeof window.yc.open === 'function') {
      // @ts-ignore
      window.yc.open()
    }
  } catch {}
}
</script>

<style lang="scss" scoped>

.sr-only { @include visually-hidden; }

.header {
  width: min(1280px, 80vw);
  margin: 12px auto;
  border-radius: 16px;
  padding: 12px 16px;
  background: #F7E0B7;
  color: #2C3E50;
  box-shadow: var(--shadow-soft);
}
.header-actions { display: flex; gap: 12px; align-items: center; }
.header-navbar_item { color: #2C3E50; }
.theme-toggle { color: var(--color-text); }

.header-burger { display: none; background: transparent; border: 0; width: 44px; height: 44px; border-radius: 12px; cursor: pointer; }
.header-burger span { display: block; width: 24px; height: 2px; background: var(--color-text); margin: 5px auto; border-radius: 2px; }

@media (max-width: 900px) {
  .header-navbar { display: none; }
  .header-burger { display: inline-flex; align-items: center; justify-content: center; }
}

.mobile-menu { position: fixed; inset: 0; z-index: $z-overlay; display: grid; place-items: end; padding: 0; }
.mobile-menu_inner { width: 100%; padding: 20px; display: flex; flex-direction: column; gap: 12px; border-top-left-radius: $radius-xl; border-top-right-radius: $radius-xl; background: var(--color-surface); box-shadow: var(--shadow-elevated); }
.mobile-link { padding: 12px 8px; color: var(--color-text); text-decoration: none; font-weight: 600; }
.mobile-actions { display: flex; gap: 12px; margin-top: 8px; }

.slide-enter-active, .slide-leave-active { transition: transform var(--transition-normal), opacity var(--transition-normal); }
.slide-enter-from, .slide-leave-to { transform: translateY(100%); opacity: 0; }
</style>
