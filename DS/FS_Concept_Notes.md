# DAA concept notes — lecture coverage and exam traps

Read [the evidence map](FS_Lecture_Coverage.md) for source quality and timestamps. **Class** below means the concept is present in the supplied summary/captions; **extension** means added transfer material. Code is C++17 unless Java/Python is named. Indexes are zero-based; complexity assumes fixed-width operations and counts copying by actual length. Arithmetic must fit unless overflow is the topic.

These algorithm notes support your C++ coding option. For **Java-only exam MCQs**, use [the hard Java bank](FS_Java_Hard_MCQ_Bank.md): language-specific evaluation, overflow, identity, exceptions and collection rules follow Java. The [paired syntax revision](FS_Java_CPP_Exam_Revision.md) explains the differences and full-program I/O. Do not transfer a C++ unspecified-order or undefined-overflow answer to a Java snippet.

For Days 1–3 use [Day 1](Day_01_Notes.md), [Day 2](Day_02_Notes.md), [Day 3](Day_03_Notes.md). Their essentials: empty products use identity 1; output space differs from auxiliary space; O/Ω/Θ are bounds rather than synonyms for worst/best/average; recursion needs a base and progress; linear stack depth can accompany exponential total calls; accumulator recursion still uses stack unless optimization is guaranteed; GCD uses (a,b)→(b,a%b); odd strobogrammatic centres can only be 0,1,8; leading zeros are forbidden only at the outer layer. A happy-number sequence needs cycle detection, not an arbitrary iteration cap. Java strings are immutable but variables can be reassigned; a builder can mutate a shared object.

## 1. Divide and conquer; quicksort — Days 4–5

Divide into smaller problems, solve, combine. Quicksort spends linear work **partitioning before** recursion; merge sort spends linear work **merging after** recursion. A partition need not divide equally.

Lomuto with last pivot, strict `<`: let i=low. For j=low..high-1, swap a[i],a[j] and increment i only when a[j]<pivot. Swap a[i],a[high], return i. Invariant during scan: low..i-1 are smaller; i..j-1 are at least pivot; j..high-1 unprocessed. Afterwards a[i] is in its final sorted position. Recurse low..i-1 and i+1..high. Mixing this returned index with Hoare's interval convention is a bug.

Trace `[60,50,20,70,30]`: after scanning, `[20,50,60,70,30]`, i=1; after pivot swap `[20,30,60,70,50]`, pivot index 1. It is **not** completely sorted after this partition. A low-pivot mirrored implementation must state its own inequalities and direction.

Balanced partitions: Θ(n log n) comparisons and Θ(log n) active stack. Repeated end-pivot partitions on distinct sorted/reversed input: Θ(n²), Θ(n) stack. Strict Lomuto on all-equal input also degenerates. Randomized pivot gives expected Θ(n log n) under standard assumptions; it does not make the worst case vanish. Partition uses constant auxiliary work, but recursive quicksort is not constant-space overall. Usually unstable: equal-key records can change relative order through swaps.

## 2. Majority — Days 4–5

Majority means frequency **strictly greater than floor(n/2)**. Sorting then taking a[n/2] works if existence is guaranteed; otherwise verify. Hash counting uses expected Θ(n) time and O(n) space under ordinary hash assumptions, not a universal worst-case guarantee.

D&C returns candidates for halves. If candidates agree, return it; otherwise count both over the current interval and choose the more frequent candidate. The chosen root candidate still requires a verification pass when existence is not promised. Using index intervals gives O(log n) stack and worst-case Θ(n log n) time; copied slices add memory/copying costs. A tied candidate is a convention, not evidence of majority.

Boyer–Moore: when count=0 set candidate=x, then increment for equality/decrement otherwise. The count is the surplus of cancellations, **not the candidate's frequency**. For `[1,2,2,2,1,1,1,1,1,2]`, candidate=1 and final count=2; frequency of 1 is 6. Without the majority promise count it again. No sentinel such as -1 is safe when it may be an actual input.

## 3. Power and arithmetic — Days 4–5

For n≥0: power(x,0)=1. Compute t=power(x,n/2) **once**, return t*t (even) or t*t*x (odd). Θ(log n) time and stack for n>0. Writing two independent half calls instead gives T(n)=2T(n/2)+Θ(1)=Θ(n), despite logarithmic depth.

For signed exponent n, widen **before** negating INT_MIN: `long long e=n; if(e<0){x=1/x;e=-e;}`. A cast after `-n` cannot repair prior overflow. Zero raised to a negative exponent is outside this exercise's domain. C++/Java signed integer division truncates toward zero; Python `//` floors. For -3/2 the former give -1, Python -3//2 gives -2. Integers cannot hold a fractional reciprocal; use floating point where required.

## 4. Merge sort — Day 6

For inclusive [lo,hi], mid=lo+(hi-lo)/2; left size mid-lo+1, right size hi-mid. Sort both halves then merge. Advance exactly the side chosen; drain the remaining side. Choose the left record on `<=` to preserve stability. Sort order alone does not prove stability.

On `[6,5,4,3,2,1]`, just **before the final merge**, the whole array is `[4,5,6,1,2,3]`. In the final merge the first output value is 1. The original array printed in a lecture summary is not necessarily the actual intermediate state after recursive writes.

Conventional array merge sort: Θ(n log n) time even if sorted, O(n) auxiliary buffer plus O(log n) stack. Peak live storage and cumulative allocations differ: buffers allocated afresh and released per merge may cumulatively allocate Θ(n log n) elements while peak live storage remains O(n). A shared full-size buffer makes the peak explicit.

## 5. Recursion trees and Master Theorem — Day 7

For `T(n)=aT(n/b)+Θ(n^d)` with fixed a≥1,b>1 and constant-time base, compare a with b^d. If a<b^d: Θ(n^d); equal: Θ(n^d log n); greater: Θ(n^(log_b a)). Recursion depth log_b n; leaves n^(log_b a); work at level i = n^d(a/b^d)^i. The general theorem requires suitable polynomial gaps/regularity; the simplified polynomial version here satisfies them.

Examples: 3T(n/2)+n²→Θ(n²); 4T(n/2)+n²→Θ(n² log n); 16T(n/4)+n→Θ(n²); T(n/2)+1→Θ(log n). Only giving an O toll does not establish a tight Θ answer. T(n-1)+n is not an aT(n/b) recurrence; sum it to Θ(n²). Fibonacci's two unequal subtractive branches are exponential, not a direct Master-Theorem application. Total recursion-tree work is not peak stack memory.

## 6. Sorted counts, boundaries and rotation — Days 7–9

Binary search for a key needs the comparison to eliminate the correct half; ascending arrays may contain duplicates. Use safe midpoint and consistent closed `[lo,hi]` or half-open `[lo,hi)` bounds. A first-occurrence search records equality and continues left; a last-occurrence search continues right. Count=last-first+1 only after checking presence. Lower_bound finds the first ≥target; upper_bound first >target; their difference counts duplicates.

In a sorted 0/1 array, a pruned count function returns 0 for an empty interval or a[hi]==0, returns hi-lo+1 for a[lo]==1, otherwise sums both halves. Only one child at each level can still straddle the 0/1 boundary, so Θ(log n) worst-case time, not Θ(n) simply because the code contains two calls. CountOccurrences similarly has at most two mixed boundary paths with correct sorted-range pruning. Without that pruning a full binary recursion scans Θ(n) nodes. If a question asks call order, write sequential calls: C++ `f(left)+f(right)` does not specify which operand is evaluated first.

For an ascending array with **distinct** values rotated right k times, the minimum is at index k (mod n). Binary search comparing mid with hi takes O(log n). For duplicates, equality may require hi-- and worst-case O(n). The minimum index also counts left moves needed to restore order; it does not directly count left rotations originally applied. Example `[4,5,1,2,3]`: right rotations=2; left rotations from `[1,2,3,4,5]`=3.

## 7. Fixed point and common rows — Day 9

Fixed point asks a[i]=i. With distinct increasing **integers**, g(i)=a[i]-i is nondecreasing because a[i+1]≥a[i]+1. Binary search the first g≥0 then test equality. With duplicates this proof fails: `[0,0,0,0,0]` has fixed point0; the mid2 comparison discards it and finds none. Do not infer every sorted predicate is monotone.

For a smallest value common to **every sorted row**, try row 0 in increasing order and binary-search each other row; O(R·C·log C) worst-case for equal row lengths, O(1) iterative auxiliary space. A hash-count method must count each value **once per row**, or repeated entries imitate multiple-row presence. Matrix rows being individually sorted does not imply flattened sorted order; LC 74 has a stronger premise. A row minimum greater than row-0 maximum rules out a common element but is not the only way absence can occur.

## 8. Longest common prefix — Days 10–11

Take the shortest length L. Compare column i across all N strings, stop at the first mismatch; worst-case Θ(NL) character work, O(1) extra storage ignoring the returned string. `['gene','genesis','general']` gives **'gene'**; all four characters match before the shortest string ends. Empty array needs a stated policy (here empty prefix); any empty string forces empty prefix.

A per-column set/map must reset for each column. It helps represent equality, not reduce the fundamental scan. Comparing string references in Java using `==` does not test text equality; use `.equals`. Builders and containers can be reused if state is cleared correctly.

Binary search on prefix length is possible because prefix feasibility is monotone. A `startsWith` check may scan the proposed length; it is not automatically O(1). A straightforward repeatedly scanned implementation has O(NL log L) character work and can be slower than the column scan. Avoid assuming fewer outer iterations means faster total work.

## 9. Koko and binary search on an answer — Days 10–11

At speed k>0, hours=`sum(ceil(pile/k))`, implemented with widened `(p + k - 1)/k`. This decreases or stays the same as k increases. Find the **first feasible** k in [1,maxPile], when h≥number of nonempty piles. Input order does not matter; no sorting required. Each predicate costs Θ(n), total O(n log maxPile), O(1) extra storage. For `[30,11,23,4,20]`, h=6 gives 23; at 22 the sum is 7, at 23 it is 6. Large total hours need a wide accumulator; `long sum` alone does not widen an already-overflowed numerator.

Extensions: ship packages preserves input order; split array preserves contiguous parts; nonnegative values make the greedy feasibility predicate sound. This is answer search, not ordinary binary search on the unsorted input.

## 10. Median of two sorted arrays — Days 11–13

Duplicates remain in the merged multiset. Baselines: concatenate+sort O((m+n)log(m+n)), full ordered merge O(m+n) space/time, or merge only until the median while retaining previous/current values O(m+n) worst-case time and O(1) auxiliary space. For an even total, average the two middle values using safe widened arithmetic; integer division loses fractions.

Partition the **smaller** array A: cuts i in [0,m], j=(m+n+1)/2-i. Cuts are **counts of elements on the left**, not indexes of medians. Missing boundary values use conceptual ±∞. A valid partition satisfies maxLeftA≤minRightB and maxLeftB≤minRightA. Too-large maxLeftA: decrease i; too-large maxLeftB: increase i. Odd result=max of left values; even=(maxLeft+minRight)/2.0. O(log(min(m,n)+1)) time, O(1) auxiliary space. One empty array works; two empty arrays have undefined median and require rejection. Input arrays must already be sorted.

## 11. Greedy, fractional knapsack and coins — Day 14

Greedy takes a local choice and never revisits it. It needs a correctness argument; a successful example is not proof. For nonnegative values, positive weights, divisible items: sort by **descending value/weight**; take each fully or fill remaining capacity with a fraction. Exchange argument: replacing weight of a lower-density item by an available higher-density item cannot reduce value. Sorting O(n log n); scan O(n). Ratios must not use truncating integer division. Avoid overflowing comparator cross products.

Items `(value,weight)=(60,10),(100,20),(120,30)`, capacity50: value240 fractionally; optimal 0/1 value220. Ratio greedy is not a general 0/1 solution. 0/1 knapsack does have optimal substructure; what fails is this particular greedy rule. DP is a contrast, not a new implementation obligation.

Coin greedy takes the largest affordable denomination; with a suitable denomination system it works, but arbitrary denominations may fail. Class example `{1,3,4,5}`, amount7: greedy5+1+1 (3), optimal3+4 (2). If no 1 exists, leftover may be unreachable. Distinguish coin **count** from number of combinations and ordered sequences. Activity selection (extension) sorts by earliest finishing time; accept start≥lastFinish under half-open non-overlap rules. Sorting by shortest duration/start alone is not a proof.

## 12. Graph representations and Dijkstra — Days 14–15

Adjacency matrix: Θ(V²) storage, O(1) pair-edge lookup, Θ(V) scan of one vertex's potential neighbours. Adjacency list: Θ(V+E) storage, Θ(deg(u)) neighbour traversal. An undirected edge is usually stored twice. Isolated vertices still need representation. Directed matrices need not be symmetric. Using numeric zero for 'no edge' prevents representing a legitimate zero-weight edge; use a separate flag or sentinel.

Dijkstra: dist[source]=0, others=∞. Repeatedly select the unprocessed vertex with smallest tentative **source distance**; finalize it; relax each outgoing edge using `dist[u]+weight(u,v)`. Not `weight` alone. Correct for **nonnegative**, including zero, weights; negative edges can invalidate finalized distances even without a negative cycle. Matrix scan O(V²); adjacency list+binary heap O((V+E)log V) under standard implementation. Handle no finite next vertex, guard ∞ before addition, discard stale heap entries as needed. BFS solves minimum edge count/unit-weight shortest paths, not arbitrary weighted shortest paths.

Worked undirected graph: edges 0–1:6, 0–2:5, 0–4:13, 1–2:12, 1–3:9, 1–4:5. Source2: distances initially `[∞,∞,0,∞,∞]`; after2 `[5,12,0,∞,∞]`; after0 `[5,11,0,∞,18]`; after1 `[5,11,0,20,16]`. This shows updates can improve a route through an intermediate vertex.

## 13. Stock, minimum product, Maximum Swap — Days 15–18

One stock transaction: track minimum **earlier** price and best positive later-price difference; decreasing prices yield0 (doing nothing allowed). Θ(n) time/O(1) space. Unlimited transactions with at most one held share, no fee/cooldown: sum all positive adjacent increases. Same rising run telescopes to its endpoint gain. `[7,1,5,3,6,4]` gives5 with one transaction,7 with unlimited. A new fee/cooldown changes the problem; do not reuse this formula blindly.

Minimum product of a **nonempty arbitrary subset**, integer values: exclude zero if any negative product is available. Track negative count, closest-to-zero negative, smallest positive, and product of nonzeros. Odd negative count→take all nonzeros. Positive even negative count→drop the negative with smallest absolute value. No negatives→0 if any zero, otherwise smallest positive. All zero→0; singleton negative stays negative. Integers matter: including positive0.2 would reduce a negative product's magnitude, invalidating the all-nonzeros reasoning for unrestricted reals. This is not maximum product of a **contiguous subarray** (LC152). Bound or widen intermediate products, not just the final return type.

Maximum Swap (Day18 after1:07): preserve digit order except **at most one swap**. Build the suffix index of the largest digit, choosing the **rightmost** equal maximum. Scan leftward positions from index0; at the first smaller digit, swap once and stop. Earliest improvement dominates later improvements. `'1993'`→`'9913'` (swap with the second9), not `'9193'`; `'84725'`→`'87425'`. Θ(d) time/O(d) suffix storage; a last-position table for ten digits is an O(1)-space extension. Sorting all digits solves a different task.

## 14. MST: Prim, DSU and Kruskal — Days 16–18

A spanning tree connects every vertex of an undirected connected graph without cycles, using V−1 edges. Minimum spanning tree minimizes **sum of chosen edges**, not each source-to-vertex path. Negative weights are fine for MST. Equal weights can yield multiple MSTs; distinct weights guarantee uniqueness for a connected graph.

Prim grows a connected vertex set. key[v] is the cheapest single crossing edge from the chosen set to v; parent[v] records its endpoint. Update using w(u,v), **without adding key[u]**. Dijkstra uses accumulated source distance instead. Matrix Prim O(V²); heap/list O((V+E)log V). No finite next key indicates disconnection; handle as a forest or report no spanning tree.

DSU starts parent[i]=i, rank[i]=0. find follows parents to the root; path compression writes parent[x]=find(parent[x]). Union **roots**, not raw input nodes. Union by rank attaches lower rank under higher; increment rank only when equal ranks merge. After compression rank is an upper-bound heuristic, not exact current height. With both optimizations, operations are amortized O(α(V)); 'every find always O(1)' is false. Naive parent chains can be linear.

Kruskal sorts edges ascending, accepts an edge iff roots differ, unions them. Sorting O(E log E); DSU amortized O(E α(V)). Stop after V−1 accepted edges **or edge exhaustion**. A disconnected graph returns a minimum spanning forest; blindly reading until V−1 accepted edges causes out-of-bounds access. E≥V−1 is necessary but not sufficient for connectivity. Sorting comparator `a.weight-b.weight` can overflow in Java/C++; compare safely. Self-loops rejected; parallel edges can be considered separately.

## 15. BFS, lonely nodes and islands — Days 19–20

BFS uses FIFO; mark visited **when enqueued** to prevent duplicate pending copies. With adjacency lists Θ(V+E), matrix Θ(V²); queue/visited O(V). One source covers only its component. Neighbor order determines order within a level; say it explicitly for trace questions.

A lonely node has no sibling: a parent with exactly one child contributes that child. Root has no parent and is not counted; a leaf with a sibling is not lonely. BFS and DFS both work; the definition is structural, not value-dependent.

Grid uses four orthogonal neighbours in these exercises. For each unvisited land cell, flood its component once. Max area=maximum component size; island count=number of started floods; distinct island count=number of unique **shapes**, not sizes. Θ(RC) time and up to O(RC) queue/visited space. Destructive marking changes later calls unless you copy/reset the grid. Diagonal land belongs to different islands under four-direction rules.

Class distinct-islands encoding (Day20~1:18): a fixed down/right/up/left order, with direction or invalid marker for every examined transition, concatenated per processed cell, stored in a set. A bare concatenation of only successful directions can lose structural information. Reliable extension: sort relative offsets `(r-startR,c-startC)` and use an unambiguous tuple/string. Translation equivalence keeps orientations distinct; rotation/reflection equivalence requires additional canonicalization. Two equal areas do not prove equal shapes.

## 16. DFS, class maze and boundaries — Days 21–22

DFS uses recursion or LIFO. For iterative left-first traversal push right before left. Marking on pop versus push can change order/pending duplicates; exact pseudo-code is needed. Ordinary graph DFS with adjacency lists visits each vertex/edge O(V+E); depth O(V). DFS does not generally find the shortest path.

Class maze: 1=open, 0=blocked; start(0,0), destination(R−1,C−1); moves right/down. Guard bounds and cell value **before indexing further**. Blocked start or destination immediately fails. Because r+c strictly increases, no path cycles; different paths can still recompute the same cell exponentially without global visited/memoization. Reachability with visited is O(RC); enumerating all paths is output-sensitive. LC490 rolls until a wall and is a different state-transition problem. This distinction replaces the earlier title-only guess.

Anticlockwise boundary: root once (if present); left boundary top-down excluding leaves; all leaves left-to-right; right boundary bottom-up excluding leaves. Left boundary prefers left child but falls back right; right boundary reverses that. Avoid root duplication and leaf duplication; single-node tree outputs the root once. Θ(n) time/O(height) traversal stack plus output.

## 17. Trees: symmetry, balance, per-level aggregation — Days 23–24

State height convention: edge height(empty)=−1, leaf=0; node height(empty)=0, leaf=1. Difference tests are unchanged if consistent. A tree can be binary without being a BST. A binary tree has ≤2 children per node; a BST adds ordering. Balance is **every** node's |height(left)−height(right)|≤1, not just root balance or equal node counts.

Symmetry recursively compares (left.left,right.right) and (left.right,right.left), with equal values and matching null positions. Both null→true, exactly one null→false. Equal level lists without null positions are insufficient. Θ(n) time/O(height) depth.

Balance efficiently returns height or -1 for an unbalanced subtree (using node-height convention, so -1 is reserved). Propagate that sentinel before arithmetic. Computing both child heights afresh at each node can be Θ(n²) on a skewed tree; one postorder is Θ(n), O(height) stack.

BFS level average: snapshot q.size() **before** that level's for-loop, sum exactly those nodes, then divide in floating point. Queue grows as children are enqueued; using its changing size in the loop mixes levels. Use wide sum. O(n) time/O(maximumWidth) queue. DFS alternative carries depth and maintains sum[depth] and count[depth]; a cumulative sum without a count is not an average. DFS visitation order is not BFS, but the final level averages can agree. Maximum/minimum at a level require a different aggregation, not changed traversal structure.

## 18. Backtracking, N-Queens and gold — Day 25

State path represents partial choices. Choose a valid candidate, recurse, undo the exact state change before trying a sibling. Pruning avoids infeasible branches; it does not generally guarantee polynomial time. Returning after the first solution differs from collecting all solutions. Appending a mutable list reference to output requires copying before subsequent mutations.

N-Queens chooses one column per row; check column, row−column and row+column diagonals. Previous-row constraints remove row checks. There are 2 total solutions for n=4, **10** for n=5, 1 for n=1, none for n=2 or3. A demonstrated pair of placements is not the full solution count. With column uniqueness and O(1) set checks, O(n!) is a useful search upper bound (plus O(n²) to materialize each board). Scan-the-board implementations have additional check cost.

Maximum gold: start at every positive cell; move four directions through positive unvisited cells; accumulate a path's sum, keep maximum; no revisiting a cell in a **single** path. Temporarily set cell to0 and restore after recursion; one permanent visited set across all starts is incorrect. Component-sum BFS solves a different problem: branching arms may require revisiting a hub, which gold forbids. For G gold cells a loose bound O(G·4^G) time; depth O(G). This is an MCQ topic/optional later implementation, not a graph-coding requirement created by the recursion label.

## 19. Hamiltonian cycle and brace expansion — Day 26

Hamiltonian cycle visits every vertex once before returning to the start. At path length V check the **closing edge** from last to first; a full Hamiltonian path alone is insufficient. Reject candidate vertices already in the partial path and require adjacency to the previous vertex. Fixing the start removes cyclic rotations; reverse orientation may still duplicate an undirected cycle if all are enumerated. Hamiltonian concerns vertices, Eulerian concerns edges; finding any Hamiltonian cycle does not minimize tour distance (weighted optimization is TSP). Search is exponential/factorial in the worst case, unlike DFS reachability.

Brace expansion: comma=union of alternatives; adjacency=Cartesian concatenation; deduplicate and sort final strings. `{a,b}{c,d}`→ac,ad,bc,bd; `{a,{b,c}}d`→ad,bd,cd. Split only at commas at the current nesting level; matching the first `}` regardless of depth is incorrect for nested braces. A stack or recursive parser is a means to implement grammar, not a guarantee of linear runtime when output is exponential. Flat choices are an easier string-recursion exercise; nested set grammar is an extension with an explicit contract.

## 20. Gray code, Campus Bikes and abbreviations — Day 27

An n-bit Gray sequence has 2^n distinct values in [0,2^n−1], adjacent values differ in one bit; cyclic version also checks last-to-first. Class uses bit-flip neighbours `x ^ (1<<bit)` and visited states. XOR toggles; OR can leave a set bit unchanged. A greedy walk over unvisited states is not proven to produce a complete cyclic tour merely by passing a few examples. Standard construction extension `gray(i)=i^(i>>1)` generates a reflected sequence. For n=3: `[0,1,3,2,6,7,5,4]`. Output takes Θ(2^n) word storage/time. Use a safe shift range; don't blindly extrapolate int shifts beyond their width.

Campus Bikes in class: assign distinct bikes to all workers, minimizing **sum** of Manhattan distances |dx|+|dy|, with M≥N. Try each unused bike for the next worker, recurse with accumulated cost, then unmark. Search has M!/(M−N)! complete assignments; branching costs and recursion overhead add work. Greedy nearest available pair need not minimize sum. Example workers(0,0),(2,0), bikes(1,0),(−2,0): greedy tie takes worker0/bike0 distance1 then worker1/bike1 distance4,total5; swapping gives2+1=3. Memoizing `(workerIndex,usedMask)` is an extension for small M. This is LC1066's variant; paid access is not required to use a local exercise.

Generalized abbreviations: for each character choose keep or abbreviate. Track pending run length; flush it before a kept letter and at the leaf. Consecutive abbreviated characters become one count, not multiple adjacent '1's. For `ANT`: ANT,AN1,A1T,A2,1NT,1N1,2T,3. There are 2^n decision masks; materialized outputs cost O(n·2^n) characters in an upper-bound analysis. A pending count not flushed at the leaf drops suffix information.

Assignment-linked extensions (not confirmed lecture explanations): Additive Number chooses first two decimal fields then verifies repeated sums; forbid leading zeros except the single digit0 and avoid integer overflow for long strings. Beautiful Arrangement assigns each unused value1..n at position p if value%p==0 **or** p%value==0. These are optional transfer questions rather than presumed class coverage.

## 21. Corrections to retain

| Tempting claim | Correct exam rule |
|---|---|
| O=worst, Ω=best | Each is a bound that can describe any specified runtime function |
| Two recursive calls always exponential | Size reduction, toll, and pruning determine recurrence |
| Tail recursion has O(1) stack in Java | No guaranteed tail-call elimination; state recursion still O(n) stack |
| Quicksort is fully O(1) space | Partition is O(1); stack can be O(n) |
| LCP depth equals number of outer tests | Count all characters inspected by startsWith |
| Rotation index always counts original left rotations | It counts original right rotations under the stated convention |
| Dijkstra needs strictly positive weights | Nonnegative is sufficient; zero-as-absence is a representation limitation |
| 0/1 knapsack lacks optimal substructure | It has it; ratio greedy lacks the required greedy-choice guarantee |
| DSU rank increments on every union | Only equal-rank root merges increment rank in standard union by rank |
| E≥V−1 guarantees an MST | Connectivity is also required |
| Maze title identifies LC490 | Actual class transitions are ordinary right/down steps |
| Campus Bikes always means greedy LC1057 | Class minimizes total distance, matching the II variant |
| Two 5-queens examples are all solutions | Total n=5 count is10 |
| Passing outputs proves an algorithm general | Explain the invariant, assumptions and failure cases |

## 22. What counts as depth

For each priority task, reproduce the algorithm closed-book, trace a small case including intermediate states, explain the invariant/recurrence, give time and auxiliary space separately, identify a failing assumption, and adapt one constraint. If you can only recognize your old solution, revise that pattern again. LeetCode is useful for implementation; these notes and the MCQs cover the class-method reasoning a judge acceptance does not test.
