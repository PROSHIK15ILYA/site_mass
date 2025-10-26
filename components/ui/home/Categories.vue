<template>
  <section v-reveal>
    <div id="categories" class="categories-title page-width">
      Категории услуг
    </div>
    <div class="categories page-width">
      <NuxtLink
          v-for="category in categories"
          :key="category.id"
          class="categories-item"
          :to="category.href"
          :data-attr="category.attr"
      >
        <img class="categories-item_background" :src="category.image" :alt="category.title" />
        <span class="categories-item_title">{{ category.title }}</span>
        <div
            class="categories-item_list-services"
            :style="{
            display: activeCategory === category.attr ? 'flex' : 'none',
            opacity: activeCategory === category.attr ? 1 : 0,
            transform: activeCategory === category.attr ? 'scale(1)' : 'scale(0.9)'
          }"
        >
          <span v-for="service in category.services" :key="service" class="list-services-item">{{ service }}</span>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
const activeCategory = ref(null)
const categories = ref([])

onMounted(async () => {
  try {
    const rows = await $fetch('/api/categories')
    categories.value = rows.map(r => ({ ...r, href: `/services?category=${r.slug}` }))
  } catch {
    categories.value = []
  }
})

const showElements = (attr) => { activeCategory.value = attr }
</script>