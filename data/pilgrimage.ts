/**
 * Pilgrimage yatras — exactly the five routes listed on the client brochure.
 */
export type Yatra = {
  slug: string;
  name: string;
  location: string;
  image: string;
  summary: string;
  season: string;
  duration: string;
  highlights: string[];
  notes: string;
};

export const yatras: Yatra[] = [
  {
    slug: 'mata-vaishno-devi-yatra',
    name: 'Mata Vaishno Devi Yatra',
    location: 'Katra, Jammu & Kashmir',
    image: '/images/yatra/vaishno-devi.webp',
    summary:
      'The Bhawan darshan from Katra, with the 13 km climb, the Bhairon temple extension and — where required — pony, palki or helicopter arranged for elders.',
    season: 'Open year-round · best March to October',
    duration: '3–4 days from Katra',
    highlights: ['Yatra slip assistance', 'Katra hotel stay', 'Helicopter option on request', 'Bhairon Baba extension'],
    notes: 'Yatra slips and helicopter tickets are subject to shrine board availability and are booked at actuals.',
  },
  {
    slug: 'shirdi-yatra',
    name: 'Shirdi Yatra',
    location: 'Shirdi, Maharashtra',
    image: '/images/yatra/shirdi.webp',
    summary:
      'Sai Baba darshan at Shirdi, commonly combined with Shani Shingnapur, Trimbakeshwar and Nashik into a single well-organised circuit.',
    season: 'Open year-round',
    duration: '2–5 days',
    highlights: ['Darshan pass assistance', 'Shirdi stay near the temple', 'Shani Shingnapur add-on', 'Nashik & Trimbakeshwar extension'],
    notes: 'Darshan timings vary on festival days. Aarti passes are subject to sansthan allotment.',
  },
  {
    slug: 'chardham-yatra',
    name: 'Chardham Yatra',
    location: 'Uttarakhand',
    image: '/images/yatra/chardham.webp',
    summary:
      'Yamunotri, Gangotri, Kedarnath and Badrinath from Haridwar — with mandatory yatra registration, hill-safe vehicles and staged altitude handled for you.',
    season: 'May to June · September to October',
    duration: '10–12 days · Do Dham from 6 days',
    highlights: ['Yatra registration support', 'Experienced hill drivers', 'Kedarnath helicopter option', 'Do Dham short version'],
    notes: 'Portal opening and closing dates are announced each year. Routes can change at short notice due to weather.',
  },
  {
    slug: 'amarnath-helicopter-yatra',
    name: 'Amarnath Helicopter Yatra',
    location: 'Pahalgam / Baltal, Jammu & Kashmir',
    image: '/images/yatra/amarnath.webp',
    summary:
      'The helicopter yatra from Baltal or Pahalgam, reducing a demanding multi-day trek to a single day — with the compulsory health certificate and registration handled first.',
    season: 'July to August only',
    duration: '3–5 days',
    highlights: ['Yatra permit and registration', 'Helicopter slot booking', 'Compulsory health certificate guidance', 'Srinagar or Pahalgam stay'],
    notes: 'Registration is issued only by the Shri Amarnathji Shrine Board and requires a Compulsory Health Certificate. Flights are weather-dependent.',
  },
  {
    slug: 'kailash-mansarovar-yatra',
    name: 'Kailash Mansarovar Yatra',
    location: 'Tibet, via Nepal',
    image: '/images/yatra/kailash-mansarovar.webp',
    summary:
      'The parikrama of Mount Kailash and darshan at Lake Mansarovar, routed via Kathmandu with permits, acclimatisation days and full support staff.',
    season: 'May to September',
    duration: '13–16 days',
    highlights: ['Permit and travel documentation', 'Staged acclimatisation schedule', 'Support vehicles and crew', 'Kathmandu pre- and post-stay'],
    notes: 'Permits are issued by the Chinese authorities through Nepal and are subject to annual route availability and a medical fitness check.',
  },
];

export const getYatra = (slug: string) => yatras.find((item) => item.slug === slug);
