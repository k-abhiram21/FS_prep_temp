import java.math.BigInteger;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

/** Independent checks for the reference methods. No JUnit dependency. */
public final class ReferenceChecks {
    private static int checks;
    private static int productArrays;

    private static void check(boolean condition, String message) {
        checks++;
        if (!condition) throw new AssertionError(message);
    }

    private static void expect(Class<? extends Throwable> kind, Runnable action) {
        checks++;
        try {
            action.run();
        } catch (Throwable error) {
            if (kind.isInstance(error)) return;
            throw new AssertionError("expected " + kind.getSimpleName() + ", got " + error, error);
        }
        throw new AssertionError("expected " + kind.getSimpleName());
    }

    private static void enumerateProducts(long[] input, int i) {
        if (i < input.length) {
            for (long x = -2; x <= 2; x++) {
                input[i] = x;
                enumerateProducts(input, i + 1);
            }
            return;
        }
        long[] original = input.clone();
        // Independent nested-loop oracle versus both prefix/suffix methods.
        long[] expected = Day01Reference.productBrute(input);
        check(Arrays.equals(expected, Day01Reference.productExceptSelf(input)), "product mismatch");
        check(Arrays.equals(expected, Day01Reference.productOutputReuse(input)), "reused-output mismatch");
        check(Arrays.equals(input, original), "product method mutated input");
        productArrays++;
    }

    private static boolean rotationOracle(String s) {
        if (s.isEmpty() || (s.length() > 1 && s.charAt(0) == '0')) return false;
        StringBuilder rotated = new StringBuilder();
        for (int i = s.length() - 1; i >= 0; i--) {
            switch (s.charAt(i)) {
                case '0': rotated.append('0'); break;
                case '1': rotated.append('1'); break;
                case '6': rotated.append('9'); break;
                case '8': rotated.append('8'); break;
                case '9': rotated.append('6'); break;
                default: return false;
            }
        }
        return rotated.toString().equals(s);
    }

    private static BigInteger countOracle(int n, int maxJump) {
        BigInteger[] ways = new BigInteger[n + 1];
        Arrays.fill(ways, BigInteger.ZERO);
        ways[0] = BigInteger.ONE;
        for (int i = 1; i <= n; i++) {
            for (int jump = 1; jump <= Math.min(i, maxJump); jump++) {
                ways[i] = ways[i].add(ways[i - jump]);
            }
        }
        return ways[n];
    }

    public static void main(String[] args) {
        for (int length = 0; length <= 6; length++) enumerateProducts(new long[length], 0);
        expect(ArithmeticException.class, () -> Day01Reference.productExceptSelf(new long[]{Long.MAX_VALUE, 2, 1}));

        BigInteger factorial = BigInteger.ONE;
        for (int n = 0; n <= 20; n++) {
            if (n > 0) factorial = factorial.multiply(BigInteger.valueOf(n));
            check(Day01Reference.factorial(n) == factorial.longValueExact(), "factorial " + n);
            check(Day01Reference.fibNaive(n) == Day01Reference.fibMemo(n), "naive Fibonacci " + n);
        }
        expect(IllegalArgumentException.class, () -> Day01Reference.factorial(21));
        expect(IllegalArgumentException.class, () -> Day02Reference.fibState(-1));

        BigInteger a = BigInteger.ZERO, b = BigInteger.ONE;
        for (int n = 0; n <= 92; n++) {
            check(Day01Reference.fibMemo(n) == a.longValueExact(), "memo Fibonacci " + n);
            check(Day02Reference.fibIterative(n) == a.longValueExact(), "iterative Fibonacci " + n);
            check(Day02Reference.fibState(n) == a.longValueExact(), "state Fibonacci " + n);
            BigInteger next = a.add(b); a = b; b = next;
        }
        check(Day02Reference.fibIterative(92) == 7540113804746346429L, "F(92)");
        expect(IllegalArgumentException.class, () -> Day02Reference.fibIterative(93));
        for (int n = 0; n <= 91; n++) {
            long expected = countOracle(n, 2).longValueExact();
            check(Day01Reference.waysMemo(n) == expected, "memo stairs " + n);
            check(Day01Reference.waysIterative(n) == expected, "iterative stairs " + n);
            check(Day02Reference.climbStairs(n) == expected, "Day 2 stairs " + n);
            if (n <= 15) check(Day01Reference.waysRecursive(n) == expected, "recursive stairs " + n);
        }
        for (int n = 0; n <= 35; n++) {
            for (int m = 1; m <= 8; m++) {
                check(Day02Reference.countWays(n, m) == countOracle(n, m).longValueExact(), "general jumps");
            }
        }
        check(Day02Reference.countWays(-1, 2) == 0, "negative remaining steps");
        check(Day02Reference.countWays(3, 0) == 0, "no allowed jumps");
        expect(ArithmeticException.class, () -> Day02Reference.countWays(64, 64));
        check(Day01Reference.sumFrom(new long[]{3, -2, 5, 0}) == 6, "recursive sum");
        check(Day01Reference.sumFrom(new long[0]) == 0, "empty sum");

        StringBuilder h = new StringBuilder(), t = new StringBuilder();
        StringBuilder tree = new StringBuilder(), indirect = new StringBuilder();
        Day01Reference.head(4, h); Day01Reference.tail(4, t);
        Day01Reference.count = 0; Day01Reference.tree(2, tree); Day01Reference.A(10, indirect);
        check(h.toString().equals("1 2 3 4 "), "head trace");
        check(t.toString().equals("4 3 2 1 "), "tail trace");
        check(tree.toString().equals("2 1 1 ") && Day01Reference.count == 7, "tree trace/count");
        check(indirect.toString().equals("10 9 4 3 1 "), "indirect trace");
        for (String s : new String[]{"", "a", "ab", "DAA2026", "racecar", "a b"}) {
            String expected = new StringBuilder(s).reverse().toString();
            char[] loop = s.toCharArray(), recursion = s.toCharArray();
            Day02Reference.reverseInPlace(loop); Day02Reference.reverseRecursive(recursion);
            check(new String(loop).equals(expected), "loop reversal");
            check(new String(recursion).equals(expected), "recursive reversal");
            check(Day02Reference.reversedCopy(s).equals(expected), "copied reversal");
        }
        check(Day02Reference.isHappy(13) && Day02Reference.isHappy(19), "happy inputs");
        check(!Day02Reference.isHappy(116) && !Day02Reference.isHappy(0), "unhappy inputs");

        for (long x = -50; x <= 50; x++) {
            for (long y = -50; y <= 50; y++) {
                long expected = BigInteger.valueOf(x).gcd(BigInteger.valueOf(y)).longValueExact();
                check(Day03Reference.gcdRecursive(x, y) == expected, "recursive GCD");
                check(Day03Reference.gcdIterative(x, y) == expected, "iterative GCD");
            }
        }
        check(Day03Reference.gcdArray(new long[]{0, 0, 6}) == 6, "GCD zero prefix");
        check(Day03Reference.gcdArray(new long[]{-12, 18, 0}) == 6, "GCD signs");
        check(Day03Reference.gcdArray(new long[0]) == 0, "empty GCD");
        expect(IllegalArgumentException.class, () -> Day03Reference.gcdRecursive(Long.MIN_VALUE, 1));
        for (int n = 0; n <= 9999; n++) {
            String s = Integer.toString(n);
            boolean expected = rotationOracle(s);
            check(Day03Reference.isStrobogrammatic(s) == expected, "iterative rotation " + s);
            check(Day03Reference.isStrobogrammaticRecursive(s) == expected, "recursive rotation " + s);
            boolean palindrome = s.equals(new StringBuilder(s).reverse().toString());
            check(Day03Reference.isStrobogrammaticPalindrome(s) == (expected && palindrome), "intersection " + s);
        }
        for (String s : new String[]{"", "01", "-69", "6a9"}) {
            check(!Day03Reference.isStrobogrammatic(s), "reject noncanonical digits");
            check(!Day03Reference.isStrobogrammaticRecursive(s), "recursive reject noncanonical digits");
        }
        int[] expectedCounts = {3, 4, 12, 20, 60, 100, 300, 500};
        for (int n = 1; n <= 8; n++) {
            List<String> values = Day03Reference.generateStrobogrammatic(n);
            check(values.size() == expectedCounts[n - 1], "generation count " + n);
            check(new HashSet<>(values).size() == values.size(), "generation duplicates");
            for (int i = 0; i < values.size(); i++) {
                check(values.get(i).length() == n && rotationOracle(values.get(i)), "generated candidate");
                if (i > 0) check(values.get(i - 1).compareTo(values.get(i)) < 0, "generation order");
            }
        }
        expect(IllegalArgumentException.class, () -> Day03Reference.generateStrobogrammatic(0));
        expect(IllegalArgumentException.class, () -> Day03Reference.generateStrobogrammatic(9));
        System.out.println("All " + checks + " checks passed; product arrays: " + productArrays);
    }
}
