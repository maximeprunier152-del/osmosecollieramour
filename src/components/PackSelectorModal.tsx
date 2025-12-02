import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import { ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

// Helper function to decode Unicode escape sequences
const decodeTitle = (title: string): string => {
  try {
    return JSON.parse(`"${title}"`);
  } catch {
    return title;
  }
};

import butterfly from "@/assets/locket-butterfly.png";
import heart from "@/assets/locket-heart.png";
import floral from "@/assets/locket-floral.png";
import tree from "@/assets/locket-tree.png";
import empreintes from "@/assets/locket-empreintes.png";
import serrure from "@/assets/locket-serrure.png";
import chat from "@/assets/locket-chat.png";
import oiseau from "@/assets/locket-oiseau.png";

interface LocketDesign {
  id: string;
  name: string;
  image: string;
  variantName: string;
}

const LOCKET_DESIGNS: LocketDesign[] = [
  { id: "volatis", name: "Le Volatis", image: butterfly, variantName: "Collier Diffuseur - Le Volatis" },
  { id: "matria", name: "Le Matria", image: heart, variantName: "Collier Diffuseur - Le Matria" },
  { id: "amethyste", name: "L'Améthyste", image: floral, variantName: "Collier Diffuseur - L'Améthyste" },
  { id: "gaia", name: "Le Gaia", image: tree, variantName: "Collier Diffuseur - Le Gaia" },
  { id: "nao", name: "Le Nao", image: empreintes, variantName: "Collier Diffuseur - Le Nao" },
  { id: "secret", name: "Le Secret", image: serrure, variantName: "Collier Diffuseur - Le Secret" },
  { id: "felix", name: "Le Félix", image: chat, variantName: "Collier Diffuseur - Le Félix" },
  { id: "avia", name: "L'Avia", image: oiseau, variantName: "Collier Diffuseur - L'Avia" },
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

  console.log("[PackSelectorModal] Rendered with:", { 
    packType, 
    hasProduct: !!product, 
    productTitle: product?.node.title,
    isOpen 
  });

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
    if (!product) {
      console.error("No product available");
      return;
    }

    if (selectedDesigns.length !== maxSelections) {
      console.error("Invalid selection count", { 
        selectedDesigns: selectedDesigns.length, 
        maxSelections 
      });
      return;
    }

    // Find the matching variant using variantName
    const selectedDesignObjects = selectedDesigns.map(id => 
      LOCKET_DESIGNS.find(d => d.id === id)
    );

    let variantTitle = "";
    if (packType === "essentiel") {
      // For essentiel, match by variant title (e.g., "Collier Diffuseur - Le Nao")
      variantTitle = selectedDesignObjects[0]?.variantName || "";
    } else {
      // For "précieux", always use "Mix Au Choix"
      variantTitle = "Mix Au Choix";
    }

    const variant = product.node.variants.edges.find(v => {
      // Match by variant title for Pack L'Essentiel
      if (packType === "essentiel") {
        return v.node.title === variantTitle;
      } else {
        // For précieux, match by option
        const option1Match = v.node.selectedOptions[0]?.value === variantTitle;
        const option2Match = v.node.selectedOptions[1]?.value === defaultColor;
        return option1Match && option2Match;
      }
    });

    if (!variant) {
      console.error("Variant not found for selection:", { 
        variantTitle, 
        defaultColor, 
        availableVariants: product.node.variants.edges.map(v => ({
          title: v.node.title,
          options: v.node.selectedOptions
        }))
      });
      return;
    }

    const displayTitle = packType === "essentiel" 
      ? `${selectedDesignObjects[0]?.name}`
      : `${selectedDesignObjects[0]?.name} + ${selectedDesignObjects[1]?.name}`;

    addItem({
      product,
      variantId: variant.node.id,
      variantTitle: displayTitle,
      price: variant.node.price,
      quantity: 1,
      selectedOptions: variant.node.selectedOptions
    });

    toast.success("Ajouté au panier", {
      description: displayTitle,
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
          <DialogTitle className="font-display text-3xl tracking-wide">
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
