# Baro Af-Soomaali — Implementation Report

**Date:** 22 November 2026  
**Scope:** Stage 1 Somali phonics prototype  
**Branch:** `arena/4e98bf83-somalireading`

## Executive summary

A standalone, Somali-first learning application has been built with eight Stage 1 units, a 26-unit alphabet inventory, interactive visual activities, a Three.js lamp scene, an assessment and browser-local progress tracking.

**The application is a prototype, not a completed, production-ready Somali phonics programme.** It has no verified Somali audio and no fluent Somali teacher has reviewed or approved the curriculum. Listening games and listening assessment are not implemented. These are important gaps in the original brief and must be resolved before the app can reliably teach pronunciation or be considered ready for children to use independently.

## Starting point and reuse

- The supplied repository contained only a README and initial commit. It did not contain the JollyPhonetic application, its assets, progress system or Three.js source.
- The live JollyPhonetic site's initial learner-selection screen was inspected, but its complete interactive lesson flows could not be inspected in this environment.
- Consequently, this is a new standalone implementation; no JollyPhonetic code, progress mechanism or original assets were reused. The original application was not modified, and no production deployment was made.

## Curriculum implemented

The curriculum is data-driven in `src/curriculum.ts`. Each letter entry includes upper- and lowercase forms, an IPA reference, Somali guidance, an example and English meaning, image and audio references, and review and recording statuses.

- **Five vowels:** a, e, i, o, u.
- **Twenty-one consonant units:** b, t, j, x, kh, d, r, s, sh, dh, c, g, f, q, k, l, m, n, w, h, y.
- **Digraphs:** dh, kh and sh are treated as single grapheme tiles. Doubled vowels are also kept together as long-vowel sound tiles.
- **Vowel length:** a/aa, e/ee, i/ii, o/oo and u/uu are introduced, with bur/buur, bar/baar, bog/boog and dhig/dhiig comparisons.
- **Orthography:** P, V and Z are excluded from the base inventory. The glottal-stop sign is deferred for teacher review.
- All 21 requested consonant example words are included, alongside five vowel examples. These are draft teaching content, not teacher-approved material.

### Stage 1 pathway

1. **Shaqallada** — meet the five vowels.
2. **Shibbanayaasha** — familiar consonants and example words.
3. **Dhawaaqyada gaarka ah** — c, x, q, dh and kh.
4. **Laba xaraf, hal dhawaaq** — sh, dh and kh as single units.
5. **Shaqal gaaban & dheer** — short and long vowels.
6. **Aan isku akhrino** — building and reading words.
7. **Aan ku celcelinno** — visual review and practice.
8. **Tijaabada heerka 1** — visual assessment and feedback.

The assessment covers visual letter and vowel recognition, digraphs, vowel length, word reading and word-building recognition. It does **not** assess listening or pronunciation.

## Application and activities

- Somali-language dashboard, lesson navigation and responsive layouts.
- Letter selection and touch-to-reveal example words and illustrations.
- Word building using selectable or draggable grapheme tiles, with correctness feedback.
- Picture-to-word matching with feedback.
- Uppercase and lowercase tracing on a pointer-enabled canvas, including a clear control.
- Short-versus-long written word comparison and feedback.
- An animated Three.js lamp that can be clicked to reveal **nal** and its sound tiles; a standard button provides an alternative way to reveal it.
- An eight-question assessment with a score and areas for further practice.
- Progress saved in browser local storage and retained after refresh. Lesson completion is **self-reported**, not gated on mastery of activities.
- A generated landscape illustration and locally bundled Twemoji SVG illustrations. No sticker album or Stage 2 content was added.

## Audio and educational review

**Audio status: none of the required fluent-speaker recordings is included.** Paths and replaceable references are provided for individual sounds and words; missing audio is reported in the interface. Browser text-to-speech and English recordings are not used as substitutes. Playback initiation was tested with a mock, not with a verified Somali recording.

**Teacher-review status: all curriculum entries await review.** No content is marked teacher-approved. The `README.md` records the consulted sources and provides a place to document future corrections. The Somali Language Centre alphabet page and Somali Alphabet Standard SLS-0001 were consulted; the latter is itself marked **Review**.

## Verification results

The following results were obtained during implementation:

| Check | Result |
| --- | --- |
| Curriculum and component tests | **11 passed, 0 failed** |
| Browser end-to-end tests | **11 passed, 0 failed** |
| TypeScript and production build | Passed |
| ESLint | Passed |
| npm audit | 0 reported vulnerabilities at the time of the check |
| Desktop, tablet and mobile browser viewports | Checked; no horizontal overflow in the tested mobile and tablet viewports |

Tests exercised the alphabet inventory, digraph and long-vowel tokenization, sample activities, missing-audio feedback, word building, tracing, assessment scoring, progress persistence and lamp discovery. The browser tests did not establish pronunciation accuracy or replace testing on physical touch devices. Audio playback was mocked for the playback-initiation test.

Screenshots: [Desktop](screenshots/desktop.png) · [Mobile](screenshots/mobile.png)

## Main files

- `src/curriculum.ts` — alphabet, vocabulary, units, vowel pairs, assessment and content status.
- `src/main.tsx` — learner interface, activities, assessment and local progress.
- `src/StoryScene.tsx` — Three.js lamp scene.
- `src/style.css` — responsive presentation.
- `public/audio/README.md` — recording requirements and missing-audio status.
- `public/images/` and `public/emoji/` — illustration assets and emoji licence.
- `tests/` and `e2e/` — curriculum, component and browser tests.
- `README.md` — setup, sources, audit and limitations.

## Remaining work and recommended priorities

1. Have a fluent Somali teacher review the entire curriculum, example words, meanings, IPA and guidance, including Somaliland pronunciation and the deferred glottal-stop feature. Record corrections and approval evidence.
2. Record, license and review individual Somali sounds, complete words and vowel-length comparisons. Add the recordings at the referenced paths and test actual playback.
3. Implement and validate the missing sound-identification and listening-comprehension games and listening assessment.
4. Expand the single lamp discovery scene into suitable interactions for the wider vocabulary; review illustrations for clarity and cultural appropriateness.
5. Conduct educational, accessibility and physical touch-device testing. Consider mastery-based lesson completion rather than self-reporting.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. Run `npm test`, `npm run lint` and `npm run build` for the automated checks. For end-to-end tests, start the development server and run `npm run test:e2e`; Chromium system libraries, including NSS and NSPR, are required.
