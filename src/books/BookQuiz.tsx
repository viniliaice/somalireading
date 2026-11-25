import { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Check } from 'lucide-react';
import type { StoryBook } from './types';
import type { BookMasteryReport, BooksProgress } from './progress';
import { markOutputDone, recordQuizAttempt } from './progress';
import { objectiveQuestions } from './index';

const kindLabel: Record<string, string> = {
  vocab: 'Eray',
  comprehension: 'Faham',
  'main-idea': 'Fikradda guud',
  output: 'Hawl qoris/hadal',
};

/**
 * End-of-book assessment — outside the five story pages.
 * One question per screen: the learner answers and presses "Xiga". Nothing is
 * stacked, so the assessment never turns into a long scrolling page.
 */
export function BookQuiz({ book, progress, onProgress, mastery, onBackToPages, onOpenBooks }: {
  book: StoryBook;
  progress: BooksProgress;
  onProgress: (p: BooksProgress) => void;
  mastery: BookMasteryReport;
  onBackToPages: () => void;
  onOpenBooks: () => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [outputText, setOutputText] = useState('');
  const [step, setStep] = useState(0);

  const objective = objectiveQuestions(book);
  const questions = book.questions;
  const q = questions[Math.min(step, questions.length - 1)];
  const total = questions.length;
  const isLast = step === total - 1;

  const correctCount = objective.filter(x => answers[x.id] === x.answer).length;
  const pct = Math.round((correctCount / objective.length) * 100);
  const answeredCount = objective.filter(x => answers[x.id]).length;
  const allAnswered = answeredCount === objective.length;

  const submit = () => {
    const { progress: next } = recordQuizAttempt(progress, book, answers);
    onProgress(next);
    setSubmitted(true);
  };

  const retry = () => {
    setAnswers({});
    setSubmitted(false);
    setStep(0);
  };

  return (
    <main className="bk-quiz">
      <div className="bk-quiz-head">
        <p className="bk-eyebrow">TIJAABADA BUUGGA · {book.titleSo}</p>
        <h2>Sidee buu u ahaa sheekadu?</h2>
      </div>

      {submitted ? (
        <div className="bk-result" role="status">
          <h3>Waxaad saxday {correctCount} / {objective.length} ({pct}%)</h3>
          <p>{mastery.reasonSo}</p>
          <p style={{ fontSize: 13.5, color: '#55503f' }}>Ujeeddada: {Math.round(mastery.objectiveTarget * 100)}%. Bogagga: {mastery.pagesRead}/5. Hawl-qoraalka: {mastery.outputDone ? 'la dhammeeyay' : 'weli lama dhammayn'}.</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button className="bk-btn small" onClick={retry}><RotateCcw size={14} /> Mar kale isku day</button>
            <button className="bk-btn small secondary" onClick={onBackToPages}><ArrowLeft size={14} /> Dib u eeg bogagga</button>
            <button className="bk-btn small secondary" onClick={onOpenBooks}>Buugaagta</button>
          </div>
        </div>
      ) : (
        <>
          <div className="bk-quiz-meta">
            <span className="bk-quiz-step">Su’aasha {step + 1} / {total}</span>
            <span className="bk-kind">{kindLabel[q.kind]}</span>
          </div>
          <div className="bk-quiz-track" aria-hidden="true">
            <div style={{ width: `${((step + 1) / total) * 100}%` }} />
          </div>

          <section className="bk-q-card" key={q.id}>
            <h3>{q.promptSo}</h3>
            {q.kind === 'output' ? (
              <>
                <p className="bk-task">{q.taskSo}</p>
                <textarea
                  className="bk-output-area"
                  value={outputText}
                  onChange={e => setOutputText(e.target.value)}
                  placeholder="Halkan ku qor jawaabtaada…"
                  aria-label="Jawaabta qoraalka"
                />
                <div className="bk-output-row">
                  <button
                    className="bk-btn small"
                    onClick={() => onProgress(markOutputDone(progress, book.id, outputText))}
                  >
                    <Check size={14} /> Waan sameeyay
                  </button>
                  {mastery.outputDone && <span className="bk-output-done">Hawshu way diiwaangashan tahay.</span>}
                </div>
              </>
            ) : (
              <div className="bk-options">
                {(q.options ?? []).map(opt => {
                  let cls = 'bk-option';
                  if (answers[q.id] === opt) cls += ' chosen';
                  return (
                    <button key={opt} className={cls} onClick={() => setAnswers({ ...answers, [q.id]: opt })}>
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          <nav className="bk-quiz-nav" aria-label="Su’aalaha">
            <button
              className="bk-btn small secondary"
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              <ArrowLeft size={15} /> Hore
            </button>
            {isLast ? (
              <button className="bk-btn" onClick={submit} disabled={!allAnswered}>
                Dhammaystir tijaabada ({answeredCount}/{objective.length})
              </button>
            ) : (
              <button className="bk-btn" onClick={() => setStep(s => Math.min(total - 1, s + 1))}>
                Xiga <ArrowRight size={15} />
              </button>
            )}
          </nav>
          <p className="bk-quiz-fine">
            Natiijadu waa mid dib loo eegi karo; ma aha in hal mar lagu guulaysto. Qiimaynta hadalka waxaa sameeya macallin.
          </p>
        </>
      )}
    </main>
  );
}
