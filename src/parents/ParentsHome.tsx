import { ArrowRight, BookOpen, Check, GraduationCap, PenLine, Sparkles, TrendingUp } from 'lucide-react';
import { books as libraryBooks } from '../books/index';
import { schoolTotals } from '../curriculum/index';
import './parents.css';

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

/**
 * Parent-facing homepage: what baro. is and what it costs.
 * All product claims describe features that exist in the app;
 * pricing figures come from the business offer (website access $5.99,
 * website + live lessons $25).
 */
export function ParentsHome() {
  const totals = schoolTotals();
  return (
    <div className="ph-page">
      <header className="ph-header">
        <a className="ph-brand" href="#/">
          <GraduationCap size={26} />
          <span>baro<span className="ph-dot">.</span><small>BARO AF-SOOMAALI · DUGSIGA</small></span>
        </a>
        <nav className="ph-nav" aria-label="Bogagga waalidiinta">
          <button onClick={() => scrollTo('faahfaahin')}>Maxay tahay?</button>
          <button onClick={() => scrollTo('qiimaha')}>Qiimaha</button>
        </nav>
        <a className="ph-btn small" href="#/dugsi">Gal dugsi <ArrowRight size={15} /></a>
      </header>

      <section className="ph-hero">
        <div className="ph-hero-copy">
          <p className="ph-eyebrow">GOORTA WAALIDIINTA · FOR PARENTS</p>
          <h1>Af-Soomaali u carruurtaada — <em>si farxad leh.</em></h1>
          <p className="ph-sub" lang="en">Somali literacy for your children — reading, speaking, listening and writing.</p>
          <p className="ph-lead">
            baro. waa websaydh waxbarasho oo carruurtu si tartiib ah ku barto xarfaha, akhriska,
            sheekooyinka iyo suugaanta — {totals.stages} heer oo isku xidhan, laga bilaabo dhagaysiga
            ilaa suugaanta.
          </p>
          <div className="ph-actions">
            <a className="ph-btn primary" href="#/dugsi">Gal dugsi <ArrowRight size={17} /></a>
            <button className="ph-btn ghost" onClick={() => scrollTo('qiimaha')}>Arag qiimaha</button>
          </div>
        </div>
        <div className="ph-covers" aria-label="Sheekooyinka maktabadda">
          {libraryBooks.map(b => (
            <figure key={b.id} className="ph-cover">
              <img src={b.cover} alt={b.coverAltSo} decoding="async" />
              <figcaption>{b.titleSo}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="ph-section" id="faahfaahin">
        <p className="ph-eyebrow center">MAXAY TAHAY? · WHAT IS IT</p>
        <h2>Waxa carruurtu ka helayaan</h2>
        <p className="ph-sub center" lang="en">What your children get inside.</p>
        <div className="ph-features">
          <div className="ph-feature">
            <Sparkles size={22} />
            <h3>{totals.stages} heer oo isku xidhan</h3>
            <p>Laga bilaabo dhagaysiga iyo hadalka ilaa akhriska iyo suugaanta.</p>
            <p className="ph-sub" lang="en">Seven connected stages, from listening to literature.</p>
          </div>
          <div className="ph-feature">
            <BookOpen size={22} />
            <h3>{libraryBooks.length} sheeko-buug</h3>
            <p>Sheekooyin halftone ah; eray kasta waa la riixi karaa, micnihiisana waa la arkaa.</p>
            <p className="ph-sub" lang="en">Ten illustrated storybooks with tappable word help.</p>
          </div>
          <div className="ph-feature">
            <PenLine size={22} />
            <h3>Xarfaha, suugaanta iyo dhaqanka</h3>
            <p>26 xaraf, casharro suugaan, iyo qoris — Af-Soomaali dhab ah.</p>
            <p className="ph-sub" lang="en">Phonics, poetry and culture.</p>
          </div>
          <div className="ph-feature">
            <TrendingUp size={22} />
            <h3>Horumarka la raaco</h3>
            <p>Afar xirfad: dhagaysi, hadal, akhris iyo qoris — meel kasta waad ka aragtaa.</p>
            <p className="ph-sub" lang="en">Progress across the four skills.</p>
          </div>
        </div>
      </section>

      <section className="ph-section ph-pricing-section" id="qiimaha">
        <p className="ph-eyebrow center">QIIMAHA · PRICING</p>
        <h2>Dooro qorshaha qoyskaaga</h2>
        <p className="ph-sub center" lang="en">Choose the plan that fits your family.</p>
        <div className="ph-plans">
          <div className="ph-plan">
            <h3>Galitaanka websaydhka</h3>
            <p className="ph-plan-en" lang="en">Website access</p>
            <p className="ph-price">$5.99</p>
            <ul>
              <li><Check size={16} /> Dhammaan casharrada iyo jimicsiyada</li>
              <li><Check size={16} /> {libraryBooks.length} sheeko-buug oo dhan</li>
              <li><Check size={16} /> Xarfaha iyo dhaqanka</li>
              <li><Check size={16} /> Dashboard horumar leh</li>
            </ul>
            <a className="ph-btn primary" href="#/dugsi">Gal dugsi <ArrowRight size={16} /></a>
          </div>
          <div className="ph-plan featured">
            <p className="ph-badge">Casharro toos ah · Live lessons</p>
            <h3>Websaydh + casharro toos ah</h3>
            <p className="ph-plan-en" lang="en">Website + live lessons</p>
            <p className="ph-price">$25</p>
            <ul>
              <li><Check size={16} /> Wax kasta oo galitaanka websaydhka ku jira</li>
              <li><Check size={16} /> Casharro toos ah oo macallin Soomaali ah</li>
            </ul>
            <a className="ph-btn dark" href="#/dugsi">Gal dugsi <ArrowRight size={16} /></a>
          </div>
        </div>
      </section>

      <footer className="ph-footer">
        <p><strong>baro.</strong> BARO AF-SOOMAALI · DUGSIGA</p>
        <p className="ph-note">Wax kasta waa dib-u-eegis macallin Soomaali ah u baahan.</p>
      </footer>
    </div>
  );
}

export default ParentsHome;
