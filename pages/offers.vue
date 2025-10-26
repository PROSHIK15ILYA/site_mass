<template>
  <section class="page-width offers-page">
    <header>
      <h1>Спецпредложения</h1>
      <p>Пакеты, акции и подарочные сертификаты.</p>
    </header>

    <div class="offers-grid">
      <div v-for="o in offers" :key="o.title" class="card offer">
        <div class="offer-body">
          <strong>{{ o.title }}</strong>
          <p>{{ o.text }}</p>
          <div class="actions"><a href="#" class="btn btn-primary ms_booking" @click.prevent>Записаться</a></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSeo } from '~/composables/useSeo'
useSeo({ title: 'Спецпредложения — Relaxation Studio', description: 'Акции, пакеты и подарочные сертификаты на массаж и SPA.' })
const offers = [
  { title: 'Пакет «Детокс»', text: 'LPG + лимфодренаж · выгода 15%' },
  { title: 'Подарочный сертификат', text: 'На любую сумму и услугу' },
  { title: 'Комбо «Спина+Шея»', text: '60 мин · выгода 10%' }
]
</script>

<style scoped>
.offers-page { padding: 32px 0; }
.offers-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.offer { overflow: hidden; }
.offer-body { padding: 16px; display: grid; gap: 8px; }
@media (max-width: 960px) { .offers-grid { grid-template-columns: 1fr } }
</style>
