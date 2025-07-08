import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Check } from "lucide-react";
import { useEffect } from "react";
import type { Amenity } from "@shared/schema";

export default function Amenities() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { data: amenities, isLoading } = useQuery<Amenity[]>({
    queryKey: ["/api/amenities"],
  });

  const propertyAmenities = amenities?.filter(a => a.category === "property") || [];
  const apartmentAmenities = amenities?.filter(a => a.category === "apartment") || [];

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
          <div>
            <img 
              src="/images/amenities/authentic/pool-area.jpg" 
              alt="Resort-style pool area" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Resort-Style Living</h2>
            <p className="text-lg text-gray-600 mb-6">
              <strong>Enjoy the Bicycle Club lifestyle</strong> at Bicycle Club Apartments located in Kansas City, Missouri.
              With ample space to walk in nature, easy access to city activities, gorgeous pool and fully equipped fitness room.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              The park-like setting of Bicycle Club offers you <strong>ample space to walk and enjoy nature</strong>. 
              And, don't forget to check out our fully equipped fitness room, with spacious outside meeting areas overlooking the gorgeous pool and community BBQ area.
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
              { src: "/images/interior10.jpg", alt: "Interior view" },
              { src: "/images/pool2.jpg", alt: "Pool area" },
              { src: "/images/interior7.jpg", alt: "Living space" },
              { src: "/images/pool5.jpg", alt: "Pool deck" },
              { src: "/images/interior8.jpg", alt: "Bedroom" },
              { src: "/images/patio1.jpg", alt: "Patio area" }
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
