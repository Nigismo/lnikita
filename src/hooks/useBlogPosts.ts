import { useState, useEffect, useCallback } from "react";
import { BlogPost, defaultBlogPosts } from "@/data/blog-posts";

const STORAGE_KEY = "edupro-blog-posts";

function loadPosts(): BlogPost[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultBlogPosts;
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultBlogPosts));
  return defaultBlogPosts;
}

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>(loadPosts);

  const save = useCallback((updated: BlogPost[]) => {
    setPosts(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const addPost = useCallback((post: BlogPost) => {
    save([post, ...loadPosts()]);
  }, [save]);

  const updatePost = useCallback((slug: string, data: Partial<BlogPost>) => {
    const current = loadPosts();
    save(current.map((p) => (p.slug === slug ? { ...p, ...data } : p)));
  }, [save]);

  const deletePost = useCallback((slug: string) => {
    save(loadPosts().filter((p) => p.slug !== slug));
  }, [save]);

  const refresh = useCallback(() => {
    setPosts(loadPosts());
  }, []);

  return { posts, addPost, updatePost, deletePost, refresh };
}
