import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
          title: product?.node.title || "Osmose",
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
            <h1 className="text-3xl font-serif">Produit non trouvé</h1>
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
            <div className="aspect-square bg-secondary/20 rounded-2xl overflow-hidden">
              <img
                src={selectedImage || images[0]?.url}
                alt={product.node.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image.url)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === image.url
                        ? "border-primary"
                        : "border-transparent hover:border-border"
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
                Osmose Collection
              </Badge>
              <h1 className="text-4xl md:text-5xl font-serif mb-4">
                {product.node.title}
              </h1>
              <p className="text-2xl font-semibold text-emerald">
                {selectedVariant?.price.currencyCode === "EUR" ? "€" : "$"}
                {parseFloat(selectedVariant?.price.amount || "0").toFixed(2)}
              </p>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.node.description}
            </p>

            {/* Variants Selection */}
            {options.map((option) => (
              <div key={option.name} className="space-y-3">
                <label className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  {option.name}
                </label>
                <div className="flex flex-wrap gap-2">
                  {option.values.map((value) => {
                    const variant = variants.find((v) =>
                      v.selectedOptions.some(
                        (opt) => opt.name === option.name && opt.value === value
                      )
                    );
                    const isSelected = selectedVariant?.selectedOptions.some(
                      (opt) => opt.name === option.name && opt.value === value
                    );
                    const isAvailable = variant?.availableForSale;

                    return (
                      <Button
                        key={value}
                        variant={isSelected ? "default" : "outline"}
                        className="min-w-[80px]"
                        disabled={!isAvailable}
                        onClick={() => {
                          if (variant) {
                            setSelectedVariant(variant);
                          }
                        }}
                      >
                        {value}
                      </Button>
                    );
                  })}
                </div>
              </div>
            ))}

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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
