<template>
  <div class="services-item" :style="style">
    <div class="services-item_button" @click="$emit('toggle', type)">
      <span class="item-button_title">{{ title }}</span>
      <img
          class="item-button_arrow"
          src="/arrow_services.svg"
          alt="Развернуть список"
          :style="{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }"
      />
    </div>
    <div
        class="services-item_list"
        :class="{ 'services-item_list--open': isOpen }"
    >
      <ServiceItem
          v-for="(service, index) in services"
          :key="index"
          :image="service.image"
          :title="service.title"
          :description="service.description"
          :price="service.price"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  type: String,
  services: Array,
  isOpen: Boolean,
  style: String
})

defineEmits(['toggle'])
</script>

<style scoped>
.services-item_list {
  display: none;
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.5s ease;
}

.services-item_list--open {
  display: flex;
  opacity: 1;
  transform: scale(1);
}
</style>