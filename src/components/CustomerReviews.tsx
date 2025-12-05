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
    date: "il y a 1 jour",
    rating: 5,
    title: "Un bijou magique",
    text: "Je porte le parfum de mon mari quand il voyage. C'est comme s'il était toujours près de moi. Ce médaillon est devenu mon compagnon quotidien.",
    products: ["Le Matria"],
  },
  {
    id: 2,
    name: "Sophie B.",
    date: "il y a 2 jours",
    rating: 4,
    title: "Très satisfaite",
    text: "J'ai offert ce médaillon à ma mère et elle l'adore. La diffusion est subtile. Petit bémol : la chaîne aurait pu être un peu plus longue.",
    products: ["Le Gaia", "Le Volatis"],
  },
  {
    id: 3,
    name: "Claire D.",
    date: "il y a 4 jours",
    rating: 5,
    title: "Cadeau parfait",
    text: "J'ai commandé pour l'anniversaire de ma meilleure amie. Elle a pleuré de joie ! Le packaging est magnifique.",
    products: ["L'Améthyste"],
  },
  {
    id: 4,
    name: "Émilie R.",
    date: "il y a 1 semaine",
    rating: 5,
    title: "Je recommande vivement",
    text: "Livraison rapide, médaillon superbe. Le parfum tient vraiment 48h comme promis. Je suis conquise !",
    products: ["Le Secret", "Le Nao"],
  },
  {
    id: 5,
    name: "Nathalie M.",
    date: "il y a 2 semaines",
    rating: 4,
    title: "Bon produit",
    text: "Le concept est génial et le médaillon est joli. J'aurais aimé que le parfum tienne un peu plus longtemps.",
    products: ["Le Félix"],
  },
  {
    id: 6,
    name: "Isabelle C.",
    date: "il y a 3 semaines",
    rating: 5,
    title: "Coup de cœur absolu",
    text: "Design raffiné, finitions impeccables. J'ai choisi le modèle Matria en or rose, il est sublime.",
    products: ["Le Matria", "L'Avia"],
  },
  {
    id: 7,
    name: "Camille V.",
    date: "il y a 1 mois",
    rating: 3,
    title: "Correct mais perfectible",
    text: "Le médaillon est joli mais le fermoir est un peu difficile à manipuler. Le parfum diffuse bien.",
    products: ["Le Gaia"],
  },
  {
    id: 8,
    name: "Aurélie P.",
    date: "il y a 1 mois",
    rating: 5,
    title: "Fidèle depuis le début",
    text: "J'ai été parmi les premières clientes et je suis toujours aussi fan. J'en ai offert 3 depuis !",
    products: ["Le Volatis", "Le Secret"],
  },
  {
    id: 9,
    name: "Léa F.",
    date: "il y a 2 mois",
    rating: 5,
    title: "Merveilleux",
    text: "Ce médaillon a changé ma façon de porter mon parfum. Je ne peux plus m'en passer !",
    products: ["L'Avia"],
  },
  {
    id: 10,
    name: "Justine H.",
    date: "il y a 2 mois",
    rating: 4,
    title: "Très joli bijou",
    text: "Ravie de mon achat. Le design est élégant et la qualité au rendez-vous. Petit ajustement sur le fermoir serait parfait.",
    products: ["Le Nao"],
  },
  {
    id: 11,
    name: "Charlotte G.",
    date: "il y a 3 mois",
    rating: 5,
    title: "Un cadeau mémorable",
    text: "Offert à ma grand-mère avec son parfum préféré. Elle était émue aux larmes. Merci SP-Osmose !",
    products: ["Le Matria"],
  },
  {
    id: 12,
    name: "Manon T.",
    date: "il y a 4 mois",
    rating: 5,
    title: "Élégance au quotidien",
    text: "Je le porte tous les jours au travail. Discret mais efficace, mon parfum m'accompagne partout.",
    products: ["L'Améthyste", "Le Gaia"],
  },
  {
    id: 13,
    name: "Pauline K.",
    date: "il y a 5 mois",
    rating: 4,
    title: "Concept innovant",
    text: "Idée géniale ! La diffusion est douce et agréable. J'aurais aimé plus de choix de chaînes.",
    products: ["Le Secret"],
  },
  {
    id: 14,
    name: "Alice N.",
    date: "il y a 6 mois",
    rating: 5,
    title: "Mon indispensable",
    text: "Six mois que je porte mon médaillon quotidiennement. Il est toujours aussi beau !",
    products: ["Le Volatis"],
  },
  {
    id: 15,
    name: "Océane J.",
    date: "il y a 8 mois",
    rating: 5,
    title: "Qualité exceptionnelle",
    text: "La finition est parfaite, aucune trace d'usure après 8 mois d'utilisation quotidienne.",
    products: ["Le Félix", "Le Nao"],
  },
  {
    id: 16,
    name: "Inès W.",
    date: "il y a 10 mois",
    rating: 3,
    title: "Bien mais peut mieux faire",
    text: "Joli médaillon, mais la tenue du parfum varie selon les fragrances. Reste un beau bijou.",
    products: ["L'Avia"],
  },
  {
    id: 17,
    name: "Anaïs Q.",
    date: "il y a 1 an",
    rating: 5,
    title: "Toujours aussi fan",
    text: "Un an après, je ne me lasse pas de ce bijou. J'en ai commandé un deuxième modèle !",
    products: ["Le Matria", "Le Secret"],
  },
  {
    id: 18,
    name: "Zoé A.",
    date: "il y a 1 an et 2 mois",
    rating: 5,
    title: "Le plus beau cadeau",
    text: "Mon mari me l'a offert pour notre anniversaire. Un bijou chargé d'émotion et de sens.",
    products: ["Le Gaia"],
  },
  {
    id: 19,
    name: "Margot S.",
    date: "il y a 1 an et 4 mois",
    rating: 4,
    title: "Très satisfaite",
    text: "Bon produit, bonne qualité. J'aurais aimé un peu plus de disques de rechange inclus.",
    products: ["L'Améthyste"],
  },
  {
    id: 20,
    name: "Céline E.",
    date: "il y a 1 an et 6 mois",
    rating: 5,
    title: "Une révélation",
    text: "Ce médaillon a révolutionné ma relation au parfum. Je le recommande à toutes mes amies !",
    products: ["Le Volatis", "Le Félix"],
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
            <span className="text-primary font-semibold">Excellent 4.7/5</span>
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
                    {/* Stars and Products */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-5 h-5 rounded-sm flex items-center justify-center ${
                              i < review.rating ? 'bg-primary' : 'bg-gray-200'
                            }`}
                          >
                            <Star className={`w-3 h-3 ${i < review.rating ? 'text-white fill-white' : 'text-gray-400'}`} />
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {review.products.map((product, i) => (
                          <span 
                            key={i} 
                            className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                          >
                            {product}
                          </span>
                        ))}
                      </div>
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
