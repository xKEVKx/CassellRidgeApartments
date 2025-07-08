import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, ExternalLink, Home, Building, MapPin } from "lucide-react";
import ScheduleVisitModal from "@/components/schedule-visit-modal";

export default function VirtualTours() {
  const tours = [
    {
      id: 1,
      title: "Virtual Tour",
      description: "Take a comprehensive virtual walkthrough of our beautiful community and see what makes The Grove at Deerwood special.",
      thumbnail: "/images/grove-home-hero.jpg",
      videoUrl: "https://www.youtube.com/watch?v=aRyaRCzdGu4",
      icon: <MapPin className="w-6 h-6" />,
      type: "Community Tour"
    },
    {
      id: 2,
      title: "Property Tour",
      description: "Explore our lush landscaping, resort-style amenities, and beautifully maintained grounds.",
      thumbnail: "/images/grove-pool.jpg",
      videoUrl: "https://www.youtube.com/watch?v=I7bn5QAnZs4",
      icon: <Building className="w-6 h-6" />,
      type: "Property Features"
    },
    {
      id: 3,
      title: "Apartment Tour",
      description: "Step inside our spacious floor plans and see the modern finishes and thoughtful layouts.",
      thumbnail: "/images/grove-interior.jpg",
      videoUrl: "https://www.youtube.com/watch?v=5UryT-Cr-Bk",
      icon: <Home className="w-6 h-6" />,
      type: "Interior Tour"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-emerald-500/20 rounded-full text-emerald-400 text-sm font-semibold backdrop-blur-sm">
              <Play className="w-4 h-4 mr-2" />
              Virtual Experience
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Virtual 
              <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Tours
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
              Experience The Grove at Deerwood from the comfort of your home. Take a virtual tour of our community, amenities, and apartment homes.
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
              Get a comprehensive look at The Grove at Deerwood through our virtual tours. See our amenities, floor plans, and beautiful community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {tours.map((tour) => (
              <Card key={tour.id} className="group bg-white hover:shadow-2xl transition-all duration-500 border-0 rounded-3xl overflow-hidden">
                <div className="relative">
                  <img 
                    src={tour.thumbnail} 
                    alt={tour.title}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-500/20 backdrop-blur-md rounded-full border border-emerald-400/30">
                      <div className="text-emerald-400">{tour.icon}</div>
                      <span className="text-emerald-400 text-sm font-medium">{tour.type}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-slate-900">{tour.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{tour.description}</p>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
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
              While our virtual tours give you a great overview, there's nothing like experiencing The Grove at Deerwood in person. Schedule your visit today!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ScheduleVisitModal
                trigger={
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-10 py-4 text-lg font-semibold rounded-2xl shadow-xl transition-all duration-300 hover:scale-105"
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