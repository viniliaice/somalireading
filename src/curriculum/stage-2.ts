/**
 * Stage 2 — Erayo iyo Weedho.
 * Reading words, combining sounds, simple sentences, vocabulary, short
 * conversations and first stories. Draft content — PENDING_REVIEW throughout.
 */
import { dialogue, exercise, grammar, lesson, module, passage, question, vocab, type Stage } from './types';

const s = 'stage-2';

const m1 = module({
  id: 's2-m1', stageId: s, titleSo: 'Isku-darka Dhawaaqyada', titleEn: 'Blending sounds',
  descriptionSo: 'Unugyada isku geeya si aad erayo dabiici ah u akhrido.',
  objectivesSo: ['Unugyada isku darka', 'Erayada dabiiciga ah akhrinta', 'Xuduudaha erayada fahmida'],
  lessons: [
    lesson({
      id: 's2-m1-l1', stageId: s, moduleId: 's2-m1', titleSo: 'Unugyada isku gee', titleEn: 'Put the sounds together',
      objectivesSo: ['Unugyada xarfaha isku akhriyo', 'Erayo fudud dhis', 'Dhawaaqa erayga dhammeystiran maqli'],
      minutes: 18, skills: ['akhris', 'dhagaysi', 'qoris'],
      vocab: [
        vocab(s, 's2-baro', 'baro', 'learn', { emoji: '📚', exampleSo: 'Aan baranno erayo cusub.', exampleEn: 'Let us learn new words.' }),
        vocab(s, 's2-bisad', 'bisad', 'cat', { emoji: '🐈', exampleSo: 'Bisaddu waa yar tahay.', exampleEn: 'The cat is small.' }),
        vocab(s, 's2-guri', 'guri', 'house', { emoji: '🏠', exampleSo: 'Gurigayagu waa weyn yahay.', exampleEn: 'Our house is big.' }),
        vocab(s, 's2-buug', 'buug', 'book', { emoji: '📗', exampleSo: 'Buuggan waa cusub yahay.', exampleEn: 'This book is new.' }),
        vocab(s, 's2-biyo', 'biyo', 'water', { emoji: '💧', exampleSo: 'Biyo ayaan cabayaa.', exampleEn: 'I am drinking water.' }),
        vocab(s, 's2-albaab', 'albaab', 'door', { emoji: '🚪', exampleSo: 'Albaabka xir.', exampleEn: 'Close the door.' }),
      ],
      dialogues: [], passages: [],
      grammar: [grammar({
        id: 's2-m1-l1-g1', titleSo: 'Isku-darka', titleEn: 'Blending',
        explanationSo: 'Eraygu wuxuu ka samaysan yahay unugyo: b-i-s-a-d = bisad. Unugyada waa la isku darayaa si tartiib ah, aan la beddelin qorista.',
        explanationEn: 'A word is built from units: b-i-s-a-d = bisad. Blend the units slowly without changing the spelling.',
        examples: [{ so: 'g-u-r-i = guri', en: 'house' }, { so: 'b-u-u-g = buug (uu waa hal dhawaaq)', en: 'book (uu is one long sound)' }],
        review: 'PENDING_REVIEW',
      })],
      speaking: [{ id: 's2-m1-l1-s1', type: 'listen-repeat', promptSo: 'Ku celi eray kasta saddex jeer.', promptEn: 'Repeat each word three times.', phraseSo: 'bisad — guri — buug', phraseEn: 'cat — house — book', rubricFocus: ['Pronunciation', 'Intelligibility'] }],
      exercises: [
        exercise({ id: 's2-m1-l1-e1', type: 'flashcards', titleSo: 'Erayada', skill: 'akhris', objective: true, vocabIds: ['s2-baro', 's2-bisad', 's2-guri', 's2-buug', 's2-biyo', 's2-albaab'] }),
        exercise({ id: 's2-m1-l1-e2', type: 'order-words', titleSo: 'Unugyada dhis', skill: 'akhris', objective: true, promptSo: 'U kala dhig unugyada si aad erayga u dhisto: cat.', tokens: ['b', 'i', 's', 'a', 'd'], answer: ['b', 'i', 's', 'a', 'd'], translationEn: 'bisad = cat' }),
        exercise({ id: 's2-m1-l1-e3', type: 'spelling', titleSo: 'Qor erayga', skill: 'qoris', objective: true, word: 'guri', emoji: '🏠', hintSo: 'Waa meesha aan degan nahay.' }),
        exercise({ id: 's2-m1-l1-e4', type: 'match-word-picture', titleSo: 'Erayga iyo sawirka', skill: 'akhris', objective: true, pairs: [{ left: 'bisad', right: 'cat', emoji: '🐈' }, { left: 'biyo', right: 'water', emoji: '💧' }, { left: 'albaab', right: 'door', emoji: '🚪' }] }),
      ],
      reviewSo: ['Eraygu wuxuu ka samaysan yahay unugyo.', 'uu, aa, ee, ii, oo waa hal dhawaaq dheer mid kasta.'],
      review: 'PENDING_REVIEW',
    }),
    lesson({
      id: 's2-m1-l2', stageId: s, moduleId: 's2-m1', titleSo: 'Xuduudaha erayada', titleEn: 'Word boundaries',
      objectivesSo: ['Erayada kala sooc', 'Weedhaha akhri', 'Erayada isku dhaw kala aqoonsan'],
      minutes: 15, skills: ['akhris', 'qoris'],
      vocab: [
        vocab(s, 's2-weedho', 'weedho', 'phrases / sentences', { emoji: '💬', exampleSo: 'Weedho fudud ayaan akhriyaa.', exampleEn: 'I read simple sentences.' }),
        vocab(s, 's2-erayo', 'erayo', 'words', { emoji: '🔤', exampleSo: 'Erayo cusub ayaan bartay.', exampleEn: 'I learned new words.' }),
        vocab(s, 's2-qalin', 'qalin', 'pen', { emoji: '✏️', exampleSo: 'Qalinkayga isticmaal.', exampleEn: 'Use my pen.' }),
        vocab(s, 's2-miis', 'miis', 'table', { emoji: '🪑', exampleSo: 'Miiska kor dhig.', exampleEn: 'Put it on the table.' }),
        vocab(s, 's2-kursi', 'kursi', 'chair', { emoji: '🪑', exampleSo: 'Kursiga fadhiiso.', exampleEn: 'Sit on the chair.' }),
        vocab(s, 's2-daaqad', 'daaqad', 'window', { emoji: '🪟', exampleSo: 'Daaqadda fur.', exampleEn: 'Open the window.' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's2-m1-l2-p1', titleSo: 'Fasalka', titleEn: 'The classroom', level: 2,
          purposeSo: 'Erayada fasalka akhri.', purposeEn: 'Read classroom words.',
          so: 'Miisku waa weyn yahay. Kursiga wuu yar yahay. Buuggu wuu qurux badan yahay. Qalinku waa cusub.',
          en: 'The table is big. The chair is small. The book is beautiful. The pen is new.',
          glossary: [{ word: 'qurux badan', meaning: 'beautiful' }],
          questions: [
            question('s2-m1-l2-p1-q1', 'detail', 'Maxaa weyn?', 'What is big?', ['Kursiga', 'Miiska', 'Qalinka'], 'Miiska', 'The table'),
            question('s2-m1-l2-p1-q2', 'detail', 'Maxaa yar?', 'What is small?', ['Buugga', 'Miiska', 'Kursiga'], 'Kursiga', 'The chair'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [],
      speaking: [],
      exercises: [
        exercise({ id: 's2-m1-l2-e1', type: 'flashcards', titleSo: 'Erayada fasalka', skill: 'akhris', objective: true, vocabIds: ['s2-weedho', 's2-erayo', 's2-qalin', 's2-miis', 's2-kursi', 's2-daaqad'] }),
        exercise({ id: 's2-m1-l2-e2', type: 'read-answer', titleSo: 'Fasalka: akhri oo ka jawaab', skill: 'akhris', objective: true, passageId: 's2-m1-l2-p1' }),
        exercise({ id: 's2-m1-l2-e3', type: 'fill-blank', titleSo: 'Buuxi', skill: 'qoris', objective: true, sentenceSo: 'Kursiga wuu ________ yahay.', options: ['yar', 'weyn', 'cusub'], answer: 'yar', translationEn: 'The chair is small.' }),
      ],
      reviewSo: ['Eray kasta wuxuu leeyahay bilow iyo dhamaad.', 'Weedhuhu waxay ka samaysan yihiin erayo.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m2 = module({
  id: 's2-m2', stageId: s, titleSo: 'Erayada Maalinlaha ah', titleEn: 'Everyday words',
  descriptionSo: 'Guri, dugsi, buug, qalin, miis, kursi, albaab, daaqad, biyo, cunto, dhar, kabo.',
  objectivesSo: ['12 eray oo maalinle ah baran', 'Sawir iyo eray isku aadi karo', 'Erayada jumlad ku isticmaali karo'],
  lessons: [
    lesson({
      id: 's2-m2-l1', stageId: s, moduleId: 's2-m2', titleSo: 'Guriga iyo dugsiga', titleEn: 'Home and school words',
      objectivesSo: ['Guriga iyo dugsiga erayada baran', 'Sawirka eraygiisa aqoonsan', 'Erayada ku dhex jira jumlad fudud'],
      minutes: 20, skills: ['akhris', 'hadal', 'qoris'],
      vocab: [
        vocab(s, 's2-guri-2', 'guri', 'house', { emoji: '🏠', exampleSo: 'Kani waa guri.', exampleEn: 'This is a house.' }),
        vocab(s, 's2-dugsi', 'dugsi', 'school', { emoji: '🏫', exampleSo: 'Dugsigu waa dhow yahay.', exampleEn: 'The school is near.' }),
        vocab(s, 's2-buug-2', 'buug', 'book', { emoji: '📗', exampleSo: 'Tani waa buug.', exampleEn: 'This is a book.' }),
        vocab(s, 's2-qalin-2', 'qalin', 'pen', { emoji: '✏️', exampleSo: 'Kani waa qalin.', exampleEn: 'This is a pen.' }),
        vocab(s, 's2-miis-2', 'miis', 'table', { emoji: '🍽️', exampleSo: 'Miiska iyo kursiga.', exampleEn: 'The table and the chair.' }),
        vocab(s, 's2-kursi-2', 'kursi', 'chair', { emoji: '🪑', exampleSo: 'Kursiga fadhiiso.', exampleEn: 'Sit on the chair.' }),
      ],
      dialogues: [], passages: [],
      grammar: [grammar({
        id: 's2-m2-l1-g1', titleSo: 'Kani waa…', titleEn: 'This is…',
        explanationSo: 'Si aad sheegto waxyaalaha: “Kani waa buug.” “Tani waa guri.” Erayga “waa” wuxuu xoojiyaa sheekada.',
        explanationEn: 'To name things: “Kani waa buug.” (This is a book.) “Tani waa guri.” (This is a house.) The word “waa” strengthens the statement.',
        examples: [{ so: 'Kani waa qalin.', en: 'This is a pen.' }, { so: 'Tani waa daaqad.', en: 'This is a window.' }],
        review: 'PENDING_REVIEW',
      })],
      speaking: [{ id: 's2-m2-l1-s1', type: 'picture-description', promptSo: 'Sawirka fiiri oo sheeg: “Kani waa…”', promptEn: 'Look at the picture and say “This is…”', emoji: '🏫', hintsSo: ['Kani waa dugsi.', 'Tani waa buug.'], rubricFocus: ['Vocabulary', 'Sentence formation'] }],
      exercises: [
        exercise({ id: 's2-m2-l1-e1', type: 'match-word-picture', titleSo: 'Sawirka iyo erayga', skill: 'akhris', objective: true, pairs: [{ left: 'guri', right: 'house', emoji: '🏠' }, { left: 'dugsi', right: 'school', emoji: '🏫' }, { left: 'buug', right: 'book', emoji: '📗' }, { left: 'qalin', right: 'pen', emoji: '✏️' }, { left: 'miis', right: 'table', emoji: '🍽️' }, { left: 'kursi', right: 'chair', emoji: '🪑' }] }),
        exercise({ id: 's2-m2-l1-e2', type: 'order-words', titleSo: 'Jumlad dhig', skill: 'qoris', objective: true, tokens: ['Kani', 'waa', 'buug'], answer: ['Kani', 'waa', 'buug'], translationEn: 'This is a book.' }),
        exercise({ id: 's2-m2-l1-e3', type: 'spelling', titleSo: 'Qor erayga', skill: 'qoris', objective: true, word: 'dugsi', emoji: '🏫', hintSo: 'Waa meesha aan wax ku baranno.' }),
      ],
      reviewSo: ['Kani waa buug, tani waa guri.', 'Guri, dugsi, buug, qalin, miis, kursi.'],
      review: 'PENDING_REVIEW',
    }),
    lesson({
      id: 's2-m2-l2', stageId: s, moduleId: 's2-m2', titleSo: 'Biyo, cunto, dhar, kabo', titleEn: 'Water, food, clothes, shoes',
      objectivesSo: ['Afar eray oo maalinle ah baran', 'Baahiyaha ku xidhiidhin erayada', 'Jumlad fudud akhri'],
      minutes: 18, skills: ['akhris', 'hadal', 'qoris'],
      vocab: [
        vocab(s, 's2-biyo-2', 'biyo', 'water', { emoji: '💧', exampleSo: 'Biyo ayaan rabaa.', exampleEn: 'I want water.' }),
        vocab(s, 's2-cunto', 'cunto', 'food', { emoji: '🍽️', exampleSo: 'Cuntadu way kulul tahay.', exampleEn: 'The food is hot.' }),
        vocab(s, 's2-dhar', 'dhar', 'clothes', { emoji: '👕', exampleSo: 'Dharkaygu waa cusub yahay.', exampleEn: 'My clothes are new.' }),
        vocab(s, 's2-kabo', 'kabo', 'shoes', { emoji: '👟', exampleSo: 'Kabahayga ii keen.', exampleEn: 'Bring my shoes.' }),
        vocab(s, 's2-albaab-2', 'albaab', 'door', { emoji: '🚪', exampleSo: 'Albaabku waa furan yahay.', exampleEn: 'The door is open.' }),
        vocab(s, 's2-daaqad-2', 'daaqad', 'window', { emoji: '🪟', exampleSo: 'Daaqaddu way qurux badan tahay.', exampleEn: 'The window is beautiful.' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's2-m2-l2-p1', titleSo: 'Guriga', titleEn: 'The house', level: 2,
          purposeSo: 'Qoraal kooban oo guriga ku saabsan akhri.', purposeEn: 'Read a short text about the house.',
          so: 'Kani waa gurigayaga. Albaabku waa weyn yahay. Daaqaddu way qurux badan tahay. Gudaha waxaa jira miis iyo kursi. Biyo iyo cunto ayaan haysannaa.',
          en: 'This is our house. The door is big. The window is beautiful. Inside there is a table and a chair. We have water and food.',
          glossary: [{ word: 'gudaha', meaning: 'inside' }, { word: 'haysannaa', meaning: 'we have' }],
          questions: [
            question('s2-m2-l2-p1-q1', 'what', 'Maxaa gudaha jira?', 'What is inside?', ['Miis iyo kursi', 'Baabuur', 'Dugsi'], 'Miis iyo kursi', 'A table and a chair'),
            question('s2-m2-l2-p1-q2', 'detail', 'Albaabku sidee buu yahay?', 'How is the door?', ['yar', 'weyn', 'xiran'], 'weyn', 'big'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [],
      speaking: [],
      exercises: [
        exercise({ id: 's2-m2-l2-e1', type: 'match-word-picture', titleSo: 'Sawirka iyo erayga', skill: 'akhris', objective: true, pairs: [{ left: 'biyo', right: 'water', emoji: '💧' }, { left: 'cunto', right: 'food', emoji: '🍽️' }, { left: 'dhar', right: 'clothes', emoji: '👕' }, { left: 'kabo', right: 'shoes', emoji: '👟' }] }),
        exercise({ id: 's2-m2-l2-e2', type: 'read-answer', titleSo: 'Guriga: akhri oo ka jawaab', skill: 'akhris', objective: true, passageId: 's2-m2-l2-p1' }),
        exercise({ id: 's2-m2-l2-e3', type: 'fill-blank', titleSo: 'Buuxi', skill: 'qoris', objective: true, sentenceSo: 'Biyo iyo ________ ayaan haysannaa.', options: ['cunto', 'buug', 'kursi'], answer: 'cunto', translationEn: 'We have water and food.' }),
      ],
      reviewSo: ['Biyo, cunto, dhar, kabo.', 'Guriga gudahiisa: miis, kursi, albaab, daaqad.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m3 = module({
  id: 's2-m3', stageId: s, titleSo: 'Shayga iyo Magaciisa', titleEn: 'Objects and their names',
  descriptionSo: 'Sawir arag, dhagayso magaciisa, oo qoraalkiisa dooro.',
  objectivesSo: ['Sawirka iyo qoraalka isku aadin', 'Dhawaaqa iyo erayga isku xidhin', 'Aqoonsiga erayada kor u qaadin'],
  lessons: [
    lesson({
      id: 's2-m3-l1', stageId: s, moduleId: 's2-m3', titleSo: 'Sawirka iyo erayga', titleEn: 'Picture and word',
      objectivesSo: ['Sawirka eraygiisa dooro', 'Erayga maqli karo oo qori karo', 'Aqoonsiga erayada xoojin'],
      minutes: 15, skills: ['akhris', 'dhagaysi', 'qoris'],
      vocab: [
        vocab(s, 's2-moos', 'moos', 'banana', { emoji: '🍌', exampleSo: 'Moosku waa macan yahay.', exampleEn: 'The banana is sweet.' }),
        vocab(s, 's2-rooti', 'rooti', 'bread', { emoji: '🍞', exampleSo: 'Rootiga waa kulul yahay.', exampleEn: 'The bread is hot.' }),
        vocab(s, 's2-caano', 'caano', 'milk', { emoji: '🥛', exampleSo: 'Caanaha cab.', exampleEn: 'Drink the milk.' }),
        vocab(s, 's2-shukumaan', 'shukumaan', 'towel', { emoji: '🧺', exampleSo: 'Shukumaanka ii keen.', exampleEn: 'Bring me the towel.' }),
        vocab(s, 's2-warqad', 'warqad', 'paper', { emoji: '📄', exampleSo: 'Warqad ayaan rabaa.', exampleEn: 'I want paper.' }),
        vocab(s, 's2-tufaax', 'tufaax', 'apple', { emoji: '🍎', exampleSo: 'Tufaaxa cun.', exampleEn: 'Eat the apple.' }),
      ],
      dialogues: [], passages: [],
      grammar: [],
      speaking: [{ id: 's2-m3-l1-s1', type: 'picture-description', promptSo: 'Sawir kasta fiiri oo magaciisa sheeg.', promptEn: 'Look at each picture and say its name.', emoji: '🍎', hintsSo: ['Kani waa tufaax.', 'Kani waa moos.'], rubricFocus: ['Vocabulary', 'Pronunciation'] }],
      exercises: [
        exercise({ id: 's2-m3-l1-e1', type: 'match-word-picture', titleSo: 'Sawirka iyo erayga', skill: 'akhris', objective: true, pairs: [{ left: 'moos', right: 'banana', emoji: '🍌' }, { left: 'rooti', right: 'bread', emoji: '🍞' }, { left: 'caano', right: 'milk', emoji: '🥛' }, { left: 'tufaax', right: 'apple', emoji: '🍎' }, { left: 'warqad', right: 'paper', emoji: '📄' }] }),
        exercise({ id: 's2-m3-l1-e2', type: 'spelling', titleSo: 'Qor magaca sawirka', skill: 'qoris', objective: true, word: 'moos', emoji: '🍌', hintSo: 'Waa midab hurdi ah, wuu qoonyahay.' }),
        exercise({ id: 's2-m3-l1-e3', type: 'flashcards', titleSo: 'Kaararka', skill: 'akhris', objective: true, vocabIds: ['s2-moos', 's2-rooti', 's2-caano', 's2-shukumaan', 's2-warqad', 's2-tufaax'] }),
      ],
      reviewSo: ['Sawirka iyo erayga waa inay is raacaan.', 'Moos, rooti, caano, tufaax.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m4 = module({
  id: 's2-m4', stageId: s, titleSo: 'Weedho Gaagaaban', titleEn: 'Short sentences',
  descriptionSo: 'Jumladaha aasaasiga ah: Kani waa buug. Waxaan ahay arday.',
  objectivesSo: ['Jumlad fudud dhisi karo', '“Waa” iyo “waxaan ahay” isticmaali karo', 'Jumladaha akhriyo oo fahmo'],
  lessons: [
    lesson({
      id: 's2-m4-l1', stageId: s, moduleId: 's2-m4', titleSo: 'Kani waa…', titleEn: 'This is…',
      objectivesSo: ['Jumladaha tilmaanta dhisi', '“Waa” ku isticmaali jumlad', 'Tusaalooyinka akhri'],
      minutes: 18, skills: ['akhris', 'qoris', 'hadal'],
      vocab: [
        vocab(s, 's2-arday', 'arday', 'student', { emoji: '🧒', exampleSo: 'Waxaan ahay arday.', exampleEn: 'I am a student.' }),
        vocab(s, 's2-macallimad', 'macallimad', 'teacher (f.)', { emoji: '👩‍🏫', exampleSo: 'Hooyaday waa macallimad.', exampleEn: 'My mother is a teacher.' }),
        vocab(s, 's2-macallin', 'macallin', 'teacher (m.)', { emoji: '👨‍🏫', exampleSo: 'Macallinku wuu fiican yahay.', exampleEn: 'The teacher is good.' }),
        vocab(s, 's2-akhriyaa', 'akhriyaa', 'reads / is reading', { emoji: '📖', exampleSo: 'Waxaan akhriyaa buug.', exampleEn: 'I read a book.' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's2-m4-l1-p1', titleSo: 'Aniga', titleEn: 'Me', level: 3,
          purposeSo: 'Jumladaha naftayda ku saabsan akhri.', purposeEn: 'Read sentences about myself.',
          so: 'Kani waa buug. Tani waa guri. Waxaan ahay arday. Waxaan akhriyaa buug. Hooyaday waa macallimad.',
          en: 'This is a book. This is a house. I am a student. I read a book. My mother is a teacher.',
          glossary: [{ word: 'waxaan ahay', meaning: 'I am' }],
          questions: [
            question('s2-m4-l1-p1-q1', 'who', 'Yaa macallimad ah?', 'Who is a teacher?', ['Aabbahay', 'Hooyaday', 'Ardayga'], 'Hooyaday', 'My mother'),
            question('s2-m4-l1-p1-q2', 'detail', 'Maxuu akhriyaa?', 'What does he read?', ['Buug', 'Warqad', 'Kursi'], 'Buug', 'A book'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [grammar({
        id: 's2-m4-l1-g1', titleSo: 'Jumladaha aasaasiga ah', titleEn: 'Basic sentences',
        explanationSo: 'Jumlad fudud: [shayga] + waa + [magaca]. Tusaale: Kani waa buug. Markaad naftaada sheegto: Waxaan ahay arday.',
        explanationEn: 'A simple sentence: [thing] + waa + [name]. Example: Kani waa buug. For yourself: Waxaan ahay arday.',
        examples: [{ so: 'Tani waa guri.', en: 'This is a house.' }, { so: 'Waxaan ahay arday.', en: 'I am a student.' }],
        commonErrors: [{ wrong: 'Kani buug waa.', right: 'Kani waa buug.', noteSo: '“Waa” waxay u dhowdahay erayga magaca.' }],
        review: 'PENDING_REVIEW',
      })],
      speaking: [{ id: 's2-m4-l1-s1', type: 'open-speaking', promptSo: 'Saddex jumlad naftaada ku saabsan sheeg.', promptEn: 'Say three sentences about yourself.', hintsSo: ['Waxaan ahay arday.', 'Waxaan akhriyaa buug.', 'Hooyaday waa macallimad.'], rubricFocus: ['Sentence formation', 'Fluency'] }],
      exercises: [
        exercise({ id: 's2-m4-l1-e1', type: 'order-words', titleSo: 'Jumlad dhig', skill: 'qoris', objective: true, tokens: ['Tani', 'waa', 'guri'], answer: ['Tani', 'waa', 'guri'], translationEn: 'This is a house.' }),
        exercise({ id: 's2-m4-l1-e2', type: 'fill-blank', titleSo: 'Buuxi', skill: 'akhris', objective: true, sentenceSo: 'Waxaan ________ arday.', options: ['ahay', 'waa', 'iyo'], answer: 'ahay', translationEn: 'I am a student.' }),
        exercise({ id: 's2-m4-l1-e3', type: 'read-answer', titleSo: 'Aniga: akhri oo ka jawaab', skill: 'akhris', objective: true, passageId: 's2-m4-l1-p1' }),
        exercise({ id: 's2-m4-l1-e4', type: 'match-qa', titleSo: 'Sheeg waxa aad tahay', skill: 'akhris', objective: true, pairs: [{ left: 'Waxaan ahay…', right: 'arday' }, { left: 'Kani waa…', right: 'buug' }, { left: 'Hooyaday waa…', right: 'macallimad' }] }),
      ],
      reviewSo: ['Kani waa buug. Tani waa guri.', 'Waxaan ahay arday.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m5 = module({
  id: 's2-m5', stageId: s, titleSo: 'Akhriska Weedhaha', titleEn: 'Reading sentences',
  descriptionSo: 'Weedh akhri, macnihiisa fahmo, jilaha iyo ficilka aqoonsan.',
  objectivesSo: ['Weedh dhan akhri', 'Jilaha iyo ficilka aqoonsan', 'Weedh iyo sawir isku aadin'],
  lessons: [
    lesson({
      id: 's2-m5-l1', stageId: s, moduleId: 's2-m5', titleSo: 'Yaa, maxay sameeyaa?', titleEn: 'Who does what?',
      objectivesSo: ['Jilaha erayga ugu weyn aqoonsan', 'Ficilka aqoonsan', 'Weedha sawir u dhigma dooran'],
      minutes: 18, skills: ['akhris', 'qoris'],
      vocab: [
        vocab(s, 's2-cunaya', 'cunaya', 'eating', { emoji: '🍽️', exampleSo: 'Ilmuhu wuxuu cunayaa rooti.', exampleEn: 'The child is eating bread.' }),
        vocab(s, 's2-cabaya', 'cabaya', 'drinking', { emoji: '🥤', exampleSo: 'Wuxuu cabayaa biyo.', exampleEn: 'He is drinking water.' }),
        vocab(s, 's2-ciyaaraya', 'ciyaaraya', 'playing', { emoji: '⚽', exampleSo: 'Carruurtu way ciyaarayaan.', exampleEn: 'The children are playing.' }),
        vocab(s, 's2-akhriyaya', 'akhriyaya', 'reading', { emoji: '📖', exampleSo: 'Waxay akhriyaysaa buug.', exampleEn: 'She is reading a book.' }),
        vocab(s, 's2-qoraya', 'qoraya', 'writing', { emoji: '✍️', exampleSo: 'Wuxuu qorayaa warqad.', exampleEn: 'He is writing a paper.' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's2-m5-l1-p1', titleSo: 'Maalinta dugsiga', titleEn: 'A school day', level: 3,
          purposeSo: 'Ficilka jilaha aqoonsan.', purposeEn: 'Identify who does what.',
          so: 'Caasha way akhriyaysaa buug. Axmed wuxuu qorayaa warqad. Carruurtu way ciyaarayaan. Macallinku wuxuu hadlayaa.',
          en: 'Caasha is reading a book. Axmed is writing a paper. The children are playing. The teacher is talking.',
          glossary: [{ word: 'hadlayaa', meaning: 'is talking' }],
          questions: [
            question('s2-m5-l1-p1-q1', 'who', 'Yaa buug akhriyaya?', 'Who is reading a book?', ['Axmed', 'Caasha', 'Macallinka'], 'Caasha', 'Caasha'),
            question('s2-m5-l1-p1-q2', 'what', 'Maxay carruurtu samaynayaan?', 'What are the children doing?', ['way ciyaarayaan', 'way akhriyayaan', 'way qorayaan'], 'way ciyaarayaan', 'they are playing'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [],
      speaking: [],
      exercises: [
        exercise({ id: 's2-m5-l1-e1', type: 'match-qa', titleSo: 'Yaa sameeya?', skill: 'akhris', objective: true, pairs: [{ left: 'Caasha', right: 'way akhriyaysaa buug' }, { left: 'Axmed', right: 'wuxuu qorayaa warqad' }, { left: 'Carruurtu', right: 'way ciyaarayaan' }] }),
        exercise({ id: 's2-m5-l1-e2', type: 'read-answer', titleSo: 'Maalinta dugsiga', skill: 'akhris', objective: true, passageId: 's2-m5-l1-p1' }),
        exercise({ id: 's2-m5-l1-e3', type: 'fill-blank', titleSo: 'Ficilka buuxi', skill: 'qoris', objective: true, sentenceSo: 'Ilmuhu wuxuu ________ biyo.', options: ['cabayaa', 'akhriyaa', 'qoraa'], answer: 'cabayaa', translationEn: 'The child is drinking water.' }),
      ],
      reviewSo: ['Jilaha + ficilka = sheeko.', 'akhriyaya, qoraya, cunaya, cabaya, ciyaaraya.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m6 = module({
  id: 's2-m6', stageId: s, titleSo: 'Wadahadal La Akhrinayo', titleEn: 'Dialogues to read',
  descriptionSo: 'Wadahadalo qoran oo akhri, fahmo, oo ka hadal.',
  objectivesSo: ['Wadahadal qoran akhri', 'Jawaabaha fahmo', 'Wadahadalka ka hadal'],
  lessons: [
    lesson({
      id: 's2-m6-l1', stageId: s, moduleId: 's2-m6', titleSo: 'Dugsiga', titleEn: 'At school',
      objectivesSo: ['Wadahadal dugsi akhri', 'Su’aalaha iyo jawaabaha aqoonsan', 'Hadalka dib u celin'],
      minutes: 18, skills: ['akhris', 'hadal', 'dhagaysi'],
      vocab: [
        vocab(s, 's2-buugga', 'buugga', 'the book', { emoji: '📗', exampleSo: 'Buugga ii keen.', exampleEn: 'Bring me the book.' }),
        vocab(s, 's2-keen', 'keen', 'bring', { emoji: '🤲', exampleSo: 'Qalinka keen.', exampleEn: 'Bring the pen.' }),
        vocab(s, 's2-waan', 'waan', 'yes (soft)', { emoji: '✅', exampleSo: 'Waan, macallimo.', exampleEn: 'Yes, teacher.' }),
      ],
      dialogues: [
        dialogue({
          id: 's2-m6-l1-d1', titleSo: 'Buugga', titleEn: 'The book',
          contextSo: 'Macallin iyo arday.', contextEn: 'A teacher and a student.',
          roles: ['Macallinka', 'Ardayga'],
          lines: [
            { speaker: 'Macallinka', so: 'Buuggaagii keen, fadlan.', en: 'Bring your book, please.' },
            { speaker: 'Ardayga', so: 'Waa kan, macallimo.', en: 'Here it is, teacher.' },
            { speaker: 'Macallinka', so: 'Mahadsanid. Qoraalka akhri.', en: 'Thank you. Read the text.' },
            { speaker: 'Ardayga', so: 'Waan fahmay.', en: 'I understand.' },
          ],
          review: 'PENDING_REVIEW',
        }),
        dialogue({
          id: 's2-m6-l1-d2', titleSo: 'Guriga', titleEn: 'At home',
          contextSo: 'Hooyo iyo ilmo.', contextEn: 'A mother and a child.',
          roles: ['Hooyada', 'Ilmaha'],
          lines: [
            { speaker: 'Hooyada', so: 'Cunto ma rabtaa?', en: 'Do you want food?' },
            { speaker: 'Ilmaha', so: 'Haa, hooyo. Biyo kaloo ayaan rabaa.', en: 'Yes, mother. I also want water.' },
            { speaker: 'Hooyada', so: 'Hadda ayaan keenayaa.', en: 'I will bring it now.' },
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      passages: [],
      grammar: [],
      speaking: [{ id: 's2-m6-l1-s1', type: 'guided-conversation', promptSo: 'Wadahadalka akhri, ka dib qof ka mid ah ka hadal.', promptEn: 'Read the dialogue, then speak one role.', dialogueId: 's2-m6-l1-d1', rubricFocus: ['Conversation interaction', 'Fluency'] }],
      exercises: [
        exercise({ id: 's2-m6-l1-e1', type: 'roleplay', titleSo: 'Buugga', skill: 'hadal', objective: false, dialogueId: 's2-m6-l1-d1' }),
        exercise({ id: 's2-m6-l1-e2', type: 'match-qa', titleSo: 'Su’aasha iyo jawaabta', skill: 'akhris', objective: true, pairs: [{ left: 'Buuggaagii keen.', right: 'Waa kan.' }, { left: 'Cunto ma rabtaa?', right: 'Haa, hooyo.' }] }),
        exercise({ id: 's2-m6-l1-e3', type: 'fill-blank', titleSo: 'Buuxi', skill: 'akhris', objective: true, sentenceSo: 'Qoraalka ________. (read)', options: ['akhri', 'keen', 'qor'], answer: 'akhri', translationEn: 'Read the text.' }),
      ],
      reviewSo: ['Wadahadalku wuxuu ka kooban yahay su’aalo iyo jawaabo.', 'Waa kan = here it is.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m7 = module({
  id: 's2-m7', stageId: s, titleSo: 'Sheekooyinka Gaagaaban', titleEn: 'Short stories',
  descriptionSo: 'Sheekooyin yaryar oo la akhriyi karo: Bisadda, Qoyskeyga, Guriga, Dugsiga, Saaxiibkay, Xayawaanka, Maalinteenna.',
  objectivesSo: ['Sheeko gaaban akhri', 'Dhacdada raac', 'Sheekada dib u sheeg'],
  lessons: [
    lesson({
      id: 's2-m7-l1', stageId: s, moduleId: 's2-m7', titleSo: 'Bisadda iyo qoyskeyga', titleEn: 'The cat and my family',
      objectivesSo: ['Sheeko laba qaybood ah akhri', 'Jilayaasha aqoonsan', 'Su’aalo fudud ka jawaab'],
      minutes: 20, skills: ['akhris', 'hadal'],
      vocab: [
        vocab(s, 's2-bisadda', 'bisadda', 'the cat', { emoji: '🐈', exampleSo: 'Bisaddu way huruddaa.', exampleEn: 'The cat sleeps.' }),
        vocab(s, 's2-huruddaa', 'huruddaa', 'sleeps', { emoji: '😴', exampleSo: 'Ilmuhu wuxuu hurudaa.', exampleEn: 'The child sleeps.' }),
        vocab(s, 's2-weyn-yahay', 'weyn yahay', 'is big', { emoji: '🔺', exampleSo: 'Gurigu waa weyn yahay.', exampleEn: 'The house is big.' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's2-m7-l1-p1', titleSo: 'Bisadda', titleEn: 'The cat', level: 3,
          purposeSo: 'Sheeko gaaban oo bisad ku saabsan.', purposeEn: 'A short story about a cat.',
          so: 'Waxaan leeyahay bisad yar. Magaceedu waa Libaax. Waxay jeceshahay caano. Habeenkii way huruddaa. Subaxdii way ciyaartaa. Bisadaydu waa qurux badan tahay.',
          en: 'I have a small cat. Its name is Libaax. It likes milk. At night it sleeps. In the morning it plays. My cat is beautiful.',
          glossary: [{ word: 'habeenkii', meaning: 'at night' }, { word: 'subaxdii', meaning: 'in the morning' }, { word: 'jeceshahay', meaning: 'likes' }],
          questions: [
            question('s2-m7-l1-p1-q1', 'what', 'Maxay bisaddu jeceshahay?', 'What does the cat like?', ['caano', 'biyo', 'rooti'], 'caano', 'milk'),
            question('s2-m7-l1-p1-q2', 'when', 'Goormay huruddaa?', 'When does it sleep?', ['subaxdii', 'habeenkii', 'galabtii'], 'habeenkii', 'at night'),
            question('s2-m7-l1-p1-q3', 'detail', 'Magaceedu waa…', 'Its name is…', ['Libaax', 'Bisad', 'Caano'], 'Libaax', 'Libaax'),
          ],
          review: 'PENDING_REVIEW',
        }),
        passage({
          id: 's2-m7-l1-p2', titleSo: 'Qoyskeyga', titleEn: 'My family', level: 3,
          purposeSo: 'Sheeko kooban oo qoyska ku saabsan.', purposeEn: 'A short story about family.',
          so: 'Qoyskaygu waa mid farxad leh. Hooyaday waxay karisaa cunto wanaagsan. Aabbahay wuxuu akhriyaa buug habeenkii. Walaashay iyo anigu waan ciyaarnaa. Waxaan is jeclahay qoyskayga.',
          en: 'My family is happy. My mother cooks good food. My father reads a book at night. My sister and I play. We love my family.',
          glossary: [{ word: 'karisaa', meaning: 'cooks' }, { word: 'is jeclahay', meaning: 'love each other' }],
          questions: [
            question('s2-m7-l1-p2-q1', 'who', 'Yaa cunto kara?', 'Who cooks food?', ['Aabbahay', 'Hooyaday', 'Walaashay'], 'Hooyaday', 'My mother'),
            question('s2-m7-l1-p2-q2', 'when', 'Goorma buu akhriyaa aabbahay?', 'When does my father read?', ['subaxdii', 'habeenkii', 'galabtii'], 'habeenkii', 'at night'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [],
      speaking: [{ id: 's2-m7-l1-s1', type: 'open-speaking', promptSo: 'Sheekada dib u sheeg: bisadda, magaceeda, waxay jeceshahay.', promptEn: 'Retell the story: the cat, its name, what it likes.', hintsSo: ['Bisad yar', 'Magaceedu waa Libaax', 'Waxay jeceshahay caano', 'Habeenkii way huruddaa'], rubricFocus: ['Fluency', 'Vocabulary', 'Sentence formation'] }],
      exercises: [
        exercise({ id: 's2-m7-l1-e1', type: 'read-answer', titleSo: 'Bisadda', skill: 'akhris', objective: true, passageId: 's2-m7-l1-p1' }),
        exercise({ id: 's2-m7-l1-e2', type: 'read-answer', titleSo: 'Qoyskeyga', skill: 'akhris', objective: true, passageId: 's2-m7-l1-p2' }),
        exercise({ id: 's2-m7-l1-e3', type: 'match-qa', titleSo: 'Sheekada xasuuso', skill: 'akhris', objective: true, pairs: [{ left: 'Bisadda maxay jeceshahay?', right: 'caano' }, { left: 'Yaa kara cunto?', right: 'hooyaday' }] }),
      ],
      reviewSo: ['Sheekadu waxay leedahay jilayaal iyo dhacdo.', 'Habeenkii, subaxdii — wakhtiga.'],
      review: 'PENDING_REVIEW',
    }),
    lesson({
      id: 's2-m7-l2', stageId: s, moduleId: 's2-m7', titleSo: 'Dugsiga iyo maalinteenna', titleEn: 'School and our day',
      objectivesSo: ['Sheeko maalinle ah akhri', 'Waqtiyada maalinta ku xidhiidhin ficilada', 'Sheekada dib u sheeg'],
      minutes: 20, skills: ['akhris', 'qoris'],
      vocab: [
        vocab(s, 's2-subax', 'subax', 'morning', { emoji: '🌅', exampleSo: 'Subaxdii waan tagaa dugsiga.', exampleEn: 'In the morning I go to school.' }),
        vocab(s, 's2-galab', 'galab', 'afternoon', { emoji: '🌇', exampleSo: 'Galabtii waan ciyaaraa.', exampleEn: 'In the afternoon I play.' }),
        vocab(s, 's2-habeen', 'habeen', 'night', { emoji: '🌙', exampleSo: 'Habeenkii waan hurdaa.', exampleEn: 'At night I sleep.' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's2-m7-l2-p1', titleSo: 'Maalinteenna', titleEn: 'Our day', level: 3,
          purposeSo: 'Maalinta dugsiga akhri.', purposeEn: 'Read about a school day.',
          so: 'Subaxdii waan kacaa oo waan dhaqdaa. Ka dib waan tagaa dugsiga. Dugsiga waxaan akhriyaa oo qoraa. Galabtii waan soo laabtaa guriga. Habeenkii waan akhriyaa sheeko, ka dib waan hurdaa.',
          en: 'In the morning I wake up and wash. Then I go to school. At school I read and write. In the afternoon I come back home. At night I read a story, then I sleep.',
          glossary: [{ word: 'kacaa', meaning: 'wake up' }, { word: 'dhaqdaa', meaning: 'wash' }, { word: 'soo laabtaa', meaning: 'come back' }],
          questions: [
            question('s2-m7-l2-p1-q1', 'sequence', 'Maxaa la sameeyaa ka dib marka la kaco?', 'What is done after waking up?', ['la tago dugsiga', 'la dhaqdo', 'la hurdo'], 'la dhaqdo', 'washing'),
            question('s2-m7-l2-p1-q2', 'where', 'Xaggee buu akhriyaa oo qoraa?', 'Where does he read and write?', ['guriga', 'dugsiga', 'suuqa'], 'dugsiga', 'at school'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [],
      speaking: [],
      exercises: [
        exercise({ id: 's2-m7-l2-e1', type: 'read-answer', titleSo: 'Maalinteenna', skill: 'akhris', objective: true, passageId: 's2-m7-l2-p1' }),
        exercise({ id: 's2-m7-l2-e2', type: 'order-words', titleSo: 'Maalinta kala dhig', skill: 'qoris', objective: true, promptSo: 'U kala dhig tallaabooyinka maalinta.', tokens: ['Subaxdii', 'waa', 'tagaa', 'dugsiga'], answer: ['Subaxdii', 'waa', 'tagaa', 'dugsiga'], translationEn: 'In the morning I go to school.' }),
      ],
      reviewSo: ['Subax, galab, habeen.', 'Sheekadu waxay raacdaa waqti.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m8 = module({
  id: 's2-m8', stageId: s, titleSo: 'Akhris iyo Faham', titleEn: 'Reading and understanding',
  descriptionSo: 'Qoraal akhri oo ka jawaab: yaa, maxay, xaggee, goorma, maxaa.',
  objectivesSo: ['Qoraal kooban akhri', 'Su’aalaha fudud ka jawaab', 'Fahamka akhriska xoojin'],
  lessons: [
    lesson({
      id: 's2-m8-l1', stageId: s, moduleId: 's2-m8', titleSo: 'Yaa? Maxay? Xaggee?', titleEn: 'Who? What? Where?',
      objectivesSo: ['Su’aalaha akhriska ka jawaab', 'Jawaabta qoraalka ka soo saar', 'Fahamkaaga muujin'],
      minutes: 20, skills: ['akhris', 'qoris'],
      vocab: [
        vocab(s, 's2-su-aalaha', 'su’aalaha', 'the questions', { emoji: '❓', exampleSo: 'Su’aalaha ka jawaab.', exampleEn: 'Answer the questions.' }),
        vocab(s, 's2-jawaabaha', 'jawaabaha', 'the answers', { emoji: '💡', exampleSo: 'Jawaabaha saxda ah dooro.', exampleEn: 'Choose the correct answers.' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's2-m8-l1-p1', titleSo: 'Saaxiibkay', titleEn: 'My friend', level: 3,
          purposeSo: 'Qoraal akhri oo su’aalaha ka jawaab.', purposeEn: 'Read and answer questions.',
          so: 'Saaxiibkay magaciisu waa Xasan. Wuxuu ku nool yahay magaalada Hargeysa. Wuxuu jecel yahay ciyaaraha. Subaxdii wuxuu tagaa dugsiga. Galabtii wuxuu la ciyaaraa saaxiibadiis.',
          en: 'My friend’s name is Xasan. He lives in the city of Hargeisa. He loves games. In the morning he goes to school. In the afternoon he plays with his friends.',
          glossary: [{ word: 'jcel', meaning: 'loves' }, { word: 'la ciyaaraa', meaning: 'plays with' }],
          questions: [
            question('s2-m8-l1-p1-q1', 'who', 'Yaa magaciisu yahay Xasan?', 'Who is named Xasan?', ['Saaxiibkay', 'Walaalkay', 'Macallinkay'], 'Saaxiibkay', 'My friend'),
            question('s2-m8-l1-p1-q2', 'where', 'Xaggee buu ku nool yahay?', 'Where does he live?', ['Muqdisho', 'Hargeysa', 'London'], 'Hargeysa', 'Hargeisa'),
            question('s2-m8-l1-p1-q3', 'what', 'Maxuu jecel yahay?', 'What does he like?', ['buugag', 'ciyaaraha', 'cunto'], 'ciyaaraha', 'games'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [],
      speaking: [],
      exercises: [
        exercise({ id: 's2-m8-l1-e1', type: 'read-answer', titleSo: 'Saaxiibkay: akhri oo ka jawaab', skill: 'akhris', objective: true, passageId: 's2-m8-l1-p1' }),
        exercise({ id: 's2-m8-l1-e2', type: 'match-qa', titleSo: 'Su’aasha iyo jawaabta', skill: 'akhris', objective: true, pairs: [{ left: 'Yaa?', right: 'Xasan' }, { left: 'Xaggee?', right: 'Hargeysa' }, { left: 'Maxuu jecel yahay?', right: 'ciyaaraha' }] }),
        exercise({ id: 's2-m8-l1-e3', type: 'fill-blank', titleSo: 'Fahamka buuxi', skill: 'akhris', objective: true, sentenceSo: 'Xasan wuxuu ku nool yahay magaalada ________.', options: ['Hargeysa', 'buug', 'bisad'], answer: 'Hargeysa', translationEn: 'Xasan lives in the city of Hargeisa.' }),
      ],
      reviewSo: ['Yaa = qof, maxay = wax, xaggee = meel.', 'Jawaabtu waxay ka timaadaa qoraalka.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

export const stage2: Stage = {
  id: s, index: 2,
  titleSo: 'Erayo iyo Weedho', titleEn: 'Words and sentences',
  levelSo: 'Bilowga sare', levelEn: 'Early reader',
  descriptionSo: 'Ka gudub xarfaha oo akhri erayo, weedho, wadahadalo iyo sheekooyin yaryar.',
  descriptionEn: 'Move from letters to words, sentences, dialogues and short stories.',
  objectivesSo: ['Erayo si madax bannaan u akhri', 'Weedho fudud dhiso oo fahmo', 'Wadahadalo qoran raac', 'Sheekooyin yaryar akhri', 'Su’aalo fudud ka jawaab'],
  emoji: '📖',
  readingLevels: [2, 3],
  modules: [m1, m2, m3, m4, m5, m6, m7, m8],
  assessment: {
    id: 's2-assessment', titleSo: 'Tijaabada heerka 2', titleEn: 'Stage 2 assessment',
    items: [
      { id: 's2-a1', skill: 'akhris', promptSo: '“Kani waa buug” micnihiisu waa…', options: ['This is a book', 'This is a house', 'I read a book'], answer: 'This is a book', areaSo: 'Weedhaha' },
      { id: 's2-a2', skill: 'akhris', promptSo: 'Bisaddu maxay jeceshahay?', options: ['caano', 'biyo', 'dhar'], answer: 'caano', areaSo: 'Sheekooyinka' },
      { id: 's2-a3', skill: 'qoris', promptSo: 'U kala dhig: [waa / Tani / guri]', options: ['Tani waa guri', 'Guri waa Tani', 'Waa guri Tani'], answer: 'Tani waa guri', areaSo: 'Weedhaha' },
      { id: 's2-a4', skill: 'akhris', promptSo: 'Goorma buu tagaa dugsiga?', options: ['habeenkii', 'subaxdii', 'galabtii'], answer: 'subaxdii', areaSo: 'Fahamka' },
      { id: 's2-a5', skill: 'qoris', promptSo: 'Buuxi: “Waxaan ________ arday.”', options: ['ahay', 'waa', 'iyo'], answer: 'ahay', areaSo: 'Weedhaha' },
      { id: 's2-a6', skill: 'akhris', promptSo: 'Eraygee micnihiisu yahay “door”?', options: ['daaqad', 'albaab', 'miis'], answer: 'albaab', areaSo: 'Erayada' },
    ],
    speakingBriefSo: 'Sheeko gaaban dib u sheeg: bisadda iyo waxay jeceshahay.',
    speakingRubric: ['Fluency', 'Vocabulary', 'Sentence formation'],
  },
};
