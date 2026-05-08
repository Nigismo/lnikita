import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const YM_COUNTER_ID = 109003754;

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

export function useYandexMetrika() {
  const location = useLocation();
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    const path = location.pathname + location.search;

    // Не трекаем админку
    if (location.pathname.startsWith("/admin")) {
      prevPath.current = path;
      return;
    }

    // Пропускаем самый первый рендер — первичный hit делает init в index.html
    if (prevPath.current === null) {
      prevPath.current = path;
      return;
    }

    if (prevPath.current === path) return;

    if (typeof window !== "undefined" && typeof window.ym === "function") {
      window.ym(YM_COUNTER_ID, "hit", window.location.href, {
        referer: window.location.origin + prevPath.current,
      });
    }

    prevPath.current = path;
  }, [location.pathname, location.search]);
}
