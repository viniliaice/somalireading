/**
 * Stage assessments — sampled from each stage's authored items, scored per
 * skill (dhagaysi, hadal, akhris, qoris). Speaking is NEVER auto-graded: a
 * stage assessment records speaking as evidence-based only.
 */
import { stages } from './index';
import { SCHOOL_MASTERY_THRESHOLD, type SkillScore, type StageAssessmentRecord, type SchoolProgress } from './progress';
import type { CoreSkill, Stage, StageAssessmentItem } from './types';

export function shuffle<T>(values: T[], random: () => number = Math.random): T[] {
  const out = [...values];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export type AssessmentAnswer = { itemId: string; correct: boolean };

/** Score objective answers separately per skill. */
export function scoreStageAssessment(
  stage: Stage, answers: AssessmentAnswer[],
  speakingAssessed: boolean, now = new Date().toISOString(),
): StageAssessmentRecord {
  const perSkill: Record<CoreSkill, SkillScore> = {
    dhagaysi: { attempted: 0, correct: 0, total: 0, assessed: false },
    hadal: { attempted: 0, correct: 0, total: 0, assessed: speakingAssessed },
    akhris: { attempted: 0, correct: 0, total: 0, assessed: false },
    qoris: { attempted: 0, correct: 0, total: 0, assessed: false },
  };
  for (const item of stage.assessment.items) {
    const a = answers.find(x => x.itemId === item.id);
    const bucket = perSkill[item.skill];
    bucket.total += 1;
    if (a) {
      bucket.attempted += 1;
      if (a.correct) bucket.correct += 1;
      bucket.assessed = true;
    }
  }
  const total = stage.assessment.items.length;
  const score = answers.filter(a => {
    const item = stage.assessment.items.find(i => i.id === a.itemId);
    return item && a.correct;
  }).length;
  return { score, total, perSkill, speakingAssessed, completedAt: now };
}

export type StageAssessmentSummary = {
  passed: boolean;
  score: number;
  total: number;
  perSkill: Record<CoreSkill, SkillScore & { passed: boolean | null }>;
  reasonSo: string;
};

/**
 * Objective skills (akhris/qoris and any assessed dhagaysi) must each reach
 * the mastery threshold. Unassessed skills are reported as pending, never as a
 * pass or a fail.
 */
export function summariseStageAssessment(record: StageAssessmentRecord): StageAssessmentSummary {
  const perSkill = {} as StageAssessmentSummary['perSkill'];
  let passed = true;
  const pending: CoreSkill[] = [];
  for (const skill of ['dhagaysi', 'hadal', 'akhris', 'qoris'] as CoreSkill[]) {
    const s = record.perSkill[skill];
    const ratio = s.total > 0 ? s.correct / s.total : 0;
    const skillPassed = s.assessed && s.total > 0 ? ratio >= SCHOOL_MASTERY_THRESHOLD : null;
    perSkill[skill] = { ...s, passed: skillPassed };
    if (skill === 'hadal' || skill === 'dhagaysi') {
      if (skillPassed === null) pending.push(skill);
      else if (!skillPassed && skill === 'hadal') { /* speaking needs educator evidence; pending */ pending.push(skill); }
    } else if (skillPassed !== true) {
      passed = false;
    }
  }
  return {
    passed,
    score: record.score,
    total: record.total,
    perSkill,
    reasonSo: passed
      ? `Waad ku guulaysatay tijaabada: ${record.score}/${record.total}.${pending.length ? ` Xirfadaha ${pending.join(', ')} waxay sugayaan qiimayn caddeyn ku salaysan.` : ''}`
      : `Waxaad u baahan tahay ku celcelin: ${record.score}/${record.total}.`,
  };
}

export function stageAssessmentItems(stage: Stage): StageAssessmentItem[] {
  return stage.assessment.items;
}

export function assessmentById(id: string) {
  return stages.find(st => st.assessment.id === id);
}

/** Record a completed assessment into progress (per-skill results preserved). */
export function applyAssessment(p: SchoolProgress, stage: Stage, record: StageAssessmentRecord): SchoolProgress {
  return { ...p, stageAssessments: { ...p.stageAssessments, [stage.id]: record } };
}
