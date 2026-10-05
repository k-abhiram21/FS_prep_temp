import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class MainTokens {
    // Whitespace-token input only; this reader intentionally does not preserve lines.
    static class Tokens {
        final BufferedReader br = new BufferedReader(new InputStreamReader(System.in, StandardCharsets.UTF_8));
        StringTokenizer st;
        String next() throws IOException {
            while (st == null || !st.hasMoreTokens()) {
                String line = br.readLine();
                if (line == null) return null;
                st = new StringTokenizer(line);
            }
            return st.nextToken();
        }
        String required() throws IOException {
            String s = next();
            if (s == null) throw new EOFException("missing token");
            return s;
        }
        int nextInt() throws IOException { return Integer.parseInt(required()); }
        long nextLong() throws IOException { return Long.parseLong(required()); }
    }
    static long solve(long[] a) {
        long sum = 0;
        for (long x : a) sum += x; // Contract: mathematical sum fits signed 64-bit.
        return sum;
    }
    public static void main(String[] args) throws Exception {
        Tokens in = new Tokens();
        String first = in.next();
        if (first == null) return;
        int t = Integer.parseInt(first);
        StringBuilder out = new StringBuilder();
        while (t-- > 0) {
            int n = in.nextInt();
            long[] a = new long[n];
            for (int i = 0; i < n; i++) a[i] = in.nextLong();
            out.append(solve(a)).append('\n');
        }
        System.out.print(out);
    }
}
