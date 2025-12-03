import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image - full width 2:1 aspect ratio */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-2xl">
          {/* Text content */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-block">
              <span className="text-sm font-sans font-medium tracking-[0.3em] uppercase text-champagne-light">
                SP-Osmose
              </span>
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-wide leading-tight text-white">
              Adoptez l'odeur
              <br />
              <span className="text-emerald-light italic">de votre moitié</span>
            </h1>
            
            <p className="text-lg md:text-xl font-sans text-white/90 leading-relaxed max-w-xl">
              Fermez les yeux. Un éclat de lumière, un souffle, un parfum — 
              et soudain le souvenir ressurgit. Ce collier-médaillon n'est pas qu'un accessoire : 
              <span className="text-white font-medium"> c'est un lien.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="luxury" size="lg" className="group" onClick={() => scrollToSection("shop")}>
                Je profite de l'offre -50%
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => scrollToSection("product")}
                className="border-white/50 text-white hover:bg-white/10 hover:text-white"
              >
                En savoir plus
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-8 text-sm font-sans text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-light rounded-full"></div>
                <span>Diffusion 48h</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-light rounded-full"></div>
                <span>Fait avec soin</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-light rounded-full"></div>
                <span>Livraison sûre</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
