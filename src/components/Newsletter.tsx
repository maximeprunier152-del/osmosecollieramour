import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Merci de votre inscription !",
        description:
          "Vous recevrez bientôt votre code de réduction de 10% par email.",
      });
      setEmail("");
    }
  };

  return (
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
            Inscrivez-vous à notre newsletter et recevez{" "}
            <span className="font-bold text-primary">10% de réduction</span> sur
            votre première commande. Découvrez nos nouveautés, conseils
            olfactifs et histoires inspirantes.
          </p>

          <form
            onSubmit={handleSubmit}
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
  );
};

export default Newsletter;
