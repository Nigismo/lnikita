import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { ArrowLeft, CalendarDays } from "lucide-react";

/** Very simple markdown-ish renderer */
function renderContent(content: string) {
  return content.split("\n").map((line, i) => {
    if (line.startsWith("## ")) return <h2 key={i} className="mt-8 mb-3 font-display text-xl font-semibold">{line.slice(3)}</h2>;
    if (line.startsWith("# ")) return <h1 key={i} className="mt-6 mb-4 font-display text-2xl font-bold">{line.slice(2)}</h1>;
    if (line.startsWith("- ")) return <li key={i} className="ml-4 list-disc text-muted-foreground">{line.slice(2)}</li>;
    if (line.trim() === "") return <br key={i} />;
    return <p key={i} className="text-muted-foreground leading-relaxed">{line.replace(/\*\*(.*?)\*\*/g, (_, t) => t).replace(/`(.*?)`/g, (_, t) => t)}</p>;
  });
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts } = useBlogPosts();
  const post = posts.find((p) => p.slug === slug);

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
          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" />
            {new Date(post.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            {post.title}
          </h1>
          <div className="mt-8 space-y-1">{renderContent(post.content)}</div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
