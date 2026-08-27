import { OFFICE_HOURS, PROPERTY_LOCATION } from "@shared/site-location";

export const SITE_CONFIG = {
  name: "Cassell Ridge Apartments",
  tagline: "LIHTC Affordable Housing in Knoxville",
  description: "Quality affordable housing at Cassell Ridge Apartments in Knoxville, Tennessee. LIHTC approved community offering 2 & 3 bedroom apartments with modern amenities and income-based rent starting at $950.",
  
  contact: {
    phone: "(865) 344-2490",
    fax: "",
    email: "cassellridge@elmingtonpm.com",
    address: PROPERTY_LOCATION.address,
    hours: {
      weekdays: OFFICE_HOURS.weekdays.label,
      saturday: OFFICE_HOURS.saturday.label,
      sunday: OFFICE_HOURS.sunday.label
    }
  },

  socialMedia: {
    facebook: "",
    instagram: "",
    twitter: ""
  },

  mapEmbedUrl: PROPERTY_LOCATION.mapEmbedUrl
};

export const HERO_IMAGE = "/images/cassell-hero.jpg";

export const NAVIGATION_LINKS = [
  { href: "/", label: "Home", isIcon: true },
  { href: "/floor-plans", label: "Floor Plans" },
  { href: "/#amenities", label: "Amenities" },
  { href: "/#eligibility", label: "Eligibility" },
  { 
    href: "/property", 
    label: "Property",
    subItems: [
      { href: "/community", label: "Community" },
      { href: "/gallery", label: "Gallery" },
      { href: "/location", label: "Location" },
      { href: "/virtual-tours", label: "Virtual Tours" }
    ]
  },
  { href: "https://www.portal.fortresstech.io/4e8caee8-c99e-406c-864c-c8a5ba3e4a03/7cdf4786-7989-491a-87f5-c05f03ae9b86", label: "Residents", external: true },
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
