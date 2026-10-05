# FS study workflow — effective from Day 3

The screening notice pasted on 5 October 2026 is the current scope: **9 October 2026, two hours, three coding questions, and 30 MCQs in 30 minutes.** Coding is restricted to **recursion, arrays and strings, and greedy**. The notice names DAA in the MCQ section without a detailed DAA topic list. The expectation of difficult code-scenario MCQs comes from your instruction, rather than an explicit difficulty statement in the notice.

## What each lecture package contains

| File | Contents |
|---|---|
| `Day_XX_Notes.md` | All substantive lecture topics, with worked traces, correctness arguments, complexity, edge cases and corrected transcript slips |
| `Day_XX_Practice.md` | A short coding set restricted to the three announced coding areas; college/NeetCode overlaps labelled accurately |
| `Day_XX_MCQ.md` | Scenario questions with four choices, hidden answers, detailed reasoning and a mistake log |
| `code/dayXX_reference.cpp` | Reference implementations only for selected recursion, array/string and greedy exercises; read after attempting |
| `sources/Day_XX_Transcript.txt` | Unedited source; corrections belong in notes |

For topics outside the coding scope—such as a standalone number-theory algorithm, tree/graph algorithm, specialised search technique or advanced DP—explain the topic thoroughly in notes and use small code snippets for analysis in the MCQ sheet. Do not assign full implementations or add standalone C++ reference solutions for those topics before FS. A problem containing an array or a recursive call is not automatically an excuse to assign every later algorithm; select the core technique the question tests.

For example, Day 3's recursive GCD and recursive string generation directly practise recursion, while its digit checker practises strings/two pointers. Standalone primality testing is treated as MCQ study. Greedy is not taught in this transcript, so Day 3 does not add an unrelated greedy exercise.

## Rules for code-scenario questions

- State the language, inputs, indexing convention, integer assumptions and observation point.
- Ask for intermediate state, output, call/iteration count, complexity, a minimal counterexample, or a repair.
- Explain why the chosen answer is right and what assumption makes the tempting alternative fail.
- Include genuine traps: update order, base cases, odd centres, short-circuit evaluation, bounds, overflow, equality and container-operation cost.
- Do not give a numeric output for undefined C++ behaviour. If a snippet deliberately has such a bug, that is the answer.
- Keep answers hidden using GitHub-compatible details blocks so the files work on a phone.
- Questions are original practice, not claimed past papers or predictions of exam questions.

## Working within the deadline

Choose one or two coding attempts per study block; recursion generation can be a later attempt if the checker/GCD foundations need more time. Answer a small timed MCQ subset, review mistakes, and reattempt missed questions the following day. The full question bank is available for targeted repair; it is not extra compulsory work on top of the existing four-hour daily plan.

Check NeetCode 150 membership from the [official registry](https://github.com/neetcode-gh/leetcode/blob/main/.problemSiteData.json). Label exact matches, related transfers, and custom drills separately. Do not invent an exact college match from a title alone. Preserve existing earlier material, but follow this workflow for new transcripts; older out-of-scope tasks are optional rather than new coding obligations.

The original plans remain context documents. Your later instructions and the pasted exam notice determine this workflow.
