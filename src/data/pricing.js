export const plans = [
  {
    name: 'Starter',
    price: '₦2,500,000',
    unit: '/mo',
    desc: 'For early-stage teams needing focused engineering support to move fast.',
    featured: false,
    features: [
      '2 dedicated senior engineers',
      'Weekly sprint cycles',
      '10 hours of support per week',
      'GitHub project management',
      'Dedicated Slack channel',
      'Monthly progress reports',
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Growth',
    price: '₦8,000,000',
    unit: '/mo',
    desc: 'For scaling companies shipping production systems and hitting milestones.',
    featured: true,
    features: [
      '6 dedicated senior engineers',
      'Daily standups & planning',
      '24/7 on-call coverage',
      'Full CI/CD pipeline management',
      'Performance monitoring & alerting',
      'Quarterly architecture review',
      'Priority support channel',
    ],
    cta: 'Start Growth',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    unit: '',
    desc: 'For organisations with unique scale, compliance, or security requirements.',
    featured: false,
    features: [
      'Dedicated team of 12+ engineers',
      '99.99% SLA guarantees',
      'On-premise deployment options',
      'ISO 27001 & SOC 2 compliance',
      'Dedicated account manager',
      'Executive sponsorship',
      'Custom contract terms',
    ],
    cta: 'Contact Sales',
  },
];

export const faq = [
  { q: 'Can I change plans later?', a: 'Yes. You can upgrade, downgrade, or cancel at any time. Changes take effect at the start of the next billing cycle.' },
  { q: 'What happens if I exceed support hours?', a: 'We track usage transparently. Extra hours are billed at ₦180,000/hr for Starter and ₦200,000/hr for Growth plans.' },
  { q: 'Do you offer discounts for non-profits?', a: 'Yes. We offer a 20% discount for registered non-profits and open-source foundations.' },
  { q: 'How fast can a team start?', a: 'Most teams are operational within 48 hours of signing. Enterprise engagements typically require a 1-week onboarding period.' },
];
