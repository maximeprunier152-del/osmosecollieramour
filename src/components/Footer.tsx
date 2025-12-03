import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="font-display text-2xl">SP-Osmose</h3>
              <p className="text-sm text-background/70 leading-relaxed">
                Des bijoux qui portent l'âme d'un parfum
              </p>
            </div>

            {/* Shop */}
            <div className="space-y-4">
              <h4 className="font-sans font-semibold text-sm uppercase tracking-wider">Boutique</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#" className="hover:text-background transition-colors">Tous les médaillons</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Accessoires</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Coffrets cadeaux</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Carte cadeau</a></li>
              </ul>
            </div>

            {/* About */}
            <div className="space-y-4">
              <h4 className="font-sans font-semibold text-sm uppercase tracking-wider">À propos</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#" className="hover:text-background transition-colors">Notre histoire</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Comment ça marche</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Matériaux</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Help */}
            <div className="space-y-4">
              <h4 className="font-sans font-semibold text-sm uppercase tracking-wider">Aide</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#" className="hover:text-background transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Livraison</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Retours</a></li>
                <li><a href="#" className="hover:text-background transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/60">
            <div>
              © 2025 SP-Osmose. Tous droits réservés.
            </div>
            <div className="flex items-center gap-2">
              <span>Fait avec</span>
              <Heart className="w-4 h-4 text-burgundy fill-burgundy" />
              <span>en France</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-background transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-background transition-colors">CGV</a>
              <a href="#" className="hover:text-background transition-colors">Confidentialité</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
