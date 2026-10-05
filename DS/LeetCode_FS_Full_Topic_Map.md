# Complete mapping of your 144 solved problems to FS revision

Prepared on 5 October 2026. Your coding notice names **recursion, arrays/strings and greedy** without a detailed algorithm list or difficulty specification. This is a complete audit of the supplied inventory, not an official list of required exam problems.

The earlier [revision plan](LeetCode_FS_Revision.md) selected eight representative full attempts. It was a shortlist. This file maps **every supplied problem exactly once** so that additional relevant problems and scope uncertainties remain visible.

## Summary

| Primary revision category | Count | How to use it |
|---|---:|---|
| Arrays/strings candidates | 54 | Choose representative patterns and repair weak ones |
| Recursion-related candidates | 12 | Foundation first; generation and special extensions selectively |
| Greedy candidates | 11 | Start with elementary choices; justify correctness |
| Conditional / lower-priority implementation | 67 | Lecture notes and MCQs; full coding only if needed |
| **Total** | **144** | Complete supplied inventory |

Categories are disjoint for counting, but concepts overlap. For example, Maximum Subarray and stock scanning involve optimization reasoning; recursion can occur in trees; greedy can use a stack. Being in a candidate category is not an instruction to re-solve all 77 candidates before 9 October.

## Arrays and strings — 54

These problems can be revised through array/string processing, scans, hashing, pointers, windows, prefix sums, sorting or simple recurrences. Difficulty varies substantially. The presence of a problem here does not make its most advanced solution compulsory.

### Basic array processing

- **26. Remove Duplicates from Sorted Array** — Easy
- **27. Remove Element** — Easy
- **66. Plus One** — Easy
- **88. Merge Sorted Array** — Easy
- **189. Rotate Array** — Medium
- **2149. Rearrange Array Elements by Sign** — Medium
- **1752. Check if Array Is Sorted and Rotated** — Easy
- **228. Summary Ranges** — Easy
- **485. Max Consecutive Ones** — Easy
- **283. Move Zeroes** — Easy
- **268. Missing Number** — Easy

### Hashing, counting and candidate tracking

- **1. Two Sum** — Easy
- **217. Contains Duplicate** — Easy
- **219. Contains Duplicate II** — Easy
- **242. Valid Anagram** — Easy
- **205. Isomorphic Strings** — Easy
- **451. Sort Characters By Frequency** — Medium
- **347. Top K Frequent Elements** — Medium
- **169. Majority Element** — Easy
- **229. Majority Element II** — Medium

### String parsing, comparison and bracket depth

- **8. String to Integer (atoi)** — Medium
- **13. Roman to Integer** — Easy
- **14. Longest Common Prefix** — Easy
- **125. Valid Palindrome** — Easy
- **151. Reverse Words in a String** — Medium
- **796. Rotate String** — Easy
- **1021. Remove Outermost Parentheses** — Easy
- **1614. Maximum Nesting Depth of the Parentheses** — Easy
- **1781. Sum of Beauty of All Substrings** — Medium

### Two pointers and sorted sum problems

- **11. Container With Most Water** — Medium
- **15. 3Sum** — Medium
- **18. 4Sum** — Medium
- **42. Trapping Rain Water** — Hard

### Sliding windows and fixed-length choices

- **3. Longest Substring Without Repeating Characters** — Medium
- **424. Longest Repeating Character Replacement** — Medium
- **1004. Max Consecutive Ones III** — Medium
- **1358. Number of Substrings Containing All Three Characters** — Medium
- **1423. Maximum Points You Can Obtain from Cards** — Medium

### Prefix sums and subarray counting

- **560. Subarray Sum Equals K** — Medium
- **930. Binary Subarrays With Sum** — Medium
- **1248. Count Number of Nice Subarrays** — Medium

### Matrix processing

- **48. Rotate Image** — Medium
- **54. Spiral Matrix** — Medium
- **73. Set Matrix Zeroes** — Medium

### Single-pass optimisation and digit-prefix choices

- **53. Maximum Subarray** — Medium
- **121. Best Time to Buy and Sell Stock** — Easy
- **1903. Largest Odd Number in String** — Easy

### Palindrome expansion

- **5. Longest Palindromic Substring** — Medium

### Array recurrence construction

- **118. Pascal's Triangle** — Easy
- **119. Pascal's Triangle II** — Easy

### Ordering, partitioning and interval processing

- **31. Next Permutation** — Medium
- **56. Merge Intervals** — Medium
- **57. Insert Interval** — Medium
- **75. Sort Colors** — Medium

## Recursion and related methods — 12

These problems offer recursion practice or a related recurrence/exponentiation method. Some also have iterative or DP solutions. Recursive generation is backtracking; whether the college expects every such variant is unspecified.

### Recursive generation

- **17. Letter Combinations of a Phone Number** — Medium
- **22. Generate Parentheses** — Medium
- **39. Combination Sum** — Medium
- **40. Combination Sum II** — Medium
- **78. Subsets** — Medium
- **90. Subsets II** — Medium
- **216. Combination Sum III** — Medium

### Recurrence and recursive exponentiation

- **50. Pow(x, n)** — Medium
- **70. Climbing Stairs** — Easy
- **509. Fibonacci Number** — Easy

### Specialised extensions

- **79. Word Search** — Medium
- **1922. Count Good Numbers** — Medium

## Greedy — 11

These problems offer greedy reasoning. Some also require sorting, counting, a stack or a heap, so the preparation cost varies. Explain why each choice is safe rather than memorizing a rule.

### Greedy practice

- **45. Jump Game II** — Medium
- **55. Jump Game** — Medium
- **135. Candy** — Hard
- **402. Remove K Digits** — Medium
- **435. Non-overlapping Intervals** — Medium
- **455. Assign Cookies** — Easy
- **621. Task Scheduler** — Medium
- **678. Valid Parenthesis String** — Medium
- **846. Hand of Straights** — Medium
- **860. Lemonade Change** — Easy
- **3075. Maximize Happiness of Selected Children** — Medium

## Conditional or lower-priority full implementations — 67

These problems have a main technique beyond the focused coding workflow. Several still use arrays, strings or recursion, and the broad notice alone cannot conclusively rule them out. Keep their lecture concepts/MCQs in scope; promote full coding practice only when college guidance or a mock identifies a need.

### Binary search and ordered-matrix search

- **4. Median of Two Sorted Arrays** — Hard
- **33. Search in Rotated Sorted Array** — Medium
- **34. Find First and Last Position of Element in Sorted Array** — Medium
- **35. Search Insert Position** — Easy
- **74. Search a 2D Matrix** — Medium
- **81. Search in Rotated Sorted Array II** — Medium
- **153. Find Minimum in Rotated Sorted Array** — Medium
- **162. Find Peak Element** — Medium
- **240. Search a 2D Matrix II** — Medium
- **410. Split Array Largest Sum** — Hard
- **540. Single Element in a Sorted Array** — Medium
- **704. Binary Search** — Easy
- **875. Koko Eating Bananas** — Medium
- **1011. Capacity To Ship Packages Within D Days** — Medium
- **1283. Find the Smallest Divisor Given a Threshold** — Medium
- **1482. Minimum Number of Days to Make m Bouquets** — Medium
- **1539. Kth Missing Positive Number** — Easy
- **1901. Find a Peak Element II** — Medium

### Stack, queue and monotonic-stack techniques

- **20. Valid Parentheses** — Easy
- **84. Largest Rectangle in Histogram** — Hard
- **85. Maximal Rectangle** — Hard
- **155. Min Stack** — Medium
- **225. Implement Stack using Queues** — Easy
- **232. Implement Queue using Stacks** — Easy
- **496. Next Greater Element I** — Easy
- **503. Next Greater Element II** — Medium
- **735. Asteroid Collision** — Medium
- **907. Sum of Subarray Minimums** — Medium
- **2104. Sum of Subarray Ranges** — Medium

### Linked lists

- **2. Add Two Numbers** — Medium
- **19. Remove Nth Node From End of List** — Medium
- **23. Merge k Sorted Lists** — Hard
- **25. Reverse Nodes in k-Group** — Hard
- **61. Rotate List** — Medium
- **138. Copy List with Random Pointer** — Medium
- **141. Linked List Cycle** — Easy
- **142. Linked List Cycle II** — Medium
- **148. Sort List** — Medium
- **160. Intersection of Two Linked Lists** — Easy
- **206. Reverse Linked List** — Easy
- **234. Palindrome Linked List** — Easy
- **237. Delete Node in a Linked List** — Medium
- **328. Odd Even Linked List** — Medium
- **876. Middle of the Linked List** — Easy
- **2095. Delete the Middle Node of a Linked List** — Medium

### Trees

- **94. Binary Tree Inorder Traversal** — Easy
- **100. Same Tree** — Easy
- **101. Symmetric Tree** — Easy
- **102. Binary Tree Level Order Traversal** — Medium
- **103. Binary Tree Zigzag Level Order Traversal** — Medium
- **104. Maximum Depth of Binary Tree** — Easy
- **110. Balanced Binary Tree** — Easy
- **124. Binary Tree Maximum Path Sum** — Hard
- **144. Binary Tree Preorder Traversal** — Easy
- **145. Binary Tree Postorder Traversal** — Easy
- **199. Binary Tree Right Side View** — Medium
- **543. Diameter of Binary Tree** — Easy
- **987. Vertical Order Traversal of a Binary Tree** — Hard

### Heap / selection / stream methods

- **215. Kth Largest Element in an Array** — Medium
- **295. Find Median from Data Stream** — Hard
- **703. Kth Largest Element in a Stream** — Easy

### Dynamic programming state

- **152. Maximum Product Subarray** — Medium
- **198. House Robber** — Medium

### Numeric / bit techniques

- **7. Reverse Integer** — Medium
- **9. Palindrome Number** — Easy
- **136. Single Number** — Easy

### Merge-sort counting

- **493. Reverse Pairs** — Hard

## Method-specific boundaries

- **54 array/string candidates:** this is a broad pool, not a narrow prediction. Trapping Rain Water and 4Sum are harder options; start with their simpler pattern representatives. Top K Frequent Elements can use frequency counts plus sorting/buckets; selecting a heap or quickselect adds a technique. Missing Number can use arithmetic rather than bit manipulation. Longest Palindromic Substring can use centre expansion rather than DP. Pascal's Triangle uses a simple array recurrence.
- **Recursion foundations:** Fibonacci and Climbing Stairs expose recurrence and repeated-call analysis; optimized solutions may be iterative/DP. Pow(x,n) can practise recursive halving, with negative-exponent and overflow handling.
- **Recursion extensions:** Word Search requires grid search and visited-state restoration. Count Good Numbers combines counting and modular exponentiation; it is not a simple exercise enumerating all strings. Keep these as optional transfers after the foundational tasks.
- **Greedy with extra machinery:** Remove K Digits commonly uses a stack; Task Scheduler can use counting or a heap; Hand of Straights uses ordered frequency processing. Candy is a harder constraint exercise. Start with Assign Cookies, Lemonade Change, Jump Game and interval scheduling before these.
- **Conditional array problems:** binary-search tasks, Maximum Product Subarray, House Robber and monotonic-stack problems still involve arrays. Their placement in the lower-priority group reflects the current workflow, not proof that a broad arrays syllabus excludes them. Basic binary-search recall can be useful; advanced answer-search implementation is lower priority under the deadline.
- **Conditional recursion problems:** recursive linked-list or tree implementations are not automatically required by the word recursion. Continue studying taught traces, bugs and complexities for MCQs.

## What is absent from this solved inventory

The college fractional-knapsack exercise and LC 238 Product of Array Except Self are not in this paste. They are already addressed by the current study plan/Day 1 package. Use them to repair a gap, replacing secure work rather than automatically expanding the workload. Activity selection is related to LC 435 but the output and endpoint rules may differ.

## Where to re-solve

**Use LeetCode itself for these existing problems.** A clone is unnecessary for the revision goal.

1. Open the statement, select your intended exam language, and start from a blank solution/template. If the editor restores old code, reset it before reading it. Do not open past submissions or solutions during the independent attempt.
2. Write the approach and its invariant/base case/greedy argument before coding. Spend about 15–20 minutes trying independently before requesting one targeted hint.
3. Run your own edge cases, then submit for the platform's judging. Record whether the attempt was independent or hint-assisted; an accepted result alone does not establish that you can explain or adapt the method.
4. Reattempt weaknesses the next day and answer a changed-condition question from the revision guide.
5. Practise a few complete programs locally for college tasks such as fractional knapsack if the exam requires standard input/output. If the real test platform offers a practice environment, use it for the final mock. Its format is more relevant than a generic clone.

Use a different practice site only for a concrete need such as a missing problem, a clean editor that you prefer, or the actual exam environment. Switching websites does not itself test transfer; an unfamiliar problem or a changed condition does.

## Suggested workload

Keep the eight-problem queue in [LeetCode_FS_Revision.md](LeetCode_FS_Revision.md) as the starting selection. Promote problems from this full map only when a diagnostic, lecture gap or mock justifies it. Reattempt weak representatives before adding more similar problems. Preserve other-subject preparation and the 8 October mixed mock.

## Source checks

All titles and difficulties come from [your supplied inventory](LeetCode_Solved_Inventory.md). Grouping and priorities are preparation judgments. LeetCode's [practice guide](https://support.leetcode.com/hc/en-us/articles/360012016874-Start-your-Coding-Practice) documents the editor reset, custom testcase execution and submission judging. The statements for [Word Search](https://leetcode.com/problems/word-search/description/), [Count Good Numbers](https://leetcode.com/problems/count-good-numbers/description/) and [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/description/) were checked on 5 October 2026 for the method boundaries above.

