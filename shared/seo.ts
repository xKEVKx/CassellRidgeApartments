import { APARTMENT_COMPLEX_LOCATION_SCHEMA } from "./site-location";

export const APP_ROUTES = new Set([
  "/", "/floor-plans", "/gallery", "/community", "/location",
  "/virtual-tours", "/contact", "/admin",
]);

export const APARTMENT_COMPLEX_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ApartmentComplex",
  name: "Cassell Ridge Apartments",
  description: "LIHTC affordable housing community in Knoxville, Tennessee offering spacious 2 and 3 bedroom income-based apartments with modern amenities.",
  url: "https://www.cassellridgeapts.com",
  telephone: "+18653442490",
  email: "info@cassellridgeapts.com",
  image: "https://www.cassellridgeapts.com/images/cassell-hero.jpg",
  ...APARTMENT_COMPLEX_LOCATION_SCHEMA,
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Swimming Pool", value: true },
    { "@type": "LocationFeatureSpecification", name: "Fitness Center", value: true },
    { "@type": "LocationFeatureSpecification", name: "Pet Friendly", value: true },
    { "@type": "LocationFeatureSpecification", name: "Washer/Dryer Connections", value: true },
    { "@type": "LocationFeatureSpecification", name: "On-Site Management", value: true },
  ],
  petsAllowed: true,
};

export const ROUTE_IMAGES: Record<string, { image: string; alt: string }> = {
  "/": { image: "cassell-hero.jpg", alt: "Cassell Ridge Apartments exterior view in Knoxville, TN" },
  "/floor-plans": { image: "floorplans/cassell-2-bedroom-a.jpg", alt: "2 Bedroom apartment floor plan at Cassell Ridge Apartments" },
  "/gallery": { image: "gallery/cassell-01.jpg", alt: "Cassell Ridge Apartments community photo gallery" },
  "/community": { image: "cassell-hero.jpg", alt: "Cassell Ridge Apartments neighborhood in North Knoxville, TN" },
  "/location": { image: "cassell-hero.jpg", alt: "Cassell Ridge Apartments at 1230 Cassell Valley Way, Knoxville, TN" },
  "/virtual-tours": { image: "floorplans/cassell-3-bedroom.jpg", alt: "3 Bedroom apartment floor plan at Cassell Ridge Apartments" },
  "/contact": { image: "cassell-hero.jpg", alt: "Cassell Ridge Apartments leasing office — Knoxville, TN" },
};
