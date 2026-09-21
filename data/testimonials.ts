/**
 * Verified traveller reviews.
 *
 * This array is intentionally EMPTY until the client supplies real,
 * attributable reviews (with the traveller's permission). Inventing
 * testimonials would put fabricated customer quotes on a live business
 * site, so the homepage renders a "service promise" section instead and
 * automatically switches to a testimonial carousel the moment real
 * entries are added here.
 */
export type Testimonial = {
  name: string;
  location: string;
  trip: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  /** Optional photo — omit and the card shows the traveller's initials. */
  avatar?: string;
};

export const testimonials: Testimonial[] = [];

export const hasTestimonials = testimonials.length > 0;
