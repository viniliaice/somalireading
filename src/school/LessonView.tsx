/**
 * Lesson view — the shared learning cycle:
 * Dhegayso → Baro → Ku hadal → Akhri → Faham → Isticmaal → Dib u eeg.
 * Not every lesson uses every step; steps with no content are omitted.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Check, Ear, MessageCircle, PenLine, Pencil, Repeat, Sparkles } from 'lucide-react';
import type { Exercise, Lesson } from '../curriculum/types';
import { ExerciseCard, SchoolAudioButton, SpeakingTaskCard, registerLesson, type GradeFn, type SpeakFn, type VocabFn } from './activities';

export type LessonStepId = 'dhagayso' | 'baro' | 'ku-hadal' | 'akhri' | 'faham' | 'isticmaal' | 'dib-u-eeg';

const stepLabels: Record<LessonStepId, string> = {
  'dhagayso': 'Dhegayso', 'baro': 'Baro', 'ku-hadal': 'Ku hadal', 'akhri': 'Akhri',
  'faham': 'Faham', 'isticmaal': 'Isticmaal', 'dib-u-eeg': 'Dib u eeg',
};

const stepIcons: Record<LessonStepId, React.ReactNode> = {
  'dhagayso': <Ear size={15} />, 'baro': <BookOpen size={15} />, 'ku-hadal': <MessageCircle size={15} />,
  'akhri': <BookOpen size={15} />, 'faham': <Sparkles size={15} />, 'isticmaal': <PenLine size={15} />, 'dib-u-eeg': <Repeat size={15} />,
};

function stepsFor(lesson: Lesson): LessonStepId[] {
  const steps: LessonStepId[] = [];
  const has = (types: Exercise['type'][]) => lesson.exercises.some(e => types.includes(e.type));
  if (lesson.dialogues.length > 0 || has(['listen-choose'])) steps.push('dhagayso');
  if (lesson.vocab.length > 0 || lesson.grammar.length > 0 || has(['flashcards'])) steps.push('baro');
  if (lesson.speaking.length > 0 || has(['roleplay', 'repeat-record', 'describe-picture', 'open-speaking'])) steps.push('ku-hadal');
  if (lesson.passages.length > 0) steps.push('akhri');
  if (has(['read-answer', 'match-qa'])) steps.push('faham');
  if (has(['order-words', 'fill-blank', 'spelling', 'match-word-picture', 'match-audio-word'])) steps.push('isticmaal');
  steps.push('dib-u-eeg');
  return steps;
}

function bucketOf(ex: Exercise): LessonStepId | null {
  switch (ex.type) {
    case 'listen-choose': return 'dhagayso';
    case 'flashcards': return 'baro';
    case 'roleplay': case 'repeat-record': case 'describe-picture': case 'open-speaking': return 'ku-hadal';
    case 'read-answer': case 'match-qa': return 'faham';
    case 'order-words': case 'fill-blank': case 'spelling': case 'match-word-picture': case 'match-audio-word': return 'isticmaal';
    default: return null;
  }
}

export function LessonView({ lesson, onBack, onGrade, onVocab, onSpeak, onLegacyOpen }: {
  lesson: Lesson;
  onBack: () => void;
  onGrade: GradeFn;
  onVocab: VocabFn;
  onSpeak: SpeakFn;
  onLegacyOpen?: (route: string) => void;
}) {
  useEffect(() => { registerLesson(lesson); }, [lesson]);
  const steps = useMemo(() => stepsFor(lesson), [lesson]);
  const [step, setStep] = useState<LessonStepId>(steps[0]);
  const [visited, setVisited] = useState<Set<LessonStepId>>(new Set([steps[0]]));
  const openedAt = useRef(Date.now());
  const lastStep = useRef(step);
  useEffect(() => () => {
    // Time spent is reported by the parent through onGrade's sibling hook; kept simple here.
    void lastStep; void openedAt;
  }, []);
  const goto = (s: LessonStepId) => {
    setStep(s);
    setVisited(new Set([...visited, s]));
    window.scrollTo(0, 0);
  };
  const stepExercises = lesson.exercises.filter(e => bucketOf(e) === step);
  const nextStep = steps[steps.indexOf(step) + 1];

  return (
    <div>
      <button className="sc-back" onClick={onBack}><ArrowLeft size={16} /> Dib u noqo</button>
      <p className="sc-eyebrow">{lesson.stageId.toUpperCase()} · {lesson.moduleId.toUpperCase()}</p>
      <h1 className="sc-h1">{lesson.titleSo}</h1>
      <p className="sc-lead">{lesson.titleEn} · qiyaastii {lesson.minutes} daqiiqo · xirfadaha: {lesson.skills.join(', ')}</p>
      {lesson.legacyRoute && (
        <div className="sc-pending">
          Casharkan waxaa lagu baryaa khibradda xarfaha asalka ah ee la ilaaliyay.
          <button className="sc-btn small" style={{ marginLeft: 10 }} onClick={() => onLegacyOpen?.(lesson.legacyRoute!)}>Fur casharka xarfaha <ArrowRight size={14} /></button>
        </div>
      )}
      <div className="sc-card">
        <p className="sc-eyebrow">UJEEDDOOYINKA</p>
        <ul>{lesson.objectivesSo.map((o, i) => <li key={i}>{o}</li>)}</ul>
      </div>
      <nav className="sc-stepbar" aria-label="Tallaabooyinka casharka">
        {steps.map(s => (
          <button key={s} className={`${s === step ? 'active' : ''} ${visited.has(s) && s !== step ? 'done' : ''}`} onClick={() => goto(s)}>
            {stepIcons[s]} {stepLabels[s]} {visited.has(s) && s !== step ? '✓' : ''}
          </button>
        ))}
      </nav>

      {step === 'dhagayso' && (
        <section>
          <h2 className="sc-h2">1 · Dhegayso</h2>
          <p className="sc-lead">Dhagayso wadahadalka iyo dhawaaqyada. Codadka waxaa la ciyaaraa marka la duubo oo la ansixiyo.</p>
          {lesson.dialogues.map(d => (
            <div className="sc-card" key={d.id}>
              <h3 className="sc-h3">{d.titleSo} <small className="sc-note">({d.titleEn})</small></h3>
              <p className="sc-note">{d.contextSo}</p>
              {d.lines.map((l, i) => (
                <div className="sc-dialogue-line" key={i}>
                  <span className="who">{l.speaker}:</span>
                  <span><span className="so">{l.so}</span><br /><span className="en" lang="en">{l.en}</span></span>
                </div>
              ))}
              <SchoolAudioButton audioId={`dialogue:${d.id}`} label="Dhagayso wadahadalka oo dhan" />
            </div>
          ))}
          {stepExercises.map(ex => (
            <ExerciseCard key={ex.id} exercise={ex} lesson={lesson} onGrade={onGrade} onVocab={onVocab} onSpeak={onSpeak} />
          ))}
        </section>
      )}

      {step === 'baro' && (
        <section>
          <h2 className="sc-h2">2 · Baro</h2>
          {lesson.vocab.length > 0 && (
            <div className="sc-card">
              <h3 className="sc-h3">Erayada cusub</h3>
              <div className="sc-vocab-grid">
                {lesson.vocab.map(v => (
                  <div key={v.id} className="sc-flashcard" style={{ cursor: 'default' }}>
                    {v.emoji && <span className="sc-flash-emoji">{<img className="emoji" src={`/emoji/${Array.from(v.emoji).filter(c => c.codePointAt(0) !== 0xfe0f).map(c => c.codePointAt(0)!.toString(16)).join('-')}.svg`} alt="" style={{ width: 28, height: 28 }} />}</span>}
                    <strong>{v.so}</strong>
                    <div className="sc-flash-back">{v.en}</div>
                    {v.exampleSo && <div className="sc-note">{v.exampleSo}</div>}
                    <SchoolAudioButton audioId={v.audioId} label="Dhagayso" />
                  </div>
                ))}
              </div>
            </div>
          )}
          {lesson.grammar.map(g => (
            <div className="sc-card" key={g.id}>
              <h3 className="sc-h3">{g.titleSo} <small className="sc-note">({g.titleEn})</small></h3>
              <p>{g.explanationSo}</p>
              <p className="sc-note" lang="en">{g.explanationEn}</p>
              <ul>{g.examples.map((ex, i) => <li key={i}><strong>{ex.so}</strong> — <span className="sc-note" lang="en">{ex.en}</span></li>)}</ul>
              {g.commonErrors && <div className="sc-pending">Khaladaadka caadka ah: {g.commonErrors.map(e => `${e.wrong} → ${e.right} (${e.noteSo})`).join(' · ')}</div>}
              {g.dialectNoteSo && <p className="sc-note">Ogeysiis deegaan: {g.dialectNoteSo}</p>}
            </div>
          ))}
          {stepExercises.map(ex => (
            <ExerciseCard key={ex.id} exercise={ex} lesson={lesson} onGrade={onGrade} onVocab={onVocab} onSpeak={onSpeak} />
          ))}
        </section>
      )}

      {step === 'ku-hadal' && (
        <section>
          <h2 className="sc-h2">3 · Ku hadal</h2>
          <p className="sc-lead">Ku celceli cod ahaan. Boggu ma qiyaasayo saxnaanta dhawaaqa — qiimaynta waxaa sameeya macallin ama dib-u-eegis nafeed.</p>
          {lesson.speaking.map(t => <SpeakingTaskCard key={t.id} task={t} onSpeak={onSpeak} />)}
          {stepExercises.map(ex => (
            <ExerciseCard key={ex.id} exercise={ex} lesson={lesson} onGrade={onGrade} onVocab={onVocab} onSpeak={onSpeak} />
          ))}
        </section>
      )}

      {step === 'akhri' && (
        <section>
          <h2 className="sc-h2">4 · Akhri</h2>
          {lesson.passages.map(p => (
            <div className="sc-card" key={p.id}>
              <h3 className="sc-h3">{p.titleSo} <small className="sc-note">({p.titleEn} · heerka {p.level})</small></h3>
              <p className="sc-note">Ujeeddo: {p.purposeSo}</p>
              <div className="sc-passage">{p.so}</div>
              <div className="sc-glossary">{p.glossary.map(g => <span key={g.word} className="sc-pill">{g.word} — {g.meaning}</span>)}</div>
              <SchoolAudioButton audioId={`passage:${p.id}`} label="Dhagayso qoraalka" />
            </div>
          ))}
        </section>
      )}

      {step === 'faham' && (
        <section>
          <h2 className="sc-h2">5 · Faham</h2>
          <p className="sc-lead">Ka jawaab su’aalaha ku saabsan waxa aad akhriday.</p>
          {stepExercises.map(ex => (
            <ExerciseCard key={ex.id} exercise={ex} lesson={lesson} onGrade={onGrade} onVocab={onVocab} onSpeak={onSpeak} />
          ))}
        </section>
      )}

      {step === 'isticmaal' && (
        <section>
          <h2 className="sc-h2">6 · Isticmaal</h2>
          <p className="sc-lead">Isticmaal waxa aad baratay: dhiso jumlad, qor erayo, oo xalli howlaha.</p>
          {stepExercises.map(ex => (
            <ExerciseCard key={ex.id} exercise={ex} lesson={lesson} onGrade={onGrade} onVocab={onVocab} onSpeak={onSpeak} />
          ))}
        </section>
      )}

      {step === 'dib-u-eeg' && (
        <section>
          <h2 className="sc-h2">7 · Dib u eeg</h2>
          <div className="sc-card">
            <h3 className="sc-h3">Waxa casharkan muhiimka ah</h3>
            <ul>{lesson.reviewSo.map((r, i) => <li key={i}>{r}</li>)}</ul>
          </div>
          {lesson.vocab.length > 0 && (
            <div className="sc-card">
              <h3 className="sc-h3">Celceli erayada</h3>
              <p className="sc-note">Kaararka ka bogo “Baro”, ka dibna halkan ku noqo maalin kasta — dib-u-eegista kala duwan (spaced review) ayaa kaa caawinaysa xusuusta.</p>
            </div>
          )}
          <div className="sc-card">
            <p><strong>Waad dhammaysay tallaabooyinka!</strong> Ku noqo tallaabo kasta oo aad u baahan tahay ku celcelin, ka dibna noqo heerka.</p>
            <div className="sc-audio-row">
              <button className="sc-btn" onClick={onBack}><Check size={16} /> Dib u noqo heerka</button>
              {nextStep && <button className="sc-btn secondary" onClick={() => goto(nextStep)}>Tallaabada xigta <ArrowRight size={15} /></button>}
            </div>
          </div>
        </section>
      )}

      {steps.indexOf(step) < steps.length - 1 && step !== 'dib-u-eeg' && (
        <div className="sc-audio-row" style={{ marginTop: 18 }}>
          <button className="sc-btn" onClick={() => goto(nextStep)}>Tallaabada xigta: {stepLabels[nextStep]} <ArrowRight size={16} /></button>
        </div>
      )}
      <p className="sc-footer-note"><Pencil size={13} /> Wax kasta oo boggu qoro waa dib-u-eegis macallin u baahan (PENDING_REVIEW).</p>
    </div>
  );
}
