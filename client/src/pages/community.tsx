import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { MapPin, ShoppingBag, Utensils, GraduationCap, Trees, Heart, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

function SectionHeader({ title, subtitle }: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">{title}</h2>
      <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
}

function Card({ icon: Icon, title, description }: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 flex items-start space-x-4">
      <div className="w-10 h-10 bg-gradient-to-br from-warm-brown-500 to-warm-brown-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <h3 className="text-base font-bold text-slate-900 mb-1">{title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function Community() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Living Near
              <span className="block bg-gradient-to-r from-warm-brown-400 to-warm-brown-400 bg-clip-text text-transparent">
                Cassell Ridge
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
              Cassell Ridge offers affordable and spacious two- and three-bedroom apartment homes in a central North Knoxville location. Whether you're commuting to downtown Knoxville, attending college, or looking for an affordable apartment near Fountain City, you'll find everything you need just minutes from home.
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-14 border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-slate-600 leading-relaxed">
            Cassell Ridge offers affordable and spacious two- and three-bedroom apartment homes in a central North Knoxville location. Whether you're commuting to downtown Knoxville, attending college, or looking for an affordable apartment near Fountain City, you'll find everything you need just minutes from home.
          </p>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Neighborhoods Near Cassell Ridge"
            subtitle="Residents enjoy convenient access to several of Knoxville's most established neighborhoods."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: "Fountain City", description: "Just minutes away, Fountain City is known for its historic charm, local restaurants, shopping destinations, and community events. Residents enjoy access to Fountain City Lake and Park, featuring walking paths, green space, and seasonal community activities." },
              { title: "Inskip", description: "The Inskip area offers convenient access to retail centers, restaurants, and Interstate 75, making it a desirable location for commuters working throughout the Knoxville metropolitan area." },
              { title: "Powell", description: "Located just north of the community, Powell provides additional shopping, dining, and recreational opportunities while maintaining a suburban atmosphere close to Knoxville." },
              { title: "Downtown Knoxville", description: "Residents are approximately 14 minutes from downtown Knoxville, giving easy access to employment centers, entertainment venues, sporting events, and the University of Tennessee." },
            ].map((item) => (
              <Card key={item.title} icon={MapPin} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Shopping */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Shopping Near Cassell Ridge"
            subtitle="Everyday conveniences are close by. Multiple shopping centers are located within a few miles of the community."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: "Merchant's Village Shopping Center", description: "A convenient retail destination with a variety of shops and services just a short drive from home." },
              { title: "Clinton Plaza", description: "Nearby retail plaza offering easy access to everyday shopping needs along the Clinton Highway corridor." },
              { title: "Clinton Highway Retail Corridor", description: "A stretch of retail stores, services, and restaurants running along one of North Knoxville's main thoroughfares." },
              { title: "North Knoxville Grocery & Services", description: "Grocery stores and neighborhood services are spread throughout the area, keeping daily errands quick and convenient." },
            ].map((item) => (
              <Card key={item.title} icon={ShoppingBag} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Dining */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Restaurants Near Cassell Ridge"
            subtitle="A wide variety of local dining options are just minutes from home — from casual breakfast spots to craft cocktail bars."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: "Afghani Cuisine", description: "One of Knoxville's highest-rated international restaurants serving authentic Afghan specialties." },
              { title: "Metro Diner", description: "Known for breakfast, brunch, and classic comfort food in a welcoming, family-friendly setting." },
              { title: "The Diner at Twisters", description: "A casual neighborhood spot offering all-day breakfast and homemade desserts." },
              { title: "The Black Dog Brewhouse", description: "Featuring creative cuisine, craft cocktails, live entertainment, and outdoor seating." },
            ].map((item) => (
              <Card key={item.title} icon={Utensils} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Schools */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Schools & Higher Education"
            subtitle="Families appreciate access to Knox County Schools, while students and professionals benefit from proximity to nearby colleges and universities."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: "Knox County Schools", description: "Families at Cassell Ridge are served by Knox County Schools, one of Tennessee's largest and most established public school systems." },
              { title: "South College", description: "A private college offering undergraduate and graduate programs in healthcare, business, law, and technology." },
              { title: "Pellissippi State Community College", description: "A comprehensive community college with multiple Knoxville-area campuses offering two-year degrees and workforce training programs." },
              { title: "Lincoln Memorial University – Knoxville", description: "A respected private university with a Knoxville campus, offering graduate programs in healthcare and other professional fields." },
            ].map((item) => (
              <Card key={item.title} icon={GraduationCap} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Parks */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Parks and Recreation"
            subtitle="Outdoor enthusiasts have access to numerous recreational opportunities throughout Knoxville."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Fountain City Lake and Park", description: "Walking paths, green space, and seasonal community activities in a beloved North Knoxville gathering spot." },
              { title: "John Tarleton Park", description: "A local park offering outdoor recreation and open space for the whole family." },
              { title: "Knoxville Zoo", description: "One of Knoxville's most popular family destinations, home to hundreds of animals and seasonal events." },
              { title: "The Muse Knoxville", description: "A hands-on children's museum fostering creativity, curiosity, and learning through interactive exhibits." },
              { title: "Three Rivers Rambler", description: "A scenic train attraction offering excursions along the Tennessee River through Knoxville's historic landscape." },
            ].map((item) => (
              <Card key={item.title} icon={Trees} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Healthcare */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Healthcare Access"
            subtitle="Residents enjoy convenient access to major healthcare providers, making Cassell Ridge an attractive choice for healthcare workers and families."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Fort Sanders Regional Medical Center", description: "A full-service regional hospital providing comprehensive medical and surgical care to the Knoxville community." },
              { title: "East Tennessee Children's Hospital", description: "A leading pediatric hospital serving children and families across East Tennessee with specialized medical care." },
              { title: "University of Tennessee Medical Center", description: "A major academic medical center and Level I trauma center affiliated with the University of Tennessee Health Science Center." },
            ].map((item) => (
              <Card key={item.title} icon={Heart} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Rent CTA */}
      <section className="py-16 bg-gradient-to-r from-slate-700 via-slate-600 to-warm-brown-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Why Rent at Cassell Ridge?</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Affordability, convenience, and accessibility — all in one community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10 max-w-5xl mx-auto">
            {[
              "Spacious affordable 2- and 3-bedroom floor plans",
              "Convenient North Knoxville location",
              "Access to shopping and dining",
              "Easy interstate access",
              "Nearby parks and recreation",
              "Close proximity to colleges and healthcare",
              "Professional on-site management",
            ].map((reason) => (
              <div key={reason} className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                <CheckCircle className="w-4 h-4 text-warm-brown-400 flex-shrink-0" />
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
