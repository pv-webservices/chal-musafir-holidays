/**
 * Holiday package concepts.
 * These are itinerary *starting points*, not live-priced offers — final
 * hotels, transport, inclusions and pricing are always confirmed in the
 * agency quotation after an enquiry.
 */
export type PackageType = 'Family' | 'Honeymoon' | 'Group' | 'Pilgrimage' | 'Heritage';

export type Package = {
  slug: string;
  title: string;
  destination: string;
  destinationSlug: string;
  region: 'Domestic' | 'International';
  type: PackageType;
  duration: string;
  nights: number;
  idealFor: string;
  image: string;
  highlights: string[];
  overview: string;
  itinerary: { day: string; title: string; detail: string }[];
  inclusions: string[];
  exclusions: string[];
};

const standardInclusions = [
  'Accommodation as per the confirmed quotation',
  'Daily breakfast at the selected hotels',
  'All transfers and sightseeing by private vehicle',
  'Driver allowance, tolls, parking and state taxes',
  'Dedicated trip coordinator on call through the journey',
];

const standardExclusions = [
  'Air or rail fare unless specifically quoted',
  'Monument entry tickets and optional activities',
  'Meals other than those listed in the final quotation',
  'Personal expenses, tips and travel insurance',
  'Anything not listed under inclusions',
];

export const packages: Package[] = [
  {
    slug: 'kerala-backwaters-and-hills',
    title: 'Kerala Backwaters & Hills',
    destination: 'Kerala',
    destinationSlug: 'kerala',
    region: 'Domestic',
    type: 'Family',
    duration: '6 Days / 5 Nights',
    nights: 5,
    idealFor: 'Families & Couples',
    image: '/images/packages/kerala.webp',
    highlights: ['Munnar', 'Thekkady', 'Alleppey houseboat'],
    overview:
      'The classic Kerala route, paced properly: two nights in the tea hills, a night in spice country and an overnight houseboat on the backwaters before you head home.',
    itinerary: [
      { day: 'Day 1', title: 'Arrival & drive to Munnar', detail: 'Airport or station pickup, then a scenic climb into the tea hills with waterfall stops along the way.' },
      { day: 'Day 2', title: 'Munnar sightseeing', detail: 'Tea museum, Mattupetty dam, Echo Point and the Eravikulam viewpoint, timed around your preferred start.' },
      { day: 'Day 3', title: 'Munnar to Thekkady', detail: 'Transfer through cardamom country with an optional spice plantation walk and an evening cultural show.' },
      { day: 'Day 4', title: 'Thekkady to Alleppey', detail: 'Board your private houseboat by midday and cruise the backwaters with onboard lunch and dinner.' },
      { day: 'Day 5', title: 'Alleppey to Kochi', detail: 'Disembark after breakfast and transfer to Kochi for Fort Kochi, the Chinese fishing nets and Jew Town.' },
      { day: 'Day 6', title: 'Departure', detail: 'Transfer to Kochi airport or railway station for your onward journey.' },
    ],
    inclusions: [...standardInclusions, 'One night on a private Alleppey houseboat with all meals'],
    exclusions: standardExclusions,
  },
  {
    slug: 'royal-rajasthan-circuit',
    title: 'Royal Rajasthan Circuit',
    destination: 'Rajasthan',
    destinationSlug: 'rajasthan',
    region: 'Domestic',
    type: 'Heritage',
    duration: '7 Days / 6 Nights',
    nights: 6,
    idealFor: 'Families & Groups',
    image: '/images/packages/rajasthan.webp',
    highlights: ['Jaipur', 'Jodhpur', 'Udaipur'],
    overview:
      'Three of Rajasthan’s great cities in one loop — the pink city, the blue city and the lake city — with heritage hotel options at every stop.',
    itinerary: [
      { day: 'Day 1', title: 'Arrive Jaipur', detail: 'Arrival, hotel check-in and an evening at leisure or a visit to Chokhi Dhani.' },
      { day: 'Day 2', title: 'Jaipur sightseeing', detail: 'Amber Fort, Jal Mahal, City Palace, Jantar Mantar and a Hawa Mahal photo stop.' },
      { day: 'Day 3', title: 'Jaipur to Jodhpur', detail: 'Drive via Ajmer and Pushkar with a stop at the Brahma temple and the holy lake.' },
      { day: 'Day 4', title: 'Jodhpur sightseeing', detail: 'Mehrangarh Fort, Jaswant Thada, Umaid Bhawan and the old blue-city markets.' },
      { day: 'Day 5', title: 'Jodhpur to Udaipur', detail: 'Scenic transfer with an optional detour to the Ranakpur Jain temples.' },
      { day: 'Day 6', title: 'Udaipur sightseeing', detail: 'City Palace, Saheliyon ki Bari, Jagdish temple and a sunset boat ride on Lake Pichola.' },
      { day: 'Day 7', title: 'Departure', detail: 'Transfer to Udaipur airport or railway station.' },
    ],
    inclusions: [...standardInclusions, 'Heritage hotel upgrade available on request'],
    exclusions: standardExclusions,
  },
  {
    slug: 'himachal-snow-escape',
    title: 'Himachal Snow Escape',
    destination: 'Himachal Pradesh',
    destinationSlug: 'himachal-pradesh',
    region: 'Domestic',
    type: 'Honeymoon',
    duration: '6 Days / 5 Nights',
    nights: 5,
    idealFor: 'Couples & First-time Snow Travellers',
    image: '/images/destinations/himachal-pradesh.webp',
    highlights: ['Shimla', 'Manali', 'Solang Valley'],
    overview:
      'The most-requested North India honeymoon — Shimla’s colonial mall road, Manali’s river valley and a full day at the snow point in Solang.',
    itinerary: [
      { day: 'Day 1', title: 'Arrive Shimla', detail: 'Pickup from Chandigarh or Kalka, drive up to Shimla and an evening on the Mall Road.' },
      { day: 'Day 2', title: 'Shimla & Kufri', detail: 'Kufri excursion, Jakhoo temple and Christ Church, with the toy train as an optional add-on.' },
      { day: 'Day 3', title: 'Shimla to Manali', detail: 'Full-day drive along the Beas with stops at Sundernagar lake and Pandoh dam.' },
      { day: 'Day 4', title: 'Solang & Atal Tunnel', detail: 'Snow point day — Solang Valley activities and, subject to permits and weather, the Atal Tunnel.' },
      { day: 'Day 5', title: 'Manali local', detail: 'Hadimba temple, Vashisht hot springs, Manu temple and Old Manali cafés.' },
      { day: 'Day 6', title: 'Departure', detail: 'Drive down to Chandigarh or Delhi for your onward connection.' },
    ],
    inclusions: [...standardInclusions, 'Honeymoon room decoration and a welcome cake on request'],
    exclusions: [...standardExclusions, 'Snow-point union vehicle charges and adventure activity fees'],
  },
  {
    slug: 'chardham-yatra',
    title: 'Do Dham & Char Dham Yatra',
    destination: 'Uttarakhand',
    destinationSlug: 'uttarakhand',
    region: 'Domestic',
    type: 'Pilgrimage',
    duration: '10 Days / 9 Nights',
    nights: 9,
    idealFor: 'Families & Pilgrimage Groups',
    image: '/images/yatra/chardham.webp',
    highlights: ['Yamunotri', 'Gangotri', 'Kedarnath', 'Badrinath'],
    overview:
      'The full Char Dham circuit from Haridwar, with registration, accommodation and vehicle arrangements handled — and a shorter Do Dham option for travellers with limited time.',
    itinerary: [
      { day: 'Day 1', title: 'Haridwar arrival', detail: 'Arrival, yatra registration formalities and the evening Ganga aarti at Har Ki Pauri.' },
      { day: 'Day 2', title: 'Haridwar to Barkot', detail: 'Drive via Mussoorie with a stop at Kempty Falls.' },
      { day: 'Day 3', title: 'Yamunotri darshan', detail: 'Drive to Janki Chatti, then trek or pony to Yamunotri and return to Barkot.' },
      { day: 'Day 4', title: 'Barkot to Uttarkashi', detail: 'Transfer with a visit to the Kashi Vishwanath temple at Uttarkashi.' },
      { day: 'Day 5', title: 'Gangotri darshan', detail: 'Drive to Gangotri along the Bhagirathi, darshan and return.' },
      { day: 'Day 6', title: 'Uttarkashi to Guptkashi', detail: 'Long transfer day through Tehri and Srinagar.' },
      { day: 'Day 7', title: 'Kedarnath darshan', detail: 'Sonprayag transfer, then trek, pony or helicopter to Kedarnath for darshan.' },
      { day: 'Day 8', title: 'Guptkashi to Badrinath', detail: 'Drive via Joshimath, evening darshan and Mana village visit.' },
      { day: 'Day 9', title: 'Badrinath to Rudraprayag', detail: 'Morning abhishek, then the return drive through the Panch Prayag.' },
      { day: 'Day 10', title: 'Return to Haridwar', detail: 'Drive back to Haridwar for your onward journey.' },
    ],
    inclusions: [...standardInclusions, 'Yatra registration assistance', 'Pony, palki or helicopter arranged on request at actuals'],
    exclusions: [...standardExclusions, 'Pony, palki and helicopter charges', 'Temple donations and special darshan fees'],
  },
  {
    slug: 'dubai-city-and-desert',
    title: 'Dubai City & Desert Break',
    destination: 'Dubai',
    destinationSlug: 'dubai',
    region: 'International',
    type: 'Family',
    duration: '5 Days / 4 Nights',
    nights: 4,
    idealFor: 'Families & First-time International Travellers',
    image: '/images/packages/dubai.webp',
    highlights: ['City tour', 'Desert safari', 'Dhow cruise'],
    overview:
      'A compact, well-paced Dubai holiday covering the skyline, the desert and a free day for theme parks or shopping — with visa and flight assistance available as add-ons.',
    itinerary: [
      { day: 'Day 1', title: 'Arrival', detail: 'Airport meet-and-greet, transfer to the hotel and an evening at leisure.' },
      { day: 'Day 2', title: 'City tour & observation deck', detail: 'Half-day city tour covering Jumeirah, Palm and the old souks, plus an observation-deck visit.' },
      { day: 'Day 3', title: 'Desert safari', detail: 'Morning free, then an evening dune-bashing safari with a BBQ dinner and live entertainment.' },
      { day: 'Day 4', title: 'Free day', detail: 'A full open day for theme parks, the aquarium, an Abu Dhabi excursion or shopping.' },
      { day: 'Day 5', title: 'Departure', detail: 'Transfer to Dubai International for your return flight.' },
    ],
    inclusions: ['Hotel stay with daily breakfast', 'Airport transfers on a shared or private basis', 'Half-day city tour', 'Evening desert safari with BBQ dinner'],
    exclusions: ['International flights unless quoted', 'UAE visa fee unless quoted', 'Optional attraction tickets', 'Travel insurance and personal expenses'],
  },
  {
    slug: 'thailand-island-and-city',
    title: 'Thailand Island & City Escape',
    destination: 'Thailand',
    destinationSlug: 'thailand',
    region: 'International',
    type: 'Honeymoon',
    duration: '6 Days / 5 Nights',
    nights: 5,
    idealFor: 'Couples & Friends',
    image: '/images/packages/thailand.webp',
    highlights: ['Phuket', 'Phi Phi islands', 'Bangkok'],
    overview:
      'Island first, city second — three nights on the Andaman coast with a full-day island cruise, then two nights in Bangkok for temples, rooftops and shopping.',
    itinerary: [
      { day: 'Day 1', title: 'Arrive Phuket', detail: 'Airport transfer, resort check-in and a sunset at Patong or Kata beach.' },
      { day: 'Day 2', title: 'Phi Phi island tour', detail: 'Full-day speedboat cruise to Phi Phi with snorkelling, Maya Bay viewing and lunch.' },
      { day: 'Day 3', title: 'Phuket at leisure', detail: 'Free day for the spa, James Bond Island or a Phuket city tour.' },
      { day: 'Day 4', title: 'Fly to Bangkok', detail: 'Domestic flight, transfer and an evening at a night market or on a dinner cruise.' },
      { day: 'Day 5', title: 'Bangkok city & shopping', detail: 'Grand Palace and Wat Pho in the morning, then the afternoon in the shopping districts.' },
      { day: 'Day 6', title: 'Departure', detail: 'Transfer to Suvarnabhumi for your return flight.' },
    ],
    inclusions: ['Resort and hotel stays with daily breakfast', 'All airport and inter-city transfers', 'Phi Phi island cruise with lunch', 'Bangkok half-day city tour'],
    exclusions: ['International and domestic flights unless quoted', 'Thailand visa fee unless quoted', 'Optional tours and water sports', 'Personal expenses'],
  },
  {
    slug: 'bali-honeymoon-escape',
    title: 'Bali Honeymoon Escape',
    destination: 'Indonesia',
    destinationSlug: 'indonesia',
    region: 'International',
    type: 'Honeymoon',
    duration: '7 Days / 6 Nights',
    nights: 6,
    idealFor: 'Honeymoon Couples',
    image: '/images/packages/bali.webp',
    highlights: ['Ubud pool villa', 'Nusa Penida', 'Uluwatu sunset'],
    overview:
      'Three nights in the Ubud hills with a private pool villa, then three by the beach — the itinerary we build most often for honeymooners.',
    itinerary: [
      { day: 'Day 1', title: 'Arrive Bali', detail: 'Airport pickup, transfer to Ubud and a romantic villa check-in with flower decoration.' },
      { day: 'Day 2', title: 'Ubud highlights', detail: 'Tegalalang rice terraces, Tirta Empul, the monkey forest and a coffee plantation stop.' },
      { day: 'Day 3', title: 'Waterfall & swing day', detail: 'Tukad Cepung waterfall, the Bali swing and a candlelight dinner at the villa.' },
      { day: 'Day 4', title: 'Transfer to the coast', detail: 'Move to Seminyak or Nusa Dua with an afternoon at the beach club.' },
      { day: 'Day 5', title: 'Nusa Penida day trip', detail: 'Fast-boat crossing for Kelingking, Angel’s Billabong and Broken Beach.' },
      { day: 'Day 6', title: 'Uluwatu & leisure', detail: 'Free morning, then the Uluwatu cliff temple, Kecak fire dance and a seafood dinner at Jimbaran.' },
      { day: 'Day 7', title: 'Departure', detail: 'Transfer to Denpasar airport for your return flight.' },
    ],
    inclusions: ['Villa and resort stays with daily breakfast', 'Private car with driver for all tours', 'Honeymoon decoration and one candlelight dinner', 'Nusa Penida day trip with lunch'],
    exclusions: ['International flights unless quoted', 'Indonesia visa on arrival fee', 'Optional water sports and spa treatments', 'Personal expenses'],
  },
  {
    slug: 'singapore-malaysia-family',
    title: 'Singapore & Malaysia Family Holiday',
    destination: 'Singapore',
    destinationSlug: 'singapore',
    region: 'International',
    type: 'Family',
    duration: '7 Days / 6 Nights',
    nights: 6,
    idealFor: 'Families with Children',
    image: '/images/packages/singapore-malaysia.webp',
    highlights: ['Sentosa', 'Gardens by the Bay', 'Genting Highlands'],
    overview:
      'The twin-city family favourite — three nights in Singapore for the attractions, three in Kuala Lumpur for the towers, highlands and markets.',
    itinerary: [
      { day: 'Day 1', title: 'Arrive Singapore', detail: 'Airport transfer, hotel check-in and an evening at Marina Bay for the light show.' },
      { day: 'Day 2', title: 'Sentosa Island', detail: 'Cable car, Sentosa attractions and the option of a full day at Universal Studios.' },
      { day: 'Day 3', title: 'City tour & Gardens by the Bay', detail: 'Half-day city tour, then the Cloud Forest and Flower Dome with the evening Garden Rhapsody.' },
      { day: 'Day 4', title: 'Singapore to Kuala Lumpur', detail: 'Coach or flight transfer, with a Batu Caves stop on arrival.' },
      { day: 'Day 5', title: 'Genting Highlands', detail: 'Full-day excursion with the Awana Skyway cable car and indoor theme park.' },
      { day: 'Day 6', title: 'KL city tour', detail: 'Twin towers photo stop, KL Tower, the national monument and Central Market shopping.' },
      { day: 'Day 7', title: 'Departure', detail: 'Transfer to KLIA for your return flight.' },
    ],
    inclusions: ['Hotel stays with daily breakfast', 'All transfers and inter-city travel', 'Sentosa and Gardens by the Bay entry as quoted', 'Genting Highlands full-day tour'],
    exclusions: ['International flights unless quoted', 'Visa fees unless quoted', 'Universal Studios tickets unless added', 'Personal expenses'],
  },
  {
    slug: 'europe-highlights-circuit',
    title: 'Europe Highlights Circuit',
    destination: 'Europe',
    destinationSlug: 'europe',
    region: 'International',
    type: 'Group',
    duration: '10 Days / 9 Nights',
    nights: 9,
    idealFor: 'Groups, Families & Couples',
    image: '/images/packages/europe.webp',
    highlights: ['Switzerland', 'Paris', 'Italy'],
    overview:
      'A four-country circuit built around the panoramic rail journeys and the landmarks everyone actually wants to see — with Schengen visa documentation support included.',
    itinerary: [
      { day: 'Day 1', title: 'Arrive Paris', detail: 'Airport transfer, hotel check-in and an evening Seine cruise.' },
      { day: 'Day 2', title: 'Paris city tour', detail: 'Eiffel Tower second level, Louvre exterior, Champs-Élysées and Arc de Triomphe.' },
      { day: 'Day 3', title: 'Disneyland or Versailles', detail: 'A full free day for Disneyland Paris or the Palace of Versailles.' },
      { day: 'Day 4', title: 'Paris to Switzerland', detail: 'High-speed train to Switzerland and check-in at Interlaken or Engelberg.' },
      { day: 'Day 5', title: 'Snow-peak excursion', detail: 'Jungfraujoch or Mount Titlis with the cable car and glacier walk.' },
      { day: 'Day 6', title: 'Lucerne & lake day', detail: 'Chapel Bridge, Lion Monument, lake cruise and the Swiss shopping street.' },
      { day: 'Day 7', title: 'Switzerland to Italy', detail: 'Scenic transfer to Venice with an evening at leisure.' },
      { day: 'Day 8', title: 'Venice', detail: 'St Mark’s Square, a gondola ride and the Murano glass-blowing demonstration.' },
      { day: 'Day 9', title: 'Rome', detail: 'Transfer to Rome for the Colosseum, Trevi Fountain and Vatican City.' },
      { day: 'Day 10', title: 'Departure', detail: 'Transfer to Rome Fiumicino for your return flight.' },
    ],
    inclusions: ['Hotel stays with daily breakfast', 'Inter-city rail and coach transfers', 'Listed excursions and entry passes', 'Indian meals on most days', 'Tour manager for group departures'],
    exclusions: ['International flights unless quoted', 'Schengen visa fee and insurance', 'City taxes payable at hotels', 'Optional tours and personal expenses'],
  },
];

export const getPackage = (slug: string) => packages.find((item) => item.slug === slug);

export const packageTypes = Array.from(new Set(packages.map((item) => item.type)));
