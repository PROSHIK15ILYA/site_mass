<template>
  <section class="testimonials page-width" aria-labelledby="testimonials-title" v-reveal>
    <h2 id="testimonials-title" class="testimonials-title">Отзывы клиентов</h2>
    <Carousel :autoplay="true" :interval="4000" :ariaLabel="'Отзывы'" defer>
      <template #default>
        <div class="testimonial card" v-for="(t, i) in testimonials" :key="i">
          <div class="testimonial-header">
            <img :src="t.photo" :alt="`Фото клиента ${t.name}`" class="avatar"/>
            <div>
              <strong>{{ t.name }}</strong>
              <div class="rating" aria-label="Оценка 5 из 5">★★★★★</div>
            </div>
          </div>
          <p class="testimonial-text">{{ t.text }}</p>
        </div>
      </template>
    </Carousel>
  </section>
</template>

<script setup>
import Carousel from '~/components/ui/common/Carousel.vue'

const testimonials = [
  { name: 'Анна', photo: '/galery1-optimized.webp', text: 'Лучший массаж в моей жизни. Атмосфера невероятная, результат ощутим с первого сеанса.' },
  { name: 'Екатерина', photo: '/galery2-optimized.webp', text: 'Очень понравился LPG и общий массаж. Спина благодарит!' },
  { name: 'Мария', photo: '/galery3-optimized.webp', text: 'Профессионально, деликатно и с заботой. Возвращаюсь снова и снова.' }
]
</script>

<style scoped>
.testimonials { padding: 48px 0; }
.testimonials-title { font-size: clamp(22px, 2.4vw, 36px); margin: 0 0 20px; }
.testimonial { padding: 18px; }
.testimonial-header { display: flex; gap: 12px; align-items: center; margin-bottom: 12px; }
.avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; }
.rating { color: #E0B100; }
.testimonial-text { margin: 0; }
</style>
