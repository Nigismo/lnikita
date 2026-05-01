import { useEffect } from "react";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/site";

interface DocumentMeta {
  title: string;
  description?: string;
  ogImage?: string;
  /** Pathname starting with "/" — used for canonical and og:url. */
  path?: string;
  /** When true, sets <meta name="robots" content="noindex, nofollow"> */
  noindex?: boolean;
}

function upsertMetaByProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertMetaByName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useDocumentMeta({ title, description, ogImage, path, noindex }: DocumentMeta) {
  useEffect(() => {
    document.title = title;

    if (description) {
      upsertMetaByName("description", description);
      upsertMetaByProperty("og:description", description);
      upsertMetaByName("twitter:description", description);
    }

    upsertMetaByProperty("og:title", title);
    upsertMetaByName("twitter:title", title);
    upsertMetaByProperty("og:type", "website");

    const image = ogImage || DEFAULT_OG_IMAGE;
    upsertMetaByProperty("og:image", image);
    upsertMetaByName("twitter:image", image);
    upsertMetaByName("twitter:card", "summary_large_image");

    if (path) {
      const canonical = `${SITE_URL}${path.startsWith("/") ? path : "/" + path}`;
      upsertCanonical(canonical);
      upsertMetaByProperty("og:url", canonical);
    }

    const robotsContent = noindex ? "noindex, nofollow" : "index, follow";
    upsertMetaByName("robots", robotsContent);

    return () => {
      document.title = "EduPro";
      const robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
      if (robots) robots.setAttribute("content", "index, follow");
    };
  }, [title, description, ogImage, path, noindex]);
}
