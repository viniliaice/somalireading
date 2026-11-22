import {assessment as initial} from './curriculum';
import type {Skill} from './progress';
export type VisualQuestion={id:string;prompt:string;options:string[];answer:string;area:string;skill:Skill;image?:string};
export const ASSESSMENT_QUESTION_COUNT=12;
const skillOf=(area:string):Skill=>area.includes('Shaqal')?'vowel':area.includes('laba-qoraal')?'digraph':area.includes('eray')?'reading':'recognition';
export const visualQuestions:VisualQuestion[]=[
 ...initial.map((q,i)=>({...q,id:`visual:${i}`,skill:skillOf(q.area),image:i===2?'🐈':undefined})),
 {id:'visual:consonant',prompt:'Dooro shibbane.',options:['i','b','u'],answer:'b',area:'Shibbanayaasha',skill:'recognition'},
 {id:'visual:kh',prompt:'Kee waa hal dhawaaq oo laba xaraf ah?',options:['kh','ka','ku'],answer:'kh',area:'Xarfo laba-qoraal ah',skill:'digraph'},
 {id:'visual:dh',prompt:'Dhar xarafkee ayuu ku bilaabmaa?',options:['dh','d','sh'],answer:'dh',area:'Xarfo laba-qoraal ah',skill:'digraph'},
 {id:'visual:moos',prompt:'Eraygee sawirka muuska la socda?',options:['moos','faras','nal'],answer:'moos',area:'Akhriska erayada',skill:'reading',image:'🍌'},
 {id:'visual:boog',prompt:'Dooro erayga shaqalkiisu dheer yahay: bog ama boog?',options:['bog','boog'],answer:'boog',area:'Shaqal dheer iyo gaaban',skill:'vowel'},
 {id:'visual:khudaar',prompt:'Unugyadee dhisaya khudaar?',options:['kh + u + d + aa + r','k + h + u + d + aa + r','sh + u + d + aa + r'],answer:'kh + u + d + aa + r',area:'Dhisidda erayada',skill:'reading'},
 {id:'visual:long-e',prompt:'Kee waa shaqal dheer?',options:['e','ee','t'],answer:'ee',area:'Shaqal dheer iyo gaaban',skill:'vowel'},
 {id:'visual:qalin',prompt:'Qalin xarafkee ayuu ku bilaabmaa?',options:['q','k','c'],answer:'q',area:'Aqoonsiga xarfaha',skill:'recognition'}
];
export function shuffle<T>(values:T[],random:()=>number=Math.random):T[]{const out=[...values];for(let i=out.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}return out;}
const categories:Record<string,string>={'visual:0':'vowel','visual:1':'digraph','visual:2':'picture','visual:3':'length','visual:4':'letter','visual:5':'building','visual:6':'grapheme','visual:7':'vowel','visual:consonant':'consonant','visual:kh':'digraph','visual:dh':'grapheme','visual:moos':'picture','visual:boog':'length','visual:khudaar':'building','visual:long-e':'vowel','visual:qalin':'letter'};
export function selectVisualQuestions(count=ASSESSMENT_QUESTION_COUNT,random:()=>number=Math.random){
 const pool=shuffle(visualQuestions,random),chosen:VisualQuestion[]=[];
 for(const category of shuffle(['vowel','consonant','digraph','length','picture','grapheme','letter','building'],random)){const q=pool.find(x=>categories[x.id]===category);if(q&&chosen.length<count)chosen.push(q)}
 for(const q of pool)if(chosen.length<count&&!chosen.some(x=>x.id===q.id))chosen.push(q);
 return shuffle(chosen,random);
}
