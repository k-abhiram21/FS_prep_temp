# DAA Day 2 — practice before reading solutions

Read [Day 2 notes](Day_02_Notes.md), close them, and write the recurrence or invariant before coding. Under [the workflow revised on Day 3](Study_Workflow.md), prioritize recursion/strings here; Happy Number is now math/cycle-analysis revision, not required standalone coding. Existing reference examples remain available.

## 1. Order of work

| Order | Task | Source | Target |
|---:|---|---|---|
| 1 | Fibonacci trace and optimisation drill A | Original exercises from the lecture | Explain repeated work and implement linear time |
| 2 | [Climbing Stairs, LC 70](https://leetcode.com/problems/climbing-stairs/) / [NeetCode version](https://neetcode.io/problems/climbing-stairs/question) | NeetCode 150; directly taught | Implement bottom-up and explain the bases |
| 3 | [Reverse String, LC 344](https://leetcode.com/problems/reverse-string/) | Direct string match on the broader NeetCode list; **not NeetCode 150** | Two-pointer in-place method; then recursive version |
| 4 | [Happy Number, LC 202](https://leetcode.com/problems/happy-number/) | NeetCode 150; directly taught; **MCQ analysis under the revised scope** | Trace digit transformation, termination and cycle-detection snippets |
| 5 | Generalised jumps and Java semantics B–C | Original extensions | Handle m jumps, references, and mutability |
| After FS | [Min Cost Climbing Stairs, LC 746](https://leetcode.com/problems/min-cost-climbing-stairs/) | NeetCode 150 DP extension | Defer new DP implementation under the current coding scope |

The direct NeetCode 150 matches are Climbing Stairs and Happy Number; Reverse String is additional direct lecture practice. This corrects the original Day 2 sheet's membership claim, checked against the [official registry](https://github.com/neetcode-gh/leetcode/blob/main/.problemSiteData.json) on 5 October 2026. Replace a college duplicate only when its statement matches. The supplied titles do not clearly name these problems; U2_BS_SP_LCP tests longest common prefix, not reversal.

## 2. Paper drills

### A — Fibonacci and recursion

1. Trace direct fib(5) as a call tree. Count the leaves and identify repeated arguments.
2. Give the time and stack-space bounds of direct recursion, state recursion with (remaining,a,b), and the iterative method.
3. Trace fibState(6,0,1) as parameter triples. What value is returned?
4. A program calls direct fib(i) for every i=0..n. Why is that wasteful? Give a better design if the program needs every value up to n.

### B — Staircase counting

1. List every route for n=5 with moves 1 or 2. Verify the count.
2. Derive ways(0), ways(1) and ways(2) from the meaning of an empty route.
3. For jumps 1, 2 or 3, calculate ways(4) and list the routes.
4. For n=5,m=4, explain why 113 and 311 are distinct and verify the answer 15.
5. Write a memoized recurrence with the rule for a negative remainder. State the time and space bounds.

### C — Strings

1. Reverse DAA2026 with the two-pointer trace. Record (left,right) after each swap.
2. Explain why left < right is enough for both even and odd lengths.
3. Write recursive reverse(s,left,right) and state its stack bound.
4. Compare a String, StringBuilder, and StringBuffer for repeated concatenation in one thread.
5. Predict the output:

~~~java
String s1 = "genesis";
String s2 = s1;
s1 = s1 + "ng";
System.out.println(s1);
System.out.println(s2);
~~~

### D — Happy number

1. Compute the full sequence for 13 and 116 until the stopping state.
2. Trace sumOfDigitSquares(n), identifying the digit, accumulated sum and remaining n after each % 10 and integer / 10 operation.
3. Why are “stop when the next value is larger” and “stop when it equals the original input” invalid general rules?
4. Explain how a set-based version detects repeats and how a constant-space Floyd version detects a cycle. Analyse supplied snippets rather than assigning another implementation. State the convention for input 0.

## 3. Coding targets

Attempt each without looking at the reference file. Use C++ for the algorithmic tasks if that is the language you plan to submit in FS; use Java snippets separately for the string-semantics questions.

1. fibIterative(n) — support n=0; use long long and document overflow assumptions.
2. fibState(n, a, b) — write a helper and explain why its time is linear but its recursion stack is not constant.
3. climbStairs(n) — bottom-up O(n) time and O(1) space.
4. countWays(n,m) — memoized general-jump version with ways(0)=1 and negative states 0.
5. reverseInPlace(s) — two-pointer C++ string method; also write the recursive form.

Happy Number's existing reference is optional reading; it is excluded from required coding under the revised scope.

For each function, write one boundary case, one normal case, and the complexity before coding. Reattempt the same function after a break without opening the notes.

## 4. Hints

<details>
<summary>Fibonacci</summary>

Direct recursion branches into two calls and recomputes the same argument. State recursion advances (a,b) to (b,a+b) once per level. The loop is the same state transition without stack frames.

</details>

<details>
<summary>General jumps</summary>

Group by the final jump. If the remaining amount is negative, there is no route; if it is zero, the already chosen prefix is one complete route.

</details>

<details>
<summary>Reverse String</summary>

Swap the outer pair first. The next subproblem is the interval (left+1,right-1). The middle character of an odd-length string needs no change.

</details>

<details>
<summary>Happy number</summary>

The set must be checked before adding the current state a second time. Alternatively, use the known decimal shortcut n==1 or n==4, but explain why that shortcut is domain-specific.

</details>

## 5. Answer key — open after attempting

<details>
<summary>A: recursion</summary>

1. fib(5) has 15 total calls and 8 base-case leaves under the direct definition; the exact count follows C(n)=C(n−1)+C(n−2)+1, with C(0)=C(1)=1. The important observation is repeated fib(3), fib(2), etc.
2. Direct: exponential time, Θ(n) stack. State recursion: Θ(n) time, Θ(n) stack. Iterative: Θ(n) time, Θ(1) auxiliary space.
3. fibState(6,0,1) returns 8.
4. Compute the sequence once, storing prior values or using two rolling variables; do not launch a new exponential tree for each i.

</details>

<details>
<summary>B: stairs</summary>

1. For n=5: 11111, 1112, 1121, 1211, 2111, 122, 212, 221. The total is 8.
2. ways(0)=1 counts the empty sequence needed to complete a route whose final move reaches exactly step 0; ways(1)=1 has only 1; ways(2)=2 has 11 and 2.
3. ways(4) with 1–3 jumps is 7: 1111,112,121,211,22,13,31.
4. ways(5,4)=15.
5. ways(r)=sum(ways(r−j), j=1..m), with ways(0)=1 and ways(r<0)=0; memoization is O(nm) if each of n states scans m jumps, with O(n) stored state.

</details>

<details>
<summary>C: strings</summary>

1. DAA2026 swaps index pairs (0,6), (1,5), and (2,4), leaving index 3 unchanged; the result is 6202AAD.
2. Pointers have already fixed every outer pair once they meet/cross; a middle character maps to itself.
3. Base left>=right; otherwise swap and recurse inward. Θ(n) time and Θ(n) stack.
4. String immutable; StringBuilder mutable and faster for one-thread construction; StringBuffer mutable and synchronized.
5. Output is genesisng then genesis; reassignment changed only s1’s reference.

</details>

<details>
<summary>D: happy number</summary>

1. 13→10→1; 116→38→73→58→89→145→42→20→4.
2. Repeatedly take the last digit with %10, add its square, then remove it with integer /10.
3. A sequence may increase before reaching its cycle, and its cycle need not contain the original input.
4. Set version returns false on a repeated state; for 0, return false before the loop or treat 0 as an already-seen non-1 state.

</details>

## 6. Readiness log

- [ ] I can explain direct Fibonacci’s repeated subproblems without relying on call-count memorisation.
- [ ] I can derive both staircase base cases and the general-jump recurrence.
- [ ] I can reverse a mutable sequence and state the loop invariant.
- [ ] I can predict the String/StringBuilder reference example.
- [ ] I can calculate a happy-number sequence and identify a valid cycle stop.

| Date | Task | Mistake or uncertainty | Correct rule | Reattempt result |
|---|---|---|---|---|
| | | | | |
