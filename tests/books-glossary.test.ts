import { describe, expect, it } from 'vitest';
import { books } from '../src/books/index';
import { BOOK_GLOSSARY, cleanToken, glossaryFor } from '../src/books/glossary';

/**
 * The reading glossary must cover every word a learner can tap in a story.
 * When a new book or sentence is added this test fails until the words have
 * an English meaning — no silent "no translation" gaps.
 */
describe('reading glossary', () => {
  const tapped = () => {
    const set = new Map<string, string[]>();
    for (const book of books) {
      const known = new Set(book.words.map(w => w.so.toLowerCase()));
      for (const page of book.pages) {
        for (const sentence of page.sentencesSo) {
          for (const raw of sentence.split(/\s+/)) {
            const token = cleanToken(raw);
            if (!token || known.has(token)) continue;
            set.set(token, [...(set.get(token) ?? []), `${book.id}p${page.order}`]);
          }
        }
      }
    }
    return set;
  };

  it('has an English meaning for every tappable word in all ten books', () => {
    const missing = [...tapped().entries()]
      .filter(([token]) => !BOOK_GLOSSARY[token])
      .map(([token, where]) => `${token} (${[...new Set(where)].join(', ')})`);
    expect(missing, `words without a glossary entry:\n${missing.join('\n')}`).toEqual([]);
  });

  it('never repeats a key and never leaves a meaning blank', () => {
    for (const [key, entry] of Object.entries(BOOK_GLOSSARY)) {
      expect(key, 'keys are lower-case surface forms').toBe(key.toLowerCase());
      expect(entry.en.trim().length, `${key} needs an English meaning`).toBeGreaterThan(1);
      expect(entry.review).toBe('PENDING_REVIEW');
    }
  });

  it('looks a word up regardless of case and punctuation', () => {
    expect(glossaryFor('Marka,')).toBe(BOOK_GLOSSARY.marka);
    expect(glossaryFor('MARKA')).toBe(BOOK_GLOSSARY.marka);
    expect(glossaryFor('“guriga.”')).toBe(BOOK_GLOSSARY.guriga);
    expect(glossaryFor('nonsense')).toBeUndefined();
  });

  it('marks personal names as names, not vocabulary', () => {
    expect(glossaryFor('Ayaanle')?.kind).toBe('name');
    expect(glossaryFor('Hodan')?.kind).toBe('name');
    expect(glossaryFor('Ayaanle')?.en).toContain('boy');
  });
});
