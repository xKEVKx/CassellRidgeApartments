import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ImageGallery from "@/components/ui/image-gallery";
import type { GalleryImage } from "@shared/schema";
import { useState } from "react";

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const { data: images, isLoading } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  const categories = [
    { id: "all", label: "All Photos" },
    { id: "interior", label: "Interior" },
    { id: "pool", label: "Pool & Amenities" },
    { id: "exterior", label: "Exterior" },
    { id: "amenities", label: "Amenities" }
  ];

  const filteredImages = selectedCategory === "all" 
    ? images 
    : images?.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Photo Gallery</h1>
          <p className="text-xl text-gray-600">
            Explore our beautiful property and apartment homes
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? "bg-green-700 hover:bg-green-800" : ""}
            >
              {category.label}
            </Button>
          ))}
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="relative overflow-hidden rounded-lg shadow-lg">
                <Skeleton className="w-full h-64" />
              </div>
            ))}
          </div>
        ) : filteredImages && filteredImages.length > 0 ? (
          <ImageGallery images={filteredImages} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No images available for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
