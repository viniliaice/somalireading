import {letters, pairs} from './curriculum';

export type RecordingStatus = 'NOT_RECORDED' | 'RECORDED' | 'AWAITING_REVIEW' | 'APPROVED' | 'REJECTED';
export type AudioEntry = {
 id:string; contentId:string; text:string; path:string; kind:'sound'|'word'|'letter-name'|'phrase'|'dialogue'|'paragraph';
 status:RecordingStatus; reviewStatus:RecordingStatus; pronunciationStatus:RecordingStatus;
 speaker:string; dialect:string; license:string; consent:string; recordedAt:string; reviewer:string; reviewedAt:string; reviewEvidence:string;
};
// Changes to this audit map must be backed by actual recordings, consent and review evidence.
// A file's mere presence is never an approval.
export const recordingAudit:Record<string,Partial<AudioEntry>> = {};
const entry=(id:string,contentId:string,text:string,path:string,kind:AudioEntry['kind']):AudioEntry=>({
 id,contentId,text,path,kind,status:'NOT_RECORDED',reviewStatus:'NOT_RECORDED',pronunciationStatus:'NOT_RECORDED',speaker:'',dialect:'',license:'',consent:'',recordedAt:'',reviewer:'',reviewedAt:'',reviewEvidence:'',...recordingAudit[id]
});
const longVowels=['aa','ee','ii','oo','uu'];
const comparisonWords=Array.from(new Set(pairs.flatMap(p=>[p.short,p.long])));
export const audioManifest:AudioEntry[]=[
 ...letters.map(l=>entry(`sound:${l.grapheme}`,l.grapheme,l.grapheme,l.soundAudio,'sound')),
 ...longVowels.map(v=>entry(`sound:${v}`,v,v,`/audio/sounds/${v}.mp3`,'sound')),
 ...letters.flatMap(l=>['upper','lower'].map(form=>entry(`name:${l.grapheme}:${form}`,l.grapheme,form==='upper'?l.upper:l.lower,`/audio/names/${l.grapheme}-${form}.mp3`,'letter-name'))),
 ...letters.map(l=>entry(`word:${l.word}`,l.word,l.word,l.wordAudio,'word')),
 ...comparisonWords.filter(w=>!letters.some(l=>l.word===w)).map(w=>entry(`word:${w}`,w,w,`/audio/words/${w}.mp3`,'word'))
];
export const audioById=(id:string)=>audioManifest.find(a=>a.id===id);
export const audioByPath=(path:string)=>audioManifest.find(a=>a.path===path);
export function isApproved(a:AudioEntry|undefined):a is AudioEntry {
 return !!a && a.status==='APPROVED' && a.reviewStatus==='APPROVED' && a.pronunciationStatus==='APPROVED' && !!(a.speaker && a.dialect && a.license && a.consent && a.recordedAt && a.reviewer && a.reviewedAt && a.reviewEvidence);
}
export async function audioFileAvailable(a:AudioEntry|undefined, fetcher:typeof fetch=fetch):Promise<boolean>{
 if(!isApproved(a)) return false;
 try {const response=await fetcher(a.path,{method:'HEAD'}); const type=response.headers.get('content-type')||'';return response.ok && (type.startsWith('audio/') || type.startsWith('application/octet-stream'));} catch{return false;}
}
export type AudioResult='played'|'unapproved'|'missing'|'playback-error';
let activeAudio:HTMLAudioElement|undefined;
export function stopAudio(){if(activeAudio){activeAudio.pause();activeAudio.currentTime=0;activeAudio=undefined;}}
export async function playVerifiedAudio(a:AudioEntry|undefined):Promise<AudioResult>{
 if(!isApproved(a))return 'unapproved';
 // Start immediately inside the user's gesture (important on mobile browsers).
 // Listening questions separately check file availability before inclusion.
 try {stopAudio();const audio=new Audio(a.path);activeAudio=audio;await audio.play();return 'played';}catch{activeAudio=undefined;return 'playback-error';}
}
