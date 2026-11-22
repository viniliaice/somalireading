import {letters,pairs} from './curriculum';
import originals from './review-original.json';
export type ReviewStatus='PENDING_REVIEW'|'CORRECTION_REQUIRED'|'APPROVED';
export type ReviewRecord={id:string;original:string;suggestedCorrection:string;comments:string;ipaReview:string;pronunciationReview:string;vocabularyReview:string;meaningReview:string;status:ReviewStatus;reviewer:string;reviewDate:string;evidence:string};
// Preserve original content; add documented corrections here only after receiving them.
export const reviewUpdates:Record<string,Partial<Omit<ReviewRecord,'id'|'original'>>>={};
export const reviewRecords:ReviewRecord[]=[
 ...letters.map(l=>({id:`letter:${l.grapheme}`,original:originals[`letter:${l.grapheme}` as keyof typeof originals]||'',suggestedCorrection:'',comments:'',ipaReview:'',pronunciationReview:'',vocabularyReview:'',meaningReview:'',status:'PENDING_REVIEW' as ReviewStatus,reviewer:'',reviewDate:'',evidence:'',...reviewUpdates[`letter:${l.grapheme}`]})),
 ...pairs.map(p=>({id:`pair:${p.short}:${p.long}`,original:originals[`pair:${p.short}:${p.long}` as keyof typeof originals]||'',suggestedCorrection:'',comments:'',ipaReview:'',pronunciationReview:'',vocabularyReview:'',meaningReview:'',status:'PENDING_REVIEW' as ReviewStatus,reviewer:'',reviewDate:'',evidence:'',...reviewUpdates[`pair:${p.short}:${p.long}`]}))
];
export function hasApprovalEvidence(r:ReviewRecord){return r.status==='APPROVED'&&Boolean(r.reviewer&&r.reviewDate&&r.evidence&&r.ipaReview&&r.pronunciationReview&&r.vocabularyReview&&r.meaningReview);}
