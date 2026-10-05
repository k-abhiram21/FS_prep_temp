# Day 3 — 30 code-scenario MCQs with explained answers

Original questions based on [Day 3 notes](Day_03_Notes.md), including added primality analysis for MCQ preparation. These are not claimed college questions. The full exam has 30 MCQs across several subjects; this is a DAA question bank, not a prediction of their distribution.

**First pass:** try Q1,3,4,6,9,14,17,19,20,26,28,29 in 15 minutes. Use the rest for targeted revision. Later attempt all 30 in 30 minutes, then review without a timer. A one-minute average means skip a long trace and return to it.

Unless stated otherwise: indexes are zero-based; C++ means C++17; arithmetic values fit their type; complexity uses constant-time fixed-width arithmetic and counts string copying/comparisons by characters. All options refer to the exact shown code. Deliberately faulty code is labelled.

## Euclid, array reduction and state updates

### Q1 — state at a specified iteration

```cpp
int a = 10, b = 77;
for (int i = 0; i < 3; ++i) {
    int r = a % b;
    a = b;
    b = r;
}
```

What are (a,b) immediately after the loop?

A. (10,7)  
B. (3,1)  
C. (7,3)  
D. (1,0)

<details><summary>Answer and explanation</summary>

**C.** The three transitions are (10,77)→(77,10)→(10,7)→(7,3). Do not count the initial state as an executed iteration. [Notes §3.1](Day_03_Notes.md#31-iteration-trace).

</details>

### Q2 — the return expression depends on the stopping point

```cpp
int f(int a, int b) {
    while (b != 0) {
        int r = a % b;
        a = b;
        b = r;
    }
    return b; // deliberately faulty
}
```

What does f(63,21) return?

A. 0  
B. 21  
C. 63  
D. A division-by-zero error

<details><summary>Answer and explanation</summary>

**A.** One iteration produces (21,0); the loop stops before another modulus. Returning b returns zero. Correct repair: return a at this exit, not an arbitrary change to the loop guard.

</details>

### Q3 — a correct-looking swap loses data

```cpp
int f(int a, int b) {
    while (b != 0) {
        a = b;
        b = a % b; // deliberately faulty update order
    }
    return a;
}
```

What is f(14,6)?

A. 14  
B. 2  
C. 0  
D. 6

<details><summary>Answer and explanation</summary>

**D.** After a=b, both operands of the modulus are 6, so b becomes 0. The result is 6. Save a%b before replacing a. The existence of a shrinking b does not prove correctness: this loop terminates with the wrong invariant.

</details>

### Q4 — wrong recursive arguments

```cpp
int f(int a, int b) {
    if (b == 0) return a;
    return f(a, a % b); // deliberately faulty
}
```

Which result and repair are correct for f(14,6)?

A. Returns 2; no repair needed  
B. Returns 14; replace the call with f(b,a%b)  
C. Never terminates; use f(a,b-1)  
D. Returns 6; change the base case to return b

<details><summary>Answer and explanation</summary>

**B.** The calls are (14,6)→(14,2)→(14,0), so 14 is returned. The Euclidean identity replaces the pair by (b,remainder), preserving common divisors.

</details>

### Q5 — total calls versus numeric input

```cpp
int calls = 0;
int g(int a, int b) {
    ++calls;
    if (b == 0) return a;
    return g(b, a % b);
}
```

Starting with calls=0, after g(55,34), what are (return value,calls)? Include the base-case invocation.

A. (1,8)  
B. (34,9)  
C. (1,9)  
D. (1,55)

<details><summary>Answer and explanation</summary>

**C.** The pairs are (55,34),(34,21),(21,13),(13,8),(8,5),(5,3),(3,2),(2,1),(1,0). Nine calls, eight modulus operations, return 1. The number of calls and number of remainders differ by one.

</details>

### Q6 — early exit with zeros

gcd below is correct, nonnegative, and accepts zero.

```cpp
int seen = 0, result = 0;
for (int x : {0,14,21,25,99}) {
    ++seen;
    result = gcd(result,x);
    if (result == 1) break;
}
```

What are (seen,result) after the loop?

A. (3,7)  
B. (4,1)  
C. (5,1)  
D. (1,0)

<details><summary>Answer and explanation</summary>

**B.** The results are 0,14,7,1. The loop stops at 25; 99 is untouched. Exiting at result==0 would be wrong because gcd(0,14)=14. Only 1 guarantees the answer will remain unchanged for all later inputs.

</details>

### Q7 — placing the base case too late

```java
static int g(int a, int b) {
    int r = a % b; // deliberately before the base case
    if (b == 0) return a;
    return g(b,r);
}
```

What happens when g(14,2) is called?

A. Returns 2  
B. Returns 0  
C. Infinite recursion  
D. Throws ArithmeticException

<details><summary>Answer and explanation</summary>

**D.** First r=0, then the call g(2,0) tries 2%0 before testing b. Integer modulus by zero throws in Java. Test the base first. The equivalent C++ integer operation has undefined behaviour, not a guaranteed Java-style exception.

</details>

### Q8 — widening after abs is too late

```java
int x = Integer.MIN_VALUE;
long a = Math.abs(x);
long b = Math.abs((long)x);
System.out.println(a + " " + b);
```

Which output is correct?

A. -2147483648 2147483648  
B. 2147483648 2147483648  
C. -2147483648 -2147483648  
D. Compile-time error because abs cannot accept long

<details><summary>Answer and explanation</summary>

**A.** abs(int) cannot represent the positive magnitude of MIN_VALUE and returns the negative int. Assignment then widens that already-negative value. Casting first calls abs(long), whose range contains 2147483648.

</details>

## Digit mapping, two pointers and library costs

For Q9–16, use the standard table:

```text
rot = [0,1,-1,-1,-1,-1,9,-1,8,6]
```

### Q9 — skipping the centre

Input is a nonempty digit string. The table is indexed correctly.

```cpp
bool check(const std::string& s) {
    int l=0, r=static_cast<int>(s.size())-1;
    while (l < r) { // deliberately incorrect for this property
        if (rot[s[l]-'0'] != s[r]-'0') return false;
        ++l; --r;
    }
    return true;
}
```

Which claim is correct for check("161")?

A. Correctly returns false due to the centre 6  
B. Throws because the table contains 6  
C. Incorrectly returns true; use l<=r  
D. Incorrectly returns false; use l!=r

<details><summary>Answer and explanation</summary>

**C.** Only the outer 1s are checked. The centre 6 must map to itself but maps to 9. A reversal may skip its centre; a rotation validator may not. l!=r is also unsafe for even lengths when the pointers cross.

</details>

### Q10 — validating keys without validating pairs

```cpp
bool check(const std::string& s) {
    for (char c : s)
        if (rot[c-'0'] == -1) return false;
    return true;
}
```

Which input is a counterexample, assuming nonempty canonical digit strings?

A. "69"  
B. "68"  
C. "101"  
D. "88"

<details><summary>Answer and explanation</summary>

**B.** Every digit in 68 is rotatable, but rotating the whole string produces 89. A valid-digit check is necessary, not sufficient; mirrored values must correspond.

</details>

### Q11 — a missing map entry

Python code deliberately omits 0→0:

```python
def check(s):
    rot = {'1':'1', '6':'9', '8':'8', '9':'6'}
    l, r = 0, len(s)-1
    while l <= r:
        if s[l] not in rot or rot[s[l]] != s[r]:
            return False
        l += 1
        r -= 1
    return True
print(check('1001'), check('11'))
```

What is printed?

A. True True  
B. KeyError  
C. False False  
D. False True

<details><summary>Answer and explanation</summary>

**D.** 1001 reaches a zero absent from the map. The `or` short-circuits before rot['0'] is accessed, so there is no KeyError. 11 passes. Add the missing key, not a special case rejecting interior zeros.

</details>

### Q12 — palindrome is a different predicate

A checker accepts a digit string iff it equals its reverse. Which input exposes a false positive for strobogrammatic validation?

A. "66"  
B. "101"  
C. "69"  
D. "6889"

<details><summary>Answer and explanation</summary>

**A.** 66 is a palindrome but rotates to 99. 69 and 6889 demonstrate false negatives of the same checker, rather than the false positive requested. Read the requested error direction.

</details>

### Q13 — compare before or after pointer movement?

In a correct l<=r checker for "68889", each successful iteration checks a pair and then does ++l,--r. Which tuple gives (l,r,successful comparisons) immediately after the second iteration?

A. (1,3,2)  
B. (3,1,3)  
C. (2,2,2)  
D. (2,2,3)

<details><summary>Answer and explanation</summary>

**C.** The checked pairs are (0,4) and (1,3). The middle at (2,2) has not yet been checked. A third comparison maps 8 to itself and then moves to (3,1).

</details>

### Q14 — a character is not a numeric index

```cpp
int rot[10] = {0,1,-1,-1,-1,-1,9,-1,8,6};
std::string s = "69";
std::cout << rot[s[0]]; // deliberately faulty
```

Assume ASCII-compatible character values. Which assessment is correct?

A. Prints 9 because s[0] denotes digit 6  
B. Undefined behaviour from an out-of-bounds index; use s[0]-'0'  
C. Guaranteed compiler error  
D. Prints -1 because the lookup defaults to invalid

<details><summary>Answer and explanation</summary>

**B.** s[0] is the character '6', whose ASCII code is 54, not integer 6. Index 54 is outside the array. Do not guess a deterministic output for undefined behaviour. For arbitrary input, validate that the character is a digit before indexing.

</details>

### Q15 — Boolean logic that rejects every digit

To accept only 0,1,8 at the centre, code uses:

```cpp
if (d != 0 || d != 1 || d != 8) return false;
```

Which statement is correct?

A. Correctly rejects exactly the invalid centre digits  
B. Only rejects 6 and 9  
C. It should be changed to d==0 && d==1 && d==8  
D. The condition is always true; replace || with &&

<details><summary>Answer and explanation</summary>

**D.** Even d=0 differs from 1 and 8, so the disjunction is true. A digit is invalid if it differs from **all** three allowed values: d!=0 && d!=1 && d!=8. This is De Morgan's law applied to membership in an allowed set.

</details>

### Q16 — built-in does not mean constant-time

A program generates Q candidate strings of length n into a Java ArrayList, then calls list.contains(target). Assume a worst-case unsuccessful search, with long matching prefixes. Which pair of bounds is appropriate for (contains time, auxiliary space of a separate fixed five-entry digit map)?

A. O(nQ), O(1)  
B. O(1), O(n)  
C. O(log Q), O(Q)  
D. O(Q), O(nQ)

<details><summary>Answer and explanation</summary>

**A.** ArrayList.contains scans elements; a string equality comparison may inspect O(n) characters. The fixed digit map has five entries regardless of input length, hence O(1) space. Generation/output memory is a different quantity from the separate map asked about.

</details>

## Recursive generation, output counts and ordering

For Q17–24, unless mutated, helper(r,N) returns [""] at r=0, ["0","1","8"] at r=1; otherwise it recursively obtains helper(r−2,N), and wraps every middle with (1,1),(6,9),(8,8),(9,6), plus (0,0) only when r!=N. Each concatenation creates a string. No sorting occurs unless mentioned.

### Q17 — an empty collection is not an empty middle

The r=0 base is changed to return an empty list `[]`. All other rules remain unchanged. What are the counts for N=4 and N=3, respectively?

A. 20,12  
B. 0,0  
C. 0,12  
D. 4,3

<details><summary>Answer and explanation</summary>

**C.** The even-length chain reaches r=0, returns no middles, and every wrapping loop stays empty. The odd-length chain reaches r=1, whose three centres still generate 12 valid length-three strings. This bug affects one parity, not both.

</details>

### Q18 — same remaining length, different context

Which pair gives the sizes of helper(2,4) and helper(2,2)?

A. 4,4  
B. 5,4  
C. 5,5  
D. 4,5

<details><summary>Answer and explanation</summary>

**B.** (2,4) is an interior layer, so it includes "00"; (2,2) is outermost, so it excludes a leading-zero pair. The original length N must remain unchanged throughout recursive calls.

</details>

### Q19 — a wrong condition can preserve the output count

The (0,0) condition is mistakenly changed from r!=N to r==N. For N=4, what happens?

A. Still produces the same 20 valid strings  
B. Produces 25 valid strings  
C. Produces no strings  
D. Produces 20 strings, but includes leading-zero strings and loses some valid strings

<details><summary>Answer and explanation</summary>

**D.** The interior length-two layer now has four middles, omitting "00". The outer layer has five wrapping pairs including zeros, yielding 4*5=20. Strings such as 0110 are wrongly included; 1001 is lost. Counts alone cannot certify correctness.

</details>

### Q20 — count the choices at the right layers

For the correct generator, how many canonical six-digit strings are returned?

A. 100  
B. 125  
C. 48  
D. 64

<details><summary>Answer and explanation</summary>

**A.** Four nonzero outer pairs, five choices for each of the two interior pairs: 4*5*5=100. 125 incorrectly permits outer zeros; 64 incorrectly forbids zeros inside.

</details>

### Q21 — helper calls are not the number of outputs

A counter increments once on entry to helper. helper(6,6) calls helper(r−2,N) exactly once at each non-base invocation. What is the total entry count?

A. 100  
B. 6  
C. 4  
D. 7

<details><summary>Answer and explanation</summary>

**C.** The entries are (6,6),(4,6),(2,6),(0,6). The generator does much of its work in wrapping loops during return, so four helper entries can still create 100 final strings. This helper descends once per level; it does not recursively call once per output.

</details>

### Q22 — allowing 6 and 9 at an odd centre

The r=1 base is changed to ["0","1","6","8","9"]. For N=3, how many strings are generated, and how many are actually strobogrammatic?

A. 12 generated,12 valid  
B. 20 generated,12 valid  
C. 20 generated,20 valid  
D. 12 generated,8 valid

<details><summary>Answer and explanation</summary>

**B.** Four outer choices times five centres gives 20 strings. Only the three self-mapping centres work, leaving 4*3=12 valid. A valid outer pair cannot repair an invalid centre.

</details>

### Q23 — lexicographic is not numeric across lengths

```python
values = ['8','11','69','101']
print(sorted(values))
```

What is printed?

A. ['8','11','69','101']  
B. ['11','101','69','8']  
C. ['101','8','11','69']  
D. ['101','11','69','8']

<details><summary>Answer and explanation</summary>

**D.** Python compares strings lexicographically. '101' precedes '11' because their first characters match and '0'<'1' at the next position. Numeric sorting would need a numeric key; fixed-length digit strings already have matching lexicographic/numeric order.

</details>

### Q24 — the output itself imposes a lower bound

The correct generator returns Q strings of length n by concatenating at each layer, then sorts them using comparison-based sorting. Which analysis is valid under the stated character-cost model?

A. Generation Θ(nQ); sorting adds O(nQ log Q) worst-case character work  
B. Generation O(n); sorting adds O(log Q)  
C. Generation O(Q); storage O(n) including all output  
D. Generation O(n²); sorting never examines string contents

<details><summary>Answer and explanation</summary>

**A.** Materialising the output writes nQ characters. A string comparison may examine n characters and comparison sorting uses O(Q log Q) comparisons. O(n) recursion depth does not describe the total time spent in the wrapping loops. [Notes §7.4](Day_03_Notes.md#74-output-sensitive-complexity).

</details>

## Primality and combined predicates — MCQ study

### Q25 — missing the domain guard

```python
def prime(n):
    d = 2
    while d*d <= n:
        if n % d == 0:
            return False
        d += 1
    return True
print(prime(0), prime(1), prime(2))
```

What is printed, and what repair is needed?

A. False False True; none  
B. True False True; reject only zero  
C. True True True; return False when n<2 before the loop  
D. False True False; reject only even inputs

<details><summary>Answer and explanation</summary>

**C.** The loop runs zero times for all three arguments and returns True. Zero and one are not prime. Reject n<2, then allow the no-divisor loop to return True for 2.

</details>

### Q26 — the square-root boundary is inclusive

```python
def prime(n):
    if n < 2:
        return False
    d = 2
    while d*d < n:  # deliberately incorrect boundary
        if n % d == 0:
            return False
        d += 1
    return True
```

What happens for prime(49)?

A. Correctly returns False after checking 7  
B. Incorrectly returns True because 7 is never checked  
C. Infinite loop at 7  
D. Returns False because all odd numbers are composite

<details><summary>Answer and explanation</summary>

**B.** 2–6 fail to divide; at d=7 the strict comparison 49<49 is false. Use <=. The square-root argument requires including the exact root of a square.

</details>

### Q27 — a premature success return

```python
def prime(n):
    if n < 2:
        return False
    d = 2
    while d*d <= n:
        if n % d == 0:
            return False
        return True  # deliberately inside the loop
    return True
print(prime(9))
```

Which assessment is correct?

A. False; 3 is found  
B. Infinite loop because d never changes  
C. Indentation error prevents execution  
D. True; move success after the loop and increment d for each failed candidate

<details><summary>Answer and explanation</summary>

**D.** The first candidate 2 does not divide 9, so True is returned immediately. This code never reaches a next iteration, hence it does not loop forever. A correct loop continues through all candidate divisors before reporting success.

</details>

### Q28 — the same multiplication differs by language

```java
int d = 46341;
System.out.println(d*d);
```

Which statement is correct, including the corresponding C++ int expression on a 32-bit signed int system?

A. Java prints -2147479015; corresponding C++ signed multiplication overflows with undefined behaviour  
B. Both must print 2147488281  
C. Both must throw an arithmetic exception  
D. Java refuses to compile; C++ guarantees wraparound

<details><summary>Answer and explanation</summary>

**A.** The mathematical product is 2147488281, beyond signed 32-bit maximum 2147483647. Java int arithmetic wraps: 2147488281−4294967296=−2147479015. C++ signed overflow does not have a guaranteed numeric result. For positive operands, d<=n/d avoids the overflowing product in a primality guard.

</details>

### Q29 — short circuit changes which methods run

S and P are correct predicates: S checks strobogrammatic strings and P checks primality for these small numbers. Each increments its own call counter once.

```java
int accepted = 0;
for (String s : new String[]{"121","101","69","2882"}) {
    if (S(s) && P(Integer.parseInt(s))) ++accepted;
}
```

What are (S calls,P calls,accepted)?

A. (4,4,1)  
B. (4,2,2)  
C. (4,2,1)  
D. (2,2,1)

<details><summary>Answer and explanation</summary>

**C.** Every input calls S. Only 101 and 69 pass it and therefore reach P; 101 is prime, 69 is not. && also skips parsing on the two S failures. Sequential successful predicates cost O(d+√n), not the product, with d digits and numeric value n.

</details>

### Q30 — restricting the map still requires mirrored equality

For the strobogrammatic-palindrome intersection, change entries for 6 and 9 to −1, retaining a correct l<=r pair check. What results are returned for ["69","818","188","0","6"], in that order?

A. false,true,true,true,false  
B. false,true,false,true,false  
C. true,true,false,true,true  
D. false,false,false,false,false

<details><summary>Answer and explanation</summary>

**B.** Only mirrored strings using 0,1,8 pass. 188 uses permitted digits but its outer 1 and 8 fail equality. 0 maps to itself. 6 is a one-character palindrome but is not strobogrammatic, so it fails the intersection.

</details>

## Answer strip — use only after a timed attempt

<details><summary>All answer letters</summary>

1 C · 2 A · 3 D · 4 B · 5 C · 6 B · 7 D · 8 A · 9 C · 10 B  
11 D · 12 A · 13 C · 14 B · 15 D · 16 A · 17 C · 18 B · 19 D · 20 A  
21 C · 22 B · 23 D · 24 A · 25 C · 26 B · 27 D · 28 A · 29 C · 30 B

</details>

## Error log

Record the exact wrong assumption; a remembered answer letter is not mastery. Reattempt the same rule with a changed input.

| Question | My choice | Correct choice | Wrong assumption | Rule / new example | Reattempt |
|---|---|---|---|---|---|
| | | | | | |

If one group is weak, reopen its notes section and trace the variables by hand. Spend the next review block repairing that group before adding another coding problem.
