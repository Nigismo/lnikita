import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const NotFound = () => {
  const location = useLocation();

  useDocumentMeta({
    title: "Страница не найдена | EduPro",
    description: "Запрашиваемая страница не существует.",
    noindex: true,
  });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Страница не найдена</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Вернуться на главную
        </a>
      </div>
    </div>
  );
};

export default NotFound;
