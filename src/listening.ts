import {letters, pairs, tokenize} from './curriculum';
export type ListeningKind='sound'|'picture'|'hunt'|'length'|'tiles';
export type ListeningQuestion={id:string;kind:ListeningKind;prompt:string;audioIds:string[];choices:string[];correct:string[];pictureChoices?:Record<string,string>};
const otherLetters=(g:string)=> ['c','x','q','k'].includes(g)?['c','x','q','k'].filter(x=>x!==g).map(x=>x.toUpperCase()):letters.filter(l=>l.grapheme!==g).slice(0,3).map(l=>l.upper);
const rotate=<T,>(values:T[],n:number)=>values.slice(n%values.length).concat(values.slice(0,n%values.length));
export const listeningQuestions:ListeningQuestion[]=[
 ...letters.map(l=>({id:`listen-sound-${l.grapheme}`,kind:'sound' as const,prompt:'Dhagayso dhawaaqa. Xarafkee ayaad maqashay?',audioIds:[`sound:${l.grapheme}`],choices:rotate([l.upper,...otherLetters(l.grapheme)],l.grapheme.charCodeAt(0)%4),correct:[l.upper]})),
 ...letters.map(l=>{const others=letters.filter(x=>x.word!==l.word).slice(0,3);return {id:`listen-picture-${l.word}`,kind:'picture' as const,prompt:'Dhagayso erayga. Dooro sawirka saxda ah.',audioIds:[`word:${l.word}`],choices:rotate([l.word,...others.map(x=>x.word)],l.word.charCodeAt(0)%4),correct:[l.word],pictureChoices:Object.fromEntries([l,...others].map(x=>[x.word,x.emoji]))}}),
 ...letters.map(l=>{const others=letters.filter(x=>x.grapheme!==l.grapheme).slice(0,3);return {id:`listen-hunt-${l.grapheme}`,kind:'hunt' as const,prompt:'Dhagayso dhawaaqa. Dooro erayada ku bilaabma.',audioIds:[`sound:${l.grapheme}`],choices:rotate([l.word,...others.map(x=>x.word)],l.word.charCodeAt(0)%4),correct:[l.word]}}),
 ...pairs.map((p,i)=>({id:`listen-length-${p.short}`,kind:'length' as const,prompt:'Dhagayso labada eray. Kee ayaa shaqal dheer leh?',audioIds:i%2?[`word:${p.long}`,`word:${p.short}`]:[`word:${p.short}`,`word:${p.long}`],choices:['1','2'],correct:[i%2?'1':'2']})),
 ...letters.map(l=>({id:`listen-tiles-${l.word}`,kind:'tiles' as const,prompt:'Dhagayso erayga. U kala dhig unugyada.',audioIds:[`word:${l.word}`],choices:[...tokenize(l.word)].reverse(),correct:tokenize(l.word)}))
];
export function scoreListening(q:ListeningQuestion,selected:string[]):boolean{
 if(q.kind==='hunt')return selected.length===q.correct.length && q.correct.every(v=>selected.includes(v));
 return selected.length===q.correct.length && selected.every((v,i)=>v===q.correct[i]);
}
