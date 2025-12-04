import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Product from "@/components/Product";
import { Shop } from "@/components/Shop";
import Emotion from "@/components/Emotion";
import Lifestyle from "@/components/Lifestyle";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Guarantee from "@/components/Guarantee";
import Newsletter from "@/components/Newsletter";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Shop />
      <Problem />
      <Product />
      <Emotion />
      <Lifestyle />
      <Pricing />
      <FAQ />
      <Guarantee />
      <Newsletter />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
