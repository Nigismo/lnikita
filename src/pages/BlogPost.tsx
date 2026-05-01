import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { ArrowLeft, CalendarDays } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts, isLoading } = useBlogPosts(false);
  const post = posts.find((p) => p.slug === slug);
  const notFound = !isLoading && !post;

  useDocumentMeta({
    title: post ? `${post.title} — EduPro` : "Статья не найдена — EduPro",
    description: post?.description,
    ogImage: post?.cover_image ?? undefined,
    path: post ? `/blog/${post.slug}` : undefined,
    noindex: notFound || isLoading,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container py-20 text-center">
          <p className="text-muted-foreground">Загрузка...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container py-20 text-center">
          <h1 className="text-2xl font-bold">Статья не найдена</h1>
          <Link to="/blog" className="mt-4 inline-block text-primary hover:underline">← Вернуться в блог</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <article className="container max-w-3xl py-20">
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Назад в блог
          </Link>
          {post.cover_image && (
            <img
              src={post.cover_image}
              alt={post.title}
              className="mt-6 w-full rounded-xl object-cover max-h-96"
              loading="lazy"
            />
          )}
          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" />
            {new Date(post.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            {post.title}
          </h1>
          <MarkdownRenderer content={post.content} className="mt-8 space-y-1" />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
