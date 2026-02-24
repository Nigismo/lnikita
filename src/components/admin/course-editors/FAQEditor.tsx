import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus } from "lucide-react";
import type { CourseFAQDB } from "@/hooks/useCourses";

interface Props {
  value: CourseFAQDB[];
  onChange: (val: CourseFAQDB[]) => void;
}

export default function FAQEditor({ value, onChange }: Props) {
  const update = (i: number, patch: Partial<CourseFAQDB>) =>
    onChange(value.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const add = () => onChange([...value, { q: "", a: "" }]);

  return (
    <div className="space-y-3">
      {value.map((f, i) => (
        <div key={i} className="rounded-md border p-3 space-y-2">
          <div className="flex items-center gap-2">
            <Input placeholder="Вопрос" value={f.q} onChange={(e) => update(i, { q: e.target.value })} className="flex-1" />
            <Button variant="ghost" size="icon" onClick={() => remove(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
          </div>
          <Textarea rows={2} placeholder="Ответ" value={f.a} onChange={(e) => update(i, { a: e.target.value })} />
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={add}><Plus className="mr-1 h-4 w-4" />Добавить</Button>
    </div>
  );
}
