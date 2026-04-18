-- 1. user_roles: restrict SELECT to own rows
DROP POLICY IF EXISTS "Admins can read user_roles" ON public.user_roles;
CREATE POLICY "Users can read their own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- 2. storage.objects for blog-images: admin-only writes
DROP POLICY IF EXISTS "Public read blog images" ON storage.objects;
DROP POLICY IF EXISTS "Auth upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Auth delete blog images" ON storage.objects;

CREATE POLICY "Public can view blog images"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'blog-images');

CREATE POLICY "Admins can upload blog images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update blog images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blog images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));