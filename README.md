# Baro Af-Soomaali — Dhagaysi, Hadal, Akhris iyo Qoris

A complete Somali language school built on the existing Stage 1 prototype. Seven stages take a learner from zero to Somali literature (`src/curriculum/`), with listening, speaking, reading and writing practised as four separately tracked skills. The preserved Stage 1 phonics experience and the Hadraawi cultural module are unchanged and stay reachable at `#/xaraf`.

**The educational release is not approved:** no fluent-speaker recordings, teacher review or child usability validation were supplied. All 54 modules of school content are `PENDING_REVIEW` and all 545 school audio entries are `NOT_RECORDED`. Listening activities remain unavailable in the learner experience until recordings are approved and available. No English speech synthesis is substituted, and the site never claims pronunciation accuracy from browser speech recognition — speaking is graded only by native recordings plus an educator rubric.

## The school

| Heer | Marxaalad | Module |
| --- | --- | --- |
| 0 | Maqal iyo Hadal (listening & speaking start) | 8 |
| 1 | Xarfaha iyo Dhawaaqyada (the preserved 8 phonics lessons) | 2 |
| 2 | Erayo iyo Weedho (words & sentences) | 8 |
| 3 | Wadahadalka Maalinlaha ah (everyday conversation) | 10 |
| 4 | Naxwe iyo Fahamka Akhriska (grammar & reading) | 10 |
| 5 | Sheeko, Hadal iyo Qoraal (story, speech, writing) | 8 |
| 6 | Suugaan iyo Af-Ingaad (literature & eloquence) | 8 |

54 modules · 72 lessons · 371 vocabulary items · 39 reading passages (Levels 1–7) · 24 dialogues · 47 speaking tasks · 202 interactive exercises across ~16 reusable activity types, in one shared curriculum served to three learner paths (absolute beginner, home-speaker-learns-to-read via a 10-item diagnostic, improving learner).

### Maktabadda — the halftone book library

`#/books` is a digital library of **10 original Somali children’s books** (Levels 1–10) in one
progressive reading pathway: every book has exactly five illustrated story pages + a cover
(50 pages, 60 illustrations) in a consistent vintage halftone print style, with a distraction-
free reader (tap-a-word meanings + phonics-safe grapheme references, sentence highlighting,
optional translation, large text, bookmark/resume, keyboard and touch navigation) and a
per-book end-of-book assessment (5 vocab + 3 comprehension + 1 main idea + 1 spoken/writing
task). Mastery needs comprehension (configurable 80%) — never page turns alone. Progress is
stored in `baro-books-v1`. All book content is `PENDING_REVIEW` and all book audio is
`NOT_RECORDED`; see `BOOKS_DELIVERY_REPORT.md` for status, screenshots and remaining assets.

Every lesson follows the seven-step cycle **Dhegayso → Baro → Ku hadal → Akhri → Faham → Isticmaal → Dib u eeg**, and every lesson ships real content — objectives, vocabulary, dialogues, reading, grammar, exercises, speaking tasks and a recap. Mastery is configurable (default 80%) over distinct objective exercises, with spoken evidence where the lesson has speaking tasks; spaced vocabulary review runs at [1, 3, 7, 16, 35] days; stage assessments score akhris/qoris objectively and never fabricate a listening/speaking pass; certificates require all lessons plus the assessment; a plain-text progress report (`warbixinta-horumarka.txt`) can be downloaded for parents and teachers. School progress is stored separately (`baro-school-v1`) and never touches the preserved phonics key `baro-progress-v2`.

UI routes: home, `#/paths`, `#/diagnostic`, `#/stage/<id>`, `#/lesson/<id>`, `#/dashboard`; the legacy Stage 1 + Hadraawi app lives at `#/xaraf` (deep links `#/xaraf?unit=N`, `#/xaraf?view=culture|story`).

## Run locally

Requires Node.js 22 or later.

```bash
npm install
npm run dev
# Open http://localhost:5173
```

```bash
npm test                 # curriculum, audio, progress, school and component tests
npm run lint             # ESLint
npm run build            # TypeScript and production build
npm run test:e2e         # browser tests; start the development server first
npm run review:generate  # regenerate Stage 1 teacher-review files
npm run review:hadraawi  # regenerate the Hadraawi review sheet
npm run review:school    # regenerate school curriculum + audio review CSVs
```

The browser tests use Chromium and require its Linux libraries (including NSS and NSPR). In a typical Debian environment install `libnss3` and `libnspr4` using the system package manager. Desktop and mobile screenshots are saved to `screenshots/`; baseline screenshots are in `screenshots/baseline/`.

## Authentication (Supabase)

Sign in (`#/signin`) and sign up (`#/signup`) are backed by one Supabase project that serves
both websites: **somalireading.vercel.app** and **jollyphonetic.vercel.app**.

```bash
cp .env.example .env     # then fill in the project URL and publishable key
```

The client reads `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` and falls back to the
`NEXT_PUBLIC_*` names, so the same env file works in this Vite app and in the jollyphonetic
Next.js app. On Vercel both variables (all four names) are set for both projects; redeploy
after adding them anywhere new.

Supabase dashboard → **Authentication → URL Configuration** (one-time setup):

- **Site URL:** `https://somalireading.vercel.app`
- **Redirect URLs** must include both sites (each app sends its own origin as
  `emailRedirectTo`): `https://somalireading.vercel.app/**`, `https://jollyphonetic.vercel.app/**`,
  plus `http://localhost:5173/**` for local development.

How the flows behave:

- **Sign up** creates the account with the learner's name in `user_metadata.full_name`. If
  email confirmation is enabled, the page shows a bilingual "check your email" panel with a
  resend button; the confirmation link returns the visitor to the site they signed up on, and
  supabase-js exchanges the code automatically on arrival.
- **Sign in** redirects back to the page that launched it (`?next=` hash param), the marketing
  site header shows the signed-in learner, and the school app sidebar offers sign in / sign out.
- **Forgot password** on the sign-in page sends a recovery email; the recovery link signs the
  learner back in (default Supabase behavior).

The publishable key is public by design — never place a secret key in `NEXT_PUBLIC_*`/`VITE_*` variables.


## Curriculum and quality review

`src/curriculum.ts` contains the 26 base units, examples, IPA references, guidance, four vowel-length pairs and eight Stage 1 units. Digraphs and doubled vowels are single word-building tiles. The glottal-stop sign is deferred for teacher review. English glosses are supporting information.

`src/review.ts` holds review records and correction fields; `src/review-original.json` preserves the original draft. `teacher-review/` contains a printable review document, a curriculum CSV and a recording-script CSV. See `teacher-review/README.md` for the workflow. All 26 letters and four comparisons remain `PENDING_REVIEW`.

The school curriculum has its own review exports: `npm run review:school` writes `teacher-review/school-curriculum-review.csv` (1,153 rows: objectives, vocabulary, dialogue lines, passages, questions, grammar, exercises, speaking tasks, assessment items — every row `PENDING_REVIEW`) and `teacher-review/school-audio-recording-script.csv` (545 rows: words, dialogue lines, passages, phrases — every row `NOT_RECORDED` with empty speaker/licence/consent fields for the recording workflow). `src/curriculum/review.ts` mirrors the status registry at runtime.

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
