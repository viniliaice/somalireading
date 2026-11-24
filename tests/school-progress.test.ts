/**
 * School progress — mastery rules (80% target), spaced review, certificates,
 * per-skill summaries and the downloadable report. The preserved Stage 1
 * progress key must never be touched.
 */
import { describe, expect, it, vi, afterEach } from 'vitest';
import { allLessons, stages, stageById } from '../src/curriculum/index';
import {
  addTimeSpent, awardCertificate, certificateEligibility, dueVocabulary, emptySchoolProgress,
  lessonMastery, loadSchoolProgress, progressReportText, recordExerciseResult,
  recordSpeakingEvidence, recordVocabularyReview, saveSchoolProgress,
  SCHOOL_MASTERY_THRESHOLD, SCHOOL_MIN_DISTINCT, SCHOOL_PROGRESS_KEY, skillSummaryFor,
  REVIEW_INTERVALS,
} from '../src/curriculum/progress';
import { scoreStageAssessment, summariseStageAssessment } from '../src/curriculum/assessment';

afterEach(() => vi.unstubAllGlobals());

const firstLesson = () => allLessons().find(l => !l.legacyRoute && l.exercises.filter(e => e.objective).length >= 3)!;
const objectiveIds = (lessonId: string) => allLessons().find(l => l.id === lessonId)!.exercises.filter(e => e.objective).map(e => e.id);

describe('lesson mastery rules', () => {
  it('needs 80% latest-correct across distinct objective exercises and speaking evidence', () => {
    const lesson = firstLesson();
    const ids = objectiveIds(lesson.id);
    let p = emptySchoolProgress();
    expect(lessonMastery(p, lesson).state).toBe('not-started');
    // three correct, one wrong → 75% → not mastered
    ids.slice(0, 4).forEach((id, i) => { p = recordExerciseResult(p, lesson.id, id, i !== 3); });
    expect(lessonMastery(p, lesson).state).toBe('in-progress');
    // fix the last one → 100% objective
    p = recordExerciseResult(p, lesson.id, ids[3], true);
    const report = lessonMastery(p, lesson);
    expect(report.objectiveScore).toBe(1);
    expect(report.speakingRequired).toBe(lesson.speaking.length > 0);
    if (report.speakingRequired) {
      // objectives are perfect but speaking evidence is still missing
      expect(report.state).toBe('in-progress');
      p = recordSpeakingEvidence(p, lesson.id, lesson.speaking[0].id, 'self-review', 'test');
      expect(lessonMastery(p, lesson).state).toBe('mastered');
    } else {
      expect(report.state).toBe('mastered');
    }
  });

  it('configurable threshold is honoured', () => {
    const lesson = firstLesson();
    const ids = objectiveIds(lesson.id);
    let p = emptySchoolProgress();
    ids.slice(0, 4).forEach((id, i) => { p = recordExerciseResult(p, lesson.id, id, i !== 3); });
    expect(lessonMastery(p, lesson, 0.7).objectiveScore).toBeGreaterThanOrEqual(0.7);
    expect(lessonMastery(p, lesson, 0.9).state).not.toBe('mastered');
  });

  it('requires distinct attempts — one exercise hammered cannot master a lesson', () => {
    const lesson = firstLesson();
    const ids = objectiveIds(lesson.id);
    let p = emptySchoolProgress();
    for (let i = 0; i < 10; i++) p = recordExerciseResult(p, lesson.id, ids[0], true);
    const report = lessonMastery(p, lesson);
    expect(report.distinctObjective).toBe(1);
    expect(report.state).not.toBe('mastered');
    expect(SCHOOL_MIN_DISTINCT).toBe(3);
  });

  it('legacy phonics lessons stay linked to the preserved experience', () => {
    const legacy = allLessons().find(l => l.legacyRoute)!;
    expect(lessonMastery(emptySchoolProgress(), legacy).state).toBe('legacy');
  });
});

describe('spaced vocabulary review', () => {
  it('schedules reviews at increasing intervals and resets on errors', () => {
    let p = emptySchoolProgress();
    const t0 = '2026-01-01T00:00:00.000Z';
    p = recordVocabularyReview(p, 's2-guri-2', true, t0);
    expect(p.vocabulary['s2-guri-2'].intervalDays).toBe(REVIEW_INTERVALS[0]);
    p = recordVocabularyReview(p, 's2-guri-2', true, t0);
    expect(p.vocabulary['s2-guri-2'].intervalDays).toBe(REVIEW_INTERVALS[1]);
    p = recordVocabularyReview(p, 's2-guri-2', false, t0);
    expect(p.vocabulary['s2-guri-2'].intervalDays).toBe(1);
    expect(p.vocabulary['s2-guri-2'].incorrect).toBe(1);
  });

  it('lists due words for the review queue', () => {
    let p = emptySchoolProgress();
    p = recordVocabularyReview(p, 's0-haa', true, '2026-01-01T00:00:00.000Z');
    // just reviewed → not yet due the same moment
    expect(dueVocabulary(p, '2026-01-01T00:00:00.000Z')).not.toContain('s0-haa');
    // due at the scheduled interval (next day after a first correct review)
    expect(dueVocabulary(p, '2026-01-03T00:00:00.000Z')).toContain('s0-haa');
  });
});

describe('stage assessment scoring', () => {
  it('scores objective skills separately and never auto-grades speaking', () => {
    const stage = stageById('stage-2')!;
    const answers = stage.assessment.items.map(i => ({ itemId: i.id, correct: true }));
    const record = scoreStageAssessment(stage, answers, false);
    expect(record.score).toBe(stage.assessment.items.length);
    expect(record.perSkill.hadal.assessed).toBe(false);
    const summary = summariseStageAssessment(record);
    // All objective skills passed; speaking stays pending evidence.
    expect(summary.perSkill.hadal.passed).toBeNull();
    expect(summary.perSkill.akhris.passed).toBe(true);
  });

  it('fails a stage assessment when an objective skill drops below the threshold', () => {
    const stage = stageById('stage-4')!;
    const answers = stage.assessment.items.map(i => ({ itemId: i.id, correct: false }));
    const record = scoreStageAssessment(stage, answers, true);
    const summary = summariseStageAssessment(record);
    expect(summary.passed).toBe(false);
    expect(record.perSkill.akhris.correct / record.perSkill.akhris.total).toBeLessThan(SCHOOL_MASTERY_THRESHOLD);
  });
});

describe('certificates', () => {
  it('requires completed lessons and a passed assessment', () => {
    const stage = stageById('stage-2')!;
    let p = emptySchoolProgress();
    expect(certificateEligibility(p, stage).eligible).toBe(false);
    // Master every lesson.
    for (const lesson of stage.modules.flatMap(m => m.lessons)) {
      const ids = objectiveIds(lesson.id);
      ids.forEach(id => { p = recordExerciseResult(p, lesson.id, id, true); });
      if (lesson.speaking.length) p = recordSpeakingEvidence(p, lesson.id, lesson.speaking[0].id, 'educator', 'macallin');
    }
    // Still not eligible without the assessment.
    expect(certificateEligibility(p, stage).eligible).toBe(false);
    const answers = stage.assessment.items.map(i => ({ itemId: i.id, correct: true }));
    p = { ...p, stageAssessments: { ...p.stageAssessments, [stage.id]: scoreStageAssessment(stage, answers, true) } };
    const eligibility = certificateEligibility(p, stage);
    expect(eligibility.eligible).toBe(true);
    p = awardCertificate(p, stage);
    expect(p.certificates[stage.id]).toBeDefined();
    expect(p.certificates[stage.id].assessmentScore).toBe(stage.assessment.items.length);
  });
});

describe('skill summaries and report', () => {
  it('measures the four skills separately', () => {
    const lessons = allLessons();
    let p = emptySchoolProgress();
    const lesson = firstLesson();
    const ids = objectiveIds(lesson.id);
    ids.forEach(id => { p = recordExerciseResult(p, lesson.id, id, true); });
    p = recordSpeakingEvidence(p, lesson.id, 'x', 'self-review', 'ok');
    const akhris = skillSummaryFor(p, lessons, 'akhris');
    const hadal = skillSummaryFor(p, lessons, 'hadal');
    expect(hadal.attempted).toBeGreaterThanOrEqual(1);
    expect(akhris.attempted).toBeGreaterThanOrEqual(1);
  });

  it('produces a parent/teacher report with honest pending-skill notes', () => {
    const text = progressReportText(emptySchoolProgress(), 'Ardayga Test');
    expect(text).toContain('WARBIXINTA HORUMARKA');
    expect(text).toContain('afar xirfadood si gaar ah');
    expect(text).toContain('ma isticmaalo aqoonsi cod-sameeye');
    for (const stage of stages) expect(text).toContain(stage.titleSo);
  });

  it('tracks time spent per lesson', () => {
    let p = emptySchoolProgress();
    p = addTimeSpent(p, 's0-m2-l1', 90);
    p = addTimeSpent(p, 's0-m2-l1', 30);
    expect(p.lessons['s0-m2-l1'].timeSpentSeconds).toBe(120);
  });
});

describe('progress persistence', () => {
  it('saves and reloads school progress without touching baro-progress-v2', () => {
    const store: Record<string, string> = { 'baro-progress-v2': '{"lessons":{},"legacyCompleted":[1]}' };
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => store[k] ?? null,
      setItem: (k: string, v: string) => { store[k] = v; },
    });
    let p = emptySchoolProgress();
    p = recordExerciseResult(p, 's0-m2-l1', 'e1', true);
    saveSchoolProgress(p);
    expect(store[SCHOOL_PROGRESS_KEY]).toBeTruthy();
    expect(store['baro-progress-v2']).toBe('{"lessons":{},"legacyCompleted":[1]}');
    const loaded = loadSchoolProgress();
    expect(loaded.lessons['s0-m2-l1'].correct).toBe(1);
  });

  it('returns empty progress for corrupted storage', () => {
    vi.stubGlobal('localStorage', { getItem: () => '{bad json', setItem: () => {} });
    expect(loadSchoolProgress().lessons).toEqual({});
    vi.stubGlobal('localStorage', { getItem: () => null, setItem: () => {} });
    expect(loadSchoolProgress().version).toBe(1);
  });
});
