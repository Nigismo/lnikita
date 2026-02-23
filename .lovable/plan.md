

# Personal Website for Online Course Instructor

## Overview
A modern, conversion-focused personal website built with React + Supabase, featuring a 3D interactive hero section, three course landing pages, a markdown blog, and a secure admin panel. Dark blue/black/white SaaS-style design.

---

## Phase 1: Foundation & Homepage

### Design System
- Dark blue, black, and white color palette
- SaaS-inspired card-based layout with subtle Framer Motion animations
- Modern typography with smooth transitions

### Homepage Sections
1. **3D Hero Section** — Spline interactive scene (lazy-loaded) with instructor positioning and primary CTA
2. **Course Cards** — Three cards linking to individual course pages (Excel, Web Dev, Telegram SMM)
3. **Benefits Section** — Why learn with this instructor
4. **Testimonials Carousel** — Student reviews
5. **FAQ Accordion** — Common questions
6. **Final CTA** — Enrollment call-to-action

### Navigation
- Sticky header with links to Home, Courses, Blog, Contact
- Footer with social links

---

## Phase 2: Course Pages & Contact

### Dynamic Course Pages (3 pages)
Each course page includes:
- Hero headline and description
- Target audience section
- Skills gained list
- Curriculum outline
- Course-specific testimonials and FAQ
- CTA button linking to the external Stepik course

**Courses:**
- Microsoft Excel Specialist → stepik.org/a/244450
- Web Development (CMS) → stepik.org/139723
- Telegram SMM → stepik.org/a/231903

### Contact Page
- Contact form with input validation and anti-spam (honeypot field)
- Success/error states
- Form submissions stored in Supabase

---

## Phase 3: Supabase Backend & Admin Panel

### Database Setup (Supabase)
Tables: courses, blog_posts, testimonials, faq, settings (site-wide text/links), contact_submissions, page_views

### Authentication
- Single admin user with email/password login via Supabase Auth
- Protected `/admin` routes
- Role stored in a `user_roles` table (admin role)

### Admin Dashboard
- Sidebar navigation
- **Homepage Editor** — Edit hero text, benefits, CTA links
- **Course Manager** — Edit course details (title, description, curriculum, links)
- **Blog Manager** — CRUD with markdown editor
- **Testimonials Manager** — Add/edit/delete testimonials
- **FAQ Manager** — Add/edit/delete FAQ items
- **Settings** — Social links, meta titles/descriptions
- **Basic Analytics** — Page view counter display

---

## Phase 4: Blog

### Blog List Page
- Paginated list of blog posts with title, excerpt, date
- SEO-friendly URLs using slugs (e.g., `/blog/my-post-title`)

### Blog Detail Page
- Markdown rendered to HTML
- Meta tags for SEO (title, description, OpenGraph)

---

## Phase 5: SEO & Polish

- Editable meta title and description per page (stored in DB)
- OpenGraph tags for social sharing
- `robots.txt` and basic sitemap
- Performance optimization (lazy loading, image optimization)
- Mobile-responsive design throughout

