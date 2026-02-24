import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { availableIcons } from "@/lib/icons";
import { Trash2, Plus } from "lucide-react";
import type { CourseBenefitDB } from "@/hooks/useCourses";

interface Props {
  value: CourseBenefitDB[];
  onChange: (val: CourseBenefitDB[]) => void;
}

export default function BenefitsEditor({ value, onChange }: Props) {
  const update = (i: number, patch: Partial<CourseBenefitDB>) =>
    onChange(value.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const add = () => onChange([...value, { icon: "BookOpen", title: "", description: "" }]);

  return (
    <div className="space-y-3">
      {value.map((b, i) => (
        <div key={i} className="rounded-md border p-3 space-y-2">
          <div className="flex items-center gap-2">
            <Select value={b.icon} onValueChange={(v) => update(i, { icon: v })}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                {availableIcons.map((name) => (
                  <SelectItem key={name} value={name}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" onClick={() => remove(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
          </div>
          <Input placeholder="Заголовок" value={b.title} onChange={(e) => update(i, { title: e.target.value })} />
          <Input placeholder="Описание" value={b.description} onChange={(e) => update(i, { description: e.target.value })} />
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={add}><Plus className="mr-1 h-4 w-4" />Добавить</Button>
    </div>
  );
}
