<template>
  <div class="test-page">
    <h1>Тест слайдеров</h1>
    
    <section class="test-section">
      <h2>Тест карусели</h2>
      <Carousel :autoplay="true" :interval="3000" ariaLabel="Test Carousel">
        <div class="test-slide" v-for="i in 5" :key="i">
          <h3>Слайд {{ i }}</h3>
          <p>Это тестовый слайд номер {{ i }}</p>
        </div>
      </Carousel>
    </section>

    <section class="test-section">
      <h2>Тест услуг</h2>
      <Services />
    </section>

    <section class="test-section">
      <h2>Тест отзывов</h2>
      <Testimonials />
    </section>
  </div>
</template>

<script setup>
import Carousel from '~/components/ui/common/Carousel.vue'
import Services from '~/components/ui/home/Services.vue'
import Testimonials from '~/components/ui/home/Testimonials.vue'

// SEO
useSeo({
  title: 'Тест слайдеров',
  description: 'Страница для тестирования работы слайдеров'
})
</script>

<style scoped>
.test-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.test-section {
  margin-bottom: 4rem;
}

.test-section h2 {
  margin-bottom: 2rem;
  color: var(--color-text-primary);
}

.test-slide {
  background: var(--color-surface);
  padding: 2rem;
  border-radius: var(--radius-lg);
  text-align: center;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @include elevation(sm);
}

.test-slide h3 {
  margin: 0 0 1rem 0;
  color: var(--color-text-primary);
  font-family: var(--font-secondary);
}

.test-slide p {
  margin: 0;
  color: var(--color-text-secondary);
}
</style>
