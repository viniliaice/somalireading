/**
 * Book progress — mastery needs comprehension, not page turns.
 */
import { describe, expect, it, vi, afterEach } from 'vitest';
import { books, objectiveQuestions } from '../src/books/index';
import {
  BOOKS_PROGRESS_KEY, BOOK_MASTERY_THRESHOLD, bookMastery, emptyBooksProgress, getBookProgress,
  loadBooksProgress, markOutputDone, markPageRead, markWordsSeen, progressReport, recordQuizAttempt,
  saveBooksProgress, setBookmark,
} from '../src/books/progress';

afterEach(() => vi.unstubAllGlobals());

const allCorrect = (b: typeof books[number]) => Object.fromEntries(objectiveQuestions(b).map(q => [q.id, q.answer!]));

describe('mastery rules', () => {
  it('turning all five pages alone never masters a book', () => {
    let p = emptyBooksProgress();
    for (let n = 1; n <= 5; n++) p = markPageRead(p, books[0].id, n);
    p = markOutputDone(p, books[0].id, 'Jawaab');
    const r = bookMastery(p, books[0]);
    expect(r.pagesRead).toBe(5);
    expect(r.mastered).toBe(false);
    expect(r.reasonSo).toContain('Mar kale isku day');
  });

  it('a perfect comprehension attempt plus pages and output masters the book', () => {
    let p = emptyBooksProgress();
    for (let n = 1; n <= 5; n++) p = markPageRead(p, books[0].id, n);
    const { progress: p2 } = recordQuizAttempt(p, books[0], allCorrect(books[0]));
    p = markOutputDone(p2, books[0].id, 'Magacaygu waa Ayaanle.');
    const r = bookMastery(p, books[0]);
    expect(r.objectiveScore).toBe(1);
    expect(r.mastered).toBe(true);
    expect(getBookProgress(p, books[0].id).mastered).toBe(true);
  });

  it('keeps the best score across retries', () => {
    let p = emptyBooksProgress();
    const bad = Object.fromEntries(objectiveQuestions(books[0]).map((q, i) => [q.id, i < 3 ? q.answer! : q.options!.find(o => o !== q.answer)!]));
    ({ progress: p } = recordQuizAttempt(p, books[0], bad));
    expect(bookMastery(p, books[0]).objectiveScore).toBeLessThan(BOOK_MASTERY_THRESHOLD);
    ({ progress: p } = recordQuizAttempt(p, books[0], allCorrect(books[0])));
    expect(bookMastery(p, books[0]).objectiveScore).toBe(1);
    expect(getBookProgress(p, books[0].id).attempts.length).toBe(2);
  });

  it('the 80% target is configurable and enforced', () => {
    let p = emptyBooksProgress();
    const half = Object.fromEntries(objectiveQuestions(books[1]).map((q, i) => [q.id, i % 2 === 0 ? q.answer! : q.options!.find(o => o !== q.answer)!]));
    ({ progress: p } = recordQuizAttempt(p, books[1], half));
    for (let n = 1; n <= 5; n++) p = markPageRead(p, books[1].id, n);
    p = markOutputDone(p, books[1].id);
    expect(bookMastery(p, books[1], 0.4).mastered).toBe(true);
    expect(bookMastery(p, books[1], 0.9).mastered).toBe(false);
    expect(BOOK_MASTERY_THRESHOLD).toBe(0.8);
  });

  it('the output activity is part of finishing the book', () => {
    let p = emptyBooksProgress();
    for (let n = 1; n <= 5; n++) p = markPageRead(p, books[2].id, n);
    ({ progress: p } = recordQuizAttempt(p, books[2], allCorrect(books[2])));
    expect(bookMastery(p, books[2]).reasonSo).toContain('hawl-qoraalka');
    p = markOutputDone(p, books[2].id, 'Qoraal');
    expect(bookMastery(p, books[2]).mastered).toBe(true);
  });
});

describe('progress tracking', () => {
  it('records pages, bookmark and words seen', () => {
    let p = emptyBooksProgress();
    p = markPageRead(p, 'b01', 2);
    p = markPageRead(p, 'b01', 2);
    p = setBookmark(p, 'b01', 4);
    p = markWordsSeen(p, 'b01', ['b01-salaan', 'b01-haa']);
    p = markWordsSeen(p, 'b01', ['b01-haa']);
    const b = getBookProgress(p, 'b01');
    expect(b.pagesRead).toEqual([2]);
    expect(b.bookmark).toBe(4);
    expect(b.wordsSeen).toEqual(['b01-salaan', 'b01-haa']);
  });

  it('persists under baro-books-v1 without touching other keys', () => {
    const store: Record<string, string> = { 'baro-progress-v2': '{"lessons":{}}', 'baro-school-v1': '{"lessons":{}}' };
    vi.stubGlobal('localStorage', { getItem: (k: string) => store[k] ?? null, setItem: (k: string, v: string) => { store[k] = v; } });
    const p = markPageRead(emptyBooksProgress(), 'b01', 1);
    saveBooksProgress(p);
    expect(store[BOOKS_PROGRESS_KEY]).toBeTruthy();
    expect(store['baro-progress-v2']).toBe('{"lessons":{}}');
    expect(loadBooksProgress().books.b01.pagesRead).toEqual([1]);
  });

  it('recovers from corrupted storage', () => {
    vi.stubGlobal('localStorage', { getItem: () => '{bad', setItem: () => {} });
    expect(loadBooksProgress().books).toEqual({});
    vi.stubGlobal('localStorage', { getItem: () => null, setItem: () => {} });
    expect(loadBooksProgress().version).toBe(1);
  });

  it('produces an honest progress report', () => {
    const text = progressReport(emptyBooksProgress(), books);
    expect(text).toContain('WARBIXINTA AKHRISKA');
    for (const b of books) expect(text).toContain(b.titleSo);
    expect(text).toContain('macallin');
  });
});
