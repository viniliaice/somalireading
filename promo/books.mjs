import { books } from '../src/books/index.ts';
import fs from 'fs';
fs.writeFileSync('promo/books.json', JSON.stringify(books.map(b => ({
  id: b.id, order: b.order, titleSo: b.titleSo, titleEn: b.titleEn, cover: b.cover,
  levelLabelSo: b.levelLabelSo, descriptionSo: b.descriptionSo,
  pages: b.pages.map(p => ({ n: p.order, image: p.image, text: p.sentencesSo.join(' ') })),
})), null, 1));
console.log('books', books.length);
