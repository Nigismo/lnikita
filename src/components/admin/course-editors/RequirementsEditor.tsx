import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";

interface Props {
  value: string[];
  onChange: (val: string[]) => void;
}

export default function RequirementsEditor({ value, onChange }: Props) {
  const update = (i: number, v: string) => onChange(value.map((item, idx) => (idx === i ? v : item)));
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const add = () => onChange([...value, ""]);

  return (
    <div className="space-y-2">
      {value.map((r, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input value={r} onChange={(e) => update(i, e.target.value)} placeholder="Требование" />
          <Button variant="ghost" size="icon" onClick={() => remove(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={add}><Plus className="mr-1 h-4 w-4" />Добавить</Button>
    </div>
  );
}
