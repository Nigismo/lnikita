/**
 * Canonical site origin used for SEO (canonical URLs, og:url, sitemap).
 * Override at build time with VITE_SITE_URL (no trailing slash).
 * Fallback is the production Lovable domain.
 */
const FALLBACK_ORIGIN = "https://lnikita.lovable.app";

export const SITE_URL: string = (
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") ||
  FALLBACK_ORIGIN
);

/** Default OG/Twitter image. Absolute URL so social previews always work. */
export const DEFAULT_OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/LHOUu1HPfnMg0ArFhkoBjugOJut2/social-images/social-1771958700379-Screenshot_33.webp";

/** Build a canonical URL for a given pathname (must start with "/"). */
export function buildCanonical(path: string): string {
  if (!path.startsWith("/")) path = "/" + path;
  return `${SITE_URL}${path}`;
}
