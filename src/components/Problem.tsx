import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Problem = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-12 md:py-16 bg-champagne/30">
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl mx-auto text-center space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-sm font-sans font-medium tracking-[0.3em] uppercase text-emerald">
            Le désir
          </span>
          
          <h2 className="font-display text-3xl md:text-4xl tracking-wide leading-relaxed text-foreground">
            Un parfum s'évapore, <span className="italic text-burgundy">un souvenir reste</span>
          </h2>
          
          <p className="font-sans text-body-text leading-loose text-base md:text-lg max-w-2xl mx-auto">
            On aime un parfum, mais il s'évapore trop vite. On veut rester proche d'un souvenir, d'un être aimé, d'une émotion qui nous traverse.
          </p>
          
          <p className="font-sans text-body-text/80 leading-loose text-sm md:text-base max-w-xl mx-auto">
            Ce bijou est né de ce désir : <span className="text-foreground">porter une fragrance comme on porte un secret</span>.
          </p>

        </div>
      </div>
    </section>
  );
};

export default Problem;
