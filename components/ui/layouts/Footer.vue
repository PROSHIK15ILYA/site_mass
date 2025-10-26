<template>
  <footer id="footer" itemscope itemtype="http://schema.org/WPFooter">
    <meta itemprop="copyrightYear" content="2023">
    <meta itemprop="copyrightHolder" content="Студия аппаратного и ручного массажа">
    <div class="title page-width">Контакты</div>
    <div class="footer" itemscope itemtype="http://schema.org/LocalBusiness">
      <meta itemprop="name" content="Студия аппаратного и ручного массажа">
      <meta itemprop="image" content="https://relaxation-studio.ru/mainlogo.svg">
      <div class="footer-contacts_left">
        <a class="contacts-number" href="tel:+79306547374">
          <img src="/phone.svg" alt="" width="30" height="100%"/>
          <b itemprop="telephone">+7(930) 654 73 74</b>
        </a>
        <a class="contacts-mail" href="mailto:relaxationstudio@yandex.ru" itemprop="email">
          <img src="/mail.svg" alt="" width="30" height="100%"/>
          relaxationstudio@yandex.ru
        </a>
      </div>
      <div class="footer-contacts_right">
        <div class="contacts-work-time" itemprop="openingHours" datetime="Mo,Tu,We,Th,Fr,Sa,Su 8:00−20:00">
          <img src="/time.svg" alt="" width="30" height="100%"/>
          Ежедневно c 08:00-20:00
        </div>
        <span itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
          <meta itemprop="streetAddress" content="улица Софьи Перовской, 9, корп. А">
          <meta itemprop="postalCode" content="300012">
          <meta itemprop="addressLocality" content="Тула">
        </span>
        <div class="contacts-address">
          <img src="/address.svg" alt="" width="30" height="100%"/>
          г.Тула, улица Софьи Перовской, 9, корп. А
        </div>
      </div>
      <a class="enroll-button ms_booking">Записаться</a>
    </div>

    <!-- Карта с отложенной загрузкой -->
    <client-only>
      <iframe
        ref="mapFrame"
        :src="mapSrc"
        width="100%"
        height="400"
        frameborder="0"
        loading="lazy"
        @load="onMapLoad"
        title="Карта расположения студии массажа"
      ></iframe>
    </client-only>
  </footer>
</template>

<script setup>
const mapFrame = ref<HTMLIFrameElement | null>(null)
const mapLoaded = ref(false)
const mapSrc = ref('') // Начинаем с пустого src
const contacts = ref<any>(null)

const onMapLoad = () => {
  mapLoaded.value = true
  console.log('Yandex Map loaded')
}

// Загружаем карту после полной загрузки страницы
onMounted(() => {
  // Подгрузим контакты
  $fetch('/api/contacts').then((c) => { contacts.value = c })
  // Ждем полной загрузки страницы
  if (document.readyState === 'complete') {
    loadMapWithDelay()
  } else {
    window.addEventListener('load', loadMapWithDelay)
  }

  // Загружаем при скролле к футеру (только на клиенте)
  setupScrollObserver()
})

const loadMapWithDelay = () => {
  // Загружаем карту через 5 секунд после загрузки страницы
  setTimeout(() => {
    if (!mapLoaded.value && !mapSrc.value) {
      mapSrc.value = 'https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=57189140105'
    }
  }, 5000) // 5 секунд задержки
}

const setupScrollObserver = () => {
  // Проверяем что IntersectionObserver доступен (только в браузере)
  if (typeof IntersectionObserver === 'undefined') return

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !mapLoaded.value && !mapSrc.value) {
      // Загружаем карту когда футер появляется в viewport
      setTimeout(() => {
        mapSrc.value = 'https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=57189140105'
      }, 1000)
      observer.disconnect()
    }
  }, {
    rootMargin: '300px', // Начинаем за 300px до футера
    threshold: 0
  })

  if (mapFrame.value) {
    observer.observe(mapFrame.value)
  }
}
</script>

<style scoped>
/* Стили уже в SCSS файлах */
</style>