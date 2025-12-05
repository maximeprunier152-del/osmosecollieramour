import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const WelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Check if popup was already shown
    const hasSeenPopup = localStorage.getItem("sp-osmose-welcome-popup");
    if (!hasSeenPopup) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("sp-osmose-welcome-popup", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Merci pour votre inscription !", {
        description: "Vous recevrez bientôt nos offres exclusives.",
      });
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-[90%] max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="text-center space-y-4">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground tracking-wide">
            PROFITEZ DE 10 % DE RÉDUCTION
          </h2>
          
          <p className="text-muted-foreground text-sm md:text-base">
            Inscrivez-vous pour recevoir 10 % de réduction sur votre première commande et un accès exclusif à nos meilleures offres.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <Input
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-0 border-b border-border rounded-none focus:ring-0 focus:border-primary px-1 py-2"
            />
            
            <Button
              type="submit"
              className="w-full bg-foreground text-background hover:bg-foreground/90 font-heading tracking-widest py-6"
            >
              M'INSCRIRE
            </Button>
          </form>

          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground text-sm font-heading tracking-widest transition-colors"
          >
            NON, MERCI
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
