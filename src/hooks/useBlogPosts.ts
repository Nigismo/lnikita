import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

export type BlogPost = Tables<"blog_posts">;

export function useBlogPosts(showDrafts = false) {
  const queryClient = useQueryClient();

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["blog_posts", showDrafts],
    queryFn: async () => {
      let query = supabase
        .from("blog_posts")
        .select("*")
        .order("date", { ascending: false });
      if (!showDrafts) {
        query = query.eq("published", true);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const addMutation = useMutation({
    mutationFn: async (post: TablesInsert<"blog_posts">) => {
      const { error } = await supabase.from("blog_posts").insert(post);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blog_posts"] }),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ slug, data }: { slug: string; data: Partial<BlogPost> }) => {
      const { error } = await supabase.from("blog_posts").update(data).eq("slug", slug);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blog_posts"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (slug: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("slug", slug);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blog_posts"] }),
  });

  return {
    posts,
    isLoading,
    addPost: addMutation.mutateAsync,
    updatePost: (slug: string, data: Partial<BlogPost>) => updateMutation.mutateAsync({ slug, data }),
    deletePost: deleteMutation.mutateAsync,
  };
}
