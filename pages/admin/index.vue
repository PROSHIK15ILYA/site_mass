<template>
  <section class="page-width admin">
    <header>
      <h1>Админ-панель</h1>
      <p>Настройки сайта: SEO, меню, блоги, услуги, категории, FAQ, страницы.</p>
    </header>

    <div class="grid">
      <form class="card" @submit.prevent="saveSeo">
        <h2>SEO сайта</h2>
        <label>Title<input v-model="seo.title" type="text" /></label>
        <label>Description<textarea v-model="seo.description" rows="3"/></label>
        <label>Image URL<input v-model="seo.image" type="text" /></label>
        <label>Canonical URL<input v-model="seo.url" type="text" /></label>
        <button class="btn btn-primary" type="submit">Сохранить</button>
      </form>

      <div class="card">
        <h2>Контакты</h2>
        <label>Телефон<input v-model="contacts.phone" type="text" /></label>
        <label>Email<input v-model="contacts.email" type="email" /></label>
        <label>Адрес<input v-model="contacts.address" type="text" /></label>
        <label>Карта (iframe src)<input v-model="contacts.map" type="text" /></label>
        <label>Часы работы<input v-model="contacts.hours" type="text" /></label>
        <button class="btn btn-primary" @click="saveContacts">Сохранить контакты</button>
      </div>

      <div class="card">
        <h2>Блоги</h2>
        <ul>
          <li v-for="b in blogs" :key="b.slug"><NuxtLink :to="`/blog/${b.slug}`">{{ b.title }}</NuxtLink></li>
        </ul>
      </div>

      <div class="card">
        <h2>Услуги</h2>
        <ul>
          <li v-for="s in services" :key="s.slug"><NuxtLink :to="`/services/${s.slug}`">{{ s.title }}</NuxtLink></li>
        </ul>
      </div>

      <div class="card">
        <h2>Категории</h2>
        <ul>
          <li v-for="c in categories" :key="c.slug"><NuxtLink :to="`/services`">{{ c.title }}</NuxtLink></li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Blog {
  slug: string
  title: string
}

interface Service {
  slug: string
  title: string
}

interface Category {
  slug: string
  title: string
}
const seo = reactive({ title: '', description: '', image: '', url: '' })
const contacts = reactive({ phone: '', email: '', address: '', map: '', hours: '' })
const blogs = ref<Blog[]>([])
const services = ref<Service[]>([])
const categories = ref<Category[]>([])

onMounted(async () => {
  const s = await $fetch('/api/seo')
  Object.assign(seo, s.site)
  Object.assign(contacts, await $fetch('/api/contacts'))
  blogs.value = await $fetch('/api/blogs')
  services.value = await $fetch('/api/services')
  categories.value = await $fetch('/api/categories')
})

const saveSeo = async () => { await $fetch('/api/seo', { method: 'POST', body: { site: seo } }); alert('Сохранено (mock)') }
const saveContacts = async () => { /* TODO: wire to DB */ alert('Сохранено (mock)') }
</script>

<style scoped>
.admin { padding: 24px 0; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; align-items: start; }
form, .card { display: grid; gap: 10px; padding: 16px; }
label { display: grid; gap: 6px; }
input, textarea { padding: 10px 12px; border-radius: 8px; border: 1px solid rgba(0,0,0,0.12); background: var(--color-surface); color: var(--color-text); }
</style>
