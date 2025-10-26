<template>
  <article class="page-width blog-detail">
    <nav class="breadcrumbs" aria-label="Хлебные крошки">
      <NuxtLink to="/blog">Блог</NuxtLink>
      <span aria-hidden="true">/</span>
      <span>{{ post.title }}</span>
    </nav>

    <header class="blog-header">
      <h1>{{ post.title }}</h1>
      <span class="muted">{{ post.date }}</span>
    </header>

    <img :src="post.image" :alt="post.title" class="cover"/>

    <div class="content">
      <p>{{ post.body }}</p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useSeo } from '~/composables/useSeo'
const route = useRoute()
const post = ref<any>(null)
post.value = await $fetch(`/api/blogs/${route.params.slug}`)

useSeo({
  title: () => `${post.value.title} — Блог Relaxation Studio`,
  description: () => post.value.body?.slice(0, 150) || 'Статья блога.',
  image: () => post.value.image,
  url: () => `https://relaxation-studio.ru/blog/${route.params.slug}`
})
</script>

<style scoped>
.blog-detail { padding: 24px 0; }
.cover { width: 100%; height: 360px; object-fit: cover; border-radius: 12px; }
.content { margin-top: 16px; }
.muted { color: var(--color-muted); font-size: 14px; }
.breadcrumbs { display: flex; gap: 8px; color: var(--color-muted); font-size: 14px; margin-bottom: 12px; }
</style>
