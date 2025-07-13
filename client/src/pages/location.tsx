import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Car, School, ShoppingBag, Utensils, Plane, Expand } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import ScheduleVisitModal from "@/components/schedule-visit-modal";
import { useEffect } from "react";

export default function Location() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const nearbyAttractions = [
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      name: "Zona Rosa",
      description: "Outdoor shopping center",
      distance: "10 minutes"
    },
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      name: "Northland Shopping Center",
      description: "Local shopping destination",
      distance: "5 minutes"
    },
    {
      icon: <School className="h-6 w-6" />,
      name: "Park Hill School District",
      description: "AAA Rated school district",
      distance: "2 minutes"
    },
    {
      icon: <School className="h-6 w-6" />,
      name: "University of Missouri-Kansas City",
      description: "Major university campus",
      distance: "20 minutes"
    },
    {
      icon: <Utensils className="h-6 w-6" />,
      name: "Northland Dining",
      description: "Restaurants & cafes",
      distance: "5-15 minutes"
    },
    {
      icon: <Plane className="h-6 w-6" />,
      name: "Kansas City International Airport",
      description: "Major airport",
      distance: "30 minutes"
    }
  ];

  const transportation = [
    "Easy access to I-29 and I-435",
    "Close to downtown Kansas City",
    "Public transportation available",
    "Airport within 30 minutes"
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
              <MapPin className="w-4 h-4 mr-2" />
              Prime Location
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Perfect 
              <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Kansas City Location
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
              Bicycle Club Apartments is just minutes to Kansas City dining, retail shopping, and area colleges. 
              Easy access to downtown Kansas City and major highways.
            </p>
          </div>
        </div>
      </section>

      {/* Location Details */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Address & Contact */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                  Visit Us Today
                </h2>
                
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">Address</h3>
                      <div className="text-slate-600 leading-relaxed">
                        {SITE_CONFIG.contact.address.street}<br />
                        {SITE_CONFIG.contact.address.city}, {SITE_CONFIG.contact.address.state} {SITE_CONFIG.contact.address.zip}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">Office Hours</h3>
                      <div className="text-slate-600 space-y-1">
                        <div>{SITE_CONFIG.contact.hours.weekdays}</div>
                        <div>{SITE_CONFIG.contact.hours.wednesday}</div>
                        <div>{SITE_CONFIG.contact.hours.weekend}</div>
                        <div>{SITE_CONFIG.contact.hours.sunday}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">Contact</h3>
                      <div className="text-slate-600 space-y-1">
                        <div>Phone: <a href={`tel:${SITE_CONFIG.contact.phone}`} className="text-emerald-600 hover:text-emerald-700 hover:underline">{SITE_CONFIG.contact.phone}</a></div>
                        <div>Email: <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-emerald-600 hover:text-emerald-700 hover:underline">Email Us</a></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <ScheduleVisitModal
                  trigger={
                    <Button 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      Schedule Your Visit
                    </Button>
                  }
                />
              </div>
            </div>

            {/* Map */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                  Find Us on the Map
                </h2>
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                  <iframe
                    src={SITE_CONFIG.mapEmbedUrl}
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Attractions */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              What's Nearby
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover the convenience of living at Bicycle Club Apartments with easy access to shopping, dining, education, and entertainment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {nearbyAttractions.map((attraction, index) => (
              <Card key={index} className="group bg-white hover:shadow-xl transition-all duration-300 border-0 rounded-2xl">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                      {attraction.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{attraction.name}</h3>
                      <p className="text-slate-600 mb-2">{attraction.description}</p>
                      <span className="text-sm font-medium text-emerald-600">{attraction.distance}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Transportation */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                  Easy Access & Transportation
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Our strategic location provides convenient access to major highways, public transportation, and Kansas City's key destinations.
                </p>
              </div>
              
              <div className="space-y-4">
                {transportation.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Car className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl p-8 text-center">
                <div className="space-y-6">
                  <MapPin className="w-16 h-16 text-emerald-600 mx-auto" />
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Prime Northland Location</h3>
                    <p className="text-slate-600">
                      Perfectly positioned for easy commuting to downtown Kansas City, area universities, and major shopping destinations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
              Discover the beautiful layout of Bicycle Club Apartments community with our detailed site map.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative group cursor-pointer">
                      <img 
                        src="/images/bicycleclub-site-map.jpg" 
                        alt="Bicycle Club Apartments Site Map"
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
                        src="/images/bicycleclub-site-map.jpg" 
                        alt="Bicycle Club Apartments Site Map - Full Size"
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
                  Our thoughtfully designed community offers resort-style amenities, beautifully landscaped grounds, and convenient access to all that Kansas City has to offer.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-slate-700 font-medium">Resort-style pool with sun deck</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-slate-700 font-medium">Sand volleyball court</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-slate-700 font-medium">24-hour fitness center</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-slate-700 font-medium">Off-leash dog park</span>
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
                  <span className="text-slate-700 font-medium">Central location near I-29 and I-435</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}