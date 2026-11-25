import type { ReactNode } from 'react';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import './parents.css';

const CONTENT: Record<string, { titleSo: string; titleEn: string; body: ReactNode }> = {
  privacy: {
    titleSo: 'Xog-ilaalinta',
    titleEn: 'Privacy policy',
    body: (
      <>
        <p>Horumarkaaga waxbarasho wuxuu ku kaydsan yahay biraawsarkaaga (browser-ka) — ma dirinno, mana haynno xog shakhsi ah.</p>
        <p lang="en">Your learning progress is stored in your own browser. We do not collect or hold personal data yet.</p>
        <p>Marka la furo akoon-yaraynta (accounts) iyo lacag-bixinta, boggan waa la cusboonaysiin doonaa si uu u sharraxo xogta la ururinayo iyo sida loo ilaalinayo.</p>
        <p lang="en">When accounts and payments launch, this page will be updated to describe exactly what data is collected and how it is protected.</p>
      </>
    ),
  },
  terms: {
    titleSo: 'Shuruudaha isticmaalka',
    titleEn: 'Terms and conditions',
    body: (
      <>
        <p>SomaliReading waa madal waxbarasho oo Af-Soomaali ah. Waxa ku jira waa dib-u-eegis macallin Soomaali ah u baahan.</p>
        <p lang="en">SomaliReading is a Somali learning platform. The learning content is pending fluent-teacher review.</p>
        <p>Qiimaha: Website Access $5.99, Website Access + Lessons $25 (USD). Waqtiga lacag-bixinta (monthly / annual / one-time) weli lama go'aamin — lama bixin karo lacag ilaa nidaamka lacag-bixinta la furo.</p>
        <p lang="en">Prices: Website Access $5.99, Website Access + Lessons $25 (USD). The billing period has not been decided yet, and no payment can be taken until the payment system is live.</p>
      </>
    ),
  },
  help: {
    titleSo: 'Caawimo',
    titleEn: 'Help and contact',
    body: (
      <>
        <p>Su'aalaha ugu badan waxaa laga jawaabay boggan hoose (FAQ) — eeg qaybta "Su'aalaha Badan".</p>
        <p lang="en">Most questions are answered in the FAQ section of the homepage.</p>
        <p>Waxbarashada: dugsi, buugaag iyo jimicsi waa furan yihiin. Taageero toos ah (email / chat) waa la diyaarinayaa — boggan waa la cusboonaysiin doonaa marka la furo.</p>
        <p lang="en">Direct support channels (email / chat) are being set up and will be published here when available.</p>
      </>
    ),
  },
};

export function InfoPage({ route }: { route: string }) {
  const key = route.replace(/^#\/?/, '').split(/[/?]/)[0] || 'help';
  const c = CONTENT[key] ?? CONTENT.help;
  return (
    <div className="ph-page">
      <header className="ph-header">
        <a className="ph-brand" href="#/">
          <span className="ph-logo"><GraduationCap size={22} /></span>
          <span>SomaliReading<small>BARO AF-SOOMAALI · AKHRI · HADAL · FAHAM</small></span>
        </a>
      </header>
      <main className="ph-info">
        <a className="ph-info-back" href="#/"><ArrowLeft size={16} /> Bogga hore</a>
        <h1>{c.titleSo}</h1>
        <p className="ph-sub" lang="en">{c.titleEn}</p>
        <div className="ph-info-body">{c.body}</div>
      </main>
      <footer className="ph-footer">
        <p><strong>SomaliReading</strong> · BARO AF-SOOMAALI</p>
        <p className="ph-note">Wax kasta waa dib-u-eegis macallin Soomaali ah u baahan.</p>
      </footer>
    </div>
  );
}

export default InfoPage;
