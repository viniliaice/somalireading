/**
 * Stage 3 — Wadahadalka Maalinlaha ah.
 * Everyday conversational Somali: introductions, family, school, food, home,
 * numbers and time, the town, body and health, weather, shopping.
 * Draft content — PENDING_REVIEW throughout.
 */
import { dialogue, exercise, grammar, lesson, module, passage, question, vocab, type Stage } from './types';

const s = 'stage-3';

const m1 = module({
  id: 's3-m1', stageId: s, titleSo: 'Aniga iyo Naftayda', titleEn: 'Me, myself and I',
  descriptionSo: 'Magac, da’ meel degan, dugsi, af, xiisaha iyo nolol maalmeedka.',
  objectivesSo: ['Naftayda ku sharxo 30–60 ilbiriqsi', 'Qoraal isbarasho ah akhri', 'Su’aalo nafta ku saabsan ka jawaab'],
  lessons: [
    lesson({
      id: 's3-m1-l1', stageId: s, moduleId: 's3-m1', titleSo: 'Naftayda ayaan sheegayaa', titleEn: 'Introducing myself fully',
      objectivesSo: ['Magaca, da’da, meesha degan sheego', 'Dugsiga iyo afafka sheego', 'Xiisahayga ku daro isbarashada'],
      minutes: 25, skills: ['hadal', 'akhris', 'qoris'],
      vocab: [
        vocab(s, 's3-da', 'da’', 'age', { emoji: '🎂', exampleSo: 'Waa sideed iyo toban jir.', exampleEn: 'I am eighteen years old.' }),
        vocab(s, 's3-jir', 'jir', 'years old', { emoji: '🔢', exampleSo: 'Waa toban jir.', exampleEn: 'Ten years old.' }),
        vocab(s, 's3-degan', 'degan', 'living / settled', { emoji: '📍', exampleSo: 'Waxaan deganahay magaalada…', exampleEn: 'I live in the city of…' }),
        vocab(s, 's3-af', 'af', 'language / mouth', { emoji: '👅', exampleSo: 'Af-Soomaali ayaan ku hadlaa.', exampleEn: 'I speak Somali.' }),
        vocab(s, 's3-ku-hadlaa', 'ku hadlaa', 'speak (a language)', { emoji: '💬', exampleSo: 'Ingiriisi ayaan ku hadlaa.', exampleEn: 'I speak English.' }),
        vocab(s, 's3-xiiso', 'xiiso', 'interest', { emoji: '⭐', exampleSo: 'Xiisahaygu waa akhriska.', exampleEn: 'My interest is reading.' }),
        vocab(s, 's3-maalinle', 'maalinle', 'daily', { emoji: '📅', exampleSo: 'Nolol maalmeedkaygu waa fudud yahay.', exampleEn: 'My daily life is simple.' }),
        vocab(s, 's3-waxaan-jecelahay', 'waxaan jecelahay', 'I like / I love', { emoji: '❤️', exampleSo: 'Waxaan jecelahay inaan akhriyo.', exampleEn: 'I like to read.' }),
      ],
      dialogues: [
        dialogue({
          id: 's3-m1-l1-d1', titleSo: 'Isbarasho dhammeystiran', titleEn: 'A full introduction',
          contextSo: 'Labo arday oo isbaranaya.', contextEn: 'Two students introducing themselves.',
          roles: ['Khadar', 'Hodan'],
          lines: [
            { speaker: 'Khadar', so: 'Magacaygu waa Khadar. Waxaan ahay iyo toban jir.', en: 'My name is Khadar. I am nineteen years old.' },
            { speaker: 'Hodan', so: 'Xaggee baad degan tahay?', en: 'Where do you live?' },
            { speaker: 'Khadar', so: 'Waxaan deganahay Hargeysa. Dugsiga sare ayaan dhigtaa.', en: 'I live in Hargeisa. I attend secondary school.' },
            { speaker: 'Hodan', so: 'Afka maxaad ku hadashaa?', en: 'What language do you speak?' },
            { speaker: 'Khadar', so: 'Af-Soomaali iyo Ingiriisi ayaan ku hadlaa. Waxaan jecelahay akhriska.', en: 'I speak Somali and English. I like reading.' },
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      passages: [
        passage({
          id: 's3-m1-l1-p1', titleSo: 'Qoraal isbarasho', titleEn: 'A written introduction', level: 3,
          purposeSo: 'Qoraal isbarasho ah akhri.', purposeEn: 'Read a written self-introduction.',
          so: 'Magacaygu waa Hodan. Waxaan ahay iyo iyo toban jir. Waxaan deganahay magaalada Muqdisho. Waxaan dhigtaa dugsi sare. Af-Soomaali iyo Ingiriisi ayaan ku hadlaa. Xiisahaygu waa akhriska iyo qorista sheekooyinka.',
          en: 'My name is Hodan. I am nineteen years old. I live in the city of Mogadishu. I attend secondary school. I speak Somali and English. My interest is reading and writing stories.',
          glossary: [{ word: 'dhigtaa', meaning: 'attend (school)' }, { word: 'dugsi sare', meaning: 'secondary school' }],
          questions: [
            question('s3-m1-l1-p1-q1', 'who', 'Magaceedu waa…', 'Her name is…', ['Khadar', 'Hodan', 'Caasha'], 'Hodan', 'Hodan'),
            question('s3-m1-l1-p1-q2', 'detail', 'Xiisaheedu waa…', 'Her interest is…', ['ciyaaraha', 'akhriska iyo qorista', 'cuntada'], 'akhriska iyo qorista', 'reading and writing'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [grammar({
        id: 's3-m1-l1-g1', titleSo: 'Da’da iyo “jir”', titleEn: 'Age and “jir”',
        explanationSo: 'Da’da waxaa lagu sheegaa: “Waa toban jir.” (He is ten years old.) Tirada ka dib erayga “jir” ayaa yimaada.',
        explanationEn: 'Age is expressed with: “Waa toban jir.” The number is followed by “jir”.',
        examples: [{ so: 'Waa shan iyo labaatan jir.', en: 'She is twenty-five years old.' }],
        review: 'PENDING_REVIEW',
      })],
      speaking: [{ id: 's3-m1-l1-s1', type: 'open-speaking', promptSo: 'Naftaada ku sharx 30–60 ilbiriqsi.', promptEn: 'Introduce yourself for 30–60 seconds.', hintsSo: ['Magacaygu waa…', 'Waxaan ahay… jir.', 'Waxaan deganahay…', 'Waxaan jecelahay…'], rubricFocus: ['Fluency', 'Vocabulary', 'Sentence formation'] }],
      exercises: [
        exercise({ id: 's3-m1-l1-e1', type: 'flashcards', titleSo: 'Erayada isbarashada', skill: 'akhris', objective: true, vocabIds: ['s3-da', 's3-jir', 's3-degan', 's3-af', 's3-ku-hadlaa', 's3-xiiso', 's3-waxaan-jecelahay'] }),
        exercise({ id: 's3-m1-l1-e2', type: 'read-answer', titleSo: 'Qoraalka isbarashada', skill: 'akhris', objective: true, passageId: 's3-m1-l1-p1' }),
        exercise({ id: 's3-m1-l1-e3', type: 'order-words', titleSo: 'Jumlad isbarasho', skill: 'qoris', objective: true, tokens: ['Waxaan', 'deganahay', 'Hargeysa'], answer: ['Waxaan', 'deganahay', 'Hargeysa'], translationEn: 'I live in Hargeisa.' }),
        exercise({ id: 's3-m1-l1-e4', type: 'fill-blank', titleSo: 'Buuxi', skill: 'qoris', objective: true, sentenceSo: 'Af-Soomaali ayaan ku ________.', options: ['hadlaa', 'cunaa', 'hurdaa'], answer: 'hadlaa', translationEn: 'I speak Somali.' }),
      ],
      reviewSo: ['Da’da: waa … jir.', 'Waxaan deganahay…, waxaan ku hadlaa…, waxaan jecelahay…'],
      review: 'PENDING_REVIEW',
    }),
    lesson({
      id: 's3-m1-l2', stageId: s, moduleId: 's3-m1', titleSo: 'Nolol maalmeedkayga', titleEn: 'My daily life',
      objectivesSo: ['Maalintayda sheego', 'Ficilada maalinlaha ah ku xidhiidhin waqtiga', 'Su’aalo nolosha ku saabsan ka jawaab'],
      minutes: 20, skills: ['hadal', 'akhris', 'qoris'],
      vocab: [
        vocab(s, 's3-kacaa', 'kacaa', 'wake up', { emoji: '⏰', exampleSo: 'Subaxdii waan kacaa.', exampleEn: 'In the morning I wake up.' }),
        vocab(s, 's3-shaqeeyaa', 'shqeeyaa', 'work', { emoji: '💼', exampleSo: 'Maalin kasta ayaan shaqeeyaa.', exampleEn: 'I work every day.' }),
        vocab(s, 's3-tagaa', 'tagaa', 'go', { emoji: '🚶', exampleSo: 'Dugsiga ayaan tagaa.', exampleEn: 'I go to school.' }),
        vocab(s, 's3-soo-laabtaa', 'soo laabtaa', 'come back', { emoji: '↩️', exampleSo: 'Galabtii waan soo laabtaa.', exampleEn: 'In the afternoon I come back.' }),
        vocab(s, 's3-hurdaa', 'hurdaa', 'sleep', { emoji: '😴', exampleSo: 'Habeenkii waan hurdaa.', exampleEn: 'At night I sleep.' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's3-m1-l2-p1', titleSo: 'Maalin caadi ah', titleEn: 'An ordinary day', level: 3,
          purposeSo: 'Nolol maalmeed akhri.', purposeEn: 'Read a daily routine.',
          so: 'Saacadda lixaad ayaan kacaa. Wajiiga ayaan dhaqdaa, ka dib waan quraacdaa. Dugsiga ayaan tagaa inta u dhaxaysa siddeed iyo laba iyo toban. Galabtii guriga ayaan soo laabtaa, waan ciyaaraa, oo waxaan akhriyaa buug. Tobanka fiidnimo ayaan hurdaa.',
          en: 'I wake up at six. I wash my face, then I have breakfast. I go to school between eight and twelve. In the afternoon I come home, I play, and I read a book. I sleep at ten in the evening.',
          glossary: [{ word: 'quraacdaa', meaning: 'have breakfast' }, { word: 'fiidnimo', meaning: 'in the evening' }],
          questions: [
            question('s3-m1-l2-p1-q1', 'when', 'Goorma buu kacaa?', 'When does he wake up?', ['saacadda lixaad', 'saacadda siddeed', 'tobanka'], 'saacadda lixaad', 'at six'),
            question('s3-m1-l2-p1-q2', 'sequence', 'Maxaa la sameeyaa ka dib wajiga dhaqidda?', 'What comes after washing the face?', ['la hurdo', 'la quraacdo', 'la ciyaaro'], 'la quraacdo', 'having breakfast'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [],
      speaking: [{ id: 's3-m1-l2-s1', type: 'open-speaking', promptSo: 'Maalintaada sheeg: goormaad kacdaa, maxaad samaynaysaa, goormaad hurudaa?', promptEn: 'Tell your day: when you wake, what you do, when you sleep.', hintsSo: ['Subaxdii waan…', 'Galabtii waan…', 'Habeenkii waan…'], rubricFocus: ['Fluency', 'Sentence formation'] }],
      exercises: [
        exercise({ id: 's3-m1-l2-e1', type: 'read-answer', titleSo: 'Maalin caadi ah', skill: 'akhris', objective: true, passageId: 's3-m1-l2-p1' }),
        exercise({ id: 's3-m1-l2-e2', type: 'order-words', titleSo: 'Maalinta kala dhig', skill: 'qoris', objective: true, tokens: ['Saacadda', 'lixaad', 'ayaan', 'kacaa'], answer: ['Saacadda', 'lixaad', 'ayaan', 'kacaa'], translationEn: 'I wake up at six.' }),
        exercise({ id: 's3-m1-l2-e3', type: 'match-qa', titleSo: 'Waqtiga iyo ficilka', skill: 'akhris', objective: true, pairs: [{ left: 'Subaxdii', right: 'waan kacaa' }, { left: 'Galabtii', right: 'waan soo laabtaa' }, { left: 'Habeenkii', right: 'waan hurdaa' }] }),
      ],
      reviewSo: ['Subax, galab, fiid, habeen.', 'Ficilada: kacaa, quraacdaa, tagaa, soo laabtaa, hurdaa.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m2 = module({
  id: 's3-m2', stageId: s, titleSo: 'Qoyska', titleEn: 'Family',
  descriptionSo: 'Xidhiidhka qoyska, sida loo sharxo dadka iyo waxyaalaha qoyska.',
  objectivesSo: ['Xubnaha qoyska ku sharxo astaamo', 'Qoyska waxyaalaha ka hadal', 'Qoraal qoys ah akhri'],
  lessons: [
    lesson({
      id: 's3-m2-l1', stageId: s, moduleId: 's3-m2', titleSo: 'Qoyskayga iyo astaamahooda', titleEn: 'My family and their qualities',
      objectivesSo: ['Astaaamaha dadka ku sharxo: weyn, yar, naxariis badan', 'Qaraabada kala duwan baran', 'Qoyska sheeko kooban ka bixin'],
      minutes: 22, skills: ['hadal', 'akhris', 'qoris'],
      vocab: [
        vocab(s, 's3-abti', 'abti', 'uncle (maternal)', { emoji: '🧔', exampleSo: 'Abtigay wuu shaqeeyaa.', exampleEn: 'My uncle works.' }),
        vocab(s, 's3-hooyadeed', 'hooyadeed', 'her mother', { emoji: '👩', exampleSo: 'Hooyadeed waa dhakhtarad.', exampleEn: 'Her mother is a doctor.' }),
        vocab(s, 's3-naxariis', 'naxariis badan', 'kind / caring', { emoji: '💗', exampleSo: 'Hooyaday waa naxariis badan tahay.', exampleEn: 'My mother is kind.' }),
        vocab(s, 's3-caqli', 'caqli badan', 'clever / smart', { emoji: '🧠', exampleSo: 'Walaashay waa caqli badan tahay.', exampleEn: 'My sister is smart.' }),
        vocab(s, 's3-shaqeeya', 'shqeeya', 'works / working', { emoji: '💼', exampleSo: 'Qoyskaygu wuxuu shaqeeyaa adag.', exampleEn: 'My family works hard.' }),
        vocab(s, 's3-dhakhtarad', 'dhakhtarad', 'doctor (f.)', { emoji: '👩‍⚕️', exampleSo: 'Eeddaday waa dhakhtarad.', exampleEn: 'My aunt is a doctor.' }),
        vocab(s, 's3-ganacsade', 'ganacsade', 'trader / merchant', { emoji: '🧑‍💼', exampleSo: 'Adeerkey waa ganacsade.', exampleEn: 'My uncle is a trader.' }),
      ],
      dialogues: [
        dialogue({
          id: 's3-m2-l1-d1', titleSo: 'Qoyska ka waran', titleEn: 'Talking about family',
          contextSo: 'Labo qof oo ka hadlaya qoysaskooda.', contextEn: 'Two people talking about their families.',
          roles: ['Cabdi', 'Luul'],
          lines: [
            { speaker: 'Cabdi', so: 'Qoyskaaga ka waran? Yaa ugu weyn?', en: 'How is your family? Who is the eldest?' },
            { speaker: 'Luul', so: 'Aabbahay waa ugu weyn. Wuxuu ahaan jiray macallin.', en: 'My father is the eldest. He used to be a teacher.' },
            { speaker: 'Cabdi', so: 'Walaalo ma leedahay?', en: 'Do you have siblings?' },
            { speaker: 'Luul', so: 'Haa, saddex walaal ayaan leeyahay. Walaashayda weyn waa dhakhtarad.', en: 'Yes, I have three siblings. My big sister is a doctor.' },
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      passages: [
        passage({
          id: 's3-m2-l1-p1', titleSo: 'Qoyska Faadumo', titleEn: 'Faadumo’s family', level: 4,
          purposeSo: 'Qoraal qoys ah akhri oo faham.', purposeEn: 'Read and understand a family text.',
          so: 'Qoyska Faadumo wuxuu ka kooban yahay toddoba qof. Aabe iyo hooyo, saddex gabdhood iyo laba wiil. Aabbahay waa ganacsade, hooyaduna waa macallimad. Walaasheeda weyn waxay dhigataa jaamacadda. Maalin kasta, qoysku wuxuu wada cunaa casharka habeenkii, waana wada hadlaan.',
          en: 'Faadumo’s family consists of seven people. A father and mother, three girls and two boys. Her father is a trader and her mother is a teacher. Her big sister attends university. Every day the family eats dinner together and talks.',
          glossary: [{ word: 'ka kooban', meaning: 'consists of' }, { word: 'jaamacadda', meaning: 'university' }, { word: 'casharka', meaning: 'dinner' }],
          questions: [
            question('s3-m2-l1-p1-q1', 'detail', 'Immisa qof ayaa ka kooban qoysku?', 'How many people are in the family?', ['shan', 'toddoba', 'toban'], 'toddoba', 'seven'),
            question('s3-m2-l1-p1-q2', 'who', 'Yaa jaamacadda dhigataa?', 'Who attends university?', ['Faadumo', 'walaasheeda weyn', 'hooyadeed'], 'walaasheeda weyn', 'her big sister'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [],
      speaking: [{ id: 's3-m2-l1-s1', type: 'picture-description', promptSo: 'Qoyskaaga ku sharx astaamo: yaa weyn, yaa yar, yaa shaqeeya.', promptEn: 'Describe your family: who is elder, who is young, who works.', emoji: '👨‍👩‍👧‍👦', hintsSo: ['Waa … jir.', 'Waa naxariis badan.', 'Waa ganacsade.'], rubricFocus: ['Vocabulary', 'Fluency'] }],
      exercises: [
        exercise({ id: 's3-m2-l1-e1', type: 'flashcards', titleSo: 'Qaraabada', skill: 'akhris', objective: true, vocabIds: ['s3-abti', 's3-naxariis', 's3-caqli', 's3-dhakhtarad', 's3-ganacsade'] }),
        exercise({ id: 's3-m2-l1-e2', type: 'read-answer', titleSo: 'Qoyska Faadumo', skill: 'akhris', objective: true, passageId: 's3-m2-l1-p1' }),
        exercise({ id: 's3-m2-l1-e3', type: 'match-qa', titleSo: 'Qofka iyo shaqadiisa', skill: 'akhris', objective: true, pairs: [{ left: 'Hooyaday', right: 'macallimad' }, { left: 'Aabbahay', right: 'ganacsade' }, { left: 'Eeddaday', right: 'dhakhtarad' }] }),
        exercise({ id: 's3-m2-l1-e4', type: 'fill-blank', titleSo: 'Buuxi', skill: 'qoris', objective: true, sentenceSo: 'Walaashayda weyn waa ________.', options: ['dhakhtarad', 'bisad', 'buug'], answer: 'dhakhtarad', translationEn: 'My big sister is a doctor.' }),
      ],
      reviewSo: ['Astaamaha: weyn, yar, naxariis badan, caqli badan.', 'Shaqooyinka: macallin, dhakhtarad, ganacsade.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m3 = module({
  id: 's3-m3', stageId: s, titleSo: 'Dugsiga iyo Waxbarashada', titleEn: 'School and education',
  descriptionSo: 'Macallimiinta, ardayda, maadooyinka, fasallada iyo agabka dugsiga.',
  objectivesSo: ['Maadooyinka dugsiga magacooda baran', 'Dooro macallin iyo arday', 'Waxbarashada ka hadal'],
  lessons: [
    lesson({
      id: 's3-m3-l1', stageId: s, moduleId: 's3-m3', titleSo: 'Maadooyinka iyo fasalka', titleEn: 'Subjects and the classroom',
      objectivesSo: ['Maadooyinka dugsiga baran: xisaab, cilmi, taariikh, suugaan', 'Agabka fasalka ku daro hadalka', 'Wadahadal arday iyo macallin ciyaaro'],
      minutes: 22, skills: ['hadal', 'akhris', 'qoris'],
      vocab: [
        vocab(s, 's3-xisaab', 'xisaab', 'mathematics', { emoji: '➗', exampleSo: 'Xisaabtu waa maado muhiim ah.', exampleEn: 'Maths is an important subject.' }),
        vocab(s, 's3-cilmi', 'cilmi', 'science / knowledge', { emoji: '🔬', exampleSo: 'Cilmiga ayaan jecelahay.', exampleEn: 'I like science.' }),
        vocab(s, 's3-taariikh', 'taariikh', 'history', { emoji: '📜', exampleSo: 'Taariikhda Soomaaliya way dheer tahay.', exampleEn: 'Somali history is long.' }),
        vocab(s, 's3-suugaan', 'suugaan', 'literature', { emoji: '📚', exampleSo: 'Suugaanta ayaan akhriyaa.', exampleEn: 'I read literature.' }),
        vocab(s, 's3-maaddo', 'maaddo', 'subject (school)', { emoji: '📘', exampleSo: 'Maaddooyinka dugsiga.', exampleEn: 'School subjects.' }),
        vocab(s, 's3-fasalka', 'fasalka', 'the classroom / class', { emoji: '🏫', exampleSo: 'Fasalku waa weyn yahay.', exampleEn: 'The classroom is big.' }),
        vocab(s, 's3-buugaag', 'buugaag', 'books', { emoji: '📚', exampleSo: 'Buugaag badan ayaan haystaa.', exampleEn: 'I have many books.' }),
        vocab(s, 's3-su-aal-weydii', 'su’aal weydii', 'ask a question', { emoji: '❓', exampleSo: 'Macallinka su’aal weydii.', exampleEn: 'Ask the teacher a question.' }),
      ],
      dialogues: [
        dialogue({
          id: 's3-m3-l1-d1', titleSo: 'Arday iyo macallin', titleEn: 'Student and teacher',
          contextSo: 'Arday weydiinaya macallinka maaddo.', contextEn: 'A student asking a teacher about a subject.',
          roles: ['Ardayga', 'Macallinka'],
          lines: [
            { speaker: 'Ardayga', so: 'Macallimo, maaddada xisaabta ma adag tahay?', en: 'Teacher, is maths difficult?' },
            { speaker: 'Macallinka', so: 'Maya, haddii aad tababarto way fudud tahay.', en: 'No, if you practise it is easy.' },
            { speaker: 'Ardayga', so: 'Sideen u tababaran karaa?', en: 'How can I practise?' },
            { speaker: 'Macallinka', so: 'Maalin kasta xisaab yar qor. Su’aal haddii aad qabto, i weydii.', en: 'Write a little maths every day. If you have a question, ask me.' },
            { speaker: 'Ardayga', so: 'Mahadsanid, macallimo.', en: 'Thank you, teacher.' },
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      passages: [],
      grammar: [],
      speaking: [{ id: 's3-m3-l1-s1', type: 'guided-conversation', promptSo: 'Dooro macallin ama arday, wadahadalkana dhammaystir.', promptEn: 'Role-play the student–teacher dialogue.', dialogueId: 's3-m3-l1-d1', rubricFocus: ['Conversation interaction', 'Fluency'] }],
      exercises: [
        exercise({ id: 's3-m3-l1-e1', type: 'match-word-picture', titleSo: 'Maaddada iyo sawirka', skill: 'akhris', objective: true, pairs: [{ left: 'xisaab', right: 'maths', emoji: '➗' }, { left: 'cilmi', right: 'science', emoji: '🔬' }, { left: 'taariikh', right: 'history', emoji: '📜' }, { left: 'suugaan', right: 'literature', emoji: '📚' }] }),
        exercise({ id: 's3-m3-l1-e2', type: 'roleplay', titleSo: 'Macallinka iyo ardayga', skill: 'hadal', objective: false, dialogueId: 's3-m3-l1-d1' }),
        exercise({ id: 's3-m3-l1-e3', type: 'fill-blank', titleSo: 'Buuxi', skill: 'qoris', objective: true, sentenceSo: 'Maaddada ________ waa muhiim.', options: ['xisaabta', 'bisadda', 'biyaha'], answer: 'xisaabta', translationEn: 'The subject of maths is important.' }),
      ],
      reviewSo: ['Maadooyin: xisaab, cilmi, taariikh, suugaan.', 'Su’aal weydii = ask a question.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m4 = module({
  id: 's3-m4', stageId: s, titleSo: 'Cuntada iyo Cabitaanka', titleEn: 'Food and drink',
  descriptionSo: 'Cunto, cabitaan, khudaar, midho, cuntada iyo sida loo dalbado.',
  objectivesSo: ['Cuntada iyo cabitaanka magacooda baran', 'Cunto dalban karo', 'Doorbidka sheegi karo'],
  lessons: [
    lesson({
      id: 's3-m4-l1', stageId: s, moduleId: 's3-m4', titleSo: 'Cunto dalbashada', titleEn: 'Ordering food',
      objectivesSo: ['Magacyada cuntada baran', 'Cunto ku dalban karo maqaaxi', 'Doorbidka iyo jeclaan sheegi karo'],
      minutes: 22, skills: ['hadal', 'akhris', 'qoris'],
      vocab: [
        vocab(s, 's3-bariis', 'bariis', 'rice', { emoji: '🍚', exampleSo: 'Bariska wuu macan yahay.', exampleEn: 'The rice is tasty.' }),
        vocab(s, 's3-hilib', 'hilib', 'meat', { emoji: '🍖', exampleSo: 'Hilibka waa kulul yahay.', exampleEn: 'The meat is hot.' }),
        vocab(s, 's3-khudaar-2', 'khudaar', 'vegetables', { emoji: '🥬', exampleSo: 'Khudaarta cun, waa caafimaad.', exampleEn: 'Eat vegetables, they are healthy.' }),
        vocab(s, 's3-midho', 'midho', 'fruits', { emoji: '🍎', exampleSo: 'Midhaha: moos, tufaax, liin.', exampleEn: 'Fruits: banana, apple, lemon.' }),
        vocab(s, 's3-shaah', 'shaah', 'tea', { emoji: '🍵', exampleSo: 'Shaah kulul ayaan rabaa.', exampleEn: 'I want hot tea.' }),
        vocab(s, 's3-caano-2', 'caano', 'milk', { emoji: '🥛', exampleSo: 'Caano iyo rooti.', exampleEn: 'Milk and bread.' }),
        vocab(s, 's3-dalbo', 'dalbo', 'order', { emoji: '🧾', exampleSo: 'Cunto dalbo, fadlan.', exampleEn: 'Order food, please.' }),
        vocab(s, 's3-macan', 'macan', 'tasty / sweet', { emoji: '😋', exampleSo: 'Cuntadu way macan tahay.', exampleEn: 'The food is tasty.' }),
        vocab(s, 's3-jeclahay', 'jeclahay', 'I like', { emoji: '👍', exampleSo: 'Bariiska ayaan jeclahay.', exampleEn: 'I like rice.' }),
        vocab(s, 's3-maqaaxi', 'maqaaxi', 'restaurant / café', { emoji: '🍽️', exampleSo: 'Maqaaxida ayaan tagnay.', exampleEn: 'We went to the restaurant.' }),
      ],
      dialogues: [
        dialogue({
          id: 's3-m4-l1-d1', titleSo: 'Maqaaxida', titleEn: 'At the restaurant',
          contextSo: 'Qof dalbanaya cunto.', contextEn: 'Someone ordering food.',
          roles: ['Macmiilka', 'Shaqaalaha'],
          lines: [
            { speaker: 'Macmiilka', so: 'Waan rabaa bariis iyo hilib, fadlan.', en: 'I would like rice and meat, please.' },
            { speaker: 'Shaqaalaha', so: 'Cabitaan maxaad rabtaa?', en: 'What drink do you want?' },
            { speaker: 'Macmiilka', so: 'Shaah kulul, mahadsanid.', en: 'Hot tea, thank you.' },
            { speaker: 'Shaqaalaha', so: 'Hadda ayaan keenayaa.', en: 'I will bring it now.' },
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      passages: [],
      grammar: [grammar({
        id: 's3-m4-l1-g1', titleSo: 'Rabitaanka', titleEn: 'Wanting things',
        explanationSo: 'Si aad wax u dalbato: “Waan rabaa …” ama “Waxaan rabaa …”. Markaad doorbidayso: “… ayaan jeclahay.”',
        explanationEn: 'To order: “Waan rabaa …” or “Waxaan rabaa …”. For preference: “… ayaan jeclahay.”',
        examples: [{ so: 'Waan rabaa shaah kulul.', en: 'I want hot tea.' }, { so: 'Bariiska ayaan jeclahay.', en: 'I like rice.' }],
        review: 'PENDING_REVIEW',
      })],
      speaking: [{ id: 's3-m4-l1-s1', type: 'guided-conversation', promptSo: 'Maqaaxi ku sugan: cunto dalbo.', promptEn: 'Role-play ordering food in a restaurant.', dialogueId: 's3-m4-l1-d1', rubricFocus: ['Conversation interaction', 'Vocabulary', 'Fluency'] }],
      exercises: [
        exercise({ id: 's3-m4-l1-e1', type: 'match-word-picture', titleSo: 'Cuntada iyo sawirka', skill: 'akhris', objective: true, pairs: [{ left: 'bariis', right: 'rice', emoji: '🍚' }, { left: 'hilib', right: 'meat', emoji: '🍖' }, { left: 'shaah', right: 'tea', emoji: '🍵' }, { left: 'khudaar', right: 'vegetables', emoji: '🥬' }, { left: 'midho', right: 'fruits', emoji: '🍎' }] }),
        exercise({ id: 's3-m4-l1-e2', type: 'roleplay', titleSo: 'Maqaaxida', skill: 'hadal', objective: false, dialogueId: 's3-m4-l1-d1' }),
        exercise({ id: 's3-m4-l1-e3', type: 'order-words', titleSo: 'Dalbasho dhig', skill: 'qoris', objective: true, tokens: ['Waan', 'rabaa', 'bariis', 'iyo', 'hilib'], answer: ['Waan', 'rabaa', 'bariis', 'iyo', 'hilib'], translationEn: 'I want rice and meat.' }),
        exercise({ id: 's3-m4-l1-e4', type: 'fill-blank', titleSo: 'Doorbidka', skill: 'akhris', objective: true, sentenceSo: 'Bariiska ayaan ________.', options: ['jeclahay', 'cunaa', 'ahay'], answer: 'jeclahay', translationEn: 'I like rice.' }),
      ],
      reviewSo: ['Cunto: bariis, hilib, khudaar, midho.', 'Waan rabaa… / … ayaan jeclahay.'],
      review: 'PENDING_REVIEW',
    }),
    lesson({
      id: 's3-m4-l2', stageId: s, moduleId: 's3-m4', titleSo: 'Quraacda iyo casharka', titleEn: 'Breakfast and dinner',
      objectivesSo: ['Cuntada maalinta kala duwan baran', 'Qoyska cuntada wada sheego', 'Qoraal cuntada ku saabsan akhri'],
      minutes: 18, skills: ['akhris', 'qoris', 'hadal'],
      vocab: [
        vocab(s, 's3-quraac', 'quraac', 'breakfast', { emoji: '🍳', exampleSo: 'Quraacda waa muhiim.', exampleEn: 'Breakfast is important.' }),
        vocab(s, 's3-qado', 'qado', 'lunch', { emoji: '🍛', exampleSo: 'Qadada dugsiga ka dib.', exampleEn: 'Lunch after school.' }),
        vocab(s, 's3-casho', 'casho', 'dinner', { emoji: '🍽️', exampleSo: 'Cashada qoyska wada cunaa.', exampleEn: 'Dinner the family eats together.' }),
        vocab(s, 's3-wada-cun', 'wada cun', 'eat together', { emoji: '👨‍👩‍👧', exampleSo: 'Waxaan wada cunnaa cashada.', exampleEn: 'We eat dinner together.' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's3-m4-l2-p1', titleSo: 'Cuntada qoyska', titleEn: 'The family’s food', level: 4,
          purposeSo: 'Cuntada maalinta akhri.', purposeEn: 'Read about daily meals.',
          so: 'Subaxdii waxaan cunnaa rooti, caano iyo ukun. Qadada dugsiga ka dib waxaan cunnaa bariis ama baasto. Casharka qoysku wuxuu wada cunaa cunto kulul: hilib, khudaar iyo baris. Ka dib waxaan cabnaa shaah ama biyo.',
          en: 'In the morning we eat bread, milk and eggs. For lunch after school we eat rice or pasta. For dinner the family eats hot food together: meat, vegetables and rice. Then we drink tea or water.',
          glossary: [{ word: 'ukun', meaning: 'eggs' }, { word: 'baasto', meaning: 'pasta' }],
          questions: [
            question('s3-m4-l2-p1-q1', 'what', 'Maxay subaxdii cunaan?', 'What do they eat in the morning?', ['rooti, caano iyo ukun', 'bariis', 'midho'], 'rooti, caano iyo ukun', 'bread, milk and eggs'),
            question('s3-m4-l2-p1-q2', 'when', 'Goormay wada cunaan cuntada kulul?', 'When do they eat hot food together?', ['subaxdii', 'qadada', 'casharka'], 'casharka', 'at dinner'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [],
      speaking: [],
      exercises: [
        exercise({ id: 's3-m4-l2-e1', type: 'read-answer', titleSo: 'Cuntada qoyska', skill: 'akhris', objective: true, passageId: 's3-m4-l2-p1' }),
        exercise({ id: 's3-m4-l2-e2', type: 'match-qa', titleSo: 'Waqtiyada cuntada', skill: 'akhris', objective: true, pairs: [{ left: 'Subaxdii', right: 'quraac' }, { left: 'Dugsiga ka dib', right: 'qado' }, { left: 'Habeenkii', right: 'casho' }] }),
      ],
      reviewSo: ['Quraac, qado, casho.', 'Waxaan wada cunnaa = we eat together.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m5 = module({
  id: 's3-m5', stageId: s, titleSo: 'Guriga iyo Nolol-maalmeedka', titleEn: 'Home and housekeeping',
  descriptionSo: 'Qolalka, alaabta guriga iyo shaqooyinka guriga.',
  objectivesSo: ['Qolalka guriga magacooda baran', 'Alaabta guriga sheegi karo', 'Guriga ku sharxi karo'],
  lessons: [
    lesson({
      id: 's3-m5-l1', stageId: s, moduleId: 's3-m5', titleSo: 'Qolalka iyo alaabta', titleEn: 'Rooms and furniture',
      objectivesSo: ['Qolalka: jikada, qolka hurdada, musqusha baran', 'Alaabta guriga sheegi', 'Guriga sharxad kooban ka bixin'],
      minutes: 20, skills: ['akhris', 'hadal', 'qoris'],
      vocab: [
        vocab(s, 's3-jiko', 'jiko', 'kitchen', { emoji: '🍳', exampleSo: 'Jikada cunto ayaan karinayaa.', exampleEn: 'I cook food in the kitchen.' }),
        vocab(s, 's3-qol-hurdo', 'qolka hurdada', 'bedroom', { emoji: '🛏️', exampleSo: 'Qolka hurdada wuu qurux badan yahay.', exampleEn: 'The bedroom is beautiful.' }),
        vocab(s, 's3-musqul', 'musqul', 'bathroom / toilet', { emoji: '🚽', exampleSo: 'Musqusha halkan ayay taallaa.', exampleEn: 'The bathroom is here.' }),
        vocab(s, 's3-fariis', 'fariis', 'living room', { emoji: '🛋️', exampleSo: 'Fariisimada qoysku wada fadhiistaa.', exampleEn: 'The family sits together in the living room.' }),
        vocab(s, 's3-sariir', 'sariir', 'bed', { emoji: '🛏️', exampleSo: 'Sariirtu way jilicsan tahay.', exampleEn: 'The bed is soft.' }),
        vocab(s, 's3-karinta', 'karinta', 'cooking', { emoji: '🍲', exampleSo: 'Karintu waa shaqo wanaagsan.', exampleEn: 'Cooking is good work.' }),
        vocab(s, 's3-nadiif', 'nadiif', 'clean', { emoji: '✨', exampleSo: 'Gurigu waa nadiif yahay.', exampleEn: 'The house is clean.' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's3-m5-l1-p1', titleSo: 'Gurigayaga', titleEn: 'Our home', level: 4,
          purposeSo: 'Guri sharxad akhri.', purposeEn: 'Read a home description.',
          so: 'Gurigayagu wuxuu leeyahay afar qol. Jikada waxaa jira miis weyn iyo foorno. Qolka hurdada waxaa jira sariir iyo armaajo. Fariisimada qoysku wuxuu ku wada fadhiistaa habeenkii. Maalin kasta waan nadiifinaa guriga.',
          en: 'Our house has four rooms. The kitchen has a big table and an oven. The bedroom has a bed and a wardrobe. In the living room the family sits together at night. Every day we clean the house.',
          glossary: [{ word: 'foorno', meaning: 'oven' }, { word: 'armaajo', meaning: 'wardrobe' }, { word: 'nadiifinaa', meaning: 'clean' }],
          questions: [
            question('s3-m5-l1-p1-q1', 'detail', 'Immisa qol ayuu leeyahay gurigu?', 'How many rooms does the house have?', ['laba', 'afar', 'shan'], 'afar', 'four'),
            question('s3-m5-l1-p1-q2', 'where', 'Maxaa jira qolka hurdada?', 'What is in the bedroom?', ['miis iyo foorno', 'sariir iyo armaajo', 'kursi'], 'sariir iyo armaajo', 'a bed and a wardrobe'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [],
      speaking: [{ id: 's3-m5-l1-s1', type: 'picture-description', promptSo: 'Gurigaaga ku sharx: immisa qol, maxaa jira.', promptEn: 'Describe your home: how many rooms, what is in them.', emoji: '🏠', hintsSo: ['Gurigayagu wuxuu leeyahay…', 'Jikada waxaa jira…'], rubricFocus: ['Vocabulary', 'Sentence formation'] }],
      exercises: [
        exercise({ id: 's3-m5-l1-e1', type: 'match-word-picture', titleSo: 'Qolka iyo sawirka', skill: 'akhris', objective: true, pairs: [{ left: 'jiko', right: 'kitchen', emoji: '🍳' }, { left: 'qolka hurdada', right: 'bedroom', emoji: '🛏️' }, { left: 'musqul', right: 'bathroom', emoji: '🚽' }, { left: 'sariir', right: 'bed', emoji: '🛏️' }] }),
        exercise({ id: 's3-m5-l1-e2', type: 'read-answer', titleSo: 'Gurigayaga', skill: 'akhris', objective: true, passageId: 's3-m5-l1-p1' }),
        exercise({ id: 's3-m5-l1-e3', type: 'fill-blank', titleSo: 'Buuxi', skill: 'qoris', objective: true, sentenceSo: 'Jikada ayaan ________ cunto.', options: ['karinayaa', 'hurdaa', 'akhriyaa'], answer: 'karinayaa', translationEn: 'I cook food in the kitchen.' }),
      ],
      reviewSo: ['Qolal: jiko, qolka hurdada, musqul, fariis.', 'Alaab: sariir, miis, armaajo, foorno.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m6 = module({
  id: 's3-m6', stageId: s, titleSo: 'Tirada, Waqtiga iyo Taariikhda', titleEn: 'Numbers, time and dates',
  descriptionSo: 'Tirada ilaa kun, maalmaha, bilaha, taariikhda iyo saacadaha.',
  objectivesSo: ['Tirada 1–1000 sheegi karo', 'Maalmaha iyo bilaha baran', 'Wakhtiga weydiisan karo oo sheegi karo'],
  lessons: [
    lesson({
      id: 's3-m6-l1', stageId: s, moduleId: 's3-m6', titleSo: 'Tirada iyo saacadaha', titleEn: 'Numbers and clock times',
      objectivesSo: ['Tirada 1–100 sheegi karo', 'Saacadda sheegi karo', '“Immisa?” ka jawaabi karo'],
      minutes: 25, skills: ['akhris', 'qoris', 'hadal'],
      vocab: [
        vocab(s, 's3-kow', 'kow / mid', 'one', { emoji: '1️⃣', exampleSo: 'Hal buug.', exampleEn: 'One book.' }),
        vocab(s, 's3-laba', 'laba', 'two', { emoji: '2️⃣', exampleSo: 'Laba kursi.', exampleEn: 'Two chairs.' }),
        vocab(s, 's3-saddex', 'saddex', 'three', { emoji: '3️⃣', exampleSo: 'Saddex arday.', exampleEn: 'Three students.' }),
        vocab(s, 's3-afar', 'afar', 'four', { emoji: '4️⃣', exampleSo: 'Afar qol.', exampleEn: 'Four rooms.' }),
        vocab(s, 's3-shan', 'shan', 'five', { emoji: '5️⃣', exampleSo: 'Shan qalin.', exampleEn: 'Five pens.' }),
        vocab(s, 's3-toban', 'toban', 'ten', { emoji: '🔟', exampleSo: 'Toban eray.', exampleEn: 'Ten words.' }),
        vocab(s, 's3-kun', 'kun', 'thousand', { emoji: '💯', exampleSo: 'Kun qof.', exampleEn: 'A thousand people.' }),
        vocab(s, 's3-saacad', 'saacad', 'hour / clock', { emoji: '🕐', exampleSo: 'Saacadu waa sideedda.', exampleEn: 'The time is eight.' }),
        vocab(s, 's3-daqiiqo', 'daqiiqo', 'minute', { emoji: '⏱️', exampleSo: 'Shan daqiiqo sug.', exampleEn: 'Wait five minutes.' }),
      ],
      dialogues: [
        dialogue({
          id: 's3-m6-l1-d1', titleSo: 'Wakhtiga', titleEn: 'The time',
          contextSo: 'Labo qof oo ka hadlaya wakhtiga.', contextEn: 'Two people talking about time.',
          roles: ['Axmed', 'Cabdi'],
          lines: [
            { speaker: 'Cabdi', so: 'Wakhtigu immisa waa?', en: 'What time is it?' },
            { speaker: 'Axmed', so: 'Waa sagaalka iyo rubuc.', en: 'It is quarter past nine.' },
            { speaker: 'Cabdi', so: 'Dugsigu goorma buu bilaabmaa?', en: 'When does school start?' },
            { speaker: 'Axmed', so: 'Tobanka. Waad haysataa wakhti.', en: 'At ten. You have time.' },
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      passages: [],
      grammar: [grammar({
        id: 's3-m6-l1-g1', titleSo: 'Maalmaha iyo bilaha', titleEn: 'Days and months',
        explanationSo: 'Maalmaha: Axad, Isniin, Talaado, Arbaco, Khamiis, Jimce, Sabti. Bilaha Quraanka: Muxarram, Safar, Rabiicul-awal, Rabiicul-aakhir, Jumaadaal-awal, Jumaadaal-aakhir, Rajab, Shacbaan, Ramadaan, Shawwaal, Dul-Qacda, Dul-xijja.',
        explanationEn: 'Days: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday. The Hijri months are used alongside the Gregorian calendar in everyday Somali.',
        examples: [{ so: 'Jimcada waa maalin fasax ah.', en: 'Friday is a holiday.' }, { so: 'Bisha Ramadaan waa bil barakeysan.', en: 'The month of Ramadan is a blessed month.' }],
        dialectNoteSo: 'Magacyada bilaha Quraanka ayaa si weyn loo isticmaalaa; bilaha Ingiriisiga sidoo kale waa la fahmi karaa.',
        review: 'PENDING_REVIEW',
      })],
      speaking: [{ id: 's3-m6-l1-s1', type: 'listen-respond', promptSo: '“Wakhtigu immisa waa?” ka jawaab.', promptEn: 'Answer “What time is it?”', phraseSo: 'Waa siddeedda.', phraseEn: 'It is eight.', rubricFocus: ['Listening response', 'Vocabulary'] }],
      exercises: [
        exercise({ id: 's3-m6-l1-e1', type: 'flashcards', titleSo: 'Tirada', skill: 'akhris', objective: true, vocabIds: ['s3-kow', 's3-laba', 's3-saddex', 's3-afar', 's3-shan', 's3-toban', 's3-kun'] }),
        exercise({ id: 's3-m6-l1-e2', type: 'match-qa', titleSo: 'Tirada iyo erayga', skill: 'akhris', objective: true, pairs: [{ left: '1', right: 'kow' }, { left: '3', right: 'saddex' }, { left: '5', right: 'shan' }, { left: '10', right: 'toban' }] }),
        exercise({ id: 's3-m6-l1-e3', type: 'fill-blank', titleSo: 'Wakhtiga', skill: 'akhris', objective: true, sentenceSo: 'Wakhtigu waa ________ iyo rubuc.', options: ['sagaalka', 'bisadda', 'qolka'], answer: 'sagaalka', translationEn: 'The time is quarter past nine.' }),
        exercise({ id: 's3-m6-l1-e4', type: 'order-words', titleSo: 'Su’aal weydii', skill: 'qoris', objective: true, tokens: ['Wakhtigu', 'immisa', 'waa'], answer: ['Wakhtigu', 'immisa', 'waa'], translationEn: 'What time is it?' }),
      ],
      reviewSo: ['1–10: kow, laba, saddex, afar, shan, lix, toddoba, sideed, sagaal, toban.', 'Maalmaha: Axad … Sabti.', 'Wakhtigu immisa waa?'],
      review: 'PENDING_REVIEW',
    }),
    lesson({
      id: 's3-m6-l2', stageId: s, moduleId: 's3-m6', titleSo: 'Taariikhda', titleEn: 'Dates',
      objectivesSo: ['Taariikhda sheegi karo', 'Bisha iyo maalinta ku xidhiidhin karo', 'Dhalashada ka hadal'],
      minutes: 15, skills: ['akhris', 'qoris', 'hadal'],
      vocab: [
        vocab(s, 's3-taariikhda', 'taariikhda', 'the date', { emoji: '📅', exampleSo: 'Taariikhdu waa maxay?', exampleEn: 'What is the date?' }),
        vocab(s, 's3-bil', 'bil', 'month', { emoji: '🗓️', exampleSo: 'Bishaan waa Ramadaan.', exampleEn: 'This month is Ramadan.' }),
        vocab(s, 's3-sannad', 'sannad', 'year', { emoji: '📆', exampleSo: 'Sannad cusub!', exampleEn: 'Happy new year!' }),
        vocab(s, 's3-dhalasho', 'dhalasho', 'birth', { emoji: '🎂', exampleSo: 'Maalinta dhalashadayda.', exampleEn: 'My birthday.' }),
      ],
      dialogues: [], passages: [],
      grammar: [],
      speaking: [],
      exercises: [
        exercise({ id: 's3-m6-l2-e1', type: 'flashcards', titleSo: 'Taariikhda', skill: 'akhris', objective: true, vocabIds: ['s3-taariikhda', 's3-bil', 's3-sannad', 's3-dhalasho'] }),
        exercise({ id: 's3-m6-l2-e2', type: 'match-qa', titleSo: 'Waxyaalaha wakhtiga', skill: 'akhris', objective: true, pairs: [{ left: 'bil', right: 'month' }, { left: 'sannad', right: 'year' }, { left: 'maalinta dhalashada', right: 'birthday' }] }),
      ],
      reviewSo: ['Bil, sannad, taariikh.', 'Maalinta dhalashada = birthday.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m7 = module({
  id: 's3-m7', stageId: s, titleSo: 'Magaalada iyo Goobaha', titleEn: 'The town and places',
  descriptionSo: 'Suuqa, isbitaalka, masjidka, waddooyinka, gaadiidka iyo jihada weydiisashada.',
  objectivesSo: ['Goobaha magaalada baran', 'Jihada weydiisan karo', 'Gaadiidka magacooda sheegi karo'],
  lessons: [
    lesson({
      id: 's3-m7-l1', stageId: s, moduleId: 's3-m7', titleSo: 'Goobaha iyo jihada', titleEn: 'Places and directions',
      objectivesSo: ['Suuq, isbitaal, masjid, waddo baran', '“Xaggee?” iyo jihada isticmaali', 'Wadahadal jihada ku saabsan ciyaaro'],
      minutes: 22, skills: ['hadal', 'akhris', 'qoris'],
      vocab: [
        vocab(s, 's3-suuq', 'suuq', 'market', { emoji: '🏪', exampleSo: 'Suuqa ayaan tagnay.', exampleEn: 'We went to the market.' }),
        vocab(s, 's3-isbitaal', 'isbitaal', 'hospital', { emoji: '🏥', exampleSo: 'Isbitaalku waa dhow yahay.', exampleEn: 'The hospital is near.' }),
        vocab(s, 's3-masjid', 'masjid', 'mosque', { emoji: '🕌', exampleSo: 'Masjidka ayaan tagnay.', exampleEn: 'We went to the mosque.' }),
        vocab(s, 's3-waddo', 'waddo', 'road / street', { emoji: '🛣️', exampleSo: 'Waddadan waa dhaadheer tahay.', exampleEn: 'This road is long.' }),
        vocab(s, 's3-gaadiid', 'gaadiid', 'vehicles / transport', { emoji: '🚌', exampleSo: 'Gaadiidka magaalada.', exampleEn: 'City transport.' }),
        vocab(s, 's3-baas', 'baas / bas', 'bus', { emoji: '🚌', exampleSo: 'Baska ayaan raacnay.', exampleEn: 'We rode the bus.' }),
        vocab(s, 's3-tagid', 'tagid', 'direction / going', { emoji: '🧭', exampleSo: 'Tagidda suuqa.', exampleEn: 'The way to the market.' }),
        vocab(s, 's3-toos', 'toos', 'straight', { emoji: '⬆️', exampleSo: 'Toos u soco.', exampleEn: 'Go straight.' }),
        vocab(s, 's3-bidix', 'bidix', 'left', { emoji: '⬅️', exampleSo: 'Bidix u leexo.', exampleEn: 'Turn left.' }),
        vocab(s, 's3-midig', 'midig', 'right', { emoji: '➡️', exampleSo: 'Midig u leexo.', exampleEn: 'Turn right.' }),
      ],
      dialogues: [
        dialogue({
          id: 's3-m7-l1-d1', titleSo: 'Jihada weydiisashada', titleEn: 'Asking for directions',
          contextSo: 'Qof weydiinaya waddada suuqa.', contextEn: 'Someone asking the way to the market.',
          roles: ['Qofka', 'Muwaadin'],
          lines: [
            { speaker: 'Qofka', so: 'Fadlan, suuqa xaggee buu yahay?', en: 'Please, where is the market?' },
            { speaker: 'Muwaadin', so: 'Waddadan toos u soco, ka dib midig u leexo.', en: 'Go straight on this road, then turn right.' },
            { speaker: 'Qofka', so: 'Ma dhow baa?', en: 'Is it near?' },
            { speaker: 'Muwaadin', so: 'Haa, shan daqiiqo oo kaliya.', en: 'Yes, only five minutes.' },
            { speaker: 'Qofka', so: 'Mahadsanid!', en: 'Thank you!' },
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      passages: [],
      grammar: [],
      speaking: [{ id: 's3-m7-l1-s1', type: 'guided-conversation', promptSo: 'Jihada weydiiso oo jawaab ka bixi.', promptEn: 'Role-play asking for and giving directions.', dialogueId: 's3-m7-l1-d1', rubricFocus: ['Conversation interaction', 'Vocabulary'] }],
      exercises: [
        exercise({ id: 's3-m7-l1-e1', type: 'match-word-picture', titleSo: 'Goobaha', skill: 'akhris', objective: true, pairs: [{ left: 'suuq', right: 'market', emoji: '🏪' }, { left: 'isbitaal', right: 'hospital', emoji: '🏥' }, { left: 'masjid', right: 'mosque', emoji: '🕌' }, { left: 'waddo', right: 'road', emoji: '🛣️' }] }),
        exercise({ id: 's3-m7-l1-e2', type: 'roleplay', titleSo: 'Jihada', skill: 'hadal', objective: false, dialogueId: 's3-m7-l1-d1' }),
        exercise({ id: 's3-m7-l1-e3', type: 'order-words', titleSo: 'Jihada dhig', skill: 'qoris', objective: true, tokens: ['Toos', 'u', 'soco'], answer: ['Toos', 'u', 'soco'], translationEn: 'Go straight.' }),
        exercise({ id: 's3-m7-l1-e4', type: 'fill-blank', titleSo: 'Jihada', skill: 'akhris', objective: true, sentenceSo: 'Ka dib ________ u leexo.', options: ['midig', 'suuq', 'saacad'], answer: 'midig', translationEn: 'Then turn right.' }),
      ],
      reviewSo: ['Goobo: suuq, isbitaal, masjid, waddo.', 'Toos, bidix, midig.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m8 = module({
  id: 's3-m8', stageId: s, titleSo: 'Jirka iyo Caafimaadka', titleEn: 'Body and health',
  descriptionSo: 'Qaybaha jirka, dareemada, xanuunada fudud iyo caawimaad caafimaad.',
  objectivesSo: ['Qaybaha jirka baran', 'Xanuunka sheegi karo', 'Caafimaadka talo fudud fahmi karo'],
  lessons: [
    lesson({
      id: 's3-m8-l1', stageId: s, moduleId: 's3-m8', titleSo: 'Jirkayga iyo caafimaadkayga', titleEn: 'My body and health',
      objectivesSo: ['Madax, gacan, lug, caloos, indho baran', 'Xanuunka sheeg: madax xanuun, caloos xanuun', '“Waan xanuunsanahay” isticmaali'],
      minutes: 20, skills: ['hadal', 'akhris', 'qoris'],
      vocab: [
        vocab(s, 's3-madax', 'madax', 'head', { emoji: '🧠', exampleSo: 'Madaxaygu waa xanuunayaa.', exampleEn: 'My head hurts.' }),
        vocab(s, 's3-gacan', 'gacan', 'hand / arm', { emoji: '🖐️', exampleSo: 'Gacantayda taag.', exampleEn: 'Raise your hand.' }),
        vocab(s, 's3-lug', 'lug', 'leg / foot', { emoji: '🦵', exampleSo: 'Lugtaydu way xanuunaysaa.', exampleEn: 'My leg hurts.' }),
        vocab(s, 's3-indho', 'indho', 'eyes', { emoji: '👀', exampleSo: 'Indhahaygu waa cad yihiin.', exampleEn: 'My eyes are clear.' }),
        vocab(s, 's3-caloos', 'caloos', 'stomach', { emoji: '🤰', exampleSo: 'Calooshaydu way xanuunaysaa.', exampleEn: 'My stomach hurts.' }),
        vocab(s, 's3-xanuun', 'xanuun', 'pain / illness', { emoji: '🤒', exampleSo: 'Xanuun ayaan qabaa.', exampleEn: 'I have a pain.' }),
        vocab(s, 's3-xanuunsan', 'xanuunsan', 'sick / ill', { emoji: '🤒', exampleSo: 'Waan xanuunsanahay.', exampleEn: 'I am sick.' }),
        vocab(s, 's3-dhakhtar', 'dhakhtar', 'doctor (m.)', { emoji: '👨‍⚕️', exampleSo: 'Dhakhtarka arag.', exampleEn: 'See the doctor.' }),
        vocab(s, 's3-dawo', 'dawo', 'medicine', { emoji: '💊', exampleSo: 'Dawada cab.', exampleEn: 'Take the medicine.' }),
      ],
      dialogues: [
        dialogue({
          id: 's3-m8-l1-d1', titleSo: 'Isbitaalka', titleEn: 'At the hospital',
          contextSo: 'Bukaan iyo dhakhtar.', contextEn: 'A patient and a doctor.',
          roles: ['Bukaanka', 'Dhakhtarka'],
          lines: [
            { speaker: 'Bukaanka', so: 'Dhakhtore, waan xanuunsanahay.', en: 'Doctor, I am sick.' },
            { speaker: 'Dhakhtarka', so: 'Maxaad dareemaysaa?', en: 'What do you feel?' },
            { speaker: 'Bukaanka', so: 'Madaxaygu waa xanuunayaa, waanan daalay.', en: 'My head hurts and I am tired.' },
            { speaker: 'Dhakhtarka', so: 'Dawo cab oo naso. Berri wanaagsan ayaad noqon doontaa.', en: 'Take medicine and rest. You will be better tomorrow.' },
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      passages: [],
      grammar: [],
      speaking: [{ id: 's3-m8-l1-s1', type: 'guided-conversation', promptSo: 'Dhakhtarka u sheeg xanuunkaaga.', promptEn: 'Role-play telling the doctor how you feel.', dialogueId: 's3-m8-l1-d1', rubricFocus: ['Conversation interaction', 'Vocabulary', 'Fluency'] }],
      exercises: [
        exercise({ id: 's3-m8-l1-e1', type: 'match-word-picture', titleSo: 'Jirka', skill: 'akhris', objective: true, pairs: [{ left: 'madax', right: 'head', emoji: '🧠' }, { left: 'gacan', right: 'hand', emoji: '🖐️' }, { left: 'lug', right: 'leg', emoji: '🦵' }, { left: 'indho', right: 'eyes', emoji: '👀' }] }),
        exercise({ id: 's3-m8-l1-e2', type: 'roleplay', titleSo: 'Isbitaalka', skill: 'hadal', objective: false, dialogueId: 's3-m8-l1-d1' }),
        exercise({ id: 's3-m8-l1-e3', type: 'fill-blank', titleSo: 'Xanuunka', skill: 'qoris', objective: true, sentenceSo: 'Madaxaygu waa ________.', options: ['xanuunayaa', 'faraxsan', 'cusub'], answer: 'xanuunayaa', translationEn: 'My head hurts.' }),
      ],
      reviewSo: ['Jirka: madax, gacan, lug, indho, caloos.', 'Waan xanuunsanahay = I am sick.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m9 = module({
  id: 's3-m9', stageId: s, titleSo: 'Cimilada iyo Deegaanka', titleEn: 'Weather and the environment',
  descriptionSo: 'Roob, qorrax, dabayl, xilliyo, xayawaan iyo dabiiciga.',
  objectivesSo: ['Cimilada sheegi karo', 'Xilliyada sannadka baran', 'Xayawaanka iyo dabiiciga ku daro hadalka'],
  lessons: [
    lesson({
      id: 's3-m9-l1', stageId: s, moduleId: 's3-m9', titleSo: 'Cimilada maanta', titleEn: 'Today’s weather',
      objectivesSo: ['Roob, qorrax, dabayl, qabow baran', 'Cimilada weydiisan oo sheegi', 'Xayawaanka magacooda sheegi'],
      minutes: 20, skills: ['dhagaysi', 'hadal', 'akhris', 'qoris'],
      vocab: [
        vocab(s, 's3-roob', 'roob', 'rain', { emoji: '🌧️', exampleSo: 'Maanta roob ayaa da’aya.', exampleEn: 'Today it is raining.' }),
        vocab(s, 's3-qorrax', 'qorrax', 'sun', { emoji: '☀️', exampleSo: 'Qorraxdu way kulul tahay.', exampleEn: 'The sun is hot.' }),
        vocab(s, 's3-dabayl', 'dabayl', 'wind', { emoji: '🌬️', exampleSo: 'Dabaylu way socotaa.', exampleEn: 'The wind is blowing.' }),
        vocab(s, 's3-qabow', 'qabow', 'cold', { emoji: '❄️', exampleSo: 'Habeenkii waa qabow.', exampleEn: 'At night it is cold.' }),
        vocab(s, 's3-kulul', 'kulul', 'hot', { emoji: '🔥', exampleSo: 'Maanta waa kulul.', exampleEn: 'Today is hot.' }),
        vocab(s, 's3-xilli', 'xilli', 'season', { emoji: '🍂', exampleSo: 'Xilliyada sannadka.', exampleEn: 'The seasons of the year.' }),
        vocab(s, 's3-xayawaan', 'xayawaan', 'animal', { emoji: '🐫', exampleSo: 'Xayawaanka dabiiciga ah.', exampleEn: 'Wild animals.' }),
        vocab(s, 's3-geed', 'geed', 'tree', { emoji: '🌳', exampleSo: 'Geedku waa weyn yahay.', exampleEn: 'The tree is big.' }),
        vocab(s, 's3-biyaha', 'biyaha', 'the water', { emoji: '💧', exampleSo: 'Biyaha webiga.', exampleEn: 'The river water.' }),
      ],
      dialogues: [
        dialogue({
          id: 's3-m9-l1-d1', titleSo: 'Cimilada', titleEn: 'The weather',
          contextSo: 'Labo qof oo ka hadlaya cimilada.', contextEn: 'Two people talking about the weather.',
          roles: ['Maryan', 'Caasha'],
          lines: [
            { speaker: 'Maryan', so: 'Maanta cimilada sidee tahay?', en: 'How is the weather today?' },
            { speaker: 'Caasha', so: 'Waa kulul, qorraxduna way baxday.', en: 'It is hot and the sun is out.' },
            { speaker: 'Maryan', so: 'Berri ma roob baa la filayaa?', en: 'Is rain expected tomorrow?' },
            { speaker: 'Caasha', so: 'Haa, waan rajaynayaa roob.', en: 'Yes, I hope for rain.' },
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      passages: [
        passage({
          id: 's3-m9-l1-p1', titleSo: 'Xilliyada', titleEn: 'The seasons', level: 4,
          purposeSo: 'Xilliyada sannadka akhri.', purposeEn: 'Read about the seasons.',
          so: 'Sannadku wuxuu leeyahay xilliyo kala duwan. Xilliga roobka webiyadu way buuxaan, cawska wuu cagaar noqdaa. Xilla qalalan qorraxdu way kulul tahay, dadkuna waxay raadiyaan biyo oo nabaadiino. Xayawaanku waxay ku nool yihiin deegaanka: lo’ ari, geela iyo shimbiro.',
          en: 'The year has different seasons. In the rainy season the rivers fill and the grass turns green. In the dry season the sun is hot and people seek water and pasture. Animals live in the environment: cattle, camels and birds.',
          glossary: [{ word: 'nabaadiino', meaning: 'pasture' }, { word: 'shimbiro', meaning: 'birds' }],
          questions: [
            question('s3-m9-l1-p1-q1', 'when', 'Goorma buu cagaaraa cawsku?', 'When does the grass turn green?', ['xilliga roobka', 'xilliga qalalan', 'habeenkii'], 'xilliga roobka', 'in the rainy season'),
            question('s3-m9-l1-p1-q2', 'detail', 'Yaa ku nool deegaanka?', 'Who lives in the environment?', ['xayawaan', 'buugag', 'miisas'], 'xayawaan', 'animals'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [],
      speaking: [{ id: 's3-m9-l1-s1', type: 'picture-description', promptSo: 'Cimilada maanta sheeg.', promptEn: 'Describe today’s weather.', emoji: '🌤️', hintsSo: ['Maanta waa kulul / qabow.', 'Roob ayaa da’aya.', 'Qorraxdu way baxday.'], rubricFocus: ['Vocabulary', 'Fluency'] }],
      exercises: [
        exercise({ id: 's3-m9-l1-e1', type: 'match-word-picture', titleSo: 'Cimilada', skill: 'akhris', objective: true, pairs: [{ left: 'roob', right: 'rain', emoji: '🌧️' }, { left: 'qorrax', right: 'sun', emoji: '☀️' }, { left: 'dabayl', right: 'wind', emoji: '🌬️' }, { left: 'qabow', right: 'cold', emoji: '❄️' }] }),
        exercise({ id: 's3-m9-l1-e2', type: 'read-answer', titleSo: 'Xilliyada', skill: 'akhris', objective: true, passageId: 's3-m9-l1-p1' }),
        exercise({ id: 's3-m9-l1-e3', type: 'fill-blank', titleSo: 'Cimilada', skill: 'qoris', objective: true, sentenceSo: 'Maanta ________ ayaa da’aya.', options: ['roob', 'qorrax', 'geed'], answer: 'roob', translationEn: 'Today it is raining.' }),
      ],
      reviewSo: ['Roob, qorrax, dabayl, qabow, kulul.', 'Xilliyada: roob iyo qalal.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m10 = module({
  id: 's3-m10', stageId: s, titleSo: 'Dukaamaysiga iyo Adeegyada', titleEn: 'Shopping and services',
  descriptionSo: 'Qiimaha, iibka iyo gadashada, tirada, codsiyada iyo rasiidhada.',
  objectivesSo: ['Qiimaha weydiisan karo', 'Wax iibsan karo', 'Rasiidh fudud fahmi karo'],
  lessons: [
    lesson({
      id: 's3-m10-l1', stageId: s, moduleId: 's3-m10', titleSo: 'Suuqa', titleEn: 'At the market',
      objectivesSo: ['Qiimaha weydiisan: “Waa immisa?”', 'Tirada waxyaalaha sheegi', 'Gadasho dhammaystiri'],
      minutes: 22, skills: ['hadal', 'akhris', 'qoris'],
      vocab: [
        vocab(s, 's3-qiimo', 'qiimo', 'price', { emoji: '💰', exampleSo: 'Qiimuhu waa immisa?', exampleEn: 'What is the price?' }),
        vocab(s, 's3-iibin', 'iibin', 'sell', { emoji: '🛒', exampleSo: 'Waxaan iibiyaa khudaar.', exampleEn: 'I sell vegetables.' }),
        vocab(s, 's3-gadan', 'gadan', 'buy', { emoji: '🛍️', exampleSo: 'Waxaan gadanayaa rooti.', exampleEn: 'I am buying bread.' }),
        vocab(s, 's3-lacag', 'lacag', 'money', { emoji: '💵', exampleSo: 'Lacag ma haystaa?', exampleEn: 'Do you have money?' }),
        vocab(s, 's3-rasiidh', 'rasiidh', 'receipt', { emoji: '🧾', exampleSo: 'Rasiidh ii sii.', exampleEn: 'Give me a receipt.' }),
        vocab(s, 's3-dhow', 'dhow', 'near / few', { emoji: '📍', exampleSo: 'Waa dhow yahay.', exampleEn: 'It is near.' }),
        vocab(s, 's3-badan', 'badan', 'many / much', { emoji: '➕', exampleSo: 'Waxyaalo badan.', exampleEn: 'Many things.' }),
        vocab(s, 's3-gabagabo', 'gabagabo', 'total / end', { emoji: '🧮', exampleSo: 'Gabagabada waa immisa?', exampleEn: 'What is the total?' }),
      ],
      dialogues: [
        dialogue({
          id: 's3-m10-l1-d1', titleSo: 'Suuqa', titleEn: 'Shopping',
          contextSo: 'Iibiyaha iyo macmiilka suuqa.', contextEn: 'A seller and a buyer at the market.',
          roles: ['Macmiilka', 'Iibiyaha'],
          lines: [
            { speaker: 'Macmiilka', so: 'Khudaartu waa immisa?', en: 'How much are the vegetables?' },
            { speaker: 'Iibiyaha', so: 'Laba dollar xirmo kasta.', en: 'Two dollars per bundle.' },
            { speaker: 'Macmiilka', so: 'Laba xirmo i sii, fadlan. Waa immisa gabagabada?', en: 'Give me two bundles, please. What is the total?' },
            { speaker: 'Iibiyaha', so: 'Afar dollar. Mahadsanid!', en: 'Four dollars. Thank you!' },
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      passages: [
        passage({
          id: 's3-m10-l1-p1', titleSo: 'Rasiidh yar', titleEn: 'A small receipt', level: 4,
          purposeSo: 'Rasiidh fudud akhri oo faham.', purposeEn: 'Read and understand a simple receipt.',
          so: 'Dukaanka Barwaaqo\n\nRooti — hal dollar\n\nCaano — laba dollar\n\nMoos — hal dollar\n\nGabagabo: afar dollar\n\nMahadsanid booqashada!',
          en: 'Barwaaqo Shop\n\nBread — one dollar\n\nMilk — two dollars\n\nBanana — one dollar\n\nTotal: four dollars\n\nThank you for visiting!',
          glossary: [{ word: 'gabagabo', meaning: 'total' }],
          questions: [
            question('s3-m10-l1-p1-q1', 'detail', 'Gabagabadu waa immisa?', 'What is the total?', ['hal dollar', 'laba dollar', 'afar dollar'], 'afar dollar', 'four dollars'),
            question('s3-m10-l1-p1-q2', 'what', 'Maxaa la iibiyay?', 'What was bought?', ['rooti, caano, moos', 'buug, qalin', 'dhar, kabo'], 'rooti, caano, moos', 'bread, milk, banana'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [grammar({
        id: 's3-m10-l1-g1', titleSo: 'Weydiisashada qiimaha', titleEn: 'Asking the price',
        explanationSo: '“Waa immisa?” waxay ka dhigan tahay “how much?”. Jawaabtu waa tiro iyo lacag.',
        explanationEn: '“Waa immisa?” means “how much?”. The answer is a number and a currency.',
        examples: [{ so: 'Buntukhigu waa immisa?', en: 'How much is the bag?' }, { so: 'Waa saddex dollar.', en: 'It is three dollars.' }],
        review: 'PENDING_REVIEW',
      })],
      speaking: [{ id: 's3-m10-l1-s1', type: 'guided-conversation', promptSo: 'Suuqa ku sugan: wax iibso, qiimaha weydii.', promptEn: 'Role-play shopping: buy something and ask the price.', dialogueId: 's3-m10-l1-d1', rubricFocus: ['Conversation interaction', 'Vocabulary', 'Fluency'] }],
      exercises: [
        exercise({ id: 's3-m10-l1-e1', type: 'flashcards', titleSo: 'Suuqa', skill: 'akhris', objective: true, vocabIds: ['s3-qiimo', 's3-iibin', 's3-gadan', 's3-lacag', 's3-rasiidh', 's3-gabagabo'] }),
        exercise({ id: 's3-m10-l1-e2', type: 'roleplay', titleSo: 'Suuqa', skill: 'hadal', objective: false, dialogueId: 's3-m10-l1-d1' }),
        exercise({ id: 's3-m10-l1-e3', type: 'read-answer', titleSo: 'Rasiidh yar', skill: 'akhris', objective: true, passageId: 's3-m10-l1-p1' }),
        exercise({ id: 's3-m10-l1-e4', type: 'order-words', titleSo: 'Qiimaha weydii', skill: 'qoris', objective: true, tokens: ['Waa', 'immisa', 'gabagabada'], answer: ['Waa', 'immisa', 'gabagabada'], translationEn: 'What is the total?' }),
      ],
      reviewSo: ['Waa immisa? = how much?', 'Rasiidh, lacag, gabagabo.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

export const stage3: Stage = {
  id: s, index: 3,
  titleSo: 'Wadahadalka Maalinlaha ah', titleEn: 'Everyday conversation',
  levelSo: 'Dhexdhexaad', levelEn: 'Intermediate',
  descriptionSo: 'Ku hadal Af-Soomaali maalin kasta: nafta, qoyska, dugsiga, cuntada, guriga, magaalada, caafimaadka, cimilada iyo suuqa.',
  descriptionEn: 'Speak Somali every day: yourself, family, school, food, home, town, health, weather and the market.',
  objectivesSo: ['Wadahadalo maalinle ah dhammaystiri', 'Qoraal kooban akhri oo qor', 'Su’aalo weydiiso oo jawaabo', 'Dooro iyo xaalad kala duwan ku hadal'],
  emoji: '💬',
  readingLevels: [3, 4],
  modules: [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10],
  assessment: {
    id: 's3-assessment', titleSo: 'Tijaabada heerka 3', titleEn: 'Stage 3 assessment',
    items: [
      { id: 's3-a1', skill: 'akhris', promptSo: '“Waa sideed jir” waxay ka hadlaysaa…', options: ['da’', 'qiimo', 'wakhti'], answer: 'da’', areaSo: 'Naftayda' },
      { id: 's3-a2', skill: 'akhris', promptSo: 'Maxaa lagu cunaa quraacda?', options: ['rooti, caano, ukun', 'sariir', 'buug'], answer: 'rooti, caano, ukun', areaSo: 'Cuntada' },
      { id: 's3-a3', skill: 'akhris', promptSo: '“Toos u soco” macnihiisu waa…', options: ['turn left', 'go straight', 'stop'], answer: 'go straight', areaSo: 'Jihada' },
      { id: 's3-a4', skill: 'qoris', promptSo: 'Buuxi: “Madaxaygu waa ________.”', options: ['xanuunayaa', 'qurux', 'dhaq'], answer: 'xanuunayaa', areaSo: 'Caafimaadka' },
      { id: 's3-a5', skill: 'akhris', promptSo: '“Waa immisa?” waxaa lagu weydiistaa…', options: ['qiimo', 'magac', 'meel'], answer: 'qiimo', areaSo: 'Suuqa' },
      { id: 's3-a6', skill: 'qoris', promptSo: 'U kala dhig: [waa / Wakhtigu / immisa]', options: ['Wakhtigu immisa waa', 'Immisa waa Wakhtigu', 'Waa immisa Wakhtigu'], answer: 'Wakhtigu immisa waa', areaSo: 'Wakhtiga' },
      { id: 's3-a7', skill: 'akhris', promptSo: 'Goorma buu cagaaraa cawsku?', options: ['xilliga roobka', 'xilliga qalalan', 'habeenkii'], answer: 'xilliga roobka', areaSo: 'Cimilada' },
    ],
    speakingBriefSo: 'Wadahadalo dhowr ah dhammaystir: maqaaxi, suuq, isbitaal ama jihada. Macallinku wuu qiimeeyaa.',
    speakingRubric: ['Pronunciation and intelligibility', 'Vocabulary', 'Sentence formation', 'Fluency', 'Conversation interaction'],
  },
};
