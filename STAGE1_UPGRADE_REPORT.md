# Baro Af-Soomaali — Stage 1 Upgrade Report

**Date:** 22 November 2026  
**Branch:** `arena/4e98bf83-somalireading`  
**Starting commit:** `ab860ea336f2bf89892ed1da62714e6f1d2a0c5f`  
**Implementation handoff HEAD:** `ab860ea336f2bf89892ed1da62714e6f1d2a0c5f` — the upgrade was uncommitted at that handoff. Subsequent pull-request preparation may commit the changes.

## Status and completion gates

The existing prototype was extended rather than rebuilt. Eight Stage 1 units remain available. The audio, listening, progress, assessment, review and discovery-scene architecture has been substantially upgraded, but **this is not an educationally approved release**.

- **Gate A — engineering:** The implemented visual and mocked-audio paths pass the automated checks listed below. It is not fully demonstrated against real Somali recordings or physical low-powered devices, so a complete engineering sign-off would be premature.
- **Gate B — educational content:** **Not passed.** No competent Somali teacher review, approved native recordings or child usability testing was supplied. Listening activities are deliberately unavailable to learners until recordings are approved and served.

No production deployment was made, and the original JollyPhonetic application was not modified.

## Baseline and preservation

The starting working tree contained the earlier prototype as uncommitted work: modified `README.md` and untracked application, assets, tests, configuration, screenshots and implementation report. That work was preserved. The previous report was checked against the source and running application: the 26-unit inventory and visual activities existed, but audio was ungated, completion was self-reported and the Three.js scene contained only a lamp.

Before changes, the existing suite produced **11/11 unit/component tests passing, 11/11 browser tests passing**, with lint and production build passing. Baseline screenshots are in `screenshots/baseline/`. Three existing browser tests were updated to check their original objectives under the new requirements: evidence-based completion instead of self-report, a randomized expanded assessment instead of eight fixed questions, and blocking rather than playing unapproved audio.

## Features completed

### Audio architecture

`src/audio.ts` provides a central manifest with **117 pending entries**: 26 short alphabet sounds, five long-vowel sounds, 52 upper/lower letter-name references, 26 initial words and eight comparison words. Each entry has a unique ID, content ID, Somali text, path, recording/review/pronunciation statuses and metadata fields for speaker, dialect, licence, consent, dates, reviewer and evidence.

Playback requires all three approval statuses and the required metadata. Listening activities also verify that the file is served as audio. Missing, unapproved or failed recordings cannot produce a listening score. Replay and stop controls are provided; no browser text-to-speech or simulated Somali audio is used in the learner experience.

**Recording status: 0 approved; all entries are NOT_RECORDED.** Recording specifications and the approval workflow are in `public/audio/README.md`.

### Listening activities

The following reusable activity types are implemented behind the approval and file-availability gate:

1. Listen and choose a grapheme.
2. Listen and select a picture.
3. Sound hunt among written words.
4. Identify the long vowel in two spoken comparison words.
5. Hear a word and order its grapheme tiles.
6. Listening questions in the final assessment.

All remain unavailable with the current manifest. Tests exercise their scoring and assessment integration using test-only mocks. Skipped or unavailable listening questions are excluded rather than marked incorrect, and results state when listening was not assessed.

### Interactive Somali world

The existing Three.js lamp scene was expanded into three reusable scenes: **Guriga**, **Suuqa** and **Dabeecadda**. Together they offer 11 discoverable items: nal, bisad, caano, kabo, tufaax, moos, qalin, jalaato, faras, libaax and yaxaas. Objects animate and respond to canvas pointer input; accessible buttons offer keyboard access. A discovered word is displayed and split into highlighted grapheme tiles, with approved word audio invoked when available. Scene resources are disposed on exit and rendering is paused when the document is hidden.

### Word building and curriculum

Existing visual matching, tracing and word building remain. The tokenizer keeps **dh, kh, sh** and **aa, ee, ii, oo, uu** together while preserving the written spelling. All 26 initial teaching entries and the existing comparison words remain draft material awaiting review. No new vocabulary is claimed to be teacher-reviewed.

### Teacher review package

- [Printable review document](teacher-review/printable-review.html)
- [Curriculum review CSV](teacher-review/curriculum-review.csv)
- [Audio recording script CSV](teacher-review/audio-recording-script.csv)
- [Review workflow](teacher-review/README.md)

The package contains all 26 units, example words and English meanings, IPA, guidance, word-building units, four vowel-length comparisons, review fields and all 117 recording prompts. `src/review-original.json` preserves the starting draft; `src/review.ts` provides correction, reviewer, date, status and evidence fields. All 30 review records remain **PENDING_REVIEW**. The generator rejects an APPROVED record without the required review fields and evidence.

### Mastery and assessment

Progress now records distinct activities, attempts, correct and incorrect answers, retries and dates in browser-local storage. For units 1–7, every target must be attempted in visual word building/matching (or every length pair in unit 5), and at least **80% of the latest answers for distinct activities** must be correct. The threshold is configurable in `src/progress.ts`. Prior mistakes and retries remain visible in the data. Legacy self-reported completions are preserved separately but are not treated as mastery.

The final assessment selects a configurable default of 12 unique questions from an expanded visual bank, with approved, available listening questions added when possible. It reports the assessed areas, score, practice areas, skipped questions and listening status. Assessment mastery is not awarded until the assessment is submitted. These metrics do not prove pronunciation or educational readiness; the mastery model needs teacher and child-usability validation.

## Tests and verification

| Check | Result |
| --- | --- |
| Unit and component tests | **31 passed, 0 failed** |
| Browser end-to-end tests | **18 passed, 0 failed** |
| TypeScript and production build | Passed |
| ESLint | Passed |
| Production dependency audit | 0 reported vulnerabilities |
| Review package generation | Passed: 26 letter rows, 4 comparison rows, 117 recording rows |

The browser suite covers the eight unit screens, desktop/tablet/mobile viewports, pointer and simulated touch interaction, keyboard discovery controls, visual activities, progress persistence, assessment scoring, missing-audio handling and runtime console errors while navigating unit screens. Audio approval, playback failure, listening scoring and assessment skip handling were tested with mocks. Physical devices, authentic recordings and native-speaker pronunciation were **not** tested.

Screenshots: [Desktop](screenshots/desktop.png) · [Mobile](screenshots/mobile.png) · [Discovery scene](screenshots/discovery.png) · [Baseline desktop](screenshots/baseline/desktop.png) · [Baseline mobile](screenshots/baseline/mobile.png)

## Files changed or added in this upgrade

- Updated `src/main.tsx`, `src/StoryScene.tsx`, `src/style.css`, `README.md`, `public/audio/README.md`, `package.json`, `package-lock.json` and `e2e/app.spec.ts`.
- Added `src/audio.ts`, `src/listening.ts`, `src/ListeningActivity.tsx`, `src/assessment.ts`, `src/Assessment.tsx`, `src/progress.ts`, `src/review.ts`, `src/review-original.json` and `src/world.ts`.
- Added `scripts/generate-review.ts`, the `teacher-review/` package, new audio/progress/listening/assessment component and unit tests, baseline and discovery screenshots, and this report. Existing curriculum and component tests were retained.

The broader prototype files were already uncommitted when this upgrade began; `git status` lists the application and reports as untracked rather than as a diff against a committed prototype.

## Remaining educational and technical dependencies

1. A competent Somali teacher must review the alphabet, vocabulary, IPA, spelling, guidance, comparisons, assessment and appropriate Somaliland pronunciation; record and apply corrections.
2. Obtain, license, review and approve fluent-speaker recordings for every required sound and word. Validate actual playback and listening activities with the recordings.
3. Conduct child usability, educational effectiveness, accessibility and physical-device tests, including low-powered mobile devices; review the mastery threshold and scoring approach with educators.
4. Review the scene illustrations and vocabulary for educational and cultural suitability. The scenes use the existing emoji assets, not a fully illustrated 3D environment.

## Local commands

```bash
npm install
npm run dev                 # http://localhost:5173
npm test
npm run lint
npm run build
npm run test:e2e            # with dev server running and Chromium system libraries installed
npm run review:generate
```

See `README.md`, `teacher-review/README.md` and `public/audio/README.md` for setup, review and recording details.
