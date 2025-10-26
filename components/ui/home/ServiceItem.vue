<template>
  <div class="item-list_service" itemscope itemtype="http://schema.org/ImageObject" v-reveal v-tilt>
    <img itemprop="contentUrl" class="service-image" :src="image" :alt="title"/>
    <div class="service-description">
      <div class="description-title" itemprop="name">{{ title }}</div>
      <div class="description-text" itemprop="description">{{ description }}</div>
      <div class="description-price">{{ price }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: String,
  title: String,
  description: String,
  price: String
})
</script>

<style scoped>
/* Стили уже в SCSS файлах */
</style>
