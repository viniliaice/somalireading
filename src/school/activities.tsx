/**
 * Reusable learning activities — driven entirely by curriculum Exercise data.
 * Grading is objective and local; speaking tasks collect evidence (self-review,
 * optional recording, educator assessment) and are NEVER auto-graded by
 * speech recognition.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Mic, RotateCcw, Square, Volume2 } from 'lucide-react';
import { playVerifiedAudio, stopAudio } from '../audio';
import { schoolAudioById } from '../curriculum/audio';
import { allLessons, lessonById } from '../curriculum/index';
import { selfChecklistSo, speakingTypeLabelsSo } from '../curriculum/speaking';
import type { Exercise, Lesson, SpeakingTask, VocabularyItem } from '../curriculum/types';

export function emojiPath(symbol: string): string {
  return `/emoji/${Array.from(symbol).filter(c => c.codePointAt(0) !== 0xfe0f).map(c => c.codePointAt(0)!.toString(16)).join('-')}.svg`;
}

export function Emoji({ symbol }: { symbol: string }) {
  return <img className="emoji" src={emojiPath(symbol)} alt="" aria-hidden="true" style={{ width: 26, height: 26, verticalAlign: 'middle' }} />;
}

export type GradeFn = (exerciseId: string, correct: boolean) => void;
export type SpeakFn = (taskId: string, kind: 'self-review' | 'recording' | 'educator', note: string) => void;
export type VocabFn = (vocabId: string, correct: boolean) => void;

/* --------------------------- audio --------------------------- */

export function SchoolAudioButton({ audioId, label = 'Dhagayso' }: { audioId?: string; label?: string }) {
  const [message, setMessage] = useState('');
  const [playing, setPlaying] = useState(false);
  if (!audioId) return null;
  const entry = schoolAudioById(audioId);
  return (
    <span className="sc-audio-row">
      <button className="sc-btn secondary small" onClick={() => {
        void playVerifiedAudio(entry).then(r => {
          if (r === 'played') { setPlaying(true); setMessage(''); }
          else {
            setPlaying(false);
            setMessage(r === 'playback-error' ? 'Codka ma shaqayn. Mar kale isku day.' : 'Cod la ansixiyey weli lama hayo — duubis iyo dib-u-eegis macallin ayaa la sugayaa.');
          }
        });
      }}><Volume2 size={16} /> {label}</button>
      {playing && <button className="sc-btn ghost small" onClick={() => { stopAudio(); setPlaying(false); }}>Jooji</button>}
      {message && <span className="sc-audio-msg" role="status">{message}</span>}
    </span>
  );
}

/* --------------------------- recorder --------------------------- */

export function useVoiceRecorder() {
  const [supported, setSupported] = useState(false);
  const [recording, setRecording] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<BlobPart[]>([]);
  useEffect(() => {
    setSupported(typeof window !== 'undefined' && typeof window.MediaRecorder === 'function' && Boolean(navigator.mediaDevices?.getUserMedia));
  }, []);
  const start = useCallback(() => {
    if (!supported) return;
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      chunks.current = [];
      const rec = new MediaRecorder(stream);
      rec.ondataavailable = e => chunks.current.push(e.data);
      rec.onstop = () => {
        setUrl(URL.createObjectURL(new Blob(chunks.current)));
        stream.getTracks().forEach(t => t.stop());
        setRecording(false);
      };
      rec.start();
      recorder.current = rec;
      setRecording(true);
    }).catch(() => setRecording(false));
  }, [supported]);
  const stop = useCallback(() => { recorder.current?.stop(); }, []);
  return { supported, recording, url, start, stop };
}

export function VoiceRecorder({ onRecorded }: { onRecorded?: (url: string) => void }) {
  const { supported, recording, url, start, stop } = useVoiceRecorder();
  useEffect(() => { if (url) onRecorded?.(url); }, [url, onRecorded]);
  return (
    <div>
      <div className="sc-audio-row">
        {supported ? (
          recording
            ? <button className="sc-btn secondary small" onClick={stop}><Square size={15} /> Jooji duubista</button>
            : <button className="sc-btn secondary small" onClick={start}><Mic size={15} /> Duub codkaga</button>
        ) : <span className="sc-note">Duubista codku kuma diyaarsana biraawsarkan — isticmaal qalab kale ama isku celceli cod ahaan.</span>}
        {url && <audio controls src={url} style={{ height: 32 }} />}
      </div>
      <p className="sc-note">Duubistu waa kuu gaar ah oo lagu kaydiyaa qalabkan oo keliya. <strong>Boggu ma qiyaasayo saxnaanta dhawaaqa</strong> — qiimaynta waxaa sameeya macallin ama adigu dib-u-eegis ahaan.</p>
    </div>
  );
}

/* --------------------------- flashcards --------------------------- */

export function Flashcards({ exercise, onGrade, onVocab }: { exercise: Exercise; onGrade: GradeFn; onVocab: VocabFn }) {
  const items: VocabularyItem[] = (exercise.vocabIds ?? []).map(id => lessonVocab(id)).filter(Boolean) as VocabularyItem[];
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [remembered, setRemembered] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);
  const item = items[index];
  if (!item) return <p className="sc-note">Erayo lama helin.</p>;
  const mark = (ok: boolean) => {
    const next = { ...remembered, [item.id]: ok };
    setRemembered(next);
    onVocab(item.id, ok);
    setFlipped(false);
    if (index + 1 < items.length) setIndex(index + 1);
    else {
      const good = Object.values(next).filter(Boolean).length;
      onGrade(exercise.id, items.length > 0 && good / items.length >= 0.8);
      setDone(true);
    }
  };
  return (
    <div>
      <p className="sc-note">Kaararka: taabo si aad u aragto macnaha. <strong>{index + 1} / {items.length}</strong></p>
      <button className="sc-flashcard" style={{ width: '100%', maxWidth: 360 }} onClick={() => setFlipped(!flipped)} aria-label={`Kaar ${item.so}`}>
        {item.emoji && <span className="sc-flash-emoji"><Emoji symbol={item.emoji} /></span>}
        <strong>{item.so}</strong>
        {flipped && <div className="sc-flash-back">{item.en}{item.exampleSo && <div style={{ marginTop: 6 }}>{item.exampleSo}</div>}</div>}
      </button>
      {!done ? (
        <div className="sc-audio-row">
          <button className="sc-btn small" onClick={() => mark(true)}>Waan xasuustay</button>
          <button className="sc-btn secondary small" onClick={() => mark(false)}>Ma xusuusan</button>
        </div>
      ) : <p className="sc-feedback ok" role="status">Waad dhammaysay kaararka! ({Object.values(remembered).filter(Boolean).length}/{items.length} xasuus)</p>}
    </div>
  );
}

function lessonVocab(id: string): VocabularyItem | undefined {
  return lessonVocabCache[id];
}

const lessonVocabCache: Record<string, VocabularyItem> = {};
export function registerVocab(items: VocabularyItem[]) {
  for (const v of items) lessonVocabCache[v.id] = v;
}
export function registerLesson(lesson: Lesson) {
  registerVocab(lesson.vocab);
}

/* --------------------------- matching --------------------------- */

export function MatchPairs({ exercise, onGrade }: { exercise: Exercise; onGrade: GradeFn }) {
  const pairs = exercise.pairs ?? [];
  const [chosenLeft, setChosenLeft] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [wrong, setWrong] = useState<string | null>(null);
  const lefts = pairs.map(p => p.left);
  const rights = [...pairs.map(p => p.right)].sort((a, b) => a.localeCompare(b));
  const complete = Object.keys(matches).length === pairs.length;
  const pickRight = (right: string) => {
    if (!chosenLeft || complete) return;
    const pair = pairs.find(p => p.left === chosenLeft);
    if (pair && pair.right === right) {
      const next = { ...matches, [chosenLeft]: right };
      setMatches(next);
      setWrong(null);
      setChosenLeft(null);
      if (Object.keys(next).length === pairs.length) onGrade(exercise.id, true);
    } else {
      setWrong(right);
      onGrade(exercise.id, false);
    }
  };
  return (
    <div>
      <p className="sc-note">{exercise.promptSo ?? 'Dhinaca bidix dooro, ka dibna dhinaca midig u dhigma.'}</p>
      <div className="sc-tile-row">
        {lefts.map(left => (
          <button key={left} className={`sc-chip ${chosenLeft === left ? 'selected' : ''} ${matches[left] ? 'correct' : ''} ${matches[left] ? 'disabled' : ''}`}
            disabled={Boolean(matches[left])} onClick={() => setChosenLeft(left)}>
            {pairs.find(p => p.left === left)?.emoji && <Emoji symbol={pairs.find(p => p.left === left)!.emoji!} />} {left}
          </button>
        ))}
      </div>
      <div className="sc-tile-row">
        {rights.map(right => (
          <button key={right} className={`sc-chip ${Object.values(matches).includes(right) ? 'correct disabled' : ''} ${wrong === right ? 'wrong' : ''}`}
            disabled={Object.values(matches).includes(right)} onClick={() => pickRight(right)}>{right}</button>
        ))}
      </div>
      {complete && <p className="sc-feedback ok" role="status">Waa sax! Dhammaan isku aadisyadu way ku habboonaayeen.</p>}
      {wrong && !complete && <p className="sc-feedback retry" role="status">Isku day mar kale — kuwaas isku ma aha.</p>}
    </div>
  );
}

/* --------------------------- listen & choose --------------------------- */

export function ListenChoose({ exercise, onGrade }: { exercise: Exercise; onGrade: GradeFn }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const correct = selected === exercise.answer;
  return (
    <div>
      <p>{exercise.promptSo}</p>
      <SchoolAudioButton audioId={exercise.audioId} />
      <div className="sc-options">
        {(exercise.options ?? []).map(o => (
          <button key={o} className={`sc-chip ${selected === o ? 'selected' : ''} ${checked && o === exercise.answer ? 'correct' : ''} ${checked && selected === o && o !== exercise.answer ? 'wrong' : ''}`}
            onClick={() => { if (!checked) setSelected(o); }}>{o}</button>
        ))}
      </div>
      {!checked
        ? <button className="sc-btn small" disabled={!selected} onClick={() => { setChecked(true); onGrade(exercise.id, correct); }}>Hubi</button>
        : <div>
            <p className={`sc-feedback ${correct ? 'ok' : 'retry'}`} role="status">{correct ? 'Waa sax!' : `Jawaabta saxda ah waa: ${exercise.answer}`}</p>
            <button className="sc-btn secondary small" onClick={() => { setChecked(false); setSelected(null); }}><RotateCcw size={14} /> Mar kale</button>
          </div>}
    </div>
  );
}

/* --------------------------- order words --------------------------- */

export function OrderWords({ exercise, onGrade }: { exercise: Exercise; onGrade: GradeFn }) {
  const answer = Array.isArray(exercise.answer) ? exercise.answer : [String(exercise.answer ?? '')];
  const tokens = exercise.tokens ?? answer;
  const [placed, setPlaced] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const pool = tokens.filter(t => !placed.includes(t) || placed.filter(x => x === t).length < tokens.filter(x => x === t).length);
  const correct = placed.length === answer.length && placed.every((t, i) => t === answer[i]);
  return (
    <div>
      <p>{exercise.promptSo ?? 'U kala dhig erayada si sax ah.'}</p>
      <div className="sc-sentence-slot">{placed.join(' ') || '…'}</div>
      <div className="sc-tile-row">
        {pool.map((t, i) => (
          <button key={`${t}-${i}`} className="sc-chip" onClick={() => { if (!checked) setPlaced([...placed, t]); }}>{t}</button>
        ))}
      </div>
      <div className="sc-audio-row">
        <button className="sc-btn secondary small" onClick={() => setPlaced([])} disabled={checked}>Tirtir</button>
        {!checked
          ? <button className="sc-btn small" disabled={placed.length !== answer.length} onClick={() => { setChecked(true); onGrade(exercise.id, correct); }}>Hubi</button>
          : <button className="sc-btn secondary small" onClick={() => { setChecked(false); setPlaced([]); }}><RotateCcw size={14} /> Mar kale</button>}
      </div>
      {checked && <p className={`sc-feedback ${correct ? 'ok' : 'retry'}`} role="status">{correct ? 'Waa sax!' : `Jawaabta saxda ah: ${answer.join(' ')}`}</p>}
      {exercise.translationEn && checked && <p className="sc-note" lang="en">{exercise.translationEn}</p>}
    </div>
  );
}

/* --------------------------- fill blank --------------------------- */

export function FillBlank({ exercise, onGrade }: { exercise: Exercise; onGrade: GradeFn }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const correct = selected === exercise.answer;
  const sentence = (exercise.sentenceSo ?? '').replace('___', selected ? `[${selected}]` : '___');
  return (
    <div>
      <p style={{ fontSize: 17 }}>{sentence}</p>
      {exercise.translationEn && <p className="sc-note" lang="en">{exercise.translationEn}</p>}
      <div className="sc-options">
        {(exercise.options ?? []).map(o => (
          <button key={o} className={`sc-chip ${selected === o ? 'selected' : ''} ${checked && o === exercise.answer ? 'correct' : ''} ${checked && selected === o && o !== exercise.answer ? 'wrong' : ''}`}
            onClick={() => { if (!checked) setSelected(o); }}>{o}</button>
        ))}
      </div>
      {!checked
        ? <button className="sc-btn small" disabled={!selected} onClick={() => { setChecked(true); onGrade(exercise.id, correct); }}>Hubi</button>
        : <div>
            <p className={`sc-feedback ${correct ? 'ok' : 'retry'}`} role="status">{correct ? 'Waa sax!' : `Jawaabta saxda ah: ${exercise.answer}`}</p>
            <button className="sc-btn secondary small" onClick={() => { setChecked(false); setSelected(null); }}><RotateCcw size={14} /> Mar kale</button>
          </div>}
    </div>
  );
}

/* --------------------------- spelling --------------------------- */

export function Spelling({ exercise, onGrade }: { exercise: Exercise; onGrade: GradeFn }) {
  const [value, setValue] = useState('');
  const [checked, setChecked] = useState(false);
  const correct = value.trim().toLowerCase() === (exercise.word ?? '').toLowerCase();
  return (
    <div>
      {exercise.emoji && <div className="sc-big-emoji"><Emoji symbol={exercise.emoji} /></div>}
      <p>{exercise.promptSo ?? 'Qor erayga si sax ah.'}</p>
      {exercise.hintSo && <p className="sc-note">Talo: {exercise.hintSo}</p>}
      <input className="sc-input" aria-label="Qoraalka erayga" value={value} onChange={e => setValue(e.target.value)} disabled={checked} placeholder="Halkan ku qor…" />
      <div className="sc-audio-row">
        {!checked
          ? <button className="sc-btn small" disabled={!value.trim()} onClick={() => { setChecked(true); onGrade(exercise.id, correct); }}>Hubi</button>
          : <button className="sc-btn secondary small" onClick={() => { setChecked(false); setValue(''); }}><RotateCcw size={14} /> Mar kale</button>}
      </div>
      {checked && <p className={`sc-feedback ${correct ? 'ok' : 'retry'}`} role="status">{correct ? 'Waa sax! Aad baad u qortay.' : `Qoraalka saxda ah: ${exercise.word}`}</p>}
    </div>
  );
}

/* --------------------------- reading comprehension --------------------------- */

export function ReadAnswer({ exercise, lesson, onGrade }: { exercise: Exercise; lesson: Lesson; onGrade: GradeFn }) {
  const passage = lesson.passages.find(p => p.id === exercise.passageId);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showEn, setShowEn] = useState(false);
  const [finished, setFinished] = useState(false);
  if (!passage) return <p className="sc-note">Qoraal lama helin.</p>;
  const questions = passage.questions;
  const allCorrect = questions.every(q => answers[q.id] === q.answer);
  return (
    <div>
      <h3 className="sc-h3">{passage.titleSo} <small className="sc-note">({passage.titleEn} · heerka akhriska {passage.level})</small></h3>
      <p className="sc-note">Ujeeddo: {passage.purposeSo}</p>
      <div className="sc-passage">{passage.so}</div>
      <div className="sc-glossary">
        {passage.glossary.map(g => <span key={g.word} className="sc-pill">{g.word} — {g.meaning}</span>)}
        {passage.en && <button className="sc-btn ghost small" onClick={() => setShowEn(!showEn)}>{showEn ? 'Qari turjumaadda' : 'Muuji turjumaadda (Ingiriisi)'}</button>}
        <SchoolAudioButton audioId={passage.audioId ?? `passage:${passage.id}`} label="Dhagayso qoraalka" />
      </div>
      {showEn && passage.en && <div className="sc-passage" lang="en" style={{ fontSize: 14.5, color: '#5c6f66' }}>{passage.en}</div>}
      {questions.map(q => (
        <div className="sc-question" key={q.id}>
          <p><strong>{q.so}</strong> <small className="sc-note" lang="en">({q.en})</small></p>
          <div className="sc-options">
            {q.options.map(o => (
              <button key={o} className={`sc-chip ${answers[q.id] === o ? 'selected' : ''} ${finished && o === q.answer ? 'correct' : ''} ${finished && answers[q.id] === o && o !== q.answer ? 'wrong' : ''}`}
                disabled={finished} onClick={() => setAnswers({ ...answers, [q.id]: o })}>{o}</button>
            ))}
          </div>
        </div>
      ))}
      {!finished
        ? <button className="sc-btn small" disabled={Object.keys(answers).length < questions.length} onClick={() => { setFinished(true); onGrade(exercise.id, allCorrect); }}>Hubi jawaabaha</button>
        : <div>
            <p className={`sc-feedback ${allCorrect ? 'ok' : 'retry'}`} role="status">{allCorrect ? 'Waa sax dhammaan!' : 'Qaar waa khalad — eeg jawaabaha cagaaran.'}</p>
            <button className="sc-btn secondary small" onClick={() => { setFinished(false); setAnswers({}); }}><RotateCcw size={14} /> Mar kale</button>
          </div>}
    </div>
  );
}

/* --------------------------- roleplay --------------------------- */

export function Roleplay({ exercise, lesson, onSpeak }: { exercise: Exercise; lesson: Lesson; onSpeak: SpeakFn }) {
  const dialogue = lesson.dialogues.find(d => d.id === exercise.dialogueId);
  const [revealed, setRevealed] = useState(1);
  const [done, setDone] = useState(false);
  if (!dialogue) return <p className="sc-note">Wadahadal lama helin.</p>;
  return (
    <div>
      <h3 className="sc-h3">{dialogue.titleSo} <small className="sc-note">({dialogue.titleEn})</small></h3>
      <p className="sc-note">{dialogue.contextSo} · Dooro qof: {dialogue.roles.join(' ama ')}</p>
      {dialogue.lines.slice(0, revealed).map((l, i) => (
        <div className="sc-dialogue-line" key={i}>
          <span className="who">{l.speaker}:</span>
          <span>
            <span className="so">{l.so}</span>
            <br /><span className="en" lang="en">{l.en}</span>
            <SchoolAudioButton audioId={`line:${dialogue.id}:${i}`} label="Dhagayso" />
          </span>
        </div>
      ))}
      <div className="sc-audio-row">
        {revealed < dialogue.lines.length && <button className="sc-btn secondary small" onClick={() => setRevealed(revealed + 1)}>Xadhigga xiga →</button>}
        {!done && revealed >= dialogue.lines.length && (
          <button className="sc-btn small" onClick={() => { onSpeak(exercise.id, 'self-review', 'Wadahadalka ayaan ciyaaray'); setDone(true); }}>
            <Check size={15} /> Waan ciyaaray wadahadalka
          </button>
        )}
        {done && <span className="sc-feedback ok" role="status">Cadeyn hadal ayaa la diiwaangeliyay.</span>}
      </div>
    </div>
  );
}

/* --------------------------- speaking tasks --------------------------- */

export function SpeakingTaskCard({ task, onSpeak }: { task: SpeakingTask; onSpeak: SpeakFn }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [recorded, setRecorded] = useState(false);
  const [saved, setSaved] = useState(false);
  const allChecked = selfChecklistSo.every((_, i) => checked[i]);
  return (
    <div className="sc-card">
      <p className="sc-eyebrow">{speakingTypeLabelsSo[task.type]}</p>
      <p style={{ fontSize: 16 }}>{task.promptSo}</p>
      {task.promptEn && <p className="sc-note" lang="en">{task.promptEn}</p>}
      {task.phraseSo && <p style={{ fontSize: 18 }}><strong>{task.phraseSo}</strong> {task.phraseEn && <small className="sc-note" lang="en">({task.phraseEn})</small>}</p>}
      <SchoolAudioButton audioId={task.audioId ?? (task.phraseSo ? `phrase:${task.id}` : undefined)} />
      {task.emoji && <div className="sc-big-emoji"><Emoji symbol={task.emoji} /></div>}
      {task.hintsSo && task.hintsSo.length > 0 && (
        <ul className="sc-note">{task.hintsSo.map((h, i) => <li key={i}>{h}</li>)}</ul>
      )}
      <p className="sc-note"><strong>Diiwaan-geli dhagaysigaaga (sharraxaadda macallinka):</strong> {task.rubricFocus.join(' · ')}</p>
      <div className="sc-checklist">
        {selfChecklistSo.map((c, i) => (
          <label key={i}><input type="checkbox" checked={Boolean(checked[i])} onChange={e => setChecked({ ...checked, [i]: e.target.checked })} /> {c}</label>
        ))}
      </div>
      <VoiceRecorder onRecorded={() => setRecorded(true)} />
      <button className="sc-btn small" disabled={!allChecked || saved}
        onClick={() => {
          onSpeak(task.id, recorded ? 'recording' : 'self-review', recorded ? 'Cod ayaan duubay, naftaydna waan qiimeeyay' : 'Naftayda ayaan qiimeeyay');
          setSaved(true);
        }}>
        <Check size={15} /> Kaydi cadeynta hadalka
      </button>
      {saved && <p className="sc-feedback ok" role="status">Cadeynta waa la kaydiyay. Qiimaynta ugu dambeysa waxaa sameeya macallin — boggu ma qiyaasayo dhawaaqa.</p>}
    </div>
  );
}

export function DescribePictureExercise({ exercise, onSpeak }: { exercise: Exercise; onSpeak: SpeakFn }) {
  return (
    <div>
      <p>{exercise.promptSo}</p>
      {exercise.emoji && <div className="sc-big-emoji"><Emoji symbol={exercise.emoji} /></div>}
      {exercise.wordBank && <div className="sc-glossary">{exercise.wordBank.map(w => <span key={w} className="sc-pill">{w}</span>)}</div>}
      <SpeakingInline onSpeak={onSpeak} taskId={exercise.id} />
    </div>
  );
}

export function OpenSpeakingExercise({ exercise, onSpeak }: { exercise: Exercise; onSpeak: SpeakFn }) {
  return (
    <div>
      <p>{exercise.promptSo}</p>
      {exercise.promptEn && <p className="sc-note" lang="en">{exercise.promptEn}</p>}
      {exercise.sequence && <ul className="sc-note">{exercise.sequence.map((s, i) => <li key={i}>{s}</li>)}</ul>}
      <SpeakingInline onSpeak={onSpeak} taskId={exercise.id} />
    </div>
  );
}

function SpeakingInline({ onSpeak, taskId }: { onSpeak: SpeakFn; taskId: string }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [saved, setSaved] = useState(false);
  const allChecked = selfChecklistSo.every((_, i) => checked[i]);
  return (
    <div>
      <div className="sc-checklist">
        {selfChecklistSo.map((c, i) => (
          <label key={i}><input type="checkbox" checked={Boolean(checked[i])} onChange={e => setChecked({ ...checked, [i]: e.target.checked })} /> {c}</label>
        ))}
      </div>
      <VoiceRecorder />
      <button className="sc-btn small" disabled={!allChecked || saved} onClick={() => { onSpeak(taskId, 'self-review', 'Naftayda ayaan qiimeeyay'); setSaved(true); }}>
        <Check size={15} /> Kaydi cadeynta
      </button>
      {saved && <p className="sc-feedback ok" role="status">Cadeynta waa la kaydiyay.</p>}
    </div>
  );
}

/* --------------------------- dispatcher --------------------------- */

export function ExerciseCard({ exercise, lesson, onGrade, onVocab, onSpeak }: {
  exercise: Exercise; lesson: Lesson; onGrade: GradeFn; onVocab: VocabFn; onSpeak: SpeakFn;
}) {
  return (
    <section className="sc-card" aria-label={exercise.titleSo}>
      <p className="sc-eyebrow">{exercise.titleSo} · {exercise.skill}</p>
      {exercise.type === 'flashcards' && <Flashcards exercise={exercise} onGrade={onGrade} onVocab={onVocab} />}
      {(exercise.type === 'match-word-picture' || exercise.type === 'match-qa' || exercise.type === 'match-audio-word') && <MatchPairs exercise={exercise} onGrade={onGrade} />}
      {exercise.type === 'listen-choose' && <ListenChoose exercise={exercise} onGrade={onGrade} />}
      {exercise.type === 'order-words' && <OrderWords exercise={exercise} onGrade={onGrade} />}
      {exercise.type === 'fill-blank' && <FillBlank exercise={exercise} onGrade={onGrade} />}
      {exercise.type === 'spelling' && <Spelling exercise={exercise} onGrade={onGrade} />}
      {exercise.type === 'read-answer' && <ReadAnswer exercise={exercise} lesson={lesson} onGrade={onGrade} />}
      {exercise.type === 'roleplay' && <Roleplay exercise={exercise} lesson={lesson} onSpeak={onSpeak} />}
      {exercise.type === 'describe-picture' && <DescribePictureExercise exercise={exercise} onSpeak={onSpeak} />}
      {exercise.type === 'open-speaking' && <OpenSpeakingExercise exercise={exercise} onSpeak={onSpeak} />}
      {exercise.type === 'repeat-record' && (
        <div>
          <p>{exercise.promptSo}</p>
          <p style={{ fontSize: 18 }}><strong>{exercise.phraseSo}</strong></p>
          <SchoolAudioButton audioId={exercise.audioId} />
          <SpeakingInline onSpeak={onSpeak} taskId={exercise.id} />
        </div>
      )}
    </section>
  );
}

/** Give every lesson's vocab to the lookup cache (called at import and at startup). */
export function primeActivityCache(lessons: Lesson[]) {
  lessons.forEach(registerLesson);
}

primeActivityCache(allLessons());

export { lessonById };
