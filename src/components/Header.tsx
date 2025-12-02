import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { CartDrawer } from "./CartDrawer";
import { useNavigateToSection } from "@/hooks/useNavigateToSection";
import osmoseLogo from "@/assets/osmose-logo-new.png";
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigateToSection = useNavigateToSection();
  const navigate = useNavigate();
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
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-[hsl(45,30%,96%)] border-b border-border/50 shadow-sm" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => navigate("/")} className="hover:opacity-80 transition-opacity">
          <img src={osmoseLogo} alt="Osmose" className="h-12 w-auto" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => handleSectionClick("product")} className="transition-colors text-emerald-400">
            Le Produit
          </button>
          <button onClick={() => handleSectionClick("shop")} className="text-muted-foreground hover:text-foreground transition-colors">
            Boutique
          </button>
          <button onClick={() => handleSectionClick("emotion")} className="text-muted-foreground hover:text-foreground transition-colors">
            L'Essence
          </button>
          <button onClick={() => handleSectionClick("faq")} className="text-muted-foreground hover:text-foreground transition-colors">
            Questions
          </button>
          <CartDrawer />
          <Button onClick={() => handleSectionClick("shop")}>Commander</Button>
        </nav>

        {/* Mobile Menu Button & Cart */}
        <div className="md:hidden flex items-center gap-2">
          <CartDrawer />
          <button className="text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && <div className="md:hidden fixed inset-0 top-[72px] z-40 animate-fade-in" style={{
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(8px)'
    }}>
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            <button onClick={() => handleSectionClick("product")} className="text-left text-foreground/80 hover:text-foreground transition-colors py-2 text-lg">
              Le Produit
            </button>
            <button onClick={() => handleSectionClick("shop")} className="text-left text-foreground/80 hover:text-foreground transition-colors py-2 text-lg">
              Boutique
            </button>
            <button onClick={() => handleSectionClick("emotion")} className="text-left text-foreground/80 hover:text-foreground transition-colors py-2 text-lg">
              L'Essence
            </button>
            <button onClick={() => handleSectionClick("faq")} className="text-left text-foreground/80 hover:text-foreground transition-colors py-2 text-lg">
              Questions
            </button>
            <Button onClick={() => handleSectionClick("shop")} className="w-full">
              Commander
            </Button>
          </nav>
        </div>}
    </header>;
};
export default Header;