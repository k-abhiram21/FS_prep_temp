import java.io.*;
import java.nio.charset.StandardCharsets;
public class MainLines {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, StandardCharsets.UTF_8));
        String first = br.readLine();
        if (first == null) return;
        int n = Integer.parseInt(first.trim());
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < n; i++) {
            String line = br.readLine();
            if (line == null) throw new EOFException("missing line");
            // Length is UTF-16 code units. Paired C++ demo assumes ASCII input.
            out.append(line.length()).append('|').append(line).append('\n');
        }
        System.out.print(out);
    }
}
