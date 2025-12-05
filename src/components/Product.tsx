import locketTree from "@/assets/locket-tree.png";
import locketBird from "@/assets/locket-bird.png";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";
import lifestyle3 from "@/assets/lifestyle-3.jpg";
import lifestyle4 from "@/assets/lifestyle-4.jpg";
import { Sparkles, Heart, Clock } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Product = () => {
  return (
    <section id="product" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-emerald rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-burgundy rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <span className="text-sm font-sans font-medium tracking-[0.3em] uppercase text-emerald">
              Le médaillon
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-wide leading-tight text-foreground">
              Un écrin discret
              <br />
              <span className="italic text-burgundy">pour votre parfum</span>
            </h2>
          </div>

          {/* Product showcase */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden transition-all duration-300 [filter:drop-shadow(0_0_25px_rgba(218,179,140,0.4))] hover:[filter:drop-shadow(0_0_45px_rgba(218,179,140,0.6))]">
                  <img 
                    src={locketTree} 
                    alt="Médaillon arbre de vie avec disque absorbant" 
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden transition-all duration-300 [filter:drop-shadow(0_0_25px_rgba(218,179,140,0.4))] hover:[filter:drop-shadow(0_0_45px_rgba(218,179,140,0.6))] mt-8">
                  <img 
                    src={locketBird} 
                    alt="Médaillon coeur avec motif oiseau" 
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-display text-3xl text-foreground leading-relaxed">
                Un murmure olfactif autour de vous
              </h3>
              
              <p className="text-lg text-body-text leading-relaxed">
                Le médaillon s'ouvre délicatement pour accueillir un disque absorbant. 
                Vaporisez votre fragrance favorite, refermez l'écrin, glissez-le autour de votre cou.
              </p>

              <p className="text-lg text-foreground leading-relaxed">
                Toute la journée, un souffle parfumé vous enveloppe. 
                <span className="font-medium"> 48 heures de délicatesse</span>, sans contact direct avec la peau.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4 p-4 bg-champagne/30 rounded-lg">
                  <div className="w-10 h-10 bg-emerald/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-emerald" />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-foreground mb-1">Mécanisme simple</h4>
                    <p className="text-sm text-body-text">
                      Ouvrez, vaporisez sur le disque absorbant, refermez
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-champagne/30 rounded-lg">
                  <div className="w-10 h-10 bg-burgundy/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-burgundy" />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-foreground mb-1">Diffusion prolongée</h4>
                    <p className="text-sm text-body-text">
                      Jusqu'à 48h de parfum subtil et constant
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-champagne/30 rounded-lg">
                  <div className="w-10 h-10 bg-emerald/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-emerald" />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-foreground mb-1">Confort absolu</h4>
                    <p className="text-sm text-body-text">
                      Aucun contact avec la peau, idéal pour les peaux sensibles
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical details with Lifestyle Carousel */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Lifestyle Carousel */}
            <div className="rounded-2xl overflow-hidden [filter:drop-shadow(0_0_30px_rgba(218,179,140,0.4))]">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 3500,
                    stopOnInteraction: false,
                  }),
                ]}
                className="w-full"
              >
                <CarouselContent>
                  {[lifestyle1, lifestyle2, lifestyle3, lifestyle4].map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-square">
                        <img
                          src={image}
                          alt={`Lifestyle SP-Osmose ${index + 1}`}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            {/* Right: Technical specs */}
            <div className="bg-gradient-to-br from-emerald/5 to-burgundy/5 rounded-2xl p-8 md:p-12">
              <h3 className="font-display text-2xl text-foreground mb-8 text-center">
                Caractéristiques techniques
              </h3>
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="font-display text-3xl text-emerald mb-2">316L</div>
                  <div className="text-sm text-body-text">Acier inoxydable chirurgical</div>
                </div>
                <div>
                  <div className="font-display text-3xl text-burgundy mb-2">48h</div>
                  <div className="text-sm text-body-text">Durée de diffusion</div>
                </div>
                <div>
                  <div className="font-display text-3xl text-emerald mb-2">5</div>
                  <div className="text-sm text-body-text">Disques absorbants inclus</div>
                </div>
                <div>
                  <div className="font-display text-3xl text-burgundy mb-2">∅ 30mm</div>
                  <div className="text-sm text-body-text">Diamètre du médaillon</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
