## План: robots.txt и sitemap.xml

### Текущее состояние
- В БД 4 курса: `excel`, `web-dev`, `telegram-smm`, `yandex-direct-2026`.
- Опубликованных постов блога: 2 (`kak-nachat-s-excel` от 2024-12-15, `cms-dlya-sayta` от 2025-01-20).
- Маршруты приложения: `/`, `/courses`, `/courses/:slug`, `/blog`, `/blog/:slug`, `/contact`, `/admin`, `*` (404).
- `public/robots.txt` есть, но без `Sitemap:` и без запрета админки.
- `public/sitemap.xml` отсутствует.
- Боевой домен: `https://lnikita.lovable.app`.

### Что делаем

**1. Перезаписать `public/robots.txt`:**
- Разрешить индексацию всем (`User-agent: *`, `Allow: /`).
- Запретить `/admin`, `/admin/`, `/auth`, `/404`.
- Указать `Sitemap: https://lnikita.lovable.app/sitemap.xml`.

**2. Создать `public/sitemap.xml`** со всеми публичными URL:
- Главная `/` (priority 1.0, changefreq weekly)
- `/courses`, `/blog` (0.9 / 0.8, weekly)
- `/contact` (0.6, monthly)
- 4 страницы курсов `/courses/{slug}` (0.8, monthly)
- 2 поста блога `/blog/{slug}` с `<lastmod>` из поля `date` (0.7, monthly)
- Админ, 404, auth — НЕ включаем.

### Замечание про автообновление
Sitemap — статический файл. При добавлении нового курса/поста через админку он не обновится автоматически. Варианты на будущее (не делаем сейчас, если не попросишь):
- Эдж-функция `sitemap` в Supabase, которая отдаёт XML из БД на лету (нужен rewrite в `vite.config.ts` или прокси).
- Скрипт пресборки, читающий БД и генерирующий `public/sitemap.xml` перед `vite build`.

Пока — статический файл с актуальным контентом из БД.

### Файлы
- Перезаписать: `public/robots.txt`
- Создать: `public/sitemap.xml`
