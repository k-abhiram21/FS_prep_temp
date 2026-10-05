# Hard Java code-scenario MCQs — complete DAA lecture scope

**160 questions; every question includes Java code.** This is the new exam-style bank. The earlier [250-question bank](FS_DAA_MCQ_Bank.md) is retained as concept/background practice. This bank uses Java17 semantics and avoids newer language features; the test's actual Java version still controls compilation on its platform.

**Depth allocation:** 130 questions focus on search, arithmetic/recurrences, graph algorithms, trees, parsing, or backtracking in the MCQ track; the remaining questions reinforce coding foundations and Java platform/API traps. Topics outside the announced coding syllabus are analysed here, not assigned as new full C++ coding work. Class evidence comes from [the lecture map](FS_Lecture_Coverage.md); **Extension** marks a new variant, API transfer or assignment-only concept. These are original reconstructed snippets, not copied exam questions or literal screen code.

Each snippet is a standalone `Main.java` program. Standard imports are included; no hidden Node/Edge helpers are needed. Inputs and observation points are explicit. Read exactly where a print occurs—`continue`, early returns and short-circuiting can skip it. Indexes are zero-based unless a rule says otherwise. Java integer overflow wraps; division truncates toward zero; operands/arguments evaluate left-to-right. Don't substitute C++ undefined-overflow or unspecified operand-order answers.

Evaluation follows the [Java Language Specification, expression rules](https://docs.oracle.com/javase/specs/jls/se17/html/jls-15.html#jls-15.7); Java API transfers use the official references linked at the end of this file.

For complexity: analyse the shown generalized method, not just the tiny example in main. Assume fixed-width arithmetic, normal expected hash costs only when specified, and copied-character cost for modern-JDK substring/concatenation. For recursive copy-space questions explicitly use a stack model retaining each frame's parameter string. Count invocation entries, new states, candidate trials and maximum active frames separately. Tests confirm outputs/exceptions, not asymptotic proofs.

## First timed pass

Diagnostic: J001, J007, J015, J022, J029, J034, J039, J043, J050, J055, J061, J066, J071, J076, J082, J087, J092, J097, J101, J107, J111, J116, J121, J126, J131, J136, J152, J044, J056, J067. Try30 minutes, skipping lengthy traces to return later, then review untimed. This is DAA-only practice; the actual30 exam MCQs span subjects. Hard questions may need more than one minute while learning.

On each mistake write: **line that changed state → invariant/cost I missed → smallest counterexample → repair**. Later select questions by topic rather than rereading answers.

## Coverage index

| Topic | IDs | Lecture evidence | Track |
|---|---|---|---|
| Recursion: local state, side effects and call trees | J001–J006 | Days 1–2 | Coding foundation / Java MCQ |
| Array and greedy method traces | J007–J014 | Days 1, 4–6, 14–18 | Coding foundation / Java MCQ |
| Power, Euclid, digit checks and recurrence cost | J015–J021 | Days 3–7 | MCQ depth: arithmetic / recurrence |
| Binary-search boundaries and pruning | J022–J028 | Days 7–9 | MCQ depth: search |
| Koko and monotone answer search | J029–J033 | Days 10–11; transfer extensions | MCQ depth: search |
| Median partitions and safe sentinels | J034–J038 | Days 11–13 | MCQ depth: search |
| LCP and Java copying costs | J039–J042 | Days 10–11 | MCQ depth: string search |
| Dijkstra: matrix and heap execution | J043–J049 | Days 14–15; heap extensions | MCQ depth: graph |
| Prim, graph representation and MST cost | J050–J054 | Days 14, 16–17 | MCQ depth: graph |
| DSU: compressed parents and rank | J055–J060 | Days 17–18 | MCQ depth: graph |
| Kruskal: accepted versus examined edges | J061–J065 | Day 18 | MCQ depth: graph |
| BFS: queue snapshots and duplicate discovery | J066–J070 | Days 19–21 | MCQ depth: graph traversal |
| DFS ordering and the actual maze | J071–J075 | Days 21–22 | MCQ depth: traversal/search |
| Grid islands: visitation, shape and ownership | J076–J081 | Days 19–20 | MCQ depth: graph/grid |
| Tree symmetry, height and lonely nodes | J082–J086 | Days 19–20, 23–24 | MCQ depth: tree |
| Balanced trees: return sentinels and repeated scans | J087–J091 | Days 23–24 | MCQ depth: tree |
| Level averages: live queue bounds and DFS state | J092–J096 | Days 23–24 | MCQ depth: tree |
| Boundary traversal: fallbacks and duplicate leaves | J097–J100 | Day 22 | MCQ depth: tree |
| N-Queens and shared backtracking state | J101–J106 | Day 25 | MCQ depth: backtracking |
| Maximum-gold search and restoration | J107–J110 | Day 25 | MCQ depth: path backtracking |
| Hamiltonian: closure, path state and search order | J111–J115 | Day 26 | MCQ depth: backtracking/graph |
| Brace expansion: parser state, union and products | J116–J120 | Day 26; nested formal grammar extension | MCQ depth: string parsing/backtracking |
| Gray code: bits, closure and representation | J121–J125 | Day 27 | MCQ depth: bit operations/sequence construction |
| Campus Bikes: assignment state and pruning | J126–J130 | Day 27 | MCQ depth: optimization/backtracking |
| Abbreviations and assignment-linked transfers | J131–J135 | Day 27; Additive Number / Beautiful Arrangement are assignment-only extensions | MCQ depth: string/backtracking |
| Java input, regex, overloads and collection traps | J136–J151 | Exam-platform transfer; official Java17 APIs | Java-only extension |
| Additional lecture coverage: cycles, GCD reductions and generators | J152–J160 | Days 2–7; Java comparison extension | MCQ depth: arithmetic/recurrence/generation |

## Recursion: local state, side effects and call trees

Evidence: Days 1–2. Track: Coding foundation / Java MCQ.

### J001 — Mutation between sibling calls

Exact printed token sequence?

```java
import java.util.*;
import java.io.*;

public class Main {
    static StringBuilder log=new StringBuilder();
    static void f(int n){
     if(n<=0){log.append("B ");return;}
     log.append(n).append(' ');
     f(--n);
     log.append(n).append(' ');
     f(--n);
    }

    public static void main(String[] args) throws Exception {
        f(2); System.out.println(log.toString().trim());
    }
}
```

A. 2 1 B 0 B 1 B  
B. 2 1 B 1 B 2 B  
C. 2 1 B 0 B 0 B  
D. 2 1 1 B B B  

<details><summary>Answer, trace and repair</summary>

**A. 2 1 B 0 B 1 B**

The first --n mutates only that caller frame. Inside f(1), the second decrement reaches−1; after returning to f(2), its n is1 and its second child receives0. Java evaluates sequential statements in order.

</details>

### J002 — Two evaluation side effects

Value and invocation count?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int calls=0;
    static int f(int n){calls++;if(n<=0)return 1;return f(--n)+f(n--);}

    public static void main(String[] args) throws Exception {
        int v=f(2);System.out.println(v+" "+calls);
    }
}
```

A. 3 5  
B. 4 5  
C. 8 15  
D. 4 7  

<details><summary>Answer, trace and repair</summary>

**D. 4 7**

Left argument decrements the parent before its call. Right n-- then passes the parent’s current value and decrements it. Each f(1) has two base children; total seven entries.

</details>

### J003 — Persistent memo versus entry counter

Printed result after both calls?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[] memo=new int[10];static int calls;
    static int f(int n){calls++;if(n<2)return n;if(memo[n]!=0)return memo[n];return memo[n]=f(n-1)+f(n-2);}

    public static void main(String[] args) throws Exception {
        int a=f(5),b=f(5);System.out.println(a+" "+b+" "+calls);
    }
}
```

A. 5 5 15  
B. 5 5 9  
C. 5 5 10  
D. 5 5 18  

<details><summary>Answer, trace and repair</summary>

**C. 5 5 10**

The first memoized call has nine entries, including cache hits and bases; the second enters once then returns cached5. Counting only newly computed states misses cache-hit entries.

</details>

### J004 — Indirect recursion depth

Printed values and calls including guarded entry?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int calls;static StringBuilder s=new StringBuilder();
    static void a(int n){calls++;if(n<=0)return;s.append(n).append(' ');b(n-1);}
    static void b(int n){calls++;if(n<=0)return;s.append(n).append(' ');a(n/2);}

    public static void main(String[] args) throws Exception {
        a(10);System.out.println(s.toString().trim()+" | "+calls);
    }
}
```

A. 10 9 8 7 6 | 6  
B. 10 9 4 3 1 | 6  
C. 10 9 4 3 1 | 5  
D. 10 5 4 2 1 | 6  

<details><summary>Answer, trace and repair</summary>

**B. 10 9 4 3 1 | 6**

a10→b9→a4→b3→a1→b0. The last entry increments but prints nothing. For variable positive n the depth is Θ(log n).

</details>

### J005 — Accumulator still uses frames

Ignoring arithmetic overflow, time and stack as n grows?

```java
import java.util.*;
import java.io.*;

public class Main {
    static long f(int n,long a,long b){if(n==0)return a;return f(n-1,b,a+b);}

    public static void main(String[] args) throws Exception {
        System.out.println(f(8,0,1));
    }
}
```

A. Θ(n) time, Θ(n) Java stack  
B. Θ(n) time, guaranteed Θ(1) stack  
C. Θ(2^n) time, Θ(n) stack  
D. Θ(log n) time, Θ(log n) stack  

<details><summary>Answer, trace and repair</summary>

**A. Θ(n) time, Θ(n) Java stack**

One call decreases n by1, so there are n+1 active entries down the chain. Java gives no guaranteed tail-call elimination; observed value21 is separate from asymptotic analysis.

</details>

### J006 — Missing progress is an error

Correct diagnosis and repair?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int f(int n){if(n==0)return 0;return f(n--);}

    public static void main(String[] args) throws Exception {
        System.out.println(f(2));
    }
}
```

A. Child receives1; prints0  
B. Compilation fails because post-decrement cannot be an argument  
C. It prints2 with constant space  
D. Child repeatedly receives2; use f(n-1) to make progress  

<details><summary>Answer, trace and repair</summary>

**D. Child repeatedly receives2; use f(n-1) to make progress**

Post-decrement’s expression value is the old n. Each new frame gets2 even though its suspended parent changed locally. The snippet eventually exhausts stack; it is reviewed statically, not run.

</details>

## Array and greedy method traces

Evidence: Days 1, 4–6, 14–18. Track: Coding foundation / Java MCQ.

### J007 — Product-prefix snapshot

After suffix iteration i=1, what is printed?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] a={2,0,4};long[] out=new long[a.length];long p=1;
        for(int i=0;i<a.length;i++){out[i]=p;p*=a[i];}
        long suf=1;
        for(int i=a.length-1;i>=0;i--){out[i]*=suf;suf*=a[i];if(i==1)System.out.println(Arrays.toString(out)+" "+suf);}
    }
}
```

A. [0, 8, 0] 0  
B. [1, 2, 0] 4  
C. [1, 8, 0] 0  
D. [1, 8, 0] 4  

<details><summary>Answer, trace and repair</summary>

**C. [1, 8, 0] 0**

Prefix outputs were1,2,0. At i2 suffix becomes4; i1 becomes8 then suffix multiplies zero. Index0 has not yet received its suffix.

</details>

### J008 — Partition before the final swap

State before placing pivot?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] a={60,50,20,70,30};int i=0,p=a[4];
        for(int j=0;j<4;j++)if(a[j]<p){int t=a[i];a[i++]=a[j];a[j]=t;}
        System.out.println(Arrays.toString(a)+" "+i);
    }
}
```

A. [20, 30, 60, 70, 50] 1  
B. [20, 50, 60, 70, 30] 1  
C. [20, 50, 60, 70, 30] 2  
D. [30, 50, 20, 70, 60] 0  

<details><summary>Answer, trace and repair</summary>

**B. [20, 50, 60, 70, 30] 1**

Only20 passes. Final pivot placement is absent here; do not answer with the post-partition array.

</details>

### J009 — Equal-key merge stability

Output and minimal repair for stability?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] L={2,2},R={2};String[] l={"A","B"},r={"C"};
        int i=0,j=0;StringBuilder out=new StringBuilder();
        while(i<L.length&&j<R.length){if(L[i]<R[j])out.append(l[i++]);else out.append(r[j++]);}
        while(i<L.length)out.append(l[i++]);while(j<R.length)out.append(r[j++]);
        System.out.println(out);
    }
}
```

A. CAB; change < to <=  
B. ABC; no repair needed  
C. ACB; reverse right run  
D. CAB; swap input halves  

<details><summary>Answer, trace and repair</summary>

**A. CAB; change < to <=**

On equality it currently chooses the later right record. Choosing the left run on ties preserves original equal-key order.

</details>

### J010 — Voting count versus frequency

State after index5 and at end?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] a={1,2,2,2,1,1,1,1,1,2};int cand=0,count=0;
        for(int i=0;i<a.length;i++){if(count==0)cand=a[i];count+=a[i]==cand?1:-1;if(i==5)System.out.print(cand+":"+count+" ");}
        System.out.println(cand+":"+count);
    }
}
```

A. 1:2 1:6  
B. 2:2 1:2  
C. 1:0 2:2  
D. 2:0 1:2  

<details><summary>Answer, trace and repair</summary>

**D. 2:0 1:2**

Through index5 two twos are cancelled back to0; candidate remains2 until index6 resets it to1. Final surplus2 is not frequency6.

</details>

### J011 — One versus unlimited transaction state

State just after index4?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] p={7,1,5,3,6,4};int min=p[0],one=0,many=0;
        for(int i=1;i<p.length;i++){one=Math.max(one,p[i]-min);min=Math.min(min,p[i]);many+=Math.max(0,p[i]-p[i-1]);if(i==4)System.out.println(min+" "+one+" "+many);}
    }
}
```

A. 1 7 5  
B. 3 3 7  
C. 1 5 7  
D. 1 5 5  

<details><summary>Answer, trace and repair</summary>

**C. 1 5 7**

Best single trade is1→6; unlimited gains are1→5 and3→6. The final4 has not been visited at this observation point.

</details>

### J012 — Density comparator truncates

What defect does this comparator contain despite this output looking reasonable?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[][] x={{5,2},{7,3}};
        Arrays.sort(x,(a,b)->Integer.compare(b[0]/b[1],a[0]/a[1]));
        System.out.println(Arrays.deepToString(x));
    }
}
```

A. It sorts ascending density exactly  
B. Integer division can hide unequal densities; compare safe cross products or double ratios  
C. Object-array sort must always reverse equal keys  
D. The input values cause division by zero  

<details><summary>Answer, trace and repair</summary>

**B. Integer division can hide unequal densities; compare safe cross products or double ratios**

Both ratios truncate to2, so input order can decide a false tie. Reversing these records is a counterexample. For bounded integers compare valueA*weightB with valueB*weightA after widening.

</details>

### J013 — Dropping the wrong negative

Bug and printed wrong result?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] a={-2,-3,4};long product=1;int drop=Integer.MAX_VALUE;
        for(int x:a){product*=x;if(x<0)drop=Math.min(drop,x);}
        System.out.println(product/drop);
    }
}
```

A. Prints−8; track the largest negative (closest to zero) instead  
B. Prints−12 correctly  
C. Prints24; division must be removed  
D. Throws because negative divisors are illegal  

<details><summary>Answer, trace and repair</summary>

**A. Prints−8; track the largest negative (closest to zero) instead**

Product24 divided by−3 gives−8. The correct minimum subset is−3*4=−12, obtained by dropping−2.

</details>

### J014 — Suffix maxima tie bug

Output and tie repair?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        char[] a="1993".toCharArray();int[] best=new int[a.length];best[3]=3;
        for(int i=2;i>=0;i--)best[i]=a[i]>=a[best[i+1]]?i:best[i+1];
        for(int i=0;i<4;i++)if(a[i]<a[best[i]]){char t=a[i];a[i]=a[best[i]];a[best[i]]=t;break;}
        System.out.println(new String(a));
    }
}
```

A. 9913; already optimal  
B. 9931; sort suffix  
C. 1993; swap condition is never true  
D. 9193; use > rather than >= in the suffix update  

<details><summary>Answer, trace and repair</summary>

**D. 9193; use > rather than >= in the suffix update**

Equality replaces the rightmost9 with the earlier9. Keep the existing farther-right maximum on ties to obtain9913.

</details>

## Power, Euclid, digit checks and recurrence cost

Evidence: Days 3–7. Track: MCQ depth: arithmetic / recurrence.

### J015 — Half-result reuse counts

Return value and entries including base?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int calls;
    static long f(long x,int n){calls++;if(n==0)return 1;long t=f(x,n/2);return n%2==0?t*t:t*t*x;}

    public static void main(String[] args) throws Exception {
        System.out.println(f(2,13)+" "+calls);
    }
}
```

A. 8192 4  
B. 4096 5  
C. 8192 5  
D. 8192 31  

<details><summary>Answer, trace and repair</summary>

**C. 8192 5**

Argument chain13,6,3,1,0 has five calls; only one half result is recursively computed.

</details>

### J016 — Duplicate recursion hidden by multiplication

For power-of-two n, time and active stack?

```java
import java.util.*;
import java.io.*;

public class Main {
    static long f(int n){if(n<=1)return 1;return f(n/2)*f(n/2);}

    public static void main(String[] args) throws Exception {
        System.out.println(f(16));
    }
}
```

A. Θ(log n) time and stack  
B. Θ(n) time, Θ(log n) stack  
C. Θ(nlog n) time, Θ(n) stack  
D. Θ(2^n) time and stack  

<details><summary>Answer, trace and repair</summary>

**B. Θ(n) time, Θ(log n) stack**

Two independent half calls give T(n)=2T(n/2)+Θ(1). The result1 does not imply constant runtime.

</details>

### J017 — Widening expression placement

Exact printed values?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int n=Integer.MIN_VALUE;long a=-n,b=-(long)n;
        System.out.println(a+" "+b);
    }
}
```

A. -2147483648 2147483648  
B. 2147483648 2147483648  
C. -2147483648 -2147483648  
D. Compilation failure  

<details><summary>Answer, trace and repair</summary>

**A. -2147483648 2147483648**

-n first overflows int and is then widened. -(long)n negates a representable long magnitude.

</details>

### J018 — Euclid snapshot

Third-iteration state followed by final GCD/iterations?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int a=77,b=10,k=0;
        while(b!=0){int r=a%b;a=b;b=r;if(++k==3)System.out.println(a+" "+b);}
        System.out.println(a+" "+k);
    }
}
```

A. 7 3 / 1 4  
B. 3 1 / 1 3  
C. 1 0 / 1 4  
D. 3 1 / 1 4  

<details><summary>Answer, trace and repair</summary>

**D. 3 1 / 1 4**

Transitions are(10,7),(7,3),(3,1),(1,0). Observe after updates, and include the last iteration producing0.

</details>

### J019 — Square-root boundary defect

Output and boundary repair?

```java
import java.util.*;
import java.io.*;

public class Main {
    static boolean prime(int n){if(n<2)return false;for(int d=2;d*d<n;d++)if(n%d==0)return false;return true;}

    public static void main(String[] args) throws Exception {
        System.out.println(prime(49)+" "+prime(25));
    }
}
```

A. false false; code correct  
B. true false; use d<n  
C. true true; use <= at the square boundary  
D. false true; begin d at1  

<details><summary>Answer, trace and repair</summary>

**C. true true; use <= at the square boundary**

The only nontrivial divisors7 and5 are skipped when d*d equals n. For arbitrary int n also use d<=n/d to avoid multiplication overflow.

</details>

### J020 — Two half calls plus loop

Time for power-of-two n and stack?

```java
import java.util.*;
import java.io.*;

public class Main {
    static long f(int n){if(n<=1)return 1;long s=0;for(int i=0;i<n;i++)for(int j=0;j<n;j++)s++;return s+f(n/2)+f(n/2);}

    public static void main(String[] args) throws Exception {
        System.out.println(f(4));
    }
}
```

A. Θ(n²log n) time, Θ(n) stack  
B. Θ(n²) time, Θ(log n) stack  
C. Θ(nlog n) time, Θ(log n) stack  
D. Θ(2^n) time, Θ(n²) stack  

<details><summary>Answer, trace and repair</summary>

**B. Θ(n²) time, Θ(log n) stack**

T(n)=2T(n/2)+Θ(n²). Toll dominates because2<4; active frames follow one logarithmic-depth path.

</details>

### J021 — String centre cannot be ignored

Output and hidden bug?

```java
import java.util.*;
import java.io.*;

public class Main {
    static boolean ok(String s){int l=0,r=s.length()-1;while(l<r){char a=s.charAt(l++),b=s.charAt(r--);if(!((a=='6'&&b=='9')||(a=='9'&&b=='6')||(a==b&&"018".indexOf(a)>=0)))return false;}return true;}

    public static void main(String[] args) throws Exception {
        System.out.println(ok("629")+" "+ok("619"));
    }
}
```

A. true true; the odd centre2 is never checked  
B. false true; checker correct  
C. true false; reject centre1  
D. false false; 6/9 pairing invalid  

<details><summary>Answer, trace and repair</summary>

**A. true true; the odd centre2 is never checked**

Only the6/9 outer pair is examined. Change loop to l<=r (with correct indexes) so an odd centre must map to itself.

</details>

## Binary-search boundaries and pruning

Evidence: Days 7–9. Track: MCQ depth: search.

### J022 — Exact lower-bound interval sequence

Midpoints and final boundary?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] a={1,2,2,2,4};int lo=0,hi=a.length;StringBuilder s=new StringBuilder();
        while(lo<hi){int m=lo+(hi-lo)/2;s.append(m).append(' ');if(a[m]>=2)hi=m;else lo=m+1;}
        System.out.println(s.toString().trim()+" | "+lo);
    }
}
```

A. 2 1 | 1  
B. 2 3 | 3  
C. 2 0 | 0  
D. 2 1 0 | 1  

<details><summary>Answer, trace and repair</summary>

**D. 2 1 0 | 1**

Half-open[0,5)→[0,2)→[0,1)→[1,1). Equality moves hi, retaining earlier occurrences.

</details>

### J023 — Closed-loop no progress

Output and repair to guarantee progress?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] a={1,3};int lo=0,hi=1,steps=0;
        while(lo<=hi&&steps<4){int m=(lo+hi)/2;if(a[m]<2)lo=m;else hi=m-1;steps++;}
        System.out.println(lo+" "+hi+" "+steps);
    }
}
```

A. 1 1 2; no bug  
B. 0 0 4; use hi=m  
C. 0 1 4; replace lo=m by lo=m+1  
D. 1 0 1; change <= to < only  

<details><summary>Answer, trace and repair</summary>

**C. 0 1 4; replace lo=m by lo=m+1**

m remains0; assigning lo0 cannot shrink the interval. The cap allows this faulty loop to be safely executed.

</details>

### J024 — Pruned sorted count entries

Count and entries?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int calls;
    static int f(int[] a,int lo,int hi){calls++;if(lo>hi||a[hi]==0)return 0;if(a[lo]==1)return hi-lo+1;int m=(lo+hi)/2;return f(a,lo,m)+f(a,m+1,hi);}

    public static void main(String[] args) throws Exception {
        System.out.println(f(new int[]{0,0,0,0,1,1,1,1,1,1,1,1,1},0,12)+" "+calls);
    }
}
```

A. 9 7  
B. 9 13  
C. 8 7  
D. 9 5  

<details><summary>Answer, trace and repair</summary>

**D. 9 5**

Root0..12 splits0..6 and7..12; mixed0..6 splits0..3 (pure0) and4..6 (pure1). Five entries produce9 ones. Both-call syntax still leaves only one mixed boundary path.

</details>

### J025 — Pruned count asymptotics

For sorted0/1 arrays, worst-case time and stack?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int f(int[] a,int l,int r){if(l>r||a[r]==0)return 0;if(a[l]==1)return r-l+1;int m=(l+r)/2;return f(a,l,m)+f(a,m+1,r);}

    public static void main(String[] args) throws Exception {
        System.out.println(f(new int[]{0,0,1,1},0,3));
    }
}
```

A. Θ(log n) time and O(log n) stack  
B. Θ(n) time because two calls appear  
C. Θ(nlog n) time  
D. Θ(1) time for every arrangement  

<details><summary>Answer, trace and repair</summary>

**A. Θ(log n) time and O(log n) stack**

Only the range crossing the single0/1 transition remains mixed; its sibling is pure. Fixed-size observed input is not the asymptotic domain.

</details>

### J026 — Rotation search with equality

Interval entries and minimum index?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] a={2,2,2,0,1,2};int l=0,r=5;StringBuilder s=new StringBuilder();
        while(l<r){int m=(l+r)/2;s.append(l).append(':').append(r).append(' ');if(a[m]>a[r])l=m+1;else if(a[m]<a[r])r=m;else r--;}
        System.out.println(s.toString().trim()+" | "+l);
    }
}
```

A. 0:5 3:5 3:4 | 3  
B. 0:5 0:2 | 0  
C. 0:5 0:4 | 4  
D. 0:5 0:4 3:4 | 3  

<details><summary>Answer, trace and repair</summary>

**D. 0:5 0:4 3:4 | 3**

First equality removes one trailing2. Next mid2 value2>right1, so l3; then mid3 value0<right1 gives r3. Duplicates can make this linear.

</details>

### J027 — Fixed-point duplicate counterexample

Result and invalid assumption?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] a={0,0,0,0,0};int l=0,r=4,ans=-1;
        while(l<=r){int m=(l+r)/2;if(a[m]==m){ans=m;break;}if(a[m]<m)l=m+1;else r=m-1;}
        System.out.println(ans);
    }
}
```

A. 0, correct logarithmic search for all sorted arrays  
B. 4, because last index equals its value  
C. −1 despite index0 being fixed; duplicate values invalidate this half-discard rule  
D. Compilation failure  

<details><summary>Answer, trace and repair</summary>

**C. −1 despite index0 being fixed; duplicate values invalidate this half-discard rule**

Mids2,3,4 all compare below their index and discard the left side. Distinct sorted integers make a[i]−i monotone; duplicates do not.

</details>

### J028 — Row occurrence masquerades as row membership

Printed result and minimal logical repair?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[][] a={{2,2},{3,4}};Map<Integer,Integer> f=new HashMap<>();
        for(int[] row:a)for(int x:row)f.merge(x,1,Integer::sum);
        System.out.println(f.get(2)==a.length);
    }
}
```

A. false; primitive comparison already deduplicates  
B. true incorrectly; increment each value only once per row  
C. true correctly;2 is in both rows  
D. Change HashMap to TreeMap and counting becomes correct  

<details><summary>Answer, trace and repair</summary>

**B. true incorrectly; increment each value only once per row**

Count2 came entirely from row0. A per-row set or last-row marker preserves membership counting; ordering the map does not fix it.

</details>

## Koko and monotone answer search

Evidence: Days 10–11; transfer extensions. Track: MCQ depth: search.

### J029 — Search state after second test

Second-test state followed by answer?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] a={3,6,7,11};int l=1,r=11,tests=0;
        while(l<r){int m=(l+r)/2;long h=0;for(int x:a)h+=((long)x+m-1)/m;if(h<=8)r=m;else l=m+1;if(++tests==2)System.out.println(l+" "+r+" "+m+" "+h);}
        System.out.println(l);
    }
}
```

A. 4 6 3 10 / 4  
B. 3 6 3 8 / 3  
C. 4 5 5 8 / 4  
D. 1 6 6 6 / 4  

<details><summary>Answer, trace and repair</summary>

**A. 4 6 3 10 / 4**

Test6 is feasible, narrowing hi6; test3 requires10 hours and raises lo4. Observe after the bound update.

</details>

### J030 — Overflow before long assignment

Printed hours?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int p=2_000_000_000,k=2_000_000_000;
        long a=(p+k-1)/k,b=((long)p+k-1)/k;
        System.out.println(a+" "+b);
    }
}
```

A. 1 1  
B. -1 1  
C. Compilation error  
D. 0 1  

<details><summary>Answer, trace and repair</summary>

**D. 0 1**

Int sum wraps to a negative small magnitude whose division by2 billion truncates to0. Widen before addition; declaring only the destination long is too late.

</details>

### J031 — Ceiling is per pile

Aggregate ceiling versus correct pile hours?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] a={30,11,23,4,20};int k=22;long sum=0,h=0;
        for(int x:a){sum+=x;h+=(x+k-1)/k;}
        System.out.println((sum+k-1)/k+" "+h);
    }
}
```

A. 7 7  
B. 4 6  
C. 4 7  
D. 5 7  

<details><summary>Answer, trace and repair</summary>

**C. 4 7**

ceil88/22=4 merges work across piles, forbidden by the one-pile-per-hour rule. Individual ceilings2,1,2,1,1 sum7.

</details>

### J032 — Predicate cost hidden inside loop

Worst-case time when n piles and maxM?

```java
import java.util.*;
import java.io.*;

public class Main {
    static boolean ok(int[] a,int k,int h){long s=0;for(int x:a)s+=((long)x+k-1)/k;return s<=h;}
    static int f(int[] a,int h,int M){int l=1,r=M;while(l<r){int m=(l+r)/2;if(ok(a,m,h))r=m;else l=m+1;}return l;}

    public static void main(String[] args) throws Exception {
        System.out.println(f(new int[]{3,6,7,11},8,11));
    }
}
```

A. O(log n), O(1) space  
B. O(n log M), O(1) auxiliary space  
C. O(n log n) due to mandatory sorting  
D. O(M), O(n) space  

<details><summary>Answer, trace and repair</summary>

**B. O(n log M), O(1) auxiliary space**

Each threshold test scans n entries; there are logarithmically many speeds. The actual input order need not be sorted.

</details>

### J033 — Contiguous partition feasibility

**Extension.** Number of parts at limits17 and18 for this nonnegative array?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int parts(int[] a,int limit){int p=1,s=0;for(int x:a){if(s+x>limit){p++;s=x;}else s+=x;}return p;}

    public static void main(String[] args) throws Exception {
        int[] a={7,2,5,10,8};System.out.println(parts(a,17)+" "+parts(a,18));
    }
}
```

A. 3 2  
B. 2 2  
C. 3 3  
D. 2 3  

<details><summary>Answer, trace and repair</summary>

**A. 3 2**

At17 segments[7,2,5],[10],[8]; at18 segments[7,2,5],[10,8]. Nonnegative values justify this greedy feasibility; arbitrary negatives need a different argument.

</details>

## Median partitions and safe sentinels

Evidence: Days 11–13. Track: MCQ depth: search.

### J034 — Cuts are counts

Partition status and boundary values?

```java
import java.util.*;
import java.io.*;

public class Main {
    static String part(int[] a,int[] b,int i){int j=(a.length+b.length+1)/2-i;
    long la=i==0?Long.MIN_VALUE:a[i-1],ra=i==a.length?Long.MAX_VALUE:a[i];
    long lb=j==0?Long.MIN_VALUE:b[j-1],rb=j==b.length?Long.MAX_VALUE:b[j];
    return i+" "+j+" "+(la<=rb&&lb<=ra)+" "+Math.max(la,lb)+" "+Math.min(ra,rb);}

    public static void main(String[] args) throws Exception {
        System.out.println(part(new int[]{1,2},new int[]{3,4,5,6},1));
    }
}
```

A. 1 1 true 3 4  
B. 1 2 true 4 5  
C. 1 3 false 5 2  
D. 1 2 false 4 2  

<details><summary>Answer, trace and repair</summary>

**D. 1 2 false 4 2**

LeftSize3 gives j2; B’s left boundary4 exceeds A’s right boundary2. Increase A cut to repair.

</details>

### J035 — Repaired even cut

Valid cut record?

```java
import java.util.*;
import java.io.*;

public class Main {
    static String part(int[] a,int[] b,int i){int j=(a.length+b.length+1)/2-i;
    long la=i==0?Long.MIN_VALUE:a[i-1],ra=i==a.length?Long.MAX_VALUE:a[i];
    long lb=j==0?Long.MIN_VALUE:b[j-1],rb=j==b.length?Long.MAX_VALUE:b[j];
    return i+" "+j+" "+(la<=rb&&lb<=ra)+" "+Math.max(la,lb)+" "+Math.min(ra,rb);}

    public static void main(String[] args) throws Exception {
        System.out.println(part(new int[]{1,2},new int[]{3,4,5,6},2));
    }
}
```

A. 2 2 true 4 5  
B. 2 1 false 3 4  
C. 2 1 true 3 4  
D. 1 2 true 4 2  

<details><summary>Answer, trace and repair</summary>

**C. 2 1 true 3 4**

A contributes both elements left; B contributes3. Median is(3+4)/2.0=3.5, since total6 is even.

</details>

### J036 — Sentinel zero is not infinity

Why is false a bug for this otherwise valid empty-A cut?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] a={},b={-5,-3,-1};int i=0,j=2;
        int la=i==0?0:a[i-1],ra=i==a.length?0:a[i];
        int lb=b[j-1],rb=b[j];
        System.out.println(la<=rb&&lb<=ra);
    }
}
```

A. Median is undefined whenever either array empty  
B. Zero sentinels exclude valid negative values; use negative/positive infinity boundaries  
C. Arrays must have nonnegative values  
D. Only the j value is wrong  

<details><summary>Answer, trace and repair</summary>

**B. Zero sentinels exclude valid negative values; use negative/positive infinity boundaries**

Conceptual missing-left must be smaller than−1; missing-right must be larger than everything. Both zero is invalid for general int values.

</details>

### J037 — Overflow in mean

Printed means?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int x=Integer.MAX_VALUE,y=Integer.MAX_VALUE;
        double a=(x+y)/2.0,b=((long)x+y)/2.0;
        System.out.printf(java.util.Locale.ROOT,"%.1f %.1f%n",a,b);
    }
}
```

A. -1.0 2147483647.0  
B. 2147483647.0 2147483647.0  
C. -1.0 -1.0  
D. 0.0 2147483647.0  

<details><summary>Answer, trace and repair</summary>

**A. -1.0 2147483647.0**

x+y wraps to−2 as int. Cast before addition, not after evaluating an overflowed sum.

</details>

### J038 — Incremental merge observation

At merged index2, state?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] a={1,4},b={2,3,5};int i=0,j=0,prev=0,cur=0;
        for(int k=0;k<=2;k++){prev=cur;if(j==b.length||(i<a.length&&a[i]<=b[j]))cur=a[i++];else cur=b[j++];if(k==2)System.out.println(i+" "+j+" "+prev+" "+cur);}
    }
}
```

A. 2 1 2 4  
B. 1 2 1 3  
C. 1 3 3 5  
D. 1 2 2 3  

<details><summary>Answer, trace and repair</summary>

**D. 1 2 2 3**

Selections are1,2,3. Array A consumed one element, B two; prev holds2,cur3. Odd total5 median iscur3.

</details>

## LCP and Java copying costs

Evidence: Days 10–11. Track: MCQ depth: string search.

### J039 — Set state leaked across columns

State at termination and repair?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        String[] a={"ab","ab"};Set<Character> seen=new HashSet<>();int len=0;
        for(int i=0;i<2;i++){for(String s:a)seen.add(s.charAt(i));if(seen.size()!=1)break;len++;}
        System.out.println(len+" "+seen.size());
    }
}
```

A. 2 1; correct  
B. 0 2; use TreeSet  
C. 1 2; clear seen at each column  
D. 1 1; create one more input string  

<details><summary>Answer, trace and repair</summary>

**C. 1 2; clear seen at each column**

Column0 inserts a; column1 adds b to old state. Agreement within the second column is obscured by leftover a.

</details>

### J040 — Prefix search check count

Final length and startsWith invocation count?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int checks;
    static boolean ok(String[] a,int n){String p=a[0].substring(0,n);for(String s:a){checks++;if(!s.startsWith(p))return false;}return true;}

    public static void main(String[] args) throws Exception {
        String[] a={"gene","genesis","general"};int l=0,r=4;while(l<r){int m=(l+r+1)/2;if(ok(a,m))l=m;else r=m-1;}System.out.println(l+" "+checks);
    }
}
```

A. 3 6  
B. 4 9  
C. 4 6  
D. 3 9  

<details><summary>Answer, trace and repair</summary>

**B. 4 9**

Upper-mid candidates2,3,4 each succeed and scan three strings. This input’s common prefix isgene, notgen.

</details>

### J041 — Length search character complexity

For N identical strings lengthL, under Java17 copying/character-scan cost, worst-case character work?

```java
import java.util.*;
import java.io.*;

public class Main {
    static boolean ok(String[] a,int k){String p=a[0].substring(0,k);for(String s:a)if(!s.startsWith(p))return false;return true;}
    static int f(String[] a,int L){int l=0,r=L;while(l<r){int m=(l+r+1)/2;if(ok(a,m))l=m;else r=m-1;}return l;}

    public static void main(String[] args) throws Exception {
        System.out.println(f(new String[]{"aaaa","aaaa"},4));
    }
}
```

A. Θ(N L log L) for N>=1,L growing  
B. Θ(N log L) because startsWith is constant-time  
C. Θ(log L) total  
D. Θ(NL) because binary search eliminates copying  

<details><summary>Answer, trace and repair</summary>

**A. Θ(N L log L) for N>=1,L growing**

Each tested feasible prefix is a substantial fraction ofL; startsWith scans its characters and substring copies. Θ(logL) tests do not make those inner operations free.

</details>

### J042 — Recursive substring cost

**Extension.** With modern copied substrings, total time and peak live character storage?

```java
import java.util.*;
import java.io.*;

public class Main {
    static String rev(String s){if(s.length()<=1)return s;return rev(s.substring(1))+s.charAt(0);}

    public static void main(String[] args) throws Exception {
        System.out.println(rev("abcd"));
    }
}
```

A. Θ(n) time, Θ(1) space  
B. Θ(log n) time, Θ(n) space  
C. Θ(nlog n) time, Θ(log n) stack  
D. Θ(n²) time and potentially Θ(n²) live characters across frames  

<details><summary>Answer, trace and repair</summary>

**D. Θ(n²) time and potentially Θ(n²) live characters across frames**

Suffix copies of lengths n−1,n−2,… remain referenced by active frames; returned-string concatenation also copies. Index-based char-array recursion avoids those suffix copies.

</details>

## Dijkstra: matrix and heap execution

Evidence: Days 14–15; heap extensions. Track: MCQ depth: graph.

### J043 — After two finalized vertices

dist after processing source2 and then next vertex?

```java
import java.util.*;
import java.io.*;

public class Main {
    static final int INF=999;
    static int[][] g={{0,6,5,0,13},{6,0,12,9,5},{5,12,0,0,0},{0,9,0,0,0},{13,5,0,0,0}};
    static int[] run(int source,int stop){int n=g.length;int[] d=new int[n];Arrays.fill(d,INF);boolean[] seen=new boolean[n];d[source]=0;
    for(int k=0;k<stop;k++){int u=-1;for(int v=0;v<n;v++)if(!seen[v]&&(u==-1||d[v]<d[u]))u=v;if(u==-1||d[u]==INF)break;seen[u]=true;
    for(int v=0;v<n;v++)if(!seen[v]&&g[u][v]!=0&&d[u]+g[u][v]<d[v])d[v]=d[u]+g[u][v];}return d;}

    public static void main(String[] args) throws Exception {
        System.out.println(Arrays.toString(run(2,2)));
    }
}
```

A. [5, 12, 0, 9, 13]  
B. [5, 6, 0, 999, 13]  
C. [5, 11, 0, 999, 18]  
D. [5, 11, 0, 20, 16]  

<details><summary>Answer, trace and repair</summary>

**C. [5, 11, 0, 999, 18]**

After source2 tentative values are5,12,0,∞,∞. Processing0 improves1 to11 and4 to18; vertex3 is still untouched.999 denotes infinity only for these small weights.

</details>

### J044 — Finished distance array

Final distance array?

```java
import java.util.*;
import java.io.*;

public class Main {
    static final int INF=999;
    static int[][] g={{0,6,5,0,13},{6,0,12,9,5},{5,12,0,0,0},{0,9,0,0,0},{13,5,0,0,0}};
    static int[] run(int source,int stop){int n=g.length;int[] d=new int[n];Arrays.fill(d,INF);boolean[] seen=new boolean[n];d[source]=0;
    for(int k=0;k<stop;k++){int u=-1;for(int v=0;v<n;v++)if(!seen[v]&&(u==-1||d[v]<d[u]))u=v;if(u==-1||d[u]==INF)break;seen[u]=true;
    for(int v=0;v<n;v++)if(!seen[v]&&g[u][v]!=0&&d[u]+g[u][v]<d[v])d[v]=d[u]+g[u][v];}return d;}

    public static void main(String[] args) throws Exception {
        System.out.println(Arrays.toString(run(2,5)));
    }
}
```

A. [5, 12, 0, 21, 17]  
B. [5, 11, 0, 20, 16]  
C. [5, 6, 0, 9, 5]  
D. [0, 6, 5, 15, 11]  

<details><summary>Answer, trace and repair</summary>

**B. [5, 11, 0, 20, 16]**

Vertex1 after0 improves3 to11+9=20 and4 to11+5=16. Dijkstra uses accumulated source distance rather than the raw edge value.

</details>

### J045 — Matrix complexity despite sparse edges

For a generalized V×V matrix and stop=V, worst-case time/auxiliary space excluding input?

```java
import java.util.*;
import java.io.*;

public class Main {
    static final int INF=999;
    static int[][] g={{0,6,5,0,13},{6,0,12,9,5},{5,12,0,0,0},{0,9,0,0,0},{13,5,0,0,0}};
    static int[] run(int source,int stop){int n=g.length;int[] d=new int[n];Arrays.fill(d,INF);boolean[] seen=new boolean[n];d[source]=0;
    for(int k=0;k<stop;k++){int u=-1;for(int v=0;v<n;v++)if(!seen[v]&&(u==-1||d[v]<d[u]))u=v;if(u==-1||d[u]==INF)break;seen[u]=true;
    for(int v=0;v<n;v++)if(!seen[v]&&g[u][v]!=0&&d[u]+g[u][v]<d[v])d[v]=d[u]+g[u][v];}return d;}

    public static void main(String[] args) throws Exception {
        System.out.println(Arrays.toString(run(0,5)));
    }
}
```

A. Θ(V²) time, Θ(V) auxiliary space  
B. Θ(ElogV) time, Θ(V²) extra space  
C. Θ(V³) time, Θ(V) space  
D. Θ(V+E) time, Θ(1) space  

<details><summary>Answer, trace and repair</summary>

**A. Θ(V²) time, Θ(V) auxiliary space**

Each of V iterations scans V candidates and V possible neighbours. d/seen arrays use Θ(V); the matrix is already the input.

</details>

### J046 — Incorrect update behaves like Prim

Printed array and Dijkstra repair?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[][] g={{0,6,5},{6,0,12},{5,12,0}};int[] d={999,999,0};boolean[] seen=new boolean[3];
        for(int k=0;k<3;k++){int u=-1;for(int v=0;v<3;v++)if(!seen[v]&&(u==-1||d[v]<d[u]))u=v;seen[u]=true;
        for(int v=0;v<3;v++)if(!seen[v]&&g[u][v]>0)d[v]=Math.min(d[v],g[u][v]);}
        System.out.println(Arrays.toString(d));
    }
}
```

A. [5, 11, 0]; already correct  
B. [5, 12, 0]; visit1 first  
C. [6, 5, 0]; reverse comparator  
D. [5, 6, 0]; relax with d[u]+g[u][v]  

<details><summary>Answer, trace and repair</summary>

**D. [5, 6, 0]; relax with d[u]+g[u][v]**

Raw edge6 overwrites source2→1’s path value, despite total through0 being11. Prim’s key and Dijkstra’s distance represent different quantities.

</details>

### J047 — Infinity addition overflow

What is printed and what guard/type change is needed?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] d={0,Integer.MAX_VALUE};int w=8;
        if(d[1]+w<d[0])d[0]=d[1]+w;
        System.out.println(d[0]);
    }
}
```

A. 0; Math.max is required  
B. 8; code correctly found an edge  
C. −2147483641; guard unreachable distance before adding and use safe arithmetic  
D. Compilation error because infinity cannot be int  

<details><summary>Answer, trace and repair</summary>

**C. −2147483641; guard unreachable distance before adding and use safe arithmetic**

MAX_VALUE+8 wraps. A finite-looking negative path may corrupt an unrelated distance; use a bounded infinity and long values plus a reachability check.

</details>

### J048 — Stale heap record snapshot

**Extension.** Removal sequence and counters?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[][][] g={{{1,10},{2,1}}, {}, {{1,1}}};int[] d={0,999,999};
        PriorityQueue<int[]> pq=new PriorityQueue<>(Comparator.comparingInt(x->x[1]));pq.offer(new int[]{0,0});
        int removes=0,expands=0;StringBuilder s=new StringBuilder();
        while(!pq.isEmpty()){int[] x=pq.poll();removes++;s.append(x[0]).append(':').append(x[1]).append(' ');if(x[1]!=d[x[0]])continue;expands++;
        for(int[] e:g[x[0]])if(x[1]+e[1]<d[e[0]]){d[e[0]]=x[1]+e[1];pq.offer(new int[]{e[0],d[e[0]]});}}
        System.out.println(s.toString().trim()+" | "+removes+" "+expands);
    }
}
```

A. 0:0 2:1 1:2 | 3 3  
B. 0:0 2:1 1:2 1:10 | 4 3  
C. 0:0 1:10 2:1 1:2 | 4 4  
D. 0:0 2:1 1:10 | 3 3  

<details><summary>Answer, trace and repair</summary>

**B. 0:0 2:1 1:2 1:10 | 4 3**

Both records for1 stay in the heap. The10-distance record is removed later but skipped as stale; removing and expanding are distinct events.

</details>

### J049 — Negative-edge finalized vertex

Wrong result and true source-to1 distance?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] d={0,2,5};boolean[] done={true,false,false};
        int[][][] g={ {}, {}, {{1,-4}} };
        for(int k=0;k<2;k++){int u=-1;for(int v=0;v<3;v++)if(!done[v]&&(u<0||d[v]<d[u]))u=v;done[u]=true;
        for(int[] e:g[u])if(!done[e[0]])d[e[0]]=Math.min(d[e[0]],d[u]+e[1]);}
        System.out.println(Arrays.toString(d));
    }
}
```

A. [0, 2, 5]; true distance1  
B. [0, 1, 5]; correct  
C. [0, -4, 5]; true distance−4  
D. No negative cycle means this must be correct  

<details><summary>Answer, trace and repair</summary>

**A. [0, 2, 5]; true distance1**

Vertex1 finalizes at2 before vertex2’s−4 edge could improve it to1. No negative cycle is needed to break the proof.

</details>

## Prim, graph representation and MST cost

Evidence: Days 14, 16–17. Track: MCQ depth: graph.

### J050 — Key-parent arrays halfway

Arrays after selecting0 and1?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[][] g={{0,2,3,0},{2,0,2,7},{3,2,0,4},{0,7,4,0}};
    static void run(int stop){int[] key={0,999,999,999},par={-1,-1,-1,-1};boolean[] used=new boolean[4];
    for(int k=0;k<stop;k++){int u=-1;for(int v=0;v<4;v++)if(!used[v]&&(u<0||key[v]<key[u]))u=v;used[u]=true;
    for(int v=0;v<4;v++)if(!used[v]&&g[u][v]!=0&&g[u][v]<key[v]){key[v]=g[u][v];par[v]=u;}}
    System.out.println(Arrays.toString(key)+" "+Arrays.toString(par));}

    public static void main(String[] args) throws Exception {
        run(2);
    }
}
```

A. [0, 2, 4, 9] [-1, 0, 1, 1]  
B. [0, 2, 3, 999] [-1, 0, 0, -1]  
C. [0, 2, 2, 4] [-1, 0, 1, 2]  
D. [0, 2, 2, 7] [-1, 0, 1, 1]  

<details><summary>Answer, trace and repair</summary>

**D. [0, 2, 2, 7] [-1, 0, 1, 1]**

After0, keys2 and3 correspond to1 and2. Selecting1 replaces key2 by edge2 and discovers vertex3 with edge7.

</details>

### J051 — Parent replacement by crossing edge

Arrays after also selecting2?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[][] g={{0,2,3,0},{2,0,2,7},{3,2,0,4},{0,7,4,0}};
    static void run(int stop){int[] key={0,999,999,999},par={-1,-1,-1,-1};boolean[] used=new boolean[4];
    for(int k=0;k<stop;k++){int u=-1;for(int v=0;v<4;v++)if(!used[v]&&(u<0||key[v]<key[u]))u=v;used[u]=true;
    for(int v=0;v<4;v++)if(!used[v]&&g[u][v]!=0&&g[u][v]<key[v]){key[v]=g[u][v];par[v]=u;}}
    System.out.println(Arrays.toString(key)+" "+Arrays.toString(par));}

    public static void main(String[] args) throws Exception {
        run(3);
    }
}
```

A. [0, 2, 4, 8] [-1, 0, 1, 2]  
B. [0, 2, 2, 7] [-1, 0, 1, 1]  
C. [0, 2, 2, 4] [-1, 0, 1, 2]  
D. [0, 2, 3, 4] [-1, 0, 0, 2]  

<details><summary>Answer, trace and repair</summary>

**C. [0, 2, 2, 4] [-1, 0, 1, 2]**

Edge2→3 weight4 beats the earlier crossing edge1→3 weight7. No accumulated path sum belongs in this key.

</details>

### J052 — Disconnected invalid index

First output and thrown exception?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[][] g={{0,1,0},{1,0,0},{0,0,0}};int[] key={0,1,999};boolean[] used={true,true,false};
        int u=-1,best=999;for(int v=0;v<3;v++)if(!used[v]&&key[v]<best){best=key[v];u=v;}
        System.out.println(u);System.out.println(g[u][0]);
    }
}
```

A. 2, then prints0  
B. −1, then ArrayIndexOutOfBoundsException  
C. −1, then prints0 because Java wraps indexes  
D. Compilation failure  

<details><summary>Answer, trace and repair</summary>

**B. −1, then ArrayIndexOutOfBoundsException**

No finite key qualifies. Guard u<0 before indexing and report disconnection or explicitly restart to build a forest.

</details>

### J053 — Matrix/list scans counted

Measured counts and general neighbour-enumeration costs?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[][] a={{0,1,0,1},{1,0,0,0},{0,0,0,0},{1,0,0,0}};
        List<Integer> row=Arrays.asList(1,3);int matrixTests=0,listVisits=0;
        for(int v=0;v<4;v++){matrixTests++;if(a[0][v]!=0){} }
        for(int v:row)listVisits++;
        System.out.println(matrixTests+" "+listVisits);
    }
}
```

A. 4 2; matrix Θ(V), list Θ(deg(u))  
B. 2 2; both Θ(deg(u))  
C. 4 4; both Θ(V²)  
D. 4 2; both Θ(1)  

<details><summary>Answer, trace and repair</summary>

**A. 4 2; matrix Θ(V), list Θ(deg(u))**

A matrix tests absent neighbours too; the list contains only actual adjacency entries. Cost of one pair lookup is a different question.

</details>

### J054 — Zero weight is dropped

If0–1 is meant to be a real zero-weight edge, what is wrong?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[][] w={{0,0,5},{0,0,1},{5,1,0}};int degree=0;
        for(int v=0;v<3;v++)if(w[0][v]!=0)degree++;
        System.out.println(degree);
    }
}
```

A. Zero-weight edges invalidate both MST and Dijkstra  
B. Printed degree2 includes both edges  
C. Only changing loop order repairs it  
D. Printed degree1 omits a valid edge; existence needs its own representation  

<details><summary>Answer, trace and repair</summary>

**D. Printed degree1 omits a valid edge; existence needs its own representation**

0-as-absence cannot also represent that zero-weight edge. A separate boolean presence matrix/sentinel distinguishes them.

</details>

## DSU: compressed parents and rank

Evidence: Days 17–18. Track: MCQ depth: graph.

### J055 — Union does not eagerly flatten all children

Parent and rank arrays immediately afterwards?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[] p={0,0,1,3,3};static int[] rank={1,0,0,1,0};
    static int find(int x){if(p[x]!=x)p[x]=find(p[x]);return p[x];}
    static void union(int a,int b){int x=find(a),y=find(b);if(x==y)return;if(rank[x]<rank[y])p[x]=y;else if(rank[x]>rank[y])p[y]=x;else{p[y]=x;rank[x]++;}}

    public static void main(String[] args) throws Exception {
        find(2);union(2,4);System.out.println(Arrays.toString(p)+" "+Arrays.toString(rank));
    }
}
```

A. [0, 0, 0, 0, 0] [2, 0, 0, 0, 0]  
B. [0, 0, 1, 3, 0] [1, 0, 0, 2, 0]  
C. [0, 0, 0, 0, 3] [2, 0, 0, 1, 0]  
D. [0, 0, 0, 0, 3] [1, 0, 0, 1, 0]  

<details><summary>Answer, trace and repair</summary>

**C. [0, 0, 0, 0, 3] [2, 0, 0, 1, 0]**

find2 compresses2. find4 happens before root3 is linked under0, so4 remains pointed at3 until another find. Equal rank1 merges raise root0 rank to2.

</details>

### J056 — Later find performs deferred compression

Returned root and parents?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[] p={0,0,1,3,3};static int[] rank={1,0,0,1,0};
    static int find(int x){if(p[x]!=x)p[x]=find(p[x]);return p[x];}
    static void union(int a,int b){int x=find(a),y=find(b);if(x==y)return;if(rank[x]<rank[y])p[x]=y;else if(rank[x]>rank[y])p[y]=x;else{p[y]=x;rank[x]++;}}

    public static void main(String[] args) throws Exception {
        union(2,4);int r=find(4);System.out.println(r+" "+Arrays.toString(p));
    }
}
```

A. 3 [0, 0, 0, 0, 3]  
B. 0 [0, 0, 0, 0, 0]  
C. 0 [0, 0, 1, 0, 0]  
D. 4 [0, 0, 0, 0, 4]  

<details><summary>Answer, trace and repair</summary>

**B. 0 [0, 0, 0, 0, 0]**

Union finds2→0 and4→3, then links3→0. Later find4 compresses its3→0 chain; rank need not equal current actual height.

</details>

### J057 — Raw child linking splits a component

Roots after the faulty “union(1,3)”?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[] p={0,0,1,3,3};static int[] rank={1,0,0,1,0};
    static int find(int x){if(p[x]!=x)p[x]=find(p[x]);return p[x];}
    static void union(int a,int b){int x=find(a),y=find(b);if(x==y)return;if(rank[x]<rank[y])p[x]=y;else if(rank[x]>rank[y])p[y]=x;else{p[y]=x;rank[x]++;}}

    public static void main(String[] args) throws Exception {
        p=new int[]{0,0,1,3};p[1]=3;System.out.println(find(0)+" "+find(1)+" "+find(2));
    }
}
```

A. 0 3 3  
B. 3 3 3  
C. 0 0 3  
D. 0 3 0  

<details><summary>Answer, trace and repair</summary>

**A. 0 3 3**

Node1 and descendant2 leave component0, but node0 remains behind. Unite representatives, not an internal child pointer.

</details>

### J058 — Same-root rank inflation

Ranks after two already-connected union requests?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[] p={0,0,1,3,3};static int[] rank={1,0,0,1,0};
    static int find(int x){if(p[x]!=x)p[x]=find(p[x]);return p[x];}
    static void union(int a,int b){int x=find(a),y=find(b);if(x==y)return;if(rank[x]<rank[y])p[x]=y;else if(rank[x]>rank[y])p[y]=x;else{p[y]=x;rank[x]++;}}

    public static void main(String[] args) throws Exception {
        union(1,2);union(1,2);System.out.println(Arrays.toString(rank));
    }
}
```

A. [3, 0, 0, 1, 0]  
B. [2, 0, 0, 1, 0]  
C. [0, 0, 0, 0, 0]  
D. [1, 0, 0, 1, 0]  

<details><summary>Answer, trace and repair</summary>

**D. [1, 0, 0, 1, 0]**

find1 and find2 both return0. The same-root guard returns before changing ranks; blindly increasing on every call inflates the heuristic.

</details>

### J059 — Parent check misses indirect root

Direct-parent equality versus actual connectivity?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[] p={0,0,1,3,3};static int[] rank={1,0,0,1,0};
    static int find(int x){if(p[x]!=x)p[x]=find(p[x]);return p[x];}
    static void union(int a,int b){int x=find(a),y=find(b);if(x==y)return;if(rank[x]<rank[y])p[x]=y;else if(rank[x]>rank[y])p[y]=x;else{p[y]=x;rank[x]++;}}

    public static void main(String[] args) throws Exception {
        System.out.println((p[1]==p[2])+" "+(find(1)==find(2)));
    }
}
```

A. true true  
B. false false  
C. false true  
D. true false  

<details><summary>Answer, trace and repair</summary>

**C. false true**

Initially p1=0,p2=1 but both ultimately reach0. Root comparison is essential for Kruskal’s cycle test.

</details>

### J060 — Naive union-chain complexity

Printed hops and generalized n calls on a chain of n nodes?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[] p;static int hops;static int find(int x){while(p[x]!=x){hops++;x=p[x];}return x;}

    public static void main(String[] args) throws Exception {
        p=new int[8];for(int i=0;i<7;i++)p[i]=i+1;p[7]=7;for(int i=0;i<8;i++)find(0);System.out.println(hops);
    }
}
```

A. 7; Θ(n)  
B. 56; Θ(n²) total  
C. 8; Θ(n)  
D. 56; Θ(log n) total  

<details><summary>Answer, trace and repair</summary>

**B. 56; Θ(n²) total**

Each uncompressed find0 walks seven links; repeating eight times costs56. Union-by-rank/compression assumptions cannot be applied to this naive code.

</details>

## Kruskal: accepted versus examined edges

Evidence: Day 18. Track: MCQ depth: graph.

### J061 — Rejected edge still consumes index

After third examined edge, then after loop?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[] p={0,1,2,3};static int find(int x){while(p[x]!=x)x=p[x];return x;}
    static int[][] edges={{0,1,1},{1,2,2},{0,2,3},{2,3,4}};

    public static void main(String[] args) throws Exception {
        int total=0,count=0,i=0;
        while(count<3&&i<edges.length){int[] e=edges[i++];int a=find(e[0]),b=find(e[1]);if(a==b)continue;p[b]=a;total+=e[2];count++;if(i==3)System.out.println(i+" "+count+" "+total);}
        System.out.println(i+" "+count+" "+total);
    }
}
```

A. 3 2 3 then4 3 7  
B. 3 3 6 then3 3 6  
C. Only final line4 3 7; continue skips the third-edge print  
D. No line is printed  

<details><summary>Answer, trace and repair</summary>

**C. Only final line4 3 7; continue skips the third-edge print**

Third edge0–2 is rejected before the i==3 print. Continue transfers to the while condition; fourth edge is accepted, giving count3,total7. Distinguish an observation that is skipped from a requested conceptual state.

</details>

### J062 — Disconnected guard missing

Failure and minimum necessary guard?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[] p={0,1,2,3};static int find(int x){while(p[x]!=x)x=p[x];return x;}
    static int[][] edges={{0,1,1},{1,2,2},{0,2,3},{2,3,4}};

    public static void main(String[] args) throws Exception {
        edges=new int[][]{{0,1,1},{1,2,2},{0,2,3}};int count=0,i=0;
        while(count<3){int[] e=edges[i++];int a=find(e[0]),b=find(e[1]);if(a!=b){p[b]=a;count++;}}
        System.out.println(count);
    }
}
```

A. Prints3; E=V−1 guarantees a tree  
B. Infinite recursion in find  
C. Compilation failure  
D. ArrayIndexOutOfBoundsException; also require i<edges.length and check final count  

<details><summary>Answer, trace and repair</summary>

**D. ArrayIndexOutOfBoundsException; also require i<edges.length and check final count**

Triangle covers only three vertices and has one cycle; after three examinations count2. The next array read runs past the edge list.

</details>

### J063 — Stopping by reads is wrong

Printed count/cost and why it is not a spanning tree?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[] p={0,1,2,3};static int find(int x){while(p[x]!=x)x=p[x];return x;}
    static int[][] edges={{0,1,1},{1,2,2},{0,2,3},{2,3,4}};

    public static void main(String[] args) throws Exception {
        int total=0,accepted=0;
        for(int i=0;i<3;i++){int[] e=edges[i];int a=find(e[0]),b=find(e[1]);if(a!=b){p[b]=a;total+=e[2];accepted++;}}
        System.out.println(accepted+" "+total);
    }
}
```

A. 3 6; valid MST  
B. 2 7; cost alone proves spanning  
C. 2 3; vertex3 remains disconnected  
D. 3 3; zero-weight edge assumed  

<details><summary>Answer, trace and repair</summary>

**C. 2 3; vertex3 remains disconnected**

The loop examines V−1 edges rather than accepting V−1. It must continue past rejected cycle edges while available edges remain.

</details>

### J064 — Comparator overflow reverses two edges

First sorted weight and safe repair?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[][] e={{0,1,2_000_000_000},{1,2,-2_000_000_000}};
        Arrays.sort(e,(a,b)->a[2]-b[2]);System.out.println(e[0][2]);
    }
}
```

A. −2000000000 correctly  
B. 2000000000 incorrectly; use Integer.compare(a[2],b[2])  
C. 0; subtraction becomes comparison automatically  
D. Compilation fails because comparator cannot return int  

<details><summary>Answer, trace and repair</summary>

**B. 2000000000 incorrectly; use Integer.compare(a[2],b[2])**

Subtracting opposite-extreme ints reverses sign. Two-element sorting exposes the wrong ordering without relying on complicated comparator-cycle behavior.

</details>

### J065 — Forest cost versus MST existence

Output and interpretation?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[] p={0,1,2,3};static int find(int x){while(p[x]!=x)x=p[x];return x;}
    static int[][] edges={{0,1,1},{1,2,2},{0,2,3},{2,3,4}};

    public static void main(String[] args) throws Exception {
        edges=new int[][]{{0,1,2},{2,3,3}};int count=0,cost=0;
        for(int[] e:edges){int a=find(e[0]),b=find(e[1]);if(a!=b){p[b]=a;count++;cost+=e[2];}}
        System.out.println(count+" "+cost+" "+(count==3));
    }
}
```

A. 2 5 false; a minimum spanning forest, not a full spanning tree  
B. 2 5 true; any cheapest edges form MST  
C. 3 5 true  
D. 2 0 false  

<details><summary>Answer, trace and repair</summary>

**A. 2 5 false; a minimum spanning forest, not a full spanning tree**

Each separate component has its tree edge. Full connectivity requires3 accepted edges for4 vertices.

</details>

## BFS: queue snapshots and duplicate discovery

Evidence: Days 19–21. Track: MCQ depth: graph traversal.

### J066 — Queue after a specific dequeue

Queue front-to-back after removal2 is processed?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[][] g={{1,2},{3,4},{4},{},{}};boolean[] seen=new boolean[5];Deque<Integer> q=new ArrayDeque<>();
        q.offer(0);seen[0]=true;int removals=0;
        while(!q.isEmpty()){int u=q.poll();for(int v:g[u])if(!seen[v]){seen[v]=true;q.offer(v);}if(++removals==2)System.out.println(q);}
    }
}
```

A. [3, 4, 2]  
B. [2, 3, 4, 4]  
C. [1, 2, 3, 4]  
D. [2, 3, 4]  

<details><summary>Answer, trace and repair</summary>

**D. [2, 3, 4]**

After0 queue[1,2]. Removing1 appends3,4 behind2; seen is marked on discovery.

</details>

### J067 — Delayed marking duplicates work

Output when marking only on removal and not skipping duplicate removals?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[][] g={{1,2},{3},{3},{}};boolean[] seen=new boolean[4];Deque<Integer> q=new ArrayDeque<>();q.offer(0);
        int pops=0;StringBuilder log=new StringBuilder();
        while(!q.isEmpty()){int u=q.poll();pops++;log.append(u);seen[u]=true;for(int v:g[u])if(!seen[v])q.offer(v);}
        System.out.println(log+" "+pops);
    }
}
```

A. 0123 4  
B. 0132 4  
C. 01233 5  
D. 012333 6  

<details><summary>Answer, trace and repair</summary>

**C. 01233 5**

Both1 and2 enqueue3 while it is pending/unseen. Queue elements are not automatically deduplicated.

</details>

### J068 — LIFO disguised as queue

Visitation order?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[][] g={{1,2},{3},{3},{}};boolean[] seen=new boolean[4];Deque<Integer> q=new ArrayDeque<>();q.push(0);seen[0]=true;StringBuilder log=new StringBuilder();
        while(!q.isEmpty()){int u=q.pop();log.append(u);for(int v:g[u])if(!seen[v]){seen[v]=true;q.push(v);}}
        System.out.println(log);
    }
}
```

A. 0123  
B. 0231  
C. 0132  
D. 0321  

<details><summary>Answer, trace and repair</summary>

**B. 0231**

Push puts neighbours at the front and pop removes front: last listed neighbour2 is explored before1. This is stack discipline, not BFS.

</details>

### J069 — Distance set on discovery

Distances from0?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[][] g={{1,2},{3},{3,4},{4},{}};int[] d=new int[5];Arrays.fill(d,-1);d[0]=0;Deque<Integer> q=new ArrayDeque<>();q.offer(0);
        while(!q.isEmpty()){int u=q.poll();for(int v:g[u])if(d[v]<0){d[v]=d[u]+1;q.offer(v);}}
        System.out.println(Arrays.toString(d));
    }
}
```

A. [0, 1, 1, 2, 2]  
B. [0, 1, 1, 2, 3]  
C. [0, 1, 2, 3, 4]  
D. [0, 0, 0, 1, 1]  

<details><summary>Answer, trace and repair</summary>

**A. [0, 1, 1, 2, 2]**

4 is discovered from2 at depth2 before any longer route through3. Unit-edge BFS layers minimize edge counts.

</details>

### J070 — ArrayList as queue complexity

**Extension.** Total removal work for generalized n, assuming ArrayList shifts following elements?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int n=8;List<Integer> q=new ArrayList<>();for(int i=0;i<n;i++)q.add(i);
        int sum=0;while(!q.isEmpty())sum+=q.remove(0);System.out.println(sum);
    }
}
```

A. Θ(n) because remove is always constant-time  
B. Θ(nlog n) due to sorting  
C. Θ(1) auxiliary work including all shifts  
D. Θ(n²), although the loop removes n items  

<details><summary>Answer, trace and repair</summary>

**D. Θ(n²), although the loop removes n items**

Removing the first element shifts n−1,n−2,… elements. ArrayDeque poll avoids those front-shifting costs.

</details>

## DFS ordering and the actual maze

Evidence: Days 21–22. Track: MCQ depth: traversal/search.

### J071 — Mark-on-push stack order

Printed order with reverse pushes and mark-on-push?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[][] g={{1,2},{2,3},{3},{}};boolean[] seen=new boolean[4];Deque<Integer> st=new ArrayDeque<>();st.push(0);seen[0]=true;
        StringBuilder log=new StringBuilder();while(!st.isEmpty()){int u=st.pop();log.append(u);for(int k=g[u].length-1;k>=0;k--){int v=g[u][k];if(!seen[v]){seen[v]=true;st.push(v);}}}
        System.out.println(log);
    }
}
```

A. 0123  
B. 0231  
C. 0132  
D. 01323  

<details><summary>Answer, trace and repair</summary>

**C. 0132**

After0,2 is already marked/pending underneath1. Vertex1 cannot descend into that pending2, so it pushes3 and visits3 first. Reverse pushing alone does not always replicate recursive DFS when discovery timing differs.

</details>

### J072 — Maze recursion entry trace

Down-first reachability and entries including rejected calls?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[][] g={{1,1,0},{0,1,1},{0,0,1}};static int calls;
    static boolean f(int r,int c){calls++;if(r>=3||c>=3||g[r][c]==0)return false;if(r==2&&c==2)return true;return f(r+1,c)||f(r,c+1);}

    public static void main(String[] args) throws Exception {
        System.out.println(f(0,0)+" "+calls);
    }
}
```

A. true 8  
B. true 5  
C. false 7  
D. true 7  

<details><summary>Answer, trace and repair</summary>

**D. true 7**

Entries are(0,0),(1,0)invalid,(0,1),(1,1),(2,1)invalid,(1,2),(2,2)success. Short-circuit stops further calls after reaching destination.

</details>

### J073 — Unsafe left operand accesses first

Result of this invocation?

```java
import java.util.*;
import java.io.*;

public class Main {
    static boolean f(int[][] g,int r,int c){if(g[r][c]==0||r>=g.length||c>=g[0].length)return false;return true;}

    public static void main(String[] args) throws Exception {
        System.out.println(f(new int[][]{{1}},1,0));
    }
}
```

A. ArrayIndexOutOfBoundsException before any false return  
B. false through short-circuit  
C. true because value1 exists  
D. Compilation failure  

<details><summary>Answer, trace and repair</summary>

**A. ArrayIndexOutOfBoundsException before any false return**

Java evaluates left operand first. Bounds must be tested before accessing g[r][c]; also guard negative indexes when moves permit them.

</details>

### J074 — Exponential no-path recursion

As a square open grid grows but destination is blocked, what can happen to total work without visited/memoization?

```java
import java.util.*;
import java.io.*;

public class Main {
    static long calls;
    static boolean f(int[][] g,int r,int c){calls++;int R=g.length,C=g[0].length;if(r>=R||c>=C||g[r][c]==0)return false;if(r==R-1&&c==C-1)return true;return f(g,r+1,c)||f(g,r,c+1);}

    public static void main(String[] args) throws Exception {
        int[][] g={{1,1,1},{1,1,1},{1,1,0}};System.out.println(f(g,0,0)+" "+calls);
    }
}
```

A. Always Θ(RC) because each coordinate appears once  
B. Infinite recursion from right/down cycles  
C. Θ(R+C) because path depth is linear  
D. Exponential repeated-route work despite no cycles  

<details><summary>Answer, trace and repair</summary>

**D. Exponential repeated-route work despite no cycles**

Many routes re-enter the same coordinate. All fail eventually, so short-circuit cannot prune successes; linear depth does not prevent a branching number of calls.

</details>

### J075 — Global seen for reachability

Reachability and distinct expanded cells?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[][] g={{1,1,1},{1,1,1},{1,1,0}};static boolean[][] seen=new boolean[3][3];static int calls,expanded;
    static boolean f(int r,int c){calls++;if(r>=3||c>=3||g[r][c]==0||seen[r][c])return false;seen[r][c]=true;expanded++;if(r==2&&c==2)return true;return f(r+1,c)||f(r,c+1);}

    public static void main(String[] args) throws Exception {
        System.out.println(f(0,0)+" "+expanded);
    }
}
```

A. false 9  
B. true 8  
C. false 8  
D. false 6  

<details><summary>Answer, trace and repair</summary>

**C. false 8**

Eight open cells are expanded once; blocked destination never expands. Global visitation is valid for reachability under fixed transitions, unlike per-path gold enumeration.

</details>

## Grid islands: visitation, shape and ownership

Evidence: Days 19–20. Track: MCQ depth: graph/grid.

### J076 — Second analysis consumes no land

Printed pairs after destructive flood then immediate repeat?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int R=3,C=4;static int[][] g={{1,1,0,1},{0,0,0,0},{1,1,0,1}};
    static int flood(int r,int c){if(r<0||c<0||r>=R||c>=C||g[r][c]==0)return 0;g[r][c]=0;return 1+flood(r+1,c)+flood(r-1,c)+flood(r,c+1)+flood(r,c-1);}
    static int run(){int count=0,max=0;for(int r=0;r<R;r++)for(int c=0;c<C;c++)if(g[r][c]==1){count++;max=Math.max(max,flood(r,c));}System.out.print(count+":"+max+" ");return count;}

    public static void main(String[] args) throws Exception {
        run();run();System.out.println();
    }
}
```

A. 4:2 4:2  
B. 4:2 0:0  
C. 2:4 0:0  
D. 4:2 0:2  

<details><summary>Answer, trace and repair</summary>

**B. 4:2 0:0**

First traversal changes all land to0. The second call has no open component and initializes its own max0.

</details>

### J077 — Shallow clone still aliases rows

Output and why a comparison run can be corrupted?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int R=3,C=4;static int[][] g={{1,1,0,1},{0,0,0,0},{1,1,0,1}};
    static int flood(int r,int c){if(r<0||c<0||r>=R||c>=C||g[r][c]==0)return 0;g[r][c]=0;return 1+flood(r+1,c)+flood(r-1,c)+flood(r,c+1)+flood(r,c-1);}
    static int run(){int count=0,max=0;for(int r=0;r<R;r++)for(int c=0;c<C;c++)if(g[r][c]==1){count++;max=Math.max(max,flood(r,c));}System.out.print(count+":"+max+" ");return count;}

    public static void main(String[] args) throws Exception {
        int[][] copy=g.clone();copy[0][0]=0;System.out.println(g[0][0]+" "+(copy[0]==g[0]));
    }
}
```

A. 0 true; cloning outer array shares its row arrays  
B. 1 false; clone deeply copies every row  
C. 0 false; primitive arrays cannot alias  
D. Compilation failure  

<details><summary>Answer, trace and repair</summary>

**A. 0 true; cloning outer array shares its row arrays**

For2D arrays clone copies only outer references. Clone each row before destructive component analysis.

</details>

### J078 — Mark on enqueue exact count

Total enqueues, including start?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[][] g={{1,1},{1,1}};Deque<int[]> q=new ArrayDeque<>();q.offer(new int[]{0,0});g[0][0]=0;int adds=1;
        int[][] dirs={{1,0},{-1,0},{0,1},{0,-1}};
        while(!q.isEmpty()){int[] p=q.poll();for(int[] d:dirs){int r=p[0]+d[0],c=p[1]+d[1];if(r>=0&&r<2&&c>=0&&c<2&&g[r][c]==1){g[r][c]=0;q.offer(new int[]{r,c});adds++;}}}
        System.out.println(adds);
    }
}
```

A. 5  
B. 7  
C. 8  
D. 4  

<details><summary>Answer, trace and repair</summary>

**D. 4**

Each valid cell is marked before other frontier cells examine it. Area count equals discovered cells, not attempted neighbour checks.

</details>

### J079 — Coordinate shape normalization

**Extension.** Translation-normalized offsets?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[][] pts={{4,7},{5,7},{5,8}};List<String> key=new ArrayList<>();
        for(int[] p:pts)key.add((p[0]-pts[0][0])+","+(p[1]-pts[0][1]));
        Collections.sort(key);System.out.println(key);
    }
}
```

A. [4,7, 5,7, 5,8]  
B. [0,0, 0,1, 1,1]  
C. [0,0, 1,0, 1,1]  
D. [0,0, 1,1, 2,2]  

<details><summary>Answer, trace and repair</summary>

**C. [0,0, 1,0, 1,1]**

Subtract anchor row and column separately. Delimit coordinates unambiguously; lexical sorting is acceptable for equality when consistently applied.

</details>

### J080 — Shape keys need structural equality

Sizes and shape-key pitfall?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        Set<int[]> s=new HashSet<>();s.add(new int[]{0,1});s.add(new int[]{0,1});
        Set<String> t=new HashSet<>();t.add("0,1");t.add("0,1");System.out.println(s.size()+" "+t.size());
    }
}
```

A. 1 1; both compare array contents  
B. 2 1; arrays use identity equality rather than element equality  
C. 2 2; strings always use identity  
D. 1 2; only arrays are structural  

<details><summary>Answer, trace and repair</summary>

**B. 2 1; arrays use identity equality rather than element equality**

Two fresh int[] objects have identity-based equals/hashCode. Encode a shape as immutable content or supply a proper key equality implementation.

</details>

### J081 — Fixed area is not full shape key

If rows encode two different3-cell shapes, why is result1 insufficient?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[][] shapes={{0,1,2},{0,4,5}};Set<Integer> sizes=new HashSet<>();for(int[] x:shapes)sizes.add(x.length);System.out.println(sizes.size());
    }
}
```

A. It deduplicates only area; store normalized geometry or a complete traversal signature  
B. Every3-cell shape is translation-equivalent  
C. Use HashMap instead of HashSet with the same length key  
D. Sort areas and geometry reappears  

<details><summary>Answer, trace and repair</summary>

**A. It deduplicates only area; store normalized geometry or a complete traversal signature**

Length3 is shared by a line and a bent path. No container can recover information discarded from the key.

</details>

## Tree symmetry, height and lonely nodes

Evidence: Days 19–20, 23–24. Track: MCQ depth: tree.

### J082 — Short-circuit stops the second mirror pair

Boolean and helper entries?

```java
import java.util.*;
import java.io.*;

public class Main {
    static class N{int v;N l,r;N(int v){this.v=v;}N(int v,N l,N r){this.v=v;this.l=l;this.r=r;}}
    static int calls;
    static boolean mirror(N a,N b){calls++;if(a==null||b==null)return a==b;if(a.v!=b.v)return false;return mirror(a.l,b.r)&&mirror(a.r,b.l);}

    public static void main(String[] args) throws Exception {
        N a=new N(2,new N(3),null),b=new N(2,new N(3),null);
        System.out.println(mirror(a,b)+" "+calls);
    }
}
```

A. false 3  
B. true 5  
C. false 5  
D. false 2  

<details><summary>Answer, trace and repair</summary>

**D. false 2**

Outer values agree. First pair(a.left,b.right) compares node3 to null and returnsfalse; && skips the second pair.

</details>

### J083 — Matching null pairs count too

Result and total helper entries?

```java
import java.util.*;
import java.io.*;

public class Main {
    static class N{int v;N l,r;N(int v){this.v=v;}N(int v,N l,N r){this.v=v;this.l=l;this.r=r;}}
    static int calls;
    static boolean mirror(N a,N b){calls++;if(a==null||b==null)return a==b;if(a.v!=b.v)return false;return mirror(a.l,b.r)&&mirror(a.r,b.l);}

    public static void main(String[] args) throws Exception {
        N a=new N(2,new N(3),null),b=new N(2,null,new N(3));
        System.out.println(mirror(a,b)+" "+calls);
    }
}
```

A. true 3  
B. true 7  
C. true 5  
D. false 5  

<details><summary>Answer, trace and repair</summary>

**C. true 5**

Entries outer pair,3/3,two null pairs under those leaves,and outer null/null. Base calls count even without real nodes.

</details>

### J084 — Same-order children implement wrong predicate

Same-order and proper-mirror results?

```java
import java.util.*;
import java.io.*;

public class Main {
    static class N{int v;N l,r;N(int v){this.v=v;}N(int v,N l,N r){this.v=v;this.l=l;this.r=r;}}
    static int calls;
    static boolean mirror(N a,N b){calls++;if(a==null||b==null)return a==b;if(a.v!=b.v)return false;return mirror(a.l,b.r)&&mirror(a.r,b.l);}
    static boolean bad(N a,N b){if(a==null||b==null)return a==b;return a.v==b.v&&bad(a.l,b.l)&&bad(a.r,b.r);}

    public static void main(String[] args) throws Exception {
        N a=new N(2,new N(3),null),b=new N(2,new N(3),null);System.out.println(bad(a,b)+" "+mirror(a,b));
    }
}
```

A. true true  
B. true false  
C. false true  
D. false false  

<details><summary>Answer, trace and repair</summary>

**B. true false**

Identical oriented subtrees can be equal without being reflections. Child pairings are the essential condition.

</details>

### J085 — Equal root heights hide an internal violation

Printed results?

```java
import java.util.*;
import java.io.*;

public class Main {
    static class N{int v;N l,r;N(int v){this.v=v;}N(int v,N l,N r){this.v=v;this.l=l;this.r=r;}}
    static int calls;
    static boolean mirror(N a,N b){calls++;if(a==null||b==null)return a==b;if(a.v!=b.v)return false;return mirror(a.l,b.r)&&mirror(a.r,b.l);}
    static int height(N x){return x==null?0:1+Math.max(height(x.l),height(x.r));}
    static boolean onlyRoot(N x){return Math.abs(height(x.l)-height(x.r))<=1;}
    static boolean all(N x){return x==null||(Math.abs(height(x.l)-height(x.r))<=1&&all(x.l)&&all(x.r));}

    public static void main(String[] args) throws Exception {
        N chain=new N(2,new N(3,new N(4),null),null);N compact=new N(5,new N(6,new N(7),null),new N(8));N root=new N(1,chain,compact);System.out.println(onlyRoot(root)+" "+all(root));
    }
}
```

A. true false  
B. true true  
C. false false  
D. false true  

<details><summary>Answer, trace and repair</summary>

**A. true false**

Both root subtrees have node-height3, but chain root2 has left height2,right0. Balance must be checked at every node.

</details>

### J086 — Exactly one child is not leaf testing

Lonely values?

```java
import java.util.*;
import java.io.*;

public class Main {
    static class N{int v;N l,r;N(int v){this.v=v;}N(int v,N l,N r){this.v=v;this.l=l;this.r=r;}}
    static int calls;
    static boolean mirror(N a,N b){calls++;if(a==null||b==null)return a==b;if(a.v!=b.v)return false;return mirror(a.l,b.r)&&mirror(a.r,b.l);}
    static void lonely(N x,List<Integer> out){if(x==null)return;if((x.l==null)!=(x.r==null))out.add(x.l==null?x.r.v:x.l.v);lonely(x.l,out);lonely(x.r,out);}

    public static void main(String[] args) throws Exception {
        N root=new N(1,new N(2,new N(3),new N(4)),null);List<Integer> out=new ArrayList<>();lonely(root,out);System.out.println(out);
    }
}
```

A. [1, 2]  
B. [3, 4]  
C. [1, 3, 4]  
D. [2]  

<details><summary>Answer, trace and repair</summary>

**D. [2]**

Only root1 has exactly one child2. Root is not itself added; sibling leaves3 and4 are not lonely.

</details>

## Balanced trees: return sentinels and repeated scans

Evidence: Days 23–24. Track: MCQ depth: tree.

### J087 — Sentinel propagates before height arithmetic

Height/check result?

```java
import java.util.*;
import java.io.*;

public class Main {
    static class N{int v;N l,r;N(int v){this.v=v;}N(int v,N l,N r){this.v=v;this.l=l;this.r=r;}}
    static int calls;
    static boolean mirror(N a,N b){calls++;if(a==null||b==null)return a==b;if(a.v!=b.v)return false;return mirror(a.l,b.r)&&mirror(a.r,b.l);}
    static int check(N x){if(x==null)return 0;int l=check(x.l);if(l==-1)return -1;int r=check(x.r);if(r==-1||Math.abs(l-r)>1)return -1;return 1+Math.max(l,r);}

    public static void main(String[] args) throws Exception {
        N x=new N(1,new N(2,new N(3,new N(4),null),null),new N(5));
        System.out.println(check(x));
    }
}
```

A. 4  
B. 3  
C. -1  
D. 0  

<details><summary>Answer, trace and repair</summary>

**C. -1**

The left chain becomes unbalanced at node2 and returns−1. Root must not treat that sentinel as an ordinary height.

</details>

### J088 — Partial postorder trace

Postorder returned-height log?

```java
import java.util.*;
import java.io.*;

public class Main {
    static class N{int v;N l,r;N(int v){this.v=v;}N(int v,N l,N r){this.v=v;this.l=l;this.r=r;}}
    static int calls;
    static boolean mirror(N a,N b){calls++;if(a==null||b==null)return a==b;if(a.v!=b.v)return false;return mirror(a.l,b.r)&&mirror(a.r,b.l);}
    static StringBuilder log=new StringBuilder();
    static int h(N x){if(x==null)return 0;int a=h(x.l),b=h(x.r);int out=1+Math.max(a,b);log.append(x.v).append(':').append(out).append(' ');return out;}

    public static void main(String[] args) throws Exception {
        N root=new N(1,new N(2,new N(4),null),new N(3));h(root);System.out.println(log.toString().trim());
    }
}
```

A. 1:3 2:2 4:1 3:1  
B. 4:1 2:2 3:1 1:3  
C. 4:0 2:1 3:0 1:2  
D. 2:2 4:1 1:3 3:1  

<details><summary>Answer, trace and repair</summary>

**B. 4:1 2:2 3:1 1:3**

Null height0 makes leaves1. Children must finish before their parent’s height is computed.

</details>

### J089 — Bad sentinel test returns a positive height

Printed value and missing guard?

```java
import java.util.*;
import java.io.*;

public class Main {
    static class N{int v;N l,r;N(int v){this.v=v;}N(int v,N l,N r){this.v=v;this.l=l;this.r=r;}}
    static int calls;
    static boolean mirror(N a,N b){calls++;if(a==null||b==null)return a==b;if(a.v!=b.v)return false;return mirror(a.l,b.r)&&mirror(a.r,b.l);}
    static int bad(N x){if(x==null)return 0;int l=bad(x.l),r=bad(x.r);if(Math.abs(l-r)>1)return -1;return 1+Math.max(l,r);}

    public static void main(String[] args) throws Exception {
        N root=new N(1,new N(2,new N(3,new N(4),null),null),null);System.out.println(bad(root));
    }
}
```

A. 1 incorrectly; detect either child sentinel−1 before comparing heights  
B. −1 correctly  
C. 4; need to sort tree values  
D. 0; null should return−1 for this convention  

<details><summary>Answer, trace and repair</summary>

**A. 1 incorrectly; detect either child sentinel−1 before comparing heights**

Left node2 returns−1; root compares−1 with0, difference1, then returns1. The error sentinel is swallowed.

</details>

### J090 — Repeated height scans on chain

Node-visits inside h and asymptotic total for a chain?

```java
import java.util.*;
import java.io.*;

public class Main {
    static class N{int v;N l,r;N(int v){this.v=v;}N(int v,N l,N r){this.v=v;this.l=l;this.r=r;}}
    static int calls;
    static boolean mirror(N a,N b){calls++;if(a==null||b==null)return a==b;if(a.v!=b.v)return false;return mirror(a.l,b.r)&&mirror(a.r,b.l);}
    static int scans;
    static int h(N x){if(x==null)return 0;scans++;return 1+Math.max(h(x.l),h(x.r));}
    static void f(N x){if(x==null)return;h(x.l);h(x.r);f(x.l);f(x.r);}

    public static void main(String[] args) throws Exception {
        N root=new N(1,new N(2,new N(3,new N(4),null),null),null);f(root);System.out.println(scans);
    }
}
```

A. 4; Θ(n)  
B. 10; Θ(nlog n)  
C. 6; Θ(log n)  
D. 6; Θ(n²)  

<details><summary>Answer, trace and repair</summary>

**D. 6; Θ(n²)**

Height calls scan descendants3+2+1=6 times. A one-pass postorder avoids recomputing these heights.

</details>

### J091 — Short-circuit calls differ from eager traversal

Return/count with left-sentinel early return?

```java
import java.util.*;
import java.io.*;

public class Main {
    static class N{int v;N l,r;N(int v){this.v=v;}N(int v,N l,N r){this.v=v;this.l=l;this.r=r;}}
    static int calls;
    static boolean mirror(N a,N b){calls++;if(a==null||b==null)return a==b;if(a.v!=b.v)return false;return mirror(a.l,b.r)&&mirror(a.r,b.l);}
    static int entries;
    static int c(N x){entries++;if(x==null)return 0;int l=c(x.l);if(l<0)return -1;int r=c(x.r);if(r<0||Math.abs(l-r)>1)return -1;return 1+Math.max(l,r);}

    public static void main(String[] args) throws Exception {
        N left=new N(2,new N(3,new N(4),null),null);N root=new N(1,left,new N(5,new N(6),new N(7)));System.out.println(c(root)+" "+entries);
    }
}
```

A. -1 15  
B. -1 9  
C. -1 8  
D. 4 8  

<details><summary>Answer, trace and repair</summary>

**C. -1 8**

Only root and the entire left subtree/null bases are entered; the right subtree is skipped. Root1 plus left check’s seven entries yields8.

</details>

## Level averages: live queue bounds and DFS state

Evidence: Days 23–24. Track: MCQ depth: tree.

### J092 — Level mixing from live size

Sum and remaining front?

```java
import java.util.*;
import java.io.*;

public class Main {
    static class N{int v;N l,r;N(int v){this.v=v;}N(int v,N l,N r){this.v=v;this.l=l;this.r=r;}}
    static int calls;
    static boolean mirror(N a,N b){calls++;if(a==null||b==null)return a==b;if(a.v!=b.v)return false;return mirror(a.l,b.r)&&mirror(a.r,b.l);}

    public static void main(String[] args) throws Exception {
        N root=new N(1,new N(2),new N(3));Deque<N> q=new ArrayDeque<>();q.offer(root);long sum=0;
        for(int i=0;i<q.size();i++){N x=q.poll();sum+=x.v;if(x.l!=null)q.offer(x.l);if(x.r!=null)q.offer(x.r);}
        System.out.println(sum+" "+q.peek().v);
    }
}
```

A. 1 2  
B. 3 3  
C. 6 0  
D. 4 2  

<details><summary>Answer, trace and repair</summary>

**B. 3 3**

After root, size2 admits i1, consuming node2. Now size1 makes i2 fail. Snapshot n before processing a level.

</details>

### J093 — Two correct level averages

Printed list?

```java
import java.util.*;
import java.io.*;

public class Main {
    static class N{int v;N l,r;N(int v){this.v=v;}N(int v,N l,N r){this.v=v;this.l=l;this.r=r;}}
    static int calls;
    static boolean mirror(N a,N b){calls++;if(a==null||b==null)return a==b;if(a.v!=b.v)return false;return mirror(a.l,b.r)&&mirror(a.r,b.l);}

    public static void main(String[] args) throws Exception {
        N root=new N(3,new N(9),new N(20,new N(15),new N(7)));Deque<N> q=new ArrayDeque<>();q.offer(root);List<Double> out=new ArrayList<>();
        while(!q.isEmpty()){int n=q.size();long s=0;for(int i=0;i<n;i++){N x=q.poll();s+=x.v;if(x.l!=null)q.offer(x.l);if(x.r!=null)q.offer(x.r);}out.add(s/(double)n);}
        System.out.println(out);
    }
}
```

A. [3.0, 14.5, 11.0]  
B. [3.0, 14.0, 11.0]  
C. [3.0, 9.0, 20.0, 15.0, 7.0]  
D. [3.0, 14.5, 7.333333333333333]  

<details><summary>Answer, trace and repair</summary>

**A. [3.0, 14.5, 11.0]**

Queue-size snapshot separates levels; wide sum and floating division preserve noninteger means.

</details>

### J094 — DFS overwrites instead of accumulates

Map and required aggregation change?

```java
import java.util.*;
import java.io.*;

public class Main {
    static class N{int v;N l,r;N(int v){this.v=v;}N(int v,N l,N r){this.v=v;this.l=l;this.r=r;}}
    static int calls;
    static boolean mirror(N a,N b){calls++;if(a==null||b==null)return a==b;if(a.v!=b.v)return false;return mirror(a.l,b.r)&&mirror(a.r,b.l);}
    static Map<Integer,Integer> m=new TreeMap<>();
    static void f(N x,int d){if(x==null)return;m.put(d,x.v);f(x.l,d+1);f(x.r,d+1);}

    public static void main(String[] args) throws Exception {
        N root=new N(1,new N(2,new N(4),new N(5)),new N(3,new N(6),new N(7)));f(root,0);System.out.println(m);
    }
}
```

A. {0=1, 1=5, 2=22}; divide by depth  
B. {0=1, 1=2, 2=4}; use HashMap  
C. {0=1, 1=3, 2=7}; values already are averages  
D. {0=1, 1=3, 2=7}; accumulate sums and separate counts  

<details><summary>Answer, trace and repair</summary>

**D. {0=1, 1=3, 2=7}; accumulate sums and separate counts**

put replaces a previous same-depth value; rightmost node wins. merge/add counts, not overwrite, to compute mean by depth.

</details>

### J095 — Overflowed sum survives double cast

Averages printed by the two accumulators?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] level={2_000_000_000,2_000_000_000};int bad=0;long good=0;
        for(int v:level){bad+=v;good+=v;}
        System.out.println(bad/2.0+" "+good/2.0);
    }
}
```

A. 2.0E9 2.0E9  
B. -1.0 2.0E9  
C. -1.47483648E8 2.0E9  
D. 0.0 2.0E9  

<details><summary>Answer, trace and repair</summary>

**C. -1.47483648E8 2.0E9**

Sum4 billion wraps to−294967296; divide by2 gives−147483648. The long accumulator retains4 billion.

</details>

### J096 — Depth maps do not require BFS order

Arrays despite right-first DFS?

```java
import java.util.*;
import java.io.*;

public class Main {
    static class N{int v;N l,r;N(int v){this.v=v;}N(int v,N l,N r){this.v=v;this.l=l;this.r=r;}}
    static int calls;
    static boolean mirror(N a,N b){calls++;if(a==null||b==null)return a==b;if(a.v!=b.v)return false;return mirror(a.l,b.r)&&mirror(a.r,b.l);}
    static long[] sum=new long[3];static int[] count=new int[3];
    static void f(N x,int d){if(x==null)return;sum[d]+=x.v;count[d]++;f(x.r,d+1);f(x.l,d+1);}

    public static void main(String[] args) throws Exception {
        N root=new N(1,new N(2,new N(4),new N(5)),new N(3,new N(6),new N(7)));f(root,0);System.out.println(Arrays.toString(sum)+" "+Arrays.toString(count));
    }
}
```

A. [1, 3, 7] [1, 1, 1]  
B. [1, 5, 22] [1, 2, 4]  
C. [1, 5, 22] [1, 1, 1]  
D. [1, 3, 7] [1, 2, 4]  

<details><summary>Answer, trace and repair</summary>

**B. [1, 5, 22] [1, 2, 4]**

Grouping by depth works independent of traversal order when sums and counts both accumulate. Means are1,2.5,5.5.

</details>

## Boundary traversal: fallbacks and duplicate leaves

Evidence: Day 22. Track: MCQ depth: tree.

### J097 — All phases on a branching tree

Anticlockwise boundary?

```java
import java.util.*;
import java.io.*;

public class Main {
    static class N{int v;N l,r;N(int v){this.v=v;}N(int v,N l,N r){this.v=v;this.l=l;this.r=r;}}
    static int calls;
    static boolean mirror(N a,N b){calls++;if(a==null||b==null)return a==b;if(a.v!=b.v)return false;return mirror(a.l,b.r)&&mirror(a.r,b.l);}
    static List<Integer> out=new ArrayList<>();static boolean leaf(N x){return x!=null&&x.l==null&&x.r==null;}
    static void leaves(N x){if(x==null)return;if(leaf(x)){out.add(x.v);return;}leaves(x.l);leaves(x.r);}
    static void boundary(N root){if(root==null)return;if(!leaf(root))out.add(root.v);
    for(N x=root.l;x!=null;x=x.l!=null?x.l:x.r)if(!leaf(x))out.add(x.v);
    leaves(root);List<Integer> right=new ArrayList<>();for(N x=root.r;x!=null;x=x.r!=null?x.r:x.l)if(!leaf(x))right.add(x.v);
    Collections.reverse(right);out.addAll(right);}

    public static void main(String[] args) throws Exception {
        boundary(new N(1,new N(2,new N(4),new N(5)),new N(3,new N(6),new N(7))));System.out.println(out);
    }
}
```

A. [1, 2, 4, 5, 6, 7, 3]  
B. [1, 2, 4, 5, 3, 6, 7]  
C. [1, 2, 4, 5, 6, 7, 3, 1]  
D. [1, 4, 2, 5, 6, 3, 7]  

<details><summary>Answer, trace and repair</summary>

**A. [1, 2, 4, 5, 6, 7, 3]**

Nonleaf left boundary precedes all leaves; nonleaf right boundary is reversed. Internal nodes5/6 are leaves here, not boundary duplicates.

</details>

### J098 — Fallback across one-child nodes

Boundary with missing preferred children?

```java
import java.util.*;
import java.io.*;

public class Main {
    static class N{int v;N l,r;N(int v){this.v=v;}N(int v,N l,N r){this.v=v;this.l=l;this.r=r;}}
    static int calls;
    static boolean mirror(N a,N b){calls++;if(a==null||b==null)return a==b;if(a.v!=b.v)return false;return mirror(a.l,b.r)&&mirror(a.r,b.l);}
    static List<Integer> out=new ArrayList<>();static boolean leaf(N x){return x!=null&&x.l==null&&x.r==null;}
    static void leaves(N x){if(x==null)return;if(leaf(x)){out.add(x.v);return;}leaves(x.l);leaves(x.r);}
    static void boundary(N root){if(root==null)return;if(!leaf(root))out.add(root.v);
    for(N x=root.l;x!=null;x=x.l!=null?x.l:x.r)if(!leaf(x))out.add(x.v);
    leaves(root);List<Integer> right=new ArrayList<>();for(N x=root.r;x!=null;x=x.r!=null?x.r:x.l)if(!leaf(x))right.add(x.v);
    Collections.reverse(right);out.addAll(right);}

    public static void main(String[] args) throws Exception {
        boundary(new N(1,new N(2,null,new N(4,new N(5),null)),new N(3,new N(6),null)));System.out.println(out);
    }
}
```

A. [1, 2, 5, 6, 3]  
B. [1, 2, 4, 5, 3, 6]  
C. [1, 4, 5, 6, 3]  
D. [1, 2, 4, 5, 6, 3]  

<details><summary>Answer, trace and repair</summary>

**D. [1, 2, 4, 5, 6, 3]**

Left side2 falls back right to4; right side3 falls back left to leaf6. Leaf phase adds5,6 once.

</details>

### J099 — Singleton root special case

Output?

```java
import java.util.*;
import java.io.*;

public class Main {
    static class N{int v;N l,r;N(int v){this.v=v;}N(int v,N l,N r){this.v=v;this.l=l;this.r=r;}}
    static int calls;
    static boolean mirror(N a,N b){calls++;if(a==null||b==null)return a==b;if(a.v!=b.v)return false;return mirror(a.l,b.r)&&mirror(a.r,b.l);}
    static List<Integer> out=new ArrayList<>();static boolean leaf(N x){return x!=null&&x.l==null&&x.r==null;}
    static void leaves(N x){if(x==null)return;if(leaf(x)){out.add(x.v);return;}leaves(x.l);leaves(x.r);}
    static void boundary(N root){if(root==null)return;if(!leaf(root))out.add(root.v);
    for(N x=root.l;x!=null;x=x.l!=null?x.l:x.r)if(!leaf(x))out.add(x.v);
    leaves(root);List<Integer> right=new ArrayList<>();for(N x=root.r;x!=null;x=x.r!=null?x.r:x.l)if(!leaf(x))right.add(x.v);
    Collections.reverse(right);out.addAll(right);}

    public static void main(String[] args) throws Exception {
        boundary(new N(9));System.out.println(out);
    }
}
```

A. [9, 9]  
B. []  
C. [9]  
D. [9, 9, 9]  

<details><summary>Answer, trace and repair</summary>

**C. [9]**

Nonleaf-root addition is skipped; leaves(root) handles the singleton exactly once.

</details>

### J100 — Boundary bug duplicates leaves

Wrong output and repair?

```java
import java.util.*;
import java.io.*;

public class Main {
    static class N{int v;N l,r;N(int v){this.v=v;}N(int v,N l,N r){this.v=v;this.l=l;this.r=r;}}
    static int calls;
    static boolean mirror(N a,N b){calls++;if(a==null||b==null)return a==b;if(a.v!=b.v)return false;return mirror(a.l,b.r)&&mirror(a.r,b.l);}

    public static void main(String[] args) throws Exception {
        N root=new N(1,new N(2),new N(3));List<Integer> out=new ArrayList<>();out.add(root.v);
        for(N x=root.l;x!=null;x=x.l)out.add(x.v);
        out.add(root.l.v);out.add(root.r.v);
        for(N x=root.r;x!=null;x=x.r)out.add(x.v);
        System.out.println(out);
    }
}
```

A. [1, 2, 3]; no defect  
B. [1, 2, 2, 3, 3]; exclude leaves from side boundaries  
C. [1, 3, 2]; reverse leaves  
D. [1, 2, 2, 3, 3]; remove root only  

<details><summary>Answer, trace and repair</summary>

**B. [1, 2, 2, 3, 3]; exclude leaves from side boundaries**

The side loops and explicit leaf phase both add2 and3. General right-side reversal is also needed for deeper trees.

</details>

## N-Queens and shared backtracking state

Evidence: Day 25. Track: MCQ depth: backtracking.

### J101 — Complete recursive-state count

Solutions and function entries for4 queens?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[] col;static int solutions,entries;
    static boolean safe(int r,int c){for(int i=0;i<r;i++)if(col[i]==c||Math.abs(col[i]-c)==r-i)return false;return true;}
    static void f(int r){entries++;if(r==col.length){solutions++;return;}for(int c=0;c<col.length;c++)if(safe(r,c)){col[r]=c;f(r+1);}}

    public static void main(String[] args) throws Exception {
        col=new int[4];f(0);System.out.println(solutions+" "+entries);
    }
}
```

A. 2 17  
B. 2 60  
C. 2 21  
D. 1 17  

<details><summary>Answer, trace and repair</summary>

**A. 2 17**

Entries by depth are1,4,6,4,2.60 would count candidate trials, not recursive entries; completed placements contribute leaf calls.

</details>

### J102 — Five queens is not two demonstrations

Total5-queen solutions?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[] col;static int solutions,entries;
    static boolean safe(int r,int c){for(int i=0;i<r;i++)if(col[i]==c||Math.abs(col[i]-c)==r-i)return false;return true;}
    static void f(int r){entries++;if(r==col.length){solutions++;return;}for(int c=0;c<col.length;c++)if(safe(r,c)){col[r]=c;f(r+1);}}

    public static void main(String[] args) throws Exception {
        col=new int[5];f(0);System.out.println(solutions);
    }
}
```

A. 2  
B. 5  
C. 25  
D. 10  

<details><summary>Answer, trace and repair</summary>

**D. 10**

This code exhausts all valid row choices, unlike stopping after a couple examples. It checks both column and diagonal attacks.

</details>

### J103 — Diagonal sign bug

Bad and proper safety predicates?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[] col;static int solutions,entries;
    static boolean safe(int r,int c){for(int i=0;i<r;i++)if(col[i]==c||Math.abs(col[i]-c)==r-i)return false;return true;}
    static void f(int r){entries++;if(r==col.length){solutions++;return;}for(int c=0;c<col.length;c++)if(safe(r,c)){col[r]=c;f(r+1);}}
    static boolean bad(int r,int c){for(int i=0;i<r;i++)if(col[i]==c||col[i]-c==r-i)return false;return true;}

    public static void main(String[] args) throws Exception {
        col=new int[]{0,0,0,0};System.out.println(bad(1,1)+" "+safe(1,1));
    }
}
```

A. true true  
B. false false  
C. true false  
D. false true  

<details><summary>Answer, trace and repair</summary>

**C. true false**

Queen(0,0) attacks(1,1), but signed0−1 is−1 rather than+1. Use absolute difference or both diagonal keys.

</details>

### J104 — Stored mutable paths collapse

Final stored output?

```java
import java.util.*;
import java.io.*;

public class Main {
    static List<List<Integer>> out=new ArrayList<>();
    static void f(List<Integer> p,int depth){if(depth==2){out.add(p);return;}for(int x=0;x<2;x++){p.add(x);f(p,depth+1);p.remove(p.size()-1);}}

    public static void main(String[] args) throws Exception {
        f(new ArrayList<>(),0);System.out.println(out);
    }
}
```

A. [[0, 0], [0, 1], [1, 0], [1, 1]]  
B. [[], [], [], []]  
C. [[1, 1], [1, 1]]  
D. Compilation failure  

<details><summary>Answer, trace and repair</summary>

**B. [[], [], [], []]**

Each leaf stores the same mutable object. After all pops it is empty, and every reference displays the emptied list; new ArrayList<>(p) snapshots each leaf.

</details>

### J105 — Used flag missing undo

Result and missing operation?

```java
import java.util.*;
import java.io.*;

public class Main {
    static boolean[] used=new boolean[3];static int count;
    static void f(int depth){if(depth==3){count++;return;}for(int i=0;i<3;i++)if(!used[i]){used[i]=true;f(depth+1);}}

    public static void main(String[] args) throws Exception {
        f(0);System.out.println(count+" "+Arrays.toString(used));
    }
}
```

A. 1 [true, true, true]; restore used[i]=false after child  
B. 6 [false, false, false]; code correct  
C. 0 [true, true, true]; allow reuse  
D. 3 [true, true, true]; sort values  

<details><summary>Answer, trace and repair</summary>

**A. 1 [true, true, true]; restore used[i]=false after child**

First chain consumes every flag forever. Sibling branches see unavailable choices; branch state must be undone.

</details>

### J106 — Cost includes safety scans

For generalized n, which is a justified upper bound including this O(r) safety scan and n candidate trials per partial state?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[] col;static int solutions,entries;
    static boolean safe(int r,int c){for(int i=0;i<r;i++)if(col[i]==c||Math.abs(col[i]-c)==r-i)return false;return true;}
    static void f(int r){entries++;if(r==col.length){solutions++;return;}for(int c=0;c<col.length;c++)if(safe(r,c)){col[r]=c;f(r+1);}}

    public static void main(String[] args) throws Exception {
        col=new int[4];f(0);System.out.println(solutions);
    }
}
```

A. Guaranteed O(n²) because board has n² cells  
B. Exactly Θ(n!) for this scanning implementation without qualification  
C. O(log n) because recursion has n levels  
D. O(n²·n!) is a safe upper bound, excluding board output  

<details><summary>Answer, trace and repair</summary>

**D. O(n²·n!) is a safe upper bound, excluding board output**

Column-unique partial paths are bounded by a constant multiple of n!; each internal state tests n columns with O(n) scans. Pruning can reduce work; no tight factorial claim is inferred from a4-queen run.

</details>

## Maximum-gold search and restoration

Evidence: Day 25. Track: MCQ depth: path backtracking.

### J107 — Hub cannot be reused

Maximum path gold?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[][] g;static int R,C;
    static int f(int r,int c){if(r<0||c<0||r>=R||c>=C||g[r][c]==0)return 0;int saved=g[r][c];g[r][c]=0;
    int best=Math.max(Math.max(f(r+1,c),f(r-1,c)),Math.max(f(r,c+1),f(r,c-1)));g[r][c]=saved;return saved+best;}
    static int run(){R=g.length;C=g[0].length;int best=0;for(int r=0;r<R;r++)for(int c=0;c<C;c++)best=Math.max(best,f(r,c));return best;}

    public static void main(String[] args) throws Exception {
        g=new int[][]{{0,1,0},{1,1,1},{0,1,0}};System.out.println(run());
    }
}
```

A. 5  
B. 4  
C. 3  
D. 1  

<details><summary>Answer, trace and repair</summary>

**C. 3**

A path enters the hub from one arm and leaves to another. Summing all five cells would revisit the hub, which this marking rule prohibits.

</details>

### J108 — Restored grid after all starts

Maximum and remaining original-grid sum?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[][] g;static int R,C;
    static int f(int r,int c){if(r<0||c<0||r>=R||c>=C||g[r][c]==0)return 0;int saved=g[r][c];g[r][c]=0;
    int best=Math.max(Math.max(f(r+1,c),f(r-1,c)),Math.max(f(r,c+1),f(r,c-1)));g[r][c]=saved;return saved+best;}
    static int run(){R=g.length;C=g[0].length;int best=0;for(int r=0;r<R;r++)for(int c=0;c<C;c++)best=Math.max(best,f(r,c));return best;}

    public static void main(String[] args) throws Exception {
        g=new int[][]{{1,1},{1,1}};int best=run(),sum=0;for(int[] row:g)for(int x:row)sum+=x;System.out.println(best+" "+sum);
    }
}
```

A. 4 0  
B. 4 4  
C. 3 4  
D. 4 1  

<details><summary>Answer, trace and repair</summary>

**B. 4 4**

Each path uses temporary zero markers and restores on return, including successful paths. The all-start loop does not consume the input permanently.

</details>

### J109 — Forgotten restoration ruins later starts

Wrong result and final grid?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[][] g;static int R,C;
    static int f(int r,int c){if(r<0||c<0||r>=R||c>=C||g[r][c]==0)return 0;int saved=g[r][c];g[r][c]=0;
    int best=Math.max(Math.max(f(r+1,c),f(r-1,c)),Math.max(f(r,c+1),f(r,c-1)));return saved+best;}
    static int run(){R=g.length;C=g[0].length;int best=0;for(int r=0;r<R;r++)for(int c=0;c<C;c++)best=Math.max(best,f(r,c));return best;}

    public static void main(String[] args) throws Exception {
        g=new int[][]{{0,6,0},{5,8,7},{0,9,0}};System.out.println(run()+" "+Arrays.deepToString(g));
    }
}
```

A. 23 [[0, 0, 0], [0, 0, 0], [0, 0, 0]]  
B. 24 [[0, 6, 0], [5, 8, 7], [0, 9, 0]]  
C. 35 [[0, 0, 0], [0, 0, 0], [0, 0, 0]]  
D. 7 [[0, 0, 0], [0, 0, 0], [0, 0, 0]]  

<details><summary>Answer, trace and repair</summary>

**A. 23 [[0, 0, 0], [0, 0, 0], [0, 0, 0]]**

First positive start6 reaches8; exploring sibling directions permanently consumes other arms. Later start7 cannot recover the true7→8→9 sum24. Restore each saved cell.

</details>

### J110 — Sum versus max child corrupts path

Wrong centre-start return?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[][] g;static int R,C;
    static int f(int r,int c){if(r<0||c<0||r>=R||c>=C||g[r][c]==0)return 0;int saved=g[r][c];g[r][c]=0;
    int best=f(r+1,c)+f(r-1,c)+f(r,c+1)+f(r,c-1);g[r][c]=saved;return saved+best;}
    static int run(){R=g.length;C=g[0].length;int best=0;for(int r=0;r<R;r++)for(int c=0;c<C;c++)best=Math.max(best,f(r,c));return best;}

    public static void main(String[] args) throws Exception {
        g=new int[][]{{0,1,0},{1,1,1},{0,1,0}};R=C=3;System.out.println(f(1,1));
    }
}
```

A. 3  
B. 4  
C. 1  
D. 5  

<details><summary>Answer, trace and repair</summary>

**D. 5**

Adding all branch values combines mutually exclusive paths. A single path can choose one next direction, so use maximum child return.

</details>

## Hamiltonian: closure, path state and search order

Evidence: Day 26. Track: MCQ depth: backtracking/graph.

### J111 — Full path lacks closing edge

Result and restored path?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[][] g;static int[] p;static boolean[] used;
    static boolean f(int pos){if(pos==p.length)return g[p[pos-1]][p[0]]!=0;
    for(int v=1;v<p.length;v++)if(!used[v]&&g[p[pos-1]][v]!=0){p[pos]=v;used[v]=true;if(f(pos+1))return true;used[v]=false;p[pos]=-1;}return false;}
    static boolean run(){p=new int[g.length];Arrays.fill(p,-1);used=new boolean[g.length];p[0]=0;used[0]=true;return f(1);}

    public static void main(String[] args) throws Exception {
        g=new int[][]{{0,1,0,0},{1,0,1,0},{0,1,0,1},{0,0,1,0}};System.out.println(run()+" "+Arrays.toString(p));
    }
}
```

A. true [0, 1, 2, 3]  
B. false [0, 1, 2, 3]  
C. false [0, -1, -1, -1]  
D. true [0, -1, -1, -1]  

<details><summary>Answer, trace and repair</summary>

**C. false [0, -1, -1, -1]**

Path0,1,2,3 exists but3→0 is absent. Failure unwinds and clears selected positions; only the fixed start remains.

</details>

### J112 — First valid cycle persists

Return and first path under ascending candidate order?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[][] g;static int[] p;static boolean[] used;
    static boolean f(int pos){if(pos==p.length)return g[p[pos-1]][p[0]]!=0;
    for(int v=1;v<p.length;v++)if(!used[v]&&g[p[pos-1]][v]!=0){p[pos]=v;used[v]=true;if(f(pos+1))return true;used[v]=false;p[pos]=-1;}return false;}
    static boolean run(){p=new int[g.length];Arrays.fill(p,-1);used=new boolean[g.length];p[0]=0;used[0]=true;return f(1);}

    public static void main(String[] args) throws Exception {
        g=new int[][]{{0,1,1,1},{1,0,1,1},{1,1,0,1},{1,1,1,0}};System.out.println(run()+" "+Arrays.toString(p));
    }
}
```

A. true [0, 3, 2, 1]  
B. true [0, 1, 2, 3]  
C. false [0, -1, -1, -1]  
D. true [0, 1, 1, 3]  

<details><summary>Answer, trace and repair</summary>

**B. true [0, 1, 2, 3]**

All distinct candidates connect;3→0 closes. Early successful returns leave the chosen path intact, appropriate for finding one solution.

</details>

### J113 — Path length is not enough

Printed false-positive and repair?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[][] g;static int[] p;static boolean[] used;
    static boolean f(int pos){if(pos==p.length)return true;
    for(int v=1;v<p.length;v++)if(!used[v]&&g[p[pos-1]][v]!=0){p[pos]=v;used[v]=true;if(f(pos+1))return true;used[v]=false;p[pos]=-1;}return false;}
    static boolean run(){p=new int[g.length];Arrays.fill(p,-1);used=new boolean[g.length];p[0]=0;used[0]=true;return f(1);}

    public static void main(String[] args) throws Exception {
        g=new int[][]{{0,1,0,0},{1,0,1,0},{0,1,0,1},{0,0,1,0}};System.out.println(run());
    }
}
```

A. true incorrectly; test the final edge to start  
B. false; base length is sufficient  
C. Compilation error  
D. true correctly; any path is a cycle  

<details><summary>Answer, trace and repair</summary>

**A. true incorrectly; test the final edge to start**

Reaching V positions proves only a Hamiltonian path. The closing edge belongs in the base case.

</details>

### J114 — Found-any versus enumerated-all

Boolean result and counted leaves?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int count;static boolean f(int depth){if(depth==3){count++;return true;}for(int x=0;x<2;x++)if(f(depth+1))return true;return false;}

    public static void main(String[] args) throws Exception {
        System.out.println(f(0)+" "+count);
    }
}
```

A. true 8  
B. false 0  
C. true 7  
D. true 1  

<details><summary>Answer, trace and repair</summary>

**D. true 1**

Every successful child returns immediately through ancestors, so only one leaf is reached. Replace early-return logic when the task asks for all solutions.

</details>

### J115 — Search count is factorial, not DFS linear

Without a promise of early success, why can this search have factorial-scale work?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[][] g;static int[] p;static boolean[] used;
    static boolean f(int pos){if(pos==p.length)return g[p[pos-1]][p[0]]!=0;
    for(int v=1;v<p.length;v++)if(!used[v]&&g[p[pos-1]][v]!=0){p[pos]=v;used[v]=true;if(f(pos+1))return true;used[v]=false;p[pos]=-1;}return false;}
    static boolean run(){p=new int[g.length];Arrays.fill(p,-1);used=new boolean[g.length];p[0]=0;used[0]=true;return f(1);}

    public static void main(String[] args) throws Exception {
        g=new int[][]{{0,1,1},{1,0,1},{1,1,0}};System.out.println(run());
    }
}
```

A. All recursive graph methods are O(V+E)  
B. One vertex array makes runtime O(V)  
C. It tries ordered unused-vertex assignments, not one global visited traversal  
D. Checking a matrix edge is O(V²) each  

<details><summary>Answer, trace and repair</summary>

**C. It tries ordered unused-vertex assignments, not one global visited traversal**

Used is undone to explore alternative paths; vertices are revisited across branches. O(1) adjacency checks do not bound the number of partial permutations.

</details>

## Brace expansion: parser state, union and products

Evidence: Day 26; nested formal grammar extension. Track: MCQ depth: string parsing/backtracking.

### J116 — Nested concatenation result

**Extension.** Sorted unique expansion?

```java
import java.util.*;
import java.io.*;

public class Main {
    static String s;static int at;
    static Set<String> union(){Set<String> ans=new TreeSet<>(product());while(at<s.length()&&s.charAt(at)==','){at++;ans.addAll(product());}return ans;}
    static Set<String> product(){Set<String> out=new TreeSet<>();out.add("");while(at<s.length()&&s.charAt(at)!=','&&s.charAt(at)!='}'){
    Set<String> factor;if(s.charAt(at)=='{'){at++;factor=union();at++;}else{factor=new TreeSet<>();factor.add(String.valueOf(s.charAt(at++)));}
    Set<String> next=new TreeSet<>();for(String a:out)for(String b:factor)next.add(a+b);out=next;}return out;}
    static Set<String> expand(String input){s=input;at=0;return union();}

    public static void main(String[] args) throws Exception {
        System.out.println(expand("{a,b}{c,{d,e}}"));
    }
}
```

A. [a, b, c, d, e]  
B. [ac, ad, ae, bc, bd, be]  
C. [ac, bd, be]  
D. [acd, ace, bcd, bce]  

<details><summary>Answer, trace and repair</summary>

**B. [ac, ad, ae, bc, bd, be]**

Second factor is the union ofc,d,e, then multiplied by first factora,b. Nested delimiters control parsing rather than becoming output characters.

</details>

### J117 — Union removes duplicate strings

**Extension.** Set output?

```java
import java.util.*;
import java.io.*;

public class Main {
    static String s;static int at;
    static Set<String> union(){Set<String> ans=new TreeSet<>(product());while(at<s.length()&&s.charAt(at)==','){at++;ans.addAll(product());}return ans;}
    static Set<String> product(){Set<String> out=new TreeSet<>();out.add("");while(at<s.length()&&s.charAt(at)!=','&&s.charAt(at)!='}'){
    Set<String> factor;if(s.charAt(at)=='{'){at++;factor=union();at++;}else{factor=new TreeSet<>();factor.add(String.valueOf(s.charAt(at++)));}
    Set<String> next=new TreeSet<>();for(String a:out)for(String b:factor)next.add(a+b);out=next;}return out;}
    static Set<String> expand(String input){s=input;at=0;return union();}

    public static void main(String[] args) throws Exception {
        System.out.println(expand("{{a,b},{b,c}}"));
    }
}
```

A. [a, b, c]  
B. [a, b, b, c]  
C. [ab, bc]  
D. [a, c]  

<details><summary>Answer, trace and repair</summary>

**A. [a, b, c]**

TreeSet union deduplicatesb. Concatenation only applies to adjacent factors, not the comma-separated alternatives.

</details>

### J118 — Parser index after complete expression

**Extension.** Output and at after consuming all characters?

```java
import java.util.*;
import java.io.*;

public class Main {
    static String s;static int at;
    static Set<String> union(){Set<String> ans=new TreeSet<>(product());while(at<s.length()&&s.charAt(at)==','){at++;ans.addAll(product());}return ans;}
    static Set<String> product(){Set<String> out=new TreeSet<>();out.add("");while(at<s.length()&&s.charAt(at)!=','&&s.charAt(at)!='}'){
    Set<String> factor;if(s.charAt(at)=='{'){at++;factor=union();at++;}else{factor=new TreeSet<>();factor.add(String.valueOf(s.charAt(at++)));}
    Set<String> next=new TreeSet<>();for(String a:out)for(String b:factor)next.add(a+b);out=next;}return out;}
    static Set<String> expand(String input){s=input;at=0;return union();}

    public static void main(String[] args) throws Exception {
        Set<String> out=expand("{a,{b,c}}d");System.out.println(out+" "+at);
    }
}
```

A. [ad, bd, cd] 9  
B. [a, b, c, d] 10  
C. [abd, acd] 10  
D. [ad, bd, cd] 10  

<details><summary>Answer, trace and repair</summary>

**D. [ad, bd, cd] 10**

Expression length10:outer brace ends at8 and literald at9. Nested union returns before its closing brace, which the caller consumes.

</details>

### J119 — Empty product is identity

**Extension.** Why must product initialize out with the empty string rather than an empty set?

```java
import java.util.*;
import java.io.*;

public class Main {
    static String s;static int at;
    static Set<String> union(){Set<String> ans=new TreeSet<>(product());while(at<s.length()&&s.charAt(at)==','){at++;ans.addAll(product());}return ans;}
    static Set<String> product(){Set<String> out=new TreeSet<>();out.add("");while(at<s.length()&&s.charAt(at)!=','&&s.charAt(at)!='}'){
    Set<String> factor;if(s.charAt(at)=='{'){at++;factor=union();at++;}else{factor=new TreeSet<>();factor.add(String.valueOf(s.charAt(at++)));}
    Set<String> next=new TreeSet<>();for(String a:out)for(String b:factor)next.add(a+b);out=next;}return out;}
    static Set<String> expand(String input){s=input;at=0;return union();}

    public static void main(String[] args) throws Exception {
        System.out.println(expand("a{b,c}"));
    }
}
```

A. Empty set and {""} are interchangeable  
B. It only affects alphabetical sorting  
C. Otherwise Cartesian concatenation never produces any words  
D. It automatically repairs unmatched braces  

<details><summary>Answer, trace and repair</summary>

**C. Otherwise Cartesian concatenation never produces any words**

The loops combine each existing prefix with each factor. No existing prefix gives no combinations; empty string supplies the concatenation identity.

</details>

### J120 — Input read cost is not output cost

Total materialized character work for growing n?

```java
import java.util.*;
import java.io.*;

public class Main {
    static List<String> f(int n){if(n==0)return new ArrayList<>(Arrays.asList(""));List<String> prev=f(n-1),out=new ArrayList<>();for(String p:prev){out.add(p+"a");out.add(p+"b");}return out;}

    public static void main(String[] args) throws Exception {
        System.out.println(f(3).size());
    }
}
```

A. Θ(n) because each depth appears once  
B. Θ(n·2^n) under copied-string concatenation  
C. Θ(2^n) including all length-n writes  
D. Θ(n!)  

<details><summary>Answer, trace and repair</summary>

**B. Θ(n·2^n) under copied-string concatenation**

There are2^n final strings each lengthn; all earlier levels form a geometric-size sum. Character copying must be counted.

</details>

## Gray code: bits, closure and representation

Evidence: Day 27. Track: MCQ depth: bit operations/sequence construction.

### J121 — XOR and OR differ on set bits

Three results?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int x=3;System.out.println((x^(1<<1))+" "+(x|(1<<1))+" "+(x&~(1<<1)));
    }
}
```

A. 1 3 1  
B. 1 1 1  
C. 3 3 1  
D. 1 3 2  

<details><summary>Answer, trace and repair</summary>

**A. 1 3 1**

011 XOR010 toggles to001; OR retains011; AND with complemented mask clears bit1.

</details>

### J122 — Reflected Gray at index5

**Extension.** Current value, previous XOR, closing XOR?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] a=new int[8];for(int i=0;i<8;i++)a[i]=i^(i>>1);
        int i=5;System.out.println(a[i]+" "+(a[i]^a[i-1])+" "+(a[7]^a[0]));
    }
}
```

A. 5 1 7  
B. 7 3 4  
C. 6 1 4  
D. 7 1 4  

<details><summary>Answer, trace and repair</summary>

**D. 7 1 4**

Gray values0,1,3,2,6,7,5,4. Index5 is7, previous6 differs by1; final4 and0 differ by4, one bit.

</details>

### J123 — One-bit test needs nonzero

Results and duplicate-state relevance?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int d=0;boolean bad=(d&(d-1))==0;boolean good=d!=0&&(d&(d-1))==0;
        System.out.println(bad+" "+good);
    }
}
```

A. false false  
B. true true  
C. true false  
D. false true  

<details><summary>Answer, trace and repair</summary>

**C. true false**

Zero also satisfies the usual bit-clearing equality but represents identical adjacent states, not one changed bit. Require d!=0.

</details>

### J124 — Shift count masked by Java

**Extension.** Exact output?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int a=1<<32;long b=1L<<32;System.out.println(a+" "+b);
    }
}
```

A. 0 4294967296  
B. 1 4294967296  
C. 4294967296 4294967296  
D. A Java runtime exception  

<details><summary>Answer, trace and repair</summary>

**B. 1 4294967296**

Java int shift uses the low5 bits of the shift count, so32 becomes0. long uses low6 bits; use the correct literal type and valid range.

</details>

### J125 — Omitted closing edge in validator

What checks are still required for an arbitrary candidate cyclic Gray sequence?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] a={0,1,3,2,6,7,5,4};boolean ok=true;
        for(int i=1;i<a.length;i++){int d=a[i]^a[i-1];ok&=d!=0&&(d&(d-1))==0;}
        System.out.println(ok);
    }
}
```

A. Range, uniqueness/required count, start0, and last-to-first one-bit change  
B. None; adjacent tests imply all other conditions  
C. Only sorting values  
D. Only sum of array values  

<details><summary>Answer, trace and repair</summary>

**A. Range, uniqueness/required count, start0, and last-to-first one-bit change**

The supplied sequence passes, but the validator’s predicate accepts some incomplete/repeating paths. Confirm the entire sequence contract separately.

</details>

## Campus Bikes: assignment state and pruning

Evidence: Day 27. Track: MCQ depth: optimization/backtracking.

### J126 — Global optimum and undo

Minimum cost, leaves, final flags?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[][] w={{0,0},{2,0}},b={{1,0},{-2,0}};static boolean[] used=new boolean[2];static int best=999,leaves;
    static int d(int i,int j){return Math.abs(w[i][0]-b[j][0])+Math.abs(w[i][1]-b[j][1]);}
    static void f(int i,int sum){if(i==w.length){leaves++;best=Math.min(best,sum);return;}for(int j=0;j<b.length;j++)if(!used[j]){used[j]=true;f(i+1,sum+d(i,j));used[j]=false;}}

    public static void main(String[] args) throws Exception {
        f(0,0);System.out.println(best+" "+leaves+" "+Arrays.toString(used));
    }
}
```

A. 5 1 [true, true]  
B. 3 4 [false, false]  
C. 2 2 [false, false]  
D. 3 2 [false, false]  

<details><summary>Answer, trace and repair</summary>

**D. 3 2 [false, false]**

Assignments costs5 and3 are both tried; each worker needs a distinct bike and all choices are undone on return.

</details>

### J127 — Nearest pair is only a local choice

Greedy tie assignment and optimum totals?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[][] w={{0,0},{2,0}},b={{1,0},{-2,0}};static boolean[] used=new boolean[2];static int best=999,leaves;
    static int d(int i,int j){return Math.abs(w[i][0]-b[j][0])+Math.abs(w[i][1]-b[j][1]);}
    static void f(int i,int sum){if(i==w.length){leaves++;best=Math.min(best,sum);return;}for(int j=0;j<b.length;j++)if(!used[j]){used[j]=true;f(i+1,sum+d(i,j));used[j]=false;}}

    public static void main(String[] args) throws Exception {
        int first=0,total=d(0,first)+d(1,1);f(0,0);System.out.println(total+" "+best);
    }
}
```

A. 3 5  
B. 3 3  
C. 5 3  
D. 1 1  

<details><summary>Answer, trace and repair</summary>

**C. 5 3**

Worker0→bike0 costs1, leaving worker1→bike1 cost4. Reassignment costs2+1=3. The class minimizes total rather than fixed greedy pair rules.

</details>

### J128 — Branch pruning assumes nonnegative remainder

For this input, best/leaves counted after pruning?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int[][] w={{0,0},{2,0}},b={{1,0},{-2,0}};static boolean[] used=new boolean[2];static int best=999,leaves;
    static int d(int i,int j){return Math.abs(w[i][0]-b[j][0])+Math.abs(w[i][1]-b[j][1]);}
    static void f(int i,int sum){if(sum>=best)return;if(i==w.length){leaves++;best=Math.min(best,sum);return;}for(int j=0;j<b.length;j++)if(!used[j]){used[j]=true;f(i+1,sum+d(i,j));used[j]=false;}}

    public static void main(String[] args) throws Exception {
        f(0,0);System.out.println(best+" "+leaves);
    }
}
```

A. 3 1  
B. 3 2  
C. 5 1  
D. 3 4  

<details><summary>Answer, trace and repair</summary>

**B. 3 2**

First complete cost5 is accepted, later prefix2<5 reaches cost3. Nonnegative Manhattan costs justify pruning a partial sum already≥best when only minimum cost, not all optima, is requested.

</details>

### J129 — Used mask, not just count

**Extension.** Why should memoized assignment distinguish these two states?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int key(int worker,int mask){return worker*16+mask;}

    public static void main(String[] args) throws Exception {
        System.out.println(key(1,1)+" "+key(1,2));
    }
}
```

A. Different bike identities remain available even though both have one used bit  
B. Same worker index makes future costs identical  
C. Only prior total cost defines remaining options  
D. All masks with one bit can be merged safely  

<details><summary>Answer, trace and repair</summary>

**A. Different bike identities remain available even though both have one used bit**

Masks1 and2 reserve different bike coordinates. Remaining minimal cost depends on which bike is unused, not just cardinality.

</details>

### J130 — Permutation count with extra bikes

Complete assignments for2 workers,3 bikes?

```java
import java.util.*;
import java.io.*;

public class Main {
    static boolean[] u=new boolean[3];static int leaves;static void f(int i){if(i==2){leaves++;return;}for(int j=0;j<3;j++)if(!u[j]){u[j]=true;f(i+1);u[j]=false;}}

    public static void main(String[] args) throws Exception {
        f(0);System.out.println(leaves);
    }
}
```

A. 3  
B. 9  
C. 2  
D. 6  

<details><summary>Answer, trace and repair</summary>

**D. 6**

The first worker has3 choices, second2. It is a partial permutation, not a subset or all-with-reuse choice.

</details>

## Abbreviations and assignment-linked transfers

Evidence: Day 27; Additive Number / Beautiful Arrangement are assignment-only extensions. Track: MCQ depth: string/backtracking.

### J131 — Exact branch order with pending runs

Skip-first output order?

```java
import java.util.*;
import java.io.*;

public class Main {
    static List<String> out=new ArrayList<>();static void f(String w,int i,int run,String p){if(i==w.length()){out.add(p+(run==0?"":run));return;}f(w,i+1,run+1,p);f(w,i+1,0,p+(run==0?"":run)+w.charAt(i));}

    public static void main(String[] args) throws Exception {
        f("AB",0,0,"");System.out.println(out);
    }
}
```

A. [11, 1B, A1, AB]  
B. [AB, A1, 1B, 2]  
C. [2, 1B, A1, AB]  
D. [2, B1, A1, AB]  

<details><summary>Answer, trace and repair</summary>

**C. [2, 1B, A1, AB]**

Skip/skip flushes2; skip/keep flushes1 beforeB; keep/skip emitsA1. Traversal order follows the listed recursive calls.

</details>

### J132 — Suffix count not flushed

Faulty leaf outputs?

```java
import java.util.*;
import java.io.*;

public class Main {
    static List<String> out=new ArrayList<>();static void f(String w,int i,int run,String p){if(i==w.length()){out.add(p);return;}f(w,i+1,run+1,p);f(w,i+1,0,p+(run==0?"":run)+w.charAt(i));}

    public static void main(String[] args) throws Exception {
        f("AB",0,0,"");System.out.println(out);
    }
}
```

A. [2, 1B, A1, AB]  
B. [, 1B, A, AB]  
C. [, B, A, AB]  
D. [1, 1B, A1, AB]  

<details><summary>Answer, trace and repair</summary>

**B. [, 1B, A, AB]**

Pending suffix disappears: all-skipped branch becomes empty; A+skip becomesA. Flush run at leaf as well as before kept literals.

</details>

### J133 — Count versus materialized string work

For generalized alphabetic lengthn, output count and materialized character upper bound?

```java
import java.util.*;
import java.io.*;

public class Main {
    static List<String> out=new ArrayList<>();static void f(String w,int i,int run,String p){if(i==w.length()){out.add(p+(run==0?"":run));return;}f(w,i+1,run+1,p);f(w,i+1,0,p+(run==0?"":run)+w.charAt(i));}

    public static void main(String[] args) throws Exception {
        f("WORD",0,0,"");System.out.println(out.size());
    }
}
```

A. 2^n outputs; O(n·2^n) character work  
B. n! outputs; Θ(n!) character work  
C. 2^n outputs; O(n) total characters  
D. n² outputs; Θ(n²) time  

<details><summary>Answer, trace and repair</summary>

**A. 2^n outputs; O(n·2^n) character work**

Each position has keep/skip choices. Immutable path concatenations copy characters; output-sensitive bounds include construction, not only recursion entries.

</details>

### J134 — Leading-zero validity helper

**Extension.** Usual additive-number decimal-field validity?

```java
import java.util.*;
import java.io.*;

public class Main {
    static boolean valid(String s){return s.length()==1||s.charAt(0)!='0';}

    public static void main(String[] args) throws Exception {
        System.out.println(valid("0")+" "+valid("01")+" "+valid("10"));
    }
}
```

A. false false true  
B. true true true  
C. false true true  
D. true false true  

<details><summary>Answer, trace and repair</summary>

**D. true false true**

Single0 is allowed; multidigit01 is forbidden even though parseInt accepts it numerically. Assume nonempty fields here.

</details>

### J135 — OR versus AND in arrangement

**Extension.** Counts under proper OR and faulty AND?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int count(boolean and){int c=0;for(int a=1;a<=2;a++)for(int b=1;b<=2;b++)if(a!=b){int[] x={a,b};boolean ok=true;for(int p=1;p<=2;p++){int v=x[p-1];ok&=and?(v%p==0&&p%v==0):(v%p==0||p%v==0);}if(ok)c++;}return c;}

    public static void main(String[] args) throws Exception {
        System.out.println(count(false)+" "+count(true));
    }
}
```

A. 2 2  
B. 1 2  
C. 2 1  
D. 1 0  

<details><summary>Answer, trace and repair</summary>

**C. 2 1**

Both permutations satisfy at least one divisibility direction per position; only[1,2] survives requiring both. Distinct-value condition is independent.

</details>

## Java input, regex, overloads and collection traps

Evidence: Exam-platform transfer; official Java17 APIs. Track: Java-only extension.

### J136 — Token then line

**Extension.** Token/line output?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        Scanner sc=new Scanner("3\nred blue\n");int n=sc.nextInt();String a=sc.nextLine(),b=sc.nextLine();
        System.out.println(n+" ["+a+"] ["+b+"]");
    }
}
```

A. 3 [red blue] []  
B. 3 [] [red blue]  
C. 3 [3] [red blue]  
D. NoSuchElementException  

<details><summary>Answer, trace and repair</summary>

**B. 3 [] [red blue]**

nextInt consumes the number but leaves the line ending; first nextLine returns the remaining empty portion. Decide token or line grammar before reading.

</details>

### J137 — Regex and trailing fields

**Extension.** Two printed records?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        String s="a,b,,";System.out.println(Arrays.toString(s.split(","))+" "+s.split(",").length);
        System.out.println(Arrays.toString(s.split(",",-1))+" "+s.split(",",-1).length);
    }
}
```

A. [a, b] 2 / [a, b, , ] 4  
B. [a, b, , ] 4 / [a, b] 2  
C. [a, b, ] 3 / [a, b, , ] 4  
D. Both arrays have4 fields  

<details><summary>Answer, trace and repair</summary>

**A. [a, b] 2 / [a, b, , ] 4**

Default zero-limit split drops trailing empty fields; negative limit retains them. Middle empty fields are not the same as trailing ones.

</details>

### J138 — Dot is a regex metacharacter

**Extension.** Split lengths?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        String s="a.b.c";System.out.println(s.split(".").length+" "+s.split("\\.").length);
    }
}
```

A. 3 3  
B. 5 3  
C. 1 3  
D. 0 3  

<details><summary>Answer, trace and repair</summary>

**D. 0 3**

Unescaped dot matches every character; only trailing empty pieces remain and are discarded. Escape it to split on literal periods.

</details>

### J139 — List remove overload

**Extension.** Remaining list?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        List<Integer> a=new ArrayList<>(Arrays.asList(1,2,1));a.remove(1);a.remove(Integer.valueOf(1));System.out.println(a);
    }
}
```

A. [2]  
B. [1, 2]  
C. [1]  
D. []  

<details><summary>Answer, trace and repair</summary>

**C. [1]**

remove(int1) first deletes index1,value2. remove(Integer1) then deletes the first matching value1. Wrapper type determines overload.

</details>

### J140 — Primitive array as one object

**Extension.** Sizes?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] a={1,2,3};List<int[]> x=Arrays.asList(a);List<Integer> y=Arrays.asList(1,2,3);System.out.println(x.size()+" "+y.size());
    }
}
```

A. 3 3  
B. 1 3  
C. 1 1  
D. Compilation failure because generics box whole arrays automatically  

<details><summary>Answer, trace and repair</summary>

**B. 1 3**

int[] is a single reference argument to varargs; its elements are not individually boxed into list entries.

</details>

### J141 — Fixed-size view mutation

**Extension.** First output and exception?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        String[] a={"a","b"};List<String> x=Arrays.asList(a);x.set(0,"z");System.out.println(a[0]);x.add("c");
    }
}
```

A. z, then UnsupportedOperationException  
B. a, then prints successfully  
C. z, then ArrayIndexOutOfBoundsException  
D. Compilation failure  

<details><summary>Answer, trace and repair</summary>

**A. z, then UnsupportedOperationException**

The view supports replacing existing elements and reflects into its backing array, but cannot change size. Make a new ArrayList<>(...) to grow.

</details>

### J142 — Unboxing missing key

**Extension.** Runtime behavior?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        Map<String,Integer> m=new HashMap<>();m.put("a",1);int v=m.get("b");System.out.println(v);
    }
}
```

A. Prints0  
B. Prints−1  
C. Compilation failure  
D. NullPointerException during unboxing  

<details><summary>Answer, trace and repair</summary>

**D. NullPointerException during unboxing**

get returnsnull for absent key; assigning to primitive int unboxes it. Use getOrDefault or check presence/null first.

</details>

### J143 — Queue push changes FIFO

**Extension.** Removal order?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        Deque<Integer> q=new ArrayDeque<>();q.offer(1);q.offer(2);q.push(3);System.out.println(q.poll()+" "+q.poll()+" "+q.poll());
    }
}
```

A. 1 2 3  
B. 3 2 1  
C. 3 1 2  
D. 2 1 3  

<details><summary>Answer, trace and repair</summary>

**C. 3 1 2**

offer appends at tail; push inserts at head. poll removes head, so mixing stack and queue conventions changes order.

</details>

### J144 — PriorityQueue iterator is not sorted

**Extension.** Which ordering is guaranteed by this code and should replace relying on a heap iterator?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        PriorityQueue<Integer> p=new PriorityQueue<>();for(int x:new int[]{4,1,3,2})p.offer(x);List<Integer> out=new ArrayList<>();while(!p.isEmpty())out.add(p.poll());System.out.println(out);
    }
}
```

A. toString and iterator always have the same sorted guarantee  
B. [1, 2, 3, 4] from repeated poll  
C. [4, 3, 2, 1] from the default heap  
D. Insertion order is guaranteed  

<details><summary>Answer, trace and repair</summary>

**B. [1, 2, 3, 4] from repeated poll**

The contract gives smallest head for default ordering; iteration/toString is not specified as sorted. Repeated removals are the dependable sorted extraction.

</details>

### J145 — Comparator not subtraction

**Extension.** Correct sorted array?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        Integer[] a={2_000_000_000,-2_000_000_000};Arrays.sort(a,(x,y)->Integer.compare(x,y));System.out.println(Arrays.toString(a));
    }
}
```

A. [-2000000000, 2000000000]  
B. [2000000000, -2000000000]  
C. [0, 0]  
D. Compilation failure  

<details><summary>Answer, trace and repair</summary>

**A. [-2000000000, 2000000000]**

Object-array comparator uses overflow-safe comparison. Primitive int[] cannot use this comparator overload directly.

</details>

### J146 — Generic primitive compile failure

**Extension.** Compilation diagnosis?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        List<int> a=new ArrayList<>();a.add(1);System.out.println(a);
    }
}
```

A. Valid Java17 generics automatically box type declarations  
B. Runtime NullPointerException  
C. ArrayList must always be replaced by Vector  
D. Generic type arguments must be reference types; use Integer  

<details><summary>Answer, trace and repair</summary>

**D. Generic type arguments must be reference types; use Integer**

Autoboxing works at value conversion, not at an invalid generic type parameter declaration.

</details>

### J147 — Checked parse failure from whitespace

**Extension.** Behavior and appropriate repair for an integer token with surrounding whitespace?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        String x=" 42 ";System.out.println(Integer.parseInt(x));
    }
}
```

A. Prints42 automatically  
B. Prints0  
C. NumberFormatException; parse x.trim()  
D. Compilation failure  

<details><summary>Answer, trace and repair</summary>

**C. NumberFormatException; parse x.trim()**

parseInt expects the string grammar without external whitespace. A token reader already removes separators; line fields often need explicit normalization.

</details>

### J148 — Reference reassignment versus mutation

**Extension.** Caller-visible value?

```java
import java.util.*;
import java.io.*;

public class Main {
    static void f(int[] a){a[0]=7;a=new int[]{9};}

    public static void main(String[] args) throws Exception {
        int[] x={1};f(x);System.out.println(x[0]);
    }
}
```

A. 9  
B. 7  
C. 1  
D. Compilation failure  

<details><summary>Answer, trace and repair</summary>

**B. 7**

Java passes the reference value. Mutating the referred array is visible; assigning a new array to the local parameter is not.

</details>

### J149 — Null-safe equality and concatenation

**Extension.** Output?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        String s=null;System.out.println(Objects.equals(s,"x")+" "+String.valueOf(s));
    }
}
```

A. false null  
B. NullPointerException before printing  
C. false empty string  
D. true null  

<details><summary>Answer, trace and repair</summary>

**A. false null**

Objects.equals handles null; String.valueOf((Object)null) returns the textnull. Calling s.equals would instead dereference null.

</details>

### J150 — Sorted search negative insertion encoding

**Extension.** Return value and decoded insertion position?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int[] a={1,3,5,7};int x=Arrays.binarySearch(a,4);System.out.println(x+" "+(-x-1));
    }
}
```

A. -2 2  
B. 2 2  
C. -1 0  
D. -3 2  

<details><summary>Answer, trace and repair</summary>

**D. -3 2**

Absent return is−(insertionPoint)−1. The insertion point for4 is2; no−1 guarantee exists for every absence.

</details>

### J151 — List growth after map default method

**Extension.** Map contents?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        Map<String,List<Integer>> m=new TreeMap<>();m.computeIfAbsent("x",k->new ArrayList<>()).add(1);m.computeIfAbsent("x",k->new ArrayList<>()).add(2);System.out.println(m);
    }
}
```

A. {x=[2]}  
B. {x=[1], x=[2]}  
C. {x=[1, 2]}  
D. Compilation failure because maps cannot hold lists  

<details><summary>Answer, trace and repair</summary>

**C. {x=[1, 2]}**

Existing nonnull value is reused; the factory runs only for absent/null mapping. The returned mutable list receives both additions.

</details>

## Additional lecture coverage: cycles, GCD reductions and generators

Evidence: Days 2–7; Java comparison extension. Track: MCQ depth: arithmetic/recurrence/generation.

### J152 — Happy-number repeated-state log

Sequence before detection and repeated state?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int next(int n){int s=0;while(n>0){int d=n%10;s+=d*d;n/=10;}return s;}

    public static void main(String[] args) throws Exception {
        int n=2;Set<Integer> seen=new HashSet<>();StringBuilder log=new StringBuilder();while(n!=1&&seen.add(n)){log.append(n).append(",");n=next(n);}System.out.println(log+"stop="+n+" size="+seen.size());
    }
}
```

A. 2,4,16,37,58,89,145,42,20,4,stop=16 size=10  
B. 2,4,16,37,58,89,145,42,20,stop=4 size=9  
C. 2,4,16,37,58,89,145,42,20,stop=1 size=9  
D. 2,4,stop=2 size=2  

<details><summary>Answer, trace and repair</summary>

**B. 2,4,16,37,58,89,145,42,20,stop=4 size=9**

seen.add returnsfalse for repeated4 before the body runs again. The path reaches a cycle different from1; arbitrary step limits are unnecessary.

</details>

### J153 — GCD array early break skips later state

GCD, processed values and helper entries?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int calls;static int gcd(int a,int b){calls++;return b==0?a:gcd(b,a%b);}

    public static void main(String[] args) throws Exception {
        int[] a={10,20,50,77};int g=0,processed=0;for(int x:a){g=gcd(g,x);processed++;if(g==1)break;}System.out.println(g+" "+processed+" "+calls);
    }
}
```

A. 1 4 13  
B. 1 4 12  
C. 10 3 7  
D. 1 4 14  

<details><summary>Answer, trace and repair</summary>

**D. 1 4 14**

gcd(0,10) makes2 entries;gcd(10,20)3;gcd(10,50)3;gcd(10,77)6 (10,77→77,10→10,7→7,3→3,1→1,0). Total14; all four values must be processed before g becomes1.

</details>

### J154 — Strobogrammatic outside-zero guard

Count and first/last generated strings?

```java
import java.util.*;
import java.io.*;

public class Main {
    static List<String> f(int n,int total){if(n==0)return new ArrayList<>(Arrays.asList(""));if(n==1)return new ArrayList<>(Arrays.asList("0","1","8"));List<String> out=new ArrayList<>();for(String m:f(n-2,total))for(String p:new String[]{"00","11","69","88","96"}){if(n==total&&p.equals("00"))continue;out.add(p.charAt(0)+m+p.charAt(1));}return out;}

    public static void main(String[] args) throws Exception {
        List<String> a=f(3,3);System.out.println(a.size()+" "+a.get(0)+" "+a.get(a.size()-1));
    }
}
```

A. 15 000 989  
B. 12 101 989  
C. 9 111 989  
D. 12 101 986  

<details><summary>Answer, trace and repair</summary>

**D. 12 101 986**

Three valid centre digits multiplied by four allowed outside pairs gives12. Inner recursion’s ordering starts centre0; last centre8 pairs96→986.

</details>

### J155 — String-plus-char versus char-plus-char

Two lines?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        char a='1',b='8';System.out.println(a+b);System.out.println(a+""+b);
    }
}
```

A. 18 / 18  
B. 105 / 105  
C. 105 / 18  
D. Compilation failure  

<details><summary>Answer, trace and repair</summary>

**C. 105 / 18**

char arithmetic promotes to int:49+56=105. Introducing a String operand makes concatenation, which matters in digit generators.

</details>

### J156 — Prime square comparison wraps

Booleans and safe loop boundary?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        int d=46341,n=Integer.MAX_VALUE;System.out.println((d*d<=n)+" "+(d<=n/d));
    }
}
```

A. false false; no overflow  
B. true false; use d<=n/d for positive d,n  
C. true true; sqrt bound allows46341  
D. false true; reverse operands  

<details><summary>Answer, trace and repair</summary>

**B. true false; use d<=n/d for positive d,n**

46341² exceeds int range and wraps negative, making the bad comparison true. Division boundary remains correct without multiplication overflow.

</details>

### J157 — Short-circuit predicate counter

Final booleans and prime invocations?

```java
import java.util.*;
import java.io.*;

public class Main {
    static int checks;static boolean digit(String s){return s.equals("11");}static boolean prime(int n){checks++;return n>1;}

    public static void main(String[] args) throws Exception {
        boolean a=digit("12")&&prime(12);boolean b=prime(12)&&digit("12");System.out.println(a+" "+b+" "+checks);
    }
}
```

A. false false 1  
B. false false 2  
C. true false 1  
D. false true 1  

<details><summary>Answer, trace and repair</summary>

**A. false false 1**

First expression never calls prime; second does before discovering digit failure. Same Boolean result does not mean identical execution cost.

</details>

### J158 — Three children versus quadratic toll

For power-of-two n, time and active stack?

```java
import java.util.*;
import java.io.*;

public class Main {
    static long f(int n){if(n<=1)return 1;long s=0;for(int i=0;i<n;i++)for(int j=0;j<n;j++)s++;return s+f(n/2)+f(n/2)+f(n/2);}

    public static void main(String[] args) throws Exception {
        System.out.println(f(4));
    }
}
```

A. Θ(n²log n) time, Θ(log n) stack  
B. Θ(n^(log₂3)) time, Θ(n) stack  
C. Θ(n³) time, Θ(1) stack  
D. Θ(n²) time, Θ(log n) stack  

<details><summary>Answer, trace and repair</summary>

**D. Θ(n²) time, Θ(log n) stack**

T=3T(n/2)+Θ(n²);3<4, so quadratic toll dominates. Three calls are sequential, not three simultaneous independent stacks.

</details>

### J159 — Wrapper type equality versus numeric promotion

**Extension.** Two equality tests?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        Integer a=7;Long b=7L;System.out.println(a.equals(b)+" "+(a.longValue()==b.longValue()));
    }
}
```

A. true true  
B. false false  
C. false true  
D. Compilation failure  

<details><summary>Answer, trace and repair</summary>

**C. false true**

Integer.equals requires an Integer with the same stored value. Explicit primitive long comparisons compare numeric values across original wrapper types.

</details>

### J160 — Java cache range is not a universal == rule

**Extension.** Output and correct rule for general wrapper equality?

```java
import java.util.*;
import java.io.*;

public class Main {


    public static void main(String[] args) throws Exception {
        Integer a=127,b=127;Integer c=Integer.valueOf(1000);System.out.println((a==b)+" "+c.equals(1000));
    }
}
```

A. false true; wrappers are never cached  
B. true true; use equals/unboxing, not a general == assumption  
C. true false; 1000 cannot be boxed  
D. true true; therefore == is always numeric for two wrappers  

<details><summary>Answer, trace and repair</summary>

**B. true true; use equals/unboxing, not a general == assumption**

Boxed constants in the guaranteed small range may share objects; that does not extend reference identity to arbitrary Integer values. equals checks value here.

</details>

## Java reference rules used

The programs are validated with local Java17. API semantics were cross-checked against official [String](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html), [ArrayList](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/ArrayList.html), and [ArrayDeque](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/ArrayDeque.html) documentation. ArrayList front removals shift elements; deque endpoint operations avoid those shifts. Complexity answers explain the algorithm and explicit cost model instead of claiming that execution timing proves a bound.

Use [Java/C++ syntax and I/O revision](FS_Java_CPP_Exam_Revision.md) for method signatures and complete non-LeetCode programs. See [Java-bank validation](FS_Java_Validation.md) for executable/exception/compile-only checks and their limits.
