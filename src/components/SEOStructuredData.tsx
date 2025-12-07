import { ShopifyProduct } from "@/lib/shopify";

interface ProductStructuredDataProps {
  products: ShopifyProduct[];
}

export const ProductStructuredData = ({ products }: ProductStructuredDataProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.node.title,
        "description": product.node.description,
        "image": product.node.images.edges[0]?.node.url,
        "url": `https://sp-osmose.lovable.app/product/${product.node.handle}`,
        "brand": {
          "@type": "Brand",
          "name": "SP-Osmose"
        },
        "offers": {
          "@type": "Offer",
          "price": parseFloat(product.node.variants.edges[0]?.node.price.amount || "15"),
          "priceCurrency": "EUR",
          "availability": product.node.variants.edges[0]?.node.availableForSale 
            ? "https://schema.org/InStock" 
            : "https://schema.org/OutOfStock",
          "seller": {
            "@type": "Organization",
            "name": "SP-Osmose"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.5",
          "reviewCount": "127"
        }
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

interface OrganizationStructuredDataProps {
  className?: string;
}

export const OrganizationStructuredData = ({ className }: OrganizationStructuredDataProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SP-Osmose",
    "url": "https://sp-osmose.lovable.app",
    "logo": "https://sp-osmose.lovable.app/osmose-logo-new.png",
    "description": "Colliers-médaillons diffuseurs de parfum. Des bijoux qui portent l'âme d'un parfum.",
    "sameAs": [],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "contact@sp-osmose.com"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export const WebsiteStructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SP-Osmose",
    "url": "https://sp-osmose.lovable.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://sp-osmose.lovable.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export const FAQStructuredData = () => {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Combien de temps dure le parfum dans le médaillon ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le parfum dure environ 48 heures sur le disque absorbant à l'intérieur du médaillon."
        }
      },
      {
        "@type": "Question",
        "name": "Comment utiliser le médaillon diffuseur ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ouvrez le médaillon, vaporisez votre parfum préféré sur le disque absorbant, puis refermez. Profitez de votre fragrance pendant 48h."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle est la matière du médaillon ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nos médaillons sont en acier inoxydable de haute qualité, disponibles en Or, Argent et Or Rose."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  );
};
