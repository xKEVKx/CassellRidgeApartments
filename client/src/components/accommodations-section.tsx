// Shared Accommodations Data - used by both Home and Amenities pages
export const accommodationsData = {
  title: "ACCOMMODATIONS",
  description: "The lifestyle at Bicycle Club is one that offers a retreat-like atmosphere yet easy access to city activities. Live like you are on vacation every day at Bicycle Club. Our affordable rents make it all possible.",
  features: [
    { icon: "🏠", title: "1 & 2 Bedrooms", desc: "Spacious layouts with modern features" },
    { icon: "🌿", title: "Large Patios/Balconies", desc: "Private outdoor living space" },
    { icon: "🔥", title: "Wood Burning Fireplace", desc: "Cozy atmosphere in select units" },
    { icon: "🍽️", title: "Separate Dining Rooms", desc: "Perfect for entertaining" },
    { icon: "🏫", title: "AAA Rated School District", desc: "Park Hill School District proximity" },
    { icon: "🚗", title: "Lighted Carports", desc: "Covered parking with lighting" }
  ]
};

// Shared Feature Card Component
export function AccommodationsFeatures() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {accommodationsData.features.map((feature, index) => (
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
  );
}

// Shared Header Component
export function AccommodationsHeader() {
  return (
    <>
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
        <h3 className="text-3xl sm:text-4xl font-bold text-slate-900">{accommodationsData.title}</h3>
      </div>
      <p className="text-xl text-slate-600 leading-relaxed font-light">
        {accommodationsData.description}
      </p>
    </>
  );
}