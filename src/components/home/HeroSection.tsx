import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShaderBackground from "@/components/ui/shader-background";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Shader background covering the whole section */}
      <div className="absolute inset-0 z-0">
        <ShaderBackground className="block h-full w-full" />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/40 md:from-background/85 md:via-background/55 md:to-background/20" />
      </div>

      <div className="container relative z-10 flex min-h-[85vh] items-center py-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            Онлайн-курсы на Stepik
          </span>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Освойте новые навыки.{" "}
            <span className="text-primary">Продвиньте карьеру.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            От Excel до веб-разработки и цифрового маркетинга — практические курсы для реальных результатов.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <a href="#courses">
                Смотреть курсы <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/contact">Связаться</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
