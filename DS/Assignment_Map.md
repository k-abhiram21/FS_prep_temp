# College assignments and NeetCode — topic map

**Input:** the 42 assignment titles you pasted. Only names were supplied; full statements, constraints, judge signatures and variants were not. The inferred topics below help select practice, but do not replace reading the actual college problem.

**Day 1 selection:** Product Except Self and Climbing Stairs from NeetCode 150, plus local factorial/recursion/counting drills. The list has no unambiguous direct counterpart for the first two. `StairCase` requires its statement.

**Day 2 selection:** Climbing Stairs, Reverse String and Happy Number are direct NeetCode 150 practice matches; Fibonacci and generalised jumps are local exercises from the lecture. The supplied college titles do not clearly identify any of these four exact problems. U2_BS_SP_LCP and U2_BS_SP_LCP HashMap concern longest common prefix, so do not count them as reverse-string duplicates. Avoid treating U2_BS_AP_StairCase as Climbing Stairs until its statement confirms the recurrence.

## Day 2 practice map

| Lecture topic | Practice to use | Relationship |
|---|---|---|
| Fibonacci and accumulator recursion | fibIterative, fibState, and the paper traces in [Day_02_Practice.md](Day_02_Practice.md) | Custom drills; no exact supplied assignment title |
| Climbing Stairs | [NeetCode Climbing Stairs](https://neetcode.io/problems/climbing-stairs/question) / [LC 70](https://leetcode.com/problems/climbing-stairs/) | Direct NeetCode 150 match; use U2_BS_AP_StairCase only after reading its statement |
| Reverse String | [LC 344](https://leetcode.com/problems/reverse-string/) | Direct string exercise; no exact college title supplied |
| Happy Number | [LC 202](https://leetcode.com/problems/happy-number/) | Direct NeetCode 150 match; no exact college title supplied |
| General jumps 1..m | countWays(n,m) in [day02_reference.cpp](code/day02_reference.cpp) | Custom extension; useful recurrence practice, not an identified college duplicate |

## 1. Useful overlaps to deduplicate later

The NeetCode side of this shortlist was checked against the [official problem registry](https://github.com/neetcode-gh/leetcode/blob/main/.problemSiteData.json). “Likely same” still depends on the college statement. A related pattern is not a problem equivalence.

| Your title, shortened | NeetCode 150 counterpart | Relationship / when |
|---|---|---|
| NQueens_Problem | [N-Queens](https://leetcode.com/problems/n-queens/) | Likely same; later backtracking |
| Balanced_Binary_Tree | [Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/) | Likely same; later trees |
| No_Of_Islands | [Number of Islands](https://leetcode.com/problems/number-of-islands/) | Likely same; check adjacency convention |
| MaxAreaOfIsland | [Max Area of Island](https://leetcode.com/problems/max-area-of-island/) | Likely same; later grid traversal |
| KOKO Eating Bananas | [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/) | Likely same; binary search on an answer |
| MedianOfTwoSortedArrays | [Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/) | Likely same; advanced binary search, defer deep practice this week |
| BuyAndSellStock | [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) | Likely same only if at most one transaction |
| ArrayRotationCount | [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) | Related: minimum's index can give rotation count; assumptions matter |

## 2. Complete title inventory

**FS priority here is a recommendation from the scope described in your plans**, not confirmed topic weightage. “Recall” means understand the method and one trace before FS; detailed implementation can wait unless your exam explicitly requires it. Start deeper tasks only after their prerequisite lecture.

| # | Supplied assignment name | Inferred concept / scope caution | Suggested timing |
|---:|---|---|---|
| 1 | U3_DAA_Backtracking_AP_Additive_Number | Choosing an initial split, then checking additive continuation; leading-zero/number-size rules need statement | Later depth |
| 2 | U3_DAA_Backtracking_AP_Beautiful_Arrangement | Constrained permutation search | Later depth |
| 3 | U3_DAA_Backtracking_SP34_Brace_Expansion | Enumerating string choices; grammar/brace variant unresolved | Later depth |
| 4 | U3_DAA_Backtracking_SP33_Hamiltonian_Cycle | Search for a cycle visiting every vertex once; not an MST or shortest-path task | Recall concept; later code |
| 5 | U3_DAA_Backtracking_SP36_Path_with_Max_Gold | Grid path search with visited-state restoration; permitted moves need statement | Later depth |
| 6 | U3_DAA_Backtracking_SP32_NQueens_Problem | Row/column/diagonal constraints; related to Day 1's recursion foundation, but not taught in Day 1 | Later depth |
| 7 | U3_DAA_Backtracking_SP37_Generate_Abbreviations | Branching decisions while tracking abbreviation runs | Later depth |
| 8 | U3_DAA_Backtracking_SP_Campus_Bikes | Assignment problem; greedy tie-breaking and minimum-total-distance versions differ | Obtain statement before mapping |
| 9 | U3_DAA_Backtracking_SP_Gray_Code | Bit-sequence construction; reflected construction versus search | Later depth |
| 10 | U3_DAA_Trees_SP3_AverageAtEachLevel | Tree level traversal and arithmetic mean | Recall; one trace |
| 11 | U3_DAA_Trees_SP2_Balanced_Binary_Tree | Compute subtree heights and test balance | Recall; later implementation |
| 12 | U3_DAA_Trees_SP1_Symmetric_Tree | Compare mirrored pairs of children | Recall; one trace |
| 13 | U3_DFS_SP2_BoundaryOfBinaryTree | Boundary traversal order, leaf handling and avoiding duplicates | Later depth |
| 14 | U3_DFS_SP1_TheMaze | Reachability; rolling-ball versus ordinary-step rules change transitions | Recall after reading statement |
| 15 | U3_BFS_AP1_BFS | Queue, visited set, graph traversal | Recall; representative trace |
| 16 | U3_BFS_SP1_FindAllLonelyNodes | Tree nodes without siblings; BFS or DFS may both work | Recall; small exercise if time |
| 17 | U3_BFS_AP36_No_Of_Islands | Count connected components in a grid | Recall; useful representative traversal |
| 18 | U3_BFS_SP23_DistinctIslands | Component shape representation; translation/rotation/reflection equivalence needs statement | Later depth |
| 19 | U3_BFS_SP22_MaxAreaOfIsland | Largest connected grid-component size | Recall; avoid duplicate full practice after #17 |
| 20 | Attendance_Program(21-08-26) | Name does not identify a computational problem | Obtain statement |
| 21 | Krushkals_MST | Kruskal: edge ordering and cycle detection/DSU | Recall MST contrast; later code |
| 22 | Minimum_Product_of_a_Subset_from_Array | Signs, zeros and subset-size rules; nonempty-subset requirement needs statement | Greedy-day candidate if taught; otherwise later |
| 23 | Stock_Buy_Sell_InfiniteTransactions | Repeated transactions; distinguish from one-transaction stock and cooldown/fee variants | Greedy-day candidate after simple rules |
| 24 | Prims_MST | Prim: expand a connected set using crossing edges | Recall MST contrast; later code |
| 25 | U2_BS_AP_StairCase | Ambiguous: BS prefix suggests answer-search/coin rows; do not assume staircase path counting | Confirm statement; Day 1 only if one/two-step counting |
| 26 | U2_BS_AP_SplitArraySum | Likely minimise largest contiguous partition sum; sign/count restrictions matter | Later depth |
| 27 | U2_BS_AP_PerfectSquareOrNot | Search for integer square root; avoid overflow in comparisons | Optional simple search exercise |
| 28 | U2_BS_SP_MedianOfTwoSortedArrays | Partition two ordered arrays | Later depth; hard task |
| 29 | BuyAndSellStock | Likely one buy/sell: minimum price so far and best profit; confirm number of transactions | Useful arrays/greedy practice alternative |
| 30 | ShortestPath | Graph type/weights decide BFS, Dijkstra or another algorithm | Recall after statement; no assumed algorithm |
| 31 | Fractional_Knapsack_Problem | Sort by value/weight; fractions allowed | **Core greedy practice on 6 Oct** |
| 32 | Adjacency_Matrix | Graph representation and space/edge-query tradeoffs | Recall |
| 33 | Adjacency_List | Graph representation and neighbour traversal | Recall |
| 34 | Minimum number of Coins | Denominations determine whether greedy is correct; arbitrary coins may need DP | Core greedy counterexample; choose code only after statement |
| 35 | U1_AP_FirstLastOccurrence | Find two sorted-array boundaries | Useful search practice after binary-search lesson |
| 36 | U1_AP_ArrayRotationCount | Find pivot/minimum index under rotation assumptions | Recall; later code |
| 37 | U1_AP_CountOccurrences | Often derive count from first/last boundaries; sortedness matters | Combine with #35 if statement permits |
| 38 | U2_BS_SP_SmallestCommonElement | Search/intersection across rows or arrays; ordering rules needed | Later depth |
| 39 | U2_BS_SP_FixedPoint | Find i with a[i]=i; sorted/distinct assumptions determine search reasoning | Later depth |
| 40 | U2_BS_SP_KOKO Eating Bananas | Feasibility predicate and binary search over speed | Later depth after basic binary search |
| 41 | U2_BS_SP_LCP HashMap | Longest-common-prefix variant; required method/signature unresolved | Optional strings practice after statement |
| 42 | U2_BS_SP_LCP | Longest common prefix; do not assume binary search is mandatory from name alone | Optional strings practice; compare with #41 |

Day 1 provides prerequisites for all recursive work, not readiness to solve every backtracking or tree assignment. As later transcripts arrive, promote the appropriate rows and choose a representative task rather than adding every title to that day's workload.
