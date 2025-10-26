<template>
  <section class="page-width service-detail">
    <nav class="breadcrumbs" aria-label="Хлебные крошки">
      <NuxtLink to="/services">Услуги</NuxtLink>
      <span aria-hidden="true">/</span>
      <span>{{ service.title }}</span>
    </nav>

    <header class="service-header">
      <h1>{{ service.title }}</h1>
      <p>{{ service.subtitle }}</p>
      <div class="service-meta">
        <span>Длительность: {{ service.duration }}</span>
        <span>Цена: {{ service.price }}</span>
      </div>
      <div class="actions">
        <a class="btn btn-primary ms_booking" href="#" @click.prevent="openBooking">Записаться</a>
      </div>
    </header>

    <div class="service-layout">
      <div class="service-main card">
        <img :src="service.image" :alt="service.title" />
        <div class="service-content">
          <h2>Преимущества</h2>
          <ul>
            <li v-for="(b, i) in service.benefits" :key="i">{{ b }}</li>
          </ul>
          <h2>Показания</h2>
          <p>{{ service.indications }}</p>
        </div>
      </div>
      <aside class="service-aside">
        <div class="card" style="padding:16px;">
          <h3>Другие услуги</h3>
          <ul>
            <li v-for="s in others" :key="s.slug"><NuxtLink :to="`/services/${s.slug}`">{{ s.title }}</NuxtLink></li>
          </ul>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
const route = useRoute()
import { useSeo } from '~/composables/useSeo'

const db: Record<string, any> = {
  relax: { title: 'Расслабляющий массаж', subtitle: 'Снятие напряжения и восстановление ресурса', duration: '60 мин', price: 'от 2 900 ₽', image: '/spina.webp', benefits: ['Снимает стресс', 'Улучшает сон', 'Повышает тонус'], indications: 'Усталость, стресс, мышечные зажимы' },
  lpg: { title: 'LPG массаж', subtitle: 'Современная аппаратная методика', duration: '40 мин', price: 'от 2 500 ₽', image: '/lpg.webp', benefits: ['Улучшает лимфоток', 'Корректирует силуэт', 'Уменьшает отёчность'], indications: 'Застой лимфы, целлюлит, отёки' },
  face: { title: 'Массаж лица', subtitle: 'Лифтинг и тонус кожи', duration: '30 мин', price: 'от 1 500 ₽', image: '/lico.webp', benefits: ['Улучшает цвет лица', 'Подтягивает овал', 'Снимает отёчность'], indications: 'Тонус кожи, отёки' },
  sport: { title: 'Спортивный массаж', subtitle: 'Восстановление после нагрузок', duration: '60 мин', price: 'от 3 200 ₽', image: '/sport.webp', benefits: ['Ускоряет восстановление', 'Повышает выносливость', 'Снимает боль'], indications: 'Спортивные нагрузки, травмы' }
}

const service = computed(() => db[String(route.params.slug)] || db.relax)
const others = computed(() => Object.entries(db).filter(([k]) => k !== route.params.slug).map(([slug, v]: any) => ({ slug, title: v.title })))

const openBooking = () => { try { // @ts-ignore
  if (window && window.yc && typeof window.yc.open === 'function') { // @ts-ignore
    window.yc.open() } } catch {}
}

useSeo({
  title: () => `${service.value.title} — Relaxation Studio`,
  description: () => `${service.value.subtitle}. Длительность ${service.value.duration}. Цена ${service.value.price}.`,
  image: () => service.value.image,
  url: () => `https://relaxation-studio.ru/services/${route.params.slug}`
})
</script>

<style scoped>
.service-detail { padding: 24px 0; }
.breadcrumbs { display: flex; gap: 8px; color: var(--color-muted); font-size: 14px; margin-bottom: 12px; }
.service-header h1 { font-size: clamp(26px,3vw,40px); margin: 0 0 6px; }
.service-meta { display: flex; gap: 16px; color: var(--color-muted); margin-bottom: 12px; }
.service-layout { display: grid; grid-template-columns: 1.3fr 0.7fr; gap: 16px; margin-top: 16px; }
.service-main img { width: 100%; height: 340px; object-fit: cover; border-top-left-radius: 12px; border-top-right-radius: 12px; }
.service-content { padding: 16px; }
@media (max-width: 960px) { .service-layout { grid-template-columns: 1fr; } }
</style>
