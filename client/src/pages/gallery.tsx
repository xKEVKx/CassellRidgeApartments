import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Expand, Home, Waves, TreePine } from "lucide-react";
import { useState } from "react";

interface GalleryImage {
  id: number;
  title: string;
  imageUrl: string;
  category: string;
  description?: string;
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const images: GalleryImage[] = [
    // Interior Photos
    {
      id: 1,
      title: "Main Interior Living Space",
      imageUrl: "/images/amenities/authentic/interior-main.jpg",
      category: "interior",
      description: "Spacious living room with modern fixtures"
    },
    {
      id: 2,
      title: "Dining Area",
      imageUrl: "/images/amenities/authentic/interior-dining.jpg",
      category: "interior",
      description: "Separate dining room with elegant design"
    },
    {
      id: 3,
      title: "Living Room",
      imageUrl: "/images/amenities/authentic/interior-living.jpg",
      category: "interior",
      description: "Comfortable living space with modern amenities"
    },
    {
      id: 4,
      title: "Kitchen",
      imageUrl: "/images/amenities/authentic/interior-kitchen.jpg",
      category: "interior",
      description: "Fully equipped modern kitchen"
    },
    {
      id: 5,
      title: "Bedroom",
      imageUrl: "/images/amenities/authentic/interior-bedroom.jpg",
      category: "interior",
      description: "Well-appointed bedroom with ample space"
    },
    {
      id: 6,
      title: "Bicycle Club Apartments Building",
      imageUrl: "/images/amenities/authentic/building-exterior.jpg",
      category: "exterior",
      description: "Beautiful Bicycle Club Apartments building exterior with modern architecture"
    },
    {
      id: 7,
      title: "Property Grounds",
      imageUrl: "/images/amenities/authentic/exterior-building.jpg",
      category: "exterior",
      description: "Well-maintained property grounds with professional landscaping"
    },
    {
      id: 8,
      title: "Building Side View",
      imageUrl: "/images/amenities/authentic/building-exterior-2.jpg",
      category: "exterior",
      description: "Side view of the apartment building showing architectural details"
    },
    {
      id: 9,
      title: "Main Entrance",
      imageUrl: "/images/amenities/authentic/building-entrance.jpg",
      category: "exterior",
      description: "Welcoming main entrance with professional signage and landscaping"
    },
    {
      id: 10,
      title: "Professional Landscaping",
      imageUrl: "/images/amenities/authentic/building-landscaping.jpg",
      category: "exterior",
      description: "Beautiful professional landscaping throughout the property"
    },
    {
      id: 11,
      title: "Building Architecture",
      imageUrl: "/images/amenities/authentic/building-exterior-3.jpg",
      category: "exterior",
      description: "Modern apartment building architecture with attractive exterior features"
    },
    {
      id: 12,
      title: "Full Building View",
      imageUrl: "/images/amenities/authentic/building-exterior-4.jpg",
      category: "exterior",
      description: "Complete view of the Bicycle Club Apartments building exterior"
    },
    {
      id: 13,
      title: "Open Concept Living Room",
      imageUrl: "/images/amenities/authentic/interior-cozy.jpg",
      category: "interior",
      description: "Spacious open concept living room with dining area and modern furnishings"
    },
    
    // All remaining photos are exterior
    {
      id: 14,
      title: "Bright Sunroom",
      imageUrl: "/images/amenities/authentic/interior-sunroom.jpg",
      category: "interior",
      description: "Bright sunroom with abundant natural light and comfortable seating"
    },
    {
      id: 15,
      title: "Private Balcony",
      imageUrl: "/images/amenities/authentic/interior-balcony.jpg",
      category: "interior",
      description: "Private balcony accessible from living area with outdoor views"
    },
    {
      id: 16,
      title: "Spacious Living Area",
      imageUrl: "/images/amenities/authentic/interior-spacious.jpg",
      category: "interior",
      description: "Spacious living area with open floor plan design"
    },
    {
      id: 17,
      title: "Modern Apartment Interior",
      imageUrl: "/images/amenities/authentic/interior-modern.jpg",
      category: "interior",
      description: "Modern apartment interior with contemporary fixtures and finishes"
    },
    {
      id: 18,
      title: "Fireplace Living Room",
      imageUrl: "/images/amenities/authentic/interior-fireplace.jpg",
      category: "interior",
      description: "Cozy living room with wood-burning fireplace in select units"
    },
    {
      id: 19,
      title: "Large Windows",
      imageUrl: "/images/amenities/authentic/interior-window.jpg",
      category: "interior",
      description: "Large windows providing natural light throughout the apartment"
    },
    {
      id: 20,
      title: "Elegant Interior Design",
      imageUrl: "/images/amenities/authentic/interior-elegant.jpg",
      category: "interior",
      description: "Elegant interior design with sophisticated color scheme and modern amenities"
    },
    {
      id: 21,
      title: "Apartment Interior View",
      imageUrl: "/images/amenities/authentic/pool-area.jpg",
      category: "interior",
      description: "Interior apartment view with modern design and comfortable living space"
    },
    {
      id: 22,
      title: "Living Space Interior",
      imageUrl: "/images/amenities/authentic/pool-deck.jpg",
      category: "interior",
      description: "Spacious interior living space with modern furnishings and decor"
    },
    {
      id: 23,
      title: "Apartment Interior Layout",
      imageUrl: "/images/amenities/authentic/pool-area-2.jpg",
      category: "interior",
      description: "Well-designed apartment interior with open floor plan layout"
    },
    {
      id: 24,
      title: "Modern Interior Design",
      imageUrl: "/images/amenities/authentic/pool-volleyball.jpg",
      category: "interior",
      description: "Modern interior design with contemporary fixtures and comfortable seating"
    },
    {
      id: 25,
      title: "Comfortable Interior Living",
      imageUrl: "/images/amenities/authentic/pool-seating.jpg",
      category: "interior",
      description: "Comfortable interior living area with stylish furniture and decor"
    },
    {
      id: 26,
      title: "Interior Common Area",
      imageUrl: "/images/amenities/authentic/pool-community.jpg",
      category: "interior",
      description: "Interior common area with modern amenities and comfortable seating"
    },
    {
      id: 27,
      title: "Interior Recreational Space",
      imageUrl: "/images/amenities/authentic/pool-volleyball-2.jpg",
      category: "interior",
      description: "Interior recreational space with modern design and comfortable furnishings"
    },
    {
      id: 28,
      title: "Resort-Style Swimming Pool",
      imageUrl: "/images/amenities/authentic/pool-lifestyle.jpg",
      category: "pool",
      description: "Beautiful resort-style swimming pool with premium amenities and recreational facilities"
    },
    {
      id: 29,
      title: "Pool Seating Area",
      imageUrl: "/images/amenities/authentic/pool-seating-area.jpg",
      category: "pool",
      description: "Relaxing pool seating area with comfortable furniture and shade"
    },
    {
      id: 30,
      title: "Pool Aerial View",
      imageUrl: "/images/amenities/authentic/pool-aerial.jpg",
      category: "pool",
      description: "Aerial view showcasing the complete pool complex and surrounding amenities"
    },
    {
      id: 31,
      title: "Premium Pool Design",
      imageUrl: "/images/amenities/authentic/pool-resort-style.jpg",
      category: "pool",
      description: "Premium resort-style pool design with crystal clear water and modern features"
    },
    {
      id: 32,
      title: "24-Hour Fitness Center",
      imageUrl: "/images/amenities/authentic/fitness-center.jpg",
      category: "fitness",
      description: "State-of-the-art 24-hour fitness center with modern equipment and climate control"
    },
    {
      id: 33,
      title: "Modern Fitness Equipment",
      imageUrl: "/images/amenities/authentic/fitness-equipment.jpg",
      category: "fitness",
      description: "Professional-grade fitness equipment including cardio machines and strength training"
    },
    {
      id: 34,
      title: "Spacious Workout Area",
      imageUrl: "/images/amenities/authentic/fitness-center-2.jpg",
      category: "fitness",
      description: "Spacious workout area with ample room for exercise and stretching"
    },
    {
      id: 35,
      title: "Professional Leasing Office",
      imageUrl: "/images/amenities/authentic/leasing-office.jpg",
      category: "office",
      description: "Professional leasing office with comfortable seating and knowledgeable staff"
    }
  ];

  const categories = [
    { id: "all", label: "All Photos", icon: Home },
    { id: "interior", label: "Interior", icon: Home },
    { id: "exterior", label: "Exterior", icon: TreePine },
    { id: "pool", label: "Pool & Amenities", icon: Waves },
    { id: "fitness", label: "Fitness Center", icon: TreePine },
    { id: "office", label: "Leasing Office", icon: Home }
  ];

  const filteredImages = selectedCategory === "all" 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 font-serif">
            Property Gallery
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore our beautiful apartment homes and resort-style amenities at Bicycle Club Apartments
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  selectedCategory === category.id 
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:shadow-xl hover:scale-105" 
                    : "text-slate-700 hover:text-emerald-600 hover:bg-slate-100 hover:shadow-md"
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {category.label}
              </Button>
            );
          })}
        </div>
        
        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image, index) => (
            <Dialog key={image.id}>
              <DialogTrigger asChild>
                <div className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={image.imageUrl}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading={index < 6 ? "eager" : "lazy"}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
                    <p className="text-sm text-gray-200">{image.description}</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Expand className="w-5 h-5 text-white" />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-5xl w-full h-[90vh] p-4">
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="max-w-full max-h-full object-contain rounded-xl"
                  />
                  <div className="mt-4 text-center">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{image.title}</h3>
                    <p className="text-slate-600">{image.description}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
        
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600">No images available for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
