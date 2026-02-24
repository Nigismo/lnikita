

# Исправление: робот не следит за курсором

## Проблема
В `HeroSection.tsx` (строка 46) есть декоративный градиентный `div` с `absolute inset-0`, который полностью перекрывает Spline-сцену. Этот элемент перехватывает все события мыши (`mousemove`, `mouseenter` и т.д.), не давая им дойти до Spline-канваса. Именно поэтому робот не реагирует на курсор.

## Решение
Добавить `pointer-events-none` к градиентному оверлею, чтобы он пропускал события мыши насквозь к Spline-сцене.

## Изменения

### `src/components/home/HeroSection.tsx`
Строка 46 -- добавить `pointer-events-none`:

```
// Было:
<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-transparent" />

// Станет:
<div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
```

Одна строка, одно изменение -- градиент остаётся визуально, но больше не блокирует взаимодействие с 3D-сценой.

