# Running the Java references

Use a JDK (Java 17 or newer). Run these commands from the repository root:

```powershell
javac -Xlint:all -d DS-JAVA/build DS-JAVA/code/Day01Reference.java DS-JAVA/code/Day02Reference.java DS-JAVA/code/Day03Reference.java DS-JAVA/code/ReferenceChecks.java
java -cp DS-JAVA/build Day01Reference
java -cp DS-JAVA/build Day02Reference
java -cp DS-JAVA/build Day03Reference check 689
java -cp DS-JAVA/build Day03Reference recursive 161
java -cp DS-JAVA/build Day03Reference gcd 3 14 2 6
java -cp DS-JAVA/build Day03Reference generate 3
java -cp DS-JAVA/build Day03Reference intersection 818
java -cp DS-JAVA/build ReferenceChecks
```

Day 1 and Day 2 run fixed demonstrations. Day 3 takes one command per run, either as command-line arguments or through standard input. `check 689` prints `true`, `recursive 161` prints `false`, and `gcd 3 14 2 6` prints `2`. `generate 3` prints twelve sorted strings, one per line.

| Class | Methods to study |
|---|---|
| Day01Reference | Products (brute force, prefix/suffix, reused output), factorial, Fibonacci, stairs, recursive array sum, head/tail/tree and indirect recursion |
| Day02Reference | Iterative/state Fibonacci, stairs, generalized jumps, iterative/recursive `char[]` reversal, String reversal copy; optional Happy Number |
| Day03Reference | Recursive/iterative GCD, array GCD, canonical digit validation, iterative/recursive rotation checking, generation, palindrome intersection |
| ReferenceChecks | Independent regression checks; run after studying or changing a reference method |

These are complete local classes, not judge-specific `Solution` submissions. Copy/adapt the method signature requested by your platform. Do not paste an entire demonstration class into a judge expecting a single method.

## Java assumptions and boundaries

- Java `long` is signed 64-bit. Factorial accepts 0–20, Fibonacci 0–92, and stairs 0–91. Negative remaining steps in the naive stairs helper contribute zero routes.
- Ordinary Java integer overflow wraps. Product/sum methods and generalized-jump counting use `Math.multiplyExact`/`Math.addExact` to report unrepresentable intermediate arithmetic with `ArithmeticException`; they do not provide arbitrary-precision answers. Even a zero final answer can have an overflowing prefix/intermediate product.
- State Fibonacci has a `remaining==1` base to avoid computing the unused F(93). Custom accumulator values can still exceed `long`; checked addition reports that.
- General-jump counting limits n to 0–91 for this small recursion demonstration, returns 0 for negative n/nonpositive maxJump, and can overflow within that n range if many jump lengths are allowed. `countWays(0,positiveMaxJump)` is 1.
- GCD normalizes signs. `Long.MIN_VALUE` is rejected when processed because its positive magnitude cannot fit in `long`; `gcdArray` may return at 1 without processing later values. Empty/all-zero arrays return 0. If input is `int`, widen before taking absolute values.
- Digit checkers accept nonempty canonical nonnegative decimal strings, with no leading zero except "0". The generator supports lengths 1–8 to limit exponential output; internal middles may contain zeros.
- Reversal mutates an existing `char[]` using O(1) auxiliary space. Converting a String to an array and constructing a new String uses O(n) storage. Examples use ASCII; a `char[]` contains UTF-16 code units, which is not a full Unicode grapheme model.
- Java passes all arguments by value. An object/array argument passes a copied reference; mutation of the shared array is visible, while reassignment of a local reference does not replace the caller's variable.
- Ordinary Java recursion consumes stack space, including tail-shaped calls. The references are for modest practice inputs; don't assume a recursion becomes a loop.
