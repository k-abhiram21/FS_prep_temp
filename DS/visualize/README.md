# Algorithm Atlas

The updated offline library includes **173 problem guides**, **410 rewritten MCQ explanations**, **31 expanded concept lessons**, **47 glossary terms**, and **24 Java reference groups**.

Open [dist/index.html](dist/index.html). Use **Problem library** to search by LC number, task, or method. Filter by study priority. Open a guide's **Understand**, **Worked trace**, and **Java plan** tabs. Some Java tabs contain tested methods; others explicitly provide a construction plan.

Every problem guide includes the task contract, a direct baseline, numbered steps, a reason the method works, complexity assumptions, an error boundary, a three-stage worked trace, and a critical-decision diagram. The diagram highlights one decision; it does not replace the full procedure.

The new explanations use an ASD-STE100-informed style. See [WRITING_GUIDE.md](WRITING_GUIDE.md) for the official reference, writing rules, and scope. The original source archive retains its unchanged wording.

Build on Windows or another platform with Python 3 and Node.js:

```text
npm install
npm run build
node scripts/check_content.mjs
node scripts/check_java_references.mjs
```

If Python is not on PATH, set `PYTHON` to its executable path. Java-reference verification requires JDK 17 on PATH, or `JAVA_HOME` pointing to it.

The builder verifies exact coverage of all 173 repository problem IDs and all 410 question IDs. Java reference checks compare 1,000 random arrays against simple methods for sums, maximum subarrays, sorting, and products. The original Java bank's validator checks its exact outputs and intentional failures.

### Content files

- `src/content/algorithms.txt`: individually authored problem guides.
- `src/content/question-notes.txt`: one explanation per original question ID.
- `src/content/concepts.js`: examples, proofs, trace procedures, and limits for all concept lessons.
- `src/content/concept-flows.js`: corrected decision paths and stopping states.
- `src/content/java-solutions.js`: tested Java reference methods.
- `src/content/java-guidance.js`: collection choices and implementation checks for every algorithm method.
- `src/content/glossary.js`: consistent definitions with concrete examples.
- `src/AlgorithmLibrary.jsx`: problem filters, tabs, diagrams, and worked traces.

The sections below describe the original site foundation, which the update preserves.

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

The transcripts in `DS/sources` are intentionally excluded because they repeat the curated notes. The existing source files outside `visualize` are left untouched. The teaching content focuses on Java coding and Java/DAA MCQs. Coding priorities are recursion, arrays/strings, and greedy methods. The preserved source archive also contains older C++ examples.

## Content workflow

`scripts/build_content.py` reads the DS source files and generates `src/generated/questions.json` and `src/generated/documents.json`. The build script runs it before bundling. Curated topic summaries and visual traces are in `src/lessons.js` and `src/labs.js`; update them if the underlying study notes change.
