# Hadraawi cultural module — delivery report

## What is included

- A separate **Dhaqan iyo Suugaan** area, linked from the home page and navigation, containing the Abwaan Hadraawi module. The original eight Stage 1 phonics units and their assessment remain separate.
- Four repeatable Somali lessons: biography, literary forms and selected works, peace and reconciliation, and legacy with original student writing. The English toggle supplies supporting translations for lesson readings and selected vocabulary; it does not translate the entire interface or every activity.
- Biography paragraph navigation, vocabulary and comprehension; an interactive six-event timeline with optional additional details and chronological ordering; name-building tiles using the existing Somali tokenizer; literary-term and eight-value matching; work classification; and locally saved writing.
- A separate randomized ten-question assessment with feedback and retries. Its default 80% threshold is independently configurable via `CULTURAL_MASTERY_THRESHOLD` in `src/progress.ts`. Cultural completion, writing and assessment are stored under a separate `cultural` key within existing progress, without modifying Stage 1 lesson evidence or assessment.
- A generated illustration of a book and pen, not a likeness or portrait of Hadraawi. No copyrighted poetry, quotation, song, portrait or audio is reproduced.
- Reusable cultural progress helpers, sourced content data, timeline and activity components provide a starting point for further figures. The current module screens are Hadraawi-specific; a new figure would require additional routing and content work.

## Sources and unresolved review

All educational content and assessment material is draft and **PENDING_REVIEW**. No native Somali teacher, historian, child-usability reviewer or audio reviewer has approved it. A 60-row source-linked review worksheet is at `teacher-review/hadraawi-review.csv`; the review process and corrections guidance are in `src/modules/README.md`. General interface/instruction wording also requires review.

- [Poetry Translation Centre](https://www.poetrytranslation.org/poet/maxamed-ibraahin-warsame-hadraawi/) — biography, literary context, imprisonment, peace work and Gudgude.
- [African Studies Centre Leiden](https://www.ascleiden.nl/content/library-weekly/hadraawi) — biography, death, imprisonment and peace march.
- [Prince Claus Fund](https://princeclausfund.nl/awardees/maxamed-ibraahim-warsame) — 2012 award and descriptions of selected works.

The sources describe imprisonment beginning in 1973 for five years, but do not independently establish an exact release date. **1978 is an inference**, labelled approximate, and is not tested as an independently verified exact date. The Poetry Translation Centre profile says it was adapted from Prince Claus Fund material, and Leiden also cites the Fund, so these are not all independent corroborations. Sources spell his name and the title Daba/Dabo Huwan differently; the variants are documented rather than presented as resolved. All other dates, classifications, Somali wording and translations remain subject to competent review.

## Tests and checks

- `npm run lint`: passed.
- `npx tsc -b --pretty false`: passed.
- `npm run build`: passed.
- `npm test`: **40 passed, 0 failed**, including nine Hadraawi content, orthography, threshold and progress-isolation tests.
- `npm run test:e2e`: **29 passed, 0 failed**, including 18 existing tests and 11 cultural tests. Covered lesson navigation, reading translation, timeline ordering, all four name builds, vocabulary and works, writing persistence and storage failure, passing and failing assessment attempts, retries, and preservation of Stage 1 data. The new cultural screens produced no observed runtime errors or broken images in the tested flow.
- Desktop and mobile screenshots were captured; tablet, 390px and 320px widths were checked for document-level horizontal overflow across all cultural lessons and assessment. This is not a full accessibility, device, browser or child-usability audit.
- Browser tests required the local NSS/NSPR library path described in the existing Stage 1 report. Existing tests that mock audio do not verify pronunciation or approve actual recordings.

## Known limitations / release gates

- **Educational approval gate is not passed**: qualified Somali language and historical review, authentic approved recordings where required, and child usability testing are still needed. Production listening remains unavailable where recordings have not been approved. Do not deploy based on these engineering checks alone.
- Cultural lesson completion represents the successful completion of one designated activity per lesson (or saving original writing for lesson 4), not full mastery of every activity. The separate assessment supplies the mastery threshold.
- Writing is stored only in the current browser and device, and may be removed by clearing browser data. Storage failures are reported when saving writing; the existing general progress persistence uses the application's pre-existing best-effort save behavior.
- The source-linked worksheet is a review aid, not evidence of approval. Review statuses and source references require maintenance when content changes. Nothing has been deployed.

## Main files

- `src/modules/hadraawi.ts`, `src/modules/CulturalSection.tsx`, `src/modules/cultural.css`, `src/modules/README.md`
- `src/main.tsx`, `src/progress.ts`
- `public/images/hadraawi-literature.png`
- `scripts/generate-hadraawi-review.ts`, `teacher-review/hadraawi-review.csv`, `teacher-review/README.md`
- `tests/hadraawi.test.ts`, `e2e/hadraawi.spec.ts`
- `screenshots/hadraawi-desktop.png`, `screenshots/hadraawi-mobile.png`, `screenshots/hadraawi-lesson-mobile.png`

The initial delivery was prepared in the working tree on `arena/4e98bf83-somalireading`; consult Git and the existing pull request for its current integration status.
