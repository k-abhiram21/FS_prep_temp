# DAA: focused FS revision in Java

For the screening test on **9 October 2026**. Coding scope: **recursion, arrays and strings, greedy method**. DAA also appears in the MCQ list, but the notice does not specify all of its MCQ subtopics.

[All subject notes](../FS_SUBJECT_NOTES.md) · [Complete Java DAA package](README.md) · [Algorithm Atlas](../DS/visualize/README.md)

**ai explnation due to lack of material** — the condensed explanations and new examples here are AI-authored revision aids. Existing college notes and lecture-based DAA material are available; this label applies to the supplementary explanation, not to a claim that DAA sources are absent.

## 1. Analyse work, then name the complexity

Count how often the work runs as input size grows. Distinguish total work from the maximum memory used at one time.

| Pattern | Typical time | Reason |
|---|---|---|
| One full array scan | Θ(n) | One bounded amount of work per element. |
| Two consecutive full scans | Θ(n) | n+n is 2n, not n². |
| Nested scans of lengths n and n | Θ(n²) | n choices for each of n iterations. |
| Repeatedly halve a positive search range | Θ(log n) | After k steps, its size is approximately n/2^k. |
| Comparison-based merge sort | Θ(n log n) | Logarithmically many levels, with linear work per level. |
| Simple linear recursion | Often Θ(n) | n calls when each call does bounded work. |

These rows assume the stated work pattern. A nested loop does not automatically mean n²: two pointers can each advance at most n times. Big-O gives an upper bound; Θ gives a tight asymptotic bound. Big-O does not, by itself, mean “worst case.” Specify which case you are analysing.

Auxiliary space excludes input storage. State whether output storage is counted. Recursion uses stack space even when the method creates no arrays.

## 2. Recursion: prove progress toward a base case

For every recursive method, identify the smallest direct answer, the smaller subproblem, and how the answers combine.

```java
static int sumTo(int n) { // contract: n >= 0; result must fit int
    if (n == 0) return 0;
    return n + sumTo(n - 1);
}
```

Trace `sumTo(3)`:

1. `sumTo(3)` waits for `sumTo(2)`.
2. `sumTo(2)` waits for `sumTo(1)`.
3. `sumTo(1)` waits for `sumTo(0)`.
4. The base call returns 0. The waiting calls return 1, then 3, then 6.

The argument decreases by one while remaining nonnegative. Thus it reaches zero under the contract. There are n+1 calls: Θ(n) time and Θ(n) stack space. Very deep recursion can exhaust the Java stack before a mathematically valid computation finishes.

Naive Fibonacci makes overlapping calls. Its call count grows exponentially, although maximum stack depth is only linear. Memoization stores answers to repeated subproblems; the usual Fibonacci version then needs O(n) time and O(n) storage.

For backtracking, follow **choose → explore → undo**. Undo a mutable choice before exploring the next alternative. Generating all subsets still requires exponential output in the worst case; memoization cannot remove the cost of producing required answers.

Practise with [Day 1](Day_01_Notes.md), [Day 2](Day_02_Notes.md), and [Day 3](Day_03_Notes.md). Use [the recursion reference programs](code/README.md) after your attempt.

## 3. Arrays and strings: choose a method from the contract

| Situation | Method to consider | Condition that makes it valid |
|---|---|---|
| Pair sum in a sorted array | Two pointers | Moving a pointer changes the sum in a predictable direction. |
| Pair sum in an unsorted array | Hash lookup | Look for the complement among previously seen values. |
| Repeated range sums | Prefix sums | Range [l,r) equals prefix[r]−prefix[l]. |
| A best contiguous interval | Sliding window | You can update the state when each end moves; the shrink rule must be valid. |
| Character counts or duplicates | Frequency table or map | The key representation must match the permitted characters. |
| Palindrome or reversal | Pointers from both ends | Compare or swap matching positions. |

### Worked two-pointer trace

For `[1, 2, 4, 6]` and target 8, start with 1 and 6. Their sum is 7. Move the left pointer: keeping 6 and choosing a larger left value can increase the sum. Now 2+6 is 8.

```java
static boolean hasPair(int[] a, long target) { // a sorted ascending
    int left = 0, right = a.length - 1;
    while (left < right) {
        long sum = (long) a[left] + a[right];
        if (sum == target) return true;
        if (sum < target) left++;
        else right--;
    }
    return false;
}
```

When the sum is too small, the current left value cannot work with any smaller right value. Discarding that left position is safe. The symmetric argument applies when the sum is too large. Each iteration removes a position, giving O(n) time and O(1) auxiliary space.

**Trap:** this proof depends on sorted order. Sorting first costs time and can change original indices. Do not use the same pointer rule on an arbitrary unsorted array.

### Prefix sum boundaries

For `[2, -1, 3]`, define prefix `[0, 2, 1, 4]`. The sum of indices 1 through 2 is `prefix[3] - prefix[1] = 4 - 2 = 2`. Defining a leading zero avoids a special case for intervals starting at index 0.

### Sliding-window limits

With nonnegative values, extending a sum window cannot decrease its sum. With negative values, that property fails. For example, `[5, -4]` totals 1 although its first value exceeds 1. A rule that always discards a window as soon as its sum exceeds 1 would miss that result.

Java strings are immutable. Use `char[]` or `StringBuilder` for controlled changes. A frequency array of size 26 is suitable only when the contract restricts input to the mapped alphabet. See [language semantics](../Programming/Java_FS_Revision_Notes.md).

## 4. Greedy: justify the local choice

A greedy method makes a choice and continues without exploring every alternative. It needs a reason why some optimal solution can include that choice.

### Interval selection

Goal: select the largest number of non-overlapping intervals. Sort by finish time. Take the earliest-finishing compatible interval, then repeat. Here an interval can start exactly when the previous one ends.

For `[1,3]`, `[2,5]`, `[3,4]`, `[4,6]`, the finish order is `[1,3]`, `[3,4]`, `[2,5]`, `[4,6]`. Select `[1,3]`, then `[3,4]`, skip `[2,5]`, and select `[4,6]`: three intervals.

Why it works: replace the first interval in an optimal schedule with an earliest-finishing one. It finishes no later, so it leaves at least as much time for the remaining intervals. Repeat that argument for the remaining subproblem. This reasoning applies to maximum interval count, not automatically to maximum weighted value.

### Fractional knapsack

When parts of items are allowed, prefer the highest value per unit weight. With items `(weight=10,value=60)` and `(weight=20,value=100)` and capacity 15, take all of the first and 5 weight units of the second: `60 + 5×5 = 85`.

The reasoning depends on divisibility: moving some capacity from a lower ratio to a higher ratio cannot reduce total value. For 0/1 knapsack, items are indivisible, so this exchange can be impossible.

### Counterexample to a tempting rule

For coins `[1,3,4]` and amount 6, repeatedly taking the largest coin gives `4+1+1`, three coins. `3+3` needs two. “Choose the largest coin” is not correct for every coin system.

Check [the college greedy unit](<college/UNIT-II_DAA.pdf>) and [existing greedy explanations](../DS/FS_Concept_Notes.md). State whether stock trades, interval boundaries, or fractional selections are permitted before choosing an algorithm.

## 5. Data-structure and algorithm MCQ reminders

These are quick reminders. Use [the full concept notes](../DS/FS_Concept_Notes.md) for the broader DAA MCQ coverage already prepared. Those older concept notes include C++ examples; the runnable examples in this revision sheet use Java.

| Topic | Essential distinction |
|---|---|
| Stack / queue | Last in, first out / first in, first out. |
| Binary search | Requires a sorted search order or another monotone decision rule. |
| BFS / DFS | BFS explores by edge distance; DFS explores a path before backtracking. |
| BFS shortest paths | Valid for unweighted graphs or equal edge costs; unequal weights need another method. |
| Hash lookup | Often expected O(1) under hashing assumptions; not an unconditional worst-case guarantee. |
| Balanced search tree | Ordered operations generally O(log n); an ordinary unbalanced BST can become linear. |
| Stable sort | Equal-key elements preserve their relative order. This is separate from in-place storage. |
| Divide and conquer / dynamic programming | Divide into subproblems / store reusable subproblem answers when overlap occurs. |

## 6. A coding-answer checklist

1. Restate the input, output, and constraints. Check duplicates, negative values, and empty input.
2. Explain a simple solution. Identify which repeated work needs improvement.
3. State the key property that makes the improved method safe.
4. Trace one small example before writing code.
5. Use the correct numeric type. Cast before an overflowing operation.
6. Check one-element input, boundary equality, and a case with no answer.
7. Give time and auxiliary-space costs, including recursion and sorting.

The test has three coding questions and a total duration of two hours; the notice separately assigns 30 minutes to MCQs. Follow the platform's actual section timing. If time is freely shared, the remaining 90 minutes must cover reading, coding, and checking all three answers.

## Final self-check

1. Why are two consecutive n-element scans linear?
2. What is the stack-space cost of `sumTo(n)`?
3. Which property permits the pair-sum pointer moves?
4. Why can negative numbers break a sum-window shrink rule?
5. What makes earliest-finish interval selection safe?
6. Why does ratio sorting not solve every 0/1 knapsack problem?

<details>
<summary>Answers and reasons</summary>

1. The total work is n+n = 2n, so it grows linearly.
2. Θ(n): the calls remain active until the base call returns.
3. Sorted order makes the effect of each pointer move predictable and justifies discarding that endpoint.
4. Extending a window can reduce its sum, so discarding it too early can lose a valid answer.
5. Exchanging an optimal schedule's first interval for one that finishes no later preserves room for the remaining choices.
6. The fractional exchange argument requires dividing items; an indivisible selection can need a different combination.

</details>
