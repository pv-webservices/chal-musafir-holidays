/**
 * Destination network.
 * Mirrors the coverage listed on the client's brochure:
 *   Domestic      — Kerala, Rajasthan, Goa, Eastern India, Uttarakhand,
 *                   Himachal, Madhya Pradesh, Uttar Pradesh, South India, Maharashtra
 *   International — Thailand, Indonesia, Sri Lanka, Europe, Singapore,
 *                   Australia, France, Dubai, Malaysia, Mauritius, United Kingdom
 */
export type Destination = {
  slug: string;
  name: string;
  subtitle: string;
  region: 'domestic' | 'international';
  image: string;
  overview: string;
  bestTime: string;
  duration: string;
  tripStyles: string[];
  attractions: string[];
  thingsToDo: string[];
  featured?: boolean;
};

export const destinations: Destination[] = [
  // ---------------------------------------------------------- Domestic
  {
    slug: 'kerala',
    name: 'Kerala',
    subtitle: "God's Own Country",
    region: 'domestic',
    image: '/images/destinations/kerala.webp',
    overview:
      'Palm-lined backwaters, tea-covered hills and a slower rhythm make Kerala one of the easiest states to fall in love with — equally good for honeymooners, families and anyone who needs to properly switch off.',
    bestTime: 'October to March',
    duration: '5–8 days',
    tripStyles: ['Honeymoon', 'Family', 'Wellness'],
    attractions: ['Alleppey backwaters', 'Munnar tea gardens', 'Kochi heritage quarter', 'Thekkady & Periyar', 'Kovalam coast'],
    thingsToDo: ['Overnight houseboat stay', 'Spice plantation walk', 'Kathakali performance', 'Ayurveda and wellness therapies'],
    featured: true,
  },
  {
    slug: 'rajasthan',
    name: 'Rajasthan',
    subtitle: 'The Royal Land',
    region: 'domestic',
    image: '/images/destinations/rajasthan.webp',
    overview:
      'Forts on hilltops, palaces on lakes, desert dunes and craft markets that have been running for centuries — Rajasthan is India at its most cinematic.',
    bestTime: 'October to March',
    duration: '6–10 days',
    tripStyles: ['Heritage', 'Family', 'Group'],
    attractions: ['Jaipur', 'Udaipur', 'Jodhpur', 'Jaisalmer', 'Pushkar'],
    thingsToDo: ['Fort and palace tours', 'Desert camp and camel safari', 'Heritage haveli stays', 'Blue-city and craft walks'],
    featured: true,
  },
  {
    slug: 'goa',
    name: 'Goa',
    subtitle: 'Sun, Sand & Serenity',
    region: 'domestic',
    image: '/images/destinations/goa.webp',
    overview:
      'The most flexible short break in India — lively in the north, quiet in the south, and easy to shape into a family holiday, a friends’ trip or a beach honeymoon.',
    bestTime: 'November to February',
    duration: '3–5 days',
    tripStyles: ['Beach', 'Honeymoon', 'Friends'],
    attractions: ['North Goa beaches', 'South Goa resorts', 'Old Goa churches', 'Mandovi river', 'Dudhsagar falls'],
    thingsToDo: ['Beach hopping', 'Water sports', 'Heritage and spice tours', 'Sunset river cruise'],
    featured: true,
  },
  {
    slug: 'uttarakhand',
    name: 'Uttarakhand',
    subtitle: 'Land of Gods',
    region: 'domestic',
    image: '/images/destinations/uttarakhand.webp',
    overview:
      'Himalayan hill towns, river valleys and India’s most important pilgrimage circuit sit side by side — which is why one state can serve a yatra, a family break and an adventure trip equally well.',
    bestTime: 'March to June · September to November',
    duration: '5–9 days',
    tripStyles: ['Pilgrimage', 'Family', 'Adventure'],
    attractions: ['Rishikesh & Haridwar', 'Mussoorie', 'Nainital', 'Char Dham circuit', 'Auli'],
    thingsToDo: ['Ganga aarti', 'White-water rafting', 'Mountain and lakeside stays', 'Forest and nature walks'],
    featured: true,
  },
  {
    slug: 'himachal-pradesh',
    name: 'Himachal Pradesh',
    subtitle: "Nature's Paradise",
    region: 'domestic',
    image: '/images/destinations/himachal-pradesh.webp',
    overview:
      'Deodar forests, apple valleys, snow in season and mountain roads that are half the experience — Himachal works brilliantly for honeymoons, families and first-time snow trips.',
    bestTime: 'March to June · December to February',
    duration: '5–8 days',
    tripStyles: ['Honeymoon', 'Snow', 'Adventure'],
    attractions: ['Shimla', 'Manali', 'Dharamshala & McLeodganj', 'Kasol', 'Spiti Valley'],
    thingsToDo: ['Snow point excursions', 'Paragliding at Bir Billing', 'Scenic mountain drives', 'Riverside café evenings'],
    featured: true,
  },
  {
    slug: 'madhya-pradesh',
    name: 'Madhya Pradesh',
    subtitle: 'The Heart of India',
    region: 'domestic',
    image: '/images/destinations/madhya-pradesh.webp',
    overview:
      'World-heritage temple complexes, tiger reserves and riverside towns — the quietest way to see a huge amount of Indian history without the crowds.',
    bestTime: 'October to March',
    duration: '5–7 days',
    tripStyles: ['Heritage', 'Wildlife', 'Family'],
    attractions: ['Khajuraho', 'Bandhavgarh', 'Kanha', 'Sanchi', 'Ujjain & Omkareshwar'],
    thingsToDo: ['Temple heritage tours', 'Tiger safari drives', 'Narmada ghat evenings', 'Buddhist circuit visits'],
  },
  {
    slug: 'uttar-pradesh',
    name: 'Uttar Pradesh',
    subtitle: 'Heritage & Faith',
    region: 'domestic',
    image: '/images/destinations/uttar-pradesh.webp',
    overview:
      'The Taj, the ghats of Kashi and the temple towns of Ayodhya, Mathura and Vrindavan — our home state, and the one we know street by street.',
    bestTime: 'October to March',
    duration: '3–6 days',
    tripStyles: ['Heritage', 'Pilgrimage', 'Weekend'],
    attractions: ['Agra & the Taj Mahal', 'Varanasi', 'Ayodhya', 'Mathura & Vrindavan', 'Lucknow'],
    thingsToDo: ['Sunrise at the Taj', 'Ganga aarti at Dashashwamedh', 'Temple darshan circuits', 'Awadhi food trails'],
  },
  {
    slug: 'south-india',
    name: 'South India',
    subtitle: 'Temples, Hills & Coast',
    region: 'domestic',
    image: '/images/destinations/south-india.webp',
    overview:
      'Towering gopurams, coffee-scented hill stations and a coastline that runs for thousands of kilometres — a South India circuit covers Tamil Nadu, Karnataka and Andhra in one flow.',
    bestTime: 'October to March',
    duration: '6–10 days',
    tripStyles: ['Heritage', 'Pilgrimage', 'Family'],
    attractions: ['Madurai', 'Rameswaram', 'Tirupati', 'Coorg', 'Hampi', 'Ooty & Kodaikanal'],
    thingsToDo: ['Temple heritage circuits', 'Coffee estate stays', 'Toy-train hill rides', 'Coastal drives'],
  },
  {
    slug: 'eastern-india',
    name: 'Eastern India',
    subtitle: 'Tea Gardens & Himalayan Foothills',
    region: 'domestic',
    image: '/images/destinations/eastern-india.webp',
    overview:
      'Darjeeling, Gangtok, the Dooars and the Sundarbans — tea country, Kanchenjunga sunrises and some of the friendliest hill towns in the country.',
    bestTime: 'March to May · October to December',
    duration: '6–9 days',
    tripStyles: ['Nature', 'Family', 'Honeymoon'],
    attractions: ['Darjeeling', 'Gangtok & North Sikkim', 'Kalimpong', 'Sundarbans', 'Puri & Konark'],
    thingsToDo: ['Tiger Hill sunrise', 'Darjeeling toy train', 'Tea estate tours', 'Tsomgo Lake day trip'],
  },
  {
    slug: 'maharashtra',
    name: 'Maharashtra',
    subtitle: 'Coast, Caves & Cities',
    region: 'domestic',
    image: '/images/destinations/maharashtra.webp',
    overview:
      'Mumbai’s energy, the rock-cut wonders of Ajanta and Ellora, Konkan beaches and the monsoon-green Sahyadris — plus Shirdi, one of India’s most visited pilgrimage towns.',
    bestTime: 'October to March',
    duration: '4–7 days',
    tripStyles: ['City', 'Pilgrimage', 'Weekend'],
    attractions: ['Mumbai', 'Shirdi', 'Ajanta & Ellora', 'Lonavala & Mahabaleshwar', 'Konkan coast'],
    thingsToDo: ['Gateway and Marine Drive walks', 'Sai Baba darshan', 'Cave heritage tours', 'Hill-station getaways'],
  },

  // ----------------------------------------------------- International
  {
    slug: 'thailand',
    name: 'Thailand',
    subtitle: 'Islands, Cities & Culture',
    region: 'international',
    image: '/images/destinations/thailand.webp',
    overview:
      'The most reliable first international holiday there is — warm, affordable, easy to reach and endlessly variable between city, island and mountain.',
    bestTime: 'November to February',
    duration: '5–8 days',
    tripStyles: ['Honeymoon', 'Friends', 'Family'],
    attractions: ['Bangkok', 'Phuket', 'Krabi', 'Pattaya', 'Chiang Mai'],
    thingsToDo: ['Phi Phi island excursion', 'Grand Palace and temple tours', 'Street-food and market walks', 'Thai massage and spa days'],
    featured: true,
  },
  {
    slug: 'dubai',
    name: 'Dubai',
    subtitle: 'City of Possibilities',
    region: 'international',
    image: '/images/destinations/dubai.webp',
    overview:
      'A short flight, a straightforward visa and a holiday that packs skyline views, desert adventure, theme parks and shopping into four or five days.',
    bestTime: 'November to March',
    duration: '4–6 days',
    tripStyles: ['Family', 'Shopping', 'First-time International'],
    attractions: ['Downtown Dubai', 'Palm Jumeirah', 'Dubai Marina', 'Desert conservation reserve', 'Abu Dhabi day trip'],
    thingsToDo: ['Evening desert safari', 'Observation deck visit', 'Dhow cruise dinner', 'Theme parks and water parks'],
    featured: true,
  },
  {
    slug: 'singapore',
    name: 'Singapore',
    subtitle: 'Smart, Green & Effortless',
    region: 'international',
    image: '/images/destinations/singapore.webp',
    overview:
      'Compact, spotless and genuinely easy to get around — which is exactly why it is the international city break we recommend most often to families.',
    bestTime: 'Year-round',
    duration: '4–5 days',
    tripStyles: ['Family', 'City', 'First-time International'],
    attractions: ['Marina Bay', 'Sentosa Island', 'Gardens by the Bay', 'Singapore Zoo', 'Jurong Bird Park'],
    thingsToDo: ['Night safari', 'Universal Studios', 'Hawker centre food trail', 'Waterfront light show'],
    featured: true,
  },
  {
    slug: 'malaysia',
    name: 'Malaysia',
    subtitle: 'Cities, Islands & Rainforest',
    region: 'international',
    image: '/images/destinations/malaysia.webp',
    overview:
      'Pairs perfectly with Singapore or on its own — Kuala Lumpur’s skyline, Langkawi’s beaches, Genting’s highlands and food that travellers talk about for years.',
    bestTime: 'December to April',
    duration: '5–7 days',
    tripStyles: ['Family', 'Friends', 'Beach'],
    attractions: ['Kuala Lumpur', 'Langkawi', 'Genting Highlands', 'Penang', 'Batu Caves'],
    thingsToDo: ['Twin-tower skybridge visit', 'Langkawi cable car and island hop', 'Highland theme parks', 'Penang heritage food walk'],
  },
  {
    slug: 'indonesia',
    name: 'Indonesia',
    subtitle: 'Bali & Beyond',
    region: 'international',
    image: '/images/destinations/indonesia.webp',
    overview:
      'Bali does honeymoons better than almost anywhere — rice terraces, cliff temples, private pool villas and beaches, all within an hour of each other.',
    bestTime: 'April to October',
    duration: '6–8 days',
    tripStyles: ['Honeymoon', 'Beach', 'Wellness'],
    attractions: ['Ubud', 'Seminyak & Kuta', 'Nusa Penida', 'Uluwatu', 'Tanah Lot'],
    thingsToDo: ['Rice terrace and waterfall tours', 'Private pool villa stay', 'Cliff-temple sunset', 'Island day cruise'],
  },
  {
    slug: 'sri-lanka',
    name: 'Sri Lanka',
    subtitle: 'The Island Next Door',
    region: 'international',
    image: '/images/destinations/sri-lanka.webp',
    overview:
      'Short flights, no long-haul fatigue and an extraordinary amount packed into one island — hill-country trains, ancient citadels, safari parks and southern beaches.',
    bestTime: 'December to April',
    duration: '5–8 days',
    tripStyles: ['Honeymoon', 'Nature', 'Heritage'],
    attractions: ['Kandy', 'Ella & Nuwara Eliya', 'Sigiriya', 'Yala National Park', 'Bentota'],
    thingsToDo: ['Hill-country train journey', 'Sigiriya rock climb', 'Leopard safari', 'Temple of the Tooth visit'],
  },
  {
    slug: 'mauritius',
    name: 'Mauritius',
    subtitle: 'Island Romance',
    region: 'international',
    image: '/images/destinations/mauritius.webp',
    overview:
      'A polished Indian Ocean island where the lagoons really are that colour — our most requested honeymoon destination outside Asia.',
    bestTime: 'May to December',
    duration: '5–7 days',
    tripStyles: ['Honeymoon', 'Luxury', 'Beach'],
    attractions: ['Le Morne', 'Grand Baie', 'Île aux Cerfs', 'Black River Gorges', 'Chamarel'],
    thingsToDo: ['Catamaran cruise', 'Underwater sea walk', 'Seven-coloured earth drive', 'Resort spa days'],
  },
  {
    slug: 'france',
    name: 'France',
    subtitle: 'Culture, Style & Romance',
    region: 'international',
    image: '/images/destinations/france.webp',
    overview:
      'Paris is the anchor, but a France itinerary can just as easily run through the Riviera, the Loire châteaux or the Alps — and slots neatly into a wider Europe circuit.',
    bestTime: 'April to June · September to October',
    duration: '6–9 days',
    tripStyles: ['Honeymoon', 'Heritage', 'Luxury'],
    attractions: ['Paris', 'Versailles', 'French Riviera', 'Loire Valley', 'Mont Saint-Michel'],
    thingsToDo: ['Eiffel Tower and Seine cruise', 'Louvre and museum days', 'Riviera coastal drives', 'Countryside day trips'],
  },
  {
    slug: 'europe',
    name: 'Europe',
    subtitle: 'Multi-Country Circuits',
    region: 'international',
    image: '/images/destinations/europe.webp',
    overview:
      'Switzerland, Italy, Austria, the Netherlands and more — combined into a single well-paced circuit with the rail passes, transfers and Schengen paperwork handled for you.',
    bestTime: 'April to September',
    duration: '8–14 days',
    tripStyles: ['Group', 'Honeymoon', 'Family'],
    attractions: ['Switzerland', 'Italy', 'Austria', 'Netherlands', 'Czech Republic'],
    thingsToDo: ['Alpine panoramic rail journeys', 'Canal and lake cruises', 'Old-town walking tours', 'Snow-peak excursions'],
    featured: true,
  },
  {
    slug: 'united-kingdom',
    name: 'United Kingdom',
    subtitle: 'History Meets Modern',
    region: 'international',
    image: '/images/destinations/united-kingdom.webp',
    overview:
      'London, the Cotswolds, Edinburgh and the Lake District — a comfortable, English-speaking holiday that works especially well for families visiting relatives.',
    bestTime: 'May to September',
    duration: '6–10 days',
    tripStyles: ['Family', 'City', 'Heritage'],
    attractions: ['London', 'Edinburgh', 'Oxford & Cambridge', 'Lake District', 'Stonehenge'],
    thingsToDo: ['London landmark tour', 'Thames river cruise', 'Countryside day trips', 'Premier-league match days'],
  },
  {
    slug: 'australia',
    name: 'Australia',
    subtitle: 'Coast, Reef & Cities',
    region: 'international',
    image: '/images/destinations/australia.webp',
    overview:
      'A long-haul holiday worth the flight — Sydney and Melbourne, the Great Barrier Reef and the Gold Coast, usually across ten days or more.',
    bestTime: 'September to November · March to May',
    duration: '9–14 days',
    tripStyles: ['Family', 'Luxury', 'Adventure'],
    attractions: ['Sydney', 'Melbourne', 'Gold Coast', 'Great Barrier Reef', 'Blue Mountains'],
    thingsToDo: ['Harbour cruise and opera house tour', 'Great Barrier Reef snorkelling', 'Great Ocean Road drive', 'Theme parks on the Gold Coast'],
  },
];

export const getDestination = (slug: string) => destinations.find((item) => item.slug === slug);

export const domesticDestinations = destinations.filter((item) => item.region === 'domestic');
export const internationalDestinations = destinations.filter((item) => item.region === 'international');
export const featuredDestinations = destinations.filter((item) => item.featured);
