# Start here — FS lecture-based revision

**Your LeetCode revision is a useful base, but it is not enough by itself for class-method MCQs.** Re-solving a representative set helps recover implementation skill; the lecture notes and scenario questions add partition/merge states, recurrences, search assumptions, graph/tree traces, and language traps that an accepted solution does not assess.

Prepared 5 October 2026 for the 9 October FS described in your pasted notice: 3 coding questions; 30 MCQs in 30 minutes; 2 hours total. Coding priorities remain recursion, arrays/strings and greedy. Other DAA topics are in the notes/MCQ track. These files cover DAA, not the other subjects' complete exam preparation.

## Files to use

| File | What you get |
|---|---|
| [FS_Java_Hard_MCQ_Bank.md](FS_Java_Hard_MCQ_Bank.md) | **Primary MCQ practice:** 160 Java-only code scenarios; output, intermediate state, bugs, complexity and repairs; deeper graph/tree/search/backtracking coverage |
| [FS_Java_CPP_Exam_Revision.md](FS_Java_CPP_Exam_Revision.md) | Ten-point recall checklist plus broad paired Java/C++ syntax, full-program input/output, parsing, conversions and collections |
| [FS_Coding_Gap_Practice.md](FS_Coding_Gap_Practice.md) | 13 local/method exercises: contracts, examples, expected complexity, priorities and reference-function links |
| [FS_LeetCode_Practice.md](FS_LeetCode_Practice.md) | 71 exact problems: 42 in your 144-ID paste, 29 new; direct class matches versus transfers/extensions; coding versus MCQ priorities |
| [FS_DAA_MCQ_Bank.md](FS_DAA_MCQ_Bank.md) | Preserved 250-question concept/background bank; use the new Java bank for the requested code-analysis format |
| [FS_Concept_Notes.md](FS_Concept_Notes.md) | Worked rules, traces, complexity and corrected assumptions across the lecture sequence; links to detailed Days 1–3 notes |
| [FS_Lecture_Coverage.md](FS_Lecture_Coverage.md) | Day-by-day evidence, approximate timestamps, scope and unresolved assignment variants |
| [FS_Validation.md](FS_Validation.md) | What was checked and what remains a source limitation |
| [FS_Java_Validation.md](FS_Java_Validation.md) | Compilation/output checks for every new Java question and paired exam I/O templates |

## Your first queue

Choose the weakest **6–8 substantive coding attempts overall**, including local gaps; do not add eight new attempts on top of already completed independent practice. The earlier full144-problem map remains available but is not a checklist to finish before FS.

1. **Product Except Self, LC238 (new):** prefix/suffix without division; test one/two zeros.
2. **Two Sum, LC1 (solved):** complement invariant and duplicate values.
3. **Longest Substring, LC3 (solved):** window state on a repeat.
4. **Subsets, LC78 (solved):** choices, undo, output copies.
5. **Jump Game, LC55 (solved):** reachable frontier and failing zero.
6. **Stock II, LC122 (new):** unlimited gains; contrast your solved LC121.
7. **Fractional knapsack, local G6 (new task):** density order and fractional remainder.
8. **Minimum subset product, local G8:** sign/zero contract, if unfamiliar; replace a secure attempt rather than extend the workload.

Use brief diagnostics to decide substitutions: LC26, 125, 509, 70, 455. If those fail, repair the foundation before adding a harder new task. Next choices: LC560, 22, 435, 14, 169, 50; **new** LC670 and LC912 for class-method breadth. In particular, LC169 solved by voting does not demonstrate the D&C combine; LC912 solved with library sort does not demonstrate merge/partition traces.

Paper repairs: G1 partition and G2 pre-merge state; power's single-half call count; majority count-versus-frequency; coins' counterexample. These are often more efficient than another complete duplicate submission.

## Before the test

Use the existing [four-hour daily plan](FS_5_Day_Strategy.md), replacing its DAA blocks rather than expanding them:

| Date | DAA use inside the existing allocation |
|---|---|
|5 Oct|70 minutes: 15 selective notes/diagnostic, 25 one weak coding attempt, 10 repair or hint, 10 selected MCQs, 10 error review|
|6 Oct|65 minutes greedy: 35 fractional knapsack, 20 Stock II attempt/recall, 10 minimum-product/coin edge cases|
|7 Oct|45 coding repair: 35 weakest reattempt, 10 partition/merge/power trace; plus existing20-minute DAA MCQ block for mistakes|
|8 Oct|Keep120-minute mixed FS mock and review. Choose unfamiliar allowed-scope coding tasks; include other subjects in the 30 MCQs. Repair errors before adding breadth.|

Times are preparation choices, not an official section schedule. If you already finished a task independently, recall it briefly and use its time for a weak task. No assumption is made that you have completed any practice. Both banks are reference pools, not compulsory checklists before9 October. Use the new Java bank's diagnostic for timed MCQ blocks and repair missed topics using its coverage index.

**Language split from your latest instruction:** all new MCQs use Java; coding examples and full-program practice offer C++17 alongside Java. Before a timed coding attempt, write the class/main, parser and output loop yourself using the revision sheet. An accepted LeetCode method alone does not practise this part of the exam.

## How to re-solve

Use LeetCode itself: blank editor, no old submission/editorial, one tiny manual example, brute force, then your improved algorithm. After solving, explain time **and** auxiliary space, test an edge case and change one assumption. A platform clone does not by itself improve recall. Use a local timed editor for full input/output simulation and the college judge when its contract is supplied.

If stuck for15–20 minutes, take one targeted hint, close it, and finish your implementation. Reattempt the failed idea the next day from scratch. Mastery means you can reconstruct and explain it; recognizing old code is not sufficient evidence.

## What the sources establish

Days 4–10 use your preserved summary. All17 supplied Days 11–27 videos yielded English auto-captions, retained locally. They identify the concepts and many discussed methods, but screen-only diagrams/code can be missing. The practice snippets are original reconstructions with explicit contracts. The bank cannot guarantee every detail on the screen or predict every possible exam question.

Specific discoveries: Day 18 adds Maximum Swap; class maze uses right/down steps, so it differs from rolling-ball problems; Campus Bikes minimizes total assignment distance. Assignment-only Additive Number/Beautiful Arrangement are marked extensions; Attendance_Program and the ambiguous StairCase title still need their actual statements. These gaps are recorded rather than filled with guessed lecture content.
