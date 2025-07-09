import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Expand, Home, Waves, TreePine, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { GalleryImage } from "@shared/schema";

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { data: galleryImages, isLoading } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  const images: GalleryImage[] = galleryImages || [];

  // Define category order for sorting
  const categoryOrder = ["interior", "exterior", "community", "pool", "amenities"];
  
  // Filter and sort images based on selected category
  const filteredImages = selectedCategory === "all" 
    ? images.sort((a, b) => {
        const aIndex = categoryOrder.indexOf(a.category);
        const bIndex = categoryOrder.indexOf(b.category);
        if (aIndex !== bIndex) {
          return aIndex - bIndex;
        }
        // If same category, sort by ID for consistent ordering
        return a.id - b.id;
      })
    : images.filter(img => img.category === selectedCategory).sort((a, b) => a.id - b.id);

  const categories = [
    { id: "all", name: "All Photos", icon: Home },
    { id: "interior", name: "Interior", icon: Home },
    { id: "exterior", name: "Exterior", icon: TreePine },
    { id: "community", name: "Community", icon: Home },
    { id: "pool", name: "Pool", icon: Waves },
    { id: "amenities", name: "Fitness Center", icon: Home },
  ];

  // Navigation functions
  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === filteredImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isDialogOpen) return;
      
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToNext();
      } else if (event.key === 'Escape') {
        setIsDialogOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDialogOpen, filteredImages.length]);

  const openDialog = (index: number) => {
    setCurrentImageIndex(index);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Photo Gallery</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our beautiful apartments and community amenities through our photo gallery
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {category.name}
              </Button>
            );
          })}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Skeleton className="w-full h-64" />
                <div className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div 
                  className="relative group cursor-pointer h-64 bg-gray-100"
                  onClick={() => openDialog(index)}
                >
                  <img 
                    src={image.imageUrl} 
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    style={{ 
                      minHeight: '256px',
                      maxHeight: '256px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    loading="lazy"
                    onError={(e) => {
                      console.error('Image failed to load:', image.imageUrl);
                      e.currentTarget.style.backgroundColor = '#f3f4f6';
                      e.currentTarget.style.border = '1px solid #e5e7eb';
                    }}
                    onLoad={() => {
                      console.log('Image loaded successfully:', image.imageUrl);
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                    <Expand className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image Dialog with Navigation */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogTitle className="sr-only">
              {filteredImages[currentImageIndex]?.title || "Gallery Image"}
            </DialogTitle>
            <div className="relative">
              {filteredImages[currentImageIndex] && (
                <img 
                  src={filteredImages[currentImageIndex].imageUrl} 
                  alt={filteredImages[currentImageIndex].title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              )}
              
              {/* Navigation Buttons */}
              {filteredImages.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 backdrop-blur-sm"
                    onClick={goToPrevious}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 backdrop-blur-sm"
                    onClick={goToNext}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {filteredImages.length}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Empty State */}
        {!isLoading && filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No photos found for the selected category.</p>
          </div>
        )}
      </div>
    </div>
  );
}