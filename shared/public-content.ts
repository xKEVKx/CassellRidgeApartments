// Existing public page copy, shared by React, production HTML, and FAQ schema.
export const HOME_FAQS = [
  {
    question: "What is the Low-Income Housing Tax Credit (LIHTC) program?",
    answer: "The LIHTC program was created to make quality housing more affordable. It allows communities like Cassell Ridge to offer homes at reduced rental rates to households that meet specific income and eligibility guidelines.",
  },
  {
    question: "How do I know if I qualify for a LIHTC home?",
    answer: "Eligibility is primarily based on your household's gross (pre-tax) annual income and full-time student status. Review the Students and Income Limits sections above for more information. Our team is also available to answer any questions you have along the way!",
  },
  {
    question: "Are all homes at Cassell Ridge part of the LIHTC program?",
    answer: "Yes, every home at Cassell Ridge is income-restricted through the LIHTC program. All residents must meet the program's income and eligibility requirements to qualify.",
  },
  {
    question: "What if my income is over the limit?",
    answer: "Because all homes at Cassell Ridge are income-restricted, households exceeding the income limits would not qualify. If you're unsure where you stand, reach out to our team — we're happy to walk through your options with you!",
  },
  {
    question: "Do I have to be a first-time renter to qualify?",
    answer: "No, you do not have to be a first-time renter. Your eligibility is based on your income and student status, not your rental history.",
  },
  {
    question: "What happens if my income changes after I move in?",
    answer: "If your household income increases after you move in, you are usually allowed to remain in your home. However, certain program rules may apply if your income increases significantly. Our team will guide you through any necessary next steps if needed.",
  },
  {
    question: "Can full-time students live in a LIHTC home?",
    answer: "Yes, but with some restrictions. If all household members are full-time students, you must meet one of the specific exceptions listed in the Students section to qualify.",
  },
  {
    question: "What documents will I need to provide?",
    answer: "You'll be asked to provide documentation verifying your household income, student status (if applicable), and other standard application information. Our leasing team will provide a full checklist to help make the process easy!",
  },
] as const;

export const HOME_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_FAQS.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export const STUDENT_ELIGIBILITY = {
  introduction: "Because of program requirements, households made up entirely of full-time students must meet one of the following exceptions to qualify:",
  exceptions: [
    "At least one student is married and files a joint tax return.",
    "At least one student is enrolled in a job training program receiving assistance under the Job Training Partnership Act or a similar federal, state, or local program.",
    "At least one student was formerly in foster care.",
    "At least one student receives Temporary Assistance for Needy Families (TANF) benefits.",
    "The household consists of a single parent and their children, and neither the parent nor the children are claimed as dependents by another individual.",
  ],
} as const;

export const COMMUNITY_SECTIONS = [
  {
    id: "neighborhoods",
    title: "Neighborhoods Near Cassell Ridge",
    subtitle: "Residents enjoy convenient access to several of Knoxville's most established neighborhoods.",
    destinations: [
      { title: "Fountain City", description: "Just minutes away, Fountain City is known for its historic charm, local restaurants, shopping destinations, and community events. Residents enjoy access to Fountain City Lake and Park, featuring walking paths, green space, and seasonal community activities." },
      { title: "Inskip", description: "The Inskip area offers convenient access to retail centers, restaurants, and Interstate 75, making it a desirable location for commuters working throughout the Knoxville metropolitan area." },
      { title: "Powell", description: "Located just north of the community, Powell provides additional shopping, dining, and recreational opportunities while maintaining a suburban atmosphere close to Knoxville." },
      { title: "Downtown Knoxville", description: "Residents are approximately 14 minutes from downtown Knoxville, giving easy access to employment centers, entertainment venues, sporting events, and the University of Tennessee." },
    ],
  },
  {
    id: "shopping",
    title: "Shopping Near Cassell Ridge",
    subtitle: "Everyday conveniences are close by. Multiple shopping centers are located within a few miles of the community.",
    destinations: [
      { title: "Merchant's Village Shopping Center", description: "A convenient retail destination with a variety of shops and services just a short drive from home." },
      { title: "Clinton Plaza", description: "Nearby retail plaza offering easy access to everyday shopping needs along the Clinton Highway corridor." },
      { title: "Clinton Highway Retail Corridor", description: "A stretch of retail stores, services, and restaurants running along one of North Knoxville's main thoroughfares." },
      { title: "North Knoxville Grocery & Services", description: "Grocery stores and neighborhood services are spread throughout the area, keeping daily errands quick and convenient." },
    ],
  },
  {
    id: "dining",
    title: "Restaurants Near Cassell Ridge",
    subtitle: "A wide variety of local dining options are just minutes from home — from casual breakfast spots to craft cocktail bars.",
    destinations: [
      { title: "Afghani Cuisine", description: "One of Knoxville's highest-rated international restaurants serving authentic Afghan specialties." },
      { title: "Metro Diner", description: "Known for breakfast, brunch, and classic comfort food in a welcoming, family-friendly setting." },
      { title: "The Diner at Twisters", description: "A casual neighborhood spot offering all-day breakfast and homemade desserts." },
      { title: "The Black Dog Brewhouse", description: "Featuring creative cuisine, craft cocktails, live entertainment, and outdoor seating." },
    ],
  },
  {
    id: "schools",
    title: "Schools & Higher Education",
    subtitle: "Families appreciate access to Knox County Schools, while students and professionals benefit from proximity to nearby colleges and universities.",
    destinations: [
      { title: "Knox County Schools", description: "Families at Cassell Ridge are served by Knox County Schools, one of Tennessee's largest and most established public school systems." },
      { title: "South College", description: "A private college offering undergraduate and graduate programs in healthcare, business, law, and technology." },
      { title: "Pellissippi State Community College", description: "A comprehensive community college with multiple Knoxville-area campuses offering two-year degrees and workforce training programs." },
      { title: "Lincoln Memorial University – Knoxville", description: "A respected private university with a Knoxville campus, offering graduate programs in healthcare and other professional fields." },
    ],
  },
  {
    id: "parks",
    title: "Parks and Recreation",
    subtitle: "Outdoor enthusiasts have access to numerous recreational opportunities throughout Knoxville.",
    destinations: [
      { title: "Fountain City Lake and Park", description: "Walking paths, green space, and seasonal community activities in a beloved North Knoxville gathering spot." },
      { title: "John Tarleton Park", description: "A local park offering outdoor recreation and open space for the whole family." },
      { title: "Knoxville Zoo", description: "One of Knoxville's most popular family destinations, home to hundreds of animals and seasonal events." },
      { title: "The Muse Knoxville", description: "A hands-on children's museum fostering creativity, curiosity, and learning through interactive exhibits." },
      { title: "Three Rivers Rambler", description: "A scenic train attraction offering excursions along the Tennessee River through Knoxville's historic landscape." },
    ],
  },
  {
    id: "healthcare",
    title: "Healthcare Access",
    subtitle: "Residents enjoy convenient access to major healthcare providers, making Cassell Ridge an attractive choice for healthcare workers and families.",
    destinations: [
      { title: "Fort Sanders Regional Medical Center", description: "A full-service regional hospital providing comprehensive medical and surgical care to the Knoxville community." },
      { title: "East Tennessee Children's Hospital", description: "A leading pediatric hospital serving children and families across East Tennessee with specialized medical care." },
      { title: "University of Tennessee Medical Center", description: "A major academic medical center and Level I trauma center affiliated with the University of Tennessee Health Science Center." },
    ],
  },
] as const;
