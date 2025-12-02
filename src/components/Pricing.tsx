import { Check, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { PackSelectorModal } from "./PackSelectorModal";
import { useState, useEffect } from "react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";

const Pricing = () => {
  const [isEssentielModalOpen, setIsEssentielModalOpen] = useState(false);
  const [isPrecieuxModalOpen, setIsPrecieuxModalOpen] = useState(false);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  
  useEffect(() => {
    console.log("[Pricing] Fetching products...");
    fetchProducts(20).then(loadedProducts => {
      console.log("[Pricing] Fetched products:", loadedProducts.map(p => ({ 
        title: p.node.title, 
        handle: p.node.handle 
      })));
      setProducts(loadedProducts);
    }).catch(err => {
      console.error("[Pricing] Error fetching products:", err);
    });
  }, []);

  const essentielProduct = products.find(p => 
    p.node.title.includes("Essentiel") || p.node.handle.includes("essentiel")
  );
  
  // Find "Le Précieux" - handle different character encodings
  const precieuxProducts = products.filter(p => {
    const title = p.node.title.toLowerCase();
    const handle = p.node.handle.toLowerCase();
    return title.includes("precieux") || 
           title.includes("pr") && title.includes("cieux") ||
           handle.includes("precieux") ||
           handle.includes("pr") && handle.includes("cieux");
  });
  const precieuxProduct = precieuxProducts.length > 0 ? precieuxProducts[precieuxProducts.length - 1] : null;

  console.log("[Pricing] Total products loaded:", products.length);
  console.log("[Pricing] All product titles:", products.map(p => p.node.title));
  console.log("[Pricing] Essentiel found:", essentielProduct ? essentielProduct.node.title : "NOT FOUND");
  console.log("[Pricing] Précieux candidates:", precieuxProducts.map(p => ({ title: p.node.title, handle: p.node.handle })));
  console.log("[Pricing] Selected Précieux:", precieuxProduct ? precieuxProduct.node.title : "NOT FOUND");

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Sparkles size={16} />
            <span className="text-sm font-medium">Offre de lancement</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl tracking-wide font-bold text-foreground mb-4">
            Votre Médaillon Parfumé
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Un bijou unique qui porte l'essence de vos souvenirs
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Option Essentiel */}
          <div className="border border-border/50 rounded-2xl p-8 bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
              L'Essentiel
            </h3>
            <p className="text-muted-foreground mb-6">
              Pour débuter votre voyage olfactif
            </p>

            <div className="mb-6">
              <span className="text-4xl font-bold text-foreground">16,99€</span>
              <span className="text-muted-foreground ml-2">TTC</span>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Check className="text-primary mt-1 flex-shrink-0" size={20} />
                <span className="text-body-text">
                  1 médaillon diffuseur au choix
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-primary mt-1 flex-shrink-0" size={20} />
                <span className="text-body-text">
                  Chaîne en acier inoxydable (50 cm)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-primary mt-1 flex-shrink-0" size={20} />
                <span className="text-body-text">
                  3 disques absorbants inclus
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-primary mt-1 flex-shrink-0" size={20} />
                <span className="text-body-text">
                  Livraison offerte
                </span>
              </li>
            </ul>

            <Button variant="outline" className="w-full" onClick={() => setIsEssentielModalOpen(true)}>
              Choisir l'Essentiel
            </Button>
          </div>

          {/* Option Précieux */}
          <div className="border-2 border-primary rounded-2xl p-8 bg-card relative overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300">
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
              POPULAIRE
            </div>

            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
              Le Précieux
            </h3>
            <p className="text-muted-foreground mb-6">
              L'expérience complète et durable
            </p>

            <div className="mb-6">
              <span className="text-4xl font-bold text-foreground">24,99€</span>
              <span className="text-muted-foreground ml-2">TTC</span>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <Check className="text-primary mt-1 flex-shrink-0" size={20} />
                <span className="text-body-text">
                  2 médaillons diffuseurs au choix
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-primary mt-1 flex-shrink-0" size={20} />
                <span className="text-body-text">
                  1 chaîne en acier inoxydable (50 cm)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-primary mt-1 flex-shrink-0" size={20} />
                <span className="text-body-text">
                  10 disques absorbants premium
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="text-primary mt-1 flex-shrink-0" size={20} />
                <span className="text-body-text">
                  Livraison express offerte
                </span>
              </li>
            </ul>

            <Button className="w-full" onClick={() => setIsPrecieuxModalOpen(true)}>Choisir le Précieux</Button>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Paiement sécurisé · Garantie satisfait ou remboursé 30 jours
          </p>
        </div>
      </div>

      <PackSelectorModal 
        isOpen={isEssentielModalOpen}
        onClose={() => setIsEssentielModalOpen(false)}
        packType="essentiel"
        product={essentielProduct || null}
      />

      <PackSelectorModal 
        isOpen={isPrecieuxModalOpen}
        onClose={() => setIsPrecieuxModalOpen(false)}
        packType="precieux"
        product={precieuxProduct || null}
        key={precieuxProduct?.node.id || "precieux-modal"}
      />
    </section>
  );
};

export default Pricing;
