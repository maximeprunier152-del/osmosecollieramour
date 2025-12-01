import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import { ShopifyProduct } from "@/lib/shopify";

import butterfly from "@/assets/locket-butterfly.png";
import heart from "@/assets/locket-heart.png";
import floral from "@/assets/locket-floral.png";
import tree from "@/assets/locket-tree.png";

interface LocketDesign {
  id: string;
  name: string;
  image: string;
}

const LOCKET_DESIGNS: LocketDesign[] = [
  { id: "butterfly", name: "Papillon", image: butterfly },
  { id: "heart", name: "Cœur", image: heart },
  { id: "floral", name: "Floral", image: floral },
  { id: "tree", name: "Arbre de Vie", image: tree },
];

const COLORS = [
  { id: "gold", name: "Or", class: "bg-gradient-to-br from-yellow-300 to-yellow-600" },
  { id: "silver", name: "Argent", class: "bg-gradient-to-br from-gray-200 to-gray-400" },
  { id: "rose", name: "Or Rose", class: "bg-gradient-to-br from-rose-200 to-rose-400" },
];

interface PackSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  packType: "essentiel" | "precieux";
  product: ShopifyProduct | null;
}

export const PackSelectorModal = ({ isOpen, onClose, packType, product }: PackSelectorModalProps) => {
  const [selectedDesigns, setSelectedDesigns] = useState<string[]>([]);
  const addItem = useCartStore(state => state.addItem);

  const maxSelections = packType === "essentiel" ? 1 : 2;
  const defaultColor = "Or"; // Couleur par défaut

  const handleDesignSelect = (designId: string) => {
    if (selectedDesigns.includes(designId)) {
      setSelectedDesigns(selectedDesigns.filter(id => id !== designId));
    } else {
      if (selectedDesigns.length < maxSelections) {
        setSelectedDesigns([...selectedDesigns, designId]);
      } else {
        // Replace first selection if max reached
        const newSelections = [...selectedDesigns];
        newSelections.shift();
        newSelections.push(designId);
        setSelectedDesigns(newSelections);
      }
    }
  };

  const handleAddToCart = () => {
    if (!product || selectedDesigns.length !== maxSelections) return;

    // Find the matching variant
    const designNames = selectedDesigns.map(id => 
      LOCKET_DESIGNS.find(d => d.id === id)?.name
    );

    let variantOption1 = "";
    if (packType === "essentiel") {
      variantOption1 = designNames[0] || "";
    } else {
      // For "précieux", always use "Mix Au Choix"
      variantOption1 = "Mix Au Choix";
    }

    const variant = product.node.variants.edges.find(v => {
      const option1Match = v.node.selectedOptions[0]?.value === variantOption1;
      const option2Match = v.node.selectedOptions[1]?.value === defaultColor;
      return option1Match && option2Match;
    });

    if (!variant) {
      console.error("Variant not found for selection:", { variantOption1, defaultColor, product });
      return;
    }

    const displayTitle = packType === "essentiel" 
      ? `${designNames[0]}`
      : `${designNames[0]} + ${designNames[1]}`;

    addItem({
      product,
      variantId: variant.node.id,
      variantTitle: displayTitle,
      price: variant.node.price,
      quantity: 1,
      selectedOptions: variant.node.selectedOptions
    });

    // Reset and close
    setSelectedDesigns([]);
    onClose();
  };

  const isValid = selectedDesigns.length === maxSelections;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-3xl">
            {packType === "essentiel" ? "Composez votre Essentiel" : "Composez votre Précieux"}
          </DialogTitle>
          <DialogDescription>
            {packType === "essentiel" 
              ? "Choisissez votre médaillon préféré"
              : "Choisissez vos 2 médaillons (identiques ou différents)"
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 py-4">
          {/* Design Selection */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              Choisissez {packType === "essentiel" ? "votre médaillon" : "vos médaillons"} 
              <span className="text-muted-foreground ml-2">
                ({selectedDesigns.length}/{maxSelections})
              </span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {LOCKET_DESIGNS.map(design => (
                <button
                  key={design.id}
                  onClick={() => handleDesignSelect(design.id)}
                  className={cn(
                    "relative rounded-lg border-2 p-4 transition-all hover:scale-105",
                    selectedDesigns.includes(design.id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  {selectedDesigns.includes(design.id) && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                      {selectedDesigns.filter(id => id === design.id).length > 1 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full text-xs flex items-center justify-center">
                          2
                        </span>
                      )}
                    </div>
                  )}
                  <img 
                    src={design.image} 
                    alt={design.name}
                    className="w-full aspect-square object-contain mb-2"
                  />
                  <p className="text-sm font-medium text-center">{design.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          {selectedDesigns.length > 0 && (
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Votre sélection :</h4>
              <p className="text-sm text-muted-foreground">
                {selectedDesigns.map(id => 
                  LOCKET_DESIGNS.find(d => d.id === id)?.name
                ).join(" + ")}
              </p>
            </div>
          )}

          {/* Add to Cart Button */}
          <Button 
            onClick={handleAddToCart}
            disabled={!isValid}
            className="w-full"
            size="lg"
          >
            Ajouter au panier
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
