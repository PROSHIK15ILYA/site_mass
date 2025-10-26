<template>
  <div class="home-page">
    <!-- Hero Section with emotional storytelling -->
    <section class="hero-section" aria-labelledby="hero-title">
      <Hero />
    </section>

    <!-- Services Categories -->
    <section class="categories-section" aria-labelledby="categories-title">
      <Categories />
    </section>

    <!-- Main Services -->
    <section class="services-section" aria-labelledby="services-title">
      <Services />
    </section>

    <!-- Trust Indicators -->
    <section class="trust-section" aria-labelledby="trust-title">
      <Trust />
    </section>

    <!-- Customer Testimonials -->
    <section class="testimonials-section" aria-labelledby="testimonials-title">
      <Testimonials />
    </section>

    <!-- Gallery -->
    <section class="gallery-section" aria-labelledby="gallery-title">
      <Gallery />
    </section>
  </div>
</template>

<script setup>
import Hero from '~/components/ui/home/Hero.vue'
import Categories from '~/components/ui/home/Categories.vue'
import Services from '~/components/ui/home/Services.vue'
import Gallery from '~/components/ui/home/Gallery.vue'
import Trust from '~/components/ui/home/Trust.vue'
import Testimonials from '~/components/ui/home/Testimonials.vue'
import { useSeo } from '~/composables/useSeo'

// Comprehensive SEO configuration
useSeo({
  title: 'Relaxation Studio — Премиальный массаж и SPA в Туле',
  description: 'Студия премиального массажа и SPA в Туле. Профессиональные терапевты, современное оборудование, расслабляющая атмосфера. Запишитесь на процедуру уже сегодня!',
  keywords: [
    'массаж Тула',
    'спа Тула', 
    'премиальный массаж',
    'профессиональный массаж',
    'расслабляющий массаж',
    'лечебный массаж',
    'косметология Тула',
    'уход за телом',
    'релаксация',
    'антистресс массаж',
    'спортивный массаж',
    'классический массаж',
    'тайский массаж',
    'стоун-терапия',
    'ароматерапия'
  ],
  type: 'website',
  organization: {
    name: 'Relaxation Studio',
    url: 'https://relaxation-studio.ru',
    logo: 'https://relaxation-studio.ru/mainlogo.svg',
    description: 'Премиальная студия массажа и SPA в Туле',
    address: {
      street: 'ул. Примерная, 123',
      city: 'Тула',
      region: 'Тульская область',
      postalCode: '300000',
      country: 'RU'
    },
    contactPoint: {
      telephone: '+7 (4872) 123-456',
      contactType: 'customer service',
      email: 'info@relaxation-studio.ru'
    }
  },
  breadcrumbs: [
    { name: 'Главная', url: 'https://relaxation-studio.ru/' }
  ],
  faq: [
    {
      question: 'Какие виды массажа вы предлагаете?',
      answer: 'Мы предлагаем классический, расслабляющий, лечебный, спортивный, тайский массаж, стоун-терапию и ароматерапию.'
    },
    {
      question: 'Сколько стоит сеанс массажа?',
      answer: 'Стоимость зависит от вида массажа и продолжительности сеанса. Базовый расслабляющий массаж от 2000 рублей за 60 минут.'
    },
    {
      question: 'Как записаться на процедуру?',
      answer: 'Вы можете записаться онлайн через наш сайт, позвонить по телефону +7 (4872) 123-456 или прийти лично в студию.'
    },
    {
      question: 'Есть ли противопоказания к массажу?',
      answer: 'Да, есть противопоказания. Перед процедурой мы проводим консультацию и учитываем индивидуальные особенности клиента.'
    }
  ]
})

// Structured data for the homepage
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Relaxation Studio',
        description: 'Премиальная студия массажа и SPA в Туле',
        url: 'https://relaxation-studio.ru',
        telephone: '+7 (4872) 123-456',
        email: 'info@relaxation-studio.ru',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'ул. Примерная, 123',
          addressLocality: 'Тула',
          addressRegion: 'Тульская область',
          postalCode: '300000',
          addressCountry: 'RU'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '54.1961',
          longitude: '37.6182'
        },
        openingHours: [
          'Mo-Fr 09:00-21:00',
          'Sa-Su 10:00-20:00'
        ],
        priceRange: '$$',
        paymentAccepted: 'Cash, Credit Card',
        currenciesAccepted: 'RUB',
        image: 'https://relaxation-studio.ru/main_photo-optimized.webp',
        logo: 'https://relaxation-studio.ru/mainlogo.svg',
        sameAs: [
          'https://vk.com/relaxationstudio',
          'https://instagram.com/relaxationstudio'
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Услуги массажа и SPA',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Классический массаж',
                description: 'Традиционный массаж для расслабления и снятия напряжения'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Лечебный массаж',
                description: 'Специализированный массаж для лечения и профилактики заболеваний'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Стоун-терапия',
                description: 'Массаж с использованием нагретых камней'
              }
            }
          ]
        }
      })
    }
  ]
})
</script>

<style lang="scss" scoped>
.home-page {
  // Ensure proper semantic structure
  section {
    position: relative;
    overflow: hidden;
  }
  
  // Add subtle background patterns for emotional design
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 80%, rgba($color-primary, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba($color-accent, 0.03) 0%, transparent 50%);
    pointer-events: none;
    z-index: -1;
  }
}

// Section spacing with emotional rhythm
.hero-section {
  margin-bottom: $space-5xl;
}

.categories-section {
  margin-bottom: $space-4xl;
}

.services-section {
  margin-bottom: $space-4xl;
}

.trust-section {
  margin-bottom: $space-4xl;
}

.testimonials-section {
  margin-bottom: $space-4xl;
}

.gallery-section {
  margin-bottom: $space-3xl;
}

// Responsive adjustments
@include breakpoint-down($bp-md) {
  .hero-section {
    margin-bottom: $space-3xl;
  }
  
  .categories-section,
  .services-section,
  .trust-section,
  .testimonials-section,
  .gallery-section {
    margin-bottom: $space-2xl;
  }
}
</style>