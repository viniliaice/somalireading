/**
 * Stage 0 — Maqal iyo Hadal.
 * Listening and oral foundations: familiar sounds, greetings, first vocabulary,
 * classroom language, family, daily needs, questions and first conversations.
 * Draft teaching content — every item is PENDING_REVIEW (see `review.ts`).
 */
import { dialogue, exercise, grammar, lesson, module, passage, question, vocab, type Stage } from './types';

const s = 'stage-0';

/* ------------------------------ Module 0.1 ------------------------------ */
const m01 = module({
  id: 's0-m1', stageId: s, titleSo: 'Dhawaaqyada Af-Soomaaliga', titleEn: 'Sounds of Somali',
  descriptionSo: 'Dhagayso dhawaaqyada, laxanka iyo farqiga u dhexeeya su’aasha iyo sheekada.',
  objectivesSo: ['Dhawaaq kala soocid', 'Dhega dheer iyo gaaban u kala bixid', 'Su’aal iyo sheeko kala aqoonsi', 'Laxanka hadalka fahmid'],
  lessons: [
    lesson({
      id: 's0-m1-l1', stageId: s, moduleId: 's0-m1',
      titleSo: 'Dhagayso dunida', titleEn: 'Listen to the world around you',
      objectivesSo: ['Dhawaaqyada kala duwan maqli karo', 'Erayada af-Soomaaliga ka aqoonsan karo dhagaha', 'Laxanka hadalka ku raaci karo'],
      objectivesEn: ['Notice different sounds', 'Recognise Somali words by ear', 'Follow the rhythm of speech'],
      minutes: 15, skills: ['dhagaysi', 'hadal'],
      vocab: [
        vocab(s, 's0-dhagayso', 'Dhagayso', 'Listen', { emoji: '👂', exampleSo: 'Dhagayso, fadlan.', exampleEn: 'Listen, please.' }),
        vocab(s, 's0-cod', 'Cod', 'Voice / sound', { emoji: '🔊', exampleSo: 'Codkaagu waa qurux badan yahay.', exampleEn: 'Your voice is beautiful.' }),
        vocab(s, 's0-dhawaaq', 'Dhawaaq', 'Sound', { emoji: '✨', exampleSo: 'Dhawaaq cusub ayaan maqlay.', exampleEn: 'I heard a new sound.' }),
        vocab(s, 's0-qoraal', 'Qoraal', 'Writing / text', { emoji: '📝', exampleSo: 'Qoraalka akhri.', exampleEn: 'Read the text.' }),
        vocab(s, 's0-hadal', 'Hadal', 'Speech / talk', { emoji: '💬', exampleSo: 'Hadalkaagu waa cad yahay.', exampleEn: 'Your speech is clear.' }),
        vocab(s, 's0-su-aal', 'Su’aal', 'Question', { emoji: '❓', exampleSo: 'Su’aal ayaan qabaa.', exampleEn: 'I have a question.' }),
        vocab(s, 's0-jawaab', 'Jawaab', 'Answer', { emoji: '💡', exampleSo: 'Jawaabta waa sax.', exampleEn: 'The answer is correct.' }),
      ],
      dialogues: [],
      passages: [
        passage({
          id: 's0-m1-l1-p1', titleSo: 'Su’aal iyo sheeko', titleEn: 'A question and a statement',
          level: 1, purposeSo: 'Farqiga u dhexeeya su’aasha iyo sheekada dhagaha ku ogaan.', purposeEn: 'Hear the difference between a question and a statement.',
          so: 'Magacaygu waa Caasha.\n\nMagacaa?\n\nWaan fiicanahay.\n\nSidee tahay?\n\nSubax wanaagsan!\n\nMa subax wanaagsan baa?',
          en: 'My name is Caasha.\n\nWhat is your name?\n\nI am fine.\n\nHow are you?\n\nGood morning!\n\nIs it a good morning?',
          glossary: [{ word: 'Magacaa?', meaning: 'What is your name?' }, { word: 'Sidee tahay?', meaning: 'How are you?' }],
          questions: [
            question('s0-m1-l1-p1-q1', 'detail', 'Jumladdee su’aal ah?', 'Which sentence is a question?', ['Magacaygu waa Caasha.', 'Magacaa?', 'Waan fiicanahay.'], 'Magacaa?', 'What is your name?'),
            question('s0-m1-l1-p2-q2', 'main-idea', 'Su’aashu waxay rabtaa…', 'A question wants…', ['jawaab.', 'buug.', 'biyo.'], 'jawaab.', 'an answer.'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [
        grammar({
          id: 's0-m1-l1-g1', titleSo: 'Su’aal iyo sheeko', titleEn: 'Questions and statements',
          explanationSo: 'Sheekadu waxay sheegaysaa wax; su’aashuna waxay rabtaa jawaab. Af-Soomaaliga, codka su’aashu kor u kacaa dhamaadka.',
          explanationEn: 'A statement tells something; a question asks for an answer. In Somali, a question voice rises at the end.',
          examples: [{ so: 'Waan fiicanahay.', en: 'I am fine. (statement)' }, { so: 'Sidee tahay?', en: 'How are you? (question)' }],
          review: 'PENDING_REVIEW',
        }),
      ],
      speaking: [
        { id: 's0-m1-l1-s1', type: 'listen-repeat', promptSo: 'Ku celi dhagaha ku maqal.', promptEn: 'Listen and repeat.', phraseSo: 'Dhagayso, fadlan.', phraseEn: 'Listen, please.', hintsSo: ['Cod gaaban oo cad isticmaal.', 'Dhagayso mar kale ka hor intaadan ku celin.'], rubricFocus: ['Pronunciation', 'Intelligibility'] },
        { id: 's0-m1-l1-s2', type: 'listen-respond', promptSo: 'Hadal yar ka jawaab: “Sidee tahay?”', promptEn: 'Answer the question “How are you?” out loud.', phraseSo: 'Waan fiicanahay, mahadsanid.', phraseEn: 'I am fine, thank you.', rubricFocus: ['Listening response', 'Fluency'] },
      ],
      exercises: [
        exercise({ id: 's0-m1-l1-e1', type: 'flashcards', titleSo: 'Kaararka erayada', skill: 'akhris', objective: true, vocabIds: ['s0-dhagayso', 's0-cod', 's0-dhawaaq', 's0-qoraal', 's0-hadal', 's0-su-aal', 's0-jawaab'] }),
        exercise({ id: 's0-m1-l1-e2', type: 'match-qa', titleSo: 'Su’aasha iyo jawaabta', skill: 'akhris', objective: true, promptSo: 'Isku aaddi su’aasha jawaabteeda saxda ah.', pairs: [{ left: 'Magacaa?', right: 'Magacaygu waa Axmed.' }, { left: 'Sidee tahay?', right: 'Waan fiicanahay.' }, { left: 'Subax wanaagsan?', right: 'Subax wanaagsan!' }] }),
        exercise({ id: 's0-m1-l1-e3', type: 'fill-blank', titleSo: 'Buuxi meesha bannaan', skill: 'qoris', objective: true, sentenceSo: 'Waan ________, mahadsanid.', options: ['fiicanahay', 'buug', 'halkan'], answer: 'fiicanahay', translationEn: 'I am ________, thank you.' }),
        exercise({ id: 's0-m1-l1-e4', type: 'order-words', titleSo: 'Hadal sax ah dhig', skill: 'qoris', objective: true, promptSo: 'Erayada haddana u kala dhig si sax ah.', tokens: ['Magacaygu', 'waa', 'Axmed'], answer: ['Magacaygu', 'waa', 'Axmed'], translationEn: 'My name is Axmed.' }),
        exercise({ id: 's0-m1-l1-e5', type: 'repeat-record', titleSo: 'Ku celi eraygan', skill: 'hadal', objective: false, promptSo: 'Dhagayso oo ku celi: “Dhagayso.”', phraseSo: 'Dhagayso', audioId: 'word:s0-dhagayso' }),
      ],
      reviewSo: ['Su’aashu kor ayay u dhacdaa dhamaadka.', 'Sheekadu wax bay sheegaysaa.', 'Erayada: dhagayso, cod, dhawaaq, su’aal, jawaab.'],
      review: 'PENDING_REVIEW',
    }),
    lesson({
      id: 's0-m1-l2', stageId: s, moduleId: 's0-m1',
      titleSo: 'Dheer iyo gaaban', titleEn: 'Long and short sounds',
      objectivesSo: ['Dhawaaqa gaaban iyo dheer kala sooci karo', 'Tusaalooyin maqli karo', 'Erayo isku dhaw kala aqoonsan karo'],
      objectivesEn: ['Distinguish short and long sounds', 'Hear examples', 'Tell similar words apart'],
      minutes: 15, skills: ['dhagaysi', 'akhris'],
      vocab: [
        vocab(s, 's0-bur', 'Bur', 'Flour', { emoji: '🌾', exampleSo: 'Bur ayaan soo iibinay.', exampleEn: 'I bought flour.' }),
        vocab(s, 's0-buur', 'Buur', 'Mountain', { emoji: '⛰️', exampleSo: 'Buurta way qurux badan tahay.', exampleEn: 'The mountain is beautiful.' }),
        vocab(s, 's0-bar', 'Bar', 'Learn / side', { emoji: '📖', exampleSo: 'Aan baranno Af-Soomaali.', exampleEn: 'Let us learn Somali.' }),
        vocab(s, 's0-baar', 'Baar', 'Examine / search', { emoji: '🔎', exampleSo: 'Wax baarayaa.', exampleEn: 'I am searching for something.' }),
        vocab(s, 's0-dhig', 'Dhig', 'Put / place', { emoji: '📦', exampleSo: 'Buugga miiska dhig.', exampleEn: 'Put the book on the table.' }),
        vocab(s, 's0-dhiig', 'Dhiig', 'Blood', { emoji: '🩸', exampleSo: 'Dhiiggu waa muhiim.', exampleEn: 'Blood is important.' }),
      ],
      dialogues: [],
      passages: [],
      grammar: [
        grammar({
          id: 's0-m1-l2-g1', titleSo: 'Shaqal gaaban iyo dheer', titleEn: 'Short and long vowels',
          explanationSo: 'Shaqalku wuu noqon karaa gaaban ama dheer. Shaqalka dheer waxaa lagu qoraa laba xaraf: aa, ee, ii, oo, uu. Wuxuu badali karaa macnaha erayga.',
          explanationEn: 'A vowel can be short or long. A long vowel is written with two letters (aa, ee, ii, oo, uu) and can change the meaning of a word.',
          examples: [{ so: 'bur (flour) / buur (mountain)', en: 'Short u and long uu give different words.' }, { so: 'bar (learn) / baar (examine)', en: 'Short a and long aa give different words.' }],
          review: 'PENDING_REVIEW',
        }),
      ],
      speaking: [
        { id: 's0-m1-l2-s1', type: 'listen-repeat', promptSo: 'Ku celi labada eray, mid gaaban mid dheer.', promptEn: 'Repeat both words: short, then long.', phraseSo: 'Bur… buur.', phraseEn: 'Flour… mountain.', rubricFocus: ['Pronunciation', 'Vowel length'] },
      ],
      exercises: [
        exercise({ id: 's0-m1-l2-e1', type: 'match-word-picture', titleSo: 'Erayga iyo sawirkiisa', skill: 'akhris', objective: true, pairs: [{ left: 'bur', right: 'Flour', emoji: '🌾' }, { left: 'buur', right: 'Mountain', emoji: '⛰️' }, { left: 'dhiig', right: 'Blood', emoji: '🩸' }, { left: 'dhig', right: 'Put', emoji: '📦' }] }),
        exercise({ id: 's0-m1-l2-e2', type: 'fill-blank', titleSo: 'Dheer ama gaaban', skill: 'akhris', objective: true, sentenceSo: 'Aan ________ Af-Soomaali. (learn)', options: ['bar', 'baar'], answer: 'bar', translationEn: 'Let us learn Somali.' }),
        exercise({ id: 's0-m1-l2-e3', type: 'order-words', titleSo: 'Jumlad dhig', skill: 'qoris', objective: true, promptSo: 'U kala dhig erayada jumlad sax ah.', tokens: ['Buugga', 'miiska', 'dhig'], answer: ['Buugga', 'miiska', 'dhig'], translationEn: 'Put the book on the table.' }),
        exercise({ id: 's0-m1-l2-e4', type: 'flashcards', titleSo: 'Kaararka', skill: 'akhris', objective: true, vocabIds: ['s0-bur', 's0-buur', 's0-bar', 's0-baar', 's0-dhig', 's0-dhiig'] }),
      ],
      reviewSo: ['Shaqalka dheer waa laba xaraf.', 'bur iyo buur waa erayo kala duwan.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

/* ------------------------------ Module 0.2 ------------------------------ */
const m02 = module({
  id: 's0-m2', stageId: s, titleSo: 'Salaanta iyo Isbarashada', titleEn: 'Greetings and introductions',
  descriptionSo: 'Salaan, isbarasho iyo wadahadal koowaad oo dabiici ah.',
  objectivesSo: ['Salaan kala duwan isticmaali karo', 'Magacayga sheegi karo', 'Wadahadal koowaad dhammaystiri karo'],
  lessons: [
    lesson({
      id: 's0-m2-l1', stageId: s, moduleId: 's0-m2',
      titleSo: 'Salaanta', titleEn: 'Greetings',
      objectivesSo: ['Salaamaha maalinlaha ah isticmaali karo', 'Salaanta iyo jawaabteeda xasuusan karo', 'Waqtiyada kala duwan ee maalinta ku salaami karo'],
      objectivesEn: ['Use everyday greetings', 'Remember the greeting and its reply', 'Greet people at different times of day'],
      minutes: 20, skills: ['dhagaysi', 'hadal', 'akhris'],
      vocab: [
        vocab(s, 's0-salaam', 'As-salaamu calaykum', 'Peace be upon you (greeting)', { emoji: '🤝', exampleSo: 'As-salaamu calaykum, adeer.', exampleEn: 'Peace be upon you, uncle.' }),
        vocab(s, 's0-wa-calaykum', 'Wa calaykumu salaam', 'And upon you peace (reply)', { emoji: '🤝', exampleSo: '— As-salaamu calaykum. — Wa calaykumu salaam.' }),
        vocab(s, 's0-subax', 'Subax wanaagsan', 'Good morning', { emoji: '🌅', exampleSo: 'Subax wanaagsan, hooyo!', exampleEn: 'Good morning, mother!' }),
        vocab(s, 's0-galab', 'Galab wanaagsan', 'Good afternoon', { emoji: '🌇', exampleSo: 'Galab wanaagsan, macallimad.', exampleEn: 'Good afternoon, teacher.' }),
        vocab(s, 's0-habeen', 'Habeen wanaagsan', 'Good night', { emoji: '🌙', exampleSo: 'Habeen wanaagsan, qoyskeyga.', exampleEn: 'Good night, my family.' }),
        vocab(s, 's0-iskawarran', 'Iska warran?', 'How are things?', { emoji: '💬', exampleSo: 'Iska warran, saaxiib?', exampleEn: 'How are things, friend?' }),
        vocab(s, 's0-fiicanahay', 'Waan fiicanahay', 'I am fine', { emoji: '😊', exampleSo: 'Waan fiicanahay, mahadsanid.' }),
        vocab(s, 's0-mahadsanid', 'Mahadsanid', 'Thank you', { emoji: '🙏', exampleSo: 'Mahadsanid, walaal.', exampleEn: 'Thank you, sibling/friend.' }),
        vocab(s, 's0-fadlan', 'Fadlan', 'Please', { emoji: '🤲', exampleSo: 'Fadlan, ii akhri.', exampleEn: 'Please, read to me.' }),
      ],
      dialogues: [
        dialogue({
          id: 's0-m2-l1-d1', titleSo: 'Salaan koowaad', titleEn: 'A first greeting',
          contextSo: 'Labo qof oo isku arag waddo.', contextEn: 'Two people who meet on a road.',
          roles: ['Axmed', 'Faadumo'],
          lines: [
            { speaker: 'Axmed', so: 'As-salaamu calaykum.', en: 'Peace be upon you.' },
            { speaker: 'Faadumo', so: 'Wa calaykumu salaam.', en: 'And upon you peace.' },
            { speaker: 'Axmed', so: 'Iska warran?', en: 'How are things?' },
            { speaker: 'Faadumo', so: 'Waan fiicanahay, mahadsanid. Adiga?', en: 'I am fine, thank you. And you?' },
            { speaker: 'Axmed', so: 'Aniguna waan fiicanahay.', en: 'I am fine too.' },
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      passages: [],
      grammar: [],
      speaking: [
        { id: 's0-m2-l1-s1', type: 'listen-repeat', promptSo: 'Ku celi salaan kasta.', promptEn: 'Repeat each greeting.', phraseSo: 'As-salaamu calaykum.', phraseEn: 'Peace be upon you.', rubricFocus: ['Pronunciation', 'Intelligibility'] },
        { id: 's0-m2-l1-s2', type: 'guided-conversation', promptSo: 'Wadahadalkan qof ka mid ah ka hadal.', promptEn: 'Speak one role in this dialogue.', dialogueId: 's0-m2-l1-d1', rubricFocus: ['Conversation interaction', 'Fluency'] },
      ],
      exercises: [
        exercise({ id: 's0-m2-l1-e1', type: 'flashcards', titleSo: 'Salaamaha', skill: 'akhris', objective: true, vocabIds: ['s0-salaam', 's0-wa-calaykum', 's0-subax', 's0-galab', 's0-habeen', 's0-iskawarran', 's0-fiicanahay', 's0-mahadsanid', 's0-fadlan'] }),
        exercise({ id: 's0-m2-l1-e2', type: 'match-qa', titleSo: 'Salaanta iyo jawaabteeda', skill: 'akhris', objective: true, pairs: [{ left: 'As-salaamu calaykum', right: 'Wa calaykumu salaam' }, { left: 'Iska warran?', right: 'Waan fiicanahay' }, { left: 'Subax wanaagsan', right: 'Subax wanaagsan' }] }),
        exercise({ id: 's0-m2-l1-e3', type: 'fill-blank', titleSo: 'Buuxi', skill: 'qoris', objective: true, sentenceSo: '— As-salaamu calaykum. — Wa ________.', options: ['calaykumu salaam', 'habeen wanaagsan', 'magacaa'], answer: 'calaykumu salaam' }),
        exercise({ id: 's0-m2-l1-e4', type: 'roleplay', titleSo: 'Wadahadal ciyaar', skill: 'hadal', objective: false, dialogueId: 's0-m2-l1-d1' }),
      ],
      reviewSo: ['Salaantu waa: As-salaamu calaykum — Wa calaykumu salaam.', 'Iska warran? waxay ka dhigan tahay “sidee tahay?”.'],
      review: 'PENDING_REVIEW',
    }),
    lesson({
      id: 's0-m2-l2', stageId: s, moduleId: 's0-m2',
      titleSo: 'Isbarashada', titleEn: 'Introducing yourself',
      objectivesSo: ['Magacayga sheegi karo', 'Magaca qof kale weydiisan karo', 'Isbarasho dhammaystiri karo'],
      objectivesEn: ['Say my name', 'Ask someone their name', 'Complete an introduction'],
      minutes: 20, skills: ['dhagaysi', 'hadal', 'akhris', 'qoris'],
      vocab: [
        vocab(s, 's0-magacaa', 'Magacaa?', 'What is your name?', { emoji: '🙋', exampleSo: 'Magacaa, walaal?', exampleEn: 'What is your name, friend?' }),
        vocab(s, 's0-magacaygu', 'Magacaygu waa …', 'My name is …', { emoji: '🏷️', exampleSo: 'Magacaygu waa Maxamed.', exampleEn: 'My name is Maxamed.' }),
        vocab(s, 's0-magacaaga', 'Magacaaga?', 'Your name?', { emoji: '🏷️', exampleSo: 'Magacaaga ma ii sheegi kartaa?', exampleEn: 'Can you tell me your name?' }),
        vocab(s, 's0-ku-farahay', 'Waan ku faraxsanahay', 'I am pleased to meet you', { emoji: '😊', exampleSo: 'Waan ku faraxsanahay, Caasha.', exampleEn: 'I am pleased to meet you, Caasha.' }),
        vocab(s, 's0-ka-yimid', 'Halkee ayaad ka timid?', 'Where are you from?', { emoji: '🌍', exampleSo: 'Halkee ayaad ka timid?', exampleEn: 'Where are you from?' }),
        vocab(s, 's0-waxaan-ka-yimid', 'Waxaan ka imid …', 'I come from …', { emoji: '🗺️', exampleSo: 'Waxaan ka imid Hargeysa.', exampleEn: 'I come from Hargeisa.' }),
      ],
      dialogues: [
        dialogue({
          id: 's0-m2-l2-d1', titleSo: 'Isbarasho', titleEn: 'An introduction',
          contextSo: 'Arday labo oo dugsi isku arag.', contextEn: 'Two students who meet at school.',
          roles: ['Cabdi', 'Maryan'],
          lines: [
            { speaker: 'Cabdi', so: 'As-salaamu calaykum. Magacaa?', en: 'Peace be upon you. What is your name?' },
            { speaker: 'Maryan', so: 'Wa calaykumu salaam. Magacaygu waa Maryan. Adiga maxaa laguugu yeedhaa?', en: 'And upon you peace. My name is Maryan. What are you called?' },
            { speaker: 'Cabdi', so: 'Magacaygu waa Cabdi. Waan ku faraxsanahay.', en: 'My name is Cabdi. I am pleased to meet you.' },
            { speaker: 'Maryan', so: 'Aniguna waan ku faraxsanahay!', en: 'I am pleased to meet you too!' },
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      passages: [
        passage({
          id: 's0-m2-l2-p1', titleSo: 'Caasha', titleEn: 'Caasha',
          level: 1, purposeSo: 'Isbarasho kooban akhri.', purposeEn: 'Read a short introduction.',
          so: 'Magacaygu waa Caasha. Waxaan ka imid magaalada Muqdisho. Waxaan ahay arday. Af-Soomaali ayaan ku hadlaa.',
          en: 'My name is Caasha. I come from the city of Mogadishu. I am a student. I speak Somali.',
          glossary: [{ word: 'arday', meaning: 'student' }, { word: 'magaalada', meaning: 'the city' }],
          questions: [
            question('s0-m2-l2-p1-q1', 'who', 'Yaa magaciisu yahay Caasha?', 'Who is named Caasha?', ['Qofka', 'Buugga', 'Magaalada'], 'Qofka', 'The person'),
            question('s0-m2-l2-p1-q2', 'where', 'Halkee ayay ka timid?', 'Where does she come from?', ['Hargeysa', 'Muqdisho', 'London'], 'Muqdisho', 'Mogadishu'),
            question('s0-m2-l2-p1-q3', 'detail', 'Maxay tahay?', 'What is she?', ['Macallimad', 'Arday', 'Dhakhtar'], 'Arday', 'A student'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [],
      speaking: [
        { id: 's0-m2-l2-s1', type: 'open-speaking', promptSo: 'Isbarasho kooban samee: magaca, meesha aad ka timid, waxaad tahay.', promptEn: 'Give a short self-introduction: your name, where you are from, what you do.', hintsSo: ['Magacaygu waa …', 'Waxaan ka imid …', 'Waxaan ahay …'], rubricFocus: ['Vocabulary', 'Sentence formation', 'Fluency'] },
      ],
      exercises: [
        exercise({ id: 's0-m2-l2-e1', type: 'flashcards', titleSo: 'Erayada isbarashada', skill: 'akhris', objective: true, vocabIds: ['s0-magacaa', 's0-magacaygu', 's0-ku-farahay', 's0-ka-yimid', 's0-waxaan-ka-yimid'] }),
        exercise({ id: 's0-m2-l2-e2', type: 'order-words', titleSo: 'Magacaaga sheeg', skill: 'qoris', objective: true, promptSo: 'U kala dhig jumlad isbarasho.', tokens: ['Magacaygu', 'waa', 'Maryan'], answer: ['Magacaygu', 'waa', 'Maryan'], translationEn: 'My name is Maryan.' }),
        exercise({ id: 's0-m2-l2-e3', type: 'read-answer', titleSo: 'Akhri oo ka jawaab', skill: 'akhris', objective: true, passageId: 's0-m2-l2-p1' }),
        exercise({ id: 's0-m2-l2-e4', type: 'spelling', titleSo: 'Qor magaca', skill: 'qoris', objective: true, promptSo: 'Qor eraygan si sax ah.', word: 'magac', hintSo: 'Waa waxa qof lagu yeedho.', emoji: '🏷️' }),
      ],
      reviewSo: ['Magacaygu waa …', 'Waan ku faraxsanahay.', 'Waxaan ka imid …'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

/* ------------------------------ Module 0.3 ------------------------------ */
const m03 = module({
  id: 's0-m3', stageId: s, titleSo: 'Erayada Fudud', titleEn: 'Simple everyday words',
  descriptionSo: 'Haa, maya, fadlan, mahadsanid iyo erayo fudud oo maalinle ah.',
  objectivesSo: ['Erayada aasaasiga ah isticmaali karo', 'Jawaabo fudud bixin karo', 'Fahamkaaga muujin karo'],
  lessons: [
    lesson({
      id: 's0-m3-l1', stageId: s, moduleId: 's0-m3',
      titleSo: 'Haa iyo Maya', titleEn: 'Yes and No',
      objectivesSo: ['Haa iyo Maya si dabiici ah u isticmaali karo', 'Mahadsanid iyo fadlan ku darsan karo hadalkayga', '“Waan fahmay” iyo “Ma fahmin” kala sooci karo'],
      objectivesEn: ['Use yes and no naturally', 'Add please and thank you', 'Say I understand / I do not understand'],
      minutes: 15, skills: ['dhagaysi', 'hadal', 'akhris'],
      vocab: [
        vocab(s, 's0-haa', 'Haa', 'Yes', { emoji: '✅', exampleSo: 'Haa, waan rabaa.', exampleEn: 'Yes, I want it.' }),
        vocab(s, 's0-maya', 'Maya', 'No', { emoji: '❌', exampleSo: 'Maya, mahadsanid.', exampleEn: 'No, thank you.' }),
        vocab(s, 's0-halkan', 'Halkan', 'Here', { emoji: '📍', exampleSo: 'Halkan fadhiiso.', exampleEn: 'Sit here.' }),
        vocab(s, 's0-halkaas', 'Halkaas', 'There', { emoji: '👉', exampleSo: 'Buugga halkaas dhig.', exampleEn: 'Put the book there.' }),
        vocab(s, 's0-waan-fahmay', 'Waan fahmay', 'I understood', { emoji: '👍', exampleSo: 'Waan fahmay, macallimo.', exampleEn: 'I understood, teacher.' }),
        vocab(s, 's0-ma-fahmin', 'Ma fahmin', 'I did not understand', { emoji: '🤔', exampleSo: 'Waan ka xumahay, ma fahmin.', exampleEn: 'Sorry, I did not understand.' }),
        vocab(s, 's0-mar-kale', 'Mar kale, fadlan', 'Again, please', { emoji: '🔄', exampleSo: 'Mar kale, fadlan.', exampleEn: 'Again, please.' }),
        vocab(s, 's0-waan-ka-xumahay', 'Waan ka xumahay', 'I am sorry', { emoji: '🙏', exampleSo: 'Waan ka xumahay.', exampleEn: 'I am sorry.' }),
      ],
      dialogues: [
        dialogue({
          id: 's0-m3-l1-d1', titleSo: 'Faham', titleEn: 'Understanding',
          contextSo: 'Arday iyo macallin.', contextEn: 'A student and a teacher.',
          roles: ['Macallinka', 'Ardayga'],
          lines: [
            { speaker: 'Macallinka', so: 'Buugga fur, fadlan.', en: 'Open the book, please.' },
            { speaker: 'Ardayga', so: 'Waan fahmay.', en: 'I understood.' },
            { speaker: 'Macallinka', so: 'Qoraalka akhri.', en: 'Read the text.' },
            { speaker: 'Ardayga', so: 'Waan ka xumahay, ma fahmin. Mar kale, fadlan.', en: 'Sorry, I did not understand. Again, please.' },
            { speaker: 'Macallinka', so: 'Maya dhib ma leh. Qoraalka akhri.', en: 'No problem. Read the text.' },
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      passages: [],
      grammar: [],
      speaking: [
        { id: 's0-m3-l1-s1', type: 'listen-respond', promptSo: 'Su’aashan ka jawaab: “Biyo ma rabtaa?”', promptEn: 'Answer the question: “Do you want water?”', phraseSo: 'Haa, fadlan. / Maya, mahadsanid.', phraseEn: 'Yes, please. / No, thank you.', rubricFocus: ['Listening response', 'Intelligibility'] },
      ],
      exercises: [
        exercise({ id: 's0-m3-l1-e1', type: 'flashcards', titleSo: 'Erayada fudud', skill: 'akhris', objective: true, vocabIds: ['s0-haa', 's0-maya', 's0-halkan', 's0-halkaas', 's0-waan-fahmay', 's0-ma-fahmin', 's0-mar-kale', 's0-waan-ka-xumahay'] }),
        exercise({ id: 's0-m3-l1-e2', type: 'match-qa', titleSo: 'Hadal iyo jawaab', skill: 'akhris', objective: true, pairs: [{ left: 'Biyo ma rabtaa?', right: 'Haa, fadlan.' }, { left: 'Mahadsanid', right: 'Fadlan / Soo dhawoow' }, { left: 'Ma fahmi kartaa?', right: 'Haa, waan fahmay' }] }),
        exercise({ id: 's0-m3-l1-e3', type: 'fill-blank', titleSo: 'Buuxi', skill: 'qoris', objective: true, sentenceSo: 'Waan ka xumahay, ma ________.', options: ['fahmin', 'fahmay', 'halkan'], answer: 'fahmin', translationEn: 'Sorry, I did not understand.' }),
        exercise({ id: 's0-m3-l1-e4', type: 'spelling', titleSo: 'Qor erayga', skill: 'qoris', objective: true, word: 'mahadsanid', hintSo: 'Waxaad tiraahdaa marka qof kuu sameeyo wax wanaagsan.', emoji: '🙏' }),
      ],
      reviewSo: ['Haa = yes, Maya = no.', 'Waan fahmay = I understood; Ma fahmin = I did not understand.', 'Mar kale, fadlan = again, please.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

/* ------------------------------ Module 0.4 ------------------------------ */
const m04 = module({
  id: 's0-m4', stageId: s, titleSo: 'Tilmaamaha Fasalka', titleEn: 'Classroom instructions',
  descriptionSo: 'Dhegayso tilmaamaha macallinka oo jirkaaga ku samee.',
  objectivesSo: ['Tilmaamaha fasalka fahmi karo', 'Jawaab jireed bixin karo', 'Erayada amarka aqoonsan karo'],
  lessons: [
    lesson({
      id: 's0-m4-l1', stageId: s, moduleId: 's0-m4',
      titleSo: 'Dhagayso oo samee', titleEn: 'Listen and do',
      objectivesSo: ['Tilmaamo fudud fahmi karo', 'Amarka ku dhaqaaqi karo', 'Erayada: fadhiiso, istaag, akhri, qor, dhegayso baran'],
      objectivesEn: ['Understand simple instructions', 'Act on commands', 'Learn the key classroom words'],
      minutes: 15, skills: ['dhagaysi', 'hadal'],
      vocab: [
        vocab(s, 's0-fadhiiso', 'Fadhiiso', 'Sit down', { emoji: '🪑', exampleSo: 'Fadhiiso, fadlan.', exampleEn: 'Sit down, please.' }),
        vocab(s, 's0-istaag', 'Istaag', 'Stand up', { emoji: '🧍', exampleSo: 'Istaag, fadlan.', exampleEn: 'Stand up, please.' }),
        vocab(s, 's0-akhri', 'Akhri', 'Read', { emoji: '📖', exampleSo: 'Qoraalka akhri.', exampleEn: 'Read the text.' }),
        vocab(s, 's0-qor', 'Qor', 'Write', { emoji: '✏️', exampleSo: 'Magacaaga qor.', exampleEn: 'Write your name.' }),
        vocab(s, 's0-dhegayso', 'Dhegayso', 'Listen', { emoji: '👂', exampleSo: 'Dhegayso, fadlan.', exampleEn: 'Listen, please.' }),
        vocab(s, 's0-ku-celi', 'Ku celi', 'Repeat', { emoji: '🔄', exampleSo: 'Erayga ku celi.', exampleEn: 'Repeat the word.' }),
        vocab(s, 's0-fiiri', 'Fiiri', 'Look', { emoji: '👀', exampleSo: 'Halkan fiiri.', exampleEn: 'Look here.' }),
        vocab(s, 's0-fur-buugga', 'Fur buugga', 'Open the book', { emoji: '📗', exampleSo: 'Fur buugga, fadlan.', exampleEn: 'Open the book, please.' }),
        vocab(s, 's0-xir-buugga', 'Xir buugga', 'Close the book', { emoji: '📕', exampleSo: 'Xir buugga.', exampleEn: 'Close the book.' }),
        vocab(s, 's0-gacanta-taag', 'Gacanta taag', 'Raise your hand', { emoji: '✋', exampleSo: 'Su’aal haddii aad qabto, gacanta taag.', exampleEn: 'If you have a question, raise your hand.' }),
      ],
      dialogues: [],
      passages: [],
      grammar: [
        grammar({
          id: 's0-m4-l1-g1', titleSo: 'Amarka', titleEn: 'Commands',
          explanationSo: 'Marka macallinku wax rabo, wuxuu isticmaalaa amar fudud. Erayga amarku wuxuu bilaabmaa ficilka: fadhiiso, istaag, akhri.',
          explanationEn: 'When a teacher wants something done, a short command is used. The command starts with the verb: sit, stand, read.',
          examples: [{ so: 'Fadhiiso.', en: 'Sit down.' }, { so: 'Buugga fur.', en: 'Open the book.' }],
          review: 'PENDING_REVIEW',
        }),
      ],
      speaking: [
        { id: 's0-m4-l1-s1', type: 'listen-repeat', promptSo: 'Ku celi amar kasta, ka dibna samee.', promptEn: 'Repeat each command, then do it.', phraseSo: 'Fadhiiso. Istaag. Gacanta taag.', phraseEn: 'Sit down. Stand up. Raise your hand.', rubricFocus: ['Pronunciation', 'Listening response'] },
      ],
      exercises: [
        exercise({ id: 's0-m4-l1-e1', type: 'flashcards', titleSo: 'Tilmaamaha', skill: 'akhris', objective: true, vocabIds: ['s0-fadhiiso', 's0-istaag', 's0-akhri', 's0-qor', 's0-dhegayso', 's0-ku-celi', 's0-fiiri', 's0-fur-buugga', 's0-xir-buugga', 's0-gacanta-taag'] }),
        exercise({ id: 's0-m4-l1-e2', type: 'match-word-picture', titleSo: 'Amarka iyo sawirka', skill: 'akhris', objective: true, pairs: [{ left: 'Fadhiiso', right: 'Sit', emoji: '🪑' }, { left: 'Istaag', right: 'Stand', emoji: '🧍' }, { left: 'Gacanta taag', right: 'Raise hand', emoji: '✋' }, { left: 'Fur buugga', right: 'Open book', emoji: '📗' }] }),
        exercise({ id: 's0-m4-l1-e3', type: 'fill-blank', titleSo: 'Amarka buuxi', skill: 'qoris', objective: true, sentenceSo: 'Qoraalka ________. (read)', options: ['akhri', 'qor', 'istaag'], answer: 'akhri', translationEn: 'Read the text.' }),
        exercise({ id: 's0-m4-l1-e4', type: 'order-words', titleSo: 'Amar dhig', skill: 'qoris', objective: true, tokens: ['Buugga', 'fur'], answer: ['Buugga', 'fur'], translationEn: 'Open the book.' }),
      ],
      reviewSo: ['Amarku wuxuu bilaabmaa ficilka.', 'Fadhiiso, istaag, akhri, qor, dhegayso.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

/* ------------------------------ Module 0.5 ------------------------------ */
const m05 = module({
  id: 's0-m5', stageId: s, titleSo: 'Dadka iyo Qoyska', titleEn: 'People and family',
  descriptionSo: 'Magacyada xubnaha qoyska iyo sida loo sheego qoyskaaga.',
  objectivesSo: ['Xubnaha qoyska magacooda baran', 'Qoyskeyga ku sharxi karo', 'Waxyaalaha qoyska ka hadli karo'],
  lessons: [
    lesson({
      id: 's0-m5-l1', stageId: s, moduleId: 's0-m5',
      titleSo: 'Qoyskayga', titleEn: 'My family',
      objectivesSo: ['Magacyada hooyo, aabbe, walaal iyo kuwa kale baran', 'Qoyskeyga sawir kooban ka bixin', '“Waa” erayga ku isticmaali jumlad'],
      objectivesEn: ['Learn the family words', 'Give a short picture of my family', 'Use “waa” in a sentence'],
      minutes: 20, skills: ['dhagaysi', 'hadal', 'akhris', 'qoris'],
      vocab: [
        vocab(s, 's0-hooyo', 'Hooyo', 'Mother', { emoji: '👩', exampleSo: 'Hooyaday waa macallimad.', exampleEn: 'My mother is a teacher.' }),
        vocab(s, 's0-aabbe', 'Aabbe', 'Father', { emoji: '👨', exampleSo: 'Aabbahay waa shaqaale.', exampleEn: 'My father is a worker.' }),
        vocab(s, 's0-walaal', 'Walaal', 'Sibling / brother / sister', { emoji: '👧', exampleSo: 'Walaalkay waa arday.', exampleEn: 'My sibling is a student.' }),
        vocab(s, 's0-adeer', 'Adeer', 'Uncle (paternal)', { emoji: '🧔', exampleSo: 'Adeerkey waa ganacsade.', exampleEn: 'My uncle is a trader.' }),
        vocab(s, 's0-eeddo', 'Eeddo', 'Aunt (maternal)', { emoji: '👩🏾', exampleSo: 'Eeddaday way shaqeysaa.', exampleEn: 'My aunt works.' }),
        vocab(s, 's0-awoowe', 'Awoowe', 'Grandfather', { emoji: '👴', exampleSo: 'Awoowahay waa oday.', exampleEn: 'My grandfather is an elder.' }),
        vocab(s, 's0-ayeeyo', 'Ayeeyo', 'Grandmother', { emoji: '👵', exampleSo: 'Ayeeyaday way sheekaysaa.', exampleEn: 'My grandmother tells stories.' }),
        vocab(s, 's0-qoys', 'Qoys', 'Family', { emoji: '👨‍👩‍👧‍👦', exampleSo: 'Qoyskaygu waa farxad.', exampleEn: 'My family is happy.' }),
        vocab(s, 's0-ilmo', 'Ilmo', 'Child', { emoji: '👶', exampleSo: 'Ilmuhu way ciyaarayaan.', exampleEn: 'The children are playing.' }),
        vocab(s, 's0-saaxiib', 'Saaxiib', 'Friend', { emoji: '🧒', exampleSo: 'Saaxiibkay wuu fiican yahay.', exampleEn: 'My friend is good.' }),
      ],
      dialogues: [
        dialogue({
          id: 's0-m5-l1-d1', titleSo: 'Qoyska', titleEn: 'The family',
          contextSo: 'Labo saaxiib oo ka hadlaya qoysaska.', contextEn: 'Two friends talking about their families.',
          roles: ['Cabdi', 'Maryan'],
          lines: [
            { speaker: 'Cabdi', so: 'Qoyskaaga ka waran?', en: 'How is your family?' },
            { speaker: 'Maryan', so: 'Way fiican yihiin. Hooyaday waa macallimad, aabbahayna waa darawal.', en: 'They are fine. My mother is a teacher and my father is a driver.' },
            { speaker: 'Cabdi', so: 'Walaalo ma leedahay?', en: 'Do you have siblings?' },
            { speaker: 'Maryan', so: 'Haa, laba walaal ayaan leeyahay.', en: 'Yes, I have two siblings.' },
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      passages: [
        passage({
          id: 's0-m5-l1-p1', titleSo: 'Qoyskeyga', titleEn: 'My family',
          level: 1, purposeSo: 'Qoys kooban akhri oo faham.', purposeEn: 'Read and understand a short family text.',
          so: 'Magacaygu waa Axmed. Qoyskaygu waa mid farxad leh. Hooyaday waxay ka shaqeysaa isbitaalka. Aabbahay waa macallin. Waxaan leeyahay laba walaal: walaal yar iyo gabar weyn.',
          en: 'My name is Axmed. My family is happy. My mother works at the hospital. My father is a teacher. I have two siblings: a little brother and a big sister.',
          glossary: [{ word: 'isbitaalka', meaning: 'the hospital' }, { word: 'gabar weyn', meaning: 'big sister' }],
          questions: [
            question('s0-m5-l1-p1-q1', 'who', 'Yaa ka shaqeeya isbitaalka?', 'Who works at the hospital?', ['Aabbahay', 'Hooyaday', 'Walaalkay'], 'Hooyaday', 'My mother'),
            question('s0-m5-l1-p1-q2', 'detail', 'Immisa walaal ayuu leeyahay Axmed?', 'How many siblings does Axmed have?', ['Hal', 'Laba', 'Saddex'], 'Laba', 'Two'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [
        grammar({
          id: 's0-m5-l1-g1', titleSo: 'Waa', titleEn: 'The word “waa”',
          explanationSo: 'Erayga “waa” wuxuu xoojiyaa jumlad sheegaysa: Kani waa buug. Hooyaday waa macallimad.',
          explanationEn: '“Waa” gives strength to a statement: This is a book. My mother is a teacher.',
          examples: [{ so: 'Kani waa buug.', en: 'This is a book.' }, { so: 'Hooyaday waa macallimad.', en: 'My mother is a teacher.' }],
          review: 'PENDING_REVIEW',
        }),
      ],
      speaking: [
        { id: 's0-m5-l1-s1', type: 'picture-description', promptSo: 'Qoyskaaga ka hadal: yaa jooga, maxay qabtaan?', promptEn: 'Talk about your family: who is there, what do they do?', emoji: '👨‍👩‍👧‍👦', hintsSo: ['Hooyaday waa …', 'Aabbahay waa …', 'Waxaan leeyahay …'], rubricFocus: ['Vocabulary', 'Sentence formation', 'Fluency'] },
      ],
      exercises: [
        exercise({ id: 's0-m5-l1-e1', type: 'flashcards', titleSo: 'Qoyska', skill: 'akhris', objective: true, vocabIds: ['s0-hooyo', 's0-aabbe', 's0-walaal', 's0-adeer', 's0-eeddo', 's0-awoowe', 's0-ayeeyo', 's0-qoys', 's0-ilmo', 's0-saaxiib'] }),
        exercise({ id: 's0-m5-l1-e2', type: 'match-word-picture', titleSo: 'Qofka iyo magaciisa', skill: 'akhris', objective: true, pairs: [{ left: 'Hooyo', right: 'Mother', emoji: '👩' }, { left: 'Aabbe', right: 'Father', emoji: '👨' }, { left: 'Awoowe', right: 'Grandfather', emoji: '👴' }, { left: 'Ilmo', right: 'Child', emoji: '👶' }] }),
        exercise({ id: 's0-m5-l1-e3', type: 'order-words', titleSo: 'Jumlad qoys', skill: 'qoris', objective: true, tokens: ['Hooyaday', 'waa', 'macallimad'], answer: ['Hooyaday', 'waa', 'macallimad'], translationEn: 'My mother is a teacher.' }),
        exercise({ id: 's0-m5-l1-e4', type: 'read-answer', titleSo: 'Qoyskeyga: akhri oo ka jawaab', skill: 'akhris', objective: true, passageId: 's0-m5-l1-p1' }),
      ],
      reviewSo: ['Hooyo, aabbe, walaal, adeer, eeddo, awoowe, ayeeyo.', '“Waa” waxay xoojisaa sheekada.'],
      review: 'PENDING_REVIEW',
    }),
    lesson({
      id: 's0-m5-l2', stageId: s, moduleId: 's0-m5',
      titleSo: 'Sharax qoyskaaga', titleEn: 'Describe your family',
      objectivesSo: ['Qoyska sheeko kooban ka sheegi karo', 'Tirada xubnaha sheegi karo', 'Su’aalo qoyska ku saabsan ka jawaabi karo'],
      minutes: 20, skills: ['hadal', 'akhris', 'qoris'],
      vocab: [
        vocab(s, 's0-waxaan-leeyahay', 'Waxaan leeyahay …', 'I have …', { emoji: '🏠', exampleSo: 'Waxaan leeyahay laba walaal.', exampleEn: 'I have two siblings.' }),
        vocab(s, 's0-ku-nool', 'Waxaan ku noolahay …', 'I live in …', { emoji: '📍', exampleSo: 'Waxaan ku noolahay Hargeysa.', exampleEn: 'I live in Hargeisa.' }),
        vocab(s, 's0-dhammaan', 'Dhammaan', 'All / everyone', { emoji: '👪', exampleSo: 'Dhammaanteen waan is jeclahay.', exampleEn: 'We all love each other.' }),
        vocab(s, 's0-weyn', 'Weyn', 'Big / elder', { emoji: '🔺', exampleSo: 'Walaashayda weyn waa dhakhtarad.', exampleEn: 'My big sister is a doctor.' }),
        vocab(s, 's0-yar', 'Yar', 'Small / young', { emoji: '🔻', exampleSo: 'Walaalkayga yar waa ilmo.', exampleEn: 'My little brother is a child.' }),
      ],
      dialogues: [],
      passages: [],
      grammar: [],
      speaking: [
        { id: 's0-m5-l2-s1', type: 'open-speaking', promptSo: 'Hal daqiiqo ka hadal qoyskaaga.', promptEn: 'Talk about your family for one minute.', hintsSo: ['Magacaygu waa …', 'Qoyskaygu waa …', 'Waxaan leeyahay …'], rubricFocus: ['Fluency', 'Vocabulary', 'Sentence formation'] },
      ],
      exercises: [
        exercise({ id: 's0-m5-l2-e1', type: 'flashcards', titleSo: 'Erayada sharaxaadda', skill: 'akhris', objective: true, vocabIds: ['s0-waxaan-leeyahay', 's0-ku-nool', 's0-dhammaan', 's0-weyn', 's0-yar'] }),
        exercise({ id: 's0-m5-l2-e2', type: 'fill-blank', titleSo: 'Buuxi', skill: 'qoris', objective: true, sentenceSo: 'Waxaan ________ laba walaal.', options: ['leeyahay', 'yahay', 'tagay'], answer: 'leeyahay', translationEn: 'I have two siblings.' }),
        exercise({ id: 's0-m5-l2-e3', type: 'order-words', titleSo: 'Meesha aad degan tahay', skill: 'qoris', objective: true, tokens: ['Waxaan', 'ku', 'noolahay', 'Hargeysa'], answer: ['Waxaan', 'ku', 'noolahay', 'Hargeysa'], translationEn: 'I live in Hargeisa.' }),
      ],
      reviewSo: ['Waxaan leeyahay = I have.', 'Waxaan ku noolahay = I live in.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

/* ------------------------------ Module 0.6 ------------------------------ */
const m06 = module({
  id: 's0-m6', stageId: s, titleSo: 'Baahiyaha Maalinlaha ah', titleEn: 'Daily needs and feelings',
  descriptionSo: 'Sida aad u sheegto baahidaada iyo dareenkaaga maalinlaha ah.',
  objectivesSo: ['Baahiyaha sheegi karo', 'Dareenka muujin karo', 'Caawimaad weydiisan karo'],
  lessons: [
    lesson({
      id: 's0-m6-l1', stageId: s, moduleId: 's0-m6',
      titleSo: 'Waxaan rabaa…', titleEn: 'I want…',
      objectivesSo: ['Biyo, cunto iyo caawimaad weydiisan karo', 'Dareenka: farxad, daal, gaajo sheegi karo', '“Fadlan i caawi” isticmaali karo'],
      minutes: 18, skills: ['dhagaysi', 'hadal', 'akhris'],
      vocab: [
        vocab(s, 's0-biyo-rabaa', 'Biyo ayaan rabaa', 'I want water', { emoji: '💧', exampleSo: 'Fadlan, biyo ayaan rabaa.', exampleEn: 'Please, I want water.' }),
        vocab(s, 's0-cunto-rabaa', 'Cunto ayaan rabaa', 'I want food', { emoji: '🍽️', exampleSo: 'Cunto ayaan rabaa, fadlan.', exampleEn: 'I want food, please.' }),
        vocab(s, 's0-daalay', 'Waan daalay', 'I am tired', { emoji: '😪', exampleSo: 'Wax badan ayaan shaqeeyay, waan daalay.', exampleEn: 'I worked a lot, I am tired.' }),
        vocab(s, 's0-faraxsanahay', 'Waan faraxsanahay', 'I am happy', { emoji: '😊', exampleSo: 'Waan faraxsanahay maanta!', exampleEn: 'I am happy today!' }),
        vocab(s, 's0-gaajaysanahay', 'Waan gaajaysanahay', 'I am hungry', { emoji: '🍽️', exampleSo: 'Waan gaajaysanahay.', exampleEn: 'I am hungry.' }),
        vocab(s, 's0-harraadsanahay', 'Waan harraadsanahay', 'I am thirsty', { emoji: '🥤', exampleSo: 'Waan harraadsanahay.', exampleEn: 'I am thirsty.' }),
        vocab(s, 's0-rabaa-ino-tag', 'Waxaan rabaa inaan tago', 'I want to go', { emoji: '🚶', exampleSo: 'Waxaan rabaa inaan tago guriga.', exampleEn: 'I want to go home.' }),
        vocab(s, 's0-i-caawi', 'Fadlan i caawi', 'Please help me', { emoji: '🆘', exampleSo: 'Fadlan i caawi, mahadsanid.', exampleEn: 'Please help me, thank you.' }),
      ],
      dialogues: [
        dialogue({
          id: 's0-m6-l1-d1', titleSo: 'Baahi', titleEn: 'A need',
          contextSo: 'Ilmo iyo hooyo guriga.', contextEn: 'A child and a mother at home.',
          roles: ['Ilmaha', 'Hooyada'],
          lines: [
            { speaker: 'Ilmaha', so: 'Hooyo, biyo ayaan rabaa.', en: 'Mother, I want water.' },
            { speaker: 'Hooyada', so: 'Haa, hadda ayaan keenayaa.', en: 'Yes, I will bring it now.' },
            { speaker: 'Ilmaha', so: 'Mahadsanid, hooyo. Waxaan kaloo rabaa cunto.', en: 'Thank you, mother. I also want food.' },
            { speaker: 'Hooyada', so: 'Maya dhib ma leh, aan wada cunno.', en: 'No problem, let us eat together.' },
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      passages: [],
      grammar: [],
      speaking: [
        { id: 's0-m6-l1-s1', type: 'listen-respond', promptSo: '“Maxaad rabtaa?” ka jawaab.', promptEn: 'Answer “What do you want?”', phraseSo: 'Biyo ayaan rabaa, fadlan.', phraseEn: 'I want water, please.', rubricFocus: ['Listening response', 'Sentence formation'] },
      ],
      exercises: [
        exercise({ id: 's0-m6-l1-e1', type: 'flashcards', titleSo: 'Baahiyaha', skill: 'akhris', objective: true, vocabIds: ['s0-biyo-rabaa', 's0-cunto-rabaa', 's0-daalay', 's0-faraxsanahay', 's0-gaajaysanahay', 's0-harraadsanahay', 's0-i-caawi'] }),
        exercise({ id: 's0-m6-l1-e2', type: 'match-qa', titleSo: 'Su’aasha iyo jawaabta', skill: 'akhris', objective: true, pairs: [{ left: 'Maxaad rabtaa?', right: 'Biyo ayaan rabaa' }, { left: 'Sidee dareentay?', right: 'Waan daalay' }, { left: 'Caawimaad ma rabtaa?', right: 'Haa, fadlan i caawi' }] }),
        exercise({ id: 's0-m6-l1-e3', type: 'fill-blank', titleSo: 'Dareenka buuxi', skill: 'qoris', objective: true, sentenceSo: 'Cunto ma helin, waan ________.', options: ['gaajaysanahay', 'faraxsanahay', 'tagay'], answer: 'gaajaysanahay', translationEn: 'I did not get food, I am hungry.' }),
        exercise({ id: 's0-m6-l1-e4', type: 'roleplay', titleSo: 'Baahida sheeg', skill: 'hadal', objective: false, dialogueId: 's0-m6-l1-d1' }),
      ],
      reviewSo: ['Biyo ayaan rabaa, cunto ayaan rabaa.', 'Dareenka: waan daalay / faraxsanahay / gaajaysanahay.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

/* ------------------------------ Module 0.7 ------------------------------ */
const m07 = module({
  id: 's0-m7', stageId: s, titleSo: 'Su’aalaha Fudud', titleEn: 'Simple questions',
  descriptionSo: 'Waa maxay, waa kuma, xaggee, goorma, immisa — su’aalaha aasaasiga ah.',
  objectivesSo: ['Su’aalaha aasaasiga ah weydiisan karo', 'Jawaabo fudud bixin karo', 'Macluumaad kooban weydiisan karo'],
  lessons: [
    lesson({
      id: 's0-m7-l1', stageId: s, moduleId: 's0-m7',
      titleSo: 'Su’aalaha aasaasiga ah', titleEn: 'The basic question words',
      objectivesSo: ['Waa maxay, waa kuma, xaggee, goorma, immisa isticmaali karo', 'Su’aal iyo jawaab isku aadi karo', 'Macluumaad kooban weydiisan karo'],
      minutes: 20, skills: ['dhagaysi', 'hadal', 'akhris', 'qoris'],
      vocab: [
        vocab(s, 's0-waa-maxay', 'Waa maxay?', 'What is it?', { emoji: '❓', exampleSo: 'Kani waa maxay?', exampleEn: 'What is this?' }),
        vocab(s, 's0-waa-kuma', 'Waa kuma?', 'Who is it?', { emoji: '🙋', exampleSo: 'Kani waa kuma?', exampleEn: 'Who is this?' }),
        vocab(s, 's0-xaggee', 'Xaggee?', 'Where?', { emoji: '📍', exampleSo: 'Buuggu xaggee buu yahay?', exampleEn: 'Where is the book?' }),
        vocab(s, 's0-goorma', 'Goorma?', 'When?', { emoji: '⏰', exampleSo: 'Dugsigu goorma buu bilaabmaa?', exampleEn: 'When does school start?' }),
        vocab(s, 's0-immisa', 'Immisa?', 'How many?', { emoji: '🔢', exampleSo: 'Immisa buug ayaa jira?', exampleEn: 'How many books are there?' }),
        vocab(s, 's0-sidee', 'Sidee?', 'How?', { emoji: '🔄', exampleSo: 'Sidee tahay?', exampleEn: 'How are you?' }),
        vocab(s, 's0-maxaa', 'Maxaa?', 'What?', { emoji: '❔', exampleSo: 'Maxaa rabtaa?', exampleEn: 'What do you want?' }),
        vocab(s, 's0-yaa', 'Yaa?', 'Who?', { emoji: '👤', exampleSo: 'Yaa baa yimid?', exampleEn: 'Who came?' }),
      ],
      dialogues: [
        dialogue({
          id: 's0-m7-l1-d1', titleSo: 'Weydiisasho', titleEn: 'Asking around',
          contextSo: 'Qof weydiinaya macluumaad.', contextEn: 'Someone asking for information.',
          roles: ['Qofka', 'Saaxiibka'],
          lines: [
            { speaker: 'Qofka', so: 'Buuggu xaggee buu yahay?', en: 'Where is the book?' },
            { speaker: 'Saaxiibka', so: 'Wuxuu yahay miiska kor.', en: 'It is on the table.' },
            { speaker: 'Qofka', so: 'Mahadsanid. Goorma ayaan is aragnaa?', en: 'Thank you. When shall we meet?' },
            { speaker: 'Saaxiibka', so: 'Berri subax, haddii Eebbe idmo.', en: 'Tomorrow morning, God willing.' },
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      passages: [],
      grammar: [
        grammar({
          id: 's0-m7-l1-g1', titleSo: 'Su’aalaha', titleEn: 'Question words',
          explanationSo: 'Su’aal kasta waxay leedahay eray su’aal: maxay (wax), kuma (qof), xaggee (meel), goorma (wakhti), immisa (tiro), sidee (hab).',
          explanationEn: 'Each question has a question word: what (thing), who (person), where (place), when (time), how many (number), how (manner).',
          examples: [{ so: 'Waa maxay kani?', en: 'What is this?' }, { so: 'Goorma ayaad imanaysaa?', en: 'When are you coming?' }],
          review: 'PENDING_REVIEW',
        }),
      ],
      speaking: [
        { id: 's0-m7-l1-s1', type: 'listen-respond', promptSo: 'Su’aal maqli, ka dib jawaab ka bixi.', promptEn: 'Hear a question, then answer it aloud.', phraseSo: 'Magacaa?', phraseEn: 'What is your name?', rubricFocus: ['Listening response', 'Fluency'] },
      ],
      exercises: [
        exercise({ id: 's0-m7-l1-e1', type: 'flashcards', titleSo: 'Su’aalaha', skill: 'akhris', objective: true, vocabIds: ['s0-waa-maxay', 's0-waa-kuma', 's0-xaggee', 's0-goorma', 's0-immisa', 's0-sidee', 's0-maxaa', 's0-yaa'] }),
        exercise({ id: 's0-m7-l1-e2', type: 'match-qa', titleSo: 'Su’aasha iyo jawaabta', skill: 'akhris', objective: true, pairs: [{ left: 'Waa maxay kani?', right: 'Kani waa buug' }, { left: 'Xaggee buu yahay?', right: 'Wuxuu yahay miiska kor' }, { left: 'Immisa walaal?', right: 'Laba walaal' }, { left: 'Yaa yimid?', right: 'Saaxiibkay ayaa yimid' }] }),
        exercise({ id: 's0-m7-l1-e3', type: 'fill-blank', titleSo: 'Su’aasha dooro', skill: 'akhris', objective: true, sentenceSo: '— Buuggu ________ buu yahay? — Wuxuu yahay miiska kor.', options: ['xaggee', 'immisa', 'yaa'], answer: 'xaggee', translationEn: '— Where is the book? — It is on the table.' }),
        exercise({ id: 's0-m7-l1-e4', type: 'order-words', titleSo: 'Su’aal dhig', skill: 'qoris', objective: true, tokens: ['Magacaa', 'waa', 'maxaa'], answer: ['Magacaa', 'waa', 'maxaa'], hintSo: 'Fikir: su’aasha magaca. Waxay ku bilaabmaysaa “Magac…”.', translationEn: 'Think: the name question.' }),
      ],
      reviewSo: ['Maxay = wax, kuma = qof, xaggee = meel, goorma = wakhti.', 'Su’aashu waxay rabtaa jawaab.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

/* ------------------------------ Module 0.8 ------------------------------ */
const m08 = module({
  id: 's0-m8', stageId: s, titleSo: 'Wadahadalka Koowaad', titleEn: 'First conversations',
  descriptionSo: 'Shan xaaladood oo wadahadal ah: is-arag, guriga, dugsiga, booqasho iyo caawimaad.',
  objectivesSo: ['Wadahadal koowaad dhammaystiri karo', 'Xaalado kala duwan ku hadli karo', 'Hadalkaaga isku xirnayo ku darsan karo'],
  lessons: [
    lesson({
      id: 's0-m8-l1', stageId: s, moduleId: 's0-m8',
      titleSo: 'Xaaladaha wadahadalka', titleEn: 'Conversation situations',
      objectivesSo: ['Shan xaaladood oo wadahadal ah baran', 'Jumladaha isku xidhka ah isticmaali karo', 'Wadahadal dhameystiran ciyaari karo'],
      minutes: 25, skills: ['dhagaysi', 'hadal', 'akhris'],
      vocab: [
        vocab(s, 's0-soo-dhawoow', 'Soo dhawoow', 'Welcome', { emoji: '🎉', exampleSo: 'Soo dhawoow gurigayaga!', exampleEn: 'Welcome to our home!' }),
        vocab(s, 's0-iska-warran-maal', 'Maalin fiican', 'Have a good day', { emoji: '☀️', exampleSo: 'Maalin fiican, walaal!', exampleEn: 'Have a good day, friend!' }),
        vocab(s, 's0-ii-sheeg', 'Ii sheeg', 'Tell me', { emoji: '💬', exampleSo: 'Ii sheeg, fadlan.', exampleEn: 'Tell me, please.' }),
        vocab(s, 's0-caawimaad', 'Caawimaad', 'Help', { emoji: '🤝', exampleSo: 'Caawimaad ayaan u baahanahay.', exampleEn: 'I need help.' }),
        vocab(s, 's0-waqtiga', 'Waqtiga', 'The time', { emoji: '🕐', exampleSo: 'Waqtiga maxaa hadda?', exampleEn: 'What time is it now?' }),
      ],
      dialogues: [
        dialogue({
          id: 's0-m8-l1-d1', titleSo: '1. Is-arag', titleEn: 'Meeting someone',
          contextSo: 'Labo qof oo waddo ku kulmay.', contextEn: 'Two people meeting on the road.',
          roles: ['Cabdi', 'Xasan'],
          lines: [
            { speaker: 'Cabdi', so: 'As-salaamu calaykum, Xasan. Iska warran?', en: 'Peace be upon you, Xasan. How are things?' },
            { speaker: 'Xasan', so: 'Wa calaykumu salaam. Waan fiicanahay, adiga?', en: 'And upon you peace. I am fine, and you?' },
            { speaker: 'Cabdi', so: 'Aniguna waan fiicanahay. Maalin fiican!', en: 'I am fine too. Have a good day!' },
            { speaker: 'Xasan', so: 'Mahadsanid, adiguna!', en: 'Thank you, you too!' },
          ],
          review: 'PENDING_REVIEW',
        }),
        dialogue({
          id: 's0-m8-l1-d2', titleSo: '2. Guriga', titleEn: 'At home',
          contextSo: 'Martida iyo milkiilaha guriga.', contextEn: 'A guest and a host at home.',
          roles: ['Martida', 'Adeer'],
          lines: [
            { speaker: 'Martida', so: 'As-salaamu calaykum. Soo dhawoow!', en: 'Peace be upon you. Welcome!' },
            { speaker: 'Adeer', so: 'Wa calaykumu salaam. Mahadsanid soo dhaweynta.', en: 'And upon you peace. Thank you for the welcome.' },
            { speaker: 'Martida', so: 'Fadlan fadhiiso. Biyo ma rabtaa?', en: 'Please sit. Do you want water?' },
            { speaker: 'Adeer', so: 'Haa, fadlan. Mahadsanid.', en: 'Yes, please. Thank you.' },
          ],
          review: 'PENDING_REVIEW',
        }),
        dialogue({
          id: 's0-m8-l1-d3', titleSo: '3. Dugsiga', titleEn: 'At school',
          contextSo: 'Arday iyo macallin.', contextEn: 'A student and a teacher.',
          roles: ['Ardayga', 'Macallinka'],
          lines: [
            { speaker: 'Ardayga', so: 'Subax wanaagsan, macallimo.', en: 'Good morning, teacher.' },
            { speaker: 'Macallinka', so: 'Subax wanaagsan. Buuggaagii ma keenaysay?', en: 'Good morning. Did you bring your book?' },
            { speaker: 'Ardayga', so: 'Haa, waan keenay. Waa kan.', en: 'Yes, I brought it. Here it is.' },
            { speaker: 'Macallinka', so: 'Aad baad u fiican tahay. Fadhiiso.', en: 'Very good. Sit down.' },
          ],
          review: 'PENDING_REVIEW',
        }),
        dialogue({
          id: 's0-m8-l1-d4', titleSo: '4. Booqasho saaxiib', titleEn: 'Visiting a friend',
          contextSo: 'Saaxiib booqanaya saaxiibkiis.', contextEn: 'A friend visiting a friend.',
          roles: ['Cabdi', 'Saaxiibkiis'],
          lines: [
            { speaker: 'Cabdi', so: 'As-salaamu calaykum. Saaxiibkay ma joogaa?', en: 'Peace be upon you. Is my friend in?' },
            { speaker: 'Saaxiibkiis', so: 'Haa, wuu joogaa. Soo gal!', en: 'Yes, he is. Come in!' },
            { speaker: 'Cabdi', so: 'Mahadsanid. Sidee tahay?', en: 'Thank you. How are you?' },
            { speaker: 'Saaxiibkiis', so: 'Waan fiicanahay. Aan wada ciyaarno!', en: 'I am fine. Let us play together!' },
          ],
          review: 'PENDING_REVIEW',
        }),
        dialogue({
          id: 's0-m8-l1-d5', titleSo: '5. Caawimaad weydiisasho', titleEn: 'Asking for help',
          contextSo: 'Qof u baahan caawimaad.', contextEn: 'Someone who needs help.',
          roles: ['Ardayga', 'Macallinka'],
          lines: [
            { speaker: 'Ardayga', so: 'Fadlan i caawi.', en: 'Please help me.' },
            { speaker: 'Macallinka', so: 'Haa, maxaa dhibaatada ah?', en: 'Yes, what is the problem?' },
            { speaker: 'Ardayga', so: 'Eraygan ma fahmin. Mar kale, fadlan.', en: 'I did not understand this word. Again, please.' },
            { speaker: 'Macallinka', so: 'Maya dhib ma leh. Waan sharxi doonaa.', en: 'No problem. I will explain it.' },
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      passages: [],
      grammar: [],
      speaking: [
        { id: 's0-m8-l1-s1', type: 'guided-conversation', promptSo: 'Xaalad kasta qof ka mid ah ka hadal.', promptEn: 'Speak one role in each situation.', dialogueId: 's0-m8-l1-d1', rubricFocus: ['Conversation interaction', 'Fluency', 'Intelligibility'] },
        { id: 's0-m8-l1-s2', type: 'open-speaking', promptSo: 'Wadahadal koowaa samee: qof aad la kulanto, salaan, isbarasho.', promptEn: 'Make a first conversation: meeting someone, greeting, introduction.', hintsSo: ['As-salaamu calaykum', 'Magacaa?', 'Waan ku faraxsanahay'], rubricFocus: ['Conversation interaction', 'Vocabulary'] },
      ],
      exercises: [
        exercise({ id: 's0-m8-l1-e1', type: 'flashcards', titleSo: 'Erayada wadahadalka', skill: 'akhris', objective: true, vocabIds: ['s0-soo-dhawoow', 's0-ii-sheeg', 's0-caawimaad', 's0-waqtiga'] }),
        exercise({ id: 's0-m8-l1-e2', type: 'match-qa', titleSo: 'Xaaladaha', skill: 'akhris', objective: true, pairs: [{ left: 'Biyo ma rabtaa?', right: 'Haa, fadlan' }, { left: 'Saaxiibkay ma joogaa?', right: 'Haa, wuu joogaa' }, { left: 'Fadlan i caawi', right: 'Haa, maxaa dhibaatada ah?' }] }),
        exercise({ id: 's0-m8-l1-e3', type: 'roleplay', titleSo: 'Is-arag', skill: 'hadal', objective: false, dialogueId: 's0-m8-l1-d1' }),
        exercise({ id: 's0-m8-l1-e4', type: 'roleplay', titleSo: 'Caawimaad', skill: 'hadal', objective: false, dialogueId: 's0-m8-l1-d5' }),
        exercise({ id: 's0-m8-l1-e5', type: 'order-words', titleSo: 'Salaan dhig', skill: 'qoris', objective: true, tokens: ['As-salaamu', 'calaykum'], answer: ['As-salaamu', 'calaykum'], translationEn: 'Peace be upon you.' }),
      ],
      reviewSo: ['Shan xaalad: is-arag, guriga, dugsiga, booqasho, caawimaad.', 'Salaan, isbarasho, weydiisasho, mahadnaq.'],
      review: 'PENDING_REVIEW',
    }),
    lesson({
      id: 's0-m8-l2', stageId: s, moduleId: 's0-m8',
      titleSo: 'Tijaabada afka', titleEn: 'Oral assessment',
      objectivesSo: ['Wadahadal hagaya dhammaystiri karo', 'Tilmaamaha maqli karo', 'Erayada aqoonsan karo'],
      minutes: 20, skills: ['dhagaysi', 'hadal', 'akhris'],
      vocab: [],
      dialogues: [],
      passages: [
        passage({
          id: 's0-m8-l2-p1', titleSo: 'Maalin Axmed', titleEn: 'A day with Axmed',
          level: 1, purposeSo: 'Wadahadal kooban akhri ka hor tijaabada.', purposeEn: 'Read a short conversation before the assessment.',
          so: 'Subax wanaagsan, Axmed.\n\nSubax wanaagsan, macallimo.\n\nBuuggaagii ma keenaysay?\n\nHaa, waan keenay.\n\nAad baad u fiican tahay.',
          en: 'Good morning, Axmed.\n\nGood morning, teacher.\n\nDid you bring your book?\n\nYes, I brought it.\n\nVery good.',
          glossary: [{ word: 'keenaysay', meaning: 'did you bring' }],
          questions: [
            question('s0-m8-l2-p1-q1', 'detail', 'Buug ma keenay Axmed?', 'Did Axmed bring a book?', ['Haa', 'Maya', 'Ma cadda'], 'Haa', 'Yes'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [],
      speaking: [
        { id: 's0-m8-l2-s1', type: 'guided-conversation', promptSo: 'Tijaabada: macallin iyo arday wadahadal dhammeystir.', promptEn: 'Assessment: complete a teacher–student conversation.', dialogueId: 's0-m8-l1-d3', rubricFocus: ['Pronunciation', 'Vocabulary', 'Sentence formation', 'Fluency', 'Listening response', 'Conversation interaction'] },
      ],
      exercises: [
        exercise({ id: 's0-m8-l2-e1', type: 'read-answer', titleSo: 'Akhri oo ka jawaab', skill: 'akhris', objective: true, passageId: 's0-m8-l2-p1' }),
        exercise({ id: 's0-m8-l2-e2', type: 'match-qa', titleSo: 'Hubi fahamkaaga', skill: 'akhris', objective: true, pairs: [{ left: 'Subax wanaagsan', right: 'Salaan subax' }, { left: 'Waan fahmay', right: 'Faham' }, { left: 'Fadlan i caawi', right: 'Caawimaad' }] }),
      ],
      reviewSo: ['Wadahadalku wuxuu ka bilaabmaa salaan.', 'Su’aal iyo jawaab isku xir.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

export const stage0: Stage = {
  id: s, index: 0,
  titleSo: 'Maqal iyo Hadal', titleEn: 'Listening and speaking first',
  levelSo: 'Bilowga fog', levelEn: 'Absolute beginner',
  descriptionSo: 'Dhagayso, ku hadal, oo aasaaska af-Soomaaliga u diyaargarow hor intaadan si weyn u akhrin.',
  descriptionEn: 'Listen, speak and prepare your ears and mouth for Somali before heavy reading begins.',
  objectivesSo: ['Dhawaaqyada maqli karo', 'Salaan iyo isbarasho ku hadli karo', 'Erayada aasaasiga ah fahmi karo', 'Su’aalo fudud weydiisan karo', 'Wadahadal koowaad dhammaystiri karo'],
  emoji: '👂',
  readingLevels: [1],
  modules: [m01, m02, m03, m04, m05, m06, m07, m08],
  assessment: {
    id: 's0-assessment', titleSo: 'Tijaabada heerka 0', titleEn: 'Stage 0 assessment',
    items: [
      { id: 's0-a1', skill: 'akhris', promptSo: '“As-salaamu calaykum” jawaabteedu waa…', options: ['Wa calaykumu salaam', 'Habeen wanaagsan', 'Magacaa'], answer: 'Wa calaykumu salaam', areaSo: 'Salaanta' },
      { id: 's0-a2', skill: 'akhris', promptSo: 'Eraygee macnihiisu yahay “mother”?', options: ['Aabbe', 'Hooyo', 'Walaal'], answer: 'Hooyo', areaSo: 'Qoyska' },
      { id: 's0-a3', skill: 'akhris', promptSo: '“Magacaa?” macnaheedu waa…', options: ['Sidee tahay?', 'Waa maxay magacaagu?', 'Xaggee joogtaa?'], answer: 'Waa maxay magacaagu?', areaSo: 'Isbarashada' },
      { id: 's0-a4', skill: 'akhris', promptSo: 'Amarka “Fadhiiso” micnihiisu waa…', options: ['Stand up', 'Sit down', 'Look'], answer: 'Sit down', areaSo: 'Tilmaamaha' },
      { id: 's0-a5', skill: 'qoris', promptSo: 'Buuxi: “Biyo ayaan ________.”', options: ['rabaa', 'ahay', 'tagay'], answer: 'rabaa', areaSo: 'Baahiyaha' },
      { id: 's0-a6', skill: 'akhris', promptSo: 'Su’aasha “Xaggee?” waxay weydiisaa…', options: ['wakhti', 'meel', 'tiro'], answer: 'meel', areaSo: 'Su’aalaha' },
      { id: 's0-a7', skill: 'akhris', promptSo: '“Waan fahmay” macnaheedu waa…', options: ['I did not understand', 'I understood', 'I am sorry'], answer: 'I understood', areaSo: 'Erayada fudud' },
      { id: 's0-a8', skill: 'qoris', promptSo: 'U kala dhig: [waa / Magacaygu / Axmed]', options: ['Magacaygu waa Axmed', 'Axmed waa Magacaygu', 'Waa Axmed Magacaygu'], answer: 'Magacaygu waa Axmed', areaSo: 'Jumladaha' },
    ],
    speakingBriefSo: 'La hadal macallin ama qof weyn: salaan, isbarasho, su’aal hal ah oo jawaab.',
    speakingRubric: ['Pronunciation and intelligibility', 'Vocabulary', 'Sentence formation', 'Fluency', 'Listening response', 'Conversation interaction'],
  },
};
