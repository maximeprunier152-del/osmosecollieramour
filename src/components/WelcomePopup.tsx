import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const WelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, user } = useAuth();

  useEffect(() => {
    // Don't show if user is already logged in
    if (user) return;

    // Show popup after a short delay for every visit
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, [user]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
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

    // Move to password step
    setStep("password");
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password) {
      toast.error("Veuillez entrer un mot de passe");
      return;
    }

    if (password.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    setIsLoading(true);
    const { error } = await signUp(email, password);
    setIsLoading(false);

    if (error) {
      if (error.message.includes("already registered")) {
        toast.error("Cet email est déjà utilisé", {
          description: "Connectez-vous depuis la page compte",
        });
      } else {
        toast.error("Erreur d'inscription", { description: error.message });
      }
    } else {
      toast.success("Compte créé avec succès !", {
        description: "Profitez de 10% de réduction sur votre première commande",
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

          {step === "email" ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4 pt-2">
              <div className="space-y-2 text-left">
                <Label htmlFor="popup-email" className="text-sm text-muted-foreground">
                  E-mail
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
                className="w-full bg-foreground text-background hover:bg-foreground/90 font-heading tracking-widest py-6"
              >
                M'INSCRIRE
              </Button>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit} className="space-y-4 pt-2">
              <div className="space-y-2 text-left">
                <Label htmlFor="popup-password" className="text-sm text-muted-foreground">
                  Mot de passe
                </Label>
                <Input
                  id="popup-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full border border-border rounded-md focus:ring-0 focus:border-primary px-3 py-2"
                  autoFocus
                />
                <p className="text-xs text-muted-foreground">Minimum 6 caractères</p>
              </div>

              <div className="space-y-2 text-left">
                <Label htmlFor="popup-confirm-password" className="text-sm text-muted-foreground">
                  Confirmer le mot de passe
                </Label>
                <Input
                  id="popup-confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full border border-border rounded-md focus:ring-0 focus:border-primary px-3 py-2"
                />
              </div>
              
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-foreground text-background hover:bg-foreground/90 font-heading tracking-widest py-6"
              >
                {isLoading ? "INSCRIPTION..." : "M'INSCRIRE"}
              </Button>

              <button
                type="button"
                onClick={() => setStep("email")}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                ← Modifier l'email
              </button>
            </form>
          )}

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
