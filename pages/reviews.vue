<template>
  <section class="page-width reviews-page">
    <header>
      <h1>Отзывы</h1>
      <p>Опыт наших клиентов о процедурах и впечатлениях.</p>
    </header>
    <Testimonials />
  </section>
</template>

<script setup>
import Testimonials from '~/components/ui/home/Testimonials.vue'
import { useSeo } from '~/composables/useSeo'
useSeo({ title: 'Отзывы — Relaxation Studio', description: 'Реальные отзывы клиентов студии массажа и SPA.' })
</script>

<style scoped>
.reviews-page { padding: 32px 0; }
</style>
