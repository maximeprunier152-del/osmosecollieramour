import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Emotion = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="emotion" ref={ref} className="py-24 bg-gradient-to-br from-burgundy/10 via-background to-emerald/5 relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-burgundy rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <span className="text-sm font-sans font-medium tracking-[0.3em] uppercase text-burgundy">
              L'essence
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground">
              Plus qu'un bijou,
              <br />
              <span className="italic text-emerald">un talisman émotionnel</span>
            </h2>
          </div>

          {/* Main emotional content */}
          <div className="space-y-8 mb-16">
            <p className="font-serif text-2xl md:text-3xl text-foreground text-center leading-relaxed italic">
              « Le parfum devient un invisible lien entre vous et qui vous voulez. »
            </p>

            <div className="prose prose-lg mx-auto font-sans text-muted-foreground leading-relaxed text-center">
              <p className="text-lg">
                Ce collier-médaillon n'est pas qu'un accessoire élégant. 
                C'est un <span className="text-foreground font-medium">confident silencieux</span>, 
                un <span className="text-foreground font-medium">gardien de mémoire</span>, 
                un <span className="text-foreground font-medium">pont entre les âmes</span>.
              </p>
            </div>
          </div>

          {/* Emotional benefits grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-emerald/30 transition-colors duration-300 shadow-soft hover:shadow-medium">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-emerald/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🌙</span>
                </div>
                <h3 className="font-serif text-2xl text-foreground">Souvenirs incarnés</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Portez le parfum de votre moitié quand elle est loin. 
                  Gardez près de vous l'essence d'un moment précieux, 
                  d'un voyage inoubliable, d'une personne chère.
                </p>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-burgundy/30 transition-colors duration-300 shadow-soft hover:shadow-medium">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-burgundy/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">💫</span>
                </div>
                <h3 className="font-serif text-2xl text-foreground">Intimité portable</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Votre fragrance signature vous accompagne discrètement. 
                  Un murmure olfactif qui ne s'impose pas, 
                  mais qui vous enveloppe d'une aura personnelle et unique.
                </p>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-emerald/30 transition-colors duration-300 shadow-soft hover:shadow-medium">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-emerald/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🕊️</span>
                </div>
                <h3 className="font-serif text-2xl text-foreground">Réconfort quotidien</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dans les moments de doute ou de solitude, 
                  ce parfum familier vous rappelle qui vous êtes, 
                  ce qui compte, ceux que vous aimez.
                </p>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-burgundy/30 transition-colors duration-300 shadow-soft hover:shadow-medium">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-burgundy/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="font-serif text-2xl text-foreground">Cadeau chargé de sens</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Offrir ce médaillon, c'est offrir un morceau de soi, 
                  une intention, une présence. 
                  Le cadeau le plus intime qui soit.
                </p>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="text-center space-y-6 py-12">
            <blockquote className="font-serif text-xl md:text-2xl text-foreground italic leading-relaxed">
              "Ce bijou porte l'âme d'un parfum. 
              Il fait revivre un souvenir. 
              Il rapproche des êtres."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Emotion;
