<template>
  <div class="booking-widget card">
    <div class="widget-header">
      <h2>Записаться онлайн</h2>
      <p>Откроется безопасная форма записи нашего партнера.</p>
    </div>
    <div class="widget-actions">
      <a class="btn btn-primary" href="#" @click.prevent="openBooking">Открыть виджет</a>
      <NuxtLink class="btn btn-ghost" to="/services">Посмотреть услуги</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const openBooking = () => {
  try {
    // @ts-ignore
    if (window && window.yc && typeof window.yc.open === 'function') {
      // @ts-ignore
      window.yc.open()
    }
  } catch {}
}
</script>

<style scoped>
.booking-widget { padding: 16px; display: grid; gap: 12px; }
.widget-actions { display: flex; gap: 12px; }
</style>
