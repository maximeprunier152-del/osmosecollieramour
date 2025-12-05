import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNavigateToSection } from "@/hooks/useNavigateToSection";
import locketTree from "@/assets/locket-tree.png";
import locketBird from "@/assets/locket-bird.png";
import locketHeart from "@/assets/locket-heart.png";
import locketCat from "@/assets/locket-cat.png";
import locketFloral from "@/assets/locket-floral.png";
import locketButterfly from "@/assets/locket-butterfly.png";
import locketKeyhole from "@/assets/locket-keyhole.png";
import locketFootprints from "@/assets/locket-footprints.png";

const images = [
  { src: locketTree, alt: "Médaillon arbre de vie" },
  { src: locketBird, alt: "Médaillon oiseau" },
  { src: locketHeart, alt: "Médaillon cœur" },
  { src: locketCat, alt: "Médaillon chat" },
  { src: locketFloral, alt: "Médaillon floral" },
  { src: locketButterfly, alt: "Médaillon papillons" },
  { src: locketKeyhole, alt: "Médaillon serrure" },
  { src: locketFootprints, alt: "Médaillon empreintes" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigateToSection = useNavigateToSection();

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    // After 2 seconds, close the dialog and navigate to shop
    setTimeout(() => {
      setSelectedImage(null);
      navigateToSection("shop");
    }, 2000);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-display text-4xl md:text-5xl tracking-wide font-bold text-foreground mb-4">
            Notre Collection
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Chaque médaillon raconte une histoire unique. Découvrez nos designs
            emblématiques, des symboles d'amour, de nature et de souvenirs
            précieux.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <button
                    onClick={() => handleImageClick(image.src)}
                    className="group relative aspect-square overflow-hidden rounded-2xl transition-all duration-300 [filter:drop-shadow(0_0_25px_rgba(218,179,140,0.35))] hover:[filter:drop-shadow(0_0_40px_rgba(218,179,140,0.6))]"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <span className="text-foreground font-medium">
                        Voir en grand
                      </span>
                    </div>
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* Image Zoom Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Médaillon agrandi"
              className="w-full h-auto"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;
