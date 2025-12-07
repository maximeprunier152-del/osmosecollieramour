import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductStructuredData } from "./SEOStructuredData";

export const Shop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        // Filter out packs - only show individual lockets
        const filteredProducts = data.filter(p => 
          !p.node.title.toLowerCase().includes('pack')
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0].node;
    
    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Produit ajouté au panier", {
      description: product.node.title,
    });
  };

  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-background" id="shop">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Notre Collection</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos médaillons parfumés élégants
            </p>
          </div>
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-12 md:py-16 bg-background" id="shop">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Notre Collection</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos médaillons parfumés élégants
            </p>
          </div>
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-6">Aucun produit disponible pour le moment</p>
            <p className="text-sm text-muted-foreground">
              Les produits seront bientôt ajoutés à notre collection.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16" id="shop">
      {/* JSON-LD Structured Data for SEO */}
      <ProductStructuredData products={products} />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary font-semibold text-sm px-4 py-2 rounded-full mb-4">
            🔥 Offre Black Friday : -50% sur tous les médaillons
          </span>
          <h2 className="font-display text-4xl md:text-5xl tracking-wide font-bold text-foreground mb-4">Notre Collection</h2>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {products.map((product) => {
                const variant = product.node.variants.edges[0].node;
                const image = product.node.images.edges[0]?.node;
                
                return (
                  <CarouselItem key={product.node.id} className="pl-2 md:pl-4 basis-1/2 lg:basis-1/3">
                    <div className="group bg-white/80 backdrop-blur-md rounded-xl md:rounded-2xl overflow-hidden border border-white/50 hover:border-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(52,127,99,0.4)]">
                      <Link to={`/product/${product.node.handle}`}>
                        {image && (
                          <div className="aspect-square overflow-hidden bg-secondary/20 transition-all duration-300 [filter:drop-shadow(0_0_25px_rgba(218,179,140,0.35))] group-hover:[filter:drop-shadow(0_0_40px_rgba(218,179,140,0.55))]">
                            <img
                              src={image.url}
                              alt={image.altText || product.node.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        )}
                      </Link>
                      
                      <div className="p-3 md:p-6">
                        <Link to={`/product/${product.node.handle}`}>
                          <h3 className="text-sm md:text-xl font-semibold mb-1 md:mb-2 hover:text-primary transition-colors line-clamp-2">
                            {product.node.title}
                          </h3>
                        </Link>
                        
                        <p className="hidden md:block text-body-text text-sm mb-4 line-clamp-2">
                          {product.node.description}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-1 md:gap-3 mb-2 md:mb-4">
                          <span className="text-xs md:text-lg text-muted-foreground line-through">
                            30€
                          </span>
                          <span className="text-base md:text-2xl font-bold text-primary">
                            {parseFloat(variant.price.amount).toFixed(0)}€
                          </span>
                          <span className="bg-primary/90 text-primary-foreground text-[10px] md:text-xs font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded-full">
                            -50%
                          </span>
                        </div>
                        
                        <Button 
                          onClick={() => handleAddToCart(product)}
                          className="w-full rounded-full text-xs md:text-sm py-2 md:py-2.5 bg-gradient-to-r from-[#347f63] to-[#2d6b54] hover:from-[#2d6b54] hover:to-[#347f63] shadow-lg hover:shadow-[0_8px_30px_rgba(52,127,99,0.5)] transition-all duration-300"
                          disabled={!variant.availableForSale}
                        >
                          {variant.availableForSale ? "Ajouter" : "Rupture"}
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-0 h-8 w-8 md:h-10 md:w-10 rounded-full bg-white/90 backdrop-blur-md border-white/50 hover:bg-white shadow-lg disabled:opacity-0 disabled:pointer-events-none transition-opacity duration-300" />
            <CarouselNext className="right-0 h-8 w-8 md:h-10 md:w-10 rounded-full bg-white/90 backdrop-blur-md border-white/50 hover:bg-white shadow-lg disabled:opacity-0 disabled:pointer-events-none transition-opacity duration-300" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};
