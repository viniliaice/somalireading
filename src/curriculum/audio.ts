/**
 * Extended school audio manifest — words, phrases, dialogues and passages.
 *
 * This reuses the approval workflow of `src/audio.ts` (NOT_RECORDED →
 * RECORDED → AWAITING_REVIEW → APPROVED, with speaker/licence/consent/dialect
 * evidence). Playback is blocked until an entry passes `isApproved`.
 * No text-to-speech or English voices are ever substituted for Somali.
 */
import type { AudioEntry } from '../audio';
import { allDialogues, allLessons, allPassages, allVocabulary } from './index';

/** Changes to this audit map must be backed by real recordings and evidence. */
export const schoolRecordingAudit: Record<string, Partial<AudioEntry>> = {};

const entry = (id: string, text: string, path: string, kind: AudioEntry['kind'], contentId: string): AudioEntry => ({
  id, contentId, text, path, kind,
  status: 'NOT_RECORDED', reviewStatus: 'NOT_RECORDED', pronunciationStatus: 'NOT_RECORDED',
  speaker: '', dialect: '', license: '', consent: '', recordedAt: '', reviewer: '', reviewedAt: '', reviewEvidence: '',
  ...schoolRecordingAudit[id],
});

function buildManifest(): AudioEntry[] {
  const out: AudioEntry[] = [];
  for (const v of allVocabulary()) {
    out.push(entry(`word:${v.id}`, v.so, `/audio/school/words/${v.id}.mp3`, 'word', v.id));
  }
  for (const d of allDialogues()) {
    out.push(entry(`dialogue:${d.id}`, d.titleSo, `/audio/school/dialogues/${d.id}.mp3`, 'dialogue' as AudioEntry['kind'], d.id));
    d.lines.forEach((line, i) => {
      out.push(entry(`line:${d.id}:${i}`, line.so, `/audio/school/dialogues/${d.id}-l${i}.mp3`, 'phrase' as AudioEntry['kind'], d.id));
    });
  }
  for (const p of allPassages()) {
    out.push(entry(`passage:${p.id}`, p.titleSo, `/audio/school/passages/${p.id}.mp3`, 'paragraph' as AudioEntry['kind'], p.id));
  }
  for (const lesson of allLessons()) {
    for (const t of lesson.speaking) {
      if (t.phraseSo && !out.some(a => a.id === `phrase:${t.id}`)) {
        out.push(entry(`phrase:${t.id}`, t.phraseSo, `/audio/school/phrases/${t.id}.mp3`, 'phrase' as AudioEntry['kind'], t.id));
      }
    }
  }
  return out;
}

export const schoolAudioManifest: AudioEntry[] = buildManifest();

export const schoolAudioById = (id: string) => schoolAudioManifest.find(a => a.id === id);

/** Combined lookup: school manifest first, then the preserved Stage 1 manifest. */
export function findAudio(id: string): AudioEntry | undefined {
  return schoolAudioById(id);
}
