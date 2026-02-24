
-- Courses table (complex nested data stored as JSONB)
CREATE TABLE public.courses (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  tagline text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  icon_name text NOT NULL DEFAULT 'BookOpen',
  link text NOT NULL DEFAULT '',
  benefits jsonb NOT NULL DEFAULT '[]'::jsonb,
  audience jsonb NOT NULL DEFAULT '[]'::jsonb,
  requirements jsonb NOT NULL DEFAULT '[]'::jsonb,
  curriculum jsonb NOT NULL DEFAULT '[]'::jsonb,
  course_testimonials jsonb NOT NULL DEFAULT '[]'::jsonb,
  course_faq jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Auth users can insert courses" ON public.courses FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update courses" ON public.courses FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete courses" ON public.courses FOR DELETE TO authenticated USING (true);

-- Homepage testimonials
CREATE TABLE public.testimonials (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  text text NOT NULL DEFAULT '',
  rating integer NOT NULL DEFAULT 5,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Auth users can insert testimonials" ON public.testimonials FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update testimonials" ON public.testimonials FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete testimonials" ON public.testimonials FOR DELETE TO authenticated USING (true);

-- Homepage FAQ
CREATE TABLE public.faq (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question text NOT NULL,
  answer text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.faq ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read faq" ON public.faq FOR SELECT USING (true);
CREATE POLICY "Auth users can insert faq" ON public.faq FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update faq" ON public.faq FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete faq" ON public.faq FOR DELETE TO authenticated USING (true);
