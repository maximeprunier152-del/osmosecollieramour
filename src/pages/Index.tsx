import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Shop } from "@/components/Shop";
import Problem from "@/components/Problem";
import Product from "@/components/Product";
import Pricing from "@/components/Pricing";

// Lazy load components below the fold
const CustomerReviews = lazy(() => import("@/components/CustomerReviews"));
const Emotion = lazy(() => import("@/components/Emotion"));
const Lifestyle = lazy(() => import("@/components/Lifestyle"));
const FAQ = lazy(() => import("@/components/FAQ"));
const Guarantee = lazy(() => import("@/components/Guarantee"));
const Newsletter = lazy(() => import("@/components/Newsletter"));
const CTA = lazy(() => import("@/components/CTA"));
const Footer = lazy(() => import("@/components/Footer"));

import { OrganizationStructuredData, WebsiteStructuredData, FAQStructuredData } from "@/components/SEOStructuredData";

// Simple loading placeholder
const SectionLoader = () => (
  <div className="py-16 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

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
      
      <Suspense fallback={<SectionLoader />}>
        <CustomerReviews />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Emotion />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Lifestyle />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <FAQ />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Guarantee />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Newsletter />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <CTA />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
