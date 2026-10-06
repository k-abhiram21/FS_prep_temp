# Overall Java MCQ test for Days 1–3

**30 questions · 30 minutes · 10 questions from each day.** This is a DAA revision mock based on your three lecture packages, not a complete mixed-subject FS mock or a predicted college paper. No greedy questions are included because those lectures did not teach greedy.

Attempt with notes and answers closed. Write `Q1: B` etc. Skip long traces and return to them. Spend a separate review block explaining your mistakes; the bank is not extra mandatory work on top of your study plan.

**Java assumptions:** Java 17, zero-based indexes, `import java.util.*;`. Each question is independent. Put the shown static fields/methods inside a class and the lines after `// In main:` inside `public static void main(String[] args)`. Fields/caches reset for each question. Arithmetic fits the stated types except the explicit minimum-integer question. Complexity counts fixed-width arithmetic as constant time and includes recursion stack unless excluded. Faulty snippets are intentional. Ignore a final trailing output space.

Sources: [Day 1 notes](Day_01_Notes.md), [Day 2 notes](Day_02_Notes.md), [Day 3 notes](Day_03_Notes.md). Answers include the rule behind the result, not just a letter.

## Day 1 — arrays, complexity and recursion foundations

### Q1 — A tight bound is not a case label

A particular algorithm has cost function `T(n)=10n²+4n+2`. Which statement is correct?

A. T(n) is Θ(n), because constants can be ignored.  
B. T(n) is Θ(n²); Θ alone does not say whether this cost is best, average or worst case.  
C. T(n) is Θ(n³), because it has three terms.  
D. T(n) is only O(n³) and cannot be O(n²).  

<details>
<summary>Answer and explanation</summary>

**B.** The quadratic term dominates: for n≥1, 10n² ≤ T(n) ≤ 16n². Θ supplies matching asymptotic upper/lower bounds. The case being measured must be specified separately; an O(n³) upper bound is true but unnecessarily loose.

</details>

### Q2 — Exclusive prefix products

What array is printed?

```java
// In main:
int[] a = {2, -3, 0, 4};
int[] left = new int[a.length];
left[0] = 1;
for (int i = 1; i < a.length; i++) {
    left[i] = left[i - 1] * a[i - 1];
}
System.out.println(Arrays.toString(left));
```

A. [2, -6, 0, 0]  
B. [1, 2, -3, 0]  
C. [1, 2, -6, 0]  
D. [0, 0, 4, 1]  

<details>
<summary>Answer and explanation</summary>

**C.** `left[i]` multiplies positions strictly before i. The values are 1, 2, 2×(-3)=-6, and -6×0=0. Option A includes the current element, while D is the exclusive suffix array.

</details>

### Q3 — Two zeros in Product Except Self

What is printed by this correct brute-force implementation?

```java
// In main:
long[] a = {0, -2, 0, 5};
long[] answer = new long[a.length];
Arrays.fill(answer, 1L);
for (int i = 0; i < a.length; i++) {
    for (int j = 0; j < a.length; j++) {
        if (i != j) answer[i] *= a[j];
    }
}
System.out.println(Arrays.toString(answer));
```

A. [0, 0, 0, -10]  
B. [-10, 0, -10, 0]  
C. [0, -10, 0, 0]  
D. [0, 0, 0, 0]  

<details>
<summary>Answer and explanation</summary>

**D.** Every omitted position still leaves at least one zero in the product, so all answers are zero. The two zero positions are separate elements. This implementation is Θ(n²); the prefix/suffix improvement is Θ(n) and also handles zeros without division.

</details>

### Q4 — Inclusive inner-loop boundary

For n=5, what is printed, and what is the tight time bound as n grows? Assume the counter fits in long.

```java
// In main:
int n = 5;
long count = 0;
for (int i = 0; i < n; i++) {
    for (int j = 0; j <= i; j++) count++;
}
System.out.println(count);
```

A. 10; Θ(n)  
B. 15; Θ(n²)  
C. 25; Θ(n²)  
D. 15; Θ(n log n)  

<details>
<summary>Answer and explanation</summary>

**B.** The inner loop runs i+1 times, so for n=5 the count is 1+2+3+4+5=15. In general it is n(n+1)/2, hence Θ(n²). The strict-bound variant j<i would have given 10, but that is not this code.

</details>

### Q5 — Repeated halving

What is printed, and how many iterations does this pattern take for a variable positive starting value n?

```java
// In main:
int k = 20, count = 0;
while (k > 0) {
    count++;
    k /= 2;
}
System.out.println(count);
```

A. 4; Θ(n)  
B. 20; Θ(n)  
C. 5; Θ(log n)  
D. 5; Θ(1) for every n  

<details>
<summary>Answer and explanation</summary>

**C.** The values entering the body are 20,10,5,2,1; integer division then produces zero. Five iterations occur here. For growing positive n, the number of halvings is floor(log₂ n)+1, giving Θ(log n); a fixed numerical example does not establish constant complexity for arbitrary n.

</details>

### Q6 — Work on descent and return

What is printed by trace(3)? Ignore the final trailing space.

```java
static void trace(int n) {
    if (n == 0) return;
    System.out.print(n + " ");
    trace(n - 1);
    System.out.print(n + " ");
}

// In main:
trace(3);
```

A. 3 2 1 1 2 3  
B. 1 2 3 3 2 1  
C. 3 2 1  
D. 1 1 2 2 3 3  

<details>
<summary>Answer and explanation</summary>

**A.** Each frame prints before descending, producing 3,2,1, then prints its own n after the child returns, producing 1,2,3. The frame keeps its local n. Work remains after the recursive call, so it is not a tail call.

</details>

### Q7 — Call count versus active depth

Starting with both fields zero, what is printed? Depth includes the initial call and the base-case call.

```java
static int calls = 0, maxDepth = 0;
static void tree(int n, int depth) {
    calls++;
    maxDepth = Math.max(maxDepth, depth);
    if (n == 0) return;
    tree(n - 1, depth + 1);
    tree(n - 1, depth + 1);
}

// In main:
tree(3, 1);
System.out.println(calls + " " + maxDepth);
```

A. 7 3  
B. 15 4  
C. 15 15  
D. 8 4  

<details>
<summary>Answer and explanation</summary>

**B.** At n=3 there are 1+2+4+8=15 invocations, including the n=0 leaves. A deepest active chain is 3→2→1→0, length 4. The branches execute sequentially: total calls are exponential, but the active stack depth is linear.

</details>

### Q8 — Factorial and pending multiplication

For nonnegative n whose factorial fits in long, which analysis is correct for fact(n) in ordinary Java recursion?

```java
static long fact(int n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
}
```

A. Tail recursive; Θ(1) stack because only one child exists.  
B. Tree recursive; Θ(2ⁿ) time and Θ(2ⁿ) stack.  
C. Not tail recursive; Θ(n²) time because multiplication follows return.  
D. Not tail recursive; Θ(n) time and Θ(n) stack.  

<details>
<summary>Answer and explanation</summary>

**D.** The result of fact(n-1) must return before the multiplication by n occurs. There is one child per level and constant work per level: Θ(n) time and Θ(n) stack. A single child does not imply constant stack, and pending multiplication does not make the work quadratic.

</details>

### Q9 — Postfix, prefix and evaluation order

What is printed?

```java
// In main:
int n = 4;
System.out.println(n-- + " " + --n + " " + n);
```

A. 3 2 2  
B. 4 3 2  
C. 4 2 2  
D. 3 3 3  

<details>
<summary>Answer and explanation</summary>

**C.** Java evaluates the operands left to right. n-- contributes the old value 4 and changes n to 3. --n then changes n to 2 and contributes 2; the final n is 2. The decrement occurs during evaluation, not after a surrounding method returns.

</details>

### Q10 — Counting arrangements with repeated letters

How many distinct full-length arrangements exist for AABC and BANANA, respectively? All repeated copies of a letter are indistinguishable.

A. 12 and 60  
B. 24 and 720  
C. 6 and 20  
D. 12 and 120  

<details>
<summary>Answer and explanation</summary>

**A.** AABC has 4!/2!=12 arrangements. BANANA has three As, two Ns and one B, giving 6!/(3!×2!)=60. Order matters, so these are permutations; treating repeated copies as distinct overcounts.

</details>

## Day 2 — Fibonacci, stairs, strings and Happy Number

### Q11 — Naive Fibonacci calls

Starting with calls=0, what pair is printed? Count the base-case invocations too.

```java
static int calls = 0;
static int fib(int n) {
    calls++;
    if (n < 2) return n;
    return fib(n - 1) + fib(n - 2);
}

// In main:
int value = fib(6);
System.out.println(value + " " + calls);
```

A. 8 13  
B. 13 25  
C. 8 15  
D. 8 25  

<details>
<summary>Answer and explanation</summary>

**D.** F(6)=8. With bases F(0) and F(1), C(0)=C(1)=1 and C(n)=1+C(n-1)+C(n-2); the counts are 1,1,3,5,9,15,25. Counting leaves only gives 13, not all 25 calls. Repeated subproblems create the extra work.

</details>

### Q12 — Memoization counts new states

Starting with computed=0, what is printed? The cache is initialized to -1 immediately before the call.

```java
static int computed = 0;
static int fib(int n, int[] memo) {
    if (n < 2) return n;
    if (memo[n] != -1) return memo[n];
    computed++;
    return memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
}

// In main:
int[] memo = new int[8];
Arrays.fill(memo, -1);
System.out.println(fib(7, memo) + " " + computed);
```

A. 13 13  
B. 13 6  
C. 8 6  
D. 13 7  

<details>
<summary>Answer and explanation</summary>

**B.** F(7)=13. Only non-base states 2,3,4,5,6,7 are computed and stored, so computed=6. Cache hits and base cases do not increment the field. Memoization avoids repeated computation; this recursive version still uses Θ(n) stack plus the cache.

</details>

### Q13 — Accumulator recursion has one chain

Starting with calls=0, what is printed? Use the base case shown here; there is no remaining==1 shortcut.

```java
static int calls = 0;
static long carry(int remaining, long a, long b) {
    calls++;
    if (remaining == 0) return a;
    return carry(remaining - 1, b, a + b);
}

// In main:
System.out.println(carry(4, 0, 1) + " " + calls);
```

A. 5 4  
B. 3 4  
C. 3 5  
D. 5 5  

<details>
<summary>Answer and explanation</summary>

**C.** The states are (4,0,1)→(3,1,1)→(2,1,2)→(1,2,3)→(0,3,5). Five invocations occur and the base returns a=3. It has linear time and linear stack in ordinary Java recursion, although the call is in tail position.

</details>

### Q14 — The empty-route base case

What does ways(4) return, and what repair matches counting routes with moves of one or two?

```java
static int ways(int n) {
    if (n < 0) return 0;
    if (n == 0) return 0; // deliberately faulty
    if (n == 1) return 1;
    return ways(n - 1) + ways(n - 2);
}
```

A. 3; change the n==0 return to 1.  
B. 5; no repair is needed.  
C. 4; change addition to multiplication.  
D. 0; change the n==1 return to 0.  

<details>
<summary>Answer and explanation</summary>

**A.** The faulty bases produce W(0)=0,W(1)=1,W(2)=1,W(3)=2,W(4)=3. One empty route at W(0)=1 is needed to count a final move that reaches zero exactly. With W(0)=W(1)=1, W(4)=5.

</details>

### Q15 — Generalized staircase moves

What is printed? Routes are ordered sequences, not unordered combinations.

```java
static int ways(int remaining, int maxJump) {
    if (remaining < 0) return 0;
    if (remaining == 0) return 1;
    int total = 0;
    for (int jump = 1; jump <= maxJump; jump++) {
        total += ways(remaining - jump, maxJump);
    }
    return total;
}

// In main:
System.out.println(ways(4, 3) + " " + ways(0, 3));
```

A. 4 0  
B. 6 1  
C. 7 0  
D. 7 1  

<details>
<summary>Answer and explanation</summary>

**D.** For four steps using moves 1–3, routes are 1111,112,121,211,22,13,31: seven. Zero remaining steps contribute one completed empty suffix. Negative remaining steps contribute zero. This snippet is naive recursion; the same recurrence can be memoized.

</details>

### Q16 — Updating a Fibonacci pair in the wrong order

What is printed by the faulty loop?

```java
// In main:
int n = 4;
int a = 0, b = 1;
for (int i = 2; i <= n; i++) {
    a = b;
    b = a + b; // deliberately faulty
}
System.out.println(b);
```

A. 3  
B. 8  
C. 5  
D. 4  

<details>
<summary>Answer and explanation</summary>

**B.** Each iteration first overwrites a with old b, then computes b=a+b using two copies of old b. The pairs become (1,2),(2,4),(4,8). Save old a+b before shifting the pair; a shrinking loop bound does not establish algorithm correctness.

</details>

### Q17 — Array mutation versus parameter reassignment

What is printed? The method reverses the outer pair, then reassigns its local parameter.

```java
static void change(char[] s) {
    char temporary = s[0];
    s[0] = s[2];
    s[2] = temporary;
    s = new char[]{'x'};
}

// In main:
char[] a = {'a', 'b', 'c'};
char[] alias = a;
change(a);
System.out.println(new String(a) + " " + new String(alias));
```

A. cba cba  
B. abc cba  
C. x x  
D. cba x  

<details>
<summary>Answer and explanation</summary>

**A.** Both caller variables refer to the same original char array, which becomes cba. Assigning a new array to the local parameter changes only that local reference. Java is pass-by-value: the passed value is a copy of the reference, not a copy of the array.

</details>

### Q18 — String concatenation changes a reference

What is printed?

```java
// In main:
String first = "a";
String second = first;
first = first + "b";
System.out.println(first + " " + second + " " + first.equals(second));
```

A. ab ab true  
B. a a true  
C. ab a false  
D. Compilation fails because String is immutable.  

<details>
<summary>Answer and explanation</summary>

**C.** Concatenation constructs the value ab and reassigns first. second still refers to the original a. Immutability prevents changing the existing String contents, but does not prevent reassigning a variable. equals compares the resulting values, which differ.

</details>

### Q19 — StringBuilder aliases share mutation

What is printed?

```java
// In main:
StringBuilder first = new StringBuilder("ab");
StringBuilder second = first;
first.append('c');
second.reverse();
System.out.println(first + " " + second);
```

A. abc ab  
B. cba ab  
C. abc cba  
D. cba cba  

<details>
<summary>Answer and explanation</summary>

**D.** first and second reference one mutable builder. append changes it to abc and reverse changes that same object to cba. Both variables therefore show cba. StringBuilder is useful for repeated construction in one thread; its mutability differs from String.

</details>

### Q20 — Happy Number: checking repeats too late

What is printed, and what is the correct repair? Input 19 is a happy number.

```java
static int next(int n) {
    int sum = 0;
    while (n > 0) {
        int digit = n % 10;
        sum += digit * digit;
        n /= 10;
    }
    return sum;
}
static boolean happy(int n) {
    Set<Integer> seen = new HashSet<>();
    while (n != 1) {
        seen.add(n);
        if (seen.contains(n)) return false; // deliberately wrong order
        n = next(n);
    }
    return true;
}

// In main:
System.out.println(happy(19));
```

A. true; no repair needed.  
B. false; check membership before adding n, then transform it.  
C. false; stop whenever the next value increases.  
D. Infinite loop; replace the set with an array of input length.  

<details>
<summary>Answer and explanation</summary>

**B.** Immediately after adding 19, contains(19) is true, so the method wrongly returns false. Detect a previously seen state before adding it (or use the return value of Set.add correctly). The valid sequence 19→82→68→100→1 also shows why an increasing next value is not a failure condition.

</details>

## Day 3 — GCD, rotation, generation and Java traps

### Q21 — Euclidean state after two updates

What pair is printed immediately after the loop? It is not asking for the final GCD.

```java
// In main:
int a = 84, b = 30;
for (int i = 0; i < 2; i++) {
    int remainder = a % b;
    a = b;
    b = remainder;
}
System.out.println(a + " " + b);
```

A. 6 0  
B. 30 24  
C. 24 6  
D. 84 6  

<details>
<summary>Answer and explanation</summary>

**C.** The updates are (84,30)→(30,24)→(24,6). The GCD is 6, but the loop has not reached its final (6,0) state. Count executed iterations rather than including the initial pair as one iteration.

</details>

### Q22 — Recursive GCD preserves the wrong argument

What does gcd(81,27) return, and what is the correct argument repair?

```java
static int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(a, a % b); // deliberately faulty
}
```

A. 81; recurse with gcd(b,a%b).  
B. 27; no repair needed.  
C. 0; return b at the base case.  
D. Infinite recursion; recurse with gcd(a,b-1).  

<details>
<summary>Answer and explanation</summary>

**A.** The first recursive step is the faulty pair (81,0), which returns 81. Euclid preserves common divisors by changing (a,b) to (b,a%b). The corrected function reaches (27,0) and returns 27.

</details>

### Q23 — Zero is not a safe array-GCD exit

What is printed by the faulty reduction? Inputs are nonnegative.

```java
static int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

// In main:
int result = 0, seen = 0;
for (int x : new int[]{0, 0, 18, 24}) {
    seen++;
    result = gcd(result, x);
    if (result == 0) break; // deliberately faulty
}
System.out.println(seen + " " + result);
```

A. 4 6  
B. 3 18  
C. 2 0  
D. 1 0  

<details>
<summary>Answer and explanation</summary>

**D.** The first zero leaves result=0 and triggers the premature break; only one element is processed. A later nonzero value can change gcd(0,x) to x. A correct full reduction yields 6; result==1 is a valid universal early-exit condition, while result==0 is not.

</details>

### Q24 — Rotation pairs and odd centres

Inputs are nonempty canonical digit strings. What is printed?

```java
static final int[] ROT = {0,1,-1,-1,-1,-1,9,-1,8,6};
static boolean check(String s) {
    int left = 0, right = s.length() - 1;
    while (left <= right) {
        if (ROT[s.charAt(left)-'0'] != s.charAt(right)-'0') return false;
        left++;
        right--;
    }
    return true;
}

// In main:
System.out.println(check("906") + " " + check("916") + " " + check("669"));
```

A. false true true  
B. true true false  
C. true false false  
D. true true true  

<details>
<summary>Answer and explanation</summary>

**B.** For 906 the outer 9 maps to 6 and centre 0 maps to itself. 916 likewise has a valid centre 1. For 669 the outer 6→9 pair passes, but centre 6→9 is not self-mapping, so it fails. Checking only left<right would miss this centre.

</details>

### Q25 — Widen before taking the magnitude

What is printed?

```java
// In main:
int x = Integer.MIN_VALUE;
long a = Math.abs(x);
long b = Math.abs((long) x);
System.out.println(a + " " + b);
```

A. 2147483648 2147483648  
B. -2147483648 -2147483648  
C. -2147483648 2147483648  
D. ArithmeticException is thrown.  

<details>
<summary>Answer and explanation</summary>

**C.** Math.abs(int) cannot represent the positive magnitude of Integer.MIN_VALUE, so it returns that same negative int; assignment then widens the already-negative result. Casting first selects Math.abs(long), which can represent 2147483648. This matters before normalizing GCD inputs.

</details>

### Q26 — Generation work versus helper entries

A correct generator uses bases r=0 → [""] and r=1 → ["0","1","8"]. At each other entry it calls helper(r-2,N) once, then wraps every returned middle with five valid pairs, excluding the zero pair only at the outer layer. A counter increments once per helper entry. For helper(5,5), what are (output count,entry count)?

```java
static int calls = 0;
static List<String> helper(int r, int total) {
    calls++;
    if (r == 0) return Arrays.asList("");
    if (r == 1) return Arrays.asList("0", "1", "8");
    List<String> middles = helper(r - 2, total);
    List<String> out = new ArrayList<>();
    char[][] pairs = {{'0','0'}, {'1','1'}, {'6','9'}, {'8','8'}, {'9','6'}};
    for (String middle : middles) {
        for (char[] pair : pairs) {
            if (r == total && pair[0] == '0') continue;
            out.add(pair[0] + middle + pair[1]);
        }
    }
    return out;
}
```

A. (60,3)  
B. (60,60)  
C. (75,3)  
D. (12,5)  

<details>
<summary>Answer and explanation</summary>

**A.** There are four nonzero outer pairs, five interior pairs and three centres: 4×5×3=60 outputs. Helper entries occur at r=5,3,1, only three calls. The wrapping loops create many strings while unwinding; helper depth/count is not total generation time. If zeros were allowed outside, the wrong count would be 75.

</details>

### Q27 — Char arithmetic before concatenation

What is printed?

```java
// In main:
char left = '1', right = '1';
String middle = "0";
System.out.println((left + right + middle) + " " + (left + middle + right));
```

A. 101 101  
B. 110 101  
C. 980 980  
D. 980 101  

<details>
<summary>Answer and explanation</summary>

**D.** The expression left+right+middle first adds the two char values, 49+49=98, then concatenates the String "0", producing "980". left+middle+right encounters a String at the first addition, so it concatenates "1"+"0"+"1" into "101". Operator evaluation and operand types both matter.

</details>

### Q28 — List membership uses value equality

What is printed?

```java
// In main:
List<String> values = Arrays.asList("11", "69", "88");
String target = new String("69");
System.out.println(values.contains(target) + " " + (target == "69") + " " + target.equals("69"));
```

A. false false true  
B. true false true  
C. true true true  
D. true false false  

<details>
<summary>Answer and explanation</summary>

**B.** List.contains uses equals, so it finds a String with value "69". new String creates a distinct object, making target=="69" false, while target.equals("69") is true. A list membership search still scans elements; built-in contains does not imply constant-time lookup.

</details>

### Q29 — The exact square root must be tested

What does prime(121) return, and what repair is required? Products in this small example fit in int.

```java
static boolean prime(int n) {
    if (n < 2) return false;
    for (int d = 2; d*d < n; d++) { // deliberately faulty boundary
        if (n % d == 0) return false;
    }
    return true;
}
```

A. true incorrectly; include the square-root boundary.  
B. false correctly; no repair needed.  
C. false incorrectly; skip divisor 2.  
D. ArithmeticException; use floating-point remainder.  

<details>
<summary>Answer and explanation</summary>

**A.** The function checks divisors 2 through 10, none of which divides 121. At d=11, 121<121 is false, so the factor is skipped and true is returned. Include d=11 with <=. For general positive int inputs, d<=n/d also avoids overflow in d*d.

</details>

### Q30 — A short-circuit guard prevents remainder by zero

What is printed, and what happens if && is replaced with a single &?

```java
// In main:
int a = 18, b = 0;
boolean divisible = b != 0 && a % b == 0;
System.out.println(divisible);
```

A. false; the & version throws ArithmeticException.  
B. true; both versions skip the remainder.  
C. false; both versions skip the remainder.  
D. ArithmeticException; both versions evaluate the remainder.  

<details>
<summary>Answer and explanation</summary>

**A.** With b=0 the first condition is false, so && skips a%b and prints false. Boolean & evaluates both operands; a%0 therefore throws ArithmeticException. The safety guard must be on the left of the short-circuit operator.

</details>

## Answer strip — open after the timed attempt

<details>
<summary>All 30 answers</summary>

1 B · 2 C · 3 D · 4 B · 5 C · 6 A · 7 B · 8 D · 9 C · 10 A  
11 D · 12 B · 13 C · 14 A · 15 D · 16 B · 17 A · 18 C · 19 D · 20 B  
21 C · 22 A · 23 D · 24 B · 25 C · 26 A · 27 D · 28 B · 29 A · 30 A  

</details>

## Review by topic

| Questions | Review target | Notes |
|---|---|---|
| 1–5 | Bounds, prefix/suffix products, zeros and loop counts | Day 1 sections 3–4 |
| 6–10 | Stack/returns, tail position, counters, decrements and permutations | Day 1 sections 5–8 |
| 11–16 | Repeated work, cache misses, state transitions and staircase bases | Day 1 sections 9–10; Day 2 sections 2–3 |
| 17–20 | References, mutability, Java strings and cycle detection | Day 2 sections 4–6 |
| 21–25 | Euclid, array reduction, odd centres and safe magnitudes | Day 3 sections 2–6 |
| 26–30 | Generation, concatenation, library equality, primality and short circuit | Day 3 sections 7–9 |

Record separate scores: Day 1 __/10, Day 2 __/10, Day 3 __/10. Use the weakest group to choose your next review block. A score on this local set does not predict your exam result.

| Question | My choice | Correct choice | Exact mistaken rule | Changed example to retry |
|---|---|---|---|---|
| | | | | |

After reviewing, retry missed questions using changed inputs rather than memorizing the answer letters.
