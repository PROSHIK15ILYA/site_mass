<template>
  <section class="trust page-width" aria-labelledby="trust-title" v-reveal>
    <h2 id="trust-title" class="trust-title">Почему нас выбирают</h2>
    <ul class="trust-list">
      <li class="trust-item card" v-tilt>
        <strong>Сертифицированные специалисты</strong>
        <p>Команда профессионалов с медицинским образованием и дипломами международного образца.</p>
      </li>
      <li class="trust-item card" v-tilt>
        <strong>Премиальная атмосфера</strong>
        <p>Тихие кабинеты, ароматы, тёплый свет и тактильные материалы для максимального комфорта.</p>
      </li>
      <li class="trust-item card" v-tilt>
        <strong>Современные методики</strong>
        <p>LPG, миостимуляция и авторские техники для заметного результата.</p>
      </li>
    </ul>
  </section>
</template>

<script setup>
</script>

<style scoped>
.trust { padding: 48px 0; }
.trust-title { font-size: clamp(22px, 2.4vw, 36px); margin: 0 0 20px; }
.trust-list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; list-style: none; padding: 0; margin: 0; }
.trust-item { padding: 18px; }

@media (max-width: 960px) { .trust-list { grid-template-columns: 1fr; } }
</style>
