/**
 * Baro Af-Soomaali — curriculum data model.
 *
 * All curriculum content lives in `src/curriculum/` and is kept separate from
 * presentation code. Every content object carries a review status; nothing is
 * teacher-approved unless a reviewer and evidence are recorded. Audio is never
 * assumed to exist: entries start NOT_RECORDED and playback stays blocked until
 * the full approval workflow in `src/audio.ts` is satisfied.
 */
export type ReviewStatus = 'PENDING_REVIEW' | 'CORRECTION_REQUIRED' | 'APPROVED';

/** The four connected skills: listening, speaking, reading, writing. */
export type CoreSkill = 'dhagaysi' | 'hadal' | 'akhris' | 'qoris';

export const skillLabelsSo: Record<CoreSkill, string> = {
  dhagaysi: 'Dhagaysi',
  hadal: 'Hadal',
  akhris: 'Akhris',
  qoris: 'Qoris',
};

export const skillLabelsEn: Record<CoreSkill, string> = {
  dhagaysi: 'Listening and understanding',
  hadal: 'Speaking and pronunciation',
  akhris: 'Reading and comprehension',
  qoris: 'Writing and spelling',
};

/** Vocabulary item with Somali spelling, meaning and teaching metadata. */
export type VocabularyItem = {
  id: string;
  so: string;
  en: string;
  emoji?: string;
  exampleSo?: string;
  exampleEn?: string;
  /** Reference into the school audio manifest (`word:<id>` by convention). */
  audioId?: string;
  stage: string;
  review: ReviewStatus;
};

export type DialogueLine = { speaker: string; so: string; en: string };

export type Dialogue = {
  id: string;
  titleSo: string;
  titleEn: string;
  contextSo: string;
  contextEn: string;
  roles: string[];
  lines: DialogueLine[];
  audioId?: string;
  review: ReviewStatus;
};

export type QuestionKind = 'who' | 'what' | 'where' | 'when' | 'why' | 'how' | 'main-idea' | 'detail' | 'sequence' | 'inference' | 'vocab';

export type ReadingQuestion = {
  id: string;
  kind: QuestionKind;
  so: string;
  en: string;
  options: string[];
  answer: string;
  answerEn?: string;
};

export type ReadingPassage = {
  id: string;
  titleSo: string;
  titleEn: string;
  /** Reading Levels 1–7 (see `reading.ts`). */
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  purposeSo: string;
  purposeEn: string;
  /** Paragraphs separated by blank lines. */
  so: string;
  en?: string;
  glossary: { word: string; meaning: string }[];
  questions: ReadingQuestion[];
  audioId?: string;
  review: ReviewStatus;
};

export type GrammarNote = {
  id: string;
  titleSo: string;
  titleEn: string;
  explanationSo: string;
  explanationEn: string;
  examples: { so: string; en: string }[];
  commonErrors?: { wrong: string; right: string; noteSo: string }[];
  /** Documented regional or colloquial variation — never presented as a mistake. */
  dialectNoteSo?: string;
  review: ReviewStatus;
};

export type SpeakingTaskType =
  | 'listen-repeat'
  | 'listen-respond'
  | 'guided-conversation'
  | 'picture-description'
  | 'open-speaking';

export type SpeakingTask = {
  id: string;
  type: SpeakingTaskType;
  promptSo: string;
  promptEn: string;
  /** Target phrase for listen-and-repeat. */
  phraseSo?: string;
  phraseEn?: string;
  audioId?: string;
  dialogueId?: string;
  emoji?: string;
  hintsSo?: string[];
  /** Rubric focus areas used by the educator-reviewed speaking rubric. */
  rubricFocus: string[];
};

export type ActivityType =
  | 'flashcards'
  | 'match-word-picture'
  | 'match-audio-word'
  | 'listen-choose'
  | 'repeat-record'
  | 'order-words'
  | 'fill-blank'
  | 'read-answer'
  | 'match-qa'
  | 'roleplay'
  | 'describe-picture'
  | 'retell'
  | 'spelling'
  | 'open-speaking'
  | 'review-game';

export type Exercise = {
  id: string;
  type: ActivityType;
  titleSo: string;
  titleEn: string;
  skill: CoreSkill;
  /** Objective exercises are auto-graded and count toward mastery. */
  objective: boolean;
  promptSo?: string;
  promptEn?: string;
  /** flashcards */
  vocabIds?: string[];
  /** match-word-picture / match-audio-word / match-qa */
  pairs?: { left: string; right: string; emoji?: string }[];
  /** listen-choose / fill-blank / choice items */
  options?: string[];
  answer?: string | string[];
  /** order-words */
  tokens?: string[];
  /** fill-blank sentence containing `___` */
  sentenceSo?: string;
  /** spelling */
  word?: string;
  hintSo?: string;
  emoji?: string;
  /** repeat-record */
  phraseSo?: string;
  phraseEn?: string;
  /** read-answer */
  passageId?: string;
  /** roleplay */
  dialogueId?: string;
  /** describe-picture / open-speaking / retell */
  wordBank?: string[];
  sequence?: string[];
  translationEn?: string;
  audioId?: string;
};

export type Lesson = {
  id: string;
  stageId: string;
  moduleId: string;
  titleSo: string;
  titleEn: string;
  objectivesSo: string[];
  objectivesEn?: string[];
  minutes: number;
  skills: CoreSkill[];
  vocab: VocabularyItem[];
  dialogues: Dialogue[];
  passages: ReadingPassage[];
  grammar: GrammarNote[];
  speaking: SpeakingTask[];
  exercises: Exercise[];
  /** Recap points for the "Dib u eeg" step. */
  reviewSo: string[];
  review: ReviewStatus;
  /** Set when the lesson is delivered by the preserved Stage 1 phonics experience. */
  legacyRoute?: string;
};

export type LearningModule = {
  id: string;
  stageId: string;
  titleSo: string;
  titleEn: string;
  descriptionSo: string;
  objectivesSo: string[];
  lessons: Lesson[];
  review: ReviewStatus;
};

export type StageAssessmentItem = {
  id: string;
  skill: CoreSkill;
  promptSo: string;
  options: string[];
  answer: string;
  areaSo: string;
};

export type StageAssessment = {
  id: string;
  titleSo: string;
  titleEn: string;
  items: StageAssessmentItem[];
  /** Speaking assessment is evidence-based, never auto-graded. */
  speakingBriefSo: string;
  speakingRubric: string[];
};

export type Stage = {
  id: string;
  index: number;
  titleSo: string;
  titleEn: string;
  levelSo: string;
  levelEn: string;
  descriptionSo: string;
  descriptionEn: string;
  objectivesSo: string[];
  emoji: string;
  readingLevels: number[];
  modules: LearningModule[];
  assessment: StageAssessment;
};

/* ------------------------------------------------------------------ */
/* Content helpers — keep authored files compact and consistent.       */
/* ------------------------------------------------------------------ */

export const pending = 'PENDING_REVIEW' as const;

export function vocab(stage: string, id: string, so: string, en: string, extra: Partial<VocabularyItem> = {}): VocabularyItem {
  return { id, so, en, stage, review: pending, audioId: `word:${id}`, ...extra };
}

export function exercise(e: Omit<Exercise, 'titleEn'> & { titleEn?: string }): Exercise {
  return { titleEn: e.titleSo, ...e } as Exercise;
}

export function lesson(l: Omit<Lesson, 'review'> & { review?: ReviewStatus }): Lesson {
  return { review: pending, ...l };
}

export function module(m: Omit<LearningModule, 'review'> & { review?: ReviewStatus }): LearningModule {
  return { review: pending, ...m };
}

export function dialogue(d: Omit<Dialogue, 'review'> & { review?: ReviewStatus }): Dialogue {
  return { review: pending, ...d };
}

export function passage(p: Omit<ReadingPassage, 'review'> & { review?: ReviewStatus }): ReadingPassage {
  return { review: pending, ...p };
}

export function grammar(g: Omit<GrammarNote, 'review'> & { review?: ReviewStatus }): GrammarNote {
  return { review: pending, ...g };
}

export function question(id: string, kind: QuestionKind, so: string, en: string, options: string[], answer: string, answerEn?: string): ReadingQuestion {
  return { id, kind, so, en, options, answer, answerEn };
}
