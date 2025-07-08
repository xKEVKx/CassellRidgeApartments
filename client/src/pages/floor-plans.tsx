import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Bed, Bath, Square, Home, MapPin, Expand } from "lucide-react";
import ScheduleVisitModal from "@/components/schedule-visit-modal";
import { SITE_CONFIG } from "@/lib/constants";
import { useEffect } from "react";

export default function FloorPlans() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const floorPlans = [
    {
      id: 1,
      name: "Aspen",
      bedrooms: 1,
      bathrooms: 1,
      sqft: 727,
      startingPrice: 925,
      imageUrl: "/images/floorplans/aspen.jpg",
      description: "Comfortable one-bedroom apartment with modern amenities and efficient layout"
    },
    {
      id: 2,
      name: "Vail",
      bedrooms: 2,
      bathrooms: 1.5,
      sqft: 1025,
      startingPrice: 1120,
      imageUrl: "/images/floorplans/vail.jpg",
      description: "Spacious two-bedroom with 1.5 bathrooms and additional living space"
    },
    {
      id: 3,
      name: "Montrose",
      bedrooms: 2,
      bathrooms: 1.5,
      sqft: 1070,
      startingPrice: 1175,
      imageUrl: "/images/floorplans/montrose.jpg",
      description: "Well-appointed two-bedroom, 1.5 bathroom layout with generous living areas"
    },
    {
      id: 4,
      name: "Vista",
      bedrooms: 2,
      bathrooms: 1.5,
      sqft: 1154,
      startingPrice: 1285,
      imageUrl: "/images/floorplans/vista.jpg",
      description: "Premium two-bedroom, 1.5 bathroom layout with the most spacious floor plan"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white pt-24">
      {/* Floor Plans Grid */}
      <section className="pt-2 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Our Floor Plans
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comfortable floor plans with spacious kitchens, generous closets, and private patios or balconies.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {floorPlans.map((plan) => (
              <Card key={plan.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 rounded-3xl bg-white flex flex-col lg:flex-row h-full">
                <div className="relative lg:w-1/2">
                  <img 
                    src={plan.imageUrl} 
                    alt={`${plan.name} floor plan`}
                    className="w-full h-auto object-contain bg-slate-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/40 transition-all duration-300"></div>
                  
                  {/* Floor Plan Name Overlay */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2">
                    <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                  </div>
                </div>
                
                <CardContent className="p-8 flex-1 flex flex-col lg:w-1/2">
                  <div className="space-y-6 flex-1">
                    <p className="text-slate-600 leading-relaxed">{plan.description}</p>
                    
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                          <Bed className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="text-sm font-medium text-slate-500 mb-1">Bedrooms</div>
                        <div className="text-2xl font-bold text-slate-900">{plan.bedrooms}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                          <Bath className="w-6 h-6 text-teal-600" />
                        </div>
                        <div className="text-sm font-medium text-slate-500 mb-1">Bathrooms</div>
                        <div className="text-2xl font-bold text-slate-900">{plan.bathrooms}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                          <Square className="w-6 h-6 text-cyan-600" />
                        </div>
                        <div className="text-sm font-medium text-slate-500 mb-1">Sq Ft. (approx.)</div>
                        <div className="text-2xl font-bold text-slate-900">{plan.sqft.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-2xl p-6 mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-slate-600 font-medium">Rent Starting at:</span>
                      <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 text-lg font-bold">
                        ${plan.startingPrice.toLocaleString()}
                      </Badge>
                    </div>
                    
                    <ScheduleVisitModal
                      floorPlan={plan.name}
                      trigger={
                        <Button 
                          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                          size="lg"
                        >
                          Schedule Visit
                        </Button>
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Property Layout Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              The Property Layout
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover the beautiful layout of The Grove at Deerwood community with our detailed site map.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative group cursor-pointer">
                      <img 
                        src="/images/grove-site-map.png" 
                        alt="Grove at Deerwood Site Map"
                        className="w-full h-auto rounded-2xl transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                          <Expand className="w-6 h-6 text-slate-700" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-sm font-medium text-slate-700">Click to view full size</span>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl w-full h-[90vh] p-4">
                    <div className="w-full h-full flex items-center justify-center">
                      <img 
                        src="/images/grove-site-map.png" 
                        alt="Grove at Deerwood Site Map - Full Size"
                        className="max-w-full max-h-full object-contain rounded-xl"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Community Features
                </h3>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Our thoughtfully designed community offers resort-style amenities, beautifully landscaped grounds, and convenient access to all that Jacksonville has to offer.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-slate-700 font-medium">Two resort-style pools with sun deck</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-slate-700 font-medium">Lighted tennis courts</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-slate-700 font-medium">Lush landscaping throughout</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-slate-700 font-medium">Central location near I-95 and Baymeadows</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Interactive Map - Full Width */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Interactive Location Map
              </h3>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Explore our convenient location in Jacksonville's Southside near I-95 and Baymeadows.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-4 shadow-xl">
              <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden">
                <iframe
                  src={SITE_CONFIG.mapEmbedUrl}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full rounded-2xl"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
