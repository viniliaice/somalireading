/** Draft educational material. No teacher or historical reviewer has approved it. */
export type ReviewStatus='PENDING_REVIEW'|'CORRECTION_REQUIRED'|'APPROVED';
export type SourceId='ptc'|'leiden'|'claus';
export type Reviewed={review:ReviewStatus;sources:SourceId[]};
export const sourceLinks:Record<SourceId,{name:string;url:string}>= {
 ptc:{name:'Poetry Translation Centre',url:'https://www.poetrytranslation.org/poet/maxamed-ibraahin-warsame-hadraawi/'},
 leiden:{name:'African Studies Centre Leiden',url:'https://www.ascleiden.nl/content/library-weekly/hadraawi'},
 claus:{name:'Prince Claus Fund',url:'https://princeclausfund.nl/awardees/maxamed-ibraahim-warsame'}
};
const pending='PENDING_REVIEW' as const;
export const hadraawi={id:'hadraawi',name:'Maxamed Ibraahin Warsame',penName:'Hadraawi',years:'1943–2022',review:pending,sources:['ptc','leiden','claus'] as SourceId[],nameVariants:['Maxamed Ibraahim Warsame (Prince Claus Fund)','Mohamed Ibrahim Warsame (African Studies Centre Leiden)'],titleVariants:['Daba Huwan (Prince Claus Fund)','Dabo Huwan (Poetry Translation Centre iyo African Studies Centre Leiden)']};
export const culturalModules=[{id:hadraawi.id,title:'Abwaan Hadraawi',subtitle:'Baro nolosha, suugaanta iyo dhaxalka Abwaan Hadraawi.',label:'1943 — 2022'}];
export type ReadingParagraph=Reviewed&{id:string;so:string;en:string};
export const biography:ReadingParagraph[]=[
 {id:'identity',so:'Maxamed Ibraahin Warsame, oo loo yaqaanay Hadraawi, wuxuu ahaa abwaan Soomaaliyeed oo aad loo qadariyo.',en:'Maxamed Ibraahin Warsame, known as Hadraawi, was a much-respected Somali poet.',review:pending,sources:['ptc','claus']},
 {id:'birth',so:'Wuxuu ku dhashay gobolka Togdheer sannadkii 1943.',en:'He was born in the Togdheer region in 1943.',review:pending,sources:['ptc','leiden']},
 {id:'writing',so:'Wuxuu ahaa gabayaa, qoraa iyo hal-abuur suugaaneed. Wuxuu qoray gabayo, heeso iyo riwaayado.',en:'He was a poet, writer and creative artist. He wrote poems, songs and plays.',review:pending,sources:['ptc','claus']},
 {id:'themes',so:'Suugaantiisu waxay ka hadashay xorriyadda, caddaaladda, jacaylka bulshada iyo nabadda.',en:'His writing explored freedom, justice, care for the community and peace.',review:pending,sources:['ptc','claus']},
 {id:'peace',so:'Wuxuu dhiirrigeliyey suugaanta Soomaaliyeed iyo isu soo dhawaynta bulshada.',en:'He encouraged Somali literature and helped bring communities together.',review:pending,sources:['ptc','leiden']},
 {id:'award',so:'Sannadkii 2012, waxaa la guddoonsiiyey Abaalmarinta Prince Claus.',en:'In 2012, he received a Prince Claus Award.',review:pending,sources:['ptc','claus']},
 {id:'death',so:'Wuxuu ku geeriyooday magaalada Hargeysa 18-kii Agoosto 2022.',en:'He died in Hargeisa on 18 August 2022.',review:pending,sources:['leiden']},
 {id:'legacy',so:'Hadraawi wuxuu ka tegay dhaxal suugaaneed qiimo weyn u leh ummadda Soomaaliyeed.',en:'Hadraawi left a valuable literary legacy for Somali people.',review:pending,sources:['ptc','claus']}
];
export type TimelineEvent=Reviewed&{id:string;year:string;order:number;title:string;detail:string;older?:string;certainty:'reported'|'inferred'};
export const timeline:TimelineEvent[]=[
 {id:'birth',year:'1943',order:1943,title:'Wuxuu ku dhashay Togdheer',detail:'Hadraawi wuxuu ku dhashay gobolka Togdheer.',certainty:'reported',review:pending,sources:['ptc','leiden']},
 {id:'prison',year:'1973',order:1973,title:'Xabsi ayaa la dhigay',detail:'Hadraawi waxaa loo xiray suugaantiisii iyo aragtidiisii. Wuxuu xabsiga ku jiray shan sano.',older:'Xukuumaddii Siyaad Barre ayaa xirtay 1973, xilli dhaliishiisa bulsho iyo siyaasadeed sii xoogaysanaysay.',certainty:'reported',review:pending,sources:['ptc','leiden']},
 {id:'release',year:'1978 (qiyaas)',order:1978,title:'Xabsiga waa laga sii daayay',detail:'Qiyaastii 1978 ayuu xabsiga ka baxay. Sannadkan waxaa laga soo xisaabiyey 1973 iyo shan sano; taariikhda saxda ah waa la xaqiijinayaa.',certainty:'inferred',review:pending,sources:['ptc','leiden']},
 {id:'march',year:'2004',order:2004,title:'Socdaalkii nabadda',detail:'Wuxuu ka qayb qaatay socdaal nabadeed oo dadka isu soo dhawaynayay.',certainty:'reported',review:pending,sources:['leiden']},
 {id:'award',year:'2012',order:2012,title:'Abaalmarinta Prince Claus',detail:'Waxaa la guddoonsiiyey Abaalmarinta Prince Claus.',certainty:'reported',review:pending,sources:['claus','ptc']},
 {id:'death',year:'18 Agoosto 2022',order:2022,title:'Wuxuu ku geeriyooday Hargeysa',detail:'Hadraawi wuxuu ku geeriyooday Hargeysa, isagoo 79 jir ah sida ay qortay xarunta Leiden.',certainty:'reported',review:pending,sources:['leiden']}
];
export type Work=Reviewed&{id:string;title:string;category:'Maanso'|'Riwaayad';description:string;variant?:string};
export const works:Work[]=[
 {id:'daba',title:'Daba Huwan',category:'Maanso',description:'Maanso dheer oo ka hadasha bulshada iyo taariikhda.',variant:'Ilaha qaar waxay u qoraan Dabo Huwan.',review:pending,sources:['claus','ptc','leiden']},
 {id:'hooyo',title:'Hooyo',category:'Maanso',description:'Mid ka mid ah maansooyinka caanka ah ee Hadraawi.',review:pending,sources:['claus']},
 {id:'gudgude',title:'Gudgude',category:'Maanso',description:'Maanso soo bandhigta aragti ku saabsan bulshada.',review:pending,sources:['ptc','leiden']},
 {id:'aqoon',title:'Aqoon iyo Afgarad',category:'Riwaayad',description:'Riwaayad ka mid ah hal-abuurka Hadraawi.',review:pending,sources:['claus']}
];
export type Vocabulary=Reviewed&{word:string;meaning:string;english:string};
export const literaryTerms:Vocabulary[]=[
 {word:'Abwaan',meaning:'Qof curiya suugaan.',english:'Poet or literary creator',review:pending,sources:['ptc']},
 {word:'Gabay',meaning:'Nooc ka mid ah tixda Soomaaliyeed.',english:'A Somali poetic form',review:pending,sources:['ptc']},
 {word:'Maanso',meaning:'Tix ama hal-abuur suugaaneed.',english:'A poem',review:pending,sources:['ptc']},
 {word:'Hees',meaning:'Erayo la luuqeeyo.',english:'Song',review:pending,sources:['ptc']},
 {word:'Riwaayad',meaning:'Sheeko loo sameeyo matalaad.',english:'Play or drama',review:pending,sources:['claus']},
 {word:'Hal-abuur',meaning:'Fikrad ama shaqo cusub oo la curiyo.',english:'Creative work',review:pending,sources:['ptc']},
 {word:'Tiraab',meaning:'Qoraal ama hadal aan tix ahayn.',english:'Prose',review:pending,sources:['ptc']},
 {word:'Tix',meaning:'Hadal suugaaneed leh hab iyo miisaan.',english:'Verse',review:pending,sources:['ptc']},
 {word:'Maahmaah',meaning:'Hadal gaaban oo xikmad leh.',english:'Proverb',review:pending,sources:['ptc']},
 {word:'Miisaan',meaning:'Habka dhawaaqa iyo laxanka tixda.',english:'Poetic metre',review:pending,sources:['ptc']},
 {word:'Hal-ku-dheg',meaning:'Hadal kooban oo fikrad muhiim ah muujinaya.',english:'Slogan or motto',review:pending,sources:['ptc']},
 {word:'Suugaan',meaning:'Hadal iyo qoraal farshaxan leh.',english:'Literature',review:pending,sources:['ptc']},
 {word:'Nabad',meaning:'Nolol aan colaad lahayn.',english:'Peace',review:pending,sources:['leiden']}
];
export const values:Vocabulary[]=[
 {word:'Nabad',meaning:'Nolol aan colaad lahayn.',english:'Peace',review:pending,sources:['leiden']},
 {word:'Caddaalad',meaning:'In si xaq ah loola dhaqmo dadka.',english:'Justice',review:pending,sources:['claus']},
 {word:'Xorriyad',meaning:'In qofku xor u yahay fikirkiisa iyo hadalkiisa.',english:'Freedom',review:pending,sources:['claus']},
 {word:'Midnimo',meaning:'In la isku duubnaado.',english:'Unity',review:pending,sources:['ptc']},
 {word:'Jacayl',meaning:'In la is jeclaado oo la isu naxariisto.',english:'Love',review:pending,sources:['ptc']},
 {word:'Ixtiraam',meaning:'In la qadariyo dadka kale.',english:'Respect',review:pending,sources:['ptc']},
 {word:'Wadajir',meaning:'In la wada shaqeeyo oo la is taageero.',english:'Togetherness',review:pending,sources:['leiden']},
 {word:'Aqoon',meaning:'Waxa la barto oo la fahmo.',english:'Knowledge',review:pending,sources:['ptc']}
];
export const lessons=[{id:1,title:'Yaa ahaa Hadraawi?',subtitle:'Noloshiisii iyo socdaalkiisii',icon:'01',review:pending,sources:['ptc','leiden','claus'] as SourceId[]},{id:2,title:'Suugaantii Hadraawi',subtitle:'Erayo, maansooyin iyo riwaayado',icon:'02',review:pending,sources:['ptc','claus'] as SourceId[]},{id:3,title:'Hadraawi iyo nabadda',subtitle:'Erayadu dadka way isu keenaan',icon:'03',review:pending,sources:['ptc','leiden','claus'] as SourceId[]},{id:4,title:'Dhaxalka Hadraawi',subtitle:'Adiguna sheekada sii wad',icon:'04',review:pending,sources:['ptc','claus'] as SourceId[]}];
export const lessonReadings:Record<number,ReadingParagraph[]>={
 2:[{id:'poetry-style',so:'Suugaanta Soomaalidu waxay isticmaashaa erayo qurux badan, laxan, sawir-maskaxeed, celcelis iyo xarfo isku dhawaaq ah. Hadraawi wuxuu hal-abuurkiisa ku soo bandhigi jiray fikrado iyo dareen.',en:'Somali literature uses beautiful language, rhythm, imagery, repetition and alliteration. Hadraawi used his creative work to share ideas and feelings.',review:pending,sources:['ptc']},{id:'literary-forms',so:'Gabay iyo maanso waa tix; tiraabtu waa hadal ama qoraal aan tix ahayn. Hees waa erayo la luuqeeyo, riwaayadna waa sheeko la matalo. Maahmaah, miisaan iyo hal-ku-dheg waa erayo kale oo suugaanta lagu barto.',en:'Gabay and maanso are forms of verse; prose is not verse. A song is sung, while a play is performed. Proverbs, metre and mottos are other literary ideas.',review:pending,sources:['ptc','claus']}],
 3:[{id:'peace-march',so:'Hadraawi wuxuu rumaysnaa in suugaanta iyo erayadu dadka isu soo dhawayn karaan. Wuxuu ku boorriyey bulshada nabad, caddaalad iyo isfaham. Sannadkii 2004, wuxuu ka qayb qaatay socdaal nabadeed.',en:'Hadraawi advocated peace, justice and reconciliation. In 2004 he took part in a peace march.',review:pending,sources:['ptc','leiden','claus']},{id:'respect',so:'Markaan si ixtiraam leh u wada hadalno, waxaan maqli karnaa fikradaha dadka kale oo aan dhisi karnaa wadajir.',en:'Respectful words can help people understand one another.',review:pending,sources:['ptc']}],
 4:[{id:'legacy',so:'Hadraawi wuxuu raad weyn ku reebay gabayga iyo suugaanta Soomaaliyeed. Dadku waxay ku xusuustaan hal-abuurkiisa iyo dadaalkiisii nabadda.',en:'Hadraawi left a lasting contribution to Somali poetry and literature, and is remembered for his creative work and peace efforts.',review:pending,sources:['ptc','claus']},{id:'youth',so:'Markaan akhrinno, qorno oo aan tix tirinno, waxaan ilaalinaynaa afkeenna. Carruurta maanta ayaa noqon kara abwaannada iyo qorayaasha berri.',en:'By reading, writing and reciting, young people can help keep their language alive and become tomorrow’s writers and poets.',review:pending,sources:['ptc']}]
};
export type Question=Reviewed&{id:string;prompt:string;options:string[];answer:string;explanation:string};
export const questions:Question[]=[
 {id:'identity',prompt:'Hadraawi muxuu ahaa?',options:['Abwaan Soomaaliyeed','Ciyaaryahan','Duuliye'],answer:'Abwaan Soomaaliyeed',explanation:'Wuxuu ahaa abwaan iyo qoraa Soomaaliyeed.',review:pending,sources:['ptc']},
 {id:'name',prompt:'Magaciisa oo buuxa kee ayuu ahaa?',options:['Maxamed Ibraahin Warsame','Maxamed Ibraahin Cali','Warsame Xasan'],answer:'Maxamed Ibraahin Warsame',explanation:'Hadraawi wuxuu ahaa magaca uu ku caan baxay.',review:pending,sources:['ptc']},
 {id:'birthplace',prompt:'Gobolkee ayuu ku dhashay?',options:['Togdheer','Awdal','Banaadir'],answer:'Togdheer',explanation:'Ilaha la isticmaalay waxay sheegaan Togdheer.',review:pending,sources:['ptc','leiden']},
 {id:'birthyear',prompt:'Sannadkee ayuu dhashay?',options:['1943','1973','2012'],answer:'1943',explanation:'Wuxuu dhashay 1943.',review:pending,sources:['ptc','leiden']},
 {id:'award',prompt:'Maxaa dhacay 2012?',options:['Wuxuu helay Abaalmarinta Prince Claus','Wuxuu dhashay','Wuxuu bilaabay dugsiga'],answer:'Wuxuu helay Abaalmarinta Prince Claus',explanation:'Waxaa la guddoonsiiyey abaalmarinta 2012.',review:pending,sources:['claus']},
 {id:'prison',prompt:'Maxaa ku dhacay 1973?',options:['Xabsi ayaa la dhigay','Abaalmarin ayuu helay','Socdaalkii nabadda ayuu bilaabay'],answer:'Xabsi ayaa la dhigay',explanation:'Wuxuu xabsiga ku jiray shan sano.',review:pending,sources:['ptc','leiden']},
 {id:'peace',prompt:'Muxuu ku dhiirrigeliyey socdaalkiisii?',options:['Nabad iyo isu soo dhawaansho','Colaad','Kala qaybsanaan'],answer:'Nabad iyo isu soo dhawaansho',explanation:'Socdaalkiisu wuxuu dhiirrigelinayey nabad iyo isfaham.',review:pending,sources:['leiden']},
 {id:'play',prompt:'Aqoon iyo Afgarad waa maxay?',options:['Riwaayad','Ciyaar kubbad','Buug xisaab'],answer:'Riwaayad',explanation:'Prince Claus Fund wuxuu ku tilmaamaa riwaayad.',review:pending,sources:['claus']},
 {id:'gabay',prompt:'Gabay waa maxay?',options:['Nooc ka mid ah tixda Soomaaliyeed','Nooc gaadiid','Cunto'],answer:'Nooc ka mid ah tixda Soomaaliyeed',explanation:'Gabaygu waa nooc ka mid ah tixda.',review:pending,sources:['ptc']},
 {id:'legacy',prompt:'Sideen u ilaalin karnaa afkeenna?',options:['In aan akhrinno, qorno oo wadaagno','In aan joojino akhriska','In aan buugaagta qarinno'],answer:'In aan akhrinno, qorno oo wadaagno',explanation:'Akhriska, qorista iyo wadaaggu waxay xoojiyaan afkeenna.',review:pending,sources:['ptc']}
];
export const nameWords=['Hadraawi','Maxamed','Ibraahin','Warsame'] as const;
export const writingTopics=['Hooyaday','Dalkayga','Afkayga','Nabad','Qoyskayga','Waxbarashadayda'];
