<template>
  <section id="services" class="services-slider page-width" v-reveal>
    <h2 class="categories-title">Услуги</h2>
    <Carousel :autoplay="true" :interval="5000" :ariaLabel="'Услуги'" defer>
      <template #default>
        <NuxtLink v-for="s in items" :key="s.slug" class="service-slide card" :to="`/services/${s.slug}`">
          <img :src="s.image" :alt="s.title" />
          <strong class="name">{{ s.title }}</strong>
        </NuxtLink>
      </template>
    </Carousel>
  </section>
</template>

<script setup>
import Carousel from '~/components/ui/common/Carousel.vue'
const items = ref([])
onMounted(async () => {
  try {
    items.value = await $fetch('/api/services')
  } catch {
    items.value = [
      { slug: 'relax', title: 'Расслабляющий массаж', image: '/spina.webp' },
      { slug: 'lpg', title: 'LPG массаж', image: '/lpg.webp' },
      { slug: 'face', title: 'Массаж лица', image: '/lico.webp' },
      { slug: 'sport', title: 'Спортивный массаж', image: '/sport.webp' }
    ]
  }
})
</script>

<style scoped>
.services-slider { padding: 32px 0; }
.service-slide { overflow: hidden; position: relative; }
.service-slide img { width: 100%; height: 260px; object-fit: cover; }
.service-slide .name { position: absolute; left: 12px; bottom: 12px; background: rgba(255,255,255,0.9); padding: 6px 10px; border-radius: 8px; color: #2C3E50; }
</style>