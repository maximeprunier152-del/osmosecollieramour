import { memo } from "react";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  title: string;
  text: string;
  products: string[];
}

// Reviews by product handle - all names are unique across products
const productReviews: Record<string, Review[]> = {
  "collier-diffuseur-le-matria": [
    { id: 1, name: "Bérénice L.", date: "il y a 1 jour", rating: 5, title: "Magnifique !", text: "Le Matria est absolument sublime, le motif cœur est d'une élégance rare. Je le porte tous les jours depuis que je l'ai reçu et je reçois constamment des compliments. Le parfum de mon mari diffuse parfaitement et me donne l'impression qu'il est toujours près de moi, même quand il voyage pour le travail.", products: ["Le Matria"] },
    { id: 2, name: "Héloïse T.", date: "il y a 3 jours", rating: 5, title: "Parfait pour un cadeau", text: "J'ai offert le Matria à ma sœur pour son anniversaire et elle a été émue aux larmes ! Le design en forme de cœur est vraiment romantique et symbolique. Elle y a mis le parfum de son fiancé et ne le quitte plus depuis. La qualité du bijou est exceptionnelle, les finitions sont impeccables.", products: ["Le Matria"] },
    { id: 3, name: "Sandrine M.", date: "il y a 1 semaine", rating: 4, title: "Très joli", text: "Le médaillon Matria est vraiment beau et la tenue du parfum est impressionnante, il dure facilement 48 heures comme promis. J'aurais simplement aimé que la chaîne soit un peu plus fine pour un rendu encore plus délicat, mais dans l'ensemble je suis très satisfaite de mon achat.", products: ["Le Matria"] },
    { id: 4, name: "Véronique B.", date: "il y a 2 semaines", rating: 5, title: "Mon préféré", text: "J'ai acheté plusieurs modèles de la collection SP-Osmose, mais le Matria reste définitivement mon favori. Le symbole du cœur me touche profondément et représente l'amour que je porte à ma famille. C'est devenu mon bijou fétiche que je porte pour toutes les occasions importantes.", products: ["Le Matria", "Le Gaia"] },
    { id: 5, name: "Amélie D.", date: "il y a 1 mois", rating: 5, title: "Qualité exceptionnelle", text: "La finition du Matria est tout simplement impeccable, on voit que c'est un travail d'artisan. Le parfum tient vraiment 48 heures comme annoncé, voire plus avec certaines fragrances. Je recommande ce médaillon les yeux fermés à toutes celles qui cherchent un bijou chargé de sens et de qualité.", products: ["Le Matria"] },
    { id: 6, name: "Constance R.", date: "il y a 2 mois", rating: 4, title: "Très satisfaite", text: "Le cœur du Matria est finement travaillé, les détails sont remarquables même de près. Mon seul petit regret serait d'avoir plus de disques de rechange inclus dans le coffret, car j'aime alterner entre plusieurs parfums. Mais la qualité globale du produit est vraiment au rendez-vous.", products: ["Le Matria"] },
    { id: 7, name: "Élisabeth F.", date: "il y a 3 mois", rating: 5, title: "Émouvant", text: "J'ai choisi le Matria pour y mettre le parfum de ma mère qui nous a quittés l'année dernière. Ce médaillon m'apporte un réconfort immense au quotidien. Chaque fois que je l'ouvre et que je sens son parfum, c'est comme si elle était encore là avec moi. Un bijou vraiment précieux.", products: ["Le Matria"] },
    { id: 8, name: "Victoire P.", date: "il y a 5 mois", rating: 5, title: "Sublime", text: "Le Matria est d'une beauté rare, je ne me lasse pas de le regarder et de le porter. Le motif cœur est gravé avec une précision remarquable. J'ai reçu tellement de compliments depuis que je le porte ! C'est devenu un sujet de conversation à chaque fois qu'on le remarque.", products: ["Le Matria", "L'Améthyste"] },
    { id: 9, name: "Adélaïde G.", date: "il y a 8 mois", rating: 3, title: "Bien", text: "Le médaillon Matria est joli et le concept me plaît beaucoup. Le fermoir demande un peu d'habitude pour s'ouvrir facilement, il m'a fallu quelques jours pour trouver le bon geste. Le parfum diffuse correctement mais peut-être un peu moins longtemps qu'espéré. Reste un beau bijou.", products: ["Le Matria"] },
    { id: 10, name: "Joséphine N.", date: "il y a 1 an", rating: 5, title: "Indémodable", text: "Voilà un an que je porte mon Matria presque quotidiennement et il n'a pas pris une ride ! La qualité est vraiment au rendez-vous, pas de trace d'oxydation ni d'usure visible. Le mécanisme fonctionne toujours parfaitement. Un investissement qui en vaut vraiment la peine.", products: ["Le Matria"] },
  ],
  "collier-diffuseur-le-volatis": [
    { id: 1, name: "Apolline R.", date: "il y a 2 jours", rating: 5, title: "Poétique", text: "Le Volatis avec son papillon est absolument magnifique ! C'est un bijou d'une délicatesse rare qui attire tous les regards. Les ailes sont finement ciselées et captent la lumière de façon magique. J'adore le symbole de transformation et de légèreté qu'il représente.", products: ["Le Volatis"] },
    { id: 2, name: "Capucine V.", date: "il y a 5 jours", rating: 5, title: "Coup de cœur", text: "Je cherchais depuis longtemps un bijou symbolique qui représente mon parcours personnel et le Volatis est parfait. Le papillon incarne ma transformation, ma renaissance après une période difficile. En plus d'être magnifique, ce médaillon porte en lui tout un message de renouveau.", products: ["Le Volatis"] },
    { id: 3, name: "Églantine C.", date: "il y a 2 semaines", rating: 4, title: "Très beau", text: "Le design du Volatis est vraiment original et élégant, le papillon est sculpté avec une grande précision. La diffusion du parfum fonctionne très bien, même si chez moi elle dure un peu moins longtemps que les 48 heures annoncées. Cela reste un très beau bijou que je porte avec plaisir.", products: ["Le Volatis"] },
    { id: 4, name: "Pénélope P.", date: "il y a 1 mois", rating: 5, title: "Merveilleux", text: "Ce médaillon papillon est une véritable œuvre d'art que je ne quitte plus depuis que je l'ai reçu. Chaque détail des ailes est travaillé avec minutie. On me demande souvent où je l'ai trouvé ! Le concept de diffusion de parfum est génial et fonctionne parfaitement.", products: ["Le Volatis", "Le Secret"] },
    { id: 5, name: "Garance G.", date: "il y a 2 mois", rating: 5, title: "Toujours aussi beau", text: "J'ai acheté mon Volatis il y a plusieurs mois maintenant et il est toujours aussi beau qu'au premier jour. Aucune trace d'usure, les finitions sont intactes. La qualité est vraiment au rendez-vous et justifie pleinement l'investissement. Je le recommande sans hésitation.", products: ["Le Volatis"] },
    { id: 6, name: "Sixtine H.", date: "il y a 3 mois", rating: 4, title: "Élégant", text: "Le papillon du Volatis est finement ciselé, c'est vraiment un travail d'artisan remarquable. Mon seul petit bémol concerne la longueur de la chaîne qui aurait pu être un peu plus longue pour mon goût. Mais le médaillon lui-même est parfait et je l'adore.", products: ["Le Volatis"] },
    { id: 7, name: "Olympe L.", date: "il y a 4 mois", rating: 5, title: "Symbolique", text: "Le papillon du Volatis symbolise ma renaissance après des années difficiles. Ce bijou n'est pas qu'un accessoire pour moi, c'est un rappel quotidien de ma force et de ma capacité à me transformer. En plus, le parfum de ma grand-mère y diffuse merveilleusement.", products: ["Le Volatis"] },
    { id: 8, name: "Agathe M.", date: "il y a 6 mois", rating: 5, title: "Parfait", text: "J'ai offert le Volatis à ma fille pour ses 18 ans et elle ne le quitte plus depuis ! Le papillon représente son envol vers l'âge adulte. Elle y a mis son premier parfum de grande et est tellement fière de le porter. Un cadeau symbolique et de qualité.", products: ["Le Volatis"] },
    { id: 9, name: "Colombe S.", date: "il y a 9 mois", rating: 3, title: "Correct", text: "Le design du Volatis est vraiment beau et original, le papillon attire les compliments. Cependant, le parfum tient moins longtemps qu'annoncé chez moi, environ 24-30 heures au lieu de 48. Cela reste un joli bijou que je porte régulièrement malgré ce petit bémol.", products: ["Le Volatis"] },
    { id: 10, name: "Albane K.", date: "il y a 1 an et 3 mois", rating: 5, title: "Mon porte-bonheur", text: "Plus d'un an que le Volatis m'accompagne dans toutes mes aventures. Ce papillon est devenu mon porte-bonheur, je ne pars jamais sans lui. La qualité est exceptionnelle, il est toujours aussi beau qu'au premier jour. Un bijou plein de sens qui me correspond parfaitement.", products: ["Le Volatis", "Le Gaia"] },
  ],
  "collier-diffuseur-l-amethyste": [
    { id: 1, name: "Clémence H.", date: "il y a 1 jour", rating: 5, title: "Raffiné", text: "Les arabesques florales de l'Améthyste sont d'une finesse absolument incroyable. C'est un vrai bijou d'artisanat que l'on peut admirer pendant des heures. Chaque détail est travaillé avec une précision remarquable. Un véritable chef-d'œuvre que je suis fière de porter.", products: ["L'Améthyste"] },
    { id: 2, name: "Éléonore M.", date: "il y a 4 jours", rating: 5, title: "Élégance pure", text: "L'Améthyste porte vraiment bien son nom, c'est un bijou précieux et délicat qui dégage une élégance rare. Il est devenu ma pièce préférée de toute ma collection de bijoux. Les motifs floraux sont sublimes et s'accordent avec toutes mes tenues, des plus simples aux plus habillées.", products: ["L'Améthyste"] },
    { id: 3, name: "Adeline B.", date: "il y a 1 semaine", rating: 4, title: "Superbe design", text: "Les motifs floraux de l'Améthyste sont véritablement sublimes, on voit le travail de précision derrière chaque arabesque. Mon seul petit bémol concerne le fermoir qui est parfois un peu difficile à manipuler, surtout quand on veut changer de disque. Mais le résultat final en vaut la peine.", products: ["L'Améthyste"] },
    { id: 4, name: "Romane F.", date: "il y a 3 semaines", rating: 5, title: "Magnifique", text: "L'Améthyste est sans conteste le plus beau modèle de la collection selon moi. Les détails des arabesques sont impressionnants de finesse. Je ne me lasse pas de l'admirer et de recevoir des compliments à chaque fois que je le porte. Un bijou d'exception qui vaut vraiment son prix.", products: ["L'Améthyste", "Le Matria"] },
    { id: 5, name: "Ségolène K.", date: "il y a 1 mois", rating: 5, title: "Exceptionnel", text: "L'Améthyste est un véritable travail d'orfèvre ! Je suis émerveillée chaque fois que je le regarde de près. Les arabesques florales captent la lumière de façon magique. C'est un bijou qui fait la différence et qui ne passe jamais inaperçu. Absolument ravie de mon achat.", products: ["L'Améthyste"] },
    { id: 6, name: "Tiphaine A.", date: "il y a 2 mois", rating: 4, title: "Très satisfaite", text: "Les arabesques de l'Améthyste sont véritablement magnifiques, d'une finesse rare. J'aurais simplement aimé avoir plus de choix de couleurs pour la chaîne. Mais le médaillon en lui-même est parfait et le parfum diffuse merveilleusement bien. Je le recommande vivement.", products: ["L'Améthyste"] },
    { id: 7, name: "Gwenaëlle D.", date: "il y a 4 mois", rating: 5, title: "Chef-d'œuvre", text: "Chaque détail de l'Améthyste est parfait, des arabesques délicates à la finition impeccable. Ce médaillon est une véritable œuvre d'art à porter. Je suis fière de le montrer et d'expliquer son fonctionnement à toutes les personnes qui me demandent d'où vient cette merveille.", products: ["L'Améthyste"] },
    { id: 8, name: "Solène P.", date: "il y a 6 mois", rating: 5, title: "Sublime", text: "L'Améthyste sublime absolument toutes mes tenues, des plus simples aux plus élaborées. C'est un bijou polyvalent, raffiné et chargé de sens. Je l'ai adopté dès le premier regard et six mois plus tard, il reste mon bijou préféré. La qualité est irréprochable.", products: ["L'Améthyste", "Le Volatis"] },
    { id: 9, name: "Axelle V.", date: "il y a 10 mois", rating: 3, title: "Joli mais délicat", text: "Les détails floraux de l'Améthyste sont vraiment beaux mais demandent de la délicatesse au quotidien. Il faut faire attention lors du nettoyage et éviter les chocs. Le parfum diffuse bien, mais ce n'est peut-être pas le modèle idéal pour une utilisation intensive.", products: ["L'Améthyste"] },
    { id: 10, name: "Blandine R.", date: "il y a 1 an et 1 mois", rating: 5, title: "Intemporel", text: "Plus d'un an après mon achat, l'Améthyste est toujours aussi beau et fonctionnel. Les arabesques n'ont pas perdu de leur éclat. C'est un investissement qui en vaut vraiment la peine pour un bijou de cette qualité. Je le porterai encore pendant de nombreuses années.", products: ["L'Améthyste"] },
  ],
  "collier-diffuseur-le-gaia": [
    { id: 1, name: "Églantine S.", date: "il y a 2 jours", rating: 5, title: "Symbolique", text: "L'arbre de vie du Gaia représente tellement pour moi et ma famille. Ce médaillon a une vraie signification profonde, il symbolise nos racines et notre connexion. Je l'ai choisi pour porter le parfum de ma maison et me sentir proche des miens où que je sois.", products: ["Le Gaia"] },
    { id: 2, name: "Athénaïs L.", date: "il y a 1 semaine", rating: 5, title: "Émouvant", text: "J'ai acheté le Gaia juste après la naissance de ma fille. L'arbre de vie représente notre lien éternel, les racines de notre famille qui s'agrandit. J'y ai mis le parfum de sa chambre et chaque fois que je l'ouvre, je pense à elle avec tendresse.", products: ["Le Gaia"] },
    { id: 3, name: "Flore D.", date: "il y a 2 semaines", rating: 4, title: "Très satisfaite", text: "Le Gaia est vraiment magnifique, l'arbre de vie est finement gravé avec beaucoup de détails. Le parfum tient bien les 48 heures promises. Mon seul petit regret serait une chaîne un peu plus longue, mais je peux la changer facilement. Très contente de mon achat.", products: ["Le Gaia"] },
    { id: 4, name: "Daphné R.", date: "il y a 1 mois", rating: 3, title: "Correct", text: "Le médaillon Gaia est joli mais je trouve que les détails de l'arbre sont un peu moins fins que sur les photos du site. Cela reste un bon produit qui fonctionne bien et le concept est génial. Le parfum diffuse correctement pendant environ 40 heures.", products: ["Le Gaia"] },
    { id: 5, name: "Aurore A.", date: "il y a 2 mois", rating: 5, title: "Mon talisman", text: "Le Gaia m'accompagne dans tous mes moments importants depuis deux mois maintenant. L'arbre de vie est devenu mon vrai porte-bonheur, je le touche avant chaque événement important. Le parfum de mon mari me donne confiance et me rappelle son soutien.", products: ["Le Gaia", "Le Secret"] },
    { id: 6, name: "Perrine T.", date: "il y a 3 mois", rating: 5, title: "Cadeau parfait", text: "J'ai offert le Gaia à ma mère pour la fête des mères et elle était aux anges ! L'arbre de vie représente notre famille et elle y a mis le parfum de notre maison d'enfance. Elle le porte tous les jours et me remercie encore pour ce cadeau si symbolique.", products: ["Le Gaia"] },
    { id: 7, name: "Laure B.", date: "il y a 5 mois", rating: 4, title: "Beau symbole", text: "L'arbre de vie du Gaia est vraiment magnifique et chargé de sens. Les branches et les racines sont finement dessinées. La chaîne aurait pu être un peu plus longue pour mon goût, mais le médaillon en lui-même est parfait. Je suis contente de mon choix.", products: ["Le Gaia"] },
    { id: 8, name: "Noémie G.", date: "il y a 7 mois", rating: 5, title: "Merveilleux", text: "Ce médaillon Gaia raconte une histoire, celle de ma famille et de nos racines. Chaque fois que je le porte, je pense à mes parents, mes grands-parents et à tous ceux qui m'ont précédée. C'est un bijou profondément émouvant qui va bien au-delà d'un simple accessoire.", products: ["Le Gaia"] },
    { id: 9, name: "Ludivine C.", date: "il y a 11 mois", rating: 5, title: "Parfait", text: "Presque un an que je porte le Gaia et je suis toujours aussi satisfaite de mon achat. La qualité est impeccable, aucune trace d'usure visible. L'arbre de vie reste aussi beau qu'au premier jour. Un bijou chargé de sens que je porterai encore longtemps.", products: ["Le Gaia"] },
    { id: 10, name: "Bertille H.", date: "il y a 1 an et 4 mois", rating: 5, title: "Indispensable", text: "Le Gaia ne me quitte jamais depuis plus d'un an. C'est devenu mon bijou indispensable, celui que je porte pour toutes les occasions. L'arbre de vie me rappelle mes valeurs familiales et le parfum de ma grand-mère me réconforte au quotidien. Un bijou qui a une vraie âme.", products: ["Le Gaia", "Le Matria"] },
  ],
  "collier-diffuseur-le-nao": [
    { id: 1, name: "Mélissa P.", date: "il y a 1 jour", rating: 5, title: "Touchant", text: "Les petites empreintes de pieds du Nao sont absolument adorables ! Je le porte avec le parfum de mon bébé et c'est comme si je l'avais toujours près de moi, même quand je suis au travail. Un bijou profondément touchant pour toutes les mamans.", products: ["Le Nao"] },
    { id: 2, name: "Johanna M.", date: "il y a 4 jours", rating: 5, title: "Parfait pour maman", text: "Le Nao est le cadeau idéal pour une jeune maman, j'en suis la preuve ! Ma sœur me l'a offert à la naissance de mon fils et j'ai fondu en larmes de joie. Les empreintes représentent les premiers pas de mon bébé. Un bijou que je chérirai toute ma vie.", products: ["Le Nao"] },
    { id: 3, name: "Priscilla T.", date: "il y a 1 semaine", rating: 5, title: "Émotion garantie", text: "Chaque fois que j'ouvre mon Nao et que je sens le parfum de mes enfants, l'émotion me submerge. C'est un bijou incroyablement touchant qui me connecte à eux où que je sois. Les empreintes sont gravées avec finesse. Un concept génial pour les mamans.", products: ["Le Nao", "Le Gaia"] },
    { id: 4, name: "Mélanie J.", date: "il y a 3 semaines", rating: 4, title: "Très mignon", text: "Les petites empreintes de pieds du Nao sont vraiment craquantes et très bien réalisées. Mon seul petit regret serait que la chaîne soit un peu plus longue, mais je peux facilement en trouver une autre. Le médaillon en lui-même est parfait et émouvant.", products: ["Le Nao"] },
    { id: 5, name: "Stéphanie B.", date: "il y a 1 mois", rating: 5, title: "Indispensable", text: "Le Nao ne me quitte plus depuis un mois. J'y ai mis le parfum de la chambre de mes enfants et c'est devenu un lien invisible avec eux où que je sois. Quand ils me manquent au bureau, j'ouvre le médaillon et je me sens immédiatement apaisée.", products: ["Le Nao"] },
    { id: 6, name: "Karine V.", date: "il y a 2 mois", rating: 5, title: "Adorable", text: "Les empreintes de pieds du Nao sont si mignonnes ! C'est un bijou unique qui me fait sourire chaque jour. Toutes mes collègues mamans l'ont remarqué et veulent le même. La diffusion du parfum fonctionne parfaitement et dure vraiment 48 heures.", products: ["Le Nao"] },
    { id: 7, name: "Sonia F.", date: "il y a 4 mois", rating: 4, title: "Très bien", text: "Le Nao est un beau médaillon au concept vraiment touchant pour les mamans. Les empreintes sont adorables. Le parfum pourrait tenir un peu plus longtemps selon la fragrance utilisée, mais globalement je suis très satisfaite de mon achat.", products: ["Le Nao"] },
    { id: 8, name: "Sabrina L.", date: "il y a 6 mois", rating: 5, title: "Émouvant", text: "J'ai mis dans mon Nao le parfum de ma fille et c'est devenu mon bijou préféré. Quand elle est à l'école et qu'elle me manque, j'ouvre le médaillon et je l'ai près de moi instantanément. Les empreintes de pieds sont un symbole tellement fort pour une maman.", products: ["Le Nao"] },
    { id: 9, name: "Delphine N.", date: "il y a 9 mois", rating: 3, title: "Mignon", text: "Le design du Nao est vraiment adorable avec ses empreintes de pieds. Elles sont cependant un peu plus petites que je ne l'imaginais. Le médaillon fonctionne bien et le parfum diffuse correctement. C'est un joli bijou symbolique pour les mamans.", products: ["Le Nao"] },
    { id: 10, name: "Patricia G.", date: "il y a 1 an et 2 mois", rating: 5, title: "Mon bijou préféré", text: "Voilà plus d'un an que le Nao m'accompagne au quotidien et il représente tellement pour moi en tant que maman. Les empreintes symbolisent les premiers pas de mes enfants et le parfum me connecte à eux. Un bijou précieux que je ne quitterai jamais.", products: ["Le Nao", "Le Félix"] },
  ],
  "collier-diffuseur-le-secret": [
    { id: 1, name: "Séverine N.", date: "il y a 2 jours", rating: 5, title: "Mystérieux", text: "Le motif serrure du Secret est vraiment original et intrigant. J'adore le côté mystérieux de ce bijou qui cache un parfum secret. Tout le monde me demande ce que c'est et je prends plaisir à garder le mystère. Un concept génial et une réalisation parfaite.", products: ["Le Secret"] },
    { id: 2, name: "Angélique C.", date: "il y a 5 jours", rating: 5, title: "Original", text: "Le Secret est vraiment unique, personne dans mon entourage n'a le même ! Le motif serrure attire la curiosité et j'adore expliquer le concept aux personnes intriguées. C'est un bijou qui fait parler et qui porte en lui une vraie histoire à raconter.", products: ["Le Secret"] },
    { id: 3, name: "Élodie V.", date: "il y a 2 semaines", rating: 4, title: "Élégant", text: "Le design du Secret est très réussi, la serrure est finement gravée et le résultat est élégant. Une petite clé assortie aurait été un ajout charmant ! Le parfum diffuse parfaitement et je suis globalement très satisfaite de ce médaillon original.", products: ["Le Secret"] },
    { id: 4, name: "Nadia G.", date: "il y a 1 mois", rating: 5, title: "Mon petit secret", text: "J'aime cette idée de porter un secret sur moi, c'est poétique et intime. J'y ai mis le parfum de mon mari et c'est comme garder notre amour près de mon cœur. Le médaillon est magnifique et la qualité est au rendez-vous. Un bijou qui a du sens.", products: ["Le Secret", "Le Matria"] },
    { id: 5, name: "Corinne H.", date: "il y a 2 mois", rating: 5, title: "Toujours fan", text: "Plusieurs mois après mon achat, le Secret garde toute sa magie et son mystère. La qualité est irréprochable, aucune trace d'usure. Je le porte presque quotidiennement et il reste mon bijou préféré. Le concept de la serrure est vraiment original.", products: ["Le Secret"] },
    { id: 6, name: "Magali T.", date: "il y a 3 mois", rating: 4, title: "Très joli", text: "Le design serrure du Secret est vraiment original et se démarque des autres bijoux. Le parfum tient bien et la chaîne est de bonne qualité. Mon seul petit regret serait d'avoir un peu plus de choix de finitions, mais je suis contente de mon achat.", products: ["Le Secret"] },
    { id: 7, name: "Dorothée L.", date: "il y a 5 mois", rating: 5, title: "Coup de cœur", text: "Le Secret a quelque chose de mystique et de fascinant. Je me sens spéciale quand je le porte, comme si je détenais un secret précieux. Le motif serrure est élégant et intrigant. C'est devenu mon bijou fétiche pour les occasions importantes.", products: ["Le Secret"] },
    { id: 8, name: "Amandine B.", date: "il y a 7 mois", rating: 5, title: "Parfait", text: "Ce médaillon Secret intrigue absolument tout le monde ! On me demande toujours où je l'ai trouvé et ce qu'il contient. J'adore garder le mystère et partager le concept avec les curieux. Un bijou original qui fait parler et qui fonctionne parfaitement.", products: ["Le Secret", "L'Avia"] },
    { id: 9, name: "Virginie R.", date: "il y a 10 mois", rating: 3, title: "Bien", text: "Le design serrure du Secret est vraiment beau et original. Cependant, les détails du motif peuvent accumuler un peu de poussière et nécessitent un entretien régulier. Le parfum diffuse bien. C'est un joli bijou qui demande un peu de soin.", products: ["Le Secret"] },
    { id: 10, name: "Nadège P.", date: "il y a 1 an et 5 mois", rating: 5, title: "Intemporel", text: "Plus d'un an et le Secret est toujours aussi mystérieux et fascinant. C'est un bijou qui ne se démode pas et qui garde tout son charme. La qualité est exceptionnelle, aucun signe d'usure. Un investissement durable pour un bijou plein de sens.", products: ["Le Secret"] },
  ],
  "collier-diffuseur-le-felix": [
    { id: 1, name: "Morgane L.", date: "il y a 1 jour", rating: 5, title: "Pour les amoureuses des chats", text: "Le Félix est parfait pour moi qui suis une vraie amoureuse des chats ! Le petit félin est trop mignon et finement sculpté. J'y ai mis le parfum de mon chat et je l'ai toujours près de moi. Un bijou adorable pour tous les fans de félins.", products: ["Le Félix"] },
    { id: 2, name: "Audrey R.", date: "il y a 3 jours", rating: 5, title: "Adorable", text: "Le petit chat du Félix est vraiment craquant, les détails sont impressionnants ! Je reçois constamment des compliments sur ce médaillon. Toutes mes amies qui aiment les chats en veulent un. C'est devenu un vrai sujet de conversation.", products: ["Le Félix"] },
    { id: 3, name: "Jessica P.", date: "il y a 1 semaine", rating: 4, title: "Très joli", text: "Le Félix est un super design pour tous les fans de félins comme moi. J'y ai mis le parfum de ma maison et mon chat me suit partout maintenant ! Le médaillon est bien réalisé, seule la chaîne pourrait être un peu plus longue à mon goût.", products: ["Le Félix"] },
    { id: 4, name: "Fanny D.", date: "il y a 3 semaines", rating: 5, title: "Mon chat en bijou", text: "J'ai mis le parfum de mon chat adoré dans le Félix et c'est devenu un souvenir précieux que je porte chaque jour. Le petit félin gravé me rappelle mon compagnon à quatre pattes. Un bijou touchant et de grande qualité pour les amoureux des chats.", products: ["Le Félix"] },
    { id: 5, name: "Christelle S.", date: "il y a 1 mois", rating: 3, title: "Mignon mais délicat", text: "Le design du Félix est vraiment adorable, le petit chat est craquant. Cependant, les détails sont fins et demandent de la délicatesse. J'ai dû faire attention lors du nettoyage. Le parfum diffuse bien. Un joli bijou qui nécessite un peu de soin.", products: ["Le Félix"] },
    { id: 6, name: "Marina K.", date: "il y a 2 mois", rating: 5, title: "Craquant", text: "Le Félix est absolument irrésistible ! Toutes mes amies cat lovers en veulent un après l'avoir vu. Le petit chat est finement sculpté et attire tous les regards. La diffusion du parfum fonctionne parfaitement. Un bijou unique pour les fans de félins.", products: ["Le Félix", "Le Volatis"] },
    { id: 7, name: "Célia A.", date: "il y a 4 mois", rating: 5, title: "Parfait", text: "J'ai choisi le Félix en mémoire de mon chat parti trop tôt. J'y ai mis son parfum et ce bijou me réconforte chaque jour. Le petit félin me rappelle tous nos bons moments ensemble. C'est un bijou émouvant et de grande qualité.", products: ["Le Félix"] },
    { id: 8, name: "Laurence M.", date: "il y a 6 mois", rating: 4, title: "Très mignon", text: "Le chat du Félix est vraiment adorable et bien réalisé. J'aurais aimé qu'il soit un peu plus grand pour mieux voir les détails, mais il reste très joli. Le concept fonctionne bien et le parfum diffuse correctement. Un bijou original.", products: ["Le Félix"] },
    { id: 9, name: "Sylvie F.", date: "il y a 9 mois", rating: 5, title: "Mon favori", text: "Parmi tous les modèles de la collection, le Félix reste mon préféré. Je suis une vraie cat lover et ce bijou me représente parfaitement. Je le porte quotidiennement depuis 9 mois et il est toujours aussi beau. Un must pour les amoureux des chats.", products: ["Le Félix"] },
    { id: 10, name: "Valérie T.", date: "il y a 1 an", rating: 5, title: "Toujours aussi beau", text: "Voilà un an que je porte le Félix quotidiennement et il n'y a pas une seule trace d'usure ! La qualité est vraiment exceptionnelle. Le petit chat est toujours aussi mignon et le mécanisme fonctionne parfaitement. Un investissement durable.", products: ["Le Félix", "Le Nao"] },
  ],
  "collier-diffuseur-l-avia": [
    { id: 1, name: "Anaëlle F.", date: "il y a 2 jours", rating: 5, title: "Liberté", text: "L'oiseau de l'Avia représente ma liberté retrouvée après des années difficiles. Ce bijou a une vraie signification profonde pour moi. Les ailes déployées symbolisent mon envol vers une nouvelle vie. Un médaillon magnifique chargé de sens.", products: ["L'Avia"] },
    { id: 2, name: "Lucile B.", date: "il y a 4 jours", rating: 5, title: "Poétique", text: "L'Avia est d'une légèreté et d'une élégance absolument folle. C'est devenu mon bijou préféré de toute la collection. L'oiseau en vol est magnifiquement sculpté et le parfum diffuse merveilleusement. Un bijou poétique qui fait rêver.", products: ["L'Avia"] },
    { id: 3, name: "Estelle V.", date: "il y a 1 semaine", rating: 5, title: "Sublime", text: "Les ailes de l'oiseau de l'Avia sont finement travaillées avec une précision remarquable. C'est un véritable chef-d'œuvre d'artisanat. Je ne me lasse pas de l'admirer et de recevoir des compliments. Un bijou d'exception qui sort de l'ordinaire.", products: ["L'Avia"] },
    { id: 4, name: "Géraldine M.", date: "il y a 3 semaines", rating: 4, title: "Très beau", text: "Le design de l'Avia est vraiment magnifique et original, l'oiseau en vol est impressionnant. La diffusion du parfum pourrait durer un peu plus longtemps selon les fragrances, mais globalement je suis très satisfaite de ce médaillon élégant.", products: ["L'Avia"] },
    { id: 5, name: "Fabienne T.", date: "il y a 1 mois", rating: 5, title: "Mon porte-bonheur", text: "L'Avia m'accompagne partout depuis un mois et il est toujours aussi beau qu'au premier jour. L'oiseau est devenu mon porte-bonheur, je le touche avant chaque moment important. Le parfum de ma mère y diffuse et me donne confiance.", products: ["L'Avia", "Le Gaia"] },
    { id: 6, name: "Natacha L.", date: "il y a 2 mois", rating: 5, title: "Magnifique", text: "L'oiseau de l'Avia est d'une finesse incroyable, chaque plume semble réelle. Ce médaillon attire tous les compliments et les regards. C'est un bijou qui ne passe pas inaperçu et qui porte en lui un message de liberté et d'élégance.", products: ["L'Avia"] },
    { id: 7, name: "Émeline D.", date: "il y a 4 mois", rating: 4, title: "Élégant", text: "Le design de l'Avia est vraiment sublime, l'oiseau en vol est magnifique. Mon petit bémol concerne les détails fins qui demandent un entretien soigneux pour rester impeccables. Mais le résultat en vaut la peine. Un bijou élégant.", products: ["L'Avia"] },
    { id: 8, name: "Lauriane G.", date: "il y a 6 mois", rating: 5, title: "Symbole de liberté", text: "Cet oiseau en vol représente mon envol vers une nouvelle vie, ma liberté retrouvée. L'Avia est un bijou profondément chargé d'émotion et de sens pour moi. Le parfum de mon nouveau chez-moi y diffuse et me rappelle mon nouveau départ.", products: ["L'Avia"] },
    { id: 9, name: "Rosalie P.", date: "il y a 8 mois", rating: 3, title: "Joli", text: "Le design de l'Avia est vraiment beau, l'oiseau est élégant. Je trouve cependant qu'il est un peu plus petit que je ne l'imaginais sur les photos. Le parfum diffuse correctement. C'est un joli bijou, peut-être pas le plus impressionnant de la collection.", products: ["L'Avia"] },
    { id: 10, name: "Typhaine H.", date: "il y a 1 an et 6 mois", rating: 5, title: "Exceptionnel", text: "Un an et demi de bonheur avec l'Avia ! C'est devenu mon bijou préféré, celui que je porte pour toutes les occasions importantes. L'oiseau est intemporel et élégant, la qualité est exceptionnelle. Un investissement que je ne regrette absolument pas.", products: ["L'Avia", "Le Secret"] },
  ],
};

// Default reviews for products not in the list
const defaultReviews: Review[] = [
  { id: 1, name: "Hortense L.", date: "il y a 2 jours", rating: 5, title: "Excellent", text: "Très satisfaite de mon achat. La qualité est vraiment au rendez-vous et le design est magnifique. Le parfum diffuse parfaitement pendant 48 heures comme annoncé. Je recommande ce médaillon les yeux fermés.", products: ["Ce modèle"] },
  { id: 2, name: "Blanche B.", date: "il y a 5 jours", rating: 5, title: "Parfait", text: "Exactement ce que je cherchais ! Un bijou élégant qui porte mon parfum préféré partout avec moi. La finition est impeccable et la chaîne est de très bonne qualité. Je recommande vivement.", products: ["Ce modèle"] },
  { id: 3, name: "Céleste D.", date: "il y a 2 semaines", rating: 4, title: "Très bien", text: "Bon produit avec une livraison rapide. La qualité est au rendez-vous. Quelques petits détails pourraient être améliorés mais dans l'ensemble je suis satisfaite de mon achat.", products: ["Ce modèle"] },
  { id: 4, name: "Eugénie R.", date: "il y a 1 mois", rating: 5, title: "Super", text: "Ravie de mon achat, je porte ce médaillon tous les jours avec plaisir. Le design est élégant et le parfum tient vraiment longtemps. Un bijou qui a du sens et de la qualité.", products: ["Ce modèle"] },
  { id: 5, name: "Henriette M.", date: "il y a 2 mois", rating: 4, title: "Satisfaite", text: "Bon rapport qualité-prix pour ce médaillon. Le concept est génial et fonctionne bien. Je recommande ce bijou à toutes celles qui cherchent une façon originale de porter leur parfum.", products: ["Ce modèle"] },
  { id: 6, name: "Marguerite C.", date: "il y a 3 mois", rating: 5, title: "Magnifique", text: "Un bijou d'une rare élégance qui attire tous les compliments. Je suis enchantée de mon achat et je le porte quotidiennement. La qualité est exceptionnelle et le concept génial.", products: ["Ce modèle"] },
  { id: 7, name: "Philippine V.", date: "il y a 5 mois", rating: 3, title: "Correct", text: "Le produit est conforme à la description mais le parfum tient un peu moins longtemps que prévu chez moi. Cela reste un joli bijou avec un concept original. Satisfaite globalement.", products: ["Ce modèle"] },
  { id: 8, name: "Cunégonde F.", date: "il y a 8 mois", rating: 5, title: "Sublime", text: "Ce médaillon est devenu mon indispensable du quotidien. La qualité est exceptionnelle et le design magnifique. Je reçois régulièrement des compliments et je suis fière de le porter.", products: ["Ce modèle"] },
  { id: 9, name: "Guillemette P.", date: "il y a 11 mois", rating: 5, title: "Merveilleux", text: "Presque un an de bonheur avec ce bijou qui n'a pas bougé. La qualité est vraiment au rendez-vous. C'est un investissement que je ne regrette pas et que je recommande.", products: ["Ce modèle"] },
  { id: 10, name: "Aliénor S.", date: "il y a 1 an et 3 mois", rating: 5, title: "Parfait", text: "Un investissement qui en vaut largement la peine. Plus d'un an après, mon médaillon est toujours aussi beau et fonctionnel. Je le recommande à toutes celles qui hésitent encore !", products: ["Ce modèle"] },
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

export default memo(ProductReviews);
