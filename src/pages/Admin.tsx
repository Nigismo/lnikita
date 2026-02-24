import { useState } from "react";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { BlogPost } from "@/data/blog-posts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Plus, LogOut } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ADMIN_PASSWORD = "edupro2024";

const Admin = () => {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("edupro-admin") === "1");
  const [password, setPassword] = useState("");
  const { posts, addPost, updatePost, deletePost, refresh } = useBlogPosts();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", description: "", content: "", date: "" });

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="w-full max-w-sm">
          <CardHeader><CardTitle>Вход в админ-панель</CardTitle></CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (password === ADMIN_PASSWORD) {
                  sessionStorage.setItem("edupro-admin", "1");
                  setAuthed(true);
                } else {
                  toast({ title: "Неверный пароль", variant: "destructive" });
                }
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="pwd">Пароль</Label>
                <Input id="pwd" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button type="submit" className="w-full">Войти</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const resetForm = () => {
    setForm({ title: "", slug: "", description: "", content: "", date: new Date().toISOString().slice(0, 10) });
    setEditing(null);
  };

  const startEdit = (post: BlogPost) => {
    setEditing(post.slug);
    setForm({ title: post.title, slug: post.slug, description: post.description, content: post.content, date: post.date });
  };

  const handleSave = () => {
    if (!form.title || !form.slug) {
      toast({ title: "Заполните заголовок и slug", variant: "destructive" });
      return;
    }
    if (editing) {
      updatePost(editing, form);
      toast({ title: "Статья обновлена" });
    } else {
      addPost(form as BlogPost);
      toast({ title: "Статья добавлена" });
    }
    resetForm();
    refresh();
  };

  const handleDelete = (slug: string) => {
    deletePost(slug);
    toast({ title: "Статья удалена" });
    refresh();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card">
        <div className="container flex h-14 items-center justify-between">
          <h1 className="font-display text-lg font-bold"><span className="text-primary">Edu</span>Pro Админ</h1>
          <Button variant="ghost" size="sm" onClick={() => { sessionStorage.removeItem("edupro-admin"); setAuthed(false); }}>
            <LogOut className="mr-1 h-4 w-4" /> Выйти
          </Button>
        </div>
      </header>

      <div className="container grid gap-8 py-8 lg:grid-cols-[1fr_380px]">
        {/* Posts list */}
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
                    <TableHead className="w-28">Дата</TableHead>
                    <TableHead className="w-24 text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((p) => (
                    <TableRow key={p.slug}>
                      <TableCell className="font-medium">{p.title}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => startEdit(p)}><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(p.slug)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Editor */}
        <Card>
          <CardHeader>
            <CardTitle>{editing ? "Редактировать статью" : "Новая статья"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Заголовок</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Slug (URL)</Label>
              <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} disabled={!!editing} />
            </div>
            <div className="space-y-2">
              <Label>Описание</Label>
              <Textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Дата</Label>
              <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Контент (Markdown)</Label>
              <Textarea rows={10} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex-1">{editing ? "Сохранить" : "Добавить"}</Button>
              {editing && <Button variant="outline" onClick={resetForm}>Отмена</Button>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
