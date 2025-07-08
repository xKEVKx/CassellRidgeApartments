import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Check, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import ScheduleVisitModal from "@/components/schedule-visit-modal";
import { HERO_IMAGE, SITE_CONFIG } from "@/lib/constants";
import type { FloorPlan } from "@shared/schema";

export default function Home() {
  const { data: floorPlans, isLoading: floorPlansLoading } = useQuery<FloorPlan[]>({
    queryKey: ["/api/floor-plans"],
  });

  return (
    <div className="min-h-screen">
      {/* Modern Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat scale-105 transform"
            style={{ backgroundImage: `url(/images/hero-modern.jpg)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>
        
        <div className="relative z-10 text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  Tranquil <span className="text-emerald-400">Lakeside</span> Living
                </h1>
                <p className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-lg">
                  Escape to tranquil lakeside living surrounded by lush landscaping, resort-style pools, and modern amenities in Southside Jacksonville.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <ScheduleVisitModal
                  trigger={
                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold shadow-xl">
                      Schedule a Visit
                    </Button>
                  }
                />
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold"
                  asChild
                >
                  <a href="https://www.on-site.com/apply/property/204538" target="_blank" rel="noopener noreferrer">
                    Apply Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>1, 2 & 3 Bedrooms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>Resort-Style Pools</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>Lakeside Location</span>
                </div>
              </div>
            </div>
            
            {/* Promotional Banner */}
            <div className="hidden lg:flex justify-end">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-md">
                <img 
                  src="/images/summer-promo.png" 
                  alt="Summer Promotion" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Welcome to The Grove at Deerwood
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your Jacksonville apartment home is surrounded by lush landscaping, two resort style pools with sun deck 
              and lighted tennis courts… <strong>something for everyone in your family to enjoy</strong>.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">ACCOMMODATIONS</h3>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Large floor plans with spacious kitchens, huge walk-in closets and private patio/balcony designed for modern living.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Check className="text-emerald-600 h-5 w-5" />
                    </div>
                    <span className="text-gray-700 font-medium">1, 2 & 3 Bedrooms</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Check className="text-emerald-600 h-5 w-5" />
                    </div>
                    <span className="text-gray-700 font-medium">Private Patio/Balcony</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Check className="text-emerald-600 h-5 w-5" />
                    </div>
                    <span className="text-gray-700 font-medium">Walk-in Closets</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Check className="text-emerald-600 h-5 w-5" />
                    </div>
                    <span className="text-gray-700 font-medium">Modern Appliances</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button asChild className="bg-emerald-600 hover:bg-emerald-700 px-8 py-4 text-lg font-semibold">
                    <Link href="/amenities">Explore Amenities</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img 
                  src="/images/hero-modern.jpg" 
                  alt="Modern apartment interior" 
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
                <div className="absolute -bottom-6 -right-6 bg-emerald-600 text-white p-6 rounded-xl shadow-xl">
                  <div className="text-2xl font-bold">Starting at</div>
                  <div className="text-3xl font-bold">$1,049</div>
                  <div className="text-sm opacity-90">per month</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Amenities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">AMENITIES</h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We have two resort style pools with sun deck. We also feature lighted tennis courts for your active lifestyle.
                </p>
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700 px-8 py-4 text-lg font-semibold">
                  <Link href="/amenities">Explore All Amenities</Link>
                </Button>
              </div>
            </div>
            <div>
              <img 
                src="/images/pool-modern.jpg" 
                alt="Resort-style pool" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Floor Plans Preview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Floor Plans</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Choose from our spacious 1, 2, and 3 bedroom apartment homes designed for modern living
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {floorPlansLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-64 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-20 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))
            ) : (
              floorPlans?.map((plan) => (
                <Card key={plan.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-w-16 aspect-h-12">
                    <img 
                      src={plan.imageUrl} 
                      alt={`${plan.name} floor plan`}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-sm text-gray-600">
                        <span className="block">{plan.bedrooms} Bedroom{plan.bedrooms > 1 ? 's' : ''}</span>
                        <span className="block">{plan.bathrooms} Bathroom{plan.bathrooms > 1 ? 's' : ''}</span>
                      </div>
                      <div className="text-sm text-gray-600 text-right">
                        <span className="block">{plan.sqft.toLocaleString()} sq ft</span>
                        <Badge variant="secondary" className="text-green-700">
                          From ${plan.startingPrice.toLocaleString()}
                        </Badge>
                      </div>
                    </div>
                    <ScheduleVisitModal
                      floorPlan={plan.name}
                      trigger={
                        <Button className="w-full bg-green-700 hover:bg-green-800">
                          Schedule Visit
                        </Button>
                      }
                    />
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" asChild className="bg-green-700 hover:bg-green-800">
              <Link href="/floor-plans">View All Floor Plans</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-emerald-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Ready to Make The Grove Your Home?</h2>
              <p className="text-lg sm:text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
                Contact us today to schedule your personal tour and see why The Grove at Deerwood is the perfect place to call home.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-emerald-700 px-8 py-4 text-lg font-semibold"
                asChild
              >
                <a href={`tel:${SITE_CONFIG.contact.phone}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Call {SITE_CONFIG.contact.phone}
                </a>
              </Button>
              <ScheduleVisitModal
                trigger={
                  <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl">
                    Schedule a Visit
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
