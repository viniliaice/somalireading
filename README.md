# Baro Af-Soomaali — Heerka 1

A standalone Somali-first Stage 1 learning application, built on the existing prototype. **The educational release is not approved:** no fluent-speaker recordings, teacher review or child usability validation were supplied. Listening activities remain unavailable in the learner experience until recordings are approved and available. No English speech synthesis is substituted.

## Run locally

Requires Node.js 22 or later.

```bash
npm install
npm run dev
# Open http://localhost:5173
```

```bash
npm test                 # curriculum, audio, progress and component tests
npm run lint             # ESLint
npm run build            # TypeScript and production build
npm run test:e2e         # browser tests; start the development server first
npm run review:generate  # regenerate teacher-review files
```

The browser tests use Chromium and require its Linux libraries (including NSS and NSPR). In a typical Debian environment install `libnss3` and `libnspr4` using the system package manager. Desktop and mobile screenshots are saved to `screenshots/`; baseline screenshots are in `screenshots/baseline/`.

## Curriculum and quality review

`src/curriculum.ts` contains the 26 base units, examples, IPA references, guidance, four vowel-length pairs and eight Stage 1 units. Digraphs and doubled vowels are single word-building tiles. The glottal-stop sign is deferred for teacher review. English glosses are supporting information.

`src/review.ts` holds review records and correction fields; `src/review-original.json` preserves the original draft. `teacher-review/` contains a printable review document, a curriculum CSV and a recording-script CSV. See `teacher-review/README.md` for the workflow. All 26 letters and four comparisons remain `PENDING_REVIEW`.

Sources consulted 2026-11-22: [Somali Language Centre alphabet](https://www.somalilanguagecentre.co.uk/learn/somali-alphabet), and [Somali Alphabet Standard SLS-0001](https://github.com/somastllc/somali-language-standard/blob/main/spec/orthography/0001-alphabet.md), itself marked **Review**, not approved. Vocabulary, IPA and guidance still require review by a competent Somali teacher, with legitimate pronunciation variation documented. No teacher or approval has been invented.

## Audio and listening

`src/audio.ts` defines a central manifest for 117 recording entries: individual sounds, five long-vowel sounds, upper/lower letter names, 26 words and comparison words. Entries start as `NOT_RECORDED` with empty metadata. Playback is blocked unless recording, review and pronunciation statuses are all `APPROVED` and the required speaker, licence, consent, dialect and review evidence are present. Listening questions additionally verify that audio files are served as audio; missing or skipped audio is not counted as wrong. See `public/audio/README.md` and `teacher-review/audio-recording-script.csv` for the recording and approval workflow.

Five listening activity types and listening assessment questions are implemented but are **unavailable with the current empty manifest**. Tests use mocks only in test code. Authentic recordings and their pronunciation review are essential before these features can be validated with children.

## Progress and assessment

Progress is local to the browser under `baro-progress-v2`; there is no account or cloud synchronisation. Earlier `baro-progress-v1` data is retained and identified as legacy, but self-reported completions are not converted into mastery. For units 1–7, each target must have a visual word-building or matching attempt (or, for vowel length, each comparison must be attempted), and at least 80% of the **latest answers for distinct activities** must be correct. Attempts, correct/incorrect answers, retries and dates are retained. The threshold is configured in `src/progress.ts`. The final assessment must be submitted before its score can count. Listening is reported separately and cannot be passed when it was not assessed.

The assessment selects unique questions from a visual question bank and includes approved, available listening questions when possible. The default question count is configured in `src/assessment.ts`. Skipped/unavailable listening questions are excluded from the score. None of these metrics proves correct pronunciation, and the proposed mastery model still needs teacher and child-usability validation.

## Interactive world and limitations

`src/StoryScene.tsx` extends the original lamp scene into three reusable Three.js scenes with 11 discoverable items. There are keyboard-accessible object buttons as well as canvas pointer interaction. The generated landscape is an original asset; vocabulary pictures use locally bundled Twemoji SVG illustrations (`public/emoji/LICENSE`).

The original JollyPhonetic source was not present in the supplied repository, so no original code or assets were reused. The original app has not been modified. No production deployment has been made. Physical-device, native-speaker, authentic-audio and child-usability testing remain outstanding; the engineering changes do not constitute educational approval.
