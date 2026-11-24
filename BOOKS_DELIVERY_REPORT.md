# Maktabadda Buugaagta — Delivery Report

**Date:** 24 November 2026
**Scope:** Library of 10 halftone Somali reading books inside the SomaliReading school site
**Branch:** `arena/024cb052-somalireading`

## 1. The ten book titles

| # | Title (so) | Title (en) | Level | Theme |
| --- | --- | --- | --- | --- |
| 1 | Salaan, saaxiib! | Hello, friend! | 1 · absolute beginner | Greetings and introductions |
| 2 | Qoyskeyga | My family | 2 · beginner | Family |
| 3 | Gurigayga | My home | 3 · beginner | The home |
| 4 | Dugsigayga | My school | 4 · beginner→developing | School |
| 5 | Suuqa | The market | 5 · developing beginner | Market, numbers, prices |
| 6 | Xayawaanka | The animals | 6 · developing reader | Animals, description |
| 7 | Maalin roobaad | A rainy day | 7 · developing reader | Weather, sequencing |
| 8 | Socodka magaalada | A walk through town | 8 · intermediate beginner | Town, directions |
| 9 | Maalin aan la illaabi karin | A day to remember | 9 · intermediate | Narrative, past tense |
| 10 | Nabad iyo wadajir | Peace and togetherness | 10 · early intermediate | Peace, community values |

## 2. The 50 completed story pages

All 50 pages are fully written in natural Somali, each with 3–7 sentences (Book 1 uses 2–4
very short sentences; Book 10 uses connected paragraphs of 40+ words), page number, optional
English translation (hidden by default), vocabulary references, alt text and a narration
reference. Every page advances its story — no repeats, no placeholders, no padding. Content
lives in `src/books/content/book-01.ts` … `book-10.ts` (text never hard-coded in components).
The required brief vocabulary appears in every book (enforced by `tests/books-content.test.ts`).

## 3–4. Covers and illustrations (60 assets) — **complete: 61/61 generated**

| Assets | Required | Generated |
| --- | --- | --- |
| Character reference sheet | 1 | 1 |
| Book covers | 10 | 10 |
| Page illustrations | 50 | 50 |
| **Total** | **61** | **61** |

All 61 assets generated over 8 batches (the platform image tool caps at 10 images per user
turn; the full prompt history is preserved in `teacher-review/books-image-prompts.md`).
Assets are consistent: the same halftone print style (visible dot shading, ink outlines,
cream paper, royal blue accent), the same character designs across pages — **every girl wears
a hijab** (Hodan green, Asma orange, Faaduma cream; women in hijab, elders in indho
shareer/koofiyad) — and no lettering inside any image; all Somali text is rendered by the
application. The unit test `every referenced cover and page illustration exists on disk` is
green.

## 5–6. Screenshots

- `screenshots/books-shelf.png` — the bookshelf (ten covers).
- `screenshots/books-reader-page.png` — a story page with word help.
- `screenshots/books-quiz.png` — the end-of-book assessment.
- `screenshots/books-reader-mobile.png` — mobile reader (390px).

## 7. Reading progression and difficulty

One progressive pathway: Book 1 begins with two-to-four word sentences a brand-new reader can
decode with the phonics lessons; each book adds sentence length, vocabulary and grammar; Book
10 requires following a connected multi-scene story with opinions and values. Enforced by
tests: text volume grows book 1 < 5 < 10; early pages ≤ 4 short sentences; late pages >
30-word paragraphs. Levels 1–10 map onto the school’s reading levels.

**Mastery is comprehension-based:** turning all five pages never masters a book. Required:
all 5 pages read + ≥ 80% on the 9 objective questions (configurable `BOOK_MASTERY_THRESHOLD`)
+ the output activity recorded. Attempts are saved, best score is kept, retries are free.

## 8. Somali teacher-review status

**All content PENDING_REVIEW** — every book, page, word and question. No teacher approval is
claimed anywhere. The stories were written as natural Standard Somali (Somaliland reference)
with attention to word boundaries, vowel length (aa/ee/ii/oo/uu), dh/kh/sh and doubled
consonants, but **no fluent-speaker review has been supplied**; spelling and naturalness
require a teacher pass before release.

## 9. Audio recording status

**NOT_RECORDED (all entries).** `src/books/audio.ts` registers page narrations, per-page
dialogue lines and word pronunciations (170 entries) with speaker/dialect/licence/consent
metadata columns — empty until real recordings exist. Playback is blocked by the same
approval workflow as the rest of the site (`NOT_RECORDED → … → APPROVED` with evidence); the
reader reports “Cod la ansixiyey weli lama hayo…” and **never substitutes TTS**. The reader’s
speed control (0.75×/1×/1.25×) applies only to future approved narration.

## 10. Assessment results

Per-book assessments: 5 vocabulary + 3 comprehension + 1 main-idea questions (objective, three
options) + 1 spoken/writing task (recorded, teacher-graded). Verified end-to-end in browser
tests: a perfect Book-1 run scores 9/9 and records the output task; partial scores below 80%
prompt “Mar kale isku day”; results persist across refreshes. Audio, phonics and school
progress keys are untouched by book progress (`baro-books-v1`).

## 11. Test results (24 Nov 2026)

| Check | Command | Result |
| --- | --- | --- |
| TypeScript | `npx tsc -b` | clean |
| ESLint | `npm run lint` | clean |
| Unit + component | `npm test` | **114 passed / 114** (13 files) |
| Browser | `npm run test:e2e` | **46 passed / 46** (17 app + 8 books + 12 Hadraawi + 9 school) |
| Production build | `npm run build` | success |

New suites: `tests/books-content.test.ts` (12), `tests/books-progress.test.ts` (10),
`tests/books-components.test.tsx` (9), `e2e/books.spec.ts` (8). Existing suites stay green.
A latent infinite-update bug in the school shell (`setProgress(p => saveSchoolProgress(p))`
looping because the save stamps a new `updatedAt`) was found by the new console-error test and
fixed.

## 12. Files created

- `src/books/types.ts`, `index.ts`, `progress.ts`, `audio.ts` — schema, registry, mastery
  (`baro-books-v1`), audio manifest.
- `src/books/content/book-01.ts` … `book-10.ts` — all story text, vocabulary, assessments.
- `src/books/Bookshelf.tsx`, `BookReader.tsx`, `BookQuiz.tsx`, `BookImage.tsx`, `books.css` —
  reader experience (word tap → meaning + grapheme pronunciation reference, sentence
  highlighting, optional translation, large-text mode, bookmark/resume, keyboard ←/→,
  reduced-motion support, mobile-first).
- `public/books/book-01-salaan-saaxiib/…` … `book-10-nabad-iyo-wadajir/…` — all 60
  illustrations (cover + 5 pages per book).
- `teacher-review/books-character-reference-sheet.jpg`, `teacher-review/books-image-prompts.md`
  — production reference + full prompt history.
- `tests/books-*.test.*`, `e2e/books.spec.ts` — test suites.
- Screenshots: `screenshots/books-*.png` (4).

## 13. Outstanding defects

1. **Teacher review pending** — all content `PENDING_REVIEW`; release requires a fluent
   Somali teacher pass before any claim of approval.
2. **Audio not recorded** — 170 manifest entries `NOT_RECORDED`; listening features stay
   disabled until approved recordings exist.
3. Speaking/output activities are self-recorded and teacher-evaluated only — no automatic
   grading claims (by design).
4. The character reference sheet in `teacher-review/` depicts all girls with hijab per user
   instruction (v2, 24 Nov 2026); any earlier depiction without hijab is void.

## 14. Honesty statement

No teacher approval, recording or dialect review is claimed for any book content or audio.
No text-to-speech or English voice is used anywhere in the library. No production deployment
has been made.
