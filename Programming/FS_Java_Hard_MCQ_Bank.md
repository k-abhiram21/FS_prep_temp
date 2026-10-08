# Java programming: 70 hard MCQs

**For the 9 October 2026 FS screening test.** Original practice, prepared 8 October. One best answer per question. These are study selections, not predicted exam questions. Read the hidden explanations to learn the rule and the closest traps.

[All compact banks and coverage audit](../FS_Remaining_Subjects_Learning_Map.md)

## How to use

Work in blocks of 10–15. First choose an answer without opening the explanation; then explain why the other choices fail. For code, record each state change before guessing. The four mixed sets below use every question once: three sets of 20 and one of 10. Set sizes are for revision, not exam subject weights.

**Assumptions:** Java 17; each block is a separate complete `Main` program. `/` in choices separates output lines. Compilation failure means no execution. For uncaught exceptions choose the exception, not a made-up normal output. Hash collections have no promised iteration order; no question relies on a particular hash order or optional wrapper cache.

## Coverage

| Topic | Questions |
|---|---|
| Types, arithmetic, evaluation and control | [JV001](#jv001)–[JV014](#jv014) (14) |
| Strings, arrays and object sharing | [JV015](#jv015)–[JV026](#jv026) (12) |
| Collections, generics and API contracts | [JV027](#jv027)–[JV042](#jv042) (16) |
| Methods, OOP, dispatch and initialization | [JV043](#jv043)–[JV060](#jv060) (18) |
| Exceptions, input, sorting and iterator contracts | [JV061](#jv061)–[JV070](#jv070) (10) |

## Mixed revision sets

**Set 1:** [JV024](#jv024), [JV001](#jv001), [JV040](#jv040), [JV069](#jv069), [JV057](#jv057), [JV047](#jv047), [JV032](#jv032), [JV055](#jv055), [JV064](#jv064), [JV005](#jv005), [JV065](#jv065), [JV042](#jv042), [JV033](#jv033), [JV038](#jv038), [JV053](#jv053), [JV030](#jv030), [JV043](#jv043), [JV056](#jv056), [JV020](#jv020), [JV054](#jv054).

**Set 2:** [JV060](#jv060), [JV016](#jv016), [JV044](#jv044), [JV006](#jv006), [JV050](#jv050), [JV003](#jv003), [JV041](#jv041), [JV051](#jv051), [JV027](#jv027), [JV028](#jv028), [JV017](#jv017), [JV062](#jv062), [JV058](#jv058), [JV052](#jv052), [JV010](#jv010), [JV014](#jv014), [JV025](#jv025), [JV031](#jv031), [JV011](#jv011), [JV034](#jv034).

**Set 3:** [JV068](#jv068), [JV045](#jv045), [JV035](#jv035), [JV048](#jv048), [JV049](#jv049), [JV063](#jv063), [JV070](#jv070), [JV009](#jv009), [JV022](#jv022), [JV023](#jv023), [JV015](#jv015), [JV019](#jv019), [JV004](#jv004), [JV002](#jv002), [JV059](#jv059), [JV037](#jv037), [JV018](#jv018), [JV036](#jv036), [JV061](#jv061), [JV029](#jv029).

**Set 4:** [JV046](#jv046), [JV039](#jv039), [JV012](#jv012), [JV021](#jv021), [JV013](#jv013), [JV026](#jv026), [JV067](#jv067), [JV008](#jv008), [JV066](#jv066), [JV007](#jv007).


## Types, arithmetic, evaluation and control

<a id="jv001"></a>
### JV001 — Widening after overflow

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
int n=50000; long a=n*n, b=1L*n*n; System.out.println(a+" "+b);
}
}
```

A. -1794967296 -1794967296

B. ArithmeticException

C. -1794967296 2500000000

D. 2500000000 2500000000

<details>
<summary>Answer and reasoning</summary>

**Correct: C — -1794967296 2500000000**

The first product is int arithmetic and wraps before assignment. The second is long arithmetic because its first operand is long.

**Why the other choices fail:** The target type cannot undo overflow; integer multiplication does not throw on overflow.

**Rule/source:** [JLS expressions].

</details>

<a id="jv002"></a>
### JV002 — Floor versus truncation

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
System.out.println(-7/2+" "+-7%2);
}
}
```

A. -4 -1

B. -4 1

C. -3 -1

D. -3 1

<details>
<summary>Answer and reasoning</summary>

**Correct: C — -3 -1**

Java integer division truncates toward zero. The remainder has the dividend’s sign and satisfies a=(a/b)*b+a%b.

**Why the other choices fail:** Python floor-division rules do not apply to Java; quotient and remainder must obey the identity.

**Rule/source:** [JLS expressions].

</details>

<a id="jv003"></a>
### JV003 — Cast before or after

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
System.out.println((double)(7/2)+" "+7/(double)2);
}
}
```

A. 3.5 3.5

B. 3.0 3.0

C. Compilation fails

D. 3.0 3.5

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 3.0 3.5**

The first division is integral before casting. The second has a floating operand before division.

**Why the other choices fail:** A later cast cannot recover a discarded fraction; mixed numeric division is legal.

**Rule/source:** [JLS expressions].

</details>

<a id="jv004"></a>
### JV004 — Compound narrowing

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
byte b=127; b+=1; System.out.println(b);
}
}
```

A. 128

B. -128

C. ArithmeticException

D. Compilation fails

<details>
<summary>Answer and reasoning</summary>

**Correct: B — -128**

Compound assignment includes conversion back to byte; 128 becomes -128 in its eight-bit signed representation.

**Why the other choices fail:** Plain b=b+1 would need a cast, but compound assignment is different. Overflow does not throw.

**Rule/source:** [JLS expressions].

</details>

<a id="jv005"></a>
### JV005 — Plain narrow assignment

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
byte b=1; b=b+1; System.out.println(b);
}
}
```

A. 1

B. Compilation fails

C. 2

D. Runtime ClassCastException

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Compilation fails**

Binary numeric promotion makes b+1 an int; assigning that nonconstant expression to byte needs an explicit narrowing conversion.

**Why the other choices fail:** A small runtime value does not remove the compile-time type rule.

**Rule/source:** [JLS expressions].

</details>

<a id="jv006"></a>
### JV006 — Evaluation is left to right

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
int i=1; int x=i++ + ++i * i++; System.out.println(i+" "+x);
}
}
```

A. 4 13

B. 4 10

C. Undefined behavior

D. 3 10

<details>
<summary>Answer and reasoning</summary>

**Correct: B — 4 10**

The addition’s left operand yields 1, then multiplication gets 3 and 3, then i becomes 4. Thus 1+9=10.

**Why the other choices fail:** Precedence groups operations; it does not reverse operand evaluation. This Java expression has defined behavior.

**Rule/source:** [JLS expressions].

</details>

<a id="jv007"></a>
### JV007 — Short circuit versus eager

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
int i=0; boolean a=false && ++i>0; boolean b=false & ++i>0; System.out.println(i+" "+a+" "+b);
}
}
```

A. 1 false false

B. 2 false false

C. 1 false true

D. 0 false false

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 1 false false**

&& skips the increment; boolean & evaluates it even though the final result remains false.

**Why the other choices fail:** Do not trace only the final boolean: side effects differ despite equal results.

**Rule/source:** [JLS expressions].

</details>

<a id="jv008"></a>
### JV008 — Masked shift distance

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
System.out.println((1<<32)+" "+(1L<<32)+" "+(-1>>>31));
}
}
```

A. 1 4294967296 1

B. 1 1 -1

C. 4294967296 4294967296 1

D. 0 4294967296 -1

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 1 4294967296 1**

Int shifts use the low 5 bits of the distance; long shifts use the low 6. Unsigned right shift introduces zeros.

**Why the other choices fail:** 32 is effectively 0 for int, but not long. >>> and >> differ for negative values.

**Rule/source:** [JLS expressions].

</details>

<a id="jv009"></a>
### JV009 — Minimum integer negation

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
int x=Integer.MIN_VALUE; System.out.println(Math.abs(x)+" "+(-(long)x));
}
}
```

A. -2147483648 -2147483648

B. ArithmeticException

C. -2147483648 2147483648

D. 2147483648 2147483648

<details>
<summary>Answer and reasoning</summary>

**Correct: C — -2147483648 2147483648**

Positive 2147483648 cannot fit int, so abs(int MIN_VALUE) remains negative. Widening before negation makes it representable.

**Why the other choices fail:** Casting an already-overflowed int result would be too late.

**Rule/source:** [JLS expressions].

</details>

<a id="jv010"></a>
### JV010 — Floating special values

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
double z=0.0; double n=z/z; System.out.println((n==n)+" "+Double.isNaN(n)+" "+(1.0/z));
}
}
```

A. false true Infinity

B. Compilation fails

C. true false ArithmeticException

D. false true 0.0

<details>
<summary>Answer and reasoning</summary>

**Correct: A — false true Infinity**

0.0/0.0 is NaN, which is unequal even to itself. Floating division by positive zero produces positive infinity here.

**Why the other choices fail:** Integer divide-by-zero behavior does not transfer to floating point. Use isNaN rather than equality.

**Rule/source:** [JLS expressions].

</details>

<a id="jv011"></a>
### JV011 — Field versus local default

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
int x; System.out.println(x);
}
}
```

A. null

B. 0

C. UninitializedVariableException

D. Compilation fails

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Compilation fails**

A local variable must be definitely assigned before reading. Fields and array elements receive defaults, but this local does not.

**Why the other choices fail:** Default initialization is not universal; no runtime uninitialized-variable exception replaces this compile check.

**Rule/source:** [JLS expressions].

</details>

<a id="jv012"></a>
### JV012 — Continue runs the for update

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
int s=0; for(int i=0;i<4;i++){if(i==2)continue;s+=i;} System.out.println(s);
}
}
```

A. 1

B. 6

C. Loop never ends

D. 4

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 4**

Values 0,1,3 contribute. continue transfers to the basic-for update, then its next condition.

**Why the other choices fail:** Skipping the body does not skip the update. Excluding all later iterations would be break behavior.

**Rule/source:** [JLS expressions].

</details>

<a id="jv013"></a>
### JV013 — Switch fallthrough

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
int x=2,s=0; switch(x){case 1:s+=1;case 2:s+=2;case 3:s+=3;default:s+=4;} System.out.println(s);
}
}
```

A. 5

B. 10

C. 9

D. 2

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 9**

The colon-form switch starts at case 2 and falls through case 3 and default because there is no break.

**Why the other choices fail:** The unmatched earlier case 1 is skipped. Arrow-form switch rules would be a different program.

**Rule/source:** [JLS expressions].

</details>

<a id="jv014"></a>
### JV014 — Assignment can be an expression

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
boolean ok=false; if(ok=true)System.out.print("Y"); System.out.println(" "+ok);
}
}
```

A. false

B. Y true

C. Y false

D. Compilation fails

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Y true**

The assignment stores true and yields true, so the if executes. Java permits assignment expressions of boolean type in conditions.

**Why the other choices fail:** Confusing = with == can cause a logic bug without a compile error; integer conditions are a separate rule.

**Rule/source:** [JLS expressions].

</details>

## Strings, arrays and object sharing

<a id="jv015"></a>
### JV015 — Content versus reference

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
String a=new String("fs"),b=new String("fs"); System.out.println((a==b)+" "+a.equals(b));
}
}
```

A. false true

B. true true

C. true false

D. false false

<details>
<summary>Answer and reasoning</summary>

**Correct: A — false true**

Two explicit new expressions create distinct String objects with equal content. == checks reference identity; equals checks content.

**Why the other choices fail:** Do not assume literal interning merges explicitly constructed objects.

**Rule/source:** [Java String].

</details>

<a id="jv016"></a>
### JV016 — Compile-time concatenation

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
String a="ab"; final String x="a"; String y="a"; System.out.println((a==x+"b")+" "+(a==y+"b"));
}
}
```

A. false true

B. false false

C. true false

D. true true

<details>
<summary>Answer and reasoning</summary>

**Correct: C — true false**

x is a constant variable, so x+"b" is a constant expression and interned. Concatenation using nonfinal y is evaluated at runtime.

**Why the other choices fail:** Equal characters do not make every concatenation a constant expression; runtime concatenation does not promise identity with the literal.

**Rule/source:** [Java String].

</details>

<a id="jv017"></a>
### JV017 — Ignored return and replace variants

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
String s="a.b"; s.replace(".","-"); System.out.println(s+" "+s.replaceAll(".","-"));
}
}
```

A. a.b a-b

B. a-b ---

C. a.b ---

D. a-b a-b

<details>
<summary>Answer and reasoning</summary>

**Correct: C — a.b ---**

Strings are immutable and the first returned replacement is ignored. In replaceAll, dot is a regex matching each character here.

**Why the other choices fail:** Literal replace and regex replaceAll have different contracts; neither changes s in place.

**Rule/source:** [Java String].

</details>

<a id="jv018"></a>
### JV018 — UTF-16 length

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
String s="A\ud83d\ude00"; System.out.println(s.length()+" "+s.codePointCount(0,s.length()));
}
}
```

A. 1 2

B. 2 2

C. 3 2

D. 3 3

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 3 2**

A occupies one UTF-16 unit; the supplementary emoji uses a surrogate pair. There are 3 units but 2 Unicode code points.

**Why the other choices fail:** String.length is not a glyph or Unicode-code-point count.

**Rule/source:** [Java String].

</details>

<a id="jv019"></a>
### JV019 — Substring endpoint

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
String s="abcd"; System.out.println("["+s.substring(2,2)+"] "+s.substring(1,3));
}
}
```

A. [] cd

B. [c] bcd

C. StringIndexOutOfBoundsException

D. [] bc

<details>
<summary>Answer and reasoning</summary>

**Correct: D — [] bc**

The start is inclusive and end exclusive. Equal valid endpoints yield the empty string; indices 1 and 2 give bc.

**Why the other choices fail:** An empty valid range is not an error, and the end character is excluded.

**Rule/source:** [Java String].

</details>

<a id="jv020"></a>
### JV020 — Split trailing empty fields

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
String s="a,,"; System.out.println(s.split(",").length+" "+s.split(",",-1).length);
}
}
```

A. 1 1

B. 3 3

C. 2 3

D. 1 3

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 1 3**

The default zero limit discards trailing empty strings. A negative limit preserves all trailing empty fields.

**Why the other choices fail:** Interior and trailing empty fields are not interchangeable; here both empties are trailing.

**Rule/source:** [Java String].

</details>

<a id="jv021"></a>
### JV021 — Builder has identity equality

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
StringBuilder a=new StringBuilder("x"), b=new StringBuilder("x"); System.out.println(a.equals(b)+" "+a.toString().equals(b.toString()));
}
}
```

A. false true

B. true false

C. false false

D. true true

<details>
<summary>Answer and reasoning</summary>

**Correct: A — false true**

StringBuilder does not override equals for character-content equality. Converting to strings enables String’s content comparison.

**Why the other choices fail:** Mutability does not itself define equality. Similar text across builders does not imply equals returns true.

**Rule/source:** [Java String].

</details>

<a id="jv022"></a>
### JV022 — Clone a nested array

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
int[][] a={{1},{2}}; int[][] b=a.clone(); b[0][0]=9; b[1]=new int[]{8}; System.out.println(a[0][0]+" "+a[1][0]);
}
}
```

A. 9 2

B. 1 2

C. 9 8

D. 1 8

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 9 2**

Only the outer array is cloned. The first inner array remains shared; replacing b[1] changes only b’s second reference.

**Why the other choices fail:** Distinguish mutation of a shared inner array from replacement of a slot in the independent outer array.

**Rule/source:** [Java String].

</details>

<a id="jv023"></a>
### JV023 — Covariant arrays check stores

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
Object[] a=new String[2]; a[0]=Integer.valueOf(1); System.out.println(a[0]);
}
}
```

A. 1

B. Compilation fails

C. ClassCastException

D. ArrayStoreException

<details>
<summary>Answer and reasoning</summary>

**Correct: D — ArrayStoreException**

String[] can be referenced as Object[], but the actual array still only accepts String-compatible elements. The incompatible store fails at runtime.

**Why the other choices fail:** Static assignability does not remove runtime array component checks; this is a store error, not a cast.

**Rule/source:** [Java String].

</details>

<a id="jv024"></a>
### JV024 — Array equality

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
int[] a={1,2}, b={1,2}; System.out.println(a.equals(b)+" "+Arrays.equals(a,b));
}
}
```

A. false false

B. false true

C. true true

D. true false

<details>
<summary>Answer and reasoning</summary>

**Correct: B — false true**

Arrays inherit reference-based Object.equals. Arrays.equals for primitive arrays compares matching elements.

**Why the other choices fail:** Separate arrays can have identical contents without sharing identity.

**Rule/source:** [Java String].

</details>

<a id="jv025"></a>
### JV025 — Final reference remains mutable

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
final int[] a={1}; a[0]=7; System.out.println(a[0]);
}
}
```

A. Compilation fails

B. 1

C. 7

D. UnsupportedOperationException

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 7**

final prevents assigning a different array reference to a; it does not freeze that array’s elements.

**Why the other choices fail:** Reference rebinding, object mutation and immutable data are distinct concepts.

**Rule/source:** [Java String].

</details>

<a id="jv026"></a>
### JV026 — Argument reference copied

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {
static void f(int[] x){x[0]=7;x=new int[]{9};}
public static void main(String[] args) throws Exception {
int[] a={1}; f(a); System.out.println(a[0]);
}
}
```

A. 7

B. 1

C. Compilation fails

D. 9

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 7**

The copied parameter reference initially shares the caller’s array, so setting element 0 affects it. Rebinding the parameter does not rebind the caller’s a.

**Why the other choices fail:** Java passes reference values by value, not the caller’s variable itself.

**Rule/source:** [Java String].

</details>

## Collections, generics and API contracts

<a id="jv027"></a>
### JV027 — Remove overload

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
List<Integer> x=new ArrayList<>(List.of(10,20,30)); x.remove(1); x.remove(Integer.valueOf(10)); System.out.println(x);
}
}
```

A. [10, 30]

B. [30]

C. [20, 30]

D. IndexOutOfBoundsException

<details>
<summary>Answer and reasoning</summary>

**Correct: B — [30]**

The int argument removes index 1 (20). The Integer argument removes the value 10.

**Why the other choices fail:** Overload selection uses argument types, not the numeral’s intended meaning.

**Rule/source:** [Java collections].

</details>

<a id="jv028"></a>
### JV028 — A primitive array is one list element

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
int[] a={1,2,3}; List<int[]> x=Arrays.asList(a); System.out.println(x.size()+" "+x.get(0).length);
}
}
```

A. 3 1

B. 1 3

C. 3 3

D. Compilation fails

<details>
<summary>Answer and reasoning</summary>

**Correct: B — 1 3**

The varargs element type is int[], since primitive ints cannot be generic elements. The array becomes one element.

**Why the other choices fail:** Arrays.asList(int[]) does not box every int into a separate Integer.

**Rule/source:** [Java collections].

</details>

<a id="jv029"></a>
### JV029 — Backed fixed-size list

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
String[] a={"a","b"}; List<String> x=Arrays.asList(a); x.set(0,"z"); System.out.println(a[0]);
}
}
```

A. Compilation fails

B. a

C. z

D. UnsupportedOperationException

<details>
<summary>Answer and reasoning</summary>

**Correct: C — z**

Arrays.asList provides a fixed-size view backed by the supplied object array. set replaces an existing slot and updates the array.

**Why the other choices fail:** Fixed-size means add/remove are unsupported; it does not mean element replacement is unsupported.

**Rule/source:** [Java collections].

</details>

<a id="jv030"></a>
### JV030 — Fixed-size does not support add

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
List<String> x=Arrays.asList("a","b"); x.add("c"); System.out.println(x);
}
}
```

A. Compilation fails

B. [a, b, c]

C. UnsupportedOperationException

D. [a, b]

<details>
<summary>Answer and reasoning</summary>

**Correct: C — UnsupportedOperationException**

This list’s size cannot change. add is in the List interface but unsupported by this implementation.

**Why the other choices fail:** Compile-time interface availability is not a runtime guarantee that every optional operation succeeds.

**Rule/source:** [Java collections].

</details>

<a id="jv031"></a>
### JV031 — Unmodifiable factory

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
List<Integer> x=List.of(1,2); x.set(0,7); System.out.println(x);
}
}
```

A. [1, 2]

B. UnsupportedOperationException

C. [7, 2]

D. Compilation fails

<details>
<summary>Answer and reasoning</summary>

**Correct: B — UnsupportedOperationException**

List.of returns an unmodifiable list. Even replacing an existing element is unsupported.

**Why the other choices fail:** Arrays.asList and List.of have different mutability contracts despite both being fixed in size.

**Rule/source:** [Java collections].

</details>

<a id="jv032"></a>
### JV032 — Missing versus mapped null

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
Map<String,Integer> m=new HashMap<>(); m.put("x",null); System.out.println(m.getOrDefault("x",9)+" "+m.getOrDefault("y",9)+" "+m.containsKey("x"));
}
}
```

A. NullPointerException

B. null null false

C. null 9 true

D. 9 9 true

<details>
<summary>Answer and reasoning</summary>

**Correct: C — null 9 true**

getOrDefault uses the default for an absent key, not a present null mapping. containsKey distinguishes present-null from absence.

**Why the other choices fail:** Retrieving null as an object need not unbox it. Do not infer absence merely from get returning null.

**Rule/source:** [Java collections].

</details>

<a id="jv033"></a>
### JV033 — Unboxing can fail

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
Map<String,Integer> m=new HashMap<>(); int x=m.get("none"); System.out.println(x);
}
}
```

A. NoSuchElementException

B. 0

C. Compilation fails

D. NullPointerException

<details>
<summary>Answer and reasoning</summary>

**Correct: D — NullPointerException**

get returns null for this missing key. Assigning to int attempts to unbox that null Integer.

**Why the other choices fail:** Map retrieval and primitive conversion are separate operations; there is no automatic zero default.

**Rule/source:** [Java collections].

</details>

<a id="jv034"></a>
### JV034 — Compute only when needed

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
Map<String,Integer> m=new HashMap<>(); m.put("x",null); m.computeIfAbsent("x",k->4); m.computeIfAbsent("x",k->9); System.out.println(m.get("x"));
}
}
```

A. Compilation fails

B. 9

C. 4

D. null

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 4**

computeIfAbsent computes for an absent key or a null mapping. Once 4 is stored, the second mapping function is not used.

**Why the other choices fail:** This differs from getOrDefault, which returns present null, and from unconditional put.

**Rule/source:** [Java collections].

</details>

<a id="jv035"></a>
### JV035 — Map replacement

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
Map<String,Integer> m=new HashMap<>(); System.out.println(m.put("a",1)+" "+m.put("a",2)+" "+m.size());
}
}
```

A. null 1 1

B. null 1 2

C. 1 2 2

D. null 2 1

<details>
<summary>Answer and reasoning</summary>

**Correct: A — null 1 1**

put returns the previous value and replaces the value under the same key. The first key had no prior mapping.

**Why the other choices fail:** A map does not retain two independent entries for equal keys; return value is not the newly stored value.

**Rule/source:** [Java collections].

</details>

<a id="jv036"></a>
### JV036 — Sorted-set comparator equality

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
Set<String> s=new TreeSet<>(Comparator.comparingInt(String::length)); s.add("ab"); s.add("cd"); s.add("x"); System.out.println(s.size()+" "+s.contains("zz"));
}
}
```

A. 2 false

B. 2 true

C. 3 false

D. 3 true

<details>
<summary>Answer and reasoning</summary>

**Correct: B — 2 true**

TreeSet uses comparator result 0 to treat elements as equivalent. All two-character strings collide under this comparator.

**Why the other choices fail:** String.equals is not the uniqueness rule of this TreeSet. Comparators inconsistent with equals can surprise set operations.

**Rule/source:** [Java collections].

</details>

<a id="jv037"></a>
### JV037 — Queue ends matter

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
Deque<Integer> d=new ArrayDeque<>(); d.offer(1);d.offer(2);d.push(3); System.out.println(d.poll()+" "+d.poll()+" "+d.poll());
}
}
```

A. 3 2 1

B. 1 2 3

C. 3 1 2

D. 1 3 2

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 3 1 2**

offer appends at the tail; push adds at the head; poll removes the head.

**Why the other choices fail:** Deque supports both queue and stack operations. Method names must be traced rather than assuming every insertion uses one end.

**Rule/source:** [Java collections].

</details>

<a id="jv038"></a>
### JV038 — Empty queue API

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
Queue<Integer> q=new ArrayDeque<>(); System.out.println(q.poll());
}
}
```

A. Compilation fails

B. NoSuchElementException

C. 0

D. null

<details>
<summary>Answer and reasoning</summary>

**Correct: D — null**

poll returns null when empty. remove and element use exception-reporting contracts; peek also returns null.

**Why the other choices fail:** An empty queue’s result depends on the chosen method, not only the data structure.

**Rule/source:** [Java collections].

</details>

<a id="jv039"></a>
### JV039 — Priority order is removal order

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
PriorityQueue<Integer> x=new PriorityQueue<>(); x.add(3);x.add(1);x.add(2); System.out.println(x.poll()+" "+x.poll()+" "+x.poll());
}
}
```

A. 3 1 2

B. Iteration order is unspecified, so these removals are unspecified.

C. 3 2 1

D. 1 2 3

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 1 2 3**

Natural-order priority queues remove smallest elements first. Heap iteration is not sorted, but repeated polls are ordered.

**Why the other choices fail:** Unspecified iteration does not make the queue’s head-selection contract unspecified.

**Rule/source:** [Java collections].

</details>

<a id="jv040"></a>
### JV040 — Primitive type argument

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
List<int> x=new ArrayList<>(); System.out.println(x);
}
}
```

A. []

B. Compilation fails

C. Runtime ClassCastException

D. [0]

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Compilation fails**

Java generic type arguments must be reference types; use Integer rather than int.

**Why the other choices fail:** Autoboxing applies to values in suitable contexts; it does not make primitive types legal generic arguments.

**Rule/source:** [Java collections].

</details>

<a id="jv041"></a>
### JV041 — Wildcard producer

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
List<? extends Number> x=new ArrayList<Integer>(); x.add(1); System.out.println(x);
}
}
```

A. [1]

B. Compilation fails

C. UnsupportedOperationException

D. []

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Compilation fails**

The exact captured subtype is unknown, so Integer cannot safely be added. Reading yields a Number-compatible value; adding null is a separate allowed case.

**Why the other choices fail:** An extends bound permits safe reading, not arbitrary writes of the bound or its subtypes.

**Rule/source:** [Java collections].

</details>

<a id="jv042"></a>
### JV042 — LinkedHashMap replacement order

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
Map<String,Integer> m=new LinkedHashMap<>();m.put("a",1);m.put("b",2);m.put("a",3);System.out.println(m.keySet());
}
}
```

A. [a, b]

B. [a, b, a]

C. Order is unspecified for this map.

D. [b, a]

<details>
<summary>Answer and reasoning</summary>

**Correct: A — [a, b]**

Default LinkedHashMap preserves insertion order; replacement of an existing key does not reinsert it.

**Why the other choices fail:** Access-order mode is not enabled, and equal keys do not create duplicate entries.

**Rule/source:** [Java collections].

</details>

## Methods, OOP, dispatch and initialization

<a id="jv043"></a>
### JV043 — Widening before boxing

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {
static void f(long x){System.out.println("long");} static void f(Integer x){System.out.println("Integer");}
public static void main(String[] args) throws Exception {
f(1);
}
}
```

A. long

B. Both methods execute.

C. Compilation fails

D. Integer

<details>
<summary>Answer and reasoning</summary>

**Correct: A — long**

Overload resolution first tries strict invocation without boxing; int widens to long before the boxing phase is considered.

**Why the other choices fail:** An exact-looking wrapper type does not outrank an applicable primitive widening in the earlier phase.

**Rule/source:** [JLS classes].

</details>

<a id="jv044"></a>
### JV044 — Null chooses more specific

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {
static void f(Object x){System.out.println("Object");} static void f(String x){System.out.println("String");}
public static void main(String[] args) throws Exception {
f(null);
}
}
```

A. NullPointerException

B. Compilation fails

C. Object

D. String

<details>
<summary>Answer and reasoning</summary>

**Correct: D — String**

Both reference overloads accept null; String is more specific than Object. Nothing dereferences the argument.

**Why the other choices fail:** Null does not always make an overload ambiguous or automatically throw.

**Rule/source:** [JLS classes].

</details>

<a id="jv045"></a>
### JV045 — Unrelated null overloads

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {
static void f(String x){} static void f(Integer x){}
public static void main(String[] args) throws Exception {
f(null);
}
}
```

A. String

B. Integer

C. Compilation fails

D. NullPointerException

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Compilation fails**

String and Integer are unrelated reference types, so neither applicable overload is more specific. The call is ambiguous.

**Why the other choices fail:** Null can convert to either; source declaration order does not choose a method.

**Rule/source:** [JLS classes].

</details>

<a id="jv046"></a>
### JV046 — Reference type selects overload

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {
static void f(Object x){System.out.println("Object");} static void f(String x){System.out.println("String");}
public static void main(String[] args) throws Exception {
Object x="a"; f(x);
}
}
```

A. Runtime ClassCastException

B. Compilation fails

C. Object

D. String

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Object**

Overload selection uses the argument’s compile-time type Object. Its runtime String value does not rerun overload resolution.

**Why the other choices fail:** Dynamic dispatch chooses an overriding implementation after a signature is selected; it is not dynamic overload selection.

**Rule/source:** [JLS classes].

</details>

<a id="jv047"></a>
### JV047 — Fields versus overridden methods

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {
static class A{int x=1;int f(){return x;}} static class B extends A{int x=2;int f(){return x;}}
public static void main(String[] args) throws Exception {
A a=new B(); System.out.println(a.x+" "+a.f());
}
}
```

A. 1 1

B. 1 2

C. 2 2

D. 2 1

<details>
<summary>Answer and reasoning</summary>

**Correct: B — 1 2**

Field access uses the declared reference type, selecting A.x. Instance-method dispatch invokes B’s override.

**Why the other choices fail:** Fields are hidden rather than polymorphically overridden.

**Rule/source:** [JLS classes].

</details>

<a id="jv048"></a>
### JV048 — Static hiding

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {
static class A{static String f(){return "A";}} static class B extends A{static String f(){return "B";}}
public static void main(String[] args) throws Exception {
A a=new B(); System.out.println(a.f());
}
}
```

A. Compilation fails

B. B

C. NullPointerException

D. A

<details>
<summary>Answer and reasoning</summary>

**Correct: D — A**

A static method is selected using the reference’s declared type. Calling static methods through variables is legal but misleading.

**Why the other choices fail:** Object runtime type controls overrides of instance methods, not hidden static methods.

**Rule/source:** [JLS classes].

</details>

<a id="jv049"></a>
### JV049 — Constructor invokes override early

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {
static class A{A(){show();}void show(){}} static class B extends A{int x=7;void show(){System.out.println(x);}}
public static void main(String[] args) throws Exception {
B b=new B(); System.out.println(b.x);
}
}
```

A. 7 / 7

B. 0 / 7

C. 0 / 0

D. Compilation fails

<details>
<summary>Answer and reasoning</summary>

**Correct: B — 0 / 7**

During A’s constructor, B’s field has its default 0; dispatch still calls B.show. B’s initializer assigns 7 only after the superclass constructor returns.

**Why the other choices fail:** Runtime dispatch can expose incompletely initialized subclass state.

**Rule/source:** [JLS classes].

</details>

<a id="jv050"></a>
### JV050 — Static initialized once

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {
static class A{static{System.out.print("S");}{System.out.print("I");}}
public static void main(String[] args) throws Exception {
new A();new A();
}
}
```

A. SISI

B. ISSI

C. SSI

D. SII

<details>
<summary>Answer and reasoning</summary>

**Correct: D — SII**

A’s static initializer runs once on initialization; its instance initializer runs for each new instance.

**Why the other choices fail:** Class initialization and per-instance initialization have different counts and ordering.

**Rule/source:** [JLS classes].

</details>

<a id="jv051"></a>
### JV051 — Override cannot reduce access

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {
static class A{public void f(){}} static class B extends A{protected void f(){}}
public static void main(String[] args) throws Exception {
System.out.println("ok");
}
}
```

A. Compilation fails

B. Runtime IllegalAccessException

C. Compilation succeeds only for an A reference.

D. ok

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Compilation fails**

B.f attempts to reduce public access to protected, which is forbidden when overriding.

**Why the other choices fail:** Call-site reference type does not repair an invalid class declaration.

**Rule/source:** [JLS classes].

</details>

<a id="jv052"></a>
### JV052 — A private method is separate

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {
static class A{private void f(){System.out.println("A");}void call(){f();}} static class B extends A{public void f(){System.out.println("B");}}
public static void main(String[] args) throws Exception {
A a=new B();a.call();
}
}
```

A. B

B. Compilation fails

C. AB

D. A

<details>
<summary>Answer and reasoning</summary>

**Correct: D — A**

A.call invokes A’s private f; B.f is a separate method, not an override of that private member.

**Why the other choices fail:** Same spelling is insufficient to create an override.

**Rule/source:** [JLS classes].

</details>

<a id="jv053"></a>
### JV053 — Return type cannot overload

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {
static int f(){return 1;} static long f(){return 2;}
public static void main(String[] args) throws Exception {
System.out.println("ok");
}
}
```

A. ok

B. 2

C. Compilation fails

D. 1

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Compilation fails**

Two methods cannot be distinguished only by return type; these have the same name and parameter types.

**Why the other choices fail:** The type expected by an assignment does not select between duplicate declarations.

**Rule/source:** [JLS classes].

</details>

<a id="jv054"></a>
### JV054 — Covariant return and dispatch

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {
static class A{Object f(){return "A";}} static class B extends A{String f(){return "B";}}
public static void main(String[] args) throws Exception {
A a=new B();System.out.println(a.f().getClass().getSimpleName());
}
}
```

A. ClassCastException

B. Object

C. Compilation fails

D. String

<details>
<summary>Answer and reasoning</summary>

**Correct: D — String**

An overriding method can return a narrower reference type. B.f returns a String even though the call’s static return type is Object.

**Why the other choices fail:** Covariance permits this reference return; it does not change overload selection.

**Rule/source:** [JLS classes].

</details>

<a id="jv055"></a>
### JV055 — Constructor is not inherited

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {
static class A{A(int x){}} static class B extends A{B(){super(0);}}
public static void main(String[] args) throws Exception {
new B(1);
}
}
```

A. Compilation fails

B. 0

C. Runtime NoSuchMethodException

D. 1

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Compilation fails**

B has only its declared no-argument constructor. A’s constructor taking int is not inherited.

**Why the other choices fail:** super(0) constructs the parent part; it does not add B(int).

**Rule/source:** [JLS classes].

</details>

<a id="jv056"></a>
### JV056 — Interface default conflict

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {
interface A{default int f(){return 1;}} interface B{default int f(){return 2;}} static class C implements A,B{}
public static void main(String[] args) throws Exception {
System.out.println("ok");
}
}
```

A. ok

B. A

C. B

D. Compilation fails

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Compilation fails**

C inherits unrelated conflicting default f implementations and must resolve the conflict with an override.

**Why the other choices fail:** Declaration order does not select one unrelated default.

**Rule/source:** [JLS classes].

</details>

<a id="jv057"></a>
### JV057 — Equals overload is not override

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {
static class A{public boolean equals(A other){return true;}}
public static void main(String[] args) throws Exception {
A a=new A();Object b=new A();System.out.println(a.equals((A)b)+" "+a.equals(b));
}
}
```

A. false false

B. true true

C. false true

D. true false

<details>
<summary>Answer and reasoning</summary>

**Correct: D — true false**

equals(A) is an overload. Passing an Object selects inherited equals(Object), which remains identity-based.

**Why the other choices fail:** A custom equality method must match equals(Object) to override the contract.

**Rule/source:** [JLS classes].

</details>

<a id="jv058"></a>
### JV058 — Wrapper versus primitive equality

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
Integer a=Integer.valueOf(1000),b=Integer.valueOf(1000);System.out.println(a.equals(b)+" "+(a==1000));
}
}
```

A. false true

B. Identity caching makes the answer unspecified.

C. true true

D. true false

<details>
<summary>Answer and reasoning</summary>

**Correct: C — true true**

equals compares Integer values. Comparing Integer to int unboxes a and compares numeric values.

**Why the other choices fail:** This code avoids a==b, whose identity could depend on caching. Unboxing is not reference comparison.

**Rule/source:** [JLS classes].

</details>

<a id="jv059"></a>
### JV059 — Varargs receives the array

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {
static void f(int... x){x[0]=8;}
public static void main(String[] args) throws Exception {
int[] a={1}; f(a);System.out.println(a[0]);
}
}
```

A. 1

B. Compilation fails

C. 8

D. An array copy is required, so output is unspecified.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 8**

An existing int[] can be supplied to int... directly. The parameter refers to that same array; changing an element affects a.

**Why the other choices fail:** Varargs call syntax does not universally create a new array when an array is already supplied.

**Rule/source:** [JLS classes].

</details>

<a id="jv060"></a>
### JV060 — Exception type in override

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {
static class A{void f() throws java.io.FileNotFoundException{}} static class B extends A{void f() throws java.io.IOException{}}
public static void main(String[] args) throws Exception {
System.out.println("ok");
}
}
```

A. Compilation fails

B. It compiles because every exception is an Object.

C. ok

D. Runtime IOException

<details>
<summary>Answer and reasoning</summary>

**Correct: A — Compilation fails**

An override cannot add a broader checked exception than the overridden method allows. IOException is broader than FileNotFoundException.

**Why the other choices fail:** Unchecked exception flexibility does not apply to these checked exception types.

**Rule/source:** [JLS classes].

</details>

## Exceptions, input, sorting and iterator contracts

<a id="jv061"></a>
### JV061 — Finally changes return

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {
static int f(){try{return 1;}finally{return 2;}}
public static void main(String[] args) throws Exception {
System.out.println(f());
}
}
```

A. 2

B. 1

C. Compilation fails

D. 1 / 2

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 2**

A return in finally replaces the pending return from try. This is legal but can hide outcomes and exceptions.

**Why the other choices fail:** Executing finally does not mean returning both values.

**Rule/source:** [JLS statements].

</details>

<a id="jv062"></a>
### JV062 — Return value captured before finally

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {
static int f(){int x=1;try{return x;}finally{x=2;}}
public static void main(String[] args) throws Exception {
System.out.println(f());
}
}
```

A. No value is returned.

B. 2

C. 1

D. Compilation fails

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 1**

The return expression evaluates to 1 before finally assigns local x=2. Changing x does not change that captured primitive return value.

**Why the other choices fail:** This differs from returning inside finally or mutating a returned object.

**Rule/source:** [JLS statements].

</details>

<a id="jv063"></a>
### JV063 — Catch ordering

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
try{throw new IllegalArgumentException();}catch(Exception e){System.out.println("E");}catch(IllegalArgumentException e){System.out.println("I");}
}
}
```

A. E / I

B. E

C. I

D. Compilation fails

<details>
<summary>Answer and reasoning</summary>

**Correct: D — Compilation fails**

The second catch is unreachable because the preceding Exception catch already catches that subtype.

**Why the other choices fail:** Runtime matching is not reached for invalid catch ordering.

**Rule/source:** [JLS statements].

</details>

<a id="jv064"></a>
### JV064 — Unchecked parse failure

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
System.out.println(Integer.parseInt(" 12 "));
}
}
```

A. NumberFormatException

B. 0

C. 12

D. Compilation fails because a checked exception is uncaught.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — NumberFormatException**

parseInt does not strip surrounding spaces. NumberFormatException is unchecked, so declaring or catching it is not required to compile.

**Why the other choices fail:** Scanner tokenization and String.trim are different operations that are not called here.

**Rule/source:** [JLS statements].

</details>

<a id="jv065"></a>
### JV065 — Token then remainder of line

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
Scanner s=new Scanner("12\nhello\n"); int n=s.nextInt();System.out.println("["+s.nextLine()+"] "+s.nextLine());
}
}
```

A. [12] hello

B. [] hello

C. NoSuchElementException

D. [hello] hello

<details>
<summary>Answer and reasoning</summary>

**Correct: B — [] hello**

nextInt consumes the numeric token, leaving its line ending. The first nextLine reads the empty remainder; the second reads hello.

**Why the other choices fail:** Token methods and line methods have different boundaries.

**Rule/source:** [JLS statements].

</details>

<a id="jv066"></a>
### JV066 — Binary-search insertion encoding

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
int[] a={1,3,5};System.out.println(Arrays.binarySearch(a,4));
}
}
```

A. -2

B. -1

C. -3

D. 2

<details>
<summary>Answer and reasoning</summary>

**Correct: C — -3**

Insertion point is 2; absence is encoded as −(insertionPoint)−1 = −3.

**Why the other choices fail:** The negative result is not simply −1 or the negative found index. The sorted-array precondition matters.

**Rule/source:** [JLS statements].

</details>

<a id="jv067"></a>
### JV067 — Comparator without overflow

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
Comparator<Integer> c=(a,b)->Integer.compare(a,b);System.out.println(c.compare(Integer.MIN_VALUE,1)<0);
}
}
```

A. Unspecified because subtraction overflows.

B. true

C. ArithmeticException

D. false

<details>
<summary>Answer and reasoning</summary>

**Correct: B — true**

Integer.compare compares values without the overflowing subtraction MIN_VALUE−1.

**Why the other choices fail:** The shown implementation does not subtract; do not transfer the bug from a different comparator.

**Rule/source:** [JLS statements].

</details>

<a id="jv068"></a>
### JV068 — Iterator removal versus list removal

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {

public static void main(String[] args) throws Exception {
List<Integer> x=new ArrayList<>(List.of(1,2,3));Iterator<Integer> it=x.iterator();while(it.hasNext()){if(it.next()==2)it.remove();}System.out.println(x);
}
}
```

A. [1, 3]

B. ConcurrentModificationException

C. [1, 2, 3]

D. [2]

<details>
<summary>Answer and reasoning</summary>

**Correct: A — [1, 3]**

Iterator.remove deletes its last returned element and updates that iterator’s state. This is the supported removal path here.

**Why the other choices fail:** Removing directly from the backing list while iterating is a different action; structural changes are not universally forbidden.

**Rule/source:** [JLS statements].

</details>

<a id="jv069"></a>
### JV069 — Resource closing order

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {
static class R implements AutoCloseable{String s;R(String s){this.s=s;}public void close(){System.out.print(s);}}
public static void main(String[] args) throws Exception {
try(R a=new R("A");R b=new R("B")){System.out.print("T");}
}
}
```

A. BAT

B. TBA

C. TAB

D. Compilation fails

<details>
<summary>Answer and reasoning</summary>

**Correct: B — TBA**

Resources are created left to right and closed in reverse order on leaving try. close prints B then A after the body.

**Why the other choices fail:** Creation order and closing order differ.

**Rule/source:** [JLS statements].

</details>

<a id="jv070"></a>
### JV070 — Primary and suppressed exceptions

What happens when this separate Java 17 program is compiled and run?

```java
import java.util.*;
public class Main {
static class R implements AutoCloseable{public void close(){throw new IllegalArgumentException("close");}}
public static void main(String[] args) throws Exception {
try(R r=new R()){throw new IllegalStateException("body");}catch(Exception e){System.out.println(e.getMessage()+" "+e.getSuppressed()[0].getMessage());}
}
}
```

A. close body

B. Only the close exception survives.

C. body body

D. body close

<details>
<summary>Answer and reasoning</summary>

**Correct: D — body close**

The body exception remains primary. The close failure is attached as suppressed by try-with-resources.

**Why the other choices fail:** This differs from an ordinary finally throwing and replacing a pending exception.

**Rule/source:** [JLS statements].

</details>

## Sources

[JLS expressions]: https://docs.oracle.com/javase/specs/jls/se17/html/jls-15.html
[JLS types]: https://docs.oracle.com/javase/specs/jls/se17/html/jls-4.html
[JLS classes]: https://docs.oracle.com/javase/specs/jls/se17/html/jls-8.html
[JLS statements]: https://docs.oracle.com/javase/specs/jls/se17/html/jls-14.html
[Java collections]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/package-summary.html
[Java String]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html
[Java notes]: Java_FS_Revision_Notes.md
