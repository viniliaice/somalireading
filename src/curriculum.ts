export type Letter = { grapheme:string; upper:string; lower:string; ipa:string; guidance:string; word:string; meaning:string; emoji:string; image:string; soundAudio:string; wordAudio:string; review:'awaiting-teacher'; audioStatus:'awaiting-recording'; kind:'vowel'|'consonant' };
const raw = [
 ['a','/a/','af','mouth','👄'],['e','/e/','eray','word','💬'],['i','/i/','ilig','tooth','🦷'],['o','/o/','orod','running','🏃'],['u','/u/','ubax','flower','🌼'],
 ['b','/b/','bisad','cat','🐈'],['t','/t/','tufaax','apple','🍎'],['j','/dʒ/','jalaato','ice cream','🍦'],['x','/ħ/','xanjo','chewing gum','🍬'],['kh','/x/','khudaar','vegetables','🥬'],['d','/d/','doon','boat','⛵'],['r','/r/','rooti','bread','🍞'],['s','/s/','subag','butter','🧈'],['sh','/ʃ/','shukumaan','towel','🧺'],['dh','/ɖ/','dhar','clothes','👕'],['c','/ʕ/','caano','milk','🥛'],['g','/ɡ/','geri','giraffe','🦒'],['f','/f/','faras','horse','🐎'],['q','/q/','qalin','pen','✏️'],['k','/k/','kabo','shoes','👟'],['l','/l/','libaax','lion','🦁'],['m','/m/','moos','banana','🍌'],['n','/n/','nal','light bulb','💡'],['w','/w/','warqad','paper','📄'],['h','/h/','hooyo','mother','👩🏾'],['y','/j/','yaxaas','crocodile','🐊']
];
const guidance:Record<string,string> = {c:'Dhawaaq dhuunta laga sameeyo /ʕ/.',x:'Dhawaaq dhuunta laga sameeyo /ħ/.',q:'Dhawaaq gadaasha afka laga sameeyo /q/.',dh:'Carrabka dib u laab: /ɖ/. Dh waa hal xaraf.',kh:'Dhawaaq gadaasha afka: /x/. Kh waa hal xaraf.',sh:'Sh waa hal xaraf iyo hal dhawaaq /ʃ/.'};
export const letters:Letter[] = raw.map(([g,ipa,word,meaning,emoji],i)=>({grapheme:g,upper:g.length===2?g[0].toUpperCase()+g[1]:g.toUpperCase(),lower:g,ipa,guidance:guidance[g]||`Baro dhawaaqa ${g}: ${ipa}.`,word,meaning,emoji,image:`emoji:${emoji}`,soundAudio:`/audio/sounds/${g}.mp3`,wordAudio:`/audio/words/${word}.mp3`,review:'awaiting-teacher',audioStatus:'awaiting-recording',kind:i<5?'vowel':'consonant'}));
export const byG = (g:string) => letters.find(l=>l.grapheme===g)!;
export const pairs = [
 {short:'bur',long:'buur',shortMeaning:'flour',longMeaning:'mountain',vowel:'u'},
 {short:'bar',long:'baar',shortMeaning:'learn / spot',longMeaning:'examine',vowel:'a'},
 {short:'bog',long:'boog',shortMeaning:'page',longMeaning:'wound',vowel:'o'},
 {short:'dhig',long:'dhiig',shortMeaning:'put down',longMeaning:'blood',vowel:'i'}
];
// Long vowels stay a single sound tile; digraphs must never be split.
export function tokenize(word:string):string[] { return word.toLowerCase().match(/dh|kh|sh|aa|ee|ii|oo|uu|[a-z]/g) || []; }
export type Unit = {id:number; title:string; subtitle:string; icon:string; color:string; letters:string[]; description:string; activity:string};
export const units:Unit[] = [
 {id:1,title:'Shaqallada',subtitle:'Baro shanta shaqal',icon:'☀️',color:'yellow',letters:['a','e','i','o','u'],description:'Aan baranno A, E, I, O iyo U.',activity:'Xarafka baro'},
 {id:2,title:'Shibbanayaasha',subtitle:'La kulan xarfaha',icon:'🌿',color:'green',letters:['b','t','j','d','r','s','g','f','k','l','m','n','w','h','y'],description:'Baro shibbanayaasha iyo erayo cusub.',activity:'Xarafka baro'},
 {id:3,title:'Dhawaaqyada gaarka ah',subtitle:'Dhawaaqyo cusub',icon:'✨',color:'peach',letters:['c','x','q','dh','kh'],description:'La kulan dhawaaqyada gaarka ah ee af-Soomaaliga.',activity:'Xarafka baro'},
 {id:4,title:'Laba xaraf, hal dhawaaq',subtitle:'Sh, Dh iyo Kh',icon:'🧩',color:'purple',letters:['sh','dh','kh'],description:'Sh, Dh iyo Kh mid walba waa hal unug.',activity:'Erayga dhis'},
 {id:5,title:'Shaqal gaaban & dheer',subtitle:'Is barbar dhig',icon:'🌈',color:'blue',letters:['a','e','i','o','u'],description:'Shaqal dheer waxaa lagu qoraa laba shaqal: aa, ee, ii, oo, uu.',activity:'Is barbar dhig'},
 {id:6,title:'Aan isku akhrino',subtitle:'Dhis oo akhri erayo',icon:'📖',color:'pink',letters:['n','m','b','sh','dh','kh'],description:'Isku gee unugyada si aad eray u dhisto.',activity:'Erayga dhis'},
 {id:7,title:'Aan ku celcelinno',subtitle:'Ciyaar oo xasuuso',icon:'🎨',color:'green',letters:['b','t','n','sh'],description:'Ku celceli xarfo iyo erayo aad baratay.',activity:'Ciyaarta erayada'},
 {id:8,title:'Tijaabada heerka 1',subtitle:'Tus waxaad baratay',icon:'🏆',color:'yellow',letters:[],description:'Ka jawaab su’aalaha si aad u aragto waxaad ku fiican tahay.',activity:'Bilow tijaabada'}
];
export const assessment = [
 {prompt:'Dooro shaqalka.',options:['b','a','sh'],answer:'a',area:'Shaqallada'},
 {prompt:'Kee waa hal unug oo laba xaraf ah?',options:['sh','ba','no'],answer:'sh',area:'Xarfo laba-qoraal ah'},
 {prompt:'Eraygee sawirkan la socda?',options:['bisad','kabo','nal'],answer:'bisad',area:'Akhriska erayada'},
 {prompt:'Dooro erayga shaqalkiisu dheer yahay.',options:['bur','buur','bar'],answer:'buur',area:'Shaqal dheer iyo gaaban'},
 {prompt:'Nal xarafkee ayuu ku bilaabmaa?',options:['m','n','l'],answer:'n',area:'Aqoonsiga xarfaha'},
 {prompt:'Unugyadee dhisaya dhar?',options:['dh + a + r','d + h + a + r','sh + a + r'],answer:'dh + a + r',area:'Dhisidda erayada'},
 {prompt:'Dooro xarafka erayga caano ku bilaabma.',options:['c','k','q'],answer:'c',area:'Aqoonsiga xarfaha'},
 {prompt:'Kee waa shaqal dheer?',options:['u','uu','b'],answer:'uu',area:'Shaqal dheer iyo gaaban'}
];
export const audioForWord=(word:string)=>`/audio/words/${word.toLowerCase()}.mp3`;
