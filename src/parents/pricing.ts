/**
 * Pricing configuration for the parents homepage.
 *
 * MISSING PRODUCT DECISION (flagged, not invented):
 * the billing period has NOT been specified — it is intentionally `null`.
 * Set it to 'monthly' | 'annual' | 'one-time' once decided; the UI will then
 * show the period. Until then only the exact amounts are displayed.
 *
 * Prices are the exact figures given by the product owner and must not change
 * without a new instruction: Website Access $5.99, Website Access + Lessons $25.
 */

export type BillingPeriod = 'monthly' | 'annual' | 'one-time';

export type PlanId = 'website' | 'full';

export type Plan = {
  id: PlanId;
  name: string;
  nameSo: string;
  descriptionSo: string;
  price: number;
  badge: string;
  /** Bullet points — only features that actually exist in the application. */
  entitlementsSo: string[];
  cta: string;
};

export const CURRENCY = 'USD';

/** The billing period decision is pending — do not invent one. */
export const BILLING_PERIOD: BillingPeriod | null = null;

export const PLANS: Plan[] = [
  {
    id: 'website',
    name: 'Website Access',
    nameSo: 'Helitaanka madasha SomaliReading',
    descriptionSo: 'Helitaanka madasha SomaliReading.',
    price: 5.99,
    badge: 'Website access',
    entitlementsSo: [
      '10 sheeko-buug oo halftone ah',
      'Bog kasta: erayo la riixi karo oo micno leh',
      'Akhri sheekooyinka quruxda badan',
      'Helitaanka madasha SomaliReading',
    ],
    cta: 'Hel Website Access',
  },
  {
    id: 'full',
    name: 'Website Access + Lessons',
    nameSo: 'Website-ka + casharrada waxbarasho',
    descriptionSo: 'Helitaanka website-ka iyo casharrada waxbarasho ee SomaliReading.',
    price: 25,
    badge: 'Full learning access',
    entitlementsSo: [
      'Wax kasta oo qorshaha Website Access ku jira',
      'Casharro xaraf-saaris (phonics) oo interactive ah',
      'Casharro akhris iyo faham',
      'Hawlo dhagaysi iyo hadal',
      'Jimicsiyada erayada (vocabulary)',
      'Casharro toos ah oo macallin la leeyahay (live lessons)',
      'Imtixaanno iyo la socodka horumarka',
      'Casharro dhaqan iyo suugaan Soomaaliyeed',
    ],
    cta: 'Hel Website Access + Lessons',
  },
];

export function formatPrice(price: number): string {
  return `$${price % 1 === 0 ? price.toFixed(0) : price.toFixed(2)}`;
}

export function planById(id: PlanId): Plan {
  return PLANS.find(p => p.id === id) ?? PLANS[0];
}
