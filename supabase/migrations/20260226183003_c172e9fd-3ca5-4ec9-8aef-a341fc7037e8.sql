
-- 1. Enum для ролей
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- 2. Таблица ролей
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- 3. RLS на таблице ролей
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read user_roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (true);

-- 4. Функция проверки роли (SECURITY DEFINER)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 5. Назначить admin существующему пользователю
INSERT INTO public.user_roles (user_id, role)
VALUES ('8a78f168-b2f6-4dcf-8ba6-0a81c3c84065', 'admin');

-- 6. Обновить RLS для blog_posts
DROP POLICY "Auth users can insert posts" ON public.blog_posts;
DROP POLICY "Auth users can update posts" ON public.blog_posts;
DROP POLICY "Auth users can delete posts" ON public.blog_posts;

CREATE POLICY "Admins can insert posts" ON public.blog_posts
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update posts" ON public.blog_posts
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete posts" ON public.blog_posts
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 7. Обновить RLS для courses
DROP POLICY "Auth users can insert courses" ON public.courses;
DROP POLICY "Auth users can update courses" ON public.courses;
DROP POLICY "Auth users can delete courses" ON public.courses;

CREATE POLICY "Admins can insert courses" ON public.courses
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update courses" ON public.courses
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete courses" ON public.courses
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 8. Обновить RLS для faq
DROP POLICY "Auth users can insert faq" ON public.faq;
DROP POLICY "Auth users can update faq" ON public.faq;
DROP POLICY "Auth users can delete faq" ON public.faq;

CREATE POLICY "Admins can insert faq" ON public.faq
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update faq" ON public.faq
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete faq" ON public.faq
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 9. Обновить RLS для testimonials
DROP POLICY "Auth users can insert testimonials" ON public.testimonials;
DROP POLICY "Auth users can update testimonials" ON public.testimonials;
DROP POLICY "Auth users can delete testimonials" ON public.testimonials;

CREATE POLICY "Admins can insert testimonials" ON public.testimonials
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update testimonials" ON public.testimonials
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete testimonials" ON public.testimonials
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
