import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-serif text-2xl font-bold text-foreground hover:text-primary transition-colors"
        >
          Osmose
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("product")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Le Produit
          </button>
          <button
            onClick={() => scrollToSection("emotion")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            L'Essence
          </button>
          <button
            onClick={() => scrollToSection("faq")}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Questions
          </button>
          <Button onClick={() => scrollToSection("cta")}>Commander</Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border/50 animate-fade-in">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("product")}
              className="text-left text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Le Produit
            </button>
            <button
              onClick={() => scrollToSection("emotion")}
              className="text-left text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              L'Essence
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-left text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Questions
            </button>
            <Button onClick={() => scrollToSection("cta")} className="w-full">
              Commander
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
