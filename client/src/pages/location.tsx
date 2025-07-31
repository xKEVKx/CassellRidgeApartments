import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import ScheduleVisitModal from "@/components/schedule-visit-modal";
import { useEffect } from "react";

export default function Location() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-slate-700 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-700 via-slate-600 to-warm-brown-700"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.25) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-warm-brown-500/20 rounded-full text-warm-brown-400 text-sm font-semibold backdrop-blur-sm">
              <MapPin className="w-4 h-4 mr-2" />
              Prime Knoxville Location
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Cassell Ridge 
              <span className="block bg-gradient-to-r from-warm-brown-400 to-warm-brown-400 bg-clip-text text-transparent">
                Apartments
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
              Experience affordable living in Knoxville, Tennessee with convenient access to shopping, dining, and local amenities. 
              Discover comfort and community at Cassell Ridge Apartments.
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
                        <div>Weekdays: {SITE_CONFIG.contact.hours.weekdays}</div>
                        <div>Saturday: {SITE_CONFIG.contact.hours.saturday}</div>
                        <div>Sunday: {SITE_CONFIG.contact.hours.sunday}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">Contact</h3>
                      <div className="text-slate-600 space-y-1">
                        <div>Phone: <a href={`tel:${SITE_CONFIG.contact.phone}`} className="text-warm-brown-600 hover:text-warm-brown-700 hover:underline">{SITE_CONFIG.contact.phone}</a></div>
                        <div>Email: <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-warm-brown-600 hover:text-warm-brown-700 hover:underline">Email Us</a></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <ScheduleVisitModal
                  trigger={
                    <Button 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-warm-brown-500 to-warm-brown-500 hover:from-warm-brown-600 hover:to-warm-brown-600 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-xl transition-all duration-300 hover:scale-105"
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


    </div>
  );
}