# Subject Atlas: SE, WT, CN and AI

A separate visual revision website for the FS screening topics. It does not add pages to the DAA website.

For direct study, use [the complete subject guides](../../FS_SUBJECT_NOTES.md). SE, WT, CN and AI are taught from the beginning, with worked examples and 15 MCQs per guide. These guides are maintained directly as Markdown. `node Subjects/visualize/scripts/export-notes.mjs` refreshes only their marked MCQ sections and preserves the complete teaching text. The website remains an optional visual companion.

Start both websites from the repository root:

```powershell
node Subjects/visualize/scripts/start-both.mjs
```

- Subject Atlas: http://127.0.0.2:5180/
- DAA: http://127.0.0.1:5173/

The addresses use different loopback IPs and ports. Both work on this computer. The new server requires Node 18 or newer and has no npm dependencies. DAA uses its existing installed Vite dependency.

To start only this site:

```powershell
cd Subjects/visualize
npm start
```

The launcher starts hidden detached processes and records logs in the ignored `build` directory. Use Ctrl+C for a foreground server started with `npm start`. To stop a detached server, find its listening PID with `Get-NetTCPConnection -LocalPort 5180 -State Listen`, then stop that identified process with `Stop-Process -Id <PID>`.

## Pages

- Overview and subject progress.
- Learn visually: 41 lessons, stepped state traces, interactive Archify diagrams, examples, comparisons, and limits.
- MCQ practice: 164 original questions, 20-question subject rounds, four-question lesson rounds, a complete bank, and recent mistakes.
- A 30-question, 30-minute mixed mock. The chosen 8/8/7/7 balance is practice design, not an announced marks distribution.
- Source library: 18 preserved college-source entries and class examples.
- Plain-language glossary and coverage/provenance page.

The Git explorer, live DOM click example, ARQ comparison, and neuron calculator are bounded teaching models. TensorFlow examples are explanatory Python; no TensorFlow runtime is included.

Progress and quiz sessions use the separate `fs-subject-atlas-v1` local-storage key on this site’s origin. The clock uses a persistent deadline, so refreshing does not reset a timed session. Correct answers appear after submission in timed mode.

## Source and writing rules

Every newly authored explanation, diagram context, and MCQ carries the user-requested label **“ai explnation due to lack of material”**. A separate coverage status distinguishes available college topics from partial coverage and missing-topic supplements. The label does not imply that every underlying college topic is absent.

The college PDFs are extracted only for relevant viewer pages. Word text retains broader context and is explicitly marked. Original files remain intact. Extracted text does not preserve diagram layout or every mathematical expression; readers can open the original file. Source fingerprints and lesson-specific links are included.

WT supplements cover JavaScript basics, arrays, Sets/Maps, JSON and DOM. The CN signal/encoding/capacity supplement states its model assumptions and uncertain exam emphasis. Official references are linked in lessons and the coverage page. Source corrections include Waterfall rework, Git branch/reference semantics, official Scrum Sprint length, Hamming-code guarantees, and full-duplex Ethernet.

Teaching prose follows an ASD-STE100-informed adaptation: short active sentences, concrete examples, consistent terms, conditions before actions, and explicit limits. It does not claim audited dictionary compliance.

## Rebuild

```powershell
node scripts/build.mjs
```

The builder checks lesson/question/source coverage and verifies the SHA-256 of every frozen diagram and specification against its Archify delivery receipt. It creates `dist/index.html` with all teaching data and gzip-compressed diagrams inline. Chrome and Edge can open it offline through the browser’s `DecompressionStream` API. Original material links still need the repository files; official reference links need internet access when clicked.

To re-extract the existing source files, run `scripts/build_sources.py` with Python and pypdf. To regenerate diagrams after editing their content, run `scripts/diagrams.mjs` with `ARCHIFY_HOME` set to the installed skill path. The default path matches this machine. Archify is only a build-time dependency. The generated website runs without the skill installed.

Diagram type: workflow. Deterministic delivery receipts are in `diagrams/receipts.json`; each diagram has nine showcase checks. Browser and visual review evidence is recorded separately and must not be inferred from those checks.

Archify-generated diagrams use the installed [Archify](https://github.com/tt-a1i/archify) skill. Official supplemental references include [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide), [Scrum Guide](https://scrumguides.org/scrum-guide.html), [TensorFlow](https://www.tensorflow.org/tutorials), and [MIT communication notes](https://ocw.mit.edu/courses/6-451-principles-of-digital-communication-ii-spring-2005/).
