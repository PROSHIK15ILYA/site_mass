<template>
  <section class="testimonials page-width" aria-labelledby="testimonials-title" v-reveal>
    <div class="testimonials-header">
      <h2 id="testimonials-title" class="testimonials-title">Отзывы наших клиентов</h2>
      <p class="testimonials-subtitle">Что говорят о нас те, кто уже доверил нам свое здоровье</p>
    </div>
    
    <Carousel :autoplay="true" :interval="4000" :ariaLabel="'Отзывы'" defer>
      <template #default>
        <div class="testimonial card" v-for="(t, i) in testimonials" :key="i">
          <div class="testimonial-header">
            <img :src="t.photo" :alt="`Фото клиента ${t.name}`" class="avatar" loading="lazy"/>
            <div class="testimonial-info">
              <strong class="testimonial-name">{{ t.name }}</strong>
              <div class="rating" aria-label="Оценка 5 из 5">
                <Icon name="star" class="star-icon" v-for="n in 5" :key="n" />
              </div>
            </div>
          </div>
          <blockquote class="testimonial-text">
            <p>{{ t.text }}</p>
          </blockquote>
          <div class="testimonial-date" v-if="t.date">{{ t.date }}</div>
        </div>
      </template>
    </Carousel>
  </section>
</template>

<script setup>
import Carousel from '~/components/ui/common/Carousel.vue'

const testimonials = [
  { 
    name: 'Анна Петрова', 
    photo: '/galery1-optimized.webp', 
    text: 'Лучший массаж в моей жизни. Атмосфера невероятная, результат ощутим с первого сеанса. Мастер очень профессиональный и внимательный.',
    date: '15 декабря 2024'
  },
  { 
    name: 'Екатерина Смирнова', 
    photo: '/galery2-optimized.webp', 
    text: 'Очень понравился LPG и общий массаж. Спина благодарит! Обязательно вернусь еще. Рекомендую всем знакомым.',
    date: '8 декабря 2024'
  },
  { 
    name: 'Мария Козлова', 
    photo: '/galery3-optimized.webp', 
    text: 'Профессионально, деликатно и с заботой. Возвращаюсь снова и снова. Здесь действительно заботятся о клиентах.',
    date: '22 ноября 2024'
  },
  { 
    name: 'Ольга Волкова', 
    photo: '/galery1-optimized.webp', 
    text: 'Отличный массаж лица! Кожа стала более подтянутой и свежей. Мастер объяснила все процедуры и дала рекомендации.',
    date: '5 декабря 2024'
  },
  { 
    name: 'Ирина Новикова', 
    photo: '/galery2-optimized.webp', 
    text: 'Спортивный массаж помог восстановиться после тренировок. Очень довольна результатом и атмосферой в студии.',
    date: '18 ноября 2024'
  }
]
</script>

<style scoped>
.testimonials {
  padding: 80px 0;
  background: linear-gradient(135deg, rgba(74, 144, 164, 0.03), rgba(122, 155, 122, 0.05));
}

@media (max-width: 768px) {
  .testimonials {
    padding: 48px 0;
  }
}

.testimonials-header {
  text-align: center;
  margin-bottom: 48px;
}

@media (max-width: 768px) {
  .testimonials-header {
    margin-bottom: 32px;
  }
}

.testimonials-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 700;
  color: #2C3E50;
  margin: 0 0 16px 0;
}

.testimonials-subtitle {
  font-size: clamp(16px, 2vw, 18px);
  color: #5A6B7A;
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.testimonial {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  padding: 32px;
  height: 100%;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.testimonial:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.testimonial-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #4A90A4;
  transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.avatar:hover {
  transform: scale(1.05);
}

.testimonial-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.testimonial-name {
  font-size: clamp(16px, 2vw, 18px);
  font-weight: 600;
  color: #2C3E50;
  margin: 0;
}

.rating {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
}

.star-icon {
  width: 16px;
  height: 16px;
  color: #E0B100;
  fill: currentColor;
}

.testimonial-text {
  margin: 0 0 24px 0;
}

.testimonial-text p {
  font-size: 16px;
  line-height: 1.625;
  color: #2C3E50;
  margin: 0;
  font-style: italic;
}

.testimonial-date {
  font-size: 14px;
  color: #8B9BA8;
  text-align: right;
  margin: 0;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .testimonial {
    padding: 24px;
  }
  
  .testimonial-header {
    gap: 12px;
  }
  
  .avatar {
    width: 50px;
    height: 50px;
  }
  
  .testimonial-name {
    font-size: 16px;
  }
  
  .star-icon {
    width: 14px;
    height: 14px;
  }
}

/* Accessibility improvements */
.testimonial:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(74, 144, 164, 0.7);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .testimonial:hover {
    transform: none;
  }
  
  .avatar:hover {
    transform: none;
  }
}
</style>
