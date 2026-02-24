import { useState } from "react";
import { useFAQ, FAQ } from "@/hooks/useFAQ";
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

export default function AdminFAQTab() {
  const { faqs, addFAQ, updateFAQ, deleteFAQ } = useFAQ();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ question: "", answer: "", sort_order: 0 });

  const resetForm = () => {
    setForm({ question: "", answer: "", sort_order: faqs.length });
    setEditing(null);
  };

  const startEdit = (f: FAQ) => {
    setEditing(f.id);
    setForm({ question: f.question, answer: f.answer, sort_order: f.sort_order });
  };

  const handleSave = async () => {
    if (!form.question) { toast({ title: "Укажите вопрос", variant: "destructive" }); return; }
    try {
      if (editing) {
        await updateFAQ(editing, form);
        toast({ title: "FAQ обновлён" });
      } else {
        await addFAQ(form);
        toast({ title: "FAQ добавлен" });
      }
      resetForm();
    } catch (err: any) {
      toast({ title: "Ошибка", description: err.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFAQ(id);
      toast({ title: "FAQ удалён" });
    } catch (err: any) {
      toast({ title: "Ошибка", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>FAQ</CardTitle>
          <Button size="sm" onClick={resetForm}><Plus className="mr-1 h-4 w-4" /> Новый</Button>
        </CardHeader>
        <CardContent>
          {faqs.length === 0 ? (
            <p className="text-sm text-muted-foreground">Нет вопросов</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Вопрос</TableHead>
                  <TableHead className="w-24 text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faqs.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell className="font-medium">{f.question}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => startEdit(f)}><Pencil className="h-4 w-4" /></Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Удалить вопрос?</AlertDialogTitle>
                            <AlertDialogDescription>«{f.question}» будет удалён.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(f.id)}>Удалить</AlertDialogAction>
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
          <CardTitle>{editing ? "Редактировать" : "Новый вопрос"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Вопрос</Label>
            <Input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Ответ</Label>
            <Textarea rows={4} value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} />
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
