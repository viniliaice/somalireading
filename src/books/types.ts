/**
 * Digital library schema — 10 halftone Somali reading books.
 * Content lives in `src/books/content/`; illustrations live in `public/books/`.
 * All story text is real application text and is never baked into images.
 */
export type ReviewStatus = 'PENDING_REVIEW' | 'CORRECTION_REQUIRED' | 'APPROVED';

/** A vocabulary item taught by a book. `noteSo` is a pronunciation/spelling reference, not a recording. */
export type BookWord = {
  id: string;
  so: string;
  en: string;
  pos?: string;
  noteSo?: string;
  review: ReviewStatus;
};

export type BookPage = {
  id: string;
  order: 1 | 2 | 3 | 4 | 5;
  /** Sentence list — drives sentence-by-sentence highlighting. Joined text is the reading text. */
  sentencesSo: string[];
  translationEn: string;
  /** Word ids from the book's word list used on this page. */
  wordIds: string[];
  image: string;
  imageAltSo: string;
  /** Narration entry id (`book:<id>:page:<n>`) — playable only when approved. */
  audioId: string;
  review: ReviewStatus;
};

export type BookQuestionKind = 'vocab' | 'comprehension' | 'main-idea' | 'output';

export type BookQuestion = {
  id: string;
  kind: BookQuestionKind;
  promptSo: string;
  promptEn: string;
  /** Multiple-choice options (all objective questions). */
  options?: string[];
  answer?: string;
  /** For vocab questions: the book word being checked. */
  wordSo?: string;
  /** For the output task: learner guidance. */
  taskSo?: string;
  review: ReviewStatus;
};

export type StoryBook = {
  id: string;
  order: number;
  titleSo: string;
  titleEn: string;
  /** 1 (absolute beginner) … 10 (early intermediate). */
  level: number;
  levelLabelSo: string;
  themeSo: string;
  descriptionSo: string;
  descriptionEn: string;
  cover: string;
  coverAltSo: string;
  /** Exactly five story pages. */
  pages: BookPage[];
  words: BookWord[];
  /** 5 vocab + 3 comprehension + 1 main-idea + 1 output. */
  questions: BookQuestion[];
  review: ReviewStatus;
};

export const BOOK_PAGE_COUNT = 5;
export const BOOK_QUESTION_COUNT = { vocab: 5, comprehension: 3, mainIdea: 1, output: 1, total: 10 } as const;

export function word(w: Omit<BookWord, 'review'> & { review?: ReviewStatus }): BookWord {
  return { review: 'PENDING_REVIEW', ...w };
}

export function page(p: Omit<BookPage, 'review'> & { review?: ReviewStatus }): BookPage {
  return { review: 'PENDING_REVIEW', ...p };
}

export function question(q: Omit<BookQuestion, 'review'> & { review?: ReviewStatus }): BookQuestion {
  return { review: 'PENDING_REVIEW', ...q };
}

export function book(b: Omit<StoryBook, 'review'> & { review?: ReviewStatus }): StoryBook {
  return { review: 'PENDING_REVIEW', ...b };
}

/** Sentence helper: keep authoring readable. */
export const s = (...sentences: string[]): string[] => sentences;
