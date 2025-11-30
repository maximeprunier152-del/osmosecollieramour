import { Button } from "@/components/ui/button";
import { ShoppingBag, Gift, ArrowRight } from "lucide-react";

const CTA = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="cta" className="py-32 bg-gradient-to-br from-emerald via-emerald-light to-emerald-dark relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-96 h-96 bg-champagne rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-burgundy rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          {/* Main CTA content */}
          <div className="space-y-6">
            <span className="inline-block text-sm font-sans font-medium tracking-[0.3em] uppercase text-champagne-light">
              Prêt à porter votre parfum ?
            </span>
            
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-primary-foreground">
              Offrez-vous ce talisman parfumé
            </h2>
            
            <p className="text-xl md:text-2xl text-primary-foreground/90 leading-relaxed max-w-2xl mx-auto">
              Un bijou qui porte l'âme d'un parfum. 
              Un souvenir à porter. 
              Une émotion à vivre.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button 
              variant="elegant"
              size="xl"
              className="group shadow-strong hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
              onClick={() => scrollToSection("pricing")}
            >
              <ShoppingBag className="w-5 h-5" />
              Commander maintenant
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline"
              size="xl"
              className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 hover:border-primary-foreground/50 backdrop-blur-sm"
              onClick={() => scrollToSection("pricing")}
            >
              <Gift className="w-5 h-5" />
              Offrir en cadeau
            </Button>
          </div>

          {/* Value props */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 text-primary-foreground/80 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-champagne rounded-full"></div>
              <span>Livraison offerte dès 50€</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-champagne rounded-full"></div>
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-champagne rounded-full"></div>
              <span>Retour sous 30 jours</span>
            </div>
          </div>

          {/* Subtle quote */}
          <div className="pt-12 border-t border-primary-foreground/20">
            <p className="font-serif text-lg text-primary-foreground/70 italic">
              « Fermez les yeux. Respirez. Souvenez-vous. »
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
