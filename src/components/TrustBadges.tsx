import { Shield, Truck, CreditCard, Award, RotateCcw } from "lucide-react";

interface TrustBadgesProps {
  variant?: "horizontal" | "vertical" | "compact";
  className?: string;
}

export const TrustBadges = ({ variant = "horizontal", className = "" }: TrustBadgesProps) => {
  const badges = [
    {
      icon: Shield,
      label: "Paiement 100% sécurisé",
      sublabel: "SSL & 3D Secure"
    },
    {
      icon: Truck,
      label: "Livraison gratuite",
      sublabel: "Expédition 24-48h"
    },
    {
      icon: RotateCcw,
      label: "Retour 30 jours",
      sublabel: "Satisfait ou remboursé"
    },
    {
      icon: Award,
      label: "Qualité premium",
      sublabel: "Acier inoxydable"
    }
  ];

  if (variant === "compact") {
    return (
      <div className={`flex flex-wrap justify-center gap-4 ${className}`}>
        {badges.map((badge, index) => (
          <div key={index} className="flex items-center gap-2 text-muted-foreground">
            <badge.icon className="w-4 h-4" />
            <span className="text-xs">{badge.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className={`space-y-4 ${className}`}>
        {badges.map((badge, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <badge.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{badge.label}</p>
              <p className="text-xs text-muted-foreground">{badge.sublabel}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {badges.map((badge, index) => (
        <div 
          key={index} 
          className="flex flex-col items-center text-center p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/30"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <badge.icon className="w-6 h-6 text-primary" />
          </div>
          <p className="text-sm font-medium text-foreground">{badge.label}</p>
          <p className="text-xs text-muted-foreground">{badge.sublabel}</p>
        </div>
      ))}
    </div>
  );
};

export const PaymentIcons = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="flex items-center gap-2 text-muted-foreground">
        <CreditCard className="w-5 h-5" />
        <span className="text-xs font-medium">Visa</span>
      </div>
      <div className="w-px h-4 bg-border" />
      <div className="flex items-center gap-2 text-muted-foreground">
        <CreditCard className="w-5 h-5" />
        <span className="text-xs font-medium">Mastercard</span>
      </div>
      <div className="w-px h-4 bg-border" />
      <div className="flex items-center gap-2 text-muted-foreground">
        <CreditCard className="w-5 h-5" />
        <span className="text-xs font-medium">PayPal</span>
      </div>
    </div>
  );
};
