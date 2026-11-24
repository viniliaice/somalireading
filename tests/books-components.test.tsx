// @vitest-environment jsdom
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Bookshelf } from '../src/books/Bookshelf';
import { BookReader } from '../src/books/BookReader';
import { BookImage } from '../src/books/BookImage';
import { books, objectiveQuestions } from '../src/books/index';
import { emptyBooksProgress, markPageRead, recordQuizAttempt } from '../src/books/progress';

afterEach(cleanup);

describe('bookshelf', () => {
  it('shows ten book cards with covers, levels and start buttons', () => {
    render(<Bookshelf books={books} progress={emptyBooksProgress()} onOpenBook={() => {}} onOpenSchool={() => {}} />);
    expect(screen.getAllByRole('button', { name: /Bilow akhriska|Sii wad akhriska/ })).toHaveLength(10);
    expect(screen.getByText('Salaan, saaxiib!')).toBeTruthy();
    expect(screen.getByText('Nabad iyo wadajir')).toBeTruthy();
    expect(screen.getByText('Heer 10')).toBeTruthy();
  });

  it('falls back honestly when an illustration is not available', () => {
    render(<BookImage src="/books/does-not-exist.jpg" alt="Sawir tijaabo ah" />);
    fireEvent.error(screen.getByRole('img', { name: 'Sawir tijaabo ah' }));
    expect(screen.getByText('Sawirka weli ma iman')).toBeTruthy();
    expect(screen.getByText('Sawir tijaabo ah')).toBeTruthy();
  });
});

describe('book reader', () => {
  it('renders the story text and lets a child tap a word for its grapheme reference', () => {
    const onProgress = vi.fn();
    render(<BookReader book={books[0]} progress={emptyBooksProgress()} onBack={() => {}} onProgress={onProgress} onOpenBooks={() => {}} />);
    expect(document.body.textContent).toContain('Waa subax cusub.');
    fireEvent.click(screen.getByRole('button', { name: 'Erayga Ayaan' }));
    // popover opens with a phonics-safe pronunciation reference (grapheme tiles, no fake audio)
    expect(screen.getByRole('dialog', { name: 'Macluumaadka erayga' })).toBeTruthy();
    expect(screen.getByText('Eray aasaasi ah')).toBeTruthy();
  });

  it('opens a vocabulary meaning and marks the word as seen', () => {
    const onProgress = vi.fn();
    render(<BookReader book={books[0]} progress={emptyBooksProgress()} onBack={() => {}} onProgress={onProgress} onOpenBooks={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: /Xiga/ })); // page 2 holds the book vocabulary
    fireEvent.click(screen.getByRole('button', { name: 'Erayga salaan' }));
    expect(screen.getByText('greeting')).toBeTruthy();
    expect(onProgress).toHaveBeenCalled();
  });

  it('navigates pages with next/prev and reaches the quiz after page 5', () => {
    const onProgress = vi.fn();
    render(<BookReader book={books[0]} progress={emptyBooksProgress()} onBack={() => {}} onProgress={onProgress} onOpenBooks={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: /Xiga/ }));
    expect(screen.getAllByText(/Bogga 2 \/ 5/).length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole('button', { name: /Hore/ }));
    expect(screen.getAllByText(/Bogga 1 \/ 5/).length).toBeGreaterThan(0);
    for (let i = 0; i < 4; i++) fireEvent.click(screen.getByRole('button', { name: /Xiga/ }));
    fireEvent.click(screen.getByRole('button', { name: /Tijaabada/ }));
    expect(screen.getByText('Sidee buu u ahaa sheekadu?')).toBeTruthy();
  });

  it('reports audio honestly instead of playing fake recordings', () => {
    render(<BookReader book={books[0]} progress={emptyBooksProgress()} onBack={() => {}} onProgress={() => {}} onOpenBooks={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: /Dhegayso bogga/ }));
    expect(screen.getByRole('status').textContent).toContain('weli lama hayo');
    expect(screen.getByRole('status').textContent).toContain('TTS');
  });
});

describe('end-of-book quiz', () => {
  it('grades objectively, saves attempts and allows retries', () => {
    let progress = emptyBooksProgress();
    const onProgress = vi.fn((p: typeof progress) => { progress = p; });
    render(<BookReader book={books[0]} progress={progress} onBack={() => {}} onProgress={onProgress} onOpenBooks={() => {}} />);
    for (let i = 0; i < 4; i++) fireEvent.click(screen.getByRole('button', { name: /Xiga/ }));
    fireEvent.click(screen.getByRole('button', { name: /Tijaabada/ }));
    // answer everything correctly
    for (const q of objectiveQuestions(books[0])) {
      fireEvent.click(screen.getByRole('button', { name: q.answer! }));
    }
    fireEvent.click(screen.getByRole('button', { name: /Dhammaystir tijaabada/ }));
    expect(screen.getByRole('status').textContent).toContain('9 / 9');
    expect(screen.getByRole('button', { name: /Mar kale isku day/ })).toBeTruthy();
  });

  it('requires the output activity before mastery', () => {
    let progress = emptyBooksProgress();
    for (let n = 1; n <= 5; n++) progress = markPageRead(progress, books[0].id, n);
    ({ progress } = recordQuizAttempt(progress, books[0], Object.fromEntries(objectiveQuestions(books[0]).map(q => [q.id, q.answer!]))));
    const onProgress = vi.fn();
    render(<BookReader book={books[0]} progress={progress} onBack={() => {}} onProgress={onProgress} onOpenBooks={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: /Tijaabada/ }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Jawaabta qoraalka' }), { target: { value: 'Magacaygu waa Ayaan.' } });
    fireEvent.click(screen.getByRole('button', { name: /Waan sameeyay/ }));
    expect(onProgress).toHaveBeenCalled();
  });
});
