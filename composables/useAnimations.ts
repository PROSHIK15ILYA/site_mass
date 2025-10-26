// Scroll-triggered animations composable
export const useScrollReveal = () => {
  const elements = ref<HTMLElement[]>([])
  const observer = ref<IntersectionObserver | null>(null)

  const initObserver = () => {
    if (typeof window === 'undefined') return

    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.value?.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    elements.value.forEach((el) => {
      if (el) observer.value?.observe(el)
    })
  }

  const addElement = (el: HTMLElement | null) => {
    if (el) {
      elements.value.push(el)
      if (observer.value) {
        observer.value.observe(el)
      }
    }
  }

  const removeElement = (el: HTMLElement | null) => {
    if (el && observer.value) {
      observer.value.unobserve(el)
      elements.value = elements.value.filter(e => e !== el)
    }
  }

  onMounted(() => {
    initObserver()
  })

  onUnmounted(() => {
    if (observer.value) {
      observer.value.disconnect()
    }
  })

  return {
    addElement,
    removeElement,
    elements: readonly(elements)
  }
}

// Smooth scroll composable
export const useSmoothScroll = () => {
  const scrollTo = (target: string | HTMLElement, offset = 0) => {
    if (typeof window === 'undefined') return

    const element = typeof target === 'string' 
      ? document.querySelector(target) as HTMLElement
      : target

    if (element) {
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  const scrollToTop = () => {
    if (typeof window === 'undefined') return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return {
    scrollTo,
    scrollToTop
  }
}

// Parallax effect composable
export const useParallax = () => {
  const elements = ref<HTMLElement[]>([])
  const observer = ref<IntersectionObserver | null>(null)

  const initParallax = () => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      elements.value.forEach((el) => {
        if (!el) return

        const rect = el.getBoundingClientRect()
        const speed = parseFloat(el.dataset.parallaxSpeed || '0.5')
        const yPos = -(rect.top * speed)
        
        el.style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })
  }

  const addParallaxElement = (el: HTMLElement | null, speed = 0.5) => {
    if (el) {
      el.dataset.parallaxSpeed = speed.toString()
      elements.value.push(el)
    }
  }

  onMounted(() => {
    initParallax()
  })

  return {
    addParallaxElement,
    elements: readonly(elements)
  }
}

// Micro-interactions composable
export const useMicroInteractions = () => {
  const addHoverEffect = (el: HTMLElement | null) => {
    if (!el) return

    const handleMouseEnter = () => {
      el.style.transform = 'translateY(-2px) scale(1.02)'
      el.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
    }

    const handleMouseLeave = () => {
      el.style.transform = 'translateY(0) scale(1)'
    }

    el.addEventListener('mouseenter', handleMouseEnter)
    el.addEventListener('mouseleave', handleMouseLeave)

    onUnmounted(() => {
      el.removeEventListener('mouseenter', handleMouseEnter)
      el.removeEventListener('mouseleave', handleMouseLeave)
    })
  }

  const addClickRipple = (el: HTMLElement | null) => {
    if (!el) return

    const handleClick = (e: MouseEvent) => {
      const ripple = document.createElement('span')
      const rect = el.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1000;
      `

      el.style.position = 'relative'
      el.style.overflow = 'hidden'
      el.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    }

    el.addEventListener('click', handleClick)

    onUnmounted(() => {
      el.removeEventListener('click', handleClick)
    })
  }

  return {
    addHoverEffect,
    addClickRipple
  }
}
