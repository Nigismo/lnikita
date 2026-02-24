import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container py-20 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Контакты
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Свяжитесь со мной в Telegram — отвечу на вопросы по курсам, сотрудничеству или любым другим темам.
          </p>

          <div className="mx-auto mt-10 max-w-md rounded-xl border border-border/50 bg-card p-8 shadow-sm">
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold">Telegram</h2>
                <p className="mt-1 text-muted-foreground">@nigismo</p>
              </div>
              <Button asChild size="lg" className="mt-2 gap-2">
                <a href="https://t.me/nigismo" target="_blank" rel="noopener noreferrer">
                  <Send className="h-4 w-4" />
                  Написать в Telegram
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
