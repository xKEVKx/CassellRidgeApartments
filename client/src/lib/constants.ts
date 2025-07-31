export const SITE_CONFIG = {
  name: "Cassell Ridge Apartments",
  tagline: "LIHTC Affordable Housing in Tyler",
  description: "Quality affordable housing at Cassell Ridge Apartments in Tyler, Texas. LIHTC approved community offering 2 & 3 bedroom apartments with modern amenities and income-based rent starting at $950.",
  
  contact: {
    phone: "(903) 596-7829",
    fax: "",
    email: "info@cassellridgeapts.com",
    address: {
      street: "1230 Cassell Ridge Drive",
      city: "Tyler",
      state: "TX",
      zip: "75701"
    },
    hours: {
      weekdays: "Monday-Friday: 8AM to 5PM",
      saturday: "Saturday: 10AM to 2PM", 
      sunday: "Sunday: Closed"
    }
  },

  socialMedia: {
    facebook: "",
    instagram: "",
    twitter: ""
  },

  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3229.7856487!2d-83.9666706!3d36.0106934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885c3f4a8b0f0f0f%3A0x8b0f0f0f0f0f0f0f!2s1230%20Cassell%20Valley%20Way%2C%20Knoxville%2C%20TN%2037912!5e0!3m2!1sen!2sus!4v1588286735462!5m2!1sen!2sus"
};

export const HERO_IMAGE = "/images/cassell-hero.jpg";

export const NAVIGATION_LINKS = [
  { href: "/", label: "Home", isIcon: true },
  { href: "/floor-plans", label: "Floor Plans" },
  { href: "/#amenities", label: "Amenities" },
  { 
    href: "/property", 
    label: "Property",
    subItems: [
      { href: "/gallery", label: "Gallery" },
      { href: "/location", label: "Location" },
      { href: "/virtual-tours", label: "Virtual Tours" }
    ]
  },
  { href: "/contact", label: "Contact" }
];

export const VIRTUAL_TOUR_LINKS = [
  { 
    href: "https://discover.matterport.com/space/EQrEazqXEcw", 
    label: "2-Bedroom Virtual Tour" 
  },
  { 
    href: "https://discover.matterport.com/space/ZJ5VJ6eqLZk", 
    label: "3-Bedroom Virtual Tour" 
  }
];
