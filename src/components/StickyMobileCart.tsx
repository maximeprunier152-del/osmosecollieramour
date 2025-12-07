import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface StickyMobileCartProps {
  productTitle: string;
  price: string;
  originalPrice?: string;
  onAddToCart: () => void;
  isAvailable: boolean;
}

const StickyMobileCart = ({
  productTitle,
  price,
  originalPrice = "30",
  onAddToCart,
  isAvailable,
}: StickyMobileCartProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{productTitle}</p>
            <div className="flex items-center gap-2">
              {originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {originalPrice}€
                </span>
              )}
              <span className="text-lg font-bold text-primary">{price}€</span>
              <span className="bg-primary/90 text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                -50%
              </span>
            </div>
          </div>
          
          <Button
            onClick={onAddToCart}
            disabled={!isAvailable}
            className="flex-shrink-0 rounded-full px-6 py-3 bg-gradient-to-r from-[#347f63] to-[#2d6b54] hover:from-[#2d6b54] hover:to-[#347f63] shadow-lg"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {isAvailable ? "Ajouter" : "Rupture"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyMobileCart;