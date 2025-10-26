<template>
  <section class="page-width blog-page">
    <header>
      <h1>Блог</h1>
      <p>Полезные материалы о массаже, уходе за собой и здоровье.</p>
    </header>

    <div class="posts">
      <NuxtLink v-for="p in posts" :key="p.slug" class="card post" :to="`/blog/${p.slug}`">
        <img :src="p.image" :alt="p.title"/>
        <div class="post-body">
          <strong>{{ p.title }}</strong>
          <span class="muted">{{ p.date }}</span>
          <p>{{ p.excerpt }}</p>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
import { useSeo } from '~/composables/useSeo'
useSeo({ title: 'Блог — Relaxation Studio', description: 'Новости студии, преимущества массажа и советы по уходу.' })
const posts = ref([])
onMounted(async () => {
  try { posts.value = await $fetch('/api/blogs') } catch { posts.value = [] }
})
</script>

<style scoped>
.blog-page { padding: 32px 0; }
.posts { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.post img { width: 100%; height: 220px; object-fit: cover; }
.post-body { padding: 12px; display: grid; gap: 6px; }
.muted { color: var(--color-muted); font-size: 14px; }
@media (max-width: 900px) { .posts { grid-template-columns: 1fr } }
</style>
