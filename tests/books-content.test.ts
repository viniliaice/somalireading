/**
 * Library content integrity — the ten halftone books.
 * Enforces the delivery contract: 10 books, exactly 5 story pages each,
 * 50 pages, 10 covers, real Somali text, per-book assessments, progressive
 * difficulty and honest review/audio statuses.
 */
import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { books, allBookPages, allBookWords, libraryTotals, objectiveQuestions, outputQuestion } from '../src/books/index';
import { BOOK_PAGE_COUNT, type StoryBook } from '../src/books/types';
import { bookAudioManifest } from '../src/books/audio';

const PUBLIC = join(process.cwd(), 'public');

/** Vocabulary required by the brief for each book (book order 1..10). */
const REQUIRED_WORDS: Record<number, string[]> = {
  1: ['salaan', 'saaxiib', 'magac', 'fiican', 'haa', 'maya', 'mahadsanid'],
  2: ['hooyo', 'aabbe', 'walaal', 'awoowe', 'ayeeyo', 'qoys', 'ilmo'],
  3: ['guri', 'qol', 'albaab', 'daaqad', 'sariir', 'miis', 'kursi'],
  4: ['dugsi', 'macallin', 'arday', 'buug', 'qalin', 'fasal', 'waxbarasho'],
  5: ['suuq', 'lacag', 'qiime', 'moos', 'tufaax', 'khudaar', 'caano'],
  6: ['geel', 'ari', 'ido', 'libaax', 'geri', 'faras', 'yaxaas'],
  7: ['roob', 'daruur', 'qorrax', 'dabayl', 'cimilo', 'biyo', 'dhul'],
  8: ['magaalo', 'waddo', 'maktabad', 'isbitaal', 'masaajid', 'dukaan', 'xaafad'],
  9: ['safar', 'xusuus', 'farxad', 'booqasho', 'qoys', 'dhacdo', 'sheeko'],
  10: ['nabad', 'wadajir', 'midnimo', 'ixtiraam', 'caawimo', 'caddaalad', 'jacayl'],
};

describe('library structure', () => {
  it('has exactly 10 books with exactly 5 story pages each = 50 pages + 10 covers', () => {
    expect(books).toHaveLength(10);
    expect(books.map(b => b.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    for (const b of books) {
      expect(b.pages, `${b.id} pages`).toHaveLength(BOOK_PAGE_COUNT);
      expect(b.pages.map(p => p.order)).toEqual([1, 2, 3, 4, 5]);
    }
    const totals = libraryTotals();
    expect(totals.pages).toBe(50);
    expect(totals.covers).toBe(10);
    expect(totals.illustrations).toBe(60);
  });

  it('uses unique ids for books, pages, words and questions', () => {
    const ids = [...books.map(b => b.id), ...allBookPages().map(p => p.id), ...allBookWords().map(w => w.id), ...books.flatMap(b => b.questions.map(q => q.id))];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every page carries real Somali text, translation, alt text and a narration reference', () => {
    for (const p of allBookPages()) {
      expect(p.sentencesSo.length, p.id).toBeGreaterThan(0);
      const text = p.sentencesSo.join(' ');
      expect(text.length, p.id).toBeGreaterThan(15);
      expect(text).toMatch(/Somali|[a-z]/i);
      // no placeholders or lorem text
      expect(text.toLowerCase()).not.toMatch(/lorem|ipsum|tbd|todo|placeholder/);
      expect(p.translationEn.length, p.id).toBeGreaterThan(10);
      expect(p.imageAltSo.length, p.id).toBeGreaterThan(10);
      expect(p.audioId).toMatch(/^book:b\d\d:page:[1-5]$/);
      expect(p.wordIds.every(id => allBookWords().some(w => w.id === id)), p.id).toBe(true);
    }
  });

  it('each book teaches the vocabulary named in its brief', () => {
    for (const b of books) {
      const sos = b.words.map(w => w.so);
      for (const required of REQUIRED_WORDS[b.order]) {
        expect(sos, `${b.id} missing ${required}`).toContain(required);
      }
    }
  });

  it('pages use their book vocabulary', () => {
    for (const b of books) {
      const used = new Set(b.pages.flatMap(p => p.wordIds));
      // at least half the book's words must appear on some page
      expect(used.size, b.id).toBeGreaterThanOrEqual(Math.ceil(b.words.length / 2));
    }
  });
});

describe('per-book assessments', () => {
  it('each book has 5 vocab + 3 comprehension + 1 main-idea + 1 output question', () => {
    for (const b of books) {
      expect(b.questions, b.id).toHaveLength(10);
      expect(b.questions.filter(q => q.kind === 'vocab').length, b.id).toBe(5);
      expect(b.questions.filter(q => q.kind === 'comprehension').length, b.id).toBe(3);
      expect(b.questions.filter(q => q.kind === 'main-idea').length, b.id).toBe(1);
      expect(b.questions.filter(q => q.kind === 'output').length, b.id).toBe(1);
    }
  });

  it('objective questions are answerable and specific to the book', () => {
    const prompts = new Set<string>();
    for (const b of books) {
      for (const q of objectiveQuestions(b)) {
        expect(q.options ?? [], q.id).toHaveLength(3);
        expect(q.options ?? [], q.id).toContain(q.answer);
        expect(q.promptSo.length, q.id).toBeGreaterThan(5);
        prompts.add(q.promptSo);
      }
      const out = outputQuestion(b)!;
      expect(out.taskSo ?? '', out.id).toBeTruthy();
    }
    // no generic shared quiz: prompt set is far larger than 10
    expect(prompts.size).toBeGreaterThanOrEqual(80);
  });
});

describe('reading progression', () => {
  it('sentence length and text volume grow from beginner to independent reader', () => {
    const volume = (b: StoryBook) => b.pages.reduce((n, p) => n + p.sentencesSo.join(' ').split(/\s+/).length, 0);
    const v1 = volume(books[0]);
    const v5 = volume(books[4]);
    const v10 = volume(books[9]);
    expect(v1).toBeLessThan(v5);
    expect(v5).toBeLessThan(v10);
    expect(books.map(b => b.level)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('earlier books use short sentences, later books use connected paragraphs', () => {
    const maxSent = (b: StoryBook) => Math.max(...b.pages.map(p => p.sentencesSo.length));
    const maxWords = (b: StoryBook) => Math.max(...b.pages.map(p => p.sentencesSo.join(' ').split(/\s+/).length));
    expect(maxSent(books[0])).toBeLessThanOrEqual(4);
    expect(maxWords(books[0])).toBeLessThanOrEqual(18);
    expect(maxWords(books[9])).toBeGreaterThan(30);
  });
});

describe('review and audio honesty', () => {
  it('all story content is PENDING_REVIEW — no invented teacher approval', () => {
    for (const b of books) {
      expect(b.review).toBe('PENDING_REVIEW');
      for (const p of b.pages) expect(p.review).toBe('PENDING_REVIEW');
      for (const w of b.words) expect(w.review).toBe('PENDING_REVIEW');
      for (const q of b.questions) expect(q.review).toBe('PENDING_REVIEW');
    }
  });

  it('book audio is NOT_RECORDED with the full metadata columns present', () => {
    expect(bookAudioManifest.length).toBe(50 * 2 + books.reduce((n, b) => n + b.words.length, 0));
    for (const a of bookAudioManifest) {
      expect(a.status).toBe('NOT_RECORDED');
      expect(a.reviewStatus).toBe('NOT_RECORDED');
      expect(a.dialect).toBe(''); // filled by the recording workflow, never invented
      expect(a.consent).toBe('');
    }
    // page narration ids referenced by pages all exist in the manifest
    for (const p of allBookPages()) {
      expect(bookAudioManifest.some(a => a.id === p.audioId), p.audioId).toBe(true);
    }
  });
});

describe('illustration assets', () => {
  it('every referenced cover and page illustration exists on disk', () => {
    const missing: string[] = [];
    for (const b of books) {
      for (const rel of [b.cover, ...b.pages.map(p => p.image)]) {
        const abs = join(PUBLIC, rel.replace(/^\//, ''));
        if (!existsSync(abs) || statSync(abs).size < 1000) missing.push(rel);
      }
    }
    expect(missing, `Missing illustration assets (halftone generation pending): ${missing.join(', ')}`).toEqual([]);
  });
});
