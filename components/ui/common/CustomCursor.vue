<template>
  <div class="cursor" :style="style" aria-hidden="true"></div>
</template>

<script setup lang="ts">
const pos = reactive({ x: 0, y: 0 })
const style = computed(() => ({ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }))

let rafId: number | null = null
let targetX = 0,
  targetY = 0

onMounted(() => {
  const move = (e: MouseEvent) => {
    targetX = e.clientX
    targetY = e.clientY
    if (rafId == null) rafId = requestAnimationFrame(tick)
  }
  window.addEventListener('mousemove', move, { passive: true })
})

function tick() {
  pos.x += (targetX - pos.x) * 0.2
  pos.y += (targetY - pos.y) * 0.2
  rafId = requestAnimationFrame(tick)
}
</script>

<style scoped>
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: color-mix(in oklab, var(--color-primary) 60%, transparent);
  box-shadow: 0 0 0 2px rgba(255,255,255,0.5) inset, 0 6px 18px rgba(0,0,0,0.16);
  pointer-events: none;
  z-index: 1300;
  mix-blend-mode: multiply;
}
@media (pointer: coarse) { .cursor { display: none; } }
</style>
