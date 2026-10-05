# Coding gaps beyond revising accepted LeetCode answers

The class-specific gaps are mostly **methods and problem contracts**. A previously solved LC169 can still leave a majority-D&C gap; LC152 does not cover minimum-product subset. Sources: [lecture coverage](FS_Lecture_Coverage.md) and [concept notes](FS_Concept_Notes.md).

First attempt without viewing [the C++17 reference](code/fs_gap_reference.hpp). Reference code covers the selected recursion, array/string and elementary greedy exercises only. Graph/tree/search concepts stay in the MCQ track under [the FS workflow](Study_Workflow.md). Small input contracts below are deliberate and are not invented college-judge constraints. Adapt them only after reading the actual lab statement.

## Minimum local repair set

Use this inside the existing DAA study blocks: **G1/G2 paper traces**, **G6 one full coding attempt**, and **G7/G8 short edge-case drills**. If majority or power is weak, replace an optional LeetCode attempt with G3/G4. These do not all require separate submissions.

### G1 — implement and trace the class partition (Days 4–5)

Input: integer vector, inclusive valid range [lo,hi]. Partition around the last value with strict `<`, return the final pivot index. Do not use a library sort. Then recursively sort the two ranges excluding the pivot. Assume n≤2000 for this local drill; quadratic cases are intentional.

Required outputs after **one partition**: `[60,50,20,70,30]`→`[20,30,60,70,50]`,index1; `[91,22,3,1,66,7,9,2]`→`[1,2,3,91,66,7,9,22]`,index1. Explain equality on `[5,5,5,5]` and why pivot inclusion can prevent progress. Θ(n) partition; quicksort expected/balanced Θ(nlogn), worst Θ(n²); stack differs from partition storage.

Extra method drill: low-pivot mirror with right-to-left scan and `>`; do not mix the two methods' states. Reference functions: partitionLast, partitionFirst, quickSort.

### G2 — merge sort with observation points (Day 6)

Input n≤2000 integers, return ascending vector. Implement merge, recursive split, draining and a shared buffer. Record the full array **after both child sorts, before final merge** for `[6,5,4,3,2,1]`: `[4,5,6,1,2,3]`. Check empty, singleton, equal and negative values. Explain why `<=` choosing the left run preserves equal-record order. Θ(nlogn), O(n) buffer plus O(logn) stack. LC912 can judge the sorted result, but acceptance alone does not check these observations. Reference: mergeSort.

### G3 — majority D&C with optional result (Days 4–5)

Input nonempty vector, n≤2000, any signed int values. Return the majority **only if it exists**; use an optional result rather than a sentinel. Combine candidates by counting in the current interval, then verify the final root candidate.

Cases: `[2,2,1,2]`→2; `[1,2,3,4]`→no majority; `[-1,-1,2]`→−1. Compare with Boyer–Moore+verification: same answer, Θ(n) versus worst Θ(nlogn), constant versus logarithmic stack. Demonstrate that the voting count is not frequency. Reference: majorityDivideConquer, majorityVote.

### G4 — one-half recursive power (Days 4–5)

Input double x and signed32-bit n; exclude x=0,n<0. Return x^n approximately. Use one recursive half result and widen n before negation. Cases: (2,10)→1024; (2,−3)→0.125; (−2,3)→−8; (1,INT_MIN)→1. Discuss overflow/underflow of floating point separately from exponent overflow. Θ(log|n|) calls/stack for nonzero exponent. Reference: power.

### G5 — prefix methods, not extra duplicate submissions (Days 10–11)

On your solved LC14, implement column scanning once, then explain a per-column set with clear() and compare prefix-length binary search's character cost. Inputs `['gene','genesis','general']`→`'gene'`; `['','abc']`→`''`; `[]`→`''` under our stated policy. A set retained across columns breaks correctness. Reference: longestCommonPrefix (column method).

### G6 — fractional knapsack (Day 14): genuinely new greedy task

Input at most200 items `(value,weight)`, integer0≤value≤10^6,1≤weight≤10^6, integer capacity0..10^6. Each item can be taken at most once, **fractions permitted**. Output maximum value and fractions in original item order. Sort density descending, take whole items then at most one partial item. Zero-value items can be omitted.

Cases: [(60,10),(100,20),(120,30)],cap50→240,fractions[1,1,2/3]; cap0→0; empty→0; [(10,4),(9,3)],cap3→9. Sorting Θ(nlogn); O(n) selected fractions/sorted records. Explain why density beats raw value and why 0/1 changes correctness. Reference: fractionalKnapsack.

### G7 — coin greedy and its failure (Day 14)

Input positive distinct coin values, unlimited supply, amount≥0. Return the chosen counts **and leftover**, with no promise of minimum count for arbitrary values. For the local guaranteed denomination family use [1,2,5,10,20,50,100]; trace amount93→50+20+20+2+1,5 coins. For [1,3,4,5],amount7 greedy gives5+1+1, while3+4 uses2. [4,6],amount5 leaves1 after taking4; do not report exact change.

Implement denomination counts using amount/coin and amount%=coin, rather than storing amount many1s. O(klogk) including sorting/O(k) scan and output. Arbitrary optimal coin change is a DP/MCQ contrast, not an extra compulsory implementation. Reference: greedyCoins.

### G8 — minimum product of a nonempty subset (Days 16–17)

Input 1≤n≤12, integer values in [−10,10], output minimum product of any nonempty subset. These bounds keep every intermediate product within signed64-bit. Array positions are distinct choices; subset need not be contiguous.

Cases: [−2,−3,−4,4]→−96; [−2,−3,4]→−12 (drop−2); [0,0]→0; [2,3]→2; [−1,0]→−1; [−1,−1]→−1. Explain all-positive, zeros, odd/even negatives, and why closest-to-zero negative is dropped. Θ(n) time/O(1) state. Validate small cases against enumerating all nonempty subsets. Reference: minimumSubsetProduct. This is not LC152.

### G9 — activity selection (extension to class greedy)

Input n≤200 activities [start,end), start<end. Return a maximum-cardinality compatible selection. Sort by end time, accept start≥last end. `[1,3),[2,4),[3,5),[0,6),[5,7)`→3 activities ([1,3),[3,5),[5,7)). Empty→0; touching endpoints allowed. Do not claim it maximizes total duration/value. Θ(nlogn) sorting; O(n) output. LC435 tests the related removal count. Reference: selectActivities.

### G10 — maximum swap method trace (Day 18)

Use new LC670, or a local nonempty decimal string of length≤1000 (no leading zeros except '0'). Return the maximum string after at most one swap. Cases: '2736'→'7236'; '9973' unchanged; '1993'→'9913'; '84725'→'87425'. Build suffix maximum indices with rightmost ties. Θ(d) time/O(d) storage, no numeric parsing needed. Reference: maximumSwapDigits.

## Optional string/recursion breadth — do after repairing foundations

### G11 — flat brace choices (Day 26 prerequisite)

Input a list of choice strings, each containing unique characters, 0≤groups≤8, each size1..4. Generate each Cartesian choice string once and sort results. `['ab','c','de']`→`['acd','ace','bcd','bce']`; zero groups yields one empty string (concatenation identity). This is a **flat choice representation**, not a full nested-brace parser. The nested grammar is explained/tested in notes and MCQs. Output O(groups·product of choice sizes) characters, plus sorting cost. Reference: expandFlatChoices.

### G12 — generalized abbreviations (Day 27)

Input alphabetic word, 0≤length≤12; return all abbreviation strings. `ANT`→ANT,AN1,A1T,A2,1NT,1N1,2T,3 (order not mandated). Empty→one empty string. Keep a pending count, flush before a literal/at leaf. 2^n outputs, O(n2^n) character upper bound; stack O(n) excluding output and string construction. Reference: abbreviations. Locked LC320 need not prevent local practice.

### G13 — reflected Gray construction (extension to Day 27)

Input1≤n≤16. Return `[i^(i>>1) for i in 0..2^n−1]`. Check range, count, uniqueness and **both** adjacent and wraparound one-bit differences. n3→0,1,3,2,6,7,5,4. Θ(2^n) time/output word space. Explain class XOR-neighbour search too; this construction is a different, simpler method. Reference: reflectedGray.

For recursive strobogrammatic checking/generation, use the already prepared [Day 3 exercises](Day_03_Practice.md) and [reference](code/day03_reference.cpp); there is no need to recreate them.

## Paper/MCQ drills, without new full implementation obligations

Sorted ones/occurrence pruning; fixed-point assumptions; row-common-element dedup; Koko ceiling/monotonicity; median partitions; graph representation; Dijkstra/Prim comparison; DSU/Kruskal; BFS/DFS/maze; islands; tree boundary/symmetry/balance/average; N-Queens/gold; Hamiltonian; minimum-distance bike assignment. Their exact worked rules are in [concept notes](FS_Concept_Notes.md) and scenario questions in [the bank](FS_DAA_MCQ_Bank.md).

## Run the references after your attempts

```bash
python DS/validation/check_fs_materials.py
```

This compiles/runs the C++ checks into a temporary directory and checks the bank's structure and solved-status mapping. It does not submit to LeetCode/college or verify what the test will ask. Reference input contracts are documented here and enforced where needed.
