import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Нужен ли опыт для прохождения курсов?",
    a: "Нет! Все курсы рассчитаны на начинающих. Мы начинаем с основ и постепенно переходим к продвинутым темам.",
  },
  {
    q: "Как долго доступен курс?",
    a: "Доступ бессрочный. После записи вы можете проходить материалы в любое время и в своём темпе.",
  },
  {
    q: "Получу ли я сертификат?",
    a: "Да, после завершения курса на Stepik вы получите сертификат, которым можно поделиться в LinkedIn или с работодателями.",
  },
  {
    q: "Можно ли вернуть деньги?",
    a: "Stepik предоставляет возврат в течение 14 дней после покупки.",
  },
  {
    q: "Как связаться с преподавателем?",
    a: "Вы можете написать через страницу контактов на этом сайте или через систему сообщений Stepik.",
  },
];

const FAQSection = () => {
  return (
    <section className="border-t border-border/50 bg-card py-24">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Часто задаваемые вопросы
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border/50">
                <AccordionTrigger className="text-left font-display text-base font-medium hover:no-underline hover:text-primary">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
