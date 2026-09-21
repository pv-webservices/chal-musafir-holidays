/**
 * Service catalogue.
 * Titles and scope mirror the client's brochure exactly:
 * Air Tickets · Rail Tickets · Hotel Booking · Resort Booking ·
 * Holiday Packages · Group Packages · LTC / Luxury Train Tours ·
 * Cruise Holidays · Visa · Travel Insurance
 */
export type Service = {
  slug: string;
  title: string;
  short: string;
  image: string;
  overview: string;
  benefits: string[];
  process: string[];
  faqs?: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: 'air-tickets',
    title: 'Air Tickets',
    short: 'Domestic & International',
    image: '/images/services/air-tickets.webp',
    overview:
      'Domestic and international air ticketing with route planning, fare comparison and human follow-up on every booking — exactly as offered from the Moradabad office since 2011.',
    benefits: [
      'Domestic and international sectors',
      'Route and connection guidance',
      'Traveller detail and document checks',
      'Support for date changes and cancellations',
    ],
    process: [
      'Share your route, travel dates and passenger count',
      'We compare practical routing and fare options',
      'You approve the itinerary that suits you',
      'Ticketing and travel documents are coordinated',
    ],
    faqs: [
      { q: 'Do you issue both domestic and international tickets?', a: 'Yes. Chal Musafir Holidays handles domestic sectors across India as well as international routes to Asia, the Middle East, Europe, Africa and Oceania.' },
      { q: 'Can I book tickets for a group?', a: 'Yes. Group fares are quoted separately — share the passenger list and travel window and the team will revert with options.' },
    ],
  },
  {
    slug: 'rail-tickets',
    title: 'Rail Tickets',
    short: 'Across the Indian Network',
    image: '/images/services/rail-tickets.webp',
    overview:
      'Railway ticket assistance for holiday, family and pilgrimage travel across the Indian rail network, including class guidance and connection planning for multi-city routes.',
    benefits: [
      'Class and quota guidance',
      'Multi-leg and connecting journeys',
      'Coordination with your holiday itinerary',
      'Assistance for seniors and large families',
    ],
    process: [
      'Share origin, destination and preferred dates',
      'We advise on suitable trains, classes and timings',
      'Passenger details are confirmed',
      'Booking is coordinated and shared with you',
    ],
  },
  {
    slug: 'hotel-booking',
    title: 'Hotel Booking',
    short: 'Worldwide Hotels',
    image: '/images/services/hotel-booking.webp',
    overview:
      'Worldwide hotel bookings matched to your destination, trip style and budget — recommendations come from experience, not from an unfiltered list.',
    benefits: [
      'Location-first recommendations',
      'Family, couple and group room planning',
      'Meal-plan and inclusion guidance',
      'Stay coordination from check-in to check-out',
    ],
    process: [
      'Tell us the city and dates',
      'Set your room, budget and meal preferences',
      'Review a shortlist we consider genuinely suitable',
      'Confirm and receive your stay vouchers',
    ],
  },
  {
    slug: 'resort-booking',
    title: 'Resort Booking',
    short: 'Beach, Hill & Wellness Stays',
    image: '/images/services/resort-booking.webp',
    overview:
      'Resort-led holidays for beach, hill-station, wellness and family breaks, with property matching based on the kind of holiday you actually want.',
    benefits: [
      'Property matched to the occasion',
      'Room category and view guidance',
      'Meal plan and activity inclusions',
      'Airport and station transfer coordination',
    ],
    process: [
      'Share the destination and the occasion',
      'Review a curated resort shortlist',
      'Choose room category and meal plan',
      'Confirm the stay and transfers',
    ],
  },
  {
    slug: 'holiday-packages',
    title: 'Holiday Packages',
    short: 'Custom Domestic & International',
    image: '/images/services/holiday-packages.webp',
    overview:
      'Complete holiday planning for Indian and international destinations — every itinerary is built around your dates, pace, traveller mix and budget rather than a fixed template.',
    benefits: [
      'Fully customised day-by-day itineraries',
      'Transport, stay and sightseeing in one plan',
      'Honeymoon, family, group and custom trips',
      'One point of contact through the journey',
    ],
    process: [
      'Choose a destination or tell us the mood',
      'Share dates, traveller mix and budget',
      'Review the proposed itinerary',
      'Refine it together, then confirm',
    ],
  },
  {
    slug: 'group-packages',
    title: 'Group Packages',
    short: 'Special Group Departures',
    image: '/images/services/group-packages.webp',
    overview:
      'Special group packages for families travelling together, friends, corporate teams, societies and pilgrimage groups — coordinated so a large party still travels smoothly.',
    benefits: [
      'Group fares and group room blocks',
      'Coach and transfer coordination',
      'Single point of coordination for the organiser',
      'Flexible add-ons for sub-groups',
    ],
    process: [
      'Share group size, route and travel window',
      'We build the route and cost structure',
      'Organiser reviews and confirms the plan',
      'Rooming list and documents are collected',
    ],
  },
  {
    slug: 'luxury-train-tours',
    title: 'LTC / Luxury Train Tours',
    short: 'Comfortable Heritage Journeys',
    image: '/images/services/luxury-train-tours.webp',
    overview:
      'Support for LTC travel requirements and India’s luxury heritage rail journeys, including documentation guidance for government and PSU travellers.',
    benefits: [
      'LTC documentation guidance',
      'Luxury and heritage train itineraries',
      'Approved-route planning',
      'Pre- and post-tour extensions',
    ],
    process: [
      'Share the route and purpose of travel',
      'We check available services and departures',
      'Traveller details and approvals are confirmed',
      'The full journey is coordinated end to end',
    ],
  },
  {
    slug: 'cruise-holidays',
    title: 'Cruise Holidays',
    short: 'Sail to New Horizons',
    image: '/images/services/cruise-holidays.webp',
    overview:
      'Cruise holiday planning with cabin selection, shore-excursion advice and the pre- and post-cruise stays that make the whole trip work.',
    benefits: [
      'Sailing route and season guidance',
      'Cabin category selection',
      'Port and shore-excursion planning',
      'Pre- and post-cruise hotel stays',
    ],
    process: [
      'Tell us the region and travel window',
      'Review suitable sailings and routes',
      'Select your cabin category',
      'Documentation and stays are coordinated',
    ],
  },
  {
    slug: 'visa-assistance',
    title: 'Visa Assistance',
    short: 'Hassle-Free Documentation',
    image: '/images/services/visa-assistance.webp',
    overview:
      'Practical visa documentation support and checklist guidance for international travel. Approval always rests with the relevant embassy or authority — we make the paperwork straightforward.',
    benefits: [
      'Country-specific document checklists',
      'Form filling and application guidance',
      'Appointment support where applicable',
      'Status follow-up guidance',
    ],
    process: [
      'Confirm destination and visa category',
      'We review the traveller profile',
      'A complete checklist is prepared',
      'We support you through submission',
    ],
    faqs: [
      { q: 'Do you guarantee visa approval?', a: 'No agency can. Visa decisions rest solely with the embassy or consulate. What we do is make sure your documentation is complete and correctly presented.' },
    ],
  },
  {
    slug: 'travel-insurance',
    title: 'Travel Insurance',
    short: 'Travel with Added Protection',
    image: '/images/services/travel-insurance.webp',
    overview:
      'Guidance on travel insurance requirements and help selecting appropriate cover from available providers, including the mandatory cover some visas require.',
    benefits: [
      'Visa-mandated cover guidance',
      'Coverage comparison support',
      'Policy issuance coordination',
      'Document assistance before departure',
    ],
    process: [
      'Share destination, dates and traveller ages',
      'We identify the cover you actually need',
      'Review suitable policy options',
      'Policy issuance is coordinated',
    ],
  },
];

export const getService = (slug: string) => services.find((item) => item.slug === slug);
