# FS coding revision from your 144 solved problems

**Lecture update, 5 October:** [FS_START_HERE.md](FS_START_HERE.md) and [the expanded 71-problem pool](FS_LeetCode_Practice.md) now incorporate the Day 4–10 summary and Day 11–27 captions. The eight problems below remain a useful earlier shortlist, but the expanded package adds class methods, Stock II, Maximum Swap, Product Except Self and local greedy gaps. Use its priorities to select rather than stacking both queues.

Prepared on 5 October 2026 for the 9 October test. Follow [Study_Workflow.md](Study_Workflow.md): coding preparation focuses on recursion, arrays/strings and greedy. Other lecture topics still need notes and scenario MCQs.

## What the export establishes

The supplied paste contains **144 unique problem IDs: 52 Easy, 80 Medium and 12 Hard**. The [clean inventory](LeetCode_Solved_Inventory.md) preserves every title and difficulty; the [original paste](sources/LeetCode_Solved_List.txt) is archived separately.

The eight-problem queue below is a representative shortlist. The [complete topic map](LeetCode_FS_Full_Topic_Map.md) classifies all 144 problems: 54 array/string candidates, 12 recursion-related candidates, 11 greedy candidates and 67 conditional/lower-priority implementations. It also explains which methods and advanced variants are optional and why the broad notice cannot establish a definitive per-problem requirement.

This is your reported solved list. The paste does not contain acceptance status, dates, submitted code or current recall. No login/submission verification or mastery assessment is implied. Acceptance percentages were omitted from the clean inventory because they are site-wide figures and do not measure your readiness.

The list contains useful coverage of arrays/strings, elementary greedy, and recursive generation. The next step is to check recall through independent attempts. A broad topic label in the notice does not establish the exact difficulty or algorithm mix of the three exam questions.

## Start with three short diagnostics

Attempt these with old code closed. Allow roughly 5–10 minutes each; use the result to choose the next full attempt, rather than treating the diagnostics as three additional long assignments.

| Area | Already in your list | Check |
|---|---|---|
| Strings | 125. Valid Palindrome | Handle normalization and two-pointer movement; state the character assumptions |
| Recursion | 509. Fibonacci Number | Write the recursive definition, trace a small input, explain repeated calls and stack depth, then describe the iterative improvement |
| Greedy | 455. Assign Cookies | Explain the sorted matching rule and why the selected cookie can safely be assigned |

If basic recursion is weak, repair base cases, progress and return flow using the existing Day 1/2 drills before recursive generation. If greedy justification is weak, work through Assign Cookies before Jump Game.

## Eight representative full attempts

These are a candidate queue, not eight compulsory new tasks. Count work you have actually completed in the lecture practice sheets, skip problems that pass the diagnostic, and keep the existing budget of roughly 6–8 substantive attempts plus reattempts across the preparation window. Protect the other subjects and the mock.

| # | Your solved problem | Main revision target | Question you should be able to answer |
|---|---|---|---|
| 1 | 1. Two Sum | Array scan and hash lookup | How do you prevent reusing the same index, including when the values are equal? |
| 2 | 26. Remove Duplicates from Sorted Array | In-place read/write pointers | What does the returned length mean, and which part of the array must be correct? |
| 3 | 3. Longest Substring Without Repeating Characters | Sliding window | What makes the window valid, and why must its left boundary never move backwards? |
| 4 | 560. Subarray Sum Equals K | Prefix sums and frequency counts | Why do negative values break the usual shrink-on-large-sum window rule? |
| 5 | 78. Subsets | Recursive include/exclude choices | What does one call represent, and how do you account for copying all outputs? |
| 6 | 22. Generate Parentheses | Recursion with valid-prefix pruning | When may you add an opening or closing parenthesis, and why? |
| 7 | 55. Jump Game | Greedy reachability | What does the farthest reachable index mean, and when can you stop with failure? |
| 8 | 435. Non-overlapping Intervals | Interval greedy | Why does keeping an earlier-finishing interval help future choices? |

Subsets and Generate Parentheses are selected as manageable recursion exercises. Their presence here does not imply that every tree, grid or advanced backtracking problem is required by the word "recursion" in the notice.

## How to use one problem deeply

1. Read its current statement and constraints. Write a tiny example and the straightforward approach before opening any solution.
2. Attempt independently. After about 15–20 minutes without useful progress, take one targeted hint, close it, then derive and code again.
3. Explain the invariant, base case/progress or greedy argument. If you cannot explain it, mark the concept weak even if you remember the code.
4. Test normal and boundary inputs. State time and space, including sorting, recursion depth, hash-table assumptions and output storage where relevant.
5. Answer one changed-condition question. A memorized solution must not survive only because the statement is unchanged.
6. Reattempt failed work the following day with code closed. A hint-assisted solution is still pending an independent reattempt.

Use the accepted exam language once confirmed. If you revise in C++, practise the actual input/output format too; LeetCode's function wrapper alone may not match the college platform.

## Edge cases and transfer checks

Try predicting each result before running code. These are revision prompts, not a replacement for the problem's full test suite.

| Problem | Small check | Change to reason about |
|---|---|---|
| Two Sum | `[3,3]`, target `6` | How would returning unique value pairs differ from returning one index pair? |
| Remove Duplicates | `[1,1,2]` | What changes if every value may occur twice? |
| Longest Substring | `"abba"`; also the empty string | What changes if at most two distinct characters are allowed? |
| Subarray Sum Equals K | `[1,-1,0]`, `k=0` | How does counting differ from finding the longest qualifying subarray? |
| Subsets | `[1,2]` | What breaks when the input contains duplicate values? |
| Generate Parentheses | `n=3` | Why is checking only the final total of opening/closing brackets insufficient? |
| Jump Game | `[3,2,1,0,4]`; `[0]` | Why is minimum jump count a different task from reachability? |
| Non-overlapping Intervals | `[[1,2],[2,3]]` | What if touching endpoints count as overlapping in a different statement? |

<details>
<summary>Check the small-input answers after attempting</summary>

- Two Sum: indices 0 and 1, in either order.
- Remove Duplicates: return 2; the first two values are 1 and 2. Values after that prefix do not matter to the judge.
- Longest Substring: 2 for `abba`; 0 for the empty string.
- Subarray Sum Equals K: 3 nonempty subarrays: `[1,-1]`, `[0]`, and `[1,-1,0]`.
- Subsets: four outputs, including the empty subset.
- Generate Parentheses: five outputs for three pairs. Every prefix must have at least as many opening brackets as closing brackets.
- Jump Game: false for `[3,2,1,0,4]`; true for `[0]` because the starting position is already the last index.
- Non-overlapping Intervals: remove 0 under LeetCode's rule that touching intervals do not overlap.

</details>

## Optional replacements from your list

Use these only when they address a real weakness or when the corresponding representative is already secure. They are not an extra checklist to finish before the exam.

| Weakness / extension | Existing solved problems to choose from |
|---|---|
| Basic array movement | 283. Move Zeroes; 88. Merge Sorted Array; 189. Rotate Array |
| String comparison/frequency | 14. Longest Common Prefix; 242. Valid Anagram; 205. Isomorphic Strings |
| Two-pointer reasoning | 11. Container With Most Water; 15. 3Sum |
| Matrix traversal | 54. Spiral Matrix; 48. Rotate Image; 73. Set Matrix Zeroes |
| Further sliding-window practice | 1004. Max Consecutive Ones III; 424. Longest Repeating Character Replacement |
| Further recursion | 17. Letter Combinations of a Phone Number; 39. Combination Sum; 90. Subsets II |
| Further greedy | 860. Lemonade Change; 45. Jump Game II |
| Single-pass stock reasoning | 121. Best Time to Buy and Sell Stock |

For example, do not automatically code both Jump Game and Jump Game II. Use the second as a transfer check only after the first is secure.

## Gaps to check against the college material

- **Fractional knapsack is absent from the pasted titles.** Keep the college assignment already selected in the study plan if you have not mastered it. It can replace a secure LeetCode attempt. This is a gap in the list, not a prediction that it will appear in the exam.
- **Product of Array Except Self (238) is absent.** It is already in the Day 1 practice sheet. If you actually completed it, use a recall check; otherwise consider it only if prefix/suffix processing is weak. Do not automatically add another full attempt.
- **Activity selection is not listed under that name.** Non-overlapping Intervals is a related scheduling exercise, but read the college statement for its output and endpoint convention before treating the tasks as equivalent.
- **Elementary recursion still needs checking.** Complex recursive tasks do not prove that factorial, simple string recursion, recurrence traces or stack-space reasoning are secure. Use the existing lecture drills for any diagnosed gap.

This export alone cannot establish complete syllabus coverage because the notice gives broad coding areas. Use lecture/assignment coverage and mock performance to adjust selection.

## What to defer as full coding practice

Keep linked-list, tree, heap, specialised binary-search, advanced DP and monotonic-stack tasks for later implementation unless the actual exam scope is expanded. Examples from your list include Reverse Nodes in k-Group, Binary Tree Maximum Path Sum, Find Median from Data Stream, Koko Eating Bananas, House Robber and Largest Rectangle in Histogram.

A problem taking an array or using recursive calls does not automatically make its main technique a priority for this week. These topics may still require conceptual revision and code-scenario MCQs from the lectures.

## Record your evidence

Use **Independent / Hint needed / Relearn** for each attempt. After a hint, mark it Independent only when you succeed on a later attempt without reopening the solution.

| Problem | First attempt | Actual gap | Next-day reattempt | Can explain and adapt? |
|---|---|---|---|---|
| Two Sum | | | | |
| Remove Duplicates | | | | |
| Longest Substring | | | | |
| Subarray Sum Equals K | | | | |
| Subsets | | | | |
| Generate Parentheses | | | | |
| Jump Game | | | | |
| Non-overlapping Intervals | | | | |

On 8 October, retain the mixed mock and review. Include unfamiliar coding questions within the announced areas so that the mock checks transfer, alongside the 30-question/30-minute MCQ practice. Ninety minutes for coding is a practice allocation within the two-hour total, not a confirmed section-locking rule.

## Sources and scope

Selection and priority are preparation recommendations. Problem statements for [Assign Cookies](https://leetcode.com/problems/assign-cookies/description/), [Jump Game](https://leetcode.com/problems/jump-game/description/), [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/description/), [Subsets](https://leetcode.com/problems/subsets/description/), [Generate Parentheses](https://leetcode.com/problems/generate-parentheses/description/), [Longest Substring](https://leetcode.com/problems/longest-substring-without-repeating-characters/description/), [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/description/) and [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/description/) were checked on 5 October 2026. No NeetCode 150 membership or official exam weightage is asserted here.
