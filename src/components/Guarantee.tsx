import { Shield, Truck, Award, Heart } from "lucide-react";

const Guarantee = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <span className="text-sm font-sans font-medium tracking-[0.3em] uppercase text-emerald">
              Notre promesse
            </span>
            <h2 className="font-display text-4xl md:text-5xl tracking-wide text-foreground">
              Qualité, soin & <span className="italic text-burgundy">discrétion</span>
            </h2>
          </div>

          {/* Guarantee features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="text-center space-y-4 p-6 rounded-xl bg-champagne/20 hover:bg-champagne/30 transition-colors duration-300">
              <div className="w-16 h-16 bg-emerald/10 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-8 h-8 text-emerald" />
              </div>
              <h3 className="font-sans font-semibold text-foreground">Qualité premium</h3>
              <p className="text-sm text-body-text">
                Acier inoxydable 316L chirurgical, hypoallergénique et durable
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-xl bg-champagne/20 hover:bg-champagne/30 transition-colors duration-300">
              <div className="w-16 h-16 bg-burgundy/10 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-burgundy" />
              </div>
              <h3 className="font-sans font-semibold text-foreground">Fait avec soin</h3>
              <p className="text-sm text-body-text">
                Chaque bijou est préparé avec attention et emballé délicatement
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-xl bg-champagne/20 hover:bg-champagne/30 transition-colors duration-300">
              <div className="w-16 h-16 bg-emerald/10 rounded-full flex items-center justify-center mx-auto">
                <Truck className="w-8 h-8 text-emerald" />
              </div>
              <h3 className="font-sans font-semibold text-foreground">Livraison sûre</h3>
              <p className="text-sm text-body-text">
                Envoi soigné et suivi pour que votre bijou arrive intact
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-xl bg-champagne/20 hover:bg-champagne/30 transition-colors duration-300">
              <div className="w-16 h-16 bg-burgundy/10 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-8 h-8 text-burgundy" />
              </div>
              <h3 className="font-sans font-semibold text-foreground">Garantie satisfait</h3>
              <p className="text-sm text-body-text">
                30 jours pour découvrir et aimer votre médaillon
              </p>
            </div>
          </div>

          {/* Additional details */}
          <div className="bg-gradient-to-r from-emerald/5 via-champagne/20 to-burgundy/5 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="font-display text-3xl text-emerald">✓</div>
                <h4 className="font-sans font-semibold text-foreground">Hypoallergénique</h4>
                <p className="text-sm text-body-text">
                  Convient aux peaux les plus sensibles
                </p>
              </div>

              <div className="space-y-2">
                <div className="font-display text-3xl text-burgundy">✓</div>
                <h4 className="font-sans font-semibold text-foreground">Écologique</h4>
                <p className="text-sm text-body-text">
                  Emballage recyclé et respectueux
                </p>
              </div>

              <div className="space-y-2">
                <div className="font-display text-3xl text-emerald">✓</div>
                <h4 className="font-sans font-semibold text-foreground">Support client</h4>
                <p className="text-sm text-body-text">
                  Une équipe à votre écoute pour toute question
                </p>
              </div>
            </div>
          </div>

          {/* Small print */}
          <div className="mt-12 text-center">
            <p className="text-sm text-body-text max-w-2xl mx-auto leading-relaxed">
              Chaque médaillon Osmose est conçu pour durer et vous accompagner longtemps. 
              Nous prenons soin de chaque détail, de la fabrication à l'emballage, 
              pour que votre expérience soit aussi belle que le bijou lui-même.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guarantee;
