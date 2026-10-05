# DAA Day 3 — Euclid's GCD and strobogrammatic numbers

**Source:** your [unedited Day 3 transcript](sources/Day_03_Transcript.txt), approximately 80 minutes. The lecturer refers to earlier GCD work that is not present in the supplied Day 1/2 transcripts; this file introduces the prerequisite explicitly. Code described aloud is reconstructed, not a transcription of a visible source file.

**FS use:** [coding practice](Day_03_Practice.md) covers recursion and arrays/strings. [The 30-question MCQ bank](Day_03_MCQ.md) covers all lecture topics, including primality, library-operation cost, bugs and intermediate states. Follow [the updated workflow](Study_Workflow.md); no greedy method was taught in this lecture.

**Language update:** study Java code scenarios in [the hard bank](FS_Java_Hard_MCQ_Bank.md); submit C++ using [the existing references](code/day03_reference.cpp) and [the I/O revision sheet](FS_Java_CPP_Exam_Revision.md).

## 1. What was discussed

| Time | Topic | Exam skill |
|---|---|---|
| 0:00–4:55 | GCD by factors and a frequency map | Identify brute-force work, repeated values and factor counting |
| 4:55–19:45 | Euclidean algorithm, array reduction, iteration and recursion | Trace remainder updates, prove progress, handle zero/signs and early exit |
| 20:00–33:20 | Strobogrammatic digits and the n−2 pattern | Separate palindrome from rotation symmetry |
| 34:00–48:30 | Recursive generation and sorting | Trace return values, empty-string base, interior zeros and output cost |
| 49:30–1:12:25 | Check one number using a map, conditionals or an array | Validate every mirrored pair, including the centre; compare methods |
| 1:12:30–1:15:30 | Strobogrammatic prime | Combine predicates, short circuit and analyse primality snippets |
| 1:15:35–1:18:10 | Strobogrammatic palindrome | Derive the intersection and distinguish validity from enumeration |

## 2. GCD: definition and a brute-force baseline

For integers a and b, the greatest common divisor is the largest **nonnegative** value dividing both, with `gcd(a,0)=|a|`. For this package `gcd(0,0)=0`, a useful computational convention; there is no largest positive divisor of two zeros. For positive inputs the GCD is positive.

- `gcd(10,20,35)=5`: common positive factors are 1 and 5.
- `gcd(10,13,27)=1`: there is no larger shared factor.
- `gcd(-14,6)=2`: signs do not affect divisibility after normalization.

The lecture's baseline scans i from 1 through each positive number x and increments `frequency[i]` when `x % i == 0`. A factor common to every input position has frequency equal to the number of positions. Choose the largest such factor.

For positive `x1...xk`, scanning all those ranges costs Θ(sum xi) divisibility checks, plus map processing; it can store up to O(M) distinct keys for M=max xi. This is a bound in the **numeric magnitudes**, not merely the number k of array elements. Repeated input values must still count as separate positions: `[6,6,10]` has GCD 2. Deduplicating the inputs but continuing to compare with k=3 would break the frequency rule. Scan each factor only once per input; a square-root factor-pair optimisation must avoid inserting a perfect square's root twice.

The original factor scan does not directly handle zero, whose divisors are not a finite list. Euclid handles zeros cleanly and eliminates the factor map.

## 3. Euclid: replace a large pair by a smaller equivalent pair

The key identity is:

```text
gcd(a,b) = gcd(b, a % b), when b != 0
```

Why it is true: write `a=q*b+r`. A number dividing a and b divides `r=a−q*b`. Conversely, a number dividing b and r divides `a=q*b+r`. The two pairs therefore have exactly the same common divisors.

For nonnegative a and positive b, `0 <= r < b`. After the update, the second argument strictly decreases, so the process terminates. You may begin with a<b; the first update exchanges their roles.

### 3.1 Iteration trace

```text
while b != 0:
    r = a % b
    a = b
    b = r
return a
```

For (10,77):

| Iteration | a before | b before | r = a % b | New (a,b) |
|---:|---:|---:|---:|---|
| 1 | 10 | 77 | 10 | (77,10) |
| 2 | 77 | 10 | 7 | (10,7) |
| 3 | 10 | 7 | 3 | (7,3) |
| 4 | 7 | 3 | 1 | (3,1) |
| 5 | 3 | 1 | 0 | (1,0) |

At the loop exit, **return a**, which is 1. Returning b here would return zero. The classroom variant that detects `r==0` *before* updating may return the current b; keep the return expression consistent with the observation point.

Incorrect update order destroys the old operands:

```text
a = b
b = a % b     // now a equals b, so this remainder is always zero
```

For (14,6), this broken loop returns 6 instead of 2. Compute the remainder first or save the old b in a temporary variable.

### 3.2 Recursive version

```text
gcd(a,b):
    if b == 0: return a
    return gcd(b, a % b)
```

Example: `(14,6) → (6,2) → (2,0) → 2`. The recursive call must pass **b as its first argument**. The transcript initially says `gcd(a,a%b)` but later corrects it to `gcd(b,a%b)`. The initial version is wrong: with (14,6) it reaches (14,0) and returns 14.

The base condition must precede the modulus; `% 0` is invalid. A recursive call does not by itself guarantee efficiency or termination: inspect the changing arguments.

### 3.3 Complexity and arithmetic assumptions

With positive a,b and fixed-width arithmetic treated as O(1), Euclid needs O(log(min(a,b))) remainder operations, with an additive constant for a<b/very small arguments. Consecutive Fibonacci numbers yield the slow worst-case shrinkage; not every input takes logarithmically many steps. The iterative method uses O(1) auxiliary space. The recursive method uses O(log(min(a,b))) stack space in the worst case; tail-call elimination is not guaranteed.

These bounds describe arithmetic-operation counts. If inputs are arbitrary-precision integers, division/remainder cost itself depends on operand bit length.

Normalize signs before tracing. Taking the absolute value of the smallest signed integer in the same type cannot produce a representable positive value. For Java int inputs, widen to long *before* applying `Math.abs`; for the C++ reference we reject the minimum signed 64-bit input explicitly.

## 4. GCD of an array is a reduction

Use associativity:

```text
gcd(x0,x1,x2,...) = gcd(gcd(gcd(x0,x1),x2),...)
```

One clear implementation starts with `g=0`, then replaces g with `gcd(g,x)` for each element. Because `gcd(0,x)=|x|`, this handles the first value and zeros naturally. An empty array returns 0 by the package's documented convention.

For `[10,20,50,77,100]`, the successive accumulated GCDs are `10,10,10,1`; stop before 100. Once the accumulated GCD is positive, it can stay the same or decrease as more numbers are included. A prefix consisting only of zeros has GCD 0, which can become positive when the first nonzero value arrives. Once the GCD is 1, `gcd(1,x)=1` for any integer x, so early exit is correct. Returning immediately for g=0 is wrong: `[0,0,6]` should return 6.

For k inputs bounded in magnitude by M, O(k log(M+1)) is a safe upper bound for sequential Euclid calls. Early exit improves some cases without changing that upper bound. Separately reading/parsing all k inputs may still cost Θ(k), even if the reduction stops early; a question must specify which stage it measures.

## 5. A strobogrammatic number survives a 180° rotation

Use the conventional digit shapes and mapping for these problems:

| Digit | Rotated digit |
|---|---|
| 0 | 0 |
| 1 | 1 |
| 6 | 9 |
| 8 | 8 |
| 9 | 6 |
| 2,3,4,5,7 | Invalid |

A whole-string rotation reverses the order **and** maps each digit. If R is this mapping, then the rotated string is `R(last) ... R(first)`. For n characters, validity requires:

```text
R(s[i]) == s[n-1-i] for every position i
```

Examples:

| String | Palindrome? | Strobogrammatic? | Why |
|---|---|---|---|
| `69` | No | Yes | Reverse order and swap 6↔9 |
| `6889` | No | Yes | Outer 6↔9, inner 8↔8 |
| `121` | Yes | No | 2 is not rotatable |
| `66` | Yes | No | Rotates to 99 |
| `101` | Yes | Yes | All mirrored digits map correctly |
| `6` | Yes | No | A single digit is a palindrome, but rotates to 9 |
| `8` | Yes | Yes | The centre maps to itself |

Therefore “all digits are in 0,1,6,8,9” is necessary but insufficient: `68` uses allowed digits yet fails the pairing rule. Palindrome checking alone also fails.

Use strings for digit problems. They preserve length and avoid converting a long decimal representation into an overflowing integer. Decide representation rules: the reference rejects empty input, non-digits and leading zeros except the single string `"0"`. Internal strings used during generation may contain leading zeros.

## 6. Checking one input: two pointers, not full enumeration

Start left=0 and right=n−1. While **left <= right**:

1. Look up the rotated value of the left digit.
2. If the digit is invalid, return false.
3. If its mapped value differs from the right digit, return false.
4. Increment left and decrement right.

If every comparison succeeds, return true. This time the centre **must** be checked: in `161`, the outer 1s pass but the central 6 does not map to itself. Using only `<` can incorrectly accept the string.

For `689`: compare R(6)=9 with the rightmost 9, then R(8)=8 with the centre. True. For `121`: outer pair succeeds, centre lookup is invalid. False. For `1021`: outer pair succeeds; R(0)=0 does not match 2. False.

The invariant is that every examined outer pair has the required rotation relationship. Failure at any pair disproves the property; after all pairs including any centre are checked, the invariant covers the entire input.

### 6.1 Three equivalent representations

- **Map:** five entries, including 0→0; explicit key-presence check avoids accidental defaults.
- **Direct lookup array:** `[0,1,-1,-1,-1,-1,9,-1,8,6]`; index by `character−'0'`. Validate digit characters before indexing. −1 means invalid.
- **Conditionals/switch:** handle exactly (0,0), (1,1), (8,8), (6,9), (9,6). Equality alone also accepts (2,2), which is wrong.

All three have Θ(n) worst-case time and **O(1) auxiliary space**, because the digit alphabet is fixed. A map has higher constant overhead than a ten-entry array, but it is not O(n) space here. “No extra space” interview phrasing often means no storage growing with input; if a literal no-table restriction is given, use the conditional form.

The recursive interval checker is Θ(n) time and Θ(n) stack when the string is shared by reference and each call checks one pair. In C++, passing the entire n-character string by value at every level adds Θ(n) copying per call: Θ(n²) total copying and potentially Θ(n²) peak character storage across Θ(n) active frames. Always inspect parameter passing when analysing a recursion snippet.

The generate-all-then-search approach wastes work when the question asks about one number. A built-in `contains` on a list normally scans it; it does not automatically become a hash lookup. With Q strings of length n, generation needs at least Ω(nQ) output work, and a linear membership scan can take O(nQ) character work in the worst case. The direct checker stays Θ(n).

## 7. Generate every n-digit strobogrammatic number recursively

This is a **different output requirement**: enumeration is needed now. Build a valid middle of length n−2, then wrap it with a rotatable pair.

```text
pair choices: (0,0), (1,1), (6,9), (8,8), (9,6)
new string = leftDigit + middle + rightDigit
```

Carry two parameters: remaining length r and original total length N. N never changes. The recursive call uses `(r−2,N)`; r==N means we are building the outermost layer.

### 7.1 The two base cases are collections

```text
helper(0,N) = [""]              // one element: the empty middle
helper(1,N) = ["0","1","8"]
```

`[""]` has size **1**, not 0. It supplies one middle that can be wrapped. Returning `[]` makes the next loop run zero times and destroys every even-length output. An odd centre may only be 0,1 or 8; 6 and 9 cannot map to themselves.

The package's public generator only accepts positive N. The helper's r=0 base is a construction device, not a claim that an empty string is a positive-length number.

### 7.2 Interior zeros are valid; outer leading zeros are not

Include the (0,0) pair when **r != N**. Omit it at the outermost layer. A middle `"00"` is needed to generate `1001`, `6009`, `8008`, `9006`. Allowing (0,0) at the outside produces `0110`, which is not a canonical four-digit number. Removing (0,0) at every layer loses valid outputs.

Trace N=4:

```text
helper(4,4) → helper(2,4) → helper(0,4)
helper(0,4) returns [""]
helper(2,4) returns ["00","11","69","88","96"]
helper(4,4) wraps each middle using four NONZERO outer pairs
```

Each of the five middles yields four final strings: 20 total. For middle `"00"`, outputs include `1001,6009,8008,9006`; for `"69"`, they include `1691,6699,8698,9696`.

For N=3: call `(3,3)→(1,3)`; the three centre choices each yield four outputs. In sorted order:

```text
101,111,181,609,619,689,808,818,888,906,916,986
```

N=4 is generated from length 2, not from length 3. Length parity remains the same during the descent. N=6 follows 6→4→2→0. There are four active helper frames at the deepest point, even though there are 100 final strings.

### 7.3 Correctness and duplicate reasoning

Every generated string has a valid middle and a valid outer pair, so it is valid. Conversely, any valid string must have one of the permitted outer pairs and a valid middle; recursion reaches the base for that middle, so it is generated. Different outer pairs or middles produce different strings, so no deduplication set is needed.

### 7.4 Output-sensitive complexity

Let Q(N) be the final count, excluding outer leading zeros:

| N | Count |
|---:|---:|
| 1 | 3 |
| 2 | 4 |
| 3 | 12 |
| 4 | 20 |
| 5 | 60 |
| 6 | 100 |

For N=2k, k≥1: `Q=4*5^(k−1)`. For N=2k+1, k≥1: `Q=12*5^(k−1)`. The first outer pair has four choices; each subsequent pair has five; an odd centre has three.

Writing Q strings of length N already costs Θ(NQ) characters. The returned-list recursive construction has Θ(NQ) generation time, Θ(NQ) peak storage including output/intermediate lists, and Θ(N) recursion depth. It is not O(N) time merely because the helper descends through O(N) length values. The loop over generated middles does exponential output work during unwinding.

Classroom output is sorted so judge formatting agrees. Sorting Q fixed-length strings adds O(NQ log Q) worst-case character-comparison work. Unsorted construction order need not be numeric order. Lexicographic and numeric order agree for equal-length digit strings; across lengths they differ (`"11" < "8"` lexicographically, but 11>8 numerically).

## 8. MCQ focus: strobogrammatic prime

A prime integer is **at least 2** and has exactly two positive divisors: 1 and itself. Thus 0 and 1 are not prime. Use:

```text
strobogrammatic(s) AND prime(valueOf(s))
```

The lecture's examples: 101 and 181 are prime and strobogrammatic; 69 is strobogrammatic but divisible by 3. 11 is also both. Single-digit 0,1,8 are all non-prime. Primality itself was proposed as a separate method; no full primality implementation or trial-division explanation was supplied in this transcript. The following analysis is added for your code-scenario MCQs.

### 8.1 Why trial division ends at the square root

If n=a*b is composite and both a,b were greater than √n, their product would exceed n. At least one factor is therefore at most √n. After rejecting n<2, it suffices to test divisors from 2 through **floor(√n), inclusive**.

A snippet using `d*d < n` misses squares like 49: the last required candidate is d=7. A snippet returning true after the first non-dividing candidate misses later factors: 9 is not divisible by 2 but is divisible by 3. Return true only after all required candidates fail to divide.

Under constant-time fixed-width operations, trial division has O(√n) worst-case time and O(1) auxiliary space. This is a bound in the numeric value n. A d-digit input may be as large as approximately 10^d; it is not O(√d).

### 8.2 Overflow, parsing and short circuit

`d*d` can overflow a 32-bit signed integer. For positive n,d, `d <= n/d` expresses the stopping comparison without overflowing the product. Java wraps an overflowing int; signed overflow in C++ has undefined behaviour. These are different possible MCQ answers.

Digit-checking a string does not require numeric parsing. Prime testing on an integer does. A very long input may pass the strobogrammatic check but fail conversion to a fixed-width integer. Use only the number range explicitly permitted by the snippet/judge.

In Java/C++, `&&` evaluates the right operand only if the left operand is true. Calling the cheap string checker first can avoid trial division on invalid candidates. On a valid string, the total cost is O(d+√n), not O(d*√n), because the stages run sequentially. On an invalid string, the second stage is skipped. Changing predicate order can change which intermediate method calls occur even when the final Boolean result is the same.

## 9. Strobogrammatic AND palindrome

A palindrome requires `s[i]==s[n−1−i]`; strobogrammatic requires `R(s[i])==s[n−1−i]`. Both hold only when every mirrored digit is equal and maps to itself. Therefore a string is in the intersection exactly when:

1. It is a palindrome.
2. Every digit belongs to {0,1,8}.

`1001` and `818` pass; `6009` is strobogrammatic but not a palindrome; `188` has only self-mapping digits but is not a palindrome. Simply rejecting 6/9 and accepting everything else is insufficient. Every one-character digit is a palindrome; 6 and 9 fail here because of rotation, contrary to the spoken claim that they are not palindromes.

The lecture suggests changing the lookup entries for 6 and 9 to −1 while keeping the mirrored-pair check. This correctly restricts accepted digits to 0,1,8. Combining two separate O(d) scans into one changes constants, while both methods remain Θ(d) worst-case time.

## 10. Corrections that matter in MCQs

| Spoken/transcription slip | Correct rule |
|---|---|
| `gcd(a,a%b)` | Call `gcd(b,a%b)` |
| GCD is always positive | Nonnegative convention includes zero; normalize negatives safely |
| r=0 returns an empty list | Return a list containing one empty string |
| A two-digit list missing 0/1/8 or a three-digit arithmetic typo | Use the explicit mapping and bases above |
| A fixed map uses input-proportional extra space | Five entries and a ten-slot table are O(1) space |
| Palindrome implies strobogrammatic | 121 is a counterexample; 69 disproves the converse |
| 6/9 are not palindromes | Single characters are palindromes; 6/9 are not self-rotating |
| Merging two scans lowers the asymptotic class | Two linear scans and one linear scan are both Θ(d) |

Keep input/output in main and problem logic in named functions, as the lecturer requests. This also helps isolate the exact function a scenario question measures. After the notes, attempt the practice and MCQs before consulting [C++ reference solutions](code/day03_reference.cpp).
