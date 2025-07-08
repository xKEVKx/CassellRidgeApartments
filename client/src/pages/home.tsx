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
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif">
            Tranquil <span className="text-green-300">Lakeside</span> Living
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            {SITE_CONFIG.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ScheduleVisitModal
              trigger={
                <Button size="lg" className="bg-green-700 hover:bg-green-800 text-white">
                  Schedule a Visit
                </Button>
              }
            />
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900"
              asChild
            >
              <a href="https://www.on-site.com/apply/property/204538" target="_blank" rel="noopener noreferrer">
                Apply Now
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Property Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
              Welcome to The Grove at Deerwood
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your Jacksonville apartment home is surrounded by lush landscaping, two resort style pools with sun deck 
              and lighted tennis courts… <strong>something for everyone in your family to enjoy</strong>.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/images/hero-image.jpg" 
                alt="Modern apartment interior" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">ACCOMMODATIONS</h3>
              <p className="text-lg text-gray-600 mb-6">
                Large floor plans with spacious kitchens, huge walk-in closets and private patio/balcony.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <Check className="text-green-700 mr-3 h-5 w-5" />
                  Spacious 1, 2, and 3 bedroom floor plans
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="text-green-700 mr-3 h-5 w-5" />
                  Private patio or balcony
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="text-green-700 mr-3 h-5 w-5" />
                  Walk-in closets
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="text-green-700 mr-3 h-5 w-5" />
                  Modern kitchen appliances
                </li>
              </ul>
              <div className="mt-8">
                <Button asChild className="bg-green-700 hover:bg-green-800">
                  <Link href="/amenities">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Amenities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AMENITIES</h3>
              <p className="text-lg text-gray-600 mb-6">
                We have two resort style pools with sun deck. We also feature lighted tennis courts for your active lifestyle.
              </p>
              <Button asChild className="bg-green-700 hover:bg-green-800">
                <Link href="/amenities">Learn More</Link>
              </Button>
            </div>
            <div>
              <img 
                src="/images/pool1.jpg" 
                alt="Resort-style pool" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Floor Plans Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Floor Plans</h2>
            <p className="text-xl text-gray-600">Choose from our spacious 1, 2, and 3 bedroom apartment homes</p>
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
      <section className="py-20 bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Make The Grove Your Home?</h2>
          <p className="text-xl mb-8">
            Contact us today to schedule your personal tour and see why The Grove at Deerwood is the perfect place to call home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-700">
              <Phone className="mr-2 h-5 w-5" />
              Call {SITE_CONFIG.contact.phone}
            </Button>
            <ScheduleVisitModal
              trigger={
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100">
                  Schedule a Visit
                </Button>
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}
