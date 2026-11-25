import type { PlanId } from './pricing';

/**
 * Plan entitlement layer — the integration point for paid access.
 *
 * STATUS: there is NO payment backend and NO account system in this codebase
 * yet (verified by inspection). Entitlements must never be granted from a
 * frontend button click or an unverified redirect: the purchase state has to
 * come from server-side payment confirmation (e.g. a webhook-verified provider
 * session) and be checked here.
 *
 * Until that backend exists, `PAYMENTS_ENABLED` is false and every visitor can
 * use the learning features (the current, pre-payment experience). Flip the
 * flag only once server-verified purchases populate `planFor`.
 */
export const PAYMENTS_ENABLED = false;

export type Entitlement = 'website' | 'lessons';

const PLAN_ENTITLEMENTS: Record<PlanId, Entitlement[]> = {
  website: ['website'],
  full: ['website', 'lessons'],
};

export function entitlementsFor(plan: PlanId): Entitlement[] {
  return PLAN_ENTITLEMENTS[plan] ?? [];
}

/**
 * @param plan the SERVER-VERIFIED plan of the signed-in user.
 *   Never pass a value derived from a button click or URL parameter.
 */
export function isUnlocked(plan: PlanId, entitlement: Entitlement): boolean {
  if (!PAYMENTS_ENABLED) return true; // open access while payments are unimplemented
  return entitlementsFor(plan).includes(entitlement);
}
