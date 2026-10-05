## DAY 4 summary

### 1. Class Context & Warm-Up

* **Recap of Prior Problems:** Brief follow-up on assignments covering GCD, strobogrammatic numbers, strobogrammatic primes, and strobogrammatic palindromes.
* **Transition to New Unit:** Formal introduction to the **Divide and Conquer (D&C)** algorithmic paradigm.

---

### 2. Divide and Conquer Paradigm

* **Core Philosophy:** Breaking a complex problem of size $n$ into $k$ smaller, manageable subproblems ($1 < k \le n$) of the same type, solving each subproblem recursively until reaching a trivial base case, and combining subproblem solutions to solve the overall problem.
* **Real-World Analogy:** Organizing a college event (such as a graduation convocation). Instead of tackling the event as an overwhelming monolith, tasks are decomposed into distinct, delegable components (guest reception, schedule coordination, compering/anchoring, certificate distribution). Teams execute independently, coordinate where needed, and their outputs combine into a successful event.
* **Algorithmic Blueprint:**
* **Divide:** Partition the problem $P$ into subproblems $P_1, P_2, \dots, P_k$.
* **Conquer:** Solve each subproblem recursively. If a subproblem is small enough (base case), solve it directly without further division.
* **Combine:** Merge the solutions of $P_1, P_2, \dots, P_k$ to form the final result.



---

### 3. Quick Sort Algorithm

#### Fundamental Mechanics

* **Paradigm Application:** Quick Sort selects a **pivot element** and partitions the array around it such that:
* All elements smaller than the pivot are placed to its left.
* All elements greater than the pivot are placed to its right.
* The pivot itself is placed in its final, sorted position.
* Sub-arrays to the left and right are not necessarily sorted; they are solved via recursive calls.


* **In-Place Sorting & The "Combine" Step:** Unlike algorithms like Merge Sort, Quick Sort rearranges elements in place within the same array. Consequently, the **Combine** phase requires $O(1)$ additional work—the array is already sorted once all recursive sub-calls terminate.

#### Pivot Selection Variations

1. First element (`low`)
2. Last element (`high`)
3. Middle element
4. Random element

#### Partitioning Logic (High Pivot / Lomuto Scheme)

1. Set `pivot = array[high]` and partition index `pi = low`.
2. Iterate pointer `j` from `low` to `high - 1`:
* If `array[j] < pivot`: swap `array[j]` with `array[pi]` (only if `j != pi` to avoid redundant self-swaps), then increment `pi`.
* If `array[j] >= pivot`: advance `j` without changing `pi`.


3. After the loop, swap `array[pi]` with `array[high]` (if `pi != high`).
4. Return `pi` as the final index of the pivot.
5. Recursively invoke `quickSort(array, low, pi - 1)` and `quickSort(array, pi + 1, high)`.

*(Note: In **Partition Low**, the pivot is chosen at `low`, and scanning proceeds from right to left using the high boundary).*

#### Example Traces

* **General Case: `[91, 22, 3, 1, 66, 7, 9, 2]**`
* `low = 0`, `high = 7`, `pivot = 2`.
* Scanning left-to-right finds `1 < 2`, swapping `91` and `1`.
* At loop termination, pivot `2` swaps with `array[pi]` (value `22`).
* Yields `[1, 2, 3, 91, 66, 7, 9, 22]` with pivot index `pi = 1`.
* Recurses on `quickSort(0, 0)` (base case) and `quickSort(2, 7)`, progressively partitioning subproblems until fully sorted: `[1, 2, 3, 7, 9, 22, 66, 91]`.


* **Step-by-Step Exercise: `[60, 50, 20, 70, 30]**`
* `pivot = 30`, `pi = 0`.
* Comparing `30` against `60` and `50`: no swap.
* Comparing `30` against `20`: `20 < 30`, swaps `array[0]` (`60`) and `array[2]` (`20`). `pi` increments to `1`.
* Comparing `30` against `70`: no swap.
* End of loop: swap `array[pi]` (`50`) with `pivot` (`30`).
* Resulting partition: `[20, 30, 60, 70, 50]` with pivot `30` fixed at index `1`.



#### Complexity Analysis

* **Best / Average Case:** $O(n \log n)$ when partitions split the array roughly in half.
* **Worst Case:** $O(n^2)$ when partitions are severely unbalanced (e.g., pivot is consistently the minimum or maximum element).
* Occurs when the input array is already sorted in ascending order (e.g., `[1, 2, 3, 4, 5, 6]`) or descending order (e.g., `[6, 5, 4, 3, 2, 1]`) using standard end-element pivoting, producing subproblems of sizes $n-1, n-2, \dots, 1$.


* **Space Complexity:** $O(\log n)$ stack space on average; $O(n)$ in the worst case due to recursion depth.

---

### 4. Majority Element Problem

#### Problem Definition

Given an array of size $n$, find the element that appears strictly more than $\lfloor n / 2 \rfloor$ times. The problem guarantees that a majority element always exists in the valid input set.

#### Comparison of Approaches

| Approach | Time Complexity | Auxiliary Space | Strategy |
| --- | --- | --- | --- |
| **Brute Force** | $O(n^2)$ | $O(1)$ | Nested loops: outer loop picks an element, inner loop counts occurrences. |
| **Hash Map** | $O(n)$ | $O(n)$ | Frequency table storing element counts, returning the key with frequency $> n/2$. |
| **Sorting** | $O(n \log n)$ | $O(1)$ or $O(\log n)$ | Sort array; element at index $\lfloor n/2 \rfloor$ is guaranteed to be the majority element. |
| **Divide & Conquer** | $O(n \log n)$ | $O(\log n)$ | Recursively split array into left and right halves, combine candidates by localized counting. |
| **Linear Optimal (Preview)** | $O(n)$ | $O(1)$ | Boyer-Moore Voting Algorithm (flagged for detailed coverage in the following lecture). |

#### Divide and Conquer Solution Mechanics

1. **Divide:** Recursively split the slice `array[low...high]` into two halves around `mid = (low + high) / 2`.
2. **Base Case:** When `low == high`, a single-element slice trivially has that single element as its majority candidate.
3. **Combine:**
* Let `left_majority` be the candidate from `[low...mid]` and `right_majority` be the candidate from `[mid+1...high]`.
* **Agreement:** If `left_majority == right_majority`, return that value directly.
* **Disagreement:** Count the exact occurrences of both `left_majority` and `right_majority` within the current range `[low...high]`. The candidate with the larger count is returned as the majority for that range.


4. **Complexity:** Governed by the recurrence relation $T(n) = 2T(n/2) + O(n)$, yielding $O(n \log n)$ time and $O(\log n)$ recursion stack space. Passing subarray indices (`low`, `high`) rather than copying array slices is required to prevent extra allocation overhead.

---

### 5. Assigned Lab Tasks

* **Program 1:** Quick Sort implementation with partition tracking.
* **Program 2:** Majority Element solved via Divide and Conquer ($O(n \log n)$ approach).
* **Programs 3 & 4:** Two review coding exercises reinforcing general recursion techniques.

## DAY 5 summary 

### 1. Quick Sort: Partitioning Mechanics & Step-by-Step Traces

#### Algorithm Recap & Invariant

* **Partition High (Lomuto Scheme):**
* **Pivot:** Last element (`array[high]`).
* **Pointers:** A boundary pointer `pi` (initialized to `low`) and an exploration pointer `j` (iterating from `low` to `high - 1`).
* **Invariant:** At any step, elements in `array[low ... pi - 1]` are strictly less than `pivot`, while elements in `array[pi ... j - 1]` are greater than or equal to `pivot`.
* **Swapping Rules:**
1. If `array[j] < pivot`: swap `array[pi]` and `array[j]` if `pi != j`, then increment `pi`.
2. If `array[j] >= pivot`: only advance `j`.
3. Loop Termination: swap `array[pi]` with `array[high]` (if `pi != high`). Return `pi`.




* **Partition Low:**
* **Pivot:** First element (`array[low]`).
* **Scanning Direction:** Decrements from right to left (`high` down to `low + 1`), maintaining the partition boundary from the upper end.


* **In-Place Sorting:** The "Combine" step in Quick Sort takes $O(1)$ auxiliary work because array elements are partitioned directly in memory without auxiliary arrays.

---

#### Trace 1: Already Sorted Array (`[1, 2, 3, 4, 5]`) — Worst-Case Analysis

* **Initial State:** `low = 0`, `high = 4`, `pivot = 5`, `pi = 0`.
* **Execution:**
* `j = 0` (`1 < 5`): `pi = 0`, `j = 0` $\rightarrow$ no swap; `pi` increments to `1`.
* `j = 1` (`2 < 5`): `pi = 1`, `j = 1` $\rightarrow$ no swap; `pi` increments to `2`.
* `j = 2` (`3 < 5`): `pi = 2`, `j = 2` $\rightarrow$ no swap; `pi` increments to `3`.
* `j = 3` (`4 < 5`): `pi = 3`, `j = 3` $\rightarrow$ no swap; `pi` increments to `4`.
* **Loop Exit:** `pi = 4`, `high = 4`. Since `pi == high`, no final swap occurs.
* **Returned Partition Index:** `pi = 4`.


* **Subproblems Generated:**
* Left: `quickSort(0, 3)` (subarray `[1, 2, 3, 4]`).
* Right: `quickSort(5, 4)` (terminates immediately since `low > high`).


* **Complexity Implication:** Each recursive level eliminates only 1 element ($n - 1$ subproblem size), leading to a recurrence of $T(n) = T(n - 1) + O(n)$, yielding **$O(n^2)$ worst-case time complexity**.

---

#### Trace 2: Reverse Sorted Array (`[5, 4, 3, 2, 1]`) — Worst-Case Analysis

* **Initial State:** `low = 0`, `high = 4`, `pivot = 1`, `pi = 0`.
* **Execution:**
* `j = 0` (`5 < 1` is False): advance `j`.
* `j = 1` (`4 < 1` is False): advance `j`.
* `j = 2` (`3 < 1` is False): advance `j`.
* `j = 3` (`2 < 1` is False): advance `j`.
* **Loop Exit:** `pi = 0`, `high = 4`. Since `pi != high`, swap `array[0]` (`5`) and `array[4]` (`1`).
* **Array after Partition 1:** `[1, 4, 3, 2, 5]`.
* **Returned Partition Index:** `pi = 0`.


* **Subproblems Generated:**
* Left: `quickSort(0, -1)` (terminates).
* Right: `quickSort(1, 4)` on `[4, 3, 2, 5]`.


* **Subsequent Partitions on `[4, 3, 2, 5]`:**
* `pivot = 5` at `high = 4`: all elements are smaller, `pi` advances to `4`, returns `pi = 4` without array alteration.
* Next subproblem on `[4, 3, 2]` with `pivot = 2`: `4` and `3` are not smaller; at the end, `array[1]` (`4`) swaps with `array[3]` (`2`), producing `[1, 2, 3, 4, 5]`.


* **Result:** Reverse sorted input also yields an unbalanced tree and **$O(n^2)$ complexity**.

---

#### Trace 3: Unsorted Array (`[18, 3, 1, 7, 6, 12, 22]`)

* **Input Parameters:** $n = 7$, indices `0` to `6`.

| Partition Call | Range (`low`, `high`) | Pivot Value | Scanning & Swap Actions | Array State After Call | Returned `pi` |
| --- | --- | --- | --- | --- | --- |
| **Partition 1** | `(0, 6)` | `22` | All elements (`18, 3, 1, 7, 6, 12`) are $< 22$. `pi` advances with `j` to `6`. `pi == high`, no swap needed. | `[18, 3, 1, 7, 6, 12, 22]` | **`6`** |
| **Partition 2** | `(0, 5)` | `12` | • `18 < 12` False (`pi=0`, `j=0`)<br>

<br>• `3 < 12` True $\rightarrow$ swap `array[0]` (`18`) & `array[1]` (`3`), `pi=1`<br>

<br>• `1 < 12` True $\rightarrow$ swap `array[1]` (`18`) & `array[2]` (`1`), `pi=2`<br>

<br>• `7 < 12` True $\rightarrow$ swap `array[2]` (`18`) & `array[3]` (`7`), `pi=3`<br>

<br>• `6 < 12` True $\rightarrow$ swap `array[3]` (`18`) & `array[4]` (`6`), `pi=4`<br>

<br>• End: swap `array[4]` (`18`) with `array[5]` (`12`). | `[3, 1, 7, 6, 12, 18, 22]` | **`4`** |
| **Partition 3** | `(0, 3)` | `6` | • `3 < 6` True (`pi=0`, `j=0`) $\rightarrow$ `pi=1`<br>

<br>• `1 < 6` True (`pi=1`, `j=1`) $\rightarrow$ `pi=2`<br>

<br>• `7 < 6` False $\rightarrow$ advance `j`<br>

<br>• End: swap `array[2]` (`7`) with `array[3]` (`6`). | `[3, 1, 6, 7, 12, 18, 22]` | **`2`** |
| **Partition 4** | `(0, 1)` | `1` | • `3 < 1` False $\rightarrow$ advance `j`<br>

<br>• End: swap `array[0]` (`3`) with `array[1]` (`1`). | `[1, 3, 6, 7, 12, 18, 22]` | **`0`** |

* **Final Sorted Array:** `[1, 3, 6, 7, 12, 18, 22]`.

---

### 2. Majority Element Problem

#### Problem Statement & Baseline Approaches

Find the element that appears strictly more than $\lfloor n / 2 \rfloor$ times.

* **Brute Force:** Nested loops counting frequency $\rightarrow O(n^2)$ time, $O(1)$ space.
* **Hash Map:** Count occurrences in a single pass, then check values $\rightarrow O(n)$ time, $O(n)$ space.

---

#### Approach A: Divide and Conquer ($O(n \log n)$ Time, $O(\log n)$ Space)

* **Mechanics:**
1. **Base Case:** When `low == high`, the single element `array[low]` is trivially the majority element for that range.
2. **Divide:** Compute `mid = (low + high) / 2`. Recursively compute:

$$\text{left\_maj} = \text{majority}(array, low, mid)$$


$$\text{right\_maj} = \text{majority}(array, mid + 1, high)$$


3. **Combine:**
* If $\text{left\_maj} == \text{right\_maj}$, return that candidate immediately.
* If they differ, count occurrences of both candidates across `array[low ... high]` using a linear helper function `countInRange`.
* Return the candidate with the strictly greater count; if tied, return the right candidate by convention.




* **Detailed Trace: `[1, 2, 1, 2, 1, 2, 1]` ($n = 7$)**
* Split into Left `[0...3]` (`[1, 2, 1, 2]`) and Right `[4...6]` (`[1, 2, 1]`).
* **Left Side `[0...3]`:**
* `[0...1]` (`[1, 2]`): `1` vs `2`, counts are tied ($1$ each) $\rightarrow$ returns `2`.
* `[2...3]` (`[1, 2]`): `1` vs `2`, counts are tied $\rightarrow$ returns `2`.
* Combine `[0...3]`: left is `2`, right is `2` $\rightarrow$ returns `2`.


* **Right Side `[4...6]`:**
* `[4...5]` (`[1, 2]`): returns `2`.
* `[6...6]` (`[1]`): returns `1`.
* Combine `[4...6]`: candidates `2` and `1`. In `[1, 2, 1]`, count of `1` is $2$, count of `2` is $1$ $\rightarrow$ returns `1`.


* **Global Combine `[0...6]`:**
* Left candidate: `2`, Right candidate: `1`.
* Count in whole array: `count(1) = 4`, `count(2) = 3`.
* Since $4 > 3$, returns `1`.




* **Recurrence Relation:** $T(n) = 2T(n/2) + O(n) \implies O(n \log n)$ time.

---

#### Approach B: Boyer-Moore Voting Algorithm ($O(n)$ Time, $O(1)$ Space)

* **Principle:** Equal cancellation of non-matching pairs. If a majority element exists ($> n/2$), pairing and dropping distinct elements still leaves the majority element surviving at the end.
* **Single-Pass Algorithm:**
1. Initialize `candidate = -1`, `count = 0`.
2. For each element `x` in `array`:
* If `count == 0`: `candidate = x`, `count = 1`.
* Else if `x == candidate`: `count++`.
* Else: `count--`.


3. Return `candidate`.


* **Detailed Trace: `[1, 2, 2, 2, 1, 1, 1, 1, 1, 2]` ($n = 10$)**

| Element Read | Current `candidate` Before | Current `count` Before | Action Taken | Updated `candidate` | Updated `count` |
| --- | --- | --- | --- | --- | --- |
| `1` | `-1` | `0` | `count == 0` $\rightarrow$ new candidate | `1` | `1` |
| `2` | `1` | `1` | `2 != 1` $\rightarrow$ decrement count | `1` | `0` |
| `2` | `1` | `0` | `count == 0` $\rightarrow$ new candidate | `2` | `1` |
| `2` | `2` | `1` | `2 == 2` $\rightarrow$ increment count | `2` | `2` |
| `1` | `2` | `2` | `1 != 2` $\rightarrow$ decrement count | `2` | `1` |
| `1` | `2` | `1` | `1 != 2` $\rightarrow$ decrement count | `2` | `0` |
| `1` | `2` | `0` | `count == 0` $\rightarrow$ new candidate | `1` | `1` |
| `1` | `1` | `1` | `1 == 1` $\rightarrow$ increment count | `1` | `2` |
| `1` | `1` | `2` | `1 == 1` $\rightarrow$ increment count | `1` | `3` |
| `2` | `1` | `3` | `2 != 1` $\rightarrow$ decrement count | `1` | `2` |

* **Final Result:** `candidate = 1`, `count = 2`.
* **Important Edge Case / Verification Step:**
* Boyer-Moore assumes a majority element is strictly present.
* If the array might lack a majority element (e.g., `[1, 2, 3, 4, 5]`), the algorithm returns `5` because previous pairs cancel out.
* **Fix:** A mandatory second linear pass must count total occurrences of `candidate`. If $\text{frequency} \le \lfloor n / 2 \rfloor$, return `-1`.



---

### 3. Power Function: $x^n$ (`pow(x, n)`)

#### Problem Scope

Calculate $x^n$ supporting:

* Both integer and floating-point values for $x$.
* Positive, zero, and negative values for $n$.

---

#### Iterative Linear Approach

* Accumulate $x$ across $\vert{}n\vert{}$ multiplications for positive powers, or divide for negative powers.
* **Complexity:** $O(\vert{}n\vert{})$ time, $O(1)$ space. Unusable for large exponents (e.g., $n = 2^{31} - 1$).

---

#### Divide and Conquer / Binary Exponentiation

* **Mathematical Property:**

$$x^n = \begin{cases} 1 & \text{if } n = 0 \\ (x^{n/2})^2 & \text{if } n \text{ is even} \\ x \cdot (x^{n/2})^2 & \text{if } n \text{ is odd and } n > 0 \\ \frac{1}{x} \cdot (x^{n/2})^2 & \text{if } n \text{ is odd and } n < 0 \end{cases}$$


* **Divide & Conquer Trace Examples:**
* $2^5$: $5 \rightarrow \lfloor 5/2 \rfloor = 2 \rightarrow \lfloor 2/2 \rfloor = 1 \rightarrow 0$.
* At $n=0$: returns $1$.
* At $n=1$ (odd): $1^2 \times 2 = 2$.
* At $n=2$ (even): $2^2 = 4$.
* At $n=5$ (odd): $4^2 \times 2 = 32$.


* $2^{-2}$: Recurses with negative exponents, utilizing division:

$$2^{-2} = \frac{1}{2^2} = 0.25$$


* Sign handling for negative base and negative exponent:
* $(-2)^{-2} = \frac{1}{(-2)^2} = \frac{1}{4} = 0.25$ (even negative exponent gives positive output).
* $(-2)^{-3} = \frac{1}{(-2)^3} = \frac{1}{-8} = -0.125$ (odd negative exponent preserves negative sign).




* **Complexity:**
* **Time:** $O(\log \vert{}n\vert{})$ due to repeated halving of the exponent.
* **Space:** $O(\log \vert{}n\vert{})$ call-stack space in the recursive implementation ($O(1)$ if converted iteratively).



---

### 4. Administrative Notes, Schedule & Exam Blueprint

* **Curriculum Progress:**
* Unit 1 covers Divide and Conquer algorithms.
* Merge Sort was postponed so an incoming cohort of 50–60 additional students (who cleared their test on Saturday) can attend together in Auditorium D.
* Complete Unit 1 study materials will be distributed on Thursday.


* **Upcoming Class Schedule:**
* **Wednesday (Auditorium):** Formal code walk-through for the Power function, followed by Merge Sort under Divide and Conquer.
* **Friday (Auditorium):** Unit 1 Assessment / Quiz.


* **Friday Quiz Format & Preparation Focus:**
* **No Code Memorization:** The test will not ask for memorized boilerplate code.
* **Time & Space Complexity MCQs:** Recurrences and asymptotic bounds.
* **Manual Algorithm Tracing:** Given an input array:
* State of the array after the 1st, 2nd, or $k$-th partition.
* Values of the partition index (`pi`) after successive partitioning calls.
* Behavior under both **Partition High** and **Partition Low** implementations.

## Day 6 summary 
### 1. Class Administration & Cohort Context

* **New Cohort Integration:** 55 newly admitted students from AI and Computer Science branches joined the session following their qualification in Saturday’s entrance/filtration exam.
* **Curriculum Status:** The class is progressing ahead of peer sections (several of which are still concluding basic recursion). New attendees were instructed to review prior lecture recordings (sessions 2 through 4) to catch up before Unit 1 assessments.

---

### 2. Power Function: $n^k$ (Iterative vs. Divide & Conquer)

#### Problem Definition

Given base $n$ (integer or floating-point) and exponent $k$ (positive, negative, or zero), compute $n^k$.

```
Examples:
  2^3   = 8
  2^-2  = 1 / (2^2) = 0.25
  -2^5  = -32

```

---

#### Iterative Solution ($O(k)$ Time, $O(1)$ Space)

* **Mechanics:** Run a standard loop iterating $\vert{}k\vert{}$ times, progressively multiplying an accumulator by $n$. If $k < 0$, invert the final accumulated result ($\text{result} = 1.0 / \text{result}$).
* **Limitation:** Linear complexity $O(\vert{}k\vert{})$ becomes prohibitively slow when the exponent is large (e.g., $k = 10^9$).

---

#### Divide and Conquer / Binary Exponentiation ($O(\log k)$ Time, $O(\log k)$ Space)

* **Core Philosophy:** Instead of multiplying base $n$ linearly $k$ times, halve the exponent $k$ at each recursive level until reaching the base case ($k = 0$).

$$\text{power}(n, k) = \begin{cases} 1 & \text{if } k = 0 \\ \text{temp} \cdot \text{temp} & \text{if } k \text{ is even} \\ n \cdot \text{temp} \cdot \text{temp} & \text{if } k \text{ is odd and } k > 0 \\ \frac{\text{temp} \cdot \text{temp}}{n} \text{ or } \frac{1}{\text{result}} & \text{if } k \text{ is odd and } k < 0 \end{cases}$$

Where $\text{temp} = \text{power}(n, \lfloor k/2 \rfloor)$.

* **Detailed Unwinding Traces:**
* **Even Exponent ($2^8$):**
* Call chain: $\text{pow}(2, 8) \rightarrow \text{pow}(2, 4) \rightarrow \text{pow}(2, 2) \rightarrow \text{pow}(2, 1) \rightarrow \text{pow}(2, 0)$.
* At $k = 0$: returns $1$.
* At $k = 1$ (odd): $\text{temp} = 1 \implies 2 \times 1 \times 1 = 2$.
* At $k = 2$ (even): $\text{temp} = 2 \implies 2 \times 2 = 4$.
* At $k = 4$ (even): $\text{temp} = 4 \implies 4 \times 4 = 16$.
* At $k = 8$ (even): $\text{temp} = 16 \implies 16 \times 16 = 256$.


* **Odd Exponent ($2^7$):**
* Halves down to $k = 3 \rightarrow 1 \rightarrow 0$.
* Sub-call for $\text{pow}(2, 3)$ returns $8$.
* At $k = 7$: $\text{temp} = 8$. Since $7$ is odd, compute $n \times \text{temp} \times \text{temp} = 2 \times 8 \times 8 = 128$.


* **Negative Exponents ($2^{-2}$ and $-2^{-3}$):**
* $2^{-2}$: recursive divisions yield $0.5 \rightarrow 0.25$.
* $-2^{-3}$: odd negative power preserves the negative sign: $\frac{1}{(-2)^3} = -0.125$.





---

### 3. Conceptual Comparison: Quick Sort vs. Merge Sort

| Architectural Dimension | Quick Sort | Merge Sort |
| --- | --- | --- |
| **Primary Work Location** | **Divide Step (Partitioning):** Array is partitioned around a pivot; elements are placed into correct relative halves immediately. | **Combine Step (Merging):** Splitting is a trivial midpoint calculation; heavy work occurs when merging two sorted subarrays. |
| **Combine Step Cost** | **$O(1)$:** Array is sorted in-place once all recursive calls terminate. | **$O(n)$:** Elements must be compared, selected, and copied back into the target array. |
| **Auxiliary Memory** | **$O(1)$** auxiliary data memory (operates strictly in-place; requires $O(\log n)$ to $O(n)$ recursion stack). | **$O(n)$** auxiliary data memory (requires temporary buffers to hold left and right halves during merge). |
| **Worst-Case Time** | **$O(n^2)$:** Occurs when input is already sorted or reverse-sorted with end-element pivot selection. | **$O(n \log n)$:** Guaranteed across all inputs regardless of initial ordering. |

---

### 4. Merge Sort Algorithm & Implementation Blueprint

#### Algorithmic Workflow

1. **Divide:** Compute midpoint $\text{mid} = \lfloor (\text{low} + \text{high}) / 2 \rfloor$.
2. **Conquer:**
* Recursively sort left subarray: `mergeSort(array, low, mid)`.
* Recursively sort right subarray: `mergeSort(array, mid + 1, high)`.
* Base condition: If `low >= high`, the slice has 0 or 1 element $\rightarrow$ return immediately.


3. **Combine (`merge` function):**
* Calculate subarray sizes:

$$\text{left\_len} = \text{mid} - \text{low} + 1, \quad \text{right\_len} = \text{high} - \text{mid}$$


* Allocate temporary arrays: `left_array[left_len]` and `right_array[right_len]`.
* Copy original data into temporary buffers.
* Maintain three pointers: `index_left = 0`, `index_right = 0`, `index = low`.
* While `index_left < left_len` and `index_right < right_len`:
* If `left_array[index_left] <= right_array[index_right]`: copy `left_array[index_left++]` to `array[index++]`.
* Else: copy `right_array[index_right++]` to `array[index++]`.


* **Drain Leftovers:**
* Copy any remaining elements in `left_array` directly into `array`.
* Copy any remaining elements in `right_array` directly into `array`.





---

### 5. Detailed Step-by-Step Execution Traces

#### Trace A: 8-Element Array (`[20, 15, 11, 7, 2, 1, 18, 3]`)

```
Recursive Tree Decomposition:
[20, 15, 11, 7, 2, 1, 18, 3] (0..7)
├── Left Half: [20, 15, 11, 7] (0..3)
│   ├── [20, 15] (0..1) -> [20] (0..0) & [15] (1..1) -> Merge to [15, 20]
│   └── [11, 7]  (2..3) -> [11] (2..2) & [7]  (3..3) -> Merge to [7, 11]
│   └── Merge [15, 20] & [7, 11] -> [7, 11, 15, 20]
└── Right Half: [2, 1, 18, 3] (4..7)
    ├── [2, 1]   (4..5) -> [2] (4..4) & [1] (5..5)   -> Merge to [1, 2]
    └── [18, 3]  (6..7) -> [18] (6..6) & [3] (7..7)  -> Merge to [3, 18]
    └── Merge [1, 2] & [3, 18] -> [1, 2, 3, 18]
└── Final Global Merge: [7, 11, 15, 20] & [1, 2, 3, 18] -> [1, 2, 3, 7, 11, 15, 18, 20]

```

* **Intermediate State Diagnostic (The `[15, 15]` phenomenon):**
* When merging `[20]` (left) and `[15]` (right) back into indices $0 \dots 1$:
* $15 < 20 \implies \text{array}[0]$ is overwritten with $15$.
* Momentarily, the array reads `[15, 15]` because index $1$ still holds its original value.
* The remaining element from `left_array` ($20$) is drained into index $1$, finalizing the subarray as `[15, 20]`.


* **Sub-Merge of Left Half (`[15, 20]` with `[7, 11]`):**
* Compare $15$ vs $7 \implies$ write $7$.
* Compare $15$ vs $11 \implies$ write $11$.
* Right buffer exhausted; dump remaining left elements ($15, 20$) into remaining slots $\implies$ `[7, 11, 15, 20]`.



---

#### Trace B: Reverse-Sorted Array (`[6, 5, 4, 3, 2, 1]`)

1. **Initial Split:**
* $\text{low} = 0, \text{high} = 5, \text{mid} = 2$.
* Left subtree: indices $0 \dots 2$ (`[6, 5, 4]`).
* Right subtree: indices $3 \dots 5$ (`[3, 2, 1]`).


2. **Left Subtree Processing:**
* Split into `[6, 5]` and `[4]`.
* `[6]` and `[5]` merge into `[5, 6]`.
* Merging `[5, 6]` with `[4]`:
* $4 < 5 \implies 4$ written first.
* Right buffer exhausted $\implies$ dump remaining left elements ($5, 6$) $\implies$ `[4, 5, 6]`.




3. **Right Subtree Processing:**
* Identical symmetric logic sorts `[3, 2, 1]` into `[1, 2, 3]`.


4. **Final Merge Step (`left = [4, 5, 6]`, `right = [1, 2, 3]`):**
* $\text{low} = 0, \text{mid} = 2, \text{high} = 5$.
* `left_array = [4, 5, 6]`, `right_array = [1, 2, 3]`.



| Step | Compared (`left` vs `right`) | Selected Value | Pointer Updates | Target Array State (`0..5`) |
| --- | --- | --- | --- | --- |
| **1** | $4 \text{ vs } 1$ | $1$ (from right) | `index_right=1`, `index=1` | `[1, 5, 4, 3, 2, 1]` |
| **2** | $4 \text{ vs } 2$ | $2$ (from right) | `index_right=2`, `index=2` | `[1, 2, 4, 3, 2, 1]` |
| **3** | $4 \text{ vs } 3$ | $3$ (from right) | `index_right=3`, `index=3` | `[1, 2, 3, 3, 2, 1]` |
| **Drain** | `right_array` exhausted | Dump `[4, 5, 6]` | `index_left` advanced to 3 | `[1, 2, 3, 4, 5, 6]` |

---

### 6. Complexity Summary & Next Deliverables

* **Time Complexity Analysis:**
* Recurrence relation: $T(n) = 2T(n/2) + O(n)$.
* Applying the Master Theorem ($a = 2, b = 2, f(n) = O(n)$): Case 2 applies, yielding **$T(n) = O(n \log n)$** uniformly across best, average, and worst-case scenarios.


* **Space Complexity Analysis:**
* Auxiliary Data Memory: **$O(n)$** required for the dynamic allocation of `left_array` and `right_array`.
* Call-Stack Overhead: **$O(\log n)$** recursion tree height.


* **Upcoming Milestones:**
* **Master Theorem Lecture:** Formal mathematical derivations of Divide and Conquer recurrences scheduled for the following session.
* **Unit 1 Review & Quiz Preparation:** Friday assessment will test manual simulation of partition index states, intermediate array outputs, and asymptotic complexity evaluations.

## Day 7 summary 

### 1. Master Theorem Foundations & Recurrence Framework

The Master Theorem provides a closed-form method to determine the asymptotic time complexity of divide-and-conquer recurrences without expanding full recursion trees.

#### General Recurrence Form

$$T(n) = a \cdot T\left(\frac{n}{b}\right) + f(n)$$

Where $f(n)$ is expressed as $\Theta(n^d)$ (or $O(n^d)$):

* **$T(n)$:** Total execution time for a problem of input size $n$.
* **$a \ge 1$:** The number of recursive subproblems generated at each level.
* **$b > 1$:** The constant factor by which the input size shrinks ($n/b$ is the size of each subproblem). If $b = 1$, no division occurs, breaking divide-and-conquer dynamics.
* **$f(n) = O(n^d)$:** The non-recursive work performed outside recursive sub-calls (the cost of dividing the problem and combining the subproblem solutions).

---

### 2. Recursion Tree Dynamics & Leaf Counting

The leaf nodes of a divide-and-conquer recursion tree represent the base cases ($n = 1$). The total work done at the leaf level is governed by the relation:

$$\text{Tree Height} = \log_b n$$

$$\text{Number of Leaves} = a^{\log_b n} = n^{\log_b a}$$

#### Step-by-Step Tree Verifications

* **Configuration 1 ($n = 16, a = 2, b = 2$):**
* Subproblem size reduces as $16 \rightarrow 8 \rightarrow 4 \rightarrow 2 \rightarrow 1$.
* Levels: $0, 1, 2, 3, 4$ ($\text{height} = \log_2 16 = 4$).
* Number of leaf nodes: $2^4 = 16$ (or $16^{\log_2 2} = 16^1 = 16$).


* **Configuration 2 ($n = 16, a = 2, b = 4$):**
* Subproblem size reduces as $16 \rightarrow 4 \rightarrow 1$.
* Levels: $0, 1, 2$ ($\text{height} = \log_4 16 = 2$).
* Number of leaf nodes: $2^2 = 4$ (or $16^{\log_4 2} = 16^{0.5} = 4$).


* **Configuration 3 ($n = 16, a = 3, b = 4$):**
* Subproblem size reduces as $16 \rightarrow 4 \rightarrow 1$.
* Levels: $0, 1, 2$ ($\text{height} = \log_4 16 = 2$).
* Number of leaf nodes: $3^2 = 9$ (or $16^{\log_4 3} = 3^{\log_4 16} = 3^2 = 9$).


* **Configuration 4 ($n = 16, a = 16, b = 4$):**
* Height $= \log_4 16 = 2$.
* Number of leaf nodes: $16^2 = 256$ (or $16^{\log_4 16} = 16^2 = 256$).



---

### 3. The Three Master Theorem Cases

The asymptotic behavior is decided by comparing the recursive branching rate $a$ against the combining growth rate $b^d$ (equivalent to comparing $n^{\log_b a}$ with $n^d$):

| Case | Condition | Dominant Factor | Resulting Time Complexity |
| --- | --- | --- | --- |
| **Case 1** | $a > b^d$ ($\log_b a > d$) | **Recursive Branching Dominates:** Work at the leaf level exceeds division/combination work. | $T(n) = \Theta\left(n^{\log_b a}\right)$ |
| **Case 2** | $a = b^d$ ($\log_b a = d$) | **Balanced Growth:** Work is distributed evenly across all levels of the tree. | $T(n) = \Theta\left(n^d \log n\right)$ |
| **Case 3** | $a < b^d$ ($\log_b a < d$) | **Combining Cost Dominates:** Division/combination at the root level dominates leaf-level work. | $T(n) = \Theta\left(n^d\right)$ |

---

### 4. Recurrence Classification Drills

#### Drill 1: $T(n) = 3T(n/2) + O(n^2)$

* Parameters: $a = 3, b = 2, d = 2$.
* Comparison: $b^d = 2^2 = 4$. Since $a < b^d$ ($3 < 4$):
* **Classification:** **Case 3** $\implies T(n) = O(n^2)$.

#### Drill 2: $T(n) = 4T(n/2) + O(n^2)$

* Parameters: $a = 4, b = 2, d = 2$.
* Comparison: $b^d = 2^2 = 4$. Since $a = b^d$ ($4 = 4$):
* **Classification:** **Case 2** $\implies T(n) = O(n^2 \log n)$.

#### Drill 3: $T(n) = 16T(n/4) + O(n)$

* Parameters: $a = 16, b = 4, d = 1$.
* Comparison: $b^d = 4^1 = 4$. Since $a > b^d$ ($16 > 4$):
* **Classification:** **Case 1** $\implies T(n) = O\left(n^{\log_4 16}\right) = O(n^2)$.

#### Drill 4: $T(n) = 3T(n/2) + O(n)$

* Parameters: $a = 3, b = 2, d = 1$.
* Comparison: $b^d = 2^1 = 2$. Since $a > b^d$ ($3 > 2$):
* **Classification:** **Case 1** $\implies T(n) = O\left(n^{\log_2 3}\right) \approx O(n^{1.585})$.

#### Drill 5: Binary Search ($T(n) = T(n/2) + O(1)$)

* Parameters: $a = 1, b = 2, d = 0$.
* Comparison: $b^d = 2^0 = 1$. Since $a = b^d$ ($1 = 1$):
* **Classification:** **Case 2** $\implies T(n) = O\left(n^0 \log n\right) = O(\log n)$.

---

### 5. Sorting Recurrence Derivations

#### Quick Sort (Worst Case)

* **Mechanics:** When the input is already sorted or reverse-sorted and the pivot is chosen at an extremity, partitioning yields subproblems of size $n - 1$ and $0$.
* **Recurrence:** $T(n) = T(n - 1) + c \cdot n$.
*(Note: Standard Master Theorem does not apply because problem reduction is subtractive ($n - 1$), not multiplicative ($n / b$)).*
* **Unfolding Derivation:**

$$T(n) = T(n - 2) + c(n - 1) + cn = c \sum_{i=1}^n i = c \cdot \frac{n(n + 1)}{2} = O(n^2)$$


* **Best / Average Case:** $T(n) = 2T(n/2) + O(n) \implies O(n \log n)$ via Case 2.

#### Merge Sort (All Cases)

* **Recurrence:** $T(n) = 2T(n/2) + c \cdot n$.
* **Master Theorem Mapping:** $a = 2, b = 2, d = 1 \implies b^d = 2^1 = 2 \implies a = b^d$ (**Case 2**).
* **Direct Unfolding Derivation:**

$$T(n) = 2\left[2T\left(\frac{n}{4}\right) + c\frac{n}{2}\right] + cn = 4T\left(\frac{n}{4}\right) + 2cn$$


$$T(n) = 2^k T\left(\frac{n}{2^k}\right) + k \cdot cn$$



Terminating when $n / 2^k = 1 \implies k = \log_2 n$:

$$T(n) = n \cdot T(1) + cn \log_2 n = O(n \log n)$$



Because the recursion tree divides evenly regardless of original array order, Merge Sort achieves $O(n \log n)$ uniformly across best, average, and worst cases.

---

### 6. Algorithmic Problem: Count 1s in a Sorted Binary Array

#### Problem Statement

Given a sorted array of size $n$ containing only $0$s and $1$s (e.g., `[0, 0, 0, 1, 1, 1, 1]`), calculate the total frequency of $1$s.

---

#### Approach 1: Linear Scan (Brute Force)

* Traverse from index `0` to the right until the first `1` is encountered at index $i$.
* Result $= n - i$.
* If no `1` appears, return `0`.
* **Complexity:** $O(n)$ time, $O(1)$ space.

---

#### Approach 2: Divide & Conquer / Binary Search ($O(\log n)$ Time)

* **Invariant:** Since the array is sorted, all $0$s cluster on the left and all $1$s cluster on the right. The objective reduces to locating the **first index containing a 1**.
* **Pointer Logic (`low`, `high`, `mid`):**
1. Compute $\text{mid} = \lfloor (\text{low} + \text{high}) / 2 \rfloor$.
2. If $\text{array}[\text{mid}] == 0$:
* All elements to the left of `mid` are guaranteed to be $0$.
* Discard left half; search the right partition by recursing on `[mid + 1, high]`.


3. If $\text{array}[\text{mid}] == 1$:
* All elements to the right of `mid` are guaranteed to be $1$.
* The first $1$ must be either at `mid` or further to its left.
* Narrow search to the left half: search in `[low, mid]`.





#### Boundary Optimizations & Short-Circuit Exits

Rather than recursing to single-element slices across massive arrays (e.g., $10^6$ items), apply early checks:

* **All Zero Check:** If $\text{array}[\text{high}] == 0$, the entire subarray contains no $1$s $\implies$ return $0$ immediately.
* **All One Check:** If $\text{array}[\text{low}] == 1$, every element from `low` to `high` is a $1$ $\implies$ return $(\text{high} - \text{low} + 1)$ immediately.

---

### 7. Administrative Notices & Quiz Specifications

* **Quiz Scheduling:** The Unit 1 assessment is scheduled for **Monday in the Auditorium** (postponed from the online session).
* **Test Structure & Content:**
* **Part 1 (MCQs):**
* Asymptotic notations and complexity classification.
* Master Theorem case matching from recurrence equations.
* Partition tracing: Array configurations and partition index (`pi`) calculations under **Partition High** and **Partition Low** across $k$ partition rounds.
* Merge Sort intermediate trace states (subarray structures and merge ordering).
* Recursion types (including head recursion mechanics).


* **Part 2 (Coding):**
* One implementation problem focusing on recursive problem solving.




* **Lab Instructions:** Students must resolve any backlog problems on the lab platform (TEL Tufan) from earlier sessions before Monday. Unit 1 review materials are distributed for examination preparation.

## Day 8 summary 
### 1. Class Context & Session Agenda

* **Session Purpose:** Review and consolidate Divide and Conquer / Binary Search problem patterns before the scheduled Unit 1 assessment.
* **Coverage Scope:** Detailed algorithmic solutions and recursion call-tree traces for four classic binary search and divide-and-conquer variations:
1. Count 1s in a Sorted Binary Array (formalizing the solution from the previous session).
2. Rotation Count in a Circularly (Rotated) Sorted Array.
3. Frequency Count of a Target Element in a Sorted Array with Duplicates.
4. First and Last Occurrence Indices of a Target Element (Variant Preview).


* **Upcoming Activity:** Unit 1 Quiz (Multiple-Choice Questions on asymptotic notation, Master Theorem cases, Quick Sort/Merge Sort traces, plus one coding problem on recursion).

---

### 2. Problem 1: Count 1s in a Sorted Binary Array

#### Problem Definition

Given a non-decreasing sorted array containing only $0$s and $1$s, determine the total count of $1$s.

```text
Sample 1: [0, 0, 1, 1, 1, 1, 1]  (n = 7) -> Output: 5
Sample 2: [1, 1, 1, 1, 1, 1, 1]  (n = 7) -> Output: 7
Sample 3: [0, 0, 0, 0, 0, 0, 0]  (n = 7) -> Output: 0

```

---

#### Approach Comparison

* **Linear Search ($O(n)$):** Scan from index `0` to the right until the first `1` is encountered at index $i$. Return $n - i$. If no `1` exists, return `0`.
* **Divide & Conquer / Binary Search ($O(\log n)$):** Repeatedly bisect the array using early short-circuit boundary evaluations to skip entire subranges of identical values.

---

#### Algorithmic Logic & Base Cases

Let the function be `countOnes(array, low, high)`:

1. **Empty / Null Guard:** If the slice is invalid (`low > high`), return `0`.
2. **All-Zeros Base Case:** If `array[high] == 0`, because the array is sorted, every element from `low` to `high` must be `0`. Return `0` immediately without further recursion.
3. **All-Ones Base Case:** If `array[low] == 1`, every element from `low` to `high` must be `1`. Return `high - low + 1` immediately without further recursion.
4. **Divide Step:** Compute `mid = (low + high) / 2`.
5. **Conquer / Combine:** Return `countOnes(array, low, mid) + countOnes(array, mid + 1, high)`.

---

#### Detailed Recursion Call Traces

##### Trace A: 5-Element Array (`[0, 0, 0, 1, 1]`)

* **Call 1 (`main`):** `countOnes(0, 4)`
* `array[4] == 1` and `array[0] == 0` $\rightarrow$ Divide around `mid = 2`.
* Spawns Left: `countOnes(0, 2)` and Right: `countOnes(3, 4)`.


* **Call 2 (Right Half):** `countOnes(3, 4)`
* `low = 3`, `array[3] == 1` $\rightarrow$ All-Ones base case matches.
* Returns $4 - 3 + 1 = 2$. (No further recursive calls spawned).


* **Call 3 (Left Half):** `countOnes(0, 2)`
* `low = 0, high = 2`, `array[2] == 0` $\rightarrow$ All-Zeros base case matches.
* Returns `0`.


* **Total Calls:** **3 function invocations** (1 initial + 2 recursive). Total $1$s $= 0 + 2 = 2$.

---

##### Trace B: 13-Element Array (`[0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]`)

* Array distribution: indices `0..3` are `0`, indices `4..12` are `1`.

```text
Invocation Tree:
Call 1: countOnes(0, 12)  [mid = 6]
├── Call 2: countOnes(7, 12) -> array[7] == 1 -> Returns 12 - 7 + 1 = 6 (Terminates)
└── Call 3: countOnes(0, 6)   [mid = 3]
    ├── Call 4: countOnes(0, 3) -> array[3] == 0 -> Returns 0 (Terminates)
    └── Call 5: countOnes(4, 6) -> array[4] == 1 -> Returns 6 - 4 + 1 = 3 (Terminates)

```

* **Total Calls:** Exactly **5 invocations**.
* **Result:** $6 + (0 + 3) = 9$ total $1$s.

---

### 3. Problem 2: Rotation Count in a Circularly Sorted Array

#### Problem Definition

Given a circularly (rotated) sorted array of **distinct** integers, find the number of times the array has been rotated in an anti-clockwise direction (equivalent to shifting elements from left to right) so that it returns to fully sorted order.

```text
Sample 1: [8, 9, 10, 2, 5, 6]      -> Minimum element is 2 at index 3 -> Output: 3 rotations
Sample 2: [2, 3, 4, 5, 6]          -> Already sorted -> Output: 0 rotations
Sample 3: [8, 10, 12, 15, 17, 2]   -> Minimum element is 2 at index 5 -> Output: 5 rotations

```

* **Core Insight:** In a circular sorted array of unique elements, the number of rotations equals the **index of the minimum element** (the inflection/pivot point where $A[i] > A[i+1]$).

---

#### Approaches

##### Brute Force ($O(n)$)

Linear scan comparing `array[i]` with `array[i + 1]`. As soon as `array[i] > array[i + 1]`, index $i + 1$ is the minimum element. Return $i + 1$. If no such pair exists, return `0`.

##### Binary Search / Divide & Conquer ($O(\log n)$ Time, $O(1)$ Space)

At each step, examine `mid`:

1. **Already Sorted Subarray Check:**
* If `array[low] <= array[high]`, the current range `[low...high]` is already completely sorted. The minimum element is at index `low`. Return `low`.


2. **Inflection Point Checks at `mid`:**
* **Next Element Smaller:** If `mid < high` and `array[mid] > array[mid + 1]`, then `mid + 1` is the minimum element. Return `mid + 1`.
* **Current Element Smaller than Previous:** If `mid > low` and `array[mid] < array[mid - 1]`, then `mid` is the minimum element. Return `mid`.


3. **Deciding Which Half to Discard:**
* If `array[low] <= array[mid]`: The left half from `low` to `mid` is normally sorted. The inflection point must lie in the unsorted right half $\rightarrow$ recurse on `low = mid + 1`.
* Else (`array[mid] < array[high]`): The right half is normally sorted. The inflection point must lie in the unsorted left half $\rightarrow$ recurse on `high = mid - 1`.



---

#### Edge Case Walkthrough: `[10, 1, 2, 3, 4, 5]`

* `low = 0` (`10`), `high = 5` (`5`), `mid = 2` (`2`).
* Left element of `mid` is `1` (`< 2`), right is `3` (`> 2`).
* Comparing boundaries: `array[low] > array[high]` ($10 > 5$), confirming rotations exist.
* Since `array[mid] < array[high]` ($2 < 5$), the right half `[2, 3, 4, 5]` is normally sorted. Discard right; recurse left on `high = mid - 1 = 1`.
* In `[10, 1]`: `mid = 0`, `array[mid] > array[mid + 1]` ($10 > 1$) $\rightarrow$ minimum element confirmed at index `1`. Output $= 1$.

---

### 4. Problem 3: Occurrence Count of a Target in a Sorted Array with Duplicates

#### Problem Definition

Given a sorted array of integers containing duplicate values and a `target` number, count how many times `target` appears.

```text
Sample 1: Array = [0, 5, 5, 5, 6, 8, 9, 10], Target = 5  -> Output: 3
Sample 2: Array = [1, 2, 3, 3, 3, 4, 5],    Target = 3  -> Output: 3
Sample 3: Array = [1, 2, 4, 6, 7],          Target = 5  -> Output: 0

```

---

#### Binary Search / D&C Strategy ($O(\log n)$ Average)

Instead of a linear scan ($O(n)$), use modified binary search:

1. **Base Cases:**
* If `low > high`, target is not in this range $\rightarrow$ return `0`.
* If `array[low] == target` and `array[high] == target`: Because the array is sorted, every single element between `low` and `high` must be `target`. Return `high - low + 1` directly without further splitting.


2. **Comparison Step:** Compute `mid = (low + high) / 2`.
* **Case A (`target < array[mid]`):** Target can only exist in the left half $\rightarrow$ search `[low ... mid - 1]`.
* **Case B (`target > array[mid]`):** Target can only exist in the right half $\rightarrow$ search `[mid + 1 ... high]`.
* **Case C (`target == array[mid]`):** Matches found. Because duplicates can span across the midpoint:
* Check left neighbor: If `mid > low` and `array[mid - 1] == target`, target exists to the left $\rightarrow$ recurse on left half.
* Check right neighbor: If `mid < high` and `array[mid + 1] == target`, target exists to the right $\rightarrow$ recurse on right half.
* Count $= 1 + \text{occurrences in left} + \text{occurrences in right}$.





---

#### Trace: Array with `target = 3` (Indices 0..9)

```text
Indices:  0  1  2  3  4  5  6  7  8  9
Array:   [1, 2, 3, 3, 3, 3, 3, 4, 5, 6]

```

1. `search(0, 9)`: `mid = 4` (`array[4] = 3`).
* Matches target. Left neighbor `array[3] == 3`, right neighbor `array[5] == 3`. Both sides contain the target.


2. **Left Subproblem `[0 ... 4]`:**
* `mid = 2` (`array[2] = 3`).
* `array[1] = 2` (not target), so left of index 2 can be pruned.
* Range `[2 ... 4]` has `array[2] == 3` and `array[4] == 3` $\rightarrow$ All-Target base case triggers $\rightarrow$ returns $4 - 2 + 1 = 3$.


3. **Right Subproblem `[5 ... 9]`:**
* `mid = 7` (`array[7] = 4`). Target $3 < 4 \implies$ discard right half `[8 ... 9]`.
* Evaluates `[5 ... 6]`: both boundary elements are $3 \implies$ returns $6 - 5 + 1 = 2$.


4. **Total Count:** $3 + 2 = 5$.

---

### 5. Problem 4: First and Last Occurrence of an Element (Variant Preview)

* **Objective:** Return the starting index and ending index `[start, end]` of a given target instead of its frequency count.
* **Mechanism:**
* Run two targeted binary searches:
1. **First Occurrence (Lower Bound):** When `array[mid] == target`, record `mid` as a candidate and continue searching left (`high = mid - 1`) to verify if earlier duplicates exist.
2. **Last Occurrence (Upper Bound):** When `array[mid] == target`, record `mid` as a candidate and continue searching right (`low = mid + 1`) to verify if later duplicates exist.


* If both indices are found, the count can also be deduced as:

$$\text{Count} = \text{last\_index} - \text{first\_index} + 1$$




* **Complexity:** Guaranteed $2 \times O(\log n) = O(\log n)$ time, $O(1)$ space.

---

### 6. Lab & Assessment Logistics

* **Platform Reset:** TEL Tufan environment initialized for student lab submissions.
* **Unit 1 Assessment Structure:**
* **Section 1: Conceptual & Analytical MCQs:**
* Recurrence equations and Master Theorem case classification (Case 1, 2, and 3).
* Tracing partition index states and subarray outputs for Quick Sort (Partition High vs. Partition Low).
* Merge Sort division sequences and merge-step tracing.
* Recursion types (direct, indirect, head recursion).


* **Section 2: Coding Problem:**
* Implementation testing recursive formulation and boundary condition handling.

## Day 9 Summary
### 1. Unit 2 Overview & Curriculum Scope

* **Core Unit Topics:**
* **Binary Search:** Advanced applications, invariant modeling, boundary constraints, and multidimensional search spaces (extending the Divide and Conquer techniques covered in Unit 1).
* **Greedy Algorithms:** Optimization paradigms targeting minimization and maximization objectives (e.g., interval scheduling, fractional knapsack, profit maximization in asset trading).


* **Pedagogical Strategy:** Moving beyond standard syllabus implementations to solve competitive-programming style search variants while focusing on algorithmic invariants, edge cases, and overflow avoidance.

---

### 2. Binary Search Foundations & Complexity Dynamics

#### Search Paradigm Comparison

* **Linear Search ($O(n)$):**
* Operates on unsorted or arbitrary data structures.
* Worst-case: Traverses all $n$ elements ($O(n)$).
* Best-case: Target matches the first element ($O(1)$).


* **Binary Search ($O(\log n)$):**
* **Prerequisite Invariant:** The search space **must be strictly monotonic (sorted)**.
* Attempting to sort an unsorted array first to run binary search incurs an $O(n \log n)$ preprocessing cost, which is inferior to a direct $O(n)$ linear scan for a single query.
* **Mechanism:** Computes the midpoint index, halves the candidate search window on each comparison, and discards the invalid half.
* Best-case: Target resides at the initial midpoint ($O(1)$).
* Worst/Average-case: $\lfloor \log_2 n \rfloor + 1$ iterations ($O(\log n)$).



---

### 3. Implementation Mechanics & Integer Overflow Prevention

#### The Midpoint Arithmetic Trap

A naive calculation of the midpoint using:


$$\text{mid} = \frac{\text{low} + \text{high}}{2}$$


introduces an **integer overflow defect** in systems with fixed-width signed integers (e.g., 32-bit signed integers in Java, C, and C++ where $\text{MAX\_INT} = 2^{31} - 1 \approx 2.147 \times 10^9$).

* **Failure Scenario:**
* If $\text{low} = 2 \times 10^9$ and $\text{high} = 2.1 \times 10^9$, their arithmetic sum is:

$$\text{low} + \text{high} = 4.1 \times 10^9 > 2^{31} - 1$$


* The sum overflows to a negative 32-bit integer, resulting in a negative midpoint and an immediate `ArrayIndexOutOfBoundsException`.



#### Safe Midpoint Formulation

To guarantee numerical stability, compute the midpoint via bounded difference:


$$\text{mid} = \text{low} + \left\lfloor \frac{\text{high} - \text{low}}{2} \right\rfloor$$


Because $\text{high} \ge \text{low}$, the term $(\text{high} - \text{low})$ is non-negative and strictly smaller than $\text{high}$, preventing overflow under all valid index boundaries.

---

### 4. Problem 1: Smallest Fixed Point in a Sorted Array

#### Problem Definition

Given a sorted array of $n$ **distinct integers** in ascending order, locate the **smallest fixed point** (an index $i$ such that $\text{array}[i] == i$). If no fixed point exists, return $-1$. The array may contain negative numbers.

```text
Sample 1: [-5, -3, 1, 3, 6, 9] (n = 6) -> Output: 3  (array[3] == 3)
Sample 2: [0, 1, 2, 3, 4, 5, 6] (n = 7) -> Output: 0  (Multiple matches; smallest is 0)
Sample 3: [-2, 0, 3, 5, 7]      (n = 5) -> Output: -1 (No fixed point)

```

---

#### Mathematical Invariant (Distinct Integers)

Because all elements are distinct integers in strictly ascending order:


$$\text{array}[i+1] \ge \text{array}[i] + 1$$

* **Case 1: $\text{array}[\text{mid}] < \text{mid}$**
* Every element preceding $\text{mid}$ must satisfy:

$$\text{array}[\text{mid} - k] \le \text{array}[\text{mid}] - k < \text{mid} - k$$


* No index $j \le \text{mid}$ can ever satisfy $\text{array}[j] == j$.
* **Action:** Discard the left half entirely; search right (`low = mid + 1`).


* **Case 2: $\text{array}[\text{mid}] > \text{mid}$**
* Every element succeeding $\text{mid}$ must satisfy:

$$\text{array}[\text{mid} + k] \ge \text{array}[\text{mid}] + k > \text{mid} + k$$


* No index $j \ge \text{mid}$ can ever satisfy $\text{array}[j] == j$.
* **Action:** Discard the right half entirely; search left (`high = mid - 1`).


* **Case 3: $\text{array}[\text{mid}] == \text{mid}$**
* A fixed point is found. However, because the problem requires the **smallest** index, an earlier fixed point might exist in the left partition.
* **Action:** Record $\text{mid}$ as the running result candidate and continue searching left (`high = mid - 1`). Discard the right half.



---

#### Trace: Array `[-5, -3, 1, 3, 6, 9]` ($n = 6$)

1. `low = 0, high = 5` $\implies \text{mid} = 2$.
* $\text{array}[2] = 1$.
* Comparison: $\text{array}[2] < 2$ ($1 < 2$) $\implies$ fixed point cannot be at $\le 2$.
* Recurse right: `low = mid + 1 = 3`.


2. `low = 3, high = 5` $\implies \text{mid} = 4$.
* $\text{array}[4] = 6$.
* Comparison: $\text{array}[4] > 4$ ($6 > 4$) $\implies$ fixed point cannot be at $\ge 4$.
* Recurse left: `high = mid - 1 = 3`.


3. `low = 3, high = 3` $\implies \text{mid} = 3$.
* $\text{array}[3] = 3$.
* Match found: Record candidate $= 3$. Search left: `high = mid - 1 = 2`.


4. `low = 3, high = 2` $\implies$ Loop terminates (`low > high`).
5. **Final Result:** Returns $3$.

---

#### The Duplicate Restriction Caveat

If duplicate values are allowed (e.g., `[0, 1, 1, 3, 6, 9]`), the property $\text{array}[i+1] \ge \text{array}[i] + 1$ breaks. A fixed point can exist in either half regardless of whether $\text{array}[\text{mid}]$ is greater than or less than $\text{mid}$, degrading the search to an $O(n)$ scan in the worst case. The $O(\log n)$ guarantee holds strictly for arrays with **distinct integers**.

---

### 5. Problem 2: Smallest Common Element Across All Rows of a Matrix

#### Problem Definition

Given an $m \times n$ matrix where **each individual row is sorted in non-decreasing order**, locate the **smallest element common to all $m$ rows**. If no such element exists, return $-1$.

```text
Sample Matrix (4 x 4):
[1, 2, 3, 4]
[2, 3, 4, 5]
[3, 4, 5, 6]
[4, 5, 6, 7]
Common elements across all rows: 4 -> Output: 4

```

---

#### Baseline Approaches

* **Brute Force Linear Scan:** For each element in Row 0, search linearly across all elements of the remaining $m-1$ rows $\implies O(m \cdot n^2)$ time.
* **Hash / Frequency Map:** Tally occurrences of elements row by row. Consumes $O(m \cdot n)$ auxiliary memory and does not take advantage of row-level sorted ordering.
* **Matrix Flattening:** Reshaping the matrix into a 1D array adds unnecessary memory overhead ($O(m \cdot n)$ space), complex stride mapping ($\text{row} \times n + \text{col}$), and high maintenance costs.

---

#### Optimized Binary Search Strategy ($O(m \cdot n \log n)$ Time, $O(1)$ Space)

##### Step 1: Early Pruning Check ($O(m)$ Time)

Before performing search operations, evaluate global feasibility:

* Identify the maximum element of Row 0: $\text{max\_row0} = \text{matrix}[0][n - 1]$.
* For each subsequent row $r$ from $1$ to $m - 1$:
* Inspect its minimum element: $\text{min\_row}_r = \text{matrix}[r][0]$.
* If $\text{min\_row}_r > \text{max\_row0}$, then row $r$ consists entirely of values strictly larger than any value present in Row 0. A universally common element is mathematically impossible.
* **Short-circuit exit:** Return $-1$ immediately.



##### Step 2: Element-by-Element Binary Search

1. Iterate through Row 0 from left to right: $j = 0, 1, \dots, n - 1$.
* Let candidate $\text{target} = \text{matrix}[0][j]$.


2. Verify candidate presence across rows $r = 1, 2, \dots, m - 1$ using binary search on each row:
* Perform `binarySearch(matrix[r], target, 0, n - 1)`.
* **Early Rejection:** If `target` is missing in row $r$, immediately terminate the row loop for this candidate and advance to `matrix[0][j + 1]`.


3. If `target` is successfully found in all $m - 1$ rows:
* Because Row 0 is traversed in non-decreasing order, the first candidate that satisfies all rows is guaranteed to be the **smallest common element**.
* Return `target` immediately.


4. If Row 0 elements are exhausted without a unanimous match, return $-1$.

---

#### Algorithmic Complexity

| Metric | Brute Force | Hash Map / Set | Binary Search (Optimized) |
| --- | --- | --- | --- |
| **Time Complexity** | $O(m \cdot n^2)$ | $O(m \cdot n)$ | $O(m \cdot n \log n)$ worst-case; much faster with early rejection |
| **Auxiliary Space** | $O(1)$ | $O(m \cdot n)$ | **$O(1)$** |

---

### 6. Java Programming Idiom: Labeled Breaks in Nested Loops

When coordinating nested iteration (e.g., looping through candidates in Row 0, traversing rows $1 \dots m-1$, and executing inner binary search operations), early exits from deep loop structures become necessary.

#### The Code-Smell Alternative: Boolean Flags

```java
// Anti-pattern: Verbose flag propagation
boolean foundInAllRows = true;
for (int c = 0; c < cols; c++) {
    foundInAllRows = true;
    for (int r = 1; r < rows; r++) {
        if (!binarySearch(matrix[r], matrix[0][c])) {
            foundInAllRows = false;
            break; // Exits only inner row loop; outer loop still requires checking flags
        }
    }
    if (foundInAllRows) return matrix[0][c];
}

```

#### Idiomatic Solution: Labeled `break` and `continue`

Java supports prefixing loops with an identifier label (e.g., `candidateLoop:`) to break directly out of multiple nested levels without intermediate flag checks:

```java
candidateLoop:
for (int c = 0; c < cols; c++) {
    int target = matrix[0][c];
    
    for (int r = 1; r < rows; r++) {
        // If target is missing in any row, discard target and jump directly 
        // to the next candidate in candidateLoop
        if (!binarySearch(matrix[r], target)) {
            continue candidateLoop; 
        }
    }
    
    // Found in all rows
    return target; 
}
return -1;

```

## Day 10 summary
### 1. Class Agenda & Curriculum Context

* **Session Objective:** Complete the code walkthrough and formal verification for the two Unit 2 syllabus problems introduced in the previous session, then introduce advanced binary search paradigms:
1. **Smallest Fixed Point in a Sorted Array** (Code implementation & invariant review).
2. **Smallest Common Element Across All Rows of a Matrix** (Code implementation, early boundary pruning, and labeled break mechanics).
3. **Longest Common Prefix (LCP)** (Comparative analysis: Brute force, Hash Table / Set alternatives, and Binary Search on prefix length).
4. **Koko Eating Bananas** (Paradigm expansion: **Binary Search on the Answer Space** where the input array is unsorted, but the search domain is monotonic).


* **Unit 2 Roadmap:** Primary focus on Binary Search variants followed by Greedy Algorithms (minimization/maximization objectives, interval scheduling, fractional knapsack).

---

### 2. Problem 1 Review: Smallest Fixed Point in a Sorted Array

#### Problem Definition

Given a sorted array of $n$ distinct integers in ascending order, find the smallest index $i$ such that $\text{array}[i] == i$. Return $-1$ if no fixed point exists.

```text
Test Cases:
  [0, 1, 2, 3, 4]       -> Output: 0  (Every index is a fixed point; 0 is the smallest)
  [-1, 0, 3, 5, 7]      -> Output: -1 (Indices: 0, 1, 2, 3, 4; no A[i] == i)
  [-5, -3, 0, 3, 4]     -> Output: 3  (A[3] == 3)
  [5, 7, 9, 10, 11]     -> Output: -1 (A[mid] > mid for all elements)

```

---

#### Algorithm & Search-Space Pruning

* **Invariant Under Distinct Elements:** Because elements are strictly increasing ($\text{array}[i+1] \ge \text{array}[i] + 1$):
* If $\text{array}[\text{mid}] > \text{mid}$: For every index $j > \text{mid}$, $\text{array}[j] > j$. A fixed point can never occur on the right. Search strictly on the left (`right = mid`).
* If $\text{array}[\text{mid}] == \text{mid}$: A valid fixed point is found. However, because the **smallest** index is required, a smaller fixed point might exist in the left half. Prune the right half and retain `mid` as a candidate (`right = mid`).
* If $\text{array}[\text{mid}] < \text{mid}$: For every index $j < \text{mid}$, $\text{array}[j] < j$. A fixed point can never occur on the left. Search strictly on the right (`left = mid + 1`).



---

#### Implementation Blueprint

```java
public static int findSmallestFixedPoint(int[] nums) {
    int left = 0, right = nums.length - 1;
    
    // Narrow down the search range to a single candidate
    while (left < right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] >= mid) {
            // Covers both nums[mid] == mid and nums[mid] > mid
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    // Final verification of the converged index
    return (nums[left] == left) ? left : -1;
}

```

* **Complexity:** $O(\log n)$ time, $O(1)$ space.
* **Alternative Pattern:** Maintain an explicit `ans = -1` variable. When $\text{nums}[\text{mid}] == \text{mid}$, set $\text{ans} = \text{mid}$ and search left (`right = mid - 1`). Both converge to identical bounds.

---

### 3. Problem 2 Review: Smallest Common Element in All Matrix Rows

#### Problem Definition

Given an $m \times n$ matrix where **each row is sorted in non-decreasing order**, return the smallest element common to all $m$ rows. Return $-1$ if no universal common element exists.

---

#### Early Pruning Condition ($O(m)$ Check)

Let $\text{max\_row0} = \text{matrix}[0][n - 1]$ (the largest element in Row 0).

* For each row $i$ from $1$ to $m - 1$:
* If $\text{matrix}[i][0] > \text{max\_row0}$, then the minimum element of row $i$ is strictly greater than the maximum element of Row 0.
* A common element is mathematically impossible $\implies$ return $-1$ immediately.



---

#### Row-by-Row Binary Search Algorithm

1. Treat Row 0 as the reference candidate array.
2. For each element $\text{target} = \text{matrix}[0][c]$ (from $c = 0 \dots n - 1$):
* Initialize `count = 1` because `target` is inherently present in Row 0.
* Search for `target` in each subsequent row $r = 1 \dots m - 1$ via binary search:
* If found in row $r$: increment `count`.
* If missing in row $r$: `target` is not common across all rows. Break out of the row traversal immediately and advance to the next candidate in Row 0.


* If `count == m`, return `target` immediately (guaranteed to be the smallest because Row 0 is traversed left to right).


3. If Row 0 candidates are exhausted without a match, return $-1$.

---

#### Java Implementation with Labeled Breaks

```java
public static int smallestCommonElement(int[][] mat) {
    int m = mat.length;
    int n = mat[0].length;
    
    if (m == 1) return mat[0][0];
    
    int lastElementRow0 = mat[0][n - 1];
    
    outer:
    for (int j = 0; j < n; j++) {
        int target = mat[0][j];
        int count = 1; // Element already exists in row 0
        
        for (int i = 1; i < m; i++) {
            // Early pruning check per row
            if (lastElementRow0 < mat[i][0]) {
                break outer; // Impossible for any common element to exist
            }
            
            if (binarySearch(mat[i], 0, n - 1, target)) {
                count++;
            } else {
                break; // Missing in row i; discard candidate, try next j
            }
        }
        
        if (count == m) {
            return target;
        }
    }
    
    return -1;
}

private static boolean binarySearch(int[] row, int low, int high, int target) {
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (row[mid] == target) return true;
        else if (row[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return false;
}

```

* **Complexity:**
* **Worst-case Time:** $O(m \cdot n \log n)$.
* **Average-case Time:** Significantly lower due to early rejection on the first mismatched row.
* **Auxiliary Space:** $O(1)$.



---

### 4. Problem 3: Longest Common Prefix (LCP)

#### Problem Definition

Given an array of strings, determine the longest contiguous prefix shared by all strings in the collection. Return an empty string `""` if no common prefix exists.

```text
Sample 1: ["gene", "genesis", "general"]  -> Output: "gene"
Sample 2: ["dog", "racecar", "car"]       -> Output: ""
Sample 3: ["hello", "hello", "hello"]     -> Output: "hello"

```

---

#### Upper Bound Constraint

The length of the longest common prefix cannot exceed the length of the shortest string in the array:


$$L_{\min} = \min_{s \in \text{strings}} (\text{length}(s))$$

---

#### Alternative Strategies Evaluated

1. **Vertical Linear Scan ($O(N \cdot L_{\min})$):** Compare character-by-character across all strings from index $0$ to $L_{\min} - 1$. Terminate on the first character mismatch.
2. **Hash Table / Set Approaches:**
* Hashing characters or prefix tokens per index adds substantial hashing and allocation overhead ($O(N \cdot L_{\min})$ space).
* Reverse-scan (checking from $L_{\min}$ down to $1$): Highly inefficient when prefix matches fail early near index $0$.



---

#### Optimized Strategy: Binary Search on Prefix Length

Instead of testing characters linearly, binary search over the **prefix length domain** $[1, L_{\min}]$:

1. Determine $L_{\min}$ from the input strings.
2. Set $\text{low} = 1$, $\text{high} = L_{\min}$, $\text{lcp} = \text{""}$.
3. While $\text{low} \le \text{high}$:
* Compute $\text{mid} = \text{low} + (\text{high} - \text{low}) / 2$.
* Extract the candidate prefix: $\text{candidate} = \text{strings}[0].\text{substring}(0, \text{mid})$.
* **Verification Function (`isCommonPrefix`):** Check if every other string starts with $\text{candidate}$ using `string.startsWith(candidate)`:
* **If True:** All strings share this prefix of length $\text{mid}$. Record $\text{lcp} = \text{candidate}$ and search for a longer match: $\text{low} = \text{mid} + 1$.
* **If False:** At least one string failed. Discard this length and search shorter prefixes: $\text{high} = \text{mid} - 1$.




4. Return $\text{lcp}$.

```text
Trace on ["genesis", "genesis solutions", "genesis computers"]:
  L_min = 7 ("genesis")
  low = 1, high = 7 -> mid = 4 -> candidate = "gene"
  All strings start with "gene" -> Valid!
  Record "gene", search right: low = 5, high = 7 -> mid = 6 -> candidate = "genesi"
  All strings start with "genesi" -> Valid!
  Record "genesi", search right: low = 7, high = 7 -> mid = 7 -> candidate = "genesis"
  All strings start with "genesis" -> Valid!
  low = 8 > high = 7 -> Terminate. Result: "genesis".

```

* **Complexity:**
* **Time:** $O(N \cdot L_{\min} \cdot \log L_{\min})$ in worst-case substring comparisons (halves the number of scan evaluations from $L_{\min}$ to $\log L_{\min}$).
* **Auxiliary Space:** $O(L_{\min})$ to hold the candidate substring.



---

### 5. Problem 4: Koko Eating Bananas (LeetCode 875)

#### Problem Definition

Koko is given $n$ piles of bananas, where the $i$-th pile has $\text{piles}[i]$ bananas, and an integer $H$ representing hours available.

* In each hour, Koko selects a speed $k$ (bananas per hour).
* She eats up to $k$ bananas from a single pile. If the pile contains fewer than $k$ bananas, she eats the entire pile and **cannot** eat from any other pile during that remaining hour.
* Find the **minimum integer eating speed $k$** such that Koko can eat all bananas within $H$ hours.

---

#### Critical Edge Cases & Bounds

1. **$H < n$:** Impossible. Because Koko can eat from at most one pile per hour, she requires at least $n$ hours. If $H < n$, return `-1` / invalid.
2. **$H == n$:** Koko must finish each pile in exactly 1 hour. Minimum speed $k = \max(\text{piles})$.
3. **General Search Domain:**
* Minimum possible eating speed: $\text{low} = 1$ banana/hour.
* Maximum possible eating speed: $\text{high} = \max(\text{piles})$ (eating faster than the largest pile provides no further hourly reduction).



---

#### Hours Computation Formula

At speed $k$, the hours required to consume pile $p$ is:


$$\text{hours}(p, k) = \left\lceil \frac{p}{k} \right\rceil = \left\lfloor \frac{p + k - 1}{k} \right\rfloor$$

$$\text{Total Hours}(k) = \sum_{i=0}^{n-1} \left\lceil \frac{\text{piles}[i]}{k} \right\rceil$$

---

#### Approaches

##### 1. Brute Force Linear Scan ($O(n \cdot \max(\text{piles}))$)

* Iterate $k = 1, 2, 3, \dots, \max(\text{piles})$.
* Compute $\text{Total Hours}(k)$. The first $k$ that satisfies $\text{Total Hours}(k) \le H$ is the minimum speed.
* Prohibitively slow when pile sizes reach $10^9$.

##### 2. Binary Search on Answer Space ($O(n \log(\max(\text{piles})))$)

* **Monotonicity Property:** As eating speed $k$ increases, $\text{Total Hours}(k)$ monotonically decreases or stays flat. This creates a binary decision boundary:

$$\text{Feasible}(k) = \begin{cases} \text{False} & \text{for } k < k_{\min} \\ \text{True} & \text{for } k \ge k_{\min} \end{cases}$$


* The pile array **does not need to be sorted**. The binary search operates over the speed domain $[1, \max(\text{piles})]$.

---

#### Binary Search Walkthrough

**Input:** $\text{piles} = [30, 11, 23, 4, 20]$, $H = 6$.

* Initial bounds: $\text{low} = 1$, $\text{high} = 30$.

| Iteration | Speed $k$ (`mid`) | Hourly Breakdown per Pile | Total Hours | Condition ($\le H = 6$) | Next Bound Action |
| --- | --- | --- | --- | --- | --- |
| **1** | $\text{mid} = 15$ | $\lceil 30/15 \rceil = 2$<br>

<br>$\lceil 11/15 \rceil = 1$<br>

<br>$\lceil 23/15 \rceil = 2$<br>

<br>$\lceil 4/15 \rceil = 1$<br>

<br>$\lceil 20/15 \rceil = 2$ | **8 hrs** | $8 > 6$ (Too slow) | Speed must increase:<br>

<br>`low = mid + 1 = 16` |
| **2** | $\text{mid} = 23$<br>

<br>$(16 + 30)/2$ | $\lceil 30/23 \rceil = 2$<br>

<br>$\lceil 11/23 \rceil = 1$<br>

<br>$\lceil 23/23 \rceil = 1$<br>

<br>$\lceil 4/23 \rceil = 1$<br>

<br>$\lceil 20/23 \rceil = 1$ | **6 hrs** | $6 \le 6$ (Feasible!) | Record $k = 23$, try slower:<br>

<br>`high = mid - 1 = 22` |
| **3** | $\text{mid} = 19$<br>

<br>$(16 + 22)/2$ | $\lceil 30/19 \rceil = 2$<br>

<br>$\lceil 11/19 \rceil = 1$<br>

<br>$\lceil 23/19 \rceil = 2$<br>

<br>$\lceil 4/19 \rceil = 1$<br>

<br>$\lceil 20/19 \rceil = 2$ | **8 hrs** | $8 > 6$ (Too slow) | Speed must increase:<br>

<br>`low = mid + 1 = 20` |
| **4** | $\text{mid} = 21$<br>

<br>$(20 + 22)/2$ | $\lceil 30/21 \rceil = 2, \dots$ | **7 hrs** | $7 > 6$ (Too slow) | `low = mid + 1 = 22` |
| **5** | $\text{mid} = 22$<br>

<br>$(22 + 22)/2$ | $\lceil 30/22 \rceil = 2$<br>

<br>$\lceil 11/22 \rceil = 1$<br>

<br>$\lceil 23/22 \rceil = 2$<br>

<br>$\lceil 4/22 \rceil = 1$<br>

<br>$\lceil 20/22 \rceil = 1$ | **7 hrs** | $7 > 6$ (Too slow) | `low = mid + 1 = 23` |

* **Termination:** `low = 23`, `high = 22` $\implies$ Loop exits.
* **Result:** Minimum speed $k = 23$.

---

#### Algorithm Implementation

```java
public static int minEatingSpeed(int[] piles, int h) {
    int low = 1;
    int high = 0;
    for (int pile : piles) {
        if (pile > high) high = pile;
    }
    
    int result = high;
    
    while (low <= high) {
        int mid = low + (high - low) / 2;
        
        if (canFinish(piles, mid, h)) {
            result = mid;       // Feasible candidate; record it
            high = mid - 1;     // Try to find a smaller feasible speed
        } else {
            low = mid + 1;      // Speed too slow; must increase
        }
    }
    
    return result;
}

private static boolean canFinish(int[] piles, int speed, int h) {
    long totalHours = 0;
    for (int pile : piles) {
        // Ceiling division: (pile + speed - 1) / speed
        totalHours += (pile + speed - 1) / speed;
        if (totalHours > h) return false; // Early exit on overflow/exceeding h
    }
    return totalHours <= h;
}

```

* **Complexity:**
* **Time:** $O(n \cdot \log(\max(\text{piles})))$ — evaluating `canFinish` takes $O(n)$ work across $\log(\max(\text{piles}))$ search steps.
* **Auxiliary Space:** $O(1)$.



---

### 6. Summary Comparison of Paradigms

| Problem | Search Target | Search Space Type | Monotonicity Condition | Time Complexity |
| --- | --- | --- | --- | --- |
| **Smallest Fixed Point** | Array Index $i$ | Discrete Indices $[0, n-1]$ | $\text{array}[i] - i$ is non-decreasing for distinct elements | $O(\log n)$ |
| **Smallest Common Element** | Array Value | Row-wise Matrix Elements | Each individual row is sorted | $O(m \cdot n \log n)$ |
| **Longest Common Prefix** | Prefix Length $L$ | Lengths $[1, L_{\min}]$ | If prefix of length $L$ fails, all $L' > L$ fail | $O(N \cdot L_{\min} \log L_{\min})$ |
| **Koko Eating Bananas** | Speed $k$ | Answer Space $[1, \max(\text{piles})]$ | $\text{Total Hours}(k)$ decreases monotonically as $k$ increases | $O(n \log(\max(\text{piles})))$ |
