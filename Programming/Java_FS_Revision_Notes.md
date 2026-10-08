# Java: FS programming revision

For the screening test on **9 October 2026**. Java is your preferred coding language. Use these notes for language MCQs and to avoid mistakes in coding answers.

[All subject notes](../FS_SUBJECT_NOTES.md) · [Detailed Java algorithm notes](../DS-JAVA/README.md) · [160 Java scenario MCQs](../DS/FS_Java_Hard_MCQ_Bank.md)

**ai explnation due to lack of material** — a dedicated college Java fundamentals pack was not identified in the material inspected. These are original study explanations. The notice does not specify Java subtopics; the selection below covers common fundamentals. Examples use Java 17-compatible syntax.


**Deep practice:** [70 hard MCQs with hidden explanations](FS_Java_Hard_MCQ_Bank.md) · [coverage and source-gap map](../FS_Remaining_Subjects_Learning_Map.md)

## 1. Types, initialization, and arithmetic

Java checks variable types before execution. Its eight primitive types are `byte`, `short`, `int`, `long`, `float`, `double`, `char`, and `boolean`. `String` and arrays are reference types.

| Type or rule | What it means in an MCQ |
|---|---|
| `int` | A signed 32-bit integer. Its maximum is 2,147,483,647. |
| `long` | A signed 64-bit integer. Use `L` for a long literal. |
| `char` | One unsigned 16-bit UTF-16 code unit. Some Unicode characters need two code units. |
| `boolean` | `true` or `false`. An integer cannot be used directly as an `if` condition. |
| Field and array element | Receive default values, such as zero, `false`, or `null`. |
| Local variable | Must be definitely assigned before it is read. |

```java
int a = 7, b = 2;
System.out.println(a / b);          // 3
System.out.println((double) a / b); // 3.5
System.out.println((double) (a / b)); // 3.0
long safe = 1L * 50_000 * 50_000;
System.out.println(safe);          // 2500000000
```

When both operands are integers, division discards the fractional part toward zero. In the third print, integer division happens before the cast. The cast cannot restore the lost fraction.

Multiplying two `int` values performs `int` arithmetic even if you assign the result to a `long`. `1L` makes the multiplication use `long` arithmetic from the start. Integer overflow wraps; it does not automatically throw an exception. Integer division by zero does throw `ArithmeticException`.

Reference: [Oracle: primitive types and initialization](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html).

## 2. Trace evaluation order

`x++` produces the old value, then increments `x`. `++x` increments first and produces the new value. Java evaluates operands left to right; operator precedence still determines which operation combines them.

```java
int x = 2;
int y = x++ + ++x;
System.out.println(x + " " + y); // 4 6
int count = 0;
boolean ok = false && ++count > 0;
System.out.println(count);      // 0
System.out.println(1 + 2 + "3"); // 33
System.out.println("1" + 2 + 3); // 123
```

The first addition gets 2 from `x++`; `x` then becomes 3. `++x` changes it to 4 and supplies 4. Thus `y` is 6.

`&&` skips its right operand when the left operand is false. `||` skips its right operand when the left operand is true. Boolean `&` and `|` evaluate both operands. Once string concatenation begins, later `+` operations append text.

For a loop, record initialization, condition, body, and update separately. `continue` in a basic `for` loop goes to its update before the next condition. `break` exits the loop.

Reference: [Java Language Specification: expressions](https://docs.oracle.com/javase/specs/jls/se17/html/jls-15.html).

## 3. Strings: content and identity

For references, `==` checks whether the references identify the same object. `String.equals` checks string content. A string is immutable: its methods do not edit its stored characters.

```java
String a = new String("fs");
String b = new String("fs");
System.out.println(a == b);      // false
System.out.println(a.equals(b)); // true
a.toUpperCase();
System.out.println(a);           // fs
a = a.toUpperCase();
System.out.println(a);           // FS
```

The first call returns a string that is ignored. The second call returns a string that is assigned to `a`. The original object is not changed.

String literals can share an interned object. Do not use that fact as a reason to compare content with `==`.

| Operation | Result or boundary |
|---|---|
| `s.length()` | Number of UTF-16 code units. |
| `s.charAt(i)` | Code unit at index `i`; valid indices are 0 through length−1. |
| `s.substring(l, r)` | Includes `l`, excludes `r`. |
| `StringBuilder.append` | Changes the builder; useful for repeated construction. |
| `s.compareTo(t)` | Negative, zero, or positive; do not assume only −1 or 1. |

Reference: [Java 17 String API](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html).

## 4. Arrays, lists, sets, and maps

An array has a fixed length. An `ArrayList` can change its size. Assigning an array reference to another variable does not copy its elements.

```java
int[] a = {1, 2};
int[] b = a;
b[0] = 9;
System.out.println(a[0]); // 9
int[] c = a.clone();
c[0] = 4;
System.out.println(a[0]); // 9
```

`a` and `b` identify the same array. `c` is a separate array. A shallow copy of an object array still contains references to the same element objects.

```java
java.util.ArrayList<Integer> values = new java.util.ArrayList<>();
values.add(10); values.add(20); values.add(30);
values.remove(1);                  // remove the element at index 1
values.remove(Integer.valueOf(10)); // remove the value 10
System.out.println(values);        // [30]
```

The argument type selects the `remove` overload. An `int` argument selects an index; an `Integer` object selects a value.

| Structure | Main operations | Important limit |
|---|---|---|
| Array | `a[i]`, `a.length` | Fixed length; index errors occur at runtime. |
| `ArrayList<T>` | `add`, `get`, `set`, `remove`, `size()` | Middle insertions/removals shift elements. |
| `HashSet<T>` | `add`, `contains`, `remove`, `size()` | Stores distinct values; iteration order is not guaranteed. |
| `HashMap<K,V>` | `put`, `get`, `containsKey`, `getOrDefault` | One value per key; a new `put` replaces the value for that key. |

Generics use reference types: `ArrayList<Integer>`, not `ArrayList<int>`. Java can box an `int` into `Integer`. Unboxing a null wrapper throws `NullPointerException`.

References: [Java 17 ArrayList API](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/ArrayList.html), [HashSet API](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/HashSet.html), [HashMap API](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/HashMap.html). These collection names are Java classes; JavaScript collections in WT have different APIs.

## 5. Method arguments are passed by value

For an object or array, the copied value is a reference. A method can use that copy to change the shared object. Assigning a different object to the parameter does not replace the caller's variable.

```java
class JavaPassValueExample {
    static void change(int n, int[] a) {
        n = 99;
        a[0] = 7;
        a = new int[]{8};
    }
    public static void main(String[] args) {
        int n = 1;
        int[] a = {2};
        change(n, a);
        System.out.println(n + " " + a[0]); // 1 7
    }
}
```

The method receives a copy of 1 and a copy of the array reference. The write to `a[0]` reaches the shared array. The later reassignment changes only the method's parameter.

Reference: [Oracle: passing method arguments](https://docs.oracle.com/javase/tutorial/java/javaOO/arguments.html).

## 6. OOP: distinguish the mechanism

| Term | Concrete meaning |
|---|---|
| Encapsulation | Put state and operations together; control access to the state. |
| Inheritance | Define a subtype from an existing type; a Java class extends at most one class. |
| Overloading | Same method name, different parameter lists. Selection uses compile-time types. Return type alone cannot distinguish overloads. |
| Overriding | A subclass supplies an implementation of an inherited instance method. Normal virtual dispatch uses the runtime object. |
| `static` | Belongs to the class. Static methods are hidden, rather than overridden. |
| `final` | Variable cannot be reassigned; method cannot be overridden; class cannot be extended. These are different uses. |
| Abstract class / interface | Express contracts. An abstract class cannot be directly instantiated. A class can implement multiple interfaces. |

```java
class JavaDispatchExample {
    static class Parent { String name() { return "parent"; } }
    static class Child extends Parent {
        @Override String name() { return "child"; }
    }
    public static void main(String[] args) {
        Parent p = new Child();
        System.out.println(p.name()); // child
    }
}
```

The variable type permits the call. The runtime object selects the overridden instance method. Constructors have no return type and are not inherited. Interfaces can contain default and static methods; “every interface method has no implementation” is an incorrect blanket rule.

Reference: [Oracle: polymorphism](https://docs.oracle.com/javase/tutorial/java/IandI/polymorphism.html).

## 7. Exceptions and exam input

Distinguish three outcomes before predicting output:

1. **Compile-time error:** for example, reading an unassigned local variable or using an incompatible type. There is no execution of that invalid program.
2. **Runtime exception:** compilation succeeds, but an operation fails during execution. Earlier prints can still have occurred.
3. **Normal execution:** trace the values and output in order.

Checked exceptions must be caught or declared when the language rules require it. `RuntimeException` subclasses are unchecked. `catch` handles a compatible exception; `finally` normally runs when control leaves the try/catch. Program termination can prevent it, so “always under every circumstance” is too strong.

```java
try {
    int[] a = {5};
    System.out.println(a[1]);
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("caught");
} finally {
    System.out.println("end");
}
// Output: caught, then end on the next line.
```

`Scanner.nextInt()` reads a numeric token. A following `nextLine()` reads the rest of the current line, which can be empty. Decide whether the task needs tokens or full lines before mixing these methods.

For a judge submission, follow the required class name and input/output contract. Print only requested results. Use [the existing complete input/output examples](../DS/FS_Java_CPP_Exam_Revision.md) when revising a full program.

Reference: [Oracle: exceptions](https://docs.oracle.com/javase/tutorial/essential/exceptions/).

## Final self-check

Answer first; then open the explanation.

1. Why is `(double)(7 / 2)` 3.0?
2. Can a `final int[]` have an element changed?
3. What does `list.remove(1)` remove from a list of integers?
4. Can a method replace the caller's array variable by reassigning its parameter?
5. Which implementation runs for `Parent p = new Child(); p.name()` above?
6. What happens when a null `Integer` is unboxed?

<details>
<summary>Answers and reasons</summary>

1. Integer division produces 3 before the conversion to double.
2. Yes. `final` prevents assigning a different array to that variable; it does not freeze elements.
3. The element at index 1, because the argument is an `int`.
4. No. The parameter contains a copy of the reference. Element mutation can still affect the shared array.
5. `Child.name()`, because this is an overridden instance method and the object is a Child.
6. A `NullPointerException`; there is no integer value to extract.

</details>

For a timed follow-up, attempt [the Java Days 1–3 mock](../DS-JAVA/Overall_Day_01_02_03_MCQ.md). It tests DAA in Java, rather than the entire mixed-subject paper.
