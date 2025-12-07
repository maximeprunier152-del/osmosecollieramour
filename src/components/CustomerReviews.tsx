import { useState, useMemo } from "react";
import { Star, StarHalf, Send } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const reviews = [
  { id: 1, name: "Marie L.", date: "il y a 1 jour", rating: 5, title: "Un bijou magique", text: "Je porte le parfum de mon mari quand il voyage. C'est comme s'il était toujours près de moi. Ce médaillon est devenu mon compagnon quotidien.", products: ["Le Matria"] },
  { id: 2, name: "Sophie B.", date: "il y a 2 jours", rating: 4, title: "Très satisfaite", text: "J'ai offert ce médaillon à ma mère et elle l'adore. La diffusion est subtile. Petit bémol : la chaîne aurait pu être un peu plus longue.", products: ["Le Gaia", "Le Volatis"] },
  { id: 3, name: "Claire D.", date: "il y a 3 jours", rating: 5, title: "Cadeau parfait", text: "J'ai commandé pour l'anniversaire de ma meilleure amie. Elle a pleuré de joie ! Le packaging est magnifique.", products: ["L'Améthyste"] },
  { id: 4, name: "Émilie R.", date: "il y a 4 jours", rating: 4.5, title: "Presque parfait", text: "Livraison rapide, médaillon superbe. Le parfum tient vraiment 48h comme promis. Je suis conquise !", products: ["Le Secret", "Le Nao"] },
  { id: 5, name: "Nathalie M.", date: "il y a 5 jours", rating: 4, title: "Bon produit", text: "Le concept est génial et le médaillon est joli. J'aurais aimé que le parfum tienne un peu plus longtemps.", products: ["Le Félix"] },
  { id: 6, name: "Isabelle C.", date: "il y a 1 semaine", rating: 5, title: "Coup de cœur absolu", text: "Design raffiné, finitions impeccables. J'ai choisi le modèle Matria en or rose, il est sublime.", products: ["Le Matria", "L'Avia"] },
  { id: 7, name: "Camille V.", date: "il y a 1 semaine", rating: 3, title: "Correct mais perfectible", text: "Le médaillon est joli mais le fermoir est un peu difficile à manipuler. Le parfum diffuse bien.", products: ["Le Gaia"] },
  { id: 8, name: "Aurélie P.", date: "il y a 1 semaine", rating: 5, title: "Fidèle depuis le début", text: "J'ai été parmi les premières clientes et je suis toujours aussi fan. J'en ai offert 3 depuis !", products: ["Le Volatis", "Le Secret"] },
  { id: 9, name: "Léa F.", date: "il y a 2 semaines", rating: 5, title: "Merveilleux", text: "Ce médaillon a changé ma façon de porter mon parfum. Je ne peux plus m'en passer !", products: ["L'Avia"] },
  { id: 10, name: "Justine H.", date: "il y a 2 semaines", rating: 4.5, title: "Excellent achat", text: "Ravie de mon achat. Le design est élégant et la qualité au rendez-vous.", products: ["Le Nao"] },
  { id: 11, name: "Charlotte G.", date: "il y a 2 semaines", rating: 5, title: "Un cadeau mémorable", text: "Offert à ma grand-mère avec son parfum préféré. Elle était émue aux larmes. Merci SP-Osmose !", products: ["Le Matria"] },
  { id: 12, name: "Manon T.", date: "il y a 3 semaines", rating: 5, title: "Élégance au quotidien", text: "Je le porte tous les jours au travail. Discret mais efficace, mon parfum m'accompagne partout.", products: ["L'Améthyste", "Le Gaia"] },
  { id: 13, name: "Pauline K.", date: "il y a 3 semaines", rating: 4, title: "Concept innovant", text: "Idée géniale ! La diffusion est douce et agréable. J'aurais aimé plus de choix de chaînes.", products: ["Le Secret"] },
  { id: 14, name: "Alice N.", date: "il y a 1 mois", rating: 5, title: "Mon indispensable", text: "Six mois que je porte mon médaillon quotidiennement. Il est toujours aussi beau !", products: ["Le Volatis"] },
  { id: 15, name: "Océane J.", date: "il y a 1 mois", rating: 5, title: "Qualité exceptionnelle", text: "La finition est parfaite, aucune trace d'usure après des mois d'utilisation quotidienne.", products: ["Le Félix", "Le Nao"] },
  { id: 16, name: "Inès W.", date: "il y a 1 mois", rating: 3.5, title: "Bien mais peut mieux faire", text: "Joli médaillon, mais la tenue du parfum varie selon les fragrances. Reste un beau bijou.", products: ["L'Avia"] },
  { id: 17, name: "Anaïs Q.", date: "il y a 1 mois", rating: 5, title: "Toujours aussi fan", text: "Un an après, je ne me lasse pas de ce bijou. J'en ai commandé un deuxième modèle !", products: ["Le Matria", "Le Secret"] },
  { id: 18, name: "Zoé A.", date: "il y a 2 mois", rating: 5, title: "Le plus beau cadeau", text: "Mon mari me l'a offert pour notre anniversaire. Un bijou chargé d'émotion et de sens.", products: ["Le Gaia"] },
  { id: 19, name: "Margot S.", date: "il y a 2 mois", rating: 4, title: "Très satisfaite", text: "Bon produit, bonne qualité. J'aurais aimé un peu plus de disques de rechange inclus.", products: ["L'Améthyste"] },
  { id: 20, name: "Céline E.", date: "il y a 2 mois", rating: 5, title: "Une révélation", text: "Ce médaillon a révolutionné ma relation au parfum. Je le recommande à toutes mes amies !", products: ["Le Volatis", "Le Félix"] },
];

// Render stars with half star support
const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <div key={i} className="w-5 h-5 bg-primary rounded-sm flex items-center justify-center">
        <Star className="w-3 h-3 text-white fill-white" />
      </div>
    );
  }
  
  if (hasHalfStar) {
    stars.push(
      <div key="half" className="w-5 h-5 bg-primary rounded-sm flex items-center justify-center">
        <StarHalf className="w-3 h-3 text-white fill-white" />
      </div>
    );
  }
  
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <div key={`empty-${i}`} className="w-5 h-5 bg-gray-200 rounded-sm flex items-center justify-center">
        <Star className="w-3 h-3 text-gray-400" />
      </div>
    );
  }
  
  return stars;
};

const CustomerReviews = () => {
  const { user } = useAuth();
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [selectedRating, setSelectedRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const handleRatingChange = (newRating: number) => {
    setSelectedRating(newRating);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setShowLoginMessage(true);
      return;
    }

    if (!reviewTitle.trim() || !reviewText.trim()) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Merci pour votre avis !", {
      description: "Votre avis sera publié après validation."
    });
    
    setReviewTitle("");
    setReviewText("");
    setSelectedRating(5);
    setIsSubmitting(false);
    setShowLoginMessage(false);
  };

  // Calculate average (round to .5)
  const avgRating = Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 2) / 2;

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-[#faf8f5] to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ce que nos clientes disent...
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-primary font-semibold">Excellent {avgRating}/5</span>
            <div className="flex gap-0.5">
              {renderStars(avgRating)}
            </div>
          </div>
          <p className="text-muted-foreground text-sm">basé sur {reviews.length} avis vérifiés</p>
        </div>

        {/* Carousel */}
        <div className="relative px-12 mb-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {reviews.map((review) => (
                <CarouselItem key={review.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-border/50 h-full flex flex-col">
                    {/* Stars and Products */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-0.5">
                        {renderStars(review.rating)}
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

        {/* Leave a Review Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-border/50">
            <h3 className="font-display text-xl font-semibold text-foreground mb-6 text-center">
              Laissez-nous votre avis
            </h3>
            
            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Rating Selection with half-star support */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-muted-foreground">Votre note : {selectedRating}/5</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFullStar = star <= selectedRating;
                    const isHalfStar = !isFullStar && star - 0.5 === selectedRating;
                    const isFilled = isFullStar || isHalfStar;
                    
                    return (
                      <div key={star} className="relative w-8 h-8 cursor-pointer">
                        {/* Left half - for .5 rating */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRatingChange(star - 0.5);
                          }}
                          className="absolute left-0 top-0 w-1/2 h-full z-10 cursor-pointer bg-transparent border-none"
                          aria-label={`${star - 0.5} étoiles`}
                        />
                        {/* Right half - for full rating */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRatingChange(star);
                          }}
                          className="absolute right-0 top-0 w-1/2 h-full z-10 cursor-pointer bg-transparent border-none"
                          aria-label={`${star} étoiles`}
                        />
                        {/* Star display */}
                        <div className={`w-8 h-8 rounded-sm flex items-center justify-center transition-transform hover:scale-110 ${
                          isFilled ? 'bg-primary' : 'bg-gray-200'
                        }`}>
                          {isFullStar ? (
                            <Star className="w-5 h-5 text-white fill-white" />
                          ) : isHalfStar ? (
                            <StarHalf className="w-5 h-5 text-white fill-white" />
                          ) : (
                            <Star className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Title */}
              <div>
                <Input
                  placeholder="Titre de votre avis"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  maxLength={100}
                  className="bg-background"
                />
              </div>

              {/* Review Text */}
              <div>
                <Textarea
                  placeholder="Partagez votre expérience avec nos médaillons..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  maxLength={500}
                  rows={4}
                  className="bg-background resize-none"
                />
              </div>

              {/* Login Required Message */}
              {showLoginMessage && (
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 text-center">
                  <p className="text-foreground font-medium mb-2">Connexion requise</p>
                  <p className="text-muted-foreground text-sm mb-3">
                    Vous devez avoir un compte pour laisser un avis.
                  </p>
                  <a 
                    href="/compte"
                    className="inline-flex items-center justify-center px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    Créer un compte / Se connecter
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Envoi en cours..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Publier mon avis
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
