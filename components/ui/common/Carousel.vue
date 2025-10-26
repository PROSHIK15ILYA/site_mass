<template>
  <div class="carousel" :aria-label="ariaLabel">
    <div class="viewport" ref="viewport">
      <div class="track" :style="trackStyle">
        <slot />
      </div>
    </div>
    <div class="controls">
      <button class="btn btn-prev" @click="prev" aria-label="Предыдущий">
        <Icon name="chevron-left" />
      </button>
      <button class="btn btn-next" @click="next" aria-label="Следующий">
        <Icon name="chevron-right" />
      </button>
    </div>
    <div class="dots" v-if="pages > 1">
      <button 
        v-for="i in pages" 
        :key="i" 
        class="dot" 
        :class="{ active: (i-1)===activeIndex }" 
        @click="go(i-1)"
        :aria-label="`Перейти к слайду ${i}`"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMicroInteractions } from '~/composables/useAnimations'

const props = withDefaults(defineProps<{ 
  autoplay?: boolean
  interval?: number
  ariaLabel?: string
  defer?: boolean
}>(), { 
  autoplay: false, 
  interval: 5000, 
  ariaLabel: 'Карусель', 
  defer: false 
})

const { addHoverEffect, addClickRipple } = useMicroInteractions()

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
let resizeObserver: ResizeObserver | null = null

function handleResize() {
  if (typeof window === 'undefined') return
  
  const w = window.innerWidth
  perView.value = w >= 1200 ? 3 : w >= 768 ? 2 : 1
  
  // Adjust active index if it's out of bounds
  if (activeIndex.value > count.value - perView.value) {
    activeIndex.value = Math.max(0, count.value - perView.value)
  }
}

function init() {
  if (!viewport.value) return
  
  count.value = viewport.value.querySelectorAll('.track > *').length || 0
  
  if (props.autoplay && count.value > perView.value) {
    timer = setInterval(next, props.interval)
  }
  
  handleResize()
}

function next() {
  const maxIndex = Math.max(0, count.value - perView.value)
  activeIndex.value = activeIndex.value >= maxIndex ? 0 : activeIndex.value + 1
}

function prev() {
  const maxIndex = Math.max(0, count.value - perView.value)
  activeIndex.value = activeIndex.value <= 0 ? maxIndex : activeIndex.value - 1
}

function go(i: number) { 
  activeIndex.value = Math.max(0, Math.min(i, count.value - perView.value))
}

// Initialize micro-interactions
onMounted(() => {
  // Initialize carousel
  if (props.defer && 'requestIdleCallback' in window) {
    // @ts-ignore
    requestIdleCallback(init)
  } else {
    setTimeout(init, 100) // Small delay to ensure DOM is ready
  }
  
  // Add resize listener
  window.addEventListener('resize', handleResize)
  
  // Add micro-interactions to buttons
  nextTick(() => {
    const buttons = document.querySelectorAll('.carousel .btn, .carousel .dot')
    buttons.forEach(button => {
      addHoverEffect(button as HTMLElement)
      addClickRipple(button as HTMLElement)
    })
  })
})

onBeforeUnmount(() => { 
  if (timer) clearInterval(timer)
  window.removeEventListener('resize', handleResize)
  if (resizeObserver) resizeObserver.disconnect()
})

// Watch for changes in count to restart autoplay if needed
watch(count, (newCount) => {
  if (props.autoplay && newCount > perView.value) {
    if (timer) clearInterval(timer)
    timer = setInterval(next, props.interval)
  }
})
</script>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
}

.viewport {
  overflow: hidden;
  border-radius: 12px;
}

.track {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: calc(100% / var(--per-view, 1));
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  gap: 16px;
  width: 100%;
}

.controls {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
  z-index: 10;
}

@media (max-width: 768px) {
  .controls {
    display: none;
  }
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  color: #4A90A4;
  cursor: pointer;
  pointer-events: all;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
}

.btn:hover {
  background: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  transform: scale(1.1);
}

.btn:active {
  transform: scale(0.95);
}

.btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(74, 144, 164, 0.7);
}

.dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
}

@media (max-width: 768px) {
  .dots {
    margin-top: 16px;
  }
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #F5F5F5;
  border: none;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.dot:hover {
  background: #8B8B8B;
  transform: scale(1.2);
}

.dot.active {
  background: #4A90A4;
  transform: scale(1.3);
}

.dot:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(74, 144, 164, 0.7);
}

/* Touch gestures support */
@supports (touch-action: pan-x) {
  .viewport {
    touch-action: pan-x;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .track {
    transition: none;
  }
  
  .btn,
  .dot {
    transition: none;
  }
  
  .btn:hover,
  .dot:hover {
    transform: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .btn {
    border: 2px solid #4A90A4;
  }
  
  .dot {
    border: 1px solid #2C3E50;
  }
}
</style>
