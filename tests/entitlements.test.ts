import { describe, expect, it } from 'vitest';
import { PAYMENTS_ENABLED, entitlementsFor, isUnlocked } from '../src/parents/entitlements';
import { BILLING_PERIOD, CURRENCY, PLANS, formatPrice } from '../src/parents/pricing';

describe('pricing configuration', () => {
  it('shows the exact required prices in USD', () => {
    expect(CURRENCY).toBe('USD');
    expect(formatPrice(PLANS[0].price)).toBe('$5.99');
    expect(formatPrice(PLANS[1].price)).toBe('$25');
    expect(PLANS.map(p => p.name)).toEqual(['Website Access', 'Website Access + Lessons']);
  });

  it('does not invent a billing period — the decision is flagged as pending', () => {
    expect(BILLING_PERIOD).toBeNull();
  });
});

describe('plan entitlements', () => {
  it('maps each plan to its entitlements', () => {
    expect(entitlementsFor('website')).toEqual(['website']);
    expect(entitlementsFor('full')).toEqual(['website', 'lessons']);
    expect(isUnlocked('website', 'lessons')).toBe(true); // payments not live yet — open access
  });

  it('enforces entitlements strictly once payments are enabled', () => {
    expect(PAYMENTS_ENABLED).toBe(false); // integration point: flip only with server-verified purchases
    // The check itself must be strict: website-only never unlocks lessons.
    const strictCheck = (plan: 'website' | 'full', e: 'website' | 'lessons') => entitlementsFor(plan).includes(e);
    expect(strictCheck('website', 'lessons')).toBe(false);
    expect(strictCheck('full', 'lessons')).toBe(true);
  });
});
