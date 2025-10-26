<template>
  <div>
    <a href="#main-content" class="skip-link">Перейти к основному содержимому</a>
    <Header />
    <main id="main-content">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '~/components/ui/layouts/Header.vue'
import Footer from '~/components/ui/layouts/Footer.vue'
</script>

<style scoped>
.skip-link {
  position: fixed;
  left: 8px;
  top: -40px;
  background: var(--color-primary);
  color: var(--color-primary-contrast);
  padding: 8px 12px;
  border-radius: 8px;
  z-index: 2000;
  transition: top var(--transition-normal);
}
.skip-link:focus { top: 8px; }

main { padding-top: 100px; }
</style>
