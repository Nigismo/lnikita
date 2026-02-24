import { useState } from "react";
import { useCourses, CourseDB, CourseBenefitDB, CourseAudienceDB, CurriculumModuleDB, CourseTestimonialDB, CourseFAQDB } from "@/hooks/useCourses";
import { availableIcons } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

import BenefitsEditor from "./course-editors/BenefitsEditor";
import AudienceEditor from "./course-editors/AudienceEditor";
import RequirementsEditor from "./course-editors/RequirementsEditor";
import CurriculumEditor from "./course-editors/CurriculumEditor";
import TestimonialsEditor from "./course-editors/TestimonialsEditor";
import FAQEditor from "./course-editors/FAQEditor";

interface CourseForm {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon_name: string;
  link: string;
  sort_order: number;
  benefits: CourseBenefitDB[];
  audience: CourseAudienceDB[];
  requirements: string[];
  curriculum: CurriculumModuleDB[];
  course_testimonials: CourseTestimonialDB[];
  course_faq: CourseFAQDB[];
}

const emptyForm: CourseForm = {
  slug: "", title: "", tagline: "", description: "", icon_name: "BookOpen", link: "",
  benefits: [], audience: [], requirements: [], curriculum: [],
  course_testimonials: [], course_faq: [], sort_order: 0,
};

export default function AdminCoursesTab() {
  const { courses, addCourse, updateCourse, deleteCourse } = useCourses();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<CourseForm>(emptyForm);

  const resetForm = () => {
    setForm({ ...emptyForm, sort_order: courses.length });
    setEditing(null);
  };

  const startEdit = (c: CourseDB) => {
    setEditing(c.id);
    setForm({
      slug: c.slug, title: c.title, tagline: c.tagline, description: c.description,
      icon_name: c.icon_name, link: c.link, sort_order: c.sort_order,
      benefits: c.benefits, audience: c.audience, requirements: c.requirements,
      curriculum: c.curriculum, course_testimonials: c.course_testimonials, course_faq: c.course_faq,
    });
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      toast({ title: "Заполните название и slug", variant: "destructive" });
      return;
    }
    try {
      if (editing) {
        await updateCourse(editing, form);
        toast({ title: "Курс обновлён" });
      } else {
        await addCourse(form);
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
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      {/* Course list */}
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

      {/* Course form */}
      <Card className="max-h-[85vh] overflow-y-auto">
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
          <div className="grid grid-cols-2 gap-4">
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
              <Label>Порядок</Label>
              <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Ссылка (Stepik)</Label>
            <Input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
          </div>

          {/* Visual editors in accordion */}
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="benefits">
              <AccordionTrigger>Преимущества ({form.benefits.length})</AccordionTrigger>
              <AccordionContent>
                <BenefitsEditor value={form.benefits} onChange={(v) => setForm({ ...form, benefits: v })} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="audience">
              <AccordionTrigger>Аудитория ({form.audience.length})</AccordionTrigger>
              <AccordionContent>
                <AudienceEditor value={form.audience} onChange={(v) => setForm({ ...form, audience: v })} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="requirements">
              <AccordionTrigger>Требования ({form.requirements.length})</AccordionTrigger>
              <AccordionContent>
                <RequirementsEditor value={form.requirements} onChange={(v) => setForm({ ...form, requirements: v })} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="curriculum">
              <AccordionTrigger>Программа ({form.curriculum.length})</AccordionTrigger>
              <AccordionContent>
                <CurriculumEditor value={form.curriculum} onChange={(v) => setForm({ ...form, curriculum: v })} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="testimonials">
              <AccordionTrigger>Отзывы ({form.course_testimonials.length})</AccordionTrigger>
              <AccordionContent>
                <TestimonialsEditor value={form.course_testimonials} onChange={(v) => setForm({ ...form, course_testimonials: v })} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq">
              <AccordionTrigger>FAQ ({form.course_faq.length})</AccordionTrigger>
              <AccordionContent>
                <FAQEditor value={form.course_faq} onChange={(v) => setForm({ ...form, course_faq: v })} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex-1">{editing ? "Сохранить" : "Добавить"}</Button>
            {editing && <Button variant="outline" onClick={resetForm}>Отмена</Button>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
