import { Coffee, Briefcase, Heart, Gift } from "lucide-react";

const Lifestyle = () => {
  return (
    <section className="py-24 bg-champagne/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <span className="text-sm font-sans font-medium tracking-[0.3em] uppercase text-emerald">
              Au quotidien
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground">
              Votre compagnon
              <br />
              <span className="italic text-burgundy">de chaque instant</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Que ce soit pour vous-même ou comme cadeau précieux, 
              ce médaillon s'intègre naturellement dans tous les moments de votre vie.
            </p>
          </div>

          {/* Lifestyle scenarios */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald/5 to-background p-8 border border-border hover:border-emerald/30 transition-all duration-300 hover:shadow-medium">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald/5 rounded-full blur-2xl group-hover:bg-emerald/10 transition-colors"></div>
              <div className="relative space-y-4">
                <div className="w-12 h-12 bg-emerald/10 rounded-full flex items-center justify-center">
                  <Coffee className="w-6 h-6 text-emerald" />
                </div>
                <h3 className="font-serif text-2xl text-foreground">Vie quotidienne</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Au bureau, en rendez-vous, pendant vos courses — 
                  votre parfum vous suit discrètement, 
                  créant une bulle de bien-être personnel toute la journée.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-burgundy/5 to-background p-8 border border-border hover:border-burgundy/30 transition-all duration-300 hover:shadow-medium">
              <div className="absolute top-0 right-0 w-32 h-32 bg-burgundy/5 rounded-full blur-2xl group-hover:bg-burgundy/10 transition-colors"></div>
              <div className="relative space-y-4">
                <div className="w-12 h-12 bg-burgundy/10 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-burgundy" />
                </div>
                <h3 className="font-serif text-2xl text-foreground">Moments intimes</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Rendez-vous amoureux, retrouvailles, 
                  instants privés — portez le parfum qui évoque 
                  les souvenirs les plus doux et les plus précieux.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald/5 to-background p-8 border border-border hover:border-emerald/30 transition-all duration-300 hover:shadow-medium">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald/5 rounded-full blur-2xl group-hover:bg-emerald/10 transition-colors"></div>
              <div className="relative space-y-4">
                <div className="w-12 h-12 bg-emerald/10 rounded-full flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-emerald" />
                </div>
                <h3 className="font-serif text-2xl text-foreground">Voyages & déplacements</h3>
                <p className="text-muted-foreground leading-relaxed">
                  En voyage d'affaires ou en vacances, 
                  gardez votre fragrance favorite sans vous encombrer. 
                  Légèreté et élégance en toutes circonstances.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-burgundy/5 to-background p-8 border border-border hover:border-burgundy/30 transition-all duration-300 hover:shadow-medium">
              <div className="absolute top-0 right-0 w-32 h-32 bg-burgundy/5 rounded-full blur-2xl group-hover:bg-burgundy/10 transition-colors"></div>
              <div className="relative space-y-4">
                <div className="w-12 h-12 bg-burgundy/10 rounded-full flex items-center justify-center">
                  <Gift className="w-6 h-6 text-burgundy" />
                </div>
                <h3 className="font-serif text-2xl text-foreground">Cadeau d'exception</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pour un anniversaire, la Saint-Valentin, 
                  une occasion spéciale — offrez un présent 
                  qui porte en lui votre intention et votre affection.
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial-style section */}
          <div className="bg-gradient-to-br from-emerald/5 via-background to-burgundy/5 rounded-3xl p-12 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="w-16 h-16 bg-champagne rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">💝</span>
              </div>
              <p className="font-serif text-2xl md:text-3xl text-foreground italic leading-relaxed">
                "Je porte le parfum de mon mari quand il voyage. 
                C'est comme s'il était toujours près de moi."
              </p>
              <div className="text-sm text-muted-foreground font-sans">
                — Une cliente Osmose
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lifestyle;
