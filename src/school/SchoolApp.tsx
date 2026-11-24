/**
 * School shell — home, pathways, diagnostic, stages, lessons and dashboard.
 * Hash routing: the preserved Stage 1 phonics experience lives at `#/xaraf`.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowRight, Award, BookOpen, Feather, GraduationCap, Home, Menu, Sparkles, X } from 'lucide-react';
import { schoolTotals, stages, lessonById } from '../curriculum/index';
import { pathways, diagnosticItems, scoreDiagnostic } from '../curriculum/pathways';
import {
  addTimeSpent, awardCertificate, emptySchoolProgress, loadSchoolProgress, recordExerciseResult,
  recordSpeakingEvidence, recordVocabularyReview, saveSchoolProgress, SCHOOL_PROGRESS_KEY,
  type SchoolProgress,
} from '../curriculum/progress';
import type { Lesson } from '../curriculum/types';
import { Dashboard } from './Dashboard';
import { LessonView } from './LessonView';
import { StageView } from './StageView';
import { primeActivityCache } from './activities';
import { books as libraryBooks, bookById } from '../books/index';
import type { StoryBook } from '../books/types';
import { loadBooksProgress, saveBooksProgress, type BooksProgress } from '../books/progress';
import { Bookshelf } from '../books/Bookshelf';
import { BookReader } from '../books/BookReader';
import { BookImage } from '../books/BookImage';
import './school.css';
import '../books/books.css';

type Route =
  | { name: 'home' }
  | { name: 'paths' }
  | { name: 'diagnostic' }
  | { name: 'stage'; stageId: string }
  | { name: 'lesson'; lessonId: string }
  | { name: 'dashboard' }
  | { name: 'books' }
  | { name: 'book'; bookId: string };

function parseHash(): Route {
  const h = window.location.hash.replace(/^#\/?/, '');
  const [head, id] = h.split('/');
  if (head === 'stage' && id) return { name: 'stage', stageId: id };
  if (head === 'lesson' && id) return { name: 'lesson', lessonId: id };
  if (head === 'book' && id) return { name: 'book', bookId: id };
  if (head === 'dashboard') return { name: 'dashboard' };
  if (head === 'paths') return { name: 'paths' };
  if (head === 'diagnostic') return { name: 'diagnostic' };
  if (head === 'books') return { name: 'books' };
  return { name: 'home' };
}

export function SchoolApp() {
  const [route, setRoute] = useState<Route>(parseHash);
  const [progress, setProgress] = useState<SchoolProgress>(loadSchoolProgress);
  const [bookProgress, setBookProgress] = useState<BooksProgress>(loadBooksProgress);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const handler = () => setRoute(parseHash());
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);
  useEffect(() => {
    // Persist without setState — saveSchoolProgress stamps a new updatedAt.
    saveSchoolProgress(progress);
  }, [progress]);
  useEffect(() => {
    saveBooksProgress(bookProgress);
  }, [bookProgress]);
  useEffect(() => {
    primeActivityCache(stages.flatMap(st => st.modules.flatMap(m => m.lessons)));
  }, []);

  const navigate = useCallback((r: Route) => {
    const hash = r.name === 'home' ? '#/' : r.name === 'stage' ? `#/stage/${r.stageId}` : r.name === 'lesson' ? `#/lesson/${r.lessonId}` : r.name === 'book' ? `#/book/${r.bookId}` : r.name === 'dashboard' ? '#/dashboard' : `#/${r.name}`;
    if (window.location.hash !== hash) window.location.hash = hash;
    else setRoute(r);
    setNavOpen(false);
    window.scrollTo(0, 0);
  }, []);

  const openLegacy = useCallback((route: string) => {
    window.location.hash = route.startsWith('#') ? route : `#${route}`;
  }, []);

  const update = useCallback((p: SchoolProgress) => setProgress(p), []);
  const lesson = route.name === 'lesson' ? lessonById(route.lessonId) : undefined;
  const stage = route.name === 'stage' ? stages.find(s => s.id === route.stageId) : undefined;
  const totals = useMemo(() => schoolTotals(), []);

  const onGrade = useCallback((exerciseId: string, correct: boolean) => {
    setProgress(p => {
      const lessonId = (route as { lessonId?: string }).lessonId;
      if (!lessonId) return p;
      return recordExerciseResult(p, lessonId, exerciseId, correct);
    });
  }, [route]);

  const onVocab = useCallback((vocabId: string, correct: boolean) => {
    setProgress(p => recordVocabularyReview(p, vocabId, correct));
  }, []);

  const onSpeak = useCallback((taskId: string, kind: 'self-review' | 'recording' | 'educator', note: string) => {
    setProgress(p => {
      const lessonId = (route as { lessonId?: string }).lessonId;
      if (!lessonId) return p;
      return recordSpeakingEvidence(p, lessonId, taskId, kind, note);
    });
  }, [route]);

  const openLesson = useCallback((l: Lesson) => navigate({ name: 'lesson', lessonId: l.id }), [navigate]);
  const activeBook = route.name === 'book' ? bookById(route.bookId) : undefined;

  // The book reader is distraction-free: it renders full-screen without the school chrome.
  if (route.name === 'book' && activeBook) {
    return (
      <BookReader
        book={activeBook}
        progress={bookProgress}
        onBack={() => navigate({ name: 'books' })}
        onProgress={setBookProgress}
        onOpenBooks={() => navigate({ name: 'books' })}
      />
    );
  }

  return (
    <div className="sc-app">
      <div className="sc-shell">
        <aside className={`sc-side ${navOpen ? 'open' : ''}`}>
          <div className="sc-brand">
            <GraduationCap size={26} />
            <span>baro<span style={{ color: '#f28c28' }}>.</span><small>BARO AF-SOOMAALI · DUGSIGA</small></span>
          </div>
          <nav className="sc-nav" aria-label="Liiska bogagga">
            <button className={route.name === 'home' ? 'active' : ''} onClick={() => navigate({ name: 'home' })}><Home size={18} /> Bogga hore</button>
            <button className={route.name === 'paths' || route.name === 'diagnostic' ? 'active' : ''} onClick={() => navigate({ name: 'paths' })}><Sparkles size={18} /> Jidka waxbarashada</button>
            <button className={route.name === 'stage' ? 'active' : ''} onClick={() => navigate({ name: 'home' })}><BookOpen size={18} /> Heerarka <span className="sc-count">7</span></button>
            <button className={route.name === 'dashboard' ? 'active' : ''} onClick={() => navigate({ name: 'dashboard' })}><Award size={18} /> Horumarkayga</button>
            <button className={route.name === 'books' ? 'active' : ''} onClick={() => navigate({ name: 'books' })}><BookOpen size={18} /> Buugaagta <span className="sc-count">10</span></button>
            <button onClick={() => openLegacy('#/xaraf')}><Feather size={18} /> Xarfaha (Heerka 1)</button>
            <button onClick={() => openLegacy('#/xaraf?view=culture')}><Feather size={18} /> Dhaqan iyo Suugaan</button>
          </nav>
          <div style={{ marginTop: 'auto' }} className="sc-note">
            {progress.path ? `Jidkaaga: ${progress.path}` : 'Jid weli lama dooran'}
            <br />Wax yar maalin kasta!
          </div>
        </aside>
        <main className="sc-main">
          <button className="sc-btn secondary small" style={{ display: 'none' }} onClick={() => setNavOpen(!navOpen)} aria-label="Fur liiska">
            {navOpen ? <X size={18} /> : <Menu size={18} />} Liiska
          </button>

          {route.name === 'home' && (
            <HomePage
              progress={progress}
              totals={totals}
              books={libraryBooks}
              onOpenStage={id => navigate({ name: 'stage', stageId: id })}
              onOpenPaths={() => navigate({ name: 'paths' })}
              onOpenDashboard={() => navigate({ name: 'dashboard' })}
              onOpenBooks={() => navigate({ name: 'books' })}
              onOpenBook={id => navigate({ name: 'book', bookId: id })}
              onOpenLegacy={openLegacy}
            />
          )}
          {route.name === 'books' && (
            <Bookshelf
              books={libraryBooks}
              progress={bookProgress}
              onOpenBook={id => navigate({ name: 'book', bookId: id })}
              onOpenSchool={() => navigate({ name: 'home' })}
            />
          )}
          {route.name === 'paths' && (
            <PathsPage progress={progress} onProgress={update} onOpenDiagnostic={() => navigate({ name: 'diagnostic' })} onOpenStage={id => navigate({ name: 'stage', stageId: id })} />
          )}
          {route.name === 'diagnostic' && (
            <DiagnosticPage progress={progress} onProgress={update} onOpenStage={id => navigate({ name: 'stage', stageId: id })} />
          )}
          {route.name === 'stage' && stage && (
            <StageView stage={stage} progress={progress} onBack={() => navigate({ name: 'home' })} onOpenLesson={openLesson} onProgress={update} />
          )}
          {route.name === 'lesson' && lesson && (
            <LessonView
              lesson={lesson}
              onBack={() => navigate({ name: 'stage', stageId: lesson.stageId })}
              onGrade={onGrade}
              onVocab={onVocab}
              onSpeak={onSpeak}
              onLegacyOpen={openLegacy}
            />
          )}
          {route.name === 'dashboard' && (
            <Dashboard progress={progress} onOpenStage={id => navigate({ name: 'stage', stageId: id })} />
          )}
          <footer className="sc-footer-note">
            Baro Af-Soomaali — Dhagaysi, Hadal, Akhris iyo Qoris · wax kasta waa dib-u-eegis macallin u baahan · horumarku wuxuu ku kaydsan yahay biraawsarkan ({SCHOOL_PROGRESS_KEY}).
          </footer>
        </main>
      </div>
    </div>
  );
}

function HomePage({ progress, totals, books, onOpenStage, onOpenPaths, onOpenDashboard, onOpenBooks, onOpenBook, onOpenLegacy }: {
  progress: SchoolProgress;
  totals: ReturnType<typeof schoolTotals>;
  books: StoryBook[];
  onOpenStage: (id: string) => void;
  onOpenPaths: () => void;
  onOpenDashboard: () => void;
  onOpenBooks: () => void;
  onOpenBook: (id: string) => void;
  onOpenLegacy: (hash: string) => void;
}) {
  return (
    <div>
      <p className="sc-eyebrow">KU SOO DHAWOOW · DUGSIGA AF-SOOMAALIGA</p>
      <h1 className="sc-h1">Baro Af-Soomaali</h1>
      <p className="sc-lead">Dhagaysi, Hadal, Akhris iyo Qoris — ka bilow eraygaaga koowaad oo gaadh akhris, wadahadal iyo suugaan. Dugsigaan wuxuu kugu qaadaa todoba heer oo isku xidhan, laga bilaabo eber ilaa suugaanta.</p>
      <div className="sc-grid" style={{ margin: '18px 0' }}>
        <StatCard value={totals.stages} label="Heerarka waxbarasho" />
        <StatCard value={4} label="Xirfadood (afar)" />
        <StatCard value={totals.modules} label="Module muhiim ah" />
        <StatCard value={totals.lessons} label="Casharro wax ku leh" />
      </div>
      <div className="sc-audio-row">
        <button className="sc-btn" onClick={onOpenPaths}>Dooro jidkaaga <ArrowRight size={16} /></button>
        <button className="sc-btn secondary" onClick={onOpenDashboard}>Horumarkayga <Award size={16} /></button>
        <button className="sc-btn" onClick={onOpenBooks}>Maktabadda sheekooyinka <BookOpen size={16} /></button>
        <button className="sc-btn secondary" onClick={() => onOpenLegacy('#/xaraf')}>Fur casharradii xarfaha (Heerka 1)</button>
      </div>
      <p className="sc-note">Horumar degdeg ah: {Object.keys(progress.lessons).length} cashar ayaad taabatay · {Object.keys(progress.vocabulary).length} eray ayaan dib u eegnay · {Object.keys(progress.certificates).length} shahaado.</p>

      <section className="sc-lib" aria-label="Maktabadda sheekooyinka">
        <div className="sc-lib-head">
          <div>
            <p className="sc-eyebrow">MAKTABADDA SHEEKEOOYINKA</p>
            <h2 className="sc-h2" style={{ margin: '2px 0 4px' }}>10 buug oo halftone ah — dooro oo bilow</h2>
            <p className="sc-note">Guji daboolka si aad u gasho buugga, ama fur maktabadda oo dhan.</p>
          </div>
          <button className="sc-btn" onClick={onOpenBooks}>Gal maktabadda <ArrowRight size={16} /></button>
        </div>
        <div className="sc-lib-strip">
          {books.map(b => (
            <button key={b.id} className="sc-lib-item" onClick={() => onOpenBook(b.id)} aria-label={`Fur buugga ${b.titleSo}`}>
              <span className="sc-lib-cover"><BookImage src={b.cover} alt={b.coverAltSo} /></span>
              <span className="sc-lib-title">{b.titleSo}</span>
              <span className="sc-lib-meta">Heer {b.level}</span>
            </button>
          ))}
        </div>
      </section>

      <h2 className="sc-h2">Todobada heer</h2>
      <div className="sc-grid-wide">
        {stages.map(st => (
          <button key={st.id} className="sc-stage-card" onClick={() => onOpenStage(st.id)}>
            <span className="sc-stage-emoji">{st.emoji}</span>
            <strong>Heerka {st.index} — {st.titleSo}</strong>
            <span className="sc-note">{st.levelSo} · {st.modules.length} module</span>
            <span className="sc-note">{st.descriptionSo.slice(0, 90)}…</span>
          </button>
        ))}
      </div>

      <div className="sc-card" style={{ marginTop: 20 }}>
        <p className="sc-eyebrow">TAYADA WAXBARASHADA</p>
        <p className="sc-note">Dhammaan waxyaabaha waxbarasho (erayo, qoraallo, naxwe, maahmaahyo) waa <strong>PENDING_REVIEW</strong> — waxay u baahan yihiin dib-u-eegis macallin Soomaali ah. Codadka waxaa la isticmaalaa marka duubista, oggolaanshaha iyo dib-u-eegista dhawaaqa la dhammeeyo; <strong>ma jiro cod-sameeye Ingiriisi oo lagu beddelo Af-Soomaali</strong>, waana la qiyaasin saxnaanta dhawaaqa biraawsarka.</p>
      </div>
    </div>
  );
}

function StatCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="sc-skill-card">
      <strong style={{ fontSize: 30 }}>{value}+</strong>
      <span className="sc-note">{label}</span>
    </div>
  );
}

function PathsPage({ progress, onProgress, onOpenDiagnostic, onOpenStage }: {
  progress: SchoolProgress;
  onProgress: (p: SchoolProgress) => void;
  onOpenDiagnostic: () => void;
  onOpenStage: (id: string) => void;
}) {
  return (
    <div>
      <p className="sc-eyebrow">JIDKA WAXBARASHADA</p>
      <h1 className="sc-h1">Hal marxalad, saddex bilow</h1>
      <p className="sc-lead">Ilmo guriga ku hadla Af-Soomaali laakiin aan akhrin karin ma bilaabo “hello” bilood. Waxaa jira wado koowaad oo loo qaado akhriska, iyo tijaabo kooban oo muujinaysa meesha aad ka bilaabayso.</p>
      <div className="sc-grid-wide">
        {pathways.map(p => (
          <div key={p.id} className={`sc-stage-card`} style={{ cursor: 'default' }}>
            <span className="sc-pill">{p.titleEn}</span>
            <strong>Jidka {p.id} — {p.titleSo}</strong>
            <span className="sc-note">{p.descriptionSo}</span>
            <div className="sc-audio-row">
              <button className={`sc-btn small ${progress.path === p.id ? '' : 'secondary'}`} onClick={() => onProgress({ ...progress, path: p.id })}>
                {progress.path === p.id ? 'Waa la doortay ✓' : `Dooro jidka ${p.id}`}
              </button>
              <button className="sc-btn ghost small" onClick={() => onOpenStage(p.startStage)}>Ka bilow {p.startStage.replace('stage-', 'heerka ')}</button>
            </div>
          </div>
        ))}
      </div>
      <div className="sc-card">
        <h3 className="sc-h3">Tijaabada bilowga (diagnostic)</h3>
        <p className="sc-note">10 su’aalood oo akhris iyo naxwe ah ayaa ku hagaya heerka saxda ah. {progress.diagnostic ? `Natiijadaada: ${progress.diagnostic.score}/${progress.diagnostic.total} → ${progress.diagnostic.recommendedStage}.` : ''}</p>
        <button className="sc-btn" onClick={onOpenDiagnostic}>Qaad tijaabada <ArrowRight size={15} /></button>
      </div>
    </div>
  );
}

function DiagnosticPage({ progress, onProgress, onOpenStage }: {
  progress: SchoolProgress;
  onProgress: (p: SchoolProgress) => void;
  onOpenStage: (id: string) => void;
}) {
  const [index, setIndex] = useState(0);
  const [correctIds, setCorrectIds] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const item = diagnosticItems[index];
  const result = done ? scoreDiagnostic(correctIds) : null;
  return (
    <div>
      <p className="sc-eyebrow">TIJAABADA BILOWGA</p>
      <h1 className="sc-h1">Xaggee ayaad ka joogtaa?</h1>
      {result ? (
        <div className="sc-card">
          <h3 className="sc-h3">{result.reasonSo}</h3>
          <p className="sc-note">Tijaabadani ma xaddido safarkaaga — heer kasta wuu furan yahay weligiis.</p>
          <button className="sc-btn" onClick={() => onOpenStage(result.recommendedStage)}>Ka bilow heerka <ArrowRight size={15} /></button>
        </div>
      ) : (
        <div className="sc-card">
          <p className="sc-eyebrow">SU’ASHA {index + 1} / {diagnosticItems.length} · {item.areaSo}</p>
          <p style={{ fontSize: 17 }}>{item.promptSo}</p>
          <div className="sc-options">
            {item.options.map(o => (
              <button key={o} className={`sc-chip ${selected === o ? 'selected' : ''}`} onClick={() => setSelected(o)}>{o}</button>
            ))}
          </div>
          <button className="sc-btn" disabled={!selected} onClick={() => {
            const next = selected === item.answer ? [...correctIds, item.id] : correctIds;
            setCorrectIds(next);
            setSelected(null);
            if (index + 1 < diagnosticItems.length) setIndex(index + 1);
            else {
              const r = scoreDiagnostic(next);
              onProgress({ ...progress, diagnostic: { score: r.score, total: r.total, recommendedStage: r.recommendedStage, takenAt: new Date().toISOString() } });
              setDone(true);
            }
          }}>{index + 1 < diagnosticItems.length ? 'Su’aasha xigta' : 'Dhammaystir'} <ArrowRight size={15} /></button>
        </div>
      )}
    </div>
  );
}

export { emptySchoolProgress, awardCertificate, addTimeSpent };
export default SchoolApp;
