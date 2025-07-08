export const SITE_CONFIG = {
  name: "Bicycle Club Apartments",
  tagline: "Enjoy the Bicycle Club Lifestyle",
  description: "With ample space to walk in nature, easy access to city activities, gorgeous pool and fully equipped fitness room, Bicycle Club is an ideal place to live in Kansas City.",
  
  contact: {
    phone: "816.587.8660",
    fax: "",
    email: "manager@bicycleclubapts.com",
    address: {
      street: "7909 North Granby Avenue",
      city: "Kansas City",
      state: "MO",
      zip: "64151"
    },
    hours: {
      weekdays: "Mon, Tues, Thurs, Fri: 9:00AM-6:00PM",
      wednesday: "Wed: 9:00am - 7:00pm",
      weekend: "Sat: 10AM-4PM",
      sunday: "Sun: Closed"
    }
  },

  socialMedia: {
    facebook: "",
    instagram: "",
    twitter: ""
  },

  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12360.81693601346!2d-94.63406309629322!3d39.238235234285405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c058a2bdc4a009%3A0x4d1b7397483d07a1!2s7909%20N%20Granby%20Ave%2C%20Kansas%20City%2C%20MO%2064151!5e0!3m2!1sen!2sus!4v1588286735462!5m2!1sen!2sus"
};

export const HERO_IMAGE = "/images/hero-pool-bicycle-club.jpg";

export const NAVIGATION_LINKS = [
  { href: "/", label: "Home", isIcon: true },
  { href: "/floor-plans", label: "Floor Plans" },
  { href: "/amenities", label: "Amenities" },
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

export const EXTERNAL_LINKS = [
  { 
    href: "https://55376.onlineleasing.realpage.com/", 
    label: "Online Leasing" 
  },
  { 
    href: "https://property.onesite.realpage.com/welcomehome?siteid=3988481", 
    label: "Residents" 
  }
];
