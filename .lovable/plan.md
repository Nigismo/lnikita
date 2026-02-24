

# Phase 2: Individual Course Pages

## What will be built
Three detailed course pages at `/courses/excel`, `/courses/web-dev`, and `/courses/telegram-smm`, plus a `/courses` index page listing all three. Each page follows the same template structure but with unique content.

## Content Source
- **Telegram SMM**: Using the detailed Russian-language description you provided (will be kept in Russian).
- **Excel & Web Dev**: Placeholder content in a similar style (you can replace it later or provide descriptions like you did for SMM).

## Page Structure (each course page)

1. **Hero banner** -- Course title, short tagline, and "Enroll on Stepik" CTA button
2. **Why this course** -- Key benefits with icons (from the description you provided)
3. **Target audience** -- Who the course is for, listed with bullet points
4. **Requirements** -- What students need before starting
5. **Curriculum outline** -- Expandable accordion sections showing modules/topics
6. **Testimonials** -- Course-specific student reviews (cards)
7. **FAQ** -- Course-specific questions in accordion format
8. **Bottom CTA** -- Final enrollment call-to-action

## Routes & Navigation

- `/courses` -- Grid of all 3 course cards (reuses the existing CourseCards style)
- `/courses/:slug` -- Dynamic route rendering the correct course data

## Files to create/modify

| File | Action |
|------|--------|
| `src/data/courses.ts` | New -- centralized course data (title, description, audience, curriculum, testimonials, FAQ) for all 3 courses |
| `src/pages/CoursePage.tsx` | New -- dynamic course detail page component |
| `src/pages/Courses.tsx` | New -- courses listing page |
| `src/App.tsx` | Edit -- add `/courses` and `/courses/:slug` routes |

## Technical Details

- Course data will be stored in a single `src/data/courses.ts` file as a typed array, making it easy to later migrate to Supabase.
- `CoursePage.tsx` will use `useParams()` to read the slug and look up course data.
- If slug is not found, redirects to NotFound.
- All sections use Framer Motion animations matching the homepage style.
- Reuses existing UI components: Card, Accordion, Button.
- Telegram SMM content will be in Russian as provided; Excel and Web Dev will have English placeholder content.

