import { useEffect, useState } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

export const Shop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
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
    <section className="py-24 bg-background" id="shop">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Notre Collection</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos médaillons parfumés élégants
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const variant = product.node.variants.edges[0].node;
            const image = product.node.images.edges[0]?.node;
            
            return (
              <div
                key={product.node.id}
                className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-all duration-300 hover:shadow-lg"
              >
                {image && (
                  <div className="aspect-square overflow-hidden bg-secondary/20">
                    <img
                      src={image.url}
                      alt={image.altText || product.node.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.node.title}</h3>
                  
                  {product.node.description && (
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {product.node.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold">
                      {parseFloat(variant.price.amount).toFixed(2)} {variant.price.currencyCode}
                    </span>
                  </div>
                  
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full"
                    disabled={!variant.availableForSale}
                  >
                    {variant.availableForSale ? "Ajouter au panier" : "Rupture de stock"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
