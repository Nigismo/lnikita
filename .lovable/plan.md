## План: SEO-мета на ключевые страницы + VITE_SITE_URL для canonical/OG

### Что делаем

**1. Новый модуль `src/lib/site.ts`**
- Экспорт `SITE_URL` = `import.meta.env.VITE_SITE_URL` с фолбэком на `https://lnikita.lovable.app` (хардкод для preview/локалки).
- `DEFAULT_OG_IMAGE` — константа с боевой OG-картинкой (та, что уже в `index.html`).
- Утилита `buildCanonical(path)` для удобства.

**2. Расширить `src/hooks/useDocumentMeta.ts`**
- Добавить параметры `path?: string` и автоматически выставлять `<link rel="canonical">` и `og:url` через `SITE_URL + path`.
- Автоматически выставлять `og:image`, `twitter:image`, `twitter:title`, `twitter:description`, `twitter:card`, `og:type=website` (с фолбэком на `DEFAULT_OG_IMAGE`).
- Сохранить логику `noindex` (уже есть).

**3. Подключить SEO на страницах**
- **`src/pages/Index.tsx` (главная):** title «EduPro — онлайн-курсы по Excel, веб-разработке, SMM и Яндекс Директ», description, `path: "/"`.
- **`src/pages/Courses.tsx`:** title «Все курсы — EduPro», описание, `path: "/courses"`.
- **`src/pages/Blog.tsx`:** уже есть `useDocumentMeta` — добавить `path: "/blog"`.
- **`src/pages/BlogPost.tsx`:** уже есть мета — добавить `path: \`/blog/${slug}\``, `noindex` если `!post && !isLoading`.
- **`src/pages/CoursePage.tsx`:** убрать `window.location.origin`, перевести canonical и JSON-LD `url`/`provider.sameAs` на `SITE_URL` через `path: \`/courses/${slug}\``. JSON-LD-эффект упростить (используем `SITE_URL` вместо `window`).

**4. `index.html`:** заменить `<html lang="en">` → `<html lang="ru">`. Жёсткие OG/Twitter мета в `<head>` оставляем как фолбэк для ботов, которые не выполняют JS (главная страница).

### О переменной VITE_SITE_URL
Vite читает её из `.env` на этапе сборки. Файл `.env` управляется автоматически (Lovable не позволяет редактировать его вручную), поэтому:
- по умолчанию работает фолбэк `https://lnikita.lovable.app` — это и нужно для прода;
- если в будущем подключишь кастомный домен, нужно будет добавить `VITE_SITE_URL=https://your-domain.ru` через настройки проекта.

### Файлы
- Создать: `src/lib/site.ts`
- Изменить: `src/hooks/useDocumentMeta.ts`, `src/pages/Index.tsx`, `src/pages/Courses.tsx`, `src/pages/Blog.tsx`, `src/pages/BlogPost.tsx`, `src/pages/CoursePage.tsx`, `index.html`

### Результат
- На каждой публичной странице: правильный `<title>`, description, canonical на боевой домен, og:url, og:image, twitter card.
- Превью ссылок в Telegram/VK работают на всех страницах (а не только на главной).
- Canonical больше не «прыгает» между preview-доменом Lovable и боевым.
