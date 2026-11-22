// @vitest-environment jsdom
import React from 'react';
import {afterEach,describe,expect,it,vi} from 'vitest';
import {cleanup,fireEvent,render,screen,waitFor} from '@testing-library/react';
import {ListeningQuestionView} from '../src/ListeningActivity';
import type {ListeningKind,ListeningQuestion} from '../src/listening';
vi.mock('../src/audio',async importOriginal=>({...await importOriginal<typeof import('../src/audio')>(),playVerifiedAudio:vi.fn().mockResolvedValue('played')}));
afterEach(cleanup);
describe('listening interactions with mocked approved audio',()=>{
 for(const kind of ['sound','picture','hunt','length','tiles'] as ListeningKind[])it(`scores ${kind} only after playback`,async()=>{const q:ListeningQuestion={id:kind,kind,prompt:'Test prompt',audioIds:['sound:a'],choices:['a','b','c'],correct:kind==='tiles'?['b','a']:['b'],pictureChoices:kind==='picture'?{a:'☀️',b:'🌼',c:'🌿'}:undefined};const attempt=vi.fn();render(<ListeningQuestionView question={q} onAttempt={attempt}/>);const choices=screen.getAllByRole('button').filter(b=>b.hasAttribute('aria-pressed'));expect((choices[1] as HTMLButtonElement).disabled).toBe(true);fireEvent.click(screen.getByRole('button',{name:'▶ Dhagayso'}));await waitFor(()=>expect((choices[1] as HTMLButtonElement).disabled).toBe(false));fireEvent.click(choices[1]);if(kind==='tiles')fireEvent.click(choices[0]);fireEvent.click(screen.getByRole('button',{name:'Hubi'}));expect(attempt).toHaveBeenCalledWith(kind,'listening',true)});
});
