import { motion } from "framer-motion";
import { Zap, Users, Award, Clock } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Практические навыки",
    description: "Каждый урок построен на реальных проектах и сразу применимых знаниях.",
  },
  {
    icon: Users,
    title: "Поддержка сообщества",
    description: "Присоединяйтесь к сообществу мотивированных студентов. Получайте ответы и делитесь прогрессом.",
  },
  {
    icon: Award,
    title: "Сертификат по итогам",
    description: "Получите сертификат после завершения и продемонстрируйте навыки работодателям.",
  },
  {
    icon: Clock,
    title: "Учитесь в своём темпе",
    description: "Бессрочный доступ ко всем материалам. Учитесь когда и где удобно.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="border-y border-border/50 bg-card py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Почему учиться у нас?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Курсы от практикующего специалиста с многолетним опытом преподавания.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
  );
};

export default BenefitsSection;
