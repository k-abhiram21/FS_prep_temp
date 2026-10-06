import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/** Day 2 reference methods; Happy Number is optional MCQ reading. */
public final class Day02Reference {
    private Day02Reference() {}

    public static long fibIterative(int n) {
        requireRange(n, 92, "long Fibonacci");
        if (n == 0) return 0;
        long a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            long next = a + b;
            a = b;
            b = next;
        }
        return b;
    }

    public static long fibState(int n) { return fibState(n, 0, 1); }

    public static long fibState(int remaining, long a, long b) {
        requireRange(remaining, 92, "state recursion demo");
        if (remaining == 0) return a;
        // Avoid forming the unused F(93) when requesting the representable F(92).
        if (remaining == 1) return b;
        return fibState(remaining - 1, b, Math.addExact(a, b));
    }

    public static long climbStairs(int n) {
        requireRange(n, 91, "long staircase");
        long previousTwo = 1, previousOne = 1;
        for (int step = 2; step <= n; step++) {
            long current = previousOne + previousTwo;
            previousTwo = previousOne;
            previousOne = current;
        }
        return previousOne;
    }

    public static long countWays(int n, int maxJump) {
        if (n < 0 || maxJump <= 0) return 0;
        requireRange(n, 91, "general-jump demo");
        long[] memo = new long[n + 1];
        Arrays.fill(memo, -1L);
        return countWaysMemo(n, maxJump, memo);
    }

    private static long countWaysMemo(int remaining, int maxJump, long[] memo) {
        if (remaining == 0) return 1;
        if (memo[remaining] != -1) return memo[remaining];
        long answer = 0;
        // Larger jumps would overshoot and contribute zero; do not recurse on them.
        for (int jump = 1; jump <= Math.min(maxJump, remaining); jump++) {
            answer = Math.addExact(answer, countWaysMemo(remaining - jump, maxJump, memo));
        }
        return memo[remaining] = answer;
    }

    // In-place reversal of the supplied UTF-16 code units; ASCII exercises use this.
    public static void reverseInPlace(char[] s) {
        int left = 0, right = s.length - 1;
        while (left < right) {
            char temporary = s[left];
            s[left++] = s[right];
            s[right--] = temporary;
        }
    }

    public static void reverseRecursive(char[] s) {
        reverseRecursive(s, 0, s.length - 1);
    }

    private static void reverseRecursive(char[] s, int left, int right) {
        if (left >= right) return;
        char temporary = s[left];
        s[left] = s[right];
        s[right] = temporary;
        reverseRecursive(s, left + 1, right - 1);
    }

    public static String reversedCopy(String s) {
        char[] characters = s.toCharArray();
        reverseInPlace(characters);
        return new String(characters);
    }

    public static int digitSquareSum(int n) {
        if (n < 0) throw new IllegalArgumentException("digits require nonnegative input");
        int sum = 0;
        while (n > 0) {
            int digit = n % 10;
            sum += digit * digit;
            n /= 10;
        }
        return sum;
    }

    public static boolean isHappy(int n) {
        if (n <= 0) return false;
        Set<Integer> seen = new HashSet<>();
        while (n != 1 && !seen.contains(n)) {
            seen.add(n);
            n = digitSquareSum(n);
        }
        return n == 1;
    }

    private static void requireRange(int n, int maximum, String label) {
        if (n < 0 || n > maximum) {
            throw new IllegalArgumentException(label + " requires 0 <= n <= " + maximum);
        }
    }

    public static void main(String[] args) {
        System.out.println("Fibonacci(6): " + fibIterative(6));
        System.out.println("State Fibonacci(6): " + fibState(6));
        System.out.println("Staircase(10): " + climbStairs(10));
        System.out.println("Ways(5,4): " + countWays(5, 4));
        System.out.println("Reverse DAA2026: " + reversedCopy("DAA2026"));
        System.out.println("Happy(13): " + isHappy(13));
        System.out.println("Happy(116): " + isHappy(116));
    }
}
