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
    name: 'StaySuite — onboarding',
    blurb: 'Property setup, team onboarding, and go-live support for StaySuite.',
    amountPaise: 299900,
    currency: 'INR',
    product: 'staysuite',
    badge: 'Live product',
    buttonLabel: 'Pay onboarding',
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
  // Custom websites / client projects are not listed here as a fixed deposit.
  // Advances follow the written quotation (e.g. 40% / 30% / 30%) and are collected
  // via invoice, bank transfer, or a private payment link — not a generic checkout card.
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
