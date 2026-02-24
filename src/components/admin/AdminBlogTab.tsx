import { useState, useRef } from "react";
import { useBlogPosts, BlogPost } from "@/hooks/useBlogPosts";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2, Plus, Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function AdminBlogTab() {
  const { posts, addPost, updatePost, deletePost } = useBlogPosts(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", description: "", content: "", date: "", published: false, cover_image: "" });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setForm({ title: "", slug: "", description: "", content: "", date: new Date().toISOString().slice(0, 10), published: false, cover_image: "" });
    setEditing(null);
  };

  const startEdit = (post: BlogPost) => {
    setEditing(post.slug);
    setForm({
      title: post.title, slug: post.slug, description: post.description,
      content: post.content, date: post.date, published: post.published,
      cover_image: post.cover_image || "",
    });
  };

  const handleCoverUpload = async (file: File) => {
    if (!form.slug) { toast({ title: "Сначала укажите slug", variant: "destructive" }); return; }
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${form.slug}/cover.${ext}`;
    const { error } = await supabase.storage.from("blog-images").upload(path, file, { upsert: true });
    if (error) { toast({ title: "Ошибка загрузки", description: error.message, variant: "destructive" }); setUploading(false); return; }
    const { data: urlData } = supabase.storage.from("blog-images").getPublicUrl(path);
    setForm((f) => ({ ...f, cover_image: urlData.publicUrl }));
    toast({ title: "Обложка загружена" });
    setUploading(false);
  };

  const handleImageUpload = async (file: File) => {
    if (!form.slug) { toast({ title: "Сначала укажите slug", variant: "destructive" }); return; }
    setUploading(true);
    const path = `${form.slug}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("blog-images").upload(path, file);
    if (error) { toast({ title: "Ошибка загрузки", description: error.message, variant: "destructive" }); setUploading(false); return; }
    const { data: urlData } = supabase.storage.from("blog-images").getPublicUrl(path);
    await navigator.clipboard.writeText(`![](${urlData.publicUrl})`);
    toast({ title: "URL скопирован", description: "Вставьте в контент статьи через Ctrl+V" });
    setUploading(false);
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) { toast({ title: "Заполните заголовок и slug", variant: "destructive" }); return; }
    try {
      const payload = { title: form.title, slug: form.slug, description: form.description, content: form.content, date: form.date, published: form.published, cover_image: form.cover_image || null };
      if (editing) { await updatePost(editing, payload); toast({ title: "Статья обновлена" }); }
      else { await addPost(payload); toast({ title: "Статья добавлена" }); }
      resetForm();
    } catch (err: any) { toast({ title: "Ошибка", description: err.message, variant: "destructive" }); }
  };

  const handleDelete = async (slug: string) => {
    try { await deletePost(slug); toast({ title: "Статья удалена" }); }
    catch (err: any) { toast({ title: "Ошибка удаления", description: err.message, variant: "destructive" }); }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Статьи блога</CardTitle>
          <Button size="sm" onClick={resetForm}><Plus className="mr-1 h-4 w-4" /> Новая</Button>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <p className="text-sm text-muted-foreground">Нет статей</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Заголовок</TableHead>
                  <TableHead className="w-28">Статус</TableHead>
                  <TableHead className="w-28">Дата</TableHead>
                  <TableHead className="w-24 text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((p) => (
                  <TableRow key={p.slug}>
                    <TableCell className="font-medium">{p.title}</TableCell>
                    <TableCell><Badge variant={p.published ? "default" : "secondary"}>{p.published ? "Опубликовано" : "Черновик"}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{p.date}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => startEdit(p)}><Pencil className="h-4 w-4" /></Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Удалить статью?</AlertDialogTitle>
                            <AlertDialogDescription>Статья «{p.title}» будет удалена без возможности восстановления.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(p.slug)}>Удалить</AlertDialogAction>
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
        <CardHeader><CardTitle>{editing ? "Редактировать статью" : "Новая статья"}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>Заголовок</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
          <div className="space-y-2"><Label>Slug (URL)</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} disabled={!!editing} /></div>
          <div className="space-y-2"><Label>Описание</Label><Textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <div className="space-y-2"><Label>Дата</Label><Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
          <div className="flex items-center gap-3">
            <Switch checked={form.published} onCheckedChange={(checked) => setForm({ ...form, published: checked })} />
            <Label>Опубликовано</Label>
          </div>
          <div className="space-y-2">
            <Label>Обложка</Label>
            {form.cover_image && <img src={form.cover_image} alt="Обложка" className="h-32 w-full rounded-lg object-cover" />}
            <Input type="file" accept="image/*" disabled={uploading} onChange={(e) => { const file = e.target.files?.[0]; if (file) handleCoverUpload(file); }} />
          </div>
          <div className="space-y-2"><Label>Контент (Markdown)</Label><Textarea rows={10} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} /></div>
          <div className="space-y-2">
            <Label>Загрузить изображение в статью</Label>
            <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleImageUpload(file); }} />
            <Button variant="outline" size="sm" disabled={uploading} onClick={() => fileInputRef.current?.click()}>
              <Upload className="mr-1 h-4 w-4" />{uploading ? "Загрузка..." : "Загрузить и скопировать URL"}
            </Button>
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
