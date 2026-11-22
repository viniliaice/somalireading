/**
 * Stage view — modules, lessons, stage assessment and certificate state.
 */
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Award, Check, RotateCcw, Sparkles } from 'lucide-react';
import { stageTotals } from '../curriculum/index';
import { applyAssessment, scoreStageAssessment, summariseStageAssessment, type AssessmentAnswer } from '../curriculum/assessment';
import {
  awardCertificate, certificateEligibility, lessonMastery, stageProgress,
  SCHOOL_MASTERY_THRESHOLD, type SchoolProgress,
} from '../curriculum/progress';
import type { Lesson, Stage } from '../curriculum/types';

export function StageView({ stage, progress, onBack, onOpenLesson, onProgress }: {
  stage: Stage;
  progress: SchoolProgress;
  onBack: () => void;
  onOpenLesson: (lesson: Lesson) => void;
  onProgress: (p: SchoolProgress) => void;
}) {
  const totals = stageTotals(stage);
  const report = stageProgress(progress, stage.id);
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const pct = totals.lessons ? Math.round((report.lessonsMastered / totals.lessons) * 100) : 0;
  return (
    <div>
      <button className="sc-back" onClick={onBack}><ArrowLeft size={16} /> Dib u noqo heerarka</button>
      <p className="sc-eyebrow">HEERKA {stage.index} · {stage.levelSo}</p>
      <h1 className="sc-h1">{stage.emoji} {stage.titleSo}</h1>
      <p className="sc-lead">{stage.descriptionSo}</p>
      <p className="sc-note" lang="en">{stage.descriptionEn}</p>
      <div className="sc-card">
        <div className="sc-progress-track"><div style={{ width: `${pct}%` }} /></div>
        <p className="sc-note" style={{ marginTop: 8 }}>{report.lessonsMastered}/{totals.lessons} cashar la dhammeeyay · {totals.modules} module · {totals.vocabulary} eray · {totals.passages} qoraal · {totals.speaking} howl hadal</p>
      </div>
      <div className="sc-card">
        <p className="sc-eyebrow">UJEEDDOOYINKA HEERKA</p>
        <ul>{stage.objectivesSo.map((o, i) => <li key={i}>{o}</li>)}</ul>
      </div>

      {stage.modules.map(m => (
        <section key={m.id}>
          <h2 className="sc-h2">{m.titleSo} <small className="sc-note">({m.titleEn})</small></h2>
          <p className="sc-note">{m.descriptionSo}</p>
          <div className="sc-grid-wide">
            {m.lessons.map(l => {
              const mastery = lessonMastery(progress, l);
              return (
                <button key={l.id} className="sc-stage-card" onClick={() => onOpenLesson(l)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                    <strong>{l.titleSo}</strong>
                    {mastery.state === 'mastered' && <span className="sc-pill green"><Check size={13} /> dhammeystiran</span>}
                    {mastery.state === 'in-progress' && <span className="sc-pill">socda</span>}
                    {mastery.state === 'legacy' && <span className="sc-pill blue">casharka xarfaha</span>}
                  </div>
                  <span className="sc-note">{l.titleEn} · {l.minutes} daqiiqo · {l.skills.join(', ')}</span>
                  <span className="sc-note">{l.vocab.length} eray · {l.exercises.length} howl {l.speaking.length ? `· ${l.speaking.length} howl hadal` : ''}</span>
                  <span className="sc-back" style={{ pointerEvents: 'none' }}>Fur casharka <ArrowRight size={14} /></span>
                </button>
              );
            })}
          </div>
        </section>
      ))}

      <section>
        <h2 className="sc-h2">Tijaabada heerka</h2>
        {!assessmentOpen ? (
          <div className="sc-card">
            <p>{stage.assessment.titleSo} ({stage.assessment.items.length} su’aalood) · ujeeddadu waa in la qiimeeyo akhriska iyo qorista gaar ahaan.</p>
            <p className="sc-note">Hadal: {stage.assessment.speakingBriefSo}</p>
            <button className="sc-btn" onClick={() => setAssessmentOpen(true)}>Bilow tijaabada <Sparkles size={16} /></button>
            {progress.stageAssessments[stage.id] && (
              <p className="sc-note">Natiijadii hore: {progress.stageAssessments[stage.id].score}/{progress.stageAssessments[stage.id].total} ({new Date(progress.stageAssessments[stage.id].completedAt).toLocaleDateString()})</p>
            )}
          </div>
        ) : (
          <AssessmentRunner stage={stage} progress={progress} onProgress={onProgress} onClose={() => setAssessmentOpen(false)} />
        )}
      </section>

      <section>
        <h2 className="sc-h2">Shahaadada heerka</h2>
        <CertificateBlock stage={stage} progress={progress} onProgress={onProgress} />
      </section>
    </div>
  );
}

function AssessmentRunner({ stage, progress, onProgress, onClose }: {
  stage: Stage; progress: SchoolProgress; onProgress: (p: SchoolProgress) => void; onClose: () => void;
}) {
  const items = stage.assessment.items;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const item = items[index];
  const record = finished ? scoreStageAssessment(stage, answers, false) : null;
  const summary = record ? summariseStageAssessment(record) : null;
  const submit = () => {
    const next = [...answers, { itemId: item.id, correct: selected === item.answer }];
    setAnswers(next);
    setSelected(null);
    if (index + 1 < items.length) setIndex(index + 1);
    else {
      const rec = scoreStageAssessment(stage, next, false);
      let p = applyAssessment(progress, stage, rec);
      p = awardCertificate(p, stage);
      onProgress(p);
      setFinished(true);
    }
  };
  if (finished && record && summary) {
    return (
      <div className="sc-card">
        <h3 className="sc-h3">Natiijada: {record.score} / {record.total}</h3>
        <p className={`sc-feedback ${summary.passed ? 'ok' : 'retry'}`} role="status">{summary.reasonSo}</p>
        <table className="sc-table">
          <thead><tr><th>Xirfadda</th><th>Sax</th><th>Wadarta</th><th>Xaalad</th></tr></thead>
          <tbody>
            {(['dhagaysi', 'hadal', 'akhris', 'qoris'] as const).map(skill => {
              const s = summary.perSkill[skill];
              return (
                <tr key={skill}>
                  <td>{skill}</td><td>{s.correct}</td><td>{s.total}</td>
                  <td>{s.passed === null ? 'sugaya caddeyn/cod' : s.passed ? 'la gaadhay' : 'ku celceli'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="sc-note">Ugu yaraan {Math.round(SCHOOL_MASTERY_THRESHOLD * 100)}% ayaa loo baahan yahay xirfad kasta oo la qiimeeyo. Hadalka waa in lagu qiimeeyaa caddeyn hadal ama qiimayn macallin — ma aha su’aalo dooro oo kaliya.</p>
        <div className="sc-audio-row">
          <button className="sc-btn secondary small" onClick={() => { setAnswers([]); setIndex(0); setFinished(false); }}><RotateCcw size={14} /> Mar kale isku day</button>
          <button className="sc-btn small" onClick={onClose}>Dhammaystir</button>
        </div>
      </div>
    );
  }
  return (
    <div className="sc-card">
      <p className="sc-eyebrow">SU’ASHA {index + 1} / {items.length} · {item.areaSo}</p>
      <p style={{ fontSize: 17 }}>{item.promptSo}</p>
      <div className="sc-options">
        {item.options.map(o => (
          <button key={o} className={`sc-chip ${selected === o ? 'selected' : ''}`} onClick={() => setSelected(o)}>{o}</button>
        ))}
      </div>
      <button className="sc-btn" disabled={!selected} onClick={submit}>
        {index + 1 < items.length ? 'Su’aasha xigta' : 'Dhammaystir'} <ArrowRight size={16} />
      </button>
    </div>
  );
}

function CertificateBlock({ stage, progress, onProgress }: {
  stage: Stage; progress: SchoolProgress; onProgress: (p: SchoolProgress) => void;
}) {
  const eligibility = certificateEligibility(progress, stage);
  const cert = progress.certificates[stage.id];
  if (cert) {
    return (
      <div className="sc-certificate">
        <Award size={40} color="#c9a25c" />
        <h2>Shahaadada Heerka {stage.index} — {stage.titleSo}</h2>
        <p>Waxaa la guddoonsiiyay <strong>Baro Af-Soomaali</strong> arday aad u dadaashay, taas oo dhammeysay dhammaan casharrada heerkan oo gaadhay {Math.round(SCHOOL_MASTERY_THRESHOLD * 100)}% tijaabada ({cert.assessmentScore}/{cert.assessmentTotal}).</p>
        <p className="sc-note">Taariikhda: {new Date(cert.awardedAt).toLocaleDateString()}{cert.pendingSkills.length ? ` · Xirfadaha sugaya qiimayn caddeyn: ${cert.pendingSkills.join(', ')}` : ''}</p>
      </div>
    );
  }
  return (
    <div className="sc-card">
      <p>{eligibility.reasonSo}</p>
      <p className="sc-note">Shahaadada waxaa la bixiyaa marka dhammaan casharrada la dhammeeyo oo tijaabada la gaadhiiyo heerka ugu yaraan {Math.round(SCHOOL_MASTERY_THRESHOLD * 100)}% xirfad kasta oo la qiimeeyo.</p>
      {eligibility.eligible && <button className="sc-btn" onClick={() => onProgress(awardCertificate(progress, stage))}><Award size={16} /> Qaado shahaadada</button>}
    </div>
  );
}
