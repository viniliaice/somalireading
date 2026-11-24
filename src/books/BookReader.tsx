import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Award, Headphones, Type } from 'lucide-react';
import { tokenize } from '../curriculum';
import { isApproved } from '../audio';
import type { StoryBook, BookWord } from './types';
import type { BooksProgress } from './progress';
import { bookMastery, markPageRead, markWordsSeen } from './progress';
import { bookAudioById } from './audio';
import { BookImage } from './BookImage';
import { BookQuiz } from './BookQuiz';

type View = { kind: 'page'; n: 1 | 2 | 3 | 4 | 5 } | { kind: 'quiz' };

const PUNCT = /[.,!?"«»—–:;()…]/g;

function WordToken({ token, word, seen, active, onPick }: {
  token: string;
  word?: BookWord;
  seen: boolean;
  active: boolean;
  onPick: (token: string, word?: BookWord) => void;
}) {
  return (
    <button
      type="button"
      className={`bk-word ${seen ? 'seen' : ''} ${active ? 'active' : ''}`}
      onClick={() => onPick(token, word)}
      aria-label={`Erayga ${token}`}
    >
      {token}
    </button>
  );
}

/** The distraction-free reader for one book. */
export function BookReader({ book, progress, onBack, onProgress, onOpenBooks }: {
  book: StoryBook;
  progress: BooksProgress;
  onBack: () => void;
  onProgress: (p: BooksProgress) => void;
  onOpenBooks: () => void;
}) {
  const bp = progress.books[book.id];
  const [view, setView] = useState<View>(() => ({ kind: 'page', n: (Math.min(Math.max(bp?.bookmark ?? 1, 1), 5) as 1 | 2 | 3 | 4 | 5) }));
  const [translation, setTranslation] = useState(false);
  const [bigText, setBigText] = useState(false);
  const [picked, setPicked] = useState<{ token: string; word?: BookWord } | null>(null);
  const [hlSentence, setHlSentence] = useState<number | null>(null);
  const [rate, setRate] = useState(1);
  const [audioNote, setAudioNote] = useState('');

  useEffect(() => {
    onProgress(markPageRead(progress, book.id, view.kind === 'page' ? view.n : 5));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  const go = useCallback((v: View) => {
    setPicked(null);
    setHlSentence(null);
    setView(v);
    // Mark synchronously in the event handler — deferred effects can race a reload.
    if (v.kind === 'page') onProgress(markPageRead(progress, book.id, v.n));
    else onProgress(markPageRead(progress, book.id, 5));
  }, [onProgress, progress, book.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (view.kind !== 'page') return;
      if (e.key === 'ArrowRight' && view.n < 5) go({ kind: 'page', n: (view.n + 1) as 1 | 2 | 3 | 4 | 5 });
      if (e.key === 'ArrowLeft' && view.n > 1) go({ kind: 'page', n: (view.n - 1) as 1 | 2 | 3 | 4 | 5 });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [view, go]);

  const page = view.kind === 'page' ? book.pages[view.n - 1] : undefined;
  const wordsBySo = useMemo(() => new Map(book.words.map(w => [w.so.toLowerCase(), w])), [book.words]);
  const mastery = bookMastery(progress, book);

  const pickWord = (token: string, word?: BookWord) => {
    setPicked({ token, word });
    if (word) onProgress(markWordsSeen(progress, book.id, [word.id]));
  };

  const narration = page ? bookAudioById(page.audioId) : undefined;
  const narrationReady = narration ? isApproved(narration) : false;

  return (
    <div className="bk-app bk-reader">
      <div className="bk-reader-bar">
        <button className="bk-btn secondary small" onClick={onBack}><ArrowLeft size={15} /> Buugaagta</button>
        <span className="bk-title">{book.titleSo}</span>
        <button className={`bk-toggle ${translation ? 'on' : ''}`} onClick={() => setTranslation(!translation)} aria-pressed={translation}>Turjumaad</button>
        <button className={`bk-toggle ${bigText ? 'on' : ''}`} onClick={() => setBigText(!bigText)} aria-pressed={bigText}><Type size={13} /> Qoraal weyn</button>
        <button className={`bk-toggle ${hlSentence !== null ? 'on' : ''}`} onClick={() => setHlSentence(hlSentence === null ? 0 : null)} aria-pressed={hlSentence !== null}>Jumlad xigta</button>
        <select className="bk-toggle" value={rate} onChange={e => setRate(Number(e.target.value))} aria-label="Xawaaraha dhagaysiga">
          <option value={0.75}>Tartiib (0.75×)</option>
          <option value={1}>Caadi (1×)</option>
          <option value={1.25}>Dhakhso (1.25×)</option>
        </select>
      </div>
      <div className="bk-reader-progress"><div style={{ width: `${((view.kind === 'page' ? view.n : 5) / 5) * 100}%` }} /></div>

      {view.kind === 'page' && page && (
        <>
          <main className="bk-stage">
            <figure className="bk-figure">
              <BookImage src={page.image} alt={page.imageAltSo} />
              <figcaption className="bk-page-chip">Bogga {page.order} / 5</figcaption>
              <button
                type="button"
                className="bk-audio-fab"
                aria-label={narrationReady ? 'Dhegayso bogga' : 'Dhegayso bogga · cod la ansixiyey weli lama hayo'}
                title={narrationReady ? 'Dhegayso bogga' : 'Dhegayso bogga — cod la ansixiyey weli lama hayo'}
                onClick={() => setAudioNote(narrationReady ? 'Cod la ansixiyey ayaa la ciyaari lahaa.' : 'Cod la ansixiyey weli lama hayo. Ma isticmaalno TTS Ingiriisi — waa in duubis la ansixiyaa.')}
              >
                <Headphones size={18} />
              </button>
            </figure>
            <div className={`bk-text-panel ${bigText ? 'big' : ''}`}>
              {page.sentencesSo.map((sentence, si) => (
                <p key={si} style={{ margin: '0 0 6px' }}>
                  <span
                    className={`bk-sentence ${hlSentence === si ? 'hl' : ''}`}
                    onClick={() => setHlSentence(si)}
                  >
                    {sentence.split(/(\s+)/).map((tok, ti) => {
                      if (/^\s+$/.test(tok)) return <span key={ti}>{tok}</span>;
                      const clean = tok.replace(PUNCT, '').toLowerCase();
                      const word = wordsBySo.get(clean);
                      return <WordToken key={ti} token={tok} word={word} seen={word ? (bp?.wordsSeen ?? []).includes(word.id) : false} active={picked?.token === tok} onPick={pickWord} />;
                    })}
                  </span>
                </p>
              ))}
              {hlSentence !== null && (
                <button
                  className="bk-btn small secondary"
                  onClick={() => setHlSentence((hlSentence + 1) % page.sentencesSo.length)}
                >
                  Jumlad xigta → ({hlSentence + 1}/{page.sentencesSo.length})
                </button>
              )}
              {audioNote && <p className="bk-translation" role="status">{audioNote}</p>}
              {translation && <p className="bk-translation" lang="en">{page.translationEn}</p>}
            </div>
          </main>
          <nav className="bk-reader-nav" aria-label="Bogagga">
            <button className="bk-btn secondary" disabled={view.n <= 1} onClick={() => go({ kind: 'page', n: (view.n - 1) as 1 | 2 | 3 | 4 | 5 })}><ArrowLeft size={16} /> Hore</button>
            <span className="bk-nav-counter">Bogga {view.n} / 5</span>
            {view.n < 5 ? (
              <button className="bk-btn" onClick={() => go({ kind: 'page', n: (view.n + 1) as 1 | 2 | 3 | 4 | 5 })}>Xiga <ArrowRight size={16} /></button>
            ) : (
              <button className="bk-btn gold" onClick={() => go({ kind: 'quiz' })}><Award size={16} /> Tijaabada</button>
            )}
          </nav>
        </>
      )}

      {view.kind === 'quiz' && (
        <BookQuiz
          book={book}
          progress={progress}
          onProgress={onProgress}
          mastery={mastery}
          onBackToPages={() => go({ kind: 'page', n: 5 })}
          onOpenBooks={onOpenBooks}
        />
      )}

      {picked && (
        <div className="bk-popover" role="dialog" aria-label="Macluumaadka erayga">
          <h4>{picked.token.replace(PUNCT, '')}</h4>
          {picked.word ? (
            <>
              <p className="bk-en">{picked.word.en}</p>
              <div className="bk-graphemes" aria-label="Qaybaha dhawaaqa">
                {tokenize(picked.token.replace(PUNCT, '')).map((g, i) => <span key={i}>{g}</span>)}
              </div>
              {picked.word.noteSo && <p className="bk-note">{picked.word.noteSo}</p>}
            </>
          ) : (
            <>
              <p className="bk-en">Eray aasaasi ah</p>
              <div className="bk-graphemes" aria-label="Qaybaha dhawaaqa">
                {tokenize(picked.token.replace(PUNCT, '')).map((g, i) => <span key={i}>{g}</span>)}
              </div>
              <p className="bk-note">Macnaha eraygan weli lama darin. Waydii macallinkaaga.</p>
            </>
          )}
          <div className="bk-popover-row">
            <button
              className="bk-btn small secondary"
              onClick={() => {
                const a = picked.word ? bookAudioById(`book:${book.id}:word:${picked.word.id}`) : undefined;
                setAudioNote(a && isApproved(a) ? 'Cod la ansixiyey ayaa la ciyaari lahaa.' : 'Cod la ansixiyey weli lama hayo. Ma isticmaalno TTS.');
              }}
            >
              <Headphones size={14} /> Dhagayso
            </button>
            <button className="bk-btn small" onClick={() => setPicked(null)}>Xir</button>
          </div>
        </div>
      )}
    </div>
  );
}
