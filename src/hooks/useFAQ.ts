import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
}

export function useFAQ() {
  const qc = useQueryClient();

  const { data: faqs = [], isLoading } = useQuery({
    queryKey: ["faq"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("faq")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as FAQ[];
    },
  });

  const addMutation = useMutation({
    mutationFn: async (f: Omit<FAQ, "id">) => {
      const { error } = await supabase.from("faq").insert(f);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["faq"] }),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<FAQ> }) => {
      const { error } = await supabase.from("faq").update(data).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["faq"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("faq").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["faq"] }),
  });

  return {
    faqs,
    isLoading,
    addFAQ: addMutation.mutateAsync,
    updateFAQ: (id: string, data: Partial<FAQ>) => updateMutation.mutateAsync({ id, data }),
    deleteFAQ: deleteMutation.mutateAsync,
  };
}
