import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import type { Amenity, GalleryImage } from "@shared/schema";

export default function Amenities() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { data: amenities, isLoading } = useQuery<Amenity[]>({
    queryKey: ["/api/amenities"],
  });

  const { data: galleryImages } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  const propertyAmenities = amenities?.filter(a => a.category === "property") || [];
  const apartmentAmenities = amenities?.filter(a => a.category === "apartment") || [];

  // Get amenity-related images for the slideshow
  const slideshowImages = galleryImages?.filter(img => 
    img.category === 'pool' || 
    img.category === 'amenities' || 
    img.category === 'community' ||
    img.category === 'exterior'
  ) || [
    { imageUrl: "/images/amenities/authentic/pool-area.jpg", title: "Resort-style pool area" },
    { imageUrl: "/images/amenities/authentic/fitness-center.jpg", title: "24-hour fitness center" },
    { imageUrl: "/images/amenities/authentic/pool-deck.jpg", title: "Pool deck with seating area" },
    { imageUrl: "/images/amenities/authentic/pool-volleyball.jpg", title: "Sand volleyball court" },
    { imageUrl: "/images/amenities/authentic/building-exterior.jpg", title: "Bicycle Club Apartments building exterior" }
  ];

  // Auto-rotate images every 3-5 seconds (randomized)
  useEffect(() => {
    if (slideshowImages.length <= 1) return;
    
    let timeoutId: number;
    
    const scheduleNextRotation = () => {
      const randomInterval = Math.floor(Math.random() * 3000) + 3000; // 3-6 seconds
      timeoutId = setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === slideshowImages.length - 1 ? 0 : prevIndex + 1
        );
        scheduleNextRotation();
      }, randomInterval);
    };
    
    scheduleNextRotation();
    
    return () => clearTimeout(timeoutId);
  }, [slideshowImages.length]);

  const currentImage = slideshowImages[currentImageIndex] || slideshowImages[0];

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Amenities</h1>
          <p className="text-xl text-gray-600">
            The park-like setting of Bicycle Club offers you ample space to walk and enjoy nature
          </p>
        </div>
        
        {/* Featured Amenities Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img 
              src={currentImage.imageUrl} 
              alt={currentImage.title || "Amenity feature"} 
              className="w-full h-auto transition-opacity duration-1000 ease-in-out"
              key={currentImageIndex} // Force re-render for smooth transition
            />
            {/* Optional: Add fade transition effect */}
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity duration-300"></div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Resort-Style Living</h2>
            <p className="text-lg text-gray-600 mb-6">
              The park-like setting of Bicycle Club offers you <strong>ample space to walk and enjoy nature</strong>. 
              And, don't forget to check out our <strong>fully equipped fitness room</strong>, with spacious outside meeting areas overlooking the <strong>gorgeous pool and community BBQ area!</strong>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center text-gray-600">
                <i className="fas fa-swimming-pool text-green-700 mr-3 text-lg"></i>
                Resort-like pool
              </div>
              <div className="flex items-center text-gray-600">
                <i className="fas fa-dumbbell text-green-700 mr-3 text-lg"></i>
                24-Hour fitness center
              </div>
              <div className="flex items-center text-gray-600">
                <i className="fas fa-volleyball-ball text-green-700 mr-3 text-lg"></i>
                Sand volleyball court
              </div>
              <div className="flex items-center text-gray-600">
                <i className="fas fa-dog text-green-700 mr-3 text-lg"></i>
                Pet friendly dog park
              </div>
            </div>
          </div>
        </div>
        
        {/* Amenities Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Property Amenities */}
          <Card className="p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Property Amenities</h3>
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex items-center">
                    <Skeleton className="h-4 w-4 mr-3" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                ))}
              </div>
            ) : (
              <ul className="space-y-3">
                {propertyAmenities.map((amenity) => (
                  <li key={amenity.id} className="flex items-center text-gray-600">
                    <Check className="text-green-700 mr-3 h-5 w-5 flex-shrink-0" />
                    <span>{amenity.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
          
          {/* Apartment Features */}
          <Card className="p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Apartment Features</h3>
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex items-center">
                    <Skeleton className="h-4 w-4 mr-3" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                ))}
              </div>
            ) : (
              <ul className="space-y-3">
                {apartmentAmenities.map((amenity) => (
                  <li key={amenity.id} className="flex items-center text-gray-600">
                    <Check className="text-green-700 mr-3 h-5 w-5 flex-shrink-0" />
                    <span>{amenity.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
        
        {/* Additional Images */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Property Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: "/images/amenities/authentic/building-exterior.jpg", alt: "Bicycle Club Apartments building exterior" },
              { src: "/images/amenities/authentic/pool-area.jpg", alt: "Resort-style swimming pool area" },
              { src: "/images/amenities/authentic/fitness-center.jpg", alt: "24-hour fitness center" },
              { src: "/images/amenities/authentic/pool-deck.jpg", alt: "Pool deck with seating area" },
              { src: "/images/amenities/authentic/interior-living.jpg", alt: "Modern apartment living room" },
              { src: "/images/amenities/authentic/pool-volleyball.jpg", alt: "Sand volleyball court" }
            ].map((image, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg shadow-lg">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
