import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroBackground from "@/assets/hero-background.webp";

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
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
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

            {/* Social Proof */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-[#FFD700]" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white text-sm font-medium ml-1">4.5/5 - 347+ avis vérifiés</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <svg className="w-4 h-4 text-emerald-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-white text-sm font-medium">Satisfait ou remboursé 30j</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 md:gap-8 pt-4 text-sm font-sans text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-light rounded-full"></div>
                <span>Service Rapide</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-light rounded-full"></div>
                <span>Savoir-faire d'excellence</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-light rounded-full"></div>
                <span>Livraison Premium</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer" onClick={() => scrollToSection("shop")}>
        <ChevronDown className="w-8 h-8 text-white/70 hover:text-white transition-colors" />
      </div>
    </section>
  );
};

export default Hero;
