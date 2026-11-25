import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight, BookOpen, Check, ChevronDown, ChevronLeft, ChevronRight, CreditCard, Feather, GraduationCap,
  Headphones, Map, Menu, Mic, PenLine, Smartphone,
  Star, TrendingUp, UserPlus, X,
} from 'lucide-react';
import { books as libraryBooks } from '../books/index';
import { stages, schoolTotals } from '../curriculum/index';
import { BILLING_PERIOD, CURRENCY, PLANS, formatPrice, type Plan } from './pricing';
import './parents.css';

/* ── helpers ─────────────────────────────────────────────────────────── */

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.rv'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }, { threshold: 0.08 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

type Intent = 'login' | 'register' | { checkout: Plan };

const SPEAKING_STAGE = stages[3] ?? stages[0];
const READING_STAGE = stages[2] ?? stages[0];
const WRITING_STAGE = stages[5] ?? stages[0];

/* ── page ────────────────────────────────────────────────────────────── */

export function ParentsHome() {
  useReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [intent, setIntent] = useState<Intent | null>(null);
  const totals = schoolTotals();
  const covers = [libraryBooks[0], libraryBooks[4], libraryBooks[9]].filter(Boolean);

  const navLink = (label: string, href?: string, onClick?: () => void) => (
    <a
      className="ph-navlink"
      href={href ?? '#/'}
      onClick={e => {
        if (onClick) { e.preventDefault(); onClick(); }
        setMenuOpen(false);
      }}
    >{label}</a>
  );

  return (
    <div className="ph-page">
      {/* 2 — navigation */}
      <header className="ph-header">
        <a className="ph-brand" href="#/">
          <span className="ph-logo"><GraduationCap size={22} /></span>
          <span>SomaliReading<small>BARO AF-SOOMAALI · AKHRI · HADAL · FAHAM</small></span>
        </a>
        <nav className={`ph-nav ${menuOpen ? 'open' : ''}`} aria-label="Bogagga">
          {navLink('Home', '#/', () => window.scrollTo({ top: 0, behavior: 'smooth' }))}
          {navLink('Learn Somali', '#/dugsi')}
          {navLink('Reading Books', '#/books')}
          {navLink('Speaking', `#/stage/${SPEAKING_STAGE.id}`)}
          {navLink('Phonics', '#/xaraf')}
          {navLink('Somali Literature', '#/xaraf?view=culture')}
          {navLink('Pricing', '#/', () => scrollToId('qiimaha'))}
        </nav>
        <div className="ph-nav-cta">
          <button className="ph-btn ghost sm" onClick={() => setIntent('login')}>Log in</button>
          <button className="ph-btn blue sm" onClick={() => setIntent('register')}>Create Account</button>
        </div>
        <button className="ph-burger" aria-label={menuOpen ? 'Xir liiska' : 'Fur liiska'} aria-expanded={menuOpen} onClick={() => setMenuOpen(o => !o)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* 3 — hero */}
      <section className="ph-hero">
        <div className="ph-hero-copy">
          <p className="ph-pill rv">AF-SOOMAALI · {totals.stages} HEER · {libraryBooks.length} SHEEKO-BUUG</p>
          <h1 className="rv">Baro Af-Soomaali. <em>Akhri. Hadal. Faham.</em></h1>
          <h2 className="ph-hero-sub rv" lang="en">Learn Somali. Read confidently. Speak naturally.</h2>
          <p className="ph-lead rv">SomaliReading waa madal waxbarasho oo kaa caawinaysa inaad barato Af-Soomaaliga, ku hadasho kalsooni, akhrido sheekooyin qurux badan, fahamto erayada iyo suugaanta Soomaaliyeed.</p>
          <p className="ph-sub rv" lang="en">SomaliReading is your online destination for learning Somali through interactive lessons, authentic conversations, beautiful children's books and Somali literature.</p>
          <div className="ph-actions rv">
            <a className="ph-btn blue lg" href="#/dugsi">Bilow Waxbarashada <ArrowRight size={18} /></a>
            <a className="ph-btn ghost lg" href="#/books">Eeg Buugaagta <BookOpen size={18} /></a>
          </div>
        </div>
        <div className="ph-hero-art rv" aria-hidden="true">
          <img className="ph-art-main" src="/images/hero-reading-children.png" alt="" />
          {covers.map((b, i) => (
            <img key={b.id} className={`ph-art-cover c${i + 1}`} src={b.cover} alt="" />
          ))}
          <span className="ph-chip t1">sheeko <small>story</small></span>
          <span className="ph-chip t2">buug <small>book</small></span>
          <span className="ph-chip t3">akhris <small>reading</small></span>
          <span className="ph-chip t4">qalin <small>pen</small></span>
        </div>
      </section>

      {/* 4 — what learners can achieve */}
      <section className="ph-section" id="waxbarasho">
        <p className="ph-eyebrow center rv">WAX KA BARO AF-SOOMAALIGA</p>
        <h2 className="rv">Afar xirfad oo muhiim ah</h2>
        <p className="ph-sub center rv" lang="en">Four skills your child will build.</p>
        <div className="ph-skill-grid">
          {[
            { icon: Headphones, t: 'Dhagaysi — Listening', so: 'Faham Af-Soomaali hadlaya, maqal dhawaaqyada Af-Soomaaliga, oo aqoonsi erayo.', en: 'Understand spoken Somali, hear the sounds of Somali and recognise words.', href: `#/stage/${stages[0].id}`, cls: 'blue' },
            { icon: Mic, t: 'Hadal — Speaking', so: 'Ku celceli wadahadal, dhawaaqyo iyo Af-Soomaali maalinle ah.', en: 'Practise conversations, pronunciation and everyday Somali.', href: `#/stage/${SPEAKING_STAGE.id}`, cls: 'amber' },
            { icon: BookOpen, t: 'Akhris — Reading', so: 'Baro xarfaha, erayada, jumladdaha, buugaagta iyo sheekooyinka.', en: 'Learn to read Somali letters, words, sentences, books and stories.', href: `#/stage/${READING_STAGE.id}`, cls: 'terra' },
            { icon: PenLine, t: 'Qoris — Writing', so: 'Baro higgaadda, dhismaha jumladdaha iyo qoris madax-banaan.', en: 'Learn spelling, sentence construction and independent writing.', href: `#/stage/${WRITING_STAGE.id}`, cls: 'navy' },
          ].map(s => (
            <a key={s.t} className={`ph-skill rv ${s.cls}`} href={s.href}>
              <span className="ph-skill-icon"><s.icon size={22} /></span>
              <h3>{s.t}</h3>
              <p>{s.so}</p>
              <p className="ph-sub" lang="en">{s.en}</p>
              <span className="ph-link">Baro <ArrowRight size={15} /></span>
            </a>
          ))}
        </div>
      </section>

      {/* 5 — learning pathway */}
      <section className="ph-section ph-path-section" id="manhaj">
        <p className="ph-eyebrow center rv">MANHAJKA WAXBARASHADA</p>
        <h2 className="rv">Jidka waxbarashada — todoba heer</h2>
        <p className="ph-sub center rv" lang="en">Our learning pathway — a seven-stage Somali curriculum.</p>
        <ol className="ph-path">
          {stages.map(st => {
            const ready = st.modules.some(m => m.lessons.length > 0);
            return (
              <li key={st.id} className="ph-path-item rv">
                <span className="ph-path-num">{st.index}</span>
                <div>
                  <h3>Heerka {st.index} — {st.titleSo}</h3>
                  <p className="ph-sub">{st.descriptionSo}</p>
                  <p className="ph-sub" lang="en">{st.titleEn} · {st.levelEn}</p>
                  {!ready && <span className="ph-soon">Soo socda · Coming soon</span>}
                </div>
              </li>
            );
          })}
        </ol>
        <div className="center rv">
          <a className="ph-btn blue lg" href="#/dugsi">Eeg Manhajka oo Dhan <ArrowRight size={18} /></a>
        </div>
      </section>

      {/* 6 — book library */}
      <section className="ph-section ph-books-section" id="buugaag">
        <p className="ph-eyebrow center light rv">MAKTABADDA SHEEKOYINKA</p>
        <h2 className="light rv">Sheekooyin Qurux Badan. Akhris Farxad Leh.</h2>
        <p className="ph-sub center light rv">Ku baro Af-Soomaaliga sheekooyin xiiso leh, sawirro qurux badan iyo erayo cusub.</p>
        <BookCarousel />
        <div className="center rv">
          <a className="ph-btn amber lg" href="#/books">Eeg Dhammaan Buugaagta <ArrowRight size={18} /></a>
        </div>
      </section>

      {/* 7 — culture and literature */}
      <section className="ph-section" id="suugaan">
        <p className="ph-eyebrow center rv">DHAQAN IYO SUUGAAN</p>
        <h2 className="rv">Baro Suugaanta iyo Dhaqanka Soomaaliyeed</h2>
        <div className="ph-culture rv">
          <img src="/images/culture-elder-poet.png" alt="Oday Soomaaliyeed oo suugaan akhrinaya — halftone illustration" loading="lazy" />
          <div>
            <p className="ph-eyebrow">ABWAAN HADRAAWI</p>
            <h3>Maxamed Ibraahin Warsame Hadraawi (1943–2022)</h3>
            <p>Baro nolosha, suugaanta iyo dhaxalka mid ka mid ah abwaannada ugu caansan taariikhda suugaanta Soomaaliyeed.</p>
            <p className="ph-sub" lang="en">Discover the life, work and legacy of one of the most celebrated poets in Somali literary history.</p>
            <a className="ph-btn blue" href="#/xaraf?view=culture">Baadh Suugaanta Soomaaliyeed <ArrowRight size={16} /></a>
            <p className="ph-soon">Qorayaal, abwaanno iyo halyeeyo kale — soo socda · More writers and poets — coming soon</p>
          </div>
        </div>
      </section>

      {/* 8 — pricing */}
      <section className="ph-section ph-pricing-section" id="qiimaha">
        <p className="ph-eyebrow center rv">QIIMAHA · PRICING</p>
        <h2 className="rv">Dooro Qorshaha Kugu Habboon</h2>
        <p className="ph-sub center rv">Ku bilow safarkaaga barashada Af-Soomaaliga.</p>
        <div className="ph-plans">
          {PLANS.map(p => (
            <div key={p.id} className={`ph-plan rv ${p.id === 'full' ? 'featured' : ''}`}>
              <p className={`ph-badge ${p.id === 'full' ? 'green' : 'info'}`}>{p.badge}</p>
              <h3>{p.name}</h3>
              <p className="ph-plan-desc">{p.descriptionSo}</p>
              <p className="ph-price"><span className="ph-currency">{CURRENCY}</span>{formatPrice(p.price)}</p>
              <ul>
                {p.entitlementsSo.map(e => <li key={e}><Check size={16} /> {e}</li>)}
              </ul>
              <button className={`ph-btn ${p.id === 'full' ? 'amber' : 'blue'} lg full`} onClick={() => setIntent({ checkout: p })}>
                {p.cta} <ArrowRight size={17} />
              </button>
            </div>
          ))}
        </div>
        <p className="ph-price-note rv">
          Qiimaha waxaa lagu bixiyaa {CURRENCY}.{' '}
          {BILLING_PERIOD ? (
            <>Lacag-bixinta: <strong>{BILLING_PERIOD === 'monthly' ? 'bil kasta' : BILLING_PERIOD === 'annual' ? 'sannad kasta' : 'mar kasta'}</strong>.</>
          ) : (
            <><strong>Waqti lacag-bixinta weli lama go'aamin</strong> — waxa la tusi doonaa marka la go'aamiyo. <span lang="en">The billing period has not been decided; only the amounts above are final.</span></>
          )}
        </p>
      </section>

      {/* 9 — how it works */}
      <section className="ph-section ph-steps-section">
        <p className="ph-eyebrow center rv">SIDA LOO SHAQEEYO</p>
        <h2 className="rv">Saddex tallaabo oo fudud</h2>
        <div className="ph-steps">
          {[
            { icon: UserPlus, n: '1', t: 'Isdiiwaangeli', en: 'Create your SomaliReading account.', onClick: () => setIntent('register') },
            { icon: CreditCard, n: '2', t: 'Dooro Qorshahaaga', en: 'Choose Website Access or Website Access + Lessons.', onClick: () => scrollToId('qiimaha') },
            { icon: BookOpen, n: '3', t: 'Bilow Barashada', en: 'Explore the books, lessons and learning activities available in your plan.', href: '#/dugsi' },
          ].map(s => (
            <div key={s.n} className="ph-step rv">
              <span className="ph-step-num"><s.icon size={22} /></span>
              <p className="ph-step-n">{s.n}</p>
              <h3>{s.t}</h3>
              <p className="ph-sub" lang="en">{s.en}</p>
              {'href' in s && s.href
                ? <a className="ph-link" href={s.href}>Bilow <ArrowRight size={15} /></a>
                : <button className="ph-link as-btn" onClick={s.onClick}>Bilow <ArrowRight size={15} /></button>}
            </div>
          ))}
        </div>
      </section>

      {/* 10 — why SomaliReading */}
      <section className="ph-section ph-why-section">
        <p className="ph-eyebrow center light rv">MAXAA U DOORAN?</p>
        <h2 className="light rv">Waa maxay SomaliReading?</h2>
        <div className="ph-why-grid">
          {[
            { icon: Map, so: 'Manhaj waxbarasho oo si xidhiidhsan loo qoray.', en: 'A structured, sequenced curriculum.' },
            { icon: TrendingUp, so: 'Hagaajin xirfadaha hadalka iyo akhriska.', en: 'Improving speaking and reading skills.' },
            { icon: BookOpen, so: 'Barashada Af-Soomaaliga sheekooyin sawir leh.', en: 'Learning with illustrated Somali stories.' },
            { icon: Feather, so: 'Ogaanshaha dhaqanka iyo suugaanta Soomaaliyeed.', en: 'Discovering Somali culture and literature.' },
            { icon: Star, so: 'Baro xawaarahaagaaga — maalmo iyo habeennada.', en: 'Learning at your own pace.' },
            { icon: Smartphone, so: 'Telefoon, tablet iyo kombuyuutar — meel kasta.', en: 'On mobile, tablet and computer.' },
          ].map(w => (
            <div key={w.en} className="ph-why rv">
              <span className="ph-why-icon"><w.icon size={20} /></span>
              <div><p>{w.so}</p><p className="ph-sub light" lang="en">{w.en}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* 11 — FAQ */}
      <section className="ph-section" id="su-aalo">
        <p className="ph-eyebrow center rv">SU'AALAHA BADAN</p>
        <h2 className="rv">Su'aalaha laga jawaabayo</h2>
        <FAQ />
      </section>

      {/* 12 — final CTA */}
      <section className="ph-final rv">
        <h2>Safarkaaga Af-Soomaaliga Maanta Bilow!</h2>
        <p>Baro ereyo cusub, ku hadal kalsooni, akhri sheekooyin, kuna faan afkaaga hooyo.</p>
        <div className="ph-actions center">
          <a className="ph-btn amber lg" href="#/dugsi">Bilow Hadda <ArrowRight size={18} /></a>
          <button className="ph-btn ghost lg on-blue" onClick={() => scrollToId('qiimaha')}>Eeg Qorshayaasha</button>
        </div>
      </section>

      {/* 13 — footer */}
      <footer className="ph-footer dark">
        <div className="ph-foot-grid">
          <div>
            <a className="ph-brand" href="#/">
              <span className="ph-logo"><GraduationCap size={22} /></span>
              <span>SomaliReading<small>BARO AF-SOOMAALI</small></span>
            </a>
            <p className="ph-foot-desc">Madal waxbarasho oo carruurta iyo qoysaska ku bartaan Af-Soomaaliga: akhris, hadal, dhagaysi, qoris iyo suugaan.</p>
          </div>
          <div>
            <h4>Waxbarashada</h4>
            <a href="#/dugsi">Learn Somali</a>
            <a href={`#/stage/${SPEAKING_STAGE.id}`}>Speaking</a>
            <a href="#/xaraf">Phonics</a>
          </div>
          <div>
            <h4>Buugaagta</h4>
            <a href="#/books">Reading Books</a>
            <a href="#/xaraf?view=culture">Somali Literature</a>
            <a href="#/" onClick={e => { e.preventDefault(); scrollToId('qiimaha'); }}>Pricing</a>
          </div>
          <div>
            <h4>Macluumaad</h4>
            <a href="#/help">Help</a>
            <a href="#/privacy">Privacy Policy</a>
            <a href="#/terms">Terms &amp; Conditions</a>
          </div>
        </div>
        <p className="ph-copy">© 2026 SomaliReading · Baro Af-Soomaali, Akhri, Hadal oo Faham</p>
        <p className="ph-note light">Wax kasta waa dib-u-eegis macallin Soomaali ah u baahan.</p>
      </footer>

      {intent && <IntentDialog intent={intent} onClose={() => setIntent(null)} />}
    </div>
  );
}

/* ── book carousel (coverflow) ──────────────────────────────────────── */

function BookCarousel() {
  const n = libraryBooks.length;
  const [index, setIndex] = useState(0);
  const drag = useRef<number | null>(null);
  const go = (d: number) => setIndex(i => (i + d + n) % n);
  const focus = libraryBooks[index];
  return (
    <div
      className="ph-carousel rv"
      role="group"
      aria-roledescription="carousel"
      aria-label="Sheekooyinka maktabadda"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      }}
    >
      <button className="ph-car-arrow left" aria-label="Buuggii hore" onClick={() => go(-1)}><ChevronLeft size={22} /></button>
      <div
        className="ph-car-stage"
        onPointerDown={e => { drag.current = e.clientX; }}
        onPointerUp={e => {
          if (drag.current === null) return;
          const dx = e.clientX - drag.current;
          drag.current = null;
          if (dx > 45) go(-1);
          else if (dx < -45) go(1);
        }}
      >
        {libraryBooks.map((b, i) => {
          let d = i - index;
          if (d > n / 2) d -= n;
          if (d < -n / 2) d += n;
          const far = Math.abs(d) > 2;
          const slot = Math.max(-2, Math.min(2, d));
          return (
            <button
              key={b.id}
              className={`ph-car-item ph-pos${slot < 0 ? 'n' : ''}${Math.abs(slot)}${far ? ' far' : ''}`}
              aria-hidden={d !== 0}
              tabIndex={d === 0 ? 0 : -1}
              aria-label={`Fokus ${b.titleSo}`}
              onClick={() => setIndex(i)}
            >
              <img src={b.cover} alt="" decoding="async" />
              <span>{b.titleSo}</span>
            </button>
          );
        })}
      </div>
      <button className="ph-car-arrow right" aria-label="Buugga xiga" onClick={() => go(1)}><ChevronRight size={22} /></button>
      <div className="ph-car-detail" aria-live="polite">
        <p className="ph-car-count">{index + 1} / {n}</p>
        <h3>{focus.titleSo}</h3>
        <p className="ph-book-level">{focus.levelLabelSo}</p>
        <p className="ph-book-desc">{focus.descriptionSo}</p>
        <p className="ph-book-meta">{focus.pages.length} bog oo sheeko ah</p>
        <a className="ph-link" href={`#/book/${focus.id}`}>Akhri buugga <ArrowRight size={15} /></a>
      </div>
    </div>
  );
}

/* ── FAQ accordion ───────────────────────────────────────────────────── */

const FAQ_ITEMS: [string, string, string][] = [
  ['Waa maxay SomaliReading?', 'SomaliReading waa madal waxbarasho oo Af-Soomaali ah — casharro, sheeko-buugyo, jimicsiyo iyo suugaan.', 'A Somali learning platform with lessons, storybooks, exercises and literature.'],
  ['Yaa isticmaali kara SomaliReading?', 'Carruurta, waalidiinta, macallimiinta iyo qof kasta oo doonaya inuu barto Af-Soomaaliga.', 'Children, parents, teachers and anyone learning Somali.'],
  ['Sideen ku bilaabi karaa barashada Af-Soomaaliga?', 'Riix "Bilow Waxbarashada" oo gal dugsi — waxbarashadu waa furan tahay, waadna ku bilaabi kartaa casharka koowaad.', 'Press "Bilow Waxbarashada" to enter the school and start the first lesson.'],
  ['Waa maxay farqiga u dhexeeya labada qorshe?', 'Website Access ($5.99) waa madasha iyo buugaagta. Website Access + Lessons ($25) waxa ku jira casharrada waxbarasho oo dhan iyo casharrada tooska ah (live lessons).', 'Website Access ($5.99) is the platform and books; + Lessons ($25) adds all learning lessons and live lessons.'],
  ['Sideen ku bixin karaa lacagta?', 'Nidaamka lacag-bixinta weli lama dhammaystirin — bixinta si ammaan ah ayaa loo furi doonaa marka la xidho. Qiimaha waa USD ($5.99 / $25).', 'Payments are not open yet. When the payment system launches it will be verified securely. Prices are USD ($5.99 / $25).'],
  ['Ma ku isticmaali karaa telefoonka?', 'Haa — boggu wuxuu ku shaqeeyaa telefoon, tablet iyo kombuyuutar.', 'Yes — the site works on phone, tablet and computer.'],
  ['Sidee ayuu horumarkaygu u kaydsan yahay?', 'Horumarkaagu wuxuu ku kaydsan yahay biraawsarkaaga — casharrada aad qabato way kaydsan yihiin.', 'Your progress is stored in your browser and survives coming back.'],
  ['Sidee ayaan u heli karaa caawimo?', 'Eeg qaybta Su’aalaha Badan iyo bogga Caawimada (#/help) — taageero toos ah waa la diyaarinayaa.', 'See the FAQ and the Help page — direct support channels are being set up.'],
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="ph-faq">
      {FAQ_ITEMS.map(([q, so, en], i) => (
        <div key={q} className={`ph-faq-item rv ${open === i ? 'open' : ''}`}>
          <button aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
            {q} <ChevronDown size={18} />
          </button>
          <div className="ph-faq-body">
            <p>{so}</p>
            <p className="ph-sub" lang="en">{en}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── honest checkout / account entry dialog ──────────────────────────── */

function IntentDialog({ intent, onClose }: { intent: Intent; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  const checkout = typeof intent === 'object' ? intent.checkout : null;
  return (
    <div className="ph-modal-backdrop" onClick={onClose}>
      <div className="ph-modal" role="dialog" aria-modal="true" aria-label={checkout ? checkout.cta : 'Akoon'} onClick={e => e.stopPropagation()}>
        <button className="ph-modal-x" aria-label="Xir" onClick={onClose}><X size={18} /></button>
        {checkout ? (
          <>
            <h3>{checkout.cta}</h3>
            <p className="ph-price"><span className="ph-currency">{CURRENCY}</span>{formatPrice(checkout.price)}</p>
            <p className="ph-plan-desc">{checkout.descriptionSo}</p>
            <p className="ph-modal-note">
              <strong>Nidaamka lacag-bixintu weli lama xidhin.</strong> Bixinta waxaa lagu xaqiijiyaa server-ka
              (payment verification) — boggani ma bixiyo lacag, mana sheeganno in lacag la bixiyay.
            </p>
            <p className="ph-sub" lang="en">Payment integration is not connected yet. Purchases must be verified server-side; this button never simulates a payment.</p>
          </>
        ) : (
          <>
            <h3>{intent === 'login' ? 'Soo gal · Log in' : 'Abuur akoon · Create Account'}</h3>
            <p className="ph-modal-note">
              <strong>Nidaamka akoon-yaraynta weli lama xidhin.</strong> Goobtan waa diyaar u ah in lagu xidho
              akoonkaaga marka nidaamku furo.
            </p>
            <p className="ph-sub" lang="en">The account system is not connected yet. This entry point is ready to connect to it.</p>
          </>
        )}
        <div className="ph-actions">
          <button className="ph-btn blue" onClick={onClose}>Fahmay</button>
          <a className="ph-btn ghost" href="#/dugsi" onClick={onClose}>Gal dugsi</a>
        </div>
      </div>
    </div>
  );
}

export default ParentsHome;
