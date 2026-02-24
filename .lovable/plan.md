

# Plan: Blog System Improvements

This plan covers 5 major features: delete confirmation, publication status, SEO meta tags, improved Markdown rendering, and image support with file storage.

---

## 1. Database Changes

### Migration: Add columns and storage bucket

Add two new columns to `blog_posts`:
- `published` (boolean, default `false`) -- draft/published status
- `cover_image` (text, nullable) -- URL path to cover image in storage

Create a storage bucket `blog-images` (public) for uploading images within articles and cover images. Add RLS policies: public read, authenticated insert/delete.

### Fix RLS policies

Change existing RESTRICTIVE policies to PERMISSIVE so they work correctly (currently all policies are restrictive, which means they AND together -- the SELECT policy being restrictive blocks writes even when the write policy passes).

---

## 2. Delete Confirmation Dialog (Admin)

- Import `AlertDialog` components already available in the project
- Wrap the delete button in an `AlertDialog` with a confirmation message ("Are you sure you want to delete this article?")
- Only call `deletePost` after user confirms

---

## 3. Publication Status (Draft/Published)

### Admin panel:
- Add a `Switch` toggle in the article form for "Published" status
- Display a badge (draft/published) next to each article title in the table
- Include `published` field in `addPost` and `updatePost` calls

### Blog (public pages):
- Filter `useBlogPosts` on the public blog pages to only show `published = true` posts
- In admin, show all posts regardless of status

Update `useBlogPosts` hook to accept an optional `showDrafts` parameter.

---

## 4. SEO Meta Tags

Create a `useDocumentMeta` hook (or inline `useEffect`) that sets:
- `document.title`
- `<meta name="description">`
- `<meta property="og:title">`
- `<meta property="og:description">`
- `<meta property="og:image">` (if cover image exists)

Apply in:
- `BlogPost.tsx` -- use post title/description
- `Blog.tsx` -- static blog listing title

---

## 5. Improved Markdown Rendering

Replace the basic `renderContent` function with a proper Markdown component supporting:
- **Bold** (`**text**`), *italic* (`*text*`), ~~strikethrough~~
- [Links](url) with `[text](url)` syntax
- Inline `code` and fenced code blocks (```)
- Images via `![alt](url)` syntax
- Simple tables (`| col | col |`)
- Blockquotes (`>`)

Implementation approach: Create a `MarkdownRenderer` component that parses content line-by-line with regex for inline formatting. No external library needed -- extend the existing pattern with regex replacements for inline elements and block-level detection for code blocks, tables, and blockquotes.

---

## 6. Image Support (Cover + In-article)

### Storage bucket:
- Create `blog-images` bucket (public read)
- RLS: anyone can read, authenticated users can upload/delete

### Admin panel:
- Add a file input for cover image upload
- On file select, upload to `blog-images/{slug}/{filename}` via Supabase Storage SDK
- Store the public URL in `cover_image` column
- Add a button to copy image URL for pasting into Markdown content as `![alt](url)`

### Blog display:
- Show cover image at top of `BlogPost.tsx` article
- Show cover image as thumbnail on `Blog.tsx` card list
- Markdown `![alt](url)` renders as `<img>` tags

---

## Technical Details

### Files to create:
- `src/components/MarkdownRenderer.tsx` -- reusable Markdown component
- `src/hooks/useDocumentMeta.ts` -- SEO meta tag hook

### Files to modify:
- `src/pages/Admin.tsx` -- delete confirmation, status toggle, cover image upload, image URL copy
- `src/pages/Blog.tsx` -- filter published posts, show cover images, SEO
- `src/pages/BlogPost.tsx` -- use MarkdownRenderer, show cover image, SEO
- `src/hooks/useBlogPosts.ts` -- add `showDrafts` parameter to query

### Database migration SQL:
```sql
-- Add columns
ALTER TABLE public.blog_posts ADD COLUMN published boolean NOT NULL DEFAULT false;
ALTER TABLE public.blog_posts ADD COLUMN cover_image text;

-- Fix RLS: drop restrictive, recreate as permissive
DROP POLICY "Anyone can read blog posts" ON public.blog_posts;
DROP POLICY "Authenticated users can delete blog posts" ON public.blog_posts;
DROP POLICY "Authenticated users can insert blog posts" ON public.blog_posts;
DROP POLICY "Authenticated users can update blog posts" ON public.blog_posts;

CREATE POLICY "Anyone can read published posts" ON public.blog_posts FOR SELECT USING (true);
CREATE POLICY "Auth users can insert posts" ON public.blog_posts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update posts" ON public.blog_posts FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete posts" ON public.blog_posts FOR DELETE TO authenticated USING (true);

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

CREATE POLICY "Public read blog images" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');
CREATE POLICY "Auth upload blog images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'blog-images');
CREATE POLICY "Auth delete blog images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'blog-images');
```

### Data migration:
Update existing posts to `published = true`:
```sql
UPDATE public.blog_posts SET published = true;
```

