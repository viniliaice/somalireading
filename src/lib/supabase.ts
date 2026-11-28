/**
 * Shared Supabase client.
 *
 * Reads the URL and publishable key from the environment. Both VITE_* and
 * NEXT_PUBLIC_* names are supported (vite.config.ts exposes both prefixes) so
 * the same env file works here and in the jollyphonetic Next.js app.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL ?? import.meta.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const publishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  '';

export const supabaseConfigured = Boolean(url && publishableKey);

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;
  if (!supabaseConfigured) {
    console.error(
      '[auth] Supabase configuration missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY ' +
        '(or NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY).',
    );
  }
  client = createClient(
    // A placeholder keeps createClient from throwing when env vars are absent;
    // every auth call is guarded by supabaseConfigured and shows a friendly message.
    url || 'https://placeholder.supabase.co',
    publishableKey || 'missing-publishable-key',
    { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } },
  );
  return client;
}

export const supabase = getSupabase();

/**
 * Where Supabase confirmation / recovery e-mails should send the user back to.
 * Always the origin of the site that started the flow, so each of the two
 * websites redirects to itself. Must be allow-listed in
 * Supabase → Authentication → URL Configuration → Redirect URLs.
 */
export function authEmailRedirectTo(): string {
  return `${window.location.origin}/`;
}
