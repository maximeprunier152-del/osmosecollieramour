import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import locketHeart from "@/assets/locket-heart.png";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-champagne-light to-background">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-burgundy rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-block">
              <span className="text-sm font-sans font-medium tracking-[0.3em] uppercase text-emerald">
                Osmose
              </span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight text-foreground">
              Adoptez l'odeur
              <br />
              <span className="text-emerald italic">de votre moitié</span>
            </h1>
            
            <p className="text-lg md:text-xl font-sans text-muted-foreground leading-relaxed max-w-xl">
              Fermez les yeux. Un éclat de lumière, un souffle, un parfum — 
              et soudain le souvenir ressurgit. Ce collier-médaillon n'est pas qu'un accessoire : 
              <span className="text-foreground font-medium"> c'est un lien.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                variant="luxury" 
                size="lg"
                className="group"
                onClick={() => scrollToSection("shop")}
              >
                Découvrir les bijoux
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection("product")}
              >
                En savoir plus
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-8 text-sm font-sans text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald rounded-full"></div>
                <span>Diffusion 48h</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald rounded-full"></div>
                <span>Fait avec soin</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald rounded-full"></div>
                <span>Livraison sûre</span>
              </div>
            </div>
          </div>

          {/* Right: Product image */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-radial from-emerald/20 to-transparent blur-3xl"></div>
              
              {/* Image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-strong hover:shadow-[0_20px_60px_rgba(160,90,70,0.25)] transition-shadow duration-500">
                <img 
                  src={locketHeart} 
                  alt="Collier-médaillon diffuseur de parfum Osmose avec motif coeur" 
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating accent */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-burgundy/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-emerald/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-emerald rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
