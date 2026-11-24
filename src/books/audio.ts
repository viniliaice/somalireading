/**
 * Book audio manifest — page narrations and word pronunciations for the
 * ten library books. Follows the Stage 1 / school approval workflow:
 * nothing is playable until recorded, reviewed and approved with full
 * speaker, dialect, licence and consent evidence. No TTS, ever.
 */
import type { AudioEntry } from '../audio';
import { allBookPages, allBookWords, books } from './index';

const entry = (id: string, text: string, path: string, kind: AudioEntry['kind'], contentId: string): AudioEntry => ({
  id, contentId, text, path, kind,
  status: 'NOT_RECORDED', reviewStatus: 'NOT_RECORDED', pronunciationStatus: 'NOT_RECORDED',
  speaker: '', dialect: '', license: '', consent: '', recordedAt: '', reviewer: '', reviewedAt: '', reviewEvidence: '',
});

function buildBookAudio(): AudioEntry[] {
  const out: AudioEntry[] = [];
  for (const page of allBookPages()) {
    const book = books.find(b => b.pages.some(p => p.id === page.id))!;
    const slug = book.id.replace('b', 'book-');
    out.push(entry(page.audioId, page.sentencesSo.join(' '), `/audio/books/${slug}/page-0${page.order}.mp3`, 'paragraph', page.id));
    out.push(entry(`${page.audioId}:dialogue`, page.sentencesSo.join(' '), `/audio/books/${slug}/page-0${page.order}-dialogue.mp3`, 'dialogue', page.id));
  }
  for (const w of allBookWords()) {
    const book = books.find(b => b.words.some(x => x.id === w.id))!;
    const slug = book.id.replace('b', 'book-');
    out.push(entry(`book:${book.id}:word:${w.id}`, w.so, `/audio/books/${slug}/words/${w.so}.mp3`, 'word', w.id));
  }
  return out;
}

export const bookAudioManifest: AudioEntry[] = buildBookAudio();
export const bookAudioById = (id: string) => bookAudioManifest.find(a => a.id === id);
