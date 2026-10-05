# DAA — Lecture 1: concepts, worked examples and exam revision

**Context:** FS preparation, 4–8 October 2026. Your supplied plans put the test on 9 October and budget four focused hours per day across all subjects. This lecture is one part of that preparation.

**Source:** your pasted transcript of [Lecture 1](https://youtu.be/2jv5pV_ppgY), ending at about 1:33:55. The lecture itself refers to a previous class; “Day 1” means the first lecture supplied for this study sequence. Explanations below correct transcription slips and inaccurate generalisations. They are not a literal transcript. Some classroom code is only described aloud; reconstructed examples are labelled accordingly.

**Use:** read the core sections, close the notes and attempt [Day 1 practice](Day_01_Practice.md). Consult the reference code only after attempting a solution. The full notes support understanding; the final recall sheet supports revision.

**Language update:** MCQs are Java-only per your latest instruction; coding may be C++. Java examples remain for analysis, with C++ counterparts beside the core algorithms. Use [the hard Java bank](FS_Java_Hard_MCQ_Bank.md) and [syntax/I/O sheet](FS_Java_CPP_Exam_Revision.md).

## 1. What the lecture covers

| Approximate video time | Topic | What you should be able to do |
|---|---|---|
| 0:00–21:30 | Product of every array element except itself | Derive brute force, prefix/suffix products, and analyse time/space |
| 21:30–40:22 | O, Ω and Θ | Define each correctly and prove a bound using constants |
| 40:22–57:59 | Recursion and factorial | Identify base case/progress and trace stack unwinding |
| 58:09–1:01:01 | Arranging letters | Count distinct permutations, including repeated letters |
| 1:01:08–1:18:49 | Head/tail, direct/indirect, tree recursion; decrement traps | Predict output, count calls, separate local and shared state |
| 1:18:54–1:26:27 | Fibonacci | Derive a recurrence and identify repeated subproblems |
| 1:26:36–1:33:55 | Climbing stairs | Count ordered step sequences and explain the Fibonacci relationship |

**Before moving on:** understand an array index, multiplication identity `1`, a function parameter, a return value, and integer division. For example, Java integer `9 / 2` is `4`.

## 2. How to approach an algorithm problem

An algorithm is a finite, precise sequence of steps that transforms an allowed input into the required output. Start by identifying the input, output, constraints and permitted operations. A correct result that violates an explicit restriction is not a valid solution to that problem.

For each problem:

1. Work a tiny example manually.
2. Describe the simplest correct method.
3. Count its work and extra memory.
4. Identify repeated work or useful structure.
5. Improve the method and explain why it remains correct.
6. Test boundary cases and overflow assumptions.

The lecture's interview advice is useful here: explain a working brute-force idea and then optimise it. An accepted solution is more than remembered code; you should be able to justify the steps.

## 3. Product of array except self

### 3.1 Understand the requirement

Given `a`, produce an array `answer` such that `answer[i]` is the product of every input element **except the element at index i**. You exclude one position, not every occurrence of that value.

For `a = [3, 2, 1, 4, 5]`:

| i | Excluded value | Product of remaining values | answer[i] |
|---:|---:|---|---:|
| 0 | 3 | 2 × 1 × 4 × 5 | 40 |
| 1 | 2 | 3 × 1 × 4 × 5 | 60 |
| 2 | 1 | 3 × 2 × 4 × 5 | 120 |
| 3 | 4 | 3 × 2 × 1 × 5 | 30 |
| 4 | 5 | 3 × 2 × 1 × 4 | 24 |

Required lecture target: **linear time, without division**. The closely matching [NeetCode problem](https://neetcode.io/problems/products-of-array-discluding-self/question) is linked for practice.

### 3.2 Three approaches

**Total product then divide.** For this nonzero example, total product is `120`, so `answer[i] = 120 / a[i]`. Two passes give Θ(n) time. But division violates the restriction. Also, this simple formula fails on zeros: `[2,0,4]` should yield `[0,8,0]`, and `0 / 0` is invalid. Zero counting can repair a division-based variant, but does not satisfy the no-division task.

**Brute force.** For each i, start `product = 1`, scan all j and multiply `a[j]` whenever `j != i`. Reset the product for each new i. The spoken transcript briefly mixes i and j; the inner multiplication must use **a[j]**.

```text
for i from 0 to n-1:
    product = 1
    for j from 0 to n-1:
        if i != j:
            product *= a[j]
    answer[i] = product
```

There are n² inner-loop visits and n(n−1) multiplications. Time is Θ(n²). The accumulator uses O(1) auxiliary space, excluding the Θ(n) output array. If you overwrite input while computing later outputs, you may multiply changed values: use a separate output or preserve an input copy.

**Reuse products.** Brute force repeatedly multiplies the same stretches of the array. Save a product from the left and a product from the right; combine them once per index.

### 3.3 The central idea: exclusive prefix and suffix

Define:

```text
left[i]  = product of a[0] ... a[i-1]
right[i] = product of a[i+1] ... a[n-1]
answer[i] = left[i] * right[i]
```

“Exclusive” means a[i] itself is absent. Left and right contain all other positions, exactly once, so their product is precisely the required answer. This is the correctness argument.

At the first position, there is nothing on the left. At the last position, there is nothing on the right. The product of an empty collection is **1**, the multiplication identity. Setting either boundary to zero would destroy the products.

```text
left[0] = 1
for i from 1 to n-1:
    left[i] = left[i-1] * a[i-1]

right[n-1] = 1
for i from n-2 down to 0:
    right[i] = right[i+1] * a[i+1]
```

| i | a[i] | left[i] | right[i] | left[i] × right[i] |
|---:|---:|---:|---:|---:|
| 0 | 3 | 1 | 40 | 40 |
| 1 | 2 | 3 | 20 | 60 |
| 2 | 1 | 6 | 20 | 120 |
| 3 | 4 | 6 | 5 | 30 |
| 4 | 5 | 24 | 1 | 24 |

When calculating left[i], left[i−1] already contains everything before i−1. Multiplying a[i−1] extends that product by one element. This is a **loop invariant**: an assertion that remains true as the loop progresses. The right loop follows the same reasoning in reverse.

Three separate linear passes cost `(n−1) + (n−1) + n = 3n−2` main iterations for n≥1. They give Θ(n) time, not Θ(n³). Left and right are two arrays of length n, so auxiliary space is Θ(n). A constant number of arrays does not change the growth class.

### 3.4 C++ implementation of the lecture method

```cpp
vector<long long> productExceptSelf(const vector<long long>& a) {
    int n = static_cast<int>(a.size());
    if (n == 0) return {};
    vector<long long> left(n, 1), right(n, 1), answer(n);
    for (int i = 1; i < n; ++i)
        left[i] = left[i - 1] * a[i - 1];
    for (int i = n - 2; i >= 0; --i)
        right[i] = right[i + 1] * a[i + 1];
    for (int i = 0; i < n; ++i)
        answer[i] = left[i] * right[i];
    return answer;
}
```

Use the headers and complete program in [day01_reference.cpp](code/day01_reference.cpp). The example assumes every computed product fits in `long long`; a wider type reduces overflow risk but cannot represent arbitrary products. For Java, use `long[]` when the task's bounds require it. Keep problem logic in a method and input/output in main, as your lecturer requested. Java `Arrays.toString(array)` prints a one-dimensional array; primitive-array `clone()` makes a separate array copy and takes linear work.

### 3.5 Optional improvement: O(1) auxiliary space

This is an extension beyond the two-array lecture method. Store the left products directly in the output; carry only a scalar suffix product during the reverse pass.

```text
prefix = 1
for i from 0 to n-1:
    answer[i] = prefix
    prefix *= a[i]

suffix = 1
for i from n-1 down to 0:
    answer[i] *= suffix
    suffix *= a[i]
```

Before each forward iteration, prefix excludes a[i]. Before each reverse iteration, suffix excludes a[i]. Store/use the accumulator **before** including the current element. Time is Θ(n); extra working space is Θ(1), excluding the Θ(n) output. In the executable version, the final unused accumulator updates are omitted to avoid computing the unnecessary full-array product.

### 3.6 Edge cases you must explain

| Input | Expected result | Reason |
|---|---|---|
| `[2,0,4]` | `[0,8,0]` | Only the output at the zero's index excludes the zero |
| `[0,2,0]` | `[0,0,0]` | Every output still includes at least one zero |
| `[-1,2,-3,4]` | `[-24,12,-8,6]` | Multiplication handles signs naturally |
| `[2,2,3]` | `[6,6,4]` | Exclude one index, not all equal values |
| `[7]` | `[1]` under our extension | All remaining positions form an empty product |
| `[]` | `[]` under our extension | No output positions |

The judge may restrict n to at least two; singleton/empty cases above describe the provided function's convention, not a claim about every platform's inputs.

## 4. Time and space complexity

### 4.1 What is being measured?

Time complexity describes how the amount of work grows with input size n. It is not an exact stopwatch prediction. Space complexity describes memory growth. State whether you count input, output, auxiliary arrays and the recursion stack.

Typical increasing growth rates are:

```text
1 < log n < n < n log n < n² < n³ < 2ⁿ < n!
```

This is an eventual growth comparison, not an inequality guaranteed for every small n. At n=1,000, n is 1,000 while n² is 1,000,000. At n=1,000,000, n² is 10¹². That is why eliminating repeated work matters.

### 4.2 O, Ω and Θ: the correct meanings

For eventually nonnegative f and g, use positive constants that do **not** depend on n:

| Notation | Meaning | Requirement for every n ≥ n₀ |
|---|---|---|
| f(n) ∈ O(g(n)) | Asymptotic upper bound | f(n) ≤ c·g(n) |
| f(n) ∈ Ω(g(n)) | Asymptotic lower bound | f(n) ≥ c·g(n) |
| f(n) ∈ Θ(g(n)) | Tight asymptotic bound | c₁·g(n) ≤ f(n) ≤ c₂·g(n) |

Many books write `f(n) = O(g(n))`; this is conventional notation for membership in a class of functions.

**Important lecture correction:** O is not the definition of worst case, Ω is not the definition of best case, and Θ is not the definition of average case. First choose the function you are analysing—best-case, worst-case, average-case, or another cost function—then bound its growth. Average-case analysis requires assumptions about input probabilities. [MIT's notation notes](https://ocw.mit.edu/courses/6-080-great-ideas-in-theoretical-computer-science-spring-2008/4c40dede95d3b2fe07e6aa435b46b471_lec7.pdf) distinguish upper, lower and tight bounds.

For linear search, the best-case cost can be Θ(1), the worst-case cost Θ(n), and the average cost Θ(n) under the model of a present target equally likely at every position. All three functions can be discussed using O, Ω or Θ. For standard binary search on a sorted array, a target found at the initial midpoint gives best-case Θ(1); worst-case is Θ(log n).

For n below n₀, the defining inequality need not hold. It also need not fail there. The threshold marks where the guarantee starts; it does not force the curves to cross.

### 4.3 Worked proof: 3n + 2

Choose g(n)=n. For n≥2:

```text
3n ≤ 3n + 2 ≤ 4n
```

The lower inequality is immediate. The upper follows because `2 ≤ n`.

Therefore c₁=3, c₂=4, n₀=2 prove `3n+2 ∈ Θ(n)`. For the upper bound alone, c=4 works; **4 is the constant, 2 is the threshold**. They are different quantities.

O(n²) is also a valid upper bound here, but looser. Big O does not automatically mean “the tightest bound”; choose an informative bound and use Θ when you have both sides.

### 4.4 Worked proof: 10n² + 4n + 2

For n≥5:

```text
10n² ≤ 10n² + 4n + 2 ≤ 11n²
```

The upper bound needs `4n+2 ≤ n²`. At n=5, `22 ≤ 25`; as integer n increases, `n²−4n−2` increases, so it remains true. The lecture checks n=4: `178 > 176`, showing that n₀=4 does not work for this particular choice c=11.

Thus c₁=10, c₂=11, n₀=5 prove Θ(n²). Constants and thresholds are not unique. An easier alternative is `10n²+4n+2 ≤ 16n²` for n≥1. A quadratic **cost function** cannot have a linear upper bound; merely having n² in a problem's mathematical input expression does not prove that an algorithm needs quadratic time.

### 4.5 Count iterations, not the appearance of loops

| Pattern | Work | Tight time bound |
|---|---|---|
| Three separate length-n loops | n+n+n | Θ(n) |
| Length-n loop inside length-n loop | n·n | Θ(n²) |
| Inner loop visits j<i | 0+1+…+(n−1) | Θ(n²) |
| Inner loop always visits five items | 5n | Θ(n) |
| Repeatedly halve a positive size | About log₂n reductions | Θ(log n) |
| Length-n loop with a halving loop inside | n·log n | Θ(n log n) |
| Two recursive calls on n−1 | Binary branching | Θ(2ⁿ) with constant work per call |

Nested loops are not automatically quadratic. Bounds, how indices move, and work inside the body all matter. Likewise, one printed value does not mean one constant-time computation if producing it requires a recursive tree.

## 5. Recursion: solve a smaller instance

A function is recursive when it eventually calls itself, directly or through other functions. Useful terminating recursion needs:

1. **A base case:** an instance you can answer immediately.
2. **A recursive rule:** express the answer using smaller instances of the same problem.
3. **Progress:** each path must reach a base case.
4. **Correct combination:** use returned results to construct the current answer.

Example template:

```text
solve(instance):
    if instance is a base case:
        return known answer
    smallerAnswer = solve(smaller instance)
    return combine(instance, smallerAnswer)
```

A base case present in the code is not enough: `f(n)` calling `f(n)` for positive n never reaches `n==0`. Validate the input domain too; negative input to a factorial routine intended for n≥0 may otherwise recurse indefinitely.

Breaking an Amazon-like system into payments/catalogue/cart illustrates problem decomposition, but not every decomposition is recursion. Recursive subproblems are instances of the same kind of problem.

### 5.1 What the stack stores

Every active call has a frame with its parameters, local state and information needed to resume the caller. The caller waits at the recursive call until the child returns. Returning removes a frame; the most recent active call returns first (LIFO).

Different calls have distinct local variables even if all are named n. Java passes the value of a primitive argument, so changing a child call's local n does not change its parent's local n. A static field is shared class state; a counter there accumulates across calls and should be reset before another experiment.

Auxiliary stack space depends on the **maximum simultaneously active depth**, not the total number of calls over the entire run.

## 6. Factorial and permutations

### 6.1 Recurrence and trace

For nonnegative integers, `0! = 1`, `1! = 1`, and `n! = n·(n−1)!` for n≥2.

```java
static long factorial(int n) {
    if (n < 0) throw new IllegalArgumentException("n must be nonnegative");
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
```

**C++ coding counterpart** (assume `<iostream>` / `<stdexcept>` as needed; place functions outside main):

```cpp
long long factorial(int n) {
    if(n<0 || n>20) throw std::invalid_argument("0..20 required");
    return n<=1 ? 1 : n*factorial(n-1);
}
```

Trace factorial(4):

```text
Descend:  f(4) waits for 4 × f(3)
          f(3) waits for 3 × f(2)
          f(2) waits for 2 × f(1)
          f(1) returns 1

Unwind:   f(2) returns 2 × 1 = 2
          f(3) returns 3 × 2 = 6
          f(4) returns 4 × 6 = 24
```

With the n≤1 base case, f(0) is not called during f(4). Four calls are made and maximum factorial-call depth is four. The recurrence `T(n)=T(n−1)+Θ(1)` gives Θ(n) time and Θ(n) stack space. Iterative factorial has Θ(n) time and Θ(1) auxiliary space.

`return n * factorial(n-1)` is **not tail recursion**: multiplication still has to happen after the recursive result returns. The lecturer's informal head/tail classification here is insufficient. The precise tail-call test is whether anything remains to be computed after the recursive call.

For fixed-width arithmetic, signed 64-bit integers hold 20! but not 21!. The reference function limits input to 0…20. Complexity statements here use the usual fixed-width, constant-cost arithmetic model, not arbitrary-precision arithmetic.

### 6.2 Count arrangements: permutations, not combinations

For n distinct letters, choose among n letters for the first position, n−1 for the next, and so on: **n! arrangements**. Order matters, so these are permutations.

`KMIT` and `NGIT` separately each have four distinct letters: `4! = 24`.

If letters repeat with frequencies r₁,r₂,…, divide out the indistinguishable reorderings:

```text
distinct arrangements = n! / (r₁! × r₂! × ...)
```

`KMITNGIT` has eight letters, with I twice and T twice:

```text
8! / (2! × 2!) = 40,320 / 4 = 10,080
```

For `AAB`, `3!/2! = 3`, and the strings are AAB, ABA, BAA. Counting is different from generating every arrangement; generation requires additional recursion/backtracking ideas not taught fully here.

## 7. Recursion types and output questions

These categories describe different properties and can overlap. Direct/indirect describes which functions call each other; head/tail describes pending work; linear/tree describes branching. The following Java snippets reconstruct the flows described in the transcript.

### 7.1 Head-style: work after recursion

```java
static void head(int n) {
    if (n <= 0) return;
    head(n - 1);
    System.out.print(n + " ");
}
```

**C++ coding counterpart** (assume `<iostream>` / `<stdexcept>` as needed; place functions outside main):

```cpp
void head(int n) {
    if(n<=0) return;
    head(n-1);
    std::cout<<n<<' ';
}
```

`head(4)` descends to head(0), then prints on return: **1 2 3 4**. Each frame remembers its own n. Time Θ(n), stack Θ(n). A base-case guard can come before the recursive call; “first operation” means first substantive operation after that guard.

### 7.2 Tail-style: work before recursion

```java
static void tail(int n) {
    if (n <= 0) return;
    System.out.print(n + " ");
    tail(n - 1);
}
```

**C++ coding counterpart** (assume `<iostream>` / `<stdexcept>` as needed; place functions outside main):

```cpp
void tail(int n) {
    if(n<=0) return;
    std::cout<<n<<' ';
    tail(n-1);
}
```

`tail(4)` prints **4 3 2 1** on descent. Nothing remains after the child returns, so the call is in tail position. For ordinary Java recursion, analyse this as Θ(n) time and Θ(n) stack; do not assume the runtime converts it to a constant-space loop. For C++, do not rely on tail-call optimisation unless explicitly guaranteed for the setting.

An accumulator version of factorial can be tail recursive: `factTail(n, acc)` returns acc at n≤1 and otherwise returns `factTail(n−1, acc*n)`. This changes pending work, not the number of arithmetic steps.

### 7.3 Direct and indirect recursion

Direct: A calls A. Indirect: A calls B and B eventually calls A. A→B→C without a path back is not recursion.

Reconstruction of the lecture's indirect example:

```java
static void A(int n) {
    if (n <= 0) return;
    System.out.print(n + " ");
    B(n - 1);
}
static void B(int n) {
    if (n <= 0) return;
    System.out.print(n + " ");
    A(n / 2);
}
```

**C++ coding counterpart** (assume `<iostream>` / `<stdexcept>` as needed; place functions outside main):

```cpp
void B(int n); // forward declaration for the indirect cycle
void A(int n) {
    if(n<=0) return;
    std::cout<<n<<' '; B(n-1);
}
void B(int n) {
    if(n<=0) return;
    std::cout<<n<<' '; A(n/2);
}
```

```text
A(10) → B(9) → A(4) → B(3) → A(1) → B(0)
Printed: 10 9 4 3 1
```

B(0) is called but prints nothing. Positive values shrink by roughly half per pair of calls, giving Θ(log n) time and depth for large positive n. Both guards make this example clear; it is not a general rule that every function in an indirect cycle needs its own guard—what matters is that every path terminates.

### 7.4 Linear and tree recursion

Linear recursion has at most one recursive child per call. Tree recursion can create multiple children. Tree recursion is not automatically exponential: subproblem sizes and number of children determine the cost.

Reconstruction of the lecture's shared-count example:

```java
static int count = 0;
static void tree(int n) {
    count++;
    if (n <= 0) return;
    System.out.print(n + " ");
    tree(n - 1);
    tree(n - 1);
}
```

**C++ coding counterpart** (assume `<iostream>` / `<stdexcept>` as needed; place functions outside main):

```cpp
int calls=0; // reset before each independent experiment
void tree(int n) {
    ++calls;
    if(n<=0) return;
    std::cout<<n<<' ';
    tree(n-1); tree(n-1);
}
```

For tree(2), with count reset to zero:

```text
                 tree(2)
                /       \
          tree(1)       tree(1)
          /    \        /    \
      tree(0) tree(0) tree(0) tree(0)
```

Seven calls occur, including the four base-case calls. **Printed values: 2 1 1. Counter: 7. Maximum depth: 3.** Printing is inside the guard; counting is before it. If count++ moves inside the positive-n branch, the count becomes 3.

For input n≥0, call count C(n) satisfies `C(0)=1`, `C(n)=1+2C(n−1)`, so `C(n)=2^(n+1)−1`. Time Θ(2ⁿ), stack Θ(n). The binary tree is visited sequentially; all nodes are not simultaneously on the call stack. The complete function is not tail recursive: the first child has the second child still pending.

### 7.5 Nested recursion

Nested recursion uses a recursive result as an argument to another recursive call, for example the structural form `f(f(n−1))`. The inner call must return before the outer call can start. The transcript mentions this category without a complete worked function; no exact output or universal complexity can be inferred without its base case and rule.

## 8. The n−1, n-- and --n trap

Suppose the caller's local n is initially 2:

| Call expression | Value passed to child | Caller's local n after argument evaluation |
|---|---:|---:|
| `f(n - 1)` | 1 | 2 |
| `f(n--)` | 2 | 1 |
| `f(--n)` | 1 | 1 |

In Java, postfix decrement updates the local variable while evaluating the argument but the **expression's value is the old value**. It is misleading to say the decrement waits until the recursive call returns. Prefix decrement's expression value is the new value. [Java language specification, decrement operators](https://docs.oracle.com/javase/specs/jls/se10/html/jls-15.html#jls-15.14.3).

For a function whose only stopping condition is n≤0, `f(n--)` on positive n can keep passing the same positive value into a fresh child frame:

```text
f(2) calls f(2), which calls f(2), which calls f(2), ...
```

The parent's local value decreases, but the child receives 2. In an ordinary finite-stack execution, this ends in a stack overflow, not a successful return. `f(--n)` can reach the base case, but mutates local state; with two recursive calls, subsequent calls may receive different arguments. Prefer `f(n−1)` when you intend two independent subproblems of size n−1. This example is analysed under Java semantics; do not transfer rules blindly to compound C++ expressions.

## 9. Fibonacci and repeated subproblems

### 9.1 Define the quantity before coding

Use zero-based Fibonacci indexing:

```text
F(0)=0, F(1)=1
F(n)=F(n−1)+F(n−2), for n≥2
```

| n | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| F(n) | 0 | 1 | 1 | 2 | 3 | 5 | 8 | 13 | 21 | 34 | 55 |

F(2)=1 can be an additional base case, as in part of the lecture, but it is not necessary. The reference implementation uses only 0 and 1. Different base cases can change the exact call count while leaving the returned values correct.

```java
static long fib(int n) {
    if (n < 0) throw new IllegalArgumentException("n must be nonnegative");
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);
}
```

**C++ coding counterpart** (assume `<iostream>` / `<stdexcept>` as needed; place functions outside main):

```cpp
long long fib(int n) {
    if(n<0 || n>30) throw std::invalid_argument("small naive demo only");
    return n<2 ? n : fib(n-1)+fib(n-2);
}
```

This returns **one Fibonacci number**. It does not print the whole series. “First seven terms” means F(0)…F(6), whereas F(7) alone is 13.

### 9.2 Why naive recursion is expensive

F(5) needs F(4) and F(3). F(4) also needs F(3); both of those require F(2). These are repeated subproblems. A recursive call does not automatically remember a completed result for use in a later call.

```text
F(5)
├── F(4)
│   ├── F(3)
│   │   ├── F(2)
│   │   └── F(1)
│   └── F(2)
└── F(3)
    ├── F(2)
    └── F(1)
```

The F(2) nodes still expand to F(1) and F(0); the diagram abbreviates them. Under the 0/1-only base cases, the full evaluation of F(5) makes 15 calls.

`T(n)=T(n−1)+T(n−2)+Θ(1)`. Runtime is exponential: O(2ⁿ) is a convenient upper bound; the tighter growth is Θ(φⁿ), where φ≈1.618. Maximum stack depth is Θ(n), because each active path decreases n; the two branches execute one after the other.

### 9.3 DP preview, not a new required Day 1 unit

The lecture introduces storing previous answers and defers detailed dynamic programming to later. That idea is **memoisation**: check a cache, compute a missing value once, save it, reuse it. It retains recursive calls.

| Method | Main idea | Time | Auxiliary space |
|---|---|---|---|
| Naive recursion | Recompute each request | Exponential | Θ(n) stack |
| Memoised recursion | Cache F(0)…F(n) | Θ(n) | Θ(n) cache and stack |
| Iterative table | Build answers in order | Θ(n) | Θ(n) table |
| Two-value iteration | Retain only previous two values | Θ(n) | Θ(1) |

These bounds assume representable fixed-width arithmetic. For recursion-only classroom exercises, implement the recursive version first. A large-input judge may require memoisation or iteration to meet its runtime limit. You should understand both the teacher's exercise constraint and the judge's constraints.

## 10. Climbing stairs: derive the recurrence

### 10.1 Count ordered sequences

There are n steps. Each move is one or two steps. W(n) is the number of ordered sequences of moves that total n. At n=3:

```text
1+1+1, 1+2, 2+1 → 3 ways
```

1+2 and 2+1 are different because move order matters. At n=4:

```text
1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2 → 5 ways
```

### 10.2 Why addition is correct

Every route ends in exactly one of two ways:

- A last move of one step, preceded by a route to n−1: W(n−1) possibilities.
- A last move of two steps, preceded by a route to n−2: W(n−2) possibilities.

These groups are disjoint and cover every route, so:

```text
W(n)=W(n−1)+W(n−2)
W(0)=1, W(1)=1
```

W(0)=1 means there is one empty sequence of moves. This makes W(2)=W(1)+W(0)=2. If your course specifies only positive n, using the explicit bases W(1)=1 and W(2)=2 is equivalent for that domain. Do not set W(0)=0 and then use this same recurrence at n=2: you would get the wrong answer.

```cpp
long long waysRecursive(int n) {
    if (n < 0) return 0;  // overshooting is not a valid route
    if (n == 0) return 1;
    return waysRecursive(n - 1) + waysRecursive(n - 2);
}
```

| n steps | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| W(n) | 1 | 1 | 2 | 3 | 5 | 8 | 13 | 21 | 34 | 55 | 89 |

**W(n)=F(n+1)**, not F(n), under the indexing above. The spoken classroom discussion temporarily mixes the number of steps and answers; the five-step case has eight routes, while four steps has five. Six steps has thirteen; eight steps has thirty-four.

Naive recursion is exponential with Θ(n) stack space. Memoised recursion computes each remaining-step count once, giving Θ(n) time and Θ(n) auxiliary space. Iteration with two previous counts gives Θ(n) time and Θ(1) space. Attempt a small recursive version to learn the lecture, then implement an efficient version for [Climbing Stairs](https://neetcode.io/problems/climbing-stairs/question) if needed.

**Transfer test:** if moves can be 1, 2 or 3, the recurrence changes to W(n−1)+W(n−2)+W(n−3), with W(0)=1 and W(negative)=0. Do not reuse a Fibonacci recurrence merely because the story mentions stairs.

## 11. Common mistakes to eliminate

| Mistake | Correct rule |
|---|---|
| Prefix product includes the current element | Product-except-self needs exclusive prefixes/suffixes |
| Boundary product is zero | Empty product is one |
| Three linear passes are cubic | Sequential costs add; nested independent costs multiply |
| Big O means worst, Θ means average | Bounds and input-case choice are separate |
| The bound must fail before n₀ | There is simply no requirement there |
| Recursive call is last in a return expression, so it is tail | Check pending multiplication/addition after the call |
| Base case exists, therefore recursion terminates | Every recursive path must reach it |
| Every call named n shares the same n | Local parameters belong to individual frames |
| Call count equals print count | Base-case calls can be counted without printing |
| Exponential calls imply exponential stack space | Count maximum active depth separately |
| n-- passes n−1 | Postfix passes the old value |
| Staircase ways equal F(n) | Here W(n)=F(n+1) |

## 12. Closed-book final recall sheet

- Product except self: **exclusive left × exclusive right**, boundaries 1. Brute force Θ(n²); prefix/suffix Θ(n). Output reuse gives O(1) auxiliary memory.
- O upper, Ω lower, Θ tight; specify the case/function separately.
- `3n+2`: Θ(n), witnesses 3,4,2. `10n²+4n+2`: Θ(n²), witnesses 10,11,5.
- Recursion: base case + progress + smaller-instance rule + correct combination.
- Factorial: 0!=1; n!=n·(n−1)!; Θ(n) time/stack recursively; ordinary factorial is not tail recursive.
- Arrangements: n! for distinct letters; divide by factorials of repeated-letter frequencies.
- Head example prints on return; tail example prints on descent.
- tree(2): prints 2,1,1; seven calls; depth three for the specified counter placement.
- Java arguments: n−1 passes the new expression value without mutation; n-- passes old n; --n passes decremented n.
- F(0)=0, F(1)=1; naive Fibonacci repeats subproblems; caching avoids that work.
- Staircase: W(0)=1, W(1)=1; W(n)=W(n−1)+W(n−2)=F(n+1); W(10)=89.

You have a usable foundation when you can justify these statements and solve a changed small example without these notes. A few familiar solutions alone cannot guarantee mastery of every unseen question.
