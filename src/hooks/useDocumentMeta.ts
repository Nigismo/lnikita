import { useEffect } from "react";

interface DocumentMeta {
  title: string;
  description?: string;
  ogImage?: string;
  /** When true, sets <meta name="robots" content="noindex, nofollow"> */
  noindex?: boolean;
}

export function useDocumentMeta({ title, description, ogImage, noindex }: DocumentMeta) {
  useEffect(() => {
    document.title = title;

    const setMeta = (property: string, content: string | undefined) => {
      if (!content) return;
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const setNameMeta = (name: string, content: string | undefined) => {
      if (!content) return;
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setNameMeta("description", description);
    setMeta("og:title", title);
    setMeta("og:description", description);
    setMeta("og:image", ogImage);

    // Robots: explicit index/noindex on every page that uses the hook
    const robotsContent = noindex ? "noindex, nofollow" : "index, follow";
    let robotsEl = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!robotsEl) {
      robotsEl = document.createElement("meta");
      robotsEl.setAttribute("name", "robots");
      document.head.appendChild(robotsEl);
    }
    robotsEl.setAttribute("content", robotsContent);

    return () => {
      document.title = "EduPro";
      // Reset robots to default index, follow when unmounting a noindex page
      const existingRobots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
      if (existingRobots) existingRobots.setAttribute("content", "index, follow");
    };
  }, [title, description, ogImage, noindex]);
}
