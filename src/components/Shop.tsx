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
      <section className="py-24 bg-background" id="shop">
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
      <section className="py-24 bg-background" id="shop">
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
    <section className="py-24 bg-gradient-to-b from-background to-muted/20" id="shop">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl tracking-wide font-bold text-foreground mb-4">Notre Collection</h2>
        </div>
        
        <div className="max-w-7xl mx-auto px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {products.map((product) => {
                const variant = product.node.variants.edges[0].node;
                const image = product.node.images.edges[0]?.node;
                
                return (
                  <CarouselItem key={product.node.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="group bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden border border-white/50 hover:border-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(52,127,99,0.4)]">
                      <Link to={`/product/${product.node.handle}`}>
                        {image && (
                          <div className="aspect-square overflow-hidden bg-secondary/20 transition-all duration-300 [filter:drop-shadow(0_0_25px_rgba(218,179,140,0.35))] group-hover:[filter:drop-shadow(0_0_40px_rgba(218,179,140,0.55))]">
                            <img
                              src={image.url}
                              alt={image.altText || product.node.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                      </Link>
                      
                      <div className="p-6">
                        <Link to={`/product/${product.node.handle}`}>
                          <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                            {product.node.title}
                          </h3>
                        </Link>
                        
                        {product.node.description && (
                          <p className="text-body-text text-sm mb-4 line-clamp-2">
                            {product.node.description}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-bold">
                            {parseFloat(variant.price.amount).toFixed(2).replace('.', ',')} EUR
                          </span>
                        </div>
                        
                        <Button 
                          onClick={() => handleAddToCart(product)}
                          className="w-full rounded-full bg-gradient-to-r from-[#347f63] to-[#2d6b54] hover:from-[#2d6b54] hover:to-[#347f63] shadow-lg hover:shadow-[0_8px_30px_rgba(52,127,99,0.5)] transition-all duration-300"
                          disabled={!variant.availableForSale}
                        >
                          {variant.availableForSale ? "Ajouter au panier" : "Rupture de stock"}
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-0 h-12 w-12 rounded-full bg-white/90 backdrop-blur-md border-white/50 hover:bg-white shadow-lg" />
            <CarouselNext className="right-0 h-12 w-12 rounded-full bg-white/90 backdrop-blur-md border-white/50 hover:bg-white shadow-lg" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};
