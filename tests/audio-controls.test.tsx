// @vitest-environment jsdom
import React from 'react';
import {afterEach,expect,it,vi} from 'vitest';
import {cleanup,fireEvent,render,screen} from '@testing-library/react';
import {AudioButton} from '../src/main';
import {stopAudio} from '../src/audio';
vi.mock('../src/audio',async importOriginal=>({...await importOriginal<typeof import('../src/audio')>(),playVerifiedAudio:vi.fn().mockResolvedValue('played'),stopAudio:vi.fn()}));
afterEach(cleanup);
it('offers a stop control after mocked approved playback',async()=>{render(<AudioButton path="/audio/sounds/a.mp3"/>);fireEvent.click(screen.getByRole('button',{name:'Dhagayso'}));fireEvent.click(await screen.findByRole('button',{name:'Jooji'}));expect(stopAudio).toHaveBeenCalledOnce();expect(screen.queryByRole('button',{name:'Jooji'})).toBeNull()});
