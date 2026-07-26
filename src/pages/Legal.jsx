import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PAGES = {
  privacy: {
    title: 'Privacy Policy',
    content: `
      <h2>Information We Collect</h2>
      <p>We collect information you provide directly to us, such as your name, email address, company name, and project details when you submit forms on our website.</p>
      <p>We also automatically collect certain technical information when you visit our site, including IP address, browser type, device information, and usage data through cookies and similar technologies.</p>
      <h2>How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide, maintain, and improve our services</li>
        <li>Respond to your inquiries and project requests</li>
        <li>Send technical notices, updates, and support messages</li>
        <li>Monitor and analyse usage trends</li>
        <li>Comply with legal obligations</li>
      </ul>
      <h2>Data Sharing</h2>
      <p>We do not sell your personal information. We may share data with trusted service providers who assist in operating our website and services, subject to strict confidentiality agreements.</p>
      <h2>Security</h2>
      <p>We implement appropriate technical and organisational measures to protect your personal information, including encryption at rest and in transit, access controls, and regular security audits.</p>
      <h2>Your Rights</h2>
      <p>You have the right to access, correct, or delete your personal data. You may also object to or restrict certain processing activities. To exercise these rights, contact us at privacy@seed.dev.</p>
      <h2>Contact</h2>
      <p>For privacy-related inquiries: privacy@seed.ng<br/>SEED Software Development Ltd., 15a Bishop Oluwole Street, Victoria Island, Lagos, Nigeria</p>
    `,
  },
  terms: {
    title: 'Terms of Service',
    content: `
      <h2>Acceptance of Terms</h2>
      <p>By accessing or using SEED's website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
      <h2>Services Description</h2>
      <p>SEED provides software engineering services, educational courses, and related consulting services. The specific scope, deliverables, and timelines for engineering services are defined in separate service agreements.</p>
      <h2>Intellectual Property</h2>
      <p>For engineering services, all intellectual property rights in delivered work product are transferred to the client upon full payment. Course materials remain the intellectual property of SEED and are licensed to enrolled students for personal, non-commercial use.</p>
      <h2>User Obligations</h2>
      <p>You agree to provide accurate information, maintain confidentiality of account credentials, and not use our services for any unlawful purpose.</p>
      <h2>Limitation of Liability</h2>
      <p>SEED's liability is limited to the amount paid for the specific service giving rise to the claim. We are not liable for indirect, incidental, or consequential damages.</p>
      <h2>Termination</h2>
      <p>Either party may terminate service agreements with 30 days written notice. SEED reserves the right to suspend access for violation of these terms.</p>
      <h2>Governing Law</h2>
      <p>These terms are governed by the laws of the Federal Republic of Nigeria.</p>
    `,
  },
  cookies: {
    title: 'Cookie Policy',
    content: `
      <h2>What Are Cookies</h2>
      <p>Cookies are small text files stored on your device when you visit a website. They help us remember your preferences, understand how you use our site, and improve your experience.</p>
      <h2>Types of Cookies We Use</h2>
      <p><strong>Essential Cookies:</strong> Required for the website to function properly. These cannot be disabled.</p>
      <p><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site by collecting anonymous usage data.</p>
      <p><strong>Preference Cookies:</strong> Remember your settings and preferences for future visits.</p>
      <h2>Third-Party Cookies</h2>
      <p>We may use third-party services that set their own cookies. These include analytics providers and embedded content platforms.</p>
      <h2>Managing Cookies</h2>
      <p>Most browsers allow you to control cookies through your settings. Please note that disabling certain cookies may affect website functionality.</p>
      <h2>Updates</h2>
      <p>We may update this Cookie Policy from time to time. Changes will be posted on this page.</p>
    `,
  },
};

export default function Legal() {
  const { slug } = useParams();
  const page = PAGES[slug];

  if (!page) {
    return (
      <div className="page-wrapper" style={{ textAlign: 'center', padding: '10rem 2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--text-primary)' }}>Page not found</h1>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="grid-bg" />
        <div className="page-hero-eyebrow">Legal</div>
        <h1 className="page-hero-title">{page.title}</h1>
      </div>
      <div style={{ background: 'var(--bg-base)' }}>
        <div className="section" style={{ maxWidth: 720, margin: '0 auto', paddingTop: '2rem' }}>
          <div className="article-content" dangerouslySetInnerHTML={{ __html: page.content }} />
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--indigo-light)', textDecoration: 'none', fontSize: '0.9rem' }}>
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
