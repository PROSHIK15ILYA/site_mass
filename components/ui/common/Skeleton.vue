<template>
  <div class="skeleton" :style="{ width, height, borderRadius }"></div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ width?: string; height?: string; borderRadius?: string }>(), {
  width: '100%',
  height: '16px',
  borderRadius: '8px'
})
</script>

<style scoped>
.skeleton {
  position: relative;
  overflow: hidden;
  background: linear-gradient(90deg, rgba(0,0,0,0.06), rgba(0,0,0,0.12), rgba(0,0,0,0.06));
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
  border-radius: 8px;
}
@keyframes shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
@media (prefers-reduced-motion: reduce) { .skeleton { animation: none; } }
</style>
