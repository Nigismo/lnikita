import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Do I need prior experience?",
    a: "No! All courses are designed for beginners. We start from the basics and gradually build up to advanced topics.",
  },
  {
    q: "How long do I have access to the course?",
    a: "You get lifetime access. Once enrolled, you can revisit the materials anytime at your own pace.",
  },
  {
    q: "Will I get a certificate?",
    a: "Yes, upon completing a course on Stepik you'll receive a certificate that you can share on LinkedIn or with employers.",
  },
  {
    q: "Can I get a refund?",
    a: "Stepik offers a refund policy within the first 14 days of enrollment if you're not satisfied with the course.",
  },
  {
    q: "How do I contact the instructor?",
    a: "You can reach out through the Contact page on this website or directly through Stepik's messaging system.",
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
            Frequently Asked Questions
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
