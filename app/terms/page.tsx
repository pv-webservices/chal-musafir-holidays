import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/ui/PageHero';
import { addressLine, site } from '@/data/site';

export const metadata: Metadata = pageMetadata({
  title: 'Terms & Conditions',
  description: 'The terms on which Chal Musafir Holidays quotes, books and operates travel arrangements.',
  path: '/terms', image: '/images/hero/services.webp',
});

const sections: { heading: string; body: string[] }[] = [
  {
    heading: 'About these terms',
    body: [
      `These terms apply to travel arrangements made through ${site.name} (${site.legalNote}), ${addressLine}. They sit alongside the specific terms stated in your individual quotation, which always take precedence where the two differ.`,
    ],
  },
  {
    heading: 'Quotations and pricing',
    body: [
      'Nothing on this website is a live or bookable price. Destination guides, package pages and itineraries are planning concepts. A price becomes applicable only when we issue you a written quotation.',
      'Quotations are valid for the period stated on them and are subject to availability at the time of confirmation. Airline fares, hotel rates, currency movements and government taxes can change between quotation and booking; where that happens we will tell you before anything is confirmed.',
    ],
  },
  {
    heading: 'Bookings and payment',
    body: [
      'A booking is confirmed only when the stated advance has been received and we have issued a written confirmation. The balance is payable according to the schedule set out in your quotation.',
      'Where a supplier requires full payment earlier — as airlines and several international hotels do — that requirement is stated in the quotation before you commit.',
    ],
  },
  {
    heading: 'Cancellation and refunds',
    body: [
      'Cancellation charges are set by the airlines, hotels, transport operators and other suppliers involved, and are passed through to you along with our service charge. The applicable cancellation schedule is stated in your quotation.',
      'Refunds are processed once the supplier releases the funds to us. Airline and visa fees are frequently non-refundable; where that is the case it is stated before booking.',
    ],
  },
  {
    heading: 'Travel documents',
    body: [
      'You are responsible for holding a valid passport, the correct visa, and any health certificates or permits your journey requires, and for ensuring the names on your documents match your booking exactly.',
      'We assist with visa documentation and checklists, but the decision to grant or refuse a visa rests solely with the relevant embassy, consulate or authority. A visa refusal does not entitle you to a refund of costs already incurred with suppliers.',
    ],
  },
  {
    heading: 'Our role as an agent',
    body: [
      'For flights, hotels, transport, cruises, insurance and similar services we act as an agent for the supplier providing them. Those services are delivered under the supplier’s own terms and conditions.',
      'We are responsible for arranging your booking accurately and for the service we provide to you. We are not liable for a supplier’s failure, for delays or cancellations outside our control, or for events such as weather, natural disasters, strikes, civil disturbance, road or route closures and changes in government regulation.',
    ],
  },
  {
    heading: 'Pilgrimage and high-altitude travel',
    body: [
      'Yatra routes including Char Dham, Amarnath and Kailash Mansarovar involve altitude, physical exertion and weather-dependent access. Registration, permits and medical fitness certificates are mandatory where the relevant authority requires them and are the traveller’s responsibility to obtain, with our assistance.',
      'Routes, darshan timings and helicopter operations may change at short notice on safety grounds. Costs arising from such changes are borne by the traveller.',
    ],
  },
  {
    heading: 'Travel insurance',
    body: [
      'We strongly recommend travel insurance on every trip, and it is mandatory for several international destinations. Claims are settled by the insurer under the policy wording; we can help you understand and arrange cover but we do not underwrite it.',
    ],
  },
  {
    heading: 'Complaints',
    body: [
      `If something goes wrong during your trip, tell us immediately on ${site.phones[0]} so we have a chance to put it right while you are still travelling. Unresolved matters should be sent in writing to ${site.email} within 30 days of your return.`,
    ],
  },
  {
    heading: 'Governing law',
    body: ['These terms are governed by the laws of India, and any dispute is subject to the jurisdiction of the courts at Moradabad, Uttar Pradesh.'],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        copy="How we quote, book and operate travel — and what each side is responsible for."
        image="/images/hero/services.webp"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Terms & Conditions' }]}
      />

      <section className="section-pad">
        <div className="container-shell max-w-4xl">
          <div className="grid gap-10">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-black md:text-3xl">{section.heading}</h2>
                {section.body.map((paragraph, index) => (
                  <p key={index} className="section-copy mt-4">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <p className="mt-12 rounded-2xl bg-[var(--surface-alt)] p-6 text-sm leading-6 text-slate-600">
            Your individual quotation carries the specific inclusions, exclusions, payment schedule and cancellation rules for your trip. If anything
            there differs from this page, the quotation applies.
          </p>
        </div>
      </section>
    </>
  );
}
