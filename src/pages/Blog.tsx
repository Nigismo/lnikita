import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { CalendarDays } from "lucide-react";

const Blog = () => {
  const { posts, isLoading } = useBlogPosts(false);

  useDocumentMeta({
    title: "Блог — EduPro",
    description: "Полезные статьи по Excel, веб-разработке и цифровым навыкам.",
    path: "/blog",
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container py-20">
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Блог
          </h1>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Полезные статьи по Excel, веб-разработке и цифровым навыкам.
          </p>

          {isLoading ? (
            <p className="mt-12 text-center text-muted-foreground">Загрузка...</p>
          ) : posts.length === 0 ? (
            <p className="mt-12 text-center text-muted-foreground">
              Пока нет статей. Загляните позже!
            </p>
          ) : (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group rounded-xl border border-border/50 bg-card overflow-hidden shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                >
                  {post.cover_image && (
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="h-40 w-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {new Date(post.date).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <h2 className="mt-3 font-display text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                      {post.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
