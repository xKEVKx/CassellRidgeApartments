import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { MapPin, ShoppingBag, Utensils, GraduationCap, Trees, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Community() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      <Helmet>
        <title>Community | Cassell Ridge Apartments - Knoxville, TN</title>
        <meta name="description" content="Discover what's near Cassell Ridge Apartments in North Knoxville, TN. Explore nearby neighborhoods, shopping, dining, schools, parks, and healthcare." />
        <meta property="og:title" content="Community | Cassell Ridge Apartments - Knoxville, TN" />
        <meta property="og:description" content="Discover what's near Cassell Ridge Apartments in North Knoxville, TN. Explore nearby neighborhoods, shopping, dining, schools, parks, and healthcare." />
        <meta property="og:url" content="https://www.cassellridge.com/community" />
      </Helmet>
      {/* Hero */}
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
              North Knoxville, Tennessee
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Living Near
              <span className="block bg-gradient-to-r from-warm-brown-400 to-warm-brown-400 bg-clip-text text-transparent">
                Cassell Ridge
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">Located at 1230 Cassell Valley Way, residents enjoy convenient access to shopping, dining, schools, healthcare, and outdoor recreation - all while staying connected to everything East Tennessee has to offer.</p>
          </div>
        </div>
      </section>
      {/* Intro */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-slate-600 leading-relaxed">
            The community offers affordable and spacious two- and three-bedroom apartment homes with easy access to shopping, dining, schools, healthcare, and outdoor recreation. Whether you're commuting to downtown Knoxville, attending college, or looking for an affordable apartment near Fountain City, Cassell Ridge offers a central location that keeps you connected to everything East Tennessee has to offer.
          </p>
        </div>
      </section>
      {/* Neighborhoods */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-warm-brown-100 rounded-full text-warm-brown-700 text-sm font-semibold mb-4">
              <MapPin className="w-4 h-4 mr-2" />
              Nearby Neighborhoods
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Neighborhoods Near Cassell Ridge</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Residents enjoy convenient access to several of Knoxville's most established neighborhoods.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Fountain City",
                description: "Just minutes away, Fountain City is known for its historic charm, local restaurants, shopping destinations, and community events. Residents enjoy access to Fountain City Lake and Park, a popular local destination featuring walking paths, green space, and seasonal community activities."
              },
              {
                name: "Inskip",
                description: "The Inskip area offers convenient access to retail centers, restaurants, and Interstate 75, making it a desirable location for commuters working throughout the Knoxville metropolitan area."
              },
              {
                name: "Powell",
                description: "Located just north of the community, Powell provides additional shopping, dining, and recreational opportunities while maintaining a suburban atmosphere close to Knoxville."
              },
              {
                name: "Downtown Knoxville",
                description: "Residents are approximately 14 minutes from downtown Knoxville, giving easy access to employment centers, entertainment venues, sporting events, and the University of Tennessee."
              }
            ].map((neighborhood) => (
              <div key={neighborhood.name} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-warm-brown-500 to-warm-brown-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{neighborhood.name}</h3>
                    <p className="text-slate-600 leading-relaxed">{neighborhood.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Shopping */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-warm-brown-100 rounded-full text-warm-brown-700 text-sm font-semibold mb-4">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Shopping
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Shopping Near Cassell Ridge</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Living at Cassell Ridge means everyday conveniences are close by. Multiple shopping centers are located within a few miles of the community, making errands quick and convenient.
              </p>
              <ul className="space-y-3">
                {[
                  "Merchant's Village Shopping Center",
                  "Clinton Plaza",
                  "Clinton Highway retail corridor",
                  "Grocery stores and neighborhood services throughout North Knoxville"
                ].map((item) => (
                  <li key={item} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-warm-brown-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-warm-brown-50 to-slate-50 rounded-2xl p-8 border border-warm-brown-100">
              <div className="text-center">
                <ShoppingBag className="w-16 h-16 text-warm-brown-500 mx-auto mb-4" />
                <p className="text-xl font-semibold text-slate-800 mb-2">Everyday Convenience</p>
                <p className="text-slate-600">Retail, groceries, and services all within a few miles of home.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Dining */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-warm-brown-100 rounded-full text-warm-brown-700 text-sm font-semibold mb-4">
              <Utensils className="w-4 h-4 mr-2" />
              Dining
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Restaurants Near Cassell Ridge</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              One of the biggest advantages of living at Cassell Ridge is having a wide variety of local dining options just minutes from home.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Afghani Cuisine",
                description: "One of Knoxville's highest-rated international restaurants serving authentic Afghan specialties."
              },
              {
                name: "Metro Diner",
                description: "Known for breakfast, brunch, and classic comfort food."
              },
              {
                name: "The Diner at Twisters",
                description: "A casual neighborhood spot offering all-day breakfast and homemade desserts."
              },
              {
                name: "The Black Dog Brewhouse",
                description: "Featuring creative cuisine, craft cocktails, live entertainment, and outdoor seating."
              }
            ].map((restaurant) => (
              <div key={restaurant.name} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-warm-brown-500 to-warm-brown-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Utensils className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{restaurant.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{restaurant.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Schools */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-warm-brown-50 to-slate-50 rounded-2xl p-8 border border-warm-brown-100">
              <div className="text-center">
                <GraduationCap className="w-16 h-16 text-warm-brown-500 mx-auto mb-4" />
                <p className="text-xl font-semibold text-slate-800 mb-2">Education Nearby</p>
                <p className="text-slate-600">From Knox County Schools to multiple colleges within easy reach.</p>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-warm-brown-100 rounded-full text-warm-brown-700 text-sm font-semibold mb-4">
                <GraduationCap className="w-4 h-4 mr-2" />
                Education
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Schools & Higher Education</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Families appreciate access to Knox County Schools, while students and professionals benefit from proximity to several colleges and universities.
              </p>
              <ul className="space-y-3">
                {[
                  "Knox County Schools",
                  "South College",
                  "Pellissippi State Community College",
                  "Lincoln Memorial University – Knoxville"
                ].map((school) => (
                  <li key={school} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-warm-brown-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-700">{school}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-slate-600 leading-relaxed">
                These educational opportunities help make the area attractive for students, faculty, healthcare professionals, and growing families.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Parks */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-warm-brown-100 rounded-full text-warm-brown-700 text-sm font-semibold mb-4">
              <Trees className="w-4 h-4 mr-2" />
              Parks & Recreation
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Parks and Recreation</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Outdoor enthusiasts have access to numerous recreational opportunities throughout Knoxville.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Fountain City Lake and Park", description: "Walking paths, green space, and seasonal community activities." },
              { name: "John Tarleton Park", description: "A local park offering outdoor recreation for the whole family." },
              { name: "Knoxville Zoo", description: "One of Knoxville's most popular family destinations." },
              { name: "The Muse Knoxville", description: "A hands-on children's museum fostering creativity and learning." },
              { name: "Three Rivers Rambler", description: "A scenic train attraction along the Tennessee River." }
            ].map((park) => (
              <div key={park.name} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-warm-brown-500 to-warm-brown-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <Trees className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">{park.name}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{park.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Healthcare */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-warm-brown-100 rounded-full text-warm-brown-700 text-sm font-semibold mb-4">
                <Heart className="w-4 h-4 mr-2" />
                Healthcare
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Healthcare Access</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Residents enjoy convenient access to major healthcare providers. The close proximity to healthcare facilities makes Cassell Ridge an attractive choice for healthcare workers and families seeking quality medical care nearby.
              </p>
              <ul className="space-y-3">
                {[
                  "Fort Sanders Regional Medical Center",
                  "East Tennessee Children's Hospital",
                  "University of Tennessee Medical Center"
                ].map((facility) => (
                  <li key={facility} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-warm-brown-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-slate-700">{facility}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-warm-brown-50 to-slate-50 rounded-2xl p-8 border border-warm-brown-100">
              <div className="text-center">
                <Heart className="w-16 h-16 text-warm-brown-500 mx-auto mb-4" />
                <p className="text-xl font-semibold text-slate-800 mb-2">Quality Care Close By</p>
                <p className="text-slate-600">Major medical centers and children's hospitals all within easy reach.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Why Rent CTA */}
      <section className="py-16 bg-gradient-to-r from-slate-700 via-slate-600 to-warm-brown-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-warm-brown-500/20 rounded-full text-warm-brown-400 text-sm font-semibold mb-4">
              <Star className="w-4 h-4 mr-2" />
              Why Cassell Ridge?
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Rent at Cassell Ridge Apartments?</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Cassell Ridge combines affordability, convenience, and accessibility — making it an excellent choice for renters seeking apartments in Knoxville, TN.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {[
              "Spacious affordable 2- and 3-bedroom floor plans",
              "Convenient North Knoxville location",
              "Access to shopping and dining",
              "Easy interstate access",
              "Nearby parks and recreation",
              "Close proximity to colleges and healthcare facilities",
              "Professional on-site management"
            ].map((reason) => (
              <div key={reason} className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                <div className="w-2 h-2 bg-warm-brown-400 rounded-full flex-shrink-0"></div>
                <span className="text-white text-sm font-medium">{reason}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/contact#contact-form">
              <Button className="bg-gradient-to-r from-warm-brown-500 to-warm-brown-600 hover:from-warm-brown-600 hover:to-warm-brown-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl transition-all duration-300 hover:scale-105 text-lg">
                Schedule Your Visit
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
