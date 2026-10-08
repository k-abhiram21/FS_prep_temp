# Data Structures and Algorithms: 70 hard MCQs

**For the 9 October 2026 FS screening test.** Original practice, prepared 8 October. One best answer per question. These are study selections, not predicted exam questions. Read the hidden explanations to learn the rule and the closest traps.

[All compact banks and coverage audit](../FS_Remaining_Subjects_Learning_Map.md)

## How to use

Work in blocks of 10–15. First choose an answer without opening the explanation; then explain why the other choices fail. For code, record each state change before guessing. The four mixed sets below use every question once: three sets of 20 and one of 10. Set sizes are for revision, not exam subject weights.

**Assumptions:** Java 17 in all code questions; each program is independent. Zero-based indices; `/` separates output lines. For asymptotic questions, analyze the method for growing input size, not only the tiny `main` fixture. Count output storage separately from auxiliary storage. Fixed-width arithmetic fits unless overflow is the trap. Expected hashing costs are used only when stated. Graph/tree/search questions are MCQ study; full coding practice remains recursion, arrays/strings and greedy. The notice gives no DAA subtopic list: this selection follows the college units and lecture map, with core-structure supplements identified in the shared coverage audit.

## Coverage

| Topic | Questions |
|---|---|
| Complexity and core data structures | [DA001](#da001)–[DA008](#da008) (8) |
| Recurrences and algorithm guarantees | [DA009](#da009)–[DA013](#da013) (5) |
| Greedy proof and optimization contracts | [DA014](#da014)–[DA018](#da018) (5) |
| Correctness invariants and structure distinctions | [DA019](#da019)–[DA024](#da024) (6) |
| Trees and backtracking state | [DA025](#da025)–[DA030](#da030) (6) |
| Java traces: Recursion: local state, side effects and call trees | [DA031](#da031)–[DA032](#da032) (2) |
| Java traces: Array and greedy method traces | [DA033](#da033)–[DA036](#da036) (4) |
| Java traces: Power, Euclid, digit checks and recurrence cost | [DA037](#da037)–[DA039](#da039) (3) |
| Java traces: Binary-search boundaries and pruning | [DA040](#da040)–[DA042](#da042) (3) |
| Java traces: Koko and monotone answer search | [DA043](#da043)–[DA044](#da044) (2) |
| Java traces: Median partitions and safe sentinels | [DA045](#da045)–[DA045](#da045) (1) |
| Java traces: LCP and Java copying costs | [DA046](#da046)–[DA047](#da047) (2) |
| Java traces: Dijkstra: matrix and heap execution | [DA048](#da048)–[DA049](#da049) (2) |
| Java traces: Prim, graph representation and MST cost | [DA050](#da050)–[DA051](#da051) (2) |
| Java traces: DSU: compressed parents and rank | [DA052](#da052)–[DA053](#da053) (2) |
| Java traces: Kruskal: accepted versus examined edges | [DA054](#da054)–[DA055](#da055) (2) |
| Java traces: BFS: queue snapshots and duplicate discovery | [DA056](#da056)–[DA057](#da057) (2) |
| Java traces: DFS ordering and the actual maze | [DA058](#da058)–[DA058](#da058) (1) |
| Java traces: Grid islands: visitation, shape and ownership | [DA059](#da059)–[DA059](#da059) (1) |
| Java traces: Balanced trees: return sentinels and repeated scans | [DA060](#da060)–[DA060](#da060) (1) |
| Java traces: Level averages: live queue bounds and DFS state | [DA061](#da061)–[DA061](#da061) (1) |
| Java traces: Boundary traversal: fallbacks and duplicate leaves | [DA062](#da062)–[DA062](#da062) (1) |
| Java traces: N-Queens and shared backtracking state | [DA063](#da063)–[DA063](#da063) (1) |
| Java traces: Hamiltonian: closure, path state and search order | [DA064](#da064)–[DA064](#da064) (1) |
| Java traces: Brace expansion: parser state, union and products | [DA065](#da065)–[DA065](#da065) (1) |
| Java traces: Gray code: bits, closure and representation | [DA066](#da066)–[DA066](#da066) (1) |
| Java traces: Campus Bikes: assignment state and pruning | [DA067](#da067)–[DA067](#da067) (1) |
| Java traces: Additional lecture coverage: cycles, GCD reductions and generators | [DA068](#da068)–[DA070](#da070) (3) |

## Mixed revision sets

**Set 1:** [DA023](#da023), [DA033](#da033), [DA039](#da039), [DA026](#da026), [DA050](#da050), [DA042](#da042), [DA070](#da070), [DA065](#da065), [DA052](#da052), [DA015](#da015), [DA043](#da043), [DA035](#da035), [DA062](#da062), [DA017](#da017), [DA028](#da028), [DA007](#da007), [DA008](#da008), [DA045](#da045), [DA016](#da016), [DA040](#da040).

**Set 2:** [DA064](#da064), [DA012](#da012), [DA014](#da014), [DA011](#da011), [DA031](#da031), [DA002](#da002), [DA069](#da069), [DA054](#da054), [DA001](#da001), [DA066](#da066), [DA068](#da068), [DA041](#da041), [DA037](#da037), [DA053](#da053), [DA020](#da020), [DA036](#da036), [DA067](#da067), [DA021](#da021), [DA006](#da006), [DA060](#da060).

**Set 3:** [DA029](#da029), [DA024](#da024), [DA063](#da063), [DA018](#da018), [DA034](#da034), [DA030](#da030), [DA059](#da059), [DA025](#da025), [DA022](#da022), [DA027](#da027), [DA057](#da057), [DA047](#da047), [DA048](#da048), [DA009](#da009), [DA049](#da049), [DA051](#da051), [DA013](#da013), [DA004](#da004), [DA056](#da056), [DA044](#da044).

**Set 4:** [DA010](#da010), [DA019](#da019), [DA005](#da005), [DA058](#da058), [DA032](#da032), [DA061](#da061), [DA003](#da003), [DA038](#da038), [DA046](#da046), [DA055](#da055).


## Complexity and core data structures

<a id="da001"></a>
### DA001 — Big O is a bound

An algorithm takes T(n)=3n+7 operations. Which statement is correct?

A. O(n²) proves the actual growth is quadratic.

B. T cannot be O(n²) because it is linear.

C. T is Θ(n) and also O(n²); O(n²) is valid but loose.

D. Big O always means the worst input case.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — T is Θ(n) and also O(n²); O(n²) is valid but loose.**

O supplies an upper bound; Θ supplies matching upper and lower bounds. A linear function is also bounded above by a quadratic.

**Why the other choices fail:** Bound notation and best/average/worst-case selection are separate; do not confuse a valid bound with a tight bound.

**Rule/source:** [MIT algorithms].

</details>

<a id="da002"></a>
### DA002 — Nested loop not always n squared

for i=1..n, an inner loop visits j=i,2i,3i,…≤n. Tight total iteration count?

A. Θ(log n).

B. Θ(n).

C. Θ(n log n).

D. Θ(n²).

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Θ(n log n).**

The total is Σfloor(n/i), a harmonic sum bounded tightly by Θ(n log n). Inner loop length depends on i.

**Why the other choices fail:** Counting two loop headers is not enough; not every inner loop takes n iterations.

**Rule/source:** [MIT algorithms].

</details>

<a id="da003"></a>
### DA003 — Amortized versus worst single operation

A dynamic array doubles capacity when full. What is the usual cost of appending over n appends?

A. Every append is worst-case O(1).

B. Θ(n) total and amortized O(1) per append; an individual resize can cost Θ(n).

C. Every append copies all prior elements.

D. Total cost is Θ(n²) because a resize costs linear time.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Θ(n) total and amortized O(1) per append; an individual resize can cost Θ(n).**

Copied capacities form a geometric series. Many cheap appends share the occasional resize cost.

**Why the other choices fail:** Amortized is a sequence bound, not a promise about every operation or an average over random inputs.

**Rule/source:** [MIT algorithms].

</details>

<a id="da004"></a>
### DA004 — Output size as a lower bound

A routine returns all2ⁿ length-n binary strings as explicit strings. Can its total time be O(2ⁿ)?

A. Yes, because one recursive leaf is one constant-time output.

B. No, because there are n! outputs.

C. Yes, whenever auxiliary stack space is O(n).

D. Not under a per-character output-cost model; writing them costs Ω(n2ⁿ).

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Not under a per-character output-cost model; writing them costs Ω(n2ⁿ).**

There are 2ⁿ outputs with n characters each. Materializing each character is work even if the search tree has only O(2ⁿ) nodes.

**Why the other choices fail:** Output time, output count and auxiliary stack size are different measurements.

**Rule/source:** [MIT algorithms].

</details>

<a id="da005"></a>
### DA005 — Singly linked deletion precondition

Given only a pointer to an arbitrary node in a singly linked list, with no predecessor or head access, is deletion always O(1)?

A. No; the tail cannot be removed by the copy-next trick because it has no next node.

B. No; even deleting a head with a head reference always requires traversing the list.

C. Yes; every node stores its predecessor automatically.

D. Yes; copying the next value works even at the tail.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — No; the tail cannot be removed by the copy-next trick because it has no next node.**

Known predecessor permits relinking. Copying a successor into the current node has restrictions and changes node identity semantics.

**Why the other choices fail:** Singly linked nodes need not carry predecessors; endpoints and available references determine the cost.

**Rule/source:** [MIT algorithms].

</details>

<a id="da006"></a>
### DA006 — Balanced versus ordinary BST

An ordinary BST receives sorted distinct keys without rebalancing. Which complexity is possible?

A. Height Θ(1) because each node has at most two children.

B. Height always Θ(log n) because it is a binary tree.

C. Search is O(1) because keys are sorted.

D. Height Θ(n), making search worst-case Θ(n).

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Height Θ(n), making search worst-case Θ(n).**

A binary branching limit does not require balance. Sorted insertion can form a one-child chain.

**Why the other choices fail:** Sorted arrays support binary search by index; a degenerate pointer tree has different access costs.

**Rule/source:** [MIT algorithms].

</details>

<a id="da007"></a>
### DA007 — Heap versus sorted sequence

A min-heap stores n arbitrary keys. Which operation is guaranteed O(1) without traversal?

A. Iterate all keys in sorted order.

B. Find an arbitrary requested key.

C. Read the minimum at the root.

D. Read the median.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Read the minimum at the root.**

Heap order guarantees parent≤children, placing a minimum at the root. It does not fully sort all positions.

**Why the other choices fail:** Arbitrary membership and median need more work; sorted output typically requires repeated removals or another sort.

**Rule/source:** [MIT algorithms].

</details>

<a id="da008"></a>
### DA008 — Hashing bound assumptions

A hash table uses chaining and an adversary forces all n keys into one bucket. Search for a missing key can cost?

A. Always Θ(1).

B. Θ(n), despite expected O(1) under suitable hashing assumptions.

C. Θ(n²) for one bucket scan.

D. Always Θ(log n) because all hash tables are balanced trees.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Θ(n), despite expected O(1) under suitable hashing assumptions.**

A chained bucket can be a list of n candidates. Expected constant lookup depends on distribution/load assumptions.

**Why the other choices fail:** Do not turn an expected bound into a worst-case guarantee or silently assume a tree-based implementation.

**Rule/source:** [MIT algorithms].

</details>

## Recurrences and algorithm guarantees

<a id="da009"></a>
### DA009 — Two half calls and linear work

T(n)=2T(n/2)+Θ(n), T(1)=Θ(1). Tight solution?

A. Θ(log n).

B. Θ(n).

C. Θ(n²).

D. Θ(n log n).

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Θ(n log n).**

There are log₂n levels; each level’s subproblems contribute Θ(n) total combining work. Total Θ(n log n).

**Why the other choices fail:** Two recursive calls do not automatically imply exponential work when their inputs shrink.

**Rule/source:** [DAA concepts].

</details>

<a id="da010"></a>
### DA010 — Subtractive recurrence

T(n)=T(n−1)+Θ(n), T(1)=Θ(1). Tight solution?

A. Θ(2ⁿ).

B. Θ(n log n) by the standard Master Theorem.

C. Θ(n).

D. Θ(n²).

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Θ(n²).**

Expand to n+(n−1)+…+1=Θ(n²). The standard fixed-factor Master Theorem does not apply to n−1 shrinkage.

**Why the other choices fail:** A recursion’s depth and its per-level cost both matter; one branch is not automatically linear time.

**Rule/source:** [DAA concepts].

</details>

<a id="da011"></a>
### DA011 — Active stack versus call count

Naive Fibonacci f(n)=f(n−1)+f(n−2) has no memoization. Ignoring overflow, which distinction fits?

A. Exponential time requires exponential stack depth.

B. Two recursive calls imply Θ(log n) time.

C. Exponential call count but Θ(n) maximum active recursion depth.

D. Depth Θ(n) proves total time Θ(n).

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Exponential call count but Θ(n) maximum active recursion depth.**

Many branches are explored sequentially. The longest path decrements by 1, so active frames are linear while repeated calls multiply.

**Why the other choices fail:** Total calls and simultaneously active calls are different quantities.

**Rule/source:** [DAA concepts].

</details>

<a id="da012"></a>
### DA012 — Randomized quicksort promise

Random-pivot quicksort sorts a fixed input. Which statement is accurate?

A. Worst-case time becomes Θ(n log n) for every random sequence.

B. Expected time becomes Θ(n).

C. Expected time Θ(n log n), but unlucky pivots can still give Θ(n²).

D. Randomization guarantees a stable result for equal-key records.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Expected time Θ(n log n), but unlucky pivots can still give Θ(n²).**

Randomization reduces dependence on input order and gives an expectation over choices; it does not remove every unbalanced recursion.

**Why the other choices fail:** Time guarantees and stability are different properties; expected is not worst-case.

**Rule/source:** [DAA concepts].

</details>

<a id="da013"></a>
### DA013 — Memoization changes repeated work

A recursive solver reaches the same complete state repeatedly. What permits safe memoization?

A. The cached result must depend only on the state represented by the key, including relevant context.

B. Key only recursion depth, regardless of all other inputs.

C. Memoization makes every search polynomial even with exponentially many distinct states.

D. Caching automatically repairs a wrong recurrence.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — The cached result must depend only on the state represented by the key, including relevant context.**

A correct state key must distinguish all inputs affecting the result. Memoization removes repeats, not distinct-state complexity.

**Why the other choices fail:** Partial keys merge unequal subproblems; wrong logic and exponentially many unique states remain problems.

**Rule/source:** [DAA concepts].

</details>

## Greedy proof and optimization contracts

<a id="da014"></a>
### DA014 — Ratio rule with a counterexample

Capacity50; items(weight,value)=(10,60),(20,100),(30,120). Compare ratio-first greedy for fractional versus0/1 knapsack.

A. Fractional optimum240; ratio-first0/1 takes value160, below0/1 optimum220.

B. 0/1 greedy reaches220 by taking the highest ratio first.

C. Both optima are160 because items cannot be divided in either task.

D. Both optima are240 because the ratio order is the same.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Fractional optimum240; ratio-first0/1 takes value160, below0/1 optimum220.**

Fractional takes 10+20+20 units for 60+100+80=240. Indivisible ratio-first takes the first two, whereas weights 20+30 give 220.

**Why the other choices fail:** Divisibility is the critical contract; a locally attractive ratio does not establish a 0/1 exchange proof.

**Rule/source:** [DAA concepts].

</details>

<a id="da015"></a>
### DA015 — Coin-system dependency

Denominations1,3,4, unlimited coins, target6. Largest-coin-first versus minimum number of coins?

A. No solution exists because6 is not a denomination.

B. Greedy gives4+1+1 (3 coins), while3+3 uses2.

C. Both methods must use3 coins.

D. Greedy is always optimal because denomination1 exists.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Greedy gives4+1+1 (3 coins), while3+3 uses2.**

The denomination set changes whether the greedy choice is safe. Having coin 1 guarantees feasibility, not optimal count.

**Why the other choices fail:** An algorithm cannot import an optimality theorem from a different coin system.

**Rule/source:** [DAA concepts].

</details>

<a id="da016"></a>
### DA016 — Unweighted interval selection

Intervals are half-open and touching endpoints are compatible. To maximize count with one resource, which standard greedy choice has a valid exchange argument?

A. Earliest finish also always maximizes total interval profit.

B. Repeatedly choose the earliest start without considering finish.

C. Repeatedly choose an available interval with earliest finishing time.

D. Repeatedly choose the longest interval.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Repeatedly choose an available interval with earliest finishing time.**

Earliest finishing leaves the greatest remaining opportunity; an optimal solution’s first interval can be exchanged without reducing its count.

**Why the other choices fail:** Weighted profit is a different objective and needs more than this count-based greedy rule.

**Rule/source:** [DAA concepts].

</details>

<a id="da017"></a>
### DA017 — Unlimited stock transactions

Prices[1,3,2,4], unlimited transactions, one share at a time, no fees/cooldown. Maximum profit?

A. 4.

B. 2.

C. 3.

D. 5.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 4.**

Capture positive adjacent changes: (3−1)+(4−2)=4. A single transaction from 1 to 4 gives only 3.

**Why the other choices fail:** Do not transfer one-transaction, fee or cooldown rules into the explicitly stated unlimited contract.

**Rule/source:** [DAA concepts].

</details>

<a id="da018"></a>
### DA018 — Negative edges and Dijkstra

In a directed graph, s→a=2,s→b=5,b→a=−4. Dijkstra permanently settles a before b. What breaks?

A. A negative edge always means a negative cycle.

B. There is no finite shortest path to a.

C. Prim must be used because it computes shortest paths.

D. a is settled at2 although the path s→b→a has cost1.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — a is settled at2 although the path s→b→a has cost1.**

Dijkstra’s usual settlement proof depends on nonnegative edge weights. This graph has a better later route but no cycle.

**Why the other choices fail:** MST and shortest paths optimize different quantities; negative edges and negative cycles differ.

**Rule/source:** [DAA concepts].

</details>

## Correctness invariants and structure distinctions

<a id="da019"></a>
### DA019 — Binary search needs the predicate contract

A search for the first feasible speed uses a true/false predicate. What property allows discarding half the range safely?

A. The number of successful trials must exceed the failed trials.

B. Monotonicity, such as false below a boundary and true at/above it.

C. The answer must be exactly a present array element.

D. The predicate must alternate true and false.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Monotonicity, such as false below a boundary and true at/above it.**

A monotone boundary lets a result eliminate an entire interval. Searching answer space can use values not stored in any array.

**Why the other choices fail:** Binary search is not justified merely because the domain contains integers or trials are cheap.

**Rule/source:** [MIT algorithms].

</details>

<a id="da020"></a>
### DA020 — Majority candidate versus certificate

Boyer–Moore voting ends with a candidate on arbitrary input without a promised majority. What is required to report a strict majority?

A. Verify its count exceeds n/2 in a separate pass.

B. A candidate can never be produced without a majority.

C. Report any value occurring at least n/2 times.

D. Return it because nonzero vote balance equals its frequency.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Verify its count exceeds n/2 in a separate pass.**

Cancellation preserves a true majority if one exists, but it can leave a candidate when none exists. The balance is not the original count.

**Why the other choices fail:** Strict majority is >n/2, not ≥n/2; candidate generation is not verification.

**Rule/source:** [MIT algorithms].

</details>

<a id="da021"></a>
### DA021 — Prim key versus Dijkstra distance

Which interpretation distinguishes Prim from Dijkstra?

A. Both algorithms minimize every source-to-vertex path when edge weights are nonnegative.

B. Both keys always represent total source-path distance.

C. Prim’s key is the cheapest edge linking a vertex to the growing tree; Dijkstra tracks total source-path distance.

D. Prim must reject all negative edge weights.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Prim’s key is the cheapest edge linking a vertex to the growing tree; Dijkstra tracks total source-path distance.**

An MST minimizes total tree weight; shortest paths minimize source distances. Their similar selection loops have different relaxation rules.

**Why the other choices fail:** Negative edges do not invalidate the MST problem as they invalidate the usual Dijkstra proof.

**Rule/source:** [MIT algorithms].

</details>

<a id="da022"></a>
### DA022 — BFS shortest-path assumptions

BFS uses a FIFO queue and marks vertices when first enqueued. When does its discovery depth equal minimum path cost?

A. Only for acyclic graphs.

B. For unweighted graphs or equal positive edge weights when cost is proportional to edge count.

C. For all arbitrary weighted graphs.

D. For graphs whose adjacency lists are alphabetically sorted.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — For unweighted graphs or equal positive edge weights when cost is proportional to edge count.**

FIFO explores by number of edges. Equal edge costs make edge count proportional to cost; arbitrary weights do not.

**Why the other choices fail:** Cycles and neighbor order affect traversal details but do not invalidate the unweighted distance guarantee.

**Rule/source:** [MIT algorithms].

</details>

<a id="da023"></a>
### DA023 — MST on a disconnected graph

Kruskal scans all edges of a disconnected undirected graph. What can it produce?

A. No useful acyclic structure of any kind.

B. A tree withV−1 edges even without connecting components.

C. A spanning tree by accepting extra cycle edges.

D. A minimum spanning forest; no single spanning tree covers all vertices.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — A minimum spanning forest; no single spanning tree covers all vertices.**

Each component can have its own minimum tree. No absent cross-component edge can be manufactured by scanning.

**Why the other choices fail:** Accepting cycles does not connect separate components; forest and whole-graph tree differ.

**Rule/source:** [MIT algorithms].

</details>

<a id="da024"></a>
### DA024 — Sorting stability contract

Records have(key,id): (2,A),(1,B),(2,C). A stable ascending key sort gives?

A. (1,B),(2,C),(2,A).

B. (2,A),(2,C),(1,B).

C. Stability means every record remains in its original position.

D. (1,B),(2,A),(2,C).

<details>
<summary>Answer and reasoning</summary>

**Correct: D — (1,B),(2,A),(2,C).**

Ascending order sorts keys; stability preserves A before C because their keys tie.

**Why the other choices fail:** Stability preserves relative order only among equal keys, not all positions. A different tie comparator defines a different key.

**Rule/source:** [MIT algorithms].

</details>

## Trees and backtracking state

<a id="da025"></a>
### DA025 — Height convention

Height counts edges on the longest downward path, and null height is−1. What is the height of a single-node tree?

A. 2.

B. 0.

C. 1.

D. −1.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — 0.**

A leaf has no downward edges:1+max(−1,−1)=0. Node-count height uses a different base convention.

**Why the other choices fail:** Height results require an explicit convention; null and leaf are not the same structure.

**Rule/source:** [DAA concepts].

</details>

<a id="da026"></a>
### DA026 — Balance must hold below the root

A root’s left and right subtree heights are equal, but a node deep on the left has child heights4 and0. Is the whole tree height-balanced?

A. Yes; any equal leaf count guarantees balance.

B. No; every balanced tree must be perfectly full.

C. No; every node must satisfy the allowed height difference.

D. Yes; only the root’s height difference matters.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — No; every node must satisfy the allowed height difference.**

The usual AVL-style height-balance condition applies recursively at each node, not just the root.

**Why the other choices fail:** Equal root heights and equal node counts do not certify internal balance; balanced need not mean perfect.

**Rule/source:** [DAA concepts].

</details>

<a id="da027"></a>
### DA027 — Snapshot the backtracking answer

A backtracking routine appends its mutable path object to results, then removes the last choice. What is the general risk?

A. Backtracking cannot use mutable paths under any circumstances.

B. Appending always creates a deep copy of every object.

C. Removing from path also removes the result list itself.

D. Stored entries can share the same path and reflect later mutations; store a copy for independent snapshots.

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Stored entries can share the same path and reflect later mutations; store a copy for independent snapshots.**

A result reference is not a snapshot. Copying at a leaf separates the outer path representation from later choose/undo steps.

**Why the other choices fail:** Mutation is useful in backtracking when undo and saved outputs respect their ownership contracts.

**Rule/source:** [DAA concepts].

</details>

<a id="da028"></a>
### DA028 — State restoration versus global visited

A maximum-gold search seeks a simple path from each start. Why restore a cell’s available state after returning from one branch?

A. Restoration allows a single path to revisit a cell infinitely.

B. Other candidate paths may legally use it; only the current path must forbid repeats.

C. Every cell must be permanently forbidden after any visit.

D. The objective is always the sum of the connected component.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Other candidate paths may legally use it; only the current path must forbid repeats.**

Path-local visitation differs from component traversal. Undo removes the current branch’s exclusion for sibling searches.

**Why the other choices fail:** A component sum can be unreachable by one simple path, and correct restoration happens after leaving the branch.

**Rule/source:** [DAA concepts].

</details>

<a id="da029"></a>
### DA029 — Hamiltonian cycle versus any cycle

A proposed cycle visits some but not all graph vertices, then returns to its start. Which assessment fits?

A. It is Hamiltonian because it is closed.

B. It is not Hamiltonian unless it visits every vertex exactly once before closure.

C. Hamiltonian only requires visiting every vertex at least twice.

D. It is Hamiltonian if it uses every edge at least once.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — It is not Hamiltonian unless it visits every vertex exactly once before closure.**

Hamiltonian concerns each vertex once; the final return closes the tour. Eulerian concerns edges.

**Why the other choices fail:** Closedness alone is insufficient; vertex and edge coverage definitions must be distinguished.

**Rule/source:** [DAA concepts].

</details>

<a id="da030"></a>
### DA030 — Pruning needs a valid lower bound

A search prunes when current cost≥best, assuming every remaining addition is nonnegative. What if negative future costs are allowed?

A. The pruning can discard a branch whose final total would improve best.

B. All searches become impossible to solve.

C. The same pruning remains valid for arbitrary negative additions.

D. A negative addition proves a graph has a negative cycle.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — The pruning can discard a branch whose final total would improve best.**

With nonnegative additions, current cost is a lower bound on final cost. Negative additions remove that bound.

**Why the other choices fail:** Branch-and-bound needs a justified bound, not merely a currently unattractive partial total.

**Rule/source:** [DAA concepts].

</details>

## Java traces: Recursion: local state, side effects and call trees

<a id="da031"></a>
### DA031 — Mutation between sibling calls

Exact printed token sequence? Analyze the specified point. Selected from original J001; evidence: Days 1–2.

```java
import java.util.*;
import java.io.*;

public class Main {
    static StringBuilder log=new StringBuilder();
    static void f(int n){
     if(n<=0){log.append("B ");return;}
     log.append(n).append(' ');
     f(--n);
     log.append(n).append(' ');
     f(--n);
    }

    public static void main(String[] args) throws Exception {
        f(2); System.out.println(log.toString().trim());
    }
}
```

A. 2 1 B 1 B 2 B

B. 2 1 B 0 B 0 B

C. 2 1 1 B B B

D. 2 1 B 0 B 1 B

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 2 1 B 0 B 1 B**

The first --n mutates only that caller frame. Inside f(1), the second decrement reaches−1; after returning to f(2), its n is 1 and its second child receives 0. Java evaluates sequential statements in order.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. Child frames do not mutate the caller’s local n, but each predecrement does; sibling arguments therefore differ.

**Rule/source:** [Original Java traces].

</details>

<a id="da032"></a>
### DA032 — Accumulator still uses frames

Ignoring arithmetic overflow, time and stack as n grows? Analyze the specified point. Selected from original J005; evidence: Days 1–2.

```java
import java.util.*;
import java.io.*;

public class Main {
    static long f(int n,long a,long b){if(n==0)return a;return f(n-1,b,a+b);}

    public static void main(String[] args) throws Exception {
        System.out.println(f(8,0,1));
    }
}
```

A. Θ(n) time, guaranteed Θ(1) stack

B. Θ(n) time, Θ(n) Java stack

C. Θ(2^n) time, Θ(n) stack

D. Θ(log n) time, Θ(log n) stack

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Θ(n) time, Θ(n) Java stack**

One call decreases n by 1, so there are n+1 active entries down the chain. Java gives no guaranteed tail-call elimination; observed value 21 is separate from asymptotic analysis.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. Repeated calls and maximum simultaneously active frames have different counts.

**Rule/source:** [Original Java traces].

</details>

## Java traces: Array and greedy method traces

<a id="da033"></a>
### DA033 — Product-prefix snapshot

After suffix iteration i=1, what is printed? Analyze the specified point. Selected from original J007; evidence: Days 1, 4–6, 14–18.

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] a={2,0,4};long[] out=new long[a.length];long p=1;
        for(int i=0;i<a.length;i++){out[i]=p;p*=a[i];}
        long suf=1;
        for(int i=a.length-1;i>=0;i--){out[i]*=suf;suf*=a[i];if(i==1)System.out.println(Arrays.toString(out)+" "+suf);}
    }
}
```

A. [1, 8, 0] 4

B. [1, 2, 0] 4

C. [1, 8, 0] 0

D. [0, 8, 0] 0

<details>
<summary>Answer and reasoning</summary>

**Correct: C — [1, 8, 0] 0**

Prefix outputs were 1,2,0. At i 2 suffix becomes 4; i 1 becomes 8 then suffix multiplies zero. Index 0 has not yet received its suffix.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. One zero and two zeros require different product reasoning; output values are not prefix values alone.

**Rule/source:** [Original Java traces].

</details>

<a id="da034"></a>
### DA034 — Equal-key merge stability

Output and minimal repair for stability? Analyze the specified point. Selected from original J009; evidence: Days 1, 4–6, 14–18.

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] L={2,2},R={2};String[] l={"A","B"},r={"C"};
        int i=0,j=0;StringBuilder out=new StringBuilder();
        while(i<L.length&&j<R.length){if(L[i]<R[j])out.append(l[i++]);else out.append(r[j++]);}
        while(i<L.length)out.append(l[i++]);while(j<R.length)out.append(r[j++]);
        System.out.println(out);
    }
}
```

A. ABC; no repair needed

B. CAB; swap input halves

C. CAB; change < to <=

D. ACB; reverse right run

<details>
<summary>Answer and reasoning</summary>

**Correct: C — CAB; change < to <=**

On equality it currently chooses the later right record. Choosing the left run on ties preserves original equal-key order.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. Equal-key merging must take the left run first for stability; sorting by the same key does not itself preserve original tie order.

**Rule/source:** [Original Java traces].

</details>

<a id="da035"></a>
### DA035 — Density comparator truncates

What defect does this comparator contain despite this output looking reasonable? Analyze the specified point. Selected from original J012; evidence: Days 1, 4–6, 14–18.

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[][] x={{5,2},{7,3}};
        Arrays.sort(x,(a,b)->Integer.compare(b[0]/b[1],a[0]/a[1]));
        System.out.println(Arrays.deepToString(x));
    }
}
```

A. It sorts ascending density exactly

B. Object-array sort must always reverse equal keys

C. Integer division can hide unequal densities; compare safe cross products or double ratios

D. The input values cause division by zero

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Integer division can hide unequal densities; compare safe cross products or double ratios**

Both ratios truncate to 2, so input order can decide a false tie. Reversing these records is a counterexample. For bounded integers compare valueA*weightB with valueB*weightA after widening.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. Integer division truncates the densities, so a comparator can declare a false tie; widening cross-products or a suitable exact comparison avoids it.

**Rule/source:** [Original Java traces].

</details>

<a id="da036"></a>
### DA036 — Suffix maxima tie bug

Output and tie repair? Analyze the specified point. Selected from original J014; evidence: Days 1, 4–6, 14–18.

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        char[] a="1993".toCharArray();int[] best=new int[a.length];best[3]=3;
        for(int i=2;i>=0;i--)best[i]=a[i]>=a[best[i+1]]?i:best[i+1];
        for(int i=0;i<4;i++)if(a[i]<a[best[i]]){char t=a[i];a[i]=a[best[i]];a[best[i]]=t;break;}
        System.out.println(new String(a));
    }
}
```

A. 9931; sort suffix

B. 1993; swap condition is never true

C. 9913; already optimal

D. 9193; use > rather than >= in the suffix update

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 9193; use > rather than >= in the suffix update**

Equality replaces the rightmost 9 with the earlier 9. Keep the existing farther-right maximum on ties to obtain 9913.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. Keeping an earlier equal suffix maximum changes which digit gets swapped; the rightmost maximum can give the larger result.

**Rule/source:** [Original Java traces].

</details>

## Java traces: Power, Euclid, digit checks and recurrence cost

<a id="da037"></a>
### DA037 — Half-result reuse counts

Return value and entries including base? Analyze the specified point. Selected from original J015; evidence: Days 3–7.

```java
import java.util.*;
import java.io.*;

public class Main {
    static int calls;
    static long f(long x,int n){calls++;if(n==0)return 1;long t=f(x,n/2);return n%2==0?t*t:t*t*x;}

    public static void main(String[] args) throws Exception {
        System.out.println(f(2,13)+" "+calls);
    }
}
```

A. 8192 5

B. 8192 31

C. 8192 4

D. 4096 5

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 8192 5**

Argument chain 13,6,3,1,0 has five calls; only one half result is recursively computed.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. Reusing one stored recursive half gives a single shrinking chain, not two recursive subtrees.

**Rule/source:** [Original Java traces].

</details>

<a id="da038"></a>
### DA038 — Duplicate recursion hidden by multiplication

For power-of-two n, time and active stack? Analyze the specified point. Selected from original J016; evidence: Days 3–7.

```java
import java.util.*;
import java.io.*;

public class Main {
    static long f(int n){if(n<=1)return 1;return f(n/2)*f(n/2);}

    public static void main(String[] args) throws Exception {
        System.out.println(f(16));
    }
}
```

A. Θ(nlog n) time, Θ(n) stack

B. Θ(2^n) time and stack

C. Θ(log n) time and stack

D. Θ(n) time, Θ(log n) stack

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Θ(n) time, Θ(log n) stack**

Two independent half calls give T(n)=2 T(n/2)+Θ(1). The result 1 does not imply constant runtime.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. Both written recursive calls execute independently even when the resulting product is always one.

**Rule/source:** [Original Java traces].

</details>

<a id="da039"></a>
### DA039 — String centre cannot be ignored

Output and hidden bug? Analyze the specified point. Selected from original J021; evidence: Days 3–7.

```java
import java.util.*;
import java.io.*;

public class Main {
    static boolean ok(String s){int l=0,r=s.length()-1;while(l<r){char a=s.charAt(l++),b=s.charAt(r--);if(!((a=='6'&&b=='9')||(a=='9'&&b=='6')||(a==b&&"018".indexOf(a)>=0)))return false;}return true;}

    public static void main(String[] args) throws Exception {
        System.out.println(ok("629")+" "+ok("619"));
    }
}
```

A. false false; 6/9 pairing invalid

B. true true; the odd centre2 is never checked

C. true false; reject centre1

D. false true; checker correct

<details>
<summary>Answer and reasoning</summary>

**Correct: B — true true; the odd centre2 is never checked**

Only the 6/9 outer pair is examined. Change loop to l<=r (with correct indexes) so an odd centre must map to itself.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. Checking only outer pairs misses an invalid odd-length centre; valid centre digits must map to themselves.

**Rule/source:** [Original Java traces].

</details>

## Java traces: Binary-search boundaries and pruning

<a id="da040"></a>
### DA040 — Exact lower-bound interval sequence

Midpoints and final boundary? Analyze the specified point. Selected from original J022; evidence: Days 7–9.

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] a={1,2,2,2,4};int lo=0,hi=a.length;StringBuilder s=new StringBuilder();
        while(lo<hi){int m=lo+(hi-lo)/2;s.append(m).append(' ');if(a[m]>=2)hi=m;else lo=m+1;}
        System.out.println(s.toString().trim()+" | "+lo);
    }
}
```

A. 2 3 | 3

B. 2 0 | 0

C. 2 1 0 | 1

D. 2 1 | 1

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 2 1 0 | 1**

Half-open[0,5)→[0,2)→[0,1)→[1,1). Equality moves hi, retaining earlier occurrences.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. Equality must update the desired boundary rather than merely stop at any occurrence.

**Rule/source:** [Original Java traces].

</details>

<a id="da041"></a>
### DA041 — Pruned sorted count entries

Count and entries? Analyze the specified point. Selected from original J024; evidence: Days 7–9.

```java
import java.util.*;
import java.io.*;

public class Main {
    static int calls;
    static int f(int[] a,int lo,int hi){calls++;if(lo>hi||a[hi]==0)return 0;if(a[lo]==1)return hi-lo+1;int m=(lo+hi)/2;return f(a,lo,m)+f(a,m+1,hi);}

    public static void main(String[] args) throws Exception {
        System.out.println(f(new int[]{0,0,0,0,1,1,1,1,1,1,1,1,1},0,12)+" "+calls);
    }
}
```

A. 9 13

B. 9 7

C. 9 5

D. 8 7

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 9 5**

Root 0..12 splits 0..6 and 7..12; mixed 0..6 splits 0..3 (pure 0) and 4..6 (pure 1). Five entries produce 9 ones. Both-call syntax still leaves only one mixed boundary path.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. Pruning pure intervals changes the recurrence; the remaining mixed boundary has only a narrow recursive path.

**Rule/source:** [Original Java traces].

</details>

<a id="da042"></a>
### DA042 — Rotation search with equality

Interval entries and minimum index? Analyze the specified point. Selected from original J026; evidence: Days 7–9.

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] a={2,2,2,0,1,2};int l=0,r=5;StringBuilder s=new StringBuilder();
        while(l<r){int m=(l+r)/2;s.append(l).append(':').append(r).append(' ');if(a[m]>a[r])l=m+1;else if(a[m]<a[r])r=m;else r--;}
        System.out.println(s.toString().trim()+" | "+l);
    }
}
```

A. 0:5 0:4 3:4 | 3

B. 0:5 3:5 3:4 | 3

C. 0:5 0:2 | 0

D. 0:5 0:4 | 4

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 0:5 0:4 3:4 | 3**

First equality removes one trailing 2. Next mid 2 value 2>right 1, so l 3; then mid 3 value 0<right 1 gives r 3. Duplicates can make this linear.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. An equal value at the midpoint and right boundary can require dropping only one endpoint, so worst-case time can be linear.

**Rule/source:** [Original Java traces].

</details>

## Java traces: Koko and monotone answer search

<a id="da043"></a>
### DA043 — Search state after second test

Second-test state followed by answer? Analyze the specified point. Selected from original J029; evidence: Days 10–11; transfer extensions.

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] a={3,6,7,11};int l=1,r=11,tests=0;
        while(l<r){int m=(l+r)/2;long h=0;for(int x:a)h+=((long)x+m-1)/m;if(h<=8)r=m;else l=m+1;if(++tests==2)System.out.println(l+" "+r+" "+m+" "+h);}
        System.out.println(l);
    }
}
```

A. 3 6 3 8 / 3

B. 4 5 5 8 / 4

C. 1 6 6 6 / 4

D. 4 6 3 10 / 4

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 4 6 3 10 / 4**

Test 6 is feasible, narrowing hi 6; test 3 requires 10 hours and raises lo 4. Observe after the bound update.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. Integer ceiling and accumulated hours determine feasibility, not an average pile size.

**Rule/source:** [Original Java traces].

</details>

<a id="da044"></a>
### DA044 — Ceiling is per pile

Aggregate ceiling versus correct pile hours? Analyze the specified point. Selected from original J031; evidence: Days 10–11; transfer extensions.

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] a={30,11,23,4,20};int k=22;long sum=0,h=0;
        for(int x:a){sum+=x;h+=(x+k-1)/k;}
        System.out.println((sum+k-1)/k+" "+h);
    }
}
```

A. 7 7

B. 5 7

C. 4 6

D. 4 7

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 4 7**

ceil 88/22=4 merges work across piles, forbidden by the one-pile-per-hour rule. Individual ceilings 2,1,2,1,1 sum 7.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. Ceilings must be applied per pile; unused fractional time cannot be pooled across piles.

**Rule/source:** [Original Java traces].

</details>

## Java traces: Median partitions and safe sentinels

<a id="da045"></a>
### DA045 — Cuts are counts

Partition status and boundary values? Analyze the specified point. Selected from original J034; evidence: Days 11–13.

```java
import java.util.*;
import java.io.*;

public class Main {
    static String part(int[] a,int[] b,int i){int j=(a.length+b.length+1)/2-i;
    long la=i==0?Long.MIN_VALUE:a[i-1],ra=i==a.length?Long.MAX_VALUE:a[i];
    long lb=j==0?Long.MIN_VALUE:b[j-1],rb=j==b.length?Long.MAX_VALUE:b[j];
    return i+" "+j+" "+(la<=rb&&lb<=ra)+" "+Math.max(la,lb)+" "+Math.min(ra,rb);}

    public static void main(String[] args) throws Exception {
        System.out.println(part(new int[]{1,2},new int[]{3,4,5,6},1));
    }
}
```

A. 1 3 false 5 2

B. 1 2 false 4 2

C. 1 1 true 3 4

D. 1 2 true 4 5

<details>
<summary>Answer and reasoning</summary>

**Correct: B — 1 2 false 4 2**

LeftSize 3 gives j 2; B’s left boundary 4 exceeds A’s right boundary 2. Increase A cut to repair.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. Cross-partition inequalities and combined parity determine which boundary values form the median.

**Rule/source:** [Original Java traces].

</details>

## Java traces: LCP and Java copying costs

<a id="da046"></a>
### DA046 — Set state leaked across columns

State at termination and repair? Analyze the specified point. Selected from original J039; evidence: Days 10–11.

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        String[] a={"ab","ab"};Set<Character> seen=new HashSet<>();int len=0;
        for(int i=0;i<2;i++){for(String s:a)seen.add(s.charAt(i));if(seen.size()!=1)break;len++;}
        System.out.println(len+" "+seen.size());
    }
}
```

A. 0 2; use TreeSet

B. 1 2; clear seen at each column

C. 1 1; create one more input string

D. 2 1; correct

<details>
<summary>Answer and reasoning</summary>

**Correct: B — 1 2; clear seen at each column**

Column 0 inserts a; column 1 adds b to old state. Agreement within the second column is obscured by leftover a.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. State from a previous character column must be cleared before comparing agreement within the next column.

**Rule/source:** [Original Java traces].

</details>

<a id="da047"></a>
### DA047 — Recursive substring cost

With modern copied substrings, total time and peak live character storage? Analyze the specified point. **Extension:** Selected from original J042; evidence: Days 10–11.

```java
import java.util.*;
import java.io.*;

public class Main {
    static String rev(String s){if(s.length()<=1)return s;return rev(s.substring(1))+s.charAt(0);}

    public static void main(String[] args) throws Exception {
        System.out.println(rev("abcd"));
    }
}
```

A. Θ(n) time, Θ(1) space

B. Θ(log n) time, Θ(n) space

C. Θ(n²) time and potentially Θ(n²) live characters across frames

D. Θ(nlog n) time, Θ(log n) stack

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Θ(n²) time and potentially Θ(n²) live characters across frames**

Suffix copies of lengths n−1,n−2,… remain referenced by active frames; returned-string concatenation also copies. Index-based char-array recursion avoids those suffix copies.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. Repeated immutable substrings or concatenations can add copying costs beyond the recursion depth.

**Rule/source:** [Original Java traces].

</details>

## Java traces: Dijkstra: matrix and heap execution

<a id="da048"></a>
### DA048 — After two finalized vertices

dist after processing source2 and then next vertex? Analyze the specified point. Selected from original J043; evidence: Days 14–15; heap extensions.

```java
import java.util.*;
import java.io.*;

public class Main {
    static final int INF=999;
    static int[][] g={{0,6,5,0,13},{6,0,12,9,5},{5,12,0,0,0},{0,9,0,0,0},{13,5,0,0,0}};
    static int[] run(int source,int stop){int n=g.length;int[] d=new int[n];Arrays.fill(d,INF);boolean[] seen=new boolean[n];d[source]=0;
    for(int k=0;k<stop;k++){int u=-1;for(int v=0;v<n;v++)if(!seen[v]&&(u==-1||d[v]<d[u]))u=v;if(u==-1||d[u]==INF)break;seen[u]=true;
    for(int v=0;v<n;v++)if(!seen[v]&&g[u][v]!=0&&d[u]+g[u][v]<d[v])d[v]=d[u]+g[u][v];}return d;}

    public static void main(String[] args) throws Exception {
        System.out.println(Arrays.toString(run(2,2)));
    }
}
```

A. [5, 11, 0, 999, 18]

B. [5, 11, 0, 20, 16]

C. [5, 12, 0, 9, 13]

D. [5, 6, 0, 999, 13]

<details>
<summary>Answer and reasoning</summary>

**Correct: A — [5, 11, 0, 999, 18]**

After source 2 tentative values are 5,12,0,∞,∞. Processing 0 improves 1 to 11 and 4 to 18; vertex 3 is still untouched.999 denotes infinity only for these small weights.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. A tentative distance is not necessarily finalized; relaxations use total distance.

**Rule/source:** [Original Java traces].

</details>

<a id="da049"></a>
### DA049 — Incorrect update behaves like Prim

Printed array and Dijkstra repair? Analyze the specified point. Selected from original J046; evidence: Days 14–15; heap extensions.

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[][] g={{0,6,5},{6,0,12},{5,12,0}};int[] d={999,999,0};boolean[] seen=new boolean[3];
        for(int k=0;k<3;k++){int u=-1;for(int v=0;v<3;v++)if(!seen[v]&&(u==-1||d[v]<d[u]))u=v;seen[u]=true;
        for(int v=0;v<3;v++)if(!seen[v]&&g[u][v]>0)d[v]=Math.min(d[v],g[u][v]);}
        System.out.println(Arrays.toString(d));
    }
}
```

A. [5, 11, 0]; already correct

B. [5, 12, 0]; visit1 first

C. [6, 5, 0]; reverse comparator

D. [5, 6, 0]; relax with d[u]+g[u][v]

<details>
<summary>Answer and reasoning</summary>

**Correct: D — [5, 6, 0]; relax with d[u]+g[u][v]**

Raw edge 6 overwrites source 2→1’s path value, despite total through 0 being 11. Prim’s key and Dijkstra’s distance represent different quantities.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. Using an edge weight directly is a Prim-style key update, not a Dijkstra distance relaxation.

**Rule/source:** [Original Java traces].

</details>

## Java traces: Prim, graph representation and MST cost

<a id="da050"></a>
### DA050 — Key-parent arrays halfway

Arrays after selecting0 and1? Analyze the specified point. Selected from original J050; evidence: Days 14, 16–17.

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[][] g={{0,2,3,0},{2,0,2,7},{3,2,0,4},{0,7,4,0}};
    static void run(int stop){int[] key={0,999,999,999},par={-1,-1,-1,-1};boolean[] used=new boolean[4];
    for(int k=0;k<stop;k++){int u=-1;for(int v=0;v<4;v++)if(!used[v]&&(u<0||key[v]<key[u]))u=v;used[u]=true;
    for(int v=0;v<4;v++)if(!used[v]&&g[u][v]!=0&&g[u][v]<key[v]){key[v]=g[u][v];par[v]=u;}}
    System.out.println(Arrays.toString(key)+" "+Arrays.toString(par));}

    public static void main(String[] args) throws Exception {
        run(2);
    }
}
```

A. [0, 2, 4, 9] [-1, 0, 1, 1]

B. [0, 2, 2, 7] [-1, 0, 1, 1]

C. [0, 2, 3, 999] [-1, 0, 0, -1]

D. [0, 2, 2, 4] [-1, 0, 1, 2]

<details>
<summary>Answer and reasoning</summary>

**Correct: B — [0, 2, 2, 7] [-1, 0, 1, 1]**

After 0, keys 2 and 3 correspond to 1 and 2. Selecting 1 replaces key 2 by edge 2 and discovers vertex 3 with edge 7.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. An MST key is a cheapest connecting edge, not a total path length.

**Rule/source:** [Original Java traces].

</details>

<a id="da051"></a>
### DA051 — Matrix/list scans counted

Measured counts and general neighbour-enumeration costs? Analyze the specified point. Selected from original J053; evidence: Days 14, 16–17.

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[][] a={{0,1,0,1},{1,0,0,0},{0,0,0,0},{1,0,0,0}};
        List<Integer> row=Arrays.asList(1,3);int matrixTests=0,listVisits=0;
        for(int v=0;v<4;v++){matrixTests++;if(a[0][v]!=0){} }
        for(int v:row)listVisits++;
        System.out.println(matrixTests+" "+listVisits);
    }
}
```

A. 4 2; both Θ(1)

B. 4 2; matrix Θ(V), list Θ(deg(u))

C. 4 4; both Θ(V²)

D. 2 2; both Θ(deg(u))

<details>
<summary>Answer and reasoning</summary>

**Correct: B — 4 2; matrix Θ(V), list Θ(deg(u))**

A matrix tests absent neighbours too; the list contains only actual adjacency entries. Cost of one pair lookup is a different question.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. Matrix scanning examines absent edge slots; adjacency-list scanning follows only stored entries.

**Rule/source:** [Original Java traces].

</details>

## Java traces: DSU: compressed parents and rank

<a id="da052"></a>
### DA052 — Union does not eagerly flatten all children

Parent and rank arrays immediately afterwards? Analyze the specified point. Selected from original J055; evidence: Days 17–18.

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[] p={0,0,1,3,3};static int[] rank={1,0,0,1,0};
    static int find(int x){if(p[x]!=x)p[x]=find(p[x]);return p[x];}
    static void union(int a,int b){int x=find(a),y=find(b);if(x==y)return;if(rank[x]<rank[y])p[x]=y;else if(rank[x]>rank[y])p[y]=x;else{p[y]=x;rank[x]++;}}

    public static void main(String[] args) throws Exception {
        find(2);union(2,4);System.out.println(Arrays.toString(p)+" "+Arrays.toString(rank));
    }
}
```

A. [0, 0, 0, 0, 3] [2, 0, 0, 1, 0]

B. [0, 0, 1, 3, 0] [1, 0, 0, 2, 0]

C. [0, 0, 0, 0, 3] [1, 0, 0, 1, 0]

D. [0, 0, 0, 0, 0] [2, 0, 0, 0, 0]

<details>
<summary>Answer and reasoning</summary>

**Correct: A — [0, 0, 0, 0, 3] [2, 0, 0, 1, 0]**

find 2 compresses 2. find 4 happens before root 3 is linked under 0, so 4 remains pointed at 3 until another find. Equal rank 1 merges raise root 0 rank to 2.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. A direct parent is not necessarily the set’s root.

**Rule/source:** [Original Java traces].

</details>

<a id="da053"></a>
### DA053 — Same-root rank inflation

Ranks after two already-connected union requests? Analyze the specified point. Selected from original J058; evidence: Days 17–18.

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[] p={0,0,1,3,3};static int[] rank={1,0,0,1,0};
    static int find(int x){if(p[x]!=x)p[x]=find(p[x]);return p[x];}
    static void union(int a,int b){int x=find(a),y=find(b);if(x==y)return;if(rank[x]<rank[y])p[x]=y;else if(rank[x]>rank[y])p[y]=x;else{p[y]=x;rank[x]++;}}

    public static void main(String[] args) throws Exception {
        union(1,2);union(1,2);System.out.println(Arrays.toString(rank));
    }
}
```

A. [0, 0, 0, 0, 0]

B. [3, 0, 0, 1, 0]

C. [2, 0, 0, 1, 0]

D. [1, 0, 0, 1, 0]

<details>
<summary>Answer and reasoning</summary>

**Correct: D — [1, 0, 0, 1, 0]**

find 1 and find 2 both return 0. The same-root guard returns before changing ranks; blindly increasing on every call inflates the heuristic.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. Union must link roots and update ranks under the stated cases.

**Rule/source:** [Original Java traces].

</details>

## Java traces: Kruskal: accepted versus examined edges

<a id="da054"></a>
### DA054 — Rejected edge still consumes index

After third examined edge, then after loop? Analyze the specified point. Selected from original J061; evidence: Day 18.

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[] p={0,1,2,3};static int find(int x){while(p[x]!=x)x=p[x];return x;}
    static int[][] edges={{0,1,1},{1,2,2},{0,2,3},{2,3,4}};

    public static void main(String[] args) throws Exception {
        int total=0,count=0,i=0;
        while(count<3&&i<edges.length){int[] e=edges[i++];int a=find(e[0]),b=find(e[1]);if(a==b)continue;p[b]=a;total+=e[2];count++;if(i==3)System.out.println(i+" "+count+" "+total);}
        System.out.println(i+" "+count+" "+total);
    }
}
```

A. 3 3 6 then3 3 6

B. 3 2 3 then4 3 7

C. Only final line4 3 7; continue skips the third-edge print

D. No line is printed

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Only final line4 3 7; continue skips the third-edge print**

Third edge 0–2 is rejected before the i==3 print. Continue transfers to the while condition; fourth edge is accepted, giving count 3,total 7. Distinguish an observation that is skipped from a requested conceptual state.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. Cycle detection depends on current component roots, not only edge endpoints being different.

**Rule/source:** [Original Java traces].

</details>

<a id="da055"></a>
### DA055 — Forest cost versus MST existence

Output and interpretation? Analyze the specified point. Selected from original J065; evidence: Day 18.

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[] p={0,1,2,3};static int find(int x){while(p[x]!=x)x=p[x];return x;}
    static int[][] edges={{0,1,1},{1,2,2},{0,2,3},{2,3,4}};

    public static void main(String[] args) throws Exception {
        edges=new int[][]{{0,1,2},{2,3,3}};int count=0,cost=0;
        for(int[] e:edges){int a=find(e[0]),b=find(e[1]);if(a!=b){p[b]=a;count++;cost+=e[2];}}
        System.out.println(count+" "+cost+" "+(count==3));
    }
}
```

A. 2 5 false; a minimum spanning forest, not a full spanning tree

B. 3 5 true

C. 2 0 false

D. 2 5 true; any cheapest edges form MST

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 2 5 false; a minimum spanning forest, not a full spanning tree**

Each separate component has its tree edge. Full connectivity requires 3 accepted edges for 4 vertices.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. The number of scanned edges and accepted edges differ; disconnected inputs may never reachV−1.

**Rule/source:** [Original Java traces].

</details>

## Java traces: BFS: queue snapshots and duplicate discovery

<a id="da056"></a>
### DA056 — Queue after a specific dequeue

Queue front-to-back after removal2 is processed? Analyze the specified point. Selected from original J066; evidence: Days 19–21.

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[][] g={{1,2},{3,4},{4},{},{}};boolean[] seen=new boolean[5];Deque<Integer> q=new ArrayDeque<>();
        q.offer(0);seen[0]=true;int removals=0;
        while(!q.isEmpty()){int u=q.poll();for(int v:g[u])if(!seen[v]){seen[v]=true;q.offer(v);}if(++removals==2)System.out.println(q);}
    }
}
```

A. [2, 3, 4, 4]

B. [1, 2, 3, 4]

C. [3, 4, 2]

D. [2, 3, 4]

<details>
<summary>Answer and reasoning</summary>

**Correct: D — [2, 3, 4]**

After 0 queue[1,2]. Removing 1 appends 3,4 behind 2; seen is marked on discovery.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. FIFO discovery and the listed neighbor order determine the exact frontier.

**Rule/source:** [Original Java traces].

</details>

<a id="da057"></a>
### DA057 — Distance set on discovery

Distances from0? Analyze the specified point. Selected from original J069; evidence: Days 19–21.

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[][] g={{1,2},{3},{3,4},{4},{}};int[] d=new int[5];Arrays.fill(d,-1);d[0]=0;Deque<Integer> q=new ArrayDeque<>();q.offer(0);
        while(!q.isEmpty()){int u=q.poll();for(int v:g[u])if(d[v]<0){d[v]=d[u]+1;q.offer(v);}}
        System.out.println(Arrays.toString(d));
    }
}
```

A. [0, 0, 0, 1, 1]

B. [0, 1, 1, 2, 3]

C. [0, 1, 1, 2, 2]

D. [0, 1, 2, 3, 4]

<details>
<summary>Answer and reasoning</summary>

**Correct: C — [0, 1, 1, 2, 2]**

4 is discovered from 2 at depth 2 before any longer route through 3. Unit-edge BFS layers minimize edge counts.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. FIFO discovery minimizes edge count; the first discovered distance is retained rather than replaced by a longer route.

**Rule/source:** [Original Java traces].

</details>

## Java traces: DFS ordering and the actual maze

<a id="da058"></a>
### DA058 — Mark-on-push stack order

Printed order with reverse pushes and mark-on-push? Analyze the specified point. Selected from original J071; evidence: Days 21–22.

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[][] g={{1,2},{2,3},{3},{}};boolean[] seen=new boolean[4];Deque<Integer> st=new ArrayDeque<>();st.push(0);seen[0]=true;
        StringBuilder log=new StringBuilder();while(!st.isEmpty()){int u=st.pop();log.append(u);for(int k=g[u].length-1;k>=0;k--){int v=g[u][k];if(!seen[v]){seen[v]=true;st.push(v);}}}
        System.out.println(log);
    }
}
```

A. 0231

B. 0132

C. 01323

D. 0123

<details>
<summary>Answer and reasoning</summary>

**Correct: B — 0132**

After 0,2 is already marked/pending underneath 1. Vertex 1 cannot descend into that pending 2, so it pushes 3 and visits 3 first. Reverse pushing alone does not always replicate recursive DFS when discovery timing differs.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. A stack reverses push order at pop time; recursive and iterative traversal orders need explicit neighbor conventions.

**Rule/source:** [Original Java traces].

</details>

## Java traces: Grid islands: visitation, shape and ownership

<a id="da059"></a>
### DA059 — Second analysis consumes no land

Printed pairs after destructive flood then immediate repeat? Analyze the specified point. Selected from original J076; evidence: Days 19–20.

```java
import java.util.*;
import java.io.*;

public class Main {
    static int R=3,C=4;static int[][] g={{1,1,0,1},{0,0,0,0},{1,1,0,1}};
    static int flood(int r,int c){if(r<0||c<0||r>=R||c>=C||g[r][c]==0)return 0;g[r][c]=0;return 1+flood(r+1,c)+flood(r-1,c)+flood(r,c+1)+flood(r,c-1);}
    static int run(){int count=0,max=0;for(int r=0;r<R;r++)for(int c=0;c<C;c++)if(g[r][c]==1){count++;max=Math.max(max,flood(r,c));}System.out.print(count+":"+max+" ");return count;}

    public static void main(String[] args) throws Exception {
        run();run();System.out.println();
    }
}
```

A. 4:2 0:2

B. 4:2 0:0

C. 2:4 0:0

D. 4:2 4:2

<details>
<summary>Answer and reasoning</summary>

**Correct: B — 4:2 0:0**

First traversal changes all land to 0. The second call has no open component and initializes its own max 0.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. A destructive flood consumes the original grid; a second traversal needs an independent copy to reproduce the first result.

**Rule/source:** [Original Java traces].

</details>

## Java traces: Balanced trees: return sentinels and repeated scans

<a id="da060"></a>
### DA060 — Sentinel propagates before height arithmetic

Height/check result? Analyze the specified point. Selected from original J087; evidence: Days 23–24.

```java
import java.util.*;
import java.io.*;

public class Main {
    static class N{int v;N l,r;N(int v){this.v=v;}N(int v,N l,N r){this.v=v;this.l=l;this.r=r;}}
    static int calls;
    static boolean mirror(N a,N b){calls++;if(a==null||b==null)return a==b;if(a.v!=b.v)return false;return mirror(a.l,b.r)&&mirror(a.r,b.l);}
    static int check(N x){if(x==null)return 0;int l=check(x.l);if(l==-1)return -1;int r=check(x.r);if(r==-1||Math.abs(l-r)>1)return -1;return 1+Math.max(l,r);}

    public static void main(String[] args) throws Exception {
        N x=new N(1,new N(2,new N(3,new N(4),null),null),new N(5));
        System.out.println(check(x));
    }
}
```

A. 4

B. -1

C. 3

D. 0

<details>
<summary>Answer and reasoning</summary>

**Correct: B — -1**

The left chain becomes unbalanced at node 2 and returns−1. Root must not treat that sentinel as an ordinary height.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. Height balance must propagate a failure from descendants rather than inspect only the root.

**Rule/source:** [Original Java traces].

</details>

## Java traces: Level averages: live queue bounds and DFS state

<a id="da061"></a>
### DA061 — Level mixing from live size

Sum and remaining front? Analyze the specified point. Selected from original J092; evidence: Days 23–24.

```java
import java.util.*;
import java.io.*;

public class Main {
    static class N{int v;N l,r;N(int v){this.v=v;}N(int v,N l,N r){this.v=v;this.l=l;this.r=r;}}
    static int calls;
    static boolean mirror(N a,N b){calls++;if(a==null||b==null)return a==b;if(a.v!=b.v)return false;return mirror(a.l,b.r)&&mirror(a.r,b.l);}

    public static void main(String[] args) throws Exception {
        N root=new N(1,new N(2),new N(3));Deque<N> q=new ArrayDeque<>();q.offer(root);long sum=0;
        for(int i=0;i<q.size();i++){N x=q.poll();sum+=x.v;if(x.l!=null)q.offer(x.l);if(x.r!=null)q.offer(x.r);}
        System.out.println(sum+" "+q.peek().v);
    }
}
```

A. 3 3

B. 4 2

C. 6 0

D. 1 2

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 3 3**

After root, size 2 admits i 1, consuming node 2. Now size 1 makes i 2 fail. Snapshot n before processing a level.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. Level size must be captured before processing new child entries.

**Rule/source:** [Original Java traces].

</details>

## Java traces: Boundary traversal: fallbacks and duplicate leaves

<a id="da062"></a>
### DA062 — All phases on a branching tree

Anticlockwise boundary? Analyze the specified point. Selected from original J097; evidence: Day 22.

```java
import java.util.*;
import java.io.*;

public class Main {
    static class N{int v;N l,r;N(int v){this.v=v;}N(int v,N l,N r){this.v=v;this.l=l;this.r=r;}}
    static int calls;
    static boolean mirror(N a,N b){calls++;if(a==null||b==null)return a==b;if(a.v!=b.v)return false;return mirror(a.l,b.r)&&mirror(a.r,b.l);}
    static List<Integer> out=new ArrayList<>();static boolean leaf(N x){return x!=null&&x.l==null&&x.r==null;}
    static void leaves(N x){if(x==null)return;if(leaf(x)){out.add(x.v);return;}leaves(x.l);leaves(x.r);}
    static void boundary(N root){if(root==null)return;if(!leaf(root))out.add(root.v);
    for(N x=root.l;x!=null;x=x.l!=null?x.l:x.r)if(!leaf(x))out.add(x.v);
    leaves(root);List<Integer> right=new ArrayList<>();for(N x=root.r;x!=null;x=x.r!=null?x.r:x.l)if(!leaf(x))right.add(x.v);
    Collections.reverse(right);out.addAll(right);}

    public static void main(String[] args) throws Exception {
        boundary(new N(1,new N(2,new N(4),new N(5)),new N(3,new N(6),new N(7))));System.out.println(out);
    }
}
```

A. [1, 2, 4, 5, 6, 7, 3, 1]

B. [1, 4, 2, 5, 6, 3, 7]

C. [1, 2, 4, 5, 3, 6, 7]

D. [1, 2, 4, 5, 6, 7, 3]

<details>
<summary>Answer and reasoning</summary>

**Correct: D — [1, 2, 4, 5, 6, 7, 3]**

Nonleaf left boundary precedes all leaves; nonleaf right boundary is reversed. Internal nodes 5/6 are leaves here, not boundary duplicates.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. Boundary traversal avoids duplicate leaves and reverses the right boundary.

**Rule/source:** [Original Java traces].

</details>

## Java traces: N-Queens and shared backtracking state

<a id="da063"></a>
### DA063 — Complete recursive-state count

Solutions and function entries for4 queens? Analyze the specified point. Selected from original J101; evidence: Day 25.

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[] col;static int solutions,entries;
    static boolean safe(int r,int c){for(int i=0;i<r;i++)if(col[i]==c||Math.abs(col[i]-c)==r-i)return false;return true;}
    static void f(int r){entries++;if(r==col.length){solutions++;return;}for(int c=0;c<col.length;c++)if(safe(r,c)){col[r]=c;f(r+1);}}

    public static void main(String[] args) throws Exception {
        col=new int[4];f(0);System.out.println(solutions+" "+entries);
    }
}
```

A. 1 17

B. 2 60

C. 2 21

D. 2 17

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 2 17**

Entries by depth are 1,4,6,4,2.60 would count candidate trials, not recursive entries; completed placements contribute leaf calls.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. Function entries, candidate trials and completed solutions are distinct counts.

**Rule/source:** [Original Java traces].

</details>

## Java traces: Hamiltonian: closure, path state and search order

<a id="da064"></a>
### DA064 — Full path lacks closing edge

Result and restored path? Analyze the specified point. Selected from original J111; evidence: Day 26.

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[][] g;static int[] p;static boolean[] used;
    static boolean f(int pos){if(pos==p.length)return g[p[pos-1]][p[0]]!=0;
    for(int v=1;v<p.length;v++)if(!used[v]&&g[p[pos-1]][v]!=0){p[pos]=v;used[v]=true;if(f(pos+1))return true;used[v]=false;p[pos]=-1;}return false;}
    static boolean run(){p=new int[g.length];Arrays.fill(p,-1);used=new boolean[g.length];p[0]=0;used[0]=true;return f(1);}

    public static void main(String[] args) throws Exception {
        g=new int[][]{{0,1,0,0},{1,0,1,0},{0,1,0,1},{0,0,1,0}};System.out.println(run()+" "+Arrays.toString(p));
    }
}
```

A. false [0, -1, -1, -1]

B. true [0, -1, -1, -1]

C. false [0, 1, 2, 3]

D. true [0, 1, 2, 3]

<details>
<summary>Answer and reasoning</summary>

**Correct: A — false [0, -1, -1, -1]**

Path 0,1,2,3 exists but 3→0 is absent. Failure unwinds and clears selected positions; only the fixed start remains.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. A valid Hamiltonian prefix still needs an edge from its final vertex back to the start.

**Rule/source:** [Original Java traces].

</details>

## Java traces: Brace expansion: parser state, union and products

<a id="da065"></a>
### DA065 — Nested concatenation result

Sorted unique expansion? Analyze the specified point. **Extension:** Selected from original J116; evidence: Day 26; nested formal grammar extension.

```java
import java.util.*;
import java.io.*;

public class Main {
    static String s;static int at;
    static Set<String> union(){Set<String> ans=new TreeSet<>(product());while(at<s.length()&&s.charAt(at)==','){at++;ans.addAll(product());}return ans;}
    static Set<String> product(){Set<String> out=new TreeSet<>();out.add("");while(at<s.length()&&s.charAt(at)!=','&&s.charAt(at)!='}'){
    Set<String> factor;if(s.charAt(at)=='{'){at++;factor=union();at++;}else{factor=new TreeSet<>();factor.add(String.valueOf(s.charAt(at++)));}
    Set<String> next=new TreeSet<>();for(String a:out)for(String b:factor)next.add(a+b);out=next;}return out;}
    static Set<String> expand(String input){s=input;at=0;return union();}

    public static void main(String[] args) throws Exception {
        System.out.println(expand("{a,b}{c,{d,e}}"));
    }
}
```

A. [ac, ad, ae, bc, bd, be]

B. [ac, bd, be]

C. [acd, ace, bcd, bce]

D. [a, b, c, d, e]

<details>
<summary>Answer and reasoning</summary>

**Correct: A — [ac, ad, ae, bc, bd, be]**

Second factor is the union ofc,d,e, then multiplied by first factora,b. Nested delimiters control parsing rather than becoming output characters.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. Union alternatives and concatenation products are different parser operations.

**Rule/source:** [Original Java traces].

</details>

## Java traces: Gray code: bits, closure and representation

<a id="da066"></a>
### DA066 — XOR and OR differ on set bits

Three results? Analyze the specified point. Selected from original J121; evidence: Day 27.

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int x=3;System.out.println((x^(1<<1))+" "+(x|(1<<1))+" "+(x&~(1<<1)));
    }
}
```

A. 3 3 1

B. 1 3 2

C. 1 1 1

D. 1 3 1

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 1 3 1**

011 XOR010 toggles to 001; OR retains 011; AND with complemented mask clears bit 1.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. XOR toggles a selected bit, OR sets it, and AND with a complemented mask clears it.

**Rule/source:** [Original Java traces].

</details>

## Java traces: Campus Bikes: assignment state and pruning

<a id="da067"></a>
### DA067 — Global optimum and undo

Minimum cost, leaves, final flags? Analyze the specified point. Selected from original J126; evidence: Day 27.

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[][] w={{0,0},{2,0}},b={{1,0},{-2,0}};static boolean[] used=new boolean[2];static int best=999,leaves;
    static int d(int i,int j){return Math.abs(w[i][0]-b[j][0])+Math.abs(w[i][1]-b[j][1]);}
    static void f(int i,int sum){if(i==w.length){leaves++;best=Math.min(best,sum);return;}for(int j=0;j<b.length;j++)if(!used[j]){used[j]=true;f(i+1,sum+d(i,j));used[j]=false;}}

    public static void main(String[] args) throws Exception {
        f(0,0);System.out.println(best+" "+leaves+" "+Arrays.toString(used));
    }
}
```

A. 2 2 [false, false]

B. 3 4 [false, false]

C. 3 2 [false, false]

D. 5 1 [true, true]

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 3 2 [false, false]**

Assignments costs 5 and 3 are both tried; each worker needs a distinct bike and all choices are undone on return.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. Nearest available pair is not a proof of minimum total assignment cost.

**Rule/source:** [Original Java traces].

</details>

## Java traces: Additional lecture coverage: cycles, GCD reductions and generators

<a id="da068"></a>
### DA068 — Happy-number repeated-state log

Sequence before detection and repeated state? Analyze the specified point. Selected from original J152; evidence: Days 2–7; Java comparison extension.

```java
import java.util.*;
import java.io.*;

public class Main {
    static int next(int n){int s=0;while(n>0){int d=n%10;s+=d*d;n/=10;}return s;}

    public static void main(String[] args) throws Exception {
        int n=2;Set<Integer> seen=new HashSet<>();StringBuilder log=new StringBuilder();while(n!=1&&seen.add(n)){log.append(n).append(",");n=next(n);}System.out.println(log+"stop="+n+" size="+seen.size());
    }
}
```

A. 2,4,16,37,58,89,145,42,20,stop=1 size=9

B. 2,4,16,37,58,89,145,42,20,4,stop=16 size=10

C. 2,4,stop=2 size=2

D. 2,4,16,37,58,89,145,42,20,stop=4 size=9

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 2,4,16,37,58,89,145,42,20,stop=4 size=9**

seen.add returnsfalse for repeated 4 before the body runs again. The path reaches a cycle different from 1; arbitrary step limits are unnecessary.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. Cycle detection and termination conditions depend on the evolving state, not only the original number.

**Rule/source:** [Original Java traces].

</details>

<a id="da069"></a>
### DA069 — Strobogrammatic outside-zero guard

Count and first/last generated strings? Analyze the specified point. Selected from original J154; evidence: Days 2–7; Java comparison extension.

```java
import java.util.*;
import java.io.*;

public class Main {
    static List<String> f(int n,int total){if(n==0)return new ArrayList<>(Arrays.asList(""));if(n==1)return new ArrayList<>(Arrays.asList("0","1","8"));List<String> out=new ArrayList<>();for(String m:f(n-2,total))for(String p:new String[]{"00","11","69","88","96"}){if(n==total&&p.equals("00"))continue;out.add(p.charAt(0)+m+p.charAt(1));}return out;}

    public static void main(String[] args) throws Exception {
        List<String> a=f(3,3);System.out.println(a.size()+" "+a.get(0)+" "+a.get(a.size()-1));
    }
}
```

A. 9 111 989

B. 12 101 986

C. 12 101 989

D. 15 000 989

<details>
<summary>Answer and reasoning</summary>

**Correct: B — 12 101 986**

Three valid centre digits multiplied by four allowed outside pairs gives 12. Inner recursion’s ordering starts centre 0; last centre 8 pairs 96→986.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. Count valid middle digits and allowed outer pairs separately; leading zero is forbidden only in the outermost pair for a multi-digit number.

**Rule/source:** [Original Java traces].

</details>

<a id="da070"></a>
### DA070 — Prime square comparison wraps

Booleans and safe loop boundary? Analyze the specified point. Selected from original J156; evidence: Days 2–7; Java comparison extension.

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int d=46341,n=Integer.MAX_VALUE;System.out.println((d*d<=n)+" "+(d<=n/d));
    }
}
```

A. false true; reverse operands

B. false false; no overflow

C. true false; use d<=n/d for positive d,n

D. true true; sqrt bound allows46341

<details>
<summary>Answer and reasoning</summary>

**Correct: C — true false; use d<=n/d for positive d,n**

46341² exceeds int range and wraps negative, making the bad comparison true. Division boundary remains correct without multiplication overflow.

**Why the other choices fail:** The alternatives must satisfy the shown update order, stopping point and input contract. A multiplication can wrap before the comparison; a division-based bound avoids that overflow.

**Rule/source:** [Original Java traces].

</details>

## Sources

[DAA lecture map]: FS_Lecture_Coverage.md
[DAA concepts]: FS_Concept_Notes.md
[Original Java traces]: FS_Java_Hard_MCQ_Bank.md
[MIT algorithms]: https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/pages/lecture-notes/
[Java collections]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/package-summary.html
