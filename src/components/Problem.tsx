const Problem = () => {
  return (
    <section className="py-24 bg-champagne/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="text-sm font-sans font-medium tracking-[0.3em] uppercase text-emerald">
            Le désir
          </span>
          
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground">
            Un parfum s'évapore,
            <br />
            <span className="italic text-burgundy">un souvenir reste</span>
          </h2>
          
          <div className="prose prose-lg mx-auto font-sans text-muted-foreground leading-relaxed">
            <p className="text-xl">
              On aime un parfum, mais il s'évapore trop vite. 
              On ne peut pas toujours le porter. 
              On veut rester proche d'un souvenir, d'un être aimé, d'une émotion qui nous traverse.
            </p>
            <p className="text-lg pt-4">
              Ce bijou est né de ce désir : garder près de soi ce qui nous touche, 
              <span className="text-foreground font-medium"> porter une fragrance comme on porte un secret</span>, 
              faire revivre un instant à chaque respiration.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-12">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-emerald/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-serif text-xl text-foreground">Éphémère</h3>
              <p className="text-sm text-muted-foreground">
                Les parfums traditionnels s'évaporent en quelques heures
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-burgundy/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">💭</span>
              </div>
              <h3 className="font-serif text-xl text-foreground">Mémoire</h3>
              <p className="text-sm text-muted-foreground">
                Chaque fragrance rappelle un moment, une personne
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="w-12 h-12 bg-emerald/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🤍</span>
              </div>
              <h3 className="font-serif text-xl text-foreground">Proximité</h3>
              <p className="text-sm text-muted-foreground">
                Le besoin de garder un lien invisible mais constant
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
