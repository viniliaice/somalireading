/**
 * Stage 5 — Sheeko, Hadal iyo Qoraal.
 * Independent communication and fluent reading: storytelling, explanations,
 * opinions, longer discussions, stories, reports, independent reading and
 * public speaking. Draft content — PENDING_REVIEW throughout.
 */
import { dialogue, exercise, grammar, lesson, module, passage, question, vocab, type Stage } from './types';

const s = 'stage-5';

const m1 = module({
  id: 's5-m1', stageId: s, titleSo: 'Sheeko Ka Sheekayn', titleEn: 'Telling stories',
  descriptionSo: 'Dhacdo shalay dhacday, safar dugsi, dhacdo qoys, maalin xusuus leh.',
  objectivesSo: ['Dhacdo waqti sax ku sheeg', 'Tartiibka dhacdooyinka raac', 'Erayada sheekada isticmaali'],
  lessons: [
    lesson({
      id: 's5-m1-l1', stageId: s, moduleId: 's5-m1', titleSo: 'Maalin xusuus leh', titleEn: 'A memorable day',
      objectivesSo: ['Dhacdo tartiib u sheeg: bilow, dhacdo, dhamaad', 'Erayada tartiibka: marka hore, ka dib, ugu dambeyntii', 'Sheeko kooban qor'],
      minutes: 28, skills: ['hadal', 'akhris', 'qoris'],
      vocab: [
        vocab(s, 's5-marka-hore', 'marka hore', 'first', { emoji: '1️⃣', exampleSo: 'Marka hore, waan kacay.', exampleEn: 'First, I woke up.' }),
        vocab(s, 's5-ka-dib-2', 'ka dib', 'after / then', { emoji: '2️⃣', exampleSo: 'Ka dib, waan quraacday.', exampleEn: 'Then, I had breakfast.' }),
        vocab(s, 's5-ugu-dambeyntii', 'ugu dambeyntii', 'finally', { emoji: '3️⃣', exampleSo: 'Ugu dambeyntii, guriga ayaan soo laabtay.', exampleEn: 'Finally, I came home.' }),
        vocab(s, 's5-dhacdo', 'dhacdo', 'event', { emoji: '📌', exampleSo: 'Dhacadadani way xusuus badan tahay.', exampleEn: 'This event is memorable.' }),
        vocab(s, 's5-xusuus', 'xusuus', 'memory', { emoji: '🧠', exampleSo: 'Xusuus wanaagsan ayaan haystaa.', exampleEn: 'I have a good memory.' }),
        vocab(s, 's5-safar', 'safar', 'journey / trip', { emoji: '🚌', exampleSo: 'Safarkii dugsigu wuu ahaa mid wanaagsan.', exampleEn: 'The school trip was good.' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's5-m1-l1-p1', titleSo: 'Safarkii dugsiga', titleEn: 'The school trip', level: 5,
          purposeSo: 'Sheeko tartiib leh akhri.', purposeEn: 'Read a sequenced story.',
          so: 'Sannadkii hore, dugsigeennu wuxuu qabtay safar ku saabsan taariikhda. Marka hore, waan isu aragnay albaabka dugsiga, ka dibna bas ayaan raacnay. Waxaan tagnay goob taariikh ah oo ku taal agagaarka magaalada. Halkaas waxaan kulanay oday taariikh yaqaan ah oo noo sheegay sheekooyin hore. Ardaydu way qori jireen waxyaalihii ay maqleen. Ugu dambeyntii, guriga ayaan ku soo laabannay farxad iyo xusuus cusub. Maalintiias waxay i baratay in taariikhdu tahay iftiin nolosha.',
          en: 'Last year our school organised a trip about history. First we met at the school gate, then we took a bus. We visited a historical place near the city. There we met an elder who knows history and he told us old stories. The students wrote down what they heard. Finally we returned home with joy and new memories. That day taught me that history is a light in life.',
          glossary: [{ word: 'taariikh yaqaan', meaning: 'historian' }, { word: 'agagaarka', meaning: 'the surroundings of' }, { word: 'ifiin', meaning: 'light' }],
          questions: [
            question('s5-m1-l1-p1-q1', 'sequence', 'Maxaa la sameeyay marka hore?', 'What was done first?', ['bas la raacay', 'albaabka dugsiga la isugu yimid', 'guriga la soo laabtay'], 'albaabka dugsiga la isugu yimid', 'they met at the school gate'),
            question('s5-m1-l1-p1-q2', 'who', 'Yee ayay kulmeen?', 'Who did they meet?', ['macallin', 'oday taariikh yaqaan ah', 'dhakhtar'], 'oday taariikh yaqaan ah', 'a historian elder'),
            question('s5-m1-l1-p1-q3', 'main-idea', 'Maxay maalintiias bartay?', 'What did that day teach her?', ['taariikhdu tahay iftiin', 'basaska qaalisan yihiin', 'gurigu wuu dhow yahay'], 'taariikhdu tahay iftiin', 'history is a light'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [grammar({
        id: 's5-m1-l1-g1', titleSo: 'Tartiibka sheekada', titleEn: 'Story sequencing',
        explanationSo: 'Sheekadu waxay raacdaa waqti: marka hore …, ka dib …, kadibna …, ugu dambeyntii …. Erayadan waxay ka caawiyaan dhagaystaha inuu raaco dhacdada.',
        explanationEn: 'A story follows time: marka hore (first), ka dib (then), ugu dambeyntii (finally). These words help the listener follow the events.',
        examples: [{ so: 'Marka hore waan qoray, ka dib waan akhriyay.', en: 'First I wrote, then I read.' }],
        review: 'PENDING_REVIEW',
      })],
      speaking: [{ id: 's5-m1-l1-s1', type: 'open-speaking', promptSo: 'Maalin xusuus leh sheego (1–2 daqiiqo).', promptEn: 'Tell a memorable day (1–2 minutes).', hintsSo: ['Marka hore…', 'Ka dib…', 'Ugu dambeyntii…'], rubricFocus: ['Fluency', 'Sentence formation', 'Vocabulary'] }],
      exercises: [
        exercise({ id: 's5-m1-l1-e1', type: 'read-answer', titleSo: 'Safarkii dugsiga', skill: 'akhris', objective: true, passageId: 's5-m1-l1-p1' }),
        exercise({ id: 's5-m1-l1-e2', type: 'order-words', titleSo: 'Tartiibka', skill: 'qoris', objective: true, promptSo: 'Erayada tartiibka u kala dhig.', tokens: ['Marka', 'hore,', 'ka', 'dib,', 'ugu', 'dambeyntii'], answer: ['Marka', 'hore,', 'ka', 'dib,', 'ugu', 'dambeyntii'], translationEn: 'first, then, finally' }),
        exercise({ id: 's5-m1-l1-e3', type: 'fill-blank', titleSo: 'Tartiibka buuxi', skill: 'akhris', objective: true, sentenceSo: '______, bas ayaan raacnay.', options: ['Ka dib', 'Marka hore', 'Ugu dambeyntii'], answer: 'Ka dib', translationEn: 'Then, we took a bus.' }),
      ],
      reviewSo: ['Marka hore, ka dib, ugu dambeyntii.', 'Sheekadu waxay leedahay bilow, dhacdo iyo dhamaad.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m2 = module({
  id: 's5-m2', stageId: s, titleSo: 'Sharaxaad', titleEn: 'Explaining how things work',
  descriptionSo: 'Sida wax loo sameeyo, sida ay wax u dhacaan, maxaa loo sameeyaa.',
  objectivesSo: ['Habab u sharxid qof kale', 'Sabab iyo natiijo ku darid sharaxaadda', 'Tilmaamo kooban qorid'],
  lessons: [
    lesson({
      id: 's5-m2-l1', stageId: s, moduleId: 's5-m2', titleSo: 'Sida loo sameeyo…', titleEn: 'How to do…',
      objectivesSo: ['Tilmaamo tallaabo tallaabo ah qor', 'Ficilada amarka ku dar', 'Sharaxaad kooban bixi'],
      minutes: 25, skills: ['hadal', 'akhris', 'qoris'],
      vocab: [
        vocab(s, 's5-tallaabo', 'tallaabo', 'step', { emoji: '🪜', exampleSo: 'Tallaabada koowaad.', exampleEn: 'The first step.' }),
        vocab(s, 's5-markaas', 'markaas', 'then / at that time', { emoji: '➡️', exampleSo: 'Markaas ayaan ku darayaa.', exampleEn: 'Then I add it.' }),
        vocab(s, 's5-ugu-dambeyn', 'ugu dambeyn', 'in the end', { emoji: '🏁', exampleSo: 'Ugu dambeyn, waan cunayaa.', exampleEn: 'In the end, I eat it.' }),
        vocab(s, 's5-sharax', 'sharax', 'explain', { emoji: '🗣️', exampleSo: 'Fadlan ii sharax.', exampleEn: 'Please explain to me.' }),
        vocab(s, 's5-sababta', 'sababta', 'the reason', { emoji: '⚙️', exampleSo: 'Sababta maxay tahay?', exampleEn: 'What is the reason?' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's5-m2-l1-p1', titleSo: 'Sida shaah loo sameeyo', titleEn: 'How to make tea', level: 5,
          purposeSo: 'Sharaxaad tallaabo tallaabo ah akhri.', purposeEn: 'Read step-by-step instructions.',
          so: 'Marka hore, biyaha weelka ku shub oo dabka saar. Marka biyuhu kululaadaan, shaaha ku dar oo shan daqiiqo sug. Markaas, caano yar ku dar iyo sonkor haddii aad rabto. Ugu dambeyn, shaaha koob ku shub oo qoyska u keen. Shaah kulul oo macan ayaa diyaar ah.',
          en: 'First, pour water into a pot and put it on the fire. When the water gets hot, add tea and wait five minutes. Then add a little milk and sugar if you want. Finally, pour the tea into a cup and bring it to the family. Hot, sweet tea is ready.',
          glossary: [{ word: 'weel', meaning: 'pot / container' }, { word: 'shub', meaning: 'pour' }, { word: 'sonkor', meaning: 'sugar' }],
          questions: [
            question('s5-m2-l1-p1-q1', 'sequence', 'Maxaa la sameeyaa marka hore?', 'What is done first?', ['biyaha la shubo', 'caano la daro', 'shaah la cabo'], 'biyaha la shubo', 'pour the water'),
            question('s5-m2-l1-p1-q2', 'detail', 'Immisa daqiiqo ayaa la sugaa?', 'How many minutes does one wait?', ['shan', 'laba', 'toban'], 'shan', 'five'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [],
      speaking: [{ id: 's5-m2-l1-s1', type: 'open-speaking', promptSo: 'Sida wax loo sameeyo sharax: shaah, cunto, ama barasho.', promptEn: 'Explain how to do something: tea, food, or studying.', hintsSo: ['Marka hore…', 'Markaas…', 'Ugu dambeyn…'], rubricFocus: ['Fluency', 'Sentence formation'] }],
      exercises: [
        exercise({ id: 's5-m2-l1-e1', type: 'read-answer', titleSo: 'Sida shaah loo sameeyo', skill: 'akhris', objective: true, passageId: 's5-m2-l1-p1' }),
        exercise({ id: 's5-m2-l1-e2', type: 'order-words', titleSo: 'Tallaabada kala dhig', skill: 'qoris', objective: true, tokens: ['Marka', 'hore,', 'biyaha', 'weelka', 'ku', 'shub'], answer: ['Marka', 'hore,', 'biyaha', 'weelka', 'ku', 'shub'], translationEn: 'First, pour the water into the pot.' }),
        exercise({ id: 's5-m2-l1-e3', type: 'match-qa', titleSo: 'Tallabada iyo ficilka', skill: 'akhris', objective: true, pairs: [{ left: 'Marka hore', right: 'biyaha ku shub' }, { left: 'Markaas', right: 'caano ku dar' }, { left: 'Ugu dambeyn', right: 'koob ku shub' }] }),
      ],
      reviewSo: ['Sharaxaaddu waa tallaabo tallaabo.', 'Marka hore, markaas, ugu dambeyn.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m3 = module({
  id: 's5-m3', stageId: s, titleSo: 'Fikradaha iyo Aragtiyada', titleEn: 'Opinions and views',
  descriptionSo: 'Aragti muujin, sabab bixin, isku raacid iyo isku diidid naxariis leh.',
  objectivesSo: ['Aragti si cad u sheeg', 'Sabab ku dar', 'Isku raac ama isku diid si ixtiraam leh'],
  lessons: [
    lesson({
      id: 's5-m3-l1', stageId: s, moduleId: 's5-m3', titleSo: 'Aragtaydu waa…', titleEn: 'My view is…',
      objectivesSo: ['Erayada aragtida isticmaali: waxaan u malaynayaa, waxaan rumaysanahay', 'Sabab bixi', 'Si naxariis leh isu diid'],
      minutes: 25, skills: ['hadal', 'akhris', 'qoris'],
      vocab: [
        vocab(s, 's5-aragti', 'aragti', 'opinion / view', { emoji: '💬', exampleSo: 'Aragtidaydu waa tan.', exampleEn: 'My view is this.' }),
        vocab(s, 's5-waxaan-rumaysanahay', 'waxaan rumaysanahay', 'I believe', { emoji: '💡', exampleSo: 'Waxaan rumaysanahay in waxbarashadu muhiim tahay.', exampleEn: 'I believe education is important.' }),
        vocab(s, 's5-waxaan-malaynayaa', 'waxaan u malaynayaa', 'I think', { emoji: '🤔', exampleSo: 'Waxaan u malaynayaa inay wanaagsan tahay.', exampleEn: 'I think it is good.' }),
        vocab(s, 's5-waan-ku-raacsanahay', 'waan ku raacsanahay', 'I agree', { emoji: '👍', exampleSo: 'Waan ku raacsanahay fikraddaada.', exampleEn: 'I agree with your idea.' }),
        vocab(s, 's5-ma-ku-raacsana', 'ma ku raacsana', 'I disagree', { emoji: '🤔', exampleSo: 'Waan ka xumahay, ma ku raacsana.', exampleEn: 'Sorry, I disagree.' }),
        vocab(s, 's5-sabab', 'sabab', 'reason', { emoji: '⚙️', exampleSo: 'Sababtu waa tan.', exampleEn: 'The reason is this.' }),
        vocab(s, 's5-su-aal-xigta', 'su’aal xigta', 'follow-up question', { emoji: '❓', exampleSo: 'Su’aal xigta ayaan qabaa.', exampleEn: 'I have a follow-up question.' }),
      ],
      dialogues: [
        dialogue({
          id: 's5-m3-l1-d1', titleSo: 'Dood yar', titleEn: 'A short discussion',
          contextSo: 'Labo arday oo ka hadlaya waxbarashada.', contextEn: 'Two students discussing education.',
          roles: ['Aamino', 'Cabdi'],
          lines: [
            { speaker: 'Aamino', so: 'Waxaan u malaynayaa in akhrisku aad muhiim u yahay.', en: 'I think reading is very important.' },
            { speaker: 'Cabdi', so: 'Waan ku raacsanahay. Sababtu waa in akhrisku uu fidiyo aqoonta.', en: 'I agree. The reason is that reading spreads knowledge.' },
            { speaker: 'Aamino', so: 'Adigu maxaad u malaynaysaa ciyaaraha?', en: 'What do you think about sports?' },
            { speaker: 'Cabdi', so: 'Waxaan rumaysanahay in jidhku u baahan yahay dhaqdhaqaaq. Laakiin waxbarashadu waa hore.', en: 'I believe the body needs exercise. But education comes first.' },
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      passages: [],
      grammar: [grammar({
        id: 's5-m3-l1-g1', titleSo: 'Sida aragti loo sheego', titleEn: 'Expressing an opinion',
        explanationSo: 'Aragti: “Waxaan u malaynayaa in…” ama “Waxaan rumaysanahay in…”. Sabab: “Sababtu waa…”. Isku raac: “Waan ku raacsanahay.” Isku diid: “Waan ka xumahay, ma ku raacsana, maxaa yeelay…”',
        explanationEn: 'Opinion: “Waxaan u malaynayaa in…” (I think that…). Reason: “Sababtu waa…”. Agreement: “Waan ku raacsanahay.” Disagreement: “Ma ku raacsana, maxaa yeelay…”',
        examples: [
          { so: 'Waxaan rumaysanahay in nabaddu muhiim tahay.', en: 'I believe peace is important.' },
          { so: 'Ma ku raacsana, maxaa yeelay…', en: 'I disagree, because…' },
        ],
        review: 'PENDING_REVIEW',
      })],
      speaking: [{ id: 's5-m3-l1-s1', type: 'guided-conversation', promptSo: 'Doodda ku hadal, aragti iyo sabab bixi.', promptEn: 'Join the discussion with an opinion and a reason.', dialogueId: 's5-m3-l1-d1', rubricFocus: ['Fluency', 'Sentence formation', 'Conversation interaction'] }],
      exercises: [
        exercise({ id: 's5-m3-l1-e1', type: 'match-qa', titleSo: 'Aragtida iyo jawaabta', skill: 'akhris', objective: true, pairs: [{ left: 'Waxaan u malaynayaa…', right: 'aragti' }, { left: 'Waan ku raacsanahay', right: 'isku raac' }, { left: 'Ma ku raacsana', right: 'isku diid' }, { left: 'Sababtu waa…', right: 'sabab' }] }),
        exercise({ id: 's5-m3-l1-e2', type: 'roleplay', titleSo: 'Dood yar', skill: 'hadal', objective: false, dialogueId: 's5-m3-l1-d1' }),
        exercise({ id: 's5-m3-l1-e3', type: 'fill-blank', titleSo: 'Aragtida', skill: 'qoris', objective: true, sentenceSo: 'Waxaan ________ in akhrisku muhiim yahay.', options: ['rumaysanahay', 'ahay', 'tagay'], answer: 'rumaysanahay', translationEn: 'I believe reading is important.' }),
      ],
      reviewSo: ['Waxaan u malaynayaa / waxaan rumaysanahay.', 'Waan ku raacsanahay / ma ku raacsana, maxaa yeelay…'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m4 = module({
  id: 's5-m4', stageId: s, titleSo: 'Wadahadal Dheer', titleEn: 'Longer discussions',
  descriptionSo: 'Koox dood ah, wadahadal ciyaar, waraysi, su’aalo xigta iyo tartiibka hadalka.',
  objectivesSo: ['Dood koox ka qayb qaado', 'Su’aalo xigta weydiiso', 'Tartan hadal u hoggaamiyo'],
  lessons: [
    lesson({
      id: 's5-m4-l1', stageId: s, moduleId: 's5-m4', titleSo: 'Doodda kooxda', titleEn: 'Group discussion',
      objectivesSo: ['Hadalka si tartiib ah u qaado', 'Su’aalo xigta weydii', 'Fikradaha kale ixtiraam'],
      minutes: 25, skills: ['hadal', 'dhagaysi'],
      vocab: [
        vocab(s, 's5-dood', 'dood', 'discussion / debate', { emoji: '🗣️', exampleSo: 'Dooddu waa muhiim.', exampleEn: 'Discussion is important.' }),
        vocab(s, 's5-fikrad', 'fikrad', 'idea', { emoji: '💡', exampleSo: 'Fikraddaada ma ii sheegi kartaa?', exampleEn: 'Can you tell me your idea?' }),
        vocab(s, 's5-hoggaamin', 'hoggaamin', 'lead / facilitate', { emoji: '🧭', exampleSo: 'Ma doodda ayaad hoggaamin kartaa?', exampleEn: 'Can you lead the discussion?' }),
        vocab(s, 's5-ixtiraam', 'ixtiraam', 'respect', { emoji: '🤝', exampleSo: 'Fikradaha kale ixtiraam.', exampleEn: 'Respect other ideas.' }),
      ],
      dialogues: [
        dialogue({
          id: 's5-m4-l1-d1', titleSo: 'Doodda: maalin fiican oo dugsiga', titleEn: 'Discussion: a good school day',
          contextSo: 'Saddex arday oo dood ka leh waxa dugsiga u fiican.', contextEn: 'Three students discussing what makes a good school day.',
          roles: ['Hodan', 'Khadar', 'Maryan'],
          lines: [
            { speaker: 'Hodan', so: 'Waxaan u malaynayaa in maalin fiican oo dugsiga ah ay tahay mid aan wax badan baranno.', en: 'I think a good school day is one where we learn a lot.' },
            { speaker: 'Khadar', so: 'Waan ku raacsanahay, laakiin ciyaaraha iyo saaxiibtinimaduna way muhiim yihiin.', en: 'I agree, but sports and friendship are also important.' },
            { speaker: 'Maryan', so: 'Su’aal xigta: sideen u sameyn karnaa dugsiga mid farxad leh?', en: 'A follow-up question: how can we make school joyful?' },
            { speaker: 'Hodan', so: 'Waxaan u malaynayaa in wadajirka iyo ixtiraamku ay jawaabta yihiin.', en: 'I think togetherness and respect are the answer.' },
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      passages: [],
      grammar: [],
      speaking: [
        { id: 's5-m4-l1-s1', type: 'guided-conversation', promptSo: 'Doodda kooxda ka qayb qaado.', promptEn: 'Take part in the group discussion.', dialogueId: 's5-m4-l1-d1', rubricFocus: ['Conversation interaction', 'Fluency', 'Listening response'] },
        { id: 's5-m4-l1-s2', type: 'open-speaking', promptSo: 'Waraysi yar qaad: saaxiib weydii saddex su’aalood oo ka jawaab.', promptEn: 'Conduct a short interview: ask a friend three questions.', hintsSo: ['Maxaad jeceshahay?', 'Maxaad rabtaa inaad noqoto?', 'Maxaa kaa caawiya barashada?'], rubricFocus: ['Conversation interaction', 'Fluency'] },
      ],
      exercises: [
        exercise({ id: 's5-m4-l1-e1', type: 'roleplay', titleSo: 'Doodda kooxda', skill: 'hadal', objective: false, dialogueId: 's5-m4-l1-d1' }),
        exercise({ id: 's5-m4-l1-e2', type: 'match-qa', titleSo: 'Hadal doodeed', skill: 'akhris', objective: true, pairs: [{ left: 'Waan ku raacsanahay', right: 'isku raac' }, { left: 'Su’aal xigta', right: 'weydiin dheeraad ah' }, { left: 'Waxaan u malaynayaa', right: 'aragti' }] }),
      ],
      reviewSo: ['Dooddu waxay u baahan tahay ixtiraam.', 'Su’aal xigta = follow-up question.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m5 = module({
  id: 's5-m5', stageId: s, titleSo: 'Akhriska Sheekooyinka', titleEn: 'Reading stories',
  descriptionSo: 'Sheeko dhaadheer: jilayaal, goob, dhacdo, khilaaf iyo xal.',
  objectivesSo: ['Sheeko dhaadheer akhri', 'Qaybaha sheekada aqoonsan', 'Sheekada dib u sheeg'],
  lessons: [
    lesson({
      id: 's5-m5-l1', stageId: s, moduleId: 's5-m5', titleSo: 'Geedkii iyo ninkii', titleEn: 'The tree and the man',
      objectivesSo: ['Jilayaasha iyo goobta aqoonsan', 'Khilaafka iyo xalka raac', 'Sheekada gunaanad ka bixi'],
      minutes: 30, skills: ['akhris', 'hadal', 'qoris'],
      vocab: [
        vocab(s, 's5-jile', 'jile', 'character', { emoji: '🎭', exampleSo: 'Jilayaasha sheekada.', exampleEn: 'The characters of the story.' }),
        vocab(s, 's5-goob', 'goob', 'setting / place', { emoji: '📍', exampleSo: 'Goobtu waa miyiga.', exampleEn: 'The setting is the countryside.' }),
        vocab(s, 's5-khilaaf', 'khilaaf', 'conflict', { emoji: '⚡', exampleSo: 'Khilaaf ayaa dhacay.', exampleEn: 'A conflict happened.' }),
        vocab(s, 's5-xal', 'xal', 'solution / resolution', { emoji: '✅', exampleSo: 'Xal ayaa la helay.', exampleEn: 'A solution was found.' }),
        vocab(s, 's5-cawo', 'cawo', 'kindness / good deed', { emoji: '💗', exampleSo: 'Cawadu way ku fiican tahay.', exampleEn: 'Kindness is good for you.' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's5-m5-l1-p1', titleSo: 'Geedkii iyo ninkii', titleEn: 'The tree and the man', level: 6,
          purposeSo: 'Sheeko jilayaal iyo khilaaf leh akhri.', purposeEn: 'Read a story with characters and conflict.',
          so: 'Miyiga waxaa ku noolaa nin beer lahaa. Beerkiisa waxaa ku jiray geed weyn oo midho bixin jiray. Sannadkii qallalana, ninkii wuxuu go’aamiyay inuu geedka jaro si uu u isticmaalo qoryaha. Laakiin ilmihii deegaanka way ka caddeeyeen, maxaa yeelay geedku wuxuu ahaa meel ay ku nastaan oo cawska duunyadu ka cunto.\n\nNinkii wuu fikiray. Ugu dambeyntii wuxuu go’aamiyay in geedku sii joogo, wuxuuna beertay geedo yaryar oo badan. Sannadkii xigay, roobku wuu yimid, beerihiina way baxeen. Dadkii deegaanku waxay barteen in cawadu nolosha fiican tahay.',
          en: 'In the countryside lived a man with a farm. In his farm stood a big tree that gave fruit. In a dry year the man decided to cut the tree for its wood. But the children of the area objected, because the tree was a place to rest and pasture for the animals.\n\nThe man thought. Finally he decided to keep the tree and planted many young trees. The next year rain came and the farms prospered. The people of the area learned that kindness makes life better.',
          glossary: [{ word: 'qallalan', meaning: 'dry' }, { word: 'qoryaha', meaning: 'the wood' }, { word: 'duunyadu', meaning: 'livestock' }, { word: 'baxeen', meaning: 'prospered / grew' }],
          questions: [
            question('s5-m5-l1-p1-q1', 'who', 'Yaa lahaa beerka?', 'Who owned the farm?', ['ninkii', 'ilmihii', 'geedkii'], 'ninkii', 'the man'),
            question('s5-m5-l1-p1-q2', 'why', 'Maxay ilmihii diideen?', 'Why did the children object?', ['geedku wuxuu ahaa meel nabad ah', 'geedku wuu qalalnaa', 'roobku ma iman'], 'geedku wuxuu ahaa meel nabad ah', 'the tree was a peaceful place'),
            question('s5-m5-l1-p1-q3', 'inference', 'Maxay dadku barteen dhamaadka?', 'What did the people learn at the end?', ['cawadu nolosha fiican tahay', 'geedku waa in la jaro', 'roobku waa qalalan'], 'cawadu nolosha fiican tahay', 'kindness makes life better'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [],
      speaking: [{ id: 's5-m5-l1-s1', type: 'open-speaking', promptSo: 'Sheekada dib u sheeg: jilayaasha, goobta, khilaafka, xalka.', promptEn: 'Retell the story: characters, setting, conflict, resolution.', hintsSo: ['Nin beer lahaa', 'Geed weyn', 'Khilaaf', 'Fikir', 'Xal iyo cawo'], rubricFocus: ['Fluency', 'Vocabulary', 'Sentence formation'] }],
      exercises: [
        exercise({ id: 's5-m5-l1-e1', type: 'read-answer', titleSo: 'Geedkii iyo ninkii', skill: 'akhris', objective: true, passageId: 's5-m5-l1-p1' }),
        exercise({ id: 's5-m5-l1-e2', type: 'match-qa', titleSo: 'Qaybaha sheekada', skill: 'akhris', objective: true, pairs: [{ left: 'Jile', right: 'qofka sheekada' }, { left: 'Goob', right: 'meesha' }, { left: 'Khilaaf', right: 'dhibaatada' }, { left: 'Xal', right: 'jawaabta' }] }),
        exercise({ id: 's5-m5-l1-e3', type: 'fill-blank', titleSo: 'Fahamka', skill: 'akhris', objective: true, sentenceSo: 'Ninkii wuxuu go’aamiyay in geedku ________.', options: ['sii joogo', 'la jaro', 'la iibiyo'], answer: 'sii joogo', translationEn: 'The man decided the tree should stay.' }),
      ],
      reviewSo: ['Sheekadu: jilayaal, goob, khilaaf, xal.', 'Cawadu nolosha fiican tahay.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m6 = module({
  id: 's5-m6', stageId: s, titleSo: 'Akhriska Warbixinnada', titleEn: 'Reading reports',
  descriptionSo: 'Taariikh, maqaallo waxbarasho, taariikh-nololeedyo, warbixinno fudud.',
  objectivesSo: ['Warbixin akhri oo fikradda weyn soo saar', 'Xogta iyo aragtida kala sooc', 'Su’aalo warbixinta ah ka jawaab'],
  lessons: [
    lesson({
      id: 's5-m6-l1', stageId: s, moduleId: 's5-m6', titleSo: 'Warbixin maalinle ah', titleEn: 'A daily report',
      objectivesSo: ['Warbixin fudud akhri', 'Xogta muhiim ah soo saar', 'Gunaanad kooban qor'],
      minutes: 25, skills: ['akhris', 'qoris'],
      vocab: [
        vocab(s, 's5-warbixin', 'warbixin', 'report', { emoji: '📰', exampleSo: 'Warbixintani waa muhiim.', exampleEn: 'This report is important.' }),
        vocab(s, 's5-xog', 'xog', 'information / data', { emoji: '📊', exampleSo: 'Xogta dugsiga.', exampleEn: 'The school data.' }),
        vocab(s, 's5-cabir', 'cabir', 'measurement / number', { emoji: '🔢', exampleSo: 'Cabirrada ardayda.', exampleEn: 'The students’ figures.' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's5-m6-l1-p1', titleSo: 'Warbixin: dugsi sare', titleEn: 'Report: a secondary school', level: 6,
          purposeSo: 'Warbixin xog leh akhri.', purposeEn: 'Read a report with data.',
          so: 'Dugsiga Sare ee Barwaaqo wuxuu ku yaal magaalada Hargeysa. Sannadkan waxaa dhigataa sideed boqol oo arday, afar boqol iyo konton gabdhood iyo saddex boqol iyo konton wiil. Dugsigu wuxuu leeyahay afartan macallin iyo laba iyo soddon fasal. Ardayda ugu badan waxay jecel yihiin xisaabta iyo cilmi. Maamulka dugsigu wuxuu qorsheeyay in la kordhiyo maktabadda iyo dhismaha fasal cusub.',
          en: 'Barwaaqo Secondary School is located in Hargeisa. This year it has eight hundred students: four hundred and fifty girls and three hundred and fifty boys. The school has forty teachers and thirty-two classrooms. Most students like maths and science. The administration plans to expand the library and build new classrooms.',
          glossary: [{ word: 'maamulka', meaning: 'administration' }, { word: 'kordhiyo', meaning: 'expand' }],
          questions: [
            question('s5-m6-l1-p1-q1', 'detail', 'Immisa arday ayaa dugsiga dhigata?', 'How many students attend?', ['sideed boqol', 'laba boqol', 'kun'], 'sideed boqol', 'eight hundred'),
            question('s5-m6-l1-p1-q2', 'main-idea', 'Maxaa maamulku qorsheeyay?', 'What did the administration plan?', ['maktabad iyo fasallo cusub', 'iskuul cusub', 'safar'], 'maktabad iyo fasallo cusub', 'a library and new classrooms'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [],
      speaking: [],
      exercises: [
        exercise({ id: 's5-m6-l1-e1', type: 'read-answer', titleSo: 'Warbixinta dugsiga', skill: 'akhris', objective: true, passageId: 's5-m6-l1-p1' }),
        exercise({ id: 's5-m6-l1-e2', type: 'fill-blank', titleSo: 'Xogta', skill: 'akhris', objective: true, sentenceSo: 'Dugsigu wuxuu leeyahay afartan ________.', options: ['macallin', 'buug', 'baabuur'], answer: 'macallin', translationEn: 'The school has forty teachers.' }),
      ],
      reviewSo: ['Warbixintu waxay leedahay xog iyo qorshe.', 'Xogta: tirooyin, magacyo, meelo.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m7 = module({
  id: 's5-m7', stageId: s, titleSo: 'Akhriska Madax-bannaan', titleEn: 'Independent reading',
  descriptionSo: 'Akhri adigu: koobo, erayada sharax, ujeeddada qoraa aqoonsan, laba qoraal barbar dhig.',
  objectivesSo: ['Qoraal madax bannaan akhri', 'Gunaanad kooban qor', 'Laba qoraal barbar dhig'],
  lessons: [
    lesson({
      id: 's5-m7-l1', stageId: s, moduleId: 's5-m7', titleSo: 'Laba qoraal, hal fikrad', titleEn: 'Two texts, one idea',
      objectivesSo: ['Laba qoraal akhri oo barbar dhig', 'Erayada macnooda ka soo saar', 'Su’aalo fikrad leh ka jawaab'],
      minutes: 28, skills: ['akhris', 'qoris'],
      vocab: [
        vocab(s, 's5-barbar-dhig', 'barbar dhig', 'compare', { emoji: '⚖️', exampleSo: 'Laba qoraal barbar dhig.', exampleEn: 'Compare two texts.' }),
        vocab(s, 's5-ujeeddo', 'ujeeddo', 'purpose', { emoji: '🎯', exampleSo: 'Ujeeddada qoraa.', exampleEn: 'The author’s purpose.' }),
        vocab(s, 's5-soo-koob', 'soo koob', 'summarise', { emoji: '📝', exampleSo: 'Qoraalka soo koob.', exampleEn: 'Summarise the text.' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's5-m7-l1-p1', titleSo: 'Qoraalka A: Akhriska', titleEn: 'Text A: Reading', level: 6,
          purposeSo: 'Qoraal koowaad.', purposeEn: 'First text.',
          so: 'Akhrisku waa furaha aqoonta. Qofka wax akhriya wuxuu arkaa adduunyo kala duwan. Buuggu wuxuu noqon karaa saaxiib kaa caawiya markaad murugaysan tahay ama aad faraxsan tahay. Sidaas darteed, qof kasta waa inuu akhriyaa maalin kasta.',
          en: 'Reading is the key to knowledge. A reader sees different worlds. A book can be a friend that helps you when you are sad or happy. Therefore everyone should read every day.',
          glossary: [{ word: 'murugaysan', meaning: 'sad' }],
          questions: [
            question('s5-m7-l1-p1-q1', 'main-idea', 'Maxaa qoraalka A ka hadlayaa?', 'What is text A about?', ['akhriska', 'ciyaaraha', 'cuntada'], 'akhriska', 'reading'),
          ],
          review: 'PENDING_REVIEW',
        }),
        passage({
          id: 's5-m7-l1-p2', titleSo: 'Qoraalka B: Wadajirka', titleEn: 'Text B: Togetherness', level: 6,
          purposeSo: 'Qoraal labaad.', purposeEn: 'Second text.',
          so: 'Bulsho wanaagsani waxay ku dhisantahay wadajir. Marka dadku is caawiyaan, dhibaatooyinku way yaraadaan. Ilmo baryay iyo oday taariikh yaqaan ah, mid kasta wuxuu ku darsan karaa bulshada. Sidaas darteed, wadajirku waa saldhigga nolosha.',
          en: 'A good society is built on togetherness. When people help each other, problems decrease. A begging child and a wise elder — each can contribute to society. Therefore togetherness is the foundation of life.',
          glossary: [{ word: 'saldhigga', meaning: 'foundation' }],
          questions: [
            question('s5-m7-l1-p2-q1', 'main-idea', 'Maxaa qoraalka B ka hadlayaa?', 'What is text B about?', ['wadajirka', 'akhriska', 'cimilada'], 'wadajirka', 'togetherness'),
            question('s5-m7-l1-p2-q2', 'inference', 'Maxay labada qoraal wadaagaan?', 'What do the two texts share?', ['waxay ka hadlaan waxyaalaha fiican', 'waxay ka hadlaan cuntada', 'waxay ka hadlaan gaadiidka'], 'waxay ka hadlaan waxyaalaha fiican', 'they discuss positive things'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [],
      speaking: [],
      exercises: [
        exercise({ id: 's5-m7-l1-e1', type: 'read-answer', titleSo: 'Qoraalka A', skill: 'akhris', objective: true, passageId: 's5-m7-l1-p1' }),
        exercise({ id: 's5-m7-l1-e2', type: 'read-answer', titleSo: 'Qoraalka B', skill: 'akhris', objective: true, passageId: 's5-m7-l1-p2' }),
        exercise({ id: 's5-m7-l1-e3', type: 'match-qa', titleSo: 'Ujeeddada', skill: 'akhris', objective: true, pairs: [{ left: 'Qoraalka A', right: 'akhriska' }, { left: 'Qoraalka B', right: 'wadajirka' }, { left: 'Soo koob', right: 'gunaanad kooban' }] }),
      ],
      reviewSo: ['Barbar dhig laba qoraal.', 'Ujeeddada qoraa waa in la aqoonsado.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

const m8 = module({
  id: 's5-m8', stageId: s, titleSo: 'Hadalka Dadweynaha', titleEn: 'Public speaking',
  descriptionSo: 'Qoyskeyga, dalkayga, waxbarashada, afkayga hooyo, deegaanka, mustaqbalkayga.',
  objectivesSo: ['Hadal kooban diyaari', 'Hortag dadweyne ku hadal', 'Su’aalo ka jawaab'],
  lessons: [
    lesson({
      id: 's5-m8-l1', stageId: s, moduleId: 's5-m8', titleSo: 'Hadal yar oo qoran', titleEn: 'A short prepared talk',
      objectivesSo: ['Hadal kooban qor: bilow, jidh, dhamaad', 'Cod xooggan iyo cad ku hadal', 'Su’aalo ka jawaab'],
      minutes: 28, skills: ['hadal', 'qoris'],
      vocab: [
        vocab(s, 's5-hadal-dadweyne', 'hadal dadweyne', 'public speech', { emoji: '🎤', exampleSo: 'Hadal dadweyne ayaan diyaariyay.', exampleEn: 'I prepared a public speech.' }),
        vocab(s, 's5-bilow', 'bilow', 'introduction', { emoji: '🟢', exampleSo: 'Bilowga hadalka.', exampleEn: 'The introduction of the speech.' }),
        vocab(s, 's5-jidh', 'jidh', 'body (of a text)', { emoji: '🟡', exampleSo: 'Jidhka hadalka.', exampleEn: 'The body of the speech.' }),
        vocab(s, 's5-dhamaad', 'dhamaad', 'ending', { emoji: '🔴', exampleSo: 'Dhamaadka hadalka.', exampleEn: 'The ending of the speech.' }),
      ],
      dialogues: [], passages: [
        passage({
          id: 's5-m8-l1-p1', titleSo: 'Afkayga hooyo', titleEn: 'My mother tongue', level: 6,
          purposeSo: 'Tusaale hadal dadweyne akhri.', purposeEn: 'Read a sample speech.',
          so: 'As-salaamu calaykum. Waxaan rabaa inaan ka hadlo afkayga hooyo, Af-Soomaaliga.\n\nAfku waa laf dhabarka bulsho kasta. Af-Soomaaligu wuxuu leeyahay taariikh dheer oo gabayo, maahmaahyo iyo sheekooyin leh. Markaan ku hadalno afkeenna, waxaan ku xidhiidhinaynaa qarniyada hore iyo kuwa iman doona.\n\nUgu dambeyntii, waxaan idin ku boorinayaa inaad ilaalisaan oo aad barataan Af-Soomaaliga. Mahadsanid.',
          en: 'Peace be upon you. I want to talk about my mother tongue, Somali.\n\nLanguage is the backbone of every society. Somali has a long history with poems, proverbs and stories. When we speak our language we connect the past centuries with those to come.\n\nFinally, I urge you to protect and learn Somali. Thank you.',
          glossary: [{ word: 'laf dhabarka', meaning: 'backbone' }, { word: 'boorinayaa', meaning: 'urge' }],
          questions: [
            question('s5-m8-l1-p1-q1', 'main-idea', 'Maxuu hadalku ka hadlayaa?', 'What is the speech about?', ['af-Soomaaliga', 'cuntada', 'gaadiidka'], 'af-Soomaaliga', 'the Somali language'),
            question('s5-m8-l1-p1-q2', 'detail', 'Maxuu ku booriyay dhagaystayaasha?', 'What did he urge the listeners to do?', ['inaay ilaaliyaan afka', 'inaay cunaan', 'inaay ciyaaraan'], 'inaay ilaaliyaan afka', 'to protect the language'),
          ],
          review: 'PENDING_REVIEW',
        }),
      ],
      grammar: [],
      speaking: [{ id: 's5-m8-l1-s1', type: 'open-speaking', promptSo: 'Hadal 1–2 daqiiqo ah: Qoyskeyga, Dalkayga, ama Afkayga hooyo.', promptEn: 'Give a 1–2 minute talk: My family, My country, or My mother tongue.', hintsSo: ['Bilow: As-salaamu calaykum…', 'Jidh: saddex fikradood', 'Dhamaad: Mahadsanid.'], rubricFocus: ['Fluency', 'Vocabulary', 'Pronunciation', 'Conversation interaction'] }],
      exercises: [
        exercise({ id: 's5-m8-l1-e1', type: 'read-answer', titleSo: 'Afkayga hooyo', skill: 'akhris', objective: true, passageId: 's5-m8-l1-p1' }),
        exercise({ id: 's5-m8-l1-e2', type: 'order-words', titleSo: 'Bilowga hadalka', skill: 'qoris', objective: true, tokens: ['As-salaamu', 'calaykum.'], answer: ['As-salaamu', 'calaykum.'], translationEn: 'Peace be upon you.' }),
        exercise({ id: 's5-m8-l1-e3', type: 'match-qa', titleSo: 'Qaybaha hadalka', skill: 'akhris', objective: true, pairs: [{ left: 'Bilow', right: 'salaan iyo mowduuc' }, { left: 'Jidh', right: 'fikradaha' }, { left: 'Dhamaad', right: 'mahadnaq iyo gunaanad' }] }),
      ],
      reviewSo: ['Hadalku: bilow, jidh, dhamaad.', 'Cod cad iyo xasilooni.'],
      review: 'PENDING_REVIEW',
    }),
  ],
});

export const stage5: Stage = {
  id: s, index: 5,
  titleSo: 'Sheeko, Hadal iyo Qoraal', titleEn: 'Story, speech and writing',
  levelSo: 'Sare', levelEn: 'Advanced',
  descriptionSo: 'Ka gudub weedhaha gaagaaban: sheeko ka sheekayn, sharaxaad, aragti, dood, sheekooyin dhaadheer, warbixinno, akhris madax bannaan iyo hadal dadweyne.',
  descriptionEn: 'Move beyond short sentences: storytelling, explanations, opinions, discussion, longer stories, reports, independent reading and public speaking.',
  objectivesSo: ['Sheeko tartiib u sheeg', 'Aragti iyo sabab muuji', 'Qoraal dhaadheer akhri oo fahmo', 'Hadal dadweyne diyaari oo jeedi'],
  emoji: '🎤',
  readingLevels: [5, 6],
  modules: [m1, m2, m3, m4, m5, m6, m7, m8],
  assessment: {
    id: 's5-assessment', titleSo: 'Tijaabada heerka 5', titleEn: 'Stage 5 assessment',
    items: [
      { id: 's5-a1', skill: 'akhris', promptSo: 'Eraygee sheegaya tartiibka? “________, bas ayaan raacnay.”', options: ['Ka dib', 'Dabcan', 'Fadlan'], answer: 'Ka dib', areaSo: 'Tartiibka' },
      { id: 's5-a2', skill: 'akhris', promptSo: 'Geedkii iyo ninkii: maxaa ninkii markii dambe sameeyay?', options: ['wuxuu beertay geedo yaryar', 'wuu jaray geedkii', 'wuu tagay'], answer: 'wuxuu beertay geedo yaryar', areaSo: 'Sheekada' },
      { id: 's5-a3', skill: 'akhris', promptSo: '“Waxaan u malaynayaa in…” waxay muujinaysaa…', options: ['aragti', 'amar', 'diidmo'], answer: 'aragti', areaSo: 'Aragtida' },
      { id: 's5-a4', skill: 'akhris', promptSo: 'Warbixinta: immisa arday ayaa dhigata dugsiga?', options: ['sideed boqol', 'afartan', 'laba iyo soddon'], answer: 'sideed boqol', areaSo: 'Warbixinta' },
      { id: 's5-a5', skill: 'qoris', promptSo: 'Hadalka dadweynuhu wuxuu ka kooban yahay…', options: ['bilow, jidh, dhamaad', 'kaliya bilow', 'kaliya dhamaad'], answer: 'bilow, jidh, dhamaad', areaSo: 'Hadalka' },
    ],
    speakingBriefSo: 'Hadal dadweyne 2–3 daqiiqo ah jeedi, ka dibna su’aalo ka jawaab. Macallinku wuu qiimeeyaa.',
    speakingRubric: ['Pronunciation and intelligibility', 'Fluency', 'Vocabulary', 'Sentence structure', 'Listening response', 'Conversation interaction'],
  },
};
