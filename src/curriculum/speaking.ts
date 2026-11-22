/**
 * Speaking programme — five activity types and an educator-reviewed rubric.
 * Browser speech recognition is NEVER used to grade Somali pronunciation:
 * pronunciation accuracy claims require a native-speaker review.
 */
import type { SpeakingTask, SpeakingTaskType } from './types';

export const speakingTypeLabelsSo: Record<SpeakingTaskType, string> = {
  'listen-repeat': 'Dhagayso oo ku celi',
  'listen-respond': 'Dhagayso oo ka jawaab',
  'guided-conversation': 'Wadahadal hagaya',
  'picture-description': 'Sawir ka hadal',
  'open-speaking': 'Hadal furan',
};

export const speakingTypeLabelsEn: Record<SpeakingTaskType, string> = {
  'listen-repeat': 'Listen and repeat',
  'listen-respond': 'Listen and respond',
  'guided-conversation': 'Guided conversation',
  'picture-description': 'Picture description',
  'open-speaking': 'Open speaking',
};

/** The speaking rubric used by educators (six dimensions). */
export const speakingRubricSo: string[] = [
  'Dhawaaqa iyo fahanka (pronunciation & intelligibility)',
  'Erayada (vocabulary)',
  'Dhismaha jumladaha (sentence formation)',
  'Fudaydka (fluency)',
  'Jawaabidda dhagaysiga (listening response)',
  'Wadahadalka (conversation interaction)',
];

export const speakingRubricEn: string[] = [
  'Pronunciation and intelligibility',
  'Vocabulary',
  'Sentence formation',
  'Fluency',
  'Listening response',
  'Conversation interaction',
];

export type RubricScore = 1 | 2 | 3 | 4;

export const rubricLevelsSo: Record<RubricScore, string> = {
  1: 'Waxaan u baahanahay caawimaad badan',
  2: 'Waan isku dayayaa, qaladaad ayaa jira',
  3: 'Waad ku qanacsan tahay, faham ayaa jira',
  4: 'Aad baad u fiican tahay, si dabiici ah ayaad u hadashaa',
};

/**
 * Speaking evidence kinds. Recording is optional and self-review or an
 * educator assessment is always available — no automatic pronunciation score.
 */
export type SpeakingEvidenceKind = 'self-review' | 'recording' | 'educator';

export type SpeakingEvidence = {
  taskId: string;
  kind: SpeakingEvidenceKind;
  note: string;
  /** Optional educator rubric scores per dimension. */
  rubricScores?: Record<string, RubricScore>;
  at: string;
};

export const isEducatorEvidence = (e: SpeakingEvidence) => e.kind === 'educator';

/** Self-review checklist shown to learners after a speaking task. */
export const selfChecklistSo: string[] = [
  'Waan ku celceliyey ugu yaraan laba jeer.',
  'Codkaygu waa cad yahay oo la fahmi karaa.',
  'Waxaan isticmaalay erayada casharka.',
  'Jumladuhu waa sax yihiin.',
];

export type SpeakingTaskSummary = { task: SpeakingTask; typeLabelSo: string; audioNeeded: boolean };
