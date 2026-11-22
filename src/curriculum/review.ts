/**
 * Educational content quality — review registry for all school content.
 *
 * Statuses: PENDING_REVIEW → CORRECTION_REQUIRED → APPROVED.
 * Nothing is APPROVED without a named reviewer, date and evidence.
 */
import { allDialogues, allLessons, allPassages, allVocabulary } from './index';
import type { ReviewStatus } from './types';

export type { ReviewStatus };

export type ContentReviewRecord = {
  id: string;
  kind: 'vocabulary' | 'dialogue' | 'passage' | 'grammar' | 'lesson' | 'assessment-item';
  stage: string;
  text: string;
  status: ReviewStatus;
  reviewer: string;
  reviewDate: string;
  evidence: string;
};

export function hasContentApproval(r: ContentReviewRecord): boolean {
  return r.status === 'APPROVED' && Boolean(r.reviewer && r.reviewDate && r.evidence);
}

/** Build the full review list from authored curriculum content. */
export function buildContentReview(): ContentReviewRecord[] {
  const out: ContentReviewRecord[] = [];
  for (const v of allVocabulary()) {
    out.push({ id: `vocab:${v.id}`, kind: 'vocabulary', stage: v.stage, text: `${v.so} — ${v.en}`, status: v.review, reviewer: '', reviewDate: '', evidence: '' });
  }
  for (const d of allDialogues()) {
    out.push({ id: `dialogue:${d.id}`, kind: 'dialogue', stage: d.titleEn, text: d.titleSo, status: d.review, reviewer: '', reviewDate: '', evidence: '' });
  }
  for (const p of allPassages()) {
    out.push({ id: `passage:${p.id}`, kind: 'passage', stage: p.titleEn, text: p.titleSo, status: p.review, reviewer: '', reviewDate: '', evidence: '' });
  }
  for (const l of allLessons()) {
    out.push({ id: `lesson:${l.id}`, kind: 'lesson', stage: l.stageId, text: l.titleSo, status: l.review, reviewer: '', reviewDate: '', evidence: '' });
  }
  return out;
}

export const contentReview: ContentReviewRecord[] = buildContentReview();

export const vocabularyReviewRows = () =>
  allVocabulary().map(v => ({
    id: v.id, stage: v.stage, somali: v.so, english: v.en,
    example: v.exampleSo ?? '', audioId: v.audioId ?? '', status: v.review,
  }));
