/**
 * Stage 6 — Suugaan iyo Af-Ingaad.
 * Advanced Somali literacy and literary appreciation: literary forms, poets,
 * proverbs, poetry analysis, debate, reading literature, advanced writing and
 * final projects.
 *
 * COPYRIGHT NOTE: modern Somali poems (including the works of Hadraawi) are
 * copyrighted. This module teaches forms, context and skills without
 * reproducing copyrighted verse. Only traditional proverbs and original
 * teaching examples are quoted. Everything is PENDING_REVIEW.
 */
import { exercise, grammar, lesson, module, passage, question, vocab, type Stage } from './types';

const s = 'stage-6';

const m1 = module({
  id: 's6-m1', stageId: s, titleSo: 'Suugaanta Soomaaliyeed', titleEn: 'Somali literary forms',
  descriptionSo: 'Gabay, geeraar, buraanbur, hees, sheeko-xariir, maahmaah, hal-xidhaale, riwaayad.',
  objectivesSo: ['Noocyada suugaanta kala sooc', 'Mid kasta tusaale aqoonsan', 'Muhiimadda dhaqanka fahmo'],
  lessons: [
    lesson({
      id: 's6-m1-l1', stageId: s, moduleId: 's6-m1', titleSo: 'Noocyada suugaanta', titleEn: 'The forms of Somali literature',
      objectivesSo: ['Siddeedda nooc ee suugaanta baran', 'Farqiga u dhexeeya tix iyo tiraab fahmo', 'Tusaalayaasha aqoonsan'],
      minutes: 28, skills: ['akhris', 'hadal', 'qoris'],
      vocab: [
        vocab(s, 's6-gabay', 'gabay', 'classical poem (long verse)', { emoji: '📜', exampleSo: 'Gabaygu waa nooca ugu da’da weyn ee suugaanta.', exampleEn: 'The gabay is the oldest form of Somali poetry.' }),
        vocab(s, 's6-geeraar', 'geeraar', 'short rhythmic poem', { emoji: '🎵', exampleSo: 'Geeraarku waa gaaban yahay oo wuxuu leeyahay laxan.', exampleEn: 'The geeraar is short and rhythmic.' }),
        vocab(s, 's6-buraanbur', 'buraanbur', 'women’s poetic form', { emoji: '💃', exampleSo: 'Buraanburka waxaa caan ku ahayd haweenka.', exampleEn: 'Buraanbur is traditionally associated with women.' }),
        vocab(s, 's6-hees', 'hees', 'song', { emoji: '🎶', exampleSo: 'Heesaha waxaa la luuqeeyaa.', exampleEn: 'Songs are sung.' }),
        vocab(s, 's6-sheeko-xariir', 'sheeko-xariir', 'folktale', { emoji: '📖', exampleSo: 'Sheeko-xariirka waa sheeko hore oo dhaqameed.', exampleEn: 'A sheeko-xariir is a traditional folktale.' }),
        vocab(s, 's6-maahmaah', 'maahmaah', 'proverb', { emoji: '💬', exampleSo: 'Maahmaahdu waa xikmad gaaban.', exampleEn: 'A proverb is short wisdom.' }),
        vocab(s, 's6-hal-xidhaale', 'hal-xidhaale', 'riddle', { emoji: '🧩', exampleSo: 'Hal-xidhaalaha carruurtu way jecel yihiin.', exampleEn: 'Children love riddles.' }),
        vocab(s, 's6-riwaayad', 'riwaayad', 'play / drama', { emoji: '🎭', exampleSo: 'Riwaayadda waa sheeko la matalo.', exampleEn: 'A play is a story acted out.' }),
        vocab(s, 's6-tix', 'tix', 'verse', { emoji: '✒️', exampleSo: 'Tixdu waxay leedahay miisaan.', exampleEn: 'Verse has metre.' }),
        vocab(s, 's6-tiraab', 'tiraab', 'prose', { emoji: '📄', exampleSo: 'Tiraabtu waa qoraal caadi ah.', exampleEn: 'Prose is ordinary writing.' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's6-m1-l1-p1', titleSo: 'Suugan Soomaaliyeed', titleEn: 'Somali literature', level: 6,
          purposeSo: 'Noocyada suugaanta akhri.', purposeEn: 'Read about the literary forms.',
          so: 'Soomaalidu waxaa loo yaqaanay “qoom ka mid ah gabayaa”. Suugaantu waxay ahayd xarunta nolosha: gabay iyo geeraar ayaa lagu sheegay taariikhda, xeerka iyo dareenka. Buraanburka haweenku wuxuu ahaa cod xooggan. Heesaha iyo sheeko-xariirka waxaa loo gudbin jiray jiil ka jiil. Maahmaahdu waxay koobtay xikmadda bulshada, hal-xidhaaluhuna wuxuu baray fikirka. Riwaayaddu waxay ku timid fagaaraha casriga ah, iyadoo sii wadata hiddihii hore.',
          en: 'Somalis are known as “a nation of poets”. Literature was the centre of life: gabay and geeraar carried history, law and feeling. Women’s buraanbur was a strong voice. Songs and folktales passed from generation to generation. Proverbs condensed community wisdom and riddles trained the mind. The modern stage brought the riwaayad, continuing the old heritage.',
          glossary: [{ word: 'xeer', meaning: 'customary law' }, { word: 'jiil', meaning: 'generation' }, { word: 'hiddihii', meaning: 'the heritage' }],
          questions: [
            question('s6-m1-l1-p1-q1', 'main-idea', 'Maxay Soomaalidu ku caan baxday?', 'What are Somalis known for?', ['suugaanta', 'ganacsiga', 'ciyaaraha'], 'suugaanta', 'literature'),
            question('s6-m1-l1-p1-q2', 'detail', 'Yaa buraanburka caan ka dhigay?', 'Who is associated with buraanbur?', ['haweenka', 'carruurta', 'ganacsatada'], 'haweenka', 'women'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [grammar({
        id: 's6-m1-l1-g1', titleSo: 'Tix iyo tiraab', titleEn: 'Verse and prose',
        explanationSo: 'Tixdu (gabay, geeraar, buraanbur, hees) waxay leedahay laxan, miisaan iyo celcelis. Tiraabtu (sheeko, qoraal, maqaal) waa hadal qoran oo caadi ah. Labaduba way muhiim yihiin.',
        explanationEn: 'Verse (gabay, geeraar, buraanbur, hees) has rhythm, metre and repetition. Prose (story, article, essay) is ordinary written language. Both matter.',
        examples: [{ so: 'Gabay — tix dhaadheer oo miisaan leh.', en: 'Gabay — long verse with metre.' }, { so: 'Maqaal — tiraab.', en: 'An article — prose.' }],
        review: 'PENDING_REVIEW',
      })],
      speaking: [],
      exercises: [
        exercise({ id: 's6-m1-l1-e1', type: 'flashcards', titleSo: 'Noocyada', skill: 'akhris', objective: true, vocabIds: ['s6-gabay', 's6-geeraar', 's6-buraanbur', 's6-hees', 's6-sheeko-xariir', 's6-maahmaah', 's6-hal-xidhaale', 's6-riwaayad'] }),
        exercise({ id: 's6-m1-l1-e2', type: 'match-qa', titleSo: 'Nooca iyo sharraxiisa', skill: 'akhris', objective: true, pairs: [{ left: 'Gabay', right: 'tix dhaadheer oo miisaan leh' }, { left: 'Buraanbur', right: 'tix haweenka la xidhiidha' }, { left: 'Riwaayad', right: 'sheeko la matalo' }, { left: 'Maahmaah', right: 'xikmad gaaban' }, { left: 'Hal-xidhaale', right: 'su’aal madadaalo leh' }] }),
        exercise({ id: 's6-m1-l1-e3', type: 'read-answer', titleSo: 'Suugaanta Soomaaliyeed', skill: 'akhris', objective: true, passageId: 's6-m1-l1-p1' }),
      ],
      reviewSo: ['Gabay, geeraar, buraanbur, hees, sheeko-xariir, maahmaah, hal-xidhaale, riwaayad.', 'Tix iyo tiraab waa laba qaybood oo waaweyn.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m2 = module({
  id: 's6-m2', stageId: s, titleSo: 'Abwaannada Soomaaliyeed', titleEn: 'Somali poets and writers',
  descriptionSo: 'Kaydka dhaxalka suugaanta: bilow Hadraawi, ka dibna abwaanno kale.',
  objectivesSo: ['Nolosha abwaanka aqoonsan', 'Taariikhda iyo saamayntiisa fahmo', 'Xiriirka suugaanta iyo bulshada arag'],
  lessons: [
    lesson({
      id: 's6-m2-l1', stageId: s, moduleId: 's6-m2',
      titleSo: 'Abwaan Hadraawi iyo dhaxalkiisa', titleEn: 'Hadraawi and his legacy',
      objectivesSo: ['Nolosha Hadraawi baran', 'Suugaantiisa iyo mowduucyadeeda aqoonsan', 'Qiimaha dhaxalka fahmo'],
      minutes: 25, skills: ['akhris', 'hadal'],
      vocab: [
        vocab(s, 's6-abwaan', 'abwaan', 'poet', { emoji: '✒️', exampleSo: 'Abwaanku wuxuu curiyaa suugaan.', exampleEn: 'A poet creates literature.' }),
        vocab(s, 's6-dhaxal', 'dhaxal', 'heritage / legacy', { emoji: '🏛️', exampleSo: 'Dhaxalka suugaanta waa muhiim.', exampleEn: 'Literary heritage is important.' }),
        vocab(s, 's6-abaalmarin', 'abaalmarin', 'award', { emoji: '🏅', exampleSo: 'Abaalmarin ayaa la siiyay.', exampleEn: 'He was given an award.' }),
        vocab(s, 's6-nabad-2', 'nabad', 'peace', { emoji: '🕊️', exampleSo: 'Nabaddu waa muhiim.', exampleEn: 'Peace is important.' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's6-m2-l1-p1', titleSo: 'Maxamed Ibraahin Warsame — Hadraawi', titleEn: 'Hadraawi', level: 6,
          purposeSo: 'Taariikh-nololeed abwaan akhri. (Fiiri modoolka Dhaqan iyo Suugaan faahfaahinta.)',
          purposeEn: 'Read a poet’s biography. (See the Culture module for details.)',
          so: 'Maxamed Ibraahin Warsame, oo loo yaqaanay Hadraawi, wuxuu ahaa abwaan Soomaaliyeed oo aad loo qadariyo. Wuxuu ku dhashay gobolka Togdheer sannadkii 1943. Suugaantiisu waxay ka hadashay xorriyadda, caddaaladda, nabadda iyo jacaylka bulshada. Sannadkii 2012 waxaa la guddoonsiiyey Abaalmarinta Prince Claus. Wuxuu ku geeriyooday Hargeysa 18-kii Agoosto 2022. Hadraawi wuxuu ka tegay dhaxal suugaaneed qiimo weyn.',
          en: 'Maxamed Ibraahin Warsame, known as Hadraawi, was a much-respected Somali poet. He was born in the Togdheer region in 1943. His writing explored freedom, justice, peace and care for the community. In 2012 he received a Prince Claus Award. He died in Hargeisa on 18 August 2022. Hadraawi left a valuable literary legacy.',
          glossary: [{ word: 'qadariyo', meaning: 'to respect' }, { word: 'geeriyooday', meaning: 'passed away' }],
          questions: [
            question('s6-m2-l1-p1-q1', 'when', 'Goorma buu ku dhashay Togdheer?', 'When was he born in Togdheer?', ['1943', '2012', '2022'], '1943', '1943'),
            question('s6-m2-l1-p1-q2', 'detail', 'Maxay suugaantiisu ka hadashay?', 'What did his writing explore?', ['xorriyadda, caddaaladda, nabadda', 'cuntada', 'ganacsiga'], 'xorriyadda, caddaaladda, nabadda', 'freedom, justice, peace'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [],
      speaking: [{ id: 's6-m2-l1-s1', type: 'open-speaking', promptSo: 'Abwaan ku saabsan hadal kooban jeedi.', promptEn: 'Give a short talk about a poet.', hintsSo: ['Magaciisu waa…', 'Wuxuu ku dhashay…', 'Suugaantiisu waxay ka hadashay…'], rubricFocus: ['Fluency', 'Vocabulary'] }],
      exercises: [
        exercise({ id: 's6-m2-l1-e1', type: 'read-answer', titleSo: 'Hadraawi', skill: 'akhris', objective: true, passageId: 's6-m2-l1-p1' }),
        exercise({ id: 's6-m2-l1-e2', type: 'match-qa', titleSo: 'Taariikhda', skill: 'akhris', objective: true, pairs: [{ left: '1943', right: 'dhalashada' }, { left: '2012', right: 'abaalmarinta Prince Claus' }, { left: '2022', right: 'geerida' }] }),
      ],
      reviewSo: ['Hadraawi: 1943–2022, Togdheer — Hargeysa.', 'Suugaantu waxay ka hadashaa xorriyad, caddaalad iyo nabad.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m3 = module({
  id: 's6-m3', stageId: s, titleSo: 'Maahmaahyada', titleEn: 'Proverbs',
  descriptionSo: 'Maahmaah kasta: qoraalka asalka ah, macnaha, xaaladda, sharaxaadda iyo isticmaalka wadahadalka.',
  objectivesSo: ['Maahmaah macnaheeda fahmo', 'Xaaladda saxda ah ku isticmaali', 'Xikmadda bulshada qadari'],
  lessons: [
    lesson({
      id: 's6-m3-l1', stageId: s, moduleId: 's6-m3', titleSo: 'Xikmad kooban', titleEn: 'Short wisdom',
      objectivesSo: ['Maahmaahyo baran oo macnooda fahmo', 'Wadahadalka ku isticmaal', 'Maahmaah cusub hal-xidhaale la mid ah fahmo'],
      minutes: 25, skills: ['akhris', 'hadal', 'qoris'],
      vocab: [
        vocab(s, 's6-xikmad', 'xikmad', 'wisdom', { emoji: '🦉', exampleSo: 'Maahmaahdu waa xikmad.', exampleEn: 'A proverb is wisdom.' }),
        vocab(s, 's6-isticmaal', 'isticmaal', 'use', { emoji: '🛠️', exampleSo: 'Maahmaahda isticmaal wadahadalka.', exampleEn: 'Use the proverb in conversation.' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's6-m3-l1-p1', titleSo: 'Maahmaahyo', titleEn: 'Proverbs', level: 6,
          purposeSo: 'Maahmaahyo akhri oo macnooda fahmo.',
          purposeEn: 'Read proverbs and understand their meanings.',
          so: '“Aqoon la’aani waa iftiin la’aan.” — Qofka aan aqoon lahayn wuxuu ku nool yahay mugdi; aqoontuna waa iftiin.\n\n“Nabad iyo caano.” — Salaan iyo duco qadiimi ah oo loo rajaynayo nabad iyo nolol wanaagsan.\n\nMaahmaahyadu waxay ku kala duwan yihiin gobollada; waxaa loo baahan yahay in macallinku tusaalooyinka deegaanka ku daro.',
          en: '“Without knowledge there is no light.” — The ignorant live in darkness; knowledge is light.\n\n“Peace and milk.” — An old greeting and blessing wishing peace and a good life.\n\nProverbs vary by region; teachers should add local examples.',
          glossary: [{ word: 'mugdi', meaning: 'darkness' }, { word: 'duco', meaning: 'blessing' }],
          questions: [
            question('s6-m3-l1-p1-q1', 'vocab', '“Iftiin” macnihiisu waa…', '“Iftiin” means…', ['light', 'darkness', 'water'], 'light', 'light'),
            question('s6-m3-l1-p1-q2', 'main-idea', 'Maxay maahmaahdu muujinaysaa?', 'What does the proverb express?', ['aqoontu waa iftiin', 'lacagtu waa muhiim', 'ciyaaruhu waa fiican'], 'aqoontu waa iftiin', 'knowledge is light'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [grammar({
        id: 's6-m3-l1-g1', titleSo: 'Sida maahmaah loo isticmaalo', titleEn: 'Using proverbs',
        explanationSo: 'Maahmaahdu waxay ku habboon tahay xaalad gaar ah: markaad talo siinayso, dood ka qayb qaadanayso, ama sheeko sheeganayso. Waxaa laga yaabaa in gobollada kala duwan si kala duwan loo dhigo — waa in la ixtiraamo kala duwanaanshaha.',
        explanationEn: 'A proverb fits a particular situation: giving advice, joining a discussion or telling a story. Wording varies between regions — respect that variation.',
        examples: [{ so: '“Aqoon la’aani waa iftiin la’aan” — marka aan kuu sheego inaad wax barato.', en: 'Use it when urging someone to learn.' }],
        review: 'PENDING_REVIEW',
      })],
      speaking: [{ id: 's6-m3-l1-s1', type: 'open-speaking', promptSo: 'Maahmaah ku dar wadahadal: talo bixi ama dood ka hadal.', promptEn: 'Use a proverb in a conversation: give advice or join a discussion.', hintsSo: ['Maahmaahda xusuuso.', 'Xaaladda ku habboon dooro.', 'Macnaha sharax.'], rubricFocus: ['Vocabulary', 'Fluency'] }],
      exercises: [
        exercise({ id: 's6-m3-l1-e1', type: 'read-answer', titleSo: 'Maahmaahyada', skill: 'akhris', objective: true, passageId: 's6-m3-l1-p1' }),
        exercise({ id: 's6-m3-l1-e2', type: 'match-qa', titleSo: 'Maahmaahda iyo macnaha', skill: 'akhris', objective: true, pairs: [{ left: 'Aqoon la’aani waa iftiin la’aan', right: 'aqoontu waa iftiin' }, { left: 'Nabad iyo caano', right: 'duco nolol wanaagsan' }] }),
      ],
      reviewSo: ['Maahmaahdu waa xikmad gaaban.', 'Gobolladu way kala duwan yihiin.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m4 = module({
  id: 's6-m4', stageId: s, titleSo: 'Fahamka Gabayga', titleEn: 'Understanding poetry',
  descriptionSo: 'Sawir-maskaxeed, celcelis, isku-dhafka xarfaha, laxan, mawduuc, dareen iyo erayo sawir leh.',
  objectivesSo: ['Qaybaha farsamada gabayga aqoonsan', 'Sawirka iyo laxanka maqli', 'Fikrad u gaar ah oo salaysan qoraal ka dhis'],
  lessons: [
    lesson({
      id: 's6-m4-l1', stageId: s, moduleId: 's6-m4', titleSo: 'Qaybaha gabayga', titleEn: 'Parts of a poem',
      objectivesSo: ['Sawir-maskaxeedka, celceliska iyo laxanka aqoonsan', 'Mawduuca iyo dareenka fahmo', 'Fikrad gaar ah oo salaysan qoraal ka dhis'],
      minutes: 28, skills: ['akhris', 'qoris', 'hadal'],
      vocab: [
        vocab(s, 's6-sawir-maskaxeed', 'sawir maskaxeed', 'imagery', { emoji: '🖼️', exampleSo: 'Sawirku wuxuu ka dhigayaa erayga mid nool.', exampleEn: 'Imagery makes words come alive.' }),
        vocab(s, 's6-celcelis', 'celcelis', 'repetition', { emoji: '🔁', exampleSo: 'Celcelisku wuxuu xoojiyaa fikradda.', exampleEn: 'Repetition strengthens an idea.' }),
        vocab(s, 's6-laxan', 'laxan', 'rhythm / melody', { emoji: '🎵', exampleSo: 'Laxanku wuxuu ka dhigayaa tixda mid dhegaha u fiican.', exampleEn: 'Rhythm makes verse pleasing to the ear.' }),
        vocab(s, 's6-mawduuc', 'mawduuc', 'theme / topic', { emoji: '🎯', exampleSo: 'Mawduuca gabayga.', exampleEn: 'The theme of the poem.' }),
        vocab(s, 's6-dareen', 'dareen', 'emotion / feeling', { emoji: '💗', exampleSo: 'Gabaygu wuxuu muujiyaa dareen.', exampleEn: 'A poem expresses feeling.' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's6-m4-l1-p1', titleSo: 'Tusaale macallin sameeyay', titleEn: 'An original teaching example', level: 6,
          purposeSo: 'Qaybaha gabayga ku baro tusaale asal ah (ma aha gabay abwaan caan ah).',
          purposeEn: 'Learn the parts of poetry with an original example (not a famous poet’s work).',
          so: 'Dhulkaa baxaya, doobku wuu shaqayn,\nDadku wuu wada jiraa, wada jirkuna waa dar.\n\n(Tani waa tusaale macallin sameeyay, lagumana soo xigin gabay abwaan caan ah. Ujeeddadu waa in la barto sawirka, celceliska iyo laxanka.)',
          en: 'The land blooms, the youth shall work,\nThe people stand together, and togetherness is strength.\n\n(This is an original teaching example, not quoted from a famous poet. Its purpose is to teach imagery, repetition and rhythm.)',
          glossary: [{ word: 'doob', meaning: 'youth' }, { word: 'wada jir', meaning: 'togetherness' }],
          questions: [
            question('s6-m4-l1-p1-q1', 'detail', 'Celceliska erayga “wada” wuxuu xoojiyaa…', 'The repetition of “wada” strengthens…', ['fikradda wadajirka', 'mawduuca cunto', 'laxanka'], 'fikradda wadajirka', 'the idea of togetherness'),
            question('s6-m4-l1-p1-q2', 'main-idea', 'Mawduuca tusaaluhu waa…', 'The theme of the example is…', ['wadajir iyo shaqo', 'cimilada', 'suuqa'], 'wadajir iyo shaqo', 'togetherness and work'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [grammar({
        id: 's6-m4-l1-g1', titleSo: 'Sida gabay loo fahmo', titleEn: 'How to understand a poem',
        explanationSo: 'Marka aad gabay akhrido: (1) erayada sawirka leh raadi, (2) celceliska iyo laxanka maqli, (3) mawduuca aqoonsan, (4) dareenka qoraa fahmo, (5) fikrad gaar ah oo salaysan qoraal ka dhis. Ha soo saarin sharaxaad aan la xaqiijin — u dhowaanshahaaga gaarka ah sheego.',
        explanationEn: 'When reading a poem: (1) find image words, (2) hear repetition and rhythm, (3) identify the theme, (4) feel the poet’s emotion, (5) build your own text-based interpretation. Never present an unverified interpretation as fact — state it as your reading.',
        examples: [{ so: 'Fikrad: “wada” waxay xoojisaa wadajirka.', en: 'Reading: “wada” emphasises togetherness.' }],
        review: 'PENDING_REVIEW',
      })],
      speaking: [],
      exercises: [
        exercise({ id: 's6-m4-l1-e1', type: 'read-answer', titleSo: 'Tusaalaha', skill: 'akhris', objective: true, passageId: 's6-m4-l1-p1' }),
        exercise({ id: 's6-m4-l1-e2', type: 'match-qa', titleSo: 'Qaybaha farsamada', skill: 'akhris', objective: true, pairs: [{ left: 'Sawir maskaxeed', right: 'erayo sawir muujinaya' }, { left: 'Celcelis', right: 'eray marar la soo celiyo' }, { left: 'Laxan', right: 'dhawaaqa tixda' }, { left: 'Mawduuc', right: 'waxa tixdu ka hadlayo' }] }),
      ],
      reviewSo: ['Sawir, celcelis, laxan, mawduuc, dareen.', 'Fikraddaada sheego, sharaxaad been ah ha soo saarin.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m5 = module({
  id: 's6-m5', stageId: s, titleSo: 'Dood iyo Falanqayn', titleEn: 'Debate and analysis',
  descriptionSo: 'Dood bulsho: dhismaha jidhka, taageeridda fikradda, jawaabidda, qiimaynta caddaynta, isku diidid ixtiraam leh.',
  objectivesSo: ['Jidh dood dhisi', 'Fikrad taageero caddayn leh', 'Si ixtiraam leh isu diid'],
  lessons: [
    lesson({
      id: 's6-m5-l1', stageId: s, moduleId: 's6-m5', titleSo: 'Doodda bulshada', titleEn: 'A social debate',
      objectivesSo: ['Mowduuc dood dooro', 'Saddex caddayn soo jeedi', 'Jawaab iyo su’aal bixi'],
      minutes: 28, skills: ['hadal', 'akhris', 'qoris'],
      vocab: [
        vocab(s, 's6-caddayn', 'caddayn', 'evidence', { emoji: '📊', exampleSo: 'Caddayntu waa in la keeno.', exampleEn: 'Evidence must be brought.' }),
        vocab(s, 's6-jidh-2', 'jidh', 'main body (argument)', { emoji: '🏗️', exampleSo: 'Jidhka doodda.', exampleEn: 'The body of the argument.' }),
        vocab(s, 's6-qiimayn', 'qiimayn', 'evaluation', { emoji: '⚖️', exampleSo: 'Caddaynta qiimee.', exampleEn: 'Evaluate the evidence.' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's6-m5-l1-p1', titleSo: 'Dood: barashada casriga ah', titleEn: 'Debate: modern learning', level: 6,
          purposeSo: 'Dood laba dhinac ah akhri.', purposeEn: 'Read a two-sided debate.',
          so: 'Dhinaca A: Waxbarashada casriga ah waxay isticmaashaa kombuyuutar iyo internet. Tani waxay fududeysaa barashada, waxayna keentaa xog badan.\n\nDhinaca B: Tiknolojiyaddu waa mid waxtar leh, laakiin akhriska buugga iyo macallinka tooska ah waa saldhigga barashada. Carruurtu waxay u baahan yihiin waqti ay akhriyaan oo ay qoraan.\n\nGunaanadka macallinka: labada dhinacba waxay leeyihiin caddayn; wanaaggu wuxuu ku jiraa isku-darka.',
          en: 'Side A: Modern education uses computers and the internet. This eases learning and brings much information.\n\nSide B: Technology is useful, but reading books and direct teaching are the foundation of learning. Children need time to read and write.\n\nTeacher’s conclusion: both sides have evidence; the good lies in combining them.',
          glossary: [{ word: 'fududeysaa', meaning: 'makes easier' }, { word: 'saldhigga', meaning: 'foundation' }],
          questions: [
            question('s6-m5-l1-p1-q1', 'main-idea', 'Maxay dooddu ka hadlaysaa?', 'What is the debate about?', ['barashada casriga ah', 'cuntada', 'ciyaaraha'], 'barashada casriga ah', 'modern learning'),
            question('s6-m5-l1-p1-q2', 'inference', 'Maxuu macallinku go’aamiyay?', 'What did the teacher conclude?', ['isku-darka labada dhinac', 'tiknolojiyadda oo keliya', 'buugga oo keliya'], 'isku-darka labada dhinac', 'combining both sides'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [],
      speaking: [{ id: 's6-m5-l1-s1', type: 'open-speaking', promptSo: 'Dood ka qayb qaado: saddex caddayn keen oo jawaab bixi.', promptEn: 'Join a debate: bring three pieces of evidence and respond.', hintsSo: ['Waxaan ku taageerayaa…', 'Caddayntu waa…', 'Waxaan ka soo horjeedaa, maxaa yeelay…'], rubricFocus: ['Fluency', 'Sentence formation', 'Conversation interaction'] }],
      exercises: [
        exercise({ id: 's6-m5-l1-e1', type: 'read-answer', titleSo: 'Doodda', skill: 'akhris', objective: true, passageId: 's6-m5-l1-p1' }),
        exercise({ id: 's6-m5-l1-e2', type: 'match-qa', titleSo: 'Qaybaha doodda', skill: 'akhris', objective: true, pairs: [{ left: 'Caddayn', right: 'xog taageeraysa' }, { left: 'Jidh', right: 'fikradaha ugu muhiimsan' }, { left: 'Qiimayn', right: 'hubinta caddaynta' }] }),
      ],
      reviewSo: ['Dooddu waxay u baahan tahay caddayn.', 'Isku diidid waa inay ahaato ixtiraam leh.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m6 = module({
  id: 's6-m6', stageId: s, titleSo: 'Akhriska Suugaanta iyo Qoraallada', titleEn: 'Reading literature and essays',
  descriptionSo: 'Qoraallo suugaaneed, taariikhi, maqaallo, taariikh-nololeedyo iyo sheekooyin dhaqameed — xuquuqda qoraha la ixtiraamo.',
  objectivesSo: ['Qoraal suugaaneed akhri', 'Ujeeddada qoraa aqoonsan', 'Xuquuqda qoraha ixtiraam'],
  lessons: [
    lesson({
      id: 's6-m6-l1', stageId: s, moduleId: 's6-m6', titleSo: 'Sheeko dhaqameed', titleEn: 'A traditional tale',
      objectivesSo: ['Sheeko dhaqameed akhri', 'Xikmaddeeda fahmo', 'Dhaxalka dhaqanka qadarin'],
      minutes: 25, skills: ['akhris', 'hadal'],
      vocab: [
        vocab(s, 's6-dhaqan', 'dhaqan', 'culture', { emoji: '🏛️', exampleSo: 'Dhaqanku waa la ilaaliyaa.', exampleEn: 'Culture is preserved.' }),
        vocab(s, 's6-xuquuq', 'xuquuq', 'rights', { emoji: '⚖️', exampleSo: 'Xuquuqda qoraha waa la ixtiraamaa.', exampleEn: 'The author’s rights are respected.' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's6-m6-l1-p1', titleSo: 'Odaygii iyo geedkii', titleEn: 'The elder and the tree', level: 6,
          purposeSo: 'Sheeko dhaqameed asal ah (tusaale waxbarasho).',
          purposeEn: 'An original traditional-style tale (teaching example).',
          so: 'Maalin maalmaha ka mid ah, oday ayaa geed hoostiisa fadhiistay. Carruur ayaa u timid oo weydiisay: “Awoowe, maxay dadku u akhriyaan?” Odaygii wuxuu ugu jawaabay: “Ilmaha yar, geedku marka uu yar yahay waa la waraabiyaa, marka uu weynaadana wuxuu bixiyaa midho. Maskaxdu sidoo kale: haddii aad maanta akhrido, berri ayaad midho bixin doontaa.”\n\nCarruurtii way farxeen oo maalintiias waxay bilaabeen inay akhriyaan.',
          en: 'One day an elder sat under a tree. Children came and asked: “Grandfather, why do people read?” The elder answered: “Little ones, a tree is watered when small and gives fruit when grown. The mind is the same: if you read today, tomorrow you will give fruit.”\n\nThe children were happy and that day they began to read.',
          glossary: [{ word: 'waraabiyaa', meaning: 'is watered' }, { word: 'maskaxda', meaning: 'the mind' }],
          questions: [
            question('s6-m6-l1-p1-q1', 'why', 'Maxay carruurtu weydiisteen?', 'What did the children ask?', ['maxay dadku u akhriyaan', 'cunto ma rabtaan', 'meel ma jirta'], 'maxay dadku u akhriyaan', 'why people read'),
            question('s6-m6-l1-p1-q2', 'inference', 'Maxuu odaygu u barbar dhigay geedka iyo maskaxda?', 'Why did the elder compare the tree and the mind?', ['labaduba marka la daryeelo way baxaan', 'geedku waa weyn yahay', 'maskaxdu way gaaban tahay'], 'labaduba marka la daryeelo way baxaan', 'both grow when cared for'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [grammar({
        id: 's6-m6-l1-g1', titleSo: 'Xuquuqda qoraha', titleEn: 'Copyright and respect',
        explanationSo: 'Suugaanta casriga ah (maansooyinka, riwaayadaha, sheekooyinka) waxaa leh abwaannada iyo qorayaasha. Waxaa la akhriyi karaa, laakiin laguma soo xigayo goobtan iyada oo aan oggolaansho lahayn. Sheekooyinka dhaqameedka ah iyo maahmaahyada waa dhaxal bulsho, waxaase weli lagu qoraa meesha laga keenay.',
        explanationEn: 'Modern literature belongs to its poets and writers. It may be read, but must not be quoted here without permission. Traditional folktales and proverbs are community heritage, yet sources should still be noted.',
        examples: [{ so: 'Haddii aad rabto inaad gabay soo xigto, oggolaansho haka qaado qoraha.', en: 'If you want to quote a poem, get permission from the poet.' }],
        review: 'PENDING_REVIEW',
      })],
      speaking: [{ id: 's6-m6-l1-s1', type: 'open-speaking', promptSo: 'Sheekada dib u sheeg, xikmaddeedana sharax.', promptEn: 'Retell the tale and explain its wisdom.', hintsSo: ['Oday geed hoostiisa', 'Carruur su’aashay', 'Barbar dhig: geed iyo maskax', 'Carruur bilaabay akhris'], rubricFocus: ['Fluency', 'Vocabulary'] }],
      exercises: [
        exercise({ id: 's6-m6-l1-e1', type: 'read-answer', titleSo: 'Odaygii iyo geedkii', skill: 'akhris', objective: true, passageId: 's6-m6-l1-p1' }),
        exercise({ id: 's6-m6-l1-e2', type: 'fill-blank', titleSo: 'Xikmadda', skill: 'akhris', objective: true, sentenceSo: 'Haddii aad maanta akhrido, berri ayaad ________ bixin doontaa.', options: ['midho', 'biyo', 'lacag'], answer: 'midho', translationEn: 'If you read today, tomorrow you will give fruit.' }),
      ],
      reviewSo: ['Sheeko dhaqameedku wuxuu xambaaraa xikmad.', 'Xuquuqda qoraha waa la ixtiraamaa.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m7 = module({
  id: 's6-m7', stageId: s, titleSo: 'Qoraalka Heerka Sare', titleEn: 'Advanced writing',
  descriptionSo: 'Qoraallo qaybo leh, maqaallo, warqado rasmi ah, warbixinno, hadalo iyo hal-abuur.',
  objectivesSo: ['Qoraal qaybo leh qor', 'Maqaal kooban qor', 'Warqad rasmi ah qor'],
  lessons: [
    lesson({
      id: 's6-m7-l1', stageId: s, moduleId: 's6-m7', titleSo: 'Maqaal iyo warqad rasmi ah', titleEn: 'An essay and a formal letter',
      objectivesSo: ['Maqaal saddex qaybood leh qor', 'Warqad rasmi ah qaabkeeda baran', 'Erayada isku xidhka ku dar'],
      minutes: 30, skills: ['qoris', 'akhris'],
      vocab: [
        vocab(s, 's6-maqaal', 'maqaal', 'essay / article', { emoji: '📰', exampleSo: 'Maqaal kooban ayaan qoray.', exampleEn: 'I wrote a short essay.' }),
        vocab(s, 's6-cinwaan', 'cinwaan', 'title', { emoji: '🏷️', exampleSo: 'Cinwaanka qoraalka.', exampleEn: 'The title of the text.' }),
        vocab(s, 's6-rasmi', 'rasmi', 'formal', { emoji: '👔', exampleSo: 'Warqad rasmi ah.', exampleEn: 'A formal letter.' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's6-m7-l1-p1', titleSo: 'Qaabka maqaalka', titleEn: 'The shape of an essay', level: 6,
          purposeSo: 'Qaabka maqaalka akhri.', purposeEn: 'Read the structure of an essay.',
          so: 'Maqaalku wuxuu leeyahay saddex qayb: bilow (cinwaan iyo fikrad koowaad), jidh (saddex ama afar qaybood oo mid kasta leh fikrad iyo caddayn), iyo dhamaad (gunaanad). Warqadda rasmiga ah waxay leedahay: taariikhda, magaca qofka, cinwaanka, jidhka iyo saxiixa.',
          en: 'An essay has three parts: an introduction (title and first idea), a body (three or four paragraphs, each with an idea and evidence) and an ending (conclusion). A formal letter has: the date, the recipient, the subject, the body and the signature.',
          glossary: [{ word: 'saxiixa', meaning: 'signature' }],
          questions: [
            question('s6-m7-l1-p1-q1', 'detail', 'Immisa qayb ayuu leeyahay maqaalku?', 'How many parts does an essay have?', ['laba', 'saddex', 'shan'], 'saddex', 'three'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [],
      speaking: [],
      exercises: [
        exercise({ id: 's6-m7-l1-e1', type: 'read-answer', titleSo: 'Qaabka maqaalka', skill: 'akhris', objective: true, passageId: 's6-m7-l1-p1' }),
        exercise({ id: 's6-m7-l1-e2', type: 'match-qa', titleSo: 'Qaybaha qoraalka', skill: 'akhris', objective: true, pairs: [{ left: 'Bilow', right: 'cinwaan iyo fikrad' }, { left: 'Jidh', right: 'fikrado iyo caddayn' }, { left: 'Dhamaad', right: 'gunaanad' }] }),
      ],
      reviewSo: ['Maqaal: bilow, jidh, dhamaad.', 'Warqad rasmi: taariikhda, magaca, cinwaanka, jidhka, saxiixa.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m8 = module({
  id: 's6-m8', stageId: s, titleSo: 'Hadal Fagaare iyo Hal-abuur', titleEn: 'Public speaking and creativity',
  descriptionSo: 'Mashruuca dhamaadka: hadal, gabay, sheeko asal ah, ama mowduuc dhaqameed.',
  objectivesSo: ['Mashruuc hal-abuur leh dhammaystir', 'Hadal fagaare jeedi', 'Waxbarashada sii wad'],
  lessons: [
    lesson({
      id: 's6-m8-l1', stageId: s, moduleId: 's6-m8', titleSo: 'Mashruucayga dhamaadka', titleEn: 'My final project',
      objectivesSo: ['Mashruuc dooro: hadal, gabay, sheeko ama daraasad dhaqan', 'Waxqabadka dhammaystir', 'Hortag bulsho ku bandhig'],
      minutes: 35, skills: ['hadal', 'qoris', 'akhris'],
      vocab: [
        vocab(s, 's6-mashruuc', 'mashruuc', 'project', { emoji: '🎯', exampleSo: 'Mashruucayga dhamaadka.', exampleEn: 'My final project.' }),
        vocab(s, 's6-bandhig', 'bandhig', 'presentation', { emoji: '🎤', exampleSo: 'Bandhig ayaan sameeyay.', exampleEn: 'I made a presentation.' }),
        vocab(s, 's6-hal-abuur', 'hal-abuur', 'creativity / creative work', { emoji: '✨', exampleSo: 'Hal-abuurgu wuu muhiim yahay.', exampleEn: 'Creativity is important.' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's6-m8-l1-p1', titleSo: 'Shuruudaha mashruuca', titleEn: 'Project requirements', level: 6,
          purposeSo: 'Shuruudaha mashruuca akhri.', purposeEn: 'Read the project requirements.',
          so: 'Doorasho mid ka mid ah: (1) hadal 3–5 daqiiqo ah oo ku saabsan mowduuc dhaqan, (2) gabay asal ah ama maanso kooban aad qortay, (3) sheeko asal ah oo leh jilayaal iyo xal, ama (4) daraasad kooban oo ku saabsan maahmaahyo deegaankaaga. Mashruucu wuxuu u baahan yahay: cilwaan, qoraal diyaar ah, bandhig af ah, iyo jawaabo su’aalo.',
          en: 'Choose one: (1) a 3–5 minute talk on a cultural subject, (2) an original poem or short verse you wrote, (3) an original tale with characters and a resolution, or (4) a short study of proverbs from your area. The project needs: a title, prepared text, an oral presentation and answers to questions.',
          glossary: [{ word: 'shuruudaha', meaning: 'requirements' }, { word: 'daraasad', meaning: 'study' }],
          questions: [
            question('s6-m8-l1-p1-q1', 'detail', 'Immisa doorasho ayaa jira?', 'How many options are there?', ['laba', 'afar', 'lix'], 'afar', 'four'),
            question('s6-m8-l1-p1-q2', 'detail', 'Maxay mashruucu u baahan yahay?', 'What does the project need?', ['cilwaan, qoraal, bandhig, jawaabo', 'kaliya buug', 'kaliya sawir'], 'cilwaan, qoraal, bandhig, jawaabo', 'title, text, presentation, answers'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [],
      speaking: [{ id: 's6-m8-l1-s1', type: 'open-speaking', promptSo: 'Mashruucaaga bandhig: hadal, gabay ama sheeko.', promptEn: 'Present your project: a talk, poem or story.', hintsSo: ['Cinwaanka sheego.', 'Jidhka: fikradaha.', 'Dhamaad: mahadnaq iyo su’aalo.'], rubricFocus: ['Pronunciation', 'Fluency', 'Vocabulary', 'Conversation interaction'] }],
      exercises: [
        exercise({ id: 's6-m8-l1-e1', type: 'read-answer', titleSo: 'Shuruudaha', skill: 'akhris', objective: true, passageId: 's6-m8-l1-p1' }),
        exercise({ id: 's6-m8-l1-e2', type: 'match-qa', titleSo: 'Doorashooyinka', skill: 'akhris', objective: true, pairs: [{ left: '1', right: 'hadal dhaqan' }, { left: '2', right: 'gabay asal ah' }, { left: '3', right: 'sheeko asal ah' }, { left: '4', right: 'daraasad maahmaahyo' }] }),
      ],
      reviewSo: ['Mashruucu wuxuu u baahan yahay cilwaan, qoraal iyo bandhig.', 'Hal-abuurku waa qaybta waxbarashada.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

export const stage6: Stage = {
  id: s, index: 6,
  titleSo: 'Suugaan iyo Af-Ingaad', titleEn: 'Literature and eloquence',
  levelSo: 'Sare ee ugu dambeeya', levelEn: 'Advanced / mastery',
  descriptionSo: 'Qaadhaan-dhaxal suugaanta Soomaaliyeed: noocyada, abwaannada, maahmaahyada, fahamka gabayga, doodda, akhriska, qoraalka heerka sare iyo mashruuca dhamaadka.',
  descriptionEn: 'Take in the Somali literary heritage: forms, poets, proverbs, poetry appreciation, debate, reading, advanced writing and a final project.',
  objectivesSo: ['Noocyada suugaanta baran', 'Maahmaah iyo xikmad fahmo', 'Gabay falanqeeyo iyada oo aan been abuuran', 'Qoraal heer sare ah qor', 'Hadal fagaare jeediyi'],
  emoji: '✒️',
  readingLevels: [6, 7],
  modules: [m1, m2, m3, m4, m5, m6, m7, m8],
  assessment: {
    id: 's6-assessment', titleSo: 'Tijaabada heerka 6', titleEn: 'Stage 6 assessment',
    items: [
      { id: 's6-a1', skill: 'akhris', promptSo: '“Buraanbur” waa nooc ay caanka ku yihiin…', options: ['haweenka', 'carruurta', 'ganacsatada'], answer: 'haweenka', areaSo: 'Suugaanta' },
      { id: 's6-a2', skill: 'akhris', promptSo: '“Tix” waxay leedahay…', options: ['laxan iyo miisaan', 'kaliya erayo', 'sawirro'], answer: 'laxan iyo miisaan', areaSo: 'Suugaanta' },
      { id: 's6-a3', skill: 'akhris', promptSo: 'Maahmaahda “Aqoon la’aani waa iftiin la’aan” waxay ka hadlaysaa…', options: ['aqoonta', 'lacagta', 'cimilada'], answer: 'aqoonta', areaSo: 'Maahmaahyada' },
      { id: 's6-a4', skill: 'akhris', promptSo: 'Maqaalku wuxuu leeyahay saddex qayb: bilow, jidh iyo…', options: ['dhamaad', 'cinwaan', 'saxiix'], answer: 'dhamaad', areaSo: 'Qoraalka' },
      { id: 's6-a5', skill: 'akhris', promptSo: 'Marka gabay la fahmo, maxaa la sameeyaa ugu horrayntii?', options: ['erayada sawirka leh raadi', 'buug qor', 'sawir sawir'], answer: 'erayada sawirka leh raadi', areaSo: 'Fahamka gabayga' },
      { id: 's6-a6', skill: 'akhris', promptSo: 'Xuquuqda qoraha maansada casriga ah waxay u baahan tahay…', options: ['oggolaansho', 'lacag', 'waxba'], answer: 'oggolaansho', areaSo: 'Xuquuqda' },
    ],
    speakingBriefSo: 'Mashruuc dhamaad ah bandhig: hadal, gabay asal ah, sheeko ama daraasad — ka dib su’aalo ka jawaab.',
    speakingRubric: ['Pronunciation and intelligibility', 'Fluency', 'Vocabulary', 'Argument and analysis', 'Conversation interaction'],
  },
};
