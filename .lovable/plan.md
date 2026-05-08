## Установка Яндекс Метрики (ID: 109003754)

Подключаю счётчик глобально через `index.html`, добавляю SPA-трекинг переходов между роутами и исключаю админку (`/admin`) из отслеживания.

### Что сделаю

1. **`index.html`**
   - В конец `<head>` — инлайн `<script>` инициализации Метрики (`webvisor`, `clickmap`, `trackLinks`, `accurateTrackBounce`, `ecommerce: "dataLayer"`).
   - В начало `<body>` — `<noscript>` с пиксельным `<img>` (HTML5 не разрешает `<noscript><img>` в `<head>`).

2. **`src/hooks/useYandexMetrika.ts`** (новый)
   - Хук на `useLocation()`: при смене `pathname` вызывает `window.ym(109003754, 'hit', url, { referer })`.
   - Если путь начинается с `/admin` — `hit` не отправляется.
   - Типобезопасное расширение `window` (`ym?: (...args: unknown[]) => void`).

3. **`src/App.tsx`**
   - Подключаю `useYandexMetrika()` внутри компонента, обёрнутого в `BrowserRouter` (чтобы `useLocation` работал).

4. **Исключение админки на уровне загрузки**
   - В инлайн-скрипт в `index.html` добавлю условие: если `location.pathname.startsWith('/admin')` — не выполнять `ym('init', ...)`. Это предотвратит запись webvisor-сессий в админ-панели.

### Технические детали

```text
index.html
├── <head>
│   └── <script> if (!/^\/admin/.test(location.pathname)) { ym(...) } </script>
└── <body>
    ├── <noscript><img .../></noscript>
    └── <div id="root"></div>

src/
├── hooks/useYandexMetrika.ts   ← useLocation → ym('hit', url), скип /admin
└── App.tsx                      ← вызывает хук
```

Счётчик единый (109003754), webvisor включён везде, кроме `/admin`. Переходы по SPA-роутам будут учитываться как отдельные просмотры в отчётах Метрики.
