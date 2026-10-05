# Algorithm Atlas

An offline, exam-first visual study site built from the non-transcript files in `DS`.

## Open it

Open **[dist/index.html](dist/index.html)** in a browser. The production build contains its JavaScript, CSS, diagrams, questions and source library in that file; it does not call a server or CDN. Progress is saved in that browser's local storage.

If you want to edit the site, run:

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite. Rebuild the portable offline file with `npm run build`.

## What is included

- 31 topic lessons, arranged around the exam's coding and MCQ tracks.
- Step-controlled algorithm labs, plus a Mermaid flowchart for every topic.
- All 160 Java code MCQs and 250 DAA concept MCQs, including the source diagnostic selections.
- All 38 non-transcript DS files in the searchable source library, including notes, practice, reference code and validation.
- Local progress and attempt counts. No account, backend, network call or external font is required for the built site.

The transcripts in `DS/sources` are intentionally excluded because they repeat the curated notes. The existing source files outside `visualize` are left untouched. The site reflects the source package's exam scope: Java MCQs, with Java or C++ coding practice, and coding priority on recursion, arrays/strings and greedy.

## Content workflow

`scripts/build_content.py` reads the DS source files and generates `src/generated/questions.json` and `src/generated/documents.json`. The build script runs it before bundling. Curated topic summaries and visual traces are in `src/lessons.js` and `src/labs.js`; update them if the underlying study notes change.
