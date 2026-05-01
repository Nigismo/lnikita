import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import CourseCards from "@/components/home/CourseCards";
import BenefitsSection from "@/components/home/BenefitsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const Index = () => {
  useDocumentMeta({
    title: "EduPro — онлайн-курсы по Excel, веб-разработке, SMM и Яндекс Директ",
    description:
      "Практические онлайн-курсы по Excel, веб-разработке, Telegram SMM и Яндекс Директ 2026. Учитесь у Никиты Любавина и получайте востребованные цифровые навыки.",
    path: "/",
  });

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <CourseCards />
        <BenefitsSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
