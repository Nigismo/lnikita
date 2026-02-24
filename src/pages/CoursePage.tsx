import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Star, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getCourseBySlug } from "@/data/courses";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const CoursePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const course = slug ? getCourseBySlug(slug) : undefined;

  if (!course) return <Navigate to="/404" replace />;

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/50 py-24 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container relative">
            <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <course.icon className="h-8 w-8" />
              </div>
              <h1 className="font-display text-4xl font-bold sm:text-5xl">
                {course.title}
              </h1>
              <p className="mt-3 font-display text-xl text-muted-foreground">
                {course.tagline}
              </p>
              <p className="mx-auto mt-6 max-w-2xl text-muted-foreground leading-relaxed">
                {course.description}
              </p>
              <div className="mt-8">
                <Button asChild size="lg">
                  <a href={course.link} target="_blank" rel="noopener noreferrer">
                    Enroll on Stepik <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-24">
          <div className="container">
            <motion.h2
              {...fadeUp}
              className="mb-14 text-center font-display text-3xl font-bold sm:text-4xl"
            >
              {course.slug === "telegram-smm"
                ? "Почему этот курс эффективен?"
                : "Why This Course?"}
            </motion.h2>
            <div className={`grid gap-8 sm:grid-cols-2 ${course.benefits.length > 4 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
              {course.benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  {...fadeUp}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <b.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="border-y border-border/50 bg-card py-24">
          <div className="container max-w-3xl">
            <motion.h2
              {...fadeUp}
              className="mb-14 text-center font-display text-3xl font-bold sm:text-4xl"
            >
              {course.slug === "telegram-smm" ? "Для кого этот курс" : "Who Is This For?"}
            </motion.h2>
            <div className="space-y-6">
              {course.audience.map((a, i) => (
                <motion.div
                  key={a.title}
                  {...fadeUp}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-4"
                >
                  <span className="mt-0.5 text-xl">{a.emoji}</span>
                  <div>
                    <h3 className="font-display font-semibold">{a.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{a.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-24">
          <div className="container max-w-3xl">
            <motion.h2
              {...fadeUp}
              className="mb-10 text-center font-display text-3xl font-bold sm:text-4xl"
            >
              {course.slug === "telegram-smm" ? "Начальные требования" : "Requirements"}
            </motion.h2>
            <motion.ul {...fadeUp} className="space-y-4">
              {course.requirements.map((r, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{r}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </section>

        {/* Curriculum */}
        <section className="border-y border-border/50 bg-card py-24">
          <div className="container max-w-3xl">
            <motion.h2
              {...fadeUp}
              className="mb-14 text-center font-display text-3xl font-bold sm:text-4xl"
            >
              {course.slug === "telegram-smm" ? "Программа курса" : "Curriculum"}
            </motion.h2>
            <motion.div {...fadeUp}>
              <Accordion type="single" collapsible className="w-full">
                {course.curriculum.map((mod, i) => (
                  <AccordionItem key={i} value={`mod-${i}`} className="border-border/50">
                    <AccordionTrigger className="text-left font-display text-base font-medium hover:no-underline hover:text-primary">
                      {mod.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 pl-1">
                        {mod.topics.map((t, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24">
          <div className="container">
            <motion.h2
              {...fadeUp}
              className="mb-14 text-center font-display text-3xl font-bold sm:text-4xl"
            >
              {course.slug === "telegram-smm" ? "Отзывы студентов" : "What Students Say"}
            </motion.h2>
            <div className="grid gap-6 md:grid-cols-3">
              {course.testimonials.map((t, i) => (
                <motion.div key={t.name} {...fadeUp} transition={{ delay: i * 0.15 }}>
                  <Card className="h-full border-border/50 bg-card">
                    <CardContent className="pt-6">
                      <div className="mb-3 flex gap-0.5">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
                      <div className="mt-4 border-t border-border/50 pt-4">
                        <p className="text-sm font-semibold">{t.name}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border/50 bg-card py-24">
          <div className="container max-w-3xl">
            <motion.h2
              {...fadeUp}
              className="mb-14 text-center font-display text-3xl font-bold sm:text-4xl"
            >
              {course.slug === "telegram-smm" ? "Часто задаваемые вопросы" : "FAQ"}
            </motion.h2>
            <motion.div {...fadeUp}>
              <Accordion type="single" collapsible className="w-full">
                {course.faq.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-border/50">
                    <AccordionTrigger className="text-left font-display text-base font-medium hover:no-underline hover:text-primary">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24">
          <div className="container">
            <motion.div
              {...fadeUp}
              className="mx-auto max-w-2xl rounded-2xl border border-border/50 bg-card p-10 text-center shadow-lg shadow-primary/5"
            >
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                {course.slug === "telegram-smm"
                  ? "Готовы начать?"
                  : "Ready to Get Started?"}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {course.slug === "telegram-smm"
                  ? "Присоединяйтесь к курсу и начните продвигать свой Telegram-канал уже сегодня."
                  : `Enroll in ${course.title} today and start building real skills.`}
              </p>
              <div className="mt-8">
                <Button asChild size="lg">
                  <a href={course.link} target="_blank" rel="noopener noreferrer">
                    Enroll on Stepik <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CoursePage;
