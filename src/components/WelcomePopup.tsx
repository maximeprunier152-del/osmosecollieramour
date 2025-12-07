import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const WelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const showPopup = useCallback(() => {
    // Check if already shown this session
    const hasSeenPopup = sessionStorage.getItem("sp-osmose-popup-seen");
    if (hasSeenPopup || user) return;
    
    setIsOpen(true);
    sessionStorage.setItem("sp-osmose-popup-seen", "true");
  }, [user]);

  useEffect(() => {
    // Don't show if user is already logged in
    if (user) return;

    // Check if already shown this session
    const hasSeenPopup = sessionStorage.getItem("sp-osmose-popup-seen");
    if (hasSeenPopup) return;

    // Show popup after 30 seconds
    const timer = setTimeout(() => {
      showPopup();
    }, 30000);

    // Exit intent detection (desktop only)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        showPopup();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [user, showPopup]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Veuillez entrer votre email");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Veuillez entrer un email valide");
      return;
    }

    setIsLoading(true);
    
    // Simulate email subscription (can be connected to a real service later)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setIsLoading(false);
    toast.success("Merci pour votre inscription !", {
      description: "Votre code promo de 10% vous a été envoyé par email",
    });
    handleClose();
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
          <div className="text-4xl mb-2">🎁</div>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground tracking-wide">
            10% DE RÉDUCTION
          </h2>
          
          <p className="text-muted-foreground text-sm md:text-base">
            Inscrivez-vous et recevez votre code promo exclusif par email.
          </p>

          <form onSubmit={handleEmailSubmit} className="space-y-4 pt-2">
            <div className="space-y-2 text-left">
              <Label htmlFor="popup-email" className="text-sm text-muted-foreground">
                Votre e-mail
              </Label>
              <Input
                id="popup-email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-border rounded-md focus:ring-0 focus:border-primary px-3 py-2"
                autoFocus
              />
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading tracking-widest py-6"
            >
              {isLoading ? "ENVOI..." : "RECEVOIR MON CODE -10%"}
            </Button>
          </form>

          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground text-sm transition-colors pt-2"
          >
            Plus tard
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
