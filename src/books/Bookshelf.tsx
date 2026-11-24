import { BookOpen, Library } from 'lucide-react';
import type { StoryBook } from './types';
import type { BooksProgress } from './progress';
import { bookMastery, getBookProgress } from './progress';
import { BookImage } from './BookImage';

/** The library bookshelf — ten halftone books in reading order. */
export function Bookshelf({ books, progress, onOpenBook, onOpenSchool }: {
  books: StoryBook[];
  progress: BooksProgress;
  onOpenBook: (id: string) => void;
  onOpenSchool: () => void;
}) {
  return (
    <div className="bk-app">
      <header className="bk-shelf-head">
        <div className="bk-inner">
          <p className="bk-eyebrow">MAKTABADDA SHEEKEOOYINKA · HALFTONE</p>
          <h1>Toob buugaag ah oo Af-Soomaali ah</h1>
          <p>Toban sheeko oo casri ah oo halftone ah: laga bilaabo eraygaaga koowaad ilaa sheeko dhammaystiran. Bog kastaa wuxuu leeyahay sawir, qoraal Somali ah, erayo la taaban karo iyo tijaabo.</p>
          <ul className="bk-stats">
            <li>10 buug</li>
            <li>50 bog sheeko</li>
            <li>10 dabool</li>
            <li>Heer 1 → 10</li>
          </ul>
        </div>
      </header>
      <main className="bk-shelf">
        <div className="bk-grid">
          {books.map(b => {
            const m = bookMastery(progress, b);
            const bp = getBookProgress(progress, b.id);
            return (
              <article key={b.id} className="bk-card">
                <div className="bk-cover-wrap">
                  <BookImage src={b.cover} alt={b.coverAltSo} />
                  <span className="bk-level">Heer {b.level}</span>
                </div>
                <div className="bk-card-body">
                  <h3>{b.titleSo}</h3>
                  <p className="bk-desc">{b.descriptionSo}</p>
                  <div className="bk-progress-track" aria-hidden>
                    <div className={`bk-progress-fill ${m.mastered ? 'done' : ''}`} style={{ width: `${Math.round(m.objectiveScore * 100)}%` }} />
                  </div>
                  <div className="bk-card-meta">
                    <span>{bp.pagesRead.length}/5 bog · {Math.round(m.objectiveScore * 100)}%</span>
                    <span>{m.mastered ? 'SHAHAADEYSAN' : b.levelLabelSo}</span>
                  </div>
                  <button className="bk-btn" onClick={() => onOpenBook(b.id)}>
                    <BookOpen size={16} /> {bp.pagesRead.length ? 'Sii wad akhriska' : 'Bilow akhriska'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        <p style={{ marginTop: 22, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="bk-btn secondary small" onClick={onOpenSchool}><Library size={15} /> Ku noqo dugsiga</button>
        </p>
        <p style={{ fontSize: 13, color: '#6b6257', maxWidth: 720 }}>
          Dhammaan sheekooyinku waa <strong>PENDING_REVIEW</strong> — waxay u baahan yihiin dib-u-eegis macallin Soomaali ah.
          Codadka waa <strong>NOT_RECORDED</strong>; ma jiro TTS Ingiriisi oo lagu beddelo, mana qiimeyno dhawaaqa biraawsarka.
        </p>
      </main>
    </div>
  );
}
