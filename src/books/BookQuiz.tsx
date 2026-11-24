import { useState } from 'react';
import { ArrowLeft, RotateCcw, Check } from 'lucide-react';
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

/** End-of-book assessment — outside the five story pages. */
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
  const objective = objectiveQuestions(book);

  const correctCount = objective.filter(q => answers[q.id] === q.answer).length;
  const pct = Math.round((correctCount / objective.length) * 100);

  const submit = () => {
    const { progress: next } = recordQuizAttempt(progress, book, answers);
    onProgress(next);
    setSubmitted(true);
  };

  const retry = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <main className="bk-quiz">
      <p className="bk-eyebrow">TIJAABADA BUUGGA · {book.titleSo}</p>
      <h2>Sidee buu u ahaa sheekadu?</h2>

      {submitted && (
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
      )}

      {book.questions.map((q, i) => (
        <section key={q.id} className="bk-q-card">
          <span className="bk-kind">{i + 1}. {kindLabel[q.kind]}</span>
          <h3>{q.promptSo}</h3>
          {q.kind === 'output' ? (
            <>
              <p style={{ margin: '0 0 9px', fontSize: 14, color: '#55503f' }}>{q.taskSo}</p>
              <textarea
                className="bk-output-area"
                value={outputText}
                onChange={e => setOutputText(e.target.value)}
                placeholder="Halkan ku qor jawaabtaada…"
                aria-label="Jawaabta qoraalka"
              />
              <div style={{ marginTop: 9, display: 'flex', gap: 9, flexWrap: 'wrap' }}>
                <button
                  className="bk-btn small"
                  onClick={() => onProgress(markOutputDone(progress, book.id, outputText))}
                >
                  <Check size={14} /> Waan sameeyay
                </button>
                {mastery.outputDone && <span style={{ alignSelf: 'center', fontSize: 13, fontWeight: 700, color: '#2f7d4f' }}>Hawshu way diiwaangashan tahay.</span>}
              </div>
            </>
          ) : (
            <div className="bk-options">
              {(q.options ?? []).map(opt => {
                let cls = 'bk-option';
                if (submitted) {
                  if (opt === q.answer) cls += ' correct';
                  else if (answers[q.id] === opt) cls += ' wrong';
                } else if (answers[q.id] === opt) cls += ' chosen';
                return (
                  <button key={opt} className={cls} disabled={submitted} onClick={() => setAnswers({ ...answers, [q.id]: opt })}>
                    {opt}
                  </button>
                );
              })}
            </div>
          )}
        </section>
      ))}

      {!submitted && (
        <button className="bk-btn" style={{ width: '100%' }} onClick={submit} disabled={objective.some(q => !answers[q.id])}>
          Dhammaystir tijaabada ({Object.keys(answers).length}/{objective.length})
        </button>
      )}
      <p style={{ fontSize: 12.5, color: '#6b6257', marginTop: 14 }}>
        Natiijadu waa mid dib loo eegi karo; ma aha in hal mar lagu guulaysto. Qiimaynta hadalka waxaa sameeya macallin.
      </p>
    </main>
  );
}
