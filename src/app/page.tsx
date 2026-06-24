import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import DemoVideo from "@/components/DemoVideo";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Stats />
        <Features />
        <HowItWorks />
        <DemoVideo />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
