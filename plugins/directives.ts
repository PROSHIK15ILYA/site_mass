import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  // Директива reveal - упрощенная версия
  nuxtApp.vueApp.directive('reveal', {
    // Обязательно для SSR
    getSSRProps(binding, vnode) {
      return {
        class: binding.value ? `reveal reveal-${binding.value}` : 'reveal'
      }
    },
    mounted(el, binding) {
      // Только на клиенте
      if (typeof window === 'undefined') return
      
      const cls = typeof binding.value === 'string' ? binding.value : 'up'
      el.classList.add('reveal', `reveal-${cls}`)
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-revealed')
            observer.unobserve(el)
          }
        })
      }, { 
        rootMargin: '0px 0px -10% 0px', 
        threshold: 0.05 
      })
      
      observer.observe(el)
    }
  })

  // Директива tilt - упрощенная версия
  nuxtApp.vueApp.directive('tilt', {
    // Обязательно для SSR
    getSSRProps(binding, vnode) {
      return {}
    },
    mounted(el) {
      // Только на клиенте
      if (typeof window === 'undefined') return
      
      const strength = 10
      
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -strength
        const ry = ((e.clientX - rect.left) / rect.width - 0.5) * strength
        el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
      }
      
      const onLeave = () => { 
        el.style.transform = 'rotateX(0) rotateY(0)' 
      }
      
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      
      // Сохраняем для cleanup
      el._tiltHandlers = { onMove, onLeave }
    },
    unmounted(el: any) {
      if (typeof window === 'undefined') return
      
      if (el._tiltHandlers) {
        const { onMove, onLeave } = el._tiltHandlers
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
        delete el._tiltHandlers
      }
    }
  })
})