import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Product from "@/components/Product";
import Emotion from "@/components/Emotion";
import Lifestyle from "@/components/Lifestyle";
import Guarantee from "@/components/Guarantee";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Problem />
      <Product />
      <Emotion />
      <Lifestyle />
      <Guarantee />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
