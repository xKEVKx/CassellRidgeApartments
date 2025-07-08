import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface GalleryImage {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: number;
}

export default function ImageGallery({ images, columns = 3 }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  };

  return (
    <>
      <div className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-6`}>
        {images.map((image, index) => (
          <div
            key={image.id}
            className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={image.imageUrl}
              alt={image.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <h3 className="text-white font-semibold">{image.title}</h3>
              {image.description && (
                <p className="text-gray-200 text-sm mt-1">{image.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          {selectedImage !== null && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-black/20 z-10"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </Button>
              
              <img
                src={images[selectedImage].imageUrl}
                alt={images[selectedImage].title}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-xl font-semibold">
                  {images[selectedImage].title}
                </h3>
                {images[selectedImage].description && (
                  <p className="text-gray-200 mt-2">
                    {images[selectedImage].description}
                  </p>
                )}
              </div>
              
              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-black/20"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-black/20"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
