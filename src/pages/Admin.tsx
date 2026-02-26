import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut } from "lucide-react";
import { toast } from "@/hooks/use-toast";

import type { Session } from "@supabase/supabase-js";
import AdminBlogTab from "@/components/admin/AdminBlogTab";
import AdminCoursesTab from "@/components/admin/AdminCoursesTab";
import AdminTestimonialsTab from "@/components/admin/AdminTestimonialsTab";
import AdminFAQTab from "@/components/admin/AdminFAQTab";

const Admin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
                if (error) toast({ title: "Ошибка входа", description: error.message, variant: "destructive" });
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

      <div className="container py-8">
        <Tabs defaultValue="blog">
          <TabsList className="mb-6">
            <TabsTrigger value="blog">Блог</TabsTrigger>
            <TabsTrigger value="courses">Курсы</TabsTrigger>
            <TabsTrigger value="testimonials">Отзывы</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          <TabsContent value="blog"><AdminBlogTab /></TabsContent>
          <TabsContent value="courses"><AdminCoursesTab /></TabsContent>
          <TabsContent value="testimonials"><AdminTestimonialsTab /></TabsContent>
          <TabsContent value="faq"><AdminFAQTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
