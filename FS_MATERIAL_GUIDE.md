# FS syllabus and where to study

Updated on 5 October 2026, evening. The screening notice is the scope: coding in recursion, arrays/strings and greedy; MCQs in SE, WT, CN, AI, Java/Python and DAA. College units are broader than this notice. Use the sections below rather than reading every file cover to cover.

**Start with [the remaining-time plan](FS_REMAINING_DAYS_PLAN.md).** Your reported progress is a few string problems on 5 October; other topics are not assumed complete. You have confirmed about four study hours in college plus two to three at home, and prefer Java for coding. The older four-hour timetable has been superseded.

**Direct study update, 7 October:** for SE, WT, CN and AI, use [the complete subject guides](FS_SUBJECT_NOTES.md). They teach the topics without requiring these source files to be read first. The source map below is an optional reference for those four subjects.

PDF page references below mean the page number in the PDF viewer, starting at 1. Word documents are located by headings because pagination depends on the viewer.

## Compact hard practice

Use [70-question banks and the remaining-subject coverage audit](FS_Remaining_Subjects_Learning_Map.md) for CN, AI, Java, Python and DAA. Each bank teaches its rules through hidden worked explanations; the audit identifies source gaps and targeted official readings. SE and WT keep their existing 80-question banks.

## DAA coding and MCQs

| Topic | Read here | Use before FS |
|---|---|---|
| Arrays, prefix/suffix products | [Day 1 notes](DS-JAVA/Day_01_Notes.md), section 3; [Day 1 practice](DS-JAVA/Day_01_Practice.md) | Product Except Self; trace zeros, negatives and boundaries |
| Complexity and recursion foundations | [Day 1 notes](DS-JAVA/Day_01_Notes.md), sections 4–8; [college Unit I](DS/college/DAA%20UNIT-I.pdf), pp. 1–17 | Growth rates, loop/call analysis, base case, progress, returns and stack depth |
| Fibonacci, Climbing Stairs, reverse string | [Day 2 notes](DS-JAVA/Day_02_Notes.md), sections 2–4; college Unit I, pp. 18–25 | Derive and trace the recurrence, then implement; avoid treating naive Fibonacci as an efficient solution |
| GCD and strobogrammatic strings | [Day 3 notes](DS-JAVA/Day_03_Notes.md), sections 2–7; college Unit I, pp. 30–36 | GCD and a two-pointer checker first; generation after recursion foundations |
| Greedy fundamentals | [college Unit II](DS/college/UNIT-II_DAA.pdf), p. 31 | Explain the choice, feasibility and why it is safe for the particular problem |
| Minimum-product subset | College Unit II, pp. 32–34 | Sign, zero and nonempty-subset cases; secondary coding attempt |
| Stock buy/sell | College Unit II, pp. 35–38 | One transaction and unlimited transactions are different variants; practise both rules |
| Fractional knapsack | College Unit II, pp. 39–43 | Sort by value/weight, take full items then a fraction; distinguish from 0/1 knapsack |
| DAA output/debugging MCQs | [Day 3 bank](DS-JAVA/Day_03_MCQ.md) and Day 1/2 paper drills | This is a DAA bank, not a complete 30-question mixed-subject mock |

The college Unit I adds divide and conquer, Master’s theorem, merge/quick sort, majority element and power computation. Unit II also adds binary-search applications, graph representation, MST and shortest paths. The notice does not specify the DAA MCQ subtopics, so these are available for selective concept/trace revision. Do the core coding above first; a problem merely containing an array does not make every advanced technique equally urgent.

**Java route:** use [DS-JAVA](DS-JAVA/README.md) for the matching notes, practice sheets, Java MCQs and runnable reference classes. The original `DS` package remains available. Use the college PDFs' Java snippets as additional references after attempting. Java and Python both remain in the MCQ syllabus.

MST and shortest paths are taught under greedy in the college material. They are not guaranteed absent from the test. If these were emphasised in your screening classes, promote their concept/trace revision after the core set. Otherwise, full graph implementations have lower priority in the remaining window.

**Specific source correction:** Unit II p. 47 describes Kruskal as providing a shortest path. Kruskal finds a minimum spanning tree; that is a different objective. The copied PDF is unchanged. Activity selection appears in the old timetable but was not located in these college units; it is optional extra greedy practice, not a confirmed college topic.

## Software Engineering

Both existing SE PDFs introduce the announced topics, but coverage depth varies. **The [SE learning map and source audit](SE/FS_SE_Learning_Map.md), checked on 8 October, supersedes the earlier claim that no supplementary Git material was needed.** It gives a granular topic checklist, corrections, selected external readings and a study route. Process models have useful explanatory coverage; Scrum rules and Git command/state reasoning need supplementation, and the Agile/DevOps comparison needs correction.

The [direct SE guide](SE/FS_Revision_Notes.md), added in the newer remote commits, already supplies clearer explanations of many of these PDF gaps. Use it first; the audit separately maps its coverage and the Subject Atlas's foundation questions to the deeper practice still needed.

Practice with the [80-question SE scenario bank](SE/FS_SE_Hard_MCQ_Bank.md), reduced from the existing bank for faster revision: 16 process-model, 20 Agile/Scrum, 18 DevOps and 26 Git/GitHub questions. Questions and explanations use simpler wording. Answers and explanations for all four choices stay hidden. Four mixed sets of 20 cover the bank once. The 23 Git and 8 Java pipeline traces have executable output checks; run the [validator](SE/validation/check_se_bank.py) with `python3 SE/validation/check_se_bank.py` from the repository root.

| Test topic | Existing source | Reading target |
|---|---|---|
| Process models | [Unit 1](SE/Unit-1%20Software%20Engineering%20%281%29.pdf) | pp. 21–33: Waterfall, incremental, evolutionary/prototyping, spiral and concurrent development; pp. 15–20 for process-framework context |
| Agile | Same Unit 1 | pp. 34–45: values/principles, frameworks, Scrum roles, artifacts and events |
| DevOps | Same Unit 1 | pp. 46–55: Agile comparison, lifecycle, CI, continuous delivery/deployment and pipeline |
| Git & GitHub | [Unit 2](SE/Unit-2%20Understanding%20Requirements.pdf) | pp. 30–50 and 57–66: VCS, Git vs GitHub, working directory/staging/commits, commands, branches, merge, revert, clone/push/pull/fork and conflicts |

Skip Unit 2's long requirements-engineering/SRS discussion as a first-pass FS task. SSH setup and screenshot-heavy sections are lower priority than command meaning and repository state. No tool installation or new GitHub project is needed for this revision. Use the learning map for Scrum artifacts/commitments, CI/delivery/deployment, staging and diff variants, fetch/pull, branch graphs, undo commands and conflict completion.

## Web Technologies

**Depth update, 8 October:** start with the [direct WT guide](WT/FS_Revision_Notes.md), then use the [WT learning map and source audit](WT/FS_WT_Learning_Map.md). The map assesses both the college materials below and the newer guide/Atlas, compares similar methods, and links selected MDN and official Node documentation for deeper rules.

Practice with the [80-question WT bank](WT/FS_WT_Hard_MCQ_Bank.md), reduced from the existing bank: 16 basics/functions/strings, 20 arrays, 6 Set/Map, 8 JSON, 18 callbacks/Promises/await and 12 DOM/events questions. Four mixed sets of 20 cover every question once. Wording is simpler; hidden answers still explain every choice. Thirteen questions also ask for a fix and provide working repair code. The [validator](WT/validation/check_wt_bank.mjs) checks 68 language questions plus 11 repairs in Node, and all 80 questions plus 13 repairs in a real browser. See the bank for runtime requirements and the language-only command.

| Test topic | Existing or added source | Coverage |
|---|---|---|
| Callbacks, promises, async/await | [UNIT III](WT/UNIT%20III.pdf), pp. 15–29 | Useful explanations and examples; separate the JavaScript ideas from Node-specific internals |
| JSON | [MongoDB notes](WT/Unit%201_MongoDB.pdf), the JSON subsection on p. 8 | Introductory coverage only; supplement JSON syntax, types, parsing and stringifying |
| Callbacks and array iteration | [class example](WT/examples/callback_functions/ex2.js) | Several `forEach` forms; partial array coverage |
| Promise states | [promises3.js](WT/examples/promises/promises3.js) | Defines a function; invoke it to inspect the returned Promise |
| Promise chaining and errors | [promises6.js](WT/examples/promises/promises6.js) | Return the next Promise; trace `.then`/`.catch` |
| Multiple promises | [promises9.js](WT/examples/promises/promises9.js) | `Promise.all`; random success/failure in the simulated operation |
| Async/await | [ex1.js](WT/examples/Async%26Await/ex1.js), [ex5.js](WT/examples/Async%26Await/ex5.js), [ex6.js](WT/examples/Async%26Await/ex6.js) | Return values, error handling and awaited versus unawaited calls |
| Small DOM example | [index7.html](WT/examples/promises/index7.html) and its companion `promises8.js` | `querySelector` and style changes in a browser; this is not full DOM coverage |

The college files alone lack a coherent pack for **JavaScript basics, array methods, Sets, Maps and broader DOM**. The newer direct guide and Atlas supply that foundation. The hard bank adds deeper practice with variable scope, coercion/equality, function returns, method contracts, sparse arrays, shared references, JSON losses, rejection propagation and DOM identity/events. These are preparation targets, not an inferred marks distribution.

Most MongoDB CRUD, indexes, aggregation, Express, Node modules, buffers, streams and server projects are outside the explicitly named WT list. Skip them for the first pass. The two `Unit2_NodeJs_Syllabus` PDFs have identical extracted text; they are outlines, not two separate revision chapters. Existing duplicate files were retained.

The copied JS examples are class source files, unchanged. Some use random outcomes; predict control flow rather than one guaranteed result. `index7.html` needs a browser because its script uses `document`. These examples do not perform real database writes. In callback `ex2.js`, the final call uses `display` again even though `display2` was defined; read the actual call when tracing it.

## Computer Networks

| Test topic | Source | Headings to use |
|---|---|---|
| OSI model | [existing Unit I](CN/CN_UNIT_1_NOTES.docx) | NETWORK MODELS → ISO/OSI Model → seven layers; layer responsibilities and device-layer mapping |
| Physical layer | Same Unit I | Physical Layer, TRANSMISSION MODES, MULTIPLEXING, TRANSMISSION MEDIA; simplex/half/full duplex |
| Data Link Layer: framing and errors | Same Unit I | Data-Link Layer, Framing, byte/bit stuffing, Error Detection and Correction, CRC, CHECKSUM, Hamming code |
| Data Link Layer: control protocols and access | [added Unit II](CN/CN%20UNIT-2%20NOTES.docx) | FLOW CONTROL, ERROR CONTROL, Stop-and-Wait, ARQ, Go-Back-N, Selective Repeat, sliding windows, ALOHA, CSMA/CD, CSMA/CA and Ethernet |

Unit I already contains part of the Data Link material; Unit II fills the flow/error-control and multiple-access gap. Study contrasts and small worked traces. Packet Tracer configuration, socket programs and detailed higher-layer protocols are not first-pass requirements from this notice.

The physical-layer material found covers transmission, multiplexing and media. No separate focused signal/encoding/channel-capacity revision pack was identified. If your classes covered those under Physical Layer, they remain a possible coverage gap; the notice does not list its subtopics.

## Artificial Intelligence

| Test topic | Added source | Reading target |
|---|---|---|
| ANN | [Unit I Part 1](AI/KR24-CSE-3-1-UNIT1-PART1-NOTES.pdf) | pp. 16–33: neurons, weights/bias, layers, perceptron/MLP and activation functions; pp. 34–49 for losses, gradient descent and backpropagation |
| TensorFlow | Same Part 1 | pp. 52–54: tensors, computation, automatic differentiation and the Keras interface; follow the model example in Part 2 |
| Regression | [Unit I Part 2](AI/KR24-CSE-3-1-UNIT1-PART2-NOTES.pdf) | pp. 2–10: linear/neuron model, MSE, gradient descent and workflow |
| Classification | Same Part 2 | pp. 10–21: class types, MNIST, preprocessing, model construction, activation/loss, training/evaluation and model complexity |
| Linear vs logistic regression | [older supervised-learning notes](AI/SUPERVISED_LEARNING_REGRESSION.pdf) | pp. 2–3 for the distinction; pp. 14–19 for logistic regression; other metrics/bias-variance sections only to repair a weak concept |

The 3-1 AI folders also contain CNN, RNN/LSTM/GRU, autoencoders and other advanced units. These were not copied because they do not fill the announced-topic gaps. The extra older ML file complements the neuron-based regression notes; it is not another whole unit you must finish.

## Java and Python

No dedicated Java/Python fundamentals revision pack was found in the relevant materials inspected. Java algorithm snippets, socket code and Python ML notebooks are not a substitute for language MCQ preparation. The notice gives no language subtopic list.

**Added revision aid, 6 October:** [Java fundamentals](Programming/Java_FS_Revision_Notes.md) and [Python fundamentals](Programming/Python_FS_Revision_Notes.md) now provide separately marked AI explanations and official references. [All subject notes](FS_SUBJECT_NOTES.md) link the complete revision set. These additions fill teaching gaps; they do not establish an exact language subtopic list from the college.

Allocate a separate block to language/output questions: types and operators, control flow, functions, strings and collections, mutability/references, exceptions and basic OOP. Existing [Day 2 notes](DS-JAVA/Day_02_Notes.md), section 5, help with Java string semantics only.

## What changed in this repository

- Added two college DAA PDFs, one CN Word file, three AI/ML PDFs and nine small WT class-example files.
- Copied source files intact and verified each against its original using SHA-256. Original locations and hashes are in [MATERIAL_SOURCES.md](MATERIAL_SOURCES.md).
- Kept the existing notes, uploaded college files and duplicate sources intact.
- Added the remaining-time plan linked at the top. This guide maps coverage; it does not claim that the source explanations or every code snippet have been fully audited.
