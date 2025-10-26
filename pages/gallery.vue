<template>
  <section class="page-width gallery-page">
    <header>
      <h1>Галерея</h1>
      <p>Наши кабинеты, процедуры и атмосфера спокойствия.</p>
    </header>
    <div class="masonry">
      <Carousel :autoplay="false" :ariaLabel="'Галерея страницы'" defer>
        <template #default>
          <div v-for="(img, i) in images" :key="i" class="masonry-item">
            <img class="masonry-img" :src="img" :alt="`Фото ${i+1}`" loading="lazy" decoding="async" @click="open(img)"/>
          </div>
        </template>
      </Carousel>
    </div>
  </section>
</template>

<script setup lang="ts">
// Добавь это объявление типа
declare global {
  interface Window {
    openImage?: (src: string) => void
  }
}

import { useSeo } from '~/composables/useSeo'
import Carousel from '~/components/ui/common/Carousel.vue'

useSeo({
  title: 'Галерея — Relaxation Studio',
  description: 'Фотографии наших процедур, интерьеров и атмосферы студии.'
})

const images = [
  '/galery1-optimized.webp',
  '/galery2-optimized.webp',
  '/galery3-optimized.webp',
  '/1kat-optimized.webp',
  '/2kat-optimized.webp',
  '/3kat-optimized.webp'
]

// Теперь TypeScript знает про openImage и @ts-ignore не нужен
const open = (src: string) => {
  if (window.openImage) window.openImage(src)
}
</script>

<style scoped>
.gallery-page { padding: 32px 0; }
.masonry-img { width: 100%; display: block; border-radius: 12px; }
</style>
