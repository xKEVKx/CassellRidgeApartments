import { OFFICE_HOURS, PROPERTY_LOCATION } from "@shared/site-location";
import { SITE_DESCRIPTION } from "@shared/rent-config";

export const SITE_CONFIG = {
  name: "Cassell Ridge Apartments",
  tagline: "LIHTC Affordable Housing in Knoxville",
  description: SITE_DESCRIPTION,
  
  contact: {
    phone: "(865) 344-2490",
    fax: "",
    email: "info@cassellridgeapts.com",
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
  { href: "#resident-portal", label: "Residents", external: false },
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
