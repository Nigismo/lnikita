import { useState, useEffect } from "react";
import { useBlogPosts, BlogPost } from "@/hooks/useBlogPosts";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Plus, LogOut } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { Session } from "@supabase/supabase-js";

const Admin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { posts, addPost, updatePost, deletePost } = useBlogPosts();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", description: "", content: "", date: "" });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-background"><p>Загрузка...</p></div>;
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="w-full max-w-sm">
          <CardHeader><CardTitle>Вход в админ-панель</CardTitle></CardHeader>
          <CardContent>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) {
                  toast({ title: "Ошибка входа", description: error.message, variant: "destructive" });
                }
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
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

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      toast({ title: "Заполните заголовок и slug", variant: "destructive" });
      return;
    }
    try {
      if (editing) {
        await updatePost(editing, form);
        toast({ title: "Статья обновлена" });
      } else {
        await addPost(form);
        toast({ title: "Статья добавлена" });
      }
      resetForm();
    } catch (err: any) {
      toast({ title: "Ошибка", description: err.message, variant: "destructive" });
    }
  };

  const handleDelete = async (slug: string) => {
    try {
      await deletePost(slug);
      toast({ title: "Статья удалена" });
    } catch (err: any) {
      toast({ title: "Ошибка удаления", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card">
        <div className="container flex h-14 items-center justify-between">
          <h1 className="font-display text-lg font-bold"><span className="text-primary">Edu</span>Pro Админ</h1>
          <Button variant="ghost" size="sm" onClick={() => supabase.auth.signOut()}>
            <LogOut className="mr-1 h-4 w-4" /> Выйти
          </Button>
        </div>
      </header>

      <div className="container grid gap-8 py-8 lg:grid-cols-[1fr_380px]">
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
