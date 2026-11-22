import {describe,it,expect} from 'vitest';
import {biography,hadraawi,lessonReadings,lessons,literaryTerms,nameWords,questions,sourceLinks,timeline,values,works} from '../src/modules/hadraawi';
import {tokenize,units} from '../src/curriculum';
import {completeCulturalLesson,culturalMastered,emptyProgress,getCulturalProgress,lessonSummary,recordAttempt,updateCulturalProgress} from '../src/progress';
describe('Hadraawi cultural content',()=>{
 it('keeps four lessons and all source-linked material pending review',()=>{expect(lessons).toHaveLength(4);for(const entry of [...lessons,...biography,...timeline,...works,...literaryTerms,...values,...questions,...Object.values(lessonReadings).flat()]){expect(entry.review).toBe('PENDING_REVIEW');expect(entry.sources.length).toBeGreaterThan(0);for(const id of entry.sources)expect(sourceLinks[id].url).toMatch(/^https:\/\//)}expect(hadraawi.review).toBe('PENDING_REVIEW')});
 it('documents supported dates and marks 1978 as an inference',()=>{expect(timeline.map(x=>x.order)).toEqual([1943,1973,1978,2004,2012,2022]);expect(timeline.find(x=>x.id==='release')?.certainty).toBe('inferred');expect(timeline.find(x=>x.id==='death')?.year).toBe('18 Agoosto 2022')});
 it('documents spelling variants and supported work categories',()=>{expect(hadraawi.name).toBe('Maxamed Ibraahin Warsame');expect(hadraawi.titleVariants.join(' ')).toContain('Dabo Huwan');expect(works.find(x=>x.id==='aqoon')?.category).toBe('Riwaayad');expect(works.filter(x=>x.category==='Maanso')).toHaveLength(3)});
 it('contains all requested literary terms and values',()=>{for(const word of ['Gabay','Maanso','Hees','Riwaayad','Hal-abuur','Tiraab','Tix','Maahmaah','Miisaan','Hal-ku-dheg'])expect(literaryTerms.some(x=>x.word===word)).toBe(true);expect(values.map(x=>x.word)).toEqual(['Nabad','Caddaalad','Xorriyad','Midnimo','Jacayl','Ixtiraam','Wadajir','Aqoon'])});
 it('builds the names without splitting long vowels and digraphs',()=>{expect(tokenize('Hadraawi')).toEqual(['h','a','d','r','aa','w','i']);expect(tokenize('Ibraahin')).toEqual(['i','b','r','aa','h','i','n']);for(const name of nameWords)expect(tokenize(name).join('')).toBe(name.toLowerCase());expect(tokenize('shakhsi')).toEqual(['sh','a','kh','s','i'])});
 it('has ten distinct answerable assessment questions',()=>{expect(questions).toHaveLength(10);expect(new Set(questions.map(q=>q.id)).size).toBe(10);for(const q of questions)expect(q.options).toContain(q.answer)});
 it('keeps cultural progress and original writing separate from Stage 1',()=>{let p=recordAttempt(emptyProgress(),1,'match:af','vowel',true);const original=JSON.stringify(p.lessons),summary=lessonSummary(p,1);p=completeCulturalLesson(p,'hadraawi',1);p=updateCulturalProgress(p,'hadraawi',{writing:'Afkayga waan jeclahay.',topic:'Afkayga',assessment:{score:8,total:10,completedAt:'2026-01-01'}});expect(JSON.stringify(p.lessons)).toBe(original);expect(lessonSummary(p,1)).toEqual(summary);expect(units).toHaveLength(8);expect(getCulturalProgress(p,'hadraawi').writing).toBe('Afkayga waan jeclahay.');expect(culturalMastered(getCulturalProgress(p,'hadraawi'))).toBe(true)});
 it('applies the assessment threshold without treating empty or low scores as mastery',()=>{const p=getCulturalProgress(emptyProgress(),'hadraawi');expect(culturalMastered(p)).toBe(false);expect(culturalMastered({...p,assessment:{score:7,total:10,completedAt:'x'}})).toBe(false);expect(culturalMastered({...p,assessment:{score:8,total:10,completedAt:'x'}})).toBe(true);expect(culturalMastered({...p,assessment:{score:8,total:10,completedAt:'x'}},.9)).toBe(false)});
});

describe('Stage 1 progress isolation across all units',()=>{
 it('preserves every mastery summary and assessment when cultural data changes',()=>{
  let p=emptyProgress();for(const u of units)p=recordAttempt(p,u.id,`sample:${u.id}`,'recognition',u.id%2===0,'2026-01-01');
  p={...p,assessment:{score:8,total:10,skipped:0,listeningAssessed:0,completedAt:'2026-01-01'}};
  const before=units.map(u=>lessonSummary(p,u.id));const assessment=p.assessment;const lessons=JSON.stringify(p.lessons);
  p=completeCulturalLesson(p,'hadraawi',3);p=updateCulturalProgress(p,'hadraawi',{writing:'Qoraal',topic:'Nabad',assessment:{score:2,total:10,completedAt:'2026-01-02'}});
  expect(units.map(u=>lessonSummary(p,u.id))).toEqual(before);expect(p.assessment).toEqual(assessment);expect(JSON.stringify(p.lessons)).toBe(lessons);
 });
});
