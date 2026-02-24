import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import type { CourseAudienceDB } from "@/hooks/useCourses";

interface Props {
  value: CourseAudienceDB[];
  onChange: (val: CourseAudienceDB[]) => void;
}

export default function AudienceEditor({ value, onChange }: Props) {
  const update = (i: number, patch: Partial<CourseAudienceDB>) =>
    onChange(value.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const add = () => onChange([...value, { emoji: "👤", title: "", description: "" }]);

  return (
    <div className="space-y-3">
      {value.map((a, i) => (
        <div key={i} className="rounded-md border p-3 space-y-2">
          <div className="flex items-center gap-2">
            <Input className="w-16 text-center" value={a.emoji} onChange={(e) => update(i, { emoji: e.target.value })} />
            <span className="text-sm text-muted-foreground flex-1">Эмодзи</span>
            <Button variant="ghost" size="icon" onClick={() => remove(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
          </div>
          <Input placeholder="Заголовок" value={a.title} onChange={(e) => update(i, { title: e.target.value })} />
          <Input placeholder="Описание" value={a.description} onChange={(e) => update(i, { description: e.target.value })} />
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={add}><Plus className="mr-1 h-4 w-4" />Добавить</Button>
    </div>
  );
}
