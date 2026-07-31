export type PaymentPlan = {
  id: string;
  name: string;
  blurb: string;
  /** Amount in paise (₹1 = 100) */
  amountPaise: number;
  currency: 'INR';
  /** Product slug or 'studio' */
  product?: string;
  badge?: string;
  /** Shown on pay button */
  buttonLabel: string;
};

/** Main-site checkout plans (Standard Checkout — one-time for now). */
export const paymentPlans: PaymentPlan[] = [
  {
    id: 'restrosuite-setup',
    name: 'RestroSuite — setup',
    blurb: 'Onboarding, outlet setup and go-live support for restaurant POS.',
    amountPaise: 499900,
    currency: 'INR',
    product: 'restrosuite',
    badge: 'Live product',
    buttonLabel: 'Pay setup',
  },
  {
    id: 'restrosuite-month',
    name: 'RestroSuite — first month',
    blurb: 'First month of software access. Talk to us for ongoing billing.',
    amountPaise: 99900,
    currency: 'INR',
    product: 'restrosuite',
    badge: 'Subscription start',
    buttonLabel: 'Pay first month',
  },
  {
    id: 'staysuite-setup',
    name: 'StaySuite — early access',
    blurb: 'Reserve onboarding while StaySuite is in active build.',
    amountPaise: 299900,
    currency: 'INR',
    product: 'staysuite',
    badge: 'Building',
    buttonLabel: 'Pay early access',
  },
  {
    id: 'medisuite-setup',
    name: 'MediSuite — early access',
    blurb: 'Clinic desk onboarding while MediSuite is shaping with real OPDs.',
    amountPaise: 299900,
    currency: 'INR',
    product: 'medisuite',
    badge: 'Building',
    buttonLabel: 'Pay early access',
  },
  {
    id: 'project-deposit',
    name: 'Custom project deposit',
    blurb: 'Partial payment to start a website, web app or custom build.',
    amountPaise: 500000,
    currency: 'INR',
    product: 'studio',
    badge: 'Client work',
    buttonLabel: 'Pay deposit',
  },
];

export function getPaymentPlan(id: string | undefined | null): PaymentPlan | undefined {
  if (!id) return undefined;
  return paymentPlans.find((p) => p.id === id);
}

export function plansForProduct(productSlug: string): PaymentPlan[] {
  return paymentPlans.filter((p) => p.product === productSlug);
}

export function formatInrFromPaise(amountPaise: number): string {
  return (amountPaise / 100).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });
}
