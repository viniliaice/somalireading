// @vitest-environment jsdom
import React from 'react';
import {afterEach,describe,it,expect} from 'vitest';
import {render,screen,fireEvent,cleanup} from '@testing-library/react';
import {BuildWord,MatchWord} from '../src/main';
import {byG} from '../src/curriculum';
afterEach(cleanup);
describe('activity components',()=>{
 it('builds dhar with a single dh tile',()=>{const {container}=render(<BuildWord letter={byG('dh')}/>);const tiles=container.querySelector('.tile-row')!;for(const t of ['dh','a','r'])fireEvent.click(Array.from(tiles.querySelectorAll('button')).find(b=>b.textContent===t)!);fireEvent.click(screen.getByText('Hubi'));expect(screen.getByRole('status').textContent).toContain('Waa sax')});
 it('reports incorrect and correct picture matching',()=>{render(<MatchWord letter={byG('b')}/>);fireEvent.click(screen.getByRole('button',{name:'tufaax'}));expect(screen.getByRole('status').textContent).toContain('Mar kale');fireEvent.click(screen.getByRole('button',{name:'bisad'}));expect(screen.getByRole('status').textContent).toContain('Waa sax')});
});
