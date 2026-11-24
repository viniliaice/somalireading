/**
 * Stage 4 — Naxwe iyo Fahamka Akhriska.
 * Grammar, sentence construction and reading comprehension: nouns, pronouns,
 * possession, verbs, focus patterns, negation and questions, demonstratives,
 * connectors, longer texts and comprehension skills.
 * Draft content — PENDING_REVIEW throughout; grammar explanations follow the
 * standard written language and document regional variation where it matters.
 */
import { exercise, grammar, lesson, module, passage, question, vocab, type Stage } from './types';

const s = 'stage-4';

const m1 = module({
  id: 's4-m1', stageId: s, titleSo: 'Magacyada', titleEn: 'Nouns',
  descriptionSo: 'Magacyada lab iyo dheddig, kuwa keli ah iyo kuwa badan, qaababka go’aamiyaha.',
  objectivesSo: ['Jinsiga magaca aqoonsan', 'Keli iyo badan kala sooc', 'Magaca go’aamiyaha ku daro'],
  lessons: [
    lesson({
      id: 's4-m1-l1', stageId: s, moduleId: 's4-m1', titleSo: 'Lab iyo dheddig', titleEn: 'Masculine and feminine nouns',
      objectivesSo: ['Magacyada jinsigooda aqoonsan', 'Tusaalooyinka baran: buug (lab), bisad (dheddig)', 'Go’aamiyaha -ka/-ku iyo -ta/-tu fahmo'],
      minutes: 25, skills: ['akhris', 'qoris'],
      vocab: [
        vocab(s, 's4-buug', 'buug', 'book (m.)', { emoji: '📗', exampleSo: 'Buuggu waa cusub yahay.', exampleEn: 'The book is new.' }),
        vocab(s, 's4-bisad', 'bisad', 'cat (f.)', { emoji: '🐈', exampleSo: 'Bisaddu way yar tahay.', exampleEn: 'The cat is small.' }),
        vocab(s, 's4-wiil', 'wiil', 'boy (m.)', { emoji: '👦', exampleSo: 'Wiilku wuu ciyaarayaa.', exampleEn: 'The boy is playing.' }),
        vocab(s, 's4-gabar', 'gabar', 'girl (f.)', { emoji: '👧', exampleSo: 'Gabadhu way akhriyaysaa.', exampleEn: 'The girl is reading.' }),
        vocab(s, 's4-guri-3', 'guri', 'house (m.)', { emoji: '🏠', exampleSo: 'Gurigu waa weyn yahay.', exampleEn: 'The house is big.' }),
        vocab(s, 's4-naag', 'naag', 'woman (f.)', { emoji: '👩', exampleSo: 'Naagtu waa macallimad.', exampleEn: 'The woman is a teacher.' }),
        vocab(s, 's4-buugaag-2', 'buugaag', 'books (plural)', { emoji: '📚', exampleSo: 'Buugaag badan ayaan haystaa.', exampleEn: 'I have many books.' }),
        vocab(s, 's4-guryo', 'guryo', 'houses (plural)', { emoji: '🏘️', exampleSo: 'Guryo cusub ayaa la dhisay.', exampleEn: 'New houses were built.' }),
      ],
      dialogues: [], passages: [],
      grammar: [
        grammar({
          id: 's4-m1-l1-g1', titleSo: 'Jinsiga magaca', titleEn: 'Noun gender',
          explanationSo: 'Magac kasta wuxuu leeyahay jins: lab ama dheddig. Waxaa lagu aqoonsadaa qaabka go’aamiyaha: magaca lab wuxuu qaataa -ku/-ka, magaca dheddig wuxuu qaataa -tu/-ta.',
          explanationEn: 'Every noun has a gender: masculine or feminine. The definite marker shows it: masculine nouns take -ku/-ka, feminine nouns take -tu/-ta.',
          examples: [
            { so: 'buuggu / buugga (lab)', en: 'the book (m.)' },
            { so: 'bisaddu / bisadda (dheddig)', en: 'the cat (f.)' },
            { so: 'gurigu / guriga (lab)', en: 'the house (m.)' },
            { so: 'naagtu / naagta (dheddig)', en: 'the woman (f.)' },
          ],
          dialectNoteSo: 'Dadka qaarkood jinsiga magacyada si isku mid ah uma isticmaalaan; waa in macallinku tusaalooyinka deegaanka ku daro.',
          review: 'PENDING_REVIEW',
        }),
        grammar({
          id: 's4-m1-l1-g2', titleSo: 'Keli iyo badan', titleEn: 'Singular and plural',
          explanationSo: 'Plural-ku wuxuu noqon karaa: -yaal (dugsiyada? — dugsiyo), -o (guryo), -ayaal (carruurta qaarkood), ama beddel gudud ah (qof → dad, ilmo → carruur).',
          explanationEn: 'Plurals can be: -yaal, -o, -ayaal, or an internal change (qof → dad “people”, ilmo → carruur “children”).',
          examples: [
            { so: 'buug → buugaag', en: 'book → books' },
            { so: 'guri → guryo', en: 'house → houses' },
            { so: 'qof → dad', en: 'person → people' },
            { so: 'ilmo → carruur', en: 'child → children' },
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      speaking: [],
      exercises: [
        exercise({ id: 's4-m1-l1-e1', type: 'flashcards', titleSo: 'Magacyada', skill: 'akhris', objective: true, vocabIds: ['s4-buug', 's4-bisad', 's4-wiil', 's4-gabar', 's4-guri-3', 's4-naag', 's4-buugaag-2', 's4-guryo'] }),
        exercise({ id: 's4-m1-l1-e2', type: 'match-qa', titleSo: 'Keli iyo badan', skill: 'akhris', objective: true, pairs: [{ left: 'buug', right: 'buugaag' }, { left: 'guri', right: 'guryo' }, { left: 'qof', right: 'dad' }, { left: 'ilmo', right: 'carruur' }] }),
        exercise({ id: 's4-m1-l1-e3', type: 'fill-blank', titleSo: 'Go’aamiyaha', skill: 'qoris', objective: true, sentenceSo: 'Bisadd____ way yar tahay.', options: ['u', 'a', 'ta'], answer: 'u', hintSo: 'Bisad waa dheddig; go’aamiyuhu waa -tu/-ta.', translationEn: 'The cat (f.) is small.' }),
        exercise({ id: 's4-m1-l1-e4', type: 'order-words', titleSo: 'Jumlad', skill: 'qoris', objective: true, tokens: ['Buuggu', 'waa', 'cusub', 'yahay'], answer: ['Buuggu', 'waa', 'cusub', 'yahay'], translationEn: 'The book is new.' }),
      ],
      reviewSo: ['Lab: -ku/-ka. Dheddig: -tu/-ta.', 'Plural: buugaag, guryo, dad, carruur.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m2 = module({
  id: 's4-m2', stageId: s, titleSo: 'Magac-u-yaallada', titleEn: 'Pronouns',
  descriptionSo: 'Aniga, adiga, isaga, iyada, annaga, innaga, idinka, iyaga — iyo farqiga “annaga” iyo “innaga”.',
  objectivesSo: ['Magac-u-yaallada aasaasiga ah baran', 'Farqiga annaga/innaga fahmo', 'Jumlad ku isticmaali'],
  lessons: [
    lesson({
      id: 's4-m2-l1', stageId: s, moduleId: 's4-m2', titleSo: 'Aniga iyo kuwa kale', titleEn: 'I and the others',
      objectivesSo: ['Sideedda magac-u-yaal baran', '“Annaga” (innaga oo jira) iyo “innaga” (adiga oo la jira) kala sooc', 'Jumladaha ku isticmaali'],
      minutes: 22, skills: ['akhris', 'qoris', 'hadal'],
      vocab: [
        vocab(s, 's4-aniga', 'aniga', 'I / me', { emoji: '🙋', exampleSo: 'Anigu waan akhriyaa.', exampleEn: 'I read.' }),
        vocab(s, 's4-adiga', 'adiga', 'you (singular)', { emoji: '👉', exampleSo: 'Adigu waad qoraysaa.', exampleEn: 'You write.' }),
        vocab(s, 's4-isaga', 'isaga', 'he / him', { emoji: '👦', exampleSo: 'Isagu wuu ciyaarayaa.', exampleEn: 'He plays.' }),
        vocab(s, 's4-iyada', 'iyada', 'she / her', { emoji: '👧', exampleSo: 'Iyadu way akhriyaysaa.', exampleEn: 'She reads.' }),
        vocab(s, 's4-annaga', 'annaga', 'we (inclusive)', { emoji: '👨‍👩‍👧‍👦', exampleSo: 'Annagu waan baranaynaa.', exampleEn: 'We (all of us) learn.' }),
        vocab(s, 's4-innaga', 'innaga', 'we (exclusive)', { emoji: '👪', exampleSo: 'Innagu waan tagnay.', exampleEn: 'We (not you) went.' }),
        vocab(s, 's4-idinka', 'idinka', 'you (plural)', { emoji: '👥', exampleSo: 'Idinku waad barataan.', exampleEn: 'You (all) learn.' }),
        vocab(s, 's4-iyaga', 'iyaga', 'they / them', { emoji: '👫', exampleSo: 'Iyagu way shaqeeyaan.', exampleEn: 'They work.' }),
      ],
      dialogues: [], passages: [],
      grammar: [
        grammar({
          id: 's4-m2-l1-g1', titleSo: 'Annaga iyo innaga', titleEn: 'Inclusive and exclusive “we”',
          explanationSo: 'Af-Soomaaligu wuxuu kala saaraa laba “annaga”: “Annaga” waxaa ku jira qofka aad la hadlayso (inclusive); “innaga” ma jiraan (exclusive). Tani waa farqi dabiici ah oo afafka qaar ka mid ah jira.',
          explanationEn: 'Somali distinguishes two kinds of “we”: annaga includes the person you are talking to; innaga excludes them. This is a natural feature also found in other languages.',
          examples: [
            { so: 'Annagu wada baranno! (adiga iyo aniga)', en: 'Let us all learn! (you and I)' },
            { so: 'Innagu waan tagnay, adiguna waad joogtay.', en: 'We (not you) went, and you stayed.' },
          ],
          dialectNoteSo: 'Isticmaalka annaga/innaga wuxuu ku kala duwan yahay deegaannada; qaarkood “innaga” waxay u isticmaalaan “annaga” guud ahaan.',
          review: 'PENDING_REVIEW',
        }),
      ],
      speaking: [{ id: 's4-m2-l1-s1', type: 'open-speaking', promptSo: 'Qoyskaaga ku dar magac-u-yaallada: aniga, hooyaday (iyada), aabbahay (isaga), annaga.', promptEn: 'Use pronouns in a family description.', hintsSo: ['Anigu waan…', 'Iyadu way…', 'Annagu waan…'], rubricFocus: ['Sentence formation', 'Vocabulary'] }],
      exercises: [
        exercise({ id: 's4-m2-l1-e1', type: 'flashcards', titleSo: 'Magac-u-yaallada', skill: 'akhris', objective: true, vocabIds: ['s4-aniga', 's4-adiga', 's4-isaga', 's4-iyada', 's4-annaga', 's4-innaga', 's4-idinka', 's4-iyaga'] }),
        exercise({ id: 's4-m2-l1-e2', type: 'match-qa', titleSo: 'Magac-u-yaalka iyo ficilka', skill: 'akhris', objective: true, pairs: [{ left: 'aniga', right: 'waan akhriyaa' }, { left: 'adiga', right: 'waad qoraysaa' }, { left: 'isaga', right: 'wuu ciyaarayaa' }, { left: 'iyada', right: 'way akhriyaysaa' }, { left: 'iyaga', right: 'way shaqeeyaan' }] }),
        exercise({ id: 's4-m2-l1-e3', type: 'fill-blank', titleSo: 'Magac-u-yaalka dooro', skill: 'qoris', objective: true, sentenceSo: '______ wada baranno!', options: ['Annaga', 'Innaga', 'Iyaga'], answer: 'Annaga', translationEn: 'Let us all learn!' }),
      ],
      reviewSo: ['Aniga, adiga, isaga, iyada, annaga, innaga, idinka, iyaga.', 'Annaga = innaga oo adiga ku jirto; innaga = aniga iyo kuwa kale oo adiga aan ahayn.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m3 = module({
  id: 's4-m3', stageId: s, titleSo: 'Lahaanshaha', titleEn: 'Possession',
  descriptionSo: 'Buuggayga, gurigaaga, qoyskiisa, dugsigeeda, afkeenna.',
  objectivesSo: ['Lahaanshaha ku dar jumlad', 'Qaabka -kayga/-kaaga/-kiisa/-keeda baran', 'Su’aalo lahaansho weydiisan'],
  lessons: [
    lesson({
      id: 's4-m3-l1', stageId: s, moduleId: 's4-m3', titleSo: 'Kan ma leh?', titleEn: 'Whose is it?',
      objectivesSo: ['Magaca + ra’yiga lahaanshaha isticmaali', 'Lahaanshaha qoyska ku dar', 'Su’aasha lahaanshaha weydiisan'],
      minutes: 22, skills: ['akhris', 'qoris', 'hadal'],
      vocab: [
        vocab(s, 's4-buuggayga', 'buuggayga', 'my book', { emoji: '📗', exampleSo: 'Kani waa buuggayga.', exampleEn: 'This is my book.' }),
        vocab(s, 's4-gurigaaga', 'gurigaaga', 'your house', { emoji: '🏠', exampleSo: 'Gurigaagu waa weyn yahay.', exampleEn: 'Your house is big.' }),
        vocab(s, 's4-qoyskiisa', 'qoyskiisa', 'his family', { emoji: '👨‍👩‍👧‍👦', exampleSo: 'Qoyskiisu wuu fiican yahay.', exampleEn: 'His family is fine.' }),
        vocab(s, 's4-dugsigeeda', 'dugsigeeda', 'her school', { emoji: '🏫', exampleSo: 'Dugsigeedu waa dhow yahay.', exampleEn: 'Her school is near.' }),
        vocab(s, 's4-afkeenna', 'afkeenna', 'our language', { emoji: '🗣️', exampleSo: 'Afkeennu waa qurux badan yahay.', exampleEn: 'Our language is beautiful.' }),
        vocab(s, 's4-magacooda', 'magacooda', 'their name', { emoji: '🏷️', exampleSo: 'Magacoodu waa cusub yahay.', exampleEn: 'Their name is new.' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's4-m3-l1-p1', titleSo: 'Waxyaalaha ardayda', titleEn: 'Students’ things', level: 4,
          purposeSo: 'Lahaanshaha akhri.', purposeEn: 'Read about possession.',
          so: 'Kani waa buuggayga, kaaasna waa buuggaaga. Qalinku waa midka Cabdi, qalinka Maryanna waa cas. Afkeenna waa Af-Soomaali. Dugsigeenna waa weyn yahay, fasalladuna waa nadiif yihiin.',
          en: 'This is my book and that one is your book. The pen is Cabdi’s, and Maryan’s pen is red. Our language is Somali. Our school is big and the classrooms are clean.',
          glossary: [{ word: 'cas', meaning: 'red' }],
          questions: [
            question('s4-m3-l1-p1-q1', 'detail', 'Kee leh buugga koowaad?', 'Who owns the first book?', ['Cabdi', 'qofka hadlaya', 'Maryan'], 'qofka hadlaya', 'the speaker'),
            question('s4-m3-l1-p1-q2', 'detail', 'Midabkee ayaa qalinka Maryan?', 'What colour is Maryan’s pen?', ['cas', 'cagaar', 'buluug'], 'cas', 'red'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [grammar({
        id: 's4-m3-l1-g1', titleSo: 'Lahaanshaha', titleEn: 'Possessive suffixes',
        explanationSo: 'Lahaanshaha waxaa lagu daraa dhamaadka magaca: -kayga (my), -kaaga (your), -kiisa (his), -keeda (her), -keenna/-kayaga (our), -kiin (your pl.), -kooda (their). Go’aamiyuhu wuxuu la socdaa jinsiga iyo kiiska.',
        explanationEn: 'Possession is marked with suffixes on the noun: -kayga (my), -kaaga (your), -kiisa (his), -keeda (her), -keenna (our), -kiin (your pl.), -kooda (their). The definite marker follows the noun’s gender and case.',
        examples: [
          { so: 'buuggayga / buuggaaga / buuggiisa', en: 'my book / your book / his book' },
          { so: 'qoyskeenna / qoyskooda', en: 'our family / their family' },
        ],
        review: 'PENDING_REVIEW',
      })],
      speaking: [],
      exercises: [
        exercise({ id: 's4-m3-l1-e1', type: 'match-qa', titleSo: 'Lahaanshaha', skill: 'akhris', objective: true, pairs: [{ left: 'my book', right: 'buuggayga' }, { left: 'your house', right: 'gurigaaga' }, { left: 'her school', right: 'dugsigeeda' }, { left: 'our language', right: 'afkeenna' }] }),
        exercise({ id: 's4-m3-l1-e2', type: 'read-answer', titleSo: 'Waxyaalaha ardayda', skill: 'akhris', objective: true, passageId: 's4-m3-l1-p1' }),
        exercise({ id: 's4-m3-l1-e3', type: 'fill-blank', titleSo: 'Buuxi', skill: 'qoris', objective: true, sentenceSo: 'Kani waa buugg______ (my).', options: ['ayga', 'iisa', 'ooda'], answer: 'ayga', translationEn: 'This is my book.' }),
      ],
      reviewSo: ['-kayga my, -kaaga your, -kiisa his, -keeda her.', 'Afkeenna = our language.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m4 = module({
  id: 's4-m4', stageId: s, titleSo: 'Falalka', titleEn: 'Verbs',
  descriptionSo: 'Asalka falalka, wakhtiyada: hadda, hore, mustaqbal, amar iyo codsi.',
  objectivesSo: ['Ficilka iyo asalkiisa aqoonsan', 'Wakhtiyada kala duwan ku hadal', 'Amar iyo codsi samee'],
  lessons: [
    lesson({
      id: 's4-m4-l1', stageId: s, moduleId: 's4-m4', titleSo: 'Wakhtiyada', titleEn: 'Tenses',
      objectivesSo: ['Ficilka hadda iyo joogtada', 'Dhacdada hore', 'Mustaqbalka iyo qorshaha', 'Amarka iyo codsiga'],
      minutes: 28, skills: ['akhris', 'qoris', 'hadal'],
      vocab: [
        vocab(s, 's4-tagay', 'tagay', 'went (past)', { emoji: '🚶', exampleSo: 'Waan tagay suuqa.', exampleEn: 'I went to the market.' }),
        vocab(s, 's4-imanaya', 'imanaya', 'coming (present)', { emoji: '🏃', exampleSo: 'Wuu imanayaa.', exampleEn: 'He is coming.' }),
        vocab(s, 's4-doonaa', 'doonaa', 'will (future)', { emoji: '🔮', exampleSo: 'Waan iman doonaa.', exampleEn: 'I will come.' }),
        vocab(s, 's4-qorshe', 'qorshe', 'plan', { emoji: '📋', exampleSo: 'Qorshuhu waa inaan barto.', exampleEn: 'The plan is that I learn.' }),
        vocab(s, 's4-codsi', 'codsi', 'request', { emoji: '🙏', exampleSo: 'Codsi ayaan qabaa.', exampleEn: 'I have a request.' }),
        vocab(s, 's4-ku-celi-2', 'ku celi', 'repeat', { emoji: '🔄', exampleSo: 'Fadlan ku celi.', exampleEn: 'Please repeat.' }),
      ],
      dialogues: [], passages: [],
      grammar: [
        grammar({
          id: 's4-m4-l1-g1', titleSo: 'Wakhtiyada ficilka', titleEn: 'Verb tenses',
          explanationSo: 'Hadda/joogtada: waan tagaa (I go / I am going). Hore: waan tagay (I went). Mustaqbal: waan tagi doonaa (I will go) ama waxaan rabaa inaan tago (I want to go). Amar: tag! (go!). Codsi: fadlan keen (please bring).',
          explanationEn: 'Present/habitual: waan tagaa. Past: waan tagay. Future: waan tagi doonaa or waxaan rabaa inaan tago. Command: tag! Request: fadlan keen.',
          examples: [
            { so: 'Waan akhriyaa buug (hadda/joogto).', en: 'I read a book.' },
            { so: 'Waan akhriyay buug (hore).', en: 'I read a book (past).' },
            { so: 'Waan akhriyi doonaa buug (mustaqbal).', en: 'I will read a book.' },
            { so: 'Akhri! (amar)', en: 'Read!' },
          ],
          commonErrors: [{ wrong: 'Waan tagayaa.', right: 'Waan tagaa / waan imanayaa.', noteSo: 'Wakhtiga hadda waa qaab -aa, hore waa -ay.' }],
          review: 'PENDING_REVIEW',
        }),
      ],
      speaking: [{ id: 's4-m4-l1-s1', type: 'open-speaking', promptSo: 'Saddex jumlad: waxa aad shalay sameysay, maanta samaynayso, berri samayn doonto.', promptEn: 'Say three sentences: yesterday, today, tomorrow.', hintsSo: ['Shalay waan tagay…', 'Maanta waan…', 'Berri waan… doonaa.'], rubricFocus: ['Sentence formation', 'Fluency'] }],
      exercises: [
        exercise({ id: 's4-m4-l1-e1', type: 'match-qa', titleSo: 'Wakhtiga iyo ficilka', skill: 'akhris', objective: true, pairs: [{ left: 'Waan tagay', right: 'hore' }, { left: 'Waan tagaa', right: 'hadda/joogto' }, { left: 'Waan tagi doonaa', right: 'mustaqbal' }, { left: 'Tag!', right: 'amar' }] }),
        exercise({ id: 's4-m4-l1-e2', type: 'fill-blank', titleSo: 'Wakhtiga dooro', skill: 'qoris', objective: true, sentenceSo: 'Shalay waan ________ suuqa.', options: ['tagay', 'tagaa', 'tagi doonaa'], answer: 'tagay', translationEn: 'Yesterday I went to the market.' }),
        exercise({ id: 's4-m4-l1-e3', type: 'order-words', titleSo: 'Mustaqbalka', skill: 'qoris', objective: true, tokens: ['Waan', 'iman', 'doonaa'], answer: ['Waan', 'iman', 'doonaa'], translationEn: 'I will come.' }),
      ],
      reviewSo: ['Hadda: -aa. Hore: -ay. Mustaqbal: … doonaa.', 'Amar: ficilka kaliya.'],
      review: 'PENDING_REVIEW',
    }),
    lesson({
      id: 's4-m4-l2', stageId: s, moduleId: 's4-m4', titleSo: 'Ficilada maalinlaha ah', titleEn: 'Everyday verbs',
      objectivesSo: ['Ficilada maalinlaha ah baran', 'Ficil iyo wakhti isku xidh', 'Jumlad ficil leh dhisi'],
      minutes: 20, skills: ['akhris', 'qoris', 'hadal'],
      vocab: [
        vocab(s, 's4-akhriyay', 'akhriyay', 'read (past)', { emoji: '📖', exampleSo: 'Buug ayaan akhriyay.', exampleEn: 'I read a book.' }),
        vocab(s, 's4-qoray', 'qoray', 'wrote (past)', { emoji: '✍️', exampleSo: 'Warqad ayaan qoray.', exampleEn: 'I wrote a letter.' }),
        vocab(s, 's4-cunay', 'cunay', 'ate (past)', { emoji: '🍽️', exampleSo: 'Cunto ayaan cunay.', exampleEn: 'I ate food.' }),
        vocab(s, 's4-cabay', 'cabay', 'drank (past)', { emoji: '🥤', exampleSo: 'Biyo ayaan cabay.', exampleEn: 'I drank water.' }),
        vocab(s, 's4-arkay', 'arkay', 'saw (past)', { emoji: '👀', exampleSo: 'Waxaan arkay saaxiibkay.', exampleEn: 'I saw my friend.' }),
        vocab(s, 's4-hadlay', 'hadlay', 'spoke (past)', { emoji: '💬', exampleSo: 'Waan hadlay macallinka.', exampleEn: 'I spoke with the teacher.' }),
      ],
      dialogues: [], passages: [],
      grammar: [],
      speaking: [],
      exercises: [
        exercise({ id: 's4-m4-l2-e1', type: 'flashcards', titleSo: 'Ficilada', skill: 'akhris', objective: true, vocabIds: ['s4-akhriyay', 's4-qoray', 's4-cunay', 's4-cabay', 's4-arkay', 's4-hadlay'] }),
        exercise({ id: 's4-m4-l2-e2', type: 'fill-blank', titleSo: 'Ficilka dooro', skill: 'qoris', objective: true, sentenceSo: 'Waxaan ________ saaxiibkay. (saw)', options: ['arkay', 'cunay', 'qoray'], answer: 'arkay', translationEn: 'I saw my friend.' }),
        exercise({ id: 's4-m4-l2-e3', type: 'match-qa', titleSo: 'Ficilka iyo macnihiisa', skill: 'akhris', objective: true, pairs: [{ left: 'akhriyay', right: 'read' }, { left: 'qoray', right: 'wrote' }, { left: 'cabay', right: 'drank' }] }),
      ],
      reviewSo: ['Ficilada: akhriyay, qoray, cunay, cabay, arkay, hadlay.', 'Ficilku wuxuu sheegaa waxa la sameeyay.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m5 = module({
  id: 's4-m5', stageId: s, titleSo: 'Weedhaha iyo Habka Jumladaha', titleEn: 'Sentences and focus patterns',
  descriptionSo: 'Waa, baa, ayaa iyo waxaa — sida loo muujiyo waxa jumladu ka hadlayso.',
  objectivesSo: ['Waa, baa, ayaa isticmaali karo', 'Fikirka jumladu muujinayo aqoonsan', 'Jumladaha kala duwan dhisi'],
  lessons: [
    lesson({
      id: 's4-m5-l1', stageId: s, moduleId: 's4-m5', titleSo: 'Waa, baa, ayaa', titleEn: 'Focus particles',
      objectivesSo: ['Waa ku dar jumlad sheeko ah', 'Baa iyo ayaa ku dar jumlad diiradda saaraysa', 'Farqiga u dhexeeya fahmo'],
      minutes: 25, skills: ['akhris', 'qoris'],
      vocab: [
        vocab(s, 's4-diirad', 'diirad', 'focus', { emoji: '🎯', exampleSo: 'Jumladu waxay leedahay diirad.', exampleEn: 'A sentence has a focus.' }),
        vocab(s, 's4-sheeko', 'sheeko', 'statement / story', { emoji: '💬', exampleSo: 'Tani waa sheeko.', exampleEn: 'This is a story.' }),
      ],
      dialogues: [], passages: [],
      grammar: [
        grammar({
          id: 's4-m5-l1-g1', titleSo: 'Waa, baa, ayaa', titleEn: 'Waa, baa, ayaa',
          explanationSo: '“Waa” waxay ku dhacdaa bilowga jumlad sheeko ah: Baashe waa yimid. “Baa” iyo “ayaa” waxay diiradda saaraan erayga ka horreeya: Baashe baa yimid / Baashe ayaa yimid (Baashe is the one who came). Waxaa jira qaabab kale oo “waxaa” leh: Waxaan arkay baabuur.',
          explanationEn: '“Waa” opens a plain statement: Baashe waa yimid. “Baa” and “ayaa” focus the word before them: Baashe baa/ayaa yimid. There are also “waxaa” focus constructions: Waxaan arkay baabuur (I saw a car).',
          examples: [
            { so: 'Baashe waa yimid.', en: 'Baashe came.' },
            { so: 'Baashe baa yimid.', en: 'It was Baashe who came.' },
            { so: 'Baashe ayaa yimid.', en: 'Baashe is the one who came.' },
            { so: 'Waxaan arkay baabuur.', en: 'I saw a car.' },
          ],
          dialectNoteSo: 'Isticmaalka baa iyo ayaa wuxuu ku kala duwan yahay hadalka maalinlaha ah; ujeeddadu waa diiradda jumladu leedahay.',
          review: 'PENDING_REVIEW',
        }),
      ],
      speaking: [],
      exercises: [
        exercise({ id: 's4-m5-l1-e1', type: 'match-qa', titleSo: 'Diiradda', skill: 'akhris', objective: true, pairs: [{ left: 'Baashe waa yimid', right: 'sheeko caadi ah' }, { left: 'Baashe baa yimid', right: 'diirad: Baashe' }, { left: 'Waxaan arkay baabuur', right: 'waxaa fikir leh' }] }),
        exercise({ id: 's4-m5-l1-e2', type: 'fill-blank', titleSo: 'Doorsoomaha', skill: 'qoris', objective: true, sentenceSo: 'Baashe ________ yimid (diirad).', options: ['waa', 'baa', 'iyo'], answer: 'baa', translationEn: 'It was Baashe who came.' }),
        exercise({ id: 's4-m5-l1-e3', type: 'order-words', titleSo: 'Jumlad dhig', skill: 'qoris', objective: true, tokens: ['Baashe', 'waa', 'yimid'], answer: ['Baashe', 'waa', 'yimid'], translationEn: 'Baashe came.' }),
      ],
      reviewSo: ['Waa = sheeko caadi ah.', 'Baa/ayaa = diiradda erayga hore.', 'Waxaa… = qaab fikir leh.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m6 = module({
  id: 's4-m6', stageId: s, titleSo: 'Diidmada iyo Su’aalaha', titleEn: 'Negation and questions',
  descriptionSo: 'Jumlad togan, diidan, su’aalo iyo jawaabo kooban iyo faahfaahsan.',
  objectivesSo: ['Diidmo sax ah samee', 'Su’aalo weydii', 'Jawaabo kooban iyo dheer bixi'],
  lessons: [
    lesson({
      id: 's4-m6-l1', stageId: s, moduleId: 's4-m6', titleSo: 'Haa iyo maya — si faahfaahsan', titleEn: 'Yes and no — in depth',
      objectivesSo: ['Diidmada hadda iyo hore baran', 'Su’aalaha “ma…?” isticmaali', 'Jawaab kooban bixi'],
      minutes: 22, skills: ['akhris', 'qoris', 'hadal'],
      vocab: [
        vocab(s, 's4-ma-tagin', 'ma tagin', 'did not go', { emoji: '❌', exampleSo: 'Maya, ma tagin.', exampleEn: 'No, I did not go.' }),
        vocab(s, 's4-ma-rabo', 'ma rabo', 'do not want', { emoji: '🚫', exampleSo: 'Maya, ma rabo.', exampleEn: 'No, I do not want.' }),
        vocab(s, 's4-ma-aha', 'ma aha', 'is not', { emoji: '➖', exampleSo: 'Kani ma aha buug.', exampleEn: 'This is not a book.' }),
        vocab(s, 's4-haa-2', 'haa, sidaas', 'yes, exactly', { emoji: '✅', exampleSo: 'Haa, sidaas ayay tahay.', exampleEn: 'Yes, that is right.' }),
      ],
      dialogues: [], passages: [],
      grammar: [grammar({
        id: 's4-m6-l1-g1', titleSo: 'Diidmada', titleEn: 'Negation',
        explanationSo: 'Diidmada hadda/joogtada: “ma” + ficilka: ma tago, ma rabo. Hore: “ma” + ficilka + -in: ma tagin, ma imanin. Jumladaha “waa” leh: Kani ma aha buug.',
        explanationEn: 'Present negation: “ma” + verb: ma tago, ma rabo. Past negation: “ma” + verb + -in: ma tagin. With “waa” sentences: Kani ma aha buug.',
        examples: [
          { so: 'Waan rabaa / ma rabo.', en: 'I want / I do not want.' },
          { so: 'Waan tagay / ma tagin.', en: 'I went / I did not go.' },
        ],
        review: 'PENDING_REVIEW',
      })],
      speaking: [{ id: 's4-m6-l1-s1', type: 'listen-respond', promptSo: 'Su’aal maqli oo togan ama diidan ka jawaab.', promptEn: 'Hear a question and answer positively or negatively.', phraseSo: 'Ma rabtaa biyo?', phraseEn: 'Do you want water?', rubricFocus: ['Listening response', 'Sentence formation'] }],
      exercises: [
        exercise({ id: 's4-m6-l1-e1', type: 'match-qa', titleSo: 'Togan iyo diidan', skill: 'akhris', objective: true, pairs: [{ left: 'Waan rabaa', right: 'ma rabo' }, { left: 'Waan tagay', right: 'ma tagin' }, { left: 'Waa buug', right: 'ma aha buug' }] }),
        exercise({ id: 's4-m6-l1-e2', type: 'fill-blank', titleSo: 'Diidmada', skill: 'qoris', objective: true, sentenceSo: 'Maya, shalay suuqa ma ________.', options: ['tagin', 'tagay', 'tagaa'], answer: 'tagin', translationEn: 'No, yesterday I did not go to the market.' }),
      ],
      reviewSo: ['Hadda: ma + ficil. Hore: ma + ficil + in.', 'Kani ma aha buug.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m7 = module({
  id: 's4-m7', stageId: s, titleSo: 'Tilmaameyaasha iyo Meelaynta', titleEn: 'Demonstratives and place',
  descriptionSo: 'Kan/kaas, halkan/halkaas, kor/hoos/gudaha/dibadda.',
  objectivesSo: ['Tilmaameyaasha isticmaali', 'Meelaynta sheegi', 'Jumlad meel leh dhisi'],
  lessons: [
    lesson({
      id: 's4-m7-l1', stageId: s, moduleId: 's4-m7', titleSo: 'Kan iyo kaas', titleEn: 'This and that',
      objectivesSo: ['Kan (dhow) iyo kaas (fog) kala sooc', 'Halkan iyo halkaas isticmaali', 'Meelaynta: kor, hoos, gudaha, dibadda'],
      minutes: 20, skills: ['akhris', 'qoris', 'hadal'],
      vocab: [
        vocab(s, 's4-kan', 'kan', 'this (m.)', { emoji: '👇', exampleSo: 'Kani waa buug.', exampleEn: 'This is a book.' }),
        vocab(s, 's4-tani', 'tani', 'this (f.)', { emoji: '👇', exampleSo: 'Tani waa guri.', exampleEn: 'This is a house.' }),
        vocab(s, 's4-kaas', 'kaas', 'that (m.)', { emoji: '👉', exampleSo: 'Kaasu waa buug.', exampleEn: 'That is a book.' }),
        vocab(s, 's4-taas', 'taas', 'that (f.)', { emoji: '👉', exampleSo: 'Taasu waa guri.', exampleEn: 'That is a house.' }),
        vocab(s, 's4-kor', 'kor', 'on / above', { emoji: '⬆️', exampleSo: 'Buuggu wuxuu yahay miiska kor.', exampleEn: 'The book is on the table.' }),
        vocab(s, 's4-hoos', 'hoos', 'under', { emoji: '⬇️', exampleSo: 'Bisaddu way taallaa miiska hoos.', exampleEn: 'The cat is under the table.' }),
        vocab(s, 's4-gudaha-2', 'gudaha', 'inside', { emoji: '🏠', exampleSo: 'Guriga gudahiisa.', exampleEn: 'Inside the house.' }),
        vocab(s, 's4-dibadda', 'dibadda', 'outside', { emoji: '🌳', exampleSo: 'Dibadda ayaan ciyaarayaa.', exampleEn: 'I play outside.' }),
      ],
      dialogues: [], passages: [],
      grammar: [grammar({
        id: 's4-m7-l1-g1', titleSo: 'Meelaynta', titleEn: 'Location',
        explanationSo: 'Meelaynta waxaa lagu muujiyaa erayo ka dib magaca: miiska kor (on the table), miiska hoos (under the table), guriga gudahiisa (inside the house), guriga dibaddiisa (outside the house).',
        explanationEn: 'Location uses words after the noun: miiska kor (on the table), miiska hoos (under), guriga gudahiisa (inside the house), guriga dibaddiisa (outside).',
        examples: [{ so: 'Buuggu wuxuu yahay miiska kor.', en: 'The book is on the table.' }, { so: 'Carruurtu way ciyaarayaan guriga dibaddiisa.', en: 'The children are playing outside the house.' }],
        review: 'PENDING_REVIEW',
      })],
      speaking: [],
      exercises: [
        exercise({ id: 's4-m7-l1-e1', type: 'match-word-picture', titleSo: 'Meelaynta', skill: 'akhris', objective: true, pairs: [{ left: 'kor', right: 'on', emoji: '⬆️' }, { left: 'hoos', right: 'under', emoji: '⬇️' }, { left: 'gudaha', right: 'inside', emoji: '🏠' }, { left: 'dibadda', right: 'outside', emoji: '🌳' }] }),
        exercise({ id: 's4-m7-l1-e2', type: 'fill-blank', titleSo: 'Meelaynta', skill: 'qoris', objective: true, sentenceSo: 'Buuggu wuxuu yahay miiska ________.', options: ['kor', 'hoos', 'dibadda'], answer: 'kor', translationEn: 'The book is on the table.' }),
        exercise({ id: 's4-m7-l1-e3', type: 'order-words', titleSo: 'Jumlad meel leh', skill: 'qoris', objective: true, tokens: ['Bisaddu', 'way', 'taallaa', 'miiska', 'hoos'], answer: ['Bisaddu', 'way', 'taallaa', 'miiska', 'hoos'], translationEn: 'The cat is under the table.' }),
      ],
      reviewSo: ['Kan/kaas, tani/taas.', 'Kor, hoos, gudaha, dibadda.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m8 = module({
  id: 's4-m8', stageId: s, titleSo: 'Isku-xirayaasha', titleEn: 'Connectors',
  descriptionSo: 'Iyo, laakiin, maxaa yeelay, marka, haddii, ka hor, ka dib.',
  objectivesSo: ['Fikradaha isku xidhi karo', 'Sababta iyo waqtiga muujin', 'Jumlad dhaadheer dhisi'],
  lessons: [
    lesson({
      id: 's4-m8-l1', stageId: s, moduleId: 's4-m8', titleSo: 'Fikradaha isku xidh', titleEn: 'Joining ideas',
      objectivesSo: ['Isku-xirayaasha aasaasiga ah baran', 'Jumlad laba qaybood ah dhisi', 'Sabab iyo waqti muujin'],
      minutes: 22, skills: ['akhris', 'qoris'],
      vocab: [
        vocab(s, 's4-iyo', 'iyo', 'and', { emoji: '➕', exampleSo: 'Buug iyo qalin.', exampleEn: 'A book and a pen.' }),
        vocab(s, 's4-laakiin', 'laakiin / laakiinse', 'but', { emoji: '🔄', exampleSo: 'Waan rabay, laakiin ma iman.', exampleEn: 'I wanted to, but I did not come.' }),
        vocab(s, 's4-maxaa-yeelay', 'maxaa yeelay', 'because', { emoji: '❓', exampleSo: 'Guriga ayaan joogaa maxaa yeelay waan xanuunsanahay.', exampleEn: 'I am home because I am sick.' }),
        vocab(s, 's4-marka', 'marka', 'when / then', { emoji: '⏱️', exampleSo: 'Marka aad timaado, i yeedh.', exampleEn: 'When you come, call me.' }),
        vocab(s, 's4-haddii-2', 'haddii', 'if', { emoji: '🔀', exampleSo: 'Haddii aad rabto, aan baranno.', exampleEn: 'If you want, let us learn.' }),
        vocab(s, 's4-ka-hor', 'ka hor', 'before', { emoji: '⏮️', exampleSo: 'Casharka ka hor, aan akhriyo.', exampleEn: 'Before the lesson, let me read.' }),
        vocab(s, 's4-ka-dib', 'ka dib', 'after', { emoji: '⏭️', exampleSo: 'Casharka ka dib, waan ciyaaraa.', exampleEn: 'After the lesson, I play.' }),
      ],
      dialogues: [], passages: [],
      grammar: [grammar({
        id: 's4-m8-l1-g1', titleSo: 'Isku-xirayaasha', titleEn: 'Connectors',
        explanationSo: 'Isku-xirayaashu waxay isu keenaan laba fikrad: iyo (and), laakiin (but), maxaa yeelay (because), marka (when), haddii (if), ka hor (before), ka dib (after).',
        explanationEn: 'Connectors join two ideas: iyo (and), laakiin (but), maxaa yeelay (because), marka (when), haddii (if), ka hor (before), ka dib (after).',
        examples: [
          { so: 'Waan akhriyay, laakiin ma qorin.', en: 'I read but did not write.' },
          { so: 'Guriga ayaan joogaa maxaa yeelay roob ayaa da’aya.', en: 'I am home because it is raining.' },
        ],
        review: 'PENDING_REVIEW',
      })],
      speaking: [],
      exercises: [
        exercise({ id: 's4-m8-l1-e1', type: 'match-qa', titleSo: 'Isku-xiraha iyo macnihiisa', skill: 'akhris', objective: true, pairs: [{ left: 'iyo', right: 'and' }, { left: 'laakiin', right: 'but' }, { left: 'maxaa yeelay', right: 'because' }, { left: 'haddii', right: 'if' }, { left: 'ka dib', right: 'after' }] }),
        exercise({ id: 's4-m8-l1-e2', type: 'fill-blank', titleSo: 'Isku-xiraha dooro', skill: 'qoris', objective: true, sentenceSo: 'Waan rabay, ________ ma iman.', options: ['laakiin', 'iyo', 'haddii'], answer: 'laakiin', translationEn: 'I wanted to, but I did not come.' }),
        exercise({ id: 's4-m8-l1-e3', type: 'order-words', titleSo: 'Jumlad isku xidhan', skill: 'qoris', objective: true, tokens: ['Casharka', 'ka', 'dib,', 'waan', 'ciyaaraa'], answer: ['Casharka', 'ka', 'dib,', 'waan', 'ciyaaraa'], translationEn: 'After the lesson, I play.' }),
      ],
      reviewSo: ['iyo, laakiin, maxaa yeelay, marka, haddii, ka hor, ka dib.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m9 = module({
  id: 's4-m9', stageId: s, titleSo: 'Akhriska Qoraallada Dheer', titleEn: 'Reading longer texts',
  descriptionSo: 'Sheekooyin shakhsi ah, sharaxaado, qoraallo macluumaad, warqado, tilmaamo iyo taariikh-nololeed.',
  objectivesSo: ['Qoraal dhaadheer akhri', 'Fikradaha ugu muhiimsan soo saar', 'Erayada cusub macnooda ka soo saar'],
  lessons: [
    lesson({
      id: 's4-m9-l1', stageId: s, moduleId: 's4-m9', titleSo: 'Warqad iyo taariikh-nololeed', titleEn: 'A letter and a biography',
      objectivesSo: ['Warqad fudud akhri oo jawaab', 'Taariikh-nololeed akhri', 'Erayada cusub baro'],
      minutes: 28, skills: ['akhris', 'qoris'],
      vocab: [
        vocab(s, 's4-warqad-2', 'warqad', 'letter', { emoji: '✉️', exampleSo: 'Warqad ayaan qoray saaxiibkay.', exampleEn: 'I wrote a letter to my friend.' }),
        vocab(s, 's4-saaxiib-2', 'saaxiib', 'friend', { emoji: '🧑‍🤝‍🧑', exampleSo: 'Saaxiibkay wuu fiican yahay.', exampleEn: 'My friend is well.' }),
        vocab(s, 's4-nolol', 'nolol', 'life', { emoji: '🌱', exampleSo: 'Noloshu waa qurux badan.', exampleEn: 'Life is beautiful.' }),
        vocab(s, 's4-dugsiga-2', 'dugsiga', 'the school', { emoji: '🏫', exampleSo: 'Dugsigu waa meel muhiim ah.', exampleEn: 'School is an important place.' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's4-m9-l1-p1', titleSo: 'Warqad saaxiib', titleEn: 'A letter to a friend', level: 5,
          purposeSo: 'Warqad fudud akhri, macnaha soo saar.', purposeEn: 'Read a simple letter and grasp its meaning.',
          so: 'Hargeysa, 12-kii Maarso\n\nSaaxiibkay qaaliga ah,\n\nAs-salaamu calaykum. Waxaan rajaynayaa inaad wanaagsan tahay. Anigu waan fiicanahay. Dugsigu wuu fiican yahay, macallimiintuna way shaqeeyaan adag. Waxaan bartaa xisaab, cilmi iyo Af-Soomaali. Habeenkii waxaan akhriyaa sheekooyin. Fadlan iiga waran noloshaada iyo dugsigaaga.\n\nWaxaan rajaynayaa inaan dhowaan is aragno.\n\nSaaxiibkaa,\nKhadar',
          en: 'Hargeisa, 12 March\n\nMy dear friend,\n\nPeace be upon you. I hope you are well. I am fine. School is good and the teachers work hard. I study maths, science and Somali. At night I read stories. Please tell me about your life and your school.\n\nI hope we meet soon.\n\nYour friend,\nKhadar',
          glossary: [{ word: 'rajinayaa', meaning: 'hope' }, { word: 'dhowaan', meaning: 'soon' }, { word: 'iiga waran', meaning: 'tell me news' }],
          questions: [
            question('s4-m9-l1-p1-q1', 'who', 'Yaa qoray warqadda?', 'Who wrote the letter?', ['Khadar', 'Hargeysa', 'Macallinka'], 'Khadar', 'Khadar'),
            question('s4-m9-l1-p1-q2', 'what', 'Maxuu bartaa?', 'What does he study?', ['xisaab, cilmi iyo Af-Soomaali', 'kaliya xisaab', 'ciyaaraha'], 'xisaab, cilmi iyo Af-Soomaali', 'maths, science and Somali'),
            question('s4-m9-l1-p1-q3', 'when', 'Goorma buu akhriyaa sheekooyinka?', 'When does he read stories?', ['subaxdii', 'habeenkii', 'galabtii'], 'habeenkii', 'at night'),
          ],
          review: 'PENDING_REVIEW',
        }),
        passage({
          id: 's4-m9-l1-p2', titleSo: 'Taariikh-nololeed: Macallin', titleEn: 'A biography: a teacher', level: 5,
          purposeSo: 'Taariikh-nololeed akhri.', purposeEn: 'Read a short biography.',
          so: 'Magaceedu waa Cabdirisaaq. Wuxuu ku dhashay magaalada Burco. Wuxuu ahaa arday dadaal badan. Dugsigiisii sare ka dib, wuxuu bartay jaamacadda. Muddo sanooyin ah wuxuu noqday macallin. Maanta wuxuu wax baraa carruur badan. Ardaydiisu way jecel yihiin. Wuxuu rumaysan yahay in waxbarashadu beddesho nolosha.',
          en: 'His name is Cabdirisaaq. He was born in the city of Burao. He was a hard-working student. After secondary school he studied at university. For years he has been a teacher. Today he teaches many children. His students love him. He believes that education changes lives.',
          glossary: [{ word: 'dadaal badan', meaning: 'hard-working' }, { word: 'muddo', meaning: 'a period of' }, { word: 'rumaysan', meaning: 'believes' }],
          questions: [
            question('s4-m9-l1-p2-q1', 'where', 'Xaggee buu ku dhashay?', 'Where was he born?', ['Burco', 'Hargeysa', 'Muqdisho'], 'Burco', 'Burao'),
            question('s4-m9-l1-p2-q2', 'main-idea', 'Maxuu rumaysan yahay?', 'What does he believe?', ['waxbarashadu beddesho nolosha', 'lacagtu muhiim tahay', 'ciyaaruhu fiican yihiin'], 'waxbarashadu beddesho nolosha', 'education changes lives'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [],
      speaking: [],
      exercises: [
        exercise({ id: 's4-m9-l1-e1', type: 'read-answer', titleSo: 'Warqadda', skill: 'akhris', objective: true, passageId: 's4-m9-l1-p1' }),
        exercise({ id: 's4-m9-l1-e2', type: 'read-answer', titleSo: 'Taariikh-nololeedka', skill: 'akhris', objective: true, passageId: 's4-m9-l1-p2' }),
        exercise({ id: 's4-m9-l1-e3', type: 'fill-blank', titleSo: 'Fahamka', skill: 'akhris', objective: true, sentenceSo: 'Khadar wuxuu akhriyaa sheekooyin ________.', options: ['habeenkii', 'qadada', 'dugsiga'], answer: 'habeenkii', translationEn: 'Khadar reads stories at night.' }),
      ],
      reviewSo: ['Warqadu waxay leedahay bilow, jidh iyo dhamaad.', 'Taariikh-nololeedku wuxuu ka hadlaa nolosha qof.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m10 = module({
  id: 's4-m10', stageId: s, titleSo: 'Fahamka Qoraalka', titleEn: 'Reading comprehension',
  descriptionSo: 'Fikradda ugu muhiimsan, faahfaahinta, isku-xirka, sababta iyo natiijada, erayada macnooda, gunaanad.',
  objectivesSo: ['Fikradda weyn soo saar', 'Faahfaahinta aqoonsan', 'Dhacdada kala dhig', 'Erayada macnooda ka soo saar', 'Gunaanad kooban qor'],
  lessons: [
    lesson({
      id: 's4-m10-l1', stageId: s, moduleId: 's4-m10', titleSo: 'Sida loo fahmo qoraal', titleEn: 'How to understand a text',
      objectivesSo: ['Fikradda ugu muhiimsan aqoonsan', 'Faahfaahinta iyo sawirka weyn kala sooc', 'Gunaanad kooban qor'],
      minutes: 28, skills: ['akhris', 'qoris'],
      vocab: [
        vocab(s, 's4-fikrad', 'fikrad', 'idea', { emoji: '💡', exampleSo: 'Fikradda ugu muhiimsan.', exampleEn: 'The main idea.' }),
        vocab(s, 's4-faahfaahin', 'faahfaahin', 'detail', { emoji: '🔍', exampleSo: 'Faahfaahinta qoraalka.', exampleEn: 'The details of the text.' }),
        vocab(s, 's4-gunaanad', 'gunaanad', 'summary / conclusion', { emoji: '📝', exampleSo: 'Gunaanad kooban qor.', exampleEn: 'Write a short summary.' }),
        vocab(s, 's4-sabab', 'sabab', 'cause / reason', { emoji: '⚙️', exampleSo: 'Sababtu waa maxay?', exampleEn: 'What is the reason?' }),
        vocab(s, 's4-natiijo', 'natiijo', 'result', { emoji: '🎯', exampleSo: 'Natiijadu waa fiican tahay.', exampleEn: 'The result is good.' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's4-m10-l1-p1', titleSo: 'Biyo iyo beeraha', titleEn: 'Water and farming', level: 5,
          purposeSo: 'Sababta iyo natiijada akhri.', purposeEn: 'Read cause and effect.',
          so: 'Roobku waa muhiim beeraha. Marka roobku yimaado, beeralaydu waxay beeraan khudaar iyo galley. Biyaha webiyada iyo ceelasha waxaa loo isticmaalaa waraabka. Haddii roobku yaraado, dalaggu wuu yaraadaa, cuntaduna way qaalisoobaan. Sidaas darteed, dadku waxay ilaaliyaan biyaha oo waxay dhisaan ceelal cusub.',
          en: 'Rain is important for farming. When rain comes, farmers plant vegetables and maize. River and well water is used for irrigation. If rain decreases, crops decrease and food becomes expensive. Therefore people protect water and dig new wells.',
          glossary: [{ word: 'beeralay', meaning: 'farmers' }, { word: 'waraabka', meaning: 'irrigation' }, { word: 'dalag', meaning: 'crops' }, { word: 'qaaliisoobaan', meaning: 'become expensive' }],
          questions: [
            question('s4-m10-l1-p1-q1', 'main-idea', 'Maxaa qoraalku ka hadlayaa?', 'What is the text about?', ['biyaha iyo beeraha', 'dugsiga', 'suuqa'], 'biyaha iyo beeraha', 'water and farming'),
            question('s4-m10-l1-p1-q2', 'inference', 'Maxaa dhaca haddii roobku yaraado?', 'What happens if rain decreases?', ['dalaggu wuu yaraadaa', 'beeralaydu way farxaan', 'webiyadu way buxaan'], 'dalaggu wuu yaraadaa', 'crops decrease'),
            question('s4-m10-l1-p1-q3', 'detail', 'Maxay dadku dhisaan?', 'What do people build?', ['ceelal cusub', 'dugsiyo', 'waddooyin'], 'ceelal cusub', 'new wells'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [grammar({
        id: 's4-m10-l1-g1', titleSo: 'Sida loo akhriyo si faham leh', titleEn: 'Reading for understanding',
        explanationSo: 'Marka aad akhrido: (1) ciwaanka fiiri, (2) fikradda weyn raadi, (3) faahfaahinta qabo, (4) sababta iyo natiijada aqoonsan, (5) gunaanad kooban qor.',
        explanationEn: 'When reading: (1) look at the title, (2) find the main idea, (3) note details, (4) identify cause and effect, (5) write a short summary.',
        examples: [{ so: 'Fikradda weyn: roobku waa muhiim beeraha.', en: 'Main idea: rain is important for farming.' }],
        review: 'PENDING_REVIEW',
      })],
      speaking: [],
      exercises: [
        exercise({ id: 's4-m10-l1-e1', type: 'read-answer', titleSo: 'Biyo iyo beeraha', skill: 'akhris', objective: true, passageId: 's4-m10-l1-p1' }),
        exercise({ id: 's4-m10-l1-e2', type: 'match-qa', titleSo: 'Qaybaha fahamka', skill: 'akhris', objective: true, pairs: [{ left: 'Fikradda weyn', right: 'waxa qoraalku ka hadlayo' }, { left: 'Faahfaahin', right: 'xog yaryar' }, { left: 'Gunaanad', right: 'waxa la soo koobay' }, { left: 'Sabab', right: 'waxa dhaliyay' }] }),
        exercise({ id: 's4-m10-l1-e3', type: 'fill-blank', titleSo: 'Sabab iyo natiijo', skill: 'akhris', objective: true, sentenceSo: 'Haddii roobku yaraado, dalaggu wuu ________.', options: ['yaraadaa', 'kordhaa', 'isbeddelaa'], answer: 'yaraadaa', translationEn: 'If rain decreases, crops decrease.' }),
      ],
      reviewSo: ['Ciwaan → fikrad weyn → faahfaahin → sabab/natiijo → gunaanad.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

export const stage4: Stage = {
  id: s, index: 4,
  titleSo: 'Naxwe iyo Fahamka Akhriska', titleEn: 'Grammar and reading comprehension',
  levelSo: 'Dhexdhexaad sare', levelEn: 'Upper intermediate',
  descriptionSo: 'Baro naxwaha Af-Soomaaliga: magacyada, magac-u-yaallada, lahaanshaha, falalka, diiradda jumladaha, diidmada, isku-xirayaasha iyo fahamka qoraalka.',
  descriptionEn: 'Learn Somali grammar: nouns, pronouns, possession, verbs, focus patterns, negation, connectors and comprehension.',
  objectivesSo: ['Jumlad sax ah dhisi', 'Naxwaha aasaasiga ah fahmo', 'Qoraal dhaadheer akhri oo fahmo', 'Gunaanad kooban qor'],
  emoji: '🧠',
  readingLevels: [4, 5],
  modules: [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10],
  assessment: {
    id: 's4-assessment', titleSo: 'Tijaabada heerka 4', titleEn: 'Stage 4 assessment',
    items: [
      { id: 's4-a1', skill: 'akhris', promptSo: 'Magaca “bisad” waa…', options: ['lab', 'dheddig', 'lab iyo dheddig'], answer: 'dheddig', areaSo: 'Magacyada' },
      { id: 's4-a2', skill: 'qoris', promptSo: 'Lahaanshaha “my book” waa…', options: ['buuggayga', 'buuggiisa', 'buugaaga'], answer: 'buuggayga', areaSo: 'Lahaanshaha' },
      { id: 's4-a3', skill: 'akhris', promptSo: '“Waan tagay” waa wakhtiga…', options: ['hadda', 'hore', 'mustaqbal'], answer: 'hore', areaSo: 'Falalka' },
      { id: 's4-a4', skill: 'qoris', promptSo: 'Diidmada “I did not go” waa…', options: ['ma tagin', 'ma tago', 'waa tagay'], answer: 'ma tagin', areaSo: 'Diidmada' },
      { id: 's4-a5', skill: 'akhris', promptSo: '“Maxaa yeelay” micnihiisu waa…', options: ['but', 'because', 'if'], answer: 'because', areaSo: 'Isku-xirayaasha' },
      { id: 's4-a6', skill: 'akhris', promptSo: 'Fikradda weyn ee “Biyo iyo beeraha” waa…', options: ['roobku waa muhiim beeraha', 'suuqu waa weyn yahay', 'dugsigu waa muhiim'], answer: 'roobku waa muhiim beeraha', areaSo: 'Fahamka' },
      { id: 's4-a7', skill: 'qoris', promptSo: '“Baashe ________ yimid” (diirad).', options: ['baa', 'waa', 'iyo'], answer: 'baa', areaSo: 'Diiradda' },
    ],
    speakingBriefSo: 'Qoraal dhaadheer akhri oo ka dib gunaanad kooban afka ka sheeg.',
    speakingRubric: ['Fluency', 'Comprehension', 'Vocabulary'],
  },
};
