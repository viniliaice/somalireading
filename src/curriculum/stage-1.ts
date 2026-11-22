/**
 * Stage 1 — Xarfaha iyo Dhawaaqyada.
 *
 * The eight existing phonics lessons are preserved in `src/curriculum.ts` and
 * are delivered by the original phonics experience (`#/xaraf`). This file maps
 * them into the school pathway WITHOUT duplicating their content, and adds one
 * supplementary lesson on doubled consonants as required by the curriculum
 * brief. All content is PENDING_REVIEW.
 */
import { units } from '../curriculum';
import { exercise, grammar, lesson, module, passage, question, vocab, type LearningModule, type Lesson, type Stage } from './types';

const s = 'stage-1';

/** Map each preserved phonics unit onto a lesson record that links to the legacy UI. */
const legacyLessons: Lesson[] = units.map(u => lesson({
  id: `s1-legacy-${u.id}`,
  stageId: s,
  moduleId: 's1-m1',
  titleSo: u.title,
  titleEn: `${u.subtitle}`,
  objectivesSo: [u.description, u.activity],
  objectivesEn: ['Delivered by the preserved Stage 1 phonics experience.'],
  minutes: 20,
  skills: ['akhris', 'qoris', 'dhagaysi'],
  vocab: [],
  dialogues: [],
  passages: [],
  grammar: [],
  speaking: [],
  exercises: [],
  reviewSo: [u.description],
  review: 'PENDING_REVIEW',
  legacyRoute: `#/xaraf?unit=${u.id}`,
}));

/**
 * Supplementary lesson: doubled consonants (labo qoraal oo isku mid ah).
 * Examples are common, well-attested spellings; any claim that two specific
 * words differ ONLY by consonant length is left for teacher verification.
 */
const doubled = lesson({
  id: 's1-m2-l1',
  stageId: s,
  moduleId: 's1-m2',
  titleSo: 'Laba qoraal oo xaraf ah',
  titleEn: 'Doubled consonants',
  objectivesSo: [
    'Labada qoraal ee xarafka ah (dd, mm, bb, …) aqoonsan karo',
    'Fahmo in labada qoraal ay noqon karaan hal dhawaaq dheer',
    'Erayo tusaale ah akhriyo oo qoro',
  ],
  objectivesEn: [
    'Recognise doubled consonant spellings',
    'Understand that a doubled consonant can be one long sound',
    'Read and write example words',
  ],
  minutes: 20,
  skills: ['akhris', 'qoris'],
  vocab: [
    vocab(s, 's1-haddii', 'haddii', 'if', { exampleSo: 'Haddii aad rabto, aan baranno.', exampleEn: 'If you want, let us learn.' }),
    vocab(s, 's1-dabcan', 'dabcan', 'of course / certainly', { exampleSo: 'Dabcan, waan imanayaa.', exampleEn: 'Of course, I am coming.' }),
    vocab(s, 's1-ammaan', 'ammaan', 'safety / peace', { exampleSo: 'Magaaladu way nabad tahay, ammaankeedu wuu fiican yahay.', exampleEn: 'The city is peaceful; its safety is good.' }),
    vocab(s, 's1-ummadda', 'ummadda', 'the people / the nation', { exampleSo: 'Ummadda Soomaaliyeed way is jeclaan.', exampleEn: 'The Somali people love one another.' }),
    vocab(s, 's1-waddada', 'waddada', 'the road', { exampleSo: 'Waddada way dhaadheer tahay.', exampleEn: 'The road is long.' }),
    vocab(s, 's1-habboon', 'habboon', 'fitting / appropriate', { exampleSo: 'Wakhtiga habboon ayaan imanayaa.', exampleEn: 'I will come at the right time.' }),
    vocab(s, 's1-arrimaha', 'arrimaha', 'the matters / affairs', { exampleSo: 'Arrimaha dugsiga way muhiim yihiin.', exampleEn: 'School matters are important.' }),
    vocab(s, 's1-dammaanad', 'dammaanad', 'guarantee', { exampleSo: 'Dammaanad wanaagsan ayaan bixinayaa.', exampleEn: 'I give a good guarantee.' }),
  ],
  dialogues: [],
  passages: [
    passage({
      id: 's1-m2-l1-p1',
      titleSo: 'Labadan qoraal',
      titleEn: 'Two letters, one long sound',
      level: 2,
      purposeSo: 'Erayada labada qoraal leh akhri.',
      purposeEn: 'Read words that contain doubled consonants.',
      so: 'Haddii ay roobowdo, waddadu way qoyaan tahay.\n\nDabcan, ummaddu waxay jeceshahay ammaanka iyo nabadda.\n\nArrimaha dugsiga waxaa loo baahan yahay wakhti habboon.',
      en: 'If it rains, the road is wet.\n\nOf course, the people love safety and peace.\n\nSchool matters need the right time.',
      glossary: [
        { word: 'roobowdo', meaning: 'it rains' },
        { word: 'qoyaan', meaning: 'wet' },
      ],
      questions: [
        question('s1-m2-l1-p1-q1', 'vocab', 'Eraygee xaraf laban jibaaran leh?', 'Which word has a doubled consonant?', ['roobdo', 'haddii', 'nabad'], 'haddii', 'if'),
        question('s1-m2-l1-p1-q2', 'detail', 'Waddadu maxay tahay marka ay roobowdo?', 'What is the road like when it rains?', ['qoyaan', 'qalalan', 'dhaadheer'], 'qoyaan', 'wet'),
      ],
      review: 'PENDING_REVIEW',
    }),
  ],
  grammar: [
    grammar({
      id: 's1-m2-l1-g1',
      titleSo: 'Xaraf laban jibaaran',
      titleEn: 'Doubled consonants',
      explanationSo: 'Marka xaraf laba jeer la qoro, wuxuu noqon karaa hal dhawaaq oo dheer. Tusaale ahaan, “haddii” waxaa ku jira dhawaaq “d” oo dheer. Sidii shaqalka dheer (bur/buur), labada qoraal ee xarafka ah waxay kala sooci karaan erayo — laakiin isbarbardhigga erayo gaar ah wuxuu u baahan yahay dib-u-eegis macallin.',
      explanationEn: 'When a consonant is written twice it can be one long sound. For example, “haddii” contains a long d sound. Just as long vowels can distinguish words (bur/buur), doubled consonants can too — but any specific word comparison must be verified by a teacher before it is taught as fact.',
      examples: [
        { so: 'haddii — if (d dheer)', en: 'haddii — if (long d)' },
        { so: 'ummadda — the people (m dheer)', en: 'ummadda — the people (long m)' },
        { so: 'waddada — the road (d dheer)', en: 'waddada — the road (long d)' },
      ],
      dialectNoteSo: 'Qoraalka xarfaha laban jibaaran waa qaybta qorista rasmiga ah; dhawaaqa dheer waa la maqli karaa hadalka dabiiciga ah.',
      review: 'PENDING_REVIEW',
    }),
  ],
  speaking: [],
  exercises: [
    exercise({ id: 's1-m2-l1-e1', type: 'flashcards', titleSo: 'Erayada labada qoraal', skill: 'akhris', objective: true, vocabIds: ['s1-haddii', 's1-dabcan', 's1-ammaan', 's1-ummadda', 's1-waddada', 's1-habboon', 's1-arrimaha', 's1-dammaanad'] }),
    exercise({
      id: 's1-m2-l1-e2', type: 'order-words', titleSo: 'Erayga saxda ah dhig', skill: 'akhris', objective: true,
      promptSo: 'Dooro qoraalka saxda ah ee erayga “if”.',
      tokens: ['haddii'], answer: ['haddii'], hintSo: 'Xarafka “d” waa laba jeer la qoraa.',
      translationEn: 'Choose the correct spelling of “if”.',
    }),
    exercise({
      id: 's1-m2-l1-e3', type: 'fill-blank', titleSo: 'Qorista buuxi', skill: 'qoris', objective: true,
      sentenceSo: '______ ay roobowdo, waddadu way qoyaan tahay.',
      options: ['Haddii', 'Hadii', 'Hadci'], answer: 'Haddii',
      translationEn: 'If it rains, the road is wet.',
    }),
    exercise({
      id: 's1-m2-l1-e4', type: 'match-word-picture', titleSo: 'Erayga iyo macnihiisa', skill: 'akhris', objective: true,
      pairs: [
        { left: 'waddada', right: 'the road', emoji: '🛣️' },
        { left: 'ammaan', right: 'safety', emoji: '🕊️' },
        { left: 'ummadda', right: 'the people', emoji: '👪' },
      ],
    }),
    exercise({ id: 's1-m2-l1-e5', type: 'read-answer', titleSo: 'Akhri oo ka jawaab', skill: 'akhris', objective: true, passageId: 's1-m2-l1-p1' }),
    exercise({ id: 's1-m2-l1-e6', type: 'spelling', titleSo: 'Qor erayga', skill: 'qoris', objective: true, word: 'haddii', hintSo: 'Micnihiisu waa “if”. Xarafka d laba jeer buu ku qoran yahay.', emoji: '🔤' }),
  ],
  reviewSo: [
    'Xaraf laba jeer la qoro wuxuu noqon karaa hal dhawaaq dheer.',
    'Tusaalooyin: haddii, ummadda, waddada, dabcan, ammaan.',
    'Isbarbardhigga erayo gaar ah wuxuu u baahan yahay dib-u-eegis macallin.',
  ],
  review: 'PENDING_REVIEW',
});

const m1: LearningModule = module({
  id: 's1-m1', stageId: s,
  titleSo: 'Xarfaha iyo dhawaaqyada', titleEn: 'Letters and sounds',
  descriptionSo: 'Shanta shaqal, laba iyo tobanka shibbane, dhawaaqyada gaarka ah iyo sh, dh, kh — dhammaan waxaa lagu baryaa casharradii asalka ahaa.',
  objectivesSo: ['Xaraf kasta aqoonsan', 'Dhawaaq kasta maqli', 'Erayo dhis oo akhri', 'Shaqal gaaban iyo dheer kala sooc'],
  lessons: legacyLessons,
  review: 'PENDING_REVIEW',
});

const m2: LearningModule = module({
  id: 's1-m2', stageId: s,
  titleSo: 'Dib-u-eegis qoraalka', titleEn: 'Spelling review',
  descriptionSo: 'Cashar dheeraad ah: xarfaha laban jibaaran (haddii, ummadda, waddada).',
  objectivesSo: ['Labada qoraal aqoonsan', 'Erayo laban jibaaran akhriyo oo qoro'],
  lessons: [doubled],
  review: 'PENDING_REVIEW',
});

export const stage1: Stage = {
  id: s, index: 1,
  titleSo: 'Xarfaha iyo Dhawaaqyada', titleEn: 'Letters and sounds',
  levelSo: 'Bilowga', levelEn: 'Beginner',
  descriptionSo: 'Baro xarfaha, dhawaaqyada iyo farsamada akhriska af-Soomaaliga. Casharradii 8 ee aasaasiga ahaa waa la ilaaliyey.',
  descriptionEn: 'Learn the Somali alphabet, sounds and phonics. The eight original lessons are preserved.',
  objectivesSo: ['26-ka xaraf aqoonsan', 'Sh, dh, kh hal unug yihiin fahmo', 'Shaqal gaaban iyo dheer kala sooc', 'Erayo dhis oo akhri', 'Xarfaha laban jibaaran baro'],
  emoji: '🔤',
  readingLevels: [1, 2],
  modules: [m1, m2],
  assessment: {
    id: 's1-assessment', titleSo: 'Tijaabada heerka 1', titleEn: 'Stage 1 assessment',
    items: [
      { id: 's1-a1', skill: 'akhris', promptSo: 'Kee waa hal unug oo laba xaraf ah?', options: ['sh', 'ba', 'no'], answer: 'sh', areaSo: 'Digraafyada' },
      { id: 's1-a2', skill: 'akhris', promptSo: 'Eraygee shaqalkiisu dheer yahay?', options: ['bur', 'buur', 'bar'], answer: 'buur', areaSo: 'Shaqallada' },
      { id: 's1-a3', skill: 'akhris', promptSo: '“Dhar” xarafkee ayuu ku bilaabmaa?', options: ['d', 'dh', 'sh'], answer: 'dh', areaSo: 'Digraafyada' },
      { id: 's1-a4', skill: 'akhris', promptSo: 'Eraygee xaraf laban jibaaran leh?', options: ['haddii', 'biyo', 'guri'], answer: 'haddii', areaSo: 'Xarfaha laban jibaaran' },
      { id: 's1-a5', skill: 'qoris', promptSo: 'Qorista saxda ah ee “if” waa…', options: ['haddii', 'hadii', 'hadci'], answer: 'haddii', areaSo: 'Xarfaha laban jibaaran' },
      { id: 's1-a6', skill: 'akhris', promptSo: 'Dhawaaqa “c” waa…', options: ['/ʕ/ dhuunta laga sameeyo', '/k/ gadaal', '/s/'], answer: '/ʕ/ dhuunta laga sameeyo', areaSo: 'Dhawaaqyada gaarka ah' },
    ],
    speakingBriefSo: 'Saddex eray oo kala duwan u dhawaaq: mid gaaban, mid dheer, iyo mid leh sh, dh ama kh. Macallinku wuu qiimeeyaa dhawaaqa.',
    speakingRubric: ['Pronunciation and intelligibility', 'Vowel length', 'Digraph recognition'],
  },
};
