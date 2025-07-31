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
import { X, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";

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

  // Collapsible sections state
  const [studentsExpanded, setStudentsExpanded] = useState(false);
  const [incomeLimitsExpanded, setIncomeLimitsExpanded] = useState(false);
  const [faqExpanded, setFaqExpanded] = useState(false);
  const [petPolicyExpanded, setPetPolicyExpanded] = useState(false);

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
    
    const visitCount = parseInt(localStorage.getItem('cassell-ridge-visit-count') || '0');
    const newVisitCount = visitCount + 1;
    localStorage.setItem('cassell-ridge-visit-count', newVisitCount.toString());
    
    // Show ad during the first N visits (displayFrequency), then minimize after
    const shouldShowExpanded = newVisitCount <= (activeAd.displayFrequency || 3);
    
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
            className="w-full h-full bg-no-repeat"
            style={{ 
              backgroundImage: `url(${HERO_IMAGE})`,
              backgroundPosition: 'center 25%',
              backgroundSize: '120%'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-slate-800/40 to-slate-900/60" />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-warm-brown-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-warm-brown-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-12">
            {/* Main Heading */}
            <div className="space-y-6 bg-black/20 backdrop-blur-sm rounded-3xl p-8 sm:p-12">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-none tracking-tight">
                MODERN LIVING AT
                <span className="block bg-gradient-to-r from-warm-brown-400 via-warm-brown-500 to-warm-brown-600 bg-clip-text text-transparent">
                  CASSELL RIDGE
                </span>
                <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white/90">
                  APARTMENTS
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
                Looking for your perfect place to call home? We invite you to visit our beautiful property nestled in the heart of Knoxville, Tennessee. From thoughtfully designed floorplans to scenic surroundings, our community offers comfort, convenience, and Southern charm.
              </p>
              
              <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
                Our professional and friendly leasing staff are here to help you. Let us show you around, answer your questions, and help you understand eligibility and how to apply.
              </p>
              
              <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
                Schedule a tour today — and see all the comfort, community, and care our Knoxville property has to offer.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex justify-center">
              <ScheduleVisitModal
                trigger={
                  <Button 
                    size="lg" 
                    className="group relative bg-gradient-to-r from-warm-brown-500 to-warm-brown-600 hover:from-warm-brown-600 hover:to-warm-brown-700 text-white px-10 py-4 text-lg font-semibold rounded-2xl shadow-2xl border-0 transition-all duration-300 hover:scale-105"
                  >
                    <span className="relative z-10">Schedule Your Tour</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-warm-brown-400 to-warm-brown-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </Button>
                }
              />
            </div>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 pt-8 pb-8">
              {[
                { icon: "🏠", text: "2-3 Bedrooms", href: "/floor-plans", isAnchor: false },
                { icon: "🏊", text: "Swimming Pool", href: "#amenities", isAnchor: true },
                { icon: "🛝", text: "Playground", href: "#amenities", isAnchor: true },
                { icon: "🚗", text: "Parking", href: "#amenities", isAnchor: true }
              ].map((feature, index) => 
                feature.isAnchor ? (
                  <button
                    key={index}
                    onClick={() => {
                      const element = document.querySelector('#amenities');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white/90 text-sm font-medium hover:bg-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer"
                  >
                    <span className="text-lg">{feature.icon}</span>
                    <span>{feature.text}</span>
                  </button>
                ) : (
                  <Link 
                    key={index}
                    href={feature.href}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white/90 text-sm font-medium hover:bg-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer"
                  >
                    <span className="text-lg">{feature.icon}</span>
                    <span>{feature.text}</span>
                  </Link>
                )
              )}
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
              <span className="block bg-gradient-to-r from-warm-brown-600 to-warm-brown-700 bg-clip-text text-transparent">
                Cassell Ridge Apartments
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light mt-4">
              Built in 2005, this 4-story community features 140 garden style apartments ranging from 989 to 1,150 square feet. Located just 14 minutes north of downtown Knoxville, Cassell Ridge offers convenient access to universities, shopping centers, and major highways while providing a peaceful, park-like setting with professional management and quality amenities.
            </p>
            <p className="text-lg sm:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light mt-6">
              Whether you're looking for a cozy two-bedroom or spacious three-bedroom layout, we have a variety of options to suit your lifestyle. Take a stroll through our beautiful grounds, enjoy the peaceful setting, and imagine yourself coming home to a community that truly feels like home.
            </p>
            

          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Content Side */}
            <div className="space-y-12" id="amenities">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-1 h-8 bg-gradient-to-b from-warm-brown-500 to-warm-brown-600 rounded-full"></div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-slate-900">AMENITIES</h3>
                </div>
                <p className="text-xl text-slate-600 leading-relaxed font-light">The lifestyle at Cassell Ridge is designed to offer comfort, convenience, and a retreat-like atmosphere yet easy access to city activities. Our thoughtfully maintained property and affordable rents make it all possible.</p>
              </div>
              
              {/* Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: "🍽️", title: "Fully-Equipped Kitchen", desc: "Modern kitchen with all appliances" },
                  { icon: "🌐", title: "High Speed Internet Access", desc: "Fast internet connectivity available" },
                  { icon: "❄️", title: "Air Conditioning", desc: "Climate-controlled comfort year-round" },
                  { icon: "🚭", title: "Smoke Free", desc: "Clean, smoke-free living environment" },
                  { icon: "🧺", title: "Washer/Dryer Hookups", desc: "Convenient in-unit laundry connections" },
                  { icon: "♿", title: "Wheelchair Accessible (Rooms)", desc: "ADA compliant accessible units available" },
                  { icon: "🍽️", title: "Dishwasher", desc: "Built-in dishwasher for easy cleanup" },
                  { icon: "🏡", title: "Private Balconies/Patios (Select Units)", desc: "Outdoor space in select apartments" }
                ].map((feature, index) => (
                  <div key={index} className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-warm-brown-200">
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
                    <div className="text-4xl font-bold text-slate-900 mb-1 group-hover:text-warm-brown-600 transition-colors">
                      ${lowestPrice.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-500">per month</div>
                    <div className="mt-4 w-12 h-1 bg-gradient-to-r from-warm-brown-500 to-warm-brown-500 rounded-full mx-auto group-hover:w-16 transition-all duration-300"></div>
                  </div>
                </div>
              </Link>
              
              {/* Background Decoration */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-warm-brown-100 to-warm-brown-100 rounded-3xl -z-10 opacity-60"></div>
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
                  <div className="w-1 h-8 bg-gradient-to-b from-warm-brown-500 to-warm-brown-500 rounded-full"></div>
                  <h2 className="text-4xl font-bold text-gray-900">ACCOMMODATIONS</h2>
                </div>
                <p className="text-xl text-gray-600 leading-relaxed font-light">
                  Residents enjoy a variety of on-site features, including a community pool, a fenced dog park, and a children's playground, all set in a beautiful park-like setting - perfect for families and pet lovers alike.
                </p>
              </div>
              
              {/* Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                {[
                  { icon: "🏊", title: "Community Pool", desc: "Relax and unwind during the warmer months" },
                  { icon: "🐕", title: "Dog Park", desc: "A safe, open space for your furry friends to play" },
                  { icon: "🛝", title: "Children's Play Area", desc: "Family-friendly fun in a safe, park-like setting" },
                  { icon: "🏢", title: "Clubhouse", desc: "Meeting space available" }
                ].map((feature, index) => (
                  <div key={index} className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-warm-brown-200">
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
              
              {/* Pet Policy Collapsible Section */}
              <div className="mt-8">
                <div 
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-slate-200"
                  onClick={() => setPetPolicyExpanded(!petPolicyExpanded)}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🐾</span>
                      <h4 className="text-lg font-semibold text-slate-900">Pet Policy</h4>
                    </div>
                    {petPolicyExpanded ? (
                      <ChevronUp className="h-5 w-5 text-warm-brown-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-warm-brown-600" />
                    )}
                  </div>
                  
                  {petPolicyExpanded && (
                    <div className="mt-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-semibold text-slate-900">Pet Policy Type:</span>
                          <p className="text-slate-600">Bird, Cat, Dog, Fish, Others*</p>
                          <p className="text-xs text-slate-500 italic">*Please call leasing office for details regarding other types of pets.</p>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900">Max Number of Pets:</span>
                          <p className="text-slate-600">2</p>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900">One-Time Pet Fee:</span>
                          <p className="text-slate-600">$250</p>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900">Max Weight of Pets:</span>
                          <p className="text-slate-600">35 lbs</p>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900">Monthly Rent:</span>
                          <p className="text-slate-600">$30</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Gallery Button */}
          <div className="text-center">
            <Button 
              asChild 
              className="bg-gradient-to-r from-warm-brown-600 to-warm-brown-600 hover:from-warm-brown-700 hover:to-warm-brown-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Link href="/gallery">
                <Camera className="mr-2 h-5 w-5" />
                View Property Gallery
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* LIHTC Affordable Living Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight">
              Affordable Living through the 
              <span className="bg-gradient-to-r from-warm-brown-600 to-warm-brown-600 bg-clip-text text-transparent"> LIHTC Program</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-5xl mx-auto leading-relaxed font-light">
              At Cassell Ridge, all of our apartment homes participate in the Low-Income Housing Tax Credit (LIHTC) program. This means we offer high-quality, affordable living for households that meet specific income and eligibility requirements. Explore the details below — and if you have any questions, our team is happy to help guide you!
            </p>
          </div>

          {/* Three Collapsible Information Sections */}
          <div className="space-y-8">
            
            {/* Students Section */}
            <div 
              className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => setStudentsExpanded(!studentsExpanded)}
            >
              <div className="flex items-center justify-between w-full mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-warm-brown-500 to-warm-brown-600 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-white text-2xl">🎓</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">STUDENTS</h3>
                </div>
                {studentsExpanded ? (
                  <ChevronUp className="h-6 w-6 text-warm-brown-600" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-warm-brown-600" />
                )}
              </div>
              
              {studentsExpanded && (
                <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                  <p className="text-slate-600 leading-relaxed">
                    Because of program requirements, households made up entirely of full-time students must meet one of the following exceptions to qualify:
                  </p>
                  
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex items-start">
                      <span className="text-warm-brown-500 mr-3 mt-1">•</span>
                      <span>At least one student is married and files a joint tax return.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warm-brown-500 mr-3 mt-1">•</span>
                      <span>At least one student is enrolled in a job training program receiving assistance under the Job Training Partnership Act or a similar federal, state, or local program.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warm-brown-500 mr-3 mt-1">•</span>
                      <span>At least one student was formerly in foster care.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warm-brown-500 mr-3 mt-1">•</span>
                      <span>At least one student receives Temporary Assistance for Needy Families (TANF) benefits.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warm-brown-500 mr-3 mt-1">•</span>
                      <span>The household consists of a single parent and their children, and neither the parent nor the children are claimed as dependents by another individual.</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Income Limits Section */}
            <div 
              className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => setIncomeLimitsExpanded(!incomeLimitsExpanded)}
            >
              <div className="flex items-center justify-between w-full mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-warm-brown-500 to-warm-brown-600 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-white text-2xl">💰</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">INCOME LIMITS</h3>
                </div>
                {incomeLimitsExpanded ? (
                  <ChevronUp className="h-6 w-6 text-warm-brown-600" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-warm-brown-600" />
                )}
              </div>
              
              {incomeLimitsExpanded && (
                <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                  <p className="text-slate-600 leading-relaxed">
                    To qualify for a LIHTC home at Cassell Ridge, your household's gross (pre-tax) annual income must be within the limits listed below. The income limits provided reflect the highest set-aside offered at our community and may not represent every home available. Some homes may have lower income limits based on their designated program requirements. If you have questions about your eligibility, please reach out — we're here to help!
                  </p>
                  
                  <div className="space-y-3">
                    {[
                      { people: "1 Person", limit: "$41,700" },
                      { people: "2 People", limit: "$47,700" },
                      { people: "3 People", limit: "$53,640" },
                      { people: "4 People", limit: "$59,640" },
                      { people: "5 People", limit: "$64,380" },
                      { people: "6 People", limit: "$69,180" },
                      { people: "7 People", limit: "$73,980" }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-slate-200 last:border-b-0">
                        <span className="font-medium text-slate-700">{item.people}</span>
                        <span className="font-semibold text-warm-brown-600">{item.limit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* FAQ Section */}
            <div 
              className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => setFaqExpanded(!faqExpanded)}
            >
              <div className="flex items-center justify-between w-full mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-warm-brown-500 to-warm-brown-600 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-white text-2xl">❓</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">FREQUENTLY ASKED QUESTIONS</h3>
                </div>
                {faqExpanded ? (
                  <ChevronUp className="h-6 w-6 text-warm-brown-600" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-warm-brown-600" />
                )}
              </div>
              
              {faqExpanded && (
                <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">What is the Low-Income Housing Tax Credit (LIHTC) program?</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">The LIHTC program was created to make quality housing more affordable. It allows communities like Cassell Ridge to offer homes at reduced rental rates to households that meet specific income and eligibility guidelines.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">How do I know if I qualify for a LIHTC home?</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">Eligibility is primarily based on your household's gross (pre-tax) annual income and full-time student status. Review the Students and Income Limits sections above for more information. Our team is also available to answer any questions you have along the way!</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Are all homes at Cassell Ridge part of the LIHTC program?</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">Yes, every home at Cassell Ridge is income-restricted through the LIHTC program. All residents must meet the program's income and eligibility requirements to qualify.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">What if my income is over the limit?</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">Because all homes at Cassell Ridge are income-restricted, households exceeding the income limits would not qualify. If you're unsure where you stand, reach out to our team — we're happy to walk through your options with you!</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Do I have to be a first-time renter to qualify?</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">No, you do not have to be a first-time renter. Your eligibility is based on your income and student status, not your rental history.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">What happens if my income changes after I move in?</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">If your household income increases after you move in, you are usually allowed to remain in your home. However, certain program rules may apply if your income increases significantly. Our team will guide you through any necessary next steps if needed.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Can full-time students live in a LIHTC home?</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">Yes, but with some restrictions. If all household members are full-time students, you must meet one of the specific exceptions listed in the Students section to qualify.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">What documents will I need to provide?</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">You'll be asked to provide documentation verifying your household income, student status (if applicable), and other standard application information. Our leasing team will provide a full checklist to help make the process easy!</p>
                  </div>
                </div>
              )}
            </div>
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
              <span className="bg-gradient-to-r from-warm-brown-600 to-warm-brown-600 bg-clip-text text-transparent"> Perfect Space</span>
            </h2>
            <p className="text-xl sm:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
              Choose from our spacious 2 and 3-bedroom apartment homes, each featuring two full bathrooms, all designed for comfortable affordable living.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {floorPlansLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
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
                        <span className="block">{parseFloat(plan.bedrooms.toString()) % 1 === 0 ? Math.floor(parseFloat(plan.bedrooms.toString())) : plan.bedrooms} Bedroom{plan.bedrooms > 1 ? 's' : ''}</span>
                        <span className="block">{parseFloat(plan.bathrooms.toString()) % 1 === 0 ? Math.floor(parseFloat(plan.bathrooms.toString())) : plan.bathrooms} Bathroom{parseFloat(plan.bathrooms.toString()) > 1 ? 's' : ''}</span>
                      </div>
                      <div className="text-sm text-gray-600 text-right">
                        <span className="block">{plan.sqft.toLocaleString()} sq ft</span>
                        <Badge variant="secondary" className="text-warm-brown-700">
                          From ${plan.startingPrice.toLocaleString()}
                        </Badge>
                      </div>
                    </div>
                    <ScheduleVisitModal
                      floorPlan={plan.name}
                      trigger={
                        <Button className="w-full bg-warm-brown-700 hover:bg-warm-brown-800">
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
            <Button size="lg" asChild className="bg-warm-brown-700 hover:bg-warm-brown-800">
              <Link href="/floor-plans">View All Floor Plans / Availability</Link>
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
          <div className="absolute top-20 left-10 w-32 h-32 bg-warm-brown-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-warm-brown-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-16">
            {/* Header */}
            <div className="space-y-8">
              
              
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
                Ready to Make
                <span className="block bg-gradient-to-r from-warm-brown-400 to-warm-brown-500 bg-clip-text text-transparent">
                  Cassell Ridge Home?
                </span>
              </h2>
              
              <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
                Contact us today to schedule your personal tour and discover our spacious 2 and 3 bedroom apartments with modern amenities and affordable LIHTC pricing.
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
                      className="group relative bg-gradient-to-r from-warm-brown-500 to-warm-brown-600 hover:from-warm-brown-600 hover:to-warm-brown-700 text-white px-12 py-5 text-xl font-semibold rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                      <span className="relative z-10">Schedule Your Tour</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-warm-brown-400 to-warm-brown-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
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
                  { number: "8+", label: "Quality Amenities" },
                  { number: "3", label: "Floor Plan Options" },
                  { number: "LIHTC", label: "Affordable Housing" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-warm-brown-400 to-warm-brown-400 bg-clip-text text-transparent mb-2">
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
