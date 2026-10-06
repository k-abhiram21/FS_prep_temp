# DAA Day 1 — practice before reading solutions

Read [the notes](Day_01_Notes.md), then attempt these with the relevant section closed. This is an FS-focused set, not a request to complete an entire problem sheet.

## 1. What to solve, and in what order

| Order | Task | Source | Required result |
|---:|---|---|---|
| 1 | Paper drills A–D below | Original exercises based on this lecture | Trace correctly and explain the reason |
| 2 | [Product of Array Except Self, LC 238](https://leetcode.com/problems/product-of-array-except-self/) / [NeetCode version](https://neetcode.io/problems/products-of-array-discluding-self/question) | **NeetCode 150; directly taught** | Derive brute force, implement no-division Θ(n) solution |
| 3 | [Climbing Stairs, LC 70](https://leetcode.com/problems/climbing-stairs/) / [NeetCode version](https://neetcode.io/problems/climbing-stairs/question) | **NeetCode 150; directly taught** | Derive recurrence; trace recursion at n=4; implement efficient solution |
| 4 | Recursive array sum below | Original transfer exercise | Apply base case/progress to a fresh linear recursion |
| Later | [Min Cost Climbing Stairs, LC 746](https://leetcode.com/problems/min-cost-climbing-stairs/) | NeetCode 150 extension | Wait for DP; minimising cost is different from counting routes |

Membership of these three linked NeetCode tasks was checked in the [official NeetCode repository's problem registry](https://github.com/neetcode-gh/leetcode/blob/main/.problemSiteData.json) on 4 October 2026. Only the first two are direct matches to this lecture. Factorial, arrangement counting and recursion output questions remain useful paper/local drills; they need not be forced into NeetCode 150.

**College assignment match:** none of the titles you supplied is an unambiguous direct match to the lecture's two main coding problems. `U2_BS_AP_StairCase` is unresolved: its binary-search prefix suggests a different staircase task. If its statement asks for ways to climb using moves of one/two, use it in place of LC 70. If it asks how many full rows can be built from coins, it is an Arranging Coins-style binary-search problem; defer it. [Arranging Coins](https://leetcode.com/problems/arranging-coins/description/) and Climbing Stairs ask different quantities. Do not attempt both copies if the college statement is the same problem.

## 2. A manageable Day 1 session

Use this **90-minute** practice block within [your current college/home plan](../FS_REMAINING_DAYS_PLAN.md). It was originally designed for the earlier four-hour schedule; the block itself remains useful:

| Minutes | Action |
|---:|---|
| 30 | Read core notes: exclusive products; O/Ω/Θ; stack; factorial; output examples; staircase recurrence. Skim optional optimisation/DP previews. |
| 20 | Attempt paper drills A–D. Check answers only after finishing. |
| 25 | Attempt Product Except Self. If stuck for 15 minutes, use one hint, close it and implement. |
| 10 | Derive/trace Climbing Stairs; write bases and recurrence. |
| 5 | Record a concrete error and tomorrow's reattempt. |
| **90** | **Total** |

The full notes are longer than a revision sheet. If recursion is new, this cap may not be enough: split the reading across 4–5 October, preserve one coding attempt and mark the remaining sections pending. On 5 October, use the first 25 minutes of the existing 70-minute recursion block to code Climbing Stairs. **Do not add this session on top of four hours already allocated to other subjects.**

For the 20-minute paper block, prioritise A's first array, B1/B6, C2/C3/C6 and D3/D4. The remaining drills are a bank for weak-item reattempts, not additional required work today.

## 3. Paper drills — questions

### A. Prefix/suffix products

For `[2,3,4,5]`, write the exclusive left array, exclusive right array and final output. Explain why both boundary entries are 1. Then predict the outputs for `[2,0,4]`, `[0,2,0]`, and `[2,2,3]`.

### B. Complexity and bounds

1. Give constants c and n₀ proving `5n+7 ∈ O(n)`.
2. Give c₁,c₂,n₀ proving `2n²+3n+1 ∈ Θ(n²)`.
3. Classify three separate n-iteration loops.
4. Classify `for i=0…n−1`, with an inner loop `j=0…i−1` and O(1) work in its body.
5. Classify a positive-n loop that divides its control value by 2 until zero.
6. Is “Θ means average case” correct? Explain in one sentence.

### C. Trace calls, returns and state

Use the precise reconstructed functions in notes sections 6–8:

1. Trace factorial(4), writing the returned value at each frame. Is it tail recursive?
2. Predict head(3) and tail(3).
3. With count reset to zero, predict printed values, count and maximum active depth for tree(3).
4. Move count++ inside tree's positive-n branch. What is count for tree(2)?
5. Predict A(10) from the indirect example. Include the final call that prints nothing.
6. With local n=3, compare the value passed and the caller's resulting n for `f(n−1)`, `f(n--)`, `f(--n)`. Why can postfix fail to terminate?

### D. Counting and recurrences

1. Count distinct arrangements of `AABC` and `BANANA`.
2. Compute F(6), using F(0)=0, F(1)=1.
3. Enumerate all one/two-step routes for n=4.
4. Compute W(6) and W(10). State the relationship to F.
5. For allowed moves {1,2,3}, derive a recurrence and compute the number of routes for n=4.

## 4. Coding tasks — attempt specifications

### Task 1: Product Except Self

Before coding, write: “left[i] excludes a[i]; right[i] excludes a[i].” Make a brute-force function for a tiny example, then implement the lecture's two-array solution. The optional output-array/scalar method comes after the two-array method makes sense.

Acceptance checks:

- `[3,2,1,4,5] → [40,60,120,30,24]`
- `[2,0,4] → [0,8,0]`
- `[0,2,0] → [0,0,0]`
- `[-1,2,-3,4] → [-24,12,-8,6]`
- `[2,2,3] → [6,6,4]`

Explain why overwriting input during the brute-force scan is unsafe, why three passes are linear, and how output space differs from auxiliary space. Use the platform's required method signature and supported numeric types.

### Task 2: Climbing Stairs

First write recursive code for small n. Do not use naive recursion on large tests merely because it works for n=4. Add memoisation to retain recursion and avoid repeated work, or use two-value iteration if the task permits it.

Checks: `W(1)=1`, `W(2)=2`, `W(3)=3`, `W(4)=5`, `W(5)=8`, `W(10)=89`. If extending the function to n=0, explicitly document the empty-sequence convention W(0)=1.

Explain why you add W(n−1) and W(n−2), why W(n) is F(n+1), and why an exponential number of calls still needs only a linear-depth stack.

### Task 3: transfer to recursive array sum

Given `[3,-2,5,0]`, define `sumFrom(a,i)` as the sum from index i to the end. Write the base case and recursive step, then implement it. Expected total: 6. Expected complexities: Θ(n) time, Θ(n) stack for a length-n array. Also handle an empty array under the same rule.

This is a custom exercise, not a problem confirmed to be on NeetCode 150 or your college judge.

## 5. Hints — open only if stuck

<details>
<summary>Product Except Self</summary>

For each i, divide the positions into those strictly left and strictly right. Can the next left product be built from the previous left product using only one multiplication? Starting product is 1.

</details>

<details>
<summary>Climbing Stairs</summary>

Partition routes by the last move. The last move is either one or two; these cases cannot describe the same route. Cache by remaining steps because that number determines the answer.

</details>

<details>
<summary>Recursive array sum</summary>

If i equals the array size, nothing remains, so return 0. Otherwise return a[i] plus the answer for i+1.

</details>

## 6. Paper answer key — check after attempting

<details>
<summary>A: products</summary>

Left `[1,2,6,24]`; right `[60,20,5,1]`; output `[60,40,30,24]`. Empty products are 1. Zero/duplicate checks: `[0,8,0]`, `[0,0,0]`, `[6,6,4]` respectively.

</details>

<details>
<summary>B: complexity</summary>

1. c=12,n₀=1 works because 7≤7n for n≥1. Alternatively c=6,n₀=7.
2. c₁=2,c₂=6,n₀=1: `2n² ≤ 2n²+3n+1 ≤ 6n²`.
3. Θ(n), since 3n visits.
4. Θ(n²), since `n(n−1)/2` visits.
5. Θ(log n) for growing positive n.
6. No; Θ is a tight asymptotic bound, and an average-case cost function requires a specified distribution.

</details>

<details>
<summary>C: recursion</summary>

1. f(1)→1, f(2)→2, f(3)→6, f(4)→24; multiplication remains after the child, so not tail recursive.
2. head: `1 2 3`; tail: `3 2 1`.
3. tree(3) prints `3 2 1 1 2 1 1`; count=15; maximum tree-call depth=4.
4. count=3, because zero-argument calls are no longer counted.
5. A(10)→B(9)→A(4)→B(3)→A(1)→B(0); printed `10 9 4 3 1`.
6. n−1 passes 2 and leaves local n=3; postfix passes 3 and sets local n=2; prefix passes 2 and sets local n=2. Postfix's child starts with the old positive value, so an equivalent child call can keep repeating.

</details>

<details>
<summary>D: counting</summary>

1. AABC: `4!/2!=12`. BANANA: A occurs three times, N twice, B once; `6!/(3!·2!)=60`.
2. F(6)=8.
3. `1111`, `112`, `121`, `211`, `22`: five routes.
4. W(6)=13; W(10)=89; W(n)=F(n+1).
5. V(n)=V(n−1)+V(n−2)+V(n−3), V(0)=1,V(negative)=0. V(1)=1,V(2)=2,V(3)=4,V(4)=7.

</details>

## 7. Readiness check and reattempts

Mark each as **independent / needed hint / pending**:

- [ ] Fill left/right/output correctly, including zero cases.
- [ ] Prove a linear/quadratic bound with explicit constants.
- [ ] Trace one linear and one branching recursion without running it.
- [ ] Separate prints, total calls and maximum active depth.
- [ ] Explain postfix versus prefix decrement under Java rules.
- [ ] Derive staircase bases and recurrence from the story.
- [ ] Implement one changed example without copying the reference.

Before the next lecture, reattempt the specific weak item for 5–10 minutes. Repeat it again on 7 or 8 October if it remains shaky. These are study checks, not a prediction of your exam score. Completing every checklist item on familiar examples still calls for some fresh mixed practice.

| Date | Task/question | Specific wrong assumption or bug | Correct rule | Reattempt result |
|---|---|---|---|---|
| | | | | |

Solutions for comparison are in [Day01Reference.java](code/Day01Reference.java); do not begin practice by reading them.
