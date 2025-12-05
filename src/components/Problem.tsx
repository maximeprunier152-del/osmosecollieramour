import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Problem = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 bg-champagne/30">
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl mx-auto text-center space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-sm font-sans font-medium tracking-[0.3em] uppercase text-emerald">
            Le désir
          </span>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-wide leading-tight text-foreground">
            Un parfum s'évapore,
            <br />
            <span className="italic text-burgundy">un souvenir reste</span>
          </h2>
          
          <div className="prose prose-lg mx-auto font-sans text-body-text leading-relaxed">
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

        </div>
      </div>
    </section>
  );
};

export default Problem;
