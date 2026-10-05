# Complete DAA scenario-MCQ bank — Days 1–27

**250 questions**, prepared 5 October 2026. Original practice, including all 30 questions from the existing Day 3 bank. This covers the substantive DAA topics identified in your sources plus marked extensions; it is **not a list of actual or guaranteed exam questions**, nor a complete bank for SE/WT/CN/AI/Java/Python. The notice's 30 MCQs span subjects; no DAA weightage is known.

Every new snippet is an original reconstruction, not an exact transcription of screen code. Days 4–10 rely on your summary; Days 11–27 use retrieved auto-captions. Read [source map](FS_Lecture_Coverage.md) and [concept notes](FS_Concept_Notes.md) to repair mistakes. Class-based questions include added edge cases/corrected claims; **Extension** marks a technique/contract beyond confirmed teaching.

Unless stated otherwise: C++17, zero-based indexes, valid stated inputs, fixed-width arithmetic fits; pseudocode uses mathematical integers and the explicitly given division rule. Java/Python questions name their language. Complexity separates output/auxiliary storage and counts copies/comparisons by length. Deliberately faulty C++ code receives no fabricated output for undefined behavior. Answers are hidden below each question.

## How to use

Start with the 30-question DAA diagnostic below; allow 30 minutes, skip a long trace and return. Review explanations without a timer. This is practice at the exam's one-minute average, not a claim every question needs exactly one minute. Do 10–15 targeted questions per later session and record **failed assumption → smallest counterexample → correct rule → reattempt date**. Do not rush the whole bank before the test.

Diagnostic IDs: Q1, Q7, Q21, Q27, Q32, Q37, Q43, Q49, Q55, Q60, Q65, Q70, Q77, Q83, Q92, Q98, Q103, Q108, Q112, Q117, Q123, Q128, Q136, Q142, Q156, Q161, Q166, Q181, Q191, Q196. This is a DAA-only diagnostic; use the other subjects to build a real mixed mock.

## Topic index

| Topic | Questions | Evidence |
|---|---|---|
| Foundations and output cost | Q1–Q6 | Days 1–2; Day_01_Notes.md and Day_02_Notes.md |
| Recursion, Fibonacci and stairs | Q7–Q14 | Days 1–2 |
| Strings, containers and language costs | Q15–Q20 | Days 2, 10–11; extensions labelled |
| Quicksort partition traces | Q21–Q26 | Days 4–5 summary |
| Majority candidates and voting | Q27–Q31 | Days 4–5 summary |
| Fast power and overflow boundaries | Q32–Q36 | Days 4–5 summary |
| Merge sort and intermediate states | Q37–Q42 | Day 6 summary |
| Recurrence analysis | Q43–Q48 | Day 7 summary |
| Sorted counts and search boundaries | Q49–Q54 | Days 7–9 summary |
| Search variants and assumptions | Q55–Q59 | Days 8–9 summary |
| LCP method and state traps | Q60–Q64 | Days 10–11 |
| Koko feasibility and numeric safety | Q65–Q69 | Days 10–11 |
| Median merging and partitions | Q70–Q76 | Days 11–13 |
| Fractional knapsack and greedy proof | Q77–Q82 | Day 14 |
| Coins and activity selection | Q83–Q87 | Day 14; activity selection is an extension |
| Graph representation costs | Q88–Q91 | Days 14–15 |
| Dijkstra distance traces | Q92–Q97 | Days 14–15 |
| Stock contracts | Q98–Q102 | Days 15–16 |
| Minimum subset product | Q103–Q107 | Days 16–17 |
| Maximum Swap suffix state | Q108–Q111 | Day 18 after about 1: 07 |
| Spanning trees and Prim | Q112–Q116 | Days 16–17 |
| DSU parent, root and rank | Q117–Q122 | Days 17–18 |
| Kruskal edge decisions | Q123–Q127 | Day 18 |
| BFS queue and discovery | Q128–Q132 | Days 19–21 |
| Lonely-node structure | Q133–Q135 | Days 19–20 |
| Islands, area and shape | Q136–Q141 | Days 19–20 |
| DFS and the actual class maze | Q142–Q147 | Days 21–22 |
| Binary-tree boundary | Q148–Q151 | Day 22 |
| Tree conventions and symmetry | Q152–Q155 | Days 23–24 |
| Balanced-tree height propagation | Q156–Q160 | Days 23–24 |
| Level averages by BFS/DFS | Q161–Q165 | Days 23–24 |
| Backtracking and N-Queens | Q166–Q171 | Day 25 |
| Maximum gold path state | Q172–Q175 | Day 25 after about 58: 00 |
| Hamiltonian safety and closure | Q176–Q180 | Day 26 |
| Brace union, product and nesting | Q181–Q185 | Day 26 after about 1: 00 |
| Gray code and bit flips | Q186–Q190 | Day 27 before about 47: 50 |
| Campus Bikes minimum-total objective | Q191–Q195 | Day 27 around 47: 50–1: 11 |
| Generalized abbreviations | Q196–Q200 | Day 27 after about 1: 11 |
| Assignment-linked extensions | Q201–Q204 | Assignment titles only; not confirmed explained in these lectures |
| Longer code traces and transfer repairs | Q205–Q220 | Mixed class-based reconstructions; individual days named |
| Day 3 integrated scenarios: GCD, strobogrammatic generation, prime/palindrome | Q221–Q250 | Day 3; all existing 30 questions |


## Foundations and output cost

Evidence: Days 1–2; Day_01_Notes.md and Day_02_Notes.md. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q1 — One zero versus two

**Class-based scenario.** For product-except-self without division, what is the output for `[2,0,4,0]`?

A. [0, 8, 0, 8]  
B. [8, 0, 8, 0]  
C. Division by zero is unavoidable  
D. [0, 0, 0, 0]  

<details><summary>Answer and explanation</summary>

**D. [0, 0, 0, 0]**

Every exclusion still leaves at least one zero. Prefix/suffix products handle this without division; a one-zero special case cannot be reused for two zeros.

</details>

### Q2 — Prefix observation

**Class-based scenario.** Pseudocode: `p=1; for i=0..3: ans[i]=p; p*=a[i]`, with a=[2, 3, 4, 5]. What is ans before the suffix pass?

A. [2, 6, 24, 120]  
B. [60, 40, 30, 24]  
C. [1, 2, 6, 24]  
D. [1, 3, 12, 60]  

<details><summary>Answer and explanation</summary>

**C. [1, 2, 6, 24]**

Write the prefix before multiplying the current element. Each position then excludes itself on the left; the suffix pass supplies its right product.

</details>

### Q3 — Space accounting

**Class-based scenario.** A Θ(n) product-except-self algorithm stores prefixes in the returned n-element vector and uses two scalar accumulators. Ignoring output storage, what is auxiliary space?

A. Θ(n)  
B. Θ(1)  
C. Θ(log n)  
D. Θ(n²)  

<details><summary>Answer and explanation</summary>

**B. Θ(1)**

The required output uses Θ(n) storage but is explicitly excluded here. Count any extra prefix/suffix arrays if the implementation allocates them.

</details>

### Q4 — A bound is not a case name

**Class-based scenario.** A worst-case runtime is T(n)=3n+7. Which statement is correct?

A. It is both O(n) and Ω(n), hence Θ(n)  
B. Ω(n) describes only its best case  
C. O(n²) is false because it is not tight  
D. Θ(n) means average-case only  

<details><summary>Answer and explanation</summary>

**A. It is both O(n) and Ω(n), hence Θ(n)**

Bounds apply to the specified runtime function. O(n²) is also a valid loose upper bound; Ω does not change which case is being measured.

</details>

### Q5 — Output dominates

**Class-based scenario.** A program returns every permutation of n distinct characters as independent length-n strings. Even if recursion bookkeeping were free, what materialized-output lower bound applies?

A. Ω(n!) only, including all character writes  
B. Θ(log n) total space  
C. O(n²) output time  
D. Ω(n·n!) character writes  

<details><summary>Answer and explanation</summary>

**D. Ω(n·n!) character writes**

There are n! strings of length n. Fixed-word pointer references are not equivalent to independently materialized strings.

</details>

### Q6 — Repeated letters

**Class-based scenario.** How many distinct complete strings can be formed by permuting `AABC`?

A. 24  
B. 8  
C. 12  
D. 6  

<details><summary>Answer and explanation</summary>

**C. 12**

Four positions yield 4! index permutations; exchanging the two A positions does not create a new string, so divide by 2!.

</details>


## Recursion, Fibonacci and stairs

Evidence: Days 1–2. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q7 — Unwinding output

**Class-based scenario.** C++17: `void f(int n){if(n==0)return; f(n-1); cout<<n;}`. What is printed by f(3)?

A. 321  
B. 123  
C. 0123  
D. Nothing  

<details><summary>Answer and explanation</summary>

**B. 123**

The recursive call completes before each print. Stack depth is linear even though output rises from 1 to3.

</details>

### Q8 — Both sides of the call

**Class-based scenario.** C++17: `void f(int n){if(n==0)return; cout<<n; f(n-1); cout<<n;}`. What is printed by f(3)?

A. 321123  
B. 321321  
C. 123321  
D. 332211  

<details><summary>Answer and explanation</summary>

**A. 321123**

Entry prints3, 2, 1; unwind prints1, 2, 3. The base call prints nothing.

</details>

### Q9 — Post-decrement fails progress

**Class-based scenario.** Java, deliberately faulty: `static int f(int n){if(n==0)return 0;return f(n--);}`. What happens for f(2)?

A. Returns0  
B. Returns2  
C. Compile-time error  
D. Repeated calls receive2; eventually StackOverflowError  

<details><summary>Answer and explanation</summary>

**D. Repeated calls receive2; eventually StackOverflowError**

Post-decrement passes the old value into the child. The suspended caller decrement does not change the child parameter.

</details>

### Q10 — Fibonacci call counter

**Class-based scenario.** Pseudocode: `fib(n): calls++; if n<=1 return n; return fib(n-1)+fib(n-2)`. Starting calls=0, how many invocations for fib(5), including bases?

A. 5  
B. 8  
C. 15  
D. 31  

<details><summary>Answer and explanation</summary>

**C. 15**

C(0)=C(1)=1 and C(n)=1+C(n−1)+C(n−2): C2=3,C3=5,C4=9,C5=15. Sequence value5 is not call count.

</details>

### Q11 — Time versus active stack

**Class-based scenario.** For unmemoized fib(n)=fib(n−1)+fib(n−2), n≥2, which pair describes time and stack?

A. Exponential time and exponential simultaneous stack  
B. Exponential time, Θ(n) stack  
C. Θ(n) time and Θ(log n) stack  
D. Θ(n²) time and Θ(1) stack  

<details><summary>Answer and explanation</summary>

**B. Exponential time, Θ(n) stack**

Both branches perform work, but they execute at different times; maximum live path has depth n.

</details>

### Q12 — State recursion

**Class-based scenario.** Java: `f(n,a,b){if(n==0)return a;return f(n-1,b,a+b);}` with arbitrary-size arithmetic ignored. For f(n, 0, 1), what is guaranteed?

A. Θ(n) time and Θ(n) call-stack space  
B. Θ(n) time and guaranteed Θ(1) stack  
C. Exponential time  
D. Θ(log n) time  

<details><summary>Answer and explanation</summary>

**A. Θ(n) time and Θ(n) call-stack space**

Each call decreases n by1 and does constant bookkeeping. Java does not guarantee tail-call elimination.

</details>

### Q13 — Ways at zero

**Class-based scenario.** Counting ordered jumps of length 1 or2: ways(n)=ways(n−1)+ways(n−2), ways(0)=1, ways(n<0)=0. What is ways(4)?

A. 3  
B. 4  
C. 8  
D. 5  

<details><summary>Answer and explanation</summary>

**D. 5**

The sequences are1111, 112, 121, 211, 22. The empty sequence makes ways(0)=1 and supplies the correct recurrence base.

</details>

### Q14 — Generalized jumps

**Class-based scenario.** Ordered jumps1..3 with ways(0)=1 and ways(n<0)=0. What is ways(4)?

A. 4  
B. 6  
C. 7  
D. 8  

<details><summary>Answer and explanation</summary>

**C. 7**

Ways1=1, 2=2, 3=4; ways4=4+2+1=7. An unordered coin-combination count answers another question.

</details>


## Strings, containers and language costs

Evidence: Days 2, 10–11; extensions labelled. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q15 — Discarded immutable result

**Class-based scenario.** Java: `String s="abc"; s.concat("d"); System.out.print(s);` What prints?

A. abcd  
B. abc  
C. d  
D. A compilation error  

<details><summary>Answer and explanation</summary>

**B. abc**

concat returns a new string; the existing immutable object is not changed and the return value is discarded.

</details>

### Q16 — Shared builder

**Class-based scenario.** Java: `StringBuilder a=new StringBuilder("ab"); StringBuilder b=a; b.append("c"); System.out.print(a);` What prints?

A. abc  
B. ab  
C. c  
D. An exception  

<details><summary>Answer and explanation</summary>

**A. abc**

Both references point to the same mutable builder. Reassignment of b to a new builder would be a different operation.

</details>

### Q17 — Reversal recursion space

**Class-based scenario.** An in-place char-array reversal recursively swaps endpoints then calls reverse(lo+1,hi−1). For length n, absent guaranteed tail-call optimization, what is auxiliary space?

A. Θ(1) because swaps are in-place  
B. Θ(n²)  
C. Θ(log n)  
D. Θ(n) stack  

<details><summary>Answer and explanation</summary>

**D. Θ(n) stack**

There are about n/2 nested calls. The array is not duplicated, but the active call frames still consume linear space.

</details>

### Q18 — Happy-number cycle

**Class-based scenario.** Repeatedly replace a positive integer by the sum of squared decimal digits. Why is “return false after10 steps” not a correctness criterion?

A. Every integer reaches1 in10 steps  
B. The map must store all integers ever existing  
C. An arbitrary cap lacks a proof; use repeated-state detection or a proven cycle test  
D. The transformation always strictly decreases  

<details><summary>Answer and explanation</summary>

**C. An arbitrary cap lacks a proof; use repeated-state detection or a proven cycle test**

The process eventually enters a cycle in a bounded region, but individual steps need not decrease. Visiting1 means happy; repeating another state means unhappy.

</details>

### Q19 — Signed division

**Class-based scenario.** Which pair is produced by Java `-3/2` and Python `-3//2`, respectively?

A. (-2,-2)  
B. (-1,-2)  
C. (-1,-1)  
D. (-2,-1)  

<details><summary>Answer and explanation</summary>

**B. (-1,-2)**

Java truncates toward zero; Python floor division rounds down. Do not substitute floor for truncation when tracing negative exponents.

</details>

### Q20 — Hidden copying

**Extension.** Python extension: a recurrence makes two recursive calls on copied halves `a[:mid]` and `a[mid:]`, with no other work. What recurrence counts copying at each non-base call?

A. T(n)=2T(n/2)+Θ(n)  
B. T(n)=2T(n/2)+Θ(1)  
C. T(n)=T(n−1)+Θ(1)  
D. T(n)=Θ(log n)  

<details><summary>Answer and explanation</summary>

**A. T(n)=2T(n/2)+Θ(n)**

Slice construction copies elements proportional to total half lengths. Passing index intervals avoids that copying toll.

</details>


## Quicksort partition traces

Evidence: Days 4–5 summary. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q21 — Exact partition state

**Class-based scenario.** Last-pivot Lomuto, strict `<`, i=lo; swap passing elements into i then swap a[i],a[hi]. After one partition of [60, 50, 20, 70, 30], which result is correct?

A. [20, 30, 50, 60, 70], index1  
B. [30, 20, 60, 70, 50], index0  
C. [20, 50, 30, 70, 60], index2  
D. [20, 30, 60, 70, 50], pivot index1  

<details><summary>Answer and explanation</summary>

**D. [20, 30, 60, 70, 50], pivot index1**

Only20 is smaller than30. Its scan swap precedes the pivot swap; the right side is not yet sorted.

</details>

### Q22 — Duplicates and strict comparison

**Class-based scenario.** Same partition on [5, 5, 5, 5] with lo0,hi3. Where is the pivot placed?

A. Index1  
B. Index2  
C. Index0  
D. Index3  

<details><summary>Answer and explanation</summary>

**C. Index0**

No scanned value is strictly smaller, so i stays0. Equal values move to the right partition and cause a degenerate recursion.

</details>

### Q23 — Comparison changed

**Class-based scenario.** Change Lomuto condition to `a[j]<=pivot`, keeping all other rules. On [5, 5, 5, 5], pivot index?

A. 0  
B. 3  
C. 1  
D. 2  

<details><summary>Answer and explanation</summary>

**B. 3**

Every scanned equal value advances i. The degeneration moves to the opposite side; changing equality does not balance all-equal input.

</details>

### Q24 — Nonshrinking interval

**Class-based scenario.** Faulty quicksort: after last-pivot partition p, recurse `[lo,p]` and `[p+1,hi]`. Which input can make a branch retain the entire original range?

A. [1, 2, 3, 4] with last pivot  
B. Only an empty input  
C. Every input must terminate anyway  
D. Only mixed positive/negative values  

<details><summary>Answer and explanation</summary>

**A. [1, 2, 3, 4] with last pivot**

Pivot4 is placed at hi; [lo,p] then equals the old interval. For Lomuto, exclude p from both recursive ranges.

</details>

### Q25 — Linear stack despite in-place

**Class-based scenario.** Strict last-pivot quicksort runs on an already sorted array of n distinct values. Time and maximum recursive depth?

A. Θ(nlogn), Θ(logn)  
B. Θ(n²), Θ(1)  
C. Θ(nlogn), Θ(n)  
D. Θ(n²) time, Θ(n) depth  

<details><summary>Answer and explanation</summary>

**D. Θ(n²) time, Θ(n) depth**

Partition sizes repeatedly become n−1 and0. In-place partition does not remove call frames.

</details>

### Q26 — Randomization guarantee

**Class-based scenario.** After choosing pivots uniformly at random, which statement is valid for quicksort on distinct keys?

A. Every execution is Θ(nlogn)  
B. The algorithm becomes stable  
C. Expected Θ(nlogn), but a Θ(n²) worst case remains  
D. Worst-case stack becomes Θ(1)  

<details><summary>Answer and explanation</summary>

**C. Expected Θ(nlogn), but a Θ(n²) worst case remains**

Expected behavior is over pivot choices. Extremely unbalanced choices are still possible; swaps still do not ensure stability.

</details>


## Majority candidates and voting

Evidence: Days 4–5 summary. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q27 — Strict majority

**Class-based scenario.** For n=6, which minimum frequency satisfies the majority definition?

A. 3  
B. 4  
C. 2  
D. 6  

<details><summary>Answer and explanation</summary>

**B. 4**

A majority exceeds n/2, rather than merely attaining half. n/2 equal-frequency candidates may tie without a majority.

</details>

### Q28 — Vote counter is not frequency

**Class-based scenario.** Voting sets candidate when count0, then +1 for match/−1 otherwise. For [1, 2, 2, 2, 1, 1, 1, 1, 1, 2], what are final candidate/count?

A. (1, 2)  
B. (1, 6)  
C. (2, 4)  
D. (2, 0)  

<details><summary>Answer and explanation</summary>

**A. (1, 2)**

Cancellation discards opposing votes. There are six1s but only a surplus count2 at the end.

</details>

### Q29 — Missing promise

**Class-based scenario.** Voting on [1, 2, 3, 4] returns a candidate. What is the necessary final step to support a general majority/no-majority interface?

A. Return the final positive counter  
B. Return a[n/2] without checking  
C. Require candidate>0  
D. Count candidate occurrences and require >n/2  

<details><summary>Answer and explanation</summary>

**D. Count candidate occurrences and require >n/2**

Neither a surviving candidate nor a middle sorted element proves existence when the majority promise is absent.

</details>

### Q30 — D&C complexity

**Class-based scenario.** D&C majority with index ranges: two half candidates, if unequal count both in the current interval. Worst-case time/stack?

A. Θ(n) time, O(n) stack  
B. Θ(n²) time, O(1) stack  
C. Θ(nlogn) time, O(logn) stack  
D. Exponential time  

<details><summary>Answer and explanation</summary>

**C. Θ(nlogn) time, O(logn) stack**

Linear combining at each of logarithmically many levels gives nlogn. Equality can skip a combine, but that is not the worst-case guarantee.

</details>

### Q31 — Sentinel collision

**Class-based scenario.** An implementation uses return−1 to mean no majority, while inputs may contain−1. What makes its interface ambiguous?

A. Negative values can never have majority  
B. [-1,-1, 2] has legitimate majority−1  
C. Sorting removes all negative values  
D. Only odd-sized arrays fail  

<details><summary>Answer and explanation</summary>

**B. [-1,-1, 2] has legitimate majority−1**

Use optional/status+value. Numeric sentinel choice cannot distinguish this valid answer from absence.

</details>


## Fast power and overflow boundaries

Evidence: Days 4–5 summary. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q32 — Count single-half calls

**Class-based scenario.** Pseudocode: p(n) counts entry; if n==0 return1; t=p(floor(n/2)); return even? t*t:t*t*x. Calls for n=13, including base?

A. 5  
B. 4  
C. 13  
D. 15  

<details><summary>Answer and explanation</summary>

**A. 5**

Arguments13, 6, 3, 1, 0 form five entries. Multiplication values do not add recursive calls.

</details>

### Q33 — Duplicated half

**Class-based scenario.** For positive n, code evaluates `power(x,n/2)*power(x,n/2)` as two independent calls at every level. What time bound replaces logarithmic time?

A. Θ(logn)  
B. Θ(nlogn)  
C. Θ(2^n)  
D. Θ(n)  

<details><summary>Answer and explanation</summary>

**D. Θ(n)**

There are two half-sized calls: T(n)=2T(n/2)+Θ(1). The active depth is still logarithmic.

</details>

### Q34 — Widen before negation

**Class-based scenario.** Java int n=Integer.MIN_VALUE. Which conversion correctly produces its positive magnitude?

A. `long e=-n;`  
B. `int e=Math.abs(n);`  
C. `long e=n; e=-e;`  
D. `long e=(long)(-n);`  

<details><summary>Answer and explanation</summary>

**C. `long e=n; e=-e;`**

The negation must occur after widening. Negating MIN_VALUE as int wraps to itself; casting afterwards is too late.

</details>

### Q35 — Integer reciprocal

**Class-based scenario.** C++17: `int x=2; double y=1/x;` What is y?

A. 0.5  
B. 0.0  
C. 2.0  
D. Undefined behavior  

<details><summary>Answer and explanation</summary>

**B. 0.0**

Integer operands perform integer division first; conversion to double occurs after the quotient. Use1.0/x.

</details>

### Q36 — Negative base

**Class-based scenario.** A correct single-half power implementation computes power(−2,−3). Result?

A. -0.125  
B. 0.125  
C. -8  
D. 0  

<details><summary>Answer and explanation</summary>

**A. -0.125**

Negative exponent takes the reciprocal; odd exponent preserves negative sign. This is distinct from integer reciprocal truncation.

</details>


## Merge sort and intermediate states

Evidence: Day 6 summary. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q37 — Before final merge

**Class-based scenario.** Conventional recursive merge sort has finished both child sorts of [6, 5, 4, 3, 2, 1]. Full array immediately before the top merge?

A. [6, 5, 4, 3, 2, 1]  
B. [1, 2, 3, 4, 5, 6]  
C. [3, 2, 1, 6, 5, 4]  
D. [4, 5, 6, 1, 2, 3]  

<details><summary>Answer and explanation</summary>

**D. [4, 5, 6, 1, 2, 3]**

The halves are individually sorted and have already been written back. Only the final cross-half merge remains.

</details>

### Q38 — Inclusive split lengths

**Class-based scenario.** lo=2,hi=7,mid=lo+(hi−lo)/2=4. Left and right buffer lengths?

A. (2, 4)  
B. (2, 3)  
C. (3, 3)  
D. (3, 4)  

<details><summary>Answer and explanation</summary>

**C. (3, 3)**

Left includes both endpoints2 and4: 3 elements. Right spans5..7:hi−mid=3.

</details>

### Q39 — Stability on ties

**Class-based scenario.** Left run records [(2,A),(2,B)], right [(2,C)]. The merge chooses right whenever keys tie. Output label order?

A. A,B,C; stable  
B. C,A,B; not stable  
C. A,C,B; stable  
D. B,A,C; always stable  

<details><summary>Answer and explanation</summary>

**B. C,A,B; not stable**

The right record originally followed the left run but overtakes it. Sorted keys alone do not imply stability.

</details>

### Q40 — Remaining run

**Class-based scenario.** Merging [1, 4] and [2, 3, 5], the main two-nonempty loop ends. Which remaining item must be appended?

A. 5  
B. 4  
C. 3  
D. None  

<details><summary>Answer and explanation</summary>

**A. 5**

Selections1, 2, 3, 4 exhaust the left run. A separate drain handles remaining right items.

</details>

### Q41 — Sorted input time

**Class-based scenario.** Unoptimized merge sort always recurses and merges on sorted input of n elements. Tight time?

A. Θ(n)  
B. Θ(logn)  
C. Θ(n²)  
D. Θ(nlogn)  

<details><summary>Answer and explanation</summary>

**D. Θ(nlogn)**

Without an explicit already-ordered merge-skip, the same per-level work occurs. Do not transfer quicksort or insertion-sort cases blindly.

</details>

### Q42 — Peak versus cumulative memory

**Class-based scenario.** A conventional merge sort allocates merge buffers on demand and releases them when each merge finishes. Which statement can be true?

A. Both quantities must be O(1)  
B. Cumulative allocations equal peak by definition  
C. Peak O(n) live buffer space and Θ(nlogn) cumulative allocated elements  
D. Peak Θ(n²) for every version  

<details><summary>Answer and explanation</summary>

**C. Peak O(n) live buffer space and Θ(nlogn) cumulative allocated elements**

Summing allocations over all levels counts lifetime traffic, not simultaneous memory. Stack adds O(logn).

</details>


## Recurrence analysis

Evidence: Day 7 summary. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q43 — Root-dominated case

**Class-based scenario.** T(n)=3T(n/2)+Θ(n²), base constant. Tight bound?

A. Θ(n²logn)  
B. Θ(n²)  
C. Θ(n^(log₂3))  
D. Θ(n³)  

<details><summary>Answer and explanation</summary>

**B. Θ(n²)**

a3 is below b^d=4. Work per level shrinks geometrically relative to root toll.

</details>

### Q44 — Equal case

**Class-based scenario.** T(n)=4T(n/2)+Θ(n²). Tight bound?

A. Θ(n²logn)  
B. Θ(n²)  
C. Θ(n⁴)  
D. Θ(nlogn)  

<details><summary>Answer and explanation</summary>

**A. Θ(n²logn)**

Each level contributes Θ(n²) and there are Θ(logn) levels.

</details>

### Q45 — Leaves dominate

**Class-based scenario.** T(n)=16T(n/4)+Θ(n). Tight bound?

A. Θ(nlogn)  
B. Θ(n⁴)  
C. Θ(logn)  
D. Θ(n²)  

<details><summary>Answer and explanation</summary>

**D. Θ(n²)**

log₄16=2 exceeds the toll exponent1. Leaves dominate.

</details>

### Q46 — Different recurrence family

**Class-based scenario.** T(n)=T(n−1)+n with T(1)=1. Tight bound and applicable method?

A. Θ(nlogn), case2  
B. Θ(n), case1  
C. Θ(n²), summation rather than this Master-Theorem form  
D. Θ(2^n), recursion tree branching  

<details><summary>Answer and explanation</summary>

**C. Θ(n²), summation rather than this Master-Theorem form**

There is one subtractively shrinking call. Sum1+2+…+n; no fixed b>1 describes n−1.

</details>

### Q47 — Level toll

**Class-based scenario.** For T(n)=3T(n/2)+n², n power of2, what is total nonrecursive work at level i?

A. n²·3^i  
B. n²·(3/4)^i  
C. n²/2^i  
D. n·(3/2)^i  

<details><summary>Answer and explanation</summary>

**B. n²·(3/4)^i**

There are3^i subproblems, each toll(n/2^i)². Multiply count by per-node toll.

</details>

### Q48 — O does not imply tightness

**Class-based scenario.** Given only T(n)=2T(n/2)+O(n), constant base, which conclusion is always supported?

A. T(n)=O(nlogn), but Θ(nlogn) is not established from that toll alone  
B. Always Θ(nlogn)  
C. Always Θ(logn)  
D. No upper bound is possible  

<details><summary>Answer and explanation</summary>

**A. T(n)=O(nlogn), but Θ(nlogn) is not established from that toll alone**

The actual toll could be constant, giving Θ(n). A tight per-level lower bound is needed for the tight nlogn claim.

</details>


## Sorted counts and search boundaries

Evidence: Days 7–9 summary. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q49 — Pruned ones call count

**Class-based scenario.** count(lo,hi) counts entry, returns0 if lo>hi or a[hi]==0, returns hi−lo+1 if a[lo]==1, else sequentially calls both halves and sums. For [0, 0, 0, 1, 1], count(0, 4) entries?

A. 5  
B. 9  
C. 1  
D. 3  

<details><summary>Answer and explanation</summary>

**D. 3**

Root splits0..2 (all0) and3..4 (all1), so two children return immediately.

</details>

### Q50 — Two calls do not force linear

**Class-based scenario.** For the pruned sorted0/1 counter above, why is worst-case time O(logn)?

A. It always makes exactly one recursive call  
B. The values are Boolean so recursion is free  
C. At most one child per level still straddles the single0/1 boundary  
D. Every node is pruned at the root  

<details><summary>Answer and explanation</summary>

**C. At most one child per level still straddles the single0/1 boundary**

The other child is pure and returns in constant time. Counting syntax instead of surviving subproblems gives the wrong recurrence.

</details>

### Q51 — Without pruning

**Class-based scenario.** A count-ones method recursively splits both halves to single elements, without endpoint shortcuts. Time?

A. Θ(logn)  
B. Θ(n)  
C. Θ(nlogn)  
D. Θ(2^n)  

<details><summary>Answer and explanation</summary>

**B. Θ(n)**

There are n leaves and a linear number of internal nodes. Balanced depth alone does not imply logarithmic total work.

</details>

### Q52 — Occurrence boundaries

**Class-based scenario.** For [1, 2, 2, 2, 4], first index of2=1,last=3. Which formula counts occurrences?

A. last−first+1=3  
B. last−first=2  
C. first+last=4  
D. last+1=4  

<details><summary>Answer and explanation</summary>

**A. last−first+1=3**

Inclusive endpoints require +1. For absent keys, handle the absence sentinel before this formula.

</details>

### Q53 — First occurrence update

**Class-based scenario.** Closed-interval binary search on equality records answer=mid. Which update seeks the earliest equal index?

A. lo=mid+1  
B. return mid immediately  
C. hi=mid while lo<=hi without another progress rule  
D. hi=mid−1  

<details><summary>Answer and explanation</summary>

**D. hi=mid−1**

The equal position is a candidate; any earlier equal must lie left. Using hi=mid with a closed loop can stall.

</details>

### Q54 — C++ call order

**Class-based scenario.** C++17: `return traceLeft()+traceRight();` Both functions print their name. What output order is guaranteed by this expression?

A. Always Left then Right  
B. Always Right then Left  
C. Neither left-first nor right-first is guaranteed  
D. Both calls are skipped  

<details><summary>Answer and explanation</summary>

**C. Neither left-first nor right-first is guaranteed**

Arithmetic operand evaluation order does not enforce a traversal order. Assign sequential temporaries when order is part of the question.

</details>


## Search variants and assumptions

Evidence: Days 8–9 summary. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q55 — Rotation convention

**Class-based scenario.** Ascending distinct [1, 2, 3, 4, 5] becomes [4, 5, 1, 2, 3]. Right-rotation count and minimum index?

A. (3, 3)  
B. (2, 2)  
C. (3, 2)  
D. (2, 3)  

<details><summary>Answer and explanation</summary>

**B. (2, 2)**

Two right rotations put the minimum at2. Three left rotations create the same array but use a different original direction count.

</details>

### Q56 — Duplicates degrade rotation search

**Class-based scenario.** An implementation compares a[mid] with a[hi] and on equality executes hi--. Worst-case runtime with duplicates?

A. O(n)  
B. O(logn) for every input  
C. O(nlogn)  
D. O(1)  

<details><summary>Answer and explanation</summary>

**A. O(n)**

All-equal intervals may shrink only one position at a time; distinctness is necessary for the simple logarithmic guarantee.

</details>

### Q57 — Fixed point fails with duplicates

**Class-based scenario.** Faulty fixed-point search uses `if a[mid]<mid: lo=mid+1` on any sorted array. Which input demonstrates losing an existing fixed point?

A. [-2,-1, 1, 3, 5] with distinct values  
B. [1, 2, 3, 4, 5] has a fixed point  
C. Every duplicate-free array fails  
D. [0, 0, 0, 0, 0]  

<details><summary>Answer and explanation</summary>

**D. [0, 0, 0, 0, 0]**

At mid2 value0 is smaller, so it discards index0 where a[0]=0. With duplicates a[i]−i need not be nondecreasing.

</details>

### Q58 — Row counting bug

**Class-based scenario.** Rows [[2, 2],[3, 4]]. A hash counter increments per occurrence and declares a value common when count equals row count2. False output?

A. 3  
B. 4  
C. 2  
D. No false output is possible  

<details><summary>Answer and explanation</summary>

**C. 2**

Two occurrences from one row imitate presence in two rows. Deduplicate each row or track last row seen.

</details>

### Q59 — Flattened ordering

**Class-based scenario.** Rows [1, 4, 7] and [2, 5, 8] are individually sorted. Can ordinary binary search on the flattened row-major array be justified?

A. Yes, row sorting implies global ordering  
B. No; the flattened sequence drops from7 to2  
C. Yes, because all values are positive  
D. Only when the target is absent  

<details><summary>Answer and explanation</summary>

**B. No; the flattened sequence drops from7 to2**

Row-wise common-element search uses each row separately. Global binary search requires a stronger ordering premise.

</details>


## LCP method and state traps

Evidence: Days 10–11. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q60 — Exact prefix

**Class-based scenario.** Longest common prefix of gene, genesis, general?

A. gene  
B. gen  
C. ge  
D. genera  

<details><summary>Answer and explanation</summary>

**A. gene**

All three begin g,e,n,e. The first string then ends, limiting the result to four characters. Trace actual characters rather than accepting a summary correction blindly.

</details>

### Q61 — Set not cleared

**Class-based scenario.** For words ["ab","ab"], a set is retained across columns; after inserting each column, code requires set.size()==1. Returned prefix length?

A. 2 correctly  
B. 0 instead of2  
C. The loop never ends  
D. 1 instead of2  

<details><summary>Answer and explanation</summary>

**D. 1 instead of2**

Column0 leaves {a}; column1 produces {a,b} despite agreement in that column. Clear per-column state.

</details>

### Q62 — Character work

**Class-based scenario.** Straightforward binary search on prefix length repeatedly scans prefixes with startsWith. On N identical strings each of length L, character work can be?

A. Θ(NlogL) automatically  
B. Θ(logL)  
C. Θ(NLlogL)  
D. Θ(N)  

<details><summary>Answer and explanation</summary>

**C. Θ(NLlogL)**

Feasible tested lengths approach L, and each check may read Θ(L) characters over Θ(logL) tests. Monotone feasibility does not make checks constant-time.

</details>

### Q63 — Java equality

**Class-based scenario.** Java: `new String("ab")==new String("ab")`. What is the value?

A. true  
B. false  
C. Compile error  
D. Depends on alphabet size  

<details><summary>Answer and explanation</summary>

**B. false**

Two explicit constructions create different objects. Use equals for equal content.

</details>

### Q64 — Empty member

**Class-based scenario.** A vertical LCP scan first computes minimum string length. For ["abc",""], what should it return under the normal contract?

A. Empty string  
B. abc  
C. An out-of-bounds access is necessary  
D. The first character a  

<details><summary>Answer and explanation</summary>

**A. Empty string**

Minimum length 0 means no valid common position; guard before indexing.

</details>


## Koko feasibility and numeric safety

Evidence: Days 10–11. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q65 — Hours trace

**Class-based scenario.** At k=22, piles [30, 11, 23, 4, 20] need how many total hours?

A. 6  
B. 8  
C. 5  
D. 7  

<details><summary>Answer and explanation</summary>

**D. 7**

Ceilings are2, 1, 2, 1, 1. Sum them individually; ceil(total/k) would incorrectly combine piles.

</details>

### Q66 — First feasible speed

**Class-based scenario.** Same piles, h=6. Minimum feasible integer speed?

A. 22  
B. 20  
C. 23  
D. 30  

<details><summary>Answer and explanation</summary>

**C. 23**

At22 hours7; at23 hours2+1+1+1+1=6. Monotonicity establishes the first feasible threshold.

</details>

### Q67 — Predicate direction

**Class-based scenario.** Binary search minimizes speed. At mid the total hours exceed h. Which update is justified?

A. hi=mid−1  
B. lo=mid+1  
C. Return mid  
D. Decrease speed to increase throughput  

<details><summary>Answer and explanation</summary>

**B. lo=mid+1**

Too many hours means speed too small. Every slower speed is also infeasible.

</details>

### Q68 — Widening too late

**Class-based scenario.** Java: `int p=2_000_000_000,k=2_000_000_000; long hours=(p+k-1)/k;` Why is the arithmetic faulty?

A. The int numerator overflows before assignment to long  
B. Division by k is always a floating operation  
C. The long destination prevents any overflow  
D. p itself exceeds Java int range  

<details><summary>Answer and explanation</summary>

**A. The int numerator overflows before assignment to long**

Both p and k fit int individually, but their sum does not. Cast p to long before adding; then ceiling is1.

</details>

### Q69 — Correct search cost

**Class-based scenario.** n piles, maximum M; each feasibility test scans all piles, binary search over integer speed1..M. Worst-case time?

A. O(logn)  
B. O(nlogn) because piles must be sorted  
C. O(M²)  
D. O(nlogM)  

<details><summary>Answer and explanation</summary>

**D. O(nlogM)**

Search domain is speed, not indexes; no input sorting is needed.

</details>


## Median merging and partitions

Evidence: Days 11–13. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q70 — Multiset preserves duplicates

**Class-based scenario.** Median of sorted arrays [1, 2] and [2, 3]?

A. 1.5  
B. 2.5  
C. 2.0  
D. 3.0  

<details><summary>Answer and explanation</summary>

**C. 2.0**

Merged sequence1, 2, 2, 3 keeps both2s. Deduplicating changes the statistical problem.

</details>

### Q71 — Integer averaging trap

**Class-based scenario.** Java/C++ with safe small ints: `(2+3)/2` assigned to double. Value?

A. 2.5  
B. 2.0  
C. 3.0  
D. Undefined  

<details><summary>Answer and explanation</summary>

**B. 2.0**

Division is integer before conversion. Use a widened sum divided by2.0.

</details>

### Q72 — Partition counts

**Class-based scenario.** A length 2, B length 5; cut i=1 in A. With leftSize=(m+n+1)/2, what is B cut j?

A. 3  
B. 2  
C. 4  
D. 1  

<details><summary>Answer and explanation</summary>

**A. 3**

LeftSize4 minus cutA1 gives3. Cuts count left elements; they are not element indices.

</details>

### Q73 — Direction of correction

**Class-based scenario.** Partition has maxLeftA=9,minRightB=4. How should cutA move?

A. Right: lo=i+1  
B. Accept partition  
C. Move both cuts right together  
D. Left: hi=i−1  

<details><summary>Answer and explanation</summary>

**D. Left: hi=i−1**

Too many large A elements are on the left. Reducing i simultaneously increases B left count.

</details>

### Q74 — Even partition result

**Class-based scenario.** A=[1, 3],B=[2, 4], valid cuts i=1,j=1. Median?

A. 2.0  
B. 3.0  
C. 2.5  
D. 1.5  

<details><summary>Answer and explanation</summary>

**C. 2.5**

Left maximum=max(1, 2)=2; right minimum=min(3, 4)=3. Average them safely.

</details>

### Q75 — Empty-side boundaries

**Class-based scenario.** A empty,B=[2, 4, 6]. Correct odd median partition result?

A. 2  
B. 4  
C. 6  
D. Always reject if either array empty  

<details><summary>Answer and explanation</summary>

**B. 4**

Use conceptual infinities for empty A boundaries; B contributes the median. Reject only when both arrays are empty.

</details>

### Q76 — Smaller-array reason

**Class-based scenario.** Why swap arrays so partition binary search runs on the smaller one?

A. It reduces search cost and keeps complementary cut within bounds for the usual full search interval  
B. It makes the larger array unsorted  
C. It removes all duplicates  
D. It guarantees equal array lengths  

<details><summary>Answer and explanation</summary>

**A. It reduces search cost and keeps complementary cut within bounds for the usual full search interval**

Searching i in0..m with m≤n supports j=(m+n+1)/2−i in0..n. Time is O(log(min(m,n)+1)).

</details>


## Fractional knapsack and greedy proof

Evidence: Day 14. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q77 — Optimal fractional value

**Class-based scenario.** Items(value,weight)=(60, 10),(100, 20),(120, 30),capacity50. Fractional optimum?

A. 220  
B. 280  
C. 180  
D. 240  

<details><summary>Answer and explanation</summary>

**D. 240**

Take first two fully then20/30 of the third: 60+100+80. Taking all three would exceed capacity.

</details>

### Q78 — Fractions tracked

**Class-based scenario.** For the same instance, original-order selected fractions?

A. [1, 1, 1]  
B. [0, 1, 1]  
C. [1, 1, 2/3]  
D. [1, 2/3, 1]  

<details><summary>Answer and explanation</summary>

**C. [1, 1, 2/3]**

Density order6, 5, 4 fills10+20 first, then remaining20. 0/1 optimum is a different contract.

</details>

### Q79 — Raw value is insufficient

**Class-based scenario.** Capacity10, fractional items(value,weight)=(100, 100),(60, 10). Raw-value descending selects the first fraction. Its value and the density-optimal value?

A. (100, 60)  
B. (10, 60)  
C. (60, 10)  
D. (10, 10)  

<details><summary>Answer and explanation</summary>

**B. (10, 60)**

First density1 yields10 for10 weight; second density6 yields60. Compare value per unit weight.

</details>

### Q80 — Integer ratio ties

**Class-based scenario.** C++ `value/weight` computed as int gives ratios for (5, 2) and (7, 3). What information is lost?

A. Both truncate to2, hiding the true ordering2.5>7/3  
B. First becomes3,second2  
C. Both become0  
D. The ratios are actually equal  

<details><summary>Answer and explanation</summary>

**A. Both truncate to2, hiding the true ordering2.5>7/3**

Floating ratios or safe cross products preserve density order. Tie-breaking among truly equal ratios differs from artificial truncation ties.

</details>

### Q81 — Why fractional exchange works

**Class-based scenario.** A solution contains weight from a lower-density item while some higher-density item remains available. With fractions allowed, exchanging equal weights does what?

A. Always violates capacity  
B. Always decreases value  
C. Proves ratio greedy for 0/1 automatically  
D. Does not decrease value  

<details><summary>Answer and explanation</summary>

**D. Does not decrease value**

Equal-weight exchange preserves capacity and multiplies that weight by a no-smaller density. Indivisible choices may not permit such exchanges.

</details>

### Q82 — 0/1 has optimal substructure

**Class-based scenario.** Which statement correctly explains failure of ratio greedy for general0/1 knapsack?

A. 0/1 has no optimal substructure  
B. All dynamic programming is greedy  
C. The greedy choice can fail even though the problem has optimal substructure  
D. Fractional and0/1 feasible sets coincide  

<details><summary>Answer and explanation</summary>

**C. The greedy choice can fail even though the problem has optimal substructure**

An optimal subproblem decomposition is not enough to justify each local greedy decision. Fractional splitting changes what exchanges are allowed.

</details>


## Coins and activity selection

Evidence: Day 14; activity selection is an extension. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q83 — Class coin counterexample

**Class-based scenario.** Unlimited coins1, 3, 4, 5, amount 7. Greedy count and true minimum count?

A. (2, 3)  
B. (3, 2)  
C. (2, 2)  
D. (7, 3)  

<details><summary>Answer and explanation</summary>

**B. (3, 2)**

Greedy5+1+1 uses3. Coins3+4 use2, proving largest-first is not generally optimal.

</details>

### Q84 — Unreachable remainder

**Class-based scenario.** Descending coin greedy on [6, 4],amount 5 uses4. What must the interface acknowledge?

A. Leftover1, so exact change was not produced  
B. One coin is a valid exact answer  
C. Return0 coins because greedy is always optimal  
D. Invent a1 coin  

<details><summary>Answer and explanation</summary>

**A. Leftover1, so exact change was not produced**

Allowed denominations contain no1. A greedy decomposition may leave remainder; exact-change feasibility needs its own treatment.

</details>

### Q85 — Coin output cost

**Class-based scenario.** For amountA, k denominations, compare repeated coin output with counts `(denomination,count)`.

A. Both outputs are always O(1)  
B. Counts require more than A records  
C. Division makes arbitrary greedy optimal  
D. Counts avoid Θ(A) output when denomination1 supplies the amount  

<details><summary>Answer and explanation</summary>

**D. Counts avoid Θ(A) output when denomination1 supplies the amount**

A literal list of A ones has unavoidable Θ(A) size. Count representation uses at most k records; optimality is a separate issue.

</details>

### Q86 — Activity selection trace

**Extension.** Half-open intervals [1, 3),[2, 4),[3, 5),[0, 6),[5, 7). Earliest-finish greedy selects how many?

A. 2  
B. 4  
C. 3  
D. 5  

<details><summary>Answer and explanation</summary>

**C. 3**

Select[1, 3),[3, 5),[5, 7). Equality of next start with last finish is compatible under this contract.

</details>

### Q87 — Wrong greedy criterion

**Extension.** Intervals [0, 10),[1, 2),[2, 3),[3, 4). Earliest-start-first accepts0..10. Maximum compatible count?

A. 1  
B. 3  
C. 2  
D. 4  

<details><summary>Answer and explanation</summary>

**B. 3**

The three short intervals chain and are compatible. Earliest finish has the exchange property; earliest start alone does not.

</details>


## Graph representation costs

Evidence: Days 14–15. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q88 — Neighbour scan

**Class-based scenario.** A graph has V vertices and adjacency matrix. Enumerating all neighbours of a given vertex costs?

A. Θ(V) scanning its row  
B. Θ(degree) automatically  
C. Θ(1)  
D. Θ(V²) for one row  

<details><summary>Answer and explanation</summary>

**A. Θ(V) scanning its row**

O(1) edge lookup does not mean O(1) enumeration. An adjacency list directly stores present neighbours.

</details>

### Q89 — Undirected list storage

**Class-based scenario.** An ordinary adjacency list represents an undirected graph with V vertices,E edges, storing each edge at both endpoints. Space?

A. Θ(E²)  
B. Θ(V²) always  
C. Θ(logV)  
D. Θ(V+E)  

<details><summary>Answer and explanation</summary>

**D. Θ(V+E)**

There are V list heads and2E neighbour records; a constant factor2 does not change asymptotic order.

</details>

### Q90 — Zero ambiguity

**Class-based scenario.** A weighted matrix uses0 to mean no edge. What valid Dijkstra-compatible feature can it fail to represent?

A. Every positive edge  
B. Every undirected edge  
C. A zero-weight edge  
D. Only negative cycles  

<details><summary>Answer and explanation</summary>

**C. A zero-weight edge**

Dijkstra accepts nonnegative weights. Separate existence from weight so zero is not overloaded.

</details>

### Q91 — Directed matrix

**Class-based scenario.** Matrix entries w[0][1]=5,w[1][0]=0 where0 means absence. What can be inferred?

A. The graph must be undirected  
B. A directed edge0→1 need not have the reverse edge  
C. A symmetric matrix is compulsory for every graph  
D. No graph can have this matrix  

<details><summary>Answer and explanation</summary>

**B. A directed edge0→1 need not have the reverse edge**

Symmetry is an undirected representation condition, not a universal graph rule.

</details>


## Dijkstra distance traces

Evidence: Days 14–15. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q92 — Relaxation arithmetic

**Class-based scenario.** dist[u]=5,weight(u,v)=6,current dist[v]=12. Correct new tentative distance?

A. 11  
B. 6  
C. 5  
D. 12 must remain forever  

<details><summary>Answer and explanation</summary>

**A. 11**

Relax using the source distance5 plus edge6, then compare11 with12. Edge weight alone is Prim-style information.

</details>

### Q93 — Next finite vertex

**Class-based scenario.** Tentative distances[5, 12, 0,∞,∞], vertex2 already visited. Which unvisited vertex is chosen next?

A. 1  
B. 2  
C. 3  
D. 0  

<details><summary>Answer and explanation</summary>

**D. 0**

Vertex0 has smallest remaining finite distance5. Do not confuse a vertex label with its distance.

</details>

### Q94 — Matrix runtime

**Class-based scenario.** Dijkstra selects minimum unvisited distance by scanning V entries, then scans a V-entry row, for up to V vertices. Time?

A. O(VlogV)  
B. O(E) regardless of representation  
C. O(V²)  
D. O(V³)  

<details><summary>Answer and explanation</summary>

**C. O(V²)**

Two linear scans per outer iteration remain O(V), yielding O(V²), not a product of three nested V loops.

</details>

### Q95 — Nonnegative requirement

**Class-based scenario.** Which weight restriction is sufficient for standard Dijkstra correctness?

A. Strictly positive only  
B. All edges nonnegative; zero is allowed  
C. Any weights if no negative cycle  
D. Negative undirected edges are always fine  

<details><summary>Answer and explanation</summary>

**B. All edges nonnegative; zero is allowed**

Negative edges can improve an already-finalized vertex. A zero-weight edge is harmless when represented properly.

</details>

### Q96 — Counterexample with negative edge

**Class-based scenario.** Directed edges s→a: 2,s→b: 5,b→a:−4. Dijkstra finalizes a before b. True shortest s→a?

A. 1, so finalizing2 without revisits is wrong  
B. 2 and no alternative  
C. 5  
D. There must be a negative cycle  

<details><summary>Answer and explanation</summary>

**A. 1, so finalizing2 without revisits is wrong**

s→b→a costs1. There is no directed cycle here, but the negative edge still breaks the finalization proof.

</details>

### Q97 — Disconnected case

**Class-based scenario.** All remaining unvisited distances are∞. A matrix implementation has no finite chosen index. What should it do?

A. Use index−1 directly  
B. Add∞ to every edge  
C. Mark every vertex distance0  
D. Stop/reject unreachable vertices rather than index with an invalid choice  

<details><summary>Answer and explanation</summary>

**D. Stop/reject unreachable vertices rather than index with an invalid choice**

Unreachable vertices stay∞. Guard before accessing a row or performing finite-distance arithmetic.

</details>


## Stock contracts

Evidence: Days 15–16. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q98 — One versus unlimited

**Class-based scenario.** prices=[7, 1, 5, 3, 6, 4], no fee/cooldown. One-transaction and unlimited maximum profits?

A. (7, 5)  
B. (4, 5)  
C. (5, 7)  
D. (7, 7)  

<details><summary>Answer and explanation</summary>

**C. (5, 7)**

One buy1/sell6 gives5. Unlimited gains(5−1)+(6−3)=7. Same array, different feasible actions.

</details>

### Q99 — Update invariant

**Class-based scenario.** One-transaction scan has minPrice=1,best=4 before price3. After processing3, state?

A. (3, 2)  
B. (1, 4)  
C. (1, 2)  
D. (3, 4)  

<details><summary>Answer and explanation</summary>

**B. (1, 4)**

Minimum earlier price stays1; current possible profit2 does not replace the larger previous best4.

</details>

### Q100 — Declining market

**Class-based scenario.** prices=[9, 7, 4, 1], at most one buy/sell and doing nothing allowed. Profit?

A. 0  
B. -2  
C. -8  
D. 8  

<details><summary>Answer and explanation</summary>

**A. 0**

No positive later-price difference exists. Initial best0 represents choosing no transaction.

</details>

### Q101 — Summing rises

**Class-based scenario.** Unlimited prices=[1, 2, 2, 5, 3, 4]. Sum of positive adjacent differences?

A. 4  
B. 6  
C. 8  
D. 5  

<details><summary>Answer and explanation</summary>

**D. 5**

Gains1+0+3+0+1=5. A zero change neither helps nor hurts.

</details>

### Q102 — Fee extension invalidates formula

**Extension.** Extension: prices=[1, 3], fee1 per completed transaction. Plain sum-positive-differences returns2. Correct net profit?

A. 2  
B. 3  
C. 1  
D. 0 always  

<details><summary>Answer and explanation</summary>

**C. 1**

The single gain2 incurs fee1. The no-fee greedy formula is not automatically correct after changing the contract.

</details>


## Minimum subset product

Evidence: Days 16–17. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q103 — Even negatives

**Class-based scenario.** Minimum nonempty subset product of [−2,−3, 4]?

A. -24  
B. -12  
C. 24  
D. -8  

<details><summary>Answer and explanation</summary>

**B. -12**

All nonzeros product24; drop closest-to-zero negative−2 to get−12. Dropping−3 gives−8, which is larger.

</details>

### Q104 — Zeros do not force zero

**Class-based scenario.** Minimum subset product of [−1, 0]?

A. -1  
B. 0  
C. 1  
D. No valid nonempty subset  

<details><summary>Answer and explanation</summary>

**A. -1**

A singleton−1 is allowed and is less than zero. Including every array element is not required.

</details>

### Q105 — All positives

**Class-based scenario.** Minimum nonempty subset product of integer values[2, 3, 5]?

A. 30  
B. 0  
C. 1  
D. 2  

<details><summary>Answer and explanation</summary>

**D. 2**

No empty subset is allowed; every product of multiple integers≥1 cannot beat the smallest value2.

</details>

### Q106 — Even negative units

**Class-based scenario.** Minimum nonempty subset product of [−1,−1]?

A. 1  
B. 0  
C. -1  
D. -2  

<details><summary>Answer and explanation</summary>

**C. -1**

A single−1 yields the negative minimum; selecting both gives+1. Even-negative handling must permit dropping one.

</details>

### Q107 — Integers are an assumption

**Extension.** Extension: apply “multiply all nonzeros with odd negative count” to real values[−10, 0.2]. It returns−2. True minimum nonempty subset product?

A. -2  
B. -10  
C. 0.2  
D. 0  

<details><summary>Answer and explanation</summary>

**B. -10**

Positive values below1 shrink negative magnitude. The class greedy rule is justified for integer inputs, not arbitrary real values.

</details>


## Maximum Swap suffix state

Evidence: Day 18 after about 1: 07. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q108 — Tie chooses rightmost

**Class-based scenario.** At most one swap on1993. Largest result?

A. 9913  
B. 9193  
C. 9931  
D. 1993  

<details><summary>Answer and explanation</summary>

**A. 9913**

Swap first1 with the later9. 9931 would require additional rearrangement; the rightmost maximum preserves a larger earlier suffix.

</details>

### Q109 — Suffix maximum indexes

**Class-based scenario.** For digits84725, rightmost suffix-maximum indices for each position?

A. [0, 1, 2, 3, 4]  
B. [4, 4, 4, 4, 4]  
C. [0, 2, 2, 3, 4]  
D. [0, 2, 2, 4, 4]  

<details><summary>Answer and explanation</summary>

**D. [0, 2, 2, 4, 4]**

From right: 5 at4 dominates2; 7 at2 dominates5; 4 points to2; 8 at0 dominates all. These are indexes, not digit values.

</details>

### Q110 — Only one exchange

**Class-based scenario.** Maximum Swap result for84725?

A. 87542  
B. 87452  
C. 87425  
D. 84725  

<details><summary>Answer and explanation</summary>

**C. 87425**

First improvable position is digit4, suffix maximum7. Swap these and stop; sorting all digits violates the at-most-one-swap rule.

</details>

### Q111 — Equal maximum update

**Class-based scenario.** Scanning suffixes right-to-left, new digit equals currently tracked maximum. To retain rightmost tie, should the index update?

A. Yes on equality  
B. No; update only on strictly larger digit  
C. Always reset to current position  
D. Sort all suffix indexes  

<details><summary>Answer and explanation</summary>

**B. No; update only on strictly larger digit**

The existing maximum is farther right. Keeping it makes the eventual displaced smaller digit land later.

</details>


## Spanning trees and Prim

Evidence: Days 16–17. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q112 — Edge count

**Class-based scenario.** An undirected connected graph has6 vertices. Any spanning tree contains how many edges?

A. 5  
B. 6  
C. 15  
D. Depends on weights  

<details><summary>Answer and explanation</summary>

**A. 5**

Connected acyclic graphs have V−1 edges. Weight values affect optimum choice, not spanning-tree edge count.

</details>

### Q113 — Keys differ from distances

**Class-based scenario.** Prim key[u]=4,edge(u,v)=3,current key[v]=5. Correct updated key[v]?

A. 7  
B. 4  
C. 5  
D. 3  

<details><summary>Answer and explanation</summary>

**D. 3**

Prim compares the single edge crossing the cut. Adding key[u] would confuse it with source-distance relaxation.

</details>

### Q114 — Objective contrast

**Class-based scenario.** Triangle edges0–1: 2, 1–2: 2, 0–2: 3. MST edges versus source0 shortest-path tree?

A. They must always match  
B. MST requires edge3 because it is direct  
C. MST uses2+2; shortest-path tree uses edges2 and3  
D. Shortest path0→2 must cost4  

<details><summary>Answer and explanation</summary>

**C. MST uses2+2; shortest-path tree uses edges2 and3**

MST total4 via chain, but direct0→2 costs3 versus chain4. Global edge sum differs from individual path distance.

</details>

### Q115 — Negative weights in MST

**Class-based scenario.** Connected undirected graph has some negative edge weights. What about MST algorithms Prim/Kruskal?

A. They require nonnegative edges like Dijkstra  
B. Negative weights are allowed for the MST objective  
C. They must reject all negative graphs  
D. A negative edge makes spanning trees undefined  

<details><summary>Answer and explanation</summary>

**B. Negative weights are allowed for the MST objective**

A finite set of spanning trees still has a minimum sum. MST never repeats edges around a negative cycle.

</details>

### Q116 — Disconnected Prim

**Class-based scenario.** Prim from vertex0 exhausts all finite keys while some vertices remain unselected. What is indicated?

A. Graph disconnected; no spanning tree over all vertices  
B. An MST already spans all vertices  
C. The key array must be reset to zero  
D. Every remaining vertex is a leaf of the same tree  

<details><summary>Answer and explanation</summary>

**A. Graph disconnected; no spanning tree over all vertices**

A minimum spanning forest can be computed deliberately, but a single connected spanning tree does not exist.

</details>


## DSU parent, root and rank

Evidence: Days 17–18. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q117 — Root differs from direct parent

**Class-based scenario.** parent=[0, 0, 1, 3]. find(2) follows parents recursively. Returned representative?

A. 1  
B. 2  
C. 3  
D. 0  

<details><summary>Answer and explanation</summary>

**D. 0**

2→1→0. parent[2] by itself is not necessarily the component representative.

</details>

### Q118 — Path compression write

**Class-based scenario.** Same parent array, after compressed find(2), what becomes parent[2]?

A. 1 remains always  
B. 2  
C. 0  
D. 3  

<details><summary>Answer and explanation</summary>

**C. 0**

Assign the root to each visited node on unwind. This changes tree shape, not component membership.

</details>

### Q119 — Attach roots only

**Class-based scenario.** parent=[0, 0, 2, 2]. To unite components containing1 and3, which conceptual action is correct?

A. Set parent[1]=3 only; all of component0 must move automatically  
B. Find roots0 and2 and link one root under the other  
C. Set parent[0]=1 to create a cycle  
D. Change rank without changing any parent  

<details><summary>Answer and explanation</summary>

**B. Find roots0 and2 and link one root under the other**

Reparenting an arbitrary child can split rather than merge components. Union operates on representatives.

</details>

### Q120 — Unequal-rank union

**Class-based scenario.** Roots a,b have ranks3, 1. Standard union-by-rank attaches b below a. New rank[a]?

A. 3  
B. 4  
C. 1  
D. 0  

<details><summary>Answer and explanation</summary>

**A. 3**

Only equal-rank merges increase rank. Attaching a lower-height upper-bound tree does not force the root height to grow.

</details>

### Q121 — Equal ranks

**Class-based scenario.** Two different roots both rank2 are united under one chosen root. New rank of chosen root?

A. 2  
B. 4  
C. 1  
D. 3  

<details><summary>Answer and explanation</summary>

**D. 3**

Equal-height upper bounds may add one level, so increment by1. The losing root rank is no longer used as a root heuristic.

</details>

### Q122 — Amortized is not per-call constant

**Class-based scenario.** With union by rank and path compression, standard bound for a long operation sequence?

A. Every individual find is worst-case O(1)  
B. Every sequence is Θ(V²)  
C. Amortized O(α(V)) per operation  
D. Path compression removes the need to follow parents ever  

<details><summary>Answer and explanation</summary>

**C. Amortized O(α(V)) per operation**

The inverse-Ackermann bound describes amortized work. A particular initial find can still traverse multiple links.

</details>


## Kruskal edge decisions

Evidence: Day 18. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q123 — Cycle test

**Class-based scenario.** Accepted edges0–1 and1–2. Candidate edge0–2. DSU roots of0 and2 agree. Action?

A. Accept because direct parents might differ  
B. Reject it as forming a cycle  
C. Accept every third edge  
D. Delete the previous two edges  

<details><summary>Answer and explanation</summary>

**B. Reject it as forming a cycle**

Root equality means there is already a path between endpoints in the accepted forest.

</details>

### Q124 — Acceptance count

**Class-based scenario.** V=4, sorted edges(0, 1, 1),(1, 2, 2),(0, 2, 3),(2, 3, 4). MST total weight?

A. 7  
B. 6  
C. 10  
D. 3  

<details><summary>Answer and explanation</summary>

**A. 7**

Accept1, 2; reject3 as cycle; accept4. Need three accepted edges, not merely three examined edges.

</details>

### Q125 — Necessary not sufficient

**Class-based scenario.** V=4,E=3 with triangle0–1, 1–2, 2–0 and isolated3. Does E≥V−1 prove connectivity?

A. Yes by definition  
B. Only if weights positive, then yes  
C. A triangle automatically covers all vertices  
D. No; vertex3 remains isolated  

<details><summary>Answer and explanation</summary>

**D. No; vertex3 remains isolated**

Edge count alone cannot show all vertices are connected. A disconnected graph can have many edges.

</details>

### Q126 — Exhausted list

**Class-based scenario.** Kruskal loops until accepted=V−1 but never checks nextIndex<E. On a disconnected graph, likely code failure?

A. It correctly returns an MST every time  
B. It must find a new edge automatically  
C. Out-of-bounds edge access after exhaustion  
D. It always terminates after exactly V−1 reads  

<details><summary>Answer and explanation</summary>

**C. Out-of-bounds edge access after exhaustion**

The Day 18 demonstration reaches this failure. Guard edge exhaustion and report a forest/no full spanning tree.

</details>

### Q127 — Comparator overflow

**Class-based scenario.** Java comparator returns `a.weight-b.weight`. For a.weight=2_000_000_000,b.weight=−2_000_000_000, what is the defect?

A. Both weights individually exceed int range  
B. Subtraction overflows int and can reverse ordering  
C. Subtraction always widens to long  
D. Comparison returns only0 or1 by language rule  

<details><summary>Answer and explanation</summary>

**B. Subtraction overflows int and can reverse ordering**

Use Integer.compare/Long.compare or a suitable comparison. MST correctness depends on actual ascending weights.

</details>


## BFS queue and discovery

Evidence: Days 19–21. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q128 — BFS order specified

**Class-based scenario.** Graph adjacency in ascending order: 0:[1, 2], 1:[0, 3], 2:[0, 3], 3:[1, 2]. BFS from0 marks on enqueue. Dequeue order?

A. 0, 1, 2, 3  
B. 0, 1, 3, 2  
C. 0, 2, 1, 3 always  
D. 0, 1, 3, 2, 3  

<details><summary>Answer and explanation</summary>

**A. 0, 1, 2, 3**

FIFO processes all depth1 vertices before depth2. Node3 is enqueued once when first discovered.

</details>

### Q129 — Marking too late

**Class-based scenario.** Same graph, visited only when dequeued and no pending-state check. What can happen before3 is dequeued?

A. 3 is never reachable  
B. The queue automatically deduplicates  
C. The graph becomes directed  
D. Both1 and2 can enqueue3  

<details><summary>Answer and explanation</summary>

**D. Both1 and2 can enqueue3**

3 is still unvisited when2 examines it. Marking on enqueue prevents the duplicate pending copy.

</details>

### Q130 — Shortest-path condition

**Class-based scenario.** BFS first-discovery depth minimizes what in an unweighted graph?

A. Arbitrary sum of positive weights  
B. Sum of all graph edges  
C. Number of edges from the source  
D. DFS finishing time  

<details><summary>Answer and explanation</summary>

**C. Number of edges from the source**

Each queue layer adds one edge. Weighted paths need a matching algorithm/objective.

</details>

### Q131 — Source coverage

**Class-based scenario.** BFS starts in one component of a disconnected graph. What is needed to visit every vertex?

A. The first queue eventually jumps components  
B. Start additional traversals from remaining unvisited vertices  
C. Add all edges to a stack  
D. Sort vertex values  

<details><summary>Answer and explanation</summary>

**B. Start additional traversals from remaining unvisited vertices**

No edge reaches another component. A traversal loop over vertices covers them independently.

</details>

### Q132 — FIFO versus LIFO

**Class-based scenario.** BFS-like code uses push_back and pop_back from the same sequence rather than removing the front. What changes?

A. It uses LIFO exploration, so BFS level-order guarantees no longer apply  
B. Nothing; removal end never matters  
C. It is still always shortest-edge-first  
D. Every graph becomes a tree  

<details><summary>Answer and explanation</summary>

**A. It uses LIFO exploration, so BFS level-order guarantees no longer apply**

Queue discipline is the reason BFS processes layers. A stack changes pending-state order.

</details>


## Lonely-node structure

Evidence: Days 19–20. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q133 — Root is excluded

**Class-based scenario.** Tree root1 has only left child2; node2 has children3 and4. Lonely node values?

A. [1, 2]  
B. [3, 4]  
C. [1, 3, 4]  
D. [2]  

<details><summary>Answer and explanation</summary>

**D. [2]**

2 lacks a sibling. Root has no parent and is excluded; children3 and4 are siblings.

</details>

### Q134 — Leaf does not imply lonely

**Class-based scenario.** A parent has two leaf children7 and8. Which are lonely?

A. Both  
B. Only7  
C. Neither  
D. Only8  

<details><summary>Answer and explanation</summary>

**C. Neither**

Loneliness depends on whether a sibling exists, not whether the node itself has children.

</details>

### Q135 — Condition implements XOR

**Class-based scenario.** Which parent test correctly identifies exactly one child?

A. `left==null && right==null`  
B. `(left==null)!=(right==null)`  
C. `left!=null && right!=null`  
D. `left.data!=right.data`  

<details><summary>Answer and explanation</summary>

**B. `(left==null)!=(right==null)`**

Boolean inequality is exclusive-or of absence. Avoid dereferencing missing children while testing.

</details>


## Islands, area and shape

Evidence: Days 19–20. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q136 — Diagonal separation

**Class-based scenario.** Grid [[1, 0],[0, 1]], four-neighbour land. Island count and max area?

A. (2, 1)  
B. (1, 2)  
C. (2, 2)  
D. (1, 1)  

<details><summary>Answer and explanation</summary>

**A. (2, 1)**

Diagonal contact is not a permitted edge. Each component has one cell.

</details>

### Q137 — Three objectives

**Class-based scenario.** Grid [[1, 1, 0, 1],[0, 0, 0, 0],[1, 1, 0, 1]]. Four-neighbour components. Count,max area,distinct translation-only shapes?

A. (2, 4, 2)  
B. (4, 2, 4)  
C. (4, 1, 1)  
D. (4, 2, 2)  

<details><summary>Answer and explanation</summary>

**D. (4, 2, 2)**

Two horizontal dominoes and two singles form four components, maximum2 and two distinct shapes.

</details>

### Q138 — Area not shape

**Class-based scenario.** Two islands each have3 cells: a horizontal line and an L. Can area alone deduplicate their shapes?

A. Yes, by definition of distinct islands  
B. Only if values are1  
C. No; equal area can have different arrangements  
D. Every3-cell island is equivalent by translation  

<details><summary>Answer and explanation</summary>

**C. No; equal area can have different arrangements**

Translations preserve relative positions. A line cannot become an L by translation.

</details>

### Q139 — Signature reliability

**Class-based scenario.** Shape serialization records only successful DFS direction letters, dropping returns/null transitions. Why is a structural marker or coordinate canonicalization safer?

A. String sets cannot store equal strings  
B. Different branch structures can lose distinctions in a bare move sequence  
C. BFS forbids direction codes  
D. Coordinates make every shape identical  

<details><summary>Answer and explanation</summary>

**B. Different branch structures can lose distinctions in a bare move sequence**

Record enough structure to reconstruct positions. Fixed-order relative coordinate sets are a clear translation-invariant contract.

</details>

### Q140 — Destructive marking reused

**Class-based scenario.** An island counter turns visited1s into0. Run it twice on the same grid without copying/resetting. Second result?

A. 0 islands  
B. Always same as first  
C. Doubles the first count  
D. One island guaranteed  

<details><summary>Answer and explanation</summary>

**A. 0 islands**

The first traversal has consumed all land. State ownership matters when comparing methods on one input.

</details>

### Q141 — Grid complexity

**Class-based scenario.** Each land cell is enqueued at most once; four neighbours examined. Full grid dimensions R,C. Time and worst-case queue/visited storage?

A. O(log(RC)) time  
B. O(R²C²) necessarily  
C. O(RC) time and always O(1) queue  
D. O(RC) time and O(RC) storage  

<details><summary>Answer and explanation</summary>

**D. O(RC) time and O(RC) storage**

The constant four-direction loop does not add an asymptotic factor. Large components can require linear state.

</details>


## DFS and the actual class maze

Evidence: Days 21–22. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q142 — Push order

**Class-based scenario.** Tree root1,left2,right3. Iterative preorder should visit left before right. Which stack push order after popping1?

A. Push2,then3  
B. Push only1 again  
C. Push3,then2  
D. Queue order is irrelevant  

<details><summary>Answer and explanation</summary>

**C. Push3,then2**

LIFO visits the last pushed item first. This simple tree avoids extra graph discovery-order complications.

</details>

### Q143 — Maze contract

**Class-based scenario.** Which moves are permitted in the Day 21–22 class rat maze?

A. Roll in all directions until a wall  
B. Right/down single-cell moves over1s  
C. Knight moves  
D. Any diagonal move over0s  

<details><summary>Answer and explanation</summary>

**B. Right/down single-cell moves over1s**

Day 22 opening explicitly says1 is open, 0 blocked, right and down. Do not map a title to a different LeetCode state transition.

</details>

### Q144 — Maze reachability

**Class-based scenario.** Class maze [[1, 1, 0],[0, 1, 1],[0, 0, 1]], start(0, 0),end(2, 2). Reachable?

A. Yes, via(0, 1),(1, 1),(1, 2),(2, 2)  
B. No because down from start is blocked  
C. Yes by crossing(0, 2)  
D. No because maze must be symmetric  

<details><summary>Answer and explanation</summary>

**A. Yes, via(0, 1),(1, 1),(1, 2),(2, 2)**

An invalid first direction should allow the other direction. Reachability does not require every adjacent cell to be open.

</details>

### Q145 — Bounds before access

**Class-based scenario.** C++ deliberately faulty: `if(grid[r][c]==0 || r>=R || c>=C)return false;` Called with r=R. What is wrong?

A. It safely returns false by short-circuit  
B. It necessarily throws Java exception  
C. It reads0 by C++ guarantee  
D. It accesses out-of-bounds before checking bounds: undefined behavior  

<details><summary>Answer and explanation</summary>

**D. It accesses out-of-bounds before checking bounds: undefined behavior**

Short-circuit checks left first. Put bounds tests before indexing; vector operator[] is unchecked.

</details>

### Q146 — No cycles does not eliminate repeats

**Class-based scenario.** Right/down recursive reachability has no visited/memoization and explores both branches on a no-path grid. Which can occur?

A. No repeated subproblem because no cycles  
B. Always O(R+C) total time  
C. The same cell is recomputed through multiple routes, causing exponential worst-case work  
D. It must recurse infinitely  

<details><summary>Answer and explanation</summary>

**C. The same cell is recomputed through multiple routes, causing exponential worst-case work**

r+c strictly increases, so recursion terminates. Different paths still merge at cells; memoized reachability is O(RC).

</details>

### Q147 — One-cell maze

**Class-based scenario.** Class maze [[1]], start and destination both(0, 0). Correct reachability?

A. false because no move is possible  
B. true  
C. An exception is required  
D. true even if its only value were0  

<details><summary>Answer and explanation</summary>

**B. true**

Start is already the open destination. Check cell validity before treating that destination match as success.

</details>


## Binary-tree boundary

Evidence: Day 22. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q148 — Boundary order

**Class-based scenario.** Tree1 with left2,right3; 2 has leaves4, 5; 3 has leaves6, 7. Anticlockwise boundary without duplicates?

A. 1, 2, 4, 5, 6, 7, 3  
B. 1, 2, 4, 5, 3, 6, 7  
C. 1, 2, 4, 5, 6, 7, 3, 1  
D. 1, 4, 2, 5, 6, 3, 7  

<details><summary>Answer and explanation</summary>

**A. 1, 2, 4, 5, 6, 7, 3**

Root; nonleaf left boundary; all leaves left-to-right; reversed nonleaf right boundary.

</details>

### Q149 — Singleton tree

**Class-based scenario.** Boundary of a single-node tree9?

A. [9, 9]  
B. []  
C. [9, 9, 9]  
D. [9] once  

<details><summary>Answer and explanation</summary>

**D. [9] once**

Root is also a leaf. Avoid adding it independently in multiple boundary phases.

</details>

### Q150 — Left fallback

**Class-based scenario.** While collecting nonleaf left boundary, current node has no left child but has a right child. Next step?

A. Stop even though boundary continues  
B. Switch to root right subtree  
C. Follow right child  
D. Visit both children as left-boundary nodes  

<details><summary>Answer and explanation</summary>

**C. Follow right child**

The boundary follows the available exterior route. Leaves will be handled separately.

</details>

### Q151 — Right side reversal

**Class-based scenario.** Right boundary top-down is3, 8, 10 excluding leaves. What order is appended at the end of anticlockwise boundary?

A. 3, 8, 10  
B. 10, 8, 3  
C. 8, 3, 10  
D. Only3  

<details><summary>Answer and explanation</summary>

**B. 10, 8, 3**

The final traversal climbs from the leaves back toward the root, so this side must reverse.

</details>


## Tree conventions and symmetry

Evidence: Days 23–24. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q152 — Height convention

**Class-based scenario.** Node-height definition h(null)=0,h(node)=1+max(children). Height of a3-node chain?

A. 3  
B. 2  
C. 1  
D. 0  

<details><summary>Answer and explanation</summary>

**A. 3**

Edge-height would be2. Use the exact base convention; balance differences remain the same if consistent.

</details>

### Q153 — Mirror arguments

**Class-based scenario.** isMirror(a,b) finds equal values. Which recursive pairings are required?

A. (a.left,b.left) and(a.right,b.right)  
B. Compare node counts only  
C. Compare only subtree heights  
D. (a.left,b.right) and(a.right,b.left)  

<details><summary>Answer and explanation</summary>

**D. (a.left,b.right) and(a.right,b.left)**

Reflection reverses child directions. Equal shape without reflection is the same-tree problem.

</details>

### Q154 — Exactly one null

**Class-based scenario.** isMirror receives a=null,b=non-null. Correct result?

A. true  
B. Return b.value  
C. false  
D. Always recurse into a.left  

<details><summary>Answer and explanation</summary>

**C. false**

Missingness is part of structure; guard before dereferencing.

</details>

### Q155 — Same values, wrong placement

**Class-based scenario.** Root1 has left2 with left child3, and right2 also with left child3. Symmetric?

A. Yes because level values match  
B. No; 3 positions are not mirrored  
C. Yes because heights match  
D. Only node values determine symmetry  

<details><summary>Answer and explanation</summary>

**B. No; 3 positions are not mirrored**

The right-side3 would need to be a right child. Omitting null placeholders from level sequences can hide this mismatch.

</details>


## Balanced-tree height propagation

Evidence: Days 23–24. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q156 — Root test is insufficient

**Class-based scenario.** Root has two equal-height children, but one subtree has a node with child-height difference2. Is the whole tree balanced?

A. No; every node must meet the bound  
B. Yes because root difference0  
C. Yes if total node count is odd  
D. Yes if preorder is sorted  

<details><summary>Answer and explanation</summary>

**A. No; every node must meet the bound**

Local height balance is required recursively; root-only checking loses violations below it.

</details>

### Q157 — Sentinel propagation

**Class-based scenario.** One-pass check returns−1 for an unbalanced subtree; left=−1,right=2. Correct next action?

A. Return1+max(left,right)=3  
B. Treat−1 as empty height  
C. Return abs(left−right)=3 as a valid height  
D. Return−1 before using them as heights  

<details><summary>Answer and explanation</summary>

**D. Return−1 before using them as heights**

Here normal null height is0, so−1 is reserved error state. Propagate it instead of masking an earlier imbalance.

</details>

### Q158 — One-pass height result

**Class-based scenario.** Balanced node has child heights2 and3, node-height convention. Returned height?

A. 3  
B. 5  
C. 4  
D. -1  

<details><summary>Answer and explanation</summary>

**C. 4**

Difference1 passes; one plus maximum3 gives4. Balance is not a sum of child heights.

</details>

### Q159 — Repeated heights

**Class-based scenario.** Naive balance recomputes height(left/right) at every node of a long skewed tree. Worst-case time?

A. Θ(n)  
B. Θ(n²)  
C. Θ(logn)  
D. Θ(nlogn) for all shapes  

<details><summary>Answer and explanation</summary>

**B. Θ(n²)**

Subtree scans have sizes n−1,n−2,… . One postorder computes each height once.

</details>

### Q160 — Counts are not heights

**Class-based scenario.** Two child subtrees have equal numbers of nodes but one is a chain and the other compact. Does equality of counts guarantee local height balance?

A. No  
B. Yes always  
C. Only if values positive  
D. Only if root has two children, then yes  

<details><summary>Answer and explanation</summary>

**A. No**

Structural depth, not cardinality, defines height. Equal cardinality can support different heights.

</details>


## Level averages by BFS/DFS

Evidence: Days 23–24. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q161 — Correct averages

**Class-based scenario.** Tree3 has children9, 20; 20 has children15, 7. Per-level averages?

A. [3, 14, 11]  
B. [3, 9, 20, 15, 7]  
C. [3, 14.5, 7.3333]  
D. [3, 14.5, 11]  

<details><summary>Answer and explanation</summary>

**D. [3, 14.5, 11]**

Levels are[3],[9, 20],[15, 7]. Floating division preserves the half unit.

</details>

### Q162 — Snapshot size

**Class-based scenario.** BFS level loop pushes children. Why capture n=q.size() before entering that level loop?

A. To force queue storage constant  
B. To prevent any children being visited ever  
C. To process exactly the current level despite the queue growing/shrinking  
D. Because q.size() is an average  

<details><summary>Answer and explanation</summary>

**C. To process exactly the current level despite the queue growing/shrinking**

Using a changing queue size as the loop bound can mix levels or stop too early. Level membership is defined at entry.

</details>

### Q163 — Overflow before average

**Class-based scenario.** Java int sum adds two level values2_000_000_000,then divides by2.0. What prevents overflow?

A. Only cast the final sum to double  
B. Use a long accumulator before additions  
C. Use an int count of2  
D. Division by2.0 retroactively widens earlier additions  

<details><summary>Answer and explanation</summary>

**B. Use a long accumulator before additions**

Overflow occurs while summing int values. Later floating conversion cannot reconstruct the intended sum.

</details>

### Q164 — DFS missing state

**Class-based scenario.** A DFS records only sum[depth]. To compute level averages later, what else is needed?

A. count[depth]  
B. A single global count for the whole tree  
C. Only the tree root value  
D. Sort sums numerically  

<details><summary>Answer and explanation</summary>

**A. count[depth]**

Each depth can contain different numbers of nodes. Divide its own sum by its own count.

</details>

### Q165 — Traversal order versus aggregate

**Class-based scenario.** DFS with explicit depth and BFS with level snapshots both correctly accumulate sums/counts. Can final level averages agree despite different visitation order?

A. No; DFS can never group levels  
B. Only for empty trees  
C. Only if all values are equal  
D. Yes  

<details><summary>Answer and explanation</summary>

**D. Yes**

Grouping by depth determines the aggregate, not the order of visits, provided arithmetic and state are correct.

</details>


## Backtracking and N-Queens

Evidence: Day 25. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q166 — Undo the choice

**Class-based scenario.** A used-array permutation search sets used[i]=true, recurses, but never restores it. Effect on sibling branches?

A. It necessarily enumerates all permutations twice  
B. No effect because recursion copies shared arrays automatically  
C. Legal choices can be incorrectly unavailable  
D. It improves correctness by remembering all explored paths  

<details><summary>Answer and explanation</summary>

**C. Legal choices can be incorrectly unavailable**

Used flags represent the current path, not every historical choice. Undo when returning to a sibling.

</details>

### Q167 — Copied output

**Class-based scenario.** Java recursion appends the same mutable path list object at every leaf, then pops elements. What can fix corrupted stored outputs?

A. Only increment a global counter  
B. Store a new copy at each leaf  
C. Clear output before every leaf  
D. Make all indexes one-based  

<details><summary>Answer and explanation</summary>

**B. Store a new copy at each leaf**

Stored references share later mutations. Snapshotting preserves each completed choice sequence.

</details>

### Q168 — Queen diagonal test

**Class-based scenario.** Queens at(r1,c1) and(r2,c2), distinct rows. Diagonal attack condition?

A. |r1−r2|=|c1−c2|  
B. r1+c1 != r2+c2 always attacks  
C. r1=r2 only  
D. c1+c2=n−1 only  

<details><summary>Answer and explanation</summary>

**A. |r1−r2|=|c1−c2|**

Same r−c or r+c identifies the two diagonal directions. Column equality is a separate conflict.

</details>

### Q169 — Four queens count

**Class-based scenario.** Enumerating all standard N-Queens placements for n=4, one queen per row/column. Total solutions?

A. 1  
B. 4  
C. 8  
D. 2  

<details><summary>Answer and explanation</summary>

**D. 2**

Column sequences[1, 3, 0, 2] and[2, 0, 3, 1] are the two placements. Finding the first one is not enumerating both.

</details>

### Q170 — Five queens count

**Class-based scenario.** Enumerating all standard N-Queens placements for n=5. Total solutions?

A. 2  
B. 5  
C. 10  
D. 25  

<details><summary>Answer and explanation</summary>

**C. 10**

A lecturer demonstrating two possibilities does not establish completeness. Exhaustive row/column/diagonal search yields10.

</details>

### Q171 — Search bound assumptions

**Class-based scenario.** Place one queen per row, never reuse a column, check conflicts using O(1) sets. Useful upper bound on search states excluding output-board copying?

A. Guaranteed O(n²)  
B. O(n!)  
C. Θ(2^n) exactly for all n  
D. O(logn)  

<details><summary>Answer and explanation</summary>

**B. O(n!)**

Column-unique branches form partial permutations; diagonals prune them. Scanning board cells or emitting boards adds its own work.

</details>


## Maximum gold path state

Evidence: Day 25 after about 58: 00. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q172 — Component sum is not path sum

**Class-based scenario.** Plus-shaped grid [[0, 1, 0],[1, 1, 1],[0, 1, 0]], four directions, no cell revisited. Maximum gold path sum?

A. 3  
B. 5  
C. 4  
D. 1  

<details><summary>Answer and explanation</summary>

**A. 3**

A path can enter the centre from one arm and leave to one other arm; taking a third arm would require revisiting the centre. Component area/sum5 is not achievable.

</details>

### Q173 — Restore after recursion

**Class-based scenario.** Gold search marks grid[r][c]=0 before exploring. Why restore the saved value on return?

A. To allow revisiting within the same path  
B. Because zeros count as extra gold  
C. Because BFS needs a sorted grid  
D. Other candidate paths/start cells may legally use that cell later  

<details><summary>Answer and explanation</summary>

**D. Other candidate paths/start cells may legally use that cell later**

Temporary marking forbids use in the current path. Permanent global consumption wrongly blocks independent paths.

</details>

### Q174 — Simple gold trace

**Class-based scenario.** Grid [[0, 6, 0],[5, 8, 7],[0, 9, 0]]. Maximum gold without revisits?

A. 35  
B. 23  
C. 24  
D. 29  

<details><summary>Answer and explanation</summary>

**C. 24**

Path7→8→9 gives24. Summing all arms requires revisiting8; 6→8→9 gives23.

</details>

### Q175 — Start coverage

**Class-based scenario.** Gold path may start anywhere. Which outer search is necessary?

A. Only start at(0, 0)  
B. Try every positive cell as a start, preserving input between tries  
C. Only start at maximum-valued cell by greedy guarantee  
D. Skip all cells with one neighbour  

<details><summary>Answer and explanation</summary>

**B. Try every positive cell as a start, preserving input between tries**

An optimal path endpoint need not be the largest cell or top-left. Greedy start choice is not proved by the problem definition.

</details>


## Hamiltonian safety and closure

Evidence: Day 26. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q176 — Closing edge

**Class-based scenario.** A path contains every vertex once, but last vertex has no edge back to first. Is it a Hamiltonian cycle?

A. No; it may be a Hamiltonian path only  
B. Yes because all vertices visited  
C. Yes if last value is largest  
D. Only weights decide  

<details><summary>Answer and explanation</summary>

**A. No; it may be a Hamiltonian path only**

The base case must check the closing adjacency, not simply path lengthV.

</details>

### Q177 — Repeated vertex

**Class-based scenario.** Candidate path0, 1, 2, 1, 3, 0 in a4-vertex graph. What violates Hamiltonian-cycle rules?

A. Returning to0 at end is always forbidden  
B. Any cycle must use exactly one edge  
C. Vertex labels must be sorted  
D. Vertex1 is repeated before closure  

<details><summary>Answer and explanation</summary>

**D. Vertex1 is repeated before closure**

Start repeats only as final closure; all other vertices occur once. Edges alone cannot validate this vertex sequence.

</details>

### Q178 — Vertices versus edges

**Class-based scenario.** What is the essential distinction between Hamiltonian and Eulerian cycles?

A. Both optimize total weight by definition  
B. Hamiltonian requires visiting every edge  
C. Hamiltonian visits vertices once; Eulerian traverses edges once  
D. Eulerian requires every vertex once only  

<details><summary>Answer and explanation</summary>

**C. Hamiltonian visits vertices once; Eulerian traverses edges once**

A connected graph can satisfy one property without the other. Neither name alone states weighted shortest-tour optimization.

</details>

### Q179 — Any cycle versus best tour

**Class-based scenario.** Finding the first Hamiltonian cycle in a weighted graph does what for TSP?

A. Solves TSP optimally automatically  
B. Shows a feasible tour, not necessarily the minimum-weight tour  
C. Proves no other cycle exists  
D. Guarantees polynomial runtime  

<details><summary>Answer and explanation</summary>

**B. Shows a feasible tour, not necessarily the minimum-weight tour**

Existence and optimization are different goals; more expensive valid cycles can be found first.

</details>

### Q180 — Fixing the start

**Class-based scenario.** When enumerating undirected Hamiltonian cycles, fixing start vertex0 removes what redundancy?

A. Cyclic rotations of a tour; reverse-direction duplication may remain  
B. All reverse duplicates automatically  
C. All factorial complexity  
D. The need to check closure  

<details><summary>Answer and explanation</summary>

**A. Cyclic rotations of a tour; reverse-direction duplication may remain**

A reversed cycle may still be enumerated with the same start. Canonical orientation is an additional convention.

</details>


## Brace union, product and nesting

Evidence: Day 26 after about 1: 00. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q181 — Cartesian output

**Class-based scenario.** Expand {a,b}{c,d} under set grammar. Sorted output?

A. [a,b,c,d]  
B. [abcd]  
C. [ac,bd]  
D. [ac,ad,bc,bd]  

<details><summary>Answer and explanation</summary>

**D. [ac,ad,bc,bd]**

Concatenation chooses one member of each set. Commas inside braces form alternatives, not concatenated strings.

</details>

### Q182 — Nested union

**Class-based scenario.** Expand {a,{b,c}}d. Sorted output?

A. [abcd]  
B. [ad,bcd]  
C. [ad,bd,cd]  
D. [a,b,c,d]  

<details><summary>Answer and explanation</summary>

**C. [ad,bd,cd]**

Nested alternatives flatten by union; each selected word concatenates with d.

</details>

### Q183 — Deduplication

**Class-based scenario.** Expand {{a,b},{b,c}}. Sorted unique output?

A. [a,b,b,c]  
B. [a,b,c]  
C. [ab,bc]  
D. [a,c]  

<details><summary>Answer and explanation</summary>

**B. [a,b,c]**

The grammar denotes sets, so repeated b is present once. Sorting alone does not remove duplicates.

</details>

### Q184 — Wrong delimiter match

**Class-based scenario.** A parser pairs first opening brace with the first following closing brace regardless of depth. Why does {a,{b,c}} fail?

A. That first closing brace belongs to the inner group  
B. There is no closing brace  
C. All braces must be flat by this contract  
D. Commas cannot occur in expressions  

<details><summary>Answer and explanation</summary>

**A. That first closing brace belongs to the inner group**

Track nesting depth or use recursive parsing; only depth-zero separators split the current union.

</details>

### Q185 — Output-size lower bound

**Class-based scenario.** Flat groups each choose a or b at n positions, return all length-n strings. Minimum materialization cost?

A. O(n) because parser reads n groups  
B. O(logn)  
C. O(n²) regardless of outputs  
D. Ω(n·2^n) characters  

<details><summary>Answer and explanation</summary>

**D. Ω(n·2^n) characters**

Parsing can be linear in input while expanded output is exponential. Complexity must include generated words.

</details>


## Gray code and bit flips

Evidence: Day 27 before about 47: 50. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q186 — Reflected three-bit sequence

**Extension.** Using g(i)=i^(i>>1),i0..7. Sequence?

A. [0, 1, 2, 3, 4, 5, 6, 7]  
B. [0, 1, 3, 7, 6, 4, 2, 5]  
C. [0, 1, 3, 2, 6, 7, 5, 4]  
D. [0, 2, 4, 6, 1, 3, 5, 7]  

<details><summary>Answer and explanation</summary>

**C. [0, 1, 3, 2, 6, 7, 5, 4]**

XOR each binary index with its right-shifted value. Consecutive binary increments become single Gray-bit changes.

</details>

### Q187 — XOR neighbour

**Class-based scenario.** Current x=3(binary011); toggle bit1 with x^(1<<1). New value?

A. 2  
B. 1  
C. 3  
D. 7  

<details><summary>Answer and explanation</summary>

**B. 1**

011 XOR010=001. OR would keep an already-set bit unchanged.

</details>

### Q188 — Closing pair

**Class-based scenario.** Candidate n2 sequence[0, 1, 3, 2]. Last-to-first XOR?

A. 2, with exactly one set bit  
B. 3, with two set bits  
C. 0  
D. 4 outside range  

<details><summary>Answer and explanation</summary>

**A. 2, with exactly one set bit**

2 XOR0=2(binary10). The cyclic Gray contract checks closure as well as internal pairs.

</details>

### Q189 — Duplicate state

**Class-based scenario.** A sequence toggles one bit each step but revisits an earlier integer. Is it a complete valid n-bit Gray sequence?

A. Yes, one-bit steps are the only rule  
B. Yes if it starts0  
C. Yes if duplicates are adjacent  
D. No; every integer must appear exactly once across2^n positions  

<details><summary>Answer and explanation</summary>

**D. No; every integer must appear exactly once across2^n positions**

Length, range, uniqueness, adjacency and cyclic closure are separate conditions. One-bit changes do not prove completeness.

</details>

### Q190 — Materialized size

**Class-based scenario.** An n-bit Gray sequence returned as fixed-width integer vector has how many entries?

A. n  
B. n²  
C. 2^n  
D. n!  

<details><summary>Answer and explanation</summary>

**C. 2^n**

Each possible n-bit value appears once. Construction/output storage is exponential in number of bits even when per-entry work is constant.

</details>


## Campus Bikes minimum-total objective

Evidence: Day 27 around 47: 50–1: 11. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q191 — Distance metric

**Class-based scenario.** Manhattan distance between(1, 2) and(4, 6)?

A. 5  
B. 7  
C. 25  
D. 3  

<details><summary>Answer and explanation</summary>

**B. 7**

Absolute coordinate differences3+4=7. Euclidean distance5 is a different metric.

</details>

### Q192 — Nearest-pair counterexample

**Class-based scenario.** Workers W0=(0, 0),W1=(2, 0),bikes B0=(1, 0),B1=(−2, 0). A greedy tie assigns W0/B0 first. Its total and optimum?

A. (5, 3)  
B. (3, 5)  
C. (5, 5)  
D. (1, 1)  

<details><summary>Answer and explanation</summary>

**A. (5, 3)**

Greedy distances1+4=5. Alternative W0/B1=2 and W1/B0=1,total3. One local cheapest edge need not minimize assignment sum.

</details>

### Q193 — Used-bike restoration

**Class-based scenario.** Backtracking assigns bike j to worker i then recurses. Before trying another bike for i, what must happen?

A. Keep j marked globally forever  
B. Allow j simultaneously for all workers  
C. Clear every previous worker assignment  
D. Unmark bike j for the sibling branch  

<details><summary>Answer and explanation</summary>

**D. Unmark bike j for the sibling branch**

The used set belongs to the partial assignment. Undo only the current choice while preserving ancestors.

</details>

### Q194 — Complete assignments

**Class-based scenario.** N=2 workers,M=3 distinct bikes, one different bike per worker. How many complete assignments?

A. 3  
B. 9  
C. 6  
D. 2  

<details><summary>Answer and explanation</summary>

**C. 6**

Choose3 bikes for first worker and2 remaining for second: 3×2. Worker identities make assignments ordered.

</details>

### Q195 — Memo state extension

**Extension.** For sequential worker assignment, used bike bitmask has k bits set. Which state is sufficient for minimum remaining cost?

A. Only total cost spent  
B. (workerIndex=k,usedMask), with fixed worker order  
C. Only the last bike index  
D. Only number of unused bikes, ignoring which  

<details><summary>Answer and explanation</summary>

**B. (workerIndex=k,usedMask), with fixed worker order**

Remaining options depend on bike identities; worker index follows the count when each earlier worker was assigned once. Memoization is a small-M extension.

</details>


## Generalized abbreviations

Evidence: Day 27 after about 1: 11. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q196 — Complete ANT set

**Class-based scenario.** Which string is **not** a normalized generalized abbreviation of ANT?

A. A11  
B. A2  
C. 1N1  
D. 3  

<details><summary>Answer and explanation</summary>

**A. A11**

Two consecutive abbreviated characters merge into count2. Separate counts11 are not normalized output for those adjacent characters.

</details>

### Q197 — Pending count leaf

**Class-based scenario.** Pseudocode skips both letters of AB, incrementing pending twice. At leaf, what must be appended?

A. 11  
B. AB  
C. Nothing  
D. 2  

<details><summary>Answer and explanation</summary>

**D. 2**

Flush the run length on reaching the end. Otherwise an all-abbreviated word loses its representation.

</details>

### Q198 — Keep after skips

**Class-based scenario.** For word WORD, skip W and O,keep R,skip D. Normalized output?

A. 11R1  
B. 2R  
C. 2R1  
D. 1R2  

<details><summary>Answer and explanation</summary>

**C. 2R1**

Flush pending2 before literal R, reset, then flush suffix count1 at the leaf.

</details>

### Q199 — Count outputs

**Class-based scenario.** Alphabetic word length 4, choose keep/abbreviate at every position. Number of normalized outputs?

A. 4  
B. 16  
C. 8  
D. 24  

<details><summary>Answer and explanation</summary>

**B. 16**

There are2^4 binary decisions; run-length normalization encodes those masks without merging distinct choices for alphabetic input.

</details>

### Q200 — Breadth versus depth

**Class-based scenario.** BFS queue and DFS recursion enumerate all abbreviation masks correctly. What property must both preserve?

A. Independent path state plus consecutive-run merging  
B. Exactly the same output order  
C. Only a single global pending count shared by branches  
D. Sorted words at every internal node  

<details><summary>Answer and explanation</summary>

**A. Independent path state plus consecutive-run merging**

Traversal order can differ. State corruption or unflushed counts changes the represented abbreviation.

</details>


## Assignment-linked extensions

Evidence: Assignment titles only; not confirmed explained in these lectures. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q201 — Additive leading zeros

**Extension.** For additive-number strings, can a multi-digit numeric field be "01" under the usual decimal contract?

A. Yes whenever its numeric value is1  
B. Yes in every first field  
C. Only if later sums are positive  
D. No; only the single digit0 may begin with0  

<details><summary>Answer and explanation</summary>

**D. No; only the single digit0 may begin with0**

Leading-zero validation is separate from arithmetic equality; otherwise strings with invalid number formatting pass.

</details>

### Q202 — Additive continuation

**Extension.** String112358 can split as1, 1 then repeated sums. Is that split valid?

A. No because first two values must differ  
B. No because sums are products  
C. Yes: 1, 1, 2, 3, 5, 8  
D. Yes only after sorting digits  

<details><summary>Answer and explanation</summary>

**C. Yes: 1, 1, 2, 3, 5, 8**

Use consecutive consumed decimal fields; rearranging digits is not permitted. Long values need safe decimal arithmetic.

</details>

### Q203 — Arrangement uses OR

**Extension.** Beautiful Arrangement at one-based position2, candidate value3. Rule value%position==0 OR position%value==0. Allowed?

A. Yes because values are distinct  
B. No  
C. Yes because2+3 is odd  
D. Yes because one index is smaller  

<details><summary>Answer and explanation</summary>

**B. No**

3%2=1 and2%3=2, so neither divisibility direction holds. Uniqueness is also required, but is not sufficient.

</details>

### Q204 — Arrangement count

**Extension.** Beautiful Arrangement for n=2 under that OR rule. Number of valid permutations?

A. 2  
B. 1  
C. 0  
D. 4  

<details><summary>Answer and explanation</summary>

**A. 2**

Both[1, 2] and[2, 1] satisfy divisibility at positions1 and2. Enumerating arbitrary choices with reuse would overcount.

</details>


## Longer code traces and transfer repairs

Evidence: Mixed class-based reconstructions; individual days named. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q205 — Indirect recursion observation

**Class-based scenario.** Day 1 recursion. C++17:
```cpp
void B(int);
void A(int n){ if(n<=0)return; cout<<"A"<<n<<" "; B(n-1); }
void B(int n){ if(n<=0)return; cout<<"B"<<n<<" "; A(n-2); }
```
What does A(5) print?

A. A5 B4 A3 B2 A1  
B. A5 B3 A1  
C. A5 B4 A2 B1 A0  
D. A5 B4 A2 B1  

<details><summary>Answer and explanation</summary>

**D. A5 B4 A2 B1**

A5 calls B4, which calls A2, then B1, then A−1 stops. Track the different decrements rather than assuming alternation decrements by1.

</details>

### Q206 — Factorial returns versus calls

**Class-based scenario.** Day 1. Pseudocode with exact integers:
```text
calls=0
f(n):
  calls += 1
  if n==0: return 1
  return n*f(n-1)
```
After f(4), which pair(value,calls) is correct?

A. (24, 4)  
B. (120, 5)  
C. (24, 5)  
D. (0, 5)  

<details><summary>Answer and explanation</summary>

**C. (24, 5)**

Calls4, 3, 2, 1, 0 total5; base1 is the multiplicative identity. Return value and invocation count are different measurements.

</details>

### Q207 — Static counter survives runs

**Class-based scenario.** Day 1 counter transfer. Java:
```java
static int calls=0;
static int f(int n){
  calls++;
  if(n==0)return 0;
  return f(n-1)+1;
}
// in main:
f(2); f(1); System.out.print(calls);
```
What prints?

A. 3  
B. 5  
C. 2  
D. 6  

<details><summary>Answer and explanation</summary>

**B. 5**

First invocation tree contributes3 calls; second2. Static state is not reset by calling the method again.

</details>

### Q208 — Low-pivot mirror partition

**Class-based scenario.** Days 4–5. C++17:
```cpp
vector<int> a={30,50,20,70,60};
int i=4,pivot=a[0];
for(int j=4;j>0;--j)
  if(a[j]>pivot) swap(a[i--],a[j]);
swap(a[i],a[0]);
```
Array and i at the observation point?

A. [20, 30, 50, 70, 60], i=1  
B. [20, 30, 60, 70, 50], i=1  
C. [30, 20, 50, 70, 60], i=0  
D. [20, 30, 50, 60, 70], i=1  

<details><summary>Answer and explanation</summary>

**A. [20, 30, 50, 70, 60], i=1**

From the right60 and70 swap with themselves, 20 is skipped, 50 moves to index2. The pivot finally swaps with20 at index1. Mirror scans need their own exact state trace.

</details>

### Q209 — Power side-effect count

**Class-based scenario.** Days 4–5. Exact integer pseudocode; calls initially0:
```text
p(n):
  calls++
  if n==0: return 1
  return p(n//2)*p(n//2)
```
How many entries for p(8), including bases?

A. 5  
B. 16  
C. 17  
D. 31  

<details><summary>Answer and explanation</summary>

**D. 31**

Depth arguments8, 4, 2, 1, 0; a full binary tree with5 levels has1+2+4+8+16=31 entries. This is the duplicated-half variant, not the efficient cached-half variant.

</details>

### Q210 — Sorted occurrence shortcuts

**Class-based scenario.** Day 8. Pseudocode, entry counted, sorted a=[1, 2, 2, 2, 4]:
```text
c(lo,hi):
  calls++
  if lo>hi: return 0
  if a[hi]<2 or a[lo]>2: return 0
  if a[lo]==2 and a[hi]==2: return hi-lo+1
  if lo==hi: return 0
  mid=(lo+hi)//2
  L=c(lo,mid)
  R=c(mid+1,hi)
  return L+R
```
For c(0, 4), result and total entries?

A. (3, 5)  
B. (2, 9)  
C. (3, 9)  
D. (3, 11)  

<details><summary>Answer and explanation</summary>

**C. (3, 9)**

Visited intervals: 0..4; 0..2; 0..1; 0..0; 1..1; 2..2; 3..4; 3..3; 4..4. Count all pruned entries, not just successful ones.

</details>

### Q211 — Koko binary-search log

**Class-based scenario.** Days 10–11. Piles[3, 6, 7, 11],h8; initial lo1,hi11:
```text
while lo<hi:
  mid=(lo+hi)//2
  if hours(mid)<=8: hi=mid
  else: lo=mid+1
```
Tested speeds in order and return?

A. 6, 3, 4; return4  
B. 6, 3, 5, 4; return4  
C. 6, 9, 10; return11  
D. 5, 2, 3; return3  

<details><summary>Answer and explanation</summary>

**B. 6, 3, 5, 4; return4**

At6 hours6 is feasible→hi6; at3 hours10 fails→lo4; at5 hours8→hi5; at4 hours8→hi4. A lower-bound loop keeps a feasible mid instead of discarding it.

</details>

### Q212 — Median partition log

**Class-based scenario.** Days 12–13. A=[1, 2], B=[3, 4, 5, 6], search cutA in[0, 2], leftSize3. First cutA1 then standard direction update. Valid final cut and odd/even median?

A. cutA2,cutB1, median3.5  
B. cutA1,cutB2, median3.5  
C. cutA0,cutB3, median3  
D. cutA2,cutB2, median4.5  

<details><summary>Answer and explanation</summary>

**A. cutA2,cutB1, median3.5**

At cutA1, leftB4>rightA2, so move right. At cutA2 left sides end2 and3, right sides start∞ and4; total6 is even, average3 and4.

</details>

### Q213 — Dijkstra multi-step snapshot

**Class-based scenario.** Day 15. Undirected edges0–1: 6, 0–2: 5, 0–4: 13, 1–2: 12, 1–3: 9, 1–4: 5. Start2, process2 then0. Full tentative dist[0..4] afterwards?

A. [5, 12, 0, 9, 13]  
B. [5, 6, 0,∞, 13]  
C. [0, 6, 5, 15, 11]  
D. [5, 11, 0,∞, 18]  

<details><summary>Answer and explanation</summary>

**D. [5, 11, 0,∞, 18]**

After2 distances are5, 12, 0,∞,∞. Through0 improve1 to5+6=11 and discover4 at5+13=18; 3 is still undiscovered.

</details>

### Q214 — DSU compress then compare

**Class-based scenario.** Days 17–18. Pseudocode parent=[0, 0, 1, 3, 3], find recursively compresses. Execute find(2), then union(2, 4) linking root3 under root0. Parent afterwards?

A. [0, 0, 0, 0, 0]  
B. [0, 0, 1, 3, 2]  
C. [0, 0, 0, 0, 3]  
D. [0, 0, 0, 3, 0]  

<details><summary>Answer and explanation</summary>

**C. [0, 0, 0, 0, 3]**

find2 compresses2 to0. Union finds4→3 but it already directly points3; link parent3=0. Node4 is not automatically compressed again after the union.

</details>

### Q215 — BFS frontier snapshot

**Class-based scenario.** Days 19–21. Graph0:[1, 2], 1:[3, 4], 2:[4], 3:[], 4:[]; directed as listed. Mark on enqueue. After dequeuing/processing0 then1, queue front→back?

A. [3, 4, 2]  
B. [2, 3, 4]  
C. [2, 3, 4, 4]  
D. [1, 2, 3, 4]  

<details><summary>Answer and explanation</summary>

**B. [2, 3, 4]**

Processing0 enqueues1, 2; processing1 removes1 and appends3, 4. Vertex2 has not yet been processed at this point.

</details>

### Q216 — Changing queue bound bug

**Class-based scenario.** Day 24. Java, deliberately faulty; root1 has children2, 3, both leaves:
```java
q.add(root);
long sum=0;
for(int i=0;i<q.size();i++) {
  Node x=q.remove(); sum+=x.val;
  if(x.left!=null) q.add(x.left);
  if(x.right!=null) q.add(x.right);
}
```
At loop end, sum and remaining queue?

A. sum3, queue[3]  
B. sum1, queue[2, 3]  
C. sum6, queue[]  
D. sum4, queue[2]  

<details><summary>Answer and explanation</summary>

**A. sum3, queue[3]**

i0 removes root,queue becomes[2, 3]. i1 sees size2 and removes2,queue size1. i2<1 fails. The loop mixes one child into root level and stops.

</details>

### Q217 — Shared path pop

**Class-based scenario.** Day 25 string-recursion transfer. C++17:
```cpp
vector<string> out;
string p;
for(char c: string("ab")) {
  p.push_back(c);
  for(char d: string("12")) {
    p.push_back(d); out.push_back(p); p.pop_back();
  }
  p.pop_back();
}
```
Output?

A. [a1,a12,ab1,ab12]  
B. [a1,b2]  
C. Four empty strings  
D. [a1,a2,b1,b2]  

<details><summary>Answer and explanation</summary>

**D. [a1,a2,b1,b2]**

Both pushes have matching pops. push_back copies the current string into out; later pops do not mutate those copies.

</details>

### Q218 — Negative greedy transfer limits

**Extension.** Extension: split-array feasibility repeatedly extends a part until its sum would exceed limit, then cuts. Why is the standard proof based on nonnegative elements?

A. Negative values always make the predicate impossible  
B. Binary search needs sorted input elements  
C. Negative later values can lower a sum, invalidating a cut forced by an earlier prefix  
D. Every negative array has exactly one partition  

<details><summary>Answer and explanation</summary>

**C. Negative later values can lower a sum, invalidating a cut forced by an earlier prefix**

Example[5,−4] has final sum1 despite initial prefix5. Greedy forced cutting at a limit below5 cannot model arbitrary signed inputs.

</details>

### Q219 — Coordinate canonicalization

**Extension.** Day 20 extension. Island coordinates[(4, 7),(5, 7),(5, 8)] normalized by subtracting anchor(4, 7). Sorted offsets?

A. [(4, 7),(5, 7),(5, 8)]  
B. [(0, 0),(1, 0),(1, 1)]  
C. [(0, 0),(0, 1),(1, 1)]  
D. [(0, 0),(1, 1),(2, 2)]  

<details><summary>Answer and explanation</summary>

**B. [(0, 0),(1, 0),(1, 1)]**

Subtract row and column independently. A translated copy gives the same offsets; rotations are not silently merged.

</details>

### Q220 — Abbreviation pending state trace

**Class-based scenario.** Day 27. Recursive branch for ABCD: abbreviateA,keepB,abbreviateC,abbreviateD. Pending count resets on keeping a literal. Leaf output?

A. 1B2  
B. 1B11  
C. AB2  
D. 1BCD  

<details><summary>Answer and explanation</summary>

**A. 1B2**

Flush1 before B, then combine the final two skips into2. Flushing on each skipped character would produce invalid adjacent count fragments.

</details>


## Day 3 integrated scenarios

Evidence: Day 3 supplied transcript and existing question file. See the corresponding [concept notes](FS_Concept_Notes.md) and [timestamp map](FS_Lecture_Coverage.md).

### Q221 — state at a specified iteration

From Day 3 Q1; original wording/explanation retained.

```cpp
int a = 10, b = 77;
for (int i = 0; i < 3; ++i) {
    int r = a % b;
    a = b;
    b = r;
}
```

What are (a,b) immediately after the loop?

A. (10, 7)  
B. (3, 1)  
C. (7, 3)  
D. (1, 0)

<details><summary>Answer and explanation</summary>

**C.** The three transitions are (10, 77)→(77, 10)→(10, 7)→(7, 3). Do not count the initial state as an executed iteration. [Notes §3.1](Day_03_Notes.md#31-iteration-trace).

</details>

### Q222 — the return expression depends on the stopping point

From Day 3 Q2; original wording/explanation retained.

```cpp
int f(int a, int b) {
    while (b != 0) {
        int r = a % b;
        a = b;
        b = r;
    }
    return b; // deliberately faulty
}
```

What does f(63, 21) return?

A. 0  
B. 21  
C. 63  
D. A division-by-zero error

<details><summary>Answer and explanation</summary>

**A.** One iteration produces (21, 0); the loop stops before another modulus. Returning b returns zero. Correct repair: return a at this exit, not an arbitrary change to the loop guard.

</details>

### Q223 — a correct-looking swap loses data

From Day 3 Q3; original wording/explanation retained.

```cpp
int f(int a, int b) {
    while (b != 0) {
        a = b;
        b = a % b; // deliberately faulty update order
    }
    return a;
}
```

What is f(14, 6)?

A. 14  
B. 2  
C. 0  
D. 6

<details><summary>Answer and explanation</summary>

**D.** After a=b, both operands of the modulus are 6, so b becomes 0. The result is 6. Save a%b before replacing a. The existence of a shrinking b does not prove correctness: this loop terminates with the wrong invariant.

</details>

### Q224 — wrong recursive arguments

From Day 3 Q4; original wording/explanation retained.

```cpp
int f(int a, int b) {
    if (b == 0) return a;
    return f(a, a % b); // deliberately faulty
}
```

Which result and repair are correct for f(14, 6)?

A. Returns 2; no repair needed  
B. Returns 14; replace the call with f(b,a%b)  
C. Never terminates; use f(a,b-1)  
D. Returns 6; change the base case to return b

<details><summary>Answer and explanation</summary>

**B.** The calls are (14, 6)→(14, 2)→(14, 0), so 14 is returned. The Euclidean identity replaces the pair by (b,remainder), preserving common divisors.

</details>

### Q225 — total calls versus numeric input

From Day 3 Q5; original wording/explanation retained.

```cpp
int calls = 0;
int g(int a, int b) {
    ++calls;
    if (b == 0) return a;
    return g(b, a % b);
}
```

Starting with calls=0, after g(55, 34), what are (return value,calls)? Include the base-case invocation.

A. (1, 8)  
B. (34, 9)  
C. (1, 9)  
D. (1, 55)

<details><summary>Answer and explanation</summary>

**C.** The pairs are (55, 34),(34, 21),(21, 13),(13, 8),(8, 5),(5, 3),(3, 2),(2, 1),(1, 0). Nine calls, eight modulus operations, return 1. The number of calls and number of remainders differ by one.

</details>

### Q226 — early exit with zeros

From Day 3 Q6; original wording/explanation retained.

gcd below is correct, nonnegative, and accepts zero.

```cpp
int seen = 0, result = 0;
for (int x : {0,14,21,25,99}) {
    ++seen;
    result = gcd(result,x);
    if (result == 1) break;
}
```

What are (seen,result) after the loop?

A. (3, 7)  
B. (4, 1)  
C. (5, 1)  
D. (1, 0)

<details><summary>Answer and explanation</summary>

**B.** The results are 0, 14, 7, 1. The loop stops at 25; 99 is untouched. Exiting at result==0 would be wrong because gcd(0, 14)=14. Only 1 guarantees the answer will remain unchanged for all later inputs.

</details>

### Q227 — placing the base case too late

From Day 3 Q7; original wording/explanation retained.

```java
static int g(int a, int b) {
    int r = a % b; // deliberately before the base case
    if (b == 0) return a;
    return g(b,r);
}
```

What happens when g(14, 2) is called?

A. Returns 2  
B. Returns 0  
C. Infinite recursion  
D. Throws ArithmeticException

<details><summary>Answer and explanation</summary>

**D.** First r=0, then the call g(2, 0) tries 2%0 before testing b. Integer modulus by zero throws in Java. Test the base first. The equivalent C++ integer operation has undefined behaviour, not a guaranteed Java-style exception.

</details>

### Q228 — widening after abs is too late

From Day 3 Q8; original wording/explanation retained.

```java
int x = Integer.MIN_VALUE;
long a = Math.abs(x);
long b = Math.abs((long)x);
System.out.println(a + " " + b);
```

Which output is correct?

A. -2147483648 2147483648  
B. 2147483648 2147483648  
C. -2147483648 -2147483648  
D. Compile-time error because abs cannot accept long

<details><summary>Answer and explanation</summary>

**A.** abs(int) cannot represent the positive magnitude of MIN_VALUE and returns the negative int. Assignment then widens that already-negative value. Casting first calls abs(long), whose range contains 2147483648.

</details>

### Q229 — skipping the centre

From Day 3 Q9; original wording/explanation retained.

Input is a nonempty digit string. The table is indexed correctly.

```cpp
bool check(const std::string& s) {
    int l=0, r=static_cast<int>(s.size())-1;
    while (l < r) { // deliberately incorrect for this property
        if (rot[s[l]-'0'] != s[r]-'0') return false;
        ++l; --r;
    }
    return true;
}
```

Which claim is correct for check("161")?

A. Correctly returns false due to the centre 6  
B. Throws because the table contains 6  
C. Incorrectly returns true; use l<=r  
D. Incorrectly returns false; use l!=r

<details><summary>Answer and explanation</summary>

**C.** Only the outer 1s are checked. The centre 6 must map to itself but maps to 9. A reversal may skip its centre; a rotation validator may not. l!=r is also unsafe for even lengths when the pointers cross.

</details>

### Q230 — validating keys without validating pairs

From Day 3 Q10; original wording/explanation retained.

```cpp
bool check(const std::string& s) {
    for (char c : s)
        if (rot[c-'0'] == -1) return false;
    return true;
}
```

Which input is a counterexample, assuming nonempty canonical digit strings?

A. "69"  
B. "68"  
C. "101"  
D. "88"

<details><summary>Answer and explanation</summary>

**B.** Every digit in 68 is rotatable, but rotating the whole string produces 89. A valid-digit check is necessary, not sufficient; mirrored values must correspond.

</details>

### Q231 — a missing map entry

From Day 3 Q11; original wording/explanation retained.

Python code deliberately omits 0→0:

```python
def check(s):
    rot = {'1':'1', '6':'9', '8':'8', '9':'6'}
    l, r = 0, len(s)-1
    while l <= r:
        if s[l] not in rot or rot[s[l]] != s[r]:
            return False
        l += 1
        r -= 1
    return True
print(check('1001'), check('11'))
```

What is printed?

A. True True  
B. KeyError  
C. False False  
D. False True

<details><summary>Answer and explanation</summary>

**D.** 1001 reaches a zero absent from the map. The `or` short-circuits before rot['0'] is accessed, so there is no KeyError. 11 passes. Add the missing key, not a special case rejecting interior zeros.

</details>

### Q232 — palindrome is a different predicate

From Day 3 Q12; original wording/explanation retained.

A checker accepts a digit string iff it equals its reverse. Which input exposes a false positive for strobogrammatic validation?

A. "66"  
B. "101"  
C. "69"  
D. "6889"

<details><summary>Answer and explanation</summary>

**A.** 66 is a palindrome but rotates to 99. 69 and 6889 demonstrate false negatives of the same checker, rather than the false positive requested. Read the requested error direction.

</details>

### Q233 — compare before or after pointer movement?

From Day 3 Q13; original wording/explanation retained.

In a correct l<=r checker for "68889", each successful iteration checks a pair and then does ++l,--r. Which tuple gives (l,r,successful comparisons) immediately after the second iteration?

A. (1, 3, 2)  
B. (3, 1, 3)  
C. (2, 2, 2)  
D. (2, 2, 3)

<details><summary>Answer and explanation</summary>

**C.** The checked pairs are (0, 4) and (1, 3). The middle at (2, 2) has not yet been checked. A third comparison maps 8 to itself and then moves to (3, 1).

</details>

### Q234 — a character is not a numeric index

From Day 3 Q14; original wording/explanation retained.

```cpp
int rot[10] = {0,1,-1,-1,-1,-1,9,-1,8,6};
std::string s = "69";
std::cout << rot[s[0]]; // deliberately faulty
```

Assume ASCII-compatible character values. Which assessment is correct?

A. Prints 9 because s[0] denotes digit 6  
B. Undefined behaviour from an out-of-bounds index; use s[0]-'0'  
C. Guaranteed compiler error  
D. Prints -1 because the lookup defaults to invalid

<details><summary>Answer and explanation</summary>

**B.** s[0] is the character '6', whose ASCII code is 54, not integer 6. Index 54 is outside the array. Do not guess a deterministic output for undefined behaviour. For arbitrary input, validate that the character is a digit before indexing.

</details>

### Q235 — Boolean logic that rejects every digit

From Day 3 Q15; original wording/explanation retained.

To accept only 0, 1, 8 at the centre, code uses:

```cpp
if (d != 0 || d != 1 || d != 8) return false;
```

Which statement is correct?

A. Correctly rejects exactly the invalid centre digits  
B. Only rejects 6 and 9  
C. It should be changed to d==0 && d==1 && d==8  
D. The condition is always true; replace || with &&

<details><summary>Answer and explanation</summary>

**D.** Even d=0 differs from 1 and 8, so the disjunction is true. A digit is invalid if it differs from **all** three allowed values: d!=0 && d!=1 && d!=8. This is De Morgan's law applied to membership in an allowed set.

</details>

### Q236 — built-in does not mean constant-time

From Day 3 Q16; original wording/explanation retained.

A program generates Q candidate strings of length n into a Java ArrayList, then calls list.contains(target). Assume a worst-case unsuccessful search, with long matching prefixes. Which pair of bounds is appropriate for (contains time, auxiliary space of a separate fixed five-entry digit map)?

A. O(nQ), O(1)  
B. O(1), O(n)  
C. O(log Q), O(Q)  
D. O(Q), O(nQ)

<details><summary>Answer and explanation</summary>

**A.** ArrayList.contains scans elements; a string equality comparison may inspect O(n) characters. The fixed digit map has five entries regardless of input length, hence O(1) space. Generation/output memory is a different quantity from the separate map asked about.

</details>

### Q237 — an empty collection is not an empty middle

From Day 3 Q17; original wording/explanation retained.

The r=0 base is changed to return an empty list `[]`. All other rules remain unchanged. What are the counts for N=4 and N=3, respectively?

A. 20, 12  
B. 0, 0  
C. 0, 12  
D. 4, 3

<details><summary>Answer and explanation</summary>

**C.** The even-length chain reaches r=0, returns no middles, and every wrapping loop stays empty. The odd-length chain reaches r=1, whose three centres still generate 12 valid length-three strings. This bug affects one parity, not both.

</details>

### Q238 — same remaining length, different context

From Day 3 Q18; original wording/explanation retained.

Which pair gives the sizes of helper(2, 4) and helper(2, 2)?

A. 4, 4  
B. 5, 4  
C. 5, 5  
D. 4, 5

<details><summary>Answer and explanation</summary>

**B.** (2, 4) is an interior layer, so it includes "00"; (2, 2) is outermost, so it excludes a leading-zero pair. The original length N must remain unchanged throughout recursive calls.

</details>

### Q239 — a wrong condition can preserve the output count

From Day 3 Q19; original wording/explanation retained.

The (0, 0) condition is mistakenly changed from r!=N to r==N. For N=4, what happens?

A. Still produces the same 20 valid strings  
B. Produces 25 valid strings  
C. Produces no strings  
D. Produces 20 strings, but includes leading-zero strings and loses some valid strings

<details><summary>Answer and explanation</summary>

**D.** The interior length-two layer now has four middles, omitting "00". The outer layer has five wrapping pairs including zeros, yielding 4*5=20. Strings such as 0110 are wrongly included; 1001 is lost. Counts alone cannot certify correctness.

</details>

### Q240 — count the choices at the right layers

From Day 3 Q20; original wording/explanation retained.

For the correct generator, how many canonical six-digit strings are returned?

A. 100  
B. 125  
C. 48  
D. 64

<details><summary>Answer and explanation</summary>

**A.** Four nonzero outer pairs, five choices for each of the two interior pairs: 4*5*5=100. 125 incorrectly permits outer zeros; 64 incorrectly forbids zeros inside.

</details>

### Q241 — helper calls are not the number of outputs

From Day 3 Q21; original wording/explanation retained.

A counter increments once on entry to helper. helper(6, 6) calls helper(r−2,N) exactly once at each non-base invocation. What is the total entry count?

A. 100  
B. 6  
C. 4  
D. 7

<details><summary>Answer and explanation</summary>

**C.** The entries are (6, 6),(4, 6),(2, 6),(0, 6). The generator does much of its work in wrapping loops during return, so four helper entries can still create 100 final strings. This helper descends once per level; it does not recursively call once per output.

</details>

### Q242 — allowing 6 and 9 at an odd centre

From Day 3 Q22; original wording/explanation retained.

The r=1 base is changed to ["0","1","6","8","9"]. For N=3, how many strings are generated, and how many are actually strobogrammatic?

A. 12 generated, 12 valid  
B. 20 generated, 12 valid  
C. 20 generated, 20 valid  
D. 12 generated, 8 valid

<details><summary>Answer and explanation</summary>

**B.** Four outer choices times five centres gives 20 strings. Only the three self-mapping centres work, leaving 4*3=12 valid. A valid outer pair cannot repair an invalid centre.

</details>

### Q243 — lexicographic is not numeric across lengths

From Day 3 Q23; original wording/explanation retained.

```python
values = ['8','11','69','101']
print(sorted(values))
```

What is printed?

A. ['8','11','69','101']  
B. ['11','101','69','8']  
C. ['101','8','11','69']  
D. ['101','11','69','8']

<details><summary>Answer and explanation</summary>

**D.** Python compares strings lexicographically. '101' precedes '11' because their first characters match and '0'<'1' at the next position. Numeric sorting would need a numeric key; fixed-length digit strings already have matching lexicographic/numeric order.

</details>

### Q244 — the output itself imposes a lower bound

From Day 3 Q24; original wording/explanation retained.

The correct generator returns Q strings of length n by concatenating at each layer, then sorts them using comparison-based sorting. Which analysis is valid under the stated character-cost model?

A. Generation Θ(nQ); sorting adds O(nQ log Q) worst-case character work  
B. Generation O(n); sorting adds O(log Q)  
C. Generation O(Q); storage O(n) including all output  
D. Generation O(n²); sorting never examines string contents

<details><summary>Answer and explanation</summary>

**A.** Materialising the output writes nQ characters. A string comparison may examine n characters and comparison sorting uses O(Q log Q) comparisons. O(n) recursion depth does not describe the total time spent in the wrapping loops. [Notes §7.4](Day_03_Notes.md#74-output-sensitive-complexity).

</details>

### Q245 — missing the domain guard

From Day 3 Q25; original wording/explanation retained.

```python
def prime(n):
    d = 2
    while d*d <= n:
        if n % d == 0:
            return False
        d += 1
    return True
print(prime(0), prime(1), prime(2))
```

What is printed, and what repair is needed?

A. False False True; none  
B. True False True; reject only zero  
C. True True True; return False when n<2 before the loop  
D. False True False; reject only even inputs

<details><summary>Answer and explanation</summary>

**C.** The loop runs zero times for all three arguments and returns True. Zero and one are not prime. Reject n<2, then allow the no-divisor loop to return True for 2.

</details>

### Q246 — the square-root boundary is inclusive

From Day 3 Q26; original wording/explanation retained.

```python
def prime(n):
    if n < 2:
        return False
    d = 2
    while d*d < n:  # deliberately incorrect boundary
        if n % d == 0:
            return False
        d += 1
    return True
```

What happens for prime(49)?

A. Correctly returns False after checking 7  
B. Incorrectly returns True because 7 is never checked  
C. Infinite loop at 7  
D. Returns False because all odd numbers are composite

<details><summary>Answer and explanation</summary>

**B.** 2–6 fail to divide; at d=7 the strict comparison 49<49 is false. Use <=. The square-root argument requires including the exact root of a square.

</details>

### Q247 — a premature success return

From Day 3 Q27; original wording/explanation retained.

```python
def prime(n):
    if n < 2:
        return False
    d = 2
    while d*d <= n:
        if n % d == 0:
            return False
        return True  # deliberately inside the loop
    return True
print(prime(9))
```

Which assessment is correct?

A. False; 3 is found  
B. Infinite loop because d never changes  
C. Indentation error prevents execution  
D. True; move success after the loop and increment d for each failed candidate

<details><summary>Answer and explanation</summary>

**D.** The first candidate 2 does not divide 9, so True is returned immediately. This code never reaches a next iteration, hence it does not loop forever. A correct loop continues through all candidate divisors before reporting success.

</details>

### Q248 — the same multiplication differs by language

From Day 3 Q28; original wording/explanation retained.

```java
int d = 46341;
System.out.println(d*d);
```

Which statement is correct, including the corresponding C++ int expression on a 32-bit signed int system?

A. Java prints -2147479015; corresponding C++ signed multiplication overflows with undefined behaviour  
B. Both must print 2147488281  
C. Both must throw an arithmetic exception  
D. Java refuses to compile; C++ guarantees wraparound

<details><summary>Answer and explanation</summary>

**A.** The mathematical product is 2147488281, beyond signed 32-bit maximum 2147483647. Java int arithmetic wraps: 2147488281−4294967296=−2147479015. C++ signed overflow does not have a guaranteed numeric result. For positive operands, d<=n/d avoids the overflowing product in a primality guard.

</details>

### Q249 — short circuit changes which methods run

From Day 3 Q29; original wording/explanation retained.

S and P are correct predicates: S checks strobogrammatic strings and P checks primality for these small numbers. Each increments its own call counter once.

```java
int accepted = 0;
for (String s : new String[]{"121","101","69","2882"}) {
    if (S(s) && P(Integer.parseInt(s))) ++accepted;
}
```

What are (S calls,P calls,accepted)?

A. (4, 4, 1)  
B. (4, 2, 2)  
C. (4, 2, 1)  
D. (2, 2, 1)

<details><summary>Answer and explanation</summary>

**C.** Every input calls S. Only 101 and 69 pass it and therefore reach P; 101 is prime, 69 is not. && also skips parsing on the two S failures. Sequential successful predicates cost O(d+√n), not the product, with d digits and numeric value n.

</details>

### Q250 — restricting the map still requires mirrored equality

From Day 3 Q30; original wording/explanation retained.

For the strobogrammatic-palindrome intersection, change entries for 6 and 9 to −1, retaining a correct l<=r pair check. What results are returned for ["69","818","188","0","6"], in that order?

A. false,true,true,true,false  
B. false,true,false,true,false  
C. true,true,false,true,true  
D. false,false,false,false,false

<details><summary>Answer and explanation</summary>

**B.** Only mirrored strings using 0, 1, 8 pass. 188 uses permitted digits but its outer 1 and 8 fail equality. 0 maps to itself. 6 is a one-character palindrome but is not strobogrammatic, so it fails the intersection.

</details>

## Mistake log

| Question | My mistaken assumption | Smallest example | Correct rule | Reattempt |
|---|---|---|---|---|
| | | | | |

Use one sentence to justify an answer without remembering the option letter. If a changed input/contract changes the result, state exactly why. Material checks and their limits are recorded in [validation report](FS_Validation.md).
