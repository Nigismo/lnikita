
-- Add columns
ALTER TABLE public.blog_posts ADD COLUMN published boolean NOT NULL DEFAULT false;
ALTER TABLE public.blog_posts ADD COLUMN cover_image text;

-- Fix RLS: drop restrictive, recreate as permissive
DROP POLICY "Anyone can read blog posts" ON public.blog_posts;
DROP POLICY "Authenticated users can delete blog posts" ON public.blog_posts;
DROP POLICY "Authenticated users can insert blog posts" ON public.blog_posts;
DROP POLICY "Authenticated users can update blog posts" ON public.blog_posts;

CREATE POLICY "Anyone can read blog posts" ON public.blog_posts FOR SELECT USING (true);
CREATE POLICY "Auth users can insert posts" ON public.blog_posts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update posts" ON public.blog_posts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete posts" ON public.blog_posts FOR DELETE TO authenticated USING (true);

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

CREATE POLICY "Public read blog images" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');
CREATE POLICY "Auth upload blog images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'blog-images');
CREATE POLICY "Auth delete blog images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'blog-images');
