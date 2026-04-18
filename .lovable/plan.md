

## План: Исправление 4 проблем безопасности

### 1. `user_roles` — любой аутентифицированный читает все роли (error)
Заменить SELECT-политику с `USING (true)` на проверку: пользователь видит **только свою** роль (`auth.uid() = user_id`). Этого достаточно для проверки админ-доступа в `Admin.tsx` (запрос идёт с фильтром `eq("user_id", session.user.id)`).

### 2. `blog-images` — любой аутентифицированный может загружать/удалять (warn)
Создать (или заменить) storage-политики для bucket `blog-images`:
- **INSERT**, **UPDATE**, **DELETE** — только для `has_role(auth.uid(), 'admin')`
- **SELECT** — оставить публичным (картинки нужны всем для отображения блога), но ограничить буфером `blog-images`, чтобы устранить и проблему #4

### 3. Public Bucket Allows Listing (warn)
Решается вместе с #2: SELECT-политика на `storage.objects` будет ограничена `bucket_id = 'blog-images'`, без права листинга через storage API (публичный доступ к отдельным файлам по URL сохранится).

### 4. Leaked Password Protection Disabled (warn)
Включить HIBP-проверку паролей через настройки auth (`password_hibp_enabled: true`). Это автоматически блокирует регистрацию/смену пароля на скомпрометированные пароли.

### Изменения

**Миграция (схема):**
```sql
-- user_roles: заменить SELECT-политику
DROP POLICY "Admins can read user_roles" ON public.user_roles;
CREATE POLICY "Users can read their own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- storage.objects для blog-images: пересоздать политики
DROP POLICY IF EXISTS <existing blog-images policies>;

CREATE POLICY "Public can view blog images"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'blog-images');

CREATE POLICY "Admins can upload blog images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'blog-images' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update blog images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'blog-images' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blog images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'blog-images' AND has_role(auth.uid(), 'admin'));
```

**Auth-настройка:** Включить `password_hibp_enabled` через configure_auth.

### Файлы кода
Изменения в коде **не требуются** — текущая логика в `Admin.tsx` и `AdminBlogTab.tsx` работает с этими политиками без изменений (admin при заходе проходит проверку, картинки в блоге грузятся по публичным URL).

### Результат
Все 4 предупреждения безопасности будут устранены.

