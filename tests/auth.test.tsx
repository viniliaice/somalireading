// @vitest-environment jsdom
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';

const signInWithPassword = vi.fn();
const signUp = vi.fn();
const resend = vi.fn();

vi.mock('../src/lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: (...a: unknown[]) => signInWithPassword(...a),
      signUp: (...a: unknown[]) => signUp(...a),
      resend: (...a: unknown[]) => resend(...a),
      resetPasswordForEmail: vi.fn(async () => ({ data: {}, error: null })),
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signOut: async () => ({ error: null }),
    },
  },
  supabaseConfigured: true,
  authEmailRedirectTo: () => 'http://localhost:3000/',
}));

import { SignInPage, SignUpPage } from '../src/auth/AuthPages';
import { friendlyAuthError } from '../src/auth/AuthContext';

afterEach(cleanup);

function fill(label: RegExp, value: string, index = 0) {
  const inputs = screen.getAllByLabelText(label) as HTMLInputElement[];
  fireEvent.change(inputs[index], { target: { value } });
}

describe('friendlyAuthError', () => {
  it('maps common Supabase errors to bilingual copy', () => {
    expect(friendlyAuthError({ code: 'invalid_credentials' }).so).toContain('qaldan');
    expect(friendlyAuthError({ code: 'email_not_confirmed' }).en).toContain('not confirmed');
    expect(friendlyAuthError({ code: 'user_already_exists' }).so).toContain('diiwaan geliyay');
    expect(friendlyAuthError({ code: 'over_email_send_rate_limit' }).so).toContain('Emailyo badan');
    expect(friendlyAuthError(null).so.length).toBeGreaterThan(3);
  });
});

describe('SignInPage', () => {
  beforeEach(() => {
    signInWithPassword.mockReset();
    resend.mockReset();
    window.location.hash = '#/signin';
  });

  it('signs in with the entered credentials', async () => {
    signInWithPassword.mockResolvedValue({ data: { session: {} }, error: null });
    render(<SignInPage />);
    fill(/Imeel/, 'aisha@example.com');
    fill(/Fure siri/, 'fure-sir-1');
    fireEvent.click(screen.getByRole('button', { name: /Soo gal/ }));
    await waitFor(() =>
      expect(signInWithPassword).toHaveBeenCalledWith({ email: 'aisha@example.com', password: 'fure-sir-1' }));
  });

  it('shows a bilingual error when credentials are wrong', async () => {
    signInWithPassword.mockResolvedValue({ data: { session: null }, error: { code: 'invalid_credentials', message: 'Invalid login credentials' } });
    render(<SignInPage />);
    fill(/Imeel/, 'aisha@example.com');
    fill(/Fure siri/, 'wrong');
    fireEvent.click(screen.getByRole('button', { name: /Soo gal/ }));
    await waitFor(() => expect(screen.getByRole('alert').textContent).toContain('qaldan'));
    expect(screen.getByRole('alert').textContent).toContain('Wrong email or password');
  });

  it('offers to resend the confirmation email for unconfirmed accounts', async () => {
    signInWithPassword.mockResolvedValue({ data: { session: null }, error: { code: 'email_not_confirmed', message: 'Email not confirmed' } });
    resend.mockResolvedValue({ data: {}, error: null });
    render(<SignInPage />);
    fill(/Imeel/, 'aisha@example.com');
    fill(/Fure siri/, 'fure-sir-1');
    fireEvent.click(screen.getByRole('button', { name: /Soo gal/ }));
    const resendBtn = await screen.findByRole('button', { name: /Resend confirmation email/ });
    fireEvent.click(resendBtn);
    await waitFor(() => expect(resend).toHaveBeenCalledWith({ type: 'signup', email: 'aisha@example.com' }));
    expect(await screen.findByText(/Email xaqiijinta cusub waa la diray/)).toBeTruthy();
  });
});

describe('SignUpPage', () => {
  beforeEach(() => {
    signUp.mockReset();
    window.location.hash = '#/signup';
  });

  it('validates passwords before contacting Supabase', () => {
    render(<SignUpPage />);
    fill(/Magaca/, 'Aisha');
    fill(/Imeel/, 'aisha@example.com');
    fill(/^Fure siri/, 'abcdef', 0);
    fill(/^Fure siri/, 'ghijkl', 1);
    fireEvent.click(screen.getByRole('button', { name: /Abuur akoon/ }));
    expect(signUp).not.toHaveBeenCalled();
    expect(screen.getByRole('alert').textContent).toContain('isku mid yihiin');
  });

  it('creates the account with profile metadata and redirect', async () => {
    signUp.mockResolvedValue({ data: { user: { email: 'aisha@example.com' }, session: null }, error: null });
    render(<SignUpPage />);
    fill(/Magaca/, 'Aisha');
    fill(/Imeel/, 'aisha@example.com');
    fill(/^Fure siri/, 'abcdef', 0);
    fill(/^Fure siri/, 'abcdef', 1);
    fireEvent.click(screen.getByRole('button', { name: /Abuur akoon/ }));
    await waitFor(() => expect(signUp).toHaveBeenCalledTimes(1));
    const call = signUp.mock.calls[0][0] as { email: string; password: string; options: { data: Record<string, string>; emailRedirectTo: string } };
    expect(call.email).toBe('aisha@example.com');
    expect(call.options.data.full_name).toBe('Aisha');
    expect(call.options.emailRedirectTo).toMatch(/^http:\/\/localhost/);
    expect(await screen.findByText(/Xaqiiji imeelkaaga/)).toBeTruthy();
  });
});
