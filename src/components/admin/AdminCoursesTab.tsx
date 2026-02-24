import { useState } from "react";
import { useCourses, CourseDB } from "@/hooks/useCourses";
import { availableIcons } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const emptyForm = {
  slug: "", title: "", tagline: "", description: "", icon_name: "BookOpen", link: "",
  benefits: "[]", audience: "[]", requirements: "[]", curriculum: "[]",
  course_testimonials: "[]", course_faq: "[]", sort_order: 0,
};

export default function AdminCoursesTab() {
  const { courses, addCourse, updateCourse, deleteCourse } = useCourses();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const resetForm = () => {
    setForm({ ...emptyForm, sort_order: courses.length });
    setEditing(null);
  };

  const startEdit = (c: CourseDB) => {
    setEditing(c.id);
    setForm({
      slug: c.slug, title: c.title, tagline: c.tagline, description: c.description,
      icon_name: c.icon_name, link: c.link,
      benefits: JSON.stringify(c.benefits, null, 2),
      audience: JSON.stringify(c.audience, null, 2),
      requirements: JSON.stringify(c.requirements, null, 2),
      curriculum: JSON.stringify(c.curriculum, null, 2),
      course_testimonials: JSON.stringify(c.course_testimonials, null, 2),
      course_faq: JSON.stringify(c.course_faq, null, 2),
      sort_order: c.sort_order,
    });
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      toast({ title: "Заполните название и slug", variant: "destructive" });
      return;
    }
    try {
      const payload = {
        slug: form.slug,
        title: form.title,
        tagline: form.tagline,
        description: form.description,
        icon_name: form.icon_name,
        link: form.link,
        benefits: JSON.parse(form.benefits),
        audience: JSON.parse(form.audience),
        requirements: JSON.parse(form.requirements),
        curriculum: JSON.parse(form.curriculum),
        course_testimonials: JSON.parse(form.course_testimonials),
        course_faq: JSON.parse(form.course_faq),
        sort_order: form.sort_order,
      };
      if (editing) {
        await updateCourse(editing, payload);
        toast({ title: "Курс обновлён" });
      } else {
        await addCourse(payload);
        toast({ title: "Курс добавлен" });
      }
      resetForm();
    } catch (err: any) {
      toast({ title: "Ошибка", description: err.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCourse(id);
      toast({ title: "Курс удалён" });
    } catch (err: any) {
      toast({ title: "Ошибка", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Курсы</CardTitle>
          <Button size="sm" onClick={resetForm}><Plus className="mr-1 h-4 w-4" /> Новый</Button>
        </CardHeader>
        <CardContent>
          {courses.length === 0 ? (
            <p className="text-sm text-muted-foreground">Нет курсов</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead className="w-24 text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.title}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{c.slug}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => startEdit(c)}><Pencil className="h-4 w-4" /></Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Удалить курс?</AlertDialogTitle>
                            <AlertDialogDescription>Курс «{c.title}» будет удалён.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(c.id)}>Удалить</AlertDialogAction>
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

      <Card className="max-h-[80vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>{editing ? "Редактировать курс" : "Новый курс"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Название</Label>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Slug (URL)</Label>
            <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} disabled={!!editing} />
          </div>
          <div className="space-y-2">
            <Label>Подзаголовок</Label>
            <Input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Описание</Label>
            <Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Иконка</Label>
            <Select value={form.icon_name} onValueChange={(v) => setForm({ ...form, icon_name: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {availableIcons.map((name) => (
                  <SelectItem key={name} value={name}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Ссылка (Stepik)</Label>
            <Input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Порядок</Label>
            <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
          </div>
          <div className="space-y-2">
            <Label>Преимущества (JSON)</Label>
            <Textarea rows={4} className="font-mono text-xs" value={form.benefits} onChange={(e) => setForm({ ...form, benefits: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Аудитория (JSON)</Label>
            <Textarea rows={4} className="font-mono text-xs" value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Требования (JSON)</Label>
            <Textarea rows={3} className="font-mono text-xs" value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Программа (JSON)</Label>
            <Textarea rows={4} className="font-mono text-xs" value={form.curriculum} onChange={(e) => setForm({ ...form, curriculum: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Отзывы курса (JSON)</Label>
            <Textarea rows={3} className="font-mono text-xs" value={form.course_testimonials} onChange={(e) => setForm({ ...form, course_testimonials: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>FAQ курса (JSON)</Label>
            <Textarea rows={3} className="font-mono text-xs" value={form.course_faq} onChange={(e) => setForm({ ...form, course_faq: e.target.value })} />
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
