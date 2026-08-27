export const PROPERTY_LOCATION = {
  address: {
    street: "1230 Cassell Valley Way",
    city: "Knoxville",
    state: "TN",
    zip: "37912",
  },
  coordinates: {
    latitude: 36.0106934,
    longitude: -83.9666706,
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3229.7856487!2d-83.9666706!3d36.0106934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885c3f4a8b0f0f0f%3A0x8b0f0f0f0f0f0f0f!2s1230%20Cassell%20Valley%20Way%2C%20Knoxville%2C%20TN%2037912!5e0!3m2!1sen!2sus!4v1588286735462!5m2!1sen!2sus",
} as const;

export const OFFICE_HOURS = {
  weekdays: {
    label: "Monday-Friday: 8AM to 5PM",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
  saturday: {
    label: "Saturday: 9AM - 1PM",
    dayOfWeek: ["Saturday"],
    opens: "09:00",
    closes: "13:00",
  },
  sunday: {
    label: "Sunday: Closed",
    dayOfWeek: ["Sunday"],
  },
} as const;

export const APARTMENT_COMPLEX_LOCATION_SCHEMA = {
  address: {
    "@type": "PostalAddress",
    streetAddress: PROPERTY_LOCATION.address.street,
    addressLocality: PROPERTY_LOCATION.address.city,
    addressRegion: PROPERTY_LOCATION.address.state,
    postalCode: PROPERTY_LOCATION.address.zip,
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: PROPERTY_LOCATION.coordinates.latitude,
    longitude: PROPERTY_LOCATION.coordinates.longitude,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: OFFICE_HOURS.weekdays.dayOfWeek,
      opens: OFFICE_HOURS.weekdays.opens,
      closes: OFFICE_HOURS.weekdays.closes,
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: OFFICE_HOURS.saturday.dayOfWeek,
      opens: OFFICE_HOURS.saturday.opens,
      closes: OFFICE_HOURS.saturday.closes,
    },
  ],
} as const;