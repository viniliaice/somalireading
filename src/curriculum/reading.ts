/**
 * Reading programme — seven continuous reading levels.
 * Every reading passage in the curriculum declares one of these levels.
 */
export type ReadingLevel = {
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  titleSo: string;
  titleEn: string;
  descriptionSo: string;
  skillsSo: string[];
};

export const readingLevels: ReadingLevel[] = [
  { level: 1, titleSo: 'Aqoonsi', titleEn: 'Recognition', descriptionSo: 'Xarfo, unugyo, erayo iyo sawirro.', skillsSo: ['Xarfaha', 'Erayada', 'Sawirrada'] },
  { level: 2, titleSo: 'Furista erayada', titleEn: 'Decoding', descriptionSo: 'Erayo dabiici ah, shaqal gaaban iyo dheer, xaraf laban jibaaran, digraafyada.', skillsSo: ['Isku-darka dhawaaqyada', 'Shaqal gaaban/dheer', 'Xuduudaha erayada'] },
  { level: 3, titleSo: 'Weedhaha', titleEn: 'Sentences', descriptionSo: 'Weedho gaagaaban, macnaha, calaamadaha jumladaha, su’aalo iyo jawaabo.', skillsSo: ['Weedho fudud', 'Su’aalo iyo jawaabo'] },
  { level: 4, titleSo: 'Qoraallada gaagaaban', titleEn: 'Paragraphs', descriptionSo: 'Qoraal kooban, fikradda weyn, faahfaahinta, tartiibka.', skillsSo: ['Fikradda weyn', 'Faahfaahin', 'Tartiib'] },
  { level: 5, titleSo: 'Sheekooyinka', titleEn: 'Stories', descriptionSo: 'Jilayaal, dhacdo, goob, khilaaf iyo xal, dib u sheegid.', skillsSo: ['Jilayaasha', 'Dhacdada', 'Dib u sheegid'] },
  { level: 6, titleSo: 'Fahamka madax-bannaan', titleEn: 'Independent comprehension', descriptionSo: 'Qoraallo dhaadheer, fikrad qarsoon, soo koobid, barbar dhigid.', skillsSo: ['Fikrad qarsoon', 'Soo koobid', 'Barbar dhigid'] },
  { level: 7, titleSo: 'Suugaanta', titleEn: 'Literature', descriptionSo: 'Maanso, tiraab, sheeko dhaqameed, taariikh-nololeed, maqaallo.', skillsSo: ['Maanso', 'Tiraab', 'Daraasad'] },
];

export const readingLevelOf = (level: number) => readingLevels.find(r => r.level === level);
