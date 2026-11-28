/**
 * Auth state provider — exposes the Supabase session to the whole app and
 * bilingual (Somali + English) error messages for common auth failures.
 */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase, supabaseConfigured } from '../lib/supabase';

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  /** True until the first session lookup finishes. */
  loading: boolean;
  configured: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue>({
  session: null,
  user: null,
  loading: false,
  configured: supabaseConfigured,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(supabaseConfigured);

  useEffect(() => {
    if (!supabaseConfigured) return;
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (mounted) setSession(nextSession);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      loading,
      configured: supabaseConfigured,
      signOut: async () => {
        if (supabaseConfigured) await supabase.auth.signOut();
        // Return the visitor to a signed-out view.
        if (window.location.hash.startsWith('#/signin') || window.location.hash.startsWith('#/signup')) {
          window.location.hash = '#/';
        } else {
          window.location.reload();
        }
      },
    }),
    [session, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}

/* ── bilingual error messages ────────────────────────────────────────── */

export type AuthMessage = { so: string; en: string };

/** Maps Supabase auth error codes / messages to friendly bilingual copy. */
export function friendlyAuthError(error: { code?: string; message?: string } | null | undefined): AuthMessage {
  const code = error?.code ?? '';
  const msg = (error?.message ?? '').toLowerCase();
  if (code === 'invalid_credentials' || msg.includes('invalid login credentials')) {
    return { so: 'Imeelka ama fure sirta waa qaldan. Fadlan mar kale isku day.', en: 'Wrong email or password. Please try again.' };
  }
  if (code === 'email_not_confirmed' || msg.includes('email not confirmed')) {
    return { so: 'Imeelkaaga weli lama xaqiijin. Eeg sanduuqa email-kaaga oo guji xiriirka xaqiijinta.', en: 'Your email is not confirmed yet. Please check your inbox and click the confirmation link.' };
  }
  if (code === 'user_already_exists' || code === 'email_exists' || msg.includes('already registered') || msg.includes('already exists')) {
    return { so: 'Akoon imelkaan horeba wuu ku diiwaan geliyay. Fadlan soo gal.', en: 'An account with this email already exists. Please sign in.' };
  }
  if (code === 'weak_password' || msg.includes('password')) {
    return { so: 'Fure sirtu waa daciif tahay ama ma waafaqsan shuruudaha. Ugu yaraan 6 xaraf isticmaal.', en: 'That password is too weak. Use at least 6 characters.' };
  }
  if (code === 'over_email_send_rate_limit' || msg.includes('rate limit')) {
    return { so: 'Emailyo badan waa la diray hadda. Fadlan sug daqiiqado kadib isku day.', en: 'Too many emails were sent. Please wait a minute and try again.' };
  }
  if (msg.includes('invalid email') || code === 'validation_failed') {
    return { so: 'Imeelkan ma saxna. Fadlan hubi oo mar kale isku day.', en: 'That email address is not valid. Please check it and try again.' };
  }
  if (msg.includes('fetch') || msg.includes('network') || msg.includes('failed to')) {
    return { so: 'Xiriirka server-ka lama helin. Hubi internet-kaaga oo mar kale isku day.', en: 'Could not reach the server. Check your connection and try again.' };
  }
  if (error?.message) return { so: `Khalad: ${error.message}`, en: error.message };
  return { so: 'Khalad la yaqaan ayaa dhacay. Mar kale isku day.', en: 'Something went wrong. Please try again.' };
}
