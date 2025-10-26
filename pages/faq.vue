<template>
  <section class="page-width faq-page">
    <header>
      <h1>FAQ</h1>
      <p>Ответы на частые вопросы о процедурах и записи.</p>
    </header>

    <div class="faq-list">
      <details v-for="(q, i) in faqs" :key="i" class="card">
        <summary>{{ q.q }}</summary>
        <p>{{ q.a }}</p>
      </details>
    </div>
  </section>
</template>

<script setup>
import { useSeo } from '~/composables/useSeo'
useSeo({ title: 'FAQ — Relaxation Studio', description: 'Ответы на частые вопросы о процедуре массажа, противопоказаниях и записи.' })
const faqs = [
  { q: 'Как подготовиться к массажу?', a: 'Приходите за 10 минут до сеанса, возьмите удобную одежду.' },
  { q: 'Есть ли противопоказания?', a: 'Да, при острых состояниях проконсультируйтесь с врачом. Мы поможем подобрать безопасную процедуру.' },
  { q: 'Как оплатить?', a: 'Наличные, карта, безналичная оплата доступна на месте.' }
]
</script>

<style scoped>
.faq-page { padding: 32px 0; }
.faq-list { display: grid; gap: 12px; }
summary { cursor: pointer; padding: 12px 16px; font-weight: 600; }
summary::marker { color: var(--color-primary); }
details > p { padding: 0 16px 16px; margin: 0; }
</style>
