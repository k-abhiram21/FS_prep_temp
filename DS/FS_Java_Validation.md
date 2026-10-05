# Java scenario bank and exam syntax — validation

Prepared 5 October 2026. This report applies to [the new Java bank](FS_Java_Hard_MCQ_Bank.md) and [the paired Java/C++ revision sheet](FS_Java_CPP_Exam_Revision.md). The original [250-question bank](FS_DAA_MCQ_Bank.md) is retained unchanged by this update; its earlier checks remain in [FS_Validation.md](FS_Validation.md).

## New question bank

Run from the repository root:

```bash
python DS/validation/check_java_bank.py
```

The bank contains **160 contiguous IDs, 27 topic sections and a 30-question diagnostic**. Every question includes a complete Java program, four distinct options and a hidden explained answer. The checker confirms the displayed code/options/answer match the validation index, rather than compiling a different hidden implementation.

All snippets are compiled with `javac --release 17`. Results:

| Case | Count | Check |
|---|---:|---|
| Bounded programs | 152 | Ran each and matched its exact printed result |
| Deliberate runtime faults | 6 | Verified the expected exception and output before failure |
| Deliberate compilation fault | 1 | Confirmed compiler rejection |
| Nonterminating recursion | 1 | Compiled, then reviewed without executing it |

Complexity, invariants and repair explanations are reasoned from the shown algorithm and stated cost model. Matching a small program's output does **not** mechanically prove its asymptotic complexity. In particular, recursive string-copy space uses the explicit retained-frame model, and expected hash costs are conditional on hashing assumptions.

## Full-program I/O and C++ counterparts

```bash
python DS/validation/check_exam_io.py
```

The paired token/line templates compile with Java17 / C++17. Checks cover:

- Identical token-input sums in both languages over 120 seeded cases with arbitrary spaces, tabs, newlines and blank lines; zero-size arrays, no input, zero test cases, negative numbers and signed-64-bit extrema.
- Whole-line parsing with leading spaces, intentional empty lines, LF and CRLF. Cross-language length comparisons use ASCII; Java UTF-16 length and C++ byte length differ for broader Unicode text.
- The two complete programs printed in the revision sheet, plus selected Java split/regex, list-removal, map-of-lists, independent row-copy, builder-edit and numeric-wrapper comparisons.
- Compilation of the exact six C++ Day 1 algorithm counterparts, with factorial/Fibonacci values and head/tail/indirect/tree traces checked.
- Day 2 state Fibonacci versus iterative Fibonacci for n=0..92 under C++ undefined-behavior sanitization. The state implementation now stops before calculating an unused F(93) when returning F(92); the latter fits signed 64-bit. Its wrapper rejects inputs outside 0..92.

The broad sheet contains contextual fragments as well as complete programs. Selected method checks do not mean every fragment is a standalone program; required types, variables, imports and headers are explained in the sheet. Compilation files and binaries are temporary. These checks do not submit anything to a judge.

## Source and exam boundaries

The new bank reuses the [existing lecture evidence](FS_Lecture_Coverage.md): supplied Days 1–3 transcripts, the Days 4–10 summary, and Days 11–27 auto-captions. API transfers, broader variants and assignment-only topics are labelled extensions. There is no claim of complete screen-code capture or guaranteed exam predictions. The package covers DAA and associated Java scenario syntax, not every other FS subject.

**Latest result: PASS** — all intended Java compilation outcomes, all bounded outputs/exceptions, paired I/O tests, selected syntax cases and the displayed C++ counterparts.

Document checks also resolved 268 local links across the study material and confirmed the original 250-question bank is byte-for-byte identical to its pre-update Git version. Link checking ignores fenced/inline code so C++ lambda syntax is not mistaken for a Markdown link.
