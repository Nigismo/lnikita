

## План: Замена 3D-робота на shader-фон в Hero-секции

### Проблема
Сейчас в `HeroSection.tsx` справа отображается 3D-сцена (Spline) с роботом, но она скрыта на мобильных (`hidden lg:block`). На мобильных правая колонка пустая.

### Решение
Заменить Spline-робот на анимированный WebGL shader-фон, который будет работать на всех устройствах (включая мобильные).

### Что будет сделано

**1. Создать компонент `src/components/ui/shader-background.tsx`**
- Перевести предоставленный JSX-компонент на TypeScript
- Исправить пустой `return ()` в исходнике — добавить `<canvas ref={canvasRef} />` с правильными классами (`w-full h-full block`)
- Типизировать refs: `useRef<HTMLCanvasElement>(null)` и параметры функций (`gl: WebGLRenderingContext`, etc.)
- Добавить `cancelAnimationFrame` в cleanup, чтобы избежать утечек
- Сделать так, чтобы canvas заполнял родительский контейнер (а не `window.innerWidth/innerHeight`), чтобы корректно вписаться в hero — использовать ResizeObserver на родителе
- Добавить проверку `if (!gl)` с graceful fallback (просто не рендерить ничего — фон останется обычным)

**2. Обновить `src/components/home/HeroSection.tsx`**
- Удалить импорт `SplineScene`
- Заменить блок `<motion.div className="...hidden lg:block">` с `<SplineScene>` на:
  - Контейнер с `relative h-[400px] lg:h-[500px]` (без `hidden lg:block` — будет видно на мобильных)
  - Внутри — `<ShaderBackground />` со скруглением (`rounded-2xl overflow-hidden`)
  - Сохранить градиентную подложку поверх для мягкого перехода
- На мобильных секция будет показываться под текстом (стандартное поведение `grid-cols-1` → `lg:grid-cols-2`)

### Технические детали

- **Canvas-размер**: рендерим в размер контейнера, а не window — иначе shader будет растянут на весь экран и перекроет всё
- **DPR**: учесть `window.devicePixelRatio` для четкости на retina (ограничить до 2, чтобы не убить производительность)
- **TypeScript**: строгая типизация всех WebGL-объектов и shader uniforms
- **Cleanup**: отмена `requestAnimationFrame`, удаление слушателей resize
- **Демо-файл `demo.tsx` не создаём** — он не нужен в продакшен-коде, компонент используется напрямую в `HeroSection`

### Файлы

- Создать: `src/components/ui/shader-background.tsx`
- Изменить: `src/components/home/HeroSection.tsx`

### Без изменений
- `SplineScene.tsx` остается в проекте (вдруг понадобится в другом месте), но из Hero убираем
- Стили, тема, остальные секции — без изменений

