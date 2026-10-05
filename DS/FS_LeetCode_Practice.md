# Exact LeetCode practice pool — class matches and broader transfer

This expands the earlier eight-problem shortlist. Solved status below is checked against **all 144 distinct IDs in your pasted inventory**, not inferred from familiarity. “New” means absent from that paste; it does not assert your current account history. Links name exact problems; relationships refer to the [lecture evidence](FS_Lecture_Coverage.md).

**P1:** first closed-book coding attempts. **P2:** class-method repair or next attempt if needed. **D:** 5–8 minute diagnostic, then a full attempt only if weak. **B:** breadth after P1/weak foundations. **M:** notes + MCQ/paper trace before this FS; full implementation later. **L:** later/advanced extension. These are recommended priorities, not confirmed question weightage. An array container or recursive call alone does not make every graph/search problem mandatory coding.

Your old eight problems remain useful, but the new lecture evidence adds Product Except Self, Stock II, Maximum Swap and sorting-method drills. Do not do the whole pool before 9 October. Pick the weakest 6–8 coding attempts overall, including local greedy gaps, and reattempt errors.

## Exact pool

| LC | Problem | Your paste | Priority | Relation | What to demonstrate |
|---:|---|---|---|---|---|
| 238 | [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) | New | P1 | Day 1 direct | No division; prefix/suffix; zeros |
| 1 | [Two Sum](https://leetcode.com/problems/two-sum/) | Solved | P1 | Transfer | Complement invariant; expected hash cost |
| 3 | [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) | Solved | P1 | Transfer | Sliding-window invariant, repeated character inside/outside window |
| 78 | [Subsets](https://leetcode.com/problems/subsets/) | Solved | P1 | Recursion transfer | Choose/undo; output copying; total output cost |
| 55 | [Jump Game](https://leetcode.com/problems/jump-game/) | Solved | P1 | Greedy transfer | Farthest reachable invariant; failing zero |
| 122 | [Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/) | New | P1 | Days 15–16 direct | Unlimited transactions; sum positive differences; no fee/cooldown |
| 26 | [Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) | Solved | P2 | Transfer | Two pointers; valid prefix length |
| 560 | [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) | Solved | P2 | Extension | Prefix counts; negative values defeat simple sliding sum |
| 22 | [Generate Parentheses](https://leetcode.com/problems/generate-parentheses/) | Solved | P2 | Recursion transfer | Never close more than opened; leaf copies |
| 435 | [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/) | Solved | P2 | Activity-selection transfer | Greedy earliest finish; removal count differs from selected count |
| 14 | [Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/) | Solved | P2 | Days 10–11 direct | Column scan AND explain set-reset variant |
| 169 | [Majority Element](https://leetcode.com/problems/majority-element/) | Solved | P2 | Days 4–5 direct | Implement D&C as method drill; compare voting and verify without promise |
| 50 | [Pow(x, n)](https://leetcode.com/problems/powx-n/) | Solved | P2 | Days 4–5 direct | Single recursive half; widen negative exponent |
| 670 | [Maximum Swap](https://leetcode.com/problems/maximum-swap/) | New | P2 | Day 18 direct | Rightmost suffix maximum; only one swap |
| 912 | [Sort an Array](https://leetcode.com/problems/sort-an-array/) | New | P2 | Days 4–6 method transfer | Write merge sort; trace class Lomuto separately; no library sort |
| 121 | [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) | Solved | P2 | Days 15–16 direct | One transaction; contrast LC122 |
| 125 | [Valid Palindrome](https://leetcode.com/problems/valid-palindrome/) | Solved | D | Day 3 related | Normalization differs from strobogrammatic checker |
| 509 | [Fibonacci Number](https://leetcode.com/problems/fibonacci-number/) | Solved | D | Days 1–2 direct | Iterative/state recurrence; compare exponential tree |
| 70 | [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) | Solved | D | Days 1–2 direct | Ways(0)=1; ordered steps; distinct from coin rows |
| 344 | [Reverse String](https://leetcode.com/problems/reverse-string/) | New | D | Day 2 direct | In-place character array; compare recursive stack |
| 455 | [Assign Cookies](https://leetcode.com/problems/assign-cookies/) | Solved | D | Greedy transfer | Sorted demands/resources; consume cookie once |
| 88 | [Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/) | Solved | D | Merge transfer | Merge from back; not complete merge-sort implementation |
| 27 | [Remove Element](https://leetcode.com/problems/remove-element/) | Solved | B | Array transfer | Return logical length; order requirement |
| 283 | [Move Zeroes](https://leetcode.com/problems/move-zeroes/) | Solved | B | Array transfer | Stable nonzero prefix and in-place writes |
| 189 | [Rotate Array](https://leetcode.com/problems/rotate-array/) | Solved | B | Rotation transfer | k modulo length; rotation itself differs from finding pivot |
| 242 | [Valid Anagram](https://leetcode.com/problems/valid-anagram/) | Solved | B | String transfer | Counts and alphabet assumption |
| 151 | [Reverse Words in a String](https://leetcode.com/problems/reverse-words-in-a-string/) | Solved | B | String transfer | Whitespace handling; word order |
| 15 | [3Sum](https://leetcode.com/problems/3sum/) | Solved | B | Array extension | Sort/two pointers; skip duplicates; widen sums |
| 53 | [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) | Solved | B | Array extension | All-negative case; contiguous requirement |
| 11 | [Container With Most Water](https://leetcode.com/problems/container-with-most-water/) | Solved | B | Greedy extension | Why move smaller wall; not max width alone |
| 56 | [Merge Intervals](https://leetcode.com/problems/merge-intervals/) | Solved | B | Array extension | Merge versus select; touching endpoints contract |
| 45 | [Jump Game II](https://leetcode.com/problems/jump-game-ii/) | Solved | B | Greedy extension | Reachability versus minimum jumps; frontier layers |
| 860 | [Lemonade Change](https://leetcode.com/problems/lemonade-change/) | Solved | B | Greedy extension | Prefer 10+5 for a20; availability matters |
| 402 | [Remove K Digits](https://leetcode.com/problems/remove-k-digits/) | Solved | B | Greedy/stack extension | Pop while decreasing; leftover deletions; leading zeros |
| 17 | [Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) | Solved | B | String recursion transfer | Cartesian choices; empty input contract |
| 39 | [Combination Sum](https://leetcode.com/problems/combination-sum/) | Solved | B | Recursion extension | Reuse allowed; positive values assure progress |
| 40 | [Combination Sum II](https://leetcode.com/problems/combination-sum-ii/) | Solved | B | Recursion extension | No reuse; equal choices skipped at same depth |
| 90 | [Subsets II](https://leetcode.com/problems/subsets-ii/) | Solved | B | Recursion extension | Duplicates versus index choices |
| 46 | [Permutations](https://leetcode.com/problems/permutations/) | New | B | Recursion extension | Used flags; copied output |
| 47 | [Permutations II](https://leetcode.com/problems/permutations-ii/) | New | B | Recursion extension | Unique multiset permutations |
| 89 | [Gray Code](https://leetcode.com/problems/gray-code/) | New | B | Day 27 direct concept | Reflected construction extension; verify wraparound |
| 320 | [Generalized Abbreviation](https://leetcode.com/problems/generalized-abbreviation/) | New | B | Day 27 direct concept | Pending count flush; local task if locked |
| 1087 | [Brace Expansion](https://leetcode.com/problems/brace-expansion/) | New | B | Day 26 flat prerequisite | Flat choices first; local task if locked |
| 1096 | [Brace Expansion II](https://leetcode.com/problems/brace-expansion-ii/) | New | L | Day 26 related broader grammar | Nested unions/products; dedup; hard parser extension |
| 246 | [Strobogrammatic Number](https://leetcode.com/problems/strobogrammatic-number/) | New | B | Day 3 direct | Use local checker if locked |
| 247 | [Strobogrammatic Number II](https://leetcode.com/problems/strobogrammatic-number-ii/) | New | B | Day 3 direct | Use local generator if locked |
| 51 | [N-Queens](https://leetcode.com/problems/n-queens/) | New | M | Day 25 direct concept | MCQs now; implementation later |
| 1219 | [Path with Maximum Gold](https://leetcode.com/problems/path-with-maximum-gold/) | New | M | Day 25 direct concept | Four-neighbour paths; restore per-path state |
| 1066 | [Campus Bikes II](https://leetcode.com/problems/campus-bikes-ii/) | New | M | Day 27 matching objective | Minimize total distance; local examples avoid locked statement |
| 200 | [Number of Islands](https://leetcode.com/problems/number-of-islands/) | New | M | Days 19–20 direct concept | Four-neighbour components; MCQ trace |
| 695 | [Max Area of Island](https://leetcode.com/problems/max-area-of-island/) | New | M | Days 19–20 direct concept | Area versus count; destructive marking |
| 694 | [Number of Distinct Islands](https://leetcode.com/problems/number-of-distinct-islands/) | New | M | Day 20 matching shape objective | Translation equivalence; local examples if locked |
| 1469 | [Find All The Lonely Nodes](https://leetcode.com/problems/find-all-the-lonely-nodes/) | New | M | Days 19–20 direct concept | Exactly-one-child parent; root excluded |
| 545 | [Boundary of Binary Tree](https://leetcode.com/problems/boundary-of-binary-tree/) | New | M | Day 22 direct concept | Order and duplicate leaves/root; local trace if locked |
| 101 | [Symmetric Tree](https://leetcode.com/problems/symmetric-tree/) | Solved | M | Days 23–24 direct concept | Mirror pairs; null structure |
| 110 | [Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/) | Solved | M | Days 23–24 direct concept | Balance at every node; one-pass sentinel |
| 637 | [Average of Levels in Binary Tree](https://leetcode.com/problems/average-of-levels-in-binary-tree/) | New | M | Days 23–24 direct concept | Level size snapshot; double mean |
| 102 | [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/) | Solved | M | Level aggregation transfer | Group nodes by depth |
| 875 | [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/) | Solved | M | Days 10–11 direct concept | Monotone predicate, ceiling arithmetic; paper trace before full code |
| 4 | [Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/) | Solved | M | Days 11–13 direct concept | Partition counts, cross inequalities, even arithmetic |
| 34 | [Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/) | Solved | M | Days 8–9 direct/related | Two boundaries; absence; count transfer |
| 153 | [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) | Solved | M | Day 8 related | Return pivot index locally for rotation count |
| 704 | [Binary Search](https://leetcode.com/problems/binary-search/) | Solved | M | Day 9 foundation | Consistent bounds and sortedness |
| 1064 | [Fixed Point](https://leetcode.com/problems/fixed-point/) | New | M | Day 9 related | Distinct sorted integers; use local paper task if locked |
| 1198 | [Find Smallest Common Element in All Rows](https://leetcode.com/problems/find-smallest-common-element-in-all-rows/) | New | M | Day 9 related | Rowwise sorted; rowwise dedup for hashing |
| 202 | [Happy Number](https://leetcode.com/problems/happy-number/) | New | M | Day 2 direct concept | Cycle detection; existing notes, not new number-theory coding |
| 410 | [Split Array Largest Sum](https://leetcode.com/problems/split-array-largest-sum/) | Solved | L | Assignment-linked extension | Nonnegative contiguous partition feasibility; not confirmed lecture treatment |
| 367 | [Valid Perfect Square](https://leetcode.com/problems/valid-perfect-square/) | New | L | Assignment-linked extension | Overflow-safe comparison; title-only lecture link |
| 441 | [Arranging Coins](https://leetcode.com/problems/arranging-coins/) | New | L | Possible StairCase variant only | Not confirmed equivalent to college title |
| 306 | [Additive Number](https://leetcode.com/problems/additive-number/) | New | L | Assignment-linked extension | Leading zeros; repeated sums; decimal overflow |
| 526 | [Beautiful Arrangement](https://leetcode.com/problems/beautiful-arrangement/) | New | L | Assignment-linked extension | Unused values; divisibility uses OR |

## Important variant boundaries

- LC152 Maximum Product Subarray is in your solved list, but class minimum product uses a **nonempty subset**, not a contiguous subarray. Do the local greedy exercise; LC152 does not substitute for it.
- LC88 merges two sorted arrays; it does not demonstrate recursive merge sort. LC912 is a method drill only when you explicitly implement sorting yourself. Strict end-pivot Lomuto can time out on adversarial inputs; trace it locally and use merge sort for the judge attempt.
- LC435's minimum removals is related to maximum compatible activity count: selected count=n−removed. Endpoint compatibility must follow the exact statement.
- LC1066 has the class's minimum-total-distance objective. LC1057 chooses pairs by distance and tie-breaks; those objectives are different. The [official Campus Bikes II page](https://leetcode.com/problems/campus-bikes-ii/) was subscription-locked when checked on 5 October; the objective mapping comes from Day27,59:38–1:00:09 captions.
- The [official LC1096 grammar](https://leetcode.com/problems/brace-expansion-ii/) includes nested set unions and concatenation. Flat LC1087-style choices are a prerequisite, not complete coverage of nested syntax.
- Class maze is right/down single-cell reachability, **not LC490**. Use the local statement/paper MCQs. LC79 Word Search is already solved and is a related per-path-state transfer, not the same maze.
- The [official LC122 rules](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/) allow repeated transactions while holding at most one share; the greedy formula assumes no fee/cooldown. [LC670](https://leetcode.com/problems/maximum-swap/) allows at most one swap. [LC89](https://leetcode.com/problems/gray-code/) also requires last-to-first one-bit difference. These variants were checked on 5 October 2026.
- Locked/premium exercises have local counterparts; there is no need to pay or change websites for this revision. Access can change; open the exact link if you want to use its judge.

## How to re-solve

Use LeetCode's blank editor, hide your submissions/editorials, write the brute force and invariant first, then code. Use a local editor with a timer for exam-style input/output practice; use the college platform when a supplied assignment requires its signature. A clone is useful only if it provides the exact needed contract or test environment; moving platforms does not improve recall by itself.

After acceptance, explain complexity, one boundary case and one changed assumption. On the next day reattempt failed logic without copying. Recognition of a solution is weaker than independent reconstruction. Keep a log: problem → failed step → smallest counterexample → repair → next reattempt.

For **every** solved-list problem's category, retain [the full 144-problem map](LeetCode_FS_Full_Topic_Map.md). This exact pool is selected and expanded; it is not a claim that all relevant possibilities are exhausted.
