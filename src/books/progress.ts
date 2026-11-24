/**
 * Book progress — `baro-books-v1`, separate from school and phonics keys.
 * Mastery requires reading every page AND passing the comprehension
 * assessment (configurable target, default 80%) AND completing the output
 * activity. Turning pages alone never masters a book.
 */
import type { StoryBook } from './types';
import { objectiveQuestions, outputQuestion } from './index';

export const BOOKS_PROGRESS_KEY = 'baro-books-v1';
export const BOOK_MASTERY_THRESHOLD = 0.8;
export const BOOK_PAGE_COUNT = 5;

export type QuizAttempt = {
  at: string;
  /** Objective items answered correctly (vocab + comprehension + main-idea). */
  objectiveCorrect: number;
  objectiveTotal: number;
  answers: Record<string, string>;
};

export type BookProgress = {
  pagesRead: number[];
  /** Last page opened (1-based) for resume. */
  bookmark: number;
  wordsSeen: string[];
  attempts: QuizAttempt[];
  bestObjective: number;
  outputDone: boolean;
  outputText: string;
  mastered: boolean;
  masteredAt: string;
};

export type BooksProgress = {
  version: 1;
  books: Record<string, BookProgress>;
};

export function emptyBookProgress(): BookProgress {
  return { pagesRead: [], bookmark: 1, wordsSeen: [], attempts: [], bestObjective: 0, outputDone: false, outputText: '', mastered: false, masteredAt: '' };
}

export function emptyBooksProgress(): BooksProgress {
  return { version: 1, books: {} };
}

export function getBookProgress(p: BooksProgress, bookId: string): BookProgress {
  return p.books[bookId] ?? emptyBookProgress();
}

const withBook = (p: BooksProgress, bookId: string, next: BookProgress): BooksProgress => ({
  ...p,
  books: { ...p.books, [bookId]: next },
});

export function markPageRead(p: BooksProgress, bookId: string, page: number): BooksProgress {
  const b = getBookProgress(p, bookId);
  const pagesRead = b.pagesRead.includes(page) ? b.pagesRead : [...b.pagesRead, page].sort((x, y) => x - y);
  return withBook(p, bookId, { ...b, pagesRead, bookmark: page });
}

export function setBookmark(p: BooksProgress, bookId: string, page: number): BooksProgress {
  const b = getBookProgress(p, bookId);
  return withBook(p, bookId, { ...b, bookmark: Math.min(Math.max(page, 1), BOOK_PAGE_COUNT) });
}

export function markWordsSeen(p: BooksProgress, bookId: string, wordIds: string[]): BooksProgress {
  const b = getBookProgress(p, bookId);
  const wordsSeen = Array.from(new Set([...b.wordsSeen, ...wordIds]));
  return withBook(p, bookId, { ...b, wordsSeen });
}

export function recordQuizAttempt(p: BooksProgress, book: StoryBook, answers: Record<string, string>): { progress: BooksProgress; attempt: QuizAttempt } {
  const objective = objectiveQuestions(book);
  const objectiveCorrect = objective.filter(q => answers[q.id] === q.answer).length;
  const attempt: QuizAttempt = { at: new Date().toISOString(), objectiveCorrect, objectiveTotal: objective.length, answers };
  const b = getBookProgress(p, book.id);
  const attempts = [...b.attempts, attempt];
  const next = { ...b, attempts, bestObjective: Math.max(b.bestObjective, objectiveTotalScore(attempt)) };
  return { progress: applyMastery(withBook(p, book.id, next), book), attempt };
}

export function markOutputDone(p: BooksProgress, bookId: string, outputText = ''): BooksProgress {
  const b = getBookProgress(p, bookId);
  return applyMastery(withBook(p, bookId, { ...b, outputDone: true, outputText: outputText || b.outputText }), undefined, bookId);
}

function objectiveTotalScore(a: QuizAttempt): number {
  return a.objectiveTotal ? a.objectiveCorrect / a.objectiveTotal : 0;
}

export type BookMasteryReport = {
  pagesRead: number;
  pagesTotal: number;
  objectiveScore: number;
  objectiveTarget: number;
  outputDone: boolean;
  mastered: boolean;
  reasonSo: string;
};

export function bookMastery(p: BooksProgress, book: StoryBook, threshold = BOOK_MASTERY_THRESHOLD): BookMasteryReport {
  const b = getBookProgress(p, book.id);
  const pagesRead = b.pagesRead.length;
  const objectiveScore = b.bestObjective;
  const mastered = pagesRead >= BOOK_PAGE_COUNT && objectiveScore >= threshold && b.outputDone;
  const reasonSo = mastered
    ? 'Waad dhammaysay buuggan!'
    : pagesRead < BOOK_PAGE_COUNT
      ? `Akhri dhammaan bogagga (${pagesRead}/${BOOK_PAGE_COUNT}).`
      : objectiveScore < threshold
        ? `Natiijadu waa ${Math.round(objectiveScore * 100)}% — u baahan ${Math.round(threshold * 100)}%. Mar kale isku day.`
        : 'Samee hawl-qoraalka ama hadalka si aad u dhammaystirto.';
  return { pagesRead, pagesTotal: BOOK_PAGE_COUNT, objectiveScore, objectiveTarget: threshold, outputDone: b.outputDone, mastered, reasonSo };
}

function applyMastery(p: BooksProgress, book?: StoryBook, bookId?: string): BooksProgress {
  const id = book?.id ?? bookId;
  if (!id) return p;
  const b = getBookProgress(p, id);
  const pagesOk = b.pagesRead.length >= BOOK_PAGE_COUNT;
  const scoreOk = b.bestObjective >= BOOK_MASTERY_THRESHOLD;
  const outputOk = b.outputDone;
  if (pagesOk && scoreOk && outputOk && !b.mastered) {
    return withBook(p, id, { ...b, mastered: true, masteredAt: new Date().toISOString() });
  }
  return p;
}

export function loadBooksProgress(): BooksProgress {
  try {
    const saved = localStorage.getItem(BOOKS_PROGRESS_KEY);
    if (saved) {
      const p = JSON.parse(saved);
      if (p && p.books && typeof p.books === 'object') return p;
    }
  } catch { /* corrupted or unavailable storage */ }
  return emptyBooksProgress();
}

export function saveBooksProgress(p: BooksProgress): BooksProgress {
  try {
    localStorage.setItem(BOOKS_PROGRESS_KEY, JSON.stringify(p));
  } catch { /* storage may be unavailable */ }
  return p;
}

export function progressReport(p: BooksProgress, booksList: StoryBook[]): string {
  const lines: string[] = [];
  lines.push('WARBIXINTA AKHRISKA — MAKTABADDA BUUGAAGTA');
  lines.push(`Taariikhda: ${new Date().toISOString().slice(0, 10)}`);
  lines.push('');
  for (const book of booksList) {
    const r = bookMastery(p, book);
    const b = getBookProgress(p, book.id);
    lines.push(`${book.order}. ${book.titleSo} (heer ${book.level}): bogag ${r.pagesRead}/${r.pagesTotal} · ugu fiican ${Math.round(r.objectiveScore * 100)}% · hawl: ${b.outputDone ? 'la dhammeeyay' : 'lama dhammayn'} · ${r.mastered ? 'SHAHAADEYSAN' : 'socda'}`);
    if (b.wordsSeen.length) lines.push(`   Erayo la arkay: ${b.wordsSeen.length}`);
  }
  lines.push('');
  lines.push('Ogeysiis: qiimaynta waa in ay sameeyaan dad af-Soomaali ku hadla ama macallin; cod ma isticmaalno aqoonsi cod-sameeye.');
  return lines.join('\n');
}

export { outputQuestion };
