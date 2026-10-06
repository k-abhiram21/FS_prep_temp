import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

/** Day 3 recursion/string reference. No standalone prime implementation. */
public final class Day03Reference {
    private Day03Reference() {}
    private static final int[] ROTATION = {0, 1, -1, -1, -1, -1, 9, -1, 8, 6};
    private static final char[][] PAIRS = {{'0', '0'}, {'1', '1'}, {'6', '9'}, {'8', '8'}, {'9', '6'}};

    private static long magnitude(long x) {
        if (x == Long.MIN_VALUE) {
            throw new IllegalArgumentException("Long.MIN_VALUE magnitude does not fit in long");
        }
        return Math.abs(x);
    }

    private static long gcdNonnegative(long a, long b) {
        if (b == 0) return a;
        return gcdNonnegative(b, a % b);
    }

    public static long gcdRecursive(long a, long b) {
        return gcdNonnegative(magnitude(a), magnitude(b));
    }

    public static long gcdIterative(long a, long b) {
        a = magnitude(a);
        b = magnitude(b);
        while (b != 0) {
            long remainder = a % b;
            a = b;
            b = remainder;
        }
        return a;
    }

    // Empty/all-zero arrays have GCD 0. Stop once the answer reaches 1.
    public static long gcdArray(long[] values) {
        long result = 0;
        for (long x : values) {
            result = gcdRecursive(result, x);
            if (result == 1) return 1;
        }
        return result;
    }

    public static boolean canonicalDigits(String s) {
        if (s.isEmpty() || (s.length() > 1 && s.charAt(0) == '0')) return false;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c < '0' || c > '9') return false;
        }
        return true;
    }

    public static boolean isStrobogrammatic(String s) {
        if (!canonicalDigits(s)) return false;
        int left = 0, right = s.length() - 1;
        while (left <= right) {
            int mapped = ROTATION[s.charAt(left) - '0'];
            if (mapped < 0 || mapped != s.charAt(right) - '0') return false;
            left++;
            right--;
        }
        return true;
    }

    private static boolean checkRecursive(String s, int left, int right) {
        if (left >= right) return true; // half-open interval [left, right)
        int mapped = ROTATION[s.charAt(left) - '0'];
        if (mapped < 0 || mapped != s.charAt(right - 1) - '0') return false;
        return checkRecursive(s, left + 1, right - 1);
    }

    public static boolean isStrobogrammaticRecursive(String s) {
        return canonicalDigits(s) && checkRecursive(s, 0, s.length());
    }

    private static List<String> build(int remaining, int total) {
        if (remaining == 0) return new ArrayList<>(Collections.singletonList(""));
        if (remaining == 1) return new ArrayList<>(Arrays.asList("0", "1", "8"));
        List<String> middles = build(remaining - 2, total);
        List<String> answer = new ArrayList<>();
        for (String middle : middles) {
            for (char[] pair : PAIRS) {
                if (remaining == total && pair[0] == '0') continue;
                // The middle String makes this concatenation, not char addition.
                answer.add(pair[0] + middle + pair[1]);
            }
        }
        return answer;
    }

    public static List<String> generateStrobogrammatic(int digits) {
        if (digits < 1 || digits > 8) {
            throw new IllegalArgumentException("reference enumeration supports 1..8 digits");
        }
        List<String> answer = build(digits, digits);
        Collections.sort(answer);
        return answer;
    }

    public static boolean isStrobogrammaticPalindrome(String s) {
        if (!canonicalDigits(s)) return false;
        for (int left = 0; left < (s.length() + 1) / 2; left++) {
            char c = s.charAt(left);
            if ((c != '0' && c != '1' && c != '8') || c != s.charAt(s.length() - 1 - left)) {
                return false;
            }
        }
        return true;
    }

    // One command per run: gcd K x1 ... xK | check S | recursive S |
    // generate N | intersection S. Supply command via arguments or standard input.
    public static void main(String[] args) {
        try (Scanner input = args.length == 0 ? new Scanner(System.in) : new Scanner(String.join(" ", args))) {
            if (!input.hasNext()) throw new IllegalArgumentException("a command is required");
            String command = input.next();
            switch (command) {
                case "gcd":
                    int count = input.nextInt();
                    if (count < 0) throw new IllegalArgumentException("array size must be nonnegative");
                    long[] values = new long[count];
                    for (int i = 0; i < count; i++) values[i] = input.nextLong();
                    System.out.println(gcdArray(values));
                    break;
                case "generate":
                    for (String s : generateStrobogrammatic(input.nextInt())) System.out.println(s);
                    break;
                case "check":
                    System.out.println(isStrobogrammatic(input.next()));
                    break;
                case "recursive":
                    System.out.println(isStrobogrammaticRecursive(input.next()));
                    break;
                case "intersection":
                    System.out.println(isStrobogrammaticPalindrome(input.next()));
                    break;
                default:
                    throw new IllegalArgumentException("unknown command: " + command);
            }
        } catch (IllegalArgumentException | java.util.NoSuchElementException error) {
            System.err.println(error.getMessage());
            System.exit(1);
        }
    }
}
