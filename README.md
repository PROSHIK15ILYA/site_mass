# Relaxation Studio - Премиальная студия массажа и SPA

Современное веб-приложение для студии массажа и SPA в Туле, построенное на Nuxt.js 4 с использованием TypeScript, эмоционального дизайна и передовых практик веб-разработки.

## 🚀 Особенности

### ✨ Эмоциональный дизайн
- **Гармоничная типографика**: Inter (основной), Playfair Display (заголовки), JetBrains Mono (акценты)
- **Психология цвета**: Успокаивающая палитра с голубыми и земляными тонами
- **Анимации**: Scroll-triggered анимации и микро-взаимодействия
- **Прогрессивное раскрытие контента**: Эмоциональное повествование через весь customer journey

### 📱 Адаптивность
- **Mobile-first подход**: CSS Grid и Flexbox
- **Fluid typography**: Использование clamp() для адаптивных размеров шрифтов
- **Container queries**: Современные CSS-запросы для компонентов
- **Прогрессивное улучшение**: Работает на всех устройствах

### 🔍 SEO оптимизация
- **Semantic HTML5**: Правильная структура документа
- **JSON-LD structured data**: Schema.org разметка
- **Dynamic meta tags**: Автоматические мета-теги для каждой страницы
- **Open Graph**: Оптимизация для социальных сетей
- **XML sitemap**: Автоматическая генерация карты сайта

### 🐳 Docker & DevOps
- **Multi-stage builds**: Оптимизированные Docker-образы
- **Nginx reverse proxy**: Производственная конфигурация
- **Health checks**: Мониторинг состояния приложения
- **SSL готовность**: Автоматическая настройка HTTPS

### 🔄 CI/CD Pipeline
- **GitHub Actions**: Автоматизированное тестирование и деплой
- **Lighthouse CI**: Проверка производительности и доступности
- **Staged deployments**: Поэтапное развертывание
- **Security scanning**: Проверка уязвимостей

## 🛠 Технологический стек

- **Frontend**: Nuxt.js 4, Vue 3, TypeScript
- **Styling**: SCSS, CSS Grid, Flexbox, CSS Custom Properties
- **Database**: PostgreSQL
- **Caching**: Redis (опционально)
- **Containerization**: Docker, Docker Compose
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus, Grafana (опционально)

## 📦 Установка и запуск

### Предварительные требования

- Node.js 18+
- Docker и Docker Compose
- PostgreSQL (для локальной разработки)

### Локальная разработка

1. **Клонирование репозитория**
   ```bash
   git clone https://github.com/your-org/relaxation-studio.git
   cd relaxation-studio
   ```

2. **Установка зависимостей**
   ```bash
   npm install
   ```

3. **Настройка переменных окружения**
   ```bash
   cp .env.example .env
   # Отредактируйте .env файл с вашими настройками
   ```

4. **Запуск в режиме разработки**
   ```bash
   npm run dev
   ```

### Docker разработка

```bash
# Запуск всех сервисов для разработки
npm run docker:dev

# Просмотр логов
npm run docker:logs

# Остановка сервисов
npm run docker:down
```

### Производственное развертывание

1. **Подготовка сервера**
   ```bash
   # Установка Docker и Docker Compose
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   ```

2. **Настройка SSL сертификатов**
   ```bash
   # Поместите SSL сертификаты в docker/ssl/
   mkdir -p docker/ssl
   cp your-cert.pem docker/ssl/cert.pem
   cp your-key.pem docker/ssl/key.pem
   ```

3. **Запуск в продакшене**
   ```bash
   npm run docker:prod
   ```

## 🔧 Доступные команды

### Разработка
- `npm run dev` - Запуск в режиме разработки
- `npm run build` - Сборка для продакшена
- `npm run preview` - Предварительный просмотр продакшен сборки

### Тестирование
- `npm run test` - Запуск тестов
- `npm run test:ui` - Запуск тестов с UI
- `npm run test:coverage` - Тесты с покрытием кода

### Качество кода
- `npm run lint` - Проверка кода ESLint
- `npm run lint:fix` - Автоисправление ESLint
- `npm run type-check` - Проверка типов TypeScript

### Производительность
- `npm run lighthouse` - Проверка Lighthouse CI
- `npm run analyze` - Анализ bundle размера

### Docker
- `npm run docker:build` - Сборка Docker образа
- `npm run docker:dev` - Запуск dev окружения
- `npm run docker:prod` - Запуск prod окружения
- `npm run docker:down` - Остановка контейнеров
- `npm run docker:logs` - Просмотр логов

### Утилиты
- `npm run clean` - Очистка кэша и временных файлов
- `npm run health` - Проверка здоровья приложения

## 📁 Структура проекта

```
relaxation-studio/
├── .github/workflows/     # GitHub Actions CI/CD
├── assets/scss/           # SCSS стили и миксины
├── components/            # Vue компоненты
├── composables/           # Vue композаблы
├── docker/                # Docker конфигурации
├── layouts/               # Nuxt layouts
├── pages/                 # Страницы приложения
├── plugins/               # Nuxt плагины
├── public/                # Статические файлы
├── server/                # Server-side код
├── Dockerfile             # Production Dockerfile
├── Dockerfile.dev         # Development Dockerfile
├── docker-compose.yml     # Production compose
├── docker-compose.dev.yml # Development compose
├── lighthouse.config.js   # Lighthouse конфигурация
├── nuxt.config.ts        # Nuxt конфигурация
└── package.json           # Зависимости и скрипты
```

## 🎨 Дизайн-система

### Цветовая палитра
- **Primary**: #4A90A4 (успокаивающий сине-зеленый)
- **Secondary**: #8B7355 (теплый земляной коричневый)
- **Accent**: #7A9B7A (шалфейно-зеленый акцент)
- **Background**: #F8F6F0 (теплый кремовый фон)

### Типографика
- **Primary**: Inter (основной текст)
- **Secondary**: Playfair Display (заголовки)
- **Mono**: JetBrains Mono (код и акценты)

### Spacing Scale
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)

## 🔒 Безопасность

- **Security headers**: Настроены в nginx
- **Rate limiting**: Защита от DDoS
- **Dependency scanning**: Автоматическая проверка уязвимостей
- **SSL/TLS**: Полная поддержка HTTPS
- **Input validation**: Валидация всех входных данных

## 📊 Мониторинг

### Health Checks
- **Application**: `/api/health`
- **Nginx**: `/health`
- **Database**: Автоматические проверки подключения

### Метрики
- **Performance**: Lighthouse CI
- **Accessibility**: WCAG 2.1 AA compliance
- **SEO**: Structured data validation
- **Security**: Dependency vulnerability scanning

## 🚀 Деплой

### Автоматический деплой
1. **Push в main** → Автоматический деплой в продакшен
2. **Push в develop** → Автоматический деплой в staging
3. **Pull Request** → Запуск тестов и проверок

### Ручной деплой
```bash
# Staging
git checkout develop
git push origin develop

# Production
git checkout main
git push origin main
```

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте feature branch (`git checkout -b feature/amazing-feature`)
3. Commit изменения (`git commit -m 'Add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📝 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 📞 Поддержка

- **Email**: info@relaxation-studio.ru
- **Телефон**: +7 (4872) 123-456
- **Website**: https://relaxation-studio.ru

## 🙏 Благодарности

- Команде Nuxt.js за отличный фреймворк
- Vue.js сообществу за вдохновение
- Всем контрибьюторам проекта

---

**Relaxation Studio** - где технологии встречаются с релаксацией 🧘‍♀️✨