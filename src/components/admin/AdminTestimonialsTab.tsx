import { useState } from "react";
import { useTestimonials, Testimonial } from "@/hooks/useTestimonials";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function AdminTestimonialsTab() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useTestimonials();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", text: "", rating: 5, sort_order: 0 });

  const resetForm = () => {
    setForm({ name: "", text: "", rating: 5, sort_order: testimonials.length });
    setEditing(null);
  };

  const startEdit = (t: Testimonial) => {
    setEditing(t.id);
    setForm({ name: t.name, text: t.text, rating: t.rating, sort_order: t.sort_order });
  };

  const handleSave = async () => {
    if (!form.name) { toast({ title: "Укажите имя", variant: "destructive" }); return; }
    try {
      if (editing) {
        await updateTestimonial(editing, form);
        toast({ title: "Отзыв обновлён" });
      } else {
        await addTestimonial(form);
        toast({ title: "Отзыв добавлен" });
      }
      resetForm();
    } catch (err: any) {
      toast({ title: "Ошибка", description: err.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTestimonial(id);
      toast({ title: "Отзыв удалён" });
    } catch (err: any) {
      toast({ title: "Ошибка", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Отзывы</CardTitle>
          <Button size="sm" onClick={resetForm}><Plus className="mr-1 h-4 w-4" /> Новый</Button>
        </CardHeader>
        <CardContent>
          {testimonials.length === 0 ? (
            <p className="text-sm text-muted-foreground">Нет отзывов</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Имя</TableHead>
                  <TableHead>Рейтинг</TableHead>
                  <TableHead className="w-24 text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium">{t.name}</TableCell>
                    <TableCell>{"⭐".repeat(t.rating)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => startEdit(t)}><Pencil className="h-4 w-4" /></Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Удалить отзыв?</AlertDialogTitle>
                            <AlertDialogDescription>Отзыв от «{t.name}» будет удалён.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(t.id)}>Удалить</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{editing ? "Редактировать" : "Новый отзыв"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Имя</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Текст</Label>
            <Textarea rows={3} value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Рейтинг (1-5)</Label>
            <Input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} />
          </div>
          <div className="space-y-2">
            <Label>Порядок</Label>
            <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex-1">{editing ? "Сохранить" : "Добавить"}</Button>
            {editing && <Button variant="outline" onClick={resetForm}>Отмена</Button>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
