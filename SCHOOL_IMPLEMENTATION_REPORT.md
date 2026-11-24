# Baro Af-Soomaali — Dugsiga: Implementation Report (Stages 0–6)

**Date:** 22 November 2026
**Scope:** Complete Somali language school — “Baro Af-Soomaali — Dhagaysi, Hadal, Akhris iyo Qoris”
**Branch:** `arena/024cb052-somalireading` (from `376706a`)
**Previous report:** `IMPLEMENTATION_REPORT.md` (Stage 1 prototype) remains the record for the preserved phonics experience.

## Executive summary

The site is now a complete Somali language school. A seven-stage curriculum (Stages 0–6) in `src/curriculum/` serves three learner paths from one content base, with listening, speaking, reading and writing tracked as four separate skills. The preserved Stage 1 phonics experience (8 lessons), the Hadraawi cultural module, the audio approval workflow and `baro-progress-v2` progress are unchanged and reachable at `#/xaraf`.

**Honest status:** the school is implemented and tested as software, but **not released as approved educational material**. All 54 modules are `PENDING_REVIEW`, all 545 school audio entries are `NOT_RECORDED`, and no fluent-speaker or teacher review has been supplied or invented. Listening stays disabled until real recordings are approved; speaking is never graded by browser speech recognition.

## What is implemented

### Curriculum (content separate from presentation)
- `src/curriculum/types.ts` — schema: CoreSkill (dhagaysi/hadal/akhris/qoris), 15 exercise types, exactly 5 speaking task types (listen-repeat, listen-respond, guided-conversation, picture-description, open-speaking), Reading Levels 1–7, review statuses.
- `stage-0.ts` … `stage-6.ts` — 54 modules, 72 lessons (64 school + 8 legacy phonics records), 371 vocabulary items, 39 reading passages (Levels 1–7), 24 dialogues, 47 speaking tasks, 202 exercises across ~16 reusable activity types. Every lesson has objectives, vocabulary, exercises and a Dib u eeg recap; no lesson is an empty placeholder.
- Stage 0 (Maqal iyo Hadal, 8 modules/12 lessons) leads with listening and speaking before print. Stage 1 preserves the existing 8 phonics lessons verbatim (Shaqallada … Tijaabada heerka 1) and teaches consonant doubling alongside digraphs (dh, kh, sh) and long vowels, with verified Somali examples only.
- Stage 6 covers suugaan and af-ingaad with proverbs (regional-variation note), ariif and maanso forms, gabay/geeraar/buraambur/jaabwo classification, and a Hadraawi profile linked to the preserved Hadraawi module (born 1943 Togdheer; passed away 18 August 2022 Hargeisa; Prince Claus Laureate 2012). **No copyrighted modern poetry is reproduced** — analysis uses clearly labelled original teaching examples, and interpretation guidance tells learners to state readings “as your reading, not fact”. Sayid and Gaarriye profiles were dropped from the stage scope rather than shipping thin content.

### Learning design
- Seven-step lesson cycle in `src/school/LessonView.tsx`: Dhegayso → Baro → Ku hadal → Akhri → Faham → Isticmaal → Dib u eeg (steps auto-omit when empty).
- Four skills scored separately; speaking + reading prioritised. Five speaking activities with optional recording (`VoiceRecorder`), a 6-dimension educator rubric and self-checklists. **The recorder never grades** — evidence is `self-review | recording | educator` only, and UI copy says so.
- Mastery: configurable threshold (default `SCHOOL_MASTERY_THRESHOLD = 80%`) over distinct objective exercises (≥3 distinct attempts and all objectives attempted), plus spoken evidence where the lesson has speaking tasks. States: not-started / in-progress / mastered / awaiting-audio / legacy.
- Spaced review at [1, 3, 7, 16, 35] days (`dueVocabulary`), review queue in the dashboard.
- Stage assessments score each skill: akhris/qoris need 80%; dhagaysi/hadal are reported as `pendingSkills` and never auto-passed. Certificates require all lessons mastered + the assessment (`certificateEligibility`, `awardCertificate`).
- Progress: `baro-school-v1` localStorage, separate from `baro-progress-v2`; downloadable plain-text parent/teacher report `warbixinta-horumarka.txt` with the no-speech-recognition note.

### Pathways
- Three paths in `src/curriculum/pathways.ts`: A absolute beginner (starts at Stage 0), B home-speaker-learns-to-read (10-item reading diagnostic with `scoreDiagnostic` recommending a stage), C improving learner (starts at Stage 3 with review). All share the one curriculum.

### Audio and content review
- `src/curriculum/audio.ts` — 545-entry school manifest (words, dialogue lines, passages, phrases) reusing the Stage 1 approval workflow: `NOT_RECORDED → RECORDED → AWAITING_REVIEW → APPROVED` with speaker, dialect, licence, consent and review-evidence fields. Playback is blocked until `isApproved` passes; the UI then shows “Cod la ansixiyey weli lama hayo…” — no TTS, no English substitute audio, ever.
- `src/curriculum/review.ts` + `npm run review:school` → `teacher-review/school-curriculum-review.csv` (1,153 rows) and `teacher-review/school-audio-recording-script.csv` (545 rows), every row `PENDING_REVIEW`/`NOT_RECORDED` for teacher correction and sign-off.

### UI
- `src/school/` — shell + hash router (`''`, `#/paths`, `#/diagnostic`, `#/stage/<id>`, `#/lesson/<id>`, `#/dashboard`), activity engine (`activities.tsx`), stage page with assessment runner and certificates, dashboard with 4-skill cards. Responsive to 320px (verified in browser tests).
- Legacy routes preserved: `#/xaraf`, `#/xaraf?unit=N`, `#/xaraf?view=culture|story` (phonics, Hadraawi, assessments, interactive scenes untouched).

## Verification (real results, 22 November 2026)

| Check | Command | Result |
| --- | --- | --- |
| TypeScript | `npx tsc -b` | clean (0 errors) |
| Lint | `npm run lint` | clean (0 problems) |
| Unit/component tests | `npm test` | **85 passed / 10 files** (40 preserved Stage 1 + 45 new school tests) |
| Browser tests | `npm run test:e2e` | **38 passed** (17 app + 12 Hadraawi + 9 school) |
| Production build | `npm run build` | success (chunk-size warning only) |
| Review exports | `npm run review:school` | 1,153 review rows + 545 audio rows generated |

The e2e suite runs headless Chromium via `@sparticuz/chromium` with `LD_LIBRARY_PATH` pointing at the extracted `al2023` libraries (`libnspr4`, `libnss3`) — this sandbox lacks those system libraries.

## Known limitations (not implemented / not approved)

1. **No audio exists.** 545 entries await recording by native speakers with dialect, licence and consent documentation. Listening activities are implemented but disabled.
2. **No teacher review yet.** All content is `PENDING_REVIEW`; glottal-stop/orthography edge cases stay deferred to teacher-reviewed guidance. No approval is claimed anywhere.
3. **Speaking assessment is rubric-only.** No pronunciation score is derived from the browser; educators must review recordings.
4. **Regional variation** is documented as legitimate (e.g. Stage 6 proverbs), and standard Somali with Somaliland pronunciation is the initial reference — but a teacher must confirm all phonetic details.
5. **Stage 6 modern poetry** (Hadraawi included) is not reproduced for copyright reasons; only facts, links to the existing module, and original teaching examples are used.
6. **No production deployment** has been made — per instruction, deployment awaits explicit permission.
7. Child usability validation has not been performed.

## Test inventory

- `tests/upgrade.test.ts`, `tests/curriculum.test.ts`, `tests/audio.test.ts`, `tests/progress.test.ts`, `tests/listening.test.ts`, `tests/review.test.ts`, `tests/components.test.tsx` — preserved Stage 1 (40 tests, all still green).
- `tests/school-curriculum.test.ts` — 21 integrity tests (structure, unique ids, refs, MC answers, skill coverage, legacy mapping, audio manifest, pathways, review registry).
- `tests/school-progress.test.ts` — 16 tests (mastery rules, threshold config, spaced review, assessment scoring, certificates, skill summaries, report text, persistence safety).
- `tests/school-components.test.tsx` — 8 tests (objective grading in MatchPairs/OrderWords/FillBlank/Spelling/Flashcards, honest unapproved-audio message, lesson cycle, assessment runner, dashboard).
- `e2e/school.spec.ts` — 9 browser tests (mission/states, lesson cycle grading, blocked audio, diagnostic, stage assessment, dashboard download, progress isolation from `baro-progress-v2`, responsive layout at 320–1440px, phonics preservation).
