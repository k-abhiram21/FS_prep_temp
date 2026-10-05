# Day 3 — coding practice within the FS scope

Study [the notes](Day_03_Notes.md) first. The coding topics here are **recursion and arrays/strings**. Primality is covered through [scenario MCQs](Day_03_MCQ.md#primality-and-combined-predicates--mcq-study), with no standalone prime-coding assignment. No greedy algorithm was taught in Day 3.

## 1. A focused 70-minute block

This replaces an existing recursion/strings block; it does not extend your daily four-hour budget.

| Minutes | Action |
|---:|---|
| 15 | Read GCD identity, rotation mapping, the centre rule and the generator base cases |
| 20 | Implement and debug the two-pointer checker from a blank file |
| 10 | Implement recursive GCD and trace a small array reduction |
| 15 | Attempt the 12-question first-pass MCQ subset listed in the MCQ file |
| 10 | Review the precise bug/assumption behind each miss and record a reattempt |

If Day 2 Climbing Stairs is still weak, use the 10-minute GCD block to reattempt that recurrence and study GCD through the traces/MCQs. Recursive generation is a longer **optional recursion attempt** after these foundations; don't add it on top of the timed block. The intersection checker is a small optional strings transfer.

## 2. Coding tasks, inputs and success criteria

### Task A — check a strobogrammatic number

Write `bool isStrobogrammatic(const string& s)`. Use a map, ten-entry lookup table, or explicit pair conditions. Do not generate every valid number to check one input.

For this exercise, input is canonical decimal text: nonempty, all digit characters, no leading zero except `"0"`. Reject other representations. A platform may guarantee these conditions rather than require validation; follow its statement.

| Input | Expected |
|---|---|
| `0`, `1`, `8`, `69`, `96`, `689`, `1001` | true |
| `6`, `9`, `121`, `161`, `1771`, `2882`, `66`, `1021` | false |
| empty string, `01`, `-69`, `6a9` | false under this exercise's representation policy |

Before coding, answer:

1. Why does the mapping need both 6→9 and 9→6?
2. Why must zero be in the lookup table even though outer zeros are rejected?
3. Why does `left < right` miss a bug that `left <= right` catches?
4. What is the invariant after k successful pair checks?
5. Which memory grows with string length?

Target: Θ(n) worst-case time, O(1) auxiliary space. **Then**, if recursion is your weak area, write a recursive interval checker and explain its Θ(n) stack bound. Pass the string by const reference in C++; copying it in every call wastes time and memory.

### Task B — recursive GCD and GCD of an array

Write `gcdRecursive(a,b)` using the correct argument transition. Normalize negatives, put the base before modulus, and compare it with an iterative implementation if you need more practice.

| Input | Expected |
|---|---:|
| (14,6) | 2 |
| (10,77) | 1 |
| (-14,6) | 2 |
| (0,6), (6,0) | 6 |
| (0,0) | 0, by documented convention |

Next, reduce an array with `g=0`, `g=gcd(g,x)`:

- `[10,20,35]` → 5.
- `[14,2,6]` → 2.
- `[10,20,50,77,100]` → 1; explain why the reduction need not process 100.
- `[0,0,6]` → 6; explain why g=0 is not a safe early exit.
- `[-12,18,0]` → 6; empty input → 0 under this exercise's convention.

Time: pairwise remainder count is logarithmic in the smaller positive magnitude; array reduction has O(k log(M+1)) as a safe upper bound. Stack space differs between iterative and recursive versions. Explain the signed-minimum issue rather than claiming abs is always safe.

### Task C — recursive generation, optional

Write `generateStrobogrammatic(n)` for small positive n. Maintain the original total length while reducing remaining length by two. Output each canonical result once, in sorted order.

Required explanation:

- Base r=0 returns **one** empty middle; r=1 returns exactly 0,1,8.
- A zero pair is allowed inside, and excluded only at the outer layer.
- The original length parameter remains fixed.
- Helper-call count and final output count measure different work.

Checks: n=1 gives `[0,1,8]`; n=2 gives `[11,69,88,96]`; n=3 gives 12 outputs; n=4 gives 20 including 1001 and excluding 0110. State Θ(nQ) generation work for Q output strings, plus sorting cost. The reference limits enumeration to n≤8 because output grows exponentially; that limit is a demo policy.

### Task D — intersection, optional short strings transfer

Check whether a string is both strobogrammatic and a palindrome. Derive the allowed alphabet rather than running every conceivable predicate: only 0,1,8 can occur, and mirrored equality is still required. `818` passes, `188` fails, and `6009` fails. Target Θ(n) time and O(1) auxiliary space.

## 3. College assignments and NeetCode

No supplied college assignment title clearly names Day 3 GCD or strobogrammatic checking/generation. Backtracking titles are related to recursive state, but they are not exact substitutes for these exercises. Do not add N-Queens or Hamiltonian Cycle coding to this day's workload.

| Problem | Relationship | Use |
|---|---|---|
| [Strobogrammatic Number, LC 246](https://leetcode.com/problems/strobogrammatic-number/) | Direct checker match; not NeetCode 150 | Use the local Task A if the platform requires access you don't have |
| [Strobogrammatic Number II, LC 247](https://leetcode.com/problems/strobogrammatic-number-ii/) | Direct generation match; not NeetCode 150 | Optional Task C suffices without relying on platform access |
| [Valid Palindrome, LC 125](https://leetcode.com/problems/valid-palindrome/) | **NeetCode 150; related transfer**, not the same rotation problem | Optional replacement for extra string practice; LC requires ignoring non-alphanumeric characters and case |
| Recursive GCD | Custom lecture exercise; not a confirmed NeetCode 150 match | Task B |

Membership was checked on 5 October 2026 in the [official NeetCode registry](https://github.com/neetcode-gh/leetcode/blob/main/.problemSiteData.json): Valid Palindrome is marked as NeetCode 150. The strobogrammatic tasks are not in its registry. A related NeetCode problem is not mandatory when it duplicates skills already practised locally.

## 4. Hints and solution checkpoints

<details><summary>Checker hint</summary>

Compare the mapped left digit with the actual right digit, rather than comparing the digits directly. The centre is just another pair, with both pointers at the same index. An invalid digit must fail before a lookup with that digit can go out of range.

</details>

<details><summary>GCD hint</summary>

Use the equation a=q*b+r. Any common divisor of a and b also divides r. Replace (a,b) with (b,r) until the second argument is zero, then return the first.

</details>

<details><summary>Generation hint</summary>

For n=4, explicitly derive the five length-two middles, including 00. Each is wrapped with four valid nonzero outer pairs. If the helper's zero-length base returns no elements, there is nothing to wrap.

</details>

<details><summary>Reference and independent completion criteria</summary>

[C++ reference](code/day03_reference.cpp) implements the announced-scope exercises. It is a small local driver, not a college judge signature. Start it with `check 689`, `recursive 161`, `gcd 3 14 2 6`, `generate 3`, or `intersection 818` on standard input.

Call a task independently complete only when you can write it from a blank file, explain the recurrence/invariant, and handle a changed counterexample. Receiving notes or reading a solution does not mark your practice complete.

</details>

## 5. Reattempt log

| Date | Task / MCQ group | Exact wrong assumption | Correct rule | Next attempt |
|---|---|---|---|---|
| | | | | |

Before proceeding, explain three traps aloud: the correct GCD update, why the centre must be checked, and why the empty-middle list has size one. Use [the MCQ error log](Day_03_MCQ.md#error-log) for the non-coding topics.
