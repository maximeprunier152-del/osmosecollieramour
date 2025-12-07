import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Mail, X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { emailSchema, passwordSchema, validateForm, signupSchema } from "@/lib/validations";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, signIn, user } = useAuth();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email with Zod
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    setShowPasswordModal(true);
    setIsLoginMode(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password with Zod
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      toast.error(passwordResult.error.issues[0].message);
      return;
    }

    if (!isLoginMode) {
      const validation = validateForm(signupSchema, { email, password, confirmPassword });
      if (!validation.success && validation.errors) {
        const firstError = Object.values(validation.errors)[0];
        toast.error(firstError);
        return;
      }
    }

    setIsLoading(true);

    if (isLoginMode) {
      // Login mode
      const { error } = await signIn(email, password);
      setIsLoading(false);

      if (error) {
        toast.error("Erreur de connexion", { description: "Email ou mot de passe incorrect" });
      } else {
        toast.success("Connexion réussie !", {
          description: "Profitez de 10% de réduction sur votre première commande",
        });
        closeModal();
      }
    } else {
      // Signup mode
      const { error } = await signUp(email, password);
      setIsLoading(false);

      if (error) {
        if (error.message.includes("already registered")) {
          // Switch to login mode
          setIsLoginMode(true);
          setPassword("");
          toast.info("Ce compte existe déjà", {
            description: "Connectez-vous avec votre mot de passe",
          });
        } else {
          toast.error("Erreur d'inscription", { description: error.message });
        }
      } else {
        toast.success("Compte créé avec succès !", {
          description: "Profitez de 10% de réduction sur votre première commande",
        });
        closeModal();
      }
    }
  };

  const closeModal = () => {
    setShowPasswordModal(false);
    setPassword("");
    setConfirmPassword("");
    setIsLoginMode(false);
    setEmail("");
  };

  // If user is logged in, show a thank you message
  if (user) {
    return (
      <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Mail className="text-primary" size={28} />
            </div>

            <h2 className="font-display text-3xl md:text-4xl tracking-wide font-bold text-foreground mb-4">
              Merci d'être membre !
            </h2>

            <p className="text-muted-foreground text-lg">
              Vous faites partie de la communauté SP-Osmose. Profitez de vos{" "}
              <span className="font-bold text-primary">10% de réduction</span> sur
              votre première commande.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-background relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Mail className="text-primary" size={28} />
            </div>

            <h2 className="font-display text-3xl md:text-4xl tracking-wide font-bold text-foreground mb-4">
              Rejoignez la communauté SP-Osmose
            </h2>

            <p className="text-muted-foreground text-lg mb-8">
              Inscrivez-vous à notre newsletter et bénéficiez de{" "}
              <span className="font-bold text-primary">10% de réduction</span> sur
              votre première commande. Découvrez nos nouveautés, conseils
              olfactifs et histoires inspirantes.
            </p>

            <form
              onSubmit={handleEmailSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" className="sm:w-auto">
                S'inscrire
              </Button>
            </form>

            <p className="text-xs text-muted-foreground mt-4">
              Vos données sont protégées. Vous pouvez vous désabonner à tout
              moment.
            </p>
          </div>
        </div>
      </section>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-[90%] max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-in zoom-in-95 duration-300">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center space-y-4">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                {isLoginMode ? "Connexion" : "Créer votre compte"}
              </h2>
              
              <p className="text-muted-foreground text-sm">
                {isLoginMode ? (
                  <>Connectez-vous avec <span className="font-medium text-foreground">{email}</span></>
                ) : (
                  <>Choisissez un mot de passe pour <span className="font-medium text-foreground">{email}</span></>
                )}
              </p>

              <form onSubmit={handlePasswordSubmit} className="space-y-4 pt-2">
                <div className="space-y-2 text-left">
                  <Label htmlFor="newsletter-password" className="text-sm text-muted-foreground">
                    Mot de passe
                  </Label>
                  <Input
                    id="newsletter-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full"
                    autoFocus
                  />
                  {!isLoginMode && (
                    <p className="text-xs text-muted-foreground">Minimum 6 caractères</p>
                  )}
                </div>

                {!isLoginMode && (
                  <div className="space-y-2 text-left">
                    <Label htmlFor="newsletter-confirm-password" className="text-sm text-muted-foreground">
                      Confirmer le mot de passe
                    </Label>
                    <Input
                      id="newsletter-confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={6}
                      className="w-full"
                    />
                  </div>
                )}
                
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-foreground text-background hover:bg-foreground/90 font-heading tracking-widest py-6"
                >
                  {isLoading 
                    ? (isLoginMode ? "CONNEXION..." : "INSCRIPTION...") 
                    : (isLoginMode ? "SE CONNECTER" : "CRÉER MON COMPTE")
                  }
                </Button>
              </form>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsLoginMode(!isLoginMode);
                    setPassword("");
                    setConfirmPassword("");
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isLoginMode 
                    ? "Pas encore de compte ? S'inscrire" 
                    : "Déjà un compte ? Se connecter"
                  }
                </button>
              </div>

              <button
                onClick={closeModal}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Newsletter;
