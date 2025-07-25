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
      title: "2-Bedroom Virtual Tour",
      description: "Take an immersive 3D walkthrough of our 2-bedroom apartment layout. Experience the spacious living areas, modern kitchen, and comfortable bedrooms.",
      thumbnail: "/images/cassell-2bedroom-floorplan.jpg",
      videoUrl: "https://discover.matterport.com/space/EQrEazqXEcw",
      icon: <Home className="w-6 h-6" />,
      type: "Interactive 3D Tour"
    },
    {
      id: 2,
      title: "3-Bedroom Virtual Tour",
      description: "Explore our spacious 3-bedroom apartment with this interactive virtual tour. See the generous living spaces and modern amenities up close.",
      thumbnail: "/images/cassell-3bedroom-floorplan.jpg",
      videoUrl: "https://discover.matterport.com/space/ZJ5VJ6eqLZk",
      icon: <Building className="w-6 h-6" />,
      type: "Interactive 3D Tour"
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
                    
                    {/* 3D Tour Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/60 backdrop-blur-md rounded-2xl px-6 py-3 flex items-center space-x-2 border border-white/30 group-hover:scale-110 transition-transform duration-300">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                          <span className="text-black font-bold text-sm">3D</span>
                        </div>
                        <span className="text-white font-semibold">Interactive Tour</span>
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
                        Start 3D Tour
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
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