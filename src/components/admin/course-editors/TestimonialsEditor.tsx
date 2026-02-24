import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus } from "lucide-react";
import type { CourseTestimonialDB } from "@/hooks/useCourses";

interface Props {
  value: CourseTestimonialDB[];
  onChange: (val: CourseTestimonialDB[]) => void;
}

export default function TestimonialsEditor({ value, onChange }: Props) {
  const update = (i: number, patch: Partial<CourseTestimonialDB>) =>
    onChange(value.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const add = () => onChange([...value, { name: "", text: "", rating: 5 }]);

  return (
    <div className="space-y-3">
      {value.map((t, i) => (
        <div key={i} className="rounded-md border p-3 space-y-2">
          <div className="flex items-center gap-2">
            <Input placeholder="Имя" value={t.name} onChange={(e) => update(i, { name: e.target.value })} />
            <Input type="number" min={1} max={5} className="w-20" value={t.rating} onChange={(e) => update(i, { rating: Number(e.target.value) })} />
            <Button variant="ghost" size="icon" onClick={() => remove(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
          </div>
          <Textarea rows={2} placeholder="Текст отзыва" value={t.text} onChange={(e) => update(i, { text: e.target.value })} />
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={add}><Plus className="mr-1 h-4 w-4" />Добавить</Button>
    </div>
  );
}
