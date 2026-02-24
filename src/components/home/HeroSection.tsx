import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SplineScene from "@/components/SplineScene";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="container grid min-h-[85vh] items-center gap-8 py-20 lg:grid-cols-2">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
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

        {/* 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden h-[500px] lg:block"
        >
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="h-full w-full"
          />
        </motion.div>
      </div>

      {/* Gradient backdrop */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
    </section>
  );
};

export default HeroSection;
