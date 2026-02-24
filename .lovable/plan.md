

# Перенос блога из localStorage в Supabase

## Текущая ситуация
- Supabase **не подключен** к проекту
- Блог-посты хранятся в `localStorage` через хук `useBlogPosts.ts`
- Данные теряются при очистке браузера или смене устройства

## Шаги реализации

### 1. Подключение Supabase
Активировать Lovable Cloud (Supabase) для проекта.

### 2. Создание таблицы `blog_posts`
Миграция для создания таблицы:

| Колонка       | Тип          | Описание                  |
|---------------|--------------|---------------------------|
| id            | uuid (PK)    | Уникальный идентификатор  |
| slug          | text (unique)| URL-адрес статьи          |
| title         | text         | Заголовок                 |
| description   | text         | Краткое описание          |
| content       | text         | Контент (Markdown)        |
| date          | text         | Дата публикации           |
| created_at    | timestamptz  | Дата создания записи      |

RLS-политики:
- **SELECT**: публичный доступ (для чтения блога всеми посетителями)
- **INSERT/UPDATE/DELETE**: только для авторизованных пользователей (админ)

### 3. Заполнение начальными данными
Вставить две демо-статьи из `src/data/blog-posts.ts` в таблицу.

### 4. Создание Supabase-клиента
Файл `src/integrations/supabase/client.ts` с настроенным клиентом.

### 5. Обновление хука `useBlogPosts.ts`
Заменить localStorage на Supabase-запросы:
- `posts` -- загрузка через `supabase.from('blog_posts').select()`
- `addPost` -- `supabase.from('blog_posts').insert()`
- `updatePost` -- `supabase.from('blog_posts').update()`
- `deletePost` -- `supabase.from('blog_posts').delete()`

Использование `@tanstack/react-query` для кэширования и автоматического обновления.

### 6. Обновление админ-панели (`Admin.tsx`)
- Заменить пароль на Supabase Auth (email + пароль)
- Или оставить текущую простую авторизацию, но использовать Supabase service role для записи

### 7. Обновление страниц блога
- `Blog.tsx` и `BlogPost.tsx` -- чтение из Supabase вместо localStorage

## Файлы

### Новые файлы
- `src/integrations/supabase/client.ts` -- клиент Supabase
- `src/integrations/supabase/types.ts` -- типы таблиц
- Миграция для создания таблицы `blog_posts`

### Изменяемые файлы
- `src/hooks/useBlogPosts.ts` -- замена localStorage на Supabase
- `src/pages/Admin.tsx` -- адаптация под Supabase
- `src/pages/Blog.tsx` -- загрузка из базы
- `src/pages/BlogPost.tsx` -- загрузка из базы

## Результат
Статьи блога будут храниться в базе данных, доступны с любого устройства и не пропадут при очистке браузера.

