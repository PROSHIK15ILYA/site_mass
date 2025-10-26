<template>
  <section class="page-width services-page">
    <header class="services-header">
      <h1>Услуги</h1>
      <p>Выберите категорию и откройте подробности процедур.</p>
    </header>

    <div class="services-grid">
      <NuxtLink v-for="s in services" :key="s.slug" :to="`/services/${s.slug}`" class="card service-card">
        <img :src="s.image" :alt="s.title"/>
        <div class="service-card_body">
          <strong>{{ s.title }}</strong>
          <span>{{ s.short }}</span>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Service {
  slug: string
  image: string
  title: string
  short: string
}

import { useSeo } from '~/composables/useSeo'
useSeo({
  title: 'Услуги массажа и SPA — Relaxation Studio',
  description: 'Расслабляющий, спортивный, LPG и другие процедуры. Узнайте подробности и запишитесь онлайн.'
})

const services = ref<Service[]>([])

onMounted(async () => {
  try {
    services.value = await $fetch('/api/services')
  } catch (error) {
    console.error('Failed to fetch services:', error)
  }
})
</script>

<style scoped>
.services-page { padding: 32px 0; }
.services-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.service-card { overflow: hidden; }
.service-card img { width: 100%; height: 220px; object-fit: cover; }
.service-card_body { padding: 12px; display: grid; gap: 6px; }
@media (max-width: 1200px) { .services-grid { grid-template-columns: repeat(3, 1fr) } }
@media (max-width: 900px) { .services-grid { grid-template-columns: repeat(2, 1fr) } }
@media (max-width: 600px) { .services-grid { grid-template-columns: 1fr } }
</style>
