import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, ExternalLink, Home, Building, MapPin } from "lucide-react";
import ScheduleVisitModal from "@/components/schedule-visit-modal";
import { VIRTUAL_TOUR_LINKS } from "@/lib/constants";
import { useEffect } from "react";

export default function VirtualTours() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const tours = [
    {
      id: 1,
      title: "Virtual Property Tour",
      description: "Take a comprehensive virtual walkthrough of our beautiful community and see what makes Cassell Ridge Apartments special.",
      thumbnail: "/images/gallery/exterior/building-exterior-2.jpg",
      videoUrl: "https://www.youtube.com/watch?v=2UTDoEzRb-o",
      icon: <MapPin className="w-6 h-6" />,
      type: "Community Tour"
    },
    {
      id: 2,
      title: "Virtual Tour – Montrose 2B 1.5BA",
      description: "Explore our spacious Montrose floor plan with 2 bedrooms and 1.5 bathrooms, perfect for roommates or small families.",
      thumbnail: "/images/floorplans/bicycleclub-montrose.jpg",
      videoUrl: "https://youtu.be/o5WW4wkKRls",
      icon: <Home className="w-6 h-6" />,
      type: "Floor Plan Tour"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-warm-brown-900"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-warm-brown-500/20 rounded-full text-warm-brown-400 text-sm font-semibold backdrop-blur-sm">
              <Play className="w-4 h-4 mr-2" />
              Virtual Experience
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Virtual 
              <span className="block bg-gradient-to-r from-warm-brown-400 to-warm-brown-400 bg-clip-text text-transparent">
                Tours
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
              Experience Cassell Ridge Apartments from the comfort of your home. Take a virtual tour of our community, amenities, and apartment homes.
            </p>
          </div>
        </div>
      </section>

      {/* Virtual Tours Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Explore Our Community
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Get a comprehensive look at Cassell Ridge Apartments through our virtual tours. See our amenities, floor plans, and beautiful community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
            {tours.map((tour) => (
              <Card key={tour.id} className="group bg-white hover:shadow-2xl transition-all duration-500 border-0 rounded-3xl overflow-hidden h-full flex flex-col">
                <div className="relative">
                  <a href={tour.videoUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <img 
                      src={tour.thumbnail} 
                      alt={tour.title}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                  </a>
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center space-x-2 px-3 py-1 bg-warm-brown-500/20 backdrop-blur-md rounded-full border border-warm-brown-400/30">
                      <div className="text-warm-brown-400">{tour.icon}</div>
                      <span className="text-warm-brown-400 text-sm font-medium">{tour.type}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-8 flex-1 flex flex-col">
                  <div className="space-y-4 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-slate-900">{tour.title}</h3>
                    <p className="text-slate-600 leading-relaxed flex-1">{tour.description}</p>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-warm-brown-500 to-warm-brown-500 hover:from-warm-brown-600 hover:to-warm-brown-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transition-all duration-300 hover:scale-105 mt-auto"
                      asChild
                    >
                      <a href={tour.videoUrl} target="_blank" rel="noopener noreferrer">
                        Watch Tour
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Matterport Virtual Tours Section */}
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Interactive Floor Plan Tours</h3>
              <p className="text-slate-600">
                Experience our apartment layouts in immersive 3D with these interactive Matterport tours.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {VIRTUAL_TOUR_LINKS.map((link, index) => (
                <Button
                  key={index}
                  className="h-auto p-6 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-warm-brown-50 hover:to-warm-brown-100 text-slate-700 hover:text-warm-brown-700 border border-slate-200 hover:border-warm-brown-200 rounded-2xl transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center space-x-4 w-full">
                      <div className="w-12 h-12 bg-warm-brown-100 rounded-xl flex items-center justify-center">
                        <Home className="w-6 h-6 text-warm-brown-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold">{link.label}</div>
                        <div className="text-sm opacity-75">Interactive 3D Tour</div>
                      </div>
                      <ExternalLink className="w-5 h-5" />
                    </div>
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Ready to See More?
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              While our virtual tours give you a great overview, there's nothing like experiencing Cassell Ridge Apartments in person. Schedule your visit today!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ScheduleVisitModal
                trigger={
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-warm-brown-500 to-warm-brown-500 hover:from-warm-brown-600 hover:to-warm-brown-600 text-white px-10 py-4 text-lg font-semibold rounded-2xl shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Schedule In-Person Tour
                  </Button>
                }
              />
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-slate-300 text-slate-700 hover:bg-slate-100 px-10 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href="https://www.on-site.com/apply/property/204538" target="_blank" rel="noopener noreferrer">
                  Apply Now
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}