<template>
  <section class="page-width booking-page">
    <header>
      <h1>Онлайн-запись</h1>
      <p>Выберите услугу, дату и время. Запись займет меньше минуты.</p>
    </header>

    <BookingWidget />
  </section>
</template>

<script setup>
import BookingWidget from '~/components/ui/common/BookingWidget.vue'
import { useSeo } from '~/composables/useSeo'
useSeo({ title: 'Онлайн-запись — Relaxation Studio', description: 'Быстрая и удобная запись на массаж и SPA-процедуры.' })
</script>

<style scoped>
.booking-page { padding: 32px 0; }
</style>
