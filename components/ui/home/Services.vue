<template>
  <section id="services" class="services-slider page-width" v-reveal>
    <div class="services-header">
      <h2 class="services-title">Наши услуги</h2>
      <p class="services-subtitle">Профессиональные процедуры для вашего здоровья и красоты</p>
    </div>
    
    <Carousel :autoplay="true" :interval="5000" :ariaLabel="'Услуги'" defer>
      <template #default>
        <NuxtLink 
          v-for="s in items" 
          :key="s.slug" 
          class="service-slide card" 
          :to="`/services/${s.slug}`"
          @mouseenter="addHoverEffect($event.target)"
        >
          <div class="service-image-container">
            <img :src="s.image" :alt="s.title" loading="lazy" />
            <div class="service-overlay">
              <Icon name="arrow-right" class="service-icon" />
            </div>
          </div>
          <div class="service-content">
            <h3 class="service-name">{{ s.title }}</h3>
            <p class="service-description" v-if="s.description">{{ s.description }}</p>
            <div class="service-price" v-if="s.price">от {{ s.price }} ₽</div>
          </div>
        </NuxtLink>
      </template>
    </Carousel>
  </section>
</template>

<script setup>
import Carousel from '~/components/ui/common/Carousel.vue'
import { useMicroInteractions } from '~/composables/useAnimations'

const { addHoverEffect } = useMicroInteractions()

const items = ref([])

onMounted(async () => {
  try {
    items.value = await $fetch('/api/services')
  } catch (error) {
    console.warn('Failed to fetch services, using fallback data:', error)
    items.value = [
      { 
        slug: 'relax', 
        title: 'Расслабляющий массаж', 
        image: '/spina.webp',
        description: 'Снятие напряжения и стресса',
        price: '2 900'
      },
      { 
        slug: 'lpg', 
        title: 'LPG массаж', 
        image: '/lpg.webp',
        description: 'Современная аппаратная методика',
        price: '2 500'
      },
      { 
        slug: 'face', 
        title: 'Массаж лица', 
        image: '/lico.webp',
        description: 'Омоложение и подтяжка кожи',
        price: '1 800'
      },
      { 
        slug: 'sport', 
        title: 'Спортивный массаж', 
        image: '/sport.webp',
        description: 'Для спортсменов и активных людей',
        price: '3 200'
      },
      { 
        slug: 'stone', 
        title: 'Стоун-терапия', 
        image: '/stoun.webp',
        description: 'Массаж нагретыми камнями',
        price: '3 500'
      },
      { 
        slug: 'anti-cellulite', 
        title: 'Антицеллюлитный', 
        image: '/anti.webp',
        description: 'Борьба с целлюлитом',
        price: '2 800'
      }
    ]
  }
})
</script>

<style scoped>
.services-slider {
  padding: 80px 0;
}

@media (max-width: 768px) {
  .services-slider {
    padding: 48px 0;
  }
}

.services-header {
  text-align: center;
  margin-bottom: 48px;
}

@media (max-width: 768px) {
  .services-header {
    margin-bottom: 32px;
  }
}

.services-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 700;
  color: #2C3E50;
  margin: 0 0 16px 0;
}

.services-subtitle {
  font-size: clamp(16px, 2vw, 18px);
  color: #5A6B7A;
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.service-slide {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  position: relative;
  height: 100%;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.service-slide:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.service-slide:hover .service-overlay {
  opacity: 1;
}

.service-slide:hover .service-image-container img {
  transform: scale(1.05);
}

.service-image-container {
  position: relative;
  overflow: hidden;
  height: 200px;
}

@media (min-width: 768px) {
  .service-image-container {
    height: 240px;
  }
}

.service-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.service-overlay {
  position: absolute;
  inset: 0;
  background: rgba(74, 144, 164, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.service-icon {
  width: 32px;
  height: 32px;
  color: #ffffff;
}

.service-content {
  padding: 24px;
}

@media (max-width: 480px) {
  .service-content {
    padding: 16px;
  }
}

.service-name {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(18px, 2.5vw, 20px);
  font-weight: 600;
  color: #2C3E50;
  margin: 0 0 8px 0;
  line-height: 1.25;
}

.service-description {
  font-size: 14px;
  color: #5A6B7A;
  margin: 0 0 16px 0;
  line-height: 1.5;
}

.service-price {
  font-size: clamp(16px, 2vw, 18px);
  font-weight: 700;
  color: #4A90A4;
  margin: 0;
}

/* Accessibility improvements */
.service-slide:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(74, 144, 164, 0.7);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .service-slide:hover {
    transform: none;
  }
  
  .service-image-container img {
    transition: none;
  }
  
  .service-overlay {
    transition: none;
  }
}
</style>