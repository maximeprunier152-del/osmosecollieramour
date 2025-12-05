import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const reviews = [
  {
    id: 1,
    name: "Marie L.",
    date: "12 novembre 2024",
    rating: 5,
    title: "Un bijou magique",
    text: "Je porte le parfum de mon mari quand il voyage. C'est comme s'il était toujours près de moi. Ce médaillon est devenu mon compagnon quotidien.",
  },
  {
    id: 2,
    name: "Sophie B.",
    date: "8 novembre 2024",
    rating: 5,
    title: "Indispensable !",
    text: "J'ai offert ce médaillon à ma mère et elle ne le quitte plus. La diffusion du parfum est subtile et élégante. Qualité exceptionnelle !",
  },
  {
    id: 3,
    name: "Claire D.",
    date: "3 novembre 2024",
    rating: 5,
    title: "Cadeau parfait",
    text: "J'ai commandé pour l'anniversaire de ma meilleure amie. Elle a pleuré de joie ! Le packaging est magnifique et le produit de grande qualité.",
  },
  {
    id: 4,
    name: "Émilie R.",
    date: "28 octobre 2024",
    rating: 5,
    title: "Je recommande vivement",
    text: "Livraison rapide, médaillon superbe. Le parfum tient vraiment 48h comme promis. Je suis conquise et j'en ai commandé un deuxième !",
  },
  {
    id: 5,
    name: "Nathalie M.",
    date: "22 octobre 2024",
    rating: 5,
    title: "Élégance et émotion",
    text: "Ce médaillon porte le parfum de ma grand-mère disparue. Un vrai réconfort au quotidien. Merci pour cette belle invention.",
  },
  {
    id: 6,
    name: "Isabelle C.",
    date: "15 octobre 2024",
    rating: 5,
    title: "Coup de cœur absolu",
    text: "Design raffiné, finitions impeccables. J'ai choisi le modèle Matria en or rose, il est sublime. Un bijou qui a du sens.",
  },
];

const CustomerReviews = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#faf8f5] to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ce que nos clientes disent...
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-primary font-semibold">Excellent 4.9/5</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-5 h-5 bg-primary rounded-sm flex items-center justify-center">
                  <Star className="w-3 h-3 text-white fill-white" />
                </div>
              ))}
            </div>
          </div>
          <p className="text-muted-foreground text-sm">basé sur 1046 avis vérifiés</p>
        </div>

        {/* Carousel */}
        <div className="relative px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {reviews.map((review) => (
                <CarouselItem key={review.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-border/50 h-full flex flex-col">
                    {/* Stars */}
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <div key={i} className="w-5 h-5 bg-primary rounded-sm flex items-center justify-center">
                          <Star className="w-3 h-3 text-white fill-white" />
                        </div>
                      ))}
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-semibold text-foreground mb-2">{review.title}</h3>
                    
                    {/* Review text */}
                    <p className="text-muted-foreground text-sm flex-grow mb-4 leading-relaxed">
                      "{review.text}"
                    </p>
                    
                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-semibold text-sm">
                          {review.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{review.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <span className="text-primary">✓</span> Client vérifié · {review.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-white/80 backdrop-blur-sm border-border/50 hover:bg-white" />
            <CarouselNext className="right-0 bg-white/80 backdrop-blur-sm border-border/50 hover:bg-white" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
