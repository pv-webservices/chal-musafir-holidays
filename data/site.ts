/**
 * Single source of truth for business details.
 * Everything here is taken from the client's own printed material
 * (visiting card + service brochure) — nothing is invented.
 */
export const site = {
  name: 'Chal Musafir Holidays',
  legalNote: 'A Unit of Shirdi Sai Travelease.com',
  tagline: 'You Choose Your Destination, We Make Your Journey',
  promise: 'Make Your Travel Ease with Quality & Cheapest Rates',
  established: 2011,
  proprietors: ['Sunjay Gupta', 'Akash Gupta'],
  phones: ['8909286000', '6397040089', '9997222499'],
  email: 'chalmusafirholidays@gmail.com',
  website: 'www.chalmusafir.co.in',
  origin: 'https://www.chalmusafir.co.in',
  address: {
    line1: 'A-49, Lajpat Nagar',
    line2: 'Behind Bank of Baroda',
    city: 'Moradabad',
    state: 'Uttar Pradesh',
    country: 'India',
  },
  primaryPhone: '+918909286000',
  whatsapp: '918909286000',
  mapQuery: 'A-49 Lajpat Nagar, Behind Bank of Baroda, Moradabad, Uttar Pradesh',
  logo: '/brand/chal-musafir-logo.webp',
} as const;

export const addressLine = `${site.address.line1}, ${site.address.line2}, ${site.address.city}, ${site.address.state}`;

export const yearsOfExperience = new Date().getFullYear() - site.established;

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`;
export const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;

export const whatsappUrl = (message = 'Hi Chal Musafir Holidays, I would like to plan a trip.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

/**
 * Social profiles. Left empty on purpose — the footer only renders
 * channels that actually resolve, so no dead links ship to production.
 * Add real profile URLs here and they appear automatically.
 */
export const socials: { label: string; href: string; icon: 'facebook' | 'instagram' | 'youtube' | 'linkedin' }[] = [];

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export const nav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Destinations',
    href: '/destinations',
    children: [
      { label: 'Domestic Holidays', href: '/domestic', description: 'Kerala, Rajasthan, Goa, Himachal & more' },
      { label: 'International Holidays', href: '/international', description: 'Thailand, Dubai, Europe, Singapore & more' },
      { label: 'All Destinations', href: '/destinations', description: 'Browse every destination we plan' },
    ],
  },
  {
    label: 'Packages',
    href: '/packages',
    children: [
      { label: 'All Holiday Packages', href: '/packages', description: 'Filter by region and traveller type' },
      { label: 'Honeymoon Packages', href: '/honeymoon-packages', description: 'Romantic getaways for two' },
      { label: 'Family Holidays', href: '/family-packages', description: 'Trips that work for every age' },
      { label: 'Group Packages', href: '/group-tours', description: 'Friends, colleagues and large groups' },
      { label: 'Pilgrimage Yatras', href: '/pilgrimage-packages', description: 'Vaishno Devi, Chardham, Shirdi & more' },
    ],
  },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];
