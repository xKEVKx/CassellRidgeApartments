import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Check, Phone, ExternalLink, Tag, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import ScheduleVisitModal from "@/components/schedule-visit-modal";
import HomePageAdSlider from "@/components/home-page-ad-slider";
import { AccommodationsHeader, AccommodationsFeatures } from "@/components/accommodations-section";
import { HERO_IMAGE, SITE_CONFIG } from "@/lib/constants";
import type { FloorPlan, GalleryImage, HomePageAd } from "@shared/schema";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const { data: floorPlans, isLoading: floorPlansLoading } = useQuery<FloorPlan[]>({
    queryKey: ["/api/floor-plans"],
  });

  // Fetch gallery images for photo rotation
  const { data: galleryImages } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  // Fetch active home page ad
  const { data: activeAd } = useQuery<HomePageAd | null>({
    queryKey: ["/api/home-page-ads/active"],
  });

  // Calculate lowest price from floor plans
  const lowestPrice = floorPlans && floorPlans.length > 0 
    ? Math.min(...floorPlans.map(plan => plan.startingPrice))
    : 925; // fallback price

  // Get all gallery images for rotation (interior, exterior, pool, community)
  const rotationImages = galleryImages?.map(img => img.imageUrl) || [
    "/images/gallery/interior-1.jpg",
    "/images/gallery/interior-3.jpg",
    "/images/gallery/pool-area.jpg",
    "/images/gallery/pool-deck.jpg",
    "/images/gallery/pool-seating.jpg",
    "/images/gallery/community-area.jpg",
    "/images/gallery/outdoor-area.jpg",
    "/images/gallery/landscape.jpg",
    "/images/amenities/building-exterior.jpg",
    "/images/amenities/fitness-center.jpg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Home Page Ad state
  const [showAdSlider, setShowAdSlider] = useState(false);
  const [adMinimized, setAdMinimized] = useState(false);

  useEffect(() => {
    if (rotationImages.length <= 1) return; // Don't rotate if only 1 or no images
    
    const getRandomInterval = () => Math.random() * 2000 + 3000; // 3-5 seconds
    
    let timeoutId: NodeJS.Timeout;
    
    const rotateImage = () => {
      setIsTransitioning(true);
      setTimeout(() => {
        // Pick a random image different from current one
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * rotationImages.length);
        } while (newIndex === currentImageIndex && rotationImages.length > 1);
        
        setCurrentImageIndex(newIndex);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50); // Short delay for smooth crossfade
      }, 500); // Fade out duration
      timeoutId = setTimeout(rotateImage, getRandomInterval());
    };

    timeoutId = setTimeout(rotateImage, getRandomInterval());

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [rotationImages.length, currentImageIndex]);

  // Handle anchor scrolling on page load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        // Small delay to ensure content is loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  // Handle Home Page Ad visibility based on display frequency
  useEffect(() => {
    if (!activeAd || !activeAd.isActive) {
      return;
    }
    
    const visitCount = parseInt(localStorage.getItem('bicycle-club-visit-count') || '0');
    const newVisitCount = visitCount + 1;
    localStorage.setItem('bicycle-club-visit-count', newVisitCount.toString());
    
    // Show ad during the first N visits (displayFrequency), then minimize after
    const shouldShowExpanded = newVisitCount <= activeAd.displayFrequency;
    
    // Always show the ad component, but determine if it should start expanded or minimized
    setShowAdSlider(true);
    setAdMinimized(!shouldShowExpanded);
  }, [activeAd]);

  return (
    <div className="min-h-screen">
      {/* Home Page Ad Slider */}
      <HomePageAdSlider 
        isVisible={showAdSlider}
        onClose={() => setAdMinimized(true)}
        initialMinimized={adMinimized}
      />
      {/* Ultra Modern Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Background Video/Image */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/70 to-slate-900/90" />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-12">
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-none tracking-tight">
                ENJOY THE
                <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  BICYCLE CLUB
                </span>
                <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white/90">
                  LIFESTYLE
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
                With ample space to walk in nature, easy access to city activities, gorgeous pool and fully equipped fitness room, 
                <span className="text-emerald-400 font-medium"> Bicycle Club</span> is an ideal place to live in 
                <span className="text-emerald-400 font-medium"> Kansas City</span>.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <ScheduleVisitModal
                trigger={
                  <Button 
                    size="lg" 
                    className="group relative bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-10 py-4 text-lg font-semibold rounded-2xl shadow-2xl border-0 transition-all duration-300 hover:scale-105"
                  >
                    <span className="relative z-10">Schedule Your Tour</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </Button>
                }
              />
              
              <Button 
                size="lg" 
                variant="outline" 
                className="group relative border-2 border-white/30 text-white hover:bg-white hover:text-slate-900 px-10 py-4 text-lg font-semibold rounded-2xl backdrop-blur-md bg-white/5 transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href="https://55376.onlineleasing.realpage.com/" target="_blank" rel="noopener noreferrer">
                  Online Leasing
                  <ExternalLink className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 pt-8">
              {[
                { icon: "🏠", text: "1-2 Bedrooms", href: "/floor-plans" },
                { icon: "🏊", text: "Resort-like Pool", href: "/#amenities" },
                { icon: "🏋️", text: "24hr Fitness", href: "/#amenities" },
                { icon: "🐕", text: "Dog Park", href: "/#amenities" }
              ].map((feature, index) => (
                <Link 
                  key={index}
                  href={feature.href}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white/90 text-sm font-medium hover:bg-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer"
                >
                  <span className="text-lg">{feature.icon}</span>
                  <span>{feature.text}</span>
                </Link>
              ))}
            </div>
            

          </div>
        </div>
      </section>
      {/* Sophisticated Property Overview */}
      <section className="py-16 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-10 leading-tight">
              Welcome to 
              <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Bicycle Club Apartments
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light mt-4">
              Discover the perfect blend of comfort, convenience, and natural beauty at Bicycle Club. Our community is nestled in a serene, park-like setting with mature trees and expansive green space, our apartment homes offer thoughtfully designed interiors and exceptional amenities. Enjoy the charm of wood-burning fireplaces and sunrooms along with spacious closets, separate dining rooms, private patios and so much more.
            </p>
            
            {/* eplQ Ranking Image */}
            <div className="flex justify-center mt-8">
              <img 
                src="/images/eplq-ranking.png" 
                alt="eplQ City Rank #1, State Rank #16" 
                className="h-25 w-auto"
              />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Content Side */}
            <div className="space-y-12" id="amenities">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-slate-900">AMENITIES</h3>
                </div>
                <p className="text-xl text-slate-600 leading-relaxed font-light">The lifestyle at Bicycle Club is one that offers a retreat-like atmosphere yet easy access to city activities. Live like you are on vacation every day at Bicycle Club. Our affordable rents make it all possible.</p>
              </div>
              
              {/* Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: "🏠", title: "1 & 2 Bedrooms", desc: "Spacious layouts with modern features" },
                  { icon: "🌿", title: "Large Patios/Balconies", desc: "Private outdoor living space" },
                  { icon: "🔥", title: "Wood Burning Fireplace", desc: "Cozy atmosphere in select units" },
                  { icon: "🍽️", title: "Separate Dining Rooms", desc: "Perfect for entertaining" },
                  { icon: "🏫", title: "AAA Rated School District", desc: "Park Hill School District proximity" },
                  { icon: "🚗", title: "Lighted Carports", desc: "Covered parking with lighting" }
                ].map((feature, index) => (
                  <div key={index} className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-emerald-200">
                    <div className="flex items-start space-x-4">
                      <div className="text-2xl">{feature.icon}</div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">{feature.title}</h4>
                        <p className="text-sm text-slate-500">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              
            </div>
            
            {/* Image Side */}
            <div className="relative">
              <div className="relative group w-full h-96 overflow-hidden rounded-3xl shadow-2xl">
                <img 
                  src={rotationImages[currentImageIndex]} 
                  alt="Luxury apartment interior" 
                  className={`w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-105 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
              </div>
              
              {/* Floating Price Card - moved outside container */}
              <Link href="/floor-plans">
                <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-2xl border border-slate-100 cursor-pointer transition-all duration-300 hover:shadow-3xl hover:scale-105 group z-10">
                  <div className="text-center">
                    <div className="text-sm text-slate-500 mb-1">Starting at</div>
                    <div className="text-4xl font-bold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
                      ${lowestPrice.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-500">per month</div>
                    <div className="mt-4 w-12 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto group-hover:w-16 transition-all duration-300"></div>
                  </div>
                </div>
              </Link>
              
              {/* Background Decoration */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl -z-10 opacity-60"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Amenities Overview Section - Moved from separate page */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Amenities Section with Photo Slider */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg order-2 lg:order-1">
              <img 
                src={galleryImages?.filter(img => 
                  img.category === 'pool' || 
                  img.category === 'amenities' || 
                  img.category === 'community' ||
                  img.category === 'exterior'
                )[currentImageIndex % (galleryImages?.filter(img => 
                  img.category === 'pool' || 
                  img.category === 'amenities' || 
                  img.category === 'community' ||
                  img.category === 'exterior'
                ).length || 1)]?.imageUrl || "/images/gallery/consolidated/bicycle-club-pool-area.jpg"} 
                alt="Amenity feature" 
                className={`w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                  <h2 className="text-4xl font-bold text-gray-900">ACCOMMODATIONS</h2>
                </div>
                <p className="text-xl text-gray-600 leading-relaxed font-light">
                  Stay active and social with community features like a 24-hour fitness center, resort-style pool and grill, perfect for summer gatherings, sand volleyball court, and multiple outdoor patio conversation areas. Pet lovers will appreciate the on-site dog park, and students benefit from access to the AAA-rated Park Hill School District.
                </p>
              </div>
              
              {/* Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                {[
                  { icon: "🏊", title: "Resort-like pool", desc: "Beautiful pool area with sun deck" },
                  { icon: "🏋️", title: "24-Hour fitness center", desc: "Fully equipped fitness facilities" },
                  { icon: "🏐", title: "Sand volleyball court", desc: "Professional sand court for recreation" },
                  { icon: "🐕", title: "Pet friendly dog park", desc: "Off-leash area for your furry friends" }
                ].map((feature, index) => (
                  <div key={index} className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-emerald-200">
                    <div className="flex items-start space-x-4">
                      <div className="text-2xl">{feature.icon}</div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">{feature.title}</h4>
                        <p className="text-sm text-slate-500">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Gallery Button */}
          <div className="text-center">
            <Button 
              asChild 
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Link href="/gallery">
                <Camera className="mr-2 h-5 w-5" />
                View Property Gallery
              </Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Ultra Modern Amenities Showcase */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Nature 
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                {" "}Meets City
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              Best of all, you're just steps from North Platte Brook Park, where you'll find paved walking and biking trails, athletic fields and courts, and picnic shelters for relaxing days outdoors. Whether you're throwing a blanket down for a picnic, playing a pickup game, or simply soaking in the natural surroundings, this is outdoor living at its best. Come experience the lifestyle you've been looking for—right where city convenience meets the peaceful rhythm of nature.
            </p>
          </div>
          
          {/* Park Feature Cards in 2 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { 
                icon: "🚴", 
                title: "Walking & Biking Trails", 
                desc: "Paved trails perfect for morning walks, evening runs, or biking adventures through nature.",
                highlight: "Paved"
              },
              { 
                icon: "⚽", 
                title: "Athletic Fields & Courts", 
                desc: "Multiple courts and fields for pickup games, sports activities, and active recreation.",
                highlight: "Multi-Sport"
              },
              { 
                icon: "🏞️", 
                title: "Picnic Shelters", 
                desc: "Covered shelters perfect for outdoor dining, family gatherings, and relaxing days in nature.",
                highlight: "Covered"
              },
              { 
                icon: "🌳", 
                title: "Natural Surroundings", 
                desc: "Beautiful park setting where you can soak in nature's beauty and find peaceful moments.",
                highlight: "Serene"
              }
            ].map((amenity, index) => (
              <div key={index} className="group relative p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{amenity.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-semibold text-white">{amenity.title}</h4>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-full">
                        {amenity.highlight}
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{amenity.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          
        </div>
      </section>
      {/* Modern Floor Plans Showcase */}
      <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight">
              Find Your 
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Perfect Space</span>
            </h2>
            <p className="text-xl sm:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
              Choose from our spacious 1, 2, and 3 bedroom apartment homes designed for the modern lifestyle you deserve.
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
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                      {/* Promotional Banner */}
                      {plan.promotionAvailable && (
                        <div className="bg-red-600 text-white px-2 py-1 rounded flex items-center gap-1 text-xs">
                          <Tag className="w-3 h-3" />
                          <span className="font-semibold">Promotion</span>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-sm text-gray-600">
                        <span className="block">{parseFloat(plan.bedrooms) % 1 === 0 ? Math.floor(parseFloat(plan.bedrooms)) : plan.bedrooms} Bedroom{plan.bedrooms > 1 ? 's' : ''}</span>
                        <span className="block">{parseFloat(plan.bathrooms) % 1 === 0 ? Math.floor(parseFloat(plan.bathrooms)) : plan.bathrooms} Bathroom{plan.bathrooms > 1 ? 's' : ''}</span>
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
      {/* Ultra Modern Contact CTA */}
      <section className="py-20 relative overflow-hidden">
        {/* Rotating Background Images */}
        <div className="absolute inset-0">
          {rotationImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/90"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-16">
            {/* Header */}
            <div className="space-y-8">
              
              
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
                Ready to Make
                <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Bicycle Club Home?
                </span>
              </h2>
              
              <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
                Contact us today to schedule your personal tour and see why Bicycle Club Apartments is the perfect place to call home.
              </p>
            </div>
            
            {/* CTA Section */}
            <div className="space-y-12">
              {/* Primary Actions */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <ScheduleVisitModal
                  trigger={
                    <Button 
                      size="lg" 
                      className="group relative bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-12 py-5 text-xl font-semibold rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                      <span className="relative z-10">Schedule Your Tour</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </Button>
                  }
                />
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="group border-2 border-white/30 text-white hover:bg-white hover:text-slate-900 px-12 py-5 text-xl font-semibold rounded-2xl backdrop-blur-md bg-white/5 transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <a href={`tel:${SITE_CONFIG.contact.phone}`}>
                    <Phone className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" />
                    Call {SITE_CONFIG.contact.phone}
                  </a>
                </Button>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {[
                  { number: "15+", label: "Premium Amenities" },
                  { number: "4", label: "Floor Plan Options" },
                  { number: "AAA", label: "Rated School District" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-slate-400 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
