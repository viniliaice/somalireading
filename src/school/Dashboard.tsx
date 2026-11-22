/**
 * Learning dashboard — four skills measured separately, stage progress,
 * spaced-review queue, certificates and a downloadable progress report.
 */
import { Download, Sparkles } from 'lucide-react';
import { stages } from '../curriculum/index';
import {
  dueVocabulary, progressReportText, skillSummaryFor, stageProgress, type SchoolProgress,
} from '../curriculum/progress';
import type { CoreSkill } from '../curriculum/types';
import { lessonSkills } from '../curriculum/index';
import { skillLabelsSo, skillLabelsEn } from '../curriculum/types';

export function Dashboard({ progress, onOpenStage }: {
  progress: SchoolProgress;
  onOpenStage: (stageId: string) => void;
}) {
  const allLessons = stages.flatMap(st => st.modules.flatMap(m => m.lessons));
  const due = dueVocabulary(progress);
  const download = () => {
    const text = progressReportText(progress);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'warbixinta-horumarka.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  };
  return (
    <div>
      <p className="sc-eyebrow">HORUMARKAYGA</p>
      <h1 className="sc-h1">Bogga horumarka</h1>
      <p className="sc-lead">Afar xirfadood si gaar ah ayaa loo qiimeeyaa. Dhibaato xirfadeed qarsoon ma noqon karto dhib weyn oo la qariyay.</p>

      <h2 className="sc-h2">Xirfadaha</h2>
      <div className="sc-skill-grid">
        {(['dhagaysi', 'hadal', 'akhris', 'qoris'] as CoreSkill[]).map(skill => {
          const lessons = allLessons.filter(l => lessonSkills(l).includes(skill));
          const s = skillSummaryFor(progress, lessons, skill);
          return (
            <div className="sc-skill-card" key={skill}>
              <span className="sc-eyebrow">{skillLabelsEn[skill]}</span>
              <strong>{skillLabelsSo[skill]}</strong>
              <p className="sc-note">{s.assessed ? `${s.correct} sax / ${s.attempted} isku day` : 'Weli lama tijaabin'}</p>
              {skill === 'dhagaysi' && <p className="sc-note">Codku wuxuu furmayaa marka duubista iyo dib-u-eegista la ansixiyo.</p>}
              {skill === 'hadal' && <p className="sc-note">Qiimayntu waa caddeyn hadal + qiimayn macallin; ma aha aqoonsi cod-sameeye.</p>}
            </div>
          );
        })}
      </div>

      <h2 className="sc-h2">Heerarka</h2>
      <div className="sc-grid-wide">
        {stages.map(st => {
          const r = stageProgress(progress, st.id);
          const pct = r.lessonsTotal ? Math.round((r.lessonsMastered / r.lessonsTotal) * 100) : 0;
          return (
            <button key={st.id} className="sc-stage-card" onClick={() => onOpenStage(st.id)}>
              <strong>{st.emoji} {st.titleSo}</strong>
              <div className="sc-progress-track"><div style={{ width: `${pct}%` }} /></div>
              <span className="sc-note">{r.lessonsMastered}/{r.lessonsTotal} cashar · {r.speakingEvidence} caddeyn hadal</span>
              {progress.certificates[st.id] && <span className="sc-pill green">Shahaado la helay</span>}
            </button>
          );
        })}
      </div>

      <h2 className="sc-h2">Dib-u-eegista (spaced review)</h2>
      <div className="sc-card">
        {due.length > 0
          ? <p>{due.length} eray ayaa maanta u baahan dib-u-eegis. Noqo casharrada oo ka bogo kaararka “Baro”.</p>
          : <p>Ma jiraan erayo maanta u baahan dib-u-eegis — si fiican ayaad u shaqaysay! 🌟</p>}
        <p className="sc-note">Dib-u-eegista waxay ku socotaa kala duwanaansho: 1, 3, 7, 16, 35 maalmood.</p>
      </div>

      <h2 className="sc-h2">Shahaadooyinka</h2>
      <div className="sc-card">
        {Object.keys(progress.certificates).length > 0
          ? <ul>{Object.values(progress.certificates).map(c => (
              <li key={c.stageId}>{stages.find(s => s.id === c.stageId)?.titleSo} — {new Date(c.awardedAt).toLocaleDateString()} ({c.assessmentScore}/{c.assessmentTotal})</li>
            ))}</ul>
          : <p>Weli shahaado lama helin. Dhammeeyo casharrada oo qaado tijaabada heerka!</p>}
      </div>

      <div className="sc-card">
        <h3 className="sc-h3">Warbixin waalidiin iyo macalliin</h3>
        <p className="sc-note">Warbixin qoran oo muujinaya heerka, casharrada, xirfadaha iyo shahaadooyinka.</p>
        <button className="sc-btn" onClick={download}><Download size={16} /> Soo dejiso warbixinta (.txt)</button>
      </div>
      <p className="sc-footer-note"><Sparkles size={13} /> Horumarkaagu wuxuu ku kaydsan yahay qalabkan oo keliya (baro-school-v1); horumarkii hore ee heerka 1 (baro-progress-v2) waa la ilaaliyay.</p>
    </div>
  );
}
