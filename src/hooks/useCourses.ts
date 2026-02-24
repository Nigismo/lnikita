import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CourseBenefitDB {
  icon: string;
  title: string;
  description: string;
}

export interface CourseAudienceDB {
  emoji: string;
  title: string;
  description: string;
}

export interface CurriculumModuleDB {
  title: string;
  topics: string[];
}

export interface CourseTestimonialDB {
  name: string;
  text: string;
  rating: number;
}

export interface CourseFAQDB {
  q: string;
  a: string;
}

export interface CourseDB {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon_name: string;
  link: string;
  benefits: CourseBenefitDB[];
  audience: CourseAudienceDB[];
  requirements: string[];
  curriculum: CurriculumModuleDB[];
  course_testimonials: CourseTestimonialDB[];
  course_faq: CourseFAQDB[];
  sort_order: number;
}

export function useCourses() {
  const qc = useQueryClient();

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return (data as any[]).map((c) => ({
        ...c,
        benefits: c.benefits ?? [],
        audience: c.audience ?? [],
        requirements: c.requirements ?? [],
        curriculum: c.curriculum ?? [],
        course_testimonials: c.course_testimonials ?? [],
        course_faq: c.course_faq ?? [],
      })) as CourseDB[];
    },
  });

  const addMutation = useMutation({
    mutationFn: async (course: Omit<CourseDB, "id">) => {
      const { error } = await supabase.from("courses").insert(course as any);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["courses"] }),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CourseDB> }) => {
      const { error } = await supabase.from("courses").update(data as any).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["courses"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("courses").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["courses"] }),
  });

  return {
    courses,
    isLoading,
    addCourse: addMutation.mutateAsync,
    updateCourse: (id: string, data: Partial<CourseDB>) => updateMutation.mutateAsync({ id, data }),
    deleteCourse: deleteMutation.mutateAsync,
  };
}
