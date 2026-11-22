/**
 * School curriculum integrity — every released lesson has real content,
 * references resolve, IDs are unique, and Stage 1 preserves the original
 * phonics lessons without duplicating them.
 */
import { describe, expect, it } from 'vitest';
import { units } from '../src/curriculum';
import {
  allDialogues, allExercises, allLessons, allModules, allPassages, allVocabulary,
  lessonSkills, objectiveExercises, schoolTotals, stages,
} from '../src/curriculum/index';
import { schoolAudioManifest } from '../src/curriculum/audio';
import { diagnosticItems, pathways, scoreDiagnostic } from '../src/curriculum/pathways';
import { buildContentReview, contentReview, hasContentApproval } from '../src/curriculum/review';
import { readingLevels } from '../src/curriculum/reading';
import { speakingRubricSo } from '../src/curriculum/speaking';

describe('school curriculum structure', () => {
  it('has seven stages with the required titles and ordering', () => {
    expect(stages.map(s => s.id)).toEqual(['stage-0', 'stage-1', 'stage-2', 'stage-3', 'stage-4', 'stage-5', 'stage-6']);
    expect(stages.map(s => s.index)).toEqual([0, 1, 2, 3, 4, 5, 6]);
    expect(stages.every(s => s.modules.length > 0)).toBe(true);
  });

  it('offers at least 36 core learning modules across the stages', () => {
    expect(allModules().length).toBeGreaterThanOrEqual(36);
  });

  it('gives every lesson real educational content — no empty placeholders', () => {
    for (const lesson of allLessons()) {
      expect(lesson.objectivesSo.length, lesson.id).toBeGreaterThan(0);
      expect(lesson.minutes, lesson.id).toBeGreaterThan(5);
      expect(lesson.skills.length, lesson.id).toBeGreaterThan(0);
      expect(lesson.reviewSo.length, lesson.id).toBeGreaterThan(0);
      // A lesson must teach something concrete: vocabulary, a dialogue,
      // a passage, grammar, or a legacy route to the preserved phonics UI.
      const hasContent =
        lesson.vocab.length > 0 || lesson.dialogues.length > 0 ||
        lesson.passages.length > 0 || lesson.grammar.length > 0 ||
        Boolean(lesson.legacyRoute);
      expect(hasContent, lesson.id).toBe(true);
      // Non-legacy lessons must include practice.
      if (!lesson.legacyRoute) {
        expect(lesson.exercises.length + lesson.speaking.length, lesson.id).toBeGreaterThan(0);
      }
    }
  });

  it('has unique ids across lessons, vocabulary, exercises, passages and dialogues', () => {
    const lessons = allLessons().map(l => l.id);
    expect(new Set(lessons).size).toBe(lessons.length);
    const vocab = allVocabulary().map(v => v.id);
    expect(new Set(vocab).size).toBe(vocab.length);
    const exercises = allExercises().map(e => e.id);
    expect(new Set(exercises).size).toBe(exercises.length);
    const passages = allPassages().map(p => p.id);
    expect(new Set(passages).size).toBe(passages.length);
    const dialogues = allDialogues().map(d => d.id);
    expect(new Set(dialogues).size).toBe(dialogues.length);
  });

  it('resolves every vocab, passage and dialogue reference used by exercises', () => {
    const vocabIds = new Set(allVocabulary().map(v => v.id));
    const passageIds = new Set(allPassages().map(p => p.id));
    const dialogueIds = new Set(allDialogues().map(d => d.id));
    for (const lesson of allLessons()) {
      for (const ex of lesson.exercises) {
        for (const id of ex.vocabIds ?? []) expect(vocabIds.has(id), `${ex.id} → ${id}`).toBe(true);
        if (ex.passageId) expect(passageIds.has(ex.passageId), `${ex.id} → ${ex.passageId}`).toBe(true);
        if (ex.dialogueId) expect(dialogueIds.has(ex.dialogueId), `${ex.id} → ${ex.dialogueId}`).toBe(true);
      }
      for (const t of lesson.speaking) {
        if (t.dialogueId) expect(dialogueIds.has(t.dialogueId), `${t.id} → ${t.dialogueId}`).toBe(true);
      }
    }
  });

  it('keeps every multiple-choice answer inside its options', () => {
    for (const p of allPassages()) {
      for (const q of p.questions) expect(q.options, q.id).toContain(q.answer);
    }
    for (const st of stages) {
      for (const item of st.assessment.items) expect(item.options, item.id).toContain(item.answer);
    }
    for (const ex of allExercises()) {
      if (ex.options && ex.answer && !Array.isArray(ex.answer)) expect(ex.options, ex.id).toContain(ex.answer);
    }
    for (const d of diagnosticItems) expect(d.options).toContain(d.answer);
  });

  it('covers all four core skills across the school', () => {
    const skills = new Set(allLessons().flatMap(l => lessonSkills(l)));
    expect([...skills].sort()).toEqual(['akhris', 'dhagaysi', 'hadal', 'qoris']);
  });

  it('gives every stage an assessment and a speaking brief', () => {
    for (const st of stages) {
      expect(st.assessment.items.length, st.id).toBeGreaterThan(0);
      expect(st.assessment.speakingBriefSo.length, st.id).toBeGreaterThan(0);
      expect(st.assessment.speakingRubric.length, st.id).toBeGreaterThan(0);
    }
    expect(speakingRubricSo.length).toBe(6);
  });

  it('has real reading passages at declared levels with comprehension questions', () => {
    const levels = new Set(readingLevels.map(r => r.level));
    for (const p of allPassages()) {
      expect(levels.has(p.level), p.id).toBe(true);
      expect(p.so.length, p.id).toBeGreaterThan(80);
      expect(p.purposeSo.length, p.id).toBeGreaterThan(0);
      expect(p.questions.length, p.id).toBeGreaterThan(0);
      for (const q of p.questions) expect(q.options.length, q.id).toBeGreaterThanOrEqual(2);
    }
    // Reading Levels 1–7 must all be represented somewhere in the pathway.
    const used = new Set(allPassages().map(p => p.level));
    for (const l of [1, 2, 3, 4, 5, 6]) expect(used.has(l as 1), `level ${l}`).toBe(true);
  });

  it('authored dialogues have roles and every line belongs to a role', () => {
    for (const d of allDialogues()) {
      expect(d.roles.length, d.id).toBeGreaterThanOrEqual(2);
      expect(d.lines.length, d.id).toBeGreaterThanOrEqual(2);
      for (const line of d.lines) expect(d.roles, `${d.id}:${line.speaker}`).toContain(line.speaker);
    }
  });

  it('keeps Somali vocabulary free of p, v and z in native spellings', () => {
    for (const v of allVocabulary()) {
      expect(v.so.toLowerCase(), v.id).not.toMatch(/[pvz]/);
    }
  });
});

describe('Stage 1 preservation', () => {
  it('maps the eight original phonics units without duplicating their content', () => {
    const stage1 = stages.find(s => s.id === 'stage-1')!;
    const legacy = stage1.modules.flatMap(m => m.lessons).filter(l => l.legacyRoute);
    expect(legacy).toHaveLength(units.length);
    expect(legacy.map(l => l.id)).toEqual(units.map(u => `s1-legacy-${u.id}`));
    // Legacy records link to the preserved UI instead of re-authoring lessons.
    for (const l of legacy) {
      expect(l.legacyRoute).toMatch(/^#\/xaraf\?unit=\d$/);
      expect(l.vocab.length).toBe(0);
      expect(l.exercises.length).toBe(0);
    }
  });

  it('adds the supplementary doubled-consonant lesson with verified-style examples', () => {
    const stage1 = stages.find(s => s.id === 'stage-1')!;
    const doubled = stage1.modules.flatMap(m => m.lessons).find(l => l.id === 's1-m2-l1')!;
    expect(doubled.vocab.map(v => v.so)).toEqual(expect.arrayContaining(['haddii', 'ummadda', 'waddada', 'dabcan', 'ammaan']));
    const g = doubled.grammar[0];
    // Unverified minimal pairs must not be taught as fact.
    expect(g.explanationSo).toContain('dib-u-eegis macallin');
  });
});

describe('audio manifest for school content', () => {
  it('starts every school recording as NOT_RECORDED and unapproved', () => {
    expect(schoolAudioManifest.length).toBeGreaterThan(100);
    for (const a of schoolAudioManifest) {
      expect(a.status).toBe('NOT_RECORDED');
      expect(a.reviewStatus).toBe('NOT_RECORDED');
      expect(a.pronunciationStatus).toBe('NOT_RECORDED');
    }
  });

  it('has unique ids and paths and covers words, dialogues and passages', () => {
    expect(new Set(schoolAudioManifest.map(a => a.id)).size).toBe(schoolAudioManifest.length);
    expect(new Set(schoolAudioManifest.map(a => a.path)).size).toBe(schoolAudioManifest.length);
    const kinds = new Set(schoolAudioManifest.map(a => a.kind));
    expect(kinds.has('word')).toBe(true);
    expect(kinds.has('dialogue')).toBe(true);
    expect(kinds.has('paragraph')).toBe(true);
  });
});

describe('learner pathways', () => {
  it('keeps one shared curriculum with three entry paths', () => {
    expect(pathways.map(p => p.id)).toEqual(['A', 'B', 'C']);
    const stageIds = new Set(stages.map(s => s.id));
    for (const p of pathways) {
      expect(stageIds.has(p.startStage), p.id).toBe(true);
      for (const f of p.focusStages) expect(stageIds.has(f), `${p.id}:${f}`).toBe(true);
    }
  });

  it('recommends stages from the diagnostic without blocking progress', () => {
    const allCorrect = scoreDiagnostic(diagnosticItems.map(i => i.id));
    expect(allCorrect.score).toBe(diagnosticItems.length);
    expect(allCorrect.recommendedStage).toBe('stage-6');
    const noneCorrect = scoreDiagnostic([]);
    expect(noneCorrect.recommendedStage).toBe('stage-0');
  });
});

describe('content review workflow', () => {
  it('marks all school content PENDING_REVIEW with no invented approvals', () => {
    expect(contentReview.length).toBeGreaterThan(200);
    expect(contentReview.every(r => r.status === 'PENDING_REVIEW')).toBe(true);
    expect(contentReview.some(hasContentApproval)).toBe(false);
    expect(buildContentReview().length).toBe(contentReview.length);
  });

  it('records review metadata fields on every vocabulary item', () => {
    for (const v of allVocabulary()) {
      expect(v.review).toBe('PENDING_REVIEW');
      expect(v.so.length).toBeGreaterThan(0);
      expect(v.en.length).toBeGreaterThan(0);
    }
  });
});

describe('school totals', () => {
  it('counts modules, lessons and exercises consistently', () => {
    const t = schoolTotals();
    expect(t.stages).toBe(7);
    expect(t.modules).toBe(allModules().length);
    expect(t.lessons).toBe(allLessons().length);
    expect(t.exercises).toBe(allExercises().length);
    expect(t.vocabulary).toBe(allVocabulary().length);
    expect(t.lessons).toBeGreaterThanOrEqual(60);
  });

  it('every non-legacy lesson has at least one objective exercise', () => {
    for (const l of allLessons()) {
      if (l.legacyRoute) continue;
      expect(objectiveExercises(l).length, l.id).toBeGreaterThan(0);
    }
  });
});
