/**
 * School curriculum registry — assembles all stages and provides lookups.
 * The eight Stage 1 phonics lessons remain owned by `src/curriculum.ts` and are
 * delivered by the preserved phonics experience; they appear here only as
 * pathway records (see `stage-1.ts`).
 */
import { stage0 } from './stage-0';
import { stage1 } from './stage-1';
import { stage2 } from './stage-2';
import { stage3 } from './stage-3';
import { stage4 } from './stage-4';
import { stage5 } from './stage-5';
import { stage6 } from './stage-6';
import type { CoreSkill, Exercise, Lesson, LearningModule, Stage, VocabularyItem } from './types';

export const stages: Stage[] = [stage0, stage1, stage2, stage3, stage4, stage5, stage6];

export const stageById = (id: string) => stages.find(st => st.id === id);
export const moduleById = (id: string) => allModules().find(m => m.id === id);
export const lessonById = (id: string) => allLessons().find(l => l.id === id);

export function allModules(): LearningModule[] {
  return stages.flatMap(st => st.modules);
}

export function allLessons(): Lesson[] {
  return allModules().flatMap(m => m.lessons);
}

export function allVocabulary(): VocabularyItem[] {
  return allLessons().flatMap(l => l.vocab);
}

export function allExercises(): Exercise[] {
  return allLessons().flatMap(l => l.exercises);
}

export function allPassages() {
  return allLessons().flatMap(l => l.passages);
}

export function allDialogues() {
  return allLessons().flatMap(l => l.dialogues);
}

/** Lessons that are delivered by the preserved phonics UI. */
export const isLegacyLesson = (l: Lesson) => Boolean(l.legacyRoute);

/** Objective (auto-graded) exercises of a lesson. */
export const objectiveExercises = (l: Lesson) => l.exercises.filter(e => e.objective);

/** Which of the four skills a lesson actively practises. */
export const lessonSkills = (l: Lesson): CoreSkill[] => {
  const set = new Set<CoreSkill>(l.skills);
  for (const e of l.exercises) set.add(e.skill);
  return [...set];
};

/** Stage totals used by the dashboard and reports. */
export function stageTotals(st: Stage) {
  const lessons = st.modules.flatMap(m => m.lessons);
  return {
    modules: st.modules.length,
    lessons: lessons.length,
    vocabulary: lessons.reduce((n, l) => n + l.vocab.length, 0),
    exercises: lessons.reduce((n, l) => n + l.exercises.length, 0),
    passages: lessons.reduce((n, l) => n + l.passages.length, 0),
    dialogues: lessons.reduce((n, l) => n + l.dialogues.length, 0),
    speaking: lessons.reduce((n, l) => n + l.speaking.length, 0),
  };
}

export function schoolTotals() {
  return stages.reduce(
    (acc, st) => {
      const t = stageTotals(st);
      acc.modules += t.modules; acc.lessons += t.lessons; acc.vocabulary += t.vocabulary;
      acc.exercises += t.exercises; acc.passages += t.passages; acc.dialogues += t.dialogues;
      acc.speaking += t.speaking;
      return acc;
    },
    { stages: stages.length, modules: 0, lessons: 0, vocabulary: 0, exercises: 0, passages: 0, dialogues: 0, speaking: 0 },
  );
}
