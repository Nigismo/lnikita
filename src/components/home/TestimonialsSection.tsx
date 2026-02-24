import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Daniil",
    text: "лучшие для новичков",
    rating: 5,
  },
  {
    name: "Анастасия",
    text: "все понравилось.",
    rating: 5,
  },
  {
    name: "Andrey Tarasov",
    text: "Если вы только начинаете работать с Telegram или хотите оживить свой канал — очень рекомендую этот курс. Всё объяснено простым языком, есть задания и шаблоны, которые экономят время. Я получил не только знания, но и конкретные инструменты, которые уже приносят результат.",
    rating: 5,
  },
  {
    name: "Ольга Бабаева",
    text: "Научилась тому, что стоит в названии курса. Доступно и понятно. А главное, полезно. Курс рекомендовали. Не разочаровалась",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Отзывы студентов
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Реальные отзывы от студентов, прошедших наши курсы на Stepik.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
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
  );
};

export default TestimonialsSection;
