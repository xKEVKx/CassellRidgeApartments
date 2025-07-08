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
    {
      id: 1,
      title: "Living Room with Fireplace",
      imageUrl: "/images/gallery/interior-1.jpg",
      category: "interior",
      description: "Spacious living room with cozy fireplace"
    },
    {
      id: 2,
      title: "Resort Style Pool",
      imageUrl: "/images/gallery/pool-area.jpg",
      category: "pool",
      description: "One of two resort-style pools"
    },
    {
      id: 3,
      title: "Elegant Bedroom",
      imageUrl: "/images/gallery/interior-2.jpg",
      category: "interior",
      description: "Well-appointed bedroom with modern fixtures"
    },
    {
      id: 4,
      title: "Modern Kitchen",
      imageUrl: "/images/gallery/interior-3.jpg",
      category: "interior",
      description: "Fully equipped modern kitchen"
    },
    {
      id: 5,
      title: "Spacious Bathroom",
      imageUrl: "/images/gallery/interior-4.jpg",
      category: "interior",
      description: "Modern bathroom with contemporary finishes"
    },
    {
      id: 6,
      title: "Living Area",
      imageUrl: "/images/gallery/interior-5.jpg",
      category: "interior",
      description: "Open concept living area"
    },
    {
      id: 7,
      title: "Comfortable Bedroom",
      imageUrl: "/images/gallery/interior-6.jpg",
      category: "interior",
      description: "Comfortable bedroom with ample natural light"
    },
    {
      id: 8,
      title: "Dining Area",
      imageUrl: "/images/gallery/interior-7.jpg",
      category: "interior",
      description: "Elegant dining area perfect for entertaining"
    },
    {
      id: 9,
      title: "Cozy Living Room",
      imageUrl: "/images/gallery/interior-8.jpg",
      category: "interior",
      description: "Cozy living room with modern decor"
    },
    {
      id: 10,
      title: "Stylish Interior",
      imageUrl: "/images/gallery/interior-9.jpg",
      category: "interior",
      description: "Stylish interior with contemporary design"
    },
    {
      id: 11,
      title: "Living Space",
      imageUrl: "/images/gallery/interior-10.jpg",
      category: "interior",
      description: "Bright and airy living space"
    },
    {
      id: 12,
      title: "Pool Area",
      imageUrl: "/images/gallery/grove-pool2-800w.jpg",
      category: "pool",
      description: "Beautiful pool area with sun deck"
    },
    {
      id: 13,
      title: "Pool Deck",
      imageUrl: "/images/gallery/grove-pool5-800w.jpg",
      category: "pool",
      description: "Spacious pool deck for relaxation"
    },
    {
      id: 14,
      title: "Swimming Pool",
      imageUrl: "/images/gallery/grove-pool1-800w.jpg",
      category: "pool",
      description: "Crystal clear swimming pool"
    },
    {
      id: 15,
      title: "Private Patio",
      imageUrl: "/images/gallery/grove-patio1-800w.jpg",
      category: "exterior",
      description: "Private patio with garden views"
    }
  ];

  const categories = [
    { id: "all", label: "All Photos", icon: Home },
    { id: "interior", label: "Interior", icon: Home },
    { id: "pool", label: "Pool & Amenities", icon: Waves },
    { id: "exterior", label: "Exterior", icon: TreePine }
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
            Explore our beautiful apartment homes and resort-style amenities at The Grove at Deerwood
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
