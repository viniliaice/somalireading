/**
 * Teacher-review export for the school curriculum (stages 0-6).
 * Writes CSV sheets a Somali teacher can correct and sign off.
 * Nothing here claims review or approval — every row starts PENDING_REVIEW.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { stages, allLessons, allVocabulary, allDialogues, allPassages } from '../src/curriculum/index';
import { schoolAudioManifest } from '../src/curriculum/audio';
import { isApproved } from '../src/audio';

const csv = (rows: unknown[][]) => rows.map(row => row.map(x => '"' + String(x ?? '').replaceAll('"', '""') + '"').join(',')).join('\n') + '\n';

const header = ['ID', 'Stage', 'Module', 'Lesson', 'Type', 'Skill', 'Somali', 'English', 'Extra', 'Original content', 'Suggested correction', 'Reviewer comments', 'Status', 'Reviewer', 'Review date', 'Evidence'];
const rows: unknown[][] = [];

for (const stage of stages) {
  for (const mod of stage.modules) {
    for (const lesson of mod.lessons) {
      lesson.objectivesSo.forEach((o, i) => rows.push([`obj:${lesson.id}:${i}`, stage.titleSo, mod.titleSo, lesson.titleSo, 'objective', lesson.skills[0] ?? '', o, lesson.objectivesEn?.[i] ?? '', '', '', '', '', 'PENDING_REVIEW', '', '', '']));
      lesson.vocab.forEach(v => rows.push([`vocab:${v.id}`, stage.titleSo, mod.titleSo, lesson.titleSo, 'vocabulary', 'akhris', v.so, v.en, `${v.emoji ?? ''} ${v.exampleSo ?? ''} (${v.exampleEn ?? ''})`, '', '', '', 'PENDING_REVIEW', '', '', '']));
      lesson.dialogues.forEach((d, i) => d.lines.forEach((line, j) => rows.push([`dialogue:${d.id}:${j}`, stage.titleSo, mod.titleSo, lesson.titleSo, `dialogue:${i + 1}`, 'dhagaysi', `${line.speaker}: ${line.so}`, line.en, d.contextSo, '', '', '', 'PENDING_REVIEW', '', '', ''])));
      lesson.passages.forEach((p, i) => {
        p.so.split(/\n\n+/).forEach((para, j) => rows.push([`passage:${p.id}:${j}`, stage.titleSo, mod.titleSo, lesson.titleSo, `reading:${i + 1}`, 'akhris', para, p.en?.split(/\n\n+/)[j] ?? '', `level ${p.level}`, '', '', '', 'PENDING_REVIEW', '', '', '']));
        p.questions.forEach(q => rows.push([`question:${q.id}`, stage.titleSo, mod.titleSo, lesson.titleSo, `reading-q:${q.kind}`, 'akhris', q.promptSo, q.promptEn ?? '', `answer: ${q.answer}`, '', '', '', 'PENDING_REVIEW', '', '', '']));
      });
      lesson.grammar.forEach((g, i) => rows.push([`grammar:${g.id ?? `${lesson.id}:${i}`}`, stage.titleSo, mod.titleSo, lesson.titleSo, 'grammar', 'akhris', g.explanationSo, g.explanationEn, g.examples.map(e => `${e.so} (${e.en})`).join(' · '), '', '', '', 'PENDING_REVIEW', '', '', '']));
      lesson.exercises.forEach(e => rows.push([`exercise:${e.id}`, stage.titleSo, mod.titleSo, lesson.titleSo, `exercise:${e.type}`, e.skill, e.promptSo, e.promptEn ?? '', JSON.stringify({ answer: e.answer ?? '', options: e.options ?? '', tokens: e.tokens ?? '', pairs: e.pairs ?? '', vocabIds: e.vocabIds ?? '', sentenceSo: e.sentenceSo ?? '', word: e.word ?? '', hintSo: e.hintSo ?? '' }), '', '', '', 'PENDING_REVIEW', '', '', '']));
      lesson.speaking.forEach(s => rows.push([`speaking:${s.id}`, stage.titleSo, mod.titleSo, lesson.titleSo, `speaking:${s.type}`, 'hadal', s.promptSo, s.promptEn, `hints: ${(s.hintsSo ?? []).join(' | ')} · rubric: ${(s.rubricFocus ?? []).join(' | ')}`, '', '', '', 'PENDING_REVIEW', '', '', '']));
    }
  }
  stage.assessment.items.forEach(i => rows.push([`assessment:${i.id}`, stage.titleSo, 'Assessment', '', `assessment:${i.type}`, i.skill, i.promptSo, i.promptEn ?? '', (i.options ?? []).join(' | '), '', '', '', 'PENDING_REVIEW', '', '', '']));
}

// The audio manifest is the recording + consent script. Nothing is recorded yet.
const audioHeader = ['Audio ID', 'Kind', 'Content ID', 'Somali text', 'Expected file path', 'Recording status', 'Review status', 'Pronunciation status', 'Speaker', 'Dialect', 'License', 'Consent reference', 'Recorded date', 'Reviewer', 'Review date', 'Review evidence'];
const audioRows = schoolAudioManifest.map(a => [a.id, a.kind, a.contentId, a.text, a.path, a.status, a.reviewStatus, a.pronunciationStatus, a.speaker, a.dialect, a.license, a.consent, a.recordedAt, a.reviewer, a.reviewedAt, a.reviewEvidence]);

// Audit before writing: nothing may claim recording or approval without evidence.
// Unrecorded entries keep their metadata columns empty for the teacher to fill.
const countsByStatus: [string, number][] = Object.entries(
  schoolAudioManifest.reduce<Record<string, number>>((acc, a) => ({ ...acc, [a.status]: (acc[a.status] ?? 0) + 1 }), {}),
);
for (const a of schoolAudioManifest) {
  if (a.status === 'APPROVED' && !isApproved(a)) throw new Error(`${a.id} claims approval without full evidence`);
  if (a.status !== 'NOT_RECORDED' && !a.recordedAt) throw new Error(`${a.id} claims ${a.status} without recorded evidence`);
  if (a.reviewStatus === 'APPROVED' && !a.reviewEvidence) throw new Error(`${a.id} claims review approval without evidence`);
}

mkdirSync('teacher-review', { recursive: true });
writeFileSync('teacher-review/school-curriculum-review.csv', csv([header, ...rows]));
writeFileSync('teacher-review/school-audio-recording-script.csv', csv([audioHeader, ...audioRows]));

console.log(`Stages: ${stages.length}, lessons: ${allLessons().length}, vocab: ${allVocabulary().length}, dialogue lines: ${allDialogues().reduce((n, d) => n + d.lines.length, 0)}, passage paragraphs: ${allPassages().reduce((n, p) => n + p.so.split(/\n\n+/).length, 0)}, review rows: ${rows.length}, audio rows: ${audioRows.length}.`);
console.log(`Audio statuses: ${countsByStatus.map(([s, n]) => `${s}=${n}`).join(', ')}. No entry claims review or approval.`);
