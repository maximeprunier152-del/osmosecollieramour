import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Product from "@/components/Product";
import { Shop } from "@/components/Shop";
import Emotion from "@/components/Emotion";
import Lifestyle from "@/components/Lifestyle";
import CustomerReviews from "@/components/CustomerReviews";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Guarantee from "@/components/Guarantee";
import Newsletter from "@/components/Newsletter";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

import { OrganizationStructuredData, WebsiteStructuredData, FAQStructuredData } from "@/components/SEOStructuredData";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* SEO Structured Data */}
      <OrganizationStructuredData />
      <WebsiteStructuredData />
      <FAQStructuredData />
      
      
      <Header />
      <Hero />
      <Shop />
      <Problem />
      <Product />
      <Pricing />
      <CustomerReviews />
      <Emotion />
      <Lifestyle />
      <FAQ />
      <Guarantee />
      <Newsletter />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
