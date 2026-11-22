import {describe,it,expect} from 'vitest';
import {letters,tokenize,pairs,units,assessment,byG} from '../src/curriculum';
describe('Somali curriculum',()=>{
 it('has exactly 5 vowels and 21 consonants, 26 distinct base units',()=>{expect(letters.filter(x=>x.kind==='vowel')).toHaveLength(5);expect(letters.filter(x=>x.kind==='consonant')).toHaveLength(21);expect(new Set(letters.map(x=>x.grapheme)).size).toBe(26)});
 it('treats digraphs as single graphemes',()=>{expect(tokenize('dhar')).toEqual(['dh','a','r']);expect(tokenize('khudaar')).toEqual(['kh','u','d','aa','r']);expect(tokenize('shukumaan')).toEqual(['sh','u','k','u','m','aa','n'])});
 it('recognises all five doubled vowels as long units',()=>{for(const v of ['a','e','i','o','u'])expect(tokenize(v+v)).toEqual([v+v])});
 it('contains no p, v, or z in native examples',()=>{for(const l of letters)expect(l.word).not.toMatch(/[pvz]/i)});
 it('has metadata and honestly records review and audio status',()=>{for(const l of letters){expect(l.ipa).toBeTruthy();expect(l.image).toBeTruthy();expect(l.soundAudio).toMatch(/^\/audio\//);expect(l.wordAudio).toMatch(/^\/audio\//);expect(l.review).toBe('awaiting-teacher');expect(l.audioStatus).toBe('awaiting-recording')}});
 it('contains required special sounds',()=>{expect(byG('c').ipa).toBe('/ʕ/');expect(byG('x').ipa).toBe('/ħ/');expect(byG('q').ipa).toBe('/q/');expect(byG('dh').ipa).toBe('/ɖ/')});
 it('provides four short/long comparisons',()=>{expect(pairs.map(x=>[x.short,x.long])).toEqual([['bur','buur'],['bar','baar'],['bog','boog'],['dhig','dhiig']])});
 it('offers eight unique Stage 1 units',()=>{expect(units.map(u=>u.id)).toEqual([1,2,3,4,5,6,7,8])});
 it('assessment answers are among options',()=>{for(const q of assessment)expect(q.options).toContain(q.answer)});
});
