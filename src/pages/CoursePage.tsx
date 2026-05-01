import { useEffect } from "react";
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
import { useCourses } from "@/hooks/useCourses";
import { getIconByName } from "@/lib/icons";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { SITE_URL } from "@/lib/site";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const CoursePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { courses, isLoading } = useCourses();
  const course = courses.find((c) => c.slug === slug);

  const seoTitle = course
    ? `${course.title} — онлайн-курс | EduPro`.slice(0, 60)
    : "Курс | EduPro";
  const seoDescription = course
    ? (course.tagline ? `${course.tagline}. ` : "") + course.description
    : undefined;
  const trimmedDescription = seoDescription
    ? seoDescription.length > 158
      ? seoDescription.slice(0, 155).trimEnd() + "…"
      : seoDescription
    : undefined;
  const coursePath = course ? `/courses/${course.slug}` : undefined;
  const canonicalUrl = coursePath ? `${SITE_URL}${coursePath}` : undefined;

  // Mark page as noindex while course is loading or when slug doesn't match
  // any course (avoids indexing empty/404-bound pages).
  const shouldNoindex = isLoading || !course;

  useDocumentMeta({
    title: shouldNoindex ? "Курс не найден | EduPro" : seoTitle,
    description: trimmedDescription,
    path: coursePath,
    noindex: shouldNoindex,
  });

  // JSON-LD structured data for the course (canonical handled by useDocumentMeta)
  useEffect(() => {
    if (!course || !canonicalUrl) return;

    const ldId = "course-jsonld";
    let ld = document.getElementById(ldId) as HTMLScriptElement | null;
    if (!ld) {
      ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.id = ldId;
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Course",
      name: course.title,
      description: trimmedDescription,
      url: canonicalUrl,
      inLanguage: "ru",
      provider: {
        "@type": "Organization",
        name: "EduPro",
        sameAs: SITE_URL,
      },
      hasCourseInstance: course.link
        ? {
            "@type": "CourseInstance",
            courseMode: "online",
            url: course.link,
          }
        : undefined,
    });

    return () => {
      const existing = document.getElementById(ldId);
      if (existing) existing.remove();
    };
  }, [course, canonicalUrl, trimmedDescription]);


  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="flex-1 container py-20 text-center"><p className="text-muted-foreground">Загрузка...</p></main>
        <Footer />
      </div>
    );
  }

  if (!course) return <Navigate to="/404" replace />;

  const CourseIcon = getIconByName(course.icon_name);

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
                <CourseIcon className="h-8 w-8" />
              </div>
              <h1 className="font-display text-4xl font-bold sm:text-5xl">{course.title}</h1>
              <p className="mt-3 font-display text-xl text-muted-foreground">{course.tagline}</p>
              <p className="mx-auto mt-6 max-w-2xl text-muted-foreground leading-relaxed">{course.description}</p>
              <div className="mt-8">
                <Button asChild size="lg">
                  <a href={course.link} target="_blank" rel="noopener noreferrer">
                    Записаться на Stepik <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        {course.benefits.length > 0 && (
          <section className="py-24">
            <div className="container">
              <motion.h2 {...fadeUp} className="mb-14 text-center font-display text-3xl font-bold sm:text-4xl">
                Почему этот курс?
              </motion.h2>
              <div className={`grid gap-8 sm:grid-cols-2 ${course.benefits.length > 4 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
                {course.benefits.map((b, i) => {
                  const BIcon = getIconByName(b.icon);
                  return (
                    <motion.div key={b.title} {...fadeUp} transition={{ delay: i * 0.1 }} className="text-center">
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <BIcon className="h-7 w-7" />
                      </div>
                      <h3 className="font-display text-lg font-semibold">{b.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{b.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Target Audience */}
        {course.audience.length > 0 && (
          <section className="border-y border-border/50 bg-card py-24">
            <div className="container max-w-3xl">
              <motion.h2 {...fadeUp} className="mb-14 text-center font-display text-3xl font-bold sm:text-4xl">
                Для кого этот курс
              </motion.h2>
              <div className="space-y-6">
                {course.audience.map((a, i) => (
                  <motion.div key={a.title} {...fadeUp} transition={{ delay: i * 0.08 }} className="flex gap-4">
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
        )}

        {/* Requirements */}
        {course.requirements.length > 0 && (
          <section className="py-24">
            <div className="container max-w-3xl">
              <motion.h2 {...fadeUp} className="mb-10 text-center font-display text-3xl font-bold sm:text-4xl">
                Начальные требования
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
        )}

        {/* Curriculum */}
        {course.curriculum.length > 0 && (
          <section className="border-y border-border/50 bg-card py-24">
            <div className="container max-w-3xl">
              <motion.h2 {...fadeUp} className="mb-14 text-center font-display text-3xl font-bold sm:text-4xl">
                Программа курса
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
        )}

        {/* Testimonials */}
        {course.course_testimonials.length > 0 && (
          <section className="py-24">
            <div className="container">
              <motion.h2 {...fadeUp} className="mb-14 text-center font-display text-3xl font-bold sm:text-4xl">
                Отзывы студентов
              </motion.h2>
              <div className="grid gap-6 md:grid-cols-3">
                {course.course_testimonials.map((t, i) => (
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
        )}

        {/* FAQ */}
        {course.course_faq.length > 0 && (
          <section className="border-t border-border/50 bg-card py-24">
            <div className="container max-w-3xl">
              <motion.h2 {...fadeUp} className="mb-14 text-center font-display text-3xl font-bold sm:text-4xl">
                Часто задаваемые вопросы
              </motion.h2>
              <motion.div {...fadeUp}>
                <Accordion type="single" collapsible className="w-full">
                  {course.course_faq.map((f, i) => (
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
        )}

        {/* Bottom CTA */}
        <section className="py-24">
          <div className="container">
            <motion.div
              {...fadeUp}
              className="mx-auto max-w-2xl rounded-2xl border border-border/50 bg-card p-10 text-center shadow-lg shadow-primary/5"
            >
              <h2 className="font-display text-2xl font-bold sm:text-3xl">Готовы начать?</h2>
              <p className="mt-3 text-muted-foreground">
                Запишитесь на курс «{course.title}» и начните развивать навыки уже сегодня.
              </p>
              <div className="mt-8">
                <Button asChild size="lg">
                  <a href={course.link} target="_blank" rel="noopener noreferrer">
                    Записаться на Stepik <ArrowUpRight className="ml-2 h-4 w-4" />
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
