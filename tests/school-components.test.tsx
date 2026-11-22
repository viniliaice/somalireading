// @vitest-environment jsdom
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { FillBlank, Flashcards, MatchPairs, OrderWords, Spelling, SchoolAudioButton } from '../src/school/activities';
import { LessonView } from '../src/school/LessonView';
import { StageView } from '../src/school/StageView';
import { Dashboard } from '../src/school/Dashboard';
import { lessonById, stageById } from '../src/curriculum/index';
import { emptySchoolProgress } from '../src/curriculum/progress';
import type { Exercise } from '../src/curriculum/types';

afterEach(cleanup);

const grade = vi.fn();
const vocab = vi.fn();
const speak = vi.fn();
beforeEach(() => { grade.mockClear(); vocab.mockClear(); speak.mockClear(); });

describe('school activities grade objectively', () => {
  it('MatchPairs completes when every pair is matched and grades true', () => {
    const ex: Exercise = {
      id: 't1', type: 'match-qa', titleSo: 'Tijaabo', titleEn: 'Test', skill: 'akhris', objective: true,
      pairs: [{ left: 'Haa', right: 'Yes' }, { left: 'Maya', right: 'No' }],
    };
    render(<MatchPairs exercise={ex} onGrade={grade} />);
    fireEvent.click(screen.getByRole('button', { name: 'Haa' }));
    fireEvent.click(screen.getByRole('button', { name: 'Yes' }));
    fireEvent.click(screen.getByRole('button', { name: 'Maya' }));
    fireEvent.click(screen.getByRole('button', { name: 'No' }));
    expect(grade).toHaveBeenCalledWith('t1', true);
  });

  it('MatchPairs grades false for a wrong pairing', () => {
    const ex: Exercise = {
      id: 't2', type: 'match-qa', titleSo: 'Tijaabo', titleEn: 'Test', skill: 'akhris', objective: true,
      pairs: [{ left: 'Haa', right: 'Yes' }, { left: 'Maya', right: 'No' }],
    };
    render(<MatchPairs exercise={ex} onGrade={grade} />);
    fireEvent.click(screen.getByRole('button', { name: 'Haa' }));
    fireEvent.click(screen.getByRole('button', { name: 'No' }));
    expect(grade).toHaveBeenCalledWith('t2', false);
  });

  it('OrderWords grades the arranged sentence', () => {
    const ex: Exercise = {
      id: 't3', type: 'order-words', titleSo: 'Dhis', titleEn: 'Build', skill: 'qoris', objective: true,
      tokens: ['Tani', 'waa', 'guri'], answer: ['Tani', 'waa', 'guri'], translationEn: 'This is a house.',
    };
    render(<OrderWords exercise={ex} onGrade={grade} />);
    for (const token of ['Tani', 'waa', 'guri']) fireEvent.click(screen.getByRole('button', { name: token }));
    fireEvent.click(screen.getByRole('button', { name: 'Hubi' }));
    expect(grade).toHaveBeenCalledWith('t3', true);
    expect(screen.getByRole('status').textContent).toContain('Waa sax');
  });

  it('FillBlank accepts the right word and rejects the wrong one', () => {
    const ex: Exercise = {
      id: 't4', type: 'fill-blank', titleSo: 'Buuxi', titleEn: 'Fill', skill: 'qoris', objective: true,
      sentenceSo: 'Waan ___ arday.', options: ['ahay', 'buug'], answer: 'ahay',
    };
    const { unmount } = render(<FillBlank exercise={ex} onGrade={grade} />);
    fireEvent.click(screen.getByRole('button', { name: 'ahay' }));
    fireEvent.click(screen.getByRole('button', { name: 'Hubi' }));
    expect(grade).toHaveBeenCalledWith('t4', true);
    unmount();
    grade.mockClear();
    render(<FillBlank exercise={ex} onGrade={grade} />);
    fireEvent.click(screen.getByRole('button', { name: 'buug' }));
    fireEvent.click(screen.getByRole('button', { name: 'Hubi' }));
    expect(grade).toHaveBeenCalledWith('t4', false);
  });

  it('Spelling checks the typed word', () => {
    const ex: Exercise = {
      id: 't5', type: 'spelling', titleSo: 'Qor', titleEn: 'Spell', skill: 'qoris', objective: true,
      word: 'haddii', hintSo: 'if',
    };
    render(<Spelling exercise={ex} onGrade={grade} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Haddii' } });
    fireEvent.click(screen.getByRole('button', { name: 'Hubi' }));
    expect(grade).toHaveBeenCalledWith('t5', true);
  });

  it('Flashcards records vocabulary review and grades at the end', () => {
    const ex: Exercise = {
      id: 't6', type: 'flashcards', titleSo: 'Kaarar', titleEn: 'Cards', skill: 'akhris', objective: true,
      vocabIds: ['s0-haa', 's0-maya'],
    };
    render(<Flashcards exercise={ex} onGrade={grade} onVocab={vocab} />);
    fireEvent.click(screen.getByRole('button', { name: /Waan xasuustay/ }));
    fireEvent.click(screen.getByRole('button', { name: /Waan xasuustay/ }));
    expect(vocab).toHaveBeenCalledTimes(2);
    expect(grade).toHaveBeenCalledWith('t6', true);
  });

  it('blocks playback of unapproved recordings and says so honestly', async () => {
    render(<SchoolAudioButton audioId="word:s0-haa" />);
    fireEvent.click(screen.getByRole('button', { name: /Dhagayso/ }));
    const status = await screen.findByRole('status');
    expect(status.textContent).toContain('Cod la ansixiyey weli lama hayo');
  });
});

describe('lesson and stage views', () => {
  it('LessonView shows the learning cycle steps and lesson content', () => {
    const lesson = lessonById('s0-m2-l1')!;
    render(<LessonView lesson={lesson} onBack={() => {}} onGrade={grade} onVocab={vocab} onSpeak={speak} />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('Salaanta');
    expect(screen.getByRole('button', { name: /^Dhegayso/ })).toBeTruthy();
    expect(screen.getByRole('button', { name: /^Baro/ })).toBeTruthy();
    expect(screen.getByRole('button', { name: /^Ku hadal/ })).toBeTruthy();
    expect(screen.getByRole('button', { name: /^Dib u eeg/ })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /^Baro/ }));
    expect(screen.getByText('Erayada cusub')).toBeTruthy();
  });

  it('StageView runs the stage assessment and reports per-skill results', () => {
    const stage = stageById('stage-2')!;
    const onProgress = vi.fn();
    render(<StageView stage={stage} progress={emptySchoolProgress()} onBack={() => {}} onOpenLesson={() => {}} onProgress={onProgress} />);
    fireEvent.click(screen.getByRole('button', { name: /Bilow tijaabada/ }));
    for (const item of stage.assessment.items) {
      fireEvent.click(screen.getByRole('button', { name: item.answer }));
      fireEvent.click(screen.getByRole('button', { name: /Su’aasha xigta|Dhammaystir/ }));
    }
    expect(screen.getByRole('status').textContent).toMatch(/guulaysatay|celcelin/);
    expect(onProgress).toHaveBeenCalled();
  });

  it('Dashboard shows the four skills and a report download', () => {
    render(<Dashboard progress={emptySchoolProgress()} onOpenStage={() => {}} />);
    expect(screen.getByText('Dhagaysi')).toBeTruthy();
    expect(screen.getByText('Hadal')).toBeTruthy();
    expect(screen.getByText('Akhris')).toBeTruthy();
    expect(screen.getByText('Qoris')).toBeTruthy();
    expect(screen.getByRole('button', { name: /Soo dejiso warbixinta/ })).toBeTruthy();
    expect(screen.getByText(/ma aha aqoonsi cod-sameeye/)).toBeTruthy();
  });
});
