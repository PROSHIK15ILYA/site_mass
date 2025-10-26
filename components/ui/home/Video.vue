<template>
  <section class="main-screen page-width">
    <div class="main-screen_description">
      <span class="description-tag">Отдайте свое тело <br> заботе профессионалов</span>
      <div class="description-about">
        <span class="description-about_title">У нас</span>
        <ul class="description-about_text">
          <li><a style="text-decoration: none;color: #698d69;" href="#gallery">Расслабляющая обстановка</a></li>
          <li><a style="text-decoration: none;color: #698d69;" href="#gallery">Профессиональные массажисты</a></li>
          <li><a style="text-decoration: none;color: #698d69;" href="#massage_services">Уникальные техники массажа в комфортном салоне</a></li>
        </ul>
      </div>
    </div>
    <div class="main-screen_intro">
      <span class="description-tag__hidden">Отдайте свое тело <br> заботе профессионалов</span>

      <!-- Заменяем видео на постер с ленивой загрузкой видео -->
      <div class="video-poster-container">
        <img
            src="/video-poster-optimized.webp"
            alt="Студия массажа"
            class="intro-poster"
            loading="eager"
            width="800"
            height="450"
        />
        <video
            ref="videoPlayer"
            class="intro-video"
            preload="none"
            muted
            playsinline
            loop
            autoplay
            style="display: none;"
        >
          <source :src="videoSrc" type="video/mp4">
        </video>
        <button class="play-video-button" @click="playVideo">
          ▶
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const videoPlayer = ref(null)
const videoSrc = '/massage-optimized.mp4'
const isVideoPlaying = ref(false)

const playVideo = async () => {
  if (!videoPlayer.value) return

  const poster = document.querySelector('.intro-poster')
  const button = document.querySelector('.play-video-button')

  // Показываем видео, скрываем постер
  videoPlayer.value.style.display = 'block'
  poster.style.display = 'none'
  button.style.display = 'none'

  // Загружаем и воспроизводим видео
  await videoPlayer.value.load()
  videoPlayer.value.play().catch(console.error)
  isVideoPlaying.value = true
}
</script>

<style scoped>
.video-poster-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.intro-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
}

.play-video-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.play-video-button:hover {
  background: white;
  transform: translate(-50%, -50%) scale(1.1);
}
</style>