import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  sort_order: number;
}

export function useTestimonials() {
  const qc = useQueryClient();

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as Testimonial[];
    },
  });

  const addMutation = useMutation({
    mutationFn: async (t: Omit<Testimonial, "id">) => {
      const { error } = await supabase.from("testimonials").insert(t);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Testimonial> }) => {
      const { error } = await supabase.from("testimonials").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });

  return {
    testimonials,
    isLoading,
    addTestimonial: addMutation.mutateAsync,
    updateTestimonial: (id: string, data: Partial<Testimonial>) => updateMutation.mutateAsync({ id, data }),
    deleteTestimonial: deleteMutation.mutateAsync,
  };
}
