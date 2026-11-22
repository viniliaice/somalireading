// @vitest-environment jsdom
import React from 'react';
import {afterEach,describe,expect,it,vi} from 'vitest';
import {cleanup,fireEvent,render,screen,waitFor,within} from '@testing-library/react';
import Assessment from '../src/Assessment';
import {visualQuestions} from '../src/assessment';
vi.mock('../src/audio',async importOriginal=>({...await importOriginal<typeof import('../src/audio')>(),audioFileAvailable:vi.fn().mockResolvedValue(true),playVerifiedAudio:vi.fn().mockResolvedValue('played')}));
vi.mock('../src/listening',async importOriginal=>({...await importOriginal<typeof import('../src/listening')>(),listeningQuestions:[{id:'listen-sound-c',kind:'sound',prompt:'Dhagayso dhawaaqa.',audioIds:['sound:c'],choices:['C','X','K','Q'],correct:['C']}]}));
afterEach(cleanup);
async function completeAssessment(skip:boolean){const onFinish=vi.fn(),onAttempt=vi.fn();render(<Assessment count={4} onFinish={onFinish} onAttempt={onAttempt}/>);for(let i=0;i<4;i++){await screen.findByText(new RegExp(`SU’AASHA ${i+1} / 4`));const card=document.querySelector('.game-card')!;const prompt=within(card as HTMLElement).getByRole('heading').textContent;if(prompt==='Dhagayso dhawaaqa.'){if(skip){fireEvent.click(screen.getByRole('button',{name:'Codku ma shaqaynayo — ka bood'}));}else{fireEvent.click(screen.getByRole('button',{name:'▶ Dhagayso'}));await waitFor(()=>expect((screen.getByRole('button',{name:'C'}) as HTMLButtonElement).disabled).toBe(false));fireEvent.click(screen.getByRole('button',{name:'C'}));fireEvent.click(screen.getByRole('button',{name:'Hubi'}));fireEvent.click(screen.getByRole('button',{name:'Su’aasha xigta →'}));}}else{const options=Array.from(card.querySelectorAll('.choice-row button')).map(b=>b.textContent);const q=visualQuestions.find(x=>x.prompt===prompt&&x.options.length===options.length&&x.options.every(o=>options.includes(o)));if(!q)throw Error(`Unknown question ${prompt}`);fireEvent.click(within(card as HTMLElement).getByRole('button',{name:q.answer,exact:true}));fireEvent.click(screen.getByRole('button',{name:/Su’aasha xigta|Dhammaystir/}));}}
 await waitFor(()=>expect(onFinish).toHaveBeenCalledOnce());return {onFinish,onAttempt};}
describe('assessment listening with test-only mocked approved recordings',()=>{
 it('records a listening answer separately',async()=>{const {onFinish,onAttempt}=await completeAssessment(false);expect(onFinish.mock.calls[0][0]).toMatchObject({score:4,total:4,skipped:0,listeningAssessed:1});expect(onAttempt).toHaveBeenCalledWith('listen-sound-c','listening',true)});
 it('excludes unavailable playback when skipped rather than marking it wrong',async()=>{const {onFinish,onAttempt}=await completeAssessment(true);expect(onFinish.mock.calls[0][0]).toMatchObject({score:3,total:3,skipped:1,listeningAssessed:0});expect(onAttempt).not.toHaveBeenCalledWith('listen-sound-c','listening',false);expect(screen.getByText(/Dhagaysiga lama qiimayn/)).toBeTruthy()});
});
