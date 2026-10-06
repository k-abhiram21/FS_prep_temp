import java.util.Arrays;

/** Day 1 reference methods. Attempt the worksheet before reading these. */
public final class Day01Reference {
    private Day01Reference() {}

    public static long[] productBrute(long[] a) {
        long[] answer = new long[a.length];
        Arrays.fill(answer, 1L);
        for (int i = 0; i < a.length; i++) {
            for (int j = 0; j < a.length; j++) {
                if (i != j) answer[i] = Math.multiplyExact(answer[i], a[j]);
            }
        }
        return answer;
    }

    // Three linear passes; O(n) extra space excluding the returned array.
    public static long[] productExceptSelf(long[] a) {
        int n = a.length;
        if (n == 0) return new long[0];
        long[] left = new long[n], right = new long[n], answer = new long[n];
        left[0] = 1;
        right[n - 1] = 1;
        for (int i = 1; i < n; i++) {
            left[i] = Math.multiplyExact(left[i - 1], a[i - 1]);
        }
        for (int i = n - 2; i >= 0; i--) {
            right[i] = Math.multiplyExact(right[i + 1], a[i + 1]);
        }
        for (int i = 0; i < n; i++) {
            answer[i] = Math.multiplyExact(left[i], right[i]);
        }
        return answer;
    }

    // O(1) extra space excluding output. Does not modify the input.
    public static long[] productOutputReuse(long[] a) {
        long[] answer = new long[a.length];
        long prefix = 1, suffix = 1;
        for (int i = 0; i < a.length; i++) {
            answer[i] = prefix;
            if (i + 1 < a.length) prefix = Math.multiplyExact(prefix, a[i]);
        }
        for (int i = a.length - 1; i >= 0; i--) {
            answer[i] = Math.multiplyExact(answer[i], suffix);
            if (i > 0) suffix = Math.multiplyExact(suffix, a[i]);
        }
        return answer;
    }

    public static long factorial(int n) {
        requireRange(n, 20, "factorial");
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    public static long fibNaive(int n) {
        requireRange(n, 30, "naive Fibonacci demo");
        if (n < 2) return n;
        return fibNaive(n - 1) + fibNaive(n - 2);
    }

    public static long fibMemo(int n) {
        requireRange(n, 92, "long Fibonacci");
        long[] memo = new long[n + 1];
        Arrays.fill(memo, -1L);
        return fibMemoHelper(n, memo);
    }

    private static long fibMemoHelper(int n, long[] memo) {
        if (n < 2) return n;
        if (memo[n] == -1) {
            memo[n] = fibMemoHelper(n - 1, memo) + fibMemoHelper(n - 2, memo);
        }
        return memo[n];
    }

    // Negative remaining steps represent an overshoot, contributing zero routes.
    public static long waysRecursive(int n) {
        if (n > 20) throw new IllegalArgumentException("naive stairs demo requires n <= 20");
        if (n < 0) return 0;
        if (n == 0) return 1;
        return waysRecursive(n - 1) + waysRecursive(n - 2);
    }

    public static long waysMemo(int n) {
        requireRange(n, 91, "long staircase");
        long[] memo = new long[n + 1];
        Arrays.fill(memo, -1L);
        return waysMemoHelper(n, memo);
    }

    private static long waysMemoHelper(int n, long[] memo) {
        if (n < 0) return 0;
        if (n == 0) return 1;
        if (memo[n] == -1) {
            memo[n] = waysMemoHelper(n - 1, memo) + waysMemoHelper(n - 2, memo);
        }
        return memo[n];
    }

    public static long waysIterative(int n) {
        requireRange(n, 91, "long staircase");
        long previousTwo = 1, previousOne = 1;
        for (int step = 2; step <= n; step++) {
            long current = previousOne + previousTwo;
            previousTwo = previousOne;
            previousOne = current;
        }
        return previousOne;
    }

    public static long sumFrom(long[] a) { return sumFrom(a, 0); }

    public static long sumFrom(long[] a, int i) {
        if (i < 0) throw new IllegalArgumentException("index must be nonnegative");
        if (i >= a.length) return 0;
        return Math.addExact(a[i], sumFrom(a, i + 1));
    }

    // StringBuilder captures output so traces can be checked without printing.
    public static void head(int n, StringBuilder out) {
        if (n <= 0) return;
        head(n - 1, out);
        out.append(n).append(' ');
    }

    public static void tail(int n, StringBuilder out) {
        if (n <= 0) return;
        out.append(n).append(' ');
        tail(n - 1, out);
    }

    public static int count = 0;

    public static void tree(int n, StringBuilder out) {
        count++;
        if (n <= 0) return;
        out.append(n).append(' ');
        tree(n - 1, out);
        tree(n - 1, out);
    }

    public static void A(int n, StringBuilder out) {
        if (n <= 0) return;
        out.append(n).append(' ');
        B(n - 1, out);
    }

    public static void B(int n, StringBuilder out) {
        if (n <= 0) return;
        out.append(n).append(' ');
        A(n / 2, out);
    }

    private static void requireRange(int n, int maximum, String label) {
        if (n < 0 || n > maximum) {
            throw new IllegalArgumentException(label + " requires 0 <= n <= " + maximum);
        }
    }

    public static void main(String[] args) {
        System.out.println("Product: " + Arrays.toString(productExceptSelf(new long[]{3, 2, 1, 4, 5})));
        System.out.println("Factorial(4): " + factorial(4));
        System.out.println("Fibonacci(6): " + fibMemo(6));
        System.out.println("Staircase(10): " + waysMemo(10));
        StringBuilder h = new StringBuilder(), t = new StringBuilder();
        StringBuilder branches = new StringBuilder(), indirect = new StringBuilder();
        head(4, h);
        tail(4, t);
        count = 0;
        tree(2, branches);
        A(10, indirect);
        System.out.println("Head(4): " + h);
        System.out.println("Tail(4): " + t);
        System.out.println("Tree(2): " + branches + "(calls=" + count + ")");
        System.out.println("Indirect A(10): " + indirect);
    }
}
