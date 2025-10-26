<template>
  <section class="page-width contact-page">
    <header>
      <h1>Контакты</h1>
      <p>Свяжитесь с нами удобным способом или запишитесь онлайн.</p>
    </header>

    <div class="contact-grid">
      <div class="card" style="padding:16px;">
        <h2>Как с нами связаться</h2>
        <p><a href="tel:+79306547374">+7 (930) 654-73-74</a></p>
        <p><a href="mailto:relaxationstudio@yandex.ru">relaxationstudio@yandex.ru</a></p>
        <p>Ежедневно 08:00 – 20:00</p>
      </div>
      <div class="card" style="padding:0; overflow: hidden;">
        <iframe src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=57189140105" width="100%" height="360" frameborder="0" loading="lazy" title="Карта"></iframe>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSeo } from '~/composables/useSeo'
useSeo({ title: 'Контакты — Relaxation Studio', description: 'Позвоните, напишите или запишитесь онлайн. Ежедневно 08:00–20:00.' })
</script>

<style scoped>
.contact-page { padding: 32px 0; }
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr } }
</style>
