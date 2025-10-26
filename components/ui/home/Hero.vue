<template>
  <section class="hero" v-reveal>
    <div class="hero-media" aria-hidden="true">
      <img class="hero-bg" src="/main_photo-optimized.webp" alt="" fetchpriority="high" />
      <div class="hero-overlay"></div>
    </div>
    <div class="hero-inner page-width">
      <div class="hero-left">
        <h1 class="hero-title">
          Премиальный массаж и SPA в Relaxation Studio
        </h1>
        <p class="hero-subtitle">
          Забота о теле и душе в атмосфере спокойствия. Профессиональные терапевты, проверенные методики и измеримый результат.
        </p>
        <div class="hero-actions" v-reveal="'left'">
          <a class="btn btn-primary ms_booking" href="#" @click.prevent="openBooking">Записаться</a>
          <NuxtLink class="btn btn-ghost" to="/services">Смотреть услуги</NuxtLink>
        </div>
        <div class="hero-trust" v-reveal="'up'">
          <AnimatedCounter :to="5000" :duration="1600" label="Довольных клиентов" />
          <AnimatedCounter :to="8" :duration="1200" label="Лет опыта" />
          <AnimatedCounter :to="15" :duration="1200" label="Сертификатов" />
        </div>
      </div>
      <div class="hero-right" v-reveal="'right'">
        <Carousel :autoplay="true" :interval="6000" :ariaLabel="'Герой'" defer>
          <template #default>
            <div class="hero-card card" aria-label="Видео">
              <video class="hero-video" preload="metadata" muted playsinline loop autoplay>
                <source src="/massage-optimized.mp4" type="video/mp4" />
              </video>
            </div>
            <div class="hero-card card" aria-label="Расслабляющий массаж">
              <img src="/spina.webp" alt="Расслабляющий массаж" class="hero-card_img"/>
              <div class="hero-card_info"><strong>Расслабляющий массаж</strong><span>60 мин · от 2 900 ₽</span></div>
            </div>
            <div class="hero-card card" aria-label="LPG массаж">
              <img src="/lpg.webp" alt="LPG массаж" class="hero-card_img"/>
              <div class="hero-card_info"><strong>LPG массаж</strong><span>40 мин · от 2 500 ₽</span></div>
            </div>
          </template>
        </Carousel>
      </div>
    </div>
  </section>
</template>

<script setup>
import AnimatedCounter from '~/components/ui/common/AnimatedCounter.vue'
import Carousel from '~/components/ui/common/Carousel.vue'

const openBooking = () => {
  try {
    // @ts-ignore
    if (window && window.yc && typeof window.yc.open === 'function') {
      // @ts-ignore
      window.yc.open()
    }
  } catch {}
}
</script>

<style scoped>
.hero { position: relative; padding: 80px 0; background: var(--color-bg); }
.hero-media { position: absolute; inset: 0; overflow: hidden; }
.hero-bg { width: 100%; height: 100%; object-fit: cover; transform: scale(1.05); filter: saturate(0.9) contrast(0.95); }
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(120deg, rgba(65,74,66,0.65), rgba(105,141,105,0.4)); mix-blend-mode: multiply; }
.hero-inner { position: relative; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 32px; align-items: center; }
.hero-title { font-family: var(--font-heading, inherit); font-size: clamp(28px, 3.2vw, 48px); line-height: 1.1; color: var(--color-surface); margin: 0 0 12px; }
.hero-subtitle { color: #E7EFEA; max-width: 60ch; margin: 0 0 20px; }
.hero-actions { display: flex; gap: 12px; margin-bottom: 20px; }
.hero-trust { display: flex; gap: 20px; flex-wrap: wrap; }
.hero-right { display: grid; place-items: center; }
.hero-card { width: 100%; max-width: 520px; overflow: hidden; }
.hero-card_img, .hero-video { width: 100%; height: 320px; object-fit: cover; }
.hero-card_info { padding: 14px; display: flex; justify-content: space-between; }

@media (max-width: 960px) {
  .hero-inner { grid-template-columns: 1fr; }
  .hero { padding: 64px 0; }
}
</style>
