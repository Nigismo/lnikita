import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import type { CurriculumModuleDB } from "@/hooks/useCourses";

interface Props {
  value: CurriculumModuleDB[];
  onChange: (val: CurriculumModuleDB[]) => void;
}

export default function CurriculumEditor({ value, onChange }: Props) {
  const updateModule = (i: number, patch: Partial<CurriculumModuleDB>) =>
    onChange(value.map((m, idx) => (idx === i ? { ...m, ...patch } : m)));
  const removeModule = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const addModule = () => onChange([...value, { title: "", topics: [""] }]);

  const updateTopic = (mi: number, ti: number, text: string) => {
    const topics = [...value[mi].topics];
    topics[ti] = text;
    updateModule(mi, { topics });
  };
  const removeTopic = (mi: number, ti: number) => {
    updateModule(mi, { topics: value[mi].topics.filter((_, idx) => idx !== ti) });
  };
  const addTopic = (mi: number) => {
    updateModule(mi, { topics: [...value[mi].topics, ""] });
  };

  return (
    <div className="space-y-4">
      {value.map((m, mi) => (
        <div key={mi} className="rounded-md border p-3 space-y-2">
          <div className="flex items-center gap-2">
            <Input className="font-medium" placeholder="Название модуля" value={m.title} onChange={(e) => updateModule(mi, { title: e.target.value })} />
            <Button variant="ghost" size="icon" onClick={() => removeModule(mi)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
          </div>
          <div className="pl-4 space-y-1">
            {m.topics.map((t, ti) => (
              <div key={ti} className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-4">{ti + 1}.</span>
                <Input value={t} onChange={(e) => updateTopic(mi, ti, e.target.value)} placeholder="Тема" className="text-sm" />
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeTopic(mi, ti)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => addTopic(mi)}><Plus className="mr-1 h-3 w-3" />Тема</Button>
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addModule}><Plus className="mr-1 h-4 w-4" />Добавить модуль</Button>
    </div>
  );
}
