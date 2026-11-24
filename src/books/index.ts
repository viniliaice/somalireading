/**
 * Library registry — the ten halftone reading books in order.
 */
import type { StoryBook } from './types';
import { book01 } from './content/book-01';
import { book02 } from './content/book-02';
import { book03 } from './content/book-03';
import { book04 } from './content/book-04';
import { book05 } from './content/book-05';
import { book06 } from './content/book-06';
import { book07 } from './content/book-07';
import { book08 } from './content/book-08';
import { book09 } from './content/book-09';
import { book10 } from './content/book-10';

export const books: StoryBook[] = [book01, book02, book03, book04, book05, book06, book07, book08, book09, book10].sort((a, b) => a.order - b.order);

export const bookById = (id: string) => books.find(b => b.id === id);
export const bookByOrder = (n: number) => books.find(b => b.order === n);

export function allBookPages() {
  return books.flatMap(b => b.pages);
}

export function allBookWords() {
  return books.flatMap(b => b.words);
}

export function libraryTotals() {
  return {
    books: books.length,
    pages: allBookPages().length,
    words: allBookWords().length,
    covers: books.length,
    illustrations: allBookPages().length + books.length,
    questions: books.reduce((n, b) => n + b.questions.length, 0),
    wordsTotal: books.reduce((n, b) => n + b.words.length, 0),
  };
}

/** Objective questions per book (vocab + comprehension + main-idea). */
export const objectiveQuestions = (b: StoryBook) => b.questions.filter(q => q.kind !== 'output');
export const outputQuestion = (b: StoryBook) => b.questions.find(q => q.kind === 'output');
