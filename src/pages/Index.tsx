import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import CourseCards from "@/components/home/CourseCards";
import BenefitsSection from "@/components/home/BenefitsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useFAQ } from "@/hooks/useFAQ";
import { SITE_URL } from "@/lib/site";

const Index = () => {
  const { faqs } = useFAQ();

  useDocumentMeta({
    title: "EduPro — онлайн-курсы по Excel, веб-разработке, SMM и Яндекс Директ",
    description:
      "Практические онлайн-курсы по Excel, веб-разработке, Telegram SMM и Яндекс Директ 2026. Учитесь у Никиты Любавина и получайте востребованные цифровые навыки.",
    path: "/",
  });

  // JSON-LD: WebSite + Organization + FAQPage
  useEffect(() => {
    const ldId = "index-jsonld";
    let ld = document.getElementById(ldId) as HTMLScriptElement | null;
    if (!ld) {
      ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.id = ldId;
      document.head.appendChild(ld);
    }

    const structuredData: Record<string, unknown>[] = [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "EduPro",
        url: SITE_URL,
        inLanguage: "ru",
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "EduPro",
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        sameAs: [
          "https://t.me/nigismo",
        ],
      },
    ];

    if (faqs.length > 0) {
      structuredData.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      });
    }

    ld.textContent = JSON.stringify(structuredData);

    return () => {
      const existing = document.getElementById(ldId);
      if (existing) existing.remove();
    };
  }, [faqs]);


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
