/**
 * Sign in (#/signin) and sign up (#/signup) pages — Supabase email + password
 * auth, styled after the SomaliReading blue/cream identity.
 */
import { useState, type FormEvent } from 'react';
import { ArrowLeft, Check, Eye, EyeOff, GraduationCap, Loader2, MailCheck, Send } from 'lucide-react';
import { supabase, supabaseConfigured, authEmailRedirectTo } from '../lib/supabase';
import { friendlyAuthError, useAuth, type AuthMessage } from './AuthContext';
import '../parents/parents.css';
import './auth.css';

/** Reads `?next=` out of the current hash (e.g. #/signin?next=%23%2Fdashboard). */
function nextTarget(): string {
  const query = window.location.hash.split('?')[1] ?? '';
  const next = new URLSearchParams(query).get('next');
  return next && next.startsWith('#/') ? next : '#/';
}
function go(next: string) {
  if (window.location.hash === next) window.location.reload();
  else window.location.hash = next;
  window.scrollTo(0, 0);
}

function AuthShell({ title, titleEn, children }: { title: string; titleEn: string; children: React.ReactNode }) {
  return (
    <div className="ph-page auth-page">
      <header className="ph-header">
        <a className="ph-brand" href="#/">
          <span className="ph-logo"><GraduationCap size={22} /></span>
          <span>SomaliReading<small>BARO AF-SOOMAALI · AKHRI · HADAL · FAHAM</small></span>
        </a>
      </header>
      <main className="auth-main">
        <div className="auth-card">
          <h1>{title}</h1>
          <p className="auth-sub" lang="en">{titleEn}</p>
          {children}
        </div>
        <a className="auth-back" href="#/"><ArrowLeft size={15} /> Bogga hore · Back home</a>
      </main>
    </div>
  );
}

function Field({
  label, labelEn, type = 'text', value, onValue, autoComplete, children,
}: {
  label: string; labelEn: string; type?: string; value: string;
  onValue: (v: string) => void; autoComplete?: string; children?: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  return (
    <label className="auth-field">
      <span>{label} <em lang="en">· {labelEn}</em></span>
      <span className="auth-input-wrap">
        <input
          type={isPassword && !show ? 'password' : 'text'}
          value={value}
          onChange={e => onValue(e.target.value)}
          autoComplete={autoComplete}
          inputMode={type === 'email' ? 'email' : undefined}
          required
        />
        {isPassword && (
          <button type="button" className="auth-eye" onClick={() => setShow(s => !s)}
            aria-label={show ? 'Qarsoonow fure' : 'Muuji fure'}>
            {show ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        )}
      </span>
      {children}
    </label>
  );
}

function ErrorBanner({ message }: { message: AuthMessage }) {
  return (
    <div className="auth-banner error" role="alert">
      <strong>{message.so}</strong>
      <span lang="en">{message.en}</span>
    </div>
  );
}

function NotConfigured() {
  return (
    <div className="auth-banner error" role="alert">
      <strong>Adeegga akoonka weli lama shubin.</strong>
      <span lang="en">Supabase environment variables are missing on this deployment (VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY).</span>
    </div>
  );
}

function SubmitButton({ busy, label }: { busy: boolean; label: string }) {
  return (
    <button className="ph-btn blue full auth-submit" type="submit" disabled={busy}>
      {busy ? <Loader2 size={18} className="auth-spin" /> : null}
      {busy ? 'Sug… · Please wait…' : label}
    </button>
  );
}

/* ── sign in ─────────────────────────────────────────────────────────── */

export function SignInPage() {
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<AuthMessage | null>(null);
  const [unconfirmed, setUnconfirmed] = useState(false);
  const [resendBusy, setResendBusy] = useState(false);
  const [resent, setResent] = useState(false);
  const [mode, setMode] = useState<'signin' | 'forgot'>('signin');
  const [sentReset, setSentReset] = useState(false);

  if (user && !busy) {
    // Already signed in — no reason to show the form again.
    go(nextTarget());
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null); setUnconfirmed(false); setResent(false); setBusy(true);
    if (mode === 'forgot') {
      const { error: err } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: authEmailRedirectTo() });
      setBusy(false);
      if (err) setError(friendlyAuthError(err));
      else setSentReset(true);
      return;
    }
    const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (err) {
      setBusy(false);
      const friendly = friendlyAuthError(err);
      setError(friendly);
      setUnconfirmed(err.code === 'email_not_confirmed' || err.message.toLowerCase().includes('email not confirmed'));
      return;
    }
    setBusy(false);
    go(nextTarget());
  };

  const resendConfirmation = async () => {
    setResendBusy(true); setError(null);
    const { error: err } = await supabase.auth.resend({ type: 'signup', email: email.trim() });
    setResendBusy(false);
    if (err) setError(friendlyAuthError(err));
    else setResent(true);
  };

  return (
    <AuthShell title={mode === 'forgot' ? 'Dib u dejiso fure' : 'Soo gal'} titleEn={mode === 'forgot' ? 'Reset your password' : 'Sign in'}>
      {!supabaseConfigured && <NotConfigured />}
      {sentReset && (
        <div className="auth-banner ok" role="status">
          <strong>Email dib-u-dejinta waa la diray. Hubi sanduuqa email-kaaga.</strong>
          <span lang="en">Password reset email sent — please check your inbox (and spam folder).</span>
        </div>
      )}
      {resent && (
        <div className="auth-banner ok" role="status">
          <strong>Email xaqiijinta cusub waa la diray.</strong>
          <span lang="en">A fresh confirmation email is on its way.</span>
        </div>
      )}
      {error && <ErrorBanner message={error} />}
      {unconfirmed && (
        <button type="button" className="auth-resend" onClick={resendConfirmation} disabled={resendBusy}>
          {resendBusy ? <Loader2 size={15} className="auth-spin" /> : <Send size={15} />}
          Dir email xaqiijin cusub · Resend confirmation email
        </button>
      )}
      <form className="auth-form" onSubmit={submit}>
        <Field label="Imeel" labelEn="Email" type="email" value={email} onValue={setEmail} autoComplete="email" />
        {mode === 'signin' && (
          <Field label="Fure siri" labelEn="Password" type="password" value={password} onValue={setPassword} autoComplete="current-password" />
        )}
        {mode === 'signin' && (
          <button type="button" className="auth-toggle-mode" onClick={() => { setMode('forgot'); setError(null); setSentReset(false); }}>
            Fure sirta ma illoowday? · Forgot password?
          </button>
        )}
        {mode === 'forgot' && (
          <button type="button" className="auth-toggle-mode" onClick={() => { setMode('signin'); setError(null); setSentReset(false); }}>
            ← Ku noqo soo-galka · Back to sign in
          </button>
        )}
        <SubmitButton busy={busy} label={mode === 'forgot' ? 'Dir xiriirka dib-u-dejinta' : 'Soo gal · Sign in'} />
      </form>
      {mode === 'signin' && (
        <p className="auth-switch">
          Akoon ma lihid? <a href={`#/signup?next=${encodeURIComponent(nextTarget())}`}>Isdiiwaangeli · Create account</a>
        </p>
      )}
    </AuthShell>
  );
}

/* ── sign up ─────────────────────────────────────────────────────────── */

export function SignUpPage() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<AuthMessage | null>(null);
  const [done, setDone] = useState<{ email: string; hasSession: boolean } | null>(null);

  if (user && !busy && !done) {
    go(nextTarget());
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError({ so: 'Fure sirtu waa gaaban. Ugu yaraan 6 xaraf isticmaal.', en: 'Password is too short — use at least 6 characters.' });
      return;
    }
    if (password !== confirm) {
      setError({ so: 'Fure sirta labaad ayaa khaldan. Labada fure waa inay isku mid yihiin.', en: 'The two passwords do not match.' });
      return;
    }
    setBusy(true);
    const { data, error: err } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { full_name: name.trim(), display_name: name.trim() },
        emailRedirectTo: authEmailRedirectTo(),
      },
    });
    setBusy(false);
    if (err) { setError(friendlyAuthError(err)); return; }
    setDone({ email: data.user?.email ?? email.trim(), hasSession: Boolean(data.session) });
    if (data.session) go(nextTarget());
  };

  return (
    <AuthShell title="Abuur akoon" titleEn="Create your free SomaliReading account">
      {!supabaseConfigured && <NotConfigured />}
      {done && !done.hasSession && (
        <div className="auth-success" role="status">
          <MailCheck size={34} />
          <h2>Xaqiiji imeelkaaga</h2>
          <p>
            Waxaan kuu dirnay xiriir xaqiijin oo u socda <strong>{done.email}</strong>.
            Fadlan fur email-kaaga oo guji xiriirka si aad akoonkaaga u hawlgeliso.
          </p>
          <p lang="en">We sent a confirmation link to <strong>{done.email}</strong>. Open it to activate your account, then come back and sign in.</p>
          <a className="ph-btn ghost sm" href="#/signin">Soo gal · Sign in</a>
        </div>
      )}
      {!done && (
        <>
          {error && <ErrorBanner message={error} />}
          <form className="auth-form" onSubmit={submit}>
            <Field label="Magacaaga" labelEn="Your name" value={name} onValue={setName} autoComplete="name" />
            <Field label="Imeel" labelEn="Email" type="email" value={email} onValue={setEmail} autoComplete="email" />
            <Field label="Fure siri" labelEn="Password · at least 6 characters" type="password" value={password} onValue={setPassword} autoComplete="new-password" />
            <Field label="Fure siri (mar kale)" labelEn="Confirm password" type="password" value={confirm} onValue={setConfirm} autoComplete="new-password" />
            <ul className="auth-rules" lang="en">
              <li><Check size={13} /> At least 6 characters</li>
              <li><Check size={13} /> Both passwords must match</li>
            </ul>
            <SubmitButton busy={busy} label="Abuur akoon · Create account" />
          </form>
          <p className="auth-terms">
            Adigoo akoon sameynaya waxaad aqbalaysaa
            <a href="#/terms">Shuruudaha</a> iyo <a href="#/privacy">Xog-ilaalinta</a>.
            <span lang="en">By creating an account you accept our Terms and Privacy policy.</span>
          </p>
          <p className="auth-switch">
            Akoon baad haysataa? <a href={`#/signin?next=${encodeURIComponent(nextTarget())}`}>Soo gal · Sign in</a>
          </p>
        </>
      )}
    </AuthShell>
  );
}
