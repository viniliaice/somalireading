import {byG,pairs,units} from './curriculum';
export const PROGRESS_KEY='baro-progress-v2';
export const MASTERY_THRESHOLD=0.8;
export const MIN_DISTINCT_ACTIVITIES=3;
export type Skill='vowel'|'digraph'|'reading'|'recognition'|'listening';
export type Evidence={id:string;skill:Skill;attempts:number;correct:number;incorrect:number;latestCorrect:boolean;lastActivity:string};
export type LessonProgress={evidence:Record<string,Evidence>};
export type AssessmentResult={score:number;total:number;skipped:number;listeningAssessed:number;completedAt:string};
export type Progress={lessons:Record<string,LessonProgress>; legacyCompleted:number[]; assessment?:AssessmentResult};
export const emptyProgress=():Progress=>({lessons:{},legacyCompleted:[]});
export function loadProgress():Progress {try{const saved=localStorage.getItem(PROGRESS_KEY);if(saved){const p=JSON.parse(saved);if(p && p.lessons && typeof p.lessons==='object')return p;}const old=JSON.parse(localStorage.getItem('baro-progress-v1')||'{}');return {...emptyProgress(),legacyCompleted:Array.isArray(old.completed)?old.completed.filter((x:unknown)=>typeof x==='number'&&x>=1&&x<=8):[]};}catch{return emptyProgress();}}
export function recordAttempt(progress:Progress,unit:number,id:string,skill:Skill,correct:boolean,now=new Date().toISOString()):Progress {
 const lesson=progress.lessons[unit]||{evidence:{}};const previous=lesson.evidence[id];
 const evidence:Evidence={id,skill,attempts:(previous?.attempts||0)+1,correct:(previous?.correct||0)+(correct?1:0),incorrect:(previous?.incorrect||0)+(correct?0:1),latestCorrect:correct,lastActivity:now};
 return {...progress,lessons:{...progress.lessons,[unit]:{evidence:{...lesson.evidence,[id]:evidence}}}};
}
export function recordAssessment(progress:Progress,result:AssessmentResult):Progress{return {...progress,assessment:result};}
export function lessonSummary(progress:Progress,unit:number,threshold=MASTERY_THRESHOLD){
 const evidence=Object.values(progress.lessons[unit]?.evidence||{});const correct=evidence.filter(e=>e.latestCorrect).length;const score=evidence.length?correct/evidence.length:0;
 const target=units.find(u=>u.id===unit);const requiredIds=unit===5?pairs.map(p=>[ `length:${p.short}` ]):unit===8?[]:(target?.letters||[]).map(g=>[`build:${byG(g).word}`,`match:${byG(g).word}`]);const covered=requiredIds.filter(ids=>ids.some(id=>evidence.some(e=>e.id===id))).length;const required=requiredIds.length;
 return {covered,required,distinct:evidence.length,attempts:evidence.reduce((s,e)=>s+e.attempts,0),correct:evidence.reduce((s,e)=>s+e.correct,0),incorrect:evidence.reduce((s,e)=>s+e.incorrect,0),retries:evidence.reduce((s,e)=>s+Math.max(0,e.attempts-1),0),score:unit===8&&progress.assessment?.total?progress.assessment.score/progress.assessment.total:score,mastered:unit===8?!!(progress.assessment&&progress.assessment.total>=MIN_DISTINCT_ACTIVITIES&&progress.assessment.score/progress.assessment.total>=threshold):(required>0&&covered===required&&evidence.length>=MIN_DISTINCT_ACTIVITIES&&score>=threshold),lastActivity:evidence.map(e=>e.lastActivity).sort().slice(-1)[0]||null};
}
export function skillSummary(progress:Progress,skill:Skill){const evidence=Object.values(progress.lessons).flatMap(l=>Object.values(l.evidence)).filter(e=>e.skill===skill);return {attempted:evidence.length,correct:evidence.filter(e=>e.latestCorrect).length};}

export function soundRecognitionSummary(progress:Progress){const evidence=Object.values(progress.lessons).flatMap(l=>Object.values(l.evidence)).filter(e=>e.id.startsWith('listen-sound-')||e.id.startsWith('listen-hunt-'));return {attempted:evidence.length,correct:evidence.filter(e=>e.latestCorrect).length};}
