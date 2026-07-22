import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Legal Notice, Privacy & Cookies | Autonomek',
  description: 'Legal terms, privacy policy, and cookie usage of Autonomek Web & AI.',
};

const sections = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    content: `
      At AUTONOMEK WEB & AI, we treat your personal data with complete transparency and security, complying with the General Data Protection Regulation (GDPR) of the European Union and other applicable international privacy frameworks.

      We collect information such as name, email, and phone number when you contact us through our form, WhatsApp, or live chat. This data is used exclusively to:

      - Respond to your requests for information and quotes.
      - Provide our services of web development, AI agents, and automation.
      - Send communications related to your project (billing, support, updates).

      We do not share your personal data with third parties without your explicit consent, except under legal obligation. Your data is stored on secure servers with restricted access.

      You can exercise your rights of access, rectification, cancellation, and opposition by writing to us at contact@autonomek.com.
    `
  },
  {
    id: 'terms',
    title: 'Terms and Conditions',
    content: `
      By contracting the services of AUTONOMEK WEB & AI, you accept the following terms:

      1. **Scope of Service:** Each project is defined in a written proposal with agreed scope, deliverables, deadlines, and costs mutually agreed before starting.

      2. **Intellectual Property:** Once paid in full, the source code and digital assets developed are the property of the client. AUTONOMEK reserves the right to display the work in its portfolio.

      3. **Payments:** A 50% advance payment is required to start projects. The remaining 50% is paid upon delivery. Maintenance plans are billed monthly.

      4. **Confidentiality:** All information shared during the development of the project is kept strictly confidential.

      5. **Support:** The included technical support covers system failures of the developed product. It does not include changes of scope not contemplated in the initial proposal.
    `
  },
  {
    id: 'cookies',
    title: 'Cookie Policy',
    content: `
      This website uses first-party and third-party cookies to improve your browsing experience and analyze traffic.

      **Cookies used:**

      - **Google Analytics (GA4):** We use the _ga cookie to analyze how users interact with the site, allowing us to continuously improve. It is an anonymous analysis cookie.

      - **Chatwoot:** We use functional cookies for the live chat widget, allowing the conversation to remain active across pages.

      - **Technical cookies:** Necessary for the basic functioning of the site.

      You can configure your browser to reject all cookies or indicate when one is sent. However, some functions of the site might not work correctly.

      By continuing to browse, you accept the use of these cookies.
    `
  }
];

export default function LegalPage() {
  return (
    <main className="min-h-screen w-full bg-[#080808] text-white pt-32 pb-24 relative">
      <div className="absolute top-[10%] left-[-10%] w-[40vw] h-[40vh] bg-[#D62828]/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-12">
          <Link href="/us" className="font-mono text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest">
            ← Back to Home
          </Link>
        </div>
        <h1 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4">Legal</h1>
        <p className="text-white/50 text-sm mb-16 max-w-xl">
          Legal notice, privacy policy, and terms of use of Autonomek Web & AI.
        </p>

        <div className="space-y-20">
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="font-display text-2xl md:text-4xl font-black uppercase tracking-tight text-[#D62828] mb-6">
                {section.title}
              </h2>
              <div className="prose prose-invert max-w-none text-white/70 text-sm leading-relaxed space-y-4">
                {section.content.split('\n').filter(Boolean).map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-20 pt-12 border-t border-white/5 text-center">
          <p className="text-white/30 text-xs font-mono uppercase tracking-widest">
            © {new Date().getFullYear()} AUTONOMEK WEB & AI. All rights reserved.
          </p>
          <p className="text-white/20 text-[10px] mt-2">
            contact@autonomek.com — USA / Global
          </p>
        </div>
      </div>
    </main>
  );
}
