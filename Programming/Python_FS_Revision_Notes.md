# Python: FS programming revision

For the screening test on **9 October 2026**. Use this for Python MCQs. Your coding-practice language can remain Java.

[All subject notes](../FS_SUBJECT_NOTES.md) · [Java programming notes](Java_FS_Revision_Notes.md)

**ai explnation due to lack of material** — a dedicated college Python fundamentals pack was not identified in the material inspected. The notice gives no Python subtopic list. These original notes cover common Python 3 fundamentals and output questions.

## 1. Values, names, and arithmetic

A Python name refers to an object. Assignment can bind the name to another type of object. It does not change the type of the existing object.

```python
x = 3
x = "fs"
print(type(x).__name__)  # str
print(7 / 2)            # 3.5
print(7 // 2)           # 3
print(-7 // 2)          # -4
print(-7 % 2)           # 1
print(2 ** 3)           # 8
```

`/` performs true division for these integers. `//` performs floor division. Floor means toward negative infinity, so −3.5 becomes −4. This differs from Java integer division, which truncates toward zero.

For these integers, `a == (a // b) * b + (a % b)`. With a positive divisor, the remainder is nonnegative. Python integers do not use a fixed 32-bit range; practical size is limited by available resources.

False conditions include `False`, `None`, numeric zero, and empty strings or collections. The nonempty string `"False"` is truthy. `and` and `or` short-circuit and can return an operand rather than a Boolean.

Reference: [Python tutorial: numbers and strings](https://docs.python.org/3/tutorial/introduction.html).

## 2. Strings, slicing, and loops

Strings are immutable. Indexing reads a character; it cannot replace a character in the original string. A slice uses `[start:stop:step]`, and excludes the stop position.

```python
s = "screen"
print(s[1:4])       # cre
print(s[-1])        # n
print(s[::-1])      # neercs
print(list(range(2, 7, 2))) # [2, 4, 6]
total = 0
for value in [2, 4, 6]:
    total += value
print(total)        # 12
```

Negative indices count from the end. An out-of-range single index raises `IndexError`. Slice endpoints can extend beyond the string; slicing clips them instead.

`for` reads values from an iterable. `range` excludes its stop value. Indentation identifies the body. `break` exits the loop; `continue` moves to the next iteration. A loop's `else` runs when the loop finishes without `break`, including when it has no iterations.

Reference: [Python tutorial: control flow](https://docs.python.org/3/tutorial/controlflow.html).

## 3. Choose the collection by its behavior

| Collection | Purpose | MCQ trap |
|---|---|---|
| `list` | Ordered, mutable sequence; duplicates allowed. | `append` adds one object; `extend` adds elements from an iterable. |
| `tuple` | Immutable sequence; duplicates allowed. | `(5,)` is a one-element tuple. `(5)` is an integer expression. |
| `set` | Distinct hashable values. | `{}` creates an empty dictionary; use `set()` for an empty set. Do not assume iteration order. |
| `dict` | Map hashable keys to values. | Updating an existing key replaces its value. In current Python 3, insertion order is preserved. |

```python
a = [1, 2]
a.append([3, 4])
print(a)             # [1, 2, [3, 4]]
b = [1, 2]
b.extend([3, 4])
print(b)             # [1, 2, 3, 4]
print(a.append(5))   # None; a is also changed
d = {"fs": 1}
d["fs"] = 2
print(d["fs"])      # 2
```

Methods such as `append` and `list.sort` change a list and return `None`. `sorted(values)` produces a new sorted list. `list.remove(x)` removes the first equal value; `pop(i)` removes and returns the item at index `i`.

`d[key]` raises `KeyError` when the key is absent. `d.get(key, default)` supplies a default. Lists are not hashable, so they cannot be ordinary set elements or dictionary keys. A tuple is hashable only if its elements are hashable.

Reference: [Python tutorial: data structures](https://docs.python.org/3/tutorial/datastructures.html).

## 4. Aliasing, shallow copies, and identity

Assignment shares the object. A shallow copy makes a new outer collection but shares its contained objects.

```python
a = [[1], [2]]
b = a
c = a.copy()
b.append([3])
c[0].append(9)
print(a)       # [[1, 9], [2], [3]]
print(c)       # [[1, 9], [2]]
print(a is b)  # True
print(a is c)  # False
```

Appending through `b` changes the same outer list as `a`. It does not add an element to `c`. However, `a[0]` and `c[0]` identify the same inner list, so the write of 9 appears in both.

`==` compares equality according to the objects' types. `is` compares identity. Use `is None` to check for the singleton `None`; do not rely on implementation-specific integer or string reuse to predict identity.

**Tuple trap:** a tuple cannot have its element references replaced, but a mutable object inside it can still change.

## 5. Functions, scope, and default arguments

A function without a returned value produces `None`. A call binds parameter names to the supplied objects. Mutating a shared object can affect the caller; rebinding a parameter does not rebind the caller's variable.

```python
def change(values):
    values.append(3)
    values = [99]

a = [1, 2]
change(a)
print(a)  # [1, 2, 3]
```

Default arguments are evaluated when the function definition executes, rather than once per call. A mutable default can therefore retain data between calls.

```python
def collect(x, out=[]):
    out.append(x)
    return out

print(collect(1))  # [1]
print(collect(2))  # [1, 2]

def fresh_collect(x, out=None):
    if out is None:
        out = []
    out.append(x)
    return out

print(fresh_collect(1))  # [1]
print(fresh_collect(2))  # [2]
```

To read an output question, ask when each object was created and which names share it. Do not describe Python simply as copying every object into a function.

Assignment to a name inside a function normally makes that name local. `global` refers to a module-level name; `nonlocal` refers to a name in an enclosing function scope. Reading a local before it is assigned can raise `UnboundLocalError`.

Reference: [Python tutorial: function definitions and defaults](https://docs.python.org/3/tutorial/controlflow.html#defining-functions).

## 6. Exceptions, classes, and input

```python
try:
    print(int("fs"))
except ValueError:
    print("bad number")
finally:
    print("end")
# Output: bad number, then end on the next line.
```

`try` runs the protected operation. A matching `except` handles its exception. A try statement's `else` runs when the try suite completes without an exception. `finally` normally runs as control leaves the statement.

| Failure | Typical example |
|---|---|
| `SyntaxError` | Invalid syntax; a standalone invalid script does not execute normally. |
| `NameError` | Read a name that has no binding. |
| `TypeError` | Apply an operation to an unsupported type, such as `1 + "2"`. |
| `ValueError` | Correct type, unsuitable value, such as `int("fs")`. |
| `IndexError` / `KeyError` | Missing sequence index / missing dictionary key. |

References: [Python tutorial: exceptions](https://docs.python.org/3/tutorial/errors.html), [classes and scope](https://docs.python.org/3/tutorial/classes.html).

```python
class Counter:
    def __init__(self, value):
        self.value = value
    def add(self):
        self.value += 1

c = Counter(2)
c.add()
print(c.value)  # 3
```

`__init__` initializes the instance after it has been created. `self` is the conventional parameter name for the instance. A bound call such as `c.add()` supplies the instance automatically. Keep per-instance mutable data on the instance; a mutable class attribute can be shared by instances.

`input()` returns text. Convert it when the task needs numbers: `n = int(input())`. For a line of integer tokens, use `list(map(int, input().split()))`. `print` separates multiple arguments with spaces by default.

Reference: [Python built-in functions](https://docs.python.org/3/library/functions.html).

## Final self-check

1. How do Java's `-7 / 2` and Python's `-7 // 2` differ?
2. What is the result of `[].append(1)`?
3. Does copying a nested list with `.copy()` copy every inner list?
4. Why can `out=[]` retain items between calls?
5. What is the type of `{}`? How do you create an empty set?
6. Does `__init__` receive the instance in a normal instance construction?

<details>
<summary>Answers and reasons</summary>

1. Java gives −3 by truncation toward zero. Python floor division gives −4.
2. `None`. The temporary list is changed, but `append` does not return that list.
3. No. The outer list is copied; references to the inner objects are shared.
4. The default list is created when the function definition executes and is reused for calls that omit that argument.
5. A dictionary. Use `set()` for an empty set.
6. Yes. Its first parameter conventionally has the name `self`.

</details>
