import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Questions Fréquentes
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tout ce que vous devez savoir sur votre médaillon-diffuseur de
            parfum
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem
              value="item-1"
              className="border border-border/50 rounded-lg px-6 bg-card hover:border-primary/30 transition-colors"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-medium text-foreground">
                  Comment fonctionne le médaillon diffuseur ?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Le médaillon contient un disque absorbant spécial. Vaporisez
                simplement votre parfum préféré sur ce disque, refermez le
                médaillon, et portez-le autour de votre cou. Le parfum diffuse
                délicatement tout au long de la journée, sans contact direct
                avec votre peau.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="border border-border/50 rounded-lg px-6 bg-card hover:border-primary/30 transition-colors"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-medium text-foreground">
                  Combien de temps dure le parfum ?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                La diffusion du parfum dure environ 48 heures. Après ce délai,
                il suffit de vaporiser à nouveau le disque absorbant pour
                renouveler la fragrance. C'est simple, discret et infiniment
                renouvelable.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border border-border/50 rounded-lg px-6 bg-card hover:border-primary/30 transition-colors"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-medium text-foreground">
                  Peut-on changer de parfum facilement ?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Absolument ! Vous pouvez changer de parfum à volonté. Il suffit
                de laisser le disque absorbant s'aérer quelques heures ou de le
                remplacer par un nouveau disque (fourni avec votre médaillon).
                Vous pouvez ainsi adapter votre fragrance à votre humeur, votre
                tenue, ou l'occasion.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="border border-border/50 rounded-lg px-6 bg-card hover:border-primary/30 transition-colors"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-medium text-foreground">
                  Le médaillon est-il hypoallergénique ?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Oui. Nos médaillons sont fabriqués en acier inoxydable de haute
                qualité, hypoallergénique et sans nickel. Le parfum ne touche
                jamais directement votre peau, ce qui convient parfaitement aux
                peaux sensibles. Élégance et confort absolu.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-5"
              className="border border-border/50 rounded-lg px-6 bg-card hover:border-primary/30 transition-colors"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-medium text-foreground">
                  Comment entretenir mon médaillon ?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                L'entretien est minimal. Nettoyez délicatement le médaillon
                avec un chiffon doux et sec pour préserver son éclat. Les
                disques absorbants peuvent être remplacés régulièrement pour
                maintenir une diffusion optimale. Conservez votre médaillon dans
                son écrin lorsque vous ne le portez pas.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-6"
              className="border border-border/50 rounded-lg px-6 bg-card hover:border-primary/30 transition-colors"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-medium text-foreground">
                  Est-ce un cadeau approprié ?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Le médaillon Osmose est le cadeau parfait pour exprimer un
                sentiment profond. Offrez-le avec le parfum préféré de la
                personne, ou laissez-la choisir sa propre fragrance. C'est un
                présent intime, symbolique, qui crée un lien invisible et
                durable. Idéal pour un anniversaire, une Saint-Valentin, une
                naissance ou simplement pour dire "je pense à toi".
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
