import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { CartDrawer } from "./CartDrawer";

import { useNavigateToSection } from "@/hooks/useNavigateToSection";
import { useAuth } from "@/contexts/AuthContext";
import osmoseLogo from "@/assets/osmose-logo-new.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigateToSection = useNavigateToSection();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionClick = (id: string) => {
    navigateToSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-[hsl(45,30%,96%)] border-b border-border/50 shadow-sm" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => navigate("/")} 
          className="hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
          aria-label="Retour à l'accueil SP-Osmose"
        >
          <img src={osmoseLogo} alt="SP-Osmose - Colliers diffuseurs de parfum" className="h-12 w-auto" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Navigation principale">
          <button onClick={() => navigate("/")} className="transition-colors text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md px-2 py-1">
            Accueil
          </button>
          <button onClick={() => handleSectionClick("product")} className="transition-colors text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md px-2 py-1">
            Le Produit
          </button>
          <button onClick={() => handleSectionClick("shop")} className="transition-colors text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md px-2 py-1">
            Boutique
          </button>
          <button onClick={() => handleSectionClick("pricing")} className="transition-colors text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md px-2 py-1">
            Offre Flash
          </button>
          <button onClick={() => handleSectionClick("emotion")} className="transition-colors text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md px-2 py-1">
            L'Essence
          </button>
          <button onClick={() => handleSectionClick("faq")} className="transition-colors text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md px-2 py-1">
            Questions
          </button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/compte")}
            className="relative"
            aria-label={user ? "Accéder à mon compte" : "Se connecter"}
          >
            <User className="h-5 w-5" aria-hidden="true" />
            {user && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background" aria-hidden="true"></span>
            )}
          </Button>
          <CartDrawer />
          <Button onClick={() => handleSectionClick("shop")}>Commander</Button>
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/compte")}
            className="relative"
            aria-label={user ? "Accéder à mon compte" : "Se connecter"}
          >
            <User className="h-5 w-5" aria-hidden="true" />
            {user && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background" aria-hidden="true"></span>
            )}
          </Button>
          <CartDrawer />
          <button 
            className="text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md p-1" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] z-40 animate-fade-in" style={{
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(8px)'
        }}>
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4" aria-label="Navigation mobile">
            <button onClick={() => { navigate("/"); setIsMobileMenuOpen(false); }} className="text-left text-foreground/80 hover:text-foreground transition-colors py-2 text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2">
              Accueil
            </button>
            <button onClick={() => handleSectionClick("product")} className="text-left text-foreground/80 hover:text-foreground transition-colors py-2 text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2">
              Le Produit
            </button>
            <button onClick={() => handleSectionClick("shop")} className="text-left text-foreground/80 hover:text-foreground transition-colors py-2 text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2">
              Boutique
            </button>
            <button onClick={() => handleSectionClick("pricing")} className="text-left text-foreground/80 hover:text-foreground transition-colors py-2 text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2">
              Offre Flash
            </button>
            <button onClick={() => handleSectionClick("emotion")} className="text-left text-foreground/80 hover:text-foreground transition-colors py-2 text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2">
              L'Essence
            </button>
            <button onClick={() => handleSectionClick("faq")} className="text-left text-foreground/80 hover:text-foreground transition-colors py-2 text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2">
              Questions
            </button>
            <button onClick={() => { navigate("/compte"); setIsMobileMenuOpen(false); }} className="text-left text-foreground/80 hover:text-foreground transition-colors py-2 text-lg flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2">
              <User className="h-5 w-5" aria-hidden="true" />
              {user ? "Mon compte" : "Se connecter"}
            </button>
            <Button onClick={() => handleSectionClick("shop")} className="w-full">
              Commander
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
