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

## 3–4. Covers and illustrations (60 assets) — **partially generated**

| Assets | Required | Generated | Pending |
| --- | --- | --- | --- |
| Character reference sheet | 1 | 1 | 0 |
| Book covers | 10 | 2 | 8 |
| Page illustrations | 50 | 7 | 43 |
| **Total** | **61** | **10** | **51** |

**Cause:** the platform image-generation tool enforces a hard limit of **10 images per user
turn**. Ten assets were generated in this turn: the reference sheet, all of Book 1
(cover + 5 pages), and Book 2's cover + pages 1–2. The remaining 51 are fully specified in
`teacher-review/books-image-prompts.md` — locked style block, verbatim character descriptions
and every scene prompt — and are generated in batches of 10 on subsequent turns ("continue").
Until each asset exists, the reader shows an honest halftone fallback panel with the page's
alt text ("Sawirka weli ma iman") — never a broken image and never fake art. The unit test
`every referenced cover and page illustration exists on disk` stays **red** until the
collection is complete (see §13).

Generated assets are consistent: the same halftone print style (visible dot shading, ink
outlines, cream paper, royal blue accent), the same character descriptions across pages, and
no lettering inside any image — all Somali text is rendered by the application.

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
| Unit + component | `npm test` | **113 passed / 114** — the single failure is the honest asset-existence test (51 illustrations pending, §13) |
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
- `public/books/book-01-salaan-saaxiib/…`, `book-02-qoyskeyga/…` — 9 generated illustrations.
- `teacher-review/books-character-reference-sheet.jpg`, `teacher-review/books-image-prompts.md`
  — production reference + the 51 pending prompts.
- `tests/books-*.test.*`, `e2e/books.spec.ts` — test suites.
- Screenshots: `screenshots/books-*.png` (4).

## 13. Outstanding defects

1. **51/61 illustrations not yet generated** (platform limit: 10 images per user turn). The
   asset-existence unit test fails until they land; the app degrades gracefully with honest
   fallback panels. Remaining prompts are locked in `teacher-review/books-image-prompts.md`.
2. **Teacher review pending** — all content `PENDING_REVIEW`; release requires a fluent
   Somali teacher pass.
3. **Audio not recorded** — 170 manifest entries `NOT_RECORDED`; listening features stay
   disabled until approved recordings exist.
4. Speaking/output activities are self-recorded and teacher-evaluated only — no automatic
   grading claims (by design).

## 14. Honesty statement

No teacher approval, recording or dialect review is claimed for any book content or audio.
No text-to-speech or English voice is used anywhere in the library. No production deployment
has been made.
