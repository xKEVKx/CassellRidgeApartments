import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Check, Camera } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import type { Amenity, GalleryImage } from "@shared/schema";

export default function Amenities() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
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

  // Auto-rotate images every 3-5 seconds (randomized) with smooth transitions
  useEffect(() => {
    if (slideshowImages.length <= 1) return;
    
    const getRandomInterval = () => Math.random() * 2000 + 3000; // 3-5 seconds
    
    let timeoutId: NodeJS.Timeout;
    
    const rotateImage = () => {
      setIsTransitioning(true);
      setTimeout(() => {
        // Pick a random image different from current one
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * slideshowImages.length);
        } while (newIndex === currentImageIndex && slideshowImages.length > 1);
        
        setCurrentImageIndex(newIndex);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50); // Short delay for smooth crossfade
      }, 500); // Fade out duration
      timeoutId = setTimeout(rotateImage, getRandomInterval());
    };

    timeoutId = setTimeout(rotateImage, getRandomInterval());

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [slideshowImages.length, currentImageIndex]);

  const currentImage = slideshowImages[currentImageIndex] || slideshowImages[0];

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Amenities</h1>
          <p className="text-xl text-gray-600">
            Discover the park-like setting of Bicycle Club, where you'll find plenty of space to stroll and enjoy the beauty of nature. Your furry friends will love our Off-Leash Bark Park, the perfect place to play and socialize. Don't forget to visit our fully equipped fitness center, and enjoy the spacious outdoor gathering areas overlooking the stunning pool and community BBQ area.
          </p>
        </div>
        
        {/* Featured Amenities Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
            <img 
              src={currentImage.imageUrl} 
              alt={currentImage.title || "Amenity feature"} 
              className={`w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
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
        

        
        {/* Gallery Button */}
        <div className="mt-16 text-center">
          <Button 
            asChild 
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Link href="/gallery">
              <Camera className="mr-2 h-5 w-5" />
              View Property Gallery
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
