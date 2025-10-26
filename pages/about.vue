<template>
  <section class="page-width about">
    <header class="about-header">
      <h1>О Relaxation Studio</h1>
      <p>Наша миссия — бережно восстанавливать тело и дарить ощущение гармонии.</p>
    </header>

    <div class="about-grid">
      <article class="card about-card">
        <h2>Наша история</h2>
        <p>Мы открылись, чтобы объединить профессиональное мастерство, научные подходы и атмосферу премиального SPA.</p>
      </article>
      <article class="card about-card">
        <h2>Команда</h2>
        <p>Опытные массажисты с медицинским образованием и действующими сертификатами.</p>
      </article>
      <article class="card about-card">
        <h2>Сертификаты</h2>
        <ul>
          <li>Diploma in Therapeutic Massage</li>
          <li>LPG Endermologie Certification</li>
          <li>Manual Therapy Advanced</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script setup>
import { useSeo } from '~/composables/useSeo'
useSeo({
  title: 'О Relaxation Studio — команда и ценности',
  description: 'Наша миссия, история и команда профессиональных массажистов с сертификатами.'
})
</script>

<style scoped>
.about { padding: 32px 0; }
.about-header h1 { font-size: clamp(26px, 3vw, 42px); margin: 0 0 10px; }
.about-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 18px; }
.about-card { padding: 18px; }
@media (max-width: 960px) { .about-grid { grid-template-columns: 1fr; } }
</style>
