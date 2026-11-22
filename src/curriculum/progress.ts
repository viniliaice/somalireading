/**
 * School progress — per-lesson records, four-skill breakdowns, spaced review,
 * stage assessments and certificates.
 *
 * Stored under `baro-school-v1`. The preserved Stage 1 progress
 * (`baro-progress-v2`) is never touched, so existing learner progress survives.
 */
import { lessonSkills, objectiveExercises, stageById, stages } from './index';
import type { CoreSkill, Lesson, Stage } from './types';

export const SCHOOL_PROGRESS_KEY = 'baro-school-v1';
/** Configurable mastery target for objective exercises. */
export const SCHOOL_MASTERY_THRESHOLD = 0.8;
/** Minimum distinct objective exercises attempted before mastery. */
export const SCHOOL_MIN_DISTINCT = 3;
/** Spaced-review intervals in days. */
export const REVIEW_INTERVALS = [1, 3, 7, 16, 35];

export type MasteryState = 'not-started' | 'in-progress' | 'mastered' | 'awaiting-audio' | 'legacy';

export type ExerciseRecord = {
  attempts: number;
  correct: number;
  incorrect: number;
  latestCorrect: boolean;
  lastAt: string;
};

export type VocabularyReview = {
  seen: number;
  correct: number;
  incorrect: number;
  intervalDays: number;
  dueAt: string;
  mastered: boolean;
};

export type LessonRecord = {
  lessonId: string;
  attempts: number;
  correct: number;
  incorrect: number;
  timeSpentSeconds: number;
  exercises: Record<string, ExerciseRecord>;
  speakingEvidence: { taskId: string; kind: 'self-review' | 'recording' | 'educator'; note: string; at: string }[];
  mastery: MasteryState;
  firstAt: string;
  lastAt: string;
  reviewDueAt: string | null;
};

export type SkillScore = { attempted: number; correct: number; total: number; assessed: boolean };

export type StageAssessmentRecord = {
  score: number;
  total: number;
  perSkill: Record<CoreSkill, SkillScore>;
  speakingAssessed: boolean;
  completedAt: string;
};

export type CertificateRecord = {
  stageId: string;
  awardedAt: string;
  assessmentScore: number;
  assessmentTotal: number;
  /** Skills that were NOT assessable when the certificate was awarded. */
  pendingSkills: CoreSkill[];
};

export type SchoolProgress = {
  version: 1;
  path: 'A' | 'B' | 'C' | null;
  diagnostic: { score: number; total: number; recommendedStage: string; takenAt: string } | null;
  lessons: Record<string, LessonRecord>;
  vocabulary: Record<string, VocabularyReview>;
  stageAssessments: Record<string, StageAssessmentRecord>;
  certificates: Record<string, CertificateRecord>;
  activeLessonId: string | null;
  updatedAt: string;
};

export const emptySchoolProgress = (): SchoolProgress => ({
  version: 1, path: null, diagnostic: null, lessons: {}, vocabulary: {},
  stageAssessments: {}, certificates: {}, activeLessonId: null, updatedAt: new Date(0).toISOString(),
});

export function loadSchoolProgress(): SchoolProgress {
  try {
    const raw = localStorage.getItem(SCHOOL_PROGRESS_KEY);
    if (!raw) return emptySchoolProgress();
    const p = JSON.parse(raw) as SchoolProgress;
    if (p && p.version === 1 && p.lessons && typeof p.lessons === 'object') return p;
    return emptySchoolProgress();
  } catch {
    return emptySchoolProgress();
  }
}

export function saveSchoolProgress(p: SchoolProgress): SchoolProgress {
  const next = { ...p, updatedAt: new Date().toISOString() };
  try { localStorage.setItem(SCHOOL_PROGRESS_KEY, JSON.stringify(next)); } catch { /* storage may be unavailable */ }
  return next;
}

const ensureLesson = (p: SchoolProgress, lessonId: string, now: string): LessonRecord =>
  p.lessons[lessonId] ?? {
    lessonId, attempts: 0, correct: 0, incorrect: 0, timeSpentSeconds: 0, exercises: {},
    speakingEvidence: [], mastery: 'not-started', firstAt: now, lastAt: now, reviewDueAt: null,
  };

export function recordExerciseResult(
  p: SchoolProgress, lessonId: string, exerciseId: string, correct: boolean,
  now = new Date().toISOString(),
): SchoolProgress {
  const lesson = ensureLesson(p, lessonId, now);
  const ex = lesson.exercises[exerciseId] ?? { attempts: 0, correct: 0, incorrect: 0, latestCorrect: false, lastAt: now };
  const exercises = {
    ...lesson.exercises,
    [exerciseId]: {
      attempts: ex.attempts + 1,
      correct: ex.correct + (correct ? 1 : 0),
      incorrect: ex.incorrect + (correct ? 0 : 1),
      latestCorrect: correct,
      lastAt: now,
    },
  };
  const updated: LessonRecord = {
    ...lesson, exercises,
    attempts: lesson.attempts + 1,
    correct: lesson.correct + (correct ? 1 : 0),
    incorrect: lesson.incorrect + (correct ? 0 : 1),
    lastAt: now,
  };
  return { ...p, lessons: { ...p.lessons, [lessonId]: updated } };
}

export function recordSpeakingEvidence(
  p: SchoolProgress, lessonId: string, taskId: string,
  kind: 'self-review' | 'recording' | 'educator', note: string, now = new Date().toISOString(),
): SchoolProgress {
  const lesson = ensureLesson(p, lessonId, now);
  const speakingEvidence = [...lesson.speakingEvidence.filter(e => e.taskId !== taskId), { taskId, kind, note, at: now }];
  return { ...p, lessons: { ...p.lessons, [lessonId]: { ...lesson, speakingEvidence, lastAt: now } } };
}

export function addTimeSpent(p: SchoolProgress, lessonId: string, seconds: number, now = new Date().toISOString()): SchoolProgress {
  const lesson = ensureLesson(p, lessonId, now);
  return { ...p, lessons: { ...p.lessons, [lessonId]: { ...lesson, timeSpentSeconds: lesson.timeSpentSeconds + Math.max(0, seconds), lastAt: now } } };
}

/* ------------------------------------------------------------------ */
/* Vocabulary spaced review                                            */
/* ------------------------------------------------------------------ */

export function recordVocabularyReview(
  p: SchoolProgress, vocabId: string, correct: boolean, now = new Date().toISOString(),
): SchoolProgress {
  const current = p.vocabulary[vocabId] ?? { seen: 0, correct: 0, incorrect: 0, intervalDays: 0, dueAt: now, mastered: false };
  const seen = current.seen + 1;
  const idx = Math.min(current.intervalDays === 0 ? 0 : REVIEW_INTERVALS.indexOf(current.intervalDays) + 1, REVIEW_INTERVALS.length - 1);
  const intervalDays = correct ? REVIEW_INTERVALS[Math.min(idx, REVIEW_INTERVALS.length - 1)] : 1;
  const due = new Date(now);
  due.setDate(due.getDate() + intervalDays);
  return {
    ...p,
    vocabulary: {
      ...p.vocabulary,
      [vocabId]: {
        seen,
        correct: current.correct + (correct ? 1 : 0),
        incorrect: current.incorrect + (correct ? 0 : 1),
        intervalDays,
        dueAt: due.toISOString(),
        mastered: correct && current.intervalDays >= REVIEW_INTERVALS[2],
      },
    },
  };
}

export function dueVocabulary(p: SchoolProgress, now = new Date().toISOString()): string[] {
  return Object.entries(p.vocabulary).filter(([, v]) => v.dueAt <= now && !v.mastered).map(([id]) => id);
}

/* ------------------------------------------------------------------ */
/* Mastery rules                                                       */
/* ------------------------------------------------------------------ */

export type LessonMasteryReport = {
  state: MasteryState;
  objectiveScore: number;
  distinctObjective: number;
  required: number;
  speakingRequired: boolean;
  speakingDone: boolean;
  listeningPending: boolean;
};

export function lessonMastery(p: SchoolProgress, lesson: Lesson, threshold = SCHOOL_MASTERY_THRESHOLD): LessonMasteryReport {
  const record = p.lessons[lesson.id];
  const objectives = objectiveExercises(lesson);
  const speakingRequired = lesson.speaking.length > 0;
  const hasListeningExercise = lesson.exercises.some(e => e.skill === 'dhagaysi');
  const speakingDone = Boolean(record && record.speakingEvidence.length > 0);
  if (!record) {
    return { state: lesson.legacyRoute ? 'legacy' : 'not-started', objectiveScore: 0, distinctObjective: 0, required: objectives.length, speakingRequired, speakingDone, listeningPending: hasListeningExercise };
  }
  const results = objectives.map(e => record.exercises[e.id]).filter(Boolean);
  const distinctObjective = results.length;
  const latestCorrect = results.filter(r => r.latestCorrect).length;
  const objectiveScore = distinctObjective ? latestCorrect / distinctObjective : 0;
  // Lessons delivered by the preserved phonics UI are mastered in that UI.
  if (lesson.legacyRoute) {
    return { state: record.mastery === 'mastered' ? 'mastered' : record.attempts > 0 ? 'in-progress' : 'legacy', objectiveScore, distinctObjective, required: objectives.length, speakingRequired, speakingDone, listeningPending: hasListeningExercise };
  }
  const listeningPending = hasListeningExercise && distinctObjective < objectives.length;
  const reached =
    distinctObjective >= Math.min(SCHOOL_MIN_DISTINCT, Math.max(objectives.length, 1)) &&
    distinctObjective >= objectives.length &&
    objectiveScore >= threshold &&
    (!speakingRequired || speakingDone);
  const state: MasteryState = reached ? 'mastered'
    : record.attempts === 0 ? (listeningPending ? 'awaiting-audio' : 'not-started')
    : 'in-progress';
  return { state, objectiveScore, distinctObjective, required: objectives.length, speakingRequired, speakingDone, listeningPending };
}

export type StageProgressReport = {
  stageId: string;
  lessonsTotal: number;
  lessonsMastered: number;
  lessonsInProgress: number;
  lessonsNotStarted: number;
  vocabularyLearned: number;
  speakingEvidence: number;
  complete: boolean;
};

export function stageProgress(p: SchoolProgress, stageId: string): StageProgressReport {
  const stage = stageById(stageId);
  if (!stage) return { stageId, lessonsTotal: 0, lessonsMastered: 0, lessonsInProgress: 0, lessonsNotStarted: 0, vocabularyLearned: 0, speakingEvidence: 0, complete: false };
  const lessons = stage.modules.flatMap(m => m.lessons);
  let mastered = 0, inProgress = 0, notStarted = 0, speaking = 0;
  for (const l of lessons) {
    const m = lessonMastery(p, l);
    if (m.state === 'mastered') mastered++;
    else if (m.state === 'in-progress' || m.state === 'awaiting-audio') inProgress++;
    else notStarted++;
    speaking += p.lessons[l.id]?.speakingEvidence.length ?? 0;
  }
  const vocabularyLearned = Object.values(p.vocabulary).filter(v => v.mastered).length;
  return {
    stageId, lessonsTotal: lessons.length, lessonsMastered: mastered, lessonsInProgress: inProgress,
    lessonsNotStarted: notStarted, vocabularyLearned, speakingEvidence: speaking,
    complete: mastered === lessons.length,
  };
}

/* ------------------------------------------------------------------ */
/* Skill summaries — four skills measured separately                   */
/* ------------------------------------------------------------------ */

export type SkillSummary = { attempted: number; correct: number; assessed: boolean };

export function skillSummaryFor(p: SchoolProgress, lessons: Lesson[], skill: CoreSkill): SkillSummary {
  let attempted = 0, correct = 0;
  for (const lesson of lessons) {
    const record = p.lessons[lesson.id];
    if (!record) continue;
    for (const ex of lesson.exercises) {
      if (ex.skill !== skill || !ex.objective) continue;
      const r = record.exercises[ex.id];
      if (!r) continue;
      attempted += r.attempts;
      correct += r.correct;
    }
    if (skill === 'hadal') {
      attempted += record.speakingEvidence.length;
      correct += record.speakingEvidence.length;
    }
  }
  return { attempted, correct, assessed: attempted > 0 };
}

/* ------------------------------------------------------------------ */
/* Certificates                                                        */
/* ------------------------------------------------------------------ */

export type CertificateEligibility = {
  eligible: boolean;
  reasonSo: string;
  pendingSkills: CoreSkill[];
};

export function certificateEligibility(p: SchoolProgress, stage: Stage): CertificateEligibility {
  const report = stageProgress(p, stage.id);
  const assessment = p.stageAssessments[stage.id];
  const pendingSkills: CoreSkill[] = [];
  if (!report.complete) {
    return { eligible: false, reasonSo: `Casharrada oo dhan waa in la dhammeeyaa (${report.lessonsMastered}/${report.lessonsTotal}).`, pendingSkills };
  }
  if (!assessment) {
    return { eligible: false, reasonSo: 'Tijaabada heerka waa in la qaataa oo la dhammeeyaa.', pendingSkills };
  }
  const objectiveSkills: CoreSkill[] = ['akhris', 'qoris'];
  for (const s of objectiveSkills) {
    const sc = assessment.perSkill[s];
    if (!sc || !sc.assessed || sc.total === 0 || sc.correct / sc.total < SCHOOL_MASTERY_THRESHOLD) {
      return { eligible: false, reasonSo: `Xirfadda ${s} waa in la gaadhiiyo ${Math.round(SCHOOL_MASTERY_THRESHOLD * 100)}%.`, pendingSkills };
    }
  }
  for (const s of ['dhagaysi', 'hadal'] as CoreSkill[]) {
    const sc = assessment.perSkill[s];
    if (!sc || !sc.assessed) pendingSkills.push(s);
  }
  return {
    eligible: true,
    reasonSo: pendingSkills.length
      ? `Shahaadada waa la bixin karaa; xirfadaha ${pendingSkills.join(', ')} weli waxay sugayaan cod la ansixiyey ama qiimayn macallin.`
      : 'Dhammaan shuruudaha waa la buuxiyey.',
    pendingSkills,
  };
}

export function awardCertificate(p: SchoolProgress, stage: Stage, now = new Date().toISOString()): SchoolProgress {
  const eligibility = certificateEligibility(p, stage);
  if (!eligibility.eligible) return p;
  const assessment = p.stageAssessments[stage.id];
  return {
    ...p,
    certificates: {
      ...p.certificates,
      [stage.id]: {
        stageId: stage.id, awardedAt: now,
        assessmentScore: assessment.score, assessmentTotal: assessment.total,
        pendingSkills: eligibility.pendingSkills,
      },
    },
  };
}

/** Downloadable progress report for parents and teachers (plain text). */
export function progressReportText(p: SchoolProgress, learnerName = 'Ardayga'): string {
  const lines: string[] = [];
  const today = new Date().toISOString().slice(0, 10);
  lines.push(`WARBIXINTA HORUMARKA — Baro Af-Soomaali`);
  lines.push(`Taariikhda: ${today} · Ardayga: ${learnerName}`);
  lines.push('');
  if (p.path) lines.push(`Jidka waxbarashada: ${p.path}`);
  if (p.diagnostic) lines.push(`Tijaabada bilowga: ${p.diagnostic.score}/${p.diagnostic.total} → ${p.diagnostic.recommendedStage}`);
  lines.push('');
  for (const stage of stages) {
    const r = stageProgress(p, stage.id);
    lines.push(`HEERKA ${stage.index} — ${stage.titleSo} (${stage.titleEn})`);
    lines.push(`  Casharro: ${r.lessonsMastered}/${r.lessonsTotal} la dhammeeyay · ${r.lessonsInProgress} socda · ${r.lessonsNotStarted} bilow la’aan`);
    lines.push(`  Erayo la xasuusto: ${r.vocabularyLearned} · Caddeyn hadal: ${r.speakingEvidence}`);
    const cert = p.certificates[stage.id];
    if (cert) lines.push(`  Shahaado: ${cert.awardedAt.slice(0, 10)}${cert.pendingSkills.length ? ` (waxyaabaha sugaya: ${cert.pendingSkills.join(', ')})` : ''}`);
    lines.push('');
  }
  lines.push('XIRFADHAHAA (afar xirfadood si gaar ah loo qiimeeyaa):');
  for (const skill of ['dhagaysi', 'hadal', 'akhris', 'qoris'] as CoreSkill[]) {
    const lessons = stages.flatMap(st => st.modules.flatMap(m => m.lessons)).filter(l => lessonSkills(l).includes(skill));
    const s = skillSummaryFor(p, lessons, skill);
    lines.push(`  ${skill}: isku day ${s.attempted} · sax ${s.correct}${s.assessed ? '' : ' (weli lama tijaabin)'}`);
  }
  lines.push('');
  lines.push('Ogeysiis: qiimaynta dhawaaqa waa in ay sameeyaan dad af-Soomaali ku hadla ama macallin; boggu ma isticmaalo aqoonsi cod-sameeye si uu u qiimeeyo dhawaaqa.');
  return lines.join('\n');
}

export type { Lesson, Stage };
