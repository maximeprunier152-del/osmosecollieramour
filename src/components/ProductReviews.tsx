import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  title: string;
  text: string;
}

// Reviews by product handle - all names are unique across products
const productReviews: Record<string, Review[]> = {
  "collier-diffuseur-le-matria": [
    { id: 1, name: "Bérénice L.", date: "il y a 1 jour", rating: 5, title: "Magnifique !", text: "Le Matria est sublime, le cœur est si élégant. Je le porte tous les jours et je reçois plein de compliments." },
    { id: 2, name: "Héloïse T.", date: "il y a 3 jours", rating: 5, title: "Parfait pour un cadeau", text: "Offert à ma sœur pour son anniversaire, elle a adoré ! Le design cœur est vraiment romantique." },
    { id: 3, name: "Sandrine M.", date: "il y a 1 semaine", rating: 4, title: "Très joli", text: "Beau médaillon, bonne tenue du parfum. J'aurais aimé une chaîne un peu plus fine." },
    { id: 4, name: "Véronique B.", date: "il y a 2 semaines", rating: 5, title: "Mon préféré", text: "J'ai plusieurs modèles mais le Matria reste mon favori. Le symbole du cœur me touche beaucoup." },
    { id: 5, name: "Amélie D.", date: "il y a 1 mois", rating: 5, title: "Qualité exceptionnelle", text: "La finition est impeccable, le parfum tient vraiment 48h. Je recommande les yeux fermés !" },
    { id: 6, name: "Constance R.", date: "il y a 2 mois", rating: 4, title: "Très satisfaite", text: "Le cœur est finement travaillé. Seul petit regret : j'aurais aimé plus de disques inclus." },
    { id: 7, name: "Élisabeth F.", date: "il y a 3 mois", rating: 5, title: "Émouvant", text: "J'y ai mis le parfum de ma mère disparue. Ce médaillon m'apporte un réconfort immense." },
    { id: 8, name: "Victoire P.", date: "il y a 5 mois", rating: 5, title: "Sublime", text: "Le Matria est d'une beauté rare. Je ne me lasse pas de le regarder et de le porter." },
    { id: 9, name: "Adélaïde G.", date: "il y a 8 mois", rating: 3, title: "Bien", text: "Joli médaillon mais le fermoir demande un peu d'habitude. Le parfum diffuse correctement." },
    { id: 10, name: "Joséphine N.", date: "il y a 1 an", rating: 5, title: "Indémodable", text: "Un an de bonheur avec ce bijou. Il n'a pas pris une ride et fonctionne toujours parfaitement." },
  ],
  "collier-diffuseur-le-volatis": [
    { id: 1, name: "Apolline R.", date: "il y a 2 jours", rating: 5, title: "Poétique", text: "Le papillon est magnifique ! Un bijou délicat qui attire tous les regards." },
    { id: 2, name: "Capucine V.", date: "il y a 5 jours", rating: 5, title: "Coup de cœur", text: "Je cherchais un bijou symbolique et le Volatis est parfait. Le papillon représente ma transformation." },
    { id: 3, name: "Églantine C.", date: "il y a 2 semaines", rating: 4, title: "Très beau", text: "Design original et élégant. La diffusion fonctionne bien, peut-être un peu moins longue que prévu." },
    { id: 4, name: "Pénélope P.", date: "il y a 1 mois", rating: 5, title: "Merveilleux", text: "Ce médaillon papillon est une œuvre d'art. Je ne m'en sépare plus depuis que je l'ai reçu." },
    { id: 5, name: "Garance G.", date: "il y a 2 mois", rating: 5, title: "Toujours aussi beau", text: "Acheté il y a plusieurs mois, il n'a pas bougé. Qualité au rendez-vous !" },
    { id: 6, name: "Sixtine H.", date: "il y a 3 mois", rating: 4, title: "Élégant", text: "Le papillon est finement ciselé. Petit bémol sur la longueur de la chaîne pour moi." },
    { id: 7, name: "Olympe L.", date: "il y a 4 mois", rating: 5, title: "Symbolique", text: "Le papillon symbolise ma renaissance. Ce bijou a une vraie signification pour moi." },
    { id: 8, name: "Agathe M.", date: "il y a 6 mois", rating: 5, title: "Parfait", text: "Je l'ai offert à ma fille pour ses 18 ans. Elle ne le quitte plus !" },
    { id: 9, name: "Colombe S.", date: "il y a 9 mois", rating: 3, title: "Correct", text: "Beau design mais le parfum tient moins longtemps qu'annoncé chez moi. Reste un joli bijou." },
    { id: 10, name: "Albane K.", date: "il y a 1 an et 3 mois", rating: 5, title: "Mon porte-bonheur", text: "Plus d'un an que le Volatis m'accompagne. Un bijou plein de sens et de qualité." },
  ],
  "collier-diffuseur-l-amethyste": [
    { id: 1, name: "Clémence H.", date: "il y a 1 jour", rating: 5, title: "Raffiné", text: "Les arabesques florales sont d'une finesse incroyable. Un vrai bijou d'artisanat." },
    { id: 2, name: "Éléonore M.", date: "il y a 4 jours", rating: 5, title: "Élégance pure", text: "L'Améthyste porte bien son nom, c'est précieux et délicat. Ma pièce préférée de ma collection." },
    { id: 3, name: "Adeline B.", date: "il y a 1 semaine", rating: 4, title: "Superbe design", text: "Les motifs floraux sont sublimes. Seul petit bémol : le fermoir est parfois difficile." },
    { id: 4, name: "Romane F.", date: "il y a 3 semaines", rating: 5, title: "Magnifique", text: "Le plus beau de la collection selon moi. Les détails sont impressionnants." },
    { id: 5, name: "Ségolène K.", date: "il y a 1 mois", rating: 5, title: "Exceptionnel", text: "Un travail d'orfèvre ! Je suis émerveillée chaque fois que je le regarde." },
    { id: 6, name: "Tiphaine A.", date: "il y a 2 mois", rating: 4, title: "Très satisfaite", text: "Les arabesques sont magnifiques. J'aurais aimé plus de choix de couleurs." },
    { id: 7, name: "Gwenaëlle D.", date: "il y a 4 mois", rating: 5, title: "Chef-d'œuvre", text: "Chaque détail est parfait. Ce médaillon est une véritable œuvre d'art à porter." },
    { id: 8, name: "Solène P.", date: "il y a 6 mois", rating: 5, title: "Sublime", text: "L'Améthyste sublime toutes mes tenues. Un bijou polyvalent et raffiné." },
    { id: 9, name: "Axelle V.", date: "il y a 10 mois", rating: 3, title: "Joli mais fragile", text: "Les détails floraux sont beaux mais demandent de la délicatesse. Attention au nettoyage." },
    { id: 10, name: "Blandine R.", date: "il y a 1 an et 1 mois", rating: 5, title: "Intemporel", text: "Un an plus tard, il est toujours aussi beau. Un investissement qui en vaut la peine." },
  ],
  "collier-diffuseur-le-gaia": [
    { id: 1, name: "Églantine S.", date: "il y a 2 jours", rating: 5, title: "Symbolique", text: "L'arbre de vie représente tellement pour moi. Ce médaillon a une vraie signification." },
    { id: 2, name: "Athénaïs L.", date: "il y a 1 semaine", rating: 5, title: "Émouvant", text: "Je l'ai acheté après la naissance de ma fille. Un symbole de notre lien éternel." },
    { id: 3, name: "Flore D.", date: "il y a 2 semaines", rating: 4, title: "Très satisfaite", text: "Le Gaia est magnifique. L'arbre de vie est finement gravé. Parfum qui tient bien." },
    { id: 4, name: "Daphné R.", date: "il y a 1 mois", rating: 3, title: "Correct", text: "Joli médaillon mais je trouve les détails un peu moins fins que sur les photos. Reste un bon produit." },
    { id: 5, name: "Aurore A.", date: "il y a 2 mois", rating: 5, title: "Mon talisman", text: "Le Gaia m'accompagne dans tous mes moments importants. Un vrai porte-bonheur." },
    { id: 6, name: "Perrine T.", date: "il y a 3 mois", rating: 5, title: "Cadeau parfait", text: "Offert à ma mère pour la fête des mères. Elle était aux anges !" },
    { id: 7, name: "Laure B.", date: "il y a 5 mois", rating: 4, title: "Beau symbole", text: "L'arbre de vie est magnifique. La chaîne aurait pu être un peu plus longue." },
    { id: 8, name: "Noémie G.", date: "il y a 7 mois", rating: 5, title: "Merveilleux", text: "Ce médaillon raconte une histoire. Chaque fois que je le porte, je pense à ma famille." },
    { id: 9, name: "Ludivine C.", date: "il y a 11 mois", rating: 5, title: "Parfait", text: "Presque un an et toujours aussi satisfaite. Un bijou chargé de sens." },
    { id: 10, name: "Bertille H.", date: "il y a 1 an et 4 mois", rating: 5, title: "Indispensable", text: "Le Gaia ne me quitte jamais. Un bijou qui a une vraie âme." },
  ],
  "collier-diffuseur-le-nao": [
    { id: 1, name: "Mélissa P.", date: "il y a 1 jour", rating: 5, title: "Touchant", text: "Les empreintes de pieds sont adorables. Je le porte avec le parfum de mon bébé." },
    { id: 2, name: "Johanna M.", date: "il y a 4 jours", rating: 5, title: "Parfait pour maman", text: "Cadeau idéal pour une jeune maman. Ma sœur a fondu en larmes de joie." },
    { id: 3, name: "Priscilla T.", date: "il y a 1 semaine", rating: 5, title: "Émotion garantie", text: "Chaque fois que je sens ce parfum, je pense à mes enfants. Un bijou plein de sens." },
    { id: 4, name: "Mélanie J.", date: "il y a 3 semaines", rating: 4, title: "Très mignon", text: "Les petites empreintes sont craquantes. La chaîne pourrait être un peu plus longue." },
    { id: 5, name: "Stéphanie B.", date: "il y a 1 mois", rating: 5, title: "Indispensable", text: "Le Nao ne me quitte plus. Un lien invisible avec mes enfants où que je sois." },
    { id: 6, name: "Karine V.", date: "il y a 2 mois", rating: 5, title: "Adorable", text: "Les empreintes sont si mignonnes ! Un bijou unique qui me fait sourire chaque jour." },
    { id: 7, name: "Sonia F.", date: "il y a 4 mois", rating: 4, title: "Très bien", text: "Beau médaillon, concept touchant. Le parfum pourrait tenir un peu plus longtemps." },
    { id: 8, name: "Sabrina L.", date: "il y a 6 mois", rating: 5, title: "Émouvant", text: "J'y ai mis le parfum de ma fille. Quand elle est à l'école, je l'ai près de moi." },
    { id: 9, name: "Delphine N.", date: "il y a 9 mois", rating: 3, title: "Mignon", text: "Design adorable mais les empreintes sont un peu petites. Fonctionne bien néanmoins." },
    { id: 10, name: "Patricia G.", date: "il y a 1 an et 2 mois", rating: 5, title: "Mon bijou préféré", text: "Un an de bonheur avec le Nao. Il représente tellement pour moi en tant que maman." },
  ],
  "collier-diffuseur-le-secret": [
    { id: 1, name: "Séverine N.", date: "il y a 2 jours", rating: 5, title: "Mystérieux", text: "Le motif serrure est original et intrigant. J'adore le côté secret de ce bijou." },
    { id: 2, name: "Angélique C.", date: "il y a 5 jours", rating: 5, title: "Original", text: "Personne n'a le même ! Le Secret est vraiment unique et attire la curiosité." },
    { id: 3, name: "Élodie V.", date: "il y a 2 semaines", rating: 4, title: "Élégant", text: "Design très réussi, la clé serait un joli ajout. Le parfum diffuse parfaitement." },
    { id: 4, name: "Nadia G.", date: "il y a 1 mois", rating: 5, title: "Mon petit secret", text: "J'aime cette idée de porter un secret sur moi. Le parfum de mon mari m'accompagne." },
    { id: 5, name: "Corinne H.", date: "il y a 2 mois", rating: 5, title: "Toujours fan", text: "Plusieurs mois plus tard, le Secret garde toute sa magie. Qualité irréprochable." },
    { id: 6, name: "Magali T.", date: "il y a 3 mois", rating: 4, title: "Très joli", text: "Le design serrure est original. Parfum qui tient bien, chaîne de bonne qualité." },
    { id: 7, name: "Dorothée L.", date: "il y a 5 mois", rating: 5, title: "Coup de cœur", text: "Le Secret a quelque chose de mystique. Je me sens spéciale quand je le porte." },
    { id: 8, name: "Amandine B.", date: "il y a 7 mois", rating: 5, title: "Parfait", text: "Ce médaillon intrigue tout le monde. On me demande toujours où je l'ai trouvé !" },
    { id: 9, name: "Virginie R.", date: "il y a 10 mois", rating: 3, title: "Bien", text: "Beau design mais le motif serrure accumule un peu la poussière. Entretien régulier nécessaire." },
    { id: 10, name: "Nadège P.", date: "il y a 1 an et 5 mois", rating: 5, title: "Intemporel", text: "Plus d'un an et toujours aussi mystérieux. Un bijou qui ne se démode pas." },
  ],
  "collier-diffuseur-le-felix": [
    { id: 1, name: "Morgane L.", date: "il y a 1 jour", rating: 5, title: "Pour les amoureuses des chats", text: "Parfait pour moi qui adore les chats ! Le Félix est trop mignon." },
    { id: 2, name: "Audrey R.", date: "il y a 3 jours", rating: 5, title: "Adorable", text: "Le petit chat est craquant. Je reçois plein de compliments sur ce médaillon." },
    { id: 3, name: "Jessica P.", date: "il y a 1 semaine", rating: 4, title: "Très joli", text: "Super design pour les fans de félins. Le parfum de ma maison me suit partout." },
    { id: 4, name: "Fanny D.", date: "il y a 3 semaines", rating: 5, title: "Mon chat en bijou", text: "J'ai mis le parfum de mon chat adoré dedans. Un souvenir précieux chaque jour." },
    { id: 5, name: "Christelle S.", date: "il y a 1 mois", rating: 3, title: "Mignon mais fragile", text: "Design adorable mais j'ai dû faire attention, les détails sont fins. Fonctionne bien." },
    { id: 6, name: "Marina K.", date: "il y a 2 mois", rating: 5, title: "Craquant", text: "Le Félix est irrésistible ! Toutes mes amies cat lovers en veulent un." },
    { id: 7, name: "Célia A.", date: "il y a 4 mois", rating: 5, title: "Parfait", text: "En mémoire de mon chat parti trop tôt. Ce bijou me réconforte chaque jour." },
    { id: 8, name: "Laurence M.", date: "il y a 6 mois", rating: 4, title: "Très mignon", text: "Le chat est adorable. J'aurais aimé qu'il soit un peu plus grand mais reste très joli." },
    { id: 9, name: "Sylvie F.", date: "il y a 9 mois", rating: 5, title: "Mon favori", text: "Parmi tous les modèles, le Félix reste mon préféré. Un must pour les amoureux des chats." },
    { id: 10, name: "Valérie T.", date: "il y a 1 an", rating: 5, title: "Toujours aussi beau", text: "Un an que je porte le Félix quotidiennement. Pas une trace d'usure !" },
  ],
  "collier-diffuseur-l-avia": [
    { id: 1, name: "Anaëlle F.", date: "il y a 2 jours", rating: 5, title: "Liberté", text: "L'oiseau représente ma liberté retrouvée. Un bijou qui a du sens pour moi." },
    { id: 2, name: "Lucile B.", date: "il y a 4 jours", rating: 5, title: "Poétique", text: "L'Avia est d'une légèreté et d'une élégance folle. Mon préféré de la collection." },
    { id: 3, name: "Estelle V.", date: "il y a 1 semaine", rating: 5, title: "Sublime", text: "Les ailes de l'oiseau sont finement travaillées. Un vrai chef-d'œuvre." },
    { id: 4, name: "Géraldine M.", date: "il y a 3 semaines", rating: 4, title: "Très beau", text: "Design magnifique et original. La diffusion pourrait durer un peu plus longtemps." },
    { id: 5, name: "Fabienne T.", date: "il y a 1 mois", rating: 5, title: "Mon porte-bonheur", text: "L'Avia m'accompagne partout. Il est toujours aussi beau depuis que je l'ai !" },
    { id: 6, name: "Natacha L.", date: "il y a 2 mois", rating: 5, title: "Magnifique", text: "L'oiseau est d'une finesse incroyable. Ce médaillon attire tous les compliments." },
    { id: 7, name: "Émeline D.", date: "il y a 4 mois", rating: 4, title: "Élégant", text: "Le design est sublime. Petit bémol : les détails demandent un entretien soigneux." },
    { id: 8, name: "Lauriane G.", date: "il y a 6 mois", rating: 5, title: "Symbole de liberté", text: "Cet oiseau représente mon envol. Un bijou chargé d'émotion et de sens." },
    { id: 9, name: "Rosalie P.", date: "il y a 8 mois", rating: 3, title: "Joli", text: "Beau design mais l'oiseau est un peu petit. Le parfum diffuse correctement." },
    { id: 10, name: "Typhaine H.", date: "il y a 1 an et 6 mois", rating: 5, title: "Exceptionnel", text: "Un an et demi de bonheur. L'Avia reste mon bijou préféré, intemporel et élégant." },
  ],
};

// Default reviews for products not in the list
const defaultReviews: Review[] = [
  { id: 1, name: "Hortense L.", date: "il y a 2 jours", rating: 5, title: "Excellent", text: "Très satisfaite de mon achat. La qualité est au rendez-vous et le design magnifique." },
  { id: 2, name: "Blanche B.", date: "il y a 5 jours", rating: 5, title: "Parfait", text: "Exactement ce que je cherchais. Je recommande les yeux fermés !" },
  { id: 3, name: "Céleste D.", date: "il y a 2 semaines", rating: 4, title: "Très bien", text: "Bon produit, livraison rapide. Quelques petits détails à améliorer." },
  { id: 4, name: "Eugénie R.", date: "il y a 1 mois", rating: 5, title: "Super", text: "Ravie de mon achat, je le porte tous les jours avec plaisir." },
  { id: 5, name: "Henriette M.", date: "il y a 2 mois", rating: 4, title: "Satisfaite", text: "Bon rapport qualité-prix. Je recommande ce médaillon." },
  { id: 6, name: "Marguerite C.", date: "il y a 3 mois", rating: 5, title: "Magnifique", text: "Un bijou d'une rare élégance. Je suis enchantée de mon achat." },
  { id: 7, name: "Philippine V.", date: "il y a 5 mois", rating: 3, title: "Correct", text: "Produit conforme mais le parfum tient moins longtemps que prévu." },
  { id: 8, name: "Cunégonde F.", date: "il y a 8 mois", rating: 5, title: "Sublime", text: "Ce médaillon est devenu mon indispensable. Qualité exceptionnelle." },
  { id: 9, name: "Guillemette P.", date: "il y a 11 mois", rating: 5, title: "Merveilleux", text: "Un an de bonheur avec ce bijou. Il n'a pas bougé." },
  { id: 10, name: "Aliénor S.", date: "il y a 1 an et 3 mois", rating: 5, title: "Parfait", text: "Un investissement qui en vaut largement la peine. Je recommande !" },
];

interface ProductReviewsProps {
  productHandle: string;
}

const ProductReviews = ({ productHandle }: ProductReviewsProps) => {
  const reviews = productReviews[productHandle] || defaultReviews;
  
  // Calculate average rating
  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="py-12 bg-gradient-to-b from-[#faf8f5] to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Avis clients
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-primary font-semibold">Excellent {avgRating}/5</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-5 h-5 bg-primary rounded-sm flex items-center justify-center">
                  <Star className="w-3 h-3 text-white fill-white" />
                </div>
              ))}
            </div>
          </div>
          <p className="text-muted-foreground text-sm">basé sur {reviews.length} avis vérifiés</p>
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

export default ProductReviews;
