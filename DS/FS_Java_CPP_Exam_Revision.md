# Java + C++ exam syntax and I/O revision

**MCQs: read Java. Coding round: write C++ if you prefer.** The new [hard Java bank](FS_Java_Hard_MCQ_Bank.md) uses Java17; C++ snippets here use C++17. This is a broad lookup sheet with a short first-pass checklist, rather than another set of algorithms to learn. Snippets use declared variables of the shown types; only sections explicitly labelled complete programs can be pasted standalone. Java fragments belong inside methods of a class. C++ fragments belong inside functions unless declared otherwise.

## First-pass recall: the ten things to rehearse

1. Write `public class Main` / `int main()` and a separate solve function.
2. Choose token input versus whole-line input from the problem grammar.
3. Read n numbers across arbitrary whitespace, not necessarily one line.
4. Convert text to numbers and characters without mixing their meanings.
5. Compare strings by content; widen before multiplication/addition.
6. Create and copy arrays/vectors; distinguish deep and shallow copies.
7. Use stack/queue endpoints consistently; inspect before remove when empty is possible.
8. Count with a map, test with a set, sort with an overflow-safe comparator.
9. Reset state per test case and print exactly the requested format.
10. Simulate EOF, zero-length arrays, spaces in strings and multiple test cases.

The actual judge determines class name, accepted language/version, input grammar and output format. The examples below assume full-program stdin/stdout, not a LeetCode-style supplied signature. Do not print input prompts such as “enter n” to a judge.

## 1. Program structure, static methods and custom classes

**Java — complete program for one n-element array; sum fits long:**

```java
import java.util.*;
public class Main {
    static long solve(long[] a) {
        long sum=0;
        for(long x:a) sum+=x;
        return sum;
    }
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        if(!sc.hasNextInt()) return;
        int n=sc.nextInt();
        long[] a=new long[n];
        for(int i=0;i<n;i++) a[i]=sc.nextLong();
        System.out.println(solve(a));
    }
}
```

`main` is static; calling a nonstatic method requires an object, e.g. `new Main().solve(a)`. A `public class Main` normally goes in `Main.java`. Use the name specified by the platform. Imports appear before the class; Java primitive generic arguments such as `List<int>` are invalid.

**C++ — same one-array input:**

```cpp
#include <iostream>
#include <vector>
using namespace std;
long long solve(const vector<long long>& a) {
    long long sum=0;
    for(long long x:a) sum+=x;
    return sum;
}
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if(!(cin>>n)) return 0;
    vector<long long> a(n);
    for(auto& x:a) cin>>x;
    cout<<solve(a)<<'\n';
}
```

Standard headers are portable; `bits/stdc++.h` is convenient only when the judge uses a compatible GCC library. Avoid mixing unsynchronized C stdio and C++ streams. See the paired runnable templates in [code/exam_io](code/exam_io/MainTokens.java).

For the fragments below, include the headers you use: `<string>`, `<vector>`, `<array>`, `<algorithm>`, `<numeric>`, `<sstream>`, `<limits>`, `<iomanip>`, `<stack>`, `<queue>`, `<deque>`, `<map>`, `<set>`, `<unordered_map>`, `<unordered_set>`, `<functional>`, `<utility>`, `<cctype>`, `<cmath>`, `<cstdlib>` and `<stdexcept>`. Java collections/arrays/comparators are in `java.util.*`; readers are in `java.io.*`; BigInteger needs `java.math.BigInteger`. The C++ fragments assume `using namespace std;` as in the complete program above.

**Objects used in scenarios, rather than platform-provided Node/Pair:**

```java
static class Item {
    int value,weight;
    Item(int value,int weight){this.value=value;this.weight=weight;}
}
static class Node {
    int val; Node left,right;
    Node(int val){this.val=val;}
}
// main fragment:
Item x=new Item(10,2); Node root=new Node(1);
```

```cpp
struct Item { int value,weight; };
struct Node {
    int val; Node* left=nullptr; Node* right=nullptr;
    explicit Node(int v):val(v){}
};
// main fragment:
Item x{10,2}; Node root(1);
```

C++ references/pointers and Java reference values are not identical. Java passes arguments by value: changing `a[0]` through an array reference is visible; assigning `a=new int[3]` to the parameter is local. C++ `vector<int>&` can mutate/reassign the caller’s vector; `const vector<int>&` avoids copying and mutation.

## 2. Input grammar: tokens, lines, test cases, EOF

| Task | Java | C++ |
|---|---|---|
| One whitespace-separated word | `sc.next()` | `cin >> s` |
| int / long / double | `nextInt()` / `nextLong()` / `nextDouble()` | `cin >> x` with appropriate type |
| Whole line including spaces | `sc.nextLine()` or `br.readLine()` | `getline(cin,s)` |
| Check token availability | `sc.hasNext()` / `hasNextInt()` | `if(cin >> x)` / `while(cin >> x)` |
| Read until line EOF | `while((line=br.readLine())!=null)` | `while(getline(cin,line))` |
| Matrix R,C then cells | nested loops using `nextInt()` | nested loops using `cin >> a[r][c]` |

Numbers can wrap across lines. Reading one line and assuming it contains all n elements is unsafe unless the statement explicitly promises that.

**Token followed by full line — choose the intended grammar:**

```java
int n=sc.nextInt();
sc.nextLine();            // discard remainder of n's line, if that line is a header
String text=sc.nextLine(); // the NEXT full line; may intentionally be empty
```

```cpp
int n; cin>>n;
cin.ignore(numeric_limits<streamsize>::max(),'\n'); // include <limits>
string text; getline(cin,text);
```

The discard is correct only when the wanted text begins on the next line. If text may be after n on the **same** line, first read the remainder instead of discarding it. `getline(cin >> ws,text)` removes leading whitespace and can skip blank lines; use it only when that loss is acceptable. `readLine()` returns null at EOF but `""` for an empty line. Do not silently skip empty lines that are part of the data. [Scanner token rules](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Scanner.html).

**Multiple cases, format `T`, then for each case `n`, then n values:**

```java
int t=sc.nextInt();
StringBuilder out=new StringBuilder();
while(t-->0){
    int n=sc.nextInt(); long[] a=new long[n];
    for(int i=0;i<n;i++) a[i]=sc.nextLong();
    out.append(solve(a)).append('\n');
}
System.out.print(out);
```

```cpp
int t; cin>>t;
while(t--){
    int n; cin>>n; vector<long long> a(n);
    for(auto& x:a) cin>>x;
    cout<<solve(a)<<'\n';
}
```

Do not invent a T header for a single-case task. For EOF cases instead use `while(sc.hasNextInt())` / `while(cin>>n)`. Reset global counters, output lists, memo tables, flags and maps **inside** each case when the cases are independent.

**Buffered token input:** [MainTokens.java](code/exam_io/MainTokens.java) is a complete `BufferedReader`+`StringTokenizer` template. It skips blank lines for token input, returns null at EOF, parses signed long with `Long.parseLong`, and buffers outputs. It intentionally does not support preserving whole lines. [tokens.cpp](code/exam_io/tokens.cpp) handles the same grammar. For exact full lines, use [MainLines.java](code/exam_io/MainLines.java) / [lines.cpp](code/exam_io/lines.cpp). Rename the Java public class/file to the judge’s required name when submitting.

## 3. Splitting strings into fields and numeric arrays

**Whitespace-separated numeric line, with empty-line policy:**

```java
String line=" 10  -2\t30 ";
String clean=line.trim();
String[] fields=clean.isEmpty()?new String[0]:clean.split("\\s+");
int[] a=new int[fields.length];
for(int i=0;i<a.length;i++) a[i]=Integer.parseInt(fields[i]);
```

```cpp
// #include <sstream>
string line=" 10  -2\t30 ";
istringstream in(line); vector<int> a; int x;
while(in>>x) a.push_back(x);
```

Java `split` takes a **regex**, not a literal separator. Use `"\\."` for a literal dot, `"\\|"` for pipe, or `Pattern.quote(delimiter)` with `java.util.regex.Pattern`. Default split drops trailing empty fields; `split(",",-1)` preserves them. This is simple delimiter parsing, not full quoted CSV parsing. [String split contract](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html#split(java.lang.String,int)).

```java
String[] x="a,b,,".split(",",-1); // four fields, including last two empty
String[] y="a.b.c".split("\\."); // three fields
String[] z="x|y".split(java.util.regex.Pattern.quote("|"));
```

```cpp
// Literal comma splitting, preserving empty fields, including trailing empties.
vector<string> splitLiteral(const string& s,char sep) {
    vector<string> out; size_t start=0;
    for(size_t i=0;i<=s.size();++i) {
        if(i==s.size() || s[i]==sep) {
            out.push_back(s.substr(start,i-start)); start=i+1;
        }
    }
    return out;
}
```

Input like `[1, 2, -3]` is **not** a plain integer token list. Under that exact no-nesting format, remove only its outer brackets, split comma, trim each field, then parse; `[]` has zero elements. Do not delete every nondigit, since that destroys negative signs. A true JSON/quoted grammar needs the specified parser, not an improvised comma split.

```java
String raw="[1, 2, -3]";
String inside=raw.substring(1,raw.length()-1).trim();
String[] fields=inside.isEmpty()?new String[0]:inside.split(",",-1);
int[] a=new int[fields.length];
for(int i=0;i<a.length;i++) a[i]=Integer.parseInt(fields[i].trim());
```

```cpp
string raw="[1, 2, -3]";
string inside=raw.substr(1,raw.size()-2);
for(char& c:inside) if(c==',') c=' ';
istringstream in(inside); vector<int> a; int x;
while(in>>x) a.push_back(x);
```

## 4. Conversion, casts and numeric traps

| Operation | Java | C++ |
|---|---|---|
| String → number | `Integer.parseInt(s.trim())`, `Long.parseLong(s.trim())`, `Double.parseDouble(s.trim())` | `stoi(s)`, `stoll(s)`, `stod(s)` |
| Number → string | `String.valueOf(x)`, `Integer.toString(x)` | `to_string(x)` |
| char digit → int | `c-'0'` after validating `'0'<=c && c<='9'` | same |
| int digit → char | `(char)('0'+d)` for0..9 | `char('0'+d)` |
| char → one-character string | `String.valueOf(c)` | `string(1,c)` |
| String → char array | `s.toCharArray()` | mutable `string` or `vector<char>(s.begin(),s.end())` |
| char array → string | `new String(chars)` | `string(chars.begin(),chars.end())` |
| Base2 text → int | `Integer.parseInt("101",2)` | `stoi("101",nullptr,2)` |
| Explicit floating quotient | `sum/(double)count` | `sum/static_cast<double>(count)` |
| Widen before product | `(long)a*b` | `1LL*a*b` |

`(long)(a*b)` / `(long long)(a*b)` widens **after** an int product. Java int overflow wraps; signed C++ overflow is undefined. `1/x` is integer division if x is int; `1.0/x` is floating. `char` and numeric text are different: `(int)'7'` is its character code, not7. Java `Integer` can be null; unboxing a missing map value throws NullPointerException.

**Comparing numeric types and nullable wrappers:**

```java
Integer a=1000,b=1000;
boolean sameValue=a.equals(b);       // true; == between wrappers compares references
Integer x=1; Long y=1L;
boolean sameWrapper=x.equals(y);    // false: different wrapper types
boolean sameNumber=x.longValue()==y.longValue(); // true, if neither is null
boolean nullSafe=Objects.equals(a,b); // null-safe, still uses type-specific equals
int order=Integer.compare(large,small); // avoids large-small overflow
```

Boxing caches can make some `Integer == Integer` comparisons true; use content comparison rather than guessing object identity. `Integer == int` unboxes, so a null wrapper throws. Primitive numeric comparisons apply numeric promotion; large long values may lose precision when converted to double. For doubles, a==b can be unsuitable after calculations; when the problem specifies a tolerance use `Math.abs(a-b)<=eps` / `abs(a-b)<=eps`, with a justified absolute/relative tolerance. This is not a replacement for exact integer equality. [Integer equality](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Integer.html#equals(java.lang.Object)), [null-safe Objects.equals](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Objects.html#equals(java.lang.Object,java.lang.Object)).

Java parseInt rejects trailing junk; C++ stoi may accept a numeric **prefix**, e.g. `stoi("12x")` returns12. To require the whole string, use the index argument and verify every remaining character is allowed whitespace. Conversion methods throw on invalid/range errors; avoid catching and substituting0 if0 is also a legitimate result.

```cpp
size_t pos=0;
int value=stoi(token,&pos);
if(pos!=token.size()) throw invalid_argument("trailing characters");
```

Absolute minimum integer needs widening before abs: Java `Math.abs((long)n)`, C++ `llabs(static_cast<long long>(n))` for int n. Negating the minimum **long/long long** still overflows its own type; use a domain check or an unsigned-magnitude representation. For arbitrary decimal values Java `BigInteger` supports `.add`, `.multiply`, `.compareTo`; C++17 has no built-in arbitrary-precision integer. Only use a supported judge library or decimal-string arithmetic if the problem requires it.

For nonnegative a, positive b, ceiling division can use `a/b + (a%b!=0 ? 1 : 0)` without an addition overflow. The familiar `(a+b-1)/b` is safe only after proving that widened sum fits. `%` with negative inputs is not always a nonnegative modular result; normalize using a wide type and positive modulus when needed. Java `^` / C++ `^` mean XOR, **not power**. Java `1L<<k` shifts a long; C++ `1LL<<k` needs a valid range and representable result. See the bit questions in the Java bank.

## 5. Strings: indexing, searching, editing and comparison

| Task | Java | C++ |
|---|---|---|
| Length | `s.length()` | `s.size()` / `s.length()` |
| Character at i | `s.charAt(i)` | `s[i]` or checked `s.at(i)` |
| Slice [l,r) | `s.substring(l,r)` | `s.substr(l,r-l)` (second argument is COUNT) |
| Content equality | `s.equals(t)`, `Objects.equals(s,t)` for nullable refs | `s==t` for std::string |
| Lexicographic comparison | `s.compareTo(t)<0` (not necessarily −1) | `s<t` |
| Prefix / suffix | `s.startsWith(p)`, `s.endsWith(p)` | C++17 `s.compare(0,p.size(),p)==0`; suffix guard then compare |
| Find occurrence | `s.indexOf(t)` / `lastIndexOf(t)`, absent−1 | `s.find(t)`, absent `string::npos` |
| Character presence | `s.indexOf(c)>=0` | `s.find(c)!=string::npos` |
| Literal replace | `s.replace("a","b")` | manual find/replace loop; `.replace(pos,count,text)` replaces range |
| Regex replace | `s.replaceAll(regex,replacement)` | `regex_replace` with `<regex>`, or simpler explicit scan |
| Lowercase | `s.toLowerCase(Locale.ROOT)` | ASCII char loop with safe unsigned-char cast before `tolower` |
| Trim | `s.trim()`; Java11+ `strip()` handles Unicode whitespace | explicit whitespace-end scan; no standard string.trim() |
| Reverse | `new StringBuilder(s).reverse().toString()` | `reverse(s.begin(),s.end())` from `<algorithm>` |

Java String is immutable. `s.concat(t)` or `s.replace(...)` does not change s unless its returned value is assigned. Java `==` tests string references; literals/interning can make some cases look equal, which does not justify using it for content. In C++, char-pointer `==` also compares pointer identities; `std::string` equality compares text.

**Mutable construction:**

```java
StringBuilder b=new StringBuilder("abc");
b.append(12).append('!');   // abc12!
b.setCharAt(0,'X');
b.insert(1,"_");
b.delete(1,2);             // end exclusive
b.deleteCharAt(b.length()-1);
b.reverse();
String answer=b.toString();
b.setLength(0);            // reuse by clearing
```

```cpp
string b="abc";
b+=to_string(12); b.push_back('!');
b[0]='X'; b.insert(1,"_");
b.erase(1,1);              // COUNT, not ending index
b.pop_back(); reverse(b.begin(),b.end());
string answer=b; b.clear();
```

Do not repeatedly concatenate immutable strings in a long loop when a builder is appropriate. `StringBuilder` is mutable; two references to the same builder share edits. C++ copying a std::string makes an independent value; a `string&` aliases it. Java StringBuffer is synchronized; it is not needed for ordinary single-thread judge coding.

ASCII letters/digits are sufficient only when the statement says so. Java char indexes UTF-16 code units; C++ std::string indexes bytes. Neither simple char loop counts every Unicode user-visible character. Java `Character.isDigit` includes non-ASCII digits; subtracting `'0'` is valid for ASCII decimal digits only.

```java
char c=s.charAt(i);
boolean digit=Character.isDigit(c),letter=Character.isLetter(c);
boolean asciiDigit=c>='0' && c<='9';
char lower=Character.toLowerCase(c);
boolean whitespace=Character.isWhitespace(c);
```

```cpp
unsigned char c=static_cast<unsigned char>(s[i]);
bool digit=isdigit(c)!=0,letter=isalpha(c)!=0;
bool asciiDigit=c>='0' && c<='9';
char lower=static_cast<char>(tolower(c));
bool whitespace=isspace(c)!=0;
```

The unsigned-char cast avoids invalid negative arguments to C++ character functions. C++ character classification is locale-dependent and does not reproduce Java Unicode classification; use the problem's stated character domain.

## 6. Arrays, matrices, copying and mutation

| Task | Java | C++ |
|---|---|---|
| Fixed count zeros | `int[] a=new int[n]` | `vector<int> a(n)` |
| Fixed count chosen value | `Arrays.fill(a,-1)` | `vector<int> a(n,-1)` / `fill(a.begin(),a.end(),-1)` |
| Length | `a.length` (field) | `a.size()` |
| 2D rectangle | `int[][] g=new int[R][C]` | `vector<vector<int>> g(R,vector<int>(C))` |
| Independent 1D copy | `a.clone()` / `Arrays.copyOf(a,a.length)` | `auto b=a` for vector |
| Subrange [l,r) copy | `Arrays.copyOfRange(a,l,r)` | `vector<int> b(a.begin()+l,a.begin()+r)` |
| Content comparison | `Arrays.equals(a,b)`; `Arrays.deepEquals(g,h)` | `a==b` for vector/nested vector |
| Swap elements | temporary variable | `swap(a[i],a[j])` |
| Reverse | manual two pointers | `reverse(a.begin(),a.end())` |
| Print for debugging | `Arrays.toString(a)` / `Arrays.deepToString(g)` | loop elements; do not assume vector has operator<< |

Java multidimensional arrays can be ragged: each `g[r].length` may differ. `g.length` is rows, not columns. Check g nonempty before g[0]. Java `g.clone()` shares the original row arrays; for independent rows:

```java
int[][] copy=new int[g.length][];
for(int r=0;r<g.length;r++) copy[r]=g[r].clone();
```

```cpp
auto copy=g; // nested vectors copy each nested vector's contents
```

Java array indexing throws on invalid index; C++ `vector[i]` is unchecked and out-of-range access is undefined behavior. Use `.at(i)` when you want checked C++ access. Default Java object-array elements are null; C++ object construction follows its declared type. Array-to-list pitfalls: `Arrays.asList(intArray)` is a one-element List<int[]>; box manually for List<Integer>. `Arrays.asList("a","b")` is fixed-size (set works, add/remove fails); `new ArrayList<>(...)` creates a growable copy.

## 7. ArrayList / Vector / C++ vector

Java normally uses `ArrayList<T>` for a dynamic array. Java `Vector<T>` is a different synchronized legacy dynamic-array class; it is not C++ vector. Its core get/add/size usage is similar but that does not make them the same type.

| Task | Java ArrayList<Integer> v | C++ vector<int> v |
|---|---|---|
| Construct | `new ArrayList<>()` | `vector<int> v` |
| Append | `v.add(x)` | `v.push_back(x)` |
| Read / write | `v.get(i)` / `v.set(i,x)` | `v[i]` |
| Count / empty | `v.size()` / `v.isEmpty()` | `v.size()` / `v.empty()` |
| Remove last | `v.remove(v.size()-1)` | `v.pop_back()` |
| Remove index i | `v.remove(i)` | `v.erase(v.begin()+i)` |
| Remove first value x | `v.remove(Integer.valueOf(x))` | find then erase iterator |
| Copy | `new ArrayList<>(v)` | `auto copy=v` |
| Capacity only | `new ArrayList<>(n)` still size0 | `v.reserve(n)` still size unchanged |
| Existing elements | append n values yourself | `v.resize(n)` changes size |
| Clear | `v.clear()` | `v.clear()` |

Append is amortized O(1); middle insertion/removal shifts elements, O(n). Java remove(1) picks index1, not value1. In C++, guard iterator!=end() before erase and check nonempty before pop_back/back/front. Erasing may invalidate iterators; append may reallocate vector storage. An enhanced Java for-loop variable or C++ `for(auto x:v)` is a **copy** of an element; use indexed set in Java / `auto& x` in C++ to mutate elements. For object references Java still permits mutation of the shared object's fields.

## 8. Stack, queue and deque endpoints

| Role | Java recommended syntax | C++ |
|---|---|---|
| Stack declaration | `Deque<Integer> st=new ArrayDeque<>()` | `stack<int> st` (`<stack>`) |
| Stack push / top / remove | `push(x)` / `peek()` / `pop()` | `push(x)` / `top()` / `pop()` |
| Queue declaration | `Queue<Integer> q=new ArrayDeque<>()` | `queue<int> q` (`<queue>`) |
| Queue add / front / remove | `offer(x)` / `peek()` / `poll()` | `push(x)` / `front()` / `pop()` |
| Deque declaration | `Deque<Integer> d=new ArrayDeque<>()` | `deque<int> d` (`<deque>`) |
| Add both ends | `addFirst(x)` / `addLast(x)` | `push_front(x)` / `push_back(x)` |
| Peek both ends | `peekFirst()` / `peekLast()` | `front()` / `back()` |
| Remove both ends | `pollFirst()` / `pollLast()` | `pop_front()` / `pop_back()` |

Java poll/peek return null if empty; remove/element/pop throw when empty. Unboxing that null into int also throws. ArrayDeque disallows null elements. C++ pop returns **void**; read front/top before popping. Don't dereference front/top on an empty container. Mixing Java push/pop with offer/poll in one deque can change FIFO order. Java Stack exists with push/pop/peek but ArrayDeque is generally the simpler single-thread stack. [Deque contract](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/ArrayDeque.html).

```java
Deque<int[]> q=new ArrayDeque<>();q.offer(new int[]{2,3});
int[] cell=q.poll();int r=cell[0],c=cell[1];
```

```cpp
queue<pair<int,int>> q;q.push({2,3});
auto [r,c]=q.front();q.pop(); // C++17 structured binding
```

## 9. Maps, counts, default values and sets

| Task | Java | C++ |
|---|---|---|
| Hash map declaration | `Map<String,Integer> m=new HashMap<>()` | `unordered_map<string,int> m` |
| Sorted-key map | `new TreeMap<>()` | `map<string,int> m` |
| Insert/update | `m.put(k,v)` | `m[k]=v` |
| Contains key | `m.containsKey(k)` | `m.find(k)!=m.end()` (C++17) |
| Read absent-safe | `m.getOrDefault(k,0)` | find and conditional default |
| Increment count | `m.put(k,m.getOrDefault(k,0)+1)` or `m.merge(k,1,Integer::sum)` | `++m[k]` |
| Remove | `m.remove(k)` | `m.erase(k)` |
| Iterate pairs | `for(var e:m.entrySet())` (Java10+) or explicit `Map.Entry<K,V>` | `for(const auto& [k,v]:m)` |
| Map of lists | `m.computeIfAbsent(k,x->new ArrayList<>()).add(v)` | `m[k].push_back(v)` |
| Hash set | `Set<Integer> s=new HashSet<>()` | `unordered_set<int> s` |
| Sorted set | `new TreeSet<>()` | `set<int> s` |
| Add / membership / remove | `s.add(x)` / `s.contains(x)` / `s.remove(x)` | `s.insert(x)` / `s.find(x)!=s.end()` / `s.erase(x)` |

Hash containers do not guarantee a sorted/insertion iteration order. Java LinkedHashMap/LinkedHashSet preserve insertion order; sorted map/set order keys. Expected hash lookup is O(1) under appropriate hashing, sorted-tree operations O(log n); don't give an unconditional constant-time worst-case guarantee. [HashMap contract](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/HashMap.html).

Java get can return null; primitive unboxing may fail. C++ `m[k]` **inserts** a default value when absent; use find/at if a read must not mutate the map. Java getOrDefault does not replace an existing explicit null with the default. Java arrays and custom objects lacking equals/hashCode compare by identity as keys; use content-based key representations. C++ map<pair<int,int>,...> has standard lexicographic pair ordering; hashing a pair for unordered_map requires an appropriate hasher.

```java
Map<Character,Integer> f=new HashMap<>();
for(char c:s.toCharArray()) f.merge(c,1,Integer::sum);
for(Map.Entry<Character,Integer> e:f.entrySet()){
    char c=e.getKey();int count=e.getValue();
}
```

```cpp
unordered_map<char,int> f;
for(char c:s) ++f[c];
for(const auto& [c,count]:f){ /* c and count */ }
```

## 10. Sorting, comparators, binary search and ranges

```java
Arrays.sort(a);                              // primitive int[] ascending
Arrays.sort(a,l,r);                          // range [l,r)
Collections.sort(list);                      // natural ascending
list.sort(Comparator.reverseOrder());        // wrapper/object list descending
Integer[] boxed={3,1,2};
Arrays.sort(boxed,Comparator.reverseOrder()); // comparator needs object array
Arrays.sort(items,(x,y)->Integer.compare(x.weight,y.weight));
Arrays.sort(pairs,(x,y)->x[0]!=y[0]?Integer.compare(x[0],y[0]):Integer.compare(x[1],y[1]));
```

```cpp
sort(a.begin(),a.end());
sort(a.begin()+l,a.begin()+r);                 // [l,r)
sort(a.begin(),a.end(),greater<int>());
sort(items.begin(),items.end(),[](const Item& x,const Item& y){return x.weight<y.weight;});
sort(pairs.begin(),pairs.end());              // lexicographic pair order
```

Java comparator returns negative/zero/positive; C++ comparator returns a strict-order boolean. C++ `<=` comparator is wrong because comp(x,x) would be true. Java subtraction comparator `x.weight-y.weight` may overflow: use Integer.compare/Long.compare. Comparator state must not change ordering during sort. Java object sort is stable; primitive-array sort does not track identities of equal records; C++ use stable_sort when original equal-key order matters. [Arrays sorting/search contracts](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Arrays.html).

```java
int p=Arrays.binarySearch(a,key); // requires ascending sorted a
if(p<0){int insertion=-p-1;}      // absent position, not always -1
```

```cpp
auto lo=lower_bound(a.begin(),a.end(),key); // first >=key
auto hi=upper_bound(a.begin(),a.end(),key); // first >key
int first=int(lo-a.begin());int count=int(hi-lo);
bool found=lo!=a.end() && *lo==key;
```

Java binarySearch does not guarantee first/last of duplicates. Implement boundary search if those are needed:

```java
static int lowerBound(int[] a,int key){
    int lo=0,hi=a.length;
    while(lo<hi){int mid=lo+(hi-lo)/2;if(a[mid]<key)lo=mid+1;else hi=mid;}
    return lo;
}
```

For upper bound change comparison to `a[mid]<=key`. Range APIs usually use exclusive end; check the exact signature rather than memorizing every range as inclusive. Java copyOfRange may pad when the requested end exceeds original length; do not treat it as a universal bounds validator.

## 11. Priority queues / heaps

```java
PriorityQueue<Integer> min=new PriorityQueue<>();
PriorityQueue<Integer> max=new PriorityQueue<>(Comparator.reverseOrder());
min.offer(4);min.offer(1);int smallest=min.poll();
PriorityQueue<int[]> states=new PriorityQueue<>(Comparator.comparingInt(x->x[1]));
states.offer(new int[]{vertex,distance});
```

```cpp
// <queue>, <functional>, <utility>, <vector>
priority_queue<int> max;
priority_queue<int,vector<int>,greater<int>> min;
min.push(4);min.push(1);int smallest=min.top();min.pop();
priority_queue<pair<long long,int>,vector<pair<long long,int>>,greater<pair<long long,int>>> states;
states.push({distance,vertex});
```

Java default heap is min; C++ default is max. Java poll returns removed item; C++ pop returns void. Java heap iteration is not sorted; repeatedly poll to extract in priority order. Changing a field used by a heap comparator **after insertion** does not automatically repair heap ordering; insert immutable records or remove/reinsert. Sorting/tie rules need to be explicit if traces depend on equal priorities. [PriorityQueue contract](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/PriorityQueue.html).

## 12. Lambdas, custom equality and input records

Java comparator lambdas may capture only final/effectively-final local variables; arrays/objects referenced by them can still be mutated, which may invalidate ordering. C++ `[&]` captures by reference, `[=]` by value, explicit captures are often easier to reason about. Shared comparator state should remain consistent.

```java
static class Pair {
    final int a,b;
    Pair(int a,int b){this.a=a;this.b=b;}
    @Override public boolean equals(Object o){
        if(this==o)return true;
        if(!(o instanceof Pair))return false;
        Pair p=(Pair)o;return a==p.a&&b==p.b;
    }
    @Override public int hashCode(){return Objects.hash(a,b);}
}
```

```cpp
pair<int,int> p{2,3},q{2,3};
bool same=(p==q); // built-in pair content comparison
```

Keep key fields immutable once inserted into a hash map/set. Changing the fields involved in hashing/equality can make the key unfindable. equals and hashCode must agree on equal keys. For short exam snippets, strings or standard immutable keys can be simpler than custom classes.

## 13. Iteration, remove-while-looping and copies

```java
Iterator<Integer> it=list.iterator();
while(it.hasNext()) if(it.next()<0) it.remove(); // supported mutable list
list.removeIf(x->x<0);                         // concise equivalent
```

```cpp
for(auto it=v.begin();it!=v.end();){
    if(*it<0) it=v.erase(it); else ++it;
}
v.erase(remove_if(v.begin(),v.end(),[](int x){return x<0;}),v.end());
```

Modifying an ArrayList structurally through the list while iterating with its enhanced for-loop can trigger ConcurrentModificationException; use iterator.remove or a supported bulk operation. Do not rely on an exception occurring at a particular iteration as a correctness strategy. `remove_if` in C++ rearranges and returns a logical end; it does not shrink the container until erase. Copying a Java List<Node> copies references to Nodes; copying C++ vector<Node*> also copies pointers. Neither deeply clones pointed-to objects.

## 14. Output formatting and debugging

```java
System.out.println(answer);
StringJoiner j=new StringJoiner(" ");
for(int x:a)j.add(Integer.toString(x));
System.out.println(j);
System.out.printf(Locale.ROOT,"%.6f%n",value);
```

```cpp
for(size_t i=0;i<a.size();++i){if(i)cout<<' ';cout<<a[i];}
cout<<'\n';
// <iomanip>
cout<<fixed<<setprecision(6)<<value<<'\n';
```

`Arrays.toString` prints brackets/commas; that is correct only if requested. Standard judge output usually wants spaces/newlines, exact case (`YES` versus `true`), and no explanatory labels. Java println(boolean) prints true/false; C++ ordinary bool prints1/0, `boolalpha` prints true/false. Buffer many lines with StringBuilder; C++ `'\n'` avoids the forced flush of endl. A trailing newline is normal; follow the statement’s required delimiters. Debug to System.err/cerr locally and remove debug output for submission if the judge handles streams unusually.

## 15. Useful algorithm utility signatures

| Goal | Java | C++ |
|---|---|---|
| min/max | `Math.min(a,b)` / `Math.max(a,b)` | `min(a,b)` / `max(a,b)` (same compatible types) |
| sum | loop with long accumulator; IntStream.sum can overflow int | `accumulate(v.begin(),v.end(),0LL)` (`<numeric>`) |
| max element | `Arrays.stream(a).max().orElse(...)` or loop | `max_element(v.begin(),v.end())`, guard nonempty before dereference |
| gcd | custom Euclid method | `gcd(a,b)` (`<numeric>`, representability assumptions) |
| fill/reset | `Arrays.fill(a,0)`, `map.clear()` | `fill`, `clear` |
| frequency ASCII | `int[] f=new int[26];f[c-'a']++` after domain check | `array<int,26> f{}; ++f[c-'a']` (`<array>`) |
| modular exponent | integer multiply/reduce with safe range or dedicated wide arithmetic | same; floating pow is not a substitute |
| Set intersection | `new HashSet<>(s); copy.retainAll(t)` | explicit lookup or set_intersection on sorted ranges |
| Join strings | `String.join(",",words)` | append loop with separators |
| Repeated characters | `"a".repeat(n)` (Java11+, n>=0) | `string(n,'a')` |

Empty max/min/mean needs an explicit contract; do not dereference an empty range or divide by zero. Floating `Math.pow` / C++ pow returns floating results and can round large integer values; implement exact integer power/modular power when required. Arrays.fill on int[][] with one int[] value would alias row references; fill each row with the primitive value instead.

## 16. Quick method-cost revision

| Operation | Cost under ordinary implementations |
|---|---|
| Array/vector indexed read | O(1); bounds checking policy differs |
| Dynamic-array append | amortized O(1); a reallocation can cost O(n) |
| Dynamic-array front/middle erase | O(n) shifts |
| Deque/stack endpoint operations | amortized O(1) for Java ArrayDeque; constant-time standard adaptor endpoints under their normal underlying container |
| Hash map/set operation | expected O(1) under suitable hashing, not unconditional worst-case |
| Ordered map/set | O(log n) |
| Heap offer/poll | O(log n); peek O(1) |
| String content equality/prefix | up to O(length compared) |
| Construct copied substring/list/array | proportional to copied elements/characters |
| Recursive function | count both total work and maximum active depth; calls are not all simultaneously live |

Use the snippet’s actual operations: a BFS with ArrayList.remove(0) differs from one with ArrayDeque.poll(); a reversal that recursively copies substrings differs from char-array swaps. The Java-only bank tests these differences.

## 17. Local compilation and sample cases

Run examples from the repository root; compilation outputs below go to /tmp, keeping the source tree clean:

```bash
mkdir -p /tmp/fs-io-java
javac -d /tmp/fs-io-java DS/code/exam_io/MainTokens.java
java -cp /tmp/fs-io-java MainTokens < input.txt
g++ -std=c++17 -O2 -Wall -Wextra -pedantic DS/code/exam_io/tokens.cpp -o /tmp/fs-io-cpp
/tmp/fs-io-cpp < input.txt
```

Token demo input:

```text
3
4
1 2
3 4
0
3
-5 0 7
```

Expected output:

```text
10
0
2
```

The line demo takes n then exactly n whole lines and prints `length|original line`. It preserves empty lines/leading spaces; it is a parsing demonstration, not a problem’s assumed required output. Paired Java/C++ length tests use ASCII: Java counts UTF-16 units, C++ UTF-8 strings count bytes. Run [check_exam_io.py](validation/check_exam_io.py) for compilation and paired parsing/method checks.

## 18. From lecture Java to your C++ coding answer

Use [Day 1 C++ references](code/day01_reference.cpp) for factorial/head/tail/indirect/tree/Fibonacci/stairs; [Day 2](code/day02_reference.cpp) for iterative/state Fibonacci, string reversal and jumping recurrences; [Day 3](code/day03_reference.cpp) for Euclid/strobogrammatic generation; [coding-gap references](code/fs_gap_reference.hpp) for sorting, majority, power, knapsack and related drills. These already cover the core algorithms in C++.

Keep Java versions when studying MCQs: wrapper unboxing, String immutability, left-to-right side effects, exceptions, and ArrayList overloads do not become equivalent C++ questions by changing syntax. The earlier notes now link C++ counterparts beside Java algorithm examples; raw transcript evidence and existing banks are preserved. Graph/tree programs in the new bank are for analysis, not additional full coding-round assignments.
