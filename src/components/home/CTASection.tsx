import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-12 text-center md:p-20"
        >
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Готовы начать обучение?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Присоединяйтесь к тысячам студентов, которые уже продвинули свою карьеру. Выберите курс и начните сегодня.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <a href="#courses">
                Смотреть курсы <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/contact">Связаться</a>
            </Button>
          </div>

          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/10 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-primary/5 blur-[80px]" />
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
