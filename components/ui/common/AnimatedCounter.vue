<template>
  <div class="counter">
    <div class="counter-value">{{ displayValue }}</div>
    <div v-if="label" class="counter-label">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'

const props = defineProps<{ to: number; duration?: number; label?: string }>()

const displayValue = ref('0')
const start = ref(0)
const startTime = ref(0)
const durationMs = computed(() => props.duration ?? 1200)

const animate = (timestamp: number) => {
  if (!startTime.value) startTime.value = timestamp
  const elapsed = timestamp - startTime.value
  const progress = Math.min(elapsed / durationMs.value, 1)
  const value = Math.floor(start.value + (props.to - start.value) * easeOutCubic(progress))
  displayValue.value = value.toLocaleString('ru-RU')
  if (progress < 1) requestAnimationFrame(animate)
}

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3) }

onMounted(() => { requestAnimationFrame(animate) })
watch(() => props.to, () => { start.value = parseInt(displayValue.value.replace(/\s/g, ''), 10) || 0; startTime.value = 0; requestAnimationFrame(animate) })
</script>

<style scoped>
.counter { display: grid; gap: 4px; min-width: 120px; }
.counter-value { font-size: 28px; font-weight: 700; color: var(--color-surface); }
.counter-label { color: #E7EFEA; font-size: 14px; }
</style>
