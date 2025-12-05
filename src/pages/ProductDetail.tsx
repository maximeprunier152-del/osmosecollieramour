import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Share2, Sparkles, Package, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductReviews from "@/components/ProductReviews";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const products = await fetchProducts(50);
        const foundProduct = products.find((p) => p.node.handle === handle);
        
        if (foundProduct) {
          setProduct(foundProduct);
          const firstVariant = foundProduct.node.variants.edges[0]?.node;
          if (firstVariant) {
            setSelectedVariant(firstVariant);
          }
          const firstImage = foundProduct.node.images.edges[0]?.node.url;
          if (firstImage) {
            setSelectedImage(firstImage);
          }
        }
      } catch (error) {
        console.error("Error loading product:", error);
        toast.error("Erreur lors du chargement du produit");
      } finally {
        setLoading(false);
      }
    };

    if (handle) {
      loadProduct();
    }
  }, [handle]);

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    const cartItem = {
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    };

    addItem(cartItem);
    toast.success("Ajouté au panier", {
      description: `${product.node.title} - ${selectedVariant.title}`,
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.node.title || "SP-Osmose",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Lien copié dans le presse-papier");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-display">Produit non trouvé</h1>
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const images = product.node.images.edges.map((edge) => edge.node);
  const options = product.node.options;
  const variants = product.node.variants.edges.map((edge) => edge.node);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-24 md:py-32">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la boutique
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-secondary/20 rounded-3xl overflow-hidden transition-all duration-300 [filter:drop-shadow(0_0_30px_rgba(218,179,140,0.4))] hover:[filter:drop-shadow(0_0_45px_rgba(218,179,140,0.6))]">
              <img
                src={selectedImage || images[0]?.url}
                alt={product.node.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Gallery - Only show actual images */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image.url)}
                    className={`aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
                      selectedImage === image.url
                        ? "[filter:drop-shadow(0_0_20px_rgba(16,121,91,0.5))]"
                        : "[filter:drop-shadow(0_0_10px_rgba(218,179,140,0.3))] hover:[filter:drop-shadow(0_0_20px_rgba(218,179,140,0.5))]"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.altText || `${product.node.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-4 bg-emerald/10 text-emerald border-emerald/20">
                SP-Osmose Collection
              </Badge>
              <h1 className="text-4xl md:text-5xl tracking-wide font-display mb-4">
                {product.node.title}
              </h1>
              
              {/* Social Proof - Reviews */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-[#FFD700]"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(4.9/5 - Avis vérifiés)</span>
              </div>
              
              {/* Price with Promotion */}
              <div className="flex items-center gap-3">
                <span className="text-lg text-muted-foreground line-through">
                  30€
                </span>
                <span className="text-3xl font-bold text-primary">
                  15€
                </span>
                <span className="text-sm text-muted-foreground">TTC</span>
                <Badge className="bg-primary/90 text-primary-foreground text-xs">
                  -50%
                </Badge>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.node.description}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {selectedVariant?.availableForSale
                  ? "Ajouter au panier"
                  : "Rupture de stock"}
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={handleShare}
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Product Details */}
            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Diffusion longue durée</p>
                  <p className="text-sm text-muted-foreground">
                    Votre parfum diffuse jusqu'à 48 heures
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Qualité premium</p>
                  <p className="text-sm text-muted-foreground">
                    Fabriqué avec soin et attention aux détails
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Livraison sécurisée</p>
                  <p className="text-sm text-muted-foreground">
                    Emballage soigné et expédition rapide
                  </p>
                </div>
              </div>
            </div>

            {/* Usage Guide */}
            <div className="border-t border-border pt-6 space-y-4">
              <h3 className="text-lg font-semibold">Utilisation simple en 3 étapes</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 bg-emerald/10 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-emerald" />
                  </div>
                  <p className="text-sm font-medium">1. Ouvrez le médaillon</p>
                </div>
                
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 bg-emerald/10 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-emerald" />
                  </div>
                  <p className="text-sm font-medium">2. Vaporisez le parfum</p>
                </div>
                
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 bg-emerald/10 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-emerald" />
                  </div>
                  <p className="text-sm font-medium">3. Profitez 48h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {handle && <ProductReviews productHandle={handle} />}

      <Footer />
    </div>
  );
};

export default ProductDetail;
