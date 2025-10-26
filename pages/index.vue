<template>
  <section>
    <Hero />
    <Categories />
    <Services />
    <Trust />
    <Testimonials />
    <Gallery />
  </section>
</template>

<script setup>
import Hero from '~/components/ui/home/Hero.vue'
import Categories from '~/components/ui/home/Categories.vue'
import Services from '~/components/ui/home/Services.vue'
import Gallery from '~/components/ui/home/Gallery.vue'
import Trust from '~/components/ui/home/Trust.vue'
import Testimonials from '~/components/ui/home/Testimonials.vue'
import { useSeo } from '~/composables/useSeo'

useSeo({
  title: 'Relaxation Studio — массаж и SPA | Премиальные процедуры',
  description: 'Студия премиального массажа и SPA: профессиональные терапевты, современное оборудование, расслабляющая атмосфера.'
})
</script>