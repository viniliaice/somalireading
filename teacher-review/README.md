# Somali teacher review package

- Open `printable-review.html` in a browser and print it, or use `curriculum-review.csv` in a spreadsheet. It contains all 26 units, all examples and meanings, IPA, guidance, word-building tiles and the four length pairs.
- `audio-recording-script.csv` contains every sound, word, letter-name and comparison recording to request, with empty speaker and review fields. See `public/audio/README.md` for recording specifications.
- All entries are PENDING_REVIEW; no teacher or recording has been invented. The intended variety is Somaliland Somali; document legitimate variation.
- Preserve the original snapshot in `src/review-original.json`. Add the teacher's proposed correction, comments, separate IPA/pronunciation/vocabulary/meaning reviews, reviewer identity, date and evidence in `reviewUpdates` in `src/review.ts`. Apply a verified correction to the curriculum separately; do not overwrite the original snapshot. Git history and evidence references provide the audit trail. Only mark APPROVED after actual review and complete review fields. Regenerate with `npm run review:generate`.

## Hadraawi cultural module

`hadraawi-review.csv` contains the module's source-linked draft biography, lesson text, timeline, work categories, vocabulary and assessment questions, with space for corrections, age-suitability review and reviewer evidence. All entries are pending review. See `src/modules/README.md` for source notes, spelling variations and the inferred 1978 release year. The generator overwrites the export: back up any reviewer comments and decisions before running `npm run review:hadraawi`, then reconcile them manually.
