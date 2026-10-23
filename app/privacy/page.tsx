import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/ui/PageHero';
import { addressLine, site } from '@/data/site';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description: 'How Chal Musafir Holidays collects, uses and protects the personal information you share when planning travel with us.',
  path: '/privacy', image: '/images/hero/contact.webp',
});

const sections: { heading: string; body: string[] }[] = [
  {
    heading: 'Who we are',
    body: [
      `${site.name} (${site.legalNote}) is a travel agency based at ${addressLine}, India. In this policy, "we", "us" and "our" refer to ${site.name}. You can reach us on ${site.phones.join(', ')} or at ${site.email}.`,
    ],
  },
  {
    heading: 'Information we collect',
    body: [
      'We collect only what we need to respond to your travel enquiry and arrange your trip. That usually means: your name, phone number and email address; your destination, travel dates and traveller count; your budget range and stated preferences; and any additional details you choose to include in a message.',
      'When a booking proceeds, we additionally collect the identity and travel documents required by airlines, hotels, transport operators, insurers and visa authorities — for example passport details for international travel.',
      'We do not collect payment card details through this website. Any payment is arranged separately and directly.',
    ],
  },
  {
    heading: 'How we use it',
    body: [
      'Your information is used to respond to your enquiry, prepare quotations and itineraries, make and manage bookings with travel suppliers, meet legal or regulatory obligations, and contact you about the trip you asked us to plan.',
      'We do not sell your personal information. We do not use it for unrelated marketing unless you have asked us to keep you informed.',
    ],
  },
  {
    heading: 'How website forms are delivered',
    body: [
      `The enquiry and trip-planner forms on this website are delivered by FormSubmit (formsubmit.co), a third-party form-delivery service. When you press Send, the details you entered — together with the page you sent them from and the time of submission — are passed to FormSubmit, which emails them to our Gmail address, ${site.email}. FormSubmit processes the submission only to deliver it, under its own privacy terms, and the email is then stored in our Google (Gmail) account under Google's privacy terms.`,
      'If you use the "Send via WhatsApp" button instead, your message is sent through WhatsApp (Meta) under WhatsApp’s own terms.',
      'If you would rather not use these services, call or email us directly using the details on this page.',
    ],
  },
  {
    heading: 'Who we share it with',
    body: [
      'To deliver a trip we must share the relevant details with the suppliers involved — airlines, railways, hotels and resorts, transport operators, cruise lines, visa processing agencies and insurance providers. We share only what each supplier genuinely requires.',
      'We may also disclose information where we are legally required to do so, or to protect our legal rights.',
    ],
  },
  {
    heading: 'Cookies and analytics',
    body: [
      'This website does not set advertising or tracking cookies. Your browser may store standard technical data needed to load the site, and embedded content such as the Google Maps panel on our contact page is served by Google under its own privacy terms.',
    ],
  },
  {
    heading: 'How long we keep it',
    body: [
      'Enquiry details are retained only as long as they are useful for planning your trip or for follow-up. Booking records are retained for as long as required for accounting, tax and legal purposes, and then securely deleted.',
    ],
  },
  {
    heading: 'Your choices',
    body: [
      'You can ask us at any time to tell you what information we hold about you, to correct anything inaccurate, or to delete information we no longer need to keep. Write to us at ' +
        site.email +
        ' or call the office and we will act on your request.',
    ],
  },
  {
    heading: 'Security',
    body: [
      'We take reasonable technical and organisational measures to protect the information you give us. No method of transmission over the internet is completely secure, so please avoid sending sensitive documents through unsecured channels — we will always tell you the right way to send them.',
    ],
  },
  {
    heading: 'Changes to this policy',
    body: [
      'We may update this policy as our services or legal obligations change. The version published on this page is the one that applies.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        copy="What we collect when you enquire about travel, why we need it, and what we do with it."
        image="/images/hero/contact.webp"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
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
            Questions about this policy? Email{' '}
            <a href={`mailto:${site.email}`} className="font-black text-[var(--brand-blue)] underline">
              {site.email}
            </a>{' '}
            or call {site.phones[0]}.
          </p>
        </div>
      </section>
    </>
  );
}
