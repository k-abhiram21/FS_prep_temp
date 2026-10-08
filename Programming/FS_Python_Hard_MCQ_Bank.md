# Python programming: 70 hard MCQs

**For the 9 October 2026 FS screening test.** Original practice, prepared 8 October. One best answer per question. These are study selections, not predicted exam questions. Read the hidden explanations to learn the rule and the closest traps.

[All compact banks and coverage audit](../FS_Remaining_Subjects_Learning_Map.md)

## How to use

Work in blocks of 10–15. First choose an answer without opening the explanation; then explain why the other choices fail. For code, record each state change before guessing. The four mixed sets below use every question once: three sets of 20 and one of 10. Set sizes are for revision, not exam subject weights.

**Assumptions:** Python 3.10+ semantics; each block is a fresh script. `/` in choices separates output lines. Dictionary insertion order is guaranteed; set order and integer/string interning are not used for exact answers. A named exception is uncaught unless the script catches it. Floats use ordinary IEEE-754 binary64; code avoids version-dependent exception messages.

## Coverage

| Topic | Questions |
|---|---|
| Numbers, truth, expressions and control | [PY001](#py001)–[PY012](#py012) (12) |
| Strings, slices and sequence methods | [PY013](#py013)–[PY024](#py024) (12) |
| Sharing, dictionaries, sets and ordering | [PY025](#py025)–[PY038](#py038) (14) |
| Functions, scope, closures and iterators | [PY039](#py039)–[PY052](#py052) (14) |
| Classes, exceptions and input contracts | [PY053](#py053)–[PY070](#py070) (18) |

## Mixed revision sets

**Set 1:** [PY041](#py041), [PY021](#py021), [PY007](#py007), [PY050](#py050), [PY038](#py038), [PY035](#py035), [PY046](#py046), [PY039](#py039), [PY068](#py068), [PY034](#py034), [PY026](#py026), [PY051](#py051), [PY044](#py044), [PY052](#py052), [PY066](#py066), [PY023](#py023), [PY009](#py009), [PY058](#py058), [PY010](#py010), [PY029](#py029).

**Set 2:** [PY027](#py027), [PY012](#py012), [PY040](#py040), [PY049](#py049), [PY020](#py020), [PY013](#py013), [PY061](#py061), [PY004](#py004), [PY053](#py053), [PY008](#py008), [PY063](#py063), [PY062](#py062), [PY031](#py031), [PY016](#py016), [PY025](#py025), [PY022](#py022), [PY047](#py047), [PY032](#py032), [PY067](#py067), [PY014](#py014).

**Set 3:** [PY036](#py036), [PY060](#py060), [PY048](#py048), [PY054](#py054), [PY011](#py011), [PY028](#py028), [PY056](#py056), [PY057](#py057), [PY064](#py064), [PY065](#py065), [PY017](#py017), [PY030](#py030), [PY055](#py055), [PY006](#py006), [PY015](#py015), [PY005](#py005), [PY059](#py059), [PY001](#py001), [PY018](#py018), [PY037](#py037).

**Set 4:** [PY042](#py042), [PY019](#py019), [PY069](#py069), [PY003](#py003), [PY070](#py070), [PY002](#py002), [PY045](#py045), [PY033](#py033), [PY024](#py024), [PY043](#py043).


## Numbers, truth, expressions and control

<a id="py001"></a>
### PY001 — Negative quotient and remainder

What happens in this separate Python 3 script?

```python
print(-7//2, -7%2, 7//-2, 7%-2)
```

A. -4 -1 -4 1

B. -4 1 -4 -1

C. -3 -1 -3 1

D. -3 1 -3 -1

<details>
<summary>Answer and reasoning</summary>

**Correct: B — -4 1 -4 -1**

// floors toward negative infinity. The remainder has the divisor’s sign and a=(a//b)*b+a%b.

**Why the other choices fail:** Java truncation does not apply; reversing the divisor changes remainder sign.

**Rule/source:** [Python expressions].

</details>

<a id="py002"></a>
### PY002 — Division operator choice

What happens in this separate Python 3 script?

```python
print(7/2, 7//2, 7//2.0)
```

A. 3.5 3 3

B. 3 3 3

C. 3.5 3 3.0

D. 3.5 3.5 3.5

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 3.5 3 3.0**

/ is true division. // floors; a floating operand makes this floor-division result a float.

**Why the other choices fail:** Integer inputs do not make / integral. Value and output type both matter.

**Rule/source:** [Python expressions].

</details>

<a id="py003"></a>
### PY003 — Arbitrary precision

What happens in this separate Python 3 script?

```python
x=2**63
print(x+1 > x, x.bit_length())
```

A. False 64

B. True 63

C. OverflowError

D. True 64

<details>
<summary>Answer and reasoning</summary>

**Correct: D — True 64**

Python integers grow as needed subject to memory. 2**63 has one 1 followed by 63 zeros, requiring 64 bits.

**Why the other choices fail:** Fixed signed 64-bit overflow and the exponent alone are not Python’s integer bit_length rule.

**Rule/source:** [Python expressions].

</details>

<a id="py004"></a>
### PY004 — Power and unary minus

What happens in this separate Python 3 script?

```python
print(-2**2, (-2)**2, 2**-2)
```

A. -4 4 0.25

B. SyntaxError

C. -4 -4 0.25

D. 4 4 0

<details>
<summary>Answer and reasoning</summary>

**Correct: A — -4 4 0.25**

Exponentiation binds before unary minus on its left; parentheses make the base negative. A negative integer exponent yields a floating reciprocal.

**Why the other choices fail:** Operator grouping changes the base; integer operands do not force an integer reciprocal.

**Rule/source:** [Python expressions].

</details>

<a id="py005"></a>
### PY005 — Comparisons do not chain as booleans

What happens in this separate Python 3 script?

```python
print(1 < 2 < 3, (1 < 2) < 3, 3 > 2 > 4)
```

A. True False True

B. False True False

C. True True False

D. TypeError

<details>
<summary>Answer and reasoning</summary>

**Correct: C — True True False**

A chained comparison means adjacent comparisons joined with short circuit. In the parenthesized case True behaves numerically as 1.

**Why the other choices fail:** The middle value is compared once in the chain; parentheses can create a separate boolean-to-number comparison.

**Rule/source:** [Python expressions].

</details>

<a id="py006"></a>
### PY006 — And/or return operands

What happens in this separate Python 3 script?

```python
print(repr([] or "x"), repr([0] and 7), repr("" and 9))
```

A. [] [0] ""

B. True True False

C. 'x' 7 ''

D. x 7 9

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 'x' 7 ''**

or returns the first truthy operand or last operand; and returns the first falsy operand or last operand. The final result is an empty string.

**Why the other choices fail:** These operators do not universally return bool. A nonempty list containing 0 is truthy.

**Rule/source:** [Python expressions].

</details>

<a id="py007"></a>
### PY007 — Bool is an integer subtype

What happens in this separate Python 3 script?

```python
print(isinstance(True,int), True+True, {True,1,1.0}=={1})
```

A. False 2 False

B. True 2 False

C. TypeError

D. True 2 True

<details>
<summary>Answer and reasoning</summary>

**Correct: D — True 2 True**

bool is an int subtype. True,1 and 1.0 compare equal and hash compatibly, so the set has one equality-distinct member.

**Why the other choices fail:** Different literal types do not always produce distinct set elements.

**Rule/source:** [Python expressions].

</details>

<a id="py008"></a>
### PY008 — Floating equality

What happens in this separate Python 3 script?

```python
print(0.1+0.2 == 0.3, round(2.5), round(3.5))
```

A. False 3 4

B. True 2 4

C. False 2 4

D. True 3 4

<details>
<summary>Answer and reasoning</summary>

**Correct: C — False 2 4**

0.1 and 0.2 are not exact binary 64 fractions. round uses nearest with ties to even for these exactly represented half values.

**Why the other choices fail:** Do not assume decimal exactness or always-round-halves-up; other decimal-looking ties can have representation effects.

**Rule/source:** [Python expressions].

</details>

<a id="py009"></a>
### PY009 — For else after continue

What happens in this separate Python 3 script?

```python
for x in [1,2]:
    if x==1: continue
else:
    print("E")
```

A. No output

B. E / E

C. E

D. SyntaxError

<details>
<summary>Answer and reasoning</summary>

**Correct: C — E**

Loop else runs on normal exhaustion without break. continue skips one iteration but does not suppress else.

**Why the other choices fail:** else is not paired with the inner if here and does not require an empty iterable.

**Rule/source:** [Python expressions].

</details>

<a id="py010"></a>
### PY010 — Break suppresses else

What happens in this separate Python 3 script?

```python
for x in [1,2]:
    if x==2: break
else:
    print("E")
print(x)
```

A. 1

B. E / 2

C. 2

D. NameError

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 2**

break exits the loop and skips its else; x keeps the last bound value 2 in this scope.

**Why the other choices fail:** Loops do not introduce a new local scope, and else is not an unconditional post-loop statement.

**Rule/source:** [Python expressions].

</details>

<a id="py011"></a>
### PY011 — Range excludes stop

What happens in this separate Python 3 script?

```python
print(list(range(5,0,-2)), list(range(0,5,-1)))
```

A. ValueError

B. [5, 3, 1] []

C. [5, 3] []

D. [5, 3, 1, -1] [0, 1, 2, 3, 4]

<details>
<summary>Answer and reasoning</summary>

**Correct: B — [5, 3, 1] []**

Negative steps move downward while values remain above the exclusive stop. The second range cannot move from 0 toward 5 with a negative step.

**Why the other choices fail:** Direction and exclusive bounds matter; a wrong-direction nonzero step yields an empty range, not an error.

**Rule/source:** [Python expressions].

</details>

<a id="py012"></a>
### PY012 — Assignment expression and truth

What happens in this separate Python 3 script?

```python
x=0
if (x:=[]):
    print("Y")
print(x is None, len(x))
```

A. True 0

B. SyntaxError

C. Y / False 0

D. False 0

<details>
<summary>Answer and reasoning</summary>

**Correct: D — False 0**

The walrus binds x to the empty list and yields that list. Its falsiness skips the body, but x still changed.

**Why the other choices fail:** Falsy does not mean None, and skipping the body does not undo assignment in the condition.

**Rule/source:** [Python expressions].

</details>

## Strings, slices and sequence methods

<a id="py013"></a>
### PY013 — Code points versus bytes

What happens in this separate Python 3 script?

```python
s="A😀"
print(len(s),len(s.encode("utf-8")))
```

A. 2 5

B. 3 5

C. 5 5

D. 2 2

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 2 5**

Python str length counts Unicode code points; UTF-8 uses 1 byte for A and 4 for this emoji.

**Why the other choices fail:** Neither byte count nor Java UTF-16 unit count is Python’s str length. A displayed grapheme can be another distinct count.

**Rule/source:** [Python types].

</details>

<a id="py014"></a>
### PY014 — Slice clipping versus indexing

What happens in this separate Python 3 script?

```python
s="abc"
print(s[20:],s[-20:20],sep="|")
```

A. |

B. abc|abc

C. |abc

D. IndexError

<details>
<summary>Answer and reasoning</summary>

**Correct: C — |abc**

Slices clip out-of-range boundaries rather than raising IndexError. The first starts beyond the string and is empty.

**Why the other choices fail:** A direct s[20] would fail, but slicing has a different boundary contract.

**Rule/source:** [Python types].

</details>

<a id="py015"></a>
### PY015 — Negative-step endpoints

What happens in this separate Python 3 script?

```python
print("abcde"[4:0:-2], "abcde"[::-1])
```

A. ec abcde

B. eca edcba

C. db edcba

D. ec edcba

<details>
<summary>Answer and reasoning</summary>

**Correct: D — ec edcba**

Positions 4 and 2 are included;0 is excluded. Omitting bounds with a negative step reverses the sequence.

**Why the other choices fail:** Explicit end 0 differs from an omitted end; the exclusive endpoint still matters.

**Rule/source:** [Python types].

</details>

<a id="py016"></a>
### PY016 — Zero slice step

What happens in this separate Python 3 script?

```python
print([1,2,3][::0])
```

A. []

B. ZeroDivisionError

C. ValueError

D. [1, 2, 3]

<details>
<summary>Answer and reasoning</summary>

**Correct: C — ValueError**

Slice step cannot be zero. This validation fails before producing a sliced list.

**Why the other choices fail:** Invalid slicing is not arithmetic division, and zero step is not shorthand for a default step.

**Rule/source:** [Python types].

</details>

<a id="py017"></a>
### PY017 — Whitespace splitting contracts

What happens in this separate Python 3 script?

```python
s=" a  b "
print(s.split(), s.split(" "))
```

A. ['a', 'b'] ['', 'a', '', 'b', '']

B. ['', 'a', '', 'b', ''] ['a', 'b']

C. ValueError

D. ['a', 'b'] ['a', 'b']

<details>
<summary>Answer and reasoning</summary>

**Correct: A — ['a', 'b'] ['', 'a', '', 'b', '']**

No-argument split groups whitespace and removes boundary empties. An explicit single-space separator preserves adjacent/boundary empty fields.

**Why the other choices fail:** Default whitespace splitting is not simply replace-the-separator-with-a-space behavior.

**Rule/source:** [Python types].

</details>

<a id="py018"></a>
### PY018 — Strip uses a character set

What happens in this separate Python 3 script?

```python
print("abbaXba".strip("ab"))
```

A. X

B. baX

C. Xba

D. abbaX

<details>
<summary>Answer and reasoning</summary>

**Correct: A — X**

strip removes any leading/trailing characters belonging to the supplied set until encountering a nonmember.

**Why the other choices fail:** The argument is not a required whole prefix or suffix; interior characters are untouched.

**Rule/source:** [Python types].

</details>

<a id="py019"></a>
### PY019 — Find versus index

What happens in this separate Python 3 script?

```python
print("abc".find("z"))
print("abc".index("z"))
```

A. No output, then ValueError.

B. Prints -1, then raises ValueError.

C. -1 / -1

D. Prints -1, then raises IndexError.

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Prints -1, then raises ValueError.**

find returns −1 for absence; index raises ValueError for a missing substring. The first print already occurred.

**Why the other choices fail:** The method name index does not make the failure IndexError.

**Rule/source:** [Python types].

</details>

<a id="py020"></a>
### PY020 — Replace returns a new string

What happens in this separate Python 3 script?

```python
s="aaaa"
s.replace("a","b",2)
print(s,s.replace("a","b",2))
```

A. bbaa bbaa

B. aaaa bbaa

C. aaaa bbbb

D. TypeError

<details>
<summary>Answer and reasoning</summary>

**Correct: B — aaaa bbaa**

The ignored call does not mutate s. count 2 replaces only the first two occurrences.

**Why the other choices fail:** str is immutable; replacement count is not a start index.

**Rule/source:** [Python types].

</details>

<a id="py021"></a>
### PY021 — Append versus extend

What happens in this separate Python 3 script?

```python
a=[1]
a.append([2,3])
a.extend([4,5])
print(a)
```

A. [1, 4, 5]

B. [1, [2, 3], 4, 5]

C. [1, [2, 3], [4, 5]]

D. [1, 2, 3, 4, 5]

<details>
<summary>Answer and reasoning</summary>

**Correct: B — [1, [2, 3], 4, 5]**

append adds one object; extend consumes an iterable and adds its elements individually.

**Why the other choices fail:** A list argument does not make append flatten it, and extend does not append the whole iterable as one element.

**Rule/source:** [Python types].

</details>

<a id="py022"></a>
### PY022 — In-place sort return

What happens in this separate Python 3 script?

```python
a=[3,1,2]
b=a.sort()
print(a,b)
```

A. [1, 2, 3] [1, 2, 3]

B. [1, 2, 3] None

C. None [1, 2, 3]

D. [3, 1, 2] [1, 2, 3]

<details>
<summary>Answer and reasoning</summary>

**Correct: B — [1, 2, 3] None**

list.sort mutates the list and returns None; sorted would build a new sorted list.

**Why the other choices fail:** Do not assign the return of an in-place mutator expecting the modified container.

**Rule/source:** [Python types].

</details>

<a id="py023"></a>
### PY023 — First matching removal

What happens in this separate Python 3 script?

```python
a=[2,1,2]
r=a.remove(2)
v=a.pop()
print(a,r,v)
```

A. [2] None 1

B. [2, 1] None 2

C. [1] 2 2

D. [1] None 2

<details>
<summary>Answer and reasoning</summary>

**Correct: D — [1] None 2**

remove deletes the first equal value and returns None. pop removes and returns the last item by default.

**Why the other choices fail:** Remove’s argument is a value, not an index. Mutator return contracts differ.

**Rule/source:** [Python types].

</details>

<a id="py024"></a>
### PY024 — Tuple immutability boundary

What happens in this separate Python 3 script?

```python
t=([1],2)
t[0].append(3)
print(t)
```

A. ([1], 2, 3)

B. ([1], 2)

C. ([1, 3], 2)

D. TypeError

<details>
<summary>Answer and reasoning</summary>

**Correct: C — ([1, 3], 2)**

Tuple element references cannot be replaced, but the referenced list remains mutable.

**Why the other choices fail:** Tuple immutability is not a recursive freeze of every contained object.

**Rule/source:** [Python types].

</details>

## Sharing, dictionaries, sets and ordering

<a id="py025"></a>
### PY025 — Repeated rows alias

What happens in this separate Python 3 script?

```python
a=[[0]*2]*2
a[0][1]=7
print(a)
```

A. [[0, 0], [0, 0]]

B. [[0, 7], [0, 0]]

C. [[7, 0], [0, 7]]

D. [[0, 7], [0, 7]]

<details>
<summary>Answer and reasoning</summary>

**Correct: D — [[0, 7], [0, 7]]**

Outer repetition repeats references to the same inner list. Changing that one list is visible from both slots.

**Why the other choices fail:** Repetition is not a deep copy; separate rows require separate list construction.

**Rule/source:** [Python types].

</details>

<a id="py026"></a>
### PY026 — Comprehension makes distinct rows

What happens in this separate Python 3 script?

```python
a=[[0]*2 for _ in range(2)]
a[0][1]=7
print(a)
```

A. SyntaxError

B. [[7, 0], [0, 0]]

C. [[0, 7], [0, 7]]

D. [[0, 7], [0, 0]]

<details>
<summary>Answer and reasoning</summary>

**Correct: D — [[0, 7], [0, 0]]**

Each iteration evaluates a new inner list expression. Only the first row is mutated.

**Why the other choices fail:** Similar contents do not imply aliasing; compare construction with repetition of an already-created object.

**Rule/source:** [Python types].

</details>

<a id="py027"></a>
### PY027 — Shallow list copy

What happens in this separate Python 3 script?

```python
a=[[1],[2]]
b=a.copy()
b[0].append(9)
b[1]=[8]
print(a,b)
```

A. [[1, 9], [2]] [[1], [8]]

B. [[1, 9], [2]] [[1, 9], [8]]

C. [[1, 9], [8]] [[1, 9], [8]]

D. [[1], [2]] [[1, 9], [8]]

<details>
<summary>Answer and reasoning</summary>

**Correct: B — [[1, 9], [2]] [[1, 9], [8]]**

The new outer list shares inner objects. Mutation through b[0] affects a[0]; replacing b[1] only changes b’s slot.

**Why the other choices fail:** Copying the outer list does not copy nested objects or share the outer slots.

**Rule/source:** [Python types].

</details>

<a id="py028"></a>
### PY028 — Rebinding versus augmented list update

What happens in this separate Python 3 script?

```python
a=[1];b=a
a=a+[2]
print(a,b)
b+=[3]
print(a,b)
```

A. [1, 2] [1] / [1, 2] [1, 3]

B. TypeError

C. [1, 2] [1] / [1, 2, 3] [1, 3]

D. [1, 2] [1, 2] / [1, 2, 3] [1, 2, 3]

<details>
<summary>Answer and reasoning</summary>

**Correct: A — [1, 2] [1] / [1, 2] [1, 3]**

+ builds a new list and rebinds a. b still names the old list; its += extends that old list in place.

**Why the other choices fail:** These list operations differ in object identity even when printed contents initially seem similar.

**Rule/source:** [Python types].

</details>

<a id="py029"></a>
### PY029 — Slice assignment mutates shared list

What happens in this separate Python 3 script?

```python
a=[1,2,3];b=a
a[:]=[9]
print(a,b,a is b)
```

A. [9] [9] True

B. [9] [1, 2, 3] False

C. TypeError

D. [9, 2, 3] [9, 2, 3] True

<details>
<summary>Answer and reasoning</summary>

**Correct: A — [9] [9] True**

Assigning to a slice changes the existing list contents and may change its length. Both names retain the same object.

**Why the other choices fail:** a[:]=... differs from a=...; replacing the whole slice is not replacing one element.

**Rule/source:** [Python types].

</details>

<a id="py030"></a>
### PY030 — Tuple augmented assignment partial effect

What happens in this separate Python 3 script?

```python
t=([1],)
try:
    t[0]+=[2]
except TypeError:
    print(t)
```

A. SyntaxError

B. ([1, 2],)

C. No exception and no output

D. ([1],)

<details>
<summary>Answer and reasoning</summary>

**Correct: B — ([1, 2],)**

The list’s in-place addition happens first, then storing the resulting reference back into the tuple slot fails. The list mutation remains.

**Why the other choices fail:** An exception does not automatically roll back earlier side effects.

**Rule/source:** [Python types].

</details>

<a id="py031"></a>
### PY031 — Dictionary replacement and reinsertion

What happens in this separate Python 3 script?

```python
d={"a":1,"b":2}
d["a"]=3
del d["a"]
d["a"]=4
print(list(d))
```

A. ['a', 'b', 'a']

B. ['a', 'b']

C. Order is unspecified.

D. ['b', 'a']

<details>
<summary>Answer and reasoning</summary>

**Correct: D — ['b', 'a']**

Replacing a value preserves insertion position, but deleting and adding the key again inserts it at the end.

**Why the other choices fail:** Modern Python dict order is guaranteed; it is not sorted order and duplicate keys are not separate entries.

**Rule/source:** [Python types].

</details>

<a id="py032"></a>
### PY032 — Get does not insert

What happens in this separate Python 3 script?

```python
d={}
print(d.get("x",[]),d)
d.setdefault("x",[]).append(1)
print(d)
```

A. KeyError

B. [] {} / {'x': [1]}

C. [] {} / {}

D. [] {'x': []} / {'x': [1]}

<details>
<summary>Answer and reasoning</summary>

**Correct: B — [] {} / {'x': [1]}**

get returns a fallback without storing it. setdefault stores its default for a missing key, then returns the stored list to mutate.

**Why the other choices fail:** The same-looking default argument does not make these APIs equivalent.

**Rule/source:** [Python types].

</details>

<a id="py033"></a>
### PY033 — Eager evaluation of a default argument

What happens in this separate Python 3 script?

```python
d={"x":1}
def f():
    print("F")
    return 9
print(d.get("x",f()))
```

A. F / 1

B. No output

C. 1

D. F / 9

<details>
<summary>Answer and reasoning</summary>

**Correct: A — F / 1**

Function arguments are evaluated before the get call. f() runs even though its result is not selected.

**Why the other choices fail:** A default value argument is not a lazy callback; avoid expensive or failing fallback computations unless intended.

**Rule/source:** [Python types].

</details>

<a id="py034"></a>
### PY034 — Dynamic dict views

What happens in this separate Python 3 script?

```python
d={"a":1}
v=d.keys()
d["b"]=2
print(list(v))
```

A. ['a', 'b']

B. ['a']

C. []

D. RuntimeError

<details>
<summary>Answer and reasoning</summary>

**Correct: A — ['a', 'b']**

A keys view reflects later changes to its dictionary. Converting to a list after mutation reads the current keys.

**Why the other choices fail:** A view is not a snapshot. Mutation during active iteration is a different situation.

**Rule/source:** [Python types].

</details>

<a id="py035"></a>
### PY035 — Equal numeric keys

What happens in this separate Python 3 script?

```python
d={True:"a",1:"b",1.0:"c"}
print(len(d),d[True],d[1])
```

A. TypeError

B. 1 c c

C. 3 a b

D. 2 b c

<details>
<summary>Answer and reasoning</summary>

**Correct: B — 1 c c**

These keys compare equal with compatible hashes; later entries replace the value of the same mapping.

**Why the other choices fail:** Numeric types alone do not make dictionary keys distinct.

**Rule/source:** [Python types].

</details>

<a id="py036"></a>
### PY036 — Hashable container boundary

What happens in this separate Python 3 script?

```python
print({(1,2):"ok"})
d={(1,[]):"bad"}
```

A. The first dictionary already raises TypeError.

B. Prints {(1, 2): 'ok'}, then raises TypeError.

C. Both tuples are valid keys.

D. KeyError

<details>
<summary>Answer and reasoning</summary>

**Correct: B — Prints {(1, 2): 'ok'}, then raises TypeError.**

A tuple is hashable only when all its elements are hashable. A list inside it makes hashing fail.

**Why the other choices fail:** Immutability of the outer tuple does not make a mutable unhashable member hashable.

**Rule/source:** [Python types].

</details>

<a id="py037"></a>
### PY037 — Set update return

What happens in this separate Python 3 script?

```python
a={1,2}
r=a.update([2,3])
print(sorted(a),r)
```

A. [1, 2] [3]

B. [1, 2, 3] None

C. [1, 2, 2, 3] None

D. [1, 2, 3] {1, 2, 3}

<details>
<summary>Answer and reasoning</summary>

**Correct: B — [1, 2, 3] None**

update mutates the set and returns None; duplicates collapse. Sorting the display avoids any set iteration assumption.

**Why the other choices fail:** A set does not retain repeated equal elements and update is not union’s copy-returning operation.

**Rule/source:** [Python types].

</details>

<a id="py038"></a>
### PY038 — Subset versus membership

What happens in this separate Python 3 script?

```python
a={1,2};b={1,2,3}
print(a<b,1 in b,a==b)
```

A. TypeError

B. True False True

C. True True False

D. False True False

<details>
<summary>Answer and reasoning</summary>

**Correct: C — True True False**

< on sets means proper subset, not numeric ordering. Membership checks an element and equality requires equal members.

**Why the other choices fail:** Do not transfer list lexicographic comparison or confuse a subset with an element.

**Rule/source:** [Python types].

</details>

## Functions, scope, closures and iterators

<a id="py039"></a>
### PY039 — Persistent mutable default

What happens in this separate Python 3 script?

```python
def f(x,a=[]):
    a.append(x)
    return a
print(f(1))
print(f(2))
```

A. TypeError

B. [1] / [1, 2]

C. [1] / [2]

D. [1, 2] / [1, 2]

<details>
<summary>Answer and reasoning</summary>

**Correct: B — [1] / [1, 2]**

The default list is created at definition time and reused. The first print happens before the second mutation.

**Why the other choices fail:** Do not retroactively change an earlier printed line or assume a fresh default per call.

**Rule/source:** [Python functions].

</details>

<a id="py040"></a>
### PY040 — Captured scalar default

What happens in this separate Python 3 script?

```python
x=1
def f(a=x): return a
x=9
print(f(),f(x))
```

A. 9 9

B. 1 9

C. NameError

D. 1 1

<details>
<summary>Answer and reasoning</summary>

**Correct: B — 1 9**

The default value was evaluated when def executed; explicit f(x) uses the current x value.

**Why the other choices fail:** Default argument expressions are not reevaluated using the latest global on every call.

**Rule/source:** [Python functions].

</details>

<a id="py041"></a>
### PY041 — Mutate then rebind parameter

What happens in this separate Python 3 script?

```python
def f(a):
    a.append(2)
    a=[9]
x=[1]
f(x)
print(x)
```

A. [9]

B. [1, 2]

C. [1, 2, 9]

D. [1]

<details>
<summary>Answer and reasoning</summary>

**Correct: B — [1, 2]**

a initially refers to x’s list; append changes it. Rebinding local a does not rebind x.

**Why the other choices fail:** Arguments bind names to objects; rebinding a parameter is not assigning to the caller’s variable.

**Rule/source:** [Python functions].

</details>

<a id="py042"></a>
### PY042 — Local classification precedes execution

What happens in this separate Python 3 script?

```python
x=3
def f():
    print(x)
    x=4
f()
```

A. 3 / 4

B. 3

C. UnboundLocalError

D. NameError

<details>
<summary>Answer and reasoning</summary>

**Correct: C — UnboundLocalError**

Assignment anywhere in this function makes x local unless declared global/nonlocal. The earlier read occurs before that local is bound.

**Why the other choices fail:** Execution order does not make the first read automatically global.

**Rule/source:** [Python functions].

</details>

<a id="py043"></a>
### PY043 — Nonlocal updates enclosing binding

What happens in this separate Python 3 script?

```python
def outer():
    x=0
    def f():
        nonlocal x
        x+=1
        return x
    return f
g=outer()
print(g(),g())
```

A. 1 2

B. SyntaxError

C. 0 0

D. 1 1

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 1 2**

The closure retains the enclosing binding; nonlocal directs assignment to that binding on both calls.

**Why the other choices fail:** A new call to g is not a new call to outer, and nonlocal does not mean module-global.

**Rule/source:** [Python functions].

</details>

<a id="py044"></a>
### PY044 — Late binding in closures

What happens in this separate Python 3 script?

```python
fs=[lambda:i for i in range(3)]
print([f() for f in fs])
```

A. [0, 0, 0]

B. NameError

C. [0, 1, 2]

D. [2, 2, 2]

<details>
<summary>Answer and reasoning</summary>

**Correct: D — [2, 2, 2]**

The lambdas share the comprehension’s i binding, which has final value 2 when called afterward.

**Why the other choices fail:** Creation at different iterations does not automatically freeze each variable’s value.

**Rule/source:** [Python functions].

</details>

<a id="py045"></a>
### PY045 — Default freezes each loop value

What happens in this separate Python 3 script?

```python
fs=[lambda i=i:i for i in range(3)]
print([f() for f in fs])
```

A. [0, 1, 2]

B. [0, 0, 0]

C. [2, 2, 2]

D. TypeError

<details>
<summary>Answer and reasoning</summary>

**Correct: A — [0, 1, 2]**

Each default captures the value evaluated during its function definition. Calls omit the parameter and read that per-function default.

**Why the other choices fail:** This differs from reading the shared enclosing binding at call time.

**Rule/source:** [Python functions].

</details>

<a id="py046"></a>
### PY046 — Comprehension variable scope

What happens in this separate Python 3 script?

```python
i=9
a=[i for i in range(3)]
print(i,a)
```

A. 9 [0, 1, 2]

B. 9 [9, 9, 9]

C. NameError

D. 2 [0, 1, 2]

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 9 [0, 1, 2]**

A list comprehension has its own iteration-variable scope in Python 3. The outer i remains 9.

**Why the other choices fail:** Ordinary for statements and comprehensions do not have identical scope behavior.

**Rule/source:** [Python functions].

</details>

<a id="py047"></a>
### PY047 — Exhausted iterator stays exhausted

What happens in this separate Python 3 script?

```python
it=iter([1,2])
print(next(it),list(it),list(it))
```

A. 1 [2] [2]

B. StopIteration

C. 1 [2] []

D. 1 [1, 2] [1, 2]

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 1 [2] []**

next consumes 1; the first list consumes the remaining 2; the second finds no remaining elements.

**Why the other choices fail:** Iterators retain progress. The iterable list’s reusable nature does not make its single iterator restart.

**Rule/source:** [Python functions].

</details>

<a id="py048"></a>
### PY048 — Map is lazy

What happens in this separate Python 3 script?

```python
def f(x):
    print("F",x)
    return x*2
m=map(f,[1,2])
print("A")
print(next(m))
```

A. A / 2

B. F 1 / F 2 / A / 2

C. A / F 1 / F 2 / 2

D. A / F 1 / 2

<details>
<summary>Answer and reasoning</summary>

**Correct: D — A / F 1 / 2**

map applies f as elements are requested. Only one result is consumed after A is printed.

**Why the other choices fail:** Creating map does not execute all callbacks or materialize all results.

**Rule/source:** [Python functions].

</details>

<a id="py049"></a>
### PY049 — Zip stops at shorter input

What happens in this separate Python 3 script?

```python
print(list(zip([1,2,3],["a","b"])))
```

A. [(1, 'a'), (2, 'b'), (3, 'b')]

B. [(1, 'a'), (2, 'b'), (3, None)]

C. [(1, 'a'), (2, 'b')]

D. ValueError

<details>
<summary>Answer and reasoning</summary>

**Correct: C — [(1, 'a'), (2, 'b')]**

Default zip ends at the shortest iterable, without padding or requiring equal lengths.

**Why the other choices fail:** Strict checking and zip_longest are different APIs not requested here.

**Rule/source:** [Python functions].

</details>

<a id="py050"></a>
### PY050 — Generator resumes after yield

What happens in this separate Python 3 script?

```python
def g():
    yield 1
    return 9
it=g()
print(next(it))
try:
    next(it)
except StopIteration as e:
    print(e.value)
```

A. SyntaxError

B. 1 / 9 / 9

C. 1 / None

D. 1 / 9

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 1 / 9**

The second resume returns 9, ending the generator; that return becomes StopIteration.value rather than another yielded item.

**Why the other choices fail:** yield and return have different effects. list(g()) would contain only 1.

**Rule/source:** [Python functions].

</details>

<a id="py051"></a>
### PY051 — Keyword-only and positional-only

What happens in this separate Python 3 script?

```python
def f(a,/,b=2,*,c=3): return a+b+c
print(f(1,c=4))
print(f(a=1))
```

A. Prints 7, then raises NameError.

B. SyntaxError

C. Prints 7, then raises TypeError.

D. 7 / 6

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Prints 7, then raises TypeError.**

a is positional-only because it precedes /. c is keyword-only after *. The second call illegally names a.

**Why the other choices fail:** Function-call syntax constraints are distinct from default availability.

**Rule/source:** [Python functions].

</details>

<a id="py052"></a>
### PY052 — Return omitted

What happens in this separate Python 3 script?

```python
def f(a):
    a.append(1)
x=[]
print(f(x),x)
```

A. [1] [1]

B. None [1]

C. TypeError

D. None []

<details>
<summary>Answer and reasoning</summary>

**Correct: B — None [1]**

A function that reaches its end returns None. Its mutation of the supplied list still occurs.

**Why the other choices fail:** Side effects do not imply the function returns the changed object.

**Rule/source:** [Python functions].

</details>

## Classes, exceptions and input contracts

<a id="py053"></a>
### PY053 — Shared class list

What happens in this separate Python 3 script?

```python
class C:
    xs=[]
a=C();b=C()
a.xs.append(1)
print(b.xs,a.xs is b.xs)
```

A. AttributeError

B. [1] False

C. [1] True

D. [] False

<details>
<summary>Answer and reasoning</summary>

**Correct: C — [1] True**

Both instances find the same class attribute list. No instance-specific list was created.

**Why the other choices fail:** Access through an instance does not copy a class-level mutable object.

**Rule/source:** [Python classes].

</details>

<a id="py054"></a>
### PY054 — Instance binding shadows class data

What happens in this separate Python 3 script?

```python
class C:
    xs=[]
a=C();b=C()
a.xs=[1]
print(a.xs,b.xs,C.xs)
```

A. [] [] []

B. [1] [1] [1]

C. AttributeError

D. [1] [] []

<details>
<summary>Answer and reasoning</summary>

**Correct: D — [1] [] []**

Assignment creates a.xs on the instance, shadowing the class attribute. b and C still access the unchanged class list.

**Why the other choices fail:** Assigning an instance attribute differs from mutating a list retrieved from the class.

**Rule/source:** [Python classes].

</details>

<a id="py055"></a>
### PY055 — Bound method supplies self

What happens in this separate Python 3 script?

```python
class C:
    def f(self,x): return x+1
c=C()
print(c.f(2),C.f(c,2))
```

A. 3 2

B. TypeError

C. 2 3

D. 3 3

<details>
<summary>Answer and reasoning</summary>

**Correct: D — 3 3**

Instance method access creates a bound method supplying c automatically. Calling through C needs the instance passed explicitly.

**Why the other choices fail:** self is a conventional parameter name, not an extra argument required on an already bound call.

**Rule/source:** [Python classes].

</details>

<a id="py056"></a>
### PY056 — Dynamic method lookup

What happens in this separate Python 3 script?

```python
class A:
    def f(self): return "A"
    def g(self): return self.f()
class B(A):
    def f(self): return "B"
print(B().g())
```

A. AttributeError

B. Compilation fails

C. B

D. A

<details>
<summary>Answer and reasoning</summary>

**Correct: C — B**

Inherited g executes on a B instance; self.f resolves to B’s override.

**Why the other choices fail:** Inheriting a method does not freeze every internal call to the parent implementation.

**Rule/source:** [Python classes].

</details>

<a id="py057"></a>
### PY057 — Class initialization returns None

What happens in this separate Python 3 script?

```python
class C:
    def __init__(self): return 1
C()
```

A. TypeError

B. 1

C. SyntaxError

D. A C instance is constructed normally.

<details>
<summary>Answer and reasoning</summary>

**Correct: A — TypeError**

__init__ initializes an already-created instance and must return None. Returning a non-None value is rejected.

**Why the other choices fail:** __new__ creates the object; __init__ is not a normal object-returning constructor function.

**Rule/source:** [Python classes].

</details>

<a id="py058"></a>
### PY058 — Equality and hashability together

What happens in this separate Python 3 script?

```python
class C:
    def __eq__(self,other): return isinstance(other,C)
print(C()==C())
print({C()})
```

A. False / {C()}

B. No output, then TypeError.

C. Prints True, then raises TypeError.

D. Both operations succeed.

<details>
<summary>Answer and reasoning</summary>

**Correct: C — Prints True, then raises TypeError.**

Defining __eq__ without a suitable __hash__ makes instances unhashable by default, preventing equality/hash-contract bugs.

**Why the other choices fail:** A custom equality rule does not automatically supply a compatible hash.

**Rule/source:** [Python classes].

</details>

<a id="py059"></a>
### PY059 — Finally overrides a return

What happens in this separate Python 3 script?

```python
def f():
    try: return 1
    finally: return 2
print(f())
```

A. 2

B. 1

C. 1 / 2

D. SyntaxError

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 2**

The finally return replaces the pending return 1. This is legal on the stated Python versions; some versions may warn about this style.

**Why the other choices fail:** Finally execution does not mean both returns are delivered.

**Rule/source:** [Python classes].

</details>

<a id="py060"></a>
### PY060 — Try else excludes handler failures

What happens in this separate Python 3 script?

```python
try:
    x=int("bad")
except ValueError:
    print("E")
else:
    print("S")
finally:
    print("F")
```

A. F

B. E / F

C. S / F

D. E / S / F

<details>
<summary>Answer and reasoning</summary>

**Correct: B — E / F**

The conversion fails; except handles it, else is skipped, and finally runs.

**Why the other choices fail:** try else requires successful normal completion of the try suite, not merely a handled exception.

**Rule/source:** [Python classes].

</details>

<a id="py061"></a>
### PY061 — Catch hierarchy and first match

What happens in this separate Python 3 script?

```python
try:
    raise IndexError()
except LookupError:
    print("L")
except IndexError:
    print("I")
```

A. I

B. SyntaxError

C. L / I

D. L

<details>
<summary>Answer and reasoning</summary>

**Correct: D — L**

IndexError is a LookupError subtype; the first matching handler runs. Python permits this ordering even though the second is ineffective here.

**Why the other choices fail:** Java’s unreachable-catch compile restriction does not transfer directly to Python.

**Rule/source:** [Python classes].

</details>

<a id="py062"></a>
### PY062 — Input conversion preserves token boundaries

What happens in this separate Python 3 script?

```python
line=" 12  7 "
print(line.split(),list(map(int,line.split())))
```

A. ['', '12', '', '7', ''] [12, 7]

B. [12, 7] ['12', '7']

C. ValueError

D. ['12', '7'] [12, 7]

<details>
<summary>Answer and reasoning</summary>

**Correct: D — ['12', '7'] [12, 7]**

Default split groups whitespace; int converts each resulting text token. input itself would return a string.

**Why the other choices fail:** Do not assume split produces numbers or that default whitespace splitting preserves empty fields.

**Rule/source:** [Python classes].

</details>

<a id="py063"></a>
### PY063 — Exception variable cleanup

What happens in this separate Python 3 script?

```python
e="outer"
try:
    1/0
except ZeroDivisionError as e:
    pass
print(e)
```

A. NameError

B. outer

C. None

D. ZeroDivisionError

<details>
<summary>Answer and reasoning</summary>

**Correct: A — NameError**

The exception target e is cleared at the end of the handler to help break reference cycles. The prior outer binding is not restored.

**Why the other choices fail:** The caught arithmetic exception does not escape; the later read fails for a different reason.

**Rule/source:** [Python classes].

</details>

<a id="py064"></a>
### PY064 — Name rebinding versus dictionary mutation

What happens in this separate Python 3 script?

```python
d={"n":1}
def f():
    d["n"]+=1
f()
print(d["n"])
```

A. 2

B. UnboundLocalError

C. 1

D. NameError

<details>
<summary>Answer and reasoning</summary>

**Correct: A — 2**

The function reads the global binding d and mutates its object. It never assigns to the name d, so no global declaration is required.

**Why the other choices fail:** Assignment to a subscript differs from assignment to the variable name itself.

**Rule/source:** [Python classes].

</details>

<a id="py065"></a>
### PY065 — Deletion does not destroy a shared object

What happens in this separate Python 3 script?

```python
a=[1];b=a
del a
b.append(2)
print(b)
```

A. []

B. [1, 2]

C. NameError

D. ReferenceError

<details>
<summary>Answer and reasoning</summary>

**Correct: B — [1, 2]**

del a removes one binding. b still references the live list and can mutate it.

**Why the other choices fail:** Deleting a name is not an explicit instruction to destroy an object with other references.

**Rule/source:** [Python classes].

</details>

<a id="py066"></a>
### PY066 — Unpacking cardinality

What happens in this separate Python 3 script?

```python
a,*b,c=range(5)
print(a,b,c)
```

A. 0 [1, 2, 3, 4] 4

B. 0 (1, 2, 3) 4

C. 0 [1, 2, 3] 4

D. ValueError

<details>
<summary>Answer and reasoning</summary>

**Correct: C — 0 [1, 2, 3] 4**

The starred target collects remaining middle values into a list. The first and last values go to a and c.

**Why the other choices fail:** The starred capture is a list, regardless of range’s original type, and does not duplicate the last item.

**Rule/source:** [Python classes].

</details>

<a id="py067"></a>
### PY067 — Stable key-based sorting

What happens in this separate Python 3 script?

```python
a=[("b",1),("a",1),("c",0)]
print(sorted(a,key=lambda x:x[1]))
```

A. [('c', 0), ('b', 1), ('a', 1)]

B. TypeError

C. [('a', 1), ('b', 1), ('c', 0)]

D. [('c', 0), ('a', 1), ('b', 1)]

<details>
<summary>Answer and reasoning</summary>

**Correct: A — [('c', 0), ('b', 1), ('a', 1)]**

Sort orders by the chosen numeric key and preserves original relative order of b and a when their keys tie.

**Why the other choices fail:** The original tuple’s first field does not become an automatic tiebreaker for an equal key.

**Rule/source:** [Python classes].

</details>

<a id="py068"></a>
### PY068 — Any short-circuits a generator

What happens in this separate Python 3 script?

```python
seen=[]
def f(x):
    seen.append(x)
    return x==2
print(any(f(x) for x in [1,2,3]),seen)
```

A. True []

B. True [1, 2]

C. True [1, 2, 3]

D. False [1, 2, 3]

<details>
<summary>Answer and reasoning</summary>

**Correct: B — True [1, 2]**

any stops as soon as it obtains a truthy value. The generator is consumed only through x=2.

**Why the other choices fail:** A generator expression is lazy; list comprehension inside any would eagerly run every f first.

**Rule/source:** [Python classes].

</details>

<a id="py069"></a>
### PY069 — Identity without interning guesses

What happens in this separate Python 3 script?

```python
a=[1];b=[1];c=a
print(a==b,a is b,a is c)
```

A. The answer depends on integer caching.

B. True True True

C. False False True

D. True False True

<details>
<summary>Answer and reasoning</summary>

**Correct: D — True False True**

Equal list contents do not imply identical list objects. c and a share the reference; the two literal list constructions are distinct.

**Why the other choices fail:** Integer interning does not merge separate list objects.

**Rule/source:** [Python classes].

</details>

<a id="py070"></a>
### PY070 — Truthiness of a custom object

What happens in this separate Python 3 script?

```python
class C:
    def __len__(self): return 0
print(bool(C()))
```

A. 0

B. True

C. False

D. TypeError

<details>
<summary>Answer and reasoning</summary>

**Correct: C — False**

Without __bool__, truth testing consults __len__. Length zero makes this object falsy.

**Why the other choices fail:** A user-defined instance is not invariably truthy; bool returns a boolean, not the raw length.

**Rule/source:** [Python classes].

</details>

## Sources

[Python types]: https://docs.python.org/3/library/stdtypes.html
[Python expressions]: https://docs.python.org/3/reference/expressions.html
[Python functions]: https://docs.python.org/3/tutorial/controlflow.html
[Python classes]: https://docs.python.org/3/tutorial/classes.html
[Python exceptions]: https://docs.python.org/3/tutorial/errors.html
[Python builtins]: https://docs.python.org/3/library/functions.html
[Python notes]: Python_FS_Revision_Notes.md
