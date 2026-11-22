/**
 * Learner pathways — three starting profiles sharing one curriculum.
 * Path A: from zero. Path B: Somali speaker learning to read. Path C: improving.
 * The diagnostic recommends a starting stage; it never restricts progression.
 */
import { stages } from './index';

export type PathId = 'A' | 'B' | 'C';

export type Pathway = {
  id: PathId;
  titleSo: string;
  titleEn: string;
  descriptionSo: string;
  descriptionEn: string;
  startStage: string;
  /** Stage ids the path emphasises (the shared curriculum is never duplicated). */
  focusStages: string[];
};

export const pathways: Pathway[] = [
  {
    id: 'A', titleSo: 'Wax ka bilaabay eber', titleEn: 'Starting from zero',
    descriptionSo: 'Ma fahmi karto Af-Soomaali weli. Ka bilow Heerka 0 oo soco dhammaan toddobada heer.',
    descriptionEn: 'You do not understand Somali yet. Start at Stage 0 and move through all seven stages.',
    startStage: 'stage-0', focusStages: ['stage-0', 'stage-1', 'stage-2', 'stage-3'],
  },
  {
    id: 'B', titleSo: 'Ku hadla Af-Soomaali, akhriska baranaya', titleEn: 'Somali speaker learning to read',
    descriptionSo: 'Af-Soomaali ayaad ku hadashaa guriga, laakiin akhriska iyo qoraalku waa ku adag yihiin. Bilow tijaabada akhriska oo diiradda saar Heerka 1 iyo Heerka 2.',
    descriptionEn: 'You speak Somali at home but reading and writing are hard. Take the reading diagnostic and focus on Stages 1 and 2.',
    startStage: 'stage-1', focusStages: ['stage-1', 'stage-2', 'stage-4'],
  },
  {
    id: 'C', titleSo: 'Horumarinaya Af-Soomaali', titleEn: 'Improving Somali',
    descriptionSo: 'Waxaad akhrisaa oo ku hadashaa Af-Soomaali qaar. Tijaabadu waxay muujin doontaa meelaha aad u baahan tahay.',
    descriptionEn: 'You already read and speak some Somali. The assessment will show where you need work.',
    startStage: 'stage-2', focusStages: ['stage-2', 'stage-3', 'stage-4', 'stage-5', 'stage-6'],
  },
];

export const pathById = (id: PathId) => pathways.find(p => p.id === id);

/* ------------------------------------------------------------------ */
/* Diagnostic — reading and language knowledge, auto-graded.           */
/* ------------------------------------------------------------------ */

export type DiagnosticItem = {
  id: string;
  promptSo: string;
  options: string[];
  answer: string;
  /** Highest stage this item checks; answering correctly clears stages up to it. */
  clearsStage: string;
  areaSo: string;
};

export const diagnosticItems: DiagnosticItem[] = [
  { id: 'd1', promptSo: 'Xarafkee ayaa ah shaqal?', options: ['b', 'a', 'sh'], answer: 'a', clearsStage: 'stage-1', areaSo: 'Xarfaha' },
  { id: 'd2', promptSo: '“Kani waa buug” micnihiisu waa…', options: ['This is a book', 'This is a house', 'I read'], answer: 'This is a book', clearsStage: 'stage-2', areaSo: 'Weedhaha' },
  { id: 'd3', promptSo: '“Hooyo” micnihiisu waa…', options: ['mother', 'father', 'friend'], answer: 'mother', clearsStage: 'stage-0', areaSo: 'Erayada fudud' },
  { id: 'd4', promptSo: 'U kala dhig: [waa / Tani / guri]', options: ['Tani waa guri', 'Guri waa Tani', 'Waa guri Tani'], answer: 'Tani waa guri', clearsStage: 'stage-2', areaSo: 'Weedhaha' },
  { id: 'd5', promptSo: '“Waxaan rabaa biyo” waxay ka dhigan tahay…', options: ['I want water', 'I have water', 'I drink water'], answer: 'I want water', clearsStage: 'stage-3', areaSo: 'Wadahadalka' },
  { id: 'd6', promptSo: 'Magaca “bisad” waa lab ama dheddig?', options: ['lab', 'dheddig', 'laba iyo dheddig'], answer: 'dheddig', clearsStage: 'stage-4', areaSo: 'Naxwaha' },
  { id: 'd7', promptSo: 'Lahaanshaha “my book” waa…', options: ['buuggayga', 'buuggiisa', 'buugaaga'], answer: 'buuggayga', clearsStage: 'stage-4', areaSo: 'Naxwaha' },
  { id: 'd8', promptSo: '“Marka hore, ka dib, ugu dambeyntii” waxay muujinayaan…', options: ['tartiib', 'meel', 'tiro'], answer: 'tartiib', clearsStage: 'stage-5', areaSo: 'Sheekada' },
  { id: 'd9', promptSo: '“Gabay” waa…', options: ['tix suugaaneed', 'cunto', 'gaadiid'], answer: 'tix suugaaneed', clearsStage: 'stage-6', areaSo: 'Suugaanta' },
  { id: 'd10', promptSo: 'Su’aasha “Immisa?” waxaa lagu weydiistaa…', options: ['tiro', 'magac', 'meel'], answer: 'tiro', clearsStage: 'stage-0', areaSo: 'Su’aalaha' },
];

export type DiagnosticResult = {
  score: number;
  total: number;
  recommendedStage: string;
  reasonSo: string;
};

/** Recommend a stage from diagnostic answers (correct ids). */
export function scoreDiagnostic(correctIds: string[]): DiagnosticResult {
  const correct = diagnosticItems.filter(i => correctIds.includes(i.id));
  const score = correct.length;
  // The recommended stage is the one AFTER the highest stage fully cleared.
  const order = ['stage-0', 'stage-1', 'stage-2', 'stage-3', 'stage-4', 'stage-5', 'stage-6'];
  let recommendedStage = 'stage-0';
  for (const id of order) {
    const items = diagnosticItems.filter(i => i.clearsStage === id);
    const done = items.length > 0 && items.every(i => correctIds.includes(i.id));
    if (!done) break;
    const idx = order.indexOf(id);
    recommendedStage = order[Math.min(idx + 1, order.length - 1)];
  }
  const st = stages.find(x => x.id === recommendedStage);
  return {
    score,
    total: diagnosticItems.length,
    recommendedStage,
    reasonSo: `Waxaad saxday ${score} / ${diagnosticItems.length}. Waxaan kugula talinaynaa inaad ka bilowdo: ${st?.titleSo ?? recommendedStage}.`,
  };
}
