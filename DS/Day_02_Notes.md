# DAA — Lecture 2: efficient recursion, strings and happy numbers

**Source:** [Day 2 transcript](sources/Day_02_Transcript.txt). The lecture revisits Fibonacci and staircase counting, then covers string reversal, Java string mutability, and happy numbers. The transcript contains spoken arithmetic and variable-name slips; these notes preserve the intended ideas and correct those slips where needed.

**How to use this file:** read the concept and worked trace, close it, then attempt [Day 2 practice](Day_02_Practice.md). Read [the reference code](code/day02_reference.cpp) only after writing your own solution.

**Language update:** Java is the MCQ language; C++ is available for coding. Keep Java semantics here and use [the Java-only hard bank](FS_Java_Hard_MCQ_Bank.md) plus [the paired syntax/I/O guide](FS_Java_CPP_Exam_Revision.md).

## 1. Lecture map

| Approx. time | Topic | Skill to retain |
|---|---|---|
| 0:00–21:00 | Fibonacci: iterative, branching recursion, accumulator recursion | Detect repeated work; compare time and stack space |
| 21:00–39:30 | Climbing stairs with jumps 1–2 and 1–m | Derive a recurrence from the final move |
| 39:30–52:45 | Reverse a string | Use two pointers, recursion, or a library API under the stated space constraint |
| 52:45–1:07:20 | StringBuilder/StringBuffer and immutability | Distinguish object mutation from reference reassignment |
| 1:07:30–1:21:50 | Happy number | Repeated digit transformation and cycle detection |

The assignment list has no clearly named direct match for these Day 2 problems. U2_BS_AP_StairCase may be a different “arranging coins” binary-search problem; read its statement before substituting it for Climbing Stairs. See [Assignment_Map.md](Assignment_Map.md).

## 2. Fibonacci: same recurrence, very different algorithms

The Fibonacci sequence is defined by:

~~~text
F(0) = 0, F(1) = 1
F(n) = F(n-1) + F(n-2), for n ≥ 2
~~~

The first values are 0, 1, 1, 2, 3, 5, 8, 13, …. Always state the indexing convention; some questions call 1, 1, 2, … the sequence and shift every index.

### 2.1 Iterative solution

Keep the two previous values. For n ≥ 2, compute the next value, shift the pair, and continue:

~~~text
a = 0                 // F(0)
b = 1                 // F(1)
repeat i = 2..n:
    next = a + b      // F(i)
    a = b
    b = next
return b              // for n ≥ 1
~~~

Handle n=0 explicitly if the method accepts it. The loop performs Θ(n) additions and uses Θ(1) auxiliary space. The output value itself may overflow a fixed-width integer; complexity does not remove that arithmetic limitation.

### 2.2 The bad recursive implementation

The direct translation of the recurrence is:

~~~text
fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)
~~~

For fib(5), the call tree contains repeated calls such as fib(3) and fib(2). The two child calls create a branching tree. With no memoization, the number of calls grows exponentially (Θ(φⁿ), commonly described as O(2ⁿ)); the active recursion depth is Θ(n), so stack space is Θ(n). An outer loop that calls this function for every i makes the total work even larger and is unnecessary if only F(n) is required.

Small inputs can hide this problem. A static call counter is a useful diagnostic, but reset it before each independent run. The exact counts spoken in class are not needed for the proof; the repeated-subproblem tree is the reason for the growth.

### 2.3 Linear recursive version with state

Carry the two consecutive Fibonacci values as parameters so each level advances once:

~~~text
fibState(remaining, a, b):
    if remaining == 0: return a
    return fibState(remaining-1, b, a+b)
~~~

Call fibState(n, 0, 1). For n=5:

~~~text
(5,0,1) → (4,1,1) → (3,1,2) → (2,2,3)
        → (1,3,5) → (0,5,8) → 5
~~~

This performs Θ(n) calls and uses Θ(n) stack space in ordinary Java/C++ implementations. It is tail-shaped, but Java and standard C++ do not promise tail-call elimination, so do not claim Θ(1) space for the recursive version. The iterative version has the same time bound and Θ(1) auxiliary space. Memoization is another correct linear-time approach, using Θ(n) stored values and Θ(n) stack if implemented recursively.

**Exam rule:** recurrence equality alone does not tell you the complexity. Ask whether subproblems are recomputed, whether a cache exists, and how many calls can be active simultaneously.

## 3. Climbing stairs is a counting recurrence

If a staircase has n steps and one move can climb either 1 or 2 steps, partition every route by its final move:

~~~text
ways(n) = ways(n-1) + ways(n-2)
~~~

The two sets are disjoint: a route ends in exactly one final move. Use:

~~~text
ways(0) = 1   // one empty route: choose no moves
ways(1) = 1
~~~

Then ways(2)=2, ways(3)=3, ways(4)=5. For n=4, the routes are 1111, 112, 121, 211, and 22. Under this convention ways(n)=F(n+1). The direct recursive implementation has the same repeated-subproblem problem as Fibonacci; use bottom-up variables, memoization, or an array for an efficient solution.

### 3.1 General jumps from 1 through m

If a move can contain any number 1,2,…,m, partition by the final jump:

~~~text
ways(n,m) = ways(n-1,m) + ways(n-2,m) + … + ways(n-m,m)
~~~

The clean boundary convention is ways(0,m)=1 and ways(x,m)=0 for x<0. Terms with a jump larger than the remaining steps therefore contribute zero. For n=5,m=4, the number of ordered compositions is:

~~~text
ways(5,4) = ways(4,4)+ways(3,4)+ways(2,4)+ways(1,4) = 8+4+2+1 = 15
~~~

For m ≥ n, every composition of n using positive parts is allowed, so the answer is 2^(n-1) for n≥1. Order matters: 113 and 311 are different routes. Without memoization the straightforward recursion branches heavily. A dynamic-programming version computes each ways(i,m) once in O(nm) time and O(n) space; a sliding-window optimisation can reduce the time when the same m is used for every state.

## 4. Reverse a string

### 4.1 Two pointers: the preferred constant-extra-space method

For a mutable character array or C++ string, set left=0 and right=n-1. While left < right, swap the two characters, increment left and decrement right:

~~~text
while left < right:
    swap(s[left], s[right])
    left += 1
    right -= 1
~~~

The loop performs floor(n/2) swaps, which is Θ(n) time—not “n/2 complexity” as a different growth class—and Θ(1) auxiliary space. left < right avoids an unnecessary middle-element swap. left <= right is also correct because the middle swap is harmless, but < states the intent more precisely.

The invariant is: after k iterations, the first k and last k positions are already in their final reversed positions. When the pointers meet or cross, every position is correct. In Java, a String cannot be changed in place; convert to char[], swap, and construct a new String, or use a mutable builder.

### 4.2 Recursive form

The recursive method carries the same two indices:

~~~text
reverse(s, left, right):
    if left >= right: return
    swap(s[left], s[right])
    reverse(s, left+1, right-1)
~~~

Call it with (s,0,s.length()-1). Time is Θ(n), but recursion stack is Θ(n). It is useful for practising base case, progress and state parameters; the loop is usually the better production choice.

### 4.3 Built-in Java API

~~~java
String reversed = new StringBuilder(s).reverse().toString();
~~~

**C++ coding counterpart** (include `<algorithm>` and `<string>`):

```cpp
std::string reversed=s; // copy if original must be retained
std::reverse(reversed.begin(),reversed.end());
```

To reverse the original mutable string, call `std::reverse(s.begin(),s.end())`. C++ value copying differs from Java immutable-string reassignment; see the paired guide.

The Java builder version is concise and correct. It allocates a mutable builder and a resulting String, so it does not meet a strict “no extra space” requirement. The shown C++ copy also takes linear extra storage. Read the problem’s constraint before choosing convenience over the explicit two-pointer method.

## 5. Java String, StringBuilder and StringBuffer

| Type | Mutable? | Thread safety | Typical use |
|---|---|---|---|
| String | No | Immutable object is naturally safe to share | Text that should not be changed |
| StringBuilder | Yes | Not synchronized; not thread-safe | Fast construction in one thread |
| StringBuffer | Yes | Synchronized methods; thread-safe | Shared mutable text when synchronization is required |

“Thread-safe” means concurrent access obeys the class’s synchronization guarantees; it does not mean every larger operation is automatically logically atomic. Synchronization has overhead, which is why StringBuilder is normally preferred in a single-threaded method.

### 5.1 Immutability means the object’s contents do not change

~~~java
String s1 = "kmit";
s1 = s1 + "ng";
~~~

Concatenation creates a new String and changes the local reference s1 to point to it. The original "kmit" object was not modified. If:

~~~java
String s2 = "genesis";
s1 = s2;
s1 = s1 + "ng";
~~~

then s1 refers to "genesisng" while s2 still refers to "genesis". Draw references and heap objects when an output question feels confusing.

s1[0] = 'K' is invalid Java: strings do not support item assignment. Use a character array, modify it, and create a new String, or use StringBuilder.setCharAt/append when mutation is intended.

Repeated String concatenation can create many intermediate objects. A builder keeps a mutable buffer while constructing a large result and converts once with toString().

## 6. Happy number

For a positive base-10 integer, repeatedly replace the number by the sum of the squares of its digits. If the process reaches 1, the number is happy. If it enters the known non-happy cycle, it is not happy.

Example:

~~~text
13 → 1²+3² = 10 → 1²+0² = 1       (happy)
~~~

The lecturer traces non-happy values through the cycle:

~~~text
4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4 → …
~~~

Thus the classroom shortcut is:

~~~text
while n != 1 and n != 4:
    n = sumOfDigitSquares(n)
return n == 1
~~~

For standard decimal happy-number questions, every non-happy positive integer eventually reaches this cycle, so stopping at 4 is valid. A more general and more obviously justified solution stores previously seen values in a set, or uses Floyd’s tortoise-and-hare cycle detection. The set version is O(k) extra space for k visited states; Floyd uses O(1) extra space. For input 0, sumOfDigitSquares(0)=0, so return false rather than looping forever; state the convention if the platform excludes 0.

To extract digits:

~~~text
sum = 0
while n > 0:
    digit = n % 10
    sum += digit * digit
    n /= 10       // integer division
~~~

Do not stop merely because the next value is larger, equal to the original input, or equal to a previous “interesting” example. The sequence can rise before entering its cycle; the stopping condition must be a proven fixed point or repeated state.

For 116:

~~~text
116 → 38 → 73 → 58 → 89 → 145 → 42 → 20 → 4
~~~

so it is not happy. The digit-square helper is a separate reusable function, which makes the main predicate easier to read and trace.

## 7. Day 2 exam checklist

- Can I explain why direct recursive Fibonacci repeats work?
- Can I write iterative Fibonacci and state O(n) time, O(1) auxiliary space?
- Can I derive a staircase recurrence by grouping routes by their final move?
- Do I know the difference between ways(0)=1 and an invalid negative remainder?
- Can I reverse mutable characters with left < right and justify the invariant?
- Can I distinguish a changed String reference from a changed String object?
- Do I know when StringBuilder and StringBuffer differ?
- Can I compute a digit-square sum and stop happy-number iteration using a cycle rule?

The final lecture instruction was to optimise the previous Fibonacci program and continue both previous and Day 2 programs. Do that only after attempting the practice sheet from memory.


## C++ counterpart for the Java reference-reassignment example

```cpp
std::string s2="genesis";
std::string s1=s2; // independent value copy
s1 += "ng";
// s1 is genesisng; s2 remains genesis.
```

C++ strings mutate their own value; `std::string& alias=s1` would share mutations. Java StringBuilder’s shared mutable object is therefore closer to an explicit C++ reference than to this value copy. See [the exam syntax sheet](FS_Java_CPP_Exam_Revision.md) for append, erase, conversion and collections.
