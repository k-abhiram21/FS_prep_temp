# Material validation — 5 October 2026

Run `python DS/validation/check_fs_materials.py` from the repository root (or run that script by its absolute path).

## Checks included

- 250 contiguous question IDs, four distinct choices per new question, exactly one mapped answer, 250 hidden-answer blocks; all 30 original Day 3 questions retained; 30 unique diagnostic IDs.
- 71 distinct LeetCode IDs, each Solved/New label checked against the complete 144-ID pasted inventory.42 are reported solved, 29 absent. This is a paste comparison, not a live account check.
- 17 caption exports with auto-caption headers and timestamped content, plus local document-link checks. The source map lists their individual end times.
- **40 selected new MCQ answers** checked using small oracles (with fractional value supported by the separate C++ oracle): subset/permutation enumeration, stairs, Fibonacci call counts, exact traces, median of the merged multiset, stock DP, grid components, N-Queens, gold paths, bike assignments and bit operations. See the script for the exact checked questions; this does not mechanically prove every explanation.
- C++17 reference suite: 2000 seeded sorting/majority trials; exhaustive minimum-product subsets for every array of lengths 1–6 over−2..2; Maximum Swap compared against all possible one-swaps for inputs 0..9999; fractional knapsack compared against whole-subset/one-fraction enumeration; greedy coins compared with optimal DP for the declared denomination family amounts 0..500; activity selection against subset enumeration; power edge cases; LCP; generated abbreviations and Gray-code uniqueness/adjacency/closure.
- Valid C++/Java trace snippets compiled and executed for output/update order, strings/builders, arithmetic and the changing-queue-bound bug. Deliberately undefined/nonterminating snippets are not executed to manufacture outputs.

The C++ reference checks use `-Wall -Wextra -Wpedantic -Werror` plus address/undefined-behavior sanitizers. LeakSanitizer is disabled because this host runs under ptrace and its leak check fails for that environmental reason; address/undefined checks remain enabled. Binaries and generated compilation files are temporary. No college/LeetCode submissions or installations are performed.

## Limits

Tests validate implementations under the stated local contracts and selected question answers. They do not establish lecturer-screen equivalence, exhaust every input/type beyond those contracts, verify unknown assignment statements, or predict exam coverage. Days 4–10 are user summaries; Days 11–27 are auto-captions. No claim is made that the full FS MCQ syllabus across all subjects is covered by this DAA file.

**Latest run:** PASS — bank structure, solved-status mapping, source/link checks, 40 selected answers, C++ reference checks and compiled C++/Java traces.
