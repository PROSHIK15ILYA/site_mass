<template>
  <div class="carousel" :aria-label="ariaLabel">
    <div class="viewport" ref="viewport">
      <div class="track" :style="trackStyle">
        <slot />
      </div>
    </div>
    <div class="controls">
      <button class="btn" @click="prev" aria-label="Предыдущий">‹</button>
      <button class="btn" @click="next" aria-label="Следующий">›</button>
    </div>
    <div class="dots">
      <button v-for="i in pages" :key="i" class="dot" :class="{ active: (i-1)===activeIndex }" @click="go(i-1)"></button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ autoplay?: boolean; interval?: number; ariaLabel?: string; defer?: boolean }>(), { autoplay: false, interval: 5000, ariaLabel: 'Карусель', defer: false })

const viewport = ref<HTMLElement | null>(null)
const activeIndex = ref(0)
const count = ref(0)
const perView = ref(1)
const pages = computed(() => Math.max(1, count.value - perView.value + 1))
const trackStyle = computed(() => ({
  transform: `translateX(-${activeIndex.value * (100 / perView.value)}%)`,
  '--per-view': String(perView.value)
} as any))
let timer: any

function handleResize() {
  const w = window.innerWidth
  perView.value = w >= 1200 ? 3 : w >= 450 ? 2 : 1
  if (activeIndex.value > count.value - perView.value) {
    activeIndex.value = Math.max(0, count.value - perView.value)
  }
}

onMounted(() => {
  const init = () => {
    count.value = viewport.value?.querySelectorAll('.track > *').length || 0
    if (props.autoplay) timer = setInterval(next, props.interval)
  }
  if (props.defer && 'requestIdleCallback' in window) {
    ;(window as any).requestIdleCallback(init)
  } else {
    setTimeout(init, 0)
  }
  handleResize()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => { if (timer) clearInterval(timer); window.removeEventListener('resize', handleResize) })

function next() {
  const maxIndex = Math.max(0, count.value - perView.value)
  activeIndex.value = activeIndex.value >= maxIndex ? 0 : activeIndex.value + 1
}
function prev() {
  const maxIndex = Math.max(0, count.value - perView.value)
  activeIndex.value = activeIndex.value <= 0 ? maxIndex : activeIndex.value - 1
}
function go(i: number) { activeIndex.value = i }
</script>

<style scoped>
.carousel { position: relative; }
.viewport { overflow: hidden; }
.track { display: grid; grid-auto-flow: column; grid-auto-columns: calc(100% / var(--per-view, 1)); transition: transform var(--transition-normal); gap: 12px; }
.controls { position: absolute; inset: 0; display: flex; justify-content: space-between; align-items: center; pointer-events: none; }
.controls .btn { pointer-events: all; }
.dots { display: flex; justify-content: center; gap: 6px; margin-top: 8px; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(0,0,0,0.2); border: 0; }
.dot.active { background: var(--color-primary); }
</style>
