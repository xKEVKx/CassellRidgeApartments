import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Bed, Bath, Square, Home, MapPin, Expand, Tag } from "lucide-react";
import ScheduleVisitModal from "@/components/schedule-visit-modal";
import { SITE_CONFIG } from "@/lib/constants";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { FloorPlan } from "@shared/schema";

export default function FloorPlans() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: floorPlans, isLoading } = useQuery<FloorPlan[]>({
    queryKey: ["/api/floor-plans"],
  });

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
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="overflow-hidden border-0 rounded-3xl bg-white flex flex-col lg:flex-row h-full">
                  <div className="lg:w-1/2">
                    <Skeleton className="w-full h-64 lg:h-full" />
                  </div>
                  <div className="p-8 flex-1 flex flex-col lg:w-1/2">
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-6" />
                    <div className="grid grid-cols-3 gap-6 mb-6">
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-20 w-full" />
                    </div>
                    <Skeleton className="h-16 w-full" />
                  </div>
                </Card>
              ))
            ) : floorPlans && floorPlans.length > 0 ? (
              floorPlans.map((plan) => (
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
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-warm-brown-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                          <Bed className="w-6 h-6 text-warm-brown-600" />
                        </div>
                        <div className="text-sm font-medium text-slate-500 mb-1">Bedrooms</div>
                        <div className="text-2xl font-bold text-slate-900">{parseFloat(plan.bedrooms) % 1 === 0 ? Math.floor(parseFloat(plan.bedrooms)) : plan.bedrooms}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                          <Bath className="w-6 h-6 text-teal-600" />
                        </div>
                        <div className="text-sm font-medium text-slate-500 mb-1">Bathrooms</div>
                        <div className="text-2xl font-bold text-slate-900">{parseFloat(plan.bathrooms) % 1 === 0 ? Math.floor(parseFloat(plan.bathrooms)) : plan.bathrooms}</div>
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
                    {/* Promotional Banner */}
                    {plan.promotionAvailable && (
                      <div className="bg-red-600 text-white px-4 py-2 rounded-lg mb-4 flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        <span className="font-semibold">Promotion Available</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-slate-600 font-medium">Rent Starting at:</span>
                      <Badge className="bg-gradient-to-r from-warm-brown-500 to-warm-brown-500 text-white px-4 py-2 text-lg font-bold">
                        ${plan.startingPrice.toLocaleString()}
                      </Badge>
                    </div>
                    
                    <ScheduleVisitModal
                      floorPlan={plan.name}
                      trigger={
                        <Button 
                          className="w-full bg-gradient-to-r from-warm-brown-500 to-warm-brown-500 hover:from-warm-brown-600 hover:to-warm-brown-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                          size="lg"
                        >
                          Schedule Visit
                        </Button>
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            ))
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-600 text-lg">No floor plans available at this time.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Unit Availability Embed */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Unit Availability
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Check real-time availability and apply online for your preferred unit.
            </p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <iframe
              src="https://www.embed.fortresstech.io/unit-availability/0ab2f339-aced-4207-846c-f6e6e52fa40e/a3f73114-63a3-4412-a20f-49d24eb01185/?ft_header=C15F1E&ft_body=0c4366&bg_border=004963&version=2"
              width="100%"
              height="600"
              style={{ border: 'none' }}
              title="Unit Availability"
              loading="lazy"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
